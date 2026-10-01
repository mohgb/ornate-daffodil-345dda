/* ============================================================================
   ServiceStatsBar — the full-width metrics strip seated at the foot of a
   service hero (design 05: four stats, each a two-tone icon + a large lime
   figure that counts up + a caption, split by hairlines). Figures are passed
   in from src/data/services.js — nothing is invented here. Motion mirrors the
   homepage StatsPanel (revealUp + countUp) and is reduced-motion safe.
   ========================================================================== */
import { useRef } from 'react'
import Icon from '../ui/Icon'
import { useScrollScene } from '../../lib/useScrollScene'
import { revealUp, countUp } from '../../lib/motion'

export default function ServiceStatsBar({ stats }) {
  const scope = useRef(null)

  useScrollScene(scope, () => {
    revealUp('[data-stat]', { trigger: scope.current, start: 'top 98%', stagger: 0.08, y: 16 })
    scope.current.querySelectorAll('[data-count]').forEach((el) => {
      countUp(el, Number(el.dataset.count), { suffix: el.dataset.suffix || '' })
    })
  }, [])

  return (
    <div className="svc-stats" ref={scope}>
      <div className="container svc-stats__grid">
        {stats.map((s) => (
          <div key={s.label} className="svc-stats__item" data-stat>
            <span className="svc-stats__icon">
              <Icon name={s.icon} size={26} />
            </span>
            <span className="svc-stats__body">
              <span className="svc-stats__value">
                <span data-count={s.value} data-suffix={s.suffix || ''}>
                  0{s.suffix || ''}
                </span>
              </span>
              <span className="svc-stats__label">{s.label}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
