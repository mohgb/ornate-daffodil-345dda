/* ============================================================================
   Service-page content. Copy transcribed verbatim from the design references
   (skill + plan §0) — no client, figure, date or claim is invented here.
   ========================================================================== */

// Ingénierie & Construction — hero "Construire un avenir durable" (animated
// construction-site background). Title splits into two masked lines; the second
// is the lime accent, exactly as shown in the design.
export const ingenierieConstruction = {
  image: {
    dir: 'construction',
    base: 'site',
    widths: [960, 1440, 1672],
    width: 1672,
    height: 940,
    alt: "Ingénieur en gilet de sécurité observant un chantier de construction au coucher du soleil",
  },
  titleLines: [
    { text: 'Construire' },
    { text: 'un avenir durable', accent: true },
  ],
  lead: 'Études, conception et accompagnement technique pour des projets solides et ambitieux.',
  primary: { label: 'Découvrir nos services', to: '/services' },
  secondary: { label: 'Nous contacter', to: '/contact', icon: 'chat' },
}

// Domain bar shown under the hero (design: four domains as one divided band).
// Labels and captions verbatim from the design; note "Ingénierie" (FR) here vs
// "Engineering" on the homepage strip — kept as each design shows it.
export const domains = [
  { icon: 'gears', title: 'Ingénierie', desc: 'Études et solutions techniques', to: '/services/ingenierie-construction' },
  { icon: 'buildings', title: 'Construction', desc: 'Réalisation & suivi de projets', to: '/services/ingenierie-construction' },
  { icon: 'scales', title: 'Conseil Juridique', desc: 'Conformité et sécurité réglementaire', to: '/services/juridique' },
  { icon: 'bulb', title: 'Stratégie & Développement', desc: 'Vision, croissance et performance', to: '/services/strategie' },
]

// HSE (Health, Safety & Environment) — hero "HSE / Sécurité aujourd'hui,
// performance demain." over an animated night-refinery photograph (a suited
// engineer in a hard hat facing an illuminated plant). The eyebrow + acronym
// wordmark + two-line tagline follow the supplied design; copy is transcribed
// verbatim from it — no figure, client or certification is invented.
export const hse = {
  variant: 'hse',
  image: {
    dir: 'hse',
    base: 'refinery',
    widths: [960, 1440, 1536],
    width: 1536,
    height: 1024,
    alt: "Ingénieur en costume et casque de sécurité observant une raffinerie illuminée la nuit",
  },
  eyebrow: { text: 'Health, Safety & Environment', icon: 'shield-check' },
  titleLines: [
    { text: 'HSE', wordmark: true, rule: true },
    { text: "Sécurité aujourd'hui,", sub: true, plain: true },
    { text: 'performance demain.', sub: true, accent: true },
  ],
  lead: "Nous vous accompagnons dans la mise en place de systèmes HSE performants pour protéger vos équipes, vos installations et l'environnement.",
  primary: { label: 'Découvrir nos services HSE', to: '/services', variant: 'btn--lime' },
  secondary: { label: 'Demander un audit HSE', to: '/contact', icon: 'document', variant: 'btn--ghost-lime' },
}

// The four HSE domains shown as the divided band under the hero (verbatim from
// the design). No dedicated sub-pages exist yet, so each tile points back to
// this page — mirroring how the own-domain tiles behave on the other services.
export const hseDomains = [
  { icon: 'shield-check', title: 'Sécurité des personnes', desc: 'Prévenir les risques et protéger vos équipes', to: '/services/hse' },
  { icon: 'leaf', title: "Protection de l'environnement", desc: "Réduire l'impact et préserver nos ressources", to: '/services/hse' },
  { icon: 'clipboard', title: 'Conformité réglementaire', desc: 'Respecter les normes et les exigences légales', to: '/services/hse' },
  { icon: 'chart-arrow', title: 'Performance durable', desc: 'Améliorer en continu pour des résultats durables', to: '/services/hse' },
]

// Conseil Juridique & Réglementaire — hero "Conseil Juridique / et
// Réglementaire" over an animated "Lady Justice" photograph (a blindfolded
// justice statue holding golden scales, with law books, a gavel and marble
// columns at dusk). The second line is the lime accent + a short rule, exactly
// as shown in the design; copy is transcribed verbatim — nothing invented.
export const juridique = {
  variant: 'juridique',
  image: {
    dir: 'juridique',
    base: 'justice',
    widths: [960, 1440, 1672],
    width: 1672,
    height: 940,
    alt: 'Statue de la justice aux yeux bandés tenant une balance dorée, avec des ouvrages de droit et un maillet, au crépuscule',
  },
  titleLines: [
    { text: 'Conseil Juridique' },
    { text: 'et Réglementaire', accent: true, rule: true },
  ],
  lead: 'Un accompagnement expert pour sécuriser et structurer vos projets en toute conformité.',
  primary: { label: 'Découvrir nos services', to: '/services' },
  secondary: { label: 'Nous contacter', to: '/contact', icon: 'chat' },
}

