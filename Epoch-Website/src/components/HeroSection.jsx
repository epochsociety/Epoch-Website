import { motion, useReducedMotion } from 'framer-motion'
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import MagneticButton from './MagneticButton'

const HeroHand3D = lazy(() => import('./HeroHand3D'))

const NEURAL_SEEDS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  l: ((i * 47) % 97) + 3,
  t: ((i * 31) % 88) + 5,
  d: 14 + (i % 9) * 2,
  delay: -(i % 7) * 1.4,
}))

function HeroSection({ onJoin }) {
  const reduced = useReducedMotion()
  const rootRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [narrow, setNarrow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const neuralDots = narrow ? NEURAL_SEEDS.slice(0, 8) : NEURAL_SEEDS

  const onMove = useCallback((e) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: nx * 22, y: ny * 16 })
  }, [reduced])

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), [])

  const titleLine = {
    hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.12 + i * 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section
      ref={rootRef}
      id="home"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="hero-root relative overflow-hidden px-3 pb-12 pt-20 max-[380px]:px-2.5 sm:pt-24 md:px-5 md:pt-24"
    >
      {/* Parallax depth layers */}
      <div
        className="hero-parallax-slow pointer-events-none absolute inset-0 -z-0 opacity-90"
        style={{
          transform: reduced ? undefined : `translate3d(${tilt.x * 0.35}px, ${tilt.y * 0.28}px, 0)`,
        }}
      >
        <div className="hero-orb absolute left-[35%] top-28 h-80 w-80 rounded-full bg-tech-accent/35 blur-[120px]" />
        <div className="hero-ambient-ring hero-ambient-ring--a pointer-events-none absolute left-[18%] top-[8%] h-[min(72vw,520px)] w-[min(72vw,520px)] rounded-full border border-tech-accent/15 opacity-60" />
        <div className="hero-ambient-ring hero-ambient-ring--b pointer-events-none absolute right-[-8%] top-[22%] h-[min(56vw,420px)] w-[min(56vw,420px)] rounded-full border border-tech-pink/12 opacity-50" />
      </div>

      <div
        className="hero-parallax-fast pointer-events-none absolute inset-0 -z-0"
        style={{
          transform: reduced ? undefined : `translate3d(${tilt.x * 0.55}px, ${tilt.y * 0.42}px, 0)`,
        }}
      >
        <svg className="hero-tech-lines pointer-events-none absolute inset-x-0 top-[12%] h-32 w-full opacity-[0.35]" preserveAspectRatio="none" viewBox="0 0 1200 120" aria-hidden>
          <defs>
            <linearGradient id="heroLineGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(94,217,243,0)" />
              <stop offset="40%" stopColor="rgba(94,217,243,0.45)" />
              <stop offset="100%" stopColor="rgba(232,90,207,0.35)" />
            </linearGradient>
          </defs>
          <path
            className="hero-line-dash"
            fill="none"
            stroke="url(#heroLineGrad)"
            strokeWidth="0.9"
            strokeLinecap="round"
            d="M0,70 Q240,30 520,80 T1040,50 T1200,90"
          />
        </svg>
        {!reduced &&
          neuralDots.map((n) => (
            <span
              key={n.id}
              className="hero-neural-dot pointer-events-none absolute rounded-full"
              style={{
                left: `${n.l}%`,
                top: `${n.t}%`,
                animationDuration: `${n.d}s`,
                animationDelay: `${n.delay}s`,
              }}
            />
          ))}
      </div>

      <Suspense fallback={null}>
        <HeroHand3D />
      </Suspense>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-[120px] text-[10px] leading-tight tracking-[0.22em] text-tech-muted md:text-xs"
      >
        IT IS TIME TO TAKE A LOOK AT OUR
      </motion.p>

      <div className="relative z-10 mt-4">
        <p className="pointer-events-none absolute left-0 top-8 font-dot text-7xl text-tech-text/10 md:text-[12rem]">2026</p>
        <div className="hero-title-glow pointer-events-none absolute left-0 top-1/2 h-[min(52vw,420px)] w-[min(92vw,720px)] -translate-y-1/2 rounded-full bg-gradient-to-r from-tech-pink/20 via-tech-accent/15 to-tech-purple/18 blur-3xl opacity-70" />
        <h1 className="relative z-10 mt-3 font-dot text-[clamp(2.35rem,10vw,3.25rem)] leading-[0.95] sm:text-5xl md:text-8xl">
          <motion.span
            className="block bg-gradient-to-r from-tech-pink via-tech-magenta to-tech-purple bg-clip-text text-transparent drop-shadow-[0_10px_28px_rgba(232,90,207,0.25)]"
            custom={0}
            variants={titleLine}
            initial={reduced ? false : 'hidden'}
            animate={reduced ? false : 'visible'}
          >
            1ST YEAR
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-tech-pink via-tech-magenta to-tech-purple bg-clip-text text-transparent drop-shadow-[0_10px_28px_rgba(232,90,207,0.25)]"
            custom={1}
            variants={titleLine}
            initial={reduced ? false : 'hidden'}
            animate={reduced ? false : 'visible'}
          >
            IN REVIEW
          </motion.span>
        </h1>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-8 flex flex-wrap items-center gap-5 text-sm text-tech-muted"
      >
        <span className="font-accent text-2xl italic text-tech-magenta md:text-3xl">College Tech Club</span>
        <span>Scroll down</span>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-7 flex flex-wrap gap-3"
      >
        <MagneticButton>
          <button
            type="button"
            onClick={onJoin}
            className="btn-premium min-h-[44px] rounded-full border border-transparent bg-gradient-to-r from-tech-pink to-tech-purple px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(232,90,207,0.28)]"
          >
            Join Club
          </button>
        </MagneticButton>
        <MagneticButton>
          <a
            href="#events"
            className="btn-premium-ghost inline-flex min-h-[44px] items-center justify-center rounded-full border border-tech-line/90 bg-tech-bg/65 px-5 py-2.5 text-sm text-tech-text shadow-sm backdrop-blur-sm hover:text-tech-magenta"
          >
            Open Timeline
          </a>
        </MagneticButton>
      </motion.div>
    </section>
  )
}

export default HeroSection
