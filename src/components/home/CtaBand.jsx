import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Picture from '../ui/Picture'
import Icon from '../ui/Icon'
import { Eyebrow } from '../ui/Primitives'
import { useScrollScene } from '../../lib/useScrollScene'
import { gsap, revealLines, revealUp, prefersReducedMotion } from '../../lib/motion'
import { finalCta } from '../../data/home'

export default function CtaBand() {
  const scope = useRef(null)

  useScrollScene(scope, () => {
    revealLines('[data-cta="line"]', { trigger: scope.current, start: 'top 82%', stagger: 0.12 })
    revealUp('[data-cta="fade"]', { trigger: scope.current, start: 'top 80%', stagger: 0.12 })

    if (!prefersReducedMotion()) {
      gsap.to('[data-cta="bg"]', {
        yPercent: 12,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })
    }
  }, [])

  return (
    <section className="cta u-grain" ref={scope} aria-labelledby="cta-title">
      <div className="cta__bg" data-cta="bg" aria-hidden="true">
        <Picture
          dir="hero"
          base="refinery"
          widths={[560, 960]}
          sizes="100vw"
          alt=""
          imgClassName="cta__img"
        />
      </div>
      <div className="cta__scrim" aria-hidden="true" />
      <span className="u-glow-lime cta__glow cta__glow--a" aria-hidden="true" />
      <span className="u-glow-blue cta__glow cta__glow--b" aria-hidden="true" />

      <div className="container cta__inner">
        <div className="cta__eyebrow" data-cta="fade">
          <Eyebrow icon="hexagon" dash>
            {finalCta.eyebrow}
          </Eyebrow>
        </div>

        <h2 className="cta__title" id="cta-title">
          <span className="cta__line-mask">
            <span className="cta__line" data-cta="line">
              {finalCta.titleLines[0]}
            </span>
          </span>
          <span className="cta__line-mask">
            <span className="cta__line u-lime" data-cta="line">
              {finalCta.titleLines[1]}
            </span>
          </span>
        </h2>

        <div className="cta__actions" data-cta="fade">
          <Link to={finalCta.button.to} className="btn btn--lime cta__btn">
            <Icon name="chat" size={20} />
            <span>{finalCta.button.label}</span>
            <Icon name="arrow-right" size={20} className="btn__trailing" />
          </Link>
        </div>
      </div>
    </section>
  )
}
