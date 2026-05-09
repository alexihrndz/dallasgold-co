// ─────────────────────────────────────────────
//  Imágenes de placeholder de Unsplash por categoría
//  (usadas cuando no hay imagen local disponible aún)
// ─────────────────────────────────────────────
const PLACEHOLDER_IMAGES = {
  'anillo-solitario.jpg':   'https://images.unsplash.com/photo-1605100804763-247f66121511?auto=format&fit=crop&w=800&q=80',
  'anillo-corona.jpg':      'https://images.unsplash.com/photo-1599643477874-c65166f4d2f8?auto=format&fit=crop&w=800&q=80',
  'collar-lagrima.jpg':     'https://images.unsplash.com/photo-1599643478514-4fbab210bc95?auto=format&fit=crop&w=800&q=80',
  'cadena-cubana.jpg':      'https://images.unsplash.com/photo-1599643477874-c65166f4d2f8?auto=format&fit=crop&w=800&q=80',
  'pulsera-infinito.jpg':   'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
  'pulsera-esclava.jpg':    'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
  'reloj-classic.jpg':      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
  'reloj-royal.jpg':        'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
};

// ─────────────────────────────────────────────
//  Función auxiliar: resuelve imagen (local o placeholder)
// ─────────────────────────────────────────────
function resolveImage(imageName) {
  const url = imageService.resolveUrl(imageName);
  // Si estamos en modo local sin imágenes reales aún, usamos los placeholders
  if (imageService.getProvider() === 'local' && PLACEHOLDER_IMAGES[imageName]) {
    return PLACEHOLDER_IMAGES[imageName];
  }
  return url;
}

// ─────────────────────────────────────────────
//  Renderizado de tarjetas de producto
// ─────────────────────────────────────────────
function createProductCard(product) {
  const imgUrl = resolveImage(product.image);
  return `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image">
        <img src="${imgUrl}" alt="${product.alt}" loading="lazy">
      </div>
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">${product.price}</p>
    </div>
  `;
}

// ─────────────────────────────────────────────
//  Filtros de tienda
// ─────────────────────────────────────────────
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('store-grid');
  if (!filterBtns.length || !grid) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const cards = grid.querySelectorAll('.product-card');

      cards.forEach(card => {
        const match = filterValue === 'todos' || card.getAttribute('data-category') === filterValue;
        card.style.display = match ? 'block' : 'none';
      });
    });
  });
}

// ─────────────────────────────────────────────
//  Cargar productos desde JSON y renderizar
// ─────────────────────────────────────────────
async function loadProducts({ gridId, featuredOnly = false }) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let products = await res.json();

    if (featuredOnly) {
      products = products.filter(p => p.featured);
    }

    grid.innerHTML = products.map(createProductCard).join('');
    initFilters(); // Inicializa filtros después de renderizar
  } catch (err) {
    console.error('[Dallas Gold] Error cargando productos:', err);
    grid.innerHTML = '<p style="text-align:center;color:#777">No se pudieron cargar los productos. Intenta más tarde.</p>';
  }
}

// ─────────────────────────────────────────────
//  Menú hamburguesa — Mobile
// ─────────────────────────────────────────────
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ─────────────────────────────────────────────
//  Init principal
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();

  // Tienda: cargar todos los productos
  if (document.getElementById('store-grid')) {
    loadProducts({ gridId: 'store-grid', featuredOnly: false });
  }

  // Home: cargar solo productos destacados
  if (document.getElementById('home-grid')) {
    loadProducts({ gridId: 'home-grid', featuredOnly: true });
  }
});
