# ShelfSphere

Uma estante digital multigênero para explorar 100 obras de fantasia, ficção científica, distopia, grimdark, mistério e suspense, terror, ficção histórica, ficção literária, realismo mágico e aventura juvenil.

## Executar

O catálogo carrega a base local `books.json`, portanto abra a pasta por um servidor HTTP local (em vez de abrir o HTML diretamente):

```bash
python -m http.server 8000
```

Acesse <http://localhost:8000>. Não são necessárias dependências JavaScript.

## Funcionalidades

- Busca por título, autor ou gênero e filtros por gênero.
- Capas correspondentes são buscadas automaticamente quando o card se aproxima da tela, sem exigir hover. Uma ilustração gerada pela aplicação aparece enquanto a capa carrega ou quando não está disponível.
- Cada card mostra primeiro o nome do autor e, logo abaixo, o título da obra.
- HUD flutuante com sinopse original, ano, gênero e retrato do autor carregado pela API da Wikipedia. Se não houver retrato disponível ou a API estiver indisponível, as iniciais do autor permanecem visíveis.
- Análise por gênero, década e autores recorrentes com `python stats.py`.

## Seleção e fontes

O acervo é uma seleção editorial independente, organizada para oferecer diversidade de gêneros. Não reproduz nem representa o Top 100 oficial do r/Fantasy; os números nos cards indicam apenas a ordem desta seleção, não uma classificação de popularidade. As sinopses foram redigidas para este projeto.

Os metadados bibliográficos foram organizados para fins informativos. Capas e retratos dependem de conexão à internet e dos serviços Open Library e Wikipedia. A interface e a base de dados continuam utilizáveis sem esses serviços.