// The four juridique domains shown as the divided band under the hero (verbatim
// from the design). No dedicated sub-pages exist yet, so each tile points back
// to this page — mirroring the other service bars.
export const juridiqueDomains = [
  { icon: 'scales', title: 'Droit & Réglementation', desc: 'Conformité et sécurité juridique', to: '/services/juridique' },
  { icon: 'clipboard', title: 'Accompagnement Administratif', desc: 'Formalités et procédures', to: '/services/juridique' },
  { icon: 'target', title: 'Conseil Stratégique', desc: 'Sécurisation de vos décisions', to: '/services/juridique' },
  { icon: 'globe', title: 'Ouverture Internationale', desc: 'Normes et opportunités mondiales', to: '/services/juridique' },
]

// Stratégie & Développement — hero "Anticiper. / Planifier. / Réussir." over an
// animated chess photograph (a businessman in a blue suit moving a green-glowing
// knight on a marble chessboard, a night city skyline behind). This design (05)
// is richer than the other service heroes: alongside the headline it carries a
// right-hand domain column (strategieDomains) and a full-width metrics strip at
// the hero foot (strategieStats). Copy + figures are transcribed verbatim from
// the design — nothing is invented. The primary CTA takes a leading target icon.
export const strategie = {
  variant: 'strategie',
  image: {
    dir: 'strategie',
    base: 'chess',
    widths: [960, 1440, 1672],
    width: 1672,
    height: 941,
    alt: "Homme d'affaires en costume déplaçant un cavalier d'échecs lumineux vert sur un échiquier, gratte-ciels illuminés la nuit en arrière-plan",
  },
  eyebrow: { text: 'Stratégie & Développement', dash: true },
  titleLines: [
    { text: 'Anticiper.', plain: true },
    { text: 'Planifier.', plain: true },
    { text: 'Réussir.', accent: true, rule: true },
  ],
  lead: 'Nous transformons vos objectifs en stratégies efficaces et durables pour garantir votre croissance et votre avantage concurrentiel.',
  primary: { label: 'Nos approches stratégiques', to: '/services', icon: 'target', variant: 'btn--lime' },
  secondary: { label: 'Étude de cas', to: '/realisations', icon: 'document', variant: 'btn--ghost-lime' },
}

// The four strategy domains shown as the hero's right-hand column (verbatim from
// the design). The design pairs each with a pictogram; two of them (a chess
// knight and a refresh/cycle glyph) have no counterpart in our hand-authored
// icon set, so the closest existing two-tone glyphs stand in — bulb (strategy,
// as on the homepage domains strip) and compass (navigating change). No new
// glyph is hand-drawn (a prior from-scratch attempt rendered poorly).
export const strategieDomains = [
  { icon: 'target', title: 'Vision & Analyse', desc: 'Comprendre votre environnement et identifier les opportunités.' },
  { icon: 'bulb', title: 'Stratégie & Planification', desc: "Élaborer des plans d'action clairs et alignés avec vos objectifs." },
  { icon: 'chart-arrow', title: 'Exécution & Performance', desc: 'Mettre en œuvre et piloter pour des résultats mesurables.' },
  { icon: 'compass', title: 'Adaptation & Croissance', desc: "S'adapter aux évolutions et saisir de nouvelles opportunités." },
]

// The hero-foot metrics strip (verbatim from design 05). NOTE: these figures are
// design-sourced, not invented here, but they do not reconcile with the homepage
// stats (src/data/home.js) — design 05 attests "25+ Années d'expérience" while
// design 08 (the homepage) attests "15+", and "20+ Pays d'intervention" sits
// against the homepage's Algeria focus. The existing §11.1 note already flagged
// this design-vs-design discrepancy for the client; it is reproduced faithfully
// here and remains flagged — the client should reconcile the canonical numbers.
export const strategieStats = [
  { icon: 'users', value: 150, suffix: '+', label: 'Projets accompagnés' },
  { icon: 'target', value: 98, suffix: '%', label: 'Taux de satisfaction' },
  { icon: 'chart-arrow', value: 25, suffix: '+', label: "Années d'expérience" },
  { icon: 'globe', value: 20, suffix: '+', label: "Pays d'intervention" },
]

// Ouverture Internationale — hero "L'ingénierie / sans frontières, / l'expertise
// partout." over an animated "global network" photograph (two businessmen — one
// pointing, one open-palmed — beneath a glowing holographic world map + a blue &
// orange network constellation, a sunset city skyline behind). Like Stratégie
// (05) this design (06) is a rich hero: the headline shares a two-column split
// with a right-hand highlights column (internationalHighlights) and a full-width
// feature panel is seated at the hero foot (internationalFeatures). The eyebrow
// and the primary CTA both take a leading globe icon. Copy + figures are
// transcribed verbatim from the design — nothing is invented.
export const international = {
  variant: 'international',
  image: {
    dir: 'international',
    base: 'world',
    widths: [960, 1440, 1536],
    width: 1536,
    height: 1024,
    alt: "Deux hommes d'affaires devant une carte du monde holographique lumineuse reliée par un réseau de connexions, gratte-ciels d'une ville au crépuscule en arrière-plan",
  },
  eyebrow: { text: 'Ouverture Internationale', icon: 'globe', dash: true },
  titleLines: [
    { text: "L'ingénierie", plain: true },
    { text: 'sans frontières,', plain: true },
    { text: "l'expertise partout.", accent: true, rule: true },
  ],
  lead: "Nous accompagnons vos projets à l'international avec des solutions innovantes, conformes aux normes mondiales et adaptées à chaque marché.",
  primary: { label: 'Découvrir nos solutions internationales', to: '/services', icon: 'globe', variant: 'btn--lime' },
  secondary: { label: 'Parler à un expert', to: '/contact', icon: 'document', variant: 'btn--ghost-lime' },
}

