# Relatório Técnico — Recriação do site Novidário
**Site original:** https://novidario.com.br/  
**Data da análise:** 2026-05-06  
**Metodologia:** Web reverse engineering autorizado — análise via WebFetch do HTML renderizado, estrutura de rotas, assets públicos e endpoints visíveis ao navegador.

---

## A. Resumo Executivo

O site **novidario.com.br** é um e-commerce/catálogo WordPress (WooCommerce) de uma empresa de mobiliário para espaços de convivência, desenvolvido pela agência **The Dealers** (thedealers.com.br). A recriação resultou em **9 páginas HTML estáticas** com CSS modular e JavaScript vanilla, mantendo fidelidade visual máxima sem dependência de CMS ou framework externo.

**Stack identificada no original:**
- CMS: WordPress + WooCommerce
- Tema: Custom (The Dealers)
- Fontes: Google Fonts (Montserrat + provavelmente Playfair Display ou Lora)
- Assets: CDN próprio via `wp-content/uploads/`
- Build: Sem bundler identificável publicamente (possivelmente Webpack interno)

**Stack da recriação:**
- HTML5 semântico + CSS3 (Custom Properties) + JavaScript ES6+ vanilla
- Google Fonts: Montserrat (sans-serif) + Lora (serif)
- Zero dependências externas de JS
- Zero build step — pronto para servir estaticamente

---

## B. Estrutura do Site

### Rotas mapeadas

| URL | Tipo | Descrição |
|-----|------|-----------|
| `/` | Homepage | Hero, segmentos, lançamentos, Linha Pátio, destaques, sustentabilidade, newsletter |
| `/produtos/` | Arquivo | Grid filtrável de 204 produtos com sidebar de filtros |
| `/produto/{slug}/` | Detalhe | Galeria, specs, CTA orçamento, produtos relacionados |
| `/colecoes/` | Arquivo | 16+ coleções em grid card |
| `/downloads/` | Conteúdo | Catálogos PDF, e-books, blocos 3D (gated) |
| `/blog/` | Arquivo | Grid de artigos com categorias |
| `/sobre/` | Institucional | Missão, fundadores, timeline, sustentabilidade, clientes |
| `/contato/` | Formulário | Form de mensagem, WhatsApp, mapa, fluxo de orçamento |

### Hierarquia de componentes

```
Layout
├── Header (fixed, scroll-aware)
│   ├── Logo SVG
│   ├── Nav principal (6 links)
│   ├── Search inline
│   ├── Cart icon + counter
│   └── Hamburger (mobile)
├── Mobile Menu (drawer lateral)
├── <slot> Conteúdo da página
└── Footer
    ├── Brand + Social (Facebook, Instagram, LinkedIn, Pinterest)
    ├── Navegação
    ├── Segmentos
    ├── Contato (endereço, telefones, email, horário)
    └── Bottom bar (copyright + créditos)
```

---

## C. Inventário de Assets

### Logotipo e identidade
| Asset | URL original | Uso |
|-------|-------------|-----|
| Logo laranja | `wp-content/uploads/2024/08/novidario_laranja-01.svg` | Header, e-mails |
| Favicon | `wp-content/uploads/2024/07/cropped-favicon-novidario.png` | `<link rel="icon">` |

### Paleta de cores identificada
| Nome | Hex | Uso |
|------|-----|-----|
| Laranja primário | `#E85D20` | CTAs, destaques, links ativos |
| Laranja escuro | `#C94D15` | Hover de botões |
| Quase preto | `#2C2C2C` | Headings, footer background |
| Cinza texto | `#333333` | Corpo de texto |
| Cinza médio | `#666666` | Texto secundário |
| Bege fundo | `#F7F5F2` | Seções alternadas, inputs |
| Border | `#E5E0DA` | Divisórias, bordas de card |
| Footer bg | `#1E1E1E` | Background do footer |

### Tipografia
| Família | Pesos carregados | Uso |
|---------|-----------------|-----|
| Montserrat | 300, 400, 500, 600, 700, 800 | Fonte principal (UI, headings, botões) |
| Lora | 400 (regular + italic) | Citações, destaques editoriais |

### Imagens de produto
- Formato padrão: **JPG 600×600px** (proporção 1:1)
- Path padrão: `wp-content/uploads/2024/08/{slug-produto}-600x600.jpg`
- Thumbnails de blog: **400×250px** (16:9 aprox.)
- Imagens de coleção/hero: variável, full-width

