import { m } from 'motion/react'
import { site } from '../content.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

const lista = { visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }
const punto = { oculto: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } } }
const tilde = { oculto: { scale: 0 }, visible: { scale: 1, transition: { type: 'spring', stiffness: 400, damping: 12 } } }

export default function Nosotros() {
  const { etiqueta, titulo, texto, imagen, puntos = [] } = site.nosotros

  return (
    <section id="nosotros" className="scroll-mt-20 overflow-hidden bg-superficie py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 md:grid-cols-2">
        {imagen && (
          <Reveal efecto="izquierda" className="relative mr-4 mb-4">
            <div aria-hidden="true" className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-resalte opacity-60 blur-2xl" />
            {/* El marco se corre a su lugar cuando aparece la foto. */}
            <m.div
              aria-hidden="true"
              initial={{ x: 0, y: 0 }}
              whileInView={{ x: 16, y: 16 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.4 }}
              className="absolute inset-0 rounded-3xl border-2 border-brand"
            />
            <img src={imagen} alt={titulo} loading="lazy" className="relative aspect-[4/5] w-full rounded-3xl object-cover" />
          </Reveal>
        )}
        <Reveal retraso={1} efecto="derecha">
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-6 text-lg leading-relaxed text-suave">{texto}</p>
          {puntos.length > 0 && (
            <m.ul variants={lista} initial="oculto" whileInView="visible" viewport={{ once: true }} className="mt-8 space-y-4">
              {puntos.map((p) => (
                <m.li key={p} variants={punto} className="flex gap-4">
                  <m.span
                    variants={tilde}
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-acento text-xs font-bold text-sobre-brand"
                  >
                    ✓
                  </m.span>
                  <span className="text-texto">{p}</span>
                </m.li>
              ))}
            </m.ul>
          )}
        </Reveal>
      </div>
    </section>
  )
}
