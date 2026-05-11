import { useCallback, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { eventList } from '../data/siteData'

/** Preserves original event card look; wrapper handles slider / glow / lift */
const EVENT_CARD_CLASS =
  'event-card-article relative h-full rounded-2xl border border-tech-line bg-tech-card/80 p-5 shadow-[0_14px_50px_rgba(17,17,17,0.06)]'

function EventsSection() {
  const reduced = useReducedMotion()
  const swiperRef = useRef(null)
  const [autoplayProgress, setAutoplayProgress] = useState(0)

  const slideTo = useCallback((dir) => {
    const s = swiperRef.current
    if (!s) return
    if (dir < 0) s.slidePrev()
    else s.slideNext()
  }, [])

  return (
    <section id="events" className="reveal-root relative mt-5 overflow-hidden">
      <div className="reveal flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-clean text-xs tracking-[0.24em] text-tech-muted">EVENTS</p>
          <h2 className="mt-2 max-w-4xl font-display text-4xl font-semibold leading-[0.95] md:text-7xl">Events</h2>
        </div>
        <div className="flex items-center gap-2 pb-1">
          <button
            type="button"
            onClick={() => slideTo(-1)}
            className="events-arrow-btn flex h-12 min-h-[44px] w-12 min-w-[44px] items-center justify-center rounded-full border border-tech-line/90 bg-tech-bg/80 text-tech-muted shadow-sm backdrop-blur-sm hover:border-tech-accent/50 hover:text-tech-magenta md:h-10 md:min-h-0 md:w-10 md:min-w-0"
            aria-label="Previous events"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => slideTo(1)}
            className="events-arrow-btn flex h-12 min-h-[44px] w-12 min-w-[44px] items-center justify-center rounded-full border border-tech-line/90 bg-tech-bg/80 text-tech-muted shadow-sm backdrop-blur-sm hover:border-tech-accent/50 hover:text-tech-magenta md:h-10 md:min-h-0 md:w-10 md:min-w-0"
            aria-label="Next events"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="events-swiper-host group relative mt-4 pb-2">
        <div className="events-swiper-glow" aria-hidden />

        <Swiper
          className="events-swiper"
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          spaceBetween={16}
          slidesPerView={1}
          centeredSlides
          breakpoints={{
            640: { slidesPerView: 2, centeredSlides: false },
            1024: { slidesPerView: 3, centeredSlides: false },
          }}
          rewind={true}
          speed={720}
          grabCursor
          keyboard={{ enabled: true }}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={
            reduced
              ? false
              : {
                  delay: 4800,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          onSwiper={(instance) => {
            swiperRef.current = instance
          }}
          onAutoplayTimeLeft={(_s, _t, progress) => {
            setAutoplayProgress(Math.max(0, Math.min(1, 1 - progress)))
          }}
          onSlideChange={() => setAutoplayProgress(0)}
        >
          {eventList.map((event) => (
            <SwiperSlide key={event.id} className="!h-auto">
              <div className="event-slide-shell pt-1 pb-2">
                <article className={EVENT_CARD_CLASS}>
                  <p className="font-clean text-xs text-tech-muted">{event.id}</p>
                  <h3 className="mt-2 font-dot text-xl tracking-wide">{event.title}</h3>
                  <p className="mt-3 font-clean text-sm leading-relaxed text-tech-muted">{event.description}</p>
                  <div className="mt-4 flex items-center justify-between font-clean text-sm">
                    <span>{event.date}</span>
                    <span className="rounded-full bg-tech-bg/90 px-2.5 py-1 text-xs text-tech-magenta">{event.status}</span>
                  </div>
                  <p className="mt-2 font-clean text-xs text-tech-muted">{event.venue}</p>
                </article>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {!reduced && (
          <div className="events-autoplay-progress mx-auto mt-3 h-0.5 max-w-[200px] overflow-hidden rounded-full bg-tech-line/60">
            <div
              className="events-autoplay-progress-fill h-full rounded-full bg-gradient-to-r from-tech-accent via-tech-pink to-tech-purple transition-[width] duration-100 ease-linear"
              style={{ width: `${autoplayProgress * 100}%` }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default EventsSection
