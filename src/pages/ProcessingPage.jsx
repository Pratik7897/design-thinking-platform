import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ProcessingPage.css'

const PHASES = [
  { name: 'Empathize', emoji: '🤝', color: '#FFD966', message: 'Mapping user emotions and pain points...' },
  { name: 'Define', emoji: '🎯', color: '#FF9B85', message: 'Synthesizing insights into problem statements...' },
  { name: 'Ideate', emoji: '💡', color: '#E975BA', message: 'Generating creative solutions and ideas...' },
  { name: 'Prototype', emoji: '🛠️', color: '#5B7FB0', message: 'Building your prototype and go-to-market plan...' },
  { name: 'Test', emoji: '✓', color: '#4DBFB5', message: 'Creating validation and testing frameworks...' },
  { name: 'Refine', emoji: '🔄', color: '#A8B5C4', message: 'Defining iteration priorities and growth strategy...' },
]

export default function ProcessingPage({ productName }) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [completedPhases, setCompletedPhases] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev < PHASES.length - 1) {
          setCompletedPhases(cp => [...cp, prev])
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  const progress = ((completedPhases.length) / PHASES.length) * 100

  return (
    <div className="proc-page nm-bg">
      <div className="proc-bg-3d">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.name}
            className="proc-orb-3d"
            style={{ '--orb-color': p.color }}
            animate={{
              scale: currentPhase === i ? [1, 1.4, 1] : 0.8,
              opacity: currentPhase === i ? 0.6 : 0.1,
              z: currentPhase === i ? 50 : 0
            }}
            transition={{ duration: 1.2, repeat: currentPhase === i ? Infinity : 0 }}
          />
        ))}
      </div>

      <div className="proc-container-immersive">
        {/* Logo */}
        <div className="proc-logo glass">
          <span className="logo-icon">◎</span>
          <span className="logo-text">ThinkLens 3D</span>
        </div>

        {/* Central Visualization */}
        <div className="proc-visual-3d depth-3d">
          <div className="proc-center-glass glass">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                className="proc-phase-status"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="status-emoji nm-inset" style={{ color: PHASES[currentPhase].color }}>
                  {PHASES[currentPhase].emoji}
                </div>
                <div className="status-info">
                  <div className="status-label">CURRENT PHASE</div>
                  <div className="status-name">{PHASES[currentPhase].name}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="proc-orbit-rings">
             <div className="orbit-ring ring-1"></div>
             <div className="orbit-ring ring-2"></div>
          </div>
        </div>

        {/* Context Info */}
        <div className="proc-info-card glass">
          <div className="proc-product-badge nm-inset">
            ANALYZING: {productName || 'UNNAMED PRODUCT'}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhase}
              className="proc-message-text"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {PHASES[currentPhase].message}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Immersive Progress */}
        <div className="proc-progress-immersive">
          <div className="progress-stats">
            <span>{PHASES[currentPhase].name}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-track-3d nm-inset">
            <motion.div
              className="progress-fill-3d"
              style={{ background: PHASES[currentPhase].color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
