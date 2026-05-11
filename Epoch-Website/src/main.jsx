import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Must match vite.config `base`; otherwise pathname `/Epoch-Website/` never matches route `/`.
const base = import.meta.env.BASE_URL
const routerProps = base === '/' ? {} : { basename: base.replace(/\/+$/, '') }

createRoot(document.getElementById('root')).render(
  <BrowserRouter {...routerProps}>
    <App />
  </BrowserRouter>,
)