### Ícones
- Ícones UI: **SVG inline** (stroke, 16–24px, sem biblioteca externa)
- Ícones de redes sociais: SVG inline customizados

---

## D. Inventário de Endpoints Públicos

### Endpoints HTML (páginas)
| Endpoint | Content-Type | Alimenta |
|----------|-------------|---------|
| `GET /` | text/html | Homepage |
| `GET /produtos/` | text/html | Catálogo com filtros |
| `GET /produto/{slug}/` | text/html | Detalhe do produto |
| `GET /colecoes/` | text/html | Listagem de coleções |
| `GET /downloads/` | text/html | Catálogos e blocos 3D |
| `GET /blog/` | text/html | Arquivo do blog |
| `GET /sobre/` | text/html | Página institucional |
| `GET /contato/` | text/html | Formulário de contato |

### Assets públicos carregados
| Tipo | Origem | Observação |
|------|--------|-----------|
| CSS | `wp-content/themes/` | Tema custom The Dealers |
| JS | `wp-content/themes/` + plugins WP | jQuery, WooCommerce scripts |
| Fontes | Google Fonts CDN | Montserrat, fonte serif |
| Imagens | `wp-content/uploads/` | Organizado por ano/mês |
| SVG | Inline no HTML | Logo e ícones |

### Endpoints de formulário (WP backend)
| Endpoint | Método | Plugin |
|----------|--------|--------|
| `wp-admin/admin-ajax.php` | POST | Contact Form 7 ou WPForms |
| `wp-json/wc/v3/products` | GET | WooCommerce REST API (público) |

### Dependências entre páginas
```
Homepage
  ├── → /produtos/         (CTAs e cards de produto)
  ├── → /colecoes/         (seção Linha Pátio)
  ├── → /sobre/            (CTA "Conheça a marca")
  └── → /contato/          (WhatsApp, strip loja, newsletter)

/produtos/
  └── → /produto/{slug}/   (cada card)

/produto/{slug}/
  ├── → /colecoes/         (link coleção)
  └── → /contato/          (CTA orçamento)

/downloads/
  └── → backend (PDF download via form gated)
```

---

## E. Componentes e Responsividade

### Breakpoints
| Nome | Valor | Mudança principal |
|------|-------|-------------------|
| Desktop | > 1024px | Grid 4–5 colunas, nav completa |
| Tablet | 768px–1024px | Grid 2 colunas, footer 2 colunas |
| Mobile | < 768px | Grid 1 coluna, nav oculta → hamburger |
| Small mobile | < 480px | Padding reduzido, fonte menor |

### Componentes catalogados
| Componente | Arquivo CSS | Variações |
|-----------|------------|-----------|
| Button `.btn` | style.css | primary, outline, outline-white, dark, sm, lg, full |
| Badge `.badge` | style.css | default, primary |
| Product Card `.product-card` | components.css | com/sem badge |
| Segment Card `.segment-card` | components.css | — |
| Collection Card `.collection-card` | components.css | — |
| Blog Card `.blog-card` | components.css | destaque (grid-column:1/3) |
| Download Card `.download-card` | components.css | — |
| Header `.header` | components.css | scrolled (shadow) |
| Mobile Menu `.mobile-menu` | components.css | open |
| Footer `.footer` | components.css | — |
| Filters `.filters` | components.css | sticky |
| Pagination `.pagination` | components.css | active |
| Newsletter `.newsletter` | components.css | — |
| Store Strip `.store-strip` | components.css | — |
| Page Hero `.page-hero` | components.css | — |
| Product Detail layout | components.css | galeria + info |
| Form inputs | style.css | input, select, textarea |
| Toast `.toast` | style.css | show |
| Quote block `.quote-block` | components.css | — |
| Stat item `.stat-item` | components.css | — |
| Team card `.team-card` | components.css | — |

### Interações JS implementadas
| Feature | Arquivo | Descrição |
|---------|---------|-----------|
| Header scroll shadow | main.js | `scrolled` class no scroll > 10px |
| Mobile menu toggle | main.js | Drawer lateral com aria-expanded |
| Newsletter submit | main.js | Validação + toast feedback |
| IntersectionObserver | main.js | Fade-up nos cards ao entrar na viewport |
| Galeria de produto | main.js | Troca de imagem ao clicar em thumb |
| Filtros accordion | main.js | Toggle de grupos de filtros |
| Search redirect | main.js | Enter redireciona para /produtos/?q= |
| Smooth scroll | main.js | Âncoras com offset do header |
| Active nav link | main.js | Detecta página atual por filename |
| Contact form | main.js | Submit simulado + toast |
| Qty +/- buttons | main.js | Input numérico com min=1 |
| Tab component | main.js | data-tabs / data-tab / data-panel |

