import { Link } from 'react-router-dom'

/**
 * Brand — the official S.E.S.S logo, used exactly as provided. We only ever
 * crop it (never recolour, retype, stretch or regenerate). Its dark photographic
 * plate is dropped at render time via mix-blend-mode: screen against the dark
 * chrome, so the metallic artwork sits cleanly on the near-black UI (plan §1).
 *
 *   variant="nav"    → the hexagon emblem only (compact, crisp at small sizes)
 *   variant="footer" → the full official lockup (emblem + wordmark)
 */
export default function Brand({ variant = 'nav', className = '', onNavigate }) {
  if (variant === 'footer') {
    return (
      <Link
        to="/"
        className={`brand brand--footer ${className}`}
        aria-label="S.E.S.S — Smart Engineering & Strategic Solutions — Accueil"
        onClick={onNavigate}
      >
        <img
          src="/img/logo/full.png"
          alt="S.E.S.S — Smart Engineering & Strategic Solutions"
          className="brand__blend"
          width={300}
          height={194}
        />
      </Link>
    )
  }

  return (
    <Link
      to="/"
      className={`brand brand--nav ${className}`}
      aria-label="S.E.S.S — Accueil"
      onClick={onNavigate}
    >
      <img
        src="/img/logo/emblem.png"
        alt="S.E.S.S"
        className="brand__mark brand__blend"
        width={42}
        height={49}
      />
    </Link>
  )
}
