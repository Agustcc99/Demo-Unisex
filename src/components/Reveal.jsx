import { m } from 'motion/react'

// Aparece al entrar en pantalla. efecto: 'subir' | 'izquierda' | 'derecha' | 'zoom'.
// Con "reducir movimiento" del sistema solo hace el fundido (MotionConfig en main.jsx).
const efectos = {
  subir: { y: 48 },
  izquierda: { x: -64 },
  derecha: { x: 64 },
  zoom: { scale: 0.85 },
}

export default function Reveal({ as = 'div', retraso = 0, efecto = 'subir', className = '', children, ...props }) {
  const Tag = m[as]

  return (
    <Tag
      initial={{ opacity: 0, filter: 'blur(6px)', ...efectos[efecto] }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 70, damping: 18, delay: retraso * 0.12 }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}
