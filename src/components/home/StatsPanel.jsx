import { useRef } from 'react'
import Icon from '../ui/Icon'
import { useScrollScene } from '../../lib/useScrollScene'
import { revealUp, countUp } from '../../lib/motion'
import { useTranslation } from '../../i18n'

export default function StatsPanel() {
  const scope = useRef(null)
  const { data } = useTranslation()
  const section = data.statsSection

  useScrollScene(scope, () => {
    revealUp('[data-stat]', { trigger: scope.current, stagger: 0.1, y: 28 })
    scope.current.querySelectorAll('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count)
      countUp(el, end, { suffix: el.dataset.suffix || '' })
    })
  }, [])

  return (
    <section className="section stats" ref={scope} aria-labelledby="stats-title">
      <span className="u-glow-blue stats__glow" aria-hidden="true" />
      <div className="container">
        <header className="stats__header">
          <h2 id="stats-title" className="stats__title">
            {section.titleLead}<span className="u-lime">{section.titleEmphasis}</span>
          </h2>
        </header>

        <div className="stats__grid">
          {section.items.map((s, i) => (
            <div className="stat" data-stat key={i}>
              <span className="stat__icon">
                <Icon name={s.icon} size={26} />
              </span>
              <p className="stat__value">
                {s.text ? (
                  <span>{s.text}</span>
                ) : (
                  <span data-count={s.value} data-suffix={s.suffix || ''}>
                    0{s.suffix || ''}
                  </span>
                )}
              </p>
              <p className="stat__label">{s.label}</p>
              <p className="stat__sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
