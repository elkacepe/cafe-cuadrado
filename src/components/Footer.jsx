import { cafe } from '../data/cafe.js'
import Tile from './Tile.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cenefa" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <Tile key={i} variant={i % 2 ? 'papel' : 'cobalto'} />
        ))}
      </div>
      <div className="contenedor footer__inner">
        <p className="footer__marca">{cafe.nombre}</p>
        <p>{cafe.direccion}</p>
        <p>{cafe.instagram}</p>
        <p className="footer__legal">Proyecto de demostración. Cafetería ficticia.</p>
      </div>
    </footer>
  )
}
