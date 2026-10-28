"""Estatísticas de uma seleção demonstrativa de livros populares no r/Fantasy."""

from collections import Counter
import json


BOOKS = [
    {
        "rank": 1,
        "title": "The Lord of the Rings",
        "author": "J.R.R. Tolkien",
        "author_image": "https://covers.openlibrary.org/a/olid/OL23919A-M.jpg",
        "year": 1954,
        "category": "Fantasia épica",
        "cover": "https://covers.openlibrary.org/b/isbn/9780618640157-L.jpg",
        "synopsis": (
            "Frodo precisa deixar o Condado e atravessar uma Terra-média "
            "ameaçada por Sauron para destruir um anel de poder."
        ),
    },
    {
        "rank": 2,
        "title": "The Name of the Wind",
        "author": "Patrick Rothfuss",
        "author_image": "https://covers.openlibrary.org/a/olid/OL1394384A-M.jpg",
        "year": 2007,
        "category": "Fantasia épica",
        "cover": "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg",
        "synopsis": (
            "O lendário Kvothe conta a história de sua vida, da infância "
            "itinerante aos estudos em uma universidade singular."
        ),
    },
    {
        "rank": 3,
        "title": "The Way of Kings",
        "author": "Brandon Sanderson",
        "author_image": "https://covers.openlibrary.org/a/olid/OL1394352A-M.jpg",
        "year": 2010,
        "category": "Fantasia épica",
        "cover": "https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg",
        "synopsis": (
            "Em um mundo assolado por tempestades, destinos distintos "
            "convergem diante de uma ameaça antiga."
        ),
    },
    {
        "rank": 4,
        "title": "Assassin's Apprentice",
        "author": "Robin Hobb",
        "author_image": "https://covers.openlibrary.org/a/olid/OL267252A-M.jpg",
        "year": 1995,
        "category": "Fantasia épica",
        "cover": "https://covers.openlibrary.org/b/isbn/9780553573398-L.jpg",
        "synopsis": (
            "Fitz, filho ilegítimo de um príncipe, é treinado em segredo "
            "para servir à família real."
        ),
    },
    {
        "rank": 5,
        "title": "The Fifth Season",
        "author": "N.K. Jemisin",
        "author_image": "https://covers.openlibrary.org/a/olid/OL6945184A-M.jpg",
        "year": 2015,
        "category": "Fantasia épica",
        "cover": "https://covers.openlibrary.org/b/isbn/9780316229296-L.jpg",
        "synopsis": (
            "Em um continente de catástrofes cíclicas, três vidas revelam "
            "uma história de poder e sobrevivência."
        ),
    },
    {
        "rank": 6,
        "title": "Mistborn: The Final Empire",
        "author": "Brandon Sanderson",
        "author_image": "https://covers.openlibrary.org/a/olid/OL1394352A-M.jpg",
        "year": 2006,
        "category": "Fantasia épica",
        "cover": "https://covers.openlibrary.org/b/isbn/9780765350381-L.jpg",
        "synopsis": (
            "Uma jovem ladra com habilidades raras se une a rebeldes "
            "para derrubar um soberano imortal."
        ),
    },
    {
        "rank": 7,
        "title": "The Lies of Locke Lamora",
        "author": "Scott Lynch",
        "author_image": "https://covers.openlibrary.org/a/olid/OL2739558A-M.jpg",
        "year": 2006,
        "category": "Fantasia urbana",
        "cover": "https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg",
        "synopsis": (
            "Um grupo de vigaristas de Camorr enfrenta uma disputa "
            "perigosa entre forças criminosas."
        ),
    },
    {
        "rank": 8,
        "title": "Jade City",
        "author": "Fonda Lee",
        "author_image": "https://covers.openlibrary.org/a/olid/OL7298028A-M.jpg",
        "year": 2017,
        "category": "Fantasia urbana",
        "cover": "https://covers.openlibrary.org/b/isbn/9780316440865-L.jpg",
        "synopsis": (
            "Dois clãs disputam influência em uma ilha onde o jade "
            "concede habilidades extraordinárias."
        ),
    },
    {
        "rank": 9,
        "title": "The Goblin Emperor",
        "author": "Katherine Addison",
        "author_image": "https://covers.openlibrary.org/a/olid/OL7072400A-M.jpg",
        "year": 2014,
        "category": "Fantasia urbana",
        "cover": "https://covers.openlibrary.org/b/isbn/9780765365682-L.jpg",
        "synopsis": (
            "Maia herda o trono e tenta governar com compaixão em meio "
            "às intrigas de uma corte desconhecida."
        ),
    },
    {
        "rank": 10,
        "title": "Piranesi",
        "author": "Susanna Clarke",
        "author_image": "https://covers.openlibrary.org/a/olid/OL1397926A-M.jpg",
        "year": 2020,
        "category": "Fantasia urbana",
        "cover": "https://covers.openlibrary.org/b/isbn/9781635575637-L.jpg",
        "synopsis": (
            "Em uma casa infinita de salões e marés, Piranesi encontra "
            "pistas que desafiam tudo o que sabe."
        ),
    },
    {
        "rank": 11,
        "title": "A Memory Called Empire",
        "author": "Arkady Martine",
        "author_image": "https://covers.openlibrary.org/a/olid/OL7478038A-M.jpg",
        "year": 2019,
        "category": "Ficção científica",
        "cover": "https://covers.openlibrary.org/b/isbn/9781250186430-L.jpg",
        "synopsis": (
            "Uma diplomata investiga a morte de seu antecessor enquanto "
            "protege sua pequena estação espacial."
        ),
    },
    {
        "rank": 12,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "author_image": "https://covers.openlibrary.org/a/olid/OL23919A-M.jpg",
        "year": 1937,
        "category": "Fantasia épica",
        "cover": "https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg",
        "synopsis": (
            "Bilbo Bolseiro parte com um grupo de anões para recuperar "
            "um tesouro guardado por um dragão."
        ),
    },
]


def analyze_statistics(books=BOOKS):
    """Conta categorias, autores recorrentes e distribuição por década."""
    category_counts = Counter(book["category"] for book in books)
    author_counts = Counter(book["author"] for book in books)
    decade_counts = Counter((book["year"] // 10) * 10 for book in books)

    return {
        "total_books": len(books),
        "category_counts": dict(sorted(category_counts.items())),
        "most_frequent_authors": [
            {"author": author, "count": count}
            for author, count in sorted(
                author_counts.items(), key=lambda item: (-item[1], item[0])
            )
            if count > 1
        ],
        "decade_distribution": {
            f"{decade}s": count for decade, count in sorted(decade_counts.items())
        },
    }


if __name__ == "__main__":
    print(json.dumps(analyze_statistics(), ensure_ascii=False, indent=2))
