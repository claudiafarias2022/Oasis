// --- CATÁLOGO MANUAL DE PRODUCTOS ---
// Agrega o edita tus plantas directamente aquí para que aparezcan en el buscador y el catálogo completo
const PRODUCTS_DATA = [
  { name: 'Cactus San Pedro', price: 2500, img: '🌵', image: '', desc: 'Crecimiento columnar y gran resistencia.', bg: 'bg1', category: 'cactus', stock: 5 },
  { name: 'Asiento de Suegra', price: 3200, img: '🌵', image: '', desc: 'Cactus redondo y espinoso, muy decorativo.', bg: 'bg1', category: 'cactus', stock: 2 },
  { name: 'Mini Cactus Mix', price: 1800, img: '🌵', image: '', desc: 'Set de 3 mini cactus en macetas decoradas.', bg: 'bg1', category: 'cactus', stock: 10 },
  { name: 'Echeveria Elegans', price: 1200, img: '🌸', image: '', desc: 'Forma de roseta perfecta para escritorios.', bg: 'bg2', category: 'suculentas', stock: 8 },
  { name: 'Ficus Pandurata', price: 5500, img: '🪴', image: '', desc: 'La estrella de los interiores modernos.', bg: 'bg6', category: 'interior', stock: 5 },
  { name: 'Pothos Varigado', price: 2100, img: '🌿', image: '', desc: 'Ideal para estantes altos y poca luz.', bg: 'bg3', category: 'colgantes', stock: 15 },
  { name: 'Orquídea Phalaenopsis', price: 8500, img: '🌺', image: '', desc: 'Elegancia pura.', bg: 'bg5', category: 'orquideas', stock: 5 },
  { name: 'Money Maker Variegada', price: 1500, img: '🌸', image: 'suculentas/moneymaker.jpeg', desc: '', bg: 'bg2', category: 'suculentas', stock: 10 }
];

// --- LÓGICA DEL CARRITO ---
let cart = JSON.parse(localStorage.getItem('oasis-cart') || '[]');

