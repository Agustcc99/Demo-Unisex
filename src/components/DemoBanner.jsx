import { site } from '../content.js'
import { PLANES, urlConPlan } from '../demo.js'
import { whatsappUrl } from '../lib/whatsapp.js'

// Franja de la página modelo: aclara que es un ejemplo, deja comparar planes y lleva al WhatsApp del vendedor.
export default function DemoBanner() {
  const actual = PLANES.find((p) => p.id === site.plan)
  const comparando = site.vista === 'comparar'
  const pestana = (activa) =>
    `rounded-full px-3 py-0.5 font-semibold transition ${activa ? 'bg-brand text-sobre-brand' : 'text-white/70 hover:text-white'}`

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 bg-black px-3 py-2 text-xs text-white sm:text-sm">
      <span className="text-white/70">
        Ejemplo para <strong className="text-white">{site.nombre}</strong>
      </span>
      <div role="group" aria-label="Ver plan" className="flex rounded-full bg-white/10 p-0.5">
        {PLANES.map((p) => (
          <a
            key={p.id}
            href={urlConPlan(p.id)}
            aria-current={!comparando && p.id === site.plan ? 'true' : undefined}
            className={pestana(!comparando && p.id === site.plan)}
          >
            {p.nombre}
          </a>
        ))}
        <a href={urlConPlan('comparar')} aria-current={comparando ? 'true' : undefined} className={pestana(comparando)}>
          Comparar
        </a>
      </div>
      <span className="order-last basis-full text-center text-[11px] text-white/60 sm:text-xs lg:order-none lg:basis-auto">
        {comparando ? 'Qué incluye cada plan, lado a lado' : `Plan ${actual.nombre}: ${actual.incluye(site.demo.slug)}`}
      </span>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-white/30 px-3 py-0.5 font-semibold hover:bg-white/10"
      >
        La quiero
      </a>
    </div>
  )
}
