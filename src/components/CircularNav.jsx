import { motion } from 'framer-motion'
import './CircularNav.css'

export default function CircularNav({ phases, activePhase, onPhaseClick }) {
  const size = 360
  const cx = size / 2
  const cy = size / 2
  const r = 130

  return (
    <div className="circular-nav-container depth-3d">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="circular-nav-svg"
      >
        {/* Glow behind active */}
        {phases.map((phase, i) => {
           if (activePhase !== i) return null
           const angle = (i * 360) / phases.length - 90
           const rad = (angle * Math.PI) / 180
           const gpx = cx + r * Math.cos(rad)
           const gpy = cy + r * Math.sin(rad)
           return (
             <motion.circle
               key={`glow-${i}`}
               cx={gpx}
               cy={gpy}
               r="35"
               fill={phase.primary}
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 0.4, scale: 1.4 }}
               style={{ filter: 'blur(20px)' }}
             />
           )
        })}

        {/* Center */}
        <circle cx={cx} cy={cy} r={r * 0.35} className="cn-inner-disc glass" />
        <text x={cx} y={cy - 5} textAnchor="middle" className="cn-center-text" style={{ fontSize: '10px' }}>10-PHASE</text>
        <text x={cx} y={cy + 15} textAnchor="middle" className="cn-center-text" style={{ fontSize: '14px', fontWeight: 900 }}>DTIM</text>

        {/* Arcs */}
        {phases.map((phase, i) => {
          const nextI = (i + 1) % phases.length
          const angleStart = (i * 360) / phases.length - 85
          const angleEnd = (nextI * 360) / phases.length - 95
          const toRad = a => (a * Math.PI) / 180
          const x1 = cx + r * Math.cos(toRad(angleStart))
          const y1 = cy + r * Math.sin(toRad(angleStart))
          const x2 = cx + r * Math.cos(toRad(angleEnd))
          const y2 = cy + r * Math.sin(toRad(angleEnd))
          
          return (
            <motion.path
              key={`arc-${i}`}
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={phase.primary}
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.15"
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
            <g 
              key={`node-${i}`} 
              className="cn-node-group" 
              onClick={() => onPhaseClick(i)}
              style={{ cursor: 'pointer' }}
            >
              <motion.circle
                cx={npx}
                cy={npy}
                r={isActive ? 22 : 16}
                className={`cn-node-circle nm-flat ${isActive ? 'active' : ''}`}
                fill={isActive ? phase.primary : 'white'}
                stroke={isActive ? 'white' : phase.primary}
                strokeWidth={isActive ? 3 : 1}
                animate={{ scale: isActive ? 1.2 : 1 }}
                whileHover={{ scale: 1.3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <text
                x={npx}
                y={npy + 5}
                textAnchor="middle"
                className="cn-node-emoji"
                style={{ fontSize: isActive ? '16px' : '12px' }}
              >
                {phase.emoji}
              </text>

              <text
                x={cx + (r + 32) * Math.cos(rad)}
                y={cy + (r + 32) * Math.sin(rad) + 4}
                textAnchor="middle"
                className={`cn-label ${isActive ? 'active' : ''}`}
                style={{ fontSize: '7px', visibility: isActive ? 'visible' : 'hidden' }}
              >
                {phase.title?.toUpperCase()}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
