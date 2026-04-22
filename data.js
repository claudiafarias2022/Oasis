const PRODUCTS_DATA = [
  // ==========================================
  // 🌵 CATEGORÍA: SUCULENTAS
  // ==========================================
  
  { 
    name: 'Árbol de Jade', 
    category: 'suculentas', 
    price: 3000, 
    image: './imgs/suculentas/jade.png',  
    // Opciones de tamaño
    sizes: ['N° 12', 'N° 14'], 
    sizePrices: { 'N° 12': 3000, 'N° 14': 4500 }, 
    sizeImages: { 'N° 12': './imgs/suculentas/jade.png', 'N° 14': './imgs/suculentas/jade_grande.png' } 
  },
  { 
    name: 'Money Maker Variegada', 
    category: 'suculentas', 
    price: 1500, 
    image: './imgs/suculentas/moneymaker.jpeg',  
    sizes: ['N° 6'],
  },
  { 
    name: 'Crassula Muscosa', 
    category: 'suculentas', 
    price: 3000, 
    image: './imgs/suculentas/crassula muscosa.png', 
    imgPos: 'center' // Enfoca la parte de abajo de la foto
  },
  { 
    name: 'Sedum', 
    category: 'suculentas', 
    price: 2000, 
    image: './imgs/suculentas/sedum-n12.jpg', 
    imgPos: 'center', // Enfoca la parte de abajo de la foto
    sizes: ['N° 12'],
    imgPos: '20%' // Un 20% desde arriba
  },
  { 
    name: 'Graptosedum', 
    category: 'suculentas', 
    price: 2000, 
    sizes: ['N12'],
    image: './imgs/suculentas/graptosedum.png',
  },
  { 
    name: 'Kalanchoe Fedtschenkoi Variegado', 
    category: 'suculentas', 
    price: 2000, 
    image: './imgs/suculentas/kalanchoefedtschenkoivariegada-n12.jpg', 
    sizes: ['N12'],
    imgPos: '20%' // Un 20% desde arriba
  },
  { 
    name: 'Echeveria', 
    category: 'suculentas', 
    price: 3000, 
    image: './imgs/suculentas/echeveria-n12.jpg', 
    sizes: ['N12']
  },
  { 
    name: 'Lengua de Buey', 
    category: 'suculentas', 
    price: 1000, 
    image: './imgs/suculentas/lenguadebuey-n6.jpg', 
    sizes: ['N6'], 
    imgPos: ''
  
  },

  // ==========================================
  // CATEGORÍA: INTERIOR / ORNAMENTALES
  // ==========================================
  
  { 
    name: 'Bromelia', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/bromelia.png', 
    desc: '' 
  },
  { 
    name: 'Callisia Repens', 
    category: 'interior', 
    price: 2500, 
    image: './imgs/ornamentales/callisiarepens.png', 
    desc: '' 
  },
  { 
    name: 'Cretona', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/cretona.png', 
    desc: '' 
  },
  { 
    name: 'Cretona (Variedad 2)', 
    category: 'interior', 
    price: 2500, 
    image: './imgs/ornamentales/cretona1.png', 
    desc: '' 
  },
  { 
    name: 'Dolar Negro', 
    category: 'interior', 
    price: 2500, 
    image: './imgs/ornamentales/dolarnegro.png', 
    desc: '' 
  },
  { 
    name: 'Dolar Variegado', 
    category: 'interior', 
    price: 2500, 
    image: './imgs/ornamentales/dolarvariegado.png', 
    desc: '' 
  },
  { 
    name: 'Espada de San Jorge Mini', 
    category: 'interior', 
    price: 2500, 
    image: './imgs/ornamentales/espadadesanjorgemini.png', 
    desc: '' 
  },
  { 
    name: 'Kalanchoe Blossfeldiana', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/kalanchoeblossfeldiana.png',  
    // Opciones de color
    colors: ['Amarilla', 'Roja', 'Rosa'], 
    colorImages: { 
      'Amarilla': './imgs/ornamentales/kalanchoeblossfeldiana.png', 
      'Roja': './imgs/ornamentales/kalanchoe_roja.png', 
      'Rosa': './imgs/ornamentales/kalanchoe_rosa.png' 
    } 
  },
  { 
    name: 'Ledebouria Socialis', 
    category: 'interior', 
    price: 3000, 
    image: './imgs/ornamentales/ledebouriasocialis.png', 
    desc: '' 
  },
  { 
    name: 'Senecio angulatus', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/Senecio angulatus.png', 
    desc: '' 
  },
  { 
    name: 'Tradescantia Fluminensis Variegata', 
    category: 'interior', 
    price: 1500, 
    image: './imgs/ornamentales/tradescantiafluminensisvariegata.png', 
    desc: '' 
  },
  { 
    name: 'Nose', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/nose.png', 
    desc: '' 
  }
];