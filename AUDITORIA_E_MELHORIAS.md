# Auditoria e Melhorias — Mockup Novidário
**Data:** 2026-05-06  
**Escopo:** `/site` (9 arquivos HTML + CSS + JS) e `/instagram` (1 HTML monolítico ~6MB)

---

## 1. O que foi encontrado

### /site — Problemas identificados

| Problema | Severidade | Arquivo(s) |
|----------|-----------|-----------|
| Filtros completamente decorativos — checkboxes sem `data-*`, JS sem lógica de filtro | 🔴 Crítico | `produtos.html`, `main.js` |
| `onerror` aponta para `assets/images/placeholder-product.svg` que não existe | 🔴 Crítico | `index.html` (9× referências) |
| `?segmento=xxx` e `?q=xxx` na URL nunca são lidos — link inativo | 🔴 Crítico | `main.js`, `produtos.html` |
| Busca redireciona para `pages/produtos.html?q=` mas JS não lê o parâmetro | 🔴 Crítico | `main.js` |
| Zero cores por segmento — todos os 5 segmentos usam só `--color-primary: #E85D20` | 🟠 Alto | `style.css`, todos os HTML |
| Nenhuma barra de acesso rápido às 5 áreas no header | 🟠 Alto | todos os HTML |
| Cards de produto sem `data-area`, `data-material`, `data-colecao`, `data-tipo` | 🟠 Alto | `produtos.html`, `index.html` |
| `segment-card`: hover usa laranja fixo para todos os segmentos | 🟡 Médio | `components.css` |
| `.page-content { margin-top: var(--header-height) }` — não considerava barra de áreas | 🟡 Médio | `components.css` |
| Filtro accordion no JS usava `options.style.display === 'none'` — frágil | 🟡 Médio | `main.js` |

### /instagram — Problemas identificados

