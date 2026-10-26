import { site, tieneFormulario } from '../content.js'
import { whatsappUrl } from '../lib/whatsapp.js'
import ContactForm from './ContactForm.jsx'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

export default function Contacto() {
  const { etiqueta, titulo, texto, telefono, email, direccion, horarios, mapa } = site.contacto
  // mapa: dirección o lugar para el mapa embebido y el link "Cómo llegar" (Plan Profesional en adelante)
  const mapsUrl = site.contacto.mapsUrl ?? (mapa && `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapa)}`)
  const datos = [
    telefono && { label: 'Teléfono', valor: telefono, href: `tel:${telefono}` },
    email && { label: 'Email', valor: email, href: site.demo ? undefined : `mailto:${email}` },
    direccion && { label: 'Dirección', valor: direccion, href: mapsUrl },
    horarios && { label: 'Horarios', valor: horarios },
  ].filter(Boolean)

  return (
    <section id="contacto" className="scroll-mt-20 bg-superficie py-24">
      <div className={`mx-auto grid max-w-6xl gap-14 px-4 ${tieneFormulario ? 'md:grid-cols-2' : ''}`}>
        <Reveal className={tieneFormulario ? '' : 'text-center'}>
          <Titulo etiqueta={etiqueta} centrado={!tieneFormulario}>
            {titulo}
          </Titulo>
          <p className="mt-5 text-lg text-suave">{texto}</p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            Escribinos por WhatsApp
          </a>
          {datos.length > 0 && (
            <dl className={`mt-12 grid gap-6 sm:grid-cols-2 ${tieneFormulario ? '' : 'mx-auto max-w-lg text-left'}`}>
              {datos.map((d) => (
                <div key={d.label} className="border-l-2 border-brand pl-4">
                  <dt className="text-xs tracking-[0.2em] text-suave uppercase">{d.label}</dt>
                  <dd className="mt-1 font-medium text-texto">
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="hover:text-brand"
                      >
                        {d.valor}
                      </a>
                    ) : (
                      d.valor
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {mapa && (
            <div className="mt-10 overflow-hidden rounded-3xl border border-borde">
              <iframe
                title={`Mapa de ${site.nombre}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapa)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-64 w-full grayscale"
              />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-fondo px-5 py-4 font-semibold text-texto transition hover:text-brand"
              >
                Cómo llegar <span>→</span>
              </a>
            </div>
          )}
        </Reveal>
        {tieneFormulario && (
          <Reveal retraso={1}>
            <ContactForm />
          </Reveal>
        )}
      </div>
    </section>
  )
}
