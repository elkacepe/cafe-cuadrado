import { useState } from 'react'
import { cafe } from '../data/cafe.js'
import {
  enviarMensaje,
  modoDemo,
  leerMensajesDemo,
  borrarMensajesDemo,
} from '../services/contact.js'

const vacio = { nombre: '', email: '', motivo: 'Reservar una mesa', mensaje: '' }
const motivos = ['Reservar una mesa', 'Hacer un encargo', 'Otra cosa']

function validar(v) {
  const errores = {}
  if (!v.nombre.trim()) errores.nombre = 'Escribe tu nombre.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errores.email = 'Escribe un correo válido, por ejemplo nombre@correo.com.'
  if (v.mensaje.trim().length < 10) errores.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).'
  return errores
}

export default function ContactForm() {
  const [valores, setValores] = useState(vacio)
  const [errores, setErrores] = useState({})
  // estado: 'listo' | 'enviando' | 'enviado' | 'error'
  const [estado, setEstado] = useState('listo')
  const [mensajeError, setMensajeError] = useState('')
  const [guardados, setGuardados] = useState(() => leerMensajesDemo().length)

  function cambiar(e) {
    const { name, value } = e.target
    setValores((v) => ({ ...v, [name]: value }))
    if (errores[name]) setErrores((er) => ({ ...er, [name]: undefined }))
  }

  async function enviar(e) {
    e.preventDefault()
    const nuevosErrores = validar(valores)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) {
      document.getElementById(`campo-${Object.keys(nuevosErrores)[0]}`)?.focus()
      return
    }

    setEstado('enviando')
    try {
      await enviarMensaje(valores)
      setEstado('enviado')
      setGuardados(leerMensajesDemo().length)
    } catch (err) {
      setMensajeError(err.message)
      setEstado('error')
    }
  }

  function otroMensaje() {
    setValores(vacio)
    setEstado('listo')
  }

  return (
    <section id="contacto" className="seccion contacto">
      <div className="contenedor contacto__inner">
        <div className="contacto__intro">
          <h2 className="titulo-seccion">Escríbenos</h2>
          <p>
            Reservas para grupos, encargos de bizcocho entero o cualquier otra cosa.
            Respondemos en el día, salvo los domingos.
          </p>
          <address className="contacto__datos">
            <span>{cafe.direccion}</span>
            <a href={`tel:${cafe.telefono.replace(/\s/g, '')}`}>{cafe.telefono}</a>
            <a href={`mailto:${cafe.email}`}>{cafe.email}</a>
          </address>
        </div>

        <div className="contacto__panel">
          {estado === 'enviado' ? (
            <div className="contacto__exito" role="status" aria-live="polite">
              <h3>Mensaje enviado</h3>
              <p>
                Gracias, {valores.nombre.split(' ')[0]}. Te responderemos a {valores.email}.
              </p>
              {modoDemo && (
                <p className="contacto__nota">
                  Modo demostración: el mensaje no salió a internet, quedó guardado en este
                  navegador. Mensajes guardados: {guardados}.
                </p>
              )}
              <button type="button" className="boton boton--secundario" onClick={otroMensaje}>
                Escribir otro mensaje
              </button>
            </div>
          ) : (
            <form className="formulario" onSubmit={enviar} noValidate>
              <div className="campo">
                <label htmlFor="campo-nombre">Nombre</label>
                <input
                  id="campo-nombre"
                  name="nombre"
                  autoComplete="name"
                  value={valores.nombre}
                  onChange={cambiar}
                  aria-invalid={!!errores.nombre}
                  aria-describedby={errores.nombre ? 'error-nombre' : undefined}
                />
                {errores.nombre && <p id="error-nombre" className="campo__error">{errores.nombre}</p>}
              </div>

              <div className="campo">
                <label htmlFor="campo-email">Correo electrónico</label>
                <input
                  id="campo-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={valores.email}
                  onChange={cambiar}
                  aria-invalid={!!errores.email}
                  aria-describedby={errores.email ? 'error-email' : undefined}
                />
                {errores.email && <p id="error-email" className="campo__error">{errores.email}</p>}
              </div>

              <fieldset className="campo campo--motivos">
                <legend>¿Sobre qué nos escribes?</legend>
                <div className="motivos">
                  {motivos.map((m) => (
                    <label key={m} className="motivo">
                      <input
                        type="radio"
                        name="motivo"
                        value={m}
                        checked={valores.motivo === m}
                        onChange={cambiar}
                      />
                      <span>{m}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="campo">
                <label htmlFor="campo-mensaje">Mensaje</label>
                <textarea
                  id="campo-mensaje"
                  name="mensaje"
                  rows="5"
                  value={valores.mensaje}
                  onChange={cambiar}
                  aria-invalid={!!errores.mensaje}
                  aria-describedby={errores.mensaje ? 'error-mensaje' : undefined}
                />
                {errores.mensaje && <p id="error-mensaje" className="campo__error">{errores.mensaje}</p>}
              </div>

              {estado === 'error' && (
                <p className="formulario__error" role="alert">
                  No se pudo enviar el mensaje. {mensajeError} Inténtalo de nuevo o escríbenos a {cafe.email}.
                </p>
              )}

              <button type="submit" className="boton boton--primario" disabled={estado === 'enviando'}>
                {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
              </button>

              {modoDemo && guardados > 0 && (
                <p className="contacto__nota">
                  Modo demostración: hay {guardados} mensaje{guardados === 1 ? '' : 's'} de prueba guardado
                  {guardados === 1 ? '' : 's'} en este navegador.{' '}
                  <button
                    type="button"
                    className="enlace"
                    onClick={() => {
                      borrarMensajesDemo()
                      setGuardados(0)
                    }}
                  >
                    Borrar mensajes de prueba
                  </button>
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
