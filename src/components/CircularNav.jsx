import { motion } from 'framer-motion'
import './CircularNav.css'

const PHASE_LABELS = ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test', 'Refine']
const PHASE_EMOJIS = ['🤝', '🎯', '💡', '🛠️', '✓', '🔄']

export default function CircularNav({ phases, activePhase, onPhaseClick }) {
  const size = 300
  const cx = size / 2
  const cy = size / 2
  const r = 110

  return (
    <div className="circular-nav">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label="Design Thinking Phase Navigation"
        role="navigation"
      >
        {/* Background circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(26,26,46,0.05)" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={r * 0.55} fill="rgba(26,26,46,0.03)" />

        {/* Center Text */}
        <text x={cx} y={cy - 8} textAnchor="middle" className="cn-center-text">DESIGN</text>
        <text x={cx} y={cy + 10} textAnchor="middle" className="cn-center-text">THINKING</text>
        <text x={cx} y={cy + 26} textAnchor="middle" className="cn-center-subtext">Click a phase</text>

        {/* Connecting arcs between phases */}
        {phases.map((phase, i) => {
          const nextI = (i + 1) % phases.length
          const angleStart = (i * 360) / phases.length - 90
          const angleEnd = (nextI * 360) / phases.length - 90
          const toRad = a => (a * Math.PI) / 180
          const x1 = cx + r * Math.cos(toRad(angleStart))
          const y1 = cy + r * Math.sin(toRad(angleStart))
          const x2 = cx + r * Math.cos(toRad(angleEnd))
          const y2 = cy + r * Math.sin(toRad(angleEnd))
          const isActive = activePhase === i

          return (
            <motion.path
              key={`arc-${i}`}
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={phase.primary}
              strokeWidth={isActive ? 4 : 2}
              strokeLinecap="round"
              opacity={isActive ? 1 : 0.35}
              animate={{ opacity: isActive ? 1 : 0.35, strokeWidth: isActive ? 4 : 2 }}
              transition={{ duration: 0.3 }}
            />
          )
        })}

        {/* Phase nodes */}
        {phases.map((phase, i) => {
          const angle = (i * 360) / phases.length - 90
          const rad = (angle * Math.PI) / 180
          const npx = cx + r * Math.cos(rad)
          const npy = cy + r * Math.sin(rad)
          const isActive = activePhase === i

          return (
            <g key={`node-${i}`} style={{ cursor: 'pointer' }} onClick={() => onPhaseClick(isActive ? null : i)} role="button" tabIndex={0} aria-label={`Phase ${i + 1}: ${phase.title}`}>
              <motion.circle
                cx={npx}
                cy={npy}
                r={isActive ? 22 : 18}
                fill={phase.primary}
                stroke={isActive ? 'white' : 'rgba(255,255,255,0.6)'}
                strokeWidth={isActive ? 3 : 2}
                animate={{ r: isActive ? 22 : 18 }}
                transition={{ duration: 0.3 }}
                style={{ filter: isActive ? `drop-shadow(0 4px 8px ${phase.primary}80)` : 'none' }}
              />
              <text
                x={npx}
                y={npy + 5}
                textAnchor="middle"
                fontSize={isActive ? 14 : 12}
                className="cn-node-emoji"
              >
                {PHASE_EMOJIS[i]}
              </text>

              {/* Label outside the circle */}
              {(() => {
                const labelR = r + 28
                const lx = cx + labelR * Math.cos(rad)
                const ly = cy + labelR * Math.sin(rad)
                return (
                  <text
                    x={lx}
                    y={ly + 4}
                    textAnchor="middle"
                    className={`cn-phase-label ${isActive ? 'cn-phase-label--active' : ''}`}
                    fontSize={isActive ? 9 : 8}
                  >
                    {PHASE_LABELS[i]}
                  </text>
                )
              })()}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
