/* ============================================================================
   ServiceHero — cinematic service-page opener. A full-bleed photographic
   background with an ambient Ken Burns drift (CSS) plus a pointer-parallax
   nudge (JS), reproduced from the supplied animated-background reference. The
   headline rises through clip masks on load. All motion is gated by
   prefers-reduced-motion; the pointer effect is also skipped on touch.
   ========================================================================== */
import { useRef, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Picture from '../ui/Picture'
import Icon from '../ui/Icon'
import { Eyebrow } from '../ui/Primitives'
import { useScrollScene } from '../../lib/useScrollScene'
import { gsap, EASE, DUR, prefersReducedMotion } from '../../lib/motion'

// Each headline line can opt into a bigger acronym "wordmark", a smaller "sub"
// size, a plain-white fill or the lime accent — otherwise it defaults to the
// chrome fill shared across the service heroes (so existing pages are unchanged).
function lineClassName(l) {
  const c = ['svc-hero__line']
  if (l.wordmark) c.push('svc-hero__line--wordmark')
  if (l.sub) c.push('svc-hero__line--sub')
  if (l.accent) c.push('u-lime')
  else if (l.plain) c.push('svc-hero__line--plain')
  else c.push('u-chrome')
  return c.join(' ')
}

export default function ServiceHero({ image, eyebrow, titleLines, lead, primary, secondary, variant, aside, children }) {
  const scope = useRef(null)
  const bgRef = useRef(null)

  // Intro — masked rise of the headline, then supporting copy fades up.
  useScrollScene(scope, () => {
    if (prefersReducedMotion()) return
    const tl = gsap.timeline({ defaults: { ease: EASE.expo } })
    tl.from('[data-svc="line"]', { yPercent: 115, duration: 1, stagger: 0.12 }).from(
      '[data-svc="fade"]',
      { y: 24, opacity: 0, duration: DUR.base, ease: EASE.out, stagger: 0.1 },
      '-=0.55',
    )
  }, [])

  // Pointer parallax on the background (transform-only, rAF-throttled). The
  // inline transform overrides the CSS Ken Burns while the cursor moves and is
  // released on leave — exactly the behaviour of the reference index.html.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const hero = scope.current
    const bg = bgRef.current
    if (!hero || !bg) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    let tx = 0
    let ty = 0
    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * -16
      ty = ((e.clientY - r.top) / r.height - 0.5) * -11
      if (!raf) {
        raf = requestAnimationFrame(() => {
          bg.style.transform = `scale(1.06) translate3d(${tx}px, ${ty}px, 0)`
          raf = 0
        })
      }
    }
    const onLeave = () => {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
      bg.style.transform = ''
    }
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className={`svc-hero u-grain${variant ? ` svc-hero--${variant}` : ''}`} ref={scope} aria-label="Introduction">
      {/* Layer 1 — animated photograph (Ken Burns + pointer parallax) */}
      <div className="svc-hero__bg" ref={bgRef} aria-hidden="true">
        <Picture
          dir={image.dir}
          base={image.base}
          widths={image.widths}
          sizes="100vw"
          alt=""
          imgClassName="svc-hero__img"
          loading="eager"
          fetchPriority="high"
          width={image.width}
          height={image.height}
        />
      </div>

      {/* Layer 2 — cinematic scrims + accent glow */}
      <div className="svc-hero__overlay" aria-hidden="true" />
      <div className="svc-hero__glow" aria-hidden="true" />

      {/* Layer 3 — content. With an `aside` (e.g. the Stratégie domain column)
          the headline block and the aside share a two-column split; without one
          the headline block sits alone exactly as on the other service heroes. */}
      <div className="svc-hero__content">
        <div className="container">
          <div className={aside ? 'svc-hero__split' : undefined}>
            <div className="svc-hero__inner">
              {eyebrow && (
                <div className="svc-hero__eyebrow" data-svc="fade">
                  <Eyebrow icon={eyebrow.icon} dash={eyebrow.dash}>
                    {eyebrow.text}
                  </Eyebrow>
                </div>
              )}

              <h1 className="svc-hero__title">
                {titleLines.map((l, i) => (
                  <Fragment key={i}>
                    <span className="svc-hero__line-mask">
                      <span className={lineClassName(l)} data-svc="line">
                        {l.text}
                      </span>
                    </span>
                    {l.rule && (
                      <span className="svc-hero__rule" data-svc="fade" aria-hidden="true" />
                    )}
                  </Fragment>
                ))}
              </h1>

              <p className="svc-hero__lead" data-svc="fade">
                {lead}
              </p>

              <div className="svc-hero__actions" data-svc="fade">
                <Link to={primary.to} className={`btn ${primary.variant || 'btn--blue'}`}>
                  {primary.icon && <Icon name={primary.icon} size={18} />}
                  <span>{primary.label}</span>
                  <Icon name="arrow-right" size={18} className="btn__trailing" />
                </Link>
                {secondary && (
                  <Link to={secondary.to} className={`btn ${secondary.variant || 'btn--ghost-lime'}`}>
                    {secondary.icon && <Icon name={secondary.icon} size={18} />}
                    <span>{secondary.label}</span>
                  </Link>
                )}
              </div>
            </div>

            {aside && (
              <div className="svc-hero__aside" data-svc="fade">
                {aside}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Layer 4 — optional bottom band (domain bar) */}
      {children}
    </section>
  )
}
