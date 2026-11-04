# Café Cuadrado

Landing de una cafetería de barrio ficticia, hecha con React y Vite.
Tiene cuatro bloques: hero, descripción ("Nosotros"), carta pequeña con horario y formulario de contacto.

---

## 1. Cómo arrancar el proyecto

**Requisitos:** Node.js 20.19 o superior (recomendado Node 22, indicado en `.nvmrc`). Vite 8 no funciona con versiones anteriores.

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Levantar en local, con recarga automática al guardar cambios
npm run dev
# → abre http://localhost:5173

# 3. Generar la versión final para publicar (se crea la carpeta dist/)
npm run build

# 4. Ver en local esa versión final
npm run preview
# → abre http://localhost:4173
```

Si usas `nvm`, basta con `nvm use` dentro de la carpeta para activar la versión correcta de Node.

### Dónde está cada cosa

```
cafe-cuadrado/
├── index.html              Página base: título y descripción para buscadores
├── public/
│   └── favicon.svg         Icono de la pestaña
└── src/
    ├── main.jsx            Punto de entrada: monta la app, carga la fuente Archivo y los estilos
    ├── App.jsx             Orden de las secciones de la página
    ├── components/         Las pantallas/bloques visibles
    │   ├── Header.jsx      Cabecera fija y menú (en móvil se abre con el botón "Menú")
    │   ├── Hero.jsx        Portada con nombre, lema, botones y cuadrícula de baldosas
    │   ├── About.jsx       Sección "Nosotros": texto y tres datos destacados
    │   ├── Menu.jsx        Carta con precios y horario
    │   ├── ContactForm.jsx Formulario de contacto: campos, validación y mensajes de estado
    │   ├── Footer.jsx      Pie con cenefa de baldosas
    │   └── Tile.jsx        La baldosa hidráulica en SVG (elemento gráfico de la marca)
    ├── data/
    │   └── cafe.js         TODOS los textos y datos: nombre, dirección, horario, carta y precios
    ├── services/
    │   └── contact.js      Lógica de envío del formulario (punto de conexión con el servicio real)
    └── styles/
        └── global.css      Estilos. Arriba están los tokens: colores, tipografía y espaciados
```

- **Pantallas principales:** `src/components/`. Es una sola página, cada archivo es un bloque.
- **Lógica de datos:** `src/data/cafe.js` (contenido) y `src/services/contact.js` (envío del formulario).
- **Diseño:** `src/styles/global.css`. Los colores están como variables (`--cobalto`, `--yema`, `--espresso`, `--papel`, `--baldosa`); cambiándolos ahí cambia toda la página. El diseño para móvil está al final del archivo, en el bloque `@media (max-width: 760px)`.

---

## 2. Qué está simulado y cómo se comporta

### Formulario de contacto

El envío se decide en `src/services/contact.js` según la variable de entorno `VITE_FORMSPREE_ID`:

| Modo | Cuándo | Qué pasa |
|---|---|---|
| **Demostración** (por defecto) | No existe `VITE_FORMSPREE_ID` | El mensaje **no se envía por correo ni sale a internet**. Se espera 0,9 s para simular un servidor, se guarda en el `localStorage` del navegador y se muestra la pantalla de "Mensaje enviado" con una nota que indica que es una demostración. |
| **Real** | Existe `VITE_FORMSPREE_ID` | Se envía un `POST` a `https://formspree.io/f/<ID>` y el mensaje llega por correo a la cuenta de Formspree asociada. La nota de demostración desaparece. |

**Simular un error de envío (solo en modo demostración):** escribe un correo que empiece por `error@` (por ejemplo `error@correo.com`). El envío se rechaza y aparece el mensaje de error con la dirección de correo de la cafetería como alternativa.

**Validación (en ambos modos):** nombre obligatorio, correo con formato válido y mensaje de al menos 10 caracteres. Los errores aparecen debajo de cada campo y el foco salta al primer campo con error.

**Cómo conectar el envío real:**

1. Crear un formulario gratuito en [formspree.io](https://formspree.io). Te dará una URL tipo `https://formspree.io/f/abcdwxyz`; el ID es `abcdwxyz`.
2. En local: crear un archivo `.env.local` en la raíz con `VITE_FORMSPREE_ID=abcdwxyz` y reiniciar `npm run dev`.
3. En Vercel: Project → Settings → Environment Variables → añadir `VITE_FORMSPREE_ID` y volver a desplegar.

Si se prefiere otro servicio (EmailJS, una API propia), solo hay que cambiar la función `enviarMensaje` en `src/services/contact.js`. El componente del formulario no necesita cambios mientras la función lance un error cuando el envío falle.

### Otros datos simulados

- **Teléfono, correo, dirección e Instagram** de la cafetería son inventados (en `src/data/cafe.js`). Los enlaces de teléfono y correo abren la app correspondiente del dispositivo, pero no llevan a ningún sitio real.
- No hay pagos, reservas ni inicio de sesión.

---

## 3. Datos de ejemplo y cómo reiniciarlos

**Precargado (en `src/data/cafe.js`):**

- Carta con **9 productos** en 2 secciones: 5 cafés y 4 para acompañar, con precios en euros.
- Horario de **3 franjas** (lunes a viernes, sábados, domingos cerrado).
- Textos de la sección "Nosotros" y **3 datos destacados**.

**No viene precargado ningún mensaje.** Los mensajes enviados en modo demostración se acumulan en el navegador bajo la clave `cafe-cuadrado:mensajes` del `localStorage`.

**Cómo volver al estado inicial:**

- **Desde la propia web:** cuando hay mensajes de prueba guardados, debajo del botón "Enviar mensaje" aparece el enlace **"Borrar mensajes de prueba"**.
- **Desde el navegador:** DevTools → Application → Local Storage → borrar la clave `cafe-cuadrado:mensajes`. O, en la consola: `localStorage.removeItem('cafe-cuadrado:mensajes')`.

Los datos de la carta no se pueden modificar desde la web, así que no necesitan reinicio.

---

## 4. Decisiones que no estaban en el encargo

- **Cafetería y contenido inventados.** El encargo pedía una cafetería aleatoria: nombre, textos, precios y dirección son ficticios, y el pie lo indica.
- **Formulario con dos modos.** Sin una cuenta de correo definida, el modo por defecto es una demostración que guarda en `localStorage`; el envío real se activa con una sola variable para no dejar claves en el código.
- **Correo `error@...` para probar el fallo.** Se añadió para poder revisar el estado de error sin desconectar internet.
- **Campo "¿Sobre qué nos escribes?".** No se pidió; se añadió para que la cafetería sepa de un vistazo si es reserva, encargo u otra cosa.
- **Horario dentro de la sección de carta.** No había un bloque de horario en el encargo; se colocó junto a la carta para no añadir una sección más.
- **Fuente incluida en el proyecto.** Archivo se instala con `@fontsource-variable/archivo` en vez de cargarse desde Google Fonts: se ve igual en cualquier entorno y no depende de un servicio externo.
- **Título del hero ajustado a su columna.** Su tamaño se calcula sobre el ancho de su columna (`15.5cqi`), no de la ventana, para que "Cuadrado" nunca quede bajo las baldosas.
- **Sin librerías extra.** Solo React, Vite y la fuente; estilos en CSS plano con variables, para que sea fácil de leer y modificar sin saber programación avanzada.
- **Una única animación.** Las baldosas del hero se colocan al cargar; se desactiva si el sistema tiene activado "reducir movimiento".
- **Publicación en Vercel.** El encargo pedía una URL pública sin especificar dónde; Vercel publica cada cambio del repositorio de forma automática.
