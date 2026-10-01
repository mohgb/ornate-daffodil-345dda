/* ============================================================================
   Contact page content. Copy is on-brand and recombined from existing S.E.S.S
   material — nothing is invented (skill constraint). The COORDINATES below are
   PLACEHOLDERS: no real address, phone or e-mail exists anywhere in the project,
   so template values are used and must be replaced by the client. Search
   "TODO(contact)" to find every value to swap. The subject options mirror the
   real service catalogue from data/nav.js so the dropdown stays truthful.
   ========================================================================== */
import { services } from './nav'

export const contactIntro = {
  eyebrow: 'Contact',
  title: 'Parlons de',
  titleEmphasis: 'votre projet.',
  lead:
    "Un projet, une question ou un partenariat ? Décrivez-nous vos enjeux techniques et stratégiques, nos équipes vous répondront.",
}

// Left column — coordinates. Labels/structure are final; values are templates.
// TODO(contact): replace every `value`/`href`/address line with the real data.
export const contactDetails = [
  {
    icon: 'buildings',
    label: 'Adresse',
    lines: ['S.E.S.S — Smart Engineering', '& Strategic Solutions', 'Algérie'],
  },
  {
    icon: 'headset',
    label: 'Téléphone',
    value: '+213 (0)00 00 00 00', // TODO(contact): real phone number
    href: 'tel:+21300000000',
  },
  {
    icon: 'envelope',
    label: 'E-mail',
    value: 'contact@sess.dz', // TODO(contact): real e-mail address
    href: 'mailto:contact@sess.dz',
  },
]

// Reassurance line beneath the coordinates — reused verbatim from the footer.
export const contactAssurance =
  'Un projet, une question ou un partenariat ? Parlons de vos enjeux techniques et stratégiques.'

// Subject dropdown — the real service catalogue + two general options.
export const contactSubjects = [
  ...services.map((s) => s.label),
  'Partenariat',
  'Autre demande',
]
