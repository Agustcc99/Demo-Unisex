import { m } from 'motion/react'

// Encabezado de sección: etiqueta chica en color de marca (con una rayita que se dibuja) + título grande.
export default function Titulo({ etiqueta, centrado = false, children }) {
  return (
    <div className={centrado ? 'text-center' : ''}>
      {etiqueta && (
        <p
          className={`flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-brand uppercase ${centrado ? 'justify-center' : ''}`}
        >
          <m.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="h-0.5 w-8 origin-left rounded-full bg-linear-to-r from-brand to-acento"
          />
          {etiqueta}
        </p>
      )}
      <h2 className="mt-3 font-display text-4xl leading-tight font-bold text-texto sm:text-5xl">{children}</h2>
    </div>
  )
}
