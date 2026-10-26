import { site } from '../content.js'
import { EXTRA_SENA, MANTENIMIENTO, PLANES, urlConPlan } from '../demo.js'
import { whatsappUrl } from '../lib/whatsapp.js'
import DemoBanner from './DemoBanner.jsx'
import Footer from './Footer.jsx'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'
import WhatsAppFloat from './WhatsAppFloat.jsx'

// Página modelo, vista ?plan=comparar: beneficios de cada plan y cuadro comparativo (datos de AGENCIA/PLANES.md).
const clientes = site.demo?.clientes ?? 'clientes'
const slug = site.demo?.slug
const conTurnos = Boolean(site.reservas)

const BENEFICIOS = {
  basico: {
    para: 'Para empezar a mostrarte',
    puntos: ['Tu página lista en pocos días', `Tus ${clientes} te escriben directo al WhatsApp`, 'Tarjetas con QR para repartir en el local'],
  },
  semi: {
    para: 'Para que te encuentren en Google',
    puntos: [
      'Dirección propia .com.ar y mail con tu nombre',
      'Tu ficha de Google completa, con botón para reservar',
      'Ves cuánta gente te encuentra en Google',
      'Juntás reseñas con el cartel y el kit de reseñas',
    ],
  },
  premium: {
    para: conTurnos ? 'Para dejar de dar turnos por mensaje' : 'Para manejar tu negocio desde la página',
    puntos: conTurnos
      ? [`Tus ${clientes} sacan turno solas, a cualquier hora`, 'Ves toda la agenda en un panel desde el celu', 'Soporte mensual: nos ocupamos de que todo funcione']
      : ['Un catálogo o panel que actualizás vos', 'Cambios al instante, sin pedirle a nadie', 'Soporte mensual: nos ocupamos de que todo funcione'],
  },
}

// [básico, profesional, premium]: true = incluido, false = no, texto = detalle.
const GRUPOS = [
  {
    titulo: 'Tu página',
    filas: [
      ['Diseño completo: portada, servicios, galería y contacto', true, true, true],
      ['Se ve perfecta en el celular', true, true, true],
      ['Botón directo a tu WhatsApp', true, true, true],
      ['Secciones "Quiénes somos" y "Preguntas frecuentes"', false, true, true],
      ['Formulario de contacto que llega a tu mail', false, true, true],
      ['Mapa con "Cómo llegar"', false, true, true],
    ],
  },
  {
    titulo: 'Que te encuentren',
    filas: [
      [`Dirección propia: ${slug}.com.ar`, 'Gratis\n.pages.dev', true, true],
      ['Mail con tu nombre', false, true, true],
      ['Ficha de Google completa: fotos, horarios, servicios y precios', false, true, true],
      ['Botón "Reservar" en tu ficha de Google', false, true, true],
      ['Preparada para aparecer en Google en tu zona', false, true, true],
      ['Estadísticas con Google Analytics: cuánta gente entra y cuántos te escriben por WhatsApp', false, true, true],
      ['Lista para hacer publicidad en Instagram y Facebook (Píxel de Meta)', false, true, true],
      ['Tus números de Google: cuántos te ven, te llaman y te piden cómo llegar', false, true, true],
      ['Sabés con qué búsquedas te encuentran en Google', false, true, true],
    ],
  },
  {
    titulo: 'Para tu local',
    filas: [
      ['Tarjeta con QR e imagen para estados e historias', true, true, true],
      ['Cartel de mostrador para juntar reseñas en Google', false, true, true],
      ['Kit de reseñas: mensaje para pedirlas y respuestas modelo', false, true, true],
    ],
  },
  {
    titulo: 'Sistema',
    filas: conTurnos
      ? [
          [`Turnos online: tus ${clientes} reservan solas`, false, false, true],
          ['Panel para ver y manejar tus turnos', false, false, true],
          ['Seña con Mercado Pago al reservar', false, false, `Extra\n${EXTRA_SENA}`],
        ]
      : [['Catálogo o panel que manejás vos', false, false, true]],
  },
  {
    titulo: 'Soporte',
    filas: [
      ['2 rondas de cambios antes de la entrega', true, true, true],
      [
        'Soporte mensual: 3 cambios por mes y la página siempre online',
        `Opcional\n${MANTENIMIENTO}\npor mes`,
        `Opcional\n${MANTENIMIENTO}\npor mes`,
        `Incluido\n${MANTENIMIENTO}\npor mes`,
      ],
      ['Informe mensual con tus números de Google', false, 'Con el\nsoporte\nmensual', true],
    ],
  },
]

// Lo que se sumó al plan Profesional (oct. 2026): se marca con "Nuevo" en las tarjetas y en el cuadro.
const NUEVOS = new Set([
  'Tu ficha de Google completa, con botón para reservar',
  'Ves cuánta gente te encuentra en Google',
  'Juntás reseñas con el cartel y el kit de reseñas',
  'Botón "Reservar" en tu ficha de Google',
  'Tus números de Google: cuántos te ven, te llaman y te piden cómo llegar',
  'Sabés con qué búsquedas te encuentran en Google',
  'Kit de reseñas: mensaje para pedirlas y respuestas modelo',
  'Informe mensual con tus números de Google',
])

function Nuevo({ texto }) {
  if (!NUEVOS.has(texto)) return null
  return <span className="ml-2 inline-block rounded-full bg-brand px-2 py-0.5 align-middle text-[10px] font-semibold tracking-wide text-sobre-brand uppercase">Nuevo</span>
}

