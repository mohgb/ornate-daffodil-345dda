import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Picture from '../ui/Picture'
import Icon from '../ui/Icon'
import { useScrollScene } from '../../lib/useScrollScene'
import { gsap, EASE, DUR, prefersReducedMotion } from '../../lib/motion'
import { useTranslation } from '../../i18n'

export default function Hero() {
  const scope = useRef(null)
  const { data } = useTranslation()
  const hero = data.hero

  useScrollScene(scope, () => {
    const reduced = prefersReducedMotion()

    // Intro — masked rise of the headline, then supporting copy fades up.
    if (!reduced) {
      const tl = gsap.timeline({ defaults: { ease: EASE.expo } })
      tl.from('[data-hero="line"]', {
        yPercent: 115,
        duration: 1,
        stagger: 0.12,
      })
        .from('[data-hero="eyebrow"]', { y: 20, opacity: 0, duration: DUR.base, ease: EASE.out }, 0.15)
        .from(
          '[data-hero="fade"]',
          { y: 24, opacity: 0, duration: DUR.base, ease: EASE.out, stagger: 0.1 },
          '-=0.5',
        )
        .from('[data-hero="cue"]', { opacity: 0, duration: 0.6 }, '-=0.2')

      // Depth parallax — each layer drifts at its own rate as the hero leaves.
      const mkScrub = { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: 0.6 }
      gsap.to('[data-depth="far"]', { yPercent: 16, scale: 1.14, ease: 'none', scrollTrigger: mkScrub })
      gsap.to('[data-depth="glow"]', { yPercent: 30, ease: 'none', scrollTrigger: mkScrub })
      gsap.to('[data-depth="content"]', { yPercent: -8, opacity: 0.35, ease: 'none', scrollTrigger: mkScrub })
    }
  }, [])

  return (
    <section className="hero u-grain" ref={scope} aria-label="Introduction">
      {/* Layer 1 — deep base */}
      <div className="hero__base" aria-hidden="true" />

      {/* Layer 2 — far photograph */}
      <div className="hero__far" data-depth="far" aria-hidden="true">
        <Picture
          dir="hero"
          base="office"
          widths={[560, 960]}
          sizes="100vw"
          alt=""
          imgClassName="hero__img"
          loading="eager"
          fetchPriority="high"
          width={960}
          height={548}
        />
      </div>

      {/* Layer 3 — atmospheric accent glows */}
      <div className="hero__glow hero__glow--blue" data-depth="glow" aria-hidden="true" />
      <div className="hero__glow hero__glow--lime" data-depth="glow" aria-hidden="true" />

      {/* Layer 4 — cinematic scrims */}
      <div className="u-scrim-left" aria-hidden="true" />
      <div className="u-scrim-bottom" aria-hidden="true" />

      {/* Layer 5 — faint engineering grid */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Layer 6 — content */}
      <div className="container hero__content" data-depth="content">
        <div className="hero__lockup" data-hero="eyebrow">
          <span className="hero__wordmark u-chrome">{hero.wordmark}</span>
          <span className="hero__descriptor">{hero.subtitle}</span>
          <span className="hero__lockup-rule" aria-hidden="true" />
        </div>

        <h1 className="hero__title">
          <span className="hero__line-mask">
            <span className="hero__line" data-hero="line">
              {hero.titleLead.trim()}
            </span>
          </span>{' '}
          <span className="hero__line-mask">
            <span className="hero__line hero__line--accent u-lime" data-hero="line">
              {hero.titleEmphasis}
            </span>
          </span>
        </h1>

        <p className="hero__lead" data-hero="fade">
          {hero.lead}
        </p>

        <div className="hero__actions" data-hero="fade">
          <Link to="/services" className="btn btn--blue">
            <span>{hero.primaryBtn}</span>
            <Icon name="arrow-right" size={18} className="btn__trailing" />
          </Link>
          <Link to="/contact" className="btn btn--ghost-lime">
            <Icon name="chat" size={18} />
            <span>{hero.secondaryBtn}</span>
          </Link>
        </div>
      </div>

      {/* Layer 7 — scroll cue */}
      <a href="#parcours" className="hero__cue" data-hero="cue" aria-label={hero.scrollCue}>
        <span className="hero__cue-track">
          <span className="hero__cue-dot" />
        </span>
        <span className="hero__cue-label">{hero.scrollCue}</span>
      </a>
    </section>
  )
}
