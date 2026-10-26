import { site } from './content.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Cinta from './components/Cinta.jsx'
import Servicios from './components/Servicios.jsx'
import Reservas from './components/Reservas.jsx'
import Nosotros from './components/Nosotros.jsx'
import Galeria from './components/Galeria.jsx'
import Pasos from './components/Pasos.jsx'
import Faq from './components/Faq.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import Comparacion from './components/Comparacion.jsx'
import ProgresoScroll from './components/ProgresoScroll.jsx'

export default function App() {
  if (site.vista === 'comparar') return <Comparacion />

  return (
    <div className="min-h-screen overflow-x-clip bg-fondo font-sans text-texto antialiased selection:bg-brand selection:text-sobre-brand">
      <ProgresoScroll />
      <Navbar />
      <main>
        <Hero />
        {site.cinta?.length > 0 && <Cinta />}
        <Servicios />
        {site.nosotros && <Nosotros />}
        {site.galeria?.imagenes.length > 0 && <Galeria />}
        {site.pasos && <Pasos />}
        {site.reservas && <Reservas />}
        {site.ctaFinal && <CtaFinal />}
        <Contacto />
        {site.faq.length > 0 && <Faq />}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
