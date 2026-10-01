import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Brand from './Brand'
import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t, data } = useTranslation()

  const explore = useMemo(
    () => [
      { label: data.nav.about, to: '/a-propos' },
      { label: data.nav.experiences, to: '/nos-experiences' },
      { label: data.nav.staff, to: '/notre-staff' },
      { label: data.nav.projects, to: '/realisations' },
      { label: data.nav.news, to: '/actualites' },
    ],
    [data],
  )

  const services = data.nav.servicesList

  return (
    <footer className="footer">
      <div className="footer__accent" aria-hidden="true" />

      <div className="container footer__inner">
        <div className="footer__brandcol">
          <Brand variant="footer" />
          <p className="footer__tagline">{data.footer.tagline}</p>
          <Link to="/contact" className="btn btn--ghost-lime">
            <Icon name="envelope" size={18} />
            <span>{t('common.contactUs')}</span>
            <Icon name="arrow-right" size={18} className="btn__trailing" />
          </Link>
        </div>

        <nav className="footer__col" aria-label={data.footer.ourServices}>
          <p className="footer__col-title">{data.footer.ourServices}</p>
          <div className="footer__links">
            {services.map((s) => (
              <Link key={s.to} to={s.to}>
                {s.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav className="footer__col" aria-label={data.footer.explore}>
          <p className="footer__col-title">{data.footer.explore}</p>
          <div className="footer__links">
            {explore.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="footer__col">
          <p className="footer__col-title">{data.footer.contactTitle}</p>
          <p className="footer__contact-text">{data.footer.contactText}</p>
          <Link to="/contact" className="btn btn--blue">
            <span>{t('common.startProject')}</span>
            <Icon name="arrow-right" size={18} className="btn__trailing" />
          </Link>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>{data.footer.copyright.replace('{year}', year)}</p>
        <div className="footer__legal">
          <Link to="/mentions-legales">{data.footer.legal}</Link>
          <Link to="/confidentialite">{data.footer.privacy}</Link>
        </div>
      </div>
    </footer>
  )
}
