import { useEffect, useMemo, useState } from 'react'
import { site } from '../content.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

// Turnos online (Plan Premium). En una demo funciona con datos de ejemplo y muestra el panel del negocio;
// con `reservas.sena` la demo simula además el pago de la seña (extra del Premium, ver PLANES.md);
// en un cliente real usa la API de /web-backend: GET /disponibilidad?fecha=&servicio= y POST /turnos.
const API = import.meta.env.VITE_API_URL
const HORARIOS = ['10:00', '10:45', '11:30', '12:15', '14:00', '14:45', '15:30', '16:15', '17:00', '17:45', '18:30', '19:15', '20:00']
const NOMBRES = ['Sofía', 'Martín', 'Valentina', 'Lucas', 'Camila', 'Tomás', 'Lucía', 'Benja']

const fechaIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const ocupadoDemo = (dia, i) => (dia * 5 + i * 3) % 7 < 2

// Próximos días hábiles: lunes a sábado, como los horarios de content.js.
function proximosDias(cantidad) {
  const dias = []
  const d = new Date()
  while (dias.length < cantidad) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0) dias.push(new Date(d))
  }
  return dias
}

function Paso({ n, titulo, children }) {
  return (
    <div role="group" aria-label={titulo} className="mt-8 first:mt-0">
      <p className="mb-3 flex items-center gap-3 font-display text-lg font-bold text-texto">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm text-sobre-brand">{n}</span>
        {titulo}
      </p>
      {children}
    </div>
  )
}

const chip = (activo) =>
  `rounded-full border px-4 py-2 text-sm font-medium transition ${
    activo ? 'border-brand bg-brand text-sobre-brand' : 'border-borde text-texto hover:border-brand'
  }`

