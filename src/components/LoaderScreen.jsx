import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const BOOT_LINES = [
  'Initializing neural systems…',
  'Loading intelligence core…',
  'Connecting AI modules…',
  'Syncing event horizon…',
  'Surface ready.',
]

function LoaderScreen() {
  const reduced = useReducedMotion()
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    if (reduced) return undefined
    const id = window.setInterval(() => {
      setLineIdx((i) => (i + 1) % BOOT_LINES.length)
    }, 520)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div className="loader-screen fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-tech-bg px-4 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
      <div className="loader-scanline pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="loader-sweep pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-[2] flex w-[min(420px,88%)] flex-col items-center gap-6 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          animate={reduced ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="loader-logo-glitch font-display text-2xl tracking-[0.45em] text-tech-text md:text-3xl"
        >
          EPOCH
        </motion.div>

        <div className="w-full space-y-2">
          <p className="loader-boot-text font-clean text-xs text-tech-muted md:text-sm">{BOOT_LINES[lineIdx]}</p>
          <div className="loader-progress-track relative h-1 overflow-hidden rounded-full border border-tech-line/80 bg-tech-card/80">
            <motion.div
              className="loader-progress-fill absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-tech-accent via-tech-pink to-tech-purple"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.15, ease: [0.22, 0.61, 0.36, 1] }}
            />
            <span className="loader-progress-shine pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          </div>
          <p className="font-clean text-[10px] tracking-widest text-tech-muted/80">SECURE BOOT · v1.0.26</p>
        </div>

        <div className="loader-comet" aria-hidden>
          <span className="loader-comet__runner">
            <span className="loader-comet__dot" />
            <span className="loader-comet__dot loader-comet__dot--middle" />
            <span className="loader-comet__dot loader-comet__dot--tail" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoaderScreen
