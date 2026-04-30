import { Suspense, lazy, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { upcomingEvent } from '../data/siteData'

const HandsLayer3D = lazy(() => import('./HandsLayer3D'))

function UpcomingEventSection() {
  const sectionRef = useRef(null)
  const eyeRef = useRef(null)
  const cardRef = useRef(null)
  const dotRef = useRef(null)
  const topTrackRef = useRef(null)
  const bottomTrackRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const card = cardRef.current
    const eye = eyeRef.current
    const dot = dotRef.current
    const topTrack = topTrackRef.current
    const bottomTrack = bottomTrackRef.current
    if (!section || !card || !eye || !dot || !topTrack || !bottomTrack) return undefined

    const state = { tx: 0, ty: 0, cx: 0, cy: 0 }
    let rafId = 0

    const tick = () => {
      state.cx += (state.tx - state.cx) * 0.13
      state.cy += (state.ty - state.cy) * 0.13
      gsap.set(dot, { x: state.cx, y: state.cy })
      rafId = window.requestAnimationFrame(tick)
    }
    rafId = window.requestAnimationFrame(tick)

    const onMove = (event) => {
      const r = eye.getBoundingClientRect()
      const dx = event.clientX - (r.left + r.width / 2)
      const dy = event.clientY - (r.top + r.height / 2)
      const maxX = r.width * 0.26
      const maxY = r.height * 0.28
      state.tx = gsap.utils.clamp(-maxX, maxX, dx * 0.25)
      state.ty = gsap.utils.clamp(-maxY, maxY, dy * 0.25)
    }

    const onLeave = () => {
      state.tx = 0
      state.ty = 0
    }

    const ctx = gsap.context(() => {
      gsap.to(dot, {
        scale: 1.08,
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        ease: 'power3.inOut',
      })

      gsap.to('.event-badge-ring', {
        rotate: 360,
        duration: 13,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      gsap.to(topTrack, {
        x: -300,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(bottomTrack, {
        x: 300,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    card.addEventListener('pointermove', onMove, { passive: true })
    card.addEventListener('pointerleave', onLeave, { passive: true })

    return () => {
      window.cancelAnimationFrame(rafId)
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
      ctx.revert()
    }
  }, [])

  return (
    <section id="upcoming" ref={sectionRef} className="reveal-root mt-10">
      <div className="relative overflow-hidden py-10">
        <div className="pointer-events-none absolute inset-x-0 top-3 z-0 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0c0f19] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0c0f19] to-transparent" />
          <div ref={topTrackRef} className="flex w-max gap-16 whitespace-nowrap font-display text-7xl font-semibold text-white/15 md:text-8xl">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={`top-${i}`} className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)]">
                /21 /22 /23
              </span>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-2 z-0 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0c0f19] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0c0f19] to-transparent" />
          <div ref={bottomTrackRef} className="flex w-max gap-16 whitespace-nowrap font-display text-7xl font-semibold text-white/12 md:text-8xl">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={`bottom-${i}`}>Partner Awards</span>
            ))}
          </div>
        </div>

        <p className="reveal relative z-10 font-clean text-xs tracking-[0.24em] text-tech-muted">UPCOMING EVENT</p>
        <div className="pointer-events-none absolute left-[-4%] top-14 z-0 w-[120%] select-none">
          <p className="font-display text-[70px] font-semibold leading-[0.9] text-white/90 md:text-[120px]">
            Webflow Award
          </p>
          <p className="mt-6 font-display text-[70px] font-semibold leading-[0.9] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.24)] md:text-[120px]">
            Partner Award
          </p>
        </div>

        <div className="relative z-10 mt-10 grid items-center gap-8 md:grid-cols-2">
          <div className="reveal">
            <p className="font-clean text-tech-muted">{upcomingEvent.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold md:text-5xl">{upcomingEvent.title}</p>
            <p className="mt-3 font-clean text-tech-muted">{upcomingEvent.date}</p>
            <a
              href={upcomingEvent.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 font-clean text-sm hover:bg-white/15"
            >
              Open event page
            </a>
          </div>

          <div className="reveal relative">
            <div
              ref={cardRef}
              className="relative mx-auto aspect-[3/4] w-[min(390px,96%)] overflow-hidden rounded-[34px] bg-black/45 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur"
            >
              <Suspense fallback={null}>
                <HandsLayer3D />
              </Suspense>

              <div
                ref={eyeRef}
                className="absolute left-1/2 top-1/2 h-44 w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-gradient-to-b from-white/10 to-white/0"
                style={{ clipPath: 'ellipse(48% 36% at 50% 50%)' }}
              >
                <div className="absolute inset-2 rounded-[50%] bg-gradient-to-b from-black/70 to-black/40" />
                <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2">
                  <div ref={dotRef} className="h-12 w-12">
                    <div className="h-12 w-12 rounded-full bg-emerald-300/95 shadow-[0_0_70px_rgba(52,211,153,0.85)]" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.open(upcomingEvent.url, '_blank', 'noopener,noreferrer')}
                className="event-badge group pointer-events-auto absolute left-7 top-1/2 z-40 -translate-y-1/2 cursor-pointer transition-transform duration-300 hover:scale-105"
                aria-label="Open upcoming event"
              >
                <div className="event-badge-ring relative h-20 w-20 rounded-full bg-tech-pink/80 shadow-[0_18px_70px_rgba(255,145,253,0.40)]">
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                    <defs>
                      <path id="badgeTextCircle" d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
                    </defs>
                    <text fill="rgba(255,255,255,0.92)" fontSize="8" letterSpacing="1.1">
                      <textPath href="#badgeTextCircle">OPEN NEXT EVENT OPEN NEXT EVENT</textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-[14px] rounded-full bg-black/60" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="rounded-full bg-white/10 px-3 py-1 font-clean text-xs text-white group-hover:bg-white/15">↗</span>
                  </div>
                </div>
              </button>
            </div>
            <p className="mt-3 text-center font-clean text-sm text-tech-muted">Move your cursor over the card</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpcomingEventSection

