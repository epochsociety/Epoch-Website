import { documents, eventList } from '../data/siteData'

function DashboardPage({ user, onLogout }) {
  return (
    <section className="mx-auto mt-10 w-[min(1160px,94%)] space-y-5">
      <div className="rounded-3xl border border-tech-line bg-tech-card p-6">
        <p className="text-sm text-tech-muted">Logged in as {user.email}</p>
        <h1 className="mt-2 font-dot text-4xl">Club Dashboard</h1>
        <p className="mt-2 text-tech-muted">
          This is the post-login section where events and important documents are listed. You can connect MongoDB later for dynamic data.
        </p>
        <button type="button" onClick={onLogout} className="mt-4 rounded-full border border-tech-line px-4 py-2 text-sm">
          Logout
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-tech-line bg-tech-card p-6">
          <h2 className="font-dot text-2xl">All Events</h2>
          <ul className="mt-4 space-y-3">
            {eventList.map((event) => (
              <li key={event.id} className="rounded-xl border border-tech-line p-3">
                <p className="font-dot">{event.title}</p>
                <p className="text-sm text-tech-muted">{event.date} | {event.venue}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-tech-line bg-tech-card p-6">
          <h2 className="font-dot text-2xl">Documents</h2>
          <ul className="mt-4 space-y-3">
            {documents.map((doc) => (
              <li key={doc.id} className="rounded-xl border border-tech-line p-3">
                <p className="font-dot">{doc.name}</p>
                <a href={doc.link} target="_blank" rel="noreferrer" className="text-sm text-tech-muted underline">
                  Open {doc.type}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
