import { Link } from 'react-router-dom'
import Icon from './Icon'

/**
 * Button — the site's two families (plan §3): blue-led and lime-led, each with a
 * solid and an outline variant. Lime solid uses dark ink for legibility (§8).
 * Renders a router <Link> for `to`, an <a> for `href`, else a <button>.
 */
export default function Button({
  children,
  variant = 'blue',
  to,
  href,
  icon, // leading glyph name
  trailing = 'arrow-right', // trailing glyph name, or null
  className = '',
  ...rest
}) {
  const cls = `btn btn--${variant} ${className}`.trim()
  const inner = (
    <>
      {icon && <Icon name={icon} size={18} className="btn__icon" />}
      <span className="btn__label">{children}</span>
      {trailing && <Icon name={trailing} size={18} className="btn__trailing" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}
