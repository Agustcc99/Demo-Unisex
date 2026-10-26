import { useState } from 'react'
import { site } from '../content.js'

// Formspree: envía el formulario por mail sin backend propio. Plan Semi en adelante.
export default function ContactForm() {
  const [estado, setEstado] = useState('idle') // idle | enviando | ok | error

  async function onSubmit(e) {
    e.preventDefault()
    if (site.demo) {
      e.target.reset()
      setEstado('demo')
      return
    }
    setEstado('enviando')
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(res.statusText)
      e.target.reset()
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  const input =
    'w-full rounded-xl border border-borde bg-superficie px-4 py-3 text-texto placeholder:text-suave focus:border-brand focus:outline-none'

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-borde bg-fondo p-8 shadow-xl">
      <p className="font-display text-2xl font-bold text-texto">Dejanos tu consulta</p>
      <input name="nombre" required placeholder="Tu nombre" className={input} />
      <input name="email" type="email" required placeholder="Tu email" className={input} />
      <input name="telefono" type="tel" placeholder="Tu teléfono (opcional)" className={input} />
      <textarea name="mensaje" required rows="4" placeholder="¿En qué te podemos ayudar?" className={input} />
      {/* Honeypot anti-spam de Formspree: los humanos no lo ven */}
      <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="hidden" />
      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="w-full rounded-full bg-brand px-6 py-4 font-semibold text-sobre-brand transition hover:brightness-110 disabled:opacity-60"
      >
        {estado === 'enviando' ? 'Enviando…' : 'Enviar consulta'}
      </button>
      {estado === 'ok' && <p className="text-center font-semibold text-texto">¡Gracias! Te respondemos a la brevedad.</p>}
      {estado === 'demo' && <p className="text-center font-semibold text-texto">Así funciona: en tu página, esta consulta te llega directo al mail.</p>}
      {estado === 'error' && <p className="text-center font-semibold text-red-500">No se pudo enviar. Probá por WhatsApp.</p>}
    </form>
  )
}
