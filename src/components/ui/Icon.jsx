/* ============================================================================
   Icon — hand-authored two-tone line icons (§2.4). One inline SVG set, no
   dependency. Primary strokes use currentColor (set by the parent, typically
   electric blue); secondary strokes use var(--icon-accent) (lime by default).
   viewBox 24, stroke 1.75, round joins — an engineering, not-SaaS feel.
   ========================================================================== */
const LIME = 'var(--icon-accent)'

// A mechanical cog: outer circle + radial teeth + hub. Rendered in code so the
// teeth are always evenly spaced.
function Cog({ cx, cy, r, teeth = 8, color = 'currentColor' }) {
  const ticks = []
  const tlen = r * 0.42
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2
    const x1 = cx + Math.cos(a) * r
    const y1 = cy + Math.sin(a) * r
    const x2 = cx + Math.cos(a) * (r + tlen)
    const y2 = cy + Math.sin(a) * (r + tlen)
    ticks.push(<line key={i} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} />)
  }
  return (
    <g stroke={color}>
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r * 0.4} />
      {ticks}
    </g>
  )
}

const glyphs = {
  gears: () => (
    <>
      <Cog cx={9.5} cy={10} r={3.3} teeth={8} color="currentColor" />
      <Cog cx={16} cy={16} r={2.2} teeth={6} color={LIME} />
    </>
  ),
  cog: () => <Cog cx={12} cy={12} r={4.2} teeth={9} color="currentColor" />,
  buildings: () => (
    <>
      <g stroke="currentColor">
        <path d="M4 21V9l6-3v15" />
        <path d="M10 21V11l8 2.4V21" />
      </g>
      <g stroke={LIME}>
        <path d="M6.6 10.2v1.6M6.6 14v1.6M13 15v1.4M15.6 15v1.4" />
      </g>
    </>
  ),
  scales: () => (
    <>
      <g stroke="currentColor">
        <path d="M12 4v15" />
        <path d="M8 20h8" />
        <path d="M5.5 7h13" />
        <path d="M12 4.6a1 1 0 100-.2" />
      </g>
      <g stroke={LIME}>
        <path d="M5.5 7 3.2 12a2.3 2.3 0 004.6 0z" />
        <path d="M18.5 7 16.2 12a2.3 2.3 0 004.6 0z" />
      </g>
    </>
  ),
  globe: () => (
    <>
      <g stroke="currentColor">
        <circle cx={12} cy={12} r={8.5} />
        <path d="M3.5 12h17" />
      </g>
      <g stroke={LIME}>
        <ellipse cx={12} cy={12} rx={3.6} ry={8.5} />
        <path d="M5 6.8c2 1.2 12 1.2 14 0M5 17.2c2-1.2 12-1.2 14 0" />
      </g>
    </>
  ),
  leaf: () => (
    <>
      <path stroke="currentColor" d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path stroke={LIME} d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
  bulb: () => (
    <>
      <g stroke="currentColor">
        <circle cx={12} cy={9.5} r={5.2} />
        <path d="M9.4 14.2v1.8h5.2v-1.8" />
      </g>
      <g stroke={LIME}>
        <path d="M9.8 18h4.4M10.4 20.4h3.2" />
        <path d="M12 7v3l-1.4 1" />
      </g>
    </>
  ),
  target: () => (
    <>
      <g stroke="currentColor">
        <circle cx={11} cy={13} r={7.5} />
        <circle cx={11} cy={13} r={3.7} />
      </g>
      <g stroke={LIME}>
        <path d="M11 13 20 5" />
        <path d="M16.5 5.2 20 4.6l-.6 3.4" />
      </g>
    </>
  ),
  'shield-check': () => (
    <>
      <path stroke="currentColor" d="M12 3.2l7 2.6v5.3c0 4.6-3.1 7.6-7 9.1-3.9-1.5-7-4.5-7-9.1V5.8z" />
      <path stroke={LIME} d="M8.6 11.8l2.3 2.3 4.4-4.6" />
    </>
  ),
  users: () => (
    <>
      <g stroke="currentColor">
        <circle cx={9} cy={8.5} r={3.1} />
        <path d="M3.5 20v-1a5.5 5.5 0 0111 0v1" />
      </g>
      <g stroke={LIME}>
        <path d="M16 5.6a3 3 0 010 5.8" />
        <path d="M15.2 14.4a5.5 5.5 0 015.3 4.6v1" />
      </g>
    </>
  ),
  'chart-arrow': () => (
    <>
      <path stroke="currentColor" d="M4 4v16h16" />
      <g stroke={LIME}>
        <path d="M7 15.5l3.5-4 3 2.6L20 7" />
        <path d="M16.4 7h3.6v3.6" />
      </g>
    </>
  ),
  flame: () => (
    <>
      <path stroke="currentColor" d="M12 3c1 3.4 4.3 4.7 4.3 8.6a4.3 4.3 0 11-8.6 0c0-1.7.8-2.6 1.6-3.6C10.9 9.3 11.7 7 12 3z" />
      <path stroke={LIME} d="M12 20a2.4 2.4 0 002.4-2.4c0-1.7-2.4-2.6-2.4-2.6s-2.4.9-2.4 2.6A2.4 2.4 0 0012 20z" />
    </>
  ),
  bridge: () => (
    <>
      <g stroke="currentColor">
        <path d="M3 16h18" />
        <path d="M7 16V8M17 16V8" />
        <path d="M5 20v-4M19 20v-4M12 20v-4" />
      </g>
      <path stroke={LIME} d="M3 15c3.5 0 3.5-7 3.9-7 .6 0 3.1 6 5.1 6s4.5-6 5.1-6c.4 0 .4 7 3.9 7" />
    </>
  ),
  factory: () => (
    <>
      <path stroke="currentColor" d="M3 21V11l5 3V11l5 3V8h6v13z" />
      <g stroke={LIME}>
        <path d="M6.5 17.5v1.2M11 17.5v1.2M15.5 17.5v1.2" />
        <path d="M17 8V5" />
      </g>
    </>
  ),
  medal: () => (
    <>
      <circle stroke="currentColor" cx={12} cy={9} r={5.4} />
      <path stroke={LIME} d="M9 13.4 7.6 21l4.4-2.4L16.4 21 15 13.4M12 6.8l1 2 2.2.2-1.6 1.5.5 2.1-2.1-1.1-2.1 1.1.5-2.1L8.3 9l2.2-.2z" />
    </>
  ),
  compass: () => (
    <>
      <circle stroke="currentColor" cx={12} cy={12} r={8.5} />
      <path stroke={LIME} d="M15.5 8.5 10.8 10.8 8.5 15.5 13.2 13.2z" />
    </>
  ),
  clipboard: () => (
    <>
      <g stroke="currentColor">
        <path d="M8 5H6a1 1 0 00-1 1v13a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1h-2" />
        <rect x={8} y={3.4} width={8} height={3.2} rx={1} />
      </g>
      <path stroke={LIME} d="M8.5 11l1.6 1.6 3-3M8.5 16h5" />
    </>
  ),
  briefcase: () => (
    <>
      <g stroke="currentColor">
        <rect x={3} y={7.5} width={18} height={12} rx={1.6} />
        <path d="M8.5 7.5V6a2 2 0 012-2h3a2 2 0 012 2v1.5" />
      </g>
      <path stroke={LIME} d="M3 13h18M11 12.4v1.4" />
    </>
  ),
  headset: () => (
    <>
      <path stroke="currentColor" d="M5 13v-1a7 7 0 0114 0v1" />
      <g stroke={LIME}>
        <rect x={3.4} y={13} width={3.2} height={5} rx={1.4} />
        <rect x={17.4} y={13} width={3.2} height={5} rx={1.4} />
        <path d="M19 18v.6a3 3 0 01-3 3h-2" />
      </g>
    </>
  ),
  chat: () => (
    <>
      <path stroke="currentColor" d="M4 6.5A1.5 1.5 0 015.5 5h13A1.5 1.5 0 0120 6.5v8A1.5 1.5 0 0118.5 16H9l-4 3.2V16H5.5A1.5 1.5 0 014 14.5z" />
      <path stroke={LIME} d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
    </>
  ),
  envelope: () => (
    <>
      <rect stroke="currentColor" x={3} y={5.5} width={18} height={13} rx={1.6} />
      <path stroke={LIME} d="M4 7l8 6 8-6" />
    </>
  ),
  document: () => (
    <>
      <path stroke="currentColor" d="M6 3h7l5 5v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path stroke={LIME} d="M13 3v5h5M8.5 13h7M8.5 16.5h7" />
    </>
  ),
  check: () => (
    <>
      <circle stroke="currentColor" cx={12} cy={12} r={8.5} />
      <path stroke={LIME} d="M8.2 12.2l2.6 2.6 5-5.2" />
    </>
  ),
  'check-circle': () => glyphs.check(),
  hexagon: () => (
    <path stroke="currentColor" d="M12 2.6l8.2 4.7v9.4L12 21.4 3.8 16.7V7.3z" />
  ),
  'arrow-right': () => (
    <g stroke="currentColor">
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </g>
  ),
  'arrow-up-right': () => (
    <g stroke="currentColor">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </g>
  ),
  chevron: () => <path stroke="currentColor" d="M6 9l6 6 6-6" />,
  menu: () => (
    <g stroke="currentColor">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </g>
  ),
  close: () => (
    <g stroke="currentColor">
      <path d="M5 5l14 14M19 5L5 19" />
    </g>
  ),
}

export default function Icon({ name, size = 28, className = '', title, strokeWidth = 1.75, ...rest }) {
  const glyph = glyphs[name] || glyphs.gears
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {glyph()}
    </svg>
  )
}

export const iconNames = Object.keys(glyphs)
