/* ============================================================================
   motion.js — central GSAP setup, shared eases/durations, reduced-motion gate.
   Every scroll effect on the site funnels through here so no component can
   forget the reduced-motion path (§8).
   ========================================================================== */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
}

export const DUR = {
  fast: 0.4,
  base: 0.7,
  slow: 0.9,
  reveal: 0.9,
}

let _reduced = null
export function prefersReducedMotion() {
  if (_reduced !== null) return _reduced
  if (typeof window === 'undefined' || !window.matchMedia) return false
  _reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return _reduced
}

/**
 * Masked line-reveal: clip-path wipe up. Used for headlines.
 * In reduced-motion, elements are simply shown in place.
 */
export function revealLines(targets, opts = {}) {
  const els = gsap.utils.toArray(targets)
  if (!els.length) return
  if (prefersReducedMotion()) {
    gsap.set(els, { clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 })
    return
  }
  gsap.set(els, { clipPath: 'inset(0 0 100% 0)', opacity: 1, y: '0.4em' })
  gsap.to(els, {
    clipPath: 'inset(0 0 0% 0)',
    y: 0,
    duration: DUR.reveal,
    ease: EASE.expo,
    stagger: opts.stagger ?? 0.08,
    delay: opts.delay ?? 0,
    scrollTrigger: opts.trigger
      ? { trigger: opts.trigger, start: opts.start ?? 'top 80%', once: true }
      : undefined,
  })
}

/**
 * Fade + rise for blocks entering the viewport. Returns nothing; batches nicely.
 */
export function revealUp(targets, opts = {}) {
  const els = gsap.utils.toArray(targets)
  if (!els.length) return
  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, y: 0 })
    return
  }
  gsap.fromTo(
    els,
    { opacity: 0, y: opts.y ?? 28 },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? DUR.base,
      ease: EASE.out,
      stagger: opts.stagger ?? 0.08,
      delay: opts.delay ?? 0,
      scrollTrigger: opts.trigger
        ? {
            trigger: opts.trigger,
            start: opts.start ?? 'top 82%',
            once: true,
          }
        : undefined,
      onComplete: () => gsap.set(els, { willChange: 'auto' }),
    },
  )
}

/**
 * Grow a lime rule from the left (scaleX 0 -> 1) as its block enters.
 */
export function growRule(target, opts = {}) {
  const el = gsap.utils.toArray(target)[0]
  if (!el) return
  if (prefersReducedMotion()) {
    gsap.set(el, { scaleX: 1 })
    return
  }
  gsap.fromTo(
    el,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration: 0.8,
      ease: EASE.out,
      scrollTrigger: opts.trigger
        ? { trigger: opts.trigger, start: 'top 85%', once: true }
        : undefined,
    },
  )
}

/**
 * Count a number up from 0 with a snap. Lime stat numbers.
 */
export function countUp(el, end, opts = {}) {
  if (!el) return
  const suffix = opts.suffix ?? ''
  const prefix = opts.prefix ?? ''
  if (prefersReducedMotion()) {
    el.textContent = prefix + end + suffix
    return
  }
  const obj = { v: 0 }
  gsap.to(obj, {
    v: end,
    duration: 1.4,
    ease: 'power2.out',
    snap: { v: 1 },
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    onUpdate: () => {
      el.textContent = prefix + Math.round(obj.v) + suffix
    },
  })
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}
