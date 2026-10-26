import { useEffect, useState } from 'react'
import { site } from '../content.js'
import { ctaPrincipal } from '../lib/whatsapp.js'
import DemoBanner from './DemoBanner.jsx'

const nombreDe = (seccion) => seccion?.etiqueta ?? seccion?.titulo

const links = [
  { href: '#servicios', label: nombreDe(site.servicios), visible: true },
  { href: '#nosotros', label: nombreDe(site.nosotros), visible: Boolean(site.nosotros) },
  { href: '#galeria', label: nombreDe(site.galeria), visible: site.galeria?.imagenes.length > 0 },
  { href: '#reservas', label: nombreDe(site.reservas), visible: Boolean(site.reservas) },
  { href: '#contacto', label: nombreDe(site.contacto), visible: true },
  { href: '#faq', label: 'Preguntas', visible: site.faq.length > 0 },
].filter((l) => l.visible)

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const [scrolleado, setScrolleado] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolleado(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transparente sobre la portada; sólido al bajar o con el menú abierto.
  const solido = scrolleado || abierto

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {site.demo && <DemoBanner />}
      <div
        className={`transition-colors duration-300 ${
          solido ? 'border-b border-borde bg-fondo/90 text-texto backdrop-blur-md' : 'bg-transparent text-white'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-wide">
            {site.logo ? (
              <img src={site.logo} alt={site.nombre} className="h-10 w-auto" />
            ) : (
              <>
                {site.logoIcono && <img src={site.logoIcono} alt="" className="h-9 w-9 shrink-0" />}
                {site.nombre}
              </>
            )}
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-medium opacity-80 transition hover:opacity-100">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                {...ctaPrincipal()}
                className="rounded-full bg-linear-to-r from-brand to-acento px-5 py-2.5 text-sm font-semibold text-sobre-brand transition hover:brightness-110"
              >
                {site.hero.cta}
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setAbierto(!abierto)}
            className="rounded-md p-2 md:hidden"
            aria-label="Abrir menú"
            aria-expanded={abierto}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d={abierto ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </nav>

        {abierto && (
          <ul className="border-t border-borde px-4 py-2 md:hidden">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setAbierto(false)} className="block py-3 font-display text-lg font-bold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}
