/* ============================================================================
   Home — the homepage assembled as chapters of one brand film (plan §6).
   Section order follows the storytelling arc: hero → pillars → parcours →
   services → experience → metrics → differentiators → team → closing CTA.
   ========================================================================== */
import Hero from '../components/home/Hero'
import PillarStrip from '../components/home/PillarStrip'
import ValueProp from '../components/home/ValueProp'
import Services from '../components/home/Services'
import ProjectGrid from '../components/home/ProjectGrid'
import StatsPanel from '../components/home/StatsPanel'
import ValueAdded from '../components/home/ValueAdded'
import StaffTeaser from '../components/home/StaffTeaser'
import CtaBand from '../components/home/CtaBand'

export default function Home() {
  return (
    <>
      <Hero />
      <PillarStrip />
      <ValueProp />
      <Services />
      <ProjectGrid />
      <StatsPanel />
      <ValueAdded />
      <StaffTeaser />
      <CtaBand />
    </>
  )
}
