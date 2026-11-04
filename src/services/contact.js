// ─────────────────────────────────────────────────────────────
// PUNTO DE CONEXIÓN DEL FORMULARIO DE CONTACTO
// ─────────────────────────────────────────────────────────────
// Hay dos modos, y se elige solo con una variable de entorno:
//
// 1. Modo real (Formspree): si existe VITE_FORMSPREE_ID, el mensaje se envía
//    a https://formspree.io/f/<ID> y llega por correo a la cuenta de Formspree.
//
// 2. Modo demostración: si NO existe la variable, no sale nada a internet.
//    El mensaje se guarda en el localStorage del navegador (clave STORAGE_KEY)
//    y la pantalla muestra la confirmación como si se hubiera enviado.
//    Para probar el estado de error, usa un correo que empiece por "error@".
// ─────────────────────────────────────────────────────────────

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID
export const STORAGE_KEY = 'cafe-cuadrado:mensajes'
export const modoDemo = !FORMSPREE_ID

export async function enviarMensaje(datos) {
  if (modoDemo) return enviarDemo(datos)

  const respuesta = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!respuesta.ok) {
    throw new Error('El servicio de correo no aceptó el mensaje.')
  }
  return { ok: true }
}

async function enviarDemo(datos) {
  // Simula el tiempo de respuesta de un servidor
  await new Promise((r) => setTimeout(r, 900))

  if (datos.email.toLowerCase().startsWith('error@')) {
    throw new Error('Envío de prueba rechazado (correo "error@...").')
  }

  const guardados = leerMensajesDemo()
  guardados.push({ ...datos, fecha: new Date().toISOString() })
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guardados))
  } catch {
    // Si el navegador bloquea el almacenamiento, la demo sigue funcionando
  }
  return { ok: true }
}

export function leerMensajesDemo() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export function borrarMensajesDemo() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // nada que borrar
  }
}
