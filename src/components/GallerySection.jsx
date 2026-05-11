import { gallery } from '../data/siteData'

function GallerySection() {
  return (
    <section id="gallery" className="reveal-root mt-10">
      <p className="reveal font-clean text-xs tracking-[0.24em] text-tech-muted">GALLERY</p>
      <h2 className="reveal mt-2 font-display text-4xl font-semibold md:text-6xl">
        Past <span className="text-tech-pink">Event</span> Memories
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {gallery.map((item) => (
          <figure key={item.id} className="tilt-3d reveal overflow-hidden rounded-xl">
            <img src={item.image} alt={item.caption} className="h-64 w-full object-cover transition duration-500 hover:scale-105" />
            <figcaption className="pt-3 font-clean text-sm text-tech-muted">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default GallerySection
