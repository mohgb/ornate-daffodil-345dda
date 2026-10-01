/* ============================================================================
   smoothScroll.js — Lenis init + GSAP ticker bridge.
   Lenis drives GSAP's ticker so scroll position is a single source of truth
   (§5.4). Disabled entirely under prefers-reduced-motion.
   ========================================================================== */
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'

export function useSmoothScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return // native scroll; all ScrollTriggers no-op via gates

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('lenis')

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
      document.documentElement.classList.remove('lenis')
    }
  }, [])

  return lenisRef
}
