/* Navigation — canonical structure reconciled from the eight references (plan §4).
   The inline row is a shortlist; the full map lives in the mega-menu overlay. */

export const services = [
  {
    label: 'Ingénierie & Construction',
    to: '/services/ingenierie-construction',
    icon: 'gears',
    desc: 'Conception, réalisation et suivi de projets industriels.',
  },
  {
    label: 'HSE',
    to: '/services/hse',
    icon: 'shield-check',
    desc: 'Sécurité des personnes, environnement et conformité.',
  },
  {
    label: 'Accompagnement Juridique',
    to: '/services/juridique',
    icon: 'scales',
    desc: 'Conformité et sécurité réglementaire.',
  },
  {
    label: 'Stratégie & Développement',
    to: '/services/strategie',
    icon: 'target',
    desc: 'Vision globale, croissance durable.',
  },
  {
    label: 'Ouverture Internationale',
    to: '/services/international',
    icon: 'globe',
    desc: 'Une présence adaptée à chaque marché.',
  },
  {
    label: 'Assistance technique',
    to: '/services/assistance-technique',
    icon: 'users',
    desc: 'Ingénieurs et spécialistes qualifiés pour vos opérations.',
  },
]

// Inline header shortlist (plan §6 proposed reconciliation).
export const primaryNav = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Nos Services', to: '/services', children: services },
  { label: 'Nos Expériences', to: '/nos-experiences' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Contact', to: '/contact' },
]

// Full site map for the hamburger mega-menu.
export const megaSections = [
  {
    title: 'Explorer',
    links: [
      { label: 'Accueil', to: '/' },
      { label: 'À propos', to: '/a-propos' },
      { label: 'Nos Expériences', to: '/nos-experiences' },
      { label: 'Notre Staff', to: '/notre-staff' },
      { label: 'Réalisations', to: '/realisations' },
      { label: 'Actualités', to: '/actualites' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Nos Services',
    links: services.map((s) => ({ label: s.label, to: s.to })),
  },
]
