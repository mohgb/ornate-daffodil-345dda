/* ============================================================================
   Ingénierie & Construction — the first fully-built service page (design:
   "Construire un avenir durable" over an animated construction-site photo,
   with the four-domain band beneath). Below the fold reuses the brand's
   verbatim "parcours" content so nothing is fabricated, then the shared CTA.
   ========================================================================== */
import { useRef } from 'react'
import ServiceHero from '../components/service/ServiceHero'
import ServicePillarBar from '../components/service/ServicePillarBar'
import CtaBand from '../components/home/CtaBand'
import Icon from '../components/ui/Icon'
import { SectionLabel } from '../components/ui/Primitives'
import { PageNote } from './StubPage'
import { useScrollScene } from '../lib/useScrollScene'
import { revealLines, revealUp } from '../lib/motion'
import { ingenierieConstruction } from '../data/services'
import { valueProp } from '../data/home'

export default function IngenierieConstruction() {
  const body = useRef(null)

  useScrollScene(body, () => {
    revealLines('[data-ic="title"]', { trigger: body.current, start: 'top 82%' })
    revealUp('[data-ic="fade"]', { trigger: body.current, start: 'top 84%', stagger: 0.1 })
  }, [])

  return (
    <div>
      <ServiceHero {...ingenierieConstruction}>
        <ServicePillarBar />
      </ServiceHero>

      <section className="section section--surface svc-approach" ref={body} aria-labelledby="ic-approach">
        <div className="container">
          <div className="svc-approach__head" data-ic="fade">
            <SectionLabel>Notre approche</SectionLabel>
          </div>
          <h2 className="split-heading svc-approach__title" id="ic-approach">
            <span className="svc-approach__title-mask">
              <span className="svc-approach__title-line" data-ic="title">
                {valueProp.titleLead}
                <span className="u-lime">{valueProp.titleEmphasis}</span>
              </span>
            </span>
          </h2>
          <p className="lead svc-approach__lead" data-ic="fade">
            {valueProp.lead}
          </p>

          <div className="stub-grid stub-grid--values svc-approach__grid" data-ic="fade">
            {valueProp.columns.map((c) => (
              <div key={c.title} className="stub-card card">
                <span className="stub-card__icon">
                  <Icon name={c.icon} size={26} />
                </span>
                <h3 className="stub-card__title">{c.title}</h3>
                <p className="stub-card__desc">{c.desc}</p>
              </div>
            ))}
          </div>

          <div data-ic="fade">
            <PageNote>
              Le détail complet de nos prestations Ingénierie &amp; Construction — études,
              conception et suivi de réalisation — sera enrichi prochainement. Contactez nos
              équipes pour échanger sur votre projet.
            </PageNote>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
