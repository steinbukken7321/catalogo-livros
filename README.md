# Entrelinhas — catálogo de livros

Aplicação web responsiva para explorar uma seleção de livros populares de fantasia e ficção científica, com filtros por categoria, busca por título ou autor e detalhes interativos em cada capa.

## Como executar

Não há dependências de JavaScript nem etapa de build. Abra `index.html` diretamente no navegador ou sirva a pasta com um servidor HTTP local:

```bash
python -m http.server 8000
```

Depois, acesse <http://localhost:8000>.

As capas e fotos dos autores são carregadas do Open Library; é necessária conexão à internet para exibir essas imagens. O restante da aplicação funciona sem servidor ou serviços externos.

## Análise estatística

O script `stats.py` usa apenas a biblioteca padrão do Python. Para imprimir as contagens por categoria, os autores que aparecem mais de uma vez e a distribuição por década:

```bash
python stats.py
```

Também é possível importar `BOOKS` e `analyze_statistics` de `stats.py` para analisar os dados em outro script.

## Sobre a seleção

O catálogo reúne 12 obras associadas à comunidade r/Fantasy. Os números exibidos nos cards identificam a ordem desta seleção demonstrativa; não representam uma classificação oficial, uma votação única ou um ranking atualizado do Reddit. As sinopses foram redigidas para este catálogo. A lista do JavaScript e a lista do Python mantêm os mesmos títulos, autores, anos, categorias e posições.
