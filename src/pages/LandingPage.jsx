import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './LandingPage.css'

const PHASES = [
  { name: 'Empathize', emoji: '🤝', color: '#FFD966', description: 'Understand users deeply' },
  { name: 'Define', emoji: '🎯', color: '#FF9B85', description: 'Clarify the problem' },
  { name: 'Ideate', emoji: '💡', color: '#E975BA', description: 'Generate bold ideas' },
  { name: 'Prototype', emoji: '🛠️', color: '#5B7FB0', description: 'Build & validate' },
  { name: 'Test', emoji: '✓', color: '#4DBFB5', description: 'Validate assumptions' },
  { name: 'Refine', emoji: '🔄', color: '#A8B5C4', description: 'Iterate & improve' },
]

const BENEFITS = [
  { icon: '⚡', title: 'AI-Powered Analysis', description: 'Instantly generate comprehensive insights based on proven Design Thinking methodology' },
  { icon: '🎨', title: 'Beautiful Reports', description: 'Receive stunning, visual reports that make your analysis easy to share and understand' },
  { icon: '🚀', title: 'Actionable Insights', description: 'Every phase ends with concrete next steps, not just abstract ideas' },
  { icon: '📊', title: 'Data-Driven', description: 'KPIs, metrics, and validation frameworks grounded in real-world experience' },
]

export default function LandingPage({ onStart }) {
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase(prev => (prev + 1) % PHASES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="landing nm-bg">
      {/* Nav */}
      <nav className="landing-nav glass">
        <div className="container">
          <div className="nav-inner">
            <div className="nav-logo">
              <span className="logo-icon">◎</span>
              <span className="logo-text">ThinkLens</span>
            </div>
            <button className="dash-btn nm-flat" onClick={onStart}>
              Start Exploration ↗
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
                <span className="badge-dot"></span>
                Next-Gen Design Strategy
              </div>
              <h1 className="hero-title">
                Immersive<br />
                <span className="hero-title-gradient">3D Design Thinking</span>
              </h1>
              <p className="hero-subtitle">
                Experience your product's journey through a high-fidelity, AI-powered 3D lens. From empathy to refinement, we guide you through a premium architectural analysis.
              </p>
              <div className="hero-actions">
                <button className="dash-big-btn nm-flat" onClick={onStart}>
                  Analyze New Product
                </button>
                <div className="hero-stats-mini">
                  <div className="stat-item"><strong>6</strong> Phases</div>
                  <div className="stat-item"><strong>3D</strong> Results</div>
                  <div className="stat-item"><strong>Free</strong> Always</div>
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
                  return (
                    <motion.div
                       key={phase.name}
                       className={`hero-card-layered glass ${isActive ? 'active' : ''}`}
                       style={{ 
                         zIndex: isActive ? 10 : 1,
                         '--phase-color': phase.color 
                       }}
                       animate={{ 
                         x: isActive ? 0 : (i - activePhase) * 15,
                         y: isActive ? 0 : (i - activePhase) * 10,
                         scale: isActive ? 1 : 0.9,
                         opacity: isActive ? 1 : 0.3,
                         rotateZ: isActive ? 0 : (i - activePhase) * 2
                       }}
                       transition={{ duration: 0.8, type: 'spring' }}
                    >
                       <div className="layered-header">
                         <span className="layered-emoji">{phase.emoji}</span>
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
              <span className="logo-icon">◎</span>
              <span className="logo-text">ThinkLens 3D</span>
            </div>
            <p className="footer-copy">© 2026 ThinkLens · Built for the Future of Design</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
