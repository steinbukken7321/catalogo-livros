const catalog = document.querySelector('#book-catalog');
const filters = document.querySelector('#category-filters');
const searchInput = document.querySelector('#book-search');
const resultsCount = document.querySelector('#results-count');
const emptyState = document.querySelector('#empty-state');
const hud = document.querySelector('#book-hud');
const hudClose = document.querySelector('#hud-close');
const authorImage = document.querySelector('#hud-author-image');
const authorInitials = document.querySelector('#hud-author-initials');
let books = [];
let selectedCategory = 'Todos';
let hideTimer;
let activeCard;
let activeBook;
const coverCache = new Map();
const portraitCache = new Map();
const coverObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      loadBookCover(entry.target, books[Number(entry.target.dataset.bookIndex)]);
    });
  }, { rootMargin: '180px' })
  : null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function hashString(value) {
  return [...value].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 7);
}

function coverColors(category, title) {
  const palettes = {
    'Fantasia': ['#37685e', '#6651a0'],
    'Ficção científica': ['#17658a', '#353273'],
    'Distopia': ['#8b4e43', '#392b4a'],
    'Grimdark': ['#8a493e', '#262835'],
    'Mistério e suspense': ['#9a7046', '#29394a'],
    'Terror': ['#773c55', '#202434'],
    'Ficção histórica': ['#8a6849', '#45534b'],
    'Ficção literária': ['#5b688c', '#554665'],
    'Realismo mágico': ['#4e7a70', '#854c76'],
    'Aventura e YA': ['#447a9a', '#8e674e']
  };
  const palette = palettes[category] || ['#416578', '#57508a'];
  return palette.map((base, index) => {
    const hue = (hashString(title) + index * 29) % 17;
    return `color-mix(in srgb, ${base} ${89 + hue}%, #172033)`;
  });
}

function renderFilters() {
  const categories = ['Todos', ...new Set(books.map((book) => book.category))];
  filters.innerHTML = categories.map((category) => `
    <button class="filter-button" type="button" data-category="${escapeHTML(category)}"
      aria-pressed="${category === selectedCategory}">${escapeHTML(category)}</button>
  `).join('');
}

function renderBooks() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const visibleBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'Todos' || book.category === selectedCategory;
    const searchable = `${book.title} ${book.author} ${book.category}`.toLocaleLowerCase('pt-BR');
    return matchesCategory && searchable.includes(query);
  });
  const categories = [...new Set(visibleBooks.map((book) => book.category))];

  catalog.innerHTML = categories.map((category) => {
    const categoryBooks = visibleBooks.filter((book) => book.category === category);
    return `
      <section class="category-section" aria-label="${escapeHTML(category)}">
        <div class="category-heading">
          <h3>${escapeHTML(category)}</h3><span class="category-count">${String(categoryBooks.length).padStart(2, '0')} OBRAS</span>
          <span class="category-rule" aria-hidden="true"></span>
        </div>
        <div class="book-grid">
          ${categoryBooks.map((book) => {
            const [coverA, coverB] = coverColors(book.category, book.title);
            const index = books.indexOf(book) + 1;
            return `
              <article class="book-card" tabindex="0" data-book-index="${index - 1}"
                aria-label="${escapeHTML(book.title)}, de ${escapeHTML(book.author)}, ${escapeHTML(book.category)}">
                <div class="book-cover-wrap">
                  <span class="book-rank">S / ${String(index).padStart(3, '0')}</span>
                  <img class="real-cover" alt="" aria-hidden="true">
                  <div class="cover-art" style="--cover-a:${coverA};--cover-b:${coverB}" role="img" aria-label="Capa ilustrativa de ${escapeHTML(book.title)}">
                    <span class="cover-top">SHELFSPHERE · ${escapeHTML(book.category.toUpperCase())}</span>
                    <span class="cover-emblem" aria-hidden="true">${escapeHTML(book.title.trim().charAt(0).toUpperCase())}</span>
                    <span><span class="cover-title">${escapeHTML(book.title)}</span><span class="cover-author">${escapeHTML(book.author)}</span></span>
                  </div>
                </div>
                <div class="book-meta">
                  <p class="book-author">${escapeHTML(book.author)}</p>
                  <span class="book-title" title="${escapeHTML(book.title)}">${escapeHTML(book.title)}</span>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }).join('');

  resultsCount.textContent = `${String(visibleBooks.length).padStart(3, '0')} ${visibleBooks.length === 1 ? 'OBRA ENCONTRADA' : 'OBRAS ENCONTRADAS'}`;
  emptyState.hidden = visibleBooks.length > 0;
  catalog.hidden = visibleBooks.length === 0;
  catalog.querySelectorAll('.book-card').forEach((card) => {
    if (coverObserver) coverObserver.observe(card);
    else loadBookCover(card, books[Number(card.dataset.bookIndex)]);
  });
  loadVisibleCovers();
}

function loadVisibleCovers() {
  catalog.querySelectorAll('.book-card:not([data-cover-requested])').forEach((card) => {
    const bounds = card.getBoundingClientRect();
    if (bounds.top <= window.innerHeight + 180 && bounds.bottom >= -180) {
      loadBookCover(card, books[Number(card.dataset.bookIndex)]);
      coverObserver?.unobserve(card);
    }
  });
}

async function findCover(book) {
  if (coverCache.has(book.title)) return coverCache.get(book.title);
  const query = new URLSearchParams({ title: book.title, author: book.author, limit: '1', fields: 'cover_i' });
  const lookup = fetch(`https://openlibrary.org/search.json?${query}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Open Library respondeu ${response.status}`);
      return response.json();
    })
    .then((data) => data.docs?.[0]?.cover_i
      ? `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-M.jpg`
      : null);
  coverCache.set(book.title, lookup);
  return lookup;
}

