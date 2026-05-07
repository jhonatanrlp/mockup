/* ============================================================
   NOVIDÁRIO — Catálogo de Produtos
   Dados reais extraídos de novidario.com.br (maio 2026)
   Base: /wp-content/uploads/YYYY/MM/arquivo-600x600.jpg
   ============================================================ */

const BASE = 'https://novidario.com.br/wp-content/uploads/';
const SITE = 'https://novidario.com.br/produtos/';

/**
 * Cada produto:
 * id          — slug do produto (= URL slug no site)
 * nome        — nome exibido
 * img         — URL completa da imagem 600×600
 * area        — escolar | area-externa | corporativo | alimentacao | residencial
 * tipo        — Cadeira | Mesa | Banco | Poltrona | Banqueta | Sofá | Chaise | Estante | Mesa de apoio | Carrinho
 * material    — Madeira | Alumínio | Aço | Estofado | Reciclado | Corda | Plástico (pode ser múltiplo, sep por vírgula)
 * colecao     — nome da coleção
 * link        — URL do produto no site real
 * lancamento  — true/false
 * destaque    — true/false
 */
const CATALOGO = [

  /* ══════════════════════════════════════════
     ÁREA EXTERNA
  ══════════════════════════════════════════ */
  {
    id: 'cadeira-asa',
    nome: 'Cadeira Asa',
    img: BASE + '2026/01/Cadeira-Asa_Still_Novidade-600x600.jpg',
    area: 'area-externa', tipo: 'Cadeira', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/assentos-para-area-externa/cadeira-asa/',
    lancamento: true, destaque: true,
  },
  {
    id: 'cadeira-com-braco-asa',
    nome: 'Cadeira com Braço Asa',
    img: BASE + '2026/01/Cadeira-com-braco-Asa_Still_Site_Novidade-600x600.jpg',
    area: 'area-externa', tipo: 'Cadeira', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/assentos-para-area-externa/cadeira-com-braco-asa/',
    lancamento: true, destaque: false,
  },
  {
    id: 'poltrona-asa',
    nome: 'Poltrona Asa',
    img: BASE + '2026/01/Poltrona-Asa_Still_Site_Novidade-600x600.jpg',
    area: 'area-externa', tipo: 'Poltrona', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/assentos-para-area-externa/poltrona-asa/',
    lancamento: true, destaque: true,
  },
  {
    id: 'cadeira-voa',
    nome: 'Cadeira Voa',
    img: BASE + '2026/01/Banqueta-sem-encosto-Voa_Still_Site_Novidade-1-600x600.jpg',
    area: 'area-externa', tipo: 'Cadeira', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/assentos-para-area-externa/cadeira-voa/',
    lancamento: true, destaque: false,
  },
  {
    id: 'banqueta-voa',
    nome: 'Banqueta Voa',
    img: BASE + '2026/01/Banqueta-sem-encosto-Voa_Still_Site_Novidade-600x600.jpg',
    area: 'area-externa', tipo: 'Banqueta', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/assentos-para-area-externa/banqueta-voa/',
    lancamento: false, destaque: false,
  },
  {
    id: 'banqueta-com-encosto-voa',
    nome: 'Banqueta com Encosto Voa',
    img: BASE + '2026/01/Banqueta-Voa_Still_Site_Novidario-600x600.jpg',
    area: 'area-externa', tipo: 'Banqueta', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/assentos-para-area-externa/banqueta-com-encosto-voa/',
    lancamento: false, destaque: false,
  },
  {
    id: 'mesa-redonda-voa',
    nome: 'Mesa Redonda Voa',
    img: BASE + '2026/01/Mesa-redonda-Voa_Still_Site_Novidade-600x600.jpg',
    area: 'area-externa', tipo: 'Mesa', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/mesas-para-area-externa/mesa-redonda-voa/',
    lancamento: true, destaque: true,
  },
  {
    id: 'mesa-quadrada-voa',
    nome: 'Mesa Quadrada Voa',
    img: BASE + '2026/01/Mesa-quadrada-Voa_Still_Site_Novidade-600x600.jpg',
    area: 'area-externa', tipo: 'Mesa', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/mesas-para-area-externa/mesa-quadrada-voa/',
    lancamento: true, destaque: false,
  },
  {
    id: 'mesa-retangular-voa',
    nome: 'Mesa Retangular Voa',
    img: BASE + '2026/01/Mesa-retangular-Voa_Still_Site_Novidade-600x600.jpg',
    area: 'area-externa', tipo: 'Mesa', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/mesas-para-area-externa/mesa-retangular-voa/',
    lancamento: true, destaque: false,
  },
  {
    id: 'banco-coletivo-curvo-cipo',
    nome: 'Banco Coletivo Curvo Cipó',
    img: BASE + '2024/09/banco-coletivo-curvo-cipo-chamada-600x600.jpg',
    area: 'area-externa', tipo: 'Banco', material: 'Aço,Madeira',
    colecao: 'Cipó', link: SITE + 'area-externa/assentos-para-area-externa/banco-coletivo-curvo-cipo/',
    lancamento: false, destaque: true,
  },
  {
    id: 'banco-coletivo-cipo',
    nome: 'Banco Coletivo Cipó',
    img: BASE + '2024/09/banco-coletivo-cipo-chamada-600x600.jpg',
    area: 'area-externa', tipo: 'Banco', material: 'Aço,Madeira',
    colecao: 'Cipó', link: SITE + 'area-externa/assentos-para-area-externa/banco-coletivo-cipo/',
    lancamento: false, destaque: false,
  },
  {
    id: 'banco-coletivo-com-encosto-cipo',
    nome: 'Banco Coletivo com Encosto Cipó',
    img: BASE + '2024/09/banco-coletivo-com-encosto-cipo-chamada-600x600.jpg',
    area: 'area-externa', tipo: 'Banco', material: 'Aço,Madeira',
    colecao: 'Cipó', link: SITE + 'area-externa/assentos-para-area-externa/banco-coletivo-com-encosto-cipo/',
    lancamento: false, destaque: false,
  },
  {
    id: 'banco-cipo',
    nome: 'Banco Cipó',
    img: BASE + '2025/04/min_Banco-Individual-Cipo-600x600.jpg',
    area: 'area-externa', tipo: 'Banco', material: 'Aço,Madeira',
    colecao: 'Cipó', link: SITE + 'area-externa/assentos-para-area-externa/banco-cipo/',
    lancamento: true, destaque: false,
  },
  {
    id: 'poltrona-cipo',
    nome: 'Poltrona Cipó',
    img: BASE + '2024/09/Poltrona-Cipo-chamada-600x600.jpg',
    area: 'area-externa', tipo: 'Poltrona', material: 'Aço,Madeira',
    colecao: 'Cipó', link: SITE + 'area-externa/assentos-para-area-externa/poltrona-cipo/',
    lancamento: false, destaque: false,
  },
  {
    id: 'cadeira-patio',
    nome: 'Cadeira Pátio',
    img: BASE + '2024/09/cadeira-patio-miniatura-600x600.jpeg',
    area: 'area-externa', tipo: 'Cadeira', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/assentos-para-area-externa/cadeira-patio/',
    lancamento: false, destaque: true,
  },
  {
    id: 'cadeira-com-braco-patio',
    nome: 'Cadeira com Braço Pátio',
    img: BASE + '2024/09/cadeira-com-braco-patio-miniatura-600x600.jpeg',
    area: 'area-externa', tipo: 'Cadeira', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/assentos-para-area-externa/cadeira-com-braco-patio/',
    lancamento: false, destaque: false,
  },
  {
    id: 'sofa-patio',
    nome: 'Sofá Pátio',
    img: BASE + '2025/05/miniatura_sofa-patio_lancamento-600x600.jpg',
    area: 'area-externa', tipo: 'Sofá', material: 'Alumínio,Estofado',
    colecao: 'Pátio', link: SITE + 'area-externa/assentos-para-area-externa/sofa-patio/',
    lancamento: true, destaque: false,
  },
  {
    id: 'poltrona-patio',
    nome: 'Poltrona Pátio',
    img: BASE + '2024/10/poltrona-patio-miniatura-600x600.jpg',
    area: 'area-externa', tipo: 'Poltrona', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/assentos-para-area-externa/poltrona-patio/',
    lancamento: false, destaque: false,
  },
  {
    id: 'chaise-patio',
    nome: 'Chaise Pátio',
    img: BASE + '2024/09/Chaise-Patio-miniatura-600x600.jpg',
    area: 'area-externa', tipo: 'Chaise', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/assentos-para-area-externa/chaise-patio/',
    lancamento: false, destaque: false,
  },
  {
    id: 'mesa-redonda-patio-100',
    nome: 'Mesa Redonda Pátio 100',
    img: BASE + '2025/05/mesa-redonda-patio-100_miniatura_lancamento-600x600.jpg',
    area: 'area-externa', tipo: 'Mesa', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/mesas-para-area-externa/mesa-redonda-patio-100/',
    lancamento: true, destaque: false,
  },
  {
    id: 'mesa-piquenique-trilha-2',
    nome: 'Mesa Piquenique Trilha 2 Lugares',
    img: BASE + '2024/08/mesa-piquenique-trilha-2-lugares-chamada-600x600.jpg',
    area: 'area-externa', tipo: 'Mesa', material: 'Alumínio',
    colecao: 'Trilha', link: SITE + 'area-externa/mesas-para-area-externa/mesa-piquenique-trilha-2-lugares/',
    lancamento: false, destaque: true,
  },
  {
    id: 'mesa-piquenique-trilha-4',
    nome: 'Mesa Piquenique Trilha 4 Lugares',
    img: BASE + '2024/08/mesa-piquenique-trilha-chamada-600x600.jpg',
    area: 'area-externa', tipo: 'Mesa', material: 'Alumínio',
    colecao: 'Trilha', link: SITE + 'area-externa/mesas-para-area-externa/mesa-piquenique-trilha-4-lugares/',
    lancamento: false, destaque: false,
  },
  {
    id: 'mesa-auxiliar-trilha',
    nome: 'Mesa Auxiliar Trilha',
    img: BASE + '2025/12/Mesas-auxiliares-Trilha_Still-600x600.jpg',
    area: 'area-externa', tipo: 'Mesa de apoio', material: 'Alumínio',
    colecao: 'Trilha', link: SITE + 'area-externa/mesas-para-area-externa/mesa-auxiliar-trilha/',
    lancamento: true, destaque: false,
  },
  {
    id: 'banco-origem-lynx',
    nome: 'Banco Origem Lynx',
    img: BASE + '2024/09/banco-origem-lynx-miniatura-600x600.jpg',
    area: 'area-externa', tipo: 'Banco', material: 'Madeira,Aço',
    colecao: 'Origem', link: SITE + 'area-externa/assentos-para-area-externa/banco-origem-lynx/',
    lancamento: false, destaque: true,
  },
  {
    id: 'cadeira-pipa',
    nome: 'Cadeira Pipa',
    img: BASE + '2024/09/Cadeira-Pipa-Lynx-constelacao-1-e1738763347364-600x600.jpg',
    area: 'area-externa', tipo: 'Cadeira', material: 'Reciclado',
    colecao: 'Pipa', link: SITE + 'area-externa/assentos-para-area-externa/cadeira-pipa/',
    lancamento: false, destaque: false,
  },
  {
    id: 'poltrona-ponte',
    nome: 'Poltrona Ponte',
    img: BASE + '2025/11/poltrona-ponte-chamada-novidade-1-600x600.jpg',
    area: 'area-externa', tipo: 'Poltrona', material: 'Estofado,Alumínio',
    colecao: 'Ponte', link: SITE + 'area-externa/assentos-para-area-externa/poltrona-ponte/',
    lancamento: true, destaque: false,
  },
  {
    id: 'sofa-dois-lugares-ponte',
    nome: 'Sofá 2 Lugares Ponte',
    img: BASE + '2025/09/miniatura-sofa-2l-ponte-600x600.png',
    area: 'area-externa', tipo: 'Sofá', material: 'Estofado,Alumínio',
    colecao: 'Ponte', link: SITE + 'area-externa/assentos-para-area-externa/sofa-dois-lugares-ponte/',
    lancamento: true, destaque: false,
  },

  /* ══════════════════════════════════════════
     ESCOLAR
  ══════════════════════════════════════════ */
  {
    id: 'cadeira-broto',
    nome: 'Cadeira Broto',
    img: BASE + '2026/04/Cadeiras-Broto_Still_Novidade-600x600.jpg',
    area: 'escolar', tipo: 'Cadeira', material: 'Madeira',
    colecao: 'Broto', link: SITE + 'assentos-individuais/cadeiras/cadeira-broto/',
    lancamento: true, destaque: true,
  },
  {
    id: 'mesa-broto',
    nome: 'Mesa Broto',
    img: BASE + '2026/05/Mesas-Broto_Still_Novidade-600x600.jpg',
    area: 'escolar', tipo: 'Mesa', material: 'Madeira',
    colecao: 'Broto', link: SITE + 'mesas/mesa-infantil/mesa-broto/',
    lancamento: true, destaque: true,
  },
  {
    id: 'cadeira-origem',
    nome: 'Cadeira Origem',
    img: BASE + '2024/09/cadeira-origem-miniatura-600x600.jpg',
    area: 'escolar', tipo: 'Cadeira', material: 'Madeira',
    colecao: 'Origem', link: SITE + 'assentos-individuais/cadeiras/cadeira-origem/',
    lancamento: false, destaque: true,
  },
  {
    id: 'poltrona-infantil-origem',
    nome: 'Poltrona Infantil Origem',
    img: BASE + '2024/10/Poltrona-Origem-miniatura-600x600.jpg',
    area: 'escolar', tipo: 'Poltrona', material: 'Madeira',
    colecao: 'Origem', link: SITE + 'area-externa/assentos-para-area-externa/poltrona-infantil-origem/',
    lancamento: false, destaque: true,
  },
  {
    id: 'cadeira-jatai',
    nome: 'Cadeira Jataí',
    img: BASE + '2024/09/jatai-turquesa-e-medit.jpg',
    area: 'escolar', tipo: 'Cadeira', material: 'Madeira,Estofado',
    colecao: 'Jataí', link: SITE + 'assentos-individuais/cadeiras/cadeira-jatai/',
    lancamento: false, destaque: false,
  },
  {
    id: 'cadeira-infantil-pipa',
    nome: 'Cadeira Infantil Pipa',
    img: BASE + '2024/09/cadeira-infantil-pipa-chamada-600x600.jpg',
    area: 'escolar', tipo: 'Cadeira', material: 'Reciclado',
    colecao: 'Pipa', link: SITE + 'area-externa/assentos-para-area-externa/cadeira-infantil-pipa/',
    lancamento: false, destaque: false,
  },
  {
    id: 'cadeira-infantil-patio',
    nome: 'Cadeira Infantil Pátio',
    img: BASE + '2025/02/Cadeira-Patio-Infantil-miniatura-600x600.jpg',
    area: 'escolar', tipo: 'Cadeira', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/assentos-para-area-externa/cadeira-infantil-patio/',
    lancamento: true, destaque: false,
  },
  {
    id: 'mesa-piquenique-cipo',
    nome: 'Mesa Piquenique Cipó',
    img: BASE + '2025/04/min_mesa_piquenique-600x600.jpg',
    area: 'escolar', tipo: 'Mesa', material: 'Madeira,Aço',
    colecao: 'Cipó', link: SITE + 'area-externa/mesas-para-area-externa/mesa-piquenique-cipo/',
    lancamento: true, destaque: false,
  },
  {
    id: 'estante-pipa',
    nome: 'Estante Pipa',
    img: BASE + '2024/09/Estante-Pipa-chamada-600x600.jpg',
    area: 'escolar', tipo: 'Estante', material: 'Reciclado',
    colecao: 'Pipa', link: SITE + 'area-externa/estantes/estante-pipa/',
    lancamento: false, destaque: false,
  },
  {
    id: 'carrinho-materiais-pipa',
    nome: 'Carrinho de Materiais Pipa',
    img: BASE + '2024/09/Carrinho-de-materiais-Pipa-Still-600x600.jpg',
    area: 'escolar', tipo: 'Carrinho', material: 'Reciclado',
    colecao: 'Pipa', link: SITE + 'area-externa/carrinhos/carrinho-de-materiais-pipa/',
    lancamento: false, destaque: false,
  },

  /* ══════════════════════════════════════════
     CORPORATIVO
  ══════════════════════════════════════════ */
  {
    id: 'cadeira-jatai-corp',
    nome: 'Cadeira Jataí',
    img: BASE + '2024/09/jatai-turquesa-e-medit.jpg',
    area: 'corporativo', tipo: 'Cadeira', material: 'Madeira,Estofado',
    colecao: 'Jataí', link: SITE + 'assentos-individuais/cadeiras/cadeira-jatai/',
    lancamento: false, destaque: true,
  },
  {
    id: 'poltrona-samba-prancheta',
    nome: 'Poltrona Samba com Prancheta',
    img: BASE + '2024/10/poltrona-samba-com-prancheta_miniatura-600x600.jpeg',
    area: 'corporativo', tipo: 'Poltrona', material: 'Madeira,Estofado',
    colecao: 'Samba', link: SITE + 'assentos-individuais/poltronas-assentos-individuais/poltrona-samba-com-prancheta/',
    lancamento: false, destaque: true,
  },
  {
    id: 'mesa-quadrada-trevo-corp',
    nome: 'Mesa Quadrada Trevo',
    img: BASE + '2024/10/Mesa-restaurante-Trevo-miniatura-600x600.jpg',
    area: 'corporativo', tipo: 'Mesa', material: 'Alumínio,Madeira',
    colecao: 'Trevo', link: SITE + 'area-externa/mesas-para-area-externa/mesa-quadrada-trevo/',
    lancamento: false, destaque: false,
  },
  {
    id: 'mesa-retangular-trevo',
    nome: 'Mesa Retangular Trevo',
    img: BASE + '2024/10/Mesa-Retangular-Trevo-miniatura-600x600.jpg',
    area: 'corporativo', tipo: 'Mesa', material: 'Alumínio,Madeira',
    colecao: 'Trevo', link: SITE + 'area-externa/mesas-para-area-externa/mesa-retangular-trevo/',
    lancamento: false, destaque: false,
  },
  {
    id: 'mesa-quadrada-trilha-corp',
    nome: 'Mesa Quadrada Trilha',
    img: BASE + '2024/08/mesa-restaurante-trilha-chamada-600x600.jpg',
    area: 'corporativo', tipo: 'Mesa', material: 'Alumínio',
    colecao: 'Trilha', link: SITE + 'mesas/mesas-coletivas/mesa-quadrada-trilha/',
    lancamento: false, destaque: false,
  },

  /* ══════════════════════════════════════════
     ALIMENTAÇÃO
  ══════════════════════════════════════════ */
  {
    id: 'cadeira-patio-alim',
    nome: 'Cadeira Pátio',
    img: BASE + '2024/09/cadeira-patio-miniatura-600x600.jpeg',
    area: 'alimentacao', tipo: 'Cadeira', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/assentos-para-area-externa/cadeira-patio/',
    lancamento: false, destaque: true,
  },
  {
    id: 'mesa-quadrada-trevo-alim',
    nome: 'Mesa Quadrada Trevo',
    img: BASE + '2024/10/Mesa-restaurante-Trevo-miniatura-600x600.jpg',
    area: 'alimentacao', tipo: 'Mesa', material: 'Alumínio,Madeira',
    colecao: 'Trevo', link: SITE + 'area-externa/mesas-para-area-externa/mesa-quadrada-trevo/',
    lancamento: false, destaque: true,
  },
  {
    id: 'mesa-redonda-patio-100-alim',
    nome: 'Mesa Redonda Pátio 100',
    img: BASE + '2025/05/mesa-redonda-patio-100_miniatura_lancamento-600x600.jpg',
    area: 'alimentacao', tipo: 'Mesa', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/mesas-para-area-externa/mesa-redonda-patio-100/',
    lancamento: true, destaque: false,
  },
  {
    id: 'banco-coletivo-patio',
    nome: 'Banco Coletivo Pátio',
    img: BASE + '2024/09/banco-coletivo-patio-miniatura-600x600.jpeg',
    area: 'alimentacao', tipo: 'Banco', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/assentos-para-area-externa/banco-coletivo-patio/',
    lancamento: false, destaque: false,
  },
  {
    id: 'poltrona-samba-alim',
    nome: 'Poltrona Samba com Prancheta',
    img: BASE + '2024/10/poltrona-samba-com-prancheta_miniatura-600x600.jpeg',
    area: 'alimentacao', tipo: 'Poltrona', material: 'Madeira,Estofado',
    colecao: 'Samba', link: SITE + 'assentos-individuais/poltronas-assentos-individuais/poltrona-samba-com-prancheta/',
    lancamento: false, destaque: false,
  },
  {
    id: 'cadeira-slick',
    nome: 'Cadeira Slick',
    img: BASE + '2024/09/cadeira-slick_miniatura-600x600.jpg',
    area: 'alimentacao', tipo: 'Cadeira', material: 'Madeira',
    colecao: 'Slick', link: SITE + 'assentos-individuais/cadeiras/cadeira-slick/',
    lancamento: false, destaque: false,
  },
  {
    id: 'mesa-piquenique-trilha-alim',
    nome: 'Mesa Piquenique Trilha 2 Lugares',
    img: BASE + '2024/08/mesa-piquenique-trilha-2-lugares-chamada-600x600.jpg',
    area: 'alimentacao', tipo: 'Mesa', material: 'Alumínio',
    colecao: 'Trilha', link: SITE + 'area-externa/mesas-para-area-externa/mesa-piquenique-trilha-2-lugares/',
    lancamento: false, destaque: false,
  },

  /* ══════════════════════════════════════════
     RESIDENCIAL
  ══════════════════════════════════════════ */
  {
    id: 'poltrona-asa-res',
    nome: 'Poltrona Asa',
    img: BASE + '2026/01/Poltrona-Asa_Still_Site_Novidade-600x600.jpg',
    area: 'residencial', tipo: 'Poltrona', material: 'Alumínio',
    colecao: 'Voa', link: SITE + 'area-externa/assentos-para-area-externa/poltrona-asa/',
    lancamento: true, destaque: true,
  },
  {
    id: 'sofa-dois-lugares-ponte-res',
    nome: 'Sofá 2 Lugares Ponte',
    img: BASE + '2025/09/miniatura-sofa-2l-ponte-600x600.png',
    area: 'residencial', tipo: 'Sofá', material: 'Estofado,Alumínio',
    colecao: 'Ponte', link: SITE + 'area-externa/assentos-para-area-externa/sofa-dois-lugares-ponte/',
    lancamento: true, destaque: true,
  },
  {
    id: 'sofa-tres-lugares-ponte',
    nome: 'Sofá 3 Lugares Ponte',
    img: BASE + '2025/11/miniatura-sofa-3L-ponte-novidade-600x600.jpg',
    area: 'residencial', tipo: 'Sofá', material: 'Estofado,Alumínio',
    colecao: 'Ponte', link: SITE + 'area-externa/assentos-para-area-externa/sofa-tres-lugares-ponte/',
    lancamento: true, destaque: false,
  },
  {
    id: 'poltrona-ponte-res',
    nome: 'Poltrona Ponte',
    img: BASE + '2025/11/poltrona-ponte-chamada-novidade-1-600x600.jpg',
    area: 'residencial', tipo: 'Poltrona', material: 'Estofado,Alumínio',
    colecao: 'Ponte', link: SITE + 'area-externa/assentos-para-area-externa/poltrona-ponte/',
    lancamento: true, destaque: false,
  },
  {
    id: 'chaise-ponte',
    nome: 'Chaise Ponte',
    img: BASE + '2025/11/Chasie-Ponte-Still-novidade-1-600x600.jpg',
    area: 'residencial', tipo: 'Chaise', material: 'Estofado,Alumínio',
    colecao: 'Ponte', link: SITE + 'area-externa/assentos-para-area-externa/chaise-ponte/',
    lancamento: true, destaque: false,
  },
  {
    id: 'chaise-patio-res',
    nome: 'Chaise Pátio',
    img: BASE + '2024/09/Chaise-Patio-miniatura-600x600.jpg',
    area: 'residencial', tipo: 'Chaise', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/assentos-para-area-externa/chaise-patio/',
    lancamento: false, destaque: false,
  },
  {
    id: 'mesa-lateral-cipo',
    nome: 'Mesa Lateral Cipó',
    img: BASE + '2024/09/Mesa-Lateral-Cipo-chamada-600x600.jpg',
    area: 'residencial', tipo: 'Mesa de apoio', material: 'Madeira,Aço',
    colecao: 'Cipó', link: SITE + 'area-externa/mesas-para-area-externa/mesa-lateral-cipo/',
    lancamento: false, destaque: false,
  },
  {
    id: 'mesa-lateral-patio',
    nome: 'Mesa Lateral Pátio',
    img: BASE + '2024/10/Mesa-Lateral-Patio-miniatura-600x600.jpg',
    area: 'residencial', tipo: 'Mesa de apoio', material: 'Alumínio,Madeira',
    colecao: 'Pátio', link: SITE + 'area-externa/mesas-para-area-externa/mesa-lateral-patio/',
    lancamento: false, destaque: false,
  },
];

/* ── Helpers de busca ─────────────────────── */
const Catalogo = {
  todos:       () => CATALOGO,
  porArea:     (a) => CATALOGO.filter(p => p.area === a),
  lancamentos: ()  => CATALOGO.filter(p => p.lancamento),
  destaques:   ()  => CATALOGO.filter(p => p.destaque),
  buscar:      (q) => {
    const t = q.toLowerCase();
    return CATALOGO.filter(p =>
      p.nome.toLowerCase().includes(t) ||
      p.colecao.toLowerCase().includes(t) ||
      p.tipo.toLowerCase().includes(t) ||
      p.area.toLowerCase().includes(t)
    );
  },
};

/* Exporta para o escopo global */
if (typeof window !== 'undefined') window.NovCatalogo = Catalogo;
