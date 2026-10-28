"""Estatísticas do acervo editorial multigênero da ShelfSphere."""

from collections import Counter
import json
from pathlib import Path


DATA_FILE = Path(__file__).with_name("books.json")

with DATA_FILE.open(encoding="utf-8") as catalog_file:
    BOOKS = [
        {"rank": rank, **book}
        for rank, book in enumerate(json.load(catalog_file), start=1)
    ]


def analyze_statistics(books=BOOKS):
    """Analisa obras por gênero, autores recorrentes e década de publicação."""
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
            )[:10]
        ],
        "decade_distribution": {
            f"{decade}s": count for decade, count in sorted(decade_counts.items())
        },
        "ranking_note": (
            "A numeração indica a ordem da seleção editorial; não é ranking oficial."
        ),
    }


if __name__ == "__main__":
    print(json.dumps(analyze_statistics(), ensure_ascii=False, indent=2))
