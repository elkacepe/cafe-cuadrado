import { carta, cafe } from '../data/cafe.js'

const euros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })

export default function Menu() {
  return (
    <section id="carta" className="seccion carta">
      <div className="contenedor">
        <h2 className="titulo-seccion">La carta</h2>
        <div className="carta__grid">
          {carta.map((grupo) => (
            <div key={grupo.seccion} className="carta__grupo">
              <h3 className="carta__seccion">{grupo.seccion}</h3>
              <ul className="carta__lista">
                {grupo.productos.map((p) => (
                  <li key={p.nombre} className="carta__item">
                    <div className="carta__fila">
                      <span className="carta__nombre">{p.nombre}</span>
                      <span className="carta__puntos" aria-hidden="true" />
                      <span className="carta__precio">{euros.format(p.precio)}</span>
                    </div>
                    <p className="carta__detalle">{p.detalle}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="carta__horario">
          <h3 className="carta__seccion">Horario</h3>
          <ul>
            {cafe.horario.map((h) => (
              <li key={h.dias}>
                <span>{h.dias}</span>
                <span>{h.horas}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
