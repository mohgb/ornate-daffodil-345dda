import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../i18n'
import Icon from './Icon'

export default function LanguageSelector({ variant = 'header', className = '' }) {
  const { language, setLanguage, languages, isRTL } = useLanguage()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!open) return undefined

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // Segmented mode (used in MegaMenu for immediate 1-touch switching)
  if (variant === 'segmented') {
    return (
      <div className={`lang-segmented ${className}`} role="group" aria-label="Choisir la langue">
        {languages.map((l) => {
          const isActive = l.code === language
          return (
            <button
              key={l.code}
              type="button"
              className={`lang-segmented__btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setLanguage(l.code)}
              aria-pressed={isActive}
              title={l.label}
            >
              <span className="lang-segmented__flag" aria-hidden="true">{l.flag}</span>
              <span className="lang-segmented__code">{l.shortLabel}</span>
            </button>
          )
        })}
      </div>
    )
  }

  // Compact Dropdown mode (used in Header)
  const current = languages.find((l) => l.code === language) || languages[0]

  return (
    <div
      ref={dropdownRef}
      className={`lang-selector ${open ? 'is-open' : ''} ${className}`}
    >
      <button
        type="button"
        className="lang-selector__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Langue actuelle : ${current.label}. Changer de langue.`}
        id="lang-selector-btn"
      >
        <Icon name="globe" size={17} className="lang-selector__globe" />
        <span className="lang-selector__current">{current.shortLabel}</span>
        <Icon
          name="chevron"
          size={13}
          className={`lang-selector__chev ${open ? 'is-rotated' : ''}`}
        />
      </button>

      {open && (
        <ul
          className="lang-selector__menu"
          role="listbox"
          aria-labelledby="lang-selector-btn"
        >
          {languages.map((l) => {
            const isSelected = l.code === language
            return (
              <li key={l.code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`lang-selector__option ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => {
                    setLanguage(l.code)
                    setOpen(false)
                  }}
                >
                  <span className="lang-selector__option-flag" aria-hidden="true">
                    {l.flag}
                  </span>
                  <span className="lang-selector__option-label">
                    {l.label}
                  </span>
                  <span className="lang-selector__option-code">
                    ({l.shortLabel})
                  </span>
                  {isSelected && (
                    <Icon name="check" size={14} className="lang-selector__check" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
