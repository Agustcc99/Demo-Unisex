// PÁGINA MODELO — Peluquería unisex. Se personaliza por link: ?negocio=Peluquería+Hugo&zona=Alta+Córdoba
// Fotos: Unsplash (licencia libre, uso comercial permitido).
import { aplicarDemo } from './demo.js'

const U = (id, w, h) => `https://images.unsplash.com/${id}?w=${w}${h ? `&h=${h}` : ''}&fit=crop&auto=format&q=75`

const contenido = {
  demo: {
    negocio: 'La Tijera Peluquería',
    zona: 'tu barrio',
    ciudad: 'Córdoba',
    clientes: 'clientes', // cómo se nombra a sus clientes en el cuadro de planes
    vendedor: { whatsapp: '5493516813599' },
  },

  plan: 'premium', // plan que se ve por defecto; el selector de arriba (o ?plan=basico|semi) muestra los otros
  nombre: '{negocio}',
  logo: null,
  logoIcono: '/icono.svg', // logo provisorio: ícono al lado del nombre (el nombre cambia con cada link)

  whatsapp: { numero: '', mensaje: '' }, // en modo demo lo reemplaza el WhatsApp del vendedor

  hero: {
    etiqueta: 'Peluquería unisex · {zona}',
    titulo: 'Un buen corte para toda la familia.',
    subtitulo: 'Mujeres, hombres y chicos en un mismo lugar. Corte, color, barba y peinado con turno online, para que nadie espere.',
    cta: 'Sacá tu turno',
    imagen: U('photo-1675034743339-0b0747047727', 1920),
    datos: [
      { label: 'Horarios', valor: 'Lun a sáb · 9 a 20 h' },
      { label: 'Dónde', valor: '{zona}' },
      { label: 'Turnos', valor: 'Online o por WhatsApp' },
    ],
  },

  cinta: ['Corte de dama', 'Corte de caballero', 'Niños', 'Color', 'Mechas', 'Barba', 'Brushing', 'Alisados'],

  servicios: {
    etiqueta: 'Servicios',
    titulo: 'Para ella, para él y para los chicos',
    estilo: 'lista',
    items: [
      { titulo: 'Corte de dama + brushing', descripcion: 'Lavado, corte a medida y brushing de terminación.', precio: '$18.000' },
      { titulo: 'Corte de caballero', descripcion: 'Máquina y tijera, lavado y peinado. El de siempre o uno nuevo.', precio: '$12.000' },
      { titulo: 'Corte infantil', descripcion: 'Hasta 12 años, con paciencia y sin apuro.', precio: '$9.000' },
      { titulo: 'Color de raíz', descripcion: 'Cubre canas con un tono natural, para mujeres y hombres.', precio: '$26.000' },
      { titulo: 'Mechas o reflejos', descripcion: 'Iluminación con matizado y brushing. Precio para pelo corto; varía según el largo.', precio: '$45.000' },
      { titulo: 'Perfilado de barba', descripcion: 'Rebaje con máquina, perfilado con navaja y toalla caliente.', precio: '$7.000' },
    ],
  },

  nosotros: {
    etiqueta: 'Quiénes somos',
    titulo: 'Acá viene toda la familia.',
    texto:
      'En {negocio} atendemos a todos: el corte de siempre, un cambio de color o el primer corte de los más chicos. Te escuchamos, te recomendamos lo que mejor te queda y respetamos el horario de tu turno.',
    imagen: U('photo-1562322140-8baeececf3df', 900, 1125),
    puntos: [
      'Mujeres, hombres y chicos, en un mismo lugar',
      'Turnos puntuales, sin esperas',
      'Productos profesionales para cada tipo de pelo',
    ],
  },

  galeria: {
    etiqueta: 'Trabajos',
    titulo: 'Cortes para todos',
    imagenes: [
      ['photo-1673465766620-1f336d434bff', 'Brushing con planchita en un corte bob', 1000, 1000],
      ['photo-1635273051368-de31ef6a8cc4', 'Corte masculino con máquina y tijera', 600, 900],
      ['photo-1704072650662-76df3af134a7', 'Corte infantil', 600, 600],
      ['photo-1761839256791-6a93f89fb8b0', 'Clienta lista para empezar', 600, 600],
      ['photo-1675034743469-4e262c2ff3ef', 'Lavado en el lavacabezas', 1000, 500],
      ['photo-1635273051839-003bf06a8751', 'Terminación con máquina', 1000, 500],
    ].map(([id, alt, w, h]) => ({ src: U(id, w, h), alt })),
  },

  pasos: {
    etiqueta: 'Cómo reservar',
    titulo: 'Tu turno en 3 pasos',
    items: [
      { titulo: 'Elegí el servicio', texto: 'Corte, color o barba: mirá los precios y elegí lo que necesitás.' },
      { titulo: 'Reservá tu horario', texto: 'Elegí día y hora desde la página, o escribinos por WhatsApp si tenés dudas.' },
      { titulo: 'Vení sin esperar', texto: 'Te atendemos a la hora del turno y en un rato salís listo.' },
    ],
  },

  reservas: {
    etiqueta: 'Turnos online',
    titulo: 'Reservá en 30 segundos',
    texto: 'Elegí servicio, día y horario. Sin llamadas y sin esperar que te contesten.',
    // Extra del Premium (PLANES.md): en la demo el pago es simulado.
    sena: {
      monto: '$3.000',
      texto: 'Para confirmar el turno se abona una seña de $3.000 por Mercado Pago, que se descuenta del total. Si cancelás hasta 24 h antes, queda a favor para otro turno.',
    },
  },

  faq: [
    { pregunta: '¿Cortan a chicos?', respuesta: 'Sí, desde los 2 años. Si es su primer corte, avisanos al reservar y le dedicamos un poco más de tiempo.' },
    { pregunta: '¿Puedo sacar turno para dos personas?', respuesta: 'Sí: reservá un turno para cada uno, uno seguido del otro, o escribinos por WhatsApp y lo armamos.' },
    { pregunta: '¿Hacen color a hombres?', respuesta: 'Sí, cubrimos canas y hacemos reflejos con un tono natural.' },
    { pregunta: '¿Cómo puedo pagar?', respuesta: 'Efectivo, transferencia o Mercado Pago.' },
  ],

  ctaFinal: {
    titulo: '¿Ya te toca el corte?',
    texto: 'Sacá tu turno y vení a {negocio}. Hay lugar para toda la familia.',
    boton: 'Reservá por WhatsApp',
    imagen: U('photo-1600948836101-f9ffda59d250', 1920, 1080),
  },

  contacto: {
    etiqueta: 'Contacto',
    titulo: 'Te esperamos en {negocio}',
    texto: 'Escribinos por WhatsApp o dejanos tu consulta y te respondemos enseguida.',
    telefono: null,
    email: 'turnos@{dominio}', // solo Profesional y Premium (en Básico la demo lo oculta)
    direccion: '{zona}',
    horarios: 'Lunes a sábado de 9 a 20 h',
    mapa: '{zona}', // la demo lo reemplaza por "barrio, ciudad"; en Básico lo oculta
    mapsUrl: null,
  },

  formspreeId: '',
  redes: { instagram: null, facebook: null },
}

export const site = aplicarDemo(contenido)

// En una demo el formulario se muestra pero no envía nada.
export const tieneFormulario = site.plan !== 'basico' && Boolean(site.formspreeId || site.demo)
