import { site } from '../content.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-fondo py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <Titulo etiqueta="Dudas" centrado>
            Preguntas frecuentes
          </Titulo>
        </Reveal>
        <div className="mt-12 divide-y divide-borde border-y border-borde">
          {site.faq.map((f) => (
            <details key={f.pregunta} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold text-texto">
                {f.pregunta}
                <span className="text-2xl text-brand transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-suave">{f.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
