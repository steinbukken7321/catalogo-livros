const books = [
  {
    rank: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', authorImage: 'https://covers.openlibrary.org/a/olid/OL23919A-M.jpg',
    year: 1954, category: 'Fantasia épica', isbn: '9780618640157',
    synopsis: 'Quando um anel de poder cai nas mãos do hobbit Frodo, ele precisa deixar o Condado e atravessar uma Terra-média ameaçada por Sauron. Com a ajuda de uma companhia improvável, sua jornada se torna a última esperança de povos inteiros.'
  },
  {
    rank: 2, title: 'The Name of the Wind', author: 'Patrick Rothfuss', authorImage: 'https://covers.openlibrary.org/a/olid/OL1394384A-M.jpg',
    year: 2007, category: 'Fantasia épica', isbn: '9780756404741',
    synopsis: 'Em uma hospedaria afastada, o lendário Kvothe decide contar a própria história. Da infância entre artistas itinerantes aos anos de estudo em uma universidade singular, ele revela como se transformou em mito — e o que a lenda deixou de fora.'
  },
  {
    rank: 3, title: 'The Way of Kings', author: 'Brandon Sanderson', authorImage: 'https://covers.openlibrary.org/a/olid/OL1394352A-M.jpg',
    year: 2010, category: 'Fantasia épica', isbn: '9780765326355',
    synopsis: 'Em Roshar, tempestades devastadoras moldam a vida e a guerra. Um soldado escravizado, um estudioso em busca de respostas e um líder assombrado por visões seguem caminhos distintos que começam a convergir diante de uma ameaça antiga.'
  },
  {
    rank: 4, title: "Assassin's Apprentice", author: 'Robin Hobb', authorImage: 'https://covers.openlibrary.org/a/olid/OL267252A-M.jpg',
    year: 1995, category: 'Fantasia épica', isbn: '9780553573398',
    synopsis: 'Fitz, filho ilegítimo de um príncipe, cresce à margem da corte e aprende a sobreviver entre intrigas. Treinado em segredo para servir à família real, ele precisa escolher entre a lealdade ao reino e o próprio destino.'
  },
  {
    rank: 5, title: 'The Fifth Season', author: 'N.K. Jemisin', authorImage: 'https://covers.openlibrary.org/a/olid/OL6945184A-M.jpg',
    year: 2015, category: 'Fantasia épica', isbn: '9780316229296',
    synopsis: 'Em um continente assolado por catástrofes cíclicas, pessoas capazes de controlar a terra são temidas e subjugadas. Quando o mundo se parte e uma mãe perde tudo, três vidas separadas revelam uma história sobre poder, sobrevivência e transformação.'
  },
  {
    rank: 6, title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', authorImage: 'https://covers.openlibrary.org/a/olid/OL1394352A-M.jpg',
    year: 2006, category: 'Fantasia épica', isbn: '9780765350381',
    synopsis: 'Por mil anos, um soberano imortal governa um império coberto de cinzas. Uma jovem ladra descobre que possui habilidades raras e se junta a um grupo de rebeldes que pretende derrubar o regime usando magia, astúcia e uma dose improvável de esperança.'
  },
  {
    rank: 7, title: 'The Lies of Locke Lamora', author: 'Scott Lynch', authorImage: 'https://covers.openlibrary.org/a/olid/OL2739558A-M.jpg',
    year: 2006, category: 'Fantasia urbana', isbn: '9780553588941',
    synopsis: 'Na cidade de Camorr, Locke Lamora e seus companheiros fazem fortuna enganando os ricos com golpes elaborados. Mas uma disputa entre forças criminosas ameaça desmontar o plano mais perigoso da equipe e cobrar um preço pessoal.'
  },
  {
    rank: 8, title: 'Jade City', author: 'Fonda Lee', authorImage: 'https://covers.openlibrary.org/a/olid/OL7298028A-M.jpg',
    year: 2017, category: 'Fantasia urbana', isbn: '9780316440865',
    synopsis: 'Em uma ilha onde o jade concede habilidades extraordinárias, dois clãs disputam influência e sobrevivência. Quando velhas regras deixam de proteger a cidade, uma família precisa enfrentar mudanças políticas, ambição e lealdades divididas.'
  },
  {
    rank: 9, title: 'The Goblin Emperor', author: 'Katherine Addison', authorImage: 'https://covers.openlibrary.org/a/olid/OL7072400A-M.jpg',
    year: 2014, category: 'Fantasia urbana', isbn: '9780765365682',
    synopsis: 'Afastado da corte desde a infância, Maia nunca esperou herdar o trono. De repente imperador, ele encontra um palácio cheio de conspirações e convenções desconhecidas, e tenta governar com compaixão sem perder de vista os perigos ao redor.'
  },
  {
    rank: 10, title: 'Piranesi', author: 'Susanna Clarke', authorImage: 'https://covers.openlibrary.org/a/olid/OL1397926A-M.jpg',
    year: 2020, category: 'Fantasia urbana', isbn: '9781635575637',
    synopsis: 'Piranesi vive em uma casa infinita de salões, estátuas e marés, onde registra cada detalhe do mundo que conhece. A chegada de pistas inesperadas sobre outra pessoa desperta perguntas sobre sua memória, sua casa e a verdade de sua existência.'
  },
  {
    rank: 11, title: 'A Memory Called Empire', author: 'Arkady Martine', authorImage: 'https://covers.openlibrary.org/a/olid/OL7478038A-M.jpg',
    year: 2019, category: 'Ficção científica', isbn: '9781250186430',
    synopsis: 'Enviada à capital de um império interestelar, a diplomata Mahit Dzmare precisa investigar a morte de seu antecessor enquanto protege sua pequena estação. Política, identidade e tecnologia se entrelaçam em uma missão na qual qualquer palavra pode mudar o futuro.'
  },
  {
    rank: 12, title: 'The Hobbit', author: 'J.R.R. Tolkien', authorImage: 'https://covers.openlibrary.org/a/olid/OL23919A-M.jpg',
    year: 1937, category: 'Fantasia épica', isbn: '9780345339683',
    synopsis: 'Bilbo Bolseiro prefere a tranquilidade de sua toca, até que um mago e treze anões o convidam para recuperar um tesouro guardado por um dragão. A viagem inesperada transforma o hobbit e o leva a descobrir uma coragem que não sabia possuir.'
  }
];

