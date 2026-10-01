/* ============================================================================
   ServicePillarBar — the four-domain band shown at the foot of the service
   hero (design: one divided strip, columns split by hairlines, each a two-tone
   icon + title + caption). Links reuse the site's domain routes. Content is
   verbatim from src/data/services.js — nothing invented here.
   ========================================================================== */
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { useScrollScene } from '../../lib/useScrollScene'
import { revealUp } from '../../lib/motion'
import { domains as defaultDomains } from '../../data/services'

export default function ServicePillarBar({ domains = defaultDomains }) {
  const scope = useRef(null)

  useScrollScene(scope, () => {
    revealUp('[data-domain]', { trigger: scope.current, start: 'top 98%', stagger: 0.08, y: 16 })
  }, [])

  return (
    <div className="svc-bar" ref={scope}>
      <div className="container svc-bar__grid">
        {domains.map((d) => (
          <Link key={d.title} to={d.to} className="svc-bar__item" data-domain>
            <span className="svc-bar__icon">
              <Icon name={d.icon} size={30} />
            </span>
            <span className="svc-bar__text">
              <span className="svc-bar__title">{d.title}</span>
              <span className="svc-bar__desc">{d.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
