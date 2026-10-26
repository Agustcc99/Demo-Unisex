import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { site } from '../content.js'
import { whatsappUrl } from '../lib/whatsapp.js'
import Reveal from './Reveal.jsx'

// Cierre con foto y llamado a la acción (bloque de diseño, no cuenta como sección).
export default function CtaFinal() {
  const { titulo, texto, boton, imagen } = site.ctaFinal

  // Parallax: la foto se desplaza más lento que la página.
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yFoto = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-black py-32 text-center text-white">
      {imagen && (
        <m.img
          src={imagen}
          alt=""
          loading="lazy"
          style={{ y: yFoto }}
          className="absolute inset-x-0 -top-[15%] -z-20 h-[130%] w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-black/70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,var(--color-brand)_0%,transparent_65%)] opacity-50" />
      <Reveal efecto="zoom" className="mx-auto max-w-3xl px-4">
        <h2 className="font-display text-5xl leading-tight font-bold text-balance sm:text-6xl">{titulo}</h2>
        <p className="mt-5 text-lg text-white/75">{texto}</p>
        <m.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-acento px-10 py-4 text-lg font-semibold text-sobre-brand shadow-2xl shadow-brand/50"
        >
          {boton} <span>→</span>
        </m.a>
      </Reveal>
    </section>
  )
}