function Celda({ valor }) {
  if (valor === true)
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs text-sobre-brand">
        ✓<span className="sr-only">Incluido</span>
      </span>
    )
  if (valor === false)
    return (
      <span className="text-suave/60">
        —<span className="sr-only">No incluido</span>
      </span>
    )
  return <span className="block text-[11px] leading-tight font-semibold whitespace-pre-line text-texto sm:text-xs">{valor}</span>
}

function Precio({ plan, grande = false }) {
  return (
    <p className={`font-display font-bold text-texto ${grande ? 'text-4xl' : 'text-[13px] sm:text-lg'}`}>
      {plan.precio}
      {plan.mensual && <span className={`block font-sans font-semibold text-suave ${grande ? 'mt-1 text-sm' : 'text-[10px] sm:text-xs'}`}>+ {plan.mensual}/mes</span>}
    </p>
  )
}

export default function Comparacion() {
  return (
    <div className="min-h-screen bg-fondo font-sans text-texto antialiased selection:bg-brand selection:text-sobre-brand">
      <header className="sticky top-0 z-40">
        <DemoBanner />
      </header>

      <main>
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <Titulo etiqueta="Planes" centrado>
                ¿Qué página le conviene a {site.nombre}?
              </Titulo>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-suave">
                Los tres planes tienen el mismo diseño. Cambia lo que suman para que te encuentren y para organizar tu trabajo.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {PLANES.map((plan, i) => {
                const recomendado = plan.id === 'semi'
                return (
                  <Reveal
                    key={plan.id}
                    retraso={i}
                    className={`relative flex flex-col rounded-3xl border bg-superficie p-6 sm:p-8 ${recomendado ? 'border-brand shadow-xl' : 'border-borde'}`}
                  >
                    {recomendado && (
                      <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-sobre-brand">Recomendado</span>
                    )}
                    <p className="text-xs font-semibold tracking-[0.3em] text-brand uppercase">{plan.nombre}</p>
                    <p className="mt-2 font-display text-2xl font-bold text-texto">{BENEFICIOS[plan.id].para}</p>
                    <div className="mt-5">
                      <Precio plan={plan} grande />
                    </div>
                    <ul className="mt-6 flex-1 space-y-3 text-suave">
                      {BENEFICIOS[plan.id].puntos.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="mt-0.5 text-brand">✓</span>
                          <span>
                            {p}
                            <Nuevo texto={p} />
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={whatsappUrl(`Hola! Vi los planes para ${site.nombre} y me interesa el plan ${plan.nombre}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-sobre-brand transition hover:brightness-110"
                      >
                        Lo quiero
                      </a>
                      <a href={urlConPlan(plan.id)} className="rounded-full border border-borde px-5 py-2.5 text-sm font-semibold text-texto transition hover:border-brand">
                        Ver ejemplo
                      </a>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-superficie py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <Titulo etiqueta="Comparación" centrado>
                Todo lo que incluye cada plan
              </Titulo>
            </Reveal>

            <div className="mt-12 overflow-x-auto rounded-3xl border border-borde bg-fondo">
              <table className="w-full table-fixed border-collapse text-sm">
                <colgroup>
                  <col className="w-[34%] sm:w-1/2" />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr className="border-b border-borde">
                    <th scope="col" className="p-3 text-left sm:p-5">
                      <span className="sr-only">Qué incluye</span>
                    </th>
                    {PLANES.map((plan) => (
                      <th key={plan.id} scope="col" className={`px-1 py-4 text-center align-top sm:p-5 ${plan.id === 'semi' ? 'bg-brand/10' : ''}`}>
                        <a href={urlConPlan(plan.id)} className="block text-[10px] font-semibold text-brand uppercase hover:underline sm:text-xs sm:tracking-wide">
                          {plan.nombre}
                        </a>
                        <div className="mt-1">
                          <Precio plan={plan} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                {GRUPOS.map((g) => (
                  <tbody key={g.titulo}>
                    <tr>
                      <th colSpan={4} scope="colgroup" className="bg-superficie px-3 pt-6 pb-2 text-left font-display text-lg font-bold text-texto sm:px-5">
                        {g.titulo}
                      </th>
                    </tr>
                    {g.filas.map(([texto, ...valores]) => (
                      <tr key={texto} className="border-t border-borde">
                        <th scope="row" className="p-3 text-left font-normal break-words text-texto sm:px-5">
                          {texto}
                          <Nuevo texto={texto} />
                        </th>
                        {valores.map((v, i) => (
                          <td key={i} className={`px-1 py-3 text-center sm:px-3 ${i === 1 ? 'bg-brand/10' : ''}`}>
                            <Celda valor={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>

            <ul className="mt-6 space-y-1 text-sm text-suave">
              <li>Precios en pesos argentinos, pago único (en Premium, más el abono mensual).</li>
              <li>La dirección .com.ar se registra a tu nombre en NIC.ar y la pagás vos una vez por año.</li>
              <li>La impresión de tarjetas y carteles va por tu cuenta.</li>
              {conTurnos && <li>La seña de Mercado Pago va directo a tu cuenta; Mercado Pago cobra su comisión por cada pago.</li>}
            </ul>
          </div>
        </section>

        <section className="py-16 text-center sm:py-24">
          <div className="mx-auto max-w-2xl px-4">
            <Titulo centrado>¿Dudas sobre cuál elegir?</Titulo>
            <p className="mt-4 text-lg text-suave">Escribime, te cuento cuál le conviene más a tu negocio y en cuánto tiempo la tenés lista.</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-brand px-8 py-4 text-lg font-semibold text-sobre-brand transition hover:brightness-110"
            >
              Consultame por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
