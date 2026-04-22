const PRODUCTS_DATA = [
  { name: 'Árbol de Jade', price: 3000, img: '🌸', image: './imgs/suculentas/jade.png', desc: '', bg: 'bg2', category: 'suculentas', stock: 10, sizes: ['N12', 'N14'], sizePrices: {'N12': 3000, 'N14': 4500}, sizeImages: {'N12': './imgs/suculentas/jade.png', 'N14': './imgs/suculentas/jade_grande.png'} },
  { name: 'Bromelia', price: 3000, img: '🪴', image: './imgs/ornamentales/bromelia.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Callisia Repens', price: 2500, img: '🪴', image: './imgs/ornamentales/callisiarepens.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Cretona', price: 2000, img: '🪴', image: './imgs/ornamentales/cretona.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Cretona (Variedad 2)', price: 2500, img: '🪴', image: './imgs/ornamentales/cretona1.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Dolar Negro', price: 2500, img: '🪴', image: './imgs/ornamentales/dolarnegro.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Dolar Variegado', price: 2500, img: '🪴', image: './imgs/ornamentales/dolarvariegado.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Espada de San Jorge Mini', price: 2500, img: '🪴', image: './imgs/ornamentales/espadadesanjorgemini.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Kalanchoe Blossfeldiana', price: 2000, img: '🪴', image: './imgs/ornamentales/kalanchoeblossfeldiana.png', desc: '', bg: 'bg6', category: 'interior', stock: 10, colors: ['Amarilla', 'Roja', 'Rosa'], colorImages: { 'Amarilla': './imgs/ornamentales/kalanchoeblossfeldiana.png', 'Roja': './imgs/ornamentales/kalanchoe_roja.png', 'Rosa': './imgs/ornamentales/kalanchoe_rosa.png' } },
  { name: 'Ledebouria Socialis', price: 3000, img: '🪴', image: './imgs/ornamentales/ledebouriasocialis.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Senecio angulatus', price: 2000, img: '🪴', image: './imgs/ornamentales/Senecio angulatus.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Tradescantia Fluminensis Variegata', price: 1500, img: '🪴', image: './imgs/ornamentales/tradescantiafluminensisvariegata.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Nose', price: 2000, img: '🪴', image: './imgs/ornamentales/nose.png', desc: '', bg: 'bg6', category: 'interior', stock: 10 },
  { name: 'Money Maker Variegada', price: 1500, img: '🌸', image: './imgs/suculentas/moneymaker.jpeg', desc: '', bg: 'bg2', category: 'suculentas', stock: 10, imgPos: 'top' },
  { name: 'Crassula Muscosa', price: 3000, img: '🪴', image: './imgs/suculentas/crassula muscosa.png', desc: '', bg: 'bg2', category: 'suculentas', stock: 5 },
  { name: 'Graptosedum', price: 2000, img: '🌸', image: './imgs/suculentas/graptosedum.png', desc: '', bg: 'bg2', category: 'suculentas', stock: 5 }
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
        ? `<img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async" ${item.imgPos ? `style="object-position: ${item.imgPos};"` : ''}>` 
        : item.img;
      
      const colorText = item.color ? `<span style="font-size:0.85em; color:var(--texto-suave); display:block; margin-top:2px;">Color: ${item.color}</span>` : '';
      const sizeText = item.size ? `<span style="font-size:0.85em; color:var(--texto-suave); display:block; margin-top:2px;">Tamaño: ${item.size}</span>` : '';

      itemEl.innerHTML = `
        <div style="display: flex; align-items: center;">
          <div class="cart-item-img">${displayImg}</div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            ${colorText}
            ${sizeText}
            <p>$${item.price.toLocaleString('es-AR')}</p>
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
    if (cartTotalText) cartTotalText.innerText = `$${total.toLocaleString('es-AR')}`;
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

window.addToCart = (name, price, img, image = '', color = '', size = '') => {
  const product = PRODUCTS_DATA.find(p => p.name === name);
  
  if (product && product.stock <= 0) return showToast("Producto sin stock");

  // Calcular el precio real si se seleccionó un tamaño especial
  let finalPrice = price;
  if (size && product && product.sizePrices && product.sizePrices[size]) {
    finalPrice = product.sizePrices[size];
  }

  // Calcular la imagen real si se seleccionó un color o tamaño con imagen específica
  let finalImage = image;
  if (color && product && product.colorImages && product.colorImages[color]) {
    finalImage = product.colorImages[color];
  } else if (size && product && product.sizeImages && product.sizeImages[size]) {
    finalImage = product.sizeImages[size];
  }

  const existingItem = cart.find(item => item.name === name && (item.color || '') === color && (item.size || '') === size);
  if (existingItem) {
    const maxStock = product ? product.stock : 99;
    if (existingItem.quantity >= maxStock) return showToast("No hay más stock disponible");
    
    existingItem.quantity = (existingItem.quantity || 1) + 1;
    showToast(`Se aumentó la cantidad de ${name}${color ? ' ('+color+')' : ''}${size ? ' ('+size+')' : ''}`);
  } else {
    cart.push({ name, price: finalPrice, img, image: finalImage, quantity: 1, color, size, imgPos: product ? product.imgPos : '' });
    showToast(`${img} ${name}${color ? ' ('+color+')' : ''}${size ? ' ('+size+')' : ''} añadido al carrito`);
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
  
  const customerNameEl = document.getElementById('customerName');
  const customerName = customerNameEl ? customerNameEl.value.trim() : '';
  
  if (customerNameEl && !customerName) {
    return alert("Por favor, ingresá tu nombre para que podamos agendar tu pedido.");
  }

  const methodSelect = document.getElementById('shippingMethod');
  let shippingStr = "";
  if (methodSelect) {
    const methodVal = methodSelect.value;
    const methodText = methodSelect.options[methodSelect.selectedIndex].text;
    shippingStr += `%0A%0A*Entrega:* ${methodText}`;
    
    if (methodVal.includes('Envío')) {
      const address = document.getElementById('shippingAddress') ? document.getElementById('shippingAddress').value.trim() : '';
      const city = document.getElementById('shippingCity') ? document.getElementById('shippingCity').value.trim() : '';
      const zip = document.getElementById('shippingZip') ? document.getElementById('shippingZip').value.trim() : '';
      
      if (!address || !city || !zip) {
        return alert("Por favor, completá los datos de envío (Dirección, Ciudad/Provincia y Código Postal) para que podamos cotizarlo.");
      }
      if (zip.length < 4) {
        return alert("El Código Postal debe tener al menos 4 números. Por favor, revisalo.");
      }
      shippingStr += `%0A*Dirección:* ${address}, ${city} (CP: ${zip})`;
    }
  }

  let message = `¡Hola Oasis! Soy *${customerName}* y me gustaría encargar las siguientes plantas:%0A%0A`;
  cart.forEach(item => {
    const qty = item.quantity || 1;
    const subtotal = item.price * qty;
    const colorStr = item.color ? ` (Color: ${item.color})` : '';
    const sizeStr = item.size ? ` (Tamaño: ${item.size})` : '';
    message += `• ${qty}x ${item.img} ${item.name}${colorStr}${sizeStr} ($${subtotal.toLocaleString('es-AR')})%0A`;
  });
  const total = cartTotalText ? cartTotalText.innerText : "";
  message += `%0A*Total en plantas: ${total}*`;
  message += shippingStr;
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
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" ${p.imgPos ? `style="object-position: ${p.imgPos};"` : ''}>` 
      : p.img;
    
    const btnText = isOutOfStock ? 'Sin Stock' : (isInCart ? 'En el carrito' : 'Añadir al carrito');
    const btnClass = `btn-agregar ${isInCart ? 'in-cart' : ''} ${isOutOfStock ? 'disabled' : ''}`;
    const badgeHTML = isLowStock ? `<span class="plant-badge low-stock">¡Solo quedan ${p.stock}!</span>` : '';

    const plantSizes = p.sizes && p.sizes.length > 0 ? p.sizes : ['n° 12'];
    const singleSize = plantSizes.length === 1 ? plantSizes[0] : '';
    const multiSize = plantSizes.length > 1;

    const plantColors = p.colors || [];
    const singleColor = plantColors.length === 1 ? plantColors[0] : '';
    const multiColor = plantColors.length > 1;

    let inlineBadges = '';
    if (singleColor) inlineBadges += `<span class="plant-inline-badge">${singleColor}</span>`;
    
    const nameHTML = inlineBadges 
      ? `<div class="plant-name-container"><div class="plant-name" style="margin-bottom:0;">${p.name}</div><div class="plant-badges">${inlineBadges}</div></div>`
      : `<div class="plant-name">${p.name}</div>`;

    const sizeBadgeHTML = singleSize ? `<span class="plant-size-badge">${singleSize}</span>` : '';

    // Diccionario de colores. Si en el futuro agregas "Blanca", puedes sumar 'Blanca': '#FFFFFF' aquí.
    const colorMap = {
      'Amarilla': '#FFD700',
      'Roja': '#E63946',
      'Rosa': '#FFB5A7'
    };
    const getColorHex = (name) => colorMap[name] || '#cccccc';

    const colorSelectHTML = multiColor
      ? `<div class="color-selector" id="color-${p.name.replace(/\s+/g, '-')}">
           ${plantColors.map((c, i) => `
             <label class="color-swatch" title="${c}"><input type="radio" name="color-${p.name.replace(/\s+/g, '-')}" value="${c}" ${i === 0 ? 'checked' : ''}><span class="swatch-bg" style="background-color: ${getColorHex(c)};"></span></label>
           `).join('')}
         </div>`
      : '';

    const sizeSelectHTML = multiSize
      ? `<div class="size-selector" id="size-${p.name.replace(/\s+/g, '-')}">
           ${plantSizes.map((s, i) => `
             <label class="size-option" title="Tamaño ${s}"><input type="radio" name="size-${p.name.replace(/\s+/g, '-')}" value="${s}" ${i === 0 ? 'checked' : ''}><span class="size-bg">${s}</span></label>
           `).join('')}
         </div>`
      : '';

    let displayPrice = p.price;
    if (multiSize && p.sizePrices && p.sizePrices[plantSizes[0]]) {
      displayPrice = p.sizePrices[plantSizes[0]];
    } else if (singleSize && p.sizePrices && p.sizePrices[singleSize]) {
      displayPrice = p.sizePrices[singleSize];
    }

    return `
    <div class="plant-card reveal active">
      <div class="plant-img ${p.bg}">
        ${displayImg}
        ${badgeHTML}
        ${sizeBadgeHTML}
      </div>
      <div class="plant-info">
        ${nameHTML}
        ${colorSelectHTML}
        ${sizeSelectHTML}
        <div class="plant-footer">
          <span class="plant-price">$${displayPrice.toLocaleString('es-AR')}</span>
          <button class="${btnClass}" data-name="${p.name}" ${isOutOfStock ? 'disabled' : ''} onclick="const card = this.closest('.plant-card'); const col = card.querySelector('.color-swatch input[type=radio]:checked'); const sz = card.querySelector('.size-option input[type=radio]:checked'); addToCart('${p.name}', ${p.price}, '${p.img}', '${p.image || ''}', col ? col.value : '${singleColor}', sz ? sz.value : '${singleSize}')">${btnText}</button>
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
      <div class="nav-logo"><a href="index.html" style="text-decoration:none; color:inherit;"><img src="logo.png" alt="Oasis Logo" style="height: 1.5em; vertical-align: middle; margin-right: 8px;"><span>Oasis</span></a></div>
      <button class="menu-btn" id="menuBtn" style="display:none; background:none; border:none; font-size:1.5rem; cursor:pointer;">☰</button>
      <ul class="nav-links">
        <li><a href="index.html#catalogo">Plantas</a></li>
        <li><a href="index.html#servicios">Servicios</a></li>
        <li><a href="index.html#nosotros">Nosotros</a></li>
        <li class="nav-cart" id="openCart">
          <span class="cart-icon" style="font-size: 1.3rem;">🛒</span>
          <span class="cart-label">Carrito</span>
          <span class="cart-count" id="cartCount">0</span>
        </li>
        <li><a href="index.html#contacto" class="nav-cta">Contactar</a></li>
      </ul>
    </nav>`;

  const footerHTML = `
    <footer>
      <div class="footer-socials">
        <a href="https://wa.me/5493516299530" target="_blank" aria-label="WhatsApp">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <a href="https://instagram.com/oasisvivero" target="_blank" aria-label="Instagram">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
      </div>
      <p>© 2026 <span>Oasis Vivero</span> · Hecho con 🌱 en Córdoba, Argentina</p>
    </footer>`;

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

  // Inyectar el pop-up de imágenes en el body
  if (!document.getElementById('imageModal')) {
    const imageModalHTML = `
      <div class="image-modal" id="imageModal">
        <button class="image-modal-close" id="imageModalClose" aria-label="Cerrar">✕</button>
        <img id="imageModalImg" src="" alt="Vista ampliada">
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', imageModalHTML);
  }

  // Inyectar opciones de envío en el footer del carrito
  const cartFooter = document.querySelector('.cart-footer');
  if (cartFooter && !document.getElementById('shippingMethod')) {
    const shippingHTML = `
      <div class="cart-shipping" style="margin-bottom: 1.5rem; text-align: left; border-bottom: 1px solid var(--crema-oscura); padding-bottom: 1rem;">
        <label for="customerName" style="font-size: 0.9rem; font-weight: 600; color: var(--verde-oscuro); display: block; margin-bottom: 0.5rem;">Tus datos:</label>
        <input type="text" id="customerName" placeholder="Nombre y Apellido" style="width: 100%; padding: 0.6rem; border-radius: 0.5rem; border: 1px solid var(--crema-oscura); font-family: inherit; margin-bottom: 1rem; background: white; color: var(--texto);">
        
        <label for="shippingMethod" style="font-size: 0.9rem; font-weight: 600; color: var(--verde-oscuro); display: block; margin-bottom: 0.5rem;">Método de entrega:</label>
        <select id="shippingMethod" onchange="toggleAddress(); updateCartUI();" style="width: 100%; padding: 0.6rem; border-radius: 0.5rem; border: 1px solid var(--crema-oscura); font-family: inherit; margin-bottom: 0.5rem; background: white; color: var(--texto);">
          <option value="0|Retiro en Vivero">Retiro en Vivero (Gratis)</option>
          <option value="0|Envío por Correo Argentino / Andreani">Envío por Correo (A cotizar por WhatsApp)</option>
          <option value="0|Envío por cadetería (Córdoba Capital)">Envío en Córdoba Capital (A cotizar por WhatsApp)</option>
        </select>
        <div id="addressFields" style="display: none; gap: 0.5rem; flex-direction: column;">
          <input type="text" id="shippingAddress" placeholder="Dirección, piso, depto, barrio..." style="width: 100%; padding: 0.6rem; border-radius: 0.5rem; border: 1px solid var(--crema-oscura); font-family: inherit; background: white; color: var(--texto);">
          <input type="text" id="shippingCity" placeholder="Ciudad y Provincia (Ej: Carlos Paz, Córdoba)" style="width: 100%; padding: 0.6rem; border-radius: 0.5rem; border: 1px solid var(--crema-oscura); font-family: inherit; background: white; color: var(--texto);">
          <input type="number" id="shippingZip" placeholder="Código Postal (Ej: 5000)" style="width: 100%; padding: 0.6rem; border-radius: 0.5rem; border: 1px solid var(--crema-oscura); font-family: inherit; background: white; color: var(--texto);">
        </div>
      </div>
    `;
    cartFooter.insertAdjacentHTML('afterbegin', shippingHTML);
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

window.toggleAddress = () => {
  const method = document.getElementById('shippingMethod').value;
  const addressFields = document.getElementById('addressFields');
  if (method.includes('Envío')) {
    addressFields.style.display = 'flex';
  } else {
    addressFields.style.display = 'none';
    document.getElementById('shippingAddress').value = '';
    if(document.getElementById('shippingCity')) document.getElementById('shippingCity').value = '';
    if(document.getElementById('shippingZip')) document.getElementById('shippingZip').value = '';
  }
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
  
  // En la página "ver-todo" (que no tiene categoría), renderizamos dinámicamente.
  // Esto permite que el buscador y los filtros funcionen con todos los productos.
  if (!pageCategory) {
    renderProducts(currentProducts);
  }

  // --- CAMBIO DE IMAGEN AL SELECCIONAR COLOR ---
  document.addEventListener('change', (e) => {
    if (e.target.matches('.color-swatch input[type="radio"]')) {
      const card = e.target.closest('.plant-card');
      if (!card) return;
      const imgEl = card.querySelector('.plant-img img');
      const nameEl = card.querySelector('.plant-name');
      if (imgEl && nameEl) {
        const plantName = nameEl.innerText.trim();
        const product = PRODUCTS_DATA.find(p => p.name === plantName);
        if (product && product.colorImages && product.colorImages[e.target.value]) {
          imgEl.style.opacity = 0; // Ocultamos la imagen un instante
          setTimeout(() => {
            imgEl.src = product.colorImages[e.target.value]; // Cambiamos la fuente
            imgEl.style.opacity = 1; // La volvemos a mostrar
          }, 200);
        }
      }
    }

    // --- CAMBIO DE PRECIO Y FOTO AL SELECCIONAR TAMAÑO ---
    if (e.target.matches('.size-option input[type="radio"]')) {
      const card = e.target.closest('.plant-card');
      if (!card) return;
      const nameEl = card.querySelector('.plant-name');
      const priceEl = card.querySelector('.plant-price');
      const imgEl = card.querySelector('.plant-img img');
      
      if (nameEl) {
        const plantName = nameEl.innerText.trim();
        const product = PRODUCTS_DATA.find(p => p.name === plantName);
        if (product) {
          // Cambiar precio
          if (priceEl && product.sizePrices && product.sizePrices[e.target.value]) {
            priceEl.innerText = '$' + product.sizePrices[e.target.value].toLocaleString('es-AR');
          }
          // Cambiar imagen si existe la configuración sizeImages
          if (imgEl && product.sizeImages && product.sizeImages[e.target.value]) {
            imgEl.style.opacity = 0; // Efecto de desvanecimiento
            setTimeout(() => {
              imgEl.src = product.sizeImages[e.target.value];
              imgEl.style.opacity = 1;
            }, 200);
          }
        }
      }
    }
  });
  
  // --- AUTO-VINCULAR BOTONES DE TARJETAS MANUALES ---
  document.querySelectorAll('.plant-card').forEach(card => {
    const nameEl = card.querySelector('.plant-name');
    const btn = card.querySelector('.btn-agregar');
    
    if (nameEl && btn && !btn.hasAttribute('onclick')) {
      const plantName = nameEl.innerText.trim();
      const product = PRODUCTS_DATA.find(p => p.name === plantName);
      
      if (product) {
        btn.setAttribute('data-name', product.name);
        btn.onclick = () => {
          const plantSizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['n° 12'];
          const singleSize = plantSizes.length === 1 ? plantSizes[0] : '';
          const singleColor = product.colors && product.colors.length === 1 ? product.colors[0] : '';

          const colorInput = card.querySelector('.color-swatch input[type="radio"]:checked');
          const color = colorInput ? colorInput.value : singleColor;
          const sizeInput = card.querySelector('.size-option input[type="radio"]:checked');
          const size = sizeInput ? sizeInput.value : singleSize;
          addToCart(product.name, product.price, product.img, product.image || '', color, size);
        };
      }
    }
  });

  // Actualiza los botones de las tarjetas manuales al cargar la página
  updateButtonsState();
  
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
      const searchTerm = normalize(term.trim());
      
      // Filter based on the currently displayed products (which are already filtered by category and hidden status)
      const filtered = currentProducts.filter(p => normalize(p.name).includes(searchTerm));
      
      renderProducts(filtered, true); // Reutiliza la función principal respetando la paginación
      
      const visibleCount = filtered.filter(p => !p.isHidden).length;
      if (noResultsMsg) noResultsMsg.style.display = visibleCount > 0 ? 'none' : 'block';
      clearSearchBtn.style.display = searchTerm.length > 0 ? 'block' : 'none';
    };

    searchInput.addEventListener('input', (e) => filterPlants(e.target.value));

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterPlants('');
      searchInput.focus();
    });
  }

  // --- LÓGICA DEL POP-UP DE IMÁGENES ---
  const imageModal = document.getElementById('imageModal');
  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      // Cierra el modal si tocan el botón "X" o el fondo negro
      if (e.target.id === 'imageModal' || e.target.id === 'imageModalClose') {
        imageModal.classList.remove('open');
      }
    });
  }

  // Delegación de eventos para abrir la imagen al hacer clic
  document.addEventListener('click', (e) => {
    if (e.target.matches('.plant-img img')) {
      e.preventDefault(); // Previene que la página salte si está en un link
      const modalImg = document.getElementById('imageModalImg');
      if (modalImg && imageModal) {
        modalImg.src = e.target.src; // Toma la foto clickeada y se la pasa al pop-up
        imageModal.classList.add('open');
      }
    }
  });
});