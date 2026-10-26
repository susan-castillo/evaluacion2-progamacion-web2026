import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Importamos la hoja de estilos de boostrap
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/*BrowserRouter es el proveedor del contexto de enrutamiento de la aplicacion*/}
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
)
