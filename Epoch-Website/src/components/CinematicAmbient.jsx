import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import NeuralMeshBackdrop from './NeuralMeshBackdrop'

/** Seeded jitter for stable particle layouts between renders */
function seeded(i, salt = 1) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function useMatchMedia(query) {
  const [matches, setMatches] = useState(() => false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setMatches(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])
  return matches
}

export default function CinematicAmbient() {
  const reduced = useReducedMotion()
  const isCompact = useMatchMedia('(max-width: 768px)')
  const prefersCoarseHover = useMatchMedia('(hover: none)')

  const rootRef = useRef(null)

  const particleCount = useMemo(() => {
    if (reduced) return 0
    if (isCompact) return 8
    return 32
  }, [reduced, isCompact])

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        leftPct: seeded(i, 2) * 100,
        topPct: seeded(i, 3) * 100,
        size: seeded(i, 4) * 2.2 + 1.4,
        duration: seeded(i, 5) * 16 + 18,
        delay: -seeded(i, 6) * 26,
        theme: seeded(i, 7),
      })),
    [particleCount],
  )

  const glowX = useMotionValue(-200)
  const glowY = useMotionValue(-200)

  const glowXs = useSpring(glowX, { stiffness: 52, damping: 34, mass: 0.32 })
  const glowYs = useSpring(glowY, { stiffness: 52, damping: 34, mass: 0.32 })

  useEffect(() => {
    if (reduced) return undefined

    const root = rootRef.current
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf = 0

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
      if (!prefersCoarseHover || e.pointerType === 'mouse') {
        glowX.set(e.clientX)
        glowY.set(e.clientY)
      }
    }

    const tick = () => {
      const gx = tx * (isCompact ? 7 : 15)
      const gy = ty * (isCompact ? 5 : 10)
      cx += (gx - cx) * 0.054
      cy += (gy - cy) * 0.054
      if (root) {
        root.style.setProperty('--cpx', `${cx}px`)
        root.style.setProperty('--cpy', `${cy}px`)
      }
      raf = requestAnimationFrame(tick)
    }

    root?.style.setProperty('--cpx', '0px')
    root?.style.setProperty('--cpy', '0px')

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced, isCompact, prefersCoarseHover, glowX, glowY])

  const enableLinesDual = !reduced && !isCompact
  const enableHeroDecor = !reduced
  const showCursorGlow = !reduced && !prefersCoarseHover && !isCompact
  const showCircuit = !reduced

  return (
    <div
      ref={rootRef}
      style={{ '--cpx': '0px', '--cpy': '0px' }}
      className={`cinematic-root fixed inset-0 z-[1] overflow-hidden pointer-events-none ${reduced ? 'cinematic-root--reduced' : ''}`}
      aria-hidden
    >
      <div className="cinematic-aurora-shell">
        <div className="cinematic-blob cinematic-blob--a" />
        <div className="cinematic-blob cinematic-blob--b" />
        <div className="cinematic-blob cinematic-blob--c" />
      </div>

      <div className="cinematic-depth-grid cinematic-depth-grid--a" />
      {!isCompact && <div className="cinematic-depth-grid cinematic-depth-grid--b cinematic-depth-grid--b-pan" />}

      {!reduced && <NeuralMeshBackdrop />}

      {showCircuit && (
        <div className={`cinematic-circuit-shell ${enableLinesDual ? 'cinematic-circuit-shell--dual' : 'cinematic-circuit-shell--single'}`}>
          <svg className="cinematic-svg cinematic-svg--flow-L" preserveAspectRatio="none" viewBox="0 0 1200 180">
            <defs>
              <linearGradient id="cineLG" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgba(184,244,255,0)" />
                <stop offset="35%" stopColor="rgba(94,217,243,0.55)" />
                <stop offset="70%" stopColor="rgba(232,90,207,0.45)" />
                <stop offset="100%" stopColor="rgba(183,132,227,0)" />
              </linearGradient>
              <linearGradient id="cineGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgba(232,90,207,0.14)" />
                <stop offset="100%" stopColor="rgba(94,217,243,0.1)" />
              </linearGradient>
            </defs>
            <filter id="cineBloom" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="1.1" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <g className="cinematic-svg-shift" filter="url(#cineBloom)">
              <path
                className="cinematic-path-dash"
                fill="none"
                stroke="url(#cineLG)"
                strokeWidth="0.85"
                d="M-40,90 Q120,42 260,92 T620,74 T940,106 T1340,64"
                strokeLinecap="round"
                opacity="0.55"
              />
              <path
                fill="none"
                stroke="url(#cineGlow)"
                strokeWidth="1.35"
                d="M-40,90 Q120,42 260,92 T620,74 T940,106 T1340,64"
                strokeLinecap="round"
                opacity="0.35"
              />
              <path
                fill="none"
                stroke="rgba(232,90,207,0.22)"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M40,134 L164,134 212,118 356,126 392,146 548,146 596,166 764,154 836,174 972,174"
                opacity="0.8"
              />
              <path
                fill="none"
                stroke="rgba(94,217,243,0.18)"
                strokeWidth="0.45"
                d="M20,154 L148,154 188,126 428,146 492,162 716,154 764,174 964,174"
                opacity="0.85"
              />
            </g>
          </svg>
          {enableLinesDual && (
            <svg className="cinematic-svg cinematic-svg--flow-R" preserveAspectRatio="none" viewBox="0 0 1200 220">
              <defs>
                <linearGradient id="cineLG2" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="rgba(232,90,207,0)" />
                  <stop offset="42%" stopColor="rgba(193,63,165,0.35)" />
                  <stop offset="78%" stopColor="rgba(94,217,243,0.5)" />
                  <stop offset="100%" stopColor="rgba(184,244,255,0)" />
                </linearGradient>
              </defs>
              <g className="cinematic-svg-shift cinematic-svg-shift--invert">
                <path
                  className="cinematic-path-dash cinematic-path-dash--rev"
                  fill="none"
                  stroke="url(#cineLG2)"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  d="M-60,138 Q180,70 460,154 T880,126 T1380,160"
                  opacity="0.45"
                />
              </g>
            </svg>
          )}
        </div>
      )}

      {!reduced && (
        <div
          className="cinematic-particle-field"
          style={{
            transform: 'translate3d(var(--cpx), var(--cpy), 0)',
            willChange: 'transform',
          }}
        >
          {particles.map((p) => (
            <span
              key={p.id}
              className={`cinematic-particle cinematic-particle--${p.theme < 0.33 ? 'cyan' : p.theme < 0.66 ? 'pink' : 'purple'}`}
              style={{
                left: `${p.leftPct}%`,
                top: `${p.topPct}%`,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {enableHeroDecor && (
        <div className="cinematic-hero-veil pointer-events-none">
          <motion.div
            className="cinematic-hero-wave-wrap"
            animate={{ opacity: [0.32, 0.48, 0.34] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="cinematic-hero-wave" viewBox="0 0 1400 200" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="waveGradStroke" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="rgba(232,90,207,0.25)" />
                  <stop offset="50%" stopColor="rgba(94,217,243,0.22)" />
                  <stop offset="100%" stopColor="rgba(183,132,227,0.2)" />
                </linearGradient>
                <linearGradient id="waveFill" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="rgba(232,90,207,0.05)" />
                  <stop offset="50%" stopColor="rgba(94,217,243,0.08)" />
                  <stop offset="100%" stopColor="rgba(183,132,227,0.06)" />
                </linearGradient>
              </defs>
              <motion.path
                className="cinematic-wave-stroke cinematic-wave-stroke--a"
                stroke="url(#waveGradStroke)"
                fill="none"
                strokeWidth="0.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M0,118 Q260,92 620,138 T1460,108"
                vectorEffect="non-scaling-stroke"
                animate={{ opacity: [0.5, 0.82, 0.55] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              />
              <path
                className="cinematic-wave-dash"
                fill="none"
                stroke="url(#waveFill)"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M0,154 Q340,178 760,154 T1540,168"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="cinematic-wave-stroke cinematic-wave-stroke--b"
                fill="none"
                stroke="rgba(94,217,243,0.18)"
                strokeWidth="0.55"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M-40,86 Q340,134 740,114 T1540,98"
                vectorEffect="non-scaling-stroke"
                opacity={0.7}
              />
            </svg>
          </motion.div>

          {!isCompact && (
            <>
              <motion.span
                className="cinematic-hero-ring cinematic-hero-ring--outer"
                animate={{ rotate: 360 }}
                transition={{ duration: 108, repeat: Infinity, ease: 'linear' }}
              />
              <motion.span
                className="cinematic-hero-ring cinematic-hero-ring--inner"
                animate={{ rotate: -360 }}
                transition={{ duration: 78, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="cinematic-hero-glow cinematic-hero-pulse"
                animate={{ scale: [1, 1.06, 1], opacity: [0.17, 0.26, 0.17] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}
        </div>
      )}

      <div className="cinematic-noise" />

      {!isCompact && (
        <>
          <div className="cinematic-glass-panel cinematic-glass-panel--t" />
          <div className="cinematic-glass-panel cinematic-glass-panel--b" />
        </>
      )}

      {showCursorGlow && (
        <motion.div
          aria-hidden
          className="cinematic-cursor-light"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            left: glowXs,
            top: glowYs,
          }}
        />
      )}
    </div>
  )
}
