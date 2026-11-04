import { descripcion } from '../data/cafe.js'

export default function About() {
  return (
    <section id="nosotros" className="seccion about">
      <div className="contenedor about__inner">
        <h2 className="titulo-seccion">{descripcion.titulo}</h2>
        <div className="about__texto">
          {descripcion.parrafos.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <dl className="about__datos">
          {descripcion.datos.map((d) => (
            <div key={d.texto} className="about__dato">
              <dt>{d.texto}</dt>
              <dd>{d.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