function loadBookCover(card, book) {
  if (!book || card.dataset.coverRequested) return;
  card.dataset.coverRequested = 'true';
  findCover(book).then((cover) => {
    if (!cover) return;
    const image = card.querySelector('.real-cover');
    image.onload = () => card.querySelector('.book-cover-wrap').classList.add('has-real-cover');
    image.onerror = () => console.warn(`A capa de "${book.title}" não pôde ser exibida.`);
    image.src = cover;
  }).catch((error) => console.warn(`Não foi possível carregar a capa de "${book.title}".`, error));
}

async function findPortrait(author) {
  if (portraitCache.has(author)) return portraitCache.get(author);
  const lookup = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(author.replaceAll(' ', '_'))}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Wikipedia respondeu ${response.status}`);
      return response.json();
    })
    .then((data) => data.thumbnail?.source || null);
  portraitCache.set(author, lookup);
  return lookup;
}

function positionHud(card) {
  const bounds = card.getBoundingClientRect();
  const hudBounds = hud.getBoundingClientRect();
  const margin = 14;
  let left = bounds.right + margin;
  if (left + hudBounds.width > window.innerWidth - margin) {
    left = bounds.left - hudBounds.width - margin;
  }
  if (left < margin) left = Math.max(margin, window.innerWidth - hudBounds.width - margin);
  const top = Math.min(
    Math.max(margin, bounds.top + (bounds.height - hudBounds.height) / 2),
    window.innerHeight - hudBounds.height - margin
  );
  hud.style.left = `${left}px`;
  hud.style.top = `${top}px`;
}

async function showHud(card) {
  clearTimeout(hideTimer);
  const book = books[Number(card.dataset.bookIndex)];
  if (!book) return;
  activeCard = card;
  activeBook = book;
  const index = books.indexOf(book) + 1;
  hud.dataset.bookIndex = String(index - 1);
  document.querySelector('#hud-category').textContent = book.category.toLocaleUpperCase('pt-BR');
  document.querySelector('#hud-author-name').textContent = book.author;
  document.querySelector('#hud-year').textContent = book.year;
  document.querySelector('#hud-title').textContent = book.title;
  document.querySelector('#hud-synopsis').textContent = book.synopsis;
  document.querySelector('#hud-rank').textContent = `S / ${String(index).padStart(3, '0')}`;
  authorInitials.textContent = book.author.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  authorImage.hidden = true;
  authorImage.removeAttribute('src');
  hud.setAttribute('aria-hidden', 'false');
  hud.classList.add('is-visible');
  positionHud(card);

  const requestedBook = book;
  loadBookCover(card, book);
  const imagePromises = [
    findPortrait(book.author).then((portrait) => {
      if (activeBook !== requestedBook || !portrait) return;
      authorImage.onload = () => { authorImage.hidden = false; };
      authorImage.onerror = () => { authorImage.hidden = true; };
      authorImage.src = portrait;
    }).catch((error) => console.warn(`Não foi possível carregar o retrato de ${book.author}.`, error))
  ];
  await Promise.all(imagePromises);
}

function scheduleHudHide() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if (hud.matches(':hover') || activeCard?.matches(':hover, :focus')) return;
    hud.classList.remove('is-visible');
    hud.setAttribute('aria-hidden', 'true');
    activeCard = null;
    activeBook = null;
  }, 140);
}

filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  selectedCategory = button.dataset.category;
  renderFilters();
  renderBooks();
});

searchInput.addEventListener('input', renderBooks);
catalog.addEventListener('pointerover', (event) => {
  const card = event.target.closest('.book-card');
  if (card && card !== activeCard) showHud(card);
});
catalog.addEventListener('pointerout', (event) => {
  if (event.target.closest('.book-card') && !event.relatedTarget?.closest('.book-card')) scheduleHudHide();
});
catalog.addEventListener('focusin', (event) => {
  const card = event.target.closest('.book-card');
  if (card) showHud(card);
});
catalog.addEventListener('focusout', (event) => {
  if (event.target.closest('.book-card') && !event.relatedTarget?.closest('.book-card')) scheduleHudHide();
});
hud.addEventListener('pointerenter', () => clearTimeout(hideTimer));
hud.addEventListener('pointerleave', scheduleHudHide);
hudClose.addEventListener('click', () => {
  hud.classList.remove('is-visible');
  hud.setAttribute('aria-hidden', 'true');
  activeCard = null;
  activeBook = null;
});
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === 'Escape') {
    hud.classList.remove('is-visible');
    hud.setAttribute('aria-hidden', 'true');
    activeCard = null;
    activeBook = null;
    searchInput.blur();
  }
});
window.addEventListener('resize', () => { if (activeCard) positionHud(activeCard); });
window.addEventListener('scroll', () => {
  if (activeCard) positionHud(activeCard);
  requestAnimationFrame(loadVisibleCovers);
}, { passive: true });

fetch('books.json')
  .then((response) => {
    if (!response.ok) throw new Error(`Não foi possível carregar books.json (${response.status}).`);
    return response.json();
  })
  .then((data) => {
    if (!Array.isArray(data) || data.length !== 100) throw new Error('O acervo precisa conter exatamente 100 obras.');
    books = data;
    renderFilters();
    renderBooks();
  })
  .catch((error) => {
    resultsCount.textContent = 'ERRO AO CARREGAR O ACERVO';
    emptyState.hidden = false;
    emptyState.textContent = 'Não foi possível abrir books.json. Inicie o servidor local conforme as instruções do README.';
    console.error(error);
  });
