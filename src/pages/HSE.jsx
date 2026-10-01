/* ============================================================================
   HSE (Health, Safety & Environment) — a fully-built service page on the shared
   cinematic shell: the "HSE / Sécurité aujourd'hui, performance demain." opener
   over an animated night-refinery photograph, the four-domain band beneath, then
   a restrained "approche" bridge (copy derived from the design — nothing
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
import { hse, hseDomains } from '../data/services'

export default function HSE() {
  const body = useRef(null)

  useScrollScene(body, () => {
    revealLines('[data-hse="title"]', { trigger: body.current, start: 'top 82%' })
    revealUp('[data-hse="fade"]', { trigger: body.current, start: 'top 84%', stagger: 0.1 })
  }, [])

  return (
    <div>
      <ServiceHero {...hse}>
        <ServicePillarBar domains={hseDomains} />
      </ServiceHero>

      <section className="section section--surface svc-approach" ref={body} aria-labelledby="hse-approche">
        <div className="container">
          <div className="svc-approach__head" data-hse="fade">
            <SectionLabel>Notre approche</SectionLabel>
          </div>
          <h2 className="split-heading svc-approach__title" id="hse-approche">
            <span className="svc-approach__title-mask">
              <span className="svc-approach__title-line" data-hse="title">
                Protéger vos équipes, vos installations et{' '}
                <span className="u-lime">l'environnement</span>.
              </span>
            </span>
          </h2>
          <p className="lead svc-approach__lead" data-hse="fade">
            Nos interventions HSE s'articulent autour de quatre priorités complémentaires,
            de la prévention des risques à l'amélioration continue de vos performances.
          </p>

          <div data-hse="fade">
            <PageNote>
              Le détail complet de nos prestations HSE — sécurité des personnes,
              protection de l'environnement et conformité réglementaire — sera enrichi
              prochainement. Contactez nos équipes pour évaluer vos besoins.
            </PageNote>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
