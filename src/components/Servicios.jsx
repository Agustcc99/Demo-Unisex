import { site } from '../content.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

const rebote = { type: 'spring', stiffness: 300, damping: 20 }

// estilo 'lista': carta con línea punteada hasta el precio. estilo 'tarjetas': grilla de tarjetas con ícono.
export default function Servicios() {
  const { etiqueta, titulo, estilo = 'tarjetas', items } = site.servicios

  return (
    <section id="servicios" className="scroll-mt-20 bg-fondo py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
        </Reveal>

        {estilo === 'lista' ? (
          <div className="mt-14 grid gap-x-16 md:grid-cols-2">
            {items.map((s, i) => (
              <Reveal
                key={s.titulo}
                retraso={i % 2}
                efecto={i % 2 ? 'derecha' : 'izquierda'}
                whileHover={{ x: 8, transition: rebote }}
                className="group py-5"
              >
                <div className="flex items-baseline gap-4">
                  <h3 className="font-display text-2xl font-bold text-texto transition group-hover:text-brand">{s.titulo}</h3>
                  <span className="flex-1 border-b-2 border-dotted border-borde transition group-hover:border-brand" />
                  {s.precio && <span className="font-display text-2xl font-bold text-brand">{s.precio}</span>}
                </div>
                <p className="mt-2 text-suave">{s.descripcion}</p>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s, i) => (
              <Reveal
                as="article"
                key={s.titulo}
                retraso={i % 3}
                efecto="zoom"
                whileHover={{ y: -8, rotate: -1, transition: rebote }}
                className="rounded-3xl border border-borde bg-superficie p-8 transition-colors hover:border-brand hover:shadow-xl hover:shadow-brand/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand/20 to-acento/20 text-2xl">
                  {s.icono}
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-texto">{s.titulo}</h3>
                <p className="mt-2 text-suave">{s.descripcion}</p>
                {s.precio && <p className="mt-5 font-display text-xl font-bold text-brand">{s.precio}</p>}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
