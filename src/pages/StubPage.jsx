/* ============================================================================
   StubPage — a shared, on-brand shell for routes whose full content is not yet
   built. It renders a cinematic page-hero (eyebrow + heading + lead), an
   optional content slot, and the closing CTA band — reusing the same tokens
   and primitives as the homepage so every route feels like the same film.
   No client, figure, date or claim is invented here (skill constraint).
   ========================================================================== */
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import { Eyebrow } from '../components/ui/Primitives'
import CtaBand from '../components/home/CtaBand'
import { useScrollScene } from '../lib/useScrollScene'
import { revealLines, revealUp } from '../lib/motion'

export default function StubPage({
  eyebrow,
  title,
  titleEmphasis,
  lead,
  primary,
  secondary,
  children,
  showCta = true,
}) {
  const scope = useRef(null)

  useScrollScene(scope, () => {
    revealLines('[data-ph="title"]', { trigger: scope.current, start: 'top 90%' })
    revealUp('[data-ph="fade"]', { trigger: scope.current, start: 'top 88%', stagger: 0.1 })
  }, [])

  return (
    <div ref={scope}>
      <section className="page-hero u-grain" aria-labelledby="page-title">
        <span className="u-glow-blue page-hero__glow page-hero__glow--a" aria-hidden="true" />
        <span className="u-glow-lime page-hero__glow page-hero__glow--b" aria-hidden="true" />
        <div className="hero__grid page-hero__grid" aria-hidden="true" />

        <div className="container page-hero__inner">
          <div className="page-hero__eyebrow" data-ph="fade">
            <Eyebrow icon="hexagon" dash>
              {eyebrow}
            </Eyebrow>
          </div>

          <h1 className="page-hero__title" id="page-title">
            <span className="page-hero__title-mask">
              <span className="page-hero__title-line" data-ph="title">
                {title}
                {titleEmphasis && <span className="u-lime"> {titleEmphasis}</span>}
              </span>
            </span>
          </h1>

          {lead && (
            <p className="lead page-hero__lead" data-ph="fade">
              {lead}
            </p>
          )}

          {(primary || secondary) && (
            <div className="page-hero__actions" data-ph="fade">
              {primary && (
                <Link to={primary.to} className="btn btn--blue">
                  <span>{primary.label}</span>
                  <Icon name="arrow-right" size={18} className="btn__trailing" />
                </Link>
              )}
              {secondary && (
                <Link to={secondary.to} className="btn btn--ghost-lime">
                  {secondary.icon && <Icon name={secondary.icon} size={18} />}
                  <span>{secondary.label}</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {children && (
        <section className="section page-body">
          <div className="container">{children}</div>
        </section>
      )}

      {showCta && <CtaBand />}
    </div>
  )
}

/* A small honest placeholder note — used where no real content exists yet so
   nothing is fabricated to fill the page. */
export function PageNote({ children }) {
  return (
    <div className="page-note">
      <span className="page-note__icon">
        <Icon name="compass" size={22} />
      </span>
      <p>{children}</p>
    </div>
  )
}
