/* ============================================================================
   useScrollScene.js — one gsap.context() per section, reverted on unmount.
   This is what prevents ScrollTrigger leaks when navigating between routes in
   an SPA (§5.4). Pass a ref and a setup fn; the fn receives the scoped gsap.
   ========================================================================== */
import { useLayoutEffect } from 'react'
import { gsap } from './motion'

export function useScrollScene(scopeRef, setup, deps = []) {
  useLayoutEffect(() => {
    if (!scopeRef.current) return
    const ctx = gsap.context((self) => {
      setup?.(self)
    }, scopeRef)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
