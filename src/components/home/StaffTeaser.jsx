import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { SectionLabel, SplitHeading } from '../ui/Primitives'
import { useScrollScene } from '../../lib/useScrollScene'
import { revealLines, revealUp } from '../../lib/motion'
import { staffTeaser } from '../../data/home'

export default function StaffTeaser() {
  const scope = useRef(null)

  useScrollScene(scope, () => {
    revealLines('[data-st="head"] .split-heading', { trigger: scope.current, start: 'top 80%' })
    revealUp('[data-st="fade"]', { trigger: scope.current, start: 'top 78%', stagger: 0.08 })
    revealUp('[data-st="role"]', { trigger: '[data-st="roles"]', stagger: 0.07, y: 20 })
  }, [])

  return (
    <section className="section staff" ref={scope} aria-label="Nos compétences">
      <span className="u-glow-blue staff__glow staff__glow--a" aria-hidden="true" />
      <span className="u-glow-lime staff__glow staff__glow--b" aria-hidden="true" />

      <div className="container staff__inner">
        <div className="staff__head">
          <SectionLabel className="staff__label">{staffTeaser.label}</SectionLabel>
          <div data-st="head">
            <SplitHeading as="h2" lead={staffTeaser.titleLead} emphasis={staffTeaser.titleEmphasis} />
          </div>
          <p className="lead staff__lead" data-st="fade">
            {staffTeaser.lead}
          </p>

          <div className="staff__chips" data-st="fade">
            {staffTeaser.chips.map((c) => (
              <span className="staff__chip" key={c.a}>
                <Icon name={c.icon} size={20} />
                <span>
                  <strong>{c.a}</strong> {c.b}
                </span>
              </span>
            ))}
          </div>

          <Link to={staffTeaser.to} className="btn btn--lime staff__cta" data-st="fade">
            <Icon name="users" size={18} />
            <span>Découvrir notre staff</span>
            <Icon name="arrow-right" size={18} className="btn__trailing" />
          </Link>
        </div>

        <ul className="staff__roles" data-st="roles" aria-label="Nos pôles de compétences">
          {staffTeaser.roles.map((r) => (
            <li className="staff__role card" data-st="role" key={r.label}>
              <span className="staff__role-icon">
                <Icon name={r.icon} size={24} />
              </span>
              <span className="staff__role-label">{r.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
