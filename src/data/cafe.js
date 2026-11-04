// Todos los textos y datos de la cafetería viven aquí.
// Para cambiar precios, horarios o la carta no hace falta tocar los componentes.

export const cafe = {
  nombre: 'Café Cuadrado',
  lema: 'Café de barrio, en la esquina de siempre.',
  direccion: 'Carrer de la Font, 14',
  ciudad: 'Tu barrio',
  telefono: '+34 600 000 000',
  email: 'hola@cafecuadrado.es',
  instagram: '@cafecuadrado',
  horario: [
    { dias: 'Lunes a viernes', horas: '7:30 – 19:00' },
    { dias: 'Sábados', horas: '8:30 – 14:00' },
    { dias: 'Domingos', horas: 'Cerrado' },
  ],
}

export const descripcion = {
  titulo: 'Una mesa, una taza y nada de prisas',
  parrafos: [
    'Abrimos en una esquina que antes era una mercería. Nos quedamos con las baldosas del suelo, el mostrador de madera y la costumbre de saludar por el nombre.',
    'Tostamos el café en pequeños lotes con un tostador del barrio, y cada mañana llega la bollería del obrador de la calle de al lado. Si te apetece quedarte toda la tarde con un libro, la mesa es tuya.',
  ],
  datos: [
    { valor: '2019', texto: 'abiertos desde' },
    { valor: '12', texto: 'mesas, ninguna con prisa' },
    { valor: '1', texto: 'tostador, a dos calles' },
  ],
}

// La carta: cada sección tiene una lista de productos con precio en euros.
export const carta = [
  {
    seccion: 'Cafés',
    productos: [
      { nombre: 'Espresso', detalle: 'Mezcla de la casa, tostado medio', precio: 1.5 },
      { nombre: 'Cortado', detalle: 'Espresso con un toque de leche', precio: 1.7 },
      { nombre: 'Café con leche', detalle: 'En taza grande, como en casa', precio: 2.2 },
      { nombre: 'Flat white', detalle: 'Doble ristretto y leche sedosa', precio: 2.9 },
      { nombre: 'Filtro del día', detalle: 'Origen único, pregunta cuál toca', precio: 3.0 },
    ],
  },
  {
    seccion: 'Para acompañar',
    productos: [
      { nombre: 'Croissant de mantequilla', detalle: 'Del obrador vecino, cada mañana', precio: 1.8 },
      { nombre: 'Tostada con tomate', detalle: 'Pan de payés, aceite de oliva', precio: 2.8 },
      { nombre: 'Bizcocho de limón', detalle: 'Porción generosa, receta de la casa', precio: 2.5 },
      { nombre: 'Bocadillo del día', detalle: 'Cambia según el mercado', precio: 4.5 },
    ],
  },
]
