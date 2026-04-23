const PRODUCTS_DATA = [
  // ==========================================
  // 🌵 CATEGORÍA: SUCULENTAS
  // ==========================================
  
  { 
    name: 'Árbol de Jade', 
    category: 'suculentas', 
    price: 3000, 
    image: './imgs/suculentas/jade-n6.jpg',  
    // Opciones de tamaño
    sizes: ['N° 6'], 
    sizePrices: { 'N° 6': 1500, 'N° 12': 3000, 'N° 14': 4500 }, 
    sizeImages: { 'N° 12': './imgs/suculentas/jade.png', 'N° 14': './imgs/suculentas/jade_grande.png', 'N° 6': './imgs/suculentas/jade-n6.jpg' } ,
    imgPos: ' 40%' // Enfoca la parte de abajo de la foto
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
    sizes: ['N12'],
    imgPos: '40%'
  },
  { 
    name: 'Lengua de Buey', 
    category: 'suculentas', 
    price: 1000, 
    image: './imgs/suculentas/lenguadebuey-n6.jpg', 
    sizes: ['N6'], 
    imgPos: ''
  
  },
  { 
    name: 'Bromelia', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/bromelia.png', 
  },
  { 
    name: 'Callisia Repens', 
    category: 'interior', 
    price: 2500, 
    image: './imgs/ornamentales/callisiarepens.png', 
  },
  { 
    name: 'Cretona', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/cretona.png',
    imgPos: 'center'
  },
  { 
    name: 'Cretona (Variedad 2)', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/cretona1.png',
    imgPos: '30%'
  },
  { 
    name: 'Nacar', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/nacarrosa-n6.jpg', 
  },
  { 
    name: 'Dolar Negro', 
    category: 'interior', 
    price: 2500, 
    image: './imgs/ornamentales/dolarnegro.png', 
    imgPos: '40%'

  },
  { 
    name: 'Dolar Variegado', 
    category: 'interior', 
    price: 2500, 
    image: './imgs/ornamentales/dolarvariegado.png', 
    imgPos: '40%'
  
  },
  { 
    name: 'Espada de San Jorge Mini', 
    category: 'interior', 
    price: 2500, 
    image: './imgs/ornamentales/espadadesanjorgemini.png', 
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
  },
  { 
    name: 'Senecio angulatus', 
    category: 'interior', 
    price: 2000, 
    image: './imgs/ornamentales/Senecio angulatus.png', 
  },
  { 
    name: 'Tradescantia Fluminensis Variegata', 
    category: 'interior', 
    price: 1500, 
    image: './imgs/ornamentales/tradescantiafluminensisvariegata.png', 
  },

  // ==========================================
  // 🌸 CATEGORÍA: FLORES
  // ==========================================
  { 
    name: 'Orquidea Patito', 
    category: 'flores', 
    price: 4500, 
    image: './imgs/flores/orquideaspatito.jpg'
  },
  { 
    name: 'Clivia', 
    category: 'flores', 
    price: 2500, 
    sizes: ['N12'],
    image: './imgs/flores/clivia-n12.jpg',
    colors: ['Naranja']
  },
  
  { 
    name: 'Romero (salvia rosmarinus)', 
    category: 'aromaticas', 
    price: 1500, 
    image: './imgs/suculentas/jade-n6.jpg',  
    // Opciones de tamaño
    sizes: ['N° 10'], 
    image: './imgs/aromaticas/romero (salvia rosmarinus).jpeg',  
    imgPos: ' 40%' // Enfoca la parte de abajo de la foto
  }, 
{ 
    name: 'Citronella', 
    category: 'aromaticas', 
    price: 1500, 
    image: './imgs/suculentas/jade-n6.jpg',  
    // Opciones de tamaño
    sizes: ['N° 6'], 
    image: './imgs/aromaticas/citronella.jpeg',  
    imgPos: ' 50%' // Enfoca la parte de abajo de la foto
  }, 
{ 
    name: 'Curry (Helichrysum italicum)', 
    category: 'aromaticas', 
    price: 1500, 
    image: './imgs/suculentas/jade-n6.jpg',  
    // Opciones de tamaño
    sizes: ['N° 10'], 
    image: './imgs/aromaticas/Curry (Helichrysum italicum.jpeg',  
    imgPos: ' 40%' // Enfoca la parte de abajo de la foto
  }, 
{ 
    name: 'Lavanda (lanata)', 
    category: 'aromaticas', 
    price: 1500, 
    image: './imgs/suculentas/jade-n6.jpg',  
    // Opciones de tamaño
    sizes: ['N° 10'], 
    image: './imgs/aromaticas/lavanda .jpeg',  
    imgPos: ' 40%' // Enfoca la parte de abajo de la foto
  }, 
{ 
    name: 'Lavanda Dentata', 
    category: 'aromaticas', 
    price: 1500, 
    image: './imgs/suculentas/jade-n6.jpg',  
    // Opciones de tamaño
    sizes: ['N° 10'], 
    image: './imgs/aromaticas/lavanda dentata.jpeg',  
    imgPos: ' 50%' // Enfoca la parte de abajo de la foto
  },
  { 
    name: 'Ruda M', 
    category: 'aromaticas', 
    price: 1500, 
    image: './imgs/aromaticas/ruda m.jpeg',  
    // Opciones de tamaño
    sizes: ['N° 6'],  
    imgPos: ' 50%' // Enfoca la parte de abajo de la foto
  },

  
];