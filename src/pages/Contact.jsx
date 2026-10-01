/* ============================================================================
   Contact — a fully-built page on the shared cinematic shell. The branded
   page-hero opener (eyebrow + heading + lead) rides the same treatment as the
   other routes, then a two-column body pairs the coordinates (ContactInfo, left)
   with the validated ContactForm (right). Header/Footer come from App. No CTA
   band — the form itself is the conversion point (matches the old stub's intent).
   Nothing here invents a client, figure or coordinate (skill constraint).
   ========================================================================== */
import { useRef } from 'react'
import { Eyebrow } from '../components/ui/Primitives'
import ContactInfo from '../components/contact/ContactInfo'
import ContactForm from '../components/contact/ContactForm'
import { useScrollScene } from '../lib/useScrollScene'
import { revealLines, revealUp } from '../lib/motion'
import { contactIntro } from '../data/contact'

export default function Contact() {
  const scope = useRef(null)

  useScrollScene(scope, () => {
    revealLines('[data-ph="title"]', { trigger: scope.current, start: 'top 90%' })
    revealUp('[data-ph="fade"]', { trigger: scope.current, start: 'top 88%', stagger: 0.1 })
    revealUp('[data-contact="fade"]', { trigger: '.contact-layout', start: 'top 85%', stagger: 0.08 })
  }, [])

  return (
    <div ref={scope}>
      <section className="page-hero contact-hero u-grain" aria-labelledby="page-title">
        <span className="u-glow-blue page-hero__glow page-hero__glow--a" aria-hidden="true" />
        <span className="u-glow-lime page-hero__glow page-hero__glow--b" aria-hidden="true" />
        <div className="hero__grid page-hero__grid" aria-hidden="true" />

        <div className="container page-hero__inner">
          <div className="page-hero__eyebrow" data-ph="fade">
            <Eyebrow icon="chat" dash>
              {contactIntro.eyebrow}
            </Eyebrow>
          </div>

          <h1 className="page-hero__title" id="page-title">
            <span className="page-hero__title-mask">
              <span className="page-hero__title-line" data-ph="title">
                {contactIntro.title}
                <span className="u-lime"> {contactIntro.titleEmphasis}</span>
              </span>
            </span>
          </h1>

          <p className="lead page-hero__lead" data-ph="fade">
            {contactIntro.lead}
          </p>
        </div>
      </section>

      <section className="section contact-section" aria-label="Formulaire de contact">
        <div className="container">
          <div className="contact-layout">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
