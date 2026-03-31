import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
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
    }, 900)
    return () => clearInterval(interval)
  }, [])

  const progress = ((completedPhases.length) / PHASES.length) * 100

  return (
    <div className="proc-page">
      <div className="proc-bg">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.name}
            className="proc-orb"
            style={{ '--orb-color': p.color }}
            animate={{
              scale: currentPhase === i ? [1, 1.3, 1] : 1,
              opacity: currentPhase === i ? [0.4, 0.7, 0.4] : 0.15,
            }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="proc-container">
        {/* Logo */}
        <div className="proc-logo">
          <span className="logo-icon">◎</span>
          <span className="logo-text">ThinkLens</span>
        </div>

        {/* Central Animation */}
        <div className="proc-visual">
          {/* Outer rotating ring */}
          <div className="proc-ring proc-ring-outer">
            {PHASES.map((phase, i) => {
              const angle = (i * 360) / PHASES.length
              const rad = (angle * Math.PI) / 180
              const r = 47
              const x = 50 + r * Math.cos(rad - Math.PI / 2)
              const y = 50 + r * Math.sin(rad - Math.PI / 2)
              const isCompleted = completedPhases.includes(i)
              const isActive = currentPhase === i
              return (
                <motion.div
                  key={phase.name}
                  className={`proc-phase-dot ${isCompleted ? 'proc-dot-done' : ''} ${isActive ? 'proc-dot-active' : ''}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    '--dot-color': phase.color,
                  }}
                  animate={isActive ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                >
                  {isCompleted ? '✓' : phase.emoji}
                </motion.div>
              )
            })}
          </div>

          {/* Center */}
          <div className="proc-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                className="proc-phase-display"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="proc-phase-emoji" style={{ background: PHASES[currentPhase].color }}>
                  {PHASES[currentPhase].emoji}
                </div>
                <div className="proc-phase-name">{PHASES[currentPhase].name}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Product Name */}
        <div className="proc-product-name">
          Analyzing <strong>{productName || 'your product'}</strong>
        </div>

        {/* Current message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            className="proc-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {PHASES[currentPhase].message}
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="proc-progress-wrap">
          <div className="proc-progress-bar">
            <motion.div
              className="proc-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <span className="proc-progress-text">{Math.round(progress)}% complete</span>
        </div>

        {/* Phase Pills */}
        <div className="proc-phases-list">
          {PHASES.map((phase, i) => {
            const isCompleted = completedPhases.includes(i)
            const isActive = currentPhase === i
            return (
              <motion.div
                key={phase.name}
                className={`proc-phase-pill ${isCompleted ? 'pill-done' : ''} ${isActive ? 'pill-active' : ''}`}
                style={{ '--pill-color': phase.color }}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
              >
                <span className="pill-emoji">{isCompleted ? '✓' : phase.emoji}</span>
                <span className="pill-name">{phase.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
