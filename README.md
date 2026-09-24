# Visual Street Art Tattoo 2.0

Site do **Street Art Tattoo** — estúdio de tatuagem e body piercing em Santa Efigênia, Belo Horizonte.

Site estático (HTML, CSS e JavaScript puros), publicado com GitHub Pages.

## Páginas

- `index.html` — Home (hero, studio, manifesto, carrossel de artistas, piercing, eventos, contato)
- `thales.html` — Thales: perfurações, valores e catálogo de joias
- `artista.html?a=<nome>` — perfil de artista (ex.: `artista.html?a=victor`)

## Configurar

- **WhatsApp:** preencha `WHATSAPP_NUMBER` em `js/main.js` (só dígitos, com DDI e DDD, ex.: `5531999999999`). Enquanto estiver vazio, os botões de WhatsApp levam ao rodapé.
- **Artistas:** a lista fica em `ARTISTS`, no mesmo arquivo.
- **Cores e fontes:** variáveis no topo de `css/style.css`.

## Rodar localmente

Abra `index.html` no navegador, ou sirva a pasta com qualquer servidor estático (ex.: `npx serve`).
