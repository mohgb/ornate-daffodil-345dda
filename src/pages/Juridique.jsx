/* ============================================================================
   Conseil Juridique & Réglementaire — a fully-built service page on the shared
   cinematic shell: the "Conseil Juridique / et Réglementaire" opener over an
   animated "Lady Justice" photograph, the four-domain band beneath, then a
   restrained "approche" bridge (copy derived from the design — nothing
   invented) into the shared CTA.
   ========================================================================== */
import { useRef } from 'react'
import ServiceHero from '../components/service/ServiceHero'
import ServicePillarBar from '../components/service/ServicePillarBar'
import CtaBand from '../components/home/CtaBand'
import { SectionLabel } from '../components/ui/Primitives'
import { PageNote } from './StubPage'
import { useScrollScene } from '../lib/useScrollScene'
import { revealLines, revealUp } from '../lib/motion'
import { juridique, juridiqueDomains } from '../data/services'

export default function Juridique() {
  const body = useRef(null)

  useScrollScene(body, () => {
    revealLines('[data-jur="title"]', { trigger: body.current, start: 'top 82%' })
    revealUp('[data-jur="fade"]', { trigger: body.current, start: 'top 84%', stagger: 0.1 })
  }, [])

  return (
    <div>
      <ServiceHero {...juridique}>
        <ServicePillarBar domains={juridiqueDomains} />
      </ServiceHero>

      <section className="section section--surface svc-approach" ref={body} aria-labelledby="jur-approche">
        <div className="container">
          <div className="svc-approach__head" data-jur="fade">
            <SectionLabel>Notre approche</SectionLabel>
          </div>
          <h2 className="split-heading svc-approach__title" id="jur-approche">
            <span className="svc-approach__title-mask">
              <span className="svc-approach__title-line" data-jur="title">
                Sécuriser et structurer vos projets en toute{' '}
                <span className="u-lime">conformité</span>.
              </span>
            </span>
          </h2>
          <p className="lead svc-approach__lead" data-jur="fade">
            Du droit et de la réglementation à l'accompagnement administratif, nos experts
            sécurisent chaque étape de vos décisions — de la conformité juridique à
            l'ouverture internationale.
          </p>

          <div data-jur="fade">
            <PageNote>
              Le détail complet de nos prestations juridiques — droit &amp; réglementation,
              accompagnement administratif et ouverture internationale — sera enrichi
              prochainement. Contactez nos équipes pour sécuriser vos projets.
            </PageNote>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
