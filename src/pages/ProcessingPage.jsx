import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ProcessingPage.css'

const PHASES = [
  { name: 'Problem Definition', emoji: '🎯', color: 'var(--p1-define)', message: 'Scoping deep market context and boundaries...' },
  { name: 'Research & Discovery', emoji: '🔍', color: 'var(--p2-research)', message: 'Auditing competitors and user ecosystem...' },
  { name: 'User Segmentation', emoji: '👥', color: 'var(--p3-segment)', message: 'Architecting detailed user personas...' },
  { name: 'Journey Mapping', emoji: '🗺️', color: 'var(--p4-journey)', message: 'Detailing micro-moments and friction points...' },
  { name: 'Ideation & Strategy', emoji: '💡', color: 'var(--p5-ideate)', message: 'Synthesizing feature ecosystems...' },
  { name: 'Wireframing', emoji: '🎨', color: 'var(--p6-wireframe)', message: 'Drafting visual blueprints and structures...' },
  { name: 'Tech Ecosystem', emoji: '⚙️', color: 'var(--p7-tech)', message: 'Designing infrastructure and tech stack...' },
  { name: 'Business Model', emoji: '💰', color: 'var(--p8-business)', message: 'Validation revenue and growth viability...' },
  { name: 'Testing & Validation', emoji: '🧪', color: 'var(--p9-test)', message: 'Auditing hypotheses and validation loops...' },
  { name: 'Final Refinement', emoji: '🚀', color: 'var(--p10-refine)', message: 'Finalizing 10-phase strategy report...' },
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
    }, 1000)
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
              scale: currentPhase === i ? [1, 1.5, 1] : 0.8,
              opacity: currentPhase === i ? 0.7 : 0.1,
              z: currentPhase === i ? 100 : 0
            }}
            transition={{ duration: 0.8, repeat: currentPhase === i ? Infinity : 0 }}
          />
        ))}
      </div>

      <div className="proc-container-immersive">
        {/* Logo */}
        <div className="proc-logo glass">
          <span className="logo-icon" style={{ color: PHASES[currentPhase].color }}>◎</span>
          <span className="logo-text">ThinkLens Pro</span>
        </div>

        {/* Central Visualization */}
        <div className="proc-visual-3d depth-3d">
          <div className="proc-center-glass glass">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                className="proc-phase-status"
                initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                <div className="status-emoji" style={{ background: PHASES[currentPhase].color }}>
                  {PHASES[currentPhase].emoji}
                </div>
                <div className="status-info">
                  <div className="status-label">PHASE {currentPhase + 1} OF 10</div>
                  <div className="status-name">{PHASES[currentPhase].name}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="proc-orbit-rings">
             <div className="orbit-ring ring-1" style={{ borderColor: PHASES[currentPhase].color }}></div>
             <div className="orbit-ring ring-2"></div>
          </div>
        </div>

        {/* Context Info */}
        <div className="proc-info-card glass">
          <div className="proc-product-badge nm-thin">
            STRATEGY ENGINE: {productName?.toUpperCase() || 'NEW ANALYSIS'}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhase}
              className="proc-message-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {PHASES[currentPhase].message}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Immersive Progress */}
        <div className="proc-progress-immersive">
          <div className="progress-stats">
            <span style={{ color: PHASES[currentPhase].color, fontWeight: 900 }}>{PHASES[currentPhase].name.toUpperCase()}</span>
            <span style={{ opacity: 0.6 }}>{Math.round(progress)}% COMPLETE</span>
          </div>
          <div className="progress-track-3d nm-thin">
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
