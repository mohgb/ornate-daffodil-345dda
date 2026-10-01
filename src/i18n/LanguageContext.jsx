import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { fr } from './fr'
import { en } from './en'
import { ar } from './ar'

export const translations = { fr, en, ar }

export const languages = [
  { code: 'fr', label: 'Français', shortLabel: 'FR', flag: '🇫🇷', dir: 'ltr' },
  { code: 'en', label: 'English', shortLabel: 'EN', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', label: 'العربية', shortLabel: 'AR', flag: '🇩🇿', dir: 'rtl' },
]

const DEFAULT_LANG = 'fr'
const STORAGE_KEY = 'language'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && translations[saved]) {
        return saved
      }
    } catch {
      // Fallback silently if storage unavailable
    }
    return DEFAULT_LANG
  })

  const setLanguage = useCallback((code) => {
    if (!translations[code]) return
    setLanguageState(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // Ignore storage errors
    }
  }, [])

  const currentTranslations = useMemo(() => {
    return translations[language] || translations[DEFAULT_LANG]
  }, [language])

  // Synchronize <html> attributes, document title, and GSAP scroll trigger
  useEffect(() => {
    const isArabic = language === 'ar'
    const dir = isArabic ? 'rtl' : 'ltr'
    
    document.documentElement.lang = language
    document.documentElement.dir = dir

    if (isArabic) {
      document.documentElement.classList.add('is-rtl')
    } else {
      document.documentElement.classList.remove('is-rtl')
    }

    if (currentTranslations?.meta?.title) {
      document.title = currentTranslations.meta.title
    }

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && currentTranslations?.meta?.description) {
      metaDesc.setAttribute('content', currentTranslations.meta.description)
    }

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc && currentTranslations?.meta?.ogDescription) {
      ogDesc.setAttribute('content', currentTranslations.meta.ogDescription)
    }

    // Refresh scroll triggers if layout / line breaks shift
    const timer = setTimeout(() => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh()
      }
    }, 120)

    return () => clearTimeout(timer)
  }, [language, currentTranslations])

  /**
   * Helper function for dot-notation keys: t('common.contactUs') or t('foo', { name: 'Ali' })
   */
  const t = useCallback(
    (path, replacements) => {
      if (!path) return ''
      const keys = path.split('.')
      let val = keys.reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), currentTranslations)
      
      // Fallback to default French if missing
      if (val === undefined) {
        val = keys.reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), translations[DEFAULT_LANG])
      }

      if (typeof val === 'string' && replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
          val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), v)
        })
      }

      return val !== undefined ? val : path
    },
    [currentTranslations],
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      data: currentTranslations,
      isRTL: language === 'ar',
      dir: language === 'ar' ? 'rtl' : 'ltr',
      languages,
      currentLanguage: languages.find((l) => l.code === language) || languages[0],
    }),
    [language, setLanguage, t, currentTranslations],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function useTranslation() {
  return useLanguage()
}
