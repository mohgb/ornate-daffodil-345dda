/* ============================================================================
   pages.jsx — route pages beyond the homepage. Each is a branded StubPage:
   real, already-transcribed copy where it exists (services, projects, team),
   and an honest placeholder note where full content is still to come. Nothing
   here invents clients, figures, dates or achievements (skill constraint).
   ========================================================================== */
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import StubPage, { PageNote } from './StubPage'
import { services } from '../data/nav'
import { projects, valueProp, staffTeaser, servicesSection } from '../data/home'

/* --- Shared little renderers -------------------------------------------- */
function ServiceList() {
  return (
    <div className="stub-grid stub-grid--services">
      {services.map((s) => (
        <Link key={s.to} to={s.to} className="stub-card card">
          <span className="stub-card__icon">
            <Icon name={s.icon} size={28} />
          </span>
          <h3 className="stub-card__title">{s.label}</h3>
          <p className="stub-card__desc">{s.desc}</p>
          <span className="stub-card__link">
            En savoir plus
            <Icon name="arrow-right" size={16} className="btn__trailing" />
          </span>
        </Link>
      ))}
    </div>
  )
}

function ProjectList() {
  return (
    <div className="stub-list">
      {projects.map((p) => (
        <article key={p.num} className="stub-row card">
          <span className="stub-row__num">{p.num}</span>
          <div className="stub-row__body">
            <div className="stub-row__head">
              <h3 className="stub-row__title">{p.title}</h3>
              <span className="stub-row__sector">
                <Icon name={p.icon} size={16} />
                <span>{p.subtitle}</span>
              </span>
            </div>
            <p className="stub-row__desc">{p.desc}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function RolesGrid() {
  return (
    <div className="stub-grid stub-grid--roles">
      {staffTeaser.roles.map((r) => (
        <div key={r.label} className="stub-card card stub-card--role">
          <span className="stub-card__icon">
            <Icon name={r.icon} size={26} />
          </span>
          <h3 className="stub-card__title">{r.label}</h3>
        </div>
      ))}
    </div>
  )
}

/* --- Pages -------------------------------------------------------------- */
export function About() {
  return (
    <StubPage
      eyebrow="À propos"
      title="L'ingénierie intelligente"
      titleEmphasis="au service de vos projets."
      lead={valueProp.lead}
      primary={{ label: 'Découvrir nos services', to: '/services' }}
      secondary={{ label: 'Nous contacter', to: '/contact', icon: 'chat' }}
    >
      <div className="stub-grid stub-grid--values">
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
      <PageNote>
        La présentation détaillée de S.E.S.S sera enrichie prochainement. En attendant,
        explorez nos services et nos expériences.
      </PageNote>
    </StubPage>
  )
}

export function ServicesIndex() {
  return (
    <StubPage
      eyebrow={servicesSection.label}
      title={servicesSection.titleLead}
      titleEmphasis={servicesSection.titleEmphasis}
      lead="De l'ingénierie et la construction à l'accompagnement juridique, à la stratégie et à l'ouverture internationale, nous couvrons l'ensemble du cycle de vos projets."
      primary={{ label: 'Demander une consultation', to: '/contact' }}
    >
      <ServiceList />
    </StubPage>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.to === `/services/${slug}`)

  if (!service) return <NotFound />

  return (
    <StubPage
      eyebrow="Nos services"
      title={service.label}
      lead={service.desc}
      primary={{ label: 'Discuter de votre besoin', to: '/contact' }}
      secondary={{ label: 'Tous nos services', to: '/services' }}
    >
      <PageNote>
        Le détail complet de cette expertise sera publié prochainement. Contactez nos
        équipes pour en savoir plus dès aujourd'hui.
      </PageNote>
    </StubPage>
  )
}

export function Experiences() {
  return (
    <StubPage
      eyebrow="Nos expériences"
      title="Des projets stratégiques, des"
      titleEmphasis="résultats concrets"
      lead="Un aperçu de projets industriels et d'infrastructures menés de la conception jusqu'à la mise en service."
      primary={{ label: 'Voir nos réalisations', to: '/realisations' }}
    >
      <ProjectList />
    </StubPage>
  )
}

export function Staff() {
  return (
    <StubPage
      eyebrow={staffTeaser.label}
      title={staffTeaser.titleLead}
      titleEmphasis={staffTeaser.titleEmphasis}
      lead={staffTeaser.lead}
      primary={{ label: 'Rejoindre nos projets', to: '/contact' }}
    >
      <RolesGrid />
    </StubPage>
  )
}

export function Realisations() {
  return (
    <StubPage
      eyebrow="Réalisations"
      title="Nos"
      titleEmphasis="réalisations"
      lead="Une sélection de projets menés par nos équipes, à forte valeur technique et stratégique."
      primary={{ label: 'Démarrer un projet', to: '/contact' }}
    >
      <ProjectList />
    </StubPage>
  )
}

export function Actualites() {
  return (
    <StubPage
      eyebrow="Actualités"
      title="Les actualités"
      titleEmphasis="S.E.S.S"
      lead="Retrouvez bientôt les temps forts, projets et annonces de S.E.S.S."
      secondary={{ label: "Retour à l'accueil", to: '/' }}
    >
      <PageNote>
        Aucune actualité n'est publiée pour le moment. Cette rubrique sera mise à jour
        prochainement.
      </PageNote>
    </StubPage>
  )
}

export function MentionsLegales() {
  return (
    <StubPage
      eyebrow="Mentions légales"
      title="Mentions"
      titleEmphasis="légales"
      showCta={false}
    >
      <PageNote>
        Les mentions légales seront publiées prochainement.
      </PageNote>
    </StubPage>
  )
}

export function Confidentialite() {
  return (
    <StubPage
      eyebrow="Confidentialité"
      title="Politique de"
      titleEmphasis="confidentialité"
      showCta={false}
    >
      <PageNote>
        La politique de confidentialité sera publiée prochainement.
      </PageNote>
    </StubPage>
  )
}

export function NotFound() {
  return (
    <StubPage
      eyebrow="Erreur 404"
      title="Cette page est"
      titleEmphasis="introuvable."
      lead="La page que vous recherchez n'existe pas ou a été déplacée."
      primary={{ label: "Retour à l'accueil", to: '/' }}
      secondary={{ label: 'Nous contacter', to: '/contact', icon: 'chat' }}
      showCta={false}
    />
  )
}