const updateCartUI = () => {
  const cartCount = document.getElementById('cartCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotalText = document.getElementById('cartTotalText');
  const floatingCartBtn = document.getElementById('floatingCartBtn');
  const floatingCartCount = document.getElementById('floatingCartCount');

  if (cartCount) cartCount.innerText = cart.length;
  if (floatingCartCount) floatingCartCount.innerText = cart.length;
  
  if (floatingCartBtn) {
    if (cart.length > 0) {
      floatingCartBtn.classList.add('visible');
    } else {
      floatingCartBtn.classList.remove('visible');
    }
  }
  
  if (cartItemsList) {
    cartItemsList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const qty = item.quantity || 1;
      const itemTotal = item.price * qty;
      total += itemTotal;
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      const displayImg = item.image 
        ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` 
        : item.img;
      itemEl.innerHTML = `
        <div style="display: flex; align-items: center;">
          <div class="cart-item-img">${displayImg}</div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>$${item.price.toLocaleString()}</p>
            <div class="qty-controls">
              <button class="btn-qty" onclick="changeQty(${index}, -1)" aria-label="Disminuir">-</button>
              <span>${qty}</span>
              <button class="btn-qty" onclick="changeQty(${index}, 1)" aria-label="Aumentar">+</button>
            </div>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:5px;">
          <button class="btn-remove" onclick="removeFromCart(${index})" aria-label="Quitar del carrito">Eliminar</button>
        </div>
      `;
      cartItemsList.appendChild(itemEl);
    });
    if (cartTotalText) cartTotalText.innerText = `$${total.toLocaleString()}`;
  }
  localStorage.setItem('oasis-cart', JSON.stringify(cart));
  updateButtonsState();
};

window.changeQty = (index, delta) => {
  const item = cart[index];
  const product = PRODUCTS_DATA.find(p => p.name === item.name);

  if (product && product.isHidden) return showToast("Este producto ya no está disponible.");

  const maxStock = product ? product.stock : 99;
  if (delta > 0 && item.quantity >= maxStock) return showToast("Stock máximo alcanzado");

  cart[index].quantity = (cart[index].quantity || 1) + delta;
  
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }
  updateCartUI();
};

const updateButtonsState = () => {
  const buttons = document.querySelectorAll('.btn-agregar[data-name]');
  buttons.forEach(btn => {
    const name = btn.getAttribute('data-name');
    const product = PRODUCTS_DATA.find(p => p.name === name); // Get product to check stock/hidden
    const isInCart = cart.some(item => item.name === name);
    
    // If product is hidden or out of stock, disable and change text
    if (product && (product.isHidden || product.stock <= 0)) {
      btn.classList.add('disabled');
      btn.setAttribute('disabled', 'true');
      btn.textContent = product.isHidden ? 'No disponible' : 'Sin Stock';
    } else if (isInCart) {
      btn.classList.add('in-cart');
      btn.textContent = 'En el carrito';
      btn.removeAttribute('disabled'); // Ensure it's not disabled if it was out of stock before
      btn.classList.remove('disabled');
    } else {
      btn.classList.remove('in-cart');
      btn.textContent = 'Añadir al carrito';
      btn.removeAttribute('disabled');
      btn.classList.remove('disabled');
    }
  });
};

const showToast = (message) => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

window.addToCart = (name, price, img, image = '') => {
  const product = PRODUCTS_DATA.find(p => p.name === name);
  
  if (product && product.stock <= 0) return showToast("Producto sin stock");

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    const maxStock = product ? product.stock : 99;
    if (existingItem.quantity >= maxStock) return showToast("No hay más stock disponible");
    
    existingItem.quantity = (existingItem.quantity || 1) + 1;
    showToast(`Se aumentó la cantidad de ${name}`);
  } else {
    cart.push({ name, price, img, image, quantity: 1 });
    showToast(`${img} ${name} añadido al carrito`);
  }
  updateCartUI();
};

window.removeFromCart = (index) => {
  cart.splice(index, 1);
  updateCartUI();
};

window.clearCart = () => {
  if (cart.length === 0) return;
  if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
    cart = [];
    updateCartUI();
  }
};

window.openCartDrawer = () => {
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add('open');
    cartOverlay.style.display = 'block';
  }
};

window.closeCartDrawer = () => {
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove('open');
    cartOverlay.style.display = 'none';
  }
};

window.sendCartWhatsApp = () => {
  const cartTotalText = document.getElementById('cartTotalText');
  if (cart.length === 0) return alert("El carrito está vacío.");
  
  let message = "¡Hola Oasis! Me gustaría encargar las siguientes plantas:%0A%0A";
  cart.forEach(item => {
    const qty = item.quantity || 1;
    const subtotal = item.price * qty;
    message += `• ${qty}x ${item.img} ${item.name} ($${subtotal.toLocaleString()})%0A`;
  });
  const total = cartTotalText ? cartTotalText.innerText : "";
  message += `%0A*Total: ${total}*`;
  window.open(`https://wa.me/5493516299530?text=${message}`, '_blank');
};

// --- LÓGICA DE RENDERIZADO DINÁMICO ---
const renderProducts = (data) => {
  const grid = document.getElementById('mainGrid');
  if (!grid) return;

  // Filter out hidden products before rendering
  const visibleProducts = data.filter(p => !p.isHidden); // NEW LINE

  grid.innerHTML = visibleProducts.map(p => { // Use visibleProducts
    const isInCart = cart.some(item => item.name === p.name);
    const isOutOfStock = p.stock <= 0;
    const isLowStock = p.stock > 0 && p.stock < 3;
    const displayImg = p.image 
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` 
      : p.img;
    
    const btnText = isOutOfStock ? 'Sin Stock' : (isInCart ? 'En el carrito' : 'Añadir al carrito');
    const btnClass = `btn-agregar ${isInCart ? 'in-cart' : ''} ${isOutOfStock ? 'disabled' : ''}`;
    const badgeHTML = isLowStock ? `<span class="plant-badge low-stock">¡Solo quedan ${p.stock}!</span>` : '';

    return `
    <div class="plant-card reveal active">
      <div class="plant-img ${p.bg}">
        ${displayImg}
        ${badgeHTML}
      </div>
      <div class="plant-info">
        <div class="plant-name">${p.name}</div>
        <div class="plant-footer">
          <span class="plant-price">$${p.price.toLocaleString()}</span>
          <button class="${btnClass}" data-name="${p.name}" ${isOutOfStock ? 'disabled' : ''} onclick="addToCart('${p.name}', ${p.price}, '${p.img}', '${p.image || ''}')">${btnText}</button>
        </div>
      </div>
    </div>`;
  }).join('');
  updateButtonsState();
};

// --- MEJORA 5: COMPONENTES COMPARTIDOS ---
const injectSharedComponents = () => {
  // Assuming all HTML files are in the same directory as script.js and logo.png
  // So, relative paths like "oasis.html" and "logo.png" will work directly.
  const navHTML = `
    <nav>
      <div class="nav-logo"><a href="oasis.html" style="text-decoration:none; color:inherit;"><img src="logo.png" alt="Oasis Logo" style="height: 1.5em; vertical-align: middle; margin-right: 8px;"><span>Oasis</span></a></div>
      <button class="menu-btn" id="menuBtn" style="display:none; background:none; border:none; font-size:1.5rem; cursor:pointer;">☰</button>
      <ul class="nav-links">
        <li><a href="oasis.html#catalogo">Plantas</a></li>
        <li><a href="oasis.html#servicios">Servicios</a></li>
        <li><a href="oasis.html#nosotros">Nosotros</a></li>
        <li class="nav-cart" id="openCart">
          <span class="cart-icon" style="font-size: 1.3rem;">🛒</span>
          <span class="cart-label">Carrito</span>
          <span class="cart-count" id="cartCount">0</span>
        </li>
        <li><a href="oasis.html#contacto" class="nav-cta">Contactar</a></li>
      </ul>
    </nav>`;

  const footerHTML = `<footer><p>© 2026 <span>Oasis Vivero</span> · Hecho con 🌱 en Córdoba, Argentina</p></footer>`;

  const navContainer = document.getElementById('navbar-shared');
  const footContainer = document.getElementById('footer-shared');

  if (navContainer) navContainer.innerHTML = navHTML;
  if (footContainer) footContainer.innerHTML = footerHTML;

  // Inyectar el botón flotante del carrito en el body
  if (!document.getElementById('floatingCartBtn')) {
    const floatingCartHTML = `
      <button class="floating-cart-btn" id="floatingCartBtn" aria-label="Ver carrito">
        🛒<span class="floating-cart-count" id="floatingCartCount">0</span>
      </button>
    `;
    document.body.insertAdjacentHTML('beforeend', floatingCartHTML);
  }

  // Re-vincular eventos del menú móvil después de la inyección
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
  }

  // Re-vincular eventos del carrito
  const openCartBtn = document.getElementById('openCart');
  const closeCartBtn = document.getElementById('closeCart');
  const cartOverlay = document.getElementById('cartOverlay');
  const floatingCartBtn = document.getElementById('floatingCartBtn');
  if (openCartBtn) openCartBtn.onclick = window.openCartDrawer;
  if (closeCartBtn) closeCartBtn.onclick = window.closeCartDrawer;
  if (cartOverlay) cartOverlay.onclick = window.closeCartDrawer;
  if (floatingCartBtn) floatingCartBtn.onclick = window.openCartDrawer;
};

// --- INICIALIZACIÓN GENERAL ---
document.addEventListener('DOMContentLoaded', () => {
  injectSharedComponents();

  const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Detectar categoría de la página (si existe)
  const pageCategory = document.body.dataset.category;
  let currentProducts = pageCategory 
    ? PRODUCTS_DATA.filter(p => p.category === pageCategory)
    : PRODUCTS_DATA;
  
  renderProducts(currentProducts);
  
  const sortSelect = document.getElementById('priceSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      let sorted = [...currentProducts];
      const val = e.target.value;
      if(val === 'low') sorted.sort((a,b) => a.price - b.price);
      else if(val === 'high') sorted.sort((a,b) => b.price - a.price);
      else if(val === 'az') sorted.sort((a,b) => normalize(a.name).localeCompare(normalize(b.name)));
      else if(val === 'za') sorted.sort((a,b) => normalize(b.name).localeCompare(normalize(a.name)));
      renderProducts(sorted);
    });
  }

  // Animaciones de revelación
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Botón Volver Arriba
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
  }

  updateCartUI();

  // Lógica de búsqueda en tiempo real
  const searchInput = document.getElementById('plantSearch');
  const clearSearchBtn = document.getElementById('clearSearch');
  const noResultsMsg = document.getElementById('noResults');

  if (searchInput && clearSearchBtn) {
    const filterPlants = (term) => {
      let hasResults = false;
      const searchTerm = normalize(term.trim());
      
      // Filter based on the currently displayed products (which are already filtered by category and hidden status)
      const filteredAndVisibleProducts = currentProducts.filter(p => !p.isHidden && normalize(p.name).includes(searchTerm));

      const grid = document.getElementById('mainGrid');
      if (grid) {
        grid.innerHTML = filteredAndVisibleProducts.map(p => {
          const isInCart = cart.some(item => item.name === p.name);
          const isOutOfStock = p.stock <= 0;
          const isLowStock = p.stock > 0 && p.stock < 3;
          const displayImg = p.image 
            ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` 
            : p.img;
          
          const btnText = isOutOfStock ? 'Sin Stock' : (isInCart ? 'En el carrito' : 'Añadir al carrito');
          const btnClass = `btn-agregar ${isInCart ? 'in-cart' : ''} ${isOutOfStock ? 'disabled' : ''}`;
          const badgeHTML = isLowStock ? `<span class="plant-badge low-stock">¡Solo quedan ${p.stock}!</span>` : '';

          return `
          <div class="plant-card reveal active">
            <div class="plant-img ${p.bg}">
              ${displayImg}
              ${badgeHTML}
            </div>
            <div class="plant-info">
              <div class="plant-name">${p.name}</div>
              <div class="plant-footer">
                <span class="plant-price">$${p.price.toLocaleString()}</span>
                <button class="${btnClass}" data-name="${p.name}" ${isOutOfStock ? 'disabled' : ''} onclick="addToCart('${p.name}', ${p.price}, '${p.img}', '${p.image || ''}')">${btnText}</button>
              </div>
            </div>
          </div>`;
        }).join('');
        hasResults = filteredAndVisibleProducts.length > 0;
      }
      if (noResultsMsg) noResultsMsg.style.display = hasResults ? 'none' : 'block';
      clearSearchBtn.style.display = searchTerm.length > 0 ? 'block' : 'none';
      updateButtonsState(); // Update button states after re-rendering
    };

    searchInput.addEventListener('input', (e) => filterPlants(e.target.value));

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterPlants('');
      searchInput.focus();
    });
  }
});