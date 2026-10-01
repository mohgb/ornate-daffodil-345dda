/* ============================================================================
   Assistance Technique — the sixth service, now a fully-built page on the shared
   cinematic shell. A client photograph was supplied later (three engineers /
   supervisors in hard hats reviewing plans on a tablet before an industrial plant
   at dusk), so this page rides the same full-bleed animated photo hero as the
   other five services. The three capabilities keep the existing card grid
   (.stub-grid--values / .stub-card) below the hero — ServiceFeatureBar tiles to
   five columns at desktop, which would strand two empty cells for only three
   items. Copy is transcribed / faithfully condensed from the brief — nothing is
   invented (skill constraint).
   ========================================================================== */
import { useRef } from 'react'
import ServiceHero from '../components/service/ServiceHero'
import Icon from '../components/ui/Icon'
import CtaBand from '../components/home/CtaBand'
import { SectionLabel } from '../components/ui/Primitives'
import { useScrollScene } from '../lib/useScrollScene'
import { revealLines, revealUp } from '../lib/motion'
import { assistanceTechnique, assistanceTechniqueFeatures } from '../data/services'

export default function AssistanceTechnique() {
  const body = useRef(null)

  useScrollScene(body, () => {
    revealLines('[data-at="title"]', { trigger: body.current, start: 'top 82%' })
    revealUp('[data-at="fade"]', { trigger: body.current, start: 'top 84%', stagger: 0.1 })
  }, [])

  return (
    <div>
      <ServiceHero {...assistanceTechnique} />

      <section className="section section--surface svc-approach" ref={body} aria-labelledby="at-approche">
        <div className="container">
          <div className="svc-approach__head" data-at="fade">
            <SectionLabel>Nos prestations</SectionLabel>
          </div>
          <h2 className="split-heading svc-approach__title" id="at-approche">
            <span className="svc-approach__title-mask">
              <span className="svc-approach__title-line" data-at="title">
                De la préparation à la coordination, une{' '}
                <span className="u-lime">exécution maîtrisée</span>.
              </span>
            </span>
          </h2>
          <p className="lead svc-approach__lead" data-at="fade">
            Nos ingénieurs, superviseurs et spécialistes qualifiés interviennent à chaque
            étape pour sécuriser la qualité, la conformité et la performance de vos opérations.
          </p>

          <div className="stub-grid stub-grid--values">
            {assistanceTechniqueFeatures.map((f) => (
              <div key={f.title} className="stub-card card" data-at="fade">
                <span className="stub-card__icon">
                  <Icon name={f.icon} size={26} />
                </span>
                <h3 className="stub-card__title">{f.title}</h3>
                <p className="stub-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
