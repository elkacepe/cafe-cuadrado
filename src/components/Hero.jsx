import { cafe } from '../data/cafe.js'
import Tile from './Tile.jsx'

// Orden de colores de la cuadrícula de baldosas del hero (3 x 3).
const suelo = ['cobalto', 'papel', 'yema', 'papel', 'cobalto', 'papel', 'espresso', 'papel', 'cobalto']

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner contenedor">
        <div className="hero__texto">
          <h1 className="hero__titulo">
            Café
            <br />
            Cuadrado
          </h1>
          <p className="hero__lema">{cafe.lema}</p>
          <div className="hero__acciones">
            <a href="#carta" className="boton boton--primario">Ver la carta</a>
            <a href="#contacto" className="boton boton--secundario">Escribirnos</a>
          </div>
          <p className="hero__horario">
            {cafe.horario[0].dias}, de {cafe.horario[0].horas}
            <br />
            {cafe.direccion}
          </p>
        </div>

        {/* La única animación de la página: las baldosas se colocan una a una al cargar */}
        <div className="hero__suelo" aria-hidden="true">
          {suelo.map((v, i) => (
            <Tile key={i} variant={v} className="hero__baldosa" style={{ '--i': i }} />
          ))}
        </div>
      </div>
    </section>
  )
}
