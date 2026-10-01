/* ============================================================================
   ServiceFeatureBar — the full-width feature panel seated at the foot of a
   service hero (design 06: five features, each a two-tone icon + a title + a
   short caption, held in one rounded, divided band). Copy is passed in from
   src/data/services.js — nothing is invented here. The band reveals as a soft
   staggered rise, reduced-motion safe (revealUp no-ops under reduce).
   ========================================================================== */
import { useRef } from 'react'
import Icon from '../ui/Icon'
import { useScrollScene } from '../../lib/useScrollScene'
import { revealUp } from '../../lib/motion'

export default function ServiceFeatureBar({ features }) {
  const scope = useRef(null)

  useScrollScene(scope, () => {
    revealUp('[data-feat]', { trigger: scope.current, start: 'top 98%', stagger: 0.08, y: 16 })
  }, [])

  return (
    <div className="svc-feat" ref={scope}>
      <div className="container">
        <ul className="svc-feat__panel">
          {features.map((f) => (
            <li key={f.title} className="svc-feat__item" data-feat>
              <span className="svc-feat__icon">
                <Icon name={f.icon} size={26} />
              </span>
              <span className="svc-feat__text">
                <span className="svc-feat__title">{f.title}</span>
                <span className="svc-feat__desc">{f.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
