import { useRef } from 'react'
import Picture from '../ui/Picture'
import Icon from '../ui/Icon'
import { SectionLabel, SplitHeading } from '../ui/Primitives'
import { useScrollScene } from '../../lib/useScrollScene'
import { gsap, revealLines, revealUp, growRule, prefersReducedMotion } from '../../lib/motion'
import { useTranslation } from '../../i18n'

export default function ValueProp() {
  const scope = useRef(null)
  const { data } = useTranslation()
  const valueProp = data.valueProp

  useScrollScene(scope, () => {
    revealLines('[data-vp="head"] .split-heading', { trigger: scope.current, start: 'top 78%' })
    growRule('[data-vp="rule"]', { trigger: scope.current })
    revealUp('[data-vp="lead"]', { trigger: scope.current, start: 'top 80%' })
    revealUp('[data-vp="col"]', { trigger: '[data-vp="cols"]', stagger: 0.1, y: 26 })

    if (!prefersReducedMotion()) {
      gsap.to('[data-vp="img"]', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })
    }
  }, [])

  return (
    <section className="section section--surface parcours" id="parcours" ref={scope}>
      <div className="container parcours__top">
        <div className="parcours__intro">
          <SectionLabel className="parcours__label">{valueProp.label}</SectionLabel>
          <div data-vp="head">
            <SplitHeading lead={valueProp.titleLead} emphasis={valueProp.titleEmphasis} />
          </div>
          <span className="rule parcours__rule" data-vp="rule" aria-hidden="true" />
          <p className="lead parcours__lead" data-vp="lead">
            {valueProp.lead}
          </p>
        </div>

        <div className="parcours__media">
          <span className="u-glow-blue parcours__glow" aria-hidden="true" />
          <div className="parcours__frame">
            <div className="parcours__frame-inner" data-vp="img">
              <Picture
                dir="teaser"
                base="panorama"
                widths={[1024]}
                sizes="(max-width: 900px) 100vw, 46vw"
                alt="Panorama d'un complexe industriel S.E.S.S au crépuscule"
                imgClassName="parcours__photo"
                width={1024}
                height={660}
              />
            </div>
            <span className="parcours__badge">
              <Icon name="factory" size={20} />
              <span>{valueProp.badge}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container parcours__cols" data-vp="cols">
        {valueProp.columns.map((c) => (
          <div key={c.title} className="parcours__col" data-vp="col">
            <span className="parcours__col-icon">
              <Icon name={c.icon} size={26} />
            </span>
            <h3 className="parcours__col-title">{c.title}</h3>
            <p className="parcours__col-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
