import { useCallback, useEffect, useRef, useState } from 'react'

const strength = 0.2
const max = 9

/** Wraps a single interactive child; applies subtle magnetic translate on pointer move. */
export default function MagneticButton({ children, className = '' }) {
  const wrapRef = useRef(null)
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const sync = () => setFinePointer(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const onMove = useCallback((e) => {
    if (!finePointer || e.pointerType !== 'mouse') return
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * strength
    const dy = (e.clientY - (r.top + r.height / 2)) * strength
    const mx = Math.max(-max, Math.min(max, dx))
    const my = Math.max(-max, Math.min(max, dy))
    el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
  }, [])

  const onLeave = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    el.style.transform = 'translate3d(0,0,0)'
  }, [])

  return (
    <span
      ref={wrapRef}
      data-magnetic
      className={`magnetic-btn-wrap inline-flex ${className}`}
      onPointerMove={finePointer ? onMove : undefined}
      onPointerLeave={finePointer ? onLeave : undefined}
    >
      {children}
    </span>
  )
}
