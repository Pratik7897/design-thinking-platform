import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './LandingPage.css'

const PHASES = [
  { name: 'Empathize', emoji: '🤝', color: '#FFD966', angle: -60, description: 'Understand users deeply' },
  { name: 'Define', emoji: '🎯', color: '#FF9B85', angle: 0, description: 'Clarify the problem' },
  { name: 'Ideate', emoji: '💡', color: '#E975BA', angle: 60, description: 'Generate bold ideas' },
  { name: 'Prototype', emoji: '🛠️', color: '#5B7FB0', angle: 120, description: 'Build & validate' },
  { name: 'Test', emoji: '✓', color: '#4DBFB5', angle: 180, description: 'Validate assumptions' },
  { name: 'Refine', emoji: '🔄', color: '#A8B5C4', angle: 240, description: 'Iterate & improve' },
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
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="container">
          <div className="nav-inner">
            <div className="nav-logo">
              <span className="logo-icon">◎</span>
              <span className="logo-text">ThinkLens</span>
            </div>
            <button className="btn btn-primary nav-cta" onClick={onStart}>
              Start Analysis ↗
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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Design Thinking Framework · 6 Phases
              </div>
              <h1 className="hero-title">
                Analyze Your Product<br />
                <span className="hero-title-gradient">Like a Design Thinker</span>
              </h1>
              <p className="hero-subtitle">
                Submit your product and get a comprehensive, AI-powered analysis through all 6 phases of Design Thinking — from empathy mapping to refinement strategy.
              </p>
              <div className="hero-actions">
                <button className="btn-hero-primary" onClick={onStart}>
                  <span>Analyze My Product</span>
                  <span className="btn-arrow">→</span>
                </button>
                <span className="hero-note">No account required · Takes 2 minutes</span>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">6</span>
                  <span className="stat-label">Analysis Phases</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Insights Generated</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Actionable</span>
                </div>
              </div>
            </motion.div>

            {/* Circular Diagram */}
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="circular-diagram">
                <div className="diagram-center">
                  <div className="center-text">DESIGN</div>
                  <div className="center-text center-text-2">THINKING</div>
                  <div className="center-subtext">Analyze Your Product</div>
                </div>
                {PHASES.map((phase, i) => {
                  const angle = (i * 360) / PHASES.length - 90
                  const rad = (angle * Math.PI) / 180
                  const r = 140
                  const x = 50 + (r / 2) * Math.cos(rad)
                  const y = 50 + (r / 2) * Math.sin(rad)
                  const isActive = activePhase === i
                  return (
                    <motion.div
                      key={phase.name}
                      className={`phase-node ${isActive ? 'phase-node--active' : ''}`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        '--phase-color': phase.color,
                      }}
                      animate={isActive ? { scale: 1.2, zIndex: 10 } : { scale: 1, zIndex: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="phase-node-icon">{phase.emoji}</div>
                      <div className="phase-node-label">{phase.name}</div>
                    </motion.div>
                  )
                })}
                {/* Connecting Arcs */}
                <svg className="diagram-svg" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="35" stroke="rgba(26,26,46,0.08)" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="50" r="18" fill="rgba(255,255,255,0.9)" />
                  {PHASES.map((phase, i) => {
                    const isActive = activePhase === i
                    const angle = (i * 360) / PHASES.length - 90
                    const nextAngle = ((i + 1) * 360) / PHASES.length - 90
                    const r = 35
                    const x1 = 50 + r * Math.cos((angle * Math.PI) / 180)
                    const y1 = 50 + r * Math.sin((angle * Math.PI) / 180)
                    const x2 = 50 + r * Math.cos((nextAngle * Math.PI) / 180)
                    const y2 = 50 + r * Math.sin((nextAngle * Math.PI) / 180)
                    return (
                      <motion.path
                        key={i}
                        d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                        stroke={phase.color}
                        strokeWidth={isActive ? "1.5" : "1"}
                        strokeLinecap="round"
                        fill="none"
                        opacity={isActive ? 1 : 0.5}
                        animate={{ opacity: isActive ? 1 : 0.4 }}
                        transition={{ duration: 0.3 }}
                      />
                    )
                  })}
                </svg>
              </div>

              {/* Phase being highlighted */}
              <motion.div
                className="active-phase-card"
                key={activePhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ '--phase-color': PHASES[activePhase].color }}
              >
                <span className="apc-emoji">{PHASES[activePhase].emoji}</span>
                <div>
                  <div className="apc-name">{PHASES[activePhase].name}</div>
                  <div className="apc-desc">{PHASES[activePhase].description}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Everything you need to validate your product
          </motion.h2>
          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                className="benefit-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(26,26,46,0.15)' }}
              >
                <div className="benefit-icon">{b.icon}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases Preview */}
      <section className="phases-preview">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            A complete Design Thinking journey
          </motion.h2>
          <div className="phases-list">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.name}
                className="phase-preview-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ '--phase-color': phase.color }}
              >
                <div className="phase-preview-number">0{i + 1}</div>
                <div className="phase-preview-dot" style={{ background: phase.color }}></div>
                <div className="phase-preview-info">
                  <span className="phase-preview-emoji">{phase.emoji}</span>
                  <span className="phase-preview-name">{phase.name}</span>
                </div>
                <div className="phase-preview-desc">{phase.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">Ready to think differently?</h2>
            <p className="cta-subtitle">Get your product's complete Design Thinking analysis in minutes.</p>
            <button className="btn-hero-primary" onClick={onStart}>
              <span>Start Free Analysis</span>
              <span className="btn-arrow">→</span>
            </button>
          </motion.div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-inner">
            <div className="nav-logo">
              <span className="logo-icon">◎</span>
              <span className="logo-text">ThinkLens</span>
            </div>
            <p className="footer-copy">© 2026 ThinkLens · Design Thinking Analysis Platform</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
