import { Suspense, lazy } from 'react'

const HeroHand3D = lazy(() => import('./HeroHand3D'))

function HeroSection({ onJoin }) {
  return (
    <section id="home" className="hero-root relative overflow-hidden px-3 pb-12 pt-22 md:px-5 md:pt-24">
      <div className="hero-orb absolute left-[35%] top-28 h-80 w-80 rounded-full bg-tech-accent/35 blur-[120px]" />
      <Suspense fallback={null}>
        <HeroHand3D />
      </Suspense>
      <p className="reveal max-w-[120px] text-[10px] leading-tight tracking-[0.22em] text-tech-muted md:text-xs">
        IT IS TIME TO TAKE A LOOK AT OUR
      </p>
      <div className="relative mt-4">
        <p className="pointer-events-none absolute left-0 top-8 font-dot text-7xl text-white/10 md:text-[12rem]">
          2026
        </p>
        <h1 className="reveal relative z-10 mt-3 font-dot text-5xl leading-[0.95] md:text-8xl">
          1ST YEAR
          <br />
          IN REVIEW
        </h1>
      </div>
      <div className="reveal mt-8 flex flex-wrap items-center gap-5 text-sm text-tech-muted">
        <span className="font-dot text-2xl text-white md:text-3xl">College Tech Club</span>
        <span>Scroll down</span>
      </div>
      <div className="reveal mt-7 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onJoin}
          className="rounded-full border border-tech-line bg-white/90 px-5 py-2.5 text-sm font-semibold text-black"
        >
          Join Club
        </button>
        <a href="#events" className="rounded-full border border-tech-line px-5 py-2.5 text-sm">
          Open Timeline
        </a>
      </div>
    </section>
  )
}

export default HeroSection
