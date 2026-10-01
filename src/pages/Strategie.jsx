/* ============================================================================
   Stratégie & Développement — a fully-built service page on the shared cinematic
   shell (design 05). The "Anticiper. / Planifier. / Réussir." opener rides over
   an animated chess photograph; the hero also carries a right-hand domain column
   (aside) and a full-width metrics strip at its foot, then a restrained
   "approche" bridge (copy recombined from the design — nothing invented) into
   the shared CTA.
   ========================================================================== */
import { useRef } from 'react'
import ServiceHero from '../components/service/ServiceHero'
import ServiceStatsBar from '../components/service/ServiceStatsBar'
import CtaBand from '../components/home/CtaBand'
import Icon from '../components/ui/Icon'
import { SectionLabel } from '../components/ui/Primitives'
import { PageNote } from './StubPage'
import { useScrollScene } from '../lib/useScrollScene'
import { revealLines, revealUp } from '../lib/motion'
import { strategie, strategieDomains, strategieStats } from '../data/services'

// Right-hand hero column — the four strategy domains as an icon + title + caption
// list. Fades in as one block with the hero intro (the wrapper is data-svc).
function StrategieAside() {
  return (
    <ul className="svc-aside">
      {strategieDomains.map((d) => (
        <li key={d.title} className="svc-aside__item">
          <span className="svc-aside__icon">
            <Icon name={d.icon} size={24} />
          </span>
          <span className="svc-aside__text">
            <span className="svc-aside__title">{d.title}</span>
            <span className="svc-aside__desc">{d.desc}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function Strategie() {
  const body = useRef(null)

  useScrollScene(body, () => {
    revealLines('[data-strat="title"]', { trigger: body.current, start: 'top 82%' })
    revealUp('[data-strat="fade"]', { trigger: body.current, start: 'top 84%', stagger: 0.1 })
  }, [])

  return (
    <div>
      <ServiceHero {...strategie} aside={<StrategieAside />}>
        <ServiceStatsBar stats={strategieStats} />
      </ServiceHero>

      <section className="section section--surface svc-approach" ref={body} aria-labelledby="strat-approche">
        <div className="container">
          <div className="svc-approach__head" data-strat="fade">
            <SectionLabel>Notre approche</SectionLabel>
          </div>
          <h2 className="split-heading svc-approach__title" id="strat-approche">
            <span className="svc-approach__title-mask">
              <span className="svc-approach__title-line" data-strat="title">
                Transformer vos objectifs en stratégies{' '}
                <span className="u-lime">durables</span>.
              </span>
            </span>
          </h2>
          <p className="lead svc-approach__lead" data-strat="fade">
            De la vision à l'exécution, nous structurons chaque étape : comprendre votre
            environnement, élaborer des plans d'action clairs, piloter la performance et
            vous adapter à la croissance.
          </p>

          <div data-strat="fade">
            <PageNote>
              Le détail complet de notre accompagnement stratégique — vision &amp; analyse,
              planification, exécution et croissance — sera enrichi prochainement. Contactez
              nos équipes pour bâtir votre feuille de route.
            </PageNote>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
