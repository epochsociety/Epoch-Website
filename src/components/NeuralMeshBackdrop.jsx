/** Subtle neural-style SVG layer; pointer-events none; low opacity for readability */
export default function NeuralMeshBackdrop() {
  return (
    <div className="neural-mesh-wrap" aria-hidden>
      <svg className="neural-mesh-svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="nmStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(94,217,243,0.35)" />
            <stop offset="50%" stopColor="rgba(232,90,207,0.28)" />
            <stop offset="100%" stopColor="rgba(183,132,227,0.32)" />
          </linearGradient>
        </defs>
        <g className="neural-mesh-lines" stroke="url(#nmStroke)" strokeWidth="0.55" fill="none" strokeLinecap="round">
          <path d="M40,120 L120,80 L200,140 L280,100 L360,160" />
          <path d="M60,220 L140,180 L220,240 L300,200 L380,260" />
          <path d="M80,300 L160,260 L240,320 L320,280" />
          <path d="M120,80 L140,180 L160,260" />
          <path d="M200,140 L220,240 L240,320" />
          <path d="M280,100 L300,200 L320,280" />
        </g>
        <g className="neural-mesh-nodes" fill="rgba(232,90,207,0.45)">
          <circle className="neural-node" cx="120" cy="80" r="2.2" />
          <circle className="neural-node neural-node--delay" cx="200" cy="140" r="2" />
          <circle className="neural-node neural-node--delay2" cx="280" cy="100" r="2.2" />
          <circle className="neural-node" cx="140" cy="180" r="1.8" />
          <circle className="neural-node neural-node--delay" cx="220" cy="240" r="2" />
          <circle className="neural-node" cx="300" cy="200" r="1.8" />
          <circle className="neural-node neural-node--delay2" cx="160" cy="260" r="2" />
        </g>
      </svg>
    </div>
  )
}
