import { useEffect, useState, useMemo } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Brand from './Brand'
import Icon from '../ui/Icon'
import LanguageSelector from '../ui/LanguageSelector'
import MegaMenu from './MegaMenu'
import { useTranslation } from '../../i18n'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, data } = useTranslation()

  const localizedPrimaryNav = useMemo(() => {
    const servicesList = data.nav.servicesList
    return [
      { label: data.nav.home, to: '/' },
      { label: data.nav.about, to: '/a-propos' },
      { label: data.nav.services, to: '/services', children: servicesList },
      { label: data.nav.experiences, to: '/nos-experiences' },
      { label: data.nav.projects, to: '/realisations' },
      { label: data.nav.contact, to: '/contact' },
    ]
  }, [data])

  useEffect(() => {
    // Cheap threshold check — only touches state when crossing the boundary.
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header__inner container">
          <Brand variant="nav" />

          <nav className="header__nav" aria-label={t('common.ourServices')}>
            <ul>
              {localizedPrimaryNav.map((item) => (
                <li
                  key={item.to}
                  className={item.children ? 'nav-item nav-item--dropdown' : 'nav-item'}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                    {item.children && <Icon name="chevron" size={15} className="nav-link__chev" />}
                  </NavLink>

                  {item.children && (
                    <div className="nav-dropdown" role="menu">
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.to} role="none">
                            <Link to={child.to} className="nav-dropdown__link" role="menuitem">
                              <span className="nav-dropdown__ico" aria-hidden="true">
                                <Icon name={child.icon} size={22} />
                              </span>
                              <span className="nav-dropdown__text">
                                <strong>{child.label}</strong>
                                <span>{child.desc}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <LanguageSelector />
            <Link to="/contact" className="btn btn--lime header__cta">
              <Icon name="envelope" size={18} />
              <span>{t('common.contactUs')}</span>
            </Link>
            <button
              type="button"
              className="header__burger"
              aria-label={t('common.openMenu')}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" size={26} />
            </button>
          </div>
        </div>
      </header>

      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
