import { m } from 'motion/react'
import { site } from '../content.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

// "Cómo reservar / cómo contratar" en 3 pasos (bloque de diseño, no cuenta como sección).
export default function Pasos() {
  const { etiqueta, titulo, items } = site.pasos

  return (
    <section className="bg-superficie py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <Titulo etiqueta={etiqueta} centrado>
            {titulo}
          </Titulo>
        </Reveal>
        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          {/* Línea que une los pasos y se dibuja al llegar (solo en escritorio). */}
          <m.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute inset-x-8 top-1/2 hidden h-1 origin-left rounded-full bg-linear-to-r from-brand via-acento to-resalte md:block"
          />
          {items.map((p, i) => (
            <Reveal
              as="li"
              key={p.titulo}
              retraso={i}
              efecto="zoom"
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="relative rounded-3xl border border-borde bg-fondo p-8 shadow-sm"
            >
              <span className="bg-linear-to-br from-brand to-acento bg-clip-text font-display text-6xl font-bold text-transparent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-texto">{p.titulo}</h3>
              <p className="mt-3 text-suave">{p.texto}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
