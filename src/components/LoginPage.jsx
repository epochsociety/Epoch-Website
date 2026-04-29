import { useState } from 'react'

function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ email })
  }

  return (
    <section className="mx-auto mt-10 w-[min(560px,94%)] rounded-3xl border border-tech-line bg-tech-card p-7">
      <p className="font-dot text-xs tracking-[0.28em] text-tech-muted">Login</p>
      <h1 className="mt-2 font-dot text-4xl">Member Access</h1>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="College email"
          className="rounded-xl border border-tech-line bg-black/30 px-4 py-3 outline-none focus:border-tech-accent"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="rounded-xl border border-tech-line bg-black/30 px-4 py-3 outline-none focus:border-tech-accent"
        />
        <button type="submit" className="rounded-xl bg-white py-3 font-semibold text-black">
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