// The hero's right-hand highlights column (verbatim from design 06): four bordered
// cards, each a two-tone icon + a lime value + a caption. The design pairs card 2
// with a handshake pictogram and card 4 with a globe-and-pin pictogram; neither
// has a counterpart in our hand-authored icon set, so the closest existing glyphs
// stand in — users (partnership) and compass (global reach / local bearings). No
// new glyph is hand-drawn (a prior from-scratch attempt rendered poorly). NOTE:
// "20+ Pays d'intervention" matches design 05 (strategieStats); "50+ Partenaires
// internationaux" is design-06-sourced (not reconciled against the homepage — the
// same design-vs-design figure caveat noted on strategieStats applies).
export const internationalHighlights = [
  { icon: 'globe', value: '20+', label: "Pays d'intervention" },
  { icon: 'users', value: '50+', label: 'Partenaires internationaux' },
  { icon: 'clipboard', value: 'Normes', label: 'Internationales respectées' },
  { icon: 'compass', value: 'Expertise globale,', label: 'Solutions locales' },
]

// The full-width feature panel seated at the hero foot (verbatim from design 06):
// five icon + title + caption features in one rounded, divided band. All five
// pictograms map to existing two-tone glyphs — nothing substituted here.
export const internationalFeatures = [
  { icon: 'globe', title: 'Présence Internationale', desc: 'Une expertise présente sur plusieurs continents' },
  { icon: 'target', title: 'Solutions Adaptées', desc: 'Des solutions sur mesure pour chaque marché' },
  { icon: 'shield-check', title: 'Conformité Globale', desc: 'Respect des normes et standards internationaux' },
  { icon: 'chart-arrow', title: 'Performance Durable', desc: "Créer de la valeur durablement à l'échelle mondiale" },
  { icon: 'users', title: 'Partenariats Solides', desc: 'Des partenaires de confiance pour réussir ensemble' },
]

// Assistance Technique — the sixth service. The client later supplied a dedicated
// photograph (three engineers / supervisors in hard hats reviewing plans on a
// tablet before an industrial plant at dusk — a literal match for "mise à
// disposition d'ingénieurs, de superviseurs et de spécialistes qualifiés"), so
// the page now rides the same full-bleed animated photo hero as the other five
// services instead of the branded gradient shell. The 1671x941 source shares
// Construction's aspect, so no per-page crop `variant` is needed. Title, lead and
// the three features below are transcribed / faithfully condensed from the
// client's brief — nothing is invented. The three capabilities keep the existing
// card grid (.stub-grid--values) below the hero (ServiceFeatureBar tiles to five
// columns at desktop, which would strand two empty cells for only three items).
export const assistanceTechnique = {
  image: {
    dir: 'assistance',
    base: 'team',
    widths: [960, 1440, 1671],
    width: 1671,
    height: 941,
    alt: "Trois ingénieurs et superviseurs en casque de sécurité et gilet réfléchissant consultant des plans sur une tablette devant un site industriel au crépuscule",
  },
  eyebrow: { text: 'Assistance technique', icon: 'users', dash: true },
  titleLines: [
    { text: 'La maîtrise technique' },
    { text: 'de vos opérations', accent: true, rule: true },
  ],
  lead: "Mise à disposition d'ingénieurs, de superviseurs et de spécialistes qualifiés pour accompagner efficacement les équipes industrielles et assurer la maîtrise technique des opérations.",
  primary: { label: 'Discuter de votre besoin', to: '/contact', icon: 'chat' },
  secondary: { label: 'Tous nos services', to: '/services' },
}

// The three capabilities of the assistance-technique offer (verbatim from the
// brief). Icons map to existing two-tone glyphs: clipboard (supervision / control),
// bulb (technical preparation & needs analysis), users (coordination of teams).
export const assistanceTechniqueFeatures = [
  {
    icon: 'clipboard',
    title: 'Supervision des travaux',
    desc: "Suivi et contrôle de l'exécution des travaux conformément aux exigences techniques et aux standards de qualité.",
  },
  {
    icon: 'bulb',
    title: 'Préparation technique',
    desc: 'Préparation des interventions, analyse des besoins et définition des moyens techniques nécessaires.',
  },
  {
    icon: 'users',
    title: 'Coordination des activités',
    desc: "Coordination entre les différentes équipes, intervenants et parties prenantes afin d'assurer une exécution fluide et efficace.",
  },
]
