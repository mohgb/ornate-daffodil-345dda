import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Picture from '../ui/Picture'
import Icon from '../ui/Icon'
import { SectionLabel, SplitHeading } from '../ui/Primitives'
import { useScrollScene } from '../../lib/useScrollScene'
import { gsap, revealLines, revealUp, prefersReducedMotion } from '../../lib/motion'
import { useTranslation } from '../../i18n'

export default function ProjectGrid() {
  const scope = useRef(null)
  const { data } = useTranslation()
  const section = data.projectsSection

  useScrollScene(scope, () => {
    revealLines('[data-pj="head"] .split-heading', { trigger: scope.current, start: 'top 80%' })
    revealUp('[data-pj="card"]', { trigger: '[data-pj="grid"]', stagger: 0.12, y: 34 })

    if (!prefersReducedMotion()) {
      gsap.utils.toArray('[data-pj="photo"]').forEach((el) => {
        gsap.to(el, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('[data-pj="card"]'), start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
      })
    }
  }, [])

  return (
    <section className="section section--surface projects" ref={scope} aria-labelledby="projects-title">
      <div className="container">
        <header className="projects__header">
          <div className="projects__heading">
            <SectionLabel className="projects__label">{section.label}</SectionLabel>
            <div data-pj="head">
              <SplitHeading
                as="h2"
                lead={section.titleLead}
                emphasis={section.titleEmphasis}
              />
            </div>
          </div>
          <Link to="/realisations" className="btn btn--ghost-blue projects__all">
            <span>{section.allBtn}</span>
            <Icon name="arrow-right" size={18} className="btn__trailing" />
          </Link>
        </header>

        <div className="projects__grid" data-pj="grid">
          {section.items.map((p) => (
            <article key={p.num} className="project card" data-pj="card">
              <div className="project__media">
                <div className="project__photo-wrap" data-pj="photo">
                  <Picture
                    dir="projects"
                    base={p.img}
                    widths={[580]}
                    sizes="(max-width: 700px) 100vw, (max-width: 1080px) 50vw, 33vw"
                    alt={p.alt}
                    imgClassName="project__photo"
                  />
                </div>
                <span className="project__num">{p.num}</span>
                <span className="project__sector">
                  <Icon name={p.icon} size={16} />
                  <span>{p.subtitle}</span>
                </span>
              </div>

              <div className="project__body">
                <h3 className="project__title">{p.title}</h3>
                <p className="project__desc">{p.desc}</p>
                <span className="project__link">
                  {section.cardCta}
                  <Icon name="arrow-right" size={16} className="project__arrow" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
