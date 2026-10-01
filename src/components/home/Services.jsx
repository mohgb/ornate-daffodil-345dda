import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { SectionLabel, SplitHeading } from '../ui/Primitives'
import { useScrollScene } from '../../lib/useScrollScene'
import { revealLines, revealUp } from '../../lib/motion'
import { useTranslation } from '../../i18n'

export default function Services() {
  const scope = useRef(null)
  const { data, t } = useTranslation()
  const servicesSection = data.servicesSection
  const items = data.nav.servicesList

  useScrollScene(scope, () => {
    revealLines('[data-sv="head"] .split-heading', { trigger: scope.current, start: 'top 80%' })
    revealUp('[data-sv="card"]', { trigger: '[data-sv="grid"]', stagger: 0.09, y: 30 })
  }, [])

  return (
    <section className="section services" ref={scope} aria-labelledby="services-title">
      <span className="u-glow-lime services__glow" aria-hidden="true" />
      <div className="container">
        <header className="services__header">
          <SectionLabel>{servicesSection.label}</SectionLabel>
          <div data-sv="head">
            <SplitHeading
              as="h2"
              lead={servicesSection.titleLead}
              emphasis={servicesSection.titleEmphasis}
              className="services__title"
            />
          </div>
        </header>

        <div className="services__grid" data-sv="grid">
          {items.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              className="service-card card"
              data-sv="card"
              style={{ '--i': i }}
            >
              <span className="service-card__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="service-card__icon">
                <Icon name={s.icon} size={30} />
              </span>
              <h3 className="service-card__title">{s.label}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <span className="service-card__cta">
                {t('common.learnMore')}
                <Icon name="arrow-right" size={16} className="service-card__arrow" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
