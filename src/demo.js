// Modo "página modelo": solo se activa si content.js tiene `demo` (en clientes reales es null).
// Personaliza por link: ?negocio=Lo+de+Juan&zona=Caballito&plan=premium
// - reemplaza {negocio}, {zona} y {dominio} en todos los textos
// - ?plan= muestra lo que incluye cada plan (basico | semi | premium); ?plan=comparar abre el cuadro comparativo
// - todos los botones de WhatsApp van al número del vendedor (vos), no al del negocio

// Precios: los mismos de AGENCIA/PLANES.md (si cambian allá, cambiarlos acá).
export const PLANES = [
  { id: 'basico', nombre: 'Básico', precio: '$75.000', incluye: (s) => `página completa + WhatsApp + tarjeta con QR · dirección ${s}.pages.dev` },
  { id: 'semi', nombre: 'Profesional', precio: '$140.000', incluye: (s) => `+ ${s}.com.ar, mail propio, ficha de Google con botón para reservar, tus números de Google y kit de reseñas` },
  { id: 'premium', nombre: 'Premium', precio: '$300.000', mensual: '$30.000', incluye: () => '+ turnos online con panel para el negocio y soporte mensual' },
]
export const MANTENIMIENTO = '$30.000'
export const EXTRA_SENA = '$60.000'

function limpiar(valor) {
  return (valor || '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 40)
}

// "Barbería El Tano" -> "barberiaeltano"
const slug = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 30) || 'tunegocio'

function reemplazar(valor, vars) {
  if (typeof valor === 'string') return valor.replace(/\{(negocio|zona|dominio)\}/g, (_, k) => vars[k])
  if (Array.isArray(valor)) return valor.map((v) => reemplazar(v, vars))
  if (valor && typeof valor === 'object') {
    return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, reemplazar(v, vars)]))
  }
  return valor
}

// Qué se ve en cada plan. Los bloques de diseño (cinta, pasos, cierre) van en todos.
function recortarPorPlan(site) {
  if (site.plan === 'basico') {
    site.nosotros = null
    site.faq = []
    site.contacto = { ...site.contacto, email: null, mapa: null, mapsUrl: null }
  }
  if (site.plan !== 'premium') site.reservas = null
  return site
}

export function aplicarDemo(contenido) {
  if (!contenido.demo) return contenido

  const params = new URLSearchParams(window.location.search)
  const negocio = limpiar(params.get('negocio')) || contenido.demo.negocio
  const zonaParam = limpiar(params.get('zona'))
  const vars = { negocio, zona: zonaParam || contenido.demo.zona, dominio: `${slug(negocio)}.com.ar` }
  const plan = PLANES.find((p) => p.id === params.get('plan')) ?? PLANES.find((p) => p.id === contenido.plan)
  const vista = params.get('plan') === 'comparar' ? 'comparar' : 'pagina'

  const site = { ...reemplazar(contenido, vars), plan: plan.id, vista }
  // El mapa muestra el barrio del link o, si no vino, la ciudad de la demo.
  if (site.contacto.mapa) {
    site.contacto.mapa = zonaParam ? `${zonaParam}, ${contenido.demo.ciudad}` : contenido.demo.ciudad
  }
  recortarPorPlan(site)

  site.whatsapp = {
    numero: contenido.demo.vendedor.whatsapp,
    mensaje:
      vista === 'comparar'
        ? `Hola! Vi la comparación de planes para ${negocio} y quiero una página para mi negocio.`
        : `Hola! Vi la página de ejemplo para ${negocio} (plan ${plan.nombre}) y quiero una así para mi negocio.`,
  }
  site.demo = { ...site.demo, slug: slug(negocio) }
  document.title = vista === 'comparar' ? `${site.nombre} — planes` : `${site.nombre} — página de ejemplo`
  return site
}

// Link a la misma demo con otro plan, conservando negocio y zona.
export function urlConPlan(planId) {
  const params = new URLSearchParams(window.location.search)
  params.set('plan', planId)
  return `?${params.toString()}`
}
