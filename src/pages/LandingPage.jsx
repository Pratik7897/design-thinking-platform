import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './LandingPage.css'

const PHASES = [
  { name: 'Problem Definition', emoji: '🎯', color: '#6366F1', description: 'Deep context scoping' },
  { name: 'Research & Discovery', emoji: '🔍', color: '#3B82F6', description: 'Market & user audit' },
  { name: 'User Segmentation', emoji: '👥', color: '#06B6D4', description: 'Audience architecting' },
  { name: 'Journey Mapping', emoji: '🗺️', color: '#10B981', description: 'Experience detailing' },
  { name: 'Ideation & Strategy', emoji: '💡', color: '#F59E0B', description: 'Feature ecosystem' },
  { name: 'Wireframing', emoji: '🎨', color: '#EF4444', description: 'Visual blueprinting' },
  { name: 'Tech Ecosystem', emoji: '⚙️', color: '#8B5CF6', description: 'Infrastructure design' },
  { name: 'Business Model', emoji: '💰', color: '#EC4899', description: 'Revenue & viability' },
  { name: 'Testing & Validation', emoji: '🧪', color: '#14B8A6', description: 'Hypothesis audit' },
  { name: 'Final Refinement', emoji: '🚀', color: '#4338CA', description: 'Ready for market' },
]

const BENEFITS = [
  { icon: '🤖', title: 'Gemini 1.5 Analysis', description: 'Powered by advanced reasoning to generate deep, multi-phase strategic reports' },
  { icon: '📐', title: '11-Step Deep Flow', description: 'Collect comprehensive product context through a guided architectural stepper' },
  { icon: '💎', title: '3D Glassmorphism', description: 'A futuristic interface with neumorphic depth and smooth micro-interactions' },
  { icon: '📄', title: 'PDF Export Engine', description: 'Generate professional, multi-page strategy documents ready for presentation' },
]

export default function LandingPage({ onStart }) {
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase(prev => (prev + 1) % PHASES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="landing nm-bg">
      {/* Nav */}
      <nav className="landing-nav glass">
        <div className="container">
          <div className="nav-inner">
            <div className="nav-logo">
              <span className="logo-icon" style={{ color: '#2563EB' }}>◎</span>
              <span className="logo-text">ThinkLens Pro</span>
            </div>
            <button className="dash-btn nm-flat" onClick={onStart}>
              Launch Analyzer ↗
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-badge nm-inset">
                <span className="badge-dot" style={{ background: '#2563EB' }}></span>
                10-Phase Design Modernization (DTIM-10)
              </div>
              <h1 className="hero-title">
                Architectural<br />
                <span className="hero-title-gradient">Product Strategy</span>
              </h1>
              <p className="hero-subtitle">
                Experience the next evolution of Design Thinking. Transform your vision into a comprehensive 10-phase strategic roadmap with our AI-powered 3D engine.
              </p>
              <div className="hero-actions">
                <button className="dash-big-btn nm-flat" onClick={onStart}>
                  Analyze New Project
                </button>
                <div className="hero-stats-mini">
                  <div className="stat-item"><strong>10</strong> Phases</div>
                  <div className="stat-item"><strong>11</strong> Steps</div>
                  <div className="stat-item"><strong>3D</strong> Depth</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual depth-3d"
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="hero-card-stack">
                {PHASES.map((phase, i) => {
                  const isActive = activePhase === i
                  const isVisible = Math.abs(i - activePhase) < 3 || (activePhase > PHASES.length - 3 && i < 2)
                  if (!isVisible && !isActive) return null

                  return (
                    <motion.div
                       key={phase.name}
                       className={`hero-card-layered glass ${isActive ? 'active' : ''}`}
                       style={{ 
                         zIndex: isActive ? 10 : 1,
                         '--phase-color': phase.color 
                       }}
                       animate={{ 
                         x: isActive ? 0 : (i - activePhase) * 20,
                         y: isActive ? 0 : (i - activePhase) * 15,
                         scale: isActive ? 1.1 : 0.8,
                         opacity: isActive ? 1 : 0.2,
                         rotateZ: isActive ? 0 : (i - activePhase) * 5
                       }}
                       transition={{ duration: 0.8, type: 'spring' }}
                    >
                       <div className="layered-header">
                         <div className="layered-icon-circle" style={{ background: phase.color }}>{phase.emoji}</div>
                         <span className="layered-name">{phase.name}</span>
                       </div>
                       <div className="layered-desc">{phase.description}</div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="benefits-3d">
        <div className="container">
          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                className="benefit-card glass depth-3d"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ rotateX: 5, rotateY: -5, y: -10 }}
              >
                <div className="benefit-icon nm-inset">{b.icon}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer glass">
        <div className="container">
          <div className="footer-inner">
            <div className="nav-logo">
              <span className="logo-icon" style={{ color: '#2563EB' }}>◎</span>
              <span className="logo-text">ThinkLens Pro</span>
            </div>
            <p className="footer-copy">© 2026 ThinkLens AI · The Standard for Product Innovation</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
