function LoaderScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05060a]">
      <div className="w-[min(560px,88%)] text-center">
        <p className="text-xs tracking-[0.32em] text-tech-muted">EPOCH SOCIETY / Loading</p>
        <h2 className="mt-4 font-dot text-4xl md:text-6xl">2026</h2>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full border border-tech-line bg-tech-card">
          <div className="loader-fill h-full w-1/2 rounded-full bg-gradient-to-r from-tech-accent to-tech-pink" />
        </div>
        <p className="mt-4 text-sm text-tech-muted">Loading experience... Scroll down after intro</p>
      </div>
    </div>
  )
}

export default LoaderScreen
