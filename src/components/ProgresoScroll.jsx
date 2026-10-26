import { m, useScroll, useSpring } from 'motion/react'

// Barra fina arriba de todo que se llena a medida que se baja por la página.
export default function ProgresoScroll() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 })

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-linear-to-r from-brand via-acento to-resalte"
    />
  )
}
