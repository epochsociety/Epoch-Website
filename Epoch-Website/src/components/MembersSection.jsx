import { members } from '../data/siteData'

function MembersSection() {
  const layout = [
    { left: '6%', top: '10%' },
    { left: '26%', top: '4%' },
    { left: '50%', top: '12%' },
    { left: '73%', top: '8%' },
    { left: '12%', top: '46%' },
    { left: '36%', top: '40%' },
    { left: '58%', top: '44%' },
    { left: '80%', top: '48%' },
    { left: '22%', top: '72%' },
    { left: '46%', top: '78%' },
    { left: '70%', top: '74%' },
    { left: '88%', top: '68%' },
  ]

  const layoutMobile = [
    { left: '4%', top: '6%' },
    { left: '44%', top: '2%' },
    { left: '68%', top: '16%' },
    { left: '10%', top: '34%' },
    { left: '52%', top: '40%' },
    { left: '72%', top: '58%' },
    { left: '18%', top: '62%' },
    { left: '48%', top: '74%' },
  ]

  return (
    <section id="members" className="reveal-root mt-10">
      <p className="reveal font-clean text-xs tracking-[0.24em] text-tech-muted">MEMBERS</p>
      <h2 className="reveal mt-2 font-display text-4xl font-semibold md:text-6xl">
        Our <span className="text-tech-pink">#1</span> Goal Was To Build{' '}
        <span className="text-transparent [-webkit-text-stroke:1px_rgba(17,17,17,0.28)]">A Great Team</span>
      </h2>
      <div className="relative mt-6 hidden min-h-[640px] md:block">
        {members.slice(0, layout.length).map((member, idx) => {
          const pos = layout[idx]
          return (
            <article
              key={member.id}
              className="tilt-3d team-card-fx absolute w-[170px] select-none rounded-2xl border border-tech-line bg-tech-card/70 p-2 shadow-[0_18px_60px_rgba(17,17,17,0.12)] backdrop-blur"
              style={{
                left: pos.left,
                top: pos.top,
              }}
            >
              <div className="reveal overflow-hidden rounded-xl bg-tech-bg/60 p-2">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-[112px] w-full rounded-lg object-cover"
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-display text-sm font-semibold">{member.name}</p>
                  <span className="rounded-full bg-tech-bg/70 px-2 py-1 font-clean text-[10px] text-tech-muted">
                    {member.role}
                  </span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="relative mt-6 min-h-[520px] md:hidden">
        {members.slice(0, layoutMobile.length).map((member, idx) => {
          const pos = layoutMobile[idx]
          return (
            <article
              key={member.id}
              className="tilt-3d team-card-fx absolute w-[150px] select-none rounded-2xl border border-tech-line bg-tech-card/70 p-2 shadow-[0_18px_60px_rgba(17,17,17,0.12)] backdrop-blur"
              style={{
                left: pos.left,
                top: pos.top,
              }}
            >
              <div className="reveal overflow-hidden rounded-xl bg-tech-bg/60 p-2">
                <img src={member.photo} alt={member.name} className="h-[92px] w-full rounded-lg object-cover" />
                <div className="mt-2">
                  <p className="font-display text-sm font-semibold leading-tight">{member.name}</p>
                  <span className="mt-1 inline-block rounded-full bg-tech-bg/70 px-2 py-1 font-clean text-[10px] text-tech-muted">
                    {member.role}
                  </span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default MembersSection
