/* ============================================================================
   Ouverture Internationale — a fully-built service page on the shared cinematic
   shell (design 06). The "L'ingénierie / sans frontières, / l'expertise partout."
   opener rides over an animated "global network" photograph; the hero also
   carries a right-hand highlights column (aside) and a full-width feature panel
   at its foot, then a restrained "approche" bridge (copy recombined from the
   design — nothing invented) into the shared CTA.
   ========================================================================== */
import { useRef } from 'react'
import ServiceHero from '../components/service/ServiceHero'
import ServiceFeatureBar from '../components/service/ServiceFeatureBar'
import CtaBand from '../components/home/CtaBand'
import Icon from '../components/ui/Icon'
import { SectionLabel } from '../components/ui/Primitives'
import { PageNote } from './StubPage'
import { useScrollScene } from '../lib/useScrollScene'
import { revealLines, revealUp } from '../lib/motion'
import { international, internationalHighlights, internationalFeatures } from '../data/services'

// Right-hand hero column — the four international highlights as bordered cards,
// each an icon + a lime value/word + a caption. Fades in as one block with the
// hero intro (the wrapper is data-svc="fade" on ServiceHero's aside slot).
function InternationalHighlights() {
  return (
    <ul className="svc-hl">
      {internationalHighlights.map((h) => (
        <li key={h.label} className="svc-hl__item">
          <span className="svc-hl__icon">
            <Icon name={h.icon} size={24} />
          </span>
          <span className="svc-hl__text">
            <span className="svc-hl__value">{h.value}</span>
            <span className="svc-hl__label">{h.label}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function International() {
  const body = useRef(null)

  useScrollScene(body, () => {
    revealLines('[data-intl="title"]', { trigger: body.current, start: 'top 82%' })
    revealUp('[data-intl="fade"]', { trigger: body.current, start: 'top 84%', stagger: 0.1 })
  }, [])

  return (
    <div>
      <ServiceHero {...international} aside={<InternationalHighlights />}>
        <ServiceFeatureBar features={internationalFeatures} />
      </ServiceHero>

      <section className="section section--surface svc-approach" ref={body} aria-labelledby="intl-approche">
        <div className="container">
          <div className="svc-approach__head" data-intl="fade">
            <SectionLabel>Notre approche</SectionLabel>
          </div>
          <h2 className="split-heading svc-approach__title" id="intl-approche">
            <span className="svc-approach__title-mask">
              <span className="svc-approach__title-line" data-intl="title">
                Des solutions internationales, adaptées à{' '}
                <span className="u-lime">chaque marché</span>.
              </span>
            </span>
          </h2>
          <p className="lead svc-approach__lead" data-intl="fade">
            De notre présence sur plusieurs continents à la conformité aux standards
            internationaux, nous conjuguons expertise globale et solutions locales — avec
            des partenaires de confiance — pour créer de la valeur durablement.
          </p>

          <div data-intl="fade">
            <PageNote>
              Le détail complet de notre accompagnement à l'international — présence,
              solutions adaptées, conformité, performance durable et partenariats — sera
              enrichi prochainement. Contactez nos équipes pour développer votre présence
              mondiale.
            </PageNote>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