const catalog = document.querySelector('#book-catalog');
const filters = document.querySelector('#category-filters');
const searchInput = document.querySelector('#book-search');
const resultsCount = document.querySelector('#results-count');
const emptyState = document.querySelector('#empty-state');
let selectedCategory = 'Todas';

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function renderFilters() {
  const categories = ['Todas', ...new Set(books.map((book) => book.category))];
  filters.innerHTML = categories.map((category) => `
    <button class="filter-button" type="button" data-category="${escapeHTML(category)}"
      aria-pressed="${category === selectedCategory}">${escapeHTML(category)}</button>
  `).join('');
}

function renderBooks() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const visibleBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'Todas' || book.category === selectedCategory;
    const matchesQuery = `${book.title} ${book.author}`.toLocaleLowerCase('pt-BR').includes(query);
    return matchesCategory && matchesQuery;
  });
  const categories = [...new Set(visibleBooks.map((book) => book.category))];

  catalog.innerHTML = categories.map((category) => {
    const categoryBooks = visibleBooks.filter((book) => book.category === category);
    return `
      <section class="category-section" aria-label="${escapeHTML(category)}">
        <div class="category-heading">
          <h3>${escapeHTML(category)}</h3><span>${categoryBooks.length} ${categoryBooks.length === 1 ? 'livro' : 'livros'}</span>
          <span class="category-rule" aria-hidden="true"></span>
        </div>
        <div class="book-grid">
          ${categoryBooks.map((book) => `
            <article class="book-card" tabindex="0" aria-label="${escapeHTML(book.title)}, de ${escapeHTML(book.author)}, ranking ${book.rank}">
              <div class="book-cover-wrap">
                <span class="book-rank">#${book.rank} · r/FANTASY</span>
                <img class="book-cover" src="https://covers.openlibrary.org/b/isbn/${escapeHTML(book.isbn)}-L.jpg"
                  alt="Capa de ${escapeHTML(book.title)}" loading="lazy">
                <div class="book-overlay">
                  <span class="overlay-year">${book.year}</span>
                  <div class="overlay-author">
                    <img class="author-photo" src="${escapeHTML(book.authorImage)}" alt="" loading="lazy">
                    <span class="author-label"><small>Escrito por</small><strong>${escapeHTML(book.author)}</strong></span>
                  </div>
                  <p class="overlay-synopsis">${escapeHTML(book.synopsis)}</p>
                </div>
              </div>
              <div class="book-meta">
                <span class="book-title" title="${escapeHTML(book.title)}">${escapeHTML(book.title)}</span>
                <p class="book-author">${escapeHTML(book.author)}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }).join('');

  resultsCount.textContent = `${visibleBooks.length} ${visibleBooks.length === 1 ? 'livro encontrado' : 'livros encontrados'}`;
  emptyState.hidden = visibleBooks.length > 0;
  catalog.hidden = visibleBooks.length === 0;
}

filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  selectedCategory = button.dataset.category;
  renderFilters();
  renderBooks();
});

searchInput.addEventListener('input', renderBooks);
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderFilters();
renderBooks();
