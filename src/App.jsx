import { useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import CinematicAmbient from './components/CinematicAmbient'
import MagneticButton from './components/MagneticButton'
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
    <main ref={scopeRef} className="mx-auto mt-6 w-[min(1160px,min(94%,100vw-1.5rem))] max-w-full pb-16 max-md:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-14">
      {notice && (
        <div className="mb-4 rounded-xl border border-tech-line bg-tech-card/70 px-4 py-3 font-clean text-sm text-tech-text">
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
        <MagneticButton>
          <button
            type="button"
            onClick={onLoginClick}
            className="btn-premium-ghost min-h-[44px] rounded-full border border-tech-line/90 bg-tech-bg/65 px-5 py-2.5 text-sm text-tech-muted shadow-sm backdrop-blur-sm hover:text-tech-magenta"
          >
            Open Login
          </button>
        </MagneticButton>
      </div>
    </main>
  )
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
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
    <div className="app-shell min-h-[100dvh] overflow-x-hidden pb-[calc(7rem+env(safe-area-inset-bottom,0px))] font-clean md:pb-32">
      {isLoading && <LoaderScreen />}
      <CinematicAmbient />
      <div
        id="gridOverlay"
        className="pointer-events-none fixed inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}bg-grid.svg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '360px 360px',
        }}
      />
      <div className="relative z-[2]">
        <Routes>
          <Route path="/" element={<HomePage onLoginClick={() => navigate('/login')} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} onBack={() => navigate('/')} />} />
          <Route
            path="/dashboard"
            element={user ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
      <Navbar activePath={location.pathname} onLoginClick={() => navigate('/login')} />
    </div>
  )
}

export default App
