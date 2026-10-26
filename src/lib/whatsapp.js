import { site } from '../content.js'

export function whatsappUrl(mensaje = site.whatsapp.mensaje) {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`
}

// Destino del botón principal: con turnos online (Premium) va a la reserva; si no, a WhatsApp.
export function ctaPrincipal() {
  return site.reservas
    ? { href: '#reservas' }
    : { href: whatsappUrl(), target: '_blank', rel: 'noopener noreferrer' }
}