export default function Reservas() {
  const { etiqueta, titulo, texto } = site.reservas
  const sena = site.demo ? site.reservas.sena : null // la seña real necesita el backend con Mercado Pago
  const servicios = site.servicios.items
  const dias = useMemo(() => proximosDias(6), [])

  const [servicio, setServicio] = useState(null)
  const [dia, setDia] = useState(null)
  const [hora, setHora] = useState(null)
  const [estado, setEstado] = useState('eligiendo') // eligiendo | pagando | enviando | ok | error
  const [nombre, setNombre] = useState('')
  const [libresApi, setLibresApi] = useState(null)
  const [agenda, setAgenda] = useState(() =>
    [0, 1].flatMap((d) =>
      HORARIOS.flatMap((h, i) => (ocupadoDemo(d, i) ? [{ dia: d, hora: h }] : [])).map((t, k) => ({
        ...t,
        nombre: NOMBRES[(t.dia * 4 + k) % NOMBRES.length],
        servicio: servicios[(t.dia + k) % servicios.length].titulo,
      })),
    ),
  )

  // Cliente real: pedir horarios libres a la API.
  useEffect(() => {
    if (site.demo || dia === null || !servicio) return
    setLibresApi(null)
    fetch(`${API}/disponibilidad?fecha=${fechaIso(dias[dia])}&servicio=${encodeURIComponent(servicio)}`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setLibresApi)
      .catch(() => setLibresApi([]))
  }, [dia, servicio, dias])

  const horarios =
    dia === null
      ? []
      : site.demo
        ? HORARIOS.map((h, i) => ({ hora: h, libre: !agenda.some((t) => t.dia === dia && t.hora === h) && !ocupadoDemo(dia, i) }))
        : (libresApi ?? []).map((h) => ({ hora: h, libre: true }))

  const diaLargo = (d) => dias[d].toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })

  async function onSubmit(e) {
    e.preventDefault()
    const datos = Object.fromEntries(new FormData(e.target))
    if (site.demo) {
      if (sena) {
        setNombre(datos.nombre)
        setEstado('pagando')
        return
      }
      setAgenda((a) => [...a, { dia, hora, nombre: datos.nombre, servicio, nuevo: true }])
      setEstado('ok')
      return
    }
    setEstado('enviando')
    try {
      const res = await fetch(`${API}/turnos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servicio, fecha: fechaIso(dias[dia]), hora, nombre: datos.nombre, telefono: datos.telefono }),
      })
      if (!res.ok) throw new Error(res.statusText)
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  function pagarSena() {
    setAgenda((a) => [...a, { dia, hora, nombre, servicio, nuevo: true, sena: true }])
    setEstado('ok')
  }

  function reiniciar() {
    setServicio(null)
    setDia(null)
    setHora(null)
    setEstado('eligiendo')
  }

  const input =
    'w-full rounded-xl border border-borde bg-superficie px-4 py-3 text-texto placeholder:text-suave focus:border-brand focus:outline-none'

  return (
    <section id="reservas" className="scroll-mt-20 bg-superficie py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-4 max-w-2xl text-lg text-suave">{texto}</p>
        </Reveal>

        <div className={`mt-14 grid gap-8 ${site.demo ? 'lg:grid-cols-5' : ''}`}>
          <Reveal className="rounded-3xl border border-borde bg-fondo p-6 shadow-xl sm:p-8 lg:col-span-3">
            {estado === 'pagando' ? (
              <div className="py-6 text-center">
                <p className="text-xs tracking-[0.2em] text-suave uppercase">Mercado Pago · simulación</p>
                <p className="mt-3 font-display text-3xl font-bold text-texto">Seña de {sena.monto}</p>
                <p className="mt-2 text-suave first-letter:uppercase">
                  {servicio} · {diaLargo(dia)} · {hora} h
                </p>
                <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-borde bg-superficie p-4 text-left text-sm text-suave">
                  Acá se abre Mercado Pago y la clienta paga con tarjeta, dinero en cuenta o transferencia. El horario queda guardado 15
                  minutos; si no paga, se libera solo.
                </div>
                <button
                  type="button"
                  onClick={pagarSena}
                  className="mt-6 w-full max-w-sm rounded-full bg-brand px-6 py-4 font-semibold text-sobre-brand transition hover:brightness-110"
                >
                  Pagar {sena.monto} (simulado)
                </button>
                <button type="button" onClick={() => setEstado('eligiendo')} className="mt-4 block w-full text-sm font-semibold text-suave underline">
                  Volver
                </button>
              </div>
            ) : estado === 'ok' ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-3xl text-sobre-brand">✓</div>
                <p className="mt-6 font-display text-3xl font-bold text-texto">¡Turno reservado!</p>
                <p className="mt-3 text-suave first-letter:uppercase">
                  {servicio} · {diaLargo(dia)} · {hora} h
                </p>
                {sena && (
                  <p className="mt-2 text-sm font-semibold text-brand">
                    Seña de {sena.monto} pagada · podés ver o cancelar tu turno desde el link que te llega por WhatsApp
                  </p>
                )}
                {site.demo && (
                  <p className="mx-auto mt-6 max-w-md rounded-2xl border border-borde bg-superficie p-4 text-sm text-suave">
                    Así funciona en tu página: el turno aparece al instante en tu panel y ese horario se bloquea para los demás.
                  </p>
                )}
                <button type="button" onClick={reiniciar} className="mt-8 text-sm font-semibold text-brand underline">
                  Reservar otro turno
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <Paso n={1} titulo="Elegí el servicio">
                  <div className="flex flex-wrap gap-2">
                    {servicios.map((s) => (
                      <button key={s.titulo} type="button" onClick={() => setServicio(s.titulo)} className={chip(servicio === s.titulo)}>
                        {s.titulo}
                        {s.precio && <span className="opacity-70"> · {s.precio}</span>}
                      </button>
                    ))}
                  </div>
                </Paso>

                <Paso n={2} titulo="Elegí el día">
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {dias.map((d, i) => (
                      <button
                        key={fechaIso(d)}
                        type="button"
                        onClick={() => {
                          setDia(i)
                          setHora(null)
                        }}
                        className={`${chip(dia === i)} flex flex-col items-center rounded-2xl py-3`}
                      >
                        <span className="text-xs uppercase opacity-70">{d.toLocaleDateString('es-AR', { weekday: 'short' })}</span>
                        <span className="font-display text-xl font-bold">{d.getDate()}</span>
                      </button>
                    ))}
                  </div>
                </Paso>

                <Paso n={3} titulo="Elegí el horario">
                  {dia === null ? (
                    <p className="text-sm text-suave">Primero elegí un día.</p>
                  ) : !site.demo && libresApi === null ? (
                    <p className="text-sm text-suave">Buscando horarios…</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {horarios.map((h) => (
                        <button
                          key={h.hora}
                          type="button"
                          disabled={!h.libre}
                          onClick={() => setHora(h.hora)}
                          className={`${chip(hora === h.hora)} disabled:cursor-not-allowed disabled:line-through disabled:opacity-30`}
                        >
                          {h.hora}
                        </button>
                      ))}
                    </div>
                  )}
                </Paso>

                <Paso n={4} titulo="Tus datos">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input name="nombre" required placeholder="Tu nombre" className={input} />
                    <input name="telefono" type="tel" required placeholder="Tu WhatsApp" className={input} />
                  </div>
                </Paso>

                {sena && (
                  <div className="mt-8 rounded-2xl border border-borde bg-superficie p-4 text-sm text-suave">
                    <span className="mb-2 inline-block rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-semibold text-brand">
                      Extra opcional del plan Premium
                    </span>
                    <p>{sena.texto}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!servicio || dia === null || !hora || estado === 'enviando'}
                  className="mt-8 w-full rounded-full bg-brand px-6 py-4 font-semibold text-sobre-brand transition hover:brightness-110 disabled:opacity-40"
                >
                  {estado === 'enviando' ? 'Reservando…' : sena ? `Pagar seña de ${sena.monto} y confirmar` : 'Confirmar turno'}
                </button>
                {estado === 'error' && (
                  <p className="mt-3 text-center text-sm font-semibold text-red-500">No se pudo reservar. Probá de nuevo o escribinos por WhatsApp.</p>
                )}
              </form>
            )}
          </Reveal>

          {site.demo && (
            <Reveal retraso={1} className="lg:col-span-2">
              <div className="h-full rounded-3xl border border-borde bg-fondo p-6 shadow-2xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-suave uppercase">Así lo ves vos</p>
                    <p className="mt-1 font-display text-xl font-bold text-texto">Panel de turnos</p>
                  </div>
                  <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">{agenda.length} turnos</span>
                </div>
                <ul className="mt-6 divide-y divide-borde">
                  {[...agenda]
                    .sort((a, b) => Number(!!b.nuevo) - Number(!!a.nuevo) || a.dia - b.dia || a.hora.localeCompare(b.hora))
                    .slice(0, 6)
                    .map((t) => (
                      <li key={`${t.dia}-${t.hora}`} className="flex items-center gap-4 py-3">
                        <div className="w-16 shrink-0">
                          <p className="text-[10px] tracking-wider text-suave uppercase">
                            {dias[t.dia].toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' })}
                          </p>
                          <p className="font-display text-lg font-bold text-brand">{t.hora}</p>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-texto">{t.nombre}</p>
                          <p className="truncate text-sm text-suave">{t.servicio}</p>
                        </div>
                        {t.sena && <span className="text-xs font-semibold text-brand">Seña ✓</span>}
                        {t.nuevo && <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-sobre-brand">Nuevo</span>}
                      </li>
                    ))}
                </ul>
                <p className="mt-4 text-xs text-suave">Vista de ejemplo del panel del negocio (lo ves desde el celu).</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
