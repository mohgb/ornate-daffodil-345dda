import { useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Brand from './Brand'
import Icon from '../ui/Icon'
import LanguageSelector from '../ui/LanguageSelector'
import { useTranslation } from '../../i18n'

/**
 * MegaMenu — full-screen overlay carrying the complete site map (plan §4).
 * Traps focus, closes on Esc, restores focus to the opener, locks body scroll.
 */
export default function MegaMenu({ open, onClose }) {
  const panelRef = useRef(null)
  const openerRef = useRef(null)
  const { t, data } = useTranslation()

  const megaSections = useMemo(
    () => [
      {
        title: data.mega.exploreTitle,
        links: [
          { label: data.nav.home, to: '/' },
          { label: data.nav.about, to: '/a-propos' },
          { label: data.nav.experiences, to: '/nos-experiences' },
          { label: data.nav.staff, to: '/notre-staff' },
          { label: data.nav.projects, to: '/realisations' },
          { label: data.nav.news, to: '/actualites' },
          { label: data.nav.contact, to: '/contact' },
        ],
      },
      {
        title: data.mega.servicesTitle,
        links: data.nav.servicesList.map((s) => ({ label: s.label, to: s.to })),
      },
    ],
    [data],
  )

  useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
      // focus first focusable inside the panel
      const t = setTimeout(() => {
        const first = panelRef.current?.querySelector('a, button')
        first?.focus()
      }, 60)
      return () => clearTimeout(t)
    }
    document.body.style.overflow = ''
    return undefined
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const focusables = panelRef.current?.querySelectorAll('a[href], button:not([disabled])')
        if (!focusables || !focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleClose = () => {
    onClose()
    // restore focus to whatever opened it (the burger)
    setTimeout(() => openerRef.current?.focus?.(), 0)
  }

  return (
    <div className={`mega ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="mega__backdrop" onClick={handleClose} />
      <div
        className="mega__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('common.openMenu')}
      >
        <div className="mega__top container">
          <Brand variant="nav" onNavigate={handleClose} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LanguageSelector variant="segmented" />
            <button
              type="button"
              className="mega__close"
              onClick={handleClose}
              aria-label={t('common.closeMenu')}
            >
              <Icon name="close" size={26} />
            </button>
          </div>
        </div>

        <div className="mega__body container">
          <div className="mega__cols">
            {megaSections.map((sec) => (
              <div key={sec.title} className="mega__col">
                <p className="mega__col-title">{sec.title}</p>
                <ul>
                  {sec.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="mega__link" onClick={handleClose}>
                        <span>{link.label}</span>
                        <Icon name="arrow-up-right" size={18} className="mega__link-arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mega__aside">
            <p className="eyebrow">{data.mega.asideEyebrow}</p>
            <p className="mega__aside-text">{data.mega.asideText}</p>
            <Link to="/contact" className="btn btn--lime" onClick={handleClose}>
              <Icon name="envelope" size={18} />
              <span>{t('common.contactUs')}</span>
              <Icon name="arrow-right" size={18} className="btn__trailing" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
