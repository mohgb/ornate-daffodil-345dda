/* ============================================================================
   App — router shell. Owns the persistent chrome (skip link, header, footer),
   the Lenis smooth-scroll bridge, per-route scroll reset, and ScrollTrigger
   refreshes after navigation and webfont load. Home is eager (it holds the LCP
   hero); the remaining routes are lazily code-split.
   ========================================================================== */
import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import { useSmoothScroll } from './lib/smoothScroll'
import { ScrollTrigger } from './lib/motion'
import { useTranslation } from './i18n'

// One lazy chunk for the secondary pages — keeps the initial shell light.
const pages = () => import('./pages/pages')
const About = lazy(() => pages().then((m) => ({ default: m.About })))
const ServicesIndex = lazy(() => pages().then((m) => ({ default: m.ServicesIndex })))
const ServiceDetail = lazy(() => pages().then((m) => ({ default: m.ServiceDetail })))
const Experiences = lazy(() => pages().then((m) => ({ default: m.Experiences })))
const Staff = lazy(() => pages().then((m) => ({ default: m.Staff })))
const Realisations = lazy(() => pages().then((m) => ({ default: m.Realisations })))
const Actualites = lazy(() => pages().then((m) => ({ default: m.Actualites })))
const MentionsLegales = lazy(() => pages().then((m) => ({ default: m.MentionsLegales })))
const Confidentialite = lazy(() => pages().then((m) => ({ default: m.Confidentialite })))
const NotFound = lazy(() => pages().then((m) => ({ default: m.NotFound })))

// First fully-built service page — its own chunk (animated hero + assets).
const IngenierieConstruction = lazy(() => import('./pages/IngenierieConstruction'))
const HSE = lazy(() => import('./pages/HSE'))
const Juridique = lazy(() => import('./pages/Juridique'))
const Strategie = lazy(() => import('./pages/Strategie'))
const International = lazy(() => import('./pages/International'))
const AssistanceTechnique = lazy(() => import('./pages/AssistanceTechnique'))
const Contact = lazy(() => import('./pages/Contact'))

function ScrollManager({ lenisRef }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    // Recompute trigger positions after the new page has laid out.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname, lenisRef])

  return null
}

export default function App() {
  const lenisRef = useSmoothScroll()
  const { t } = useTranslation()

  useEffect(() => {
    // Webfonts shift layout on load — refresh once they are ready.
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        {t('common.skipToContent')}
      </a>
      <Header />
      <ScrollManager lenisRef={lenisRef} />

      <main id="main">
        <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/services" element={<ServicesIndex />} />
            <Route path="/services/ingenierie-construction" element={<IngenierieConstruction />} />
            <Route path="/services/hse" element={<HSE />} />
            <Route path="/services/juridique" element={<Juridique />} />
            <Route path="/services/strategie" element={<Strategie />} />
            <Route path="/services/international" element={<International />} />
            <Route path="/services/assistance-technique" element={<AssistanceTechnique />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/nos-experiences" element={<Experiences />} />
            <Route path="/notre-staff" element={<Staff />} />
            <Route path="/realisations" element={<Realisations />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
