import { eventList } from '../data/siteData'

function EventsSection() {
  return (
    <section id="events" className="reveal-root relative mt-5 overflow-hidden">
      <p className="reveal font-clean text-xs tracking-[0.24em] text-tech-muted">EVENTS</p>
      <h2 className="reveal mt-2 max-w-4xl font-display text-4xl font-semibold leading-[0.95] md:text-7xl">Events</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {eventList.map((event) => (
          <article
            key={event.id}
            className="tilt-3d reveal rounded-xl bg-black/20 p-4 [transform-style:preserve-3d]"
          >
            <p className="font-clean text-xs text-tech-muted">{event.id}</p>
            <h3 className="mt-2 font-dot text-lg">{event.title}</h3>
            <p className="mt-2 font-clean text-sm text-tech-muted">{event.description}</p>
            <div className="mt-4 flex items-center justify-between font-clean text-sm">
              <span>{event.date}</span>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{event.status}</span>
            </div>
            <p className="mt-2 font-clean text-xs text-tech-muted">{event.venue}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EventsSection
