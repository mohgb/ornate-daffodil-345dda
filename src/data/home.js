/* ============================================================================
   Homepage content — every string transcribed verbatim from the design
   references. No client, number, date or claim is invented (skill + plan §0).
   Flags from plan §11 are noted inline where a source contradiction exists.
   ========================================================================== */
import { services } from './nav'

export const hero = {
  wordmark: 'S.E.S.S',
  subtitle: 'Smart Engineering & Strategic Solutions',
  // "vos projets." is the lime emphasis (design 01).
  titleLead: "L'ingénierie intelligente au service de ",
  titleEmphasis: 'vos projets.',
  lead: 'Des solutions techniques, stratégiques et durables pour un avenir plus performant.',
  primary: { label: 'Découvrir nos services', to: '/services' },
  secondary: { label: 'Demander une consultation', to: '/contact' },
}

// Section 2 — Pillar strip (design 01, verbatim: labels exactly as shown).
export const pillars = [
  { icon: 'gears', title: 'Engineering', desc: 'Conception & étude technique', to: '/services/ingenierie-construction' },
  { icon: 'buildings', title: 'Construction', desc: 'Réalisation & suivi de projets', to: '/services/ingenierie-construction' },
  { icon: 'scales', title: 'Conseil Juridique', desc: 'Conformité & sécurité réglementaire', to: '/services/juridique' },
  { icon: 'globe', title: 'Stratégie & Développement', desc: 'Vision globale, croissance durable', to: '/services/strategie' },
]

// Section 3 — Value proposition (pattern + copy from design 08 "Notre parcours").
export const valueProp = {
  label: 'NOTRE PARCOURS',
  titleLead: 'Une expertise construite sur des projets ',
  titleEmphasis: "d'envergure",
  lead: "Forts de plus de quinze années d'expérience, nous intervenons dans la gestion et le pilotage de projets industriels et d'infrastructures stratégiques, de la conception jusqu'à la réalisation et la mise en service.",
  columns: [
    { icon: 'target', title: 'Vision globale', desc: 'Approche intégrée de chaque projet' },
    { icon: 'shield-check', title: 'Maîtrise technique', desc: 'Solutions innovantes et durables' },
    { icon: 'users', title: 'Coordination', desc: 'Équipes pluridisciplinaires et partenaires' },
    { icon: 'chart-arrow', title: 'Performance', desc: 'Respect des délais, coûts et qualité' },
  ],
}

// Section 4 — Services (five service pages; concise descriptions drawn from the
// service-page copy). `services` imported so labels/routes stay in one place.
export const servicesSection = {
  label: 'NOS SERVICES',
  titleLead: 'Une expertise complète pour des projets ',
  titleEmphasis: 'performants',
  items: services,
}

// Section 5 — Experience teaser (design 08 project cards, transcribed verbatim).
export const projects = [
  {
    num: '01',
    img: 'tayal',
    alt: 'Installation industrielle textile du projet TAYAL à Sidi Khettab',
    title: 'TAYAL – Sidi Khettab',
    subtitle: 'Projet textile industriel – 800 M USD',
    icon: 'buildings',
    desc: "Supervision des travaux, coordination des intervenants, suivi technique et accompagnement jusqu'à la mise en service effective.",
  },
  {
    num: '02',
    img: 'gnl',
    alt: 'Complexe énergétique GNL 3Z à Arzew de nuit',
    title: 'GNL 3Z – Arzew',
    subtitle: 'Projet énergétique – Sonatrach',
    icon: 'flame',
    desc: "Contribution à la réalisation d'un projet énergétique majeur et coordination des aspects techniques et opérationnels.",
  },
  {
    num: '03',
    img: 'infra',
    alt: 'Chantier d’infrastructures stratégiques avec grues',
    title: 'Infrastructures stratégiques',
    subtitle: 'Secteur public',
    icon: 'bridge',
    desc: "Supervision, suivi et coordination de projets d'infrastructures à forts enjeux techniques et opérationnels.",
  },
]

// Section 6 — Stats band (design 08 "Notre expérience en chiffres", verbatim).
// NOTE plan §11.1: design 05 shows "25+ Années d'expérience" while design 08
// shows "15+". These figures are taken verbatim from design 08, the source of
// this section's pattern. Not reconciled here — flagged for the client.
export const stats = [
  { icon: 'users', value: 15, suffix: '+', label: "Années d'expérience", sub: 'Une expertise solide et reconnue.' },
  { icon: 'factory', value: 800, suffix: ' M$', label: 'Projet industriel majeur', sub: "Projets d'envergure gérés avec succès." },
  { icon: 'gears', text: 'EPC', label: 'Expertise opérationnelle', sub: 'Maîtrise complète des opérations EPC.' },
  { icon: 'medal', value: 15, suffix: '+', label: "Années d'expertise industrielle", sub: 'Au service des projets stratégiques en Algérie.' },
]

// Section 7 — Differentiators (design 08 "Notre valeur ajoutée", verbatim).
export const valueAdded = {
  titleLines: ['Une vision globale.', 'Une expertise opérationnelle.'],
  titleEmphasis: 'Des résultats durables.',
  lead: "Nous accompagnons les investisseurs, industriels et acteurs institutionnels dans la réalisation de projets complexes. Notre approche intégrée combine ingénierie, stratégie, coordination et performance pour garantir le succès de vos projets et créer une valeur durable.",
  checklist: [
    'Approche intégrée et orientée résultats',
    'Équipes expérimentées et engagées',
    'Solutions innovantes et durables',
    'Maîtrise des risques et des contraintes',
    'Engagement qualité et sécurité',
  ],
}

// Section 8 — Staff teaser (design 07, verbatim).
export const staffTeaser = {
  label: 'NOS COMPÉTENCES, VOTRE RÉUSSITE',
  titleLead: "Une équipe d'experts ",
  titleEmphasis: 'pluridisciplinaires',
  lead: 'S.E.S.S réunit des compétences variées et complémentaires pour accompagner vos projets de la conception à la réalisation et garantir des solutions innovantes, durables et performantes.',
  chips: [
    { icon: 'users', a: 'Une équipe', b: 'pluridisciplinaire' },
    { icon: 'medal', a: 'Des compétences', b: "au service de l'excellence" },
  ],
  roles: [
    { icon: 'compass', label: 'Direction' },
    { icon: 'clipboard', label: 'Administration' },
    { icon: 'briefcase', label: 'Gestion de projets' },
    { icon: 'users', label: 'Ressources humaines' },
    { icon: 'headset', label: 'Communication & Support' },
  ],
  to: '/notre-staff',
}

// Section 10 — Final CTA (design 08 closing band, verbatim).
export const finalCta = {
  eyebrow: 'ENSEMBLE, ALLONS PLUS LOIN',
  titleLines: ['Construisons ensemble', 'les projets de demain.'],
  button: { label: 'Parlons de votre projet', to: '/contact' },
}
