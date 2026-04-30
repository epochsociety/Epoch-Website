import { useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import DashboardPage from './components/DashboardPage'
import EventsSection from './components/EventsSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import GallerySection from './components/GallerySection'
import HeroSection from './components/HeroSection'
import LoginPage from './components/LoginPage'
import LoaderScreen from './components/LoaderScreen'
import MembersSection from './components/MembersSection'
import Navbar from './components/Navbar'
import UpcomingEventSection from './components/UpcomingEventSection'
import { useGsapEffects } from './hooks/useGsapEffects'

function HomePage({ onLoginClick }) {
  const scopeRef = useRef(null)
  const [notice, setNotice] = useState('')
  useGsapEffects(scopeRef)

  return (
    <main ref={scopeRef} className="mx-auto mt-6 w-[min(1160px,94%)] pb-14">
      {notice && (
        <div className="mb-4 rounded-xl bg-white/10 px-4 py-3 font-clean text-sm text-tech-text">
          {notice}
        </div>
      )}
      <HeroSection
        onJoin={() => {
          setNotice('Requirements are closed.')
          window.setTimeout(() => setNotice(''), 2600)
        }}
      />
      <EventsSection />
      <GallerySection />
      <MembersSection />
      <UpcomingEventSection />
      <FaqSection />
      <Footer />
      <div className="mt-6">
        <button
          type="button"
          onClick={onLoginClick}
          className="rounded-full border border-tech-line px-5 py-2 text-sm text-tech-muted hover:text-white"
        >
          Open Login
        </button>
      </div>
    </main>
  )
}

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      return undefined
    }

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2300)

    return () => clearTimeout(timeout)
  }, [isLoading])

  const handleLogin = (profile) => {
    setUser(profile)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <div className="pb-10 font-dot">
      {isLoading && <LoaderScreen />}
      <div
        id="gridOverlay"
        className="pointer-events-none fixed inset-0 z-0 opacity-100"
        style={{
          backgroundImage: "url('/bg-grid.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '360px 360px',
        }}
      />
      <Navbar onLoginClick={() => navigate('/login')} />
      <Routes>
        <Route path="/" element={<HomePage onLoginClick={() => navigate('/login')} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} onBack={() => navigate('/')} />} />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  )
}

export default App
