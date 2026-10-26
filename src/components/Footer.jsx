import { site } from '../content.js'

export default function Footer() {
  const redes = Object.entries(site.redes).filter(([, url]) => url)

  return (
    <footer className="border-t border-borde bg-fondo pt-12 pb-24 text-sm text-suave sm:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:pr-24">
        <div className="text-center sm:text-left">
          <p className="flex items-center justify-center gap-2.5 font-display text-2xl font-bold text-texto sm:justify-start">
            {site.logoIcono && <img src={site.logoIcono} alt="" className="h-9 w-9 shrink-0" />}
            {site.nombre}
          </p>
          <p className="mt-1">© {new Date().getFullYear()} · Todos los derechos reservados</p>
        </div>
        {redes.length > 0 && (
          <ul className="flex gap-6">
            {redes.map(([red, url]) => (
              <li key={red}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize transition hover:text-brand">
                  {red}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  )
}
