import { useState } from 'react'

function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ email })
  }

  return (
    <section className="mx-auto mt-10 w-[min(560px,min(94%,100vw-1.5rem))] max-w-full rounded-3xl border border-tech-line bg-tech-card p-5 sm:p-7 pb-[max(1.75rem,calc(1.75rem+env(safe-area-inset-bottom,0px)))]">
      <p className="font-dot text-xs tracking-[0.28em] text-tech-muted">Login</p>
      <h1 className="mt-2 font-dot text-4xl">Member Access</h1>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="College email"
          className="rounded-xl border border-tech-line bg-tech-bg/70 px-4 py-3 text-base text-tech-text outline-none placeholder:text-tech-muted focus:border-tech-accent md:text-sm"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="rounded-xl border border-tech-line bg-tech-bg/70 px-4 py-3 text-base text-tech-text outline-none placeholder:text-tech-muted focus:border-tech-accent md:text-sm"
        />
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-tech-pink to-tech-purple py-3 font-semibold text-white shadow-[0_16px_50px_rgba(232,90,207,0.22)]"
        >
          Login
        </button>
      </form>
      <button type="button" onClick={onBack} className="mt-4 text-sm text-tech-muted underline">
        Back to Home
      </button>
    </section>
  )
}

export default LoginPage
