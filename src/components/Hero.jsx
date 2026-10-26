import { Fragment, useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { site } from '../content.js'
import { ctaPrincipal } from '../lib/whatsapp.js'

const resorte = { type: 'spring', stiffness: 80, damping: 18 }
const grupo = { visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
const aparecer = { oculto: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: resorte } }
// El título entra palabra por palabra, subiendo desde abajo de una "ventana".
const titulo = { visible: { transition: { staggerChildren: 0.07 } } }
const palabra = { oculto: { y: '110%' }, visible: { y: '0%', transition: { type: 'spring', stiffness: 90, damping: 16 } } }

export default function Hero() {
  const { etiqueta, titulo: texto, subtitulo, cta, imagen } = site.hero
  const datos =
    site.hero.datos ??
    [
      site.contacto.horarios && { label: 'Horarios', valor: site.contacto.horarios },
      site.contacto.direccion && { label: 'Dónde', valor: site.contacto.direccion },
    ].filter(Boolean)

  // Parallax: al bajar, la foto se mueve más lento y el texto se desvanece.
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yFoto = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacidadTexto = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const palabras = texto.split(' ')

  return (
    <section ref={ref} className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-black text-white">
      <m.img
        src={imagen}
        alt=""
        fetchpriority="high"
        style={{ y: yFoto }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/60 to-black/25" />
      <div className="absolute inset-0 -z-10 bg-linear-to-tr from-brand/35 via-transparent to-acento/20" />

      <m.div
        style={{ opacity: opacidadTexto }}
        variants={grupo}
        initial="oculto"
        animate="visible"
        className="mx-auto w-full max-w-6xl px-4 pt-56 pb-10 sm:pt-40"
      >
        {etiqueta && (
          <m.p
            variants={aparecer}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase backdrop-blur-md sm:text-xs sm:tracking-[0.3em]"
          >
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-resalte" />
            {etiqueta}
          </m.p>
        )}
        <m.h1
          variants={titulo}
          aria-label={texto}
          className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] font-bold text-balance sm:text-7xl lg:text-8xl"
        >
          {palabras.map((p, i) => (
            <Fragment key={i}>
              <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <m.span
                  variants={palabra}
                  className={`inline-block ${
                    i === palabras.length - 1 ? 'bg-linear-to-r from-resalte to-acento bg-clip-text text-transparent' : ''
                  }`}
                >
                  {p}
                </m.span>
              </span>{' '}
            </Fragment>
          ))}
        </m.h1>
        <m.p variants={aparecer} className="mt-6 max-w-xl text-lg text-white/80">
          {subtitulo}
        </m.p>

        <m.div variants={aparecer} className="mt-10 flex flex-wrap gap-3">
          <m.a
            {...ctaPrincipal()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-acento px-8 py-4 font-semibold text-sobre-brand shadow-2xl shadow-brand/40"
          >
            {cta}
            <span className="transition group-hover:translate-x-1">→</span>
          </m.a>
          <m.a
            href="#servicios"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full border border-white/40 px-8 py-4 font-semibold backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Ver servicios
          </m.a>
        </m.div>

        {datos.length > 0 && (
          <m.dl
            variants={aparecer}
            className="mt-10 grid grid-cols-3 gap-3 border-t border-white/20 pt-5 text-sm sm:mt-16 sm:gap-5 sm:pt-6 sm:text-base"
          >
            {datos.map((d) => (
              <div key={d.label}>
                <dt className="text-[10px] tracking-[0.2em] text-white/50 uppercase sm:text-xs">{d.label}</dt>
                <dd className="mt-1 font-medium">{d.valor}</dd>
              </div>
            ))}
          </m.dl>
        )}
      </m.div>
    </section>
  )
}
