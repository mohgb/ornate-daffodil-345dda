import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { useScrollScene } from '../../lib/useScrollScene'
import { revealUp } from '../../lib/motion'
import { useTranslation } from '../../i18n'

export default function PillarStrip() {
  const scope = useRef(null)
  const { data, t } = useTranslation()
  const pillars = data.pillars

  useScrollScene(scope, () => {
    revealUp('[data-pillar]', { trigger: scope.current, stagger: 0.1, y: 30 })
  }, [])

  return (
    <section className="section section--tight pillars" ref={scope} aria-label={t('common.ourServices')}>
      <div className="container">
        <div className="pillars__grid">
          {pillars.map((p) => (
            <Link key={p.title} to={p.to} className="pillar card" data-pillar>
              <span className="pillar__icon">
                <Icon name={p.icon} size={30} />
              </span>
              <span className="pillar__body">
                <span className="pillar__title">{p.title}</span>
                <span className="pillar__desc">{p.desc}</span>
              </span>
              <Icon name="arrow-up-right" size={18} className="pillar__arrow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
