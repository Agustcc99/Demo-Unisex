import { m } from 'motion/react'
import { site } from '../content.js'

// Dos franjas cruzadas con palabras clave que corren en sentidos opuestos (bloque de diseño, no cuenta como sección).
function Fila({ reversa = false, className }) {
  const palabras = [...site.cinta, ...site.cinta, ...site.cinta]
  const fila = (
    <div className="flex shrink-0 items-center gap-10 pr-10 font-display text-2xl font-bold tracking-wide uppercase">
      {palabras.map((p, i) => (
        <span key={i} className="flex items-center gap-10">
          {p}
          <span className="opacity-50">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`left-[-5%] w-[110%] py-4 shadow-lg ${className}`}>
      <m.div
        className="flex w-max"
        animate={{ x: reversa ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {fila}
        {fila}
      </m.div>
    </div>
  )
}

export default function Cinta() {
  return (
    <div className="relative overflow-hidden bg-fondo py-12 sm:py-10" aria-hidden="true">
      <Fila reversa className="absolute top-12 rotate-3 sm:top-10 sm:rotate-[1.5deg] bg-resalte text-sobre-resalte opacity-90" />
      <Fila className="relative z-10 -rotate-3 sm:-rotate-[1.5deg] bg-linear-to-r from-brand via-acento to-brand text-sobre-brand" />
    </div>
  )
}
