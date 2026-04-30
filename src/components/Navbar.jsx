import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ onLoginClick }) {
  const navigate = useNavigate()
  const [openDesktop, setOpenDesktop] = useState(false)
  const [openMobile, setOpenMobile] = useState(false)

  const goHome = () => {
    navigate('/')
    setOpenDesktop(false)
    setOpenMobile(false)
  }

  const goToSection = (id) => {
    navigate('/')
    requestAnimationFrame(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
    setOpenDesktop(false)
    setOpenMobile(false)
  }

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 flex w-[min(1160px,94%)] items-center justify-between rounded-full bg-black/30 px-5 py-3 backdrop-blur">
      <div className="font-dot text-lg tracking-wider">EPOCH BMSIT&M</div>
      <nav className="hidden gap-5 text-sm text-tech-muted md:flex">
        <button type="button" onClick={goHome} className="hover:text-white">
          Home
        </button>
        <button type="button" onClick={() => goToSection('events')} className="hover:text-white">
          Events
        </button>
        <button type="button" onClick={() => goToSection('faq')} className="hover:text-white">
          FAQ
        </button>
        <button type="button" onClick={() => goToSection('contact')} className="hover:text-white">
          Contact Us
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDesktop((value) => !value)}
            className="rounded-full bg-white/5 px-3 py-1 hover:text-white"
          >
            More
          </button>
          {openDesktop && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-tech-card/90 p-2 shadow-2xl backdrop-blur">
              <button
                type="button"
                onClick={() => goToSection('gallery')}
                className="block w-full rounded-md px-3 py-2 text-left hover:bg-white/5"
              >
                Gallery
              </button>
              <button
                type="button"
                onClick={() => goToSection('members')}
                className="block w-full rounded-md px-3 py-2 text-left hover:bg-white/5"
              >
                Members
              </button>
              <button
                type="button"
                onClick={onLoginClick}
                className="mt-1 w-full rounded-md px-3 py-2 text-left hover:bg-white/5"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setOpenMobile((value) => !value)}
          className="rounded-full bg-white/5 px-4 py-2 text-sm text-tech-muted hover:text-white"
        >
          More
        </button>
        {openMobile && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-tech-card/90 p-2 shadow-2xl backdrop-blur">
            <button type="button" onClick={goHome} className="block w-full rounded-md px-3 py-2 text-left hover:bg-white/5">
              Home
            </button>
            <button
              type="button"
              onClick={() => goToSection('events')}
              className="block w-full rounded-md px-3 py-2 text-left hover:bg-white/5"
            >
              Events
            </button>
            <button
              type="button"
              onClick={() => goToSection('faq')}
              className="block w-full rounded-md px-3 py-2 text-left hover:bg-white/5"
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => goToSection('contact')}
              className="block w-full rounded-md px-3 py-2 text-left hover:bg-white/5"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={onLoginClick}
              className="mt-1 block w-full rounded-md px-3 py-2 text-left hover:bg-white/5"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
