import { useRef } from 'react'
import Picture from '../ui/Picture'
import Icon from '../ui/Icon'
import { useScrollScene } from '../../lib/useScrollScene'
import { gsap, revealLines, revealUp, prefersReducedMotion } from '../../lib/motion'
import { valueAdded } from '../../data/home'

export default function ValueAdded() {
  const scope = useRef(null)

  useScrollScene(scope, () => {
    revealLines('[data-va="line"]', { trigger: scope.current, start: 'top 78%', stagger: 0.12 })
    revealUp('[data-va="lead"]', { trigger: scope.current, start: 'top 76%' })
    revealUp('[data-va="item"]', { trigger: '[data-va="list"]', stagger: 0.09, y: 20 })

    if (!prefersReducedMotion()) {
      gsap.to('[data-va="img"]', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })
    }
  }, [])

  return (
    <section className="section section--surface valueadded" ref={scope} aria-labelledby="va-title">
      <div className="container valueadded__inner">
        <div className="valueadded__text">
          <h2 className="valueadded__title" id="va-title">
            {valueAdded.titleLines.map((line) => (
              <span className="valueadded__line-mask" key={line}>
                <span className="valueadded__line" data-va="line">
                  {line}
                </span>
              </span>
            ))}
            <span className="valueadded__line-mask">
              <span className="valueadded__line u-lime" data-va="line">
                {valueAdded.titleEmphasis}
              </span>
            </span>
          </h2>

          <p className="lead valueadded__lead" data-va="lead">
            {valueAdded.lead}
          </p>

          <ul className="valueadded__list" data-va="list">
            {valueAdded.checklist.map((item) => (
              <li className="valueadded__item" data-va="item" key={item}>
                <Icon name="check-circle" size={22} className="valueadded__check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="valueadded__media">
          <span className="u-glow-lime valueadded__glow" aria-hidden="true" />
          <div className="valueadded__frame">
            <div className="valueadded__frame-inner" data-va="img">
              <Picture
                dir="teaser"
                base="workers"
                widths={[1188]}
                sizes="(max-width: 900px) 100vw, 46vw"
                alt="Ingénieurs S.E.S.S observant un site industriel"
                imgClassName="valueadded__photo"
                width={1188}
                height={600}
              />
            </div>
            <div className="valueadded__tag">
              <Icon name="shield-check" size={22} />
              <div>
                <strong>Qualité &amp; sécurité</strong>
                <span>au cœur de chaque intervention</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