| Problema | Severidade |
|----------|-----------|
| 4 de 5 destaques com `cta: false` — nenhum leva ao site | 🔴 Crítico |
| Destaque "Escola" ≠ "Educacional", "Externo" ≠ "Área Externa", "Restaurante" ≠ "Alimentação" — nomes inconsistentes | 🟠 Alto |
| Faltava o 6º destaque "Interiores" — segmento existente no site sem representação no Instagram | 🟠 Alto |
| Cores dos destaques não batiam com o design system do site (ex: escola="#7b2cbf" vs --seg-edu=#1565C0) | 🟡 Médio |
| CTA genérico apontava para `linktr.ee/novidarios` em vez de páginas específicas por segmento | 🟡 Médio |

---

## 2. O que foi corrigido

### CSS — `style.css`
- ✅ Adicionado sistema de tokens por segmento: `--seg-ext`, `--seg-edu`, `--seg-corp`, `--seg-food`, `--seg-int` (cor base, dark, tint)
- ✅ Nova variável `--areas-bar-height: 40px` e `--header-total: 120px` para calcular offset correto
- ✅ Classes `.badge--ext|edu|corp|food|int` para badges coloridos por área
- ✅ Seletor `[data-area]::before` — faixa de 3px colorida no topo de cada card por área
- ✅ `.product-card.is-hidden { display: none }` — estado de filtrado
- ✅ `.no-results` e `.no-results.show` — estado de sem resultados
- ✅ `.filter-chip` — chip dismissível com ×
- ✅ `.seg-pill` — pill de segmento com variantes de cor e estado `.active`
- ✅ `.active-filters` — container live de chips de filtros ativos

### CSS — `components.css`
- ✅ `.areas-bar` + `.areas-bar__inner` — barra fixa abaixo do header
- ✅ `.area-link` com `--link-color` por variante — underline ativo da cor do segmento
- ✅ `.area-link--ext|edu|corp|food|int` — 5 variantes de cor
- ✅ `.area-link__dot` — ponto colorido visual de identidade
- ✅ `.page-content { margin-top: var(--header-total) }` — offset correto (80+40px)
- ✅ `.segment-card[data-seg="..."]` — hover com gradiente da cor do segmento (não mais laranja fixo)
- ✅ `.segment-card__tag` — chip colorido no topo esquerdo de cada card de segmento
- ✅ `.segment-card__arrow` usa `--seg-arrow-color` variável por segmento

### JS — `main.js` (reescrito)
- ✅ `fixBrokenImages()` — substitui todos os `onerror` inline por listeners seguros com placeholder SVG data-URI (sem dependência de arquivo externo)
- ✅ Filtros reais: lê `data-area`, `data-material`, `data-colecao`, `data-tipo` dos cards
- ✅ Lógica: OR dentro de cada grupo, AND entre grupos
- ✅ Lê `?segmento=` da URL ao carregar — pré-seleciona área e pill correspondente
- ✅ Lê `?q=` da URL ao carregar — popula campo de busca e filtra por nome
- ✅ Chips de filtros ativos com dismiss individual
- ✅ Botão "Limpar filtros" aparece só quando há filtros ativos
- ✅ Contador de resultados atualizado em tempo real
- ✅ Ordenação A–Z / Z–A funcional (re-ordena DOM)
- ✅ Busca por nome de produto em tempo real (input event)
- ✅ Seg-pills sincronizados com checkboxes do sidebar
- ✅ Smooth scroll com offset correto do header total
- ✅ `markActiveArea()` — destaca link correto na areas-bar conforme `?segmento=` atual

### HTML — `produtos.html` (reescrito)
- ✅ Barra `.areas-bar` com os 5 segmentos e links para `?segmento=`
- ✅ Pills de área acima do grid (`seg-pill` + `data-area`)
- ✅ Filtros com `data-filter="area|material|colecao|tipo"` e `value=` em cada checkbox
- ✅ `id="sort-select"` no select de ordenação
- ✅ `id="products-count"`, `id="active-filters"`, `id="clear-filters"`, `id="no-results"`
- ✅ Todos os 12 cards com `data-area`, `data-material`, `data-colecao`, `data-tipo`
- ✅ Badges de segmento coloridos (`badge--edu`, `badge--ext`, etc.)
- ✅ Estado `.no-results` com botão de limpar

### HTML — `index.html`
- ✅ Barra `.areas-bar` adicionada (links para `pages/produtos.html?segmento=`)
- ✅ `data-seg="area-externa|educacional|corporativo|alimentacao|interiores"` em cada segment-card
- ✅ `<span class="segment-card__tag">` adicionado em cada card
- ✅ `onerror` inline removidos dos segment-cards (JS cuida do fallback)

### HTML — `blog.html`, `colecoes.html`, `downloads.html`, `sobre.html`, `contato.html`
- ✅ Barra `.areas-bar` inserida em todas as 5 páginas internas

### /instagram — `index-insta.html`
- ✅ Array `HIGHLIGHTS` atualizado: 6 destaques (era 5 — faltava Interiores)
- ✅ Nomes alinhados com o site: "Educacional" (era "Escola"), "Área Externa" (era "Externo"), "Alimentação" (era "Restaurante")
- ✅ Cores alinhadas com design system: `#1565C0` edu, `#37474F` corp, `#2E7D32` ext, `#BF360C` food, `#6A1B9A` int, `#E85D20` comece
- ✅ Todo story de segmento tem `cta: true` com URL específica (era `cta: false` em todos)
- ✅ CTAs apontam para `../site/pages/produtos.html?segmento=educacional` etc.

---

## 3. Melhorias nos filtros

| Antes | Depois |
|-------|--------|
| Checkboxes sem `data-*` — decorativos | `data-filter="area"` + `value="educacional"` — funcionais |
| Nenhum JS de filtro | Engine completo: OR intra-grupo, AND entre grupos |
| `?segmento=` ignorado | Lido na inicialização, pré-seleciona filtro e pill |
| `?q=` ignorado | Lido na inicialização, popula busca e filtra por nome |
| Nenhum feedback visual | Chips dismissíveis + contador de resultados + estado "sem resultados" |
| Limpar filtros: inativo | Aparece só com filtros ativos, limpa tudo incluindo URL state |
| Ordenação: visual só | Reordena cards na DOM realmente |
| Segmentos como itens de "Categorias" genéricas | Pills visuais + sidebar "Área de uso" + barra de áreas no header |

---

## 4. Mudanças de cores e segmentação

| Antes | Depois |
|-------|--------|
| 1 cor para tudo: `#E85D20` | 5 cores de segmento + primário laranja da marca |
| Hover dos segment-cards: laranja fixo | Hover com gradiente da cor do segmento |
| Badges: cinza genérico para todos | `.badge--edu` azul, `.badge--ext` verde, `.badge--corp` slate, `.badge--food` terra, `.badge--int` roxo |
| Cards de produto: sem indicador de área | Faixa colorida de 3px no topo, cor = área do produto |
| Instagram destaques: azul/roxo genérico | Cores do design system do site |
| Nomes de segmentos inconsistentes (site vs Instagram) | Padronizados em ambos |

---

## 5. Assets corrigidos

| Asset | Problema | Correção |
|-------|---------|---------|
| `assets/images/placeholder-product.svg` | Não existia (9× referências em index.html) | `fixBrokenImages()` no JS substitui por data-URI SVG inline |
| `assets/images/hero-placeholder.svg` | Não existia (1× referência) | Idem — tratado pelo mesmo listener |
| Imagens de segmento com `onerror` inline de cor | Funcionavam mas perdiam fallback visual | Removidos — JS cuida de forma centralizada |

---

## 6. Pendências

| Item | Motivo | Sugestão |
|------|--------|---------|
| Imagens ainda são URLs do novidario.com.br | Requerem download autorizado | Baixar e hospedar localmente em `/assets/images/` |
| Paginação do catálogo | Decorativa — backend necessário | Implementar filtro client-side ou integrar API |
| Mais produtos com `data-*` | Só 12 cards de demonstração | Expandir para todos os 204 com dados reais |
| Busca avançada (sinônimos, typo-tolerance) | Requer Fuse.js ou similar | Adicionar `fuse.min.js` ao projeto |
| `aria-pressed` nos seg-pills | Atributo presente mas não atualizado pelo JS | Adicionar `pill.setAttribute('aria-pressed', String(isActive))` no toggle |
| Instagram: stories de "Interiores" usam img `comeceaqui` | Falta imagem real do segmento | Substituir quando asset estiver disponível |
| Responsivo mobile da barra de áreas | Funciona com scroll horizontal, mas pode ser melhorado | Avaliar dropdown em mobile |
