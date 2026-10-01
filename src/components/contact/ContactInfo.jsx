/* ============================================================================
   ContactInfo — the left-hand column of the Contact page: a short heading, the
   coordinates (address / phone / e-mail) as bordered cards, and a closing
   reassurance line. Phone and e-mail render as real links; the address is
   plain text. Values come from data/contact.js (placeholders to be replaced).
   ========================================================================== */
import Icon from '../ui/Icon'
import { SectionLabel } from '../ui/Primitives'
import { contactDetails, contactAssurance } from '../../data/contact'

function DetailValue({ item }) {
  if (item.href) {
    return (
      <a className="contact-info__value contact-info__value--link" href={item.href}>
        {item.value}
      </a>
    )
  }
  if (item.lines) {
    return (
      <span className="contact-info__value">
        {item.lines.map((line, i) => (
          <span key={i} className="contact-info__line">
            {line}
          </span>
        ))}
      </span>
    )
  }
  return <span className="contact-info__value">{item.value}</span>
}

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <div className="contact-info__head" data-contact="fade">
        <SectionLabel className="contact-info__label">Nos coordonnées</SectionLabel>
        <h2 className="contact-info__title">
          Restons <span className="u-lime">en contact</span>.
        </h2>
        <p className="contact-info__intro">
          Nos équipes sont à votre écoute pour étudier vos besoins et vous
          accompagner de la première idée jusqu&rsquo;à la réalisation.
        </p>
      </div>

      <ul className="contact-info__list">
        {contactDetails.map((item) => (
          <li key={item.label} className="contact-info__item" data-contact="fade">
            <span className="contact-info__icon">
              <Icon name={item.icon} size={24} />
            </span>
            <span className="contact-info__body">
              <span className="contact-info__key">{item.label}</span>
              <DetailValue item={item} />
            </span>
          </li>
        ))}
      </ul>

      <p className="contact-info__assurance" data-contact="fade">
        <span className="contact-info__assurance-bar" aria-hidden="true" />
        {contactAssurance}
      </p>
    </div>
  )
}
