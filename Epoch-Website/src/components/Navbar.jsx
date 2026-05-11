import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function IconHome({ className }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 10.5V20h13V10.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconCalendar({ className }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="16" rx="2" />
      <path d="M8 4v4M16 4v4M4 11h16" strokeLinecap="round" />
    </svg>
  )
}

function IconPhotos({ className }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="m21 15-4.5-4.5L7 20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconUsers({ className }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="9" cy="7.5" r="3" />
      <path d="M4 19.5v-1c0-2 3-3.25 5-3.25s5 1.25 5 3.25v1" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.25" />
      <path d="M17 17.5h4v-.5c0-1.2-2-2-3.5-2.1" strokeLinecap="round" />
    </svg>
  )
}

function IconFaq({ className }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 17.25v-.01M9.75 9.75a3.25 3.25 0 016.15 1.53c0 2.06-3.15 2.22-3.15 4.22" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMail({ className }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4.75 7.75h14.5v10.5H4.75V7.75Z" strokeLinejoin="round" />
      <path d="m5 8.75 7 5.25 7-5.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconKey({ className }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="8.5" cy="15.5" r="3.75" />
      <path d="M15.75 9.75 12.25 12.25 11 11 12.25 9.75l3.75-3.75a1.5 1.5 0 012.82.98v.74l-2 2M11 17.25l2.25-.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NavIconButton({ label, children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`nav-dock-btn relative flex h-12 min-h-[44px] w-12 min-w-[44px] shrink-0 items-center justify-center rounded-full transition-[color,background,box-shadow,transform] duration-300 md:h-12 md:w-12 ${
        active
          ? 'bg-tech-bg text-tech-magenta shadow-[0_0_0_1px_rgba(232,90,207,0.35),0_8px_28px_rgba(94,217,243,0.12)]'
          : 'text-tech-muted hover:bg-tech-bg/85 hover:text-tech-text'
      }`}
    >
      {active ? <span className="nav-dock-glow pointer-events-none absolute inset-0 rounded-full opacity-60" aria-hidden /> : null}
      {children}
    </button>
  )
}

function Navbar({ onLoginClick, activePath }) {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHome = () => {
    navigate('/')
  }

  const goToSection = (id) => {
    navigate('/')
    requestAnimationFrame(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  const path = typeof activePath === 'string' ? activePath : '/'

  return (
    <header className="pointer-events-none fixed inset-x-0 z-[60] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-2 max-[380px]:px-2 bottom-0">
      <nav
        className={`nav-dock pointer-events-auto flex max-w-[min(92vw,640px)] items-center gap-0.5 overflow-x-auto rounded-full border px-2 py-1.5 shadow-[0_12px_48px_rgba(17,17,17,0.1)] backdrop-blur-xl transition-[background,border-color,box-shadow] duration-500 md:gap-1 md:px-3 ${
          scrolled
            ? 'border-tech-line/90 bg-tech-text/[0.14] shadow-[0_16px_60px_rgba(17,17,17,0.14)]'
            : 'border-tech-line/70 bg-tech-card/55'
        }`}
        style={{ scrollbarWidth: 'none' }}
      >
        <NavIconButton label="Home" onClick={goHome} active={path === '/'}>
          <IconHome className="h-[22px] w-[22px]" />
        </NavIconButton>
        <NavIconButton label="Events" onClick={() => goToSection('events')} active={false}>
          <IconCalendar className="h-[22px] w-[22px]" />
        </NavIconButton>
        <NavIconButton label="Gallery" onClick={() => goToSection('gallery')} active={false}>
          <IconPhotos className="h-[22px] w-[22px]" />
        </NavIconButton>
        <NavIconButton label="Members" onClick={() => goToSection('members')} active={false}>
          <IconUsers className="h-[22px] w-[22px]" />
        </NavIconButton>
        <NavIconButton label="FAQ" onClick={() => goToSection('faq')} active={false}>
          <IconFaq className="h-[22px] w-[22px]" />
        </NavIconButton>
        <NavIconButton label="Contact" onClick={() => goToSection('contact')} active={false}>
          <IconMail className="h-[22px] w-[22px]" />
        </NavIconButton>
        <span className="mx-1 h-6 w-px shrink-0 bg-tech-line/80" aria-hidden />
        <NavIconButton label="Login" onClick={onLoginClick} active={path === '/login'}>
          <IconKey className="h-[22px] w-[22px]" />
        </NavIconButton>
      </nav>
    </header>
  )
}

export default Navbar
