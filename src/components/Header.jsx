import { useState } from 'react'
import { cafe } from '../data/cafe.js'
import Tile from './Tile.jsx'

const enlaces = [
  { href: '#nosotros', texto: 'Nosotros' },
  { href: '#carta', texto: 'Carta' },
  { href: '#contacto', texto: 'Contacto' },
]

export default function Header() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="header">
      <div className="header__inner contenedor">
        <a href="#inicio" className="header__marca" onClick={() => setAbierto(false)}>
          <Tile variant="cobalto" className="header__logo" />
          <span>{cafe.nombre}</span>
        </a>

        {/* Botón de menú: solo visible en móvil */}
        <button
          type="button"
          className="header__toggle"
          aria-expanded={abierto}
          aria-controls="navegacion"
          onClick={() => setAbierto(!abierto)}
        >
          {abierto ? 'Cerrar' : 'Menú'}
        </button>

        <nav id="navegacion" className={`header__nav ${abierto ? 'is-open' : ''}`} aria-label="Principal">
          {enlaces.map((e) => (
            <a key={e.href} href={e.href} onClick={() => setAbierto(false)}>
              {e.texto}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