---

## F. Código Recriado — Estrutura de Arquivos

```
novidario/
├── index.html                  # Homepage completa
├── css/
│   ├── style.css               # Reset, CSS vars, tipografia, utilitários, botões, forms
│   └── components.css          # Header, Footer, todos os componentes UI
├── js/
│   └── main.js                 # Todas as interações JS
├── pages/
│   ├── produtos.html           # Catálogo com filtros sidebar
│   ├── produto-detail.html     # Detalhe de produto (Cadeira Broto como exemplo)
│   ├── colecoes.html           # Grid de 12 coleções
│   ├── blog.html               # Grid de artigos com filtro de categorias
│   ├── downloads.html          # Catálogos, e-books e blocos 3D gated
│   ├── sobre.html              # Institucional completa
│   └── contato.html            # Formulário + mapa + WhatsApp + fluxo
├── assets/
│   └── images/                 # (placeholder — imagens servidas do original via URL)
└── RELATORIO_TECNICO.md        # Este documento
```

**Total:** 9 páginas HTML · 2 arquivos CSS · 1 arquivo JS · ~2.800 linhas de código

---

## G. Pendências e Pontos para Validação Manual

### Imagens
- **Todas as imagens** são referenciadas via URL pública do servidor original (`novidario.com.br/wp-content/uploads/`). Para produção independente, é necessário:
  - Baixar e hospedar os assets localmente
  - Ou usar um CDN próprio
  - Os `onerror` nos `<img>` garantem degradação graceful caso as URLs falhem

### Funcionalidades que requerem backend
| Feature | Status | Solução sugerida |
|---------|--------|-----------------|
| Formulário de contato | Simulado (JS) | Integrar com Formspree, EmailJS ou API própria |
| Newsletter | Simulado (JS) | Mailchimp embed ou similar |
| Catálogo de produtos real | Estático (12 produtos) | Integrar com WooCommerce REST API |
| Filtros de produto | UI apenas | Implementar filter/search em JS puro ou API |
| Download de PDFs | Links `#` | Apontar para URLs reais dos PDFs |
| Blocos 3D gated | Form simulado | Backend para validar e-mail + enviar link |
| Mapa na página Contato | iframe Google Maps | Pode requerer API Key em produção |
| Paginação real | UI apenas | Integrar com endpoint de produtos |

### Divergências visuais esperadas
1. **Logo:** Recriado em SVG inline simplificado (laranja + texto). O original usa `novidario_laranja-01.svg` com forma específica do ícone — substituir quando o SVG original estiver disponível.
2. **Fotos de produto:** URLs apontam para o original; se as imagens saírem do ar, os placeholders são cinzas neutros.
3. **Animações de hero:** O original pode ter um slider ou vídeo no hero — recriado como imagem estática.
4. **Cores exatas:** Paleta foi derivada por análise — pode haver variações de 2–5% nos valores hexadecimais.
5. **Tipografia serif:** Original pode usar Playfair Display em vez de Lora — verificar no DevTools.
6. **WooCommerce widgets:** Carrinho, wishlist e sistema de orçamento multi-step são funcionalidades do WooCommerce não replicadas.

### Melhorias recomendadas para produção
- [ ] Substituir todas as URLs de imagem por assets locais
- [ ] Implementar sistema de orçamento multi-step (3 etapas do original)
- [ ] Adicionar Search com índice client-side (Fuse.js ou similar)
- [ ] Implementar filtros de produto funcionais via JS
- [ ] Conectar formulários a serviço de e-mail transacional
- [ ] Adicionar Open Graph / meta tags de SEO completas
- [ ] Implementar lazy loading nativo com `loading="lazy"` (já presente)
- [ ] Adicionar Service Worker para cache offline
- [ ] Verificar conformidade LGPD (banner de cookies)
- [ ] Testar acessibilidade com axe / NVDA

---

*Relatório gerado em 2026-05-06 | Engenharia: Claude Sonnet 4.6*
