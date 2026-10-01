/* ============================================================================
   main.jsx — application entry. Imports the global stylesheet cascade in
   dependency order (tokens → base → utilities → components) and mounts the
   router. Fonts are loaded from index.html.
   ========================================================================== */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from './i18n'

import './styles/tokens.css'
import './styles/base.css'
import './styles/utilities.css'
import './components/ui/ui.css'
import './components/layout/layout.css'
import './components/home/home.css'
import './components/service/service.css'
import './components/contact/contact.css'
import './pages/pages.css'
import './styles/rtl.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

