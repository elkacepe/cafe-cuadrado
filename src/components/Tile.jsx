// Baldosa hidráulica dibujada en SVG: el elemento gráfico de la marca.
// "variant" cambia los colores para poder combinar varias en una cuadrícula.

const variants = {
  cobalto: { fondo: 'var(--cobalto)', esquinas: 'var(--papel)', centro: 'var(--yema)', petalos: 'var(--papel)' },
  yema: { fondo: 'var(--yema)', esquinas: 'var(--cobalto)', centro: 'var(--espresso)', petalos: 'var(--cobalto)' },
  papel: { fondo: 'var(--papel)', esquinas: 'var(--cobalto)', centro: 'var(--yema)', petalos: 'var(--espresso)' },
  espresso: { fondo: 'var(--espresso)', esquinas: 'var(--yema)', centro: 'var(--papel)', petalos: 'var(--yema)' },
}

export default function Tile({ variant = 'cobalto', className = '', style }) {
  const c = variants[variant]
  return (
    <svg
      className={`tile ${className}`}
      style={style}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="100" height="100" fill={c.fondo} />
      {/* Cuartos de círculo en las esquinas: al juntar baldosas forman círculos completos */}
      <circle cx="0" cy="0" r="24" fill={c.esquinas} />
      <circle cx="100" cy="0" r="24" fill={c.esquinas} />
      <circle cx="0" cy="100" r="24" fill={c.esquinas} />
      <circle cx="100" cy="100" r="24" fill={c.esquinas} />
      {/* Flor central de cuatro pétalos */}
      <g fill={c.petalos}>
        <ellipse cx="50" cy="31" rx="9" ry="15" />
        <ellipse cx="50" cy="69" rx="9" ry="15" />
        <ellipse cx="31" cy="50" rx="15" ry="9" />
        <ellipse cx="69" cy="50" rx="15" ry="9" />
      </g>
      <circle cx="50" cy="50" r="9" fill={c.centro} />
    </svg>
  )
}
