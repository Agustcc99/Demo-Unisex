import { m } from 'motion/react'
import { site } from '../content.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

// Mosaico pensado para 6 fotos: la primera grande, la última ancha.
const formas = ['col-span-2 row-span-2', 'md:row-span-2', '', '', 'md:col-span-2', 'col-span-2']

export default function Galeria() {
  const { etiqueta, titulo, imagenes } = site.galeria

  return (
    <section id="galeria" className="scroll-mt-20 bg-fondo py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
        </Reveal>
        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
          {imagenes.map((img, i) => (
            // Cada foto entra con un leve giro, una detrás de otra.
            <m.figure
              key={img.src}
              initial={{ opacity: 0, scale: 0.8, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 70, damping: 16, delay: (i % 3) * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl bg-superficie ${formas[i] ?? ''}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-brand/50 to-acento/30 opacity-0 transition duration-500 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-black/80 to-transparent p-4 text-sm text-white transition duration-500 group-hover:translate-y-0">
                {img.alt}
              </figcaption>
            </m.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
