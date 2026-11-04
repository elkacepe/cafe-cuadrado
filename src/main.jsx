import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fuente Archivo (con eje de anchura) incluida en el proyecto, sin depender de Google Fonts
import '@fontsource-variable/archivo/wdth.css'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
