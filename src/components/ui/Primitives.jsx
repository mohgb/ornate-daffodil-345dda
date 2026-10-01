import Icon from './Icon'

/* Small shared display primitives. */

// Lime uppercase eyebrow, optional leading icon + trailing dash (§2.2).
export function Eyebrow({ children, icon, dash = false, className = '' }) {
  return (
    <p className={`eyebrow ${className}`}>
      {icon && <Icon name={icon} size={16} className="eyebrow__icon" />}
      <span>{children}</span>
      {dash && <span className="eyebrow__dash" aria-hidden="true" />}
    </p>
  )
}

// Centred lime micro-label, e.g. "NOS RÉFÉRENCES MAJEURES".
export function SectionLabel({ children, className = '' }) {
  return <p className={`section-label ${className}`}>{children}</p>
}

// The signature split heading: white lead + lime emphasis word/phrase.
// `as` picks the heading level; `lead`/`emphasis` are the two coloured parts.
export function SplitHeading({ as: Tag = 'h2', lead, emphasis, className = '', children }) {
  return (
    <Tag className={`split-heading ${className}`}>
      {lead}
      {emphasis && <span className="u-lime">{emphasis}</span>}
      {children}
    </Tag>
  )
}

// Animated lime underline (scaleX grows on enter via motion helper).
export function Rule({ className = '', 'data-rule': dataRule }) {
  return <span className={`rule ${className}`} data-rule={dataRule} aria-hidden="true" />
}
