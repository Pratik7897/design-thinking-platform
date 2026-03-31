import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import './PhaseCard.css'

function EmphasizeContent({ phase }) {
  return (
    <div className="phase-content">
      {/* Personas */}
      <div className="content-section">
        <h4 className="content-section-title">👥 User Personas</h4>
        <div className="personas-list">
          {(phase.personas || []).map((p, i) => (
            <div key={i} className="persona-card">
              <div className="persona-header">
                <span className="persona-avatar">{p.avatar}</span>
                <div>
                  <div className="persona-name">{p.name}</div>
                  <div className="persona-role">{p.role} · Age {p.age}</div>
                </div>
              </div>
              <p className="persona-desc">{p.description}</p>
              <div className="persona-split">
                <div>
                  <div className="persona-label">Goals</div>
                  {p.goals.map((g, j) => <div key={j} className="persona-item persona-item-goal">✓ {g}</div>)}
                </div>
                <div>
                  <div className="persona-label">Pain Points</div>
                  {p.pains.map((pain, j) => <div key={j} className="persona-item persona-item-pain">✗ {pain}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pain Points */}
      <div className="content-section">
        <h4 className="content-section-title">⚡ Pain Points</h4>
        <div className="pain-points-list">
          {(phase.painPoints || []).map((pp, i) => (
            <div key={i} className={`pain-point severity-${pp.severity.toLowerCase()}`}>
              <span className="severity-badge">{pp.severity}</span>
              <span className="pain-text">{pp.point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Empathy Map */}
      <div className="content-section">
        <h4 className="content-section-title">🗺️ Empathy Map</h4>
        <div className="empathy-map">
          {Object.entries(phase.empathyMap || {}).map(([key, values]) => (
            <div key={key} className="empathy-quadrant">
              <div className="eq-header">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              {values.map((v, i) => <div key={i} className="eq-item">"{v}"</div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DefineContent({ phase }) {
  return (
    <div className="phase-content">
      <div className="content-section">
        <h4 className="content-section-title">📌 Point of View Statement</h4>
        <div className="pov-box">
          <blockquote className="pov-quote">{phase.pov}</blockquote>
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">🤔 How Might We Questions</h4>
        <div className="hmw-list">
          {(phase.hmw || []).map((q, i) => (
            <div key={i} className="hmw-item">
              <span className="hmw-num">HMW {i + 1}</span>
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">📊 Success KPIs</h4>
        <div className="kpis-list">
          {(phase.kpis || []).map((kpi, i) => (
            <div key={i} className="kpi-item">
              <div className="kpi-type">{kpi.type}</div>
              <div className="kpi-metric">{kpi.metric}</div>
              <div className="kpi-target">{kpi.target}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">🎯 Value Proposition</h4>
        <div className="value-prop-box">
          <p>{phase.valueProposition}</p>
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">📈 Market Opportunity</h4>
        <div className="market-opp">
          {Object.entries(phase.marketOpportunity || {}).map(([key, val]) => (
            <div key={key} className="market-item">
              <span className="market-key">{key.toUpperCase()}</span>
              <span className="market-val">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function IdeateContent({ phase }) {
  const [showAll, setShowAll] = useState(false)
  const features = phase.features || []
  const shown = showAll ? features : features.slice(0, 6)

  return (
    <div className="phase-content">
      <div className="content-section">
        <h4 className="content-section-title">⚡ Feature Ideas</h4>
        <div className="features-grid">
          {shown.map((f, i) => (
            <div key={i} className={`feature-item priority-${f.priority.toLowerCase()}`}>
              <div className="feature-header">
                <span className="feature-name">{f.name}</span>
                <span className={`impact-badge impact-${f.impact.toLowerCase().replace(' ', '-')}`}>{f.impact}</span>
              </div>
              <p className="feature-desc">{f.description}</p>
              <div className="feature-meta">
                <span>Effort: {f.effort}</span>
                <span className={`priority-badge p-${f.priority.toLowerCase()}`}>{f.priority}</span>
              </div>
            </div>
          ))}
        </div>
        {features.length > 6 && (
          <button className="show-more-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? '⬆ Show Less' : `⬇ Show ${features.length - 6} More Features`}
          </button>
        )}
      </div>

      <div className="content-section">
        <h4 className="content-section-title">🧭 Strategic Directions</h4>
        <div className="strategies-list">
          {(phase.strategies || []).map((s, i) => (
            <div key={i} className="strategy-item">
              <div className="strategy-name">{s.approach}</div>
              <p className="strategy-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">⭐ Unique Selling Propositions</h4>
        <div className="usp-list">
          {(phase.usps || []).map((usp, i) => (
            <div key={i} className="usp-item">
              <span className="usp-num">{i + 1}</span>
              <span>{usp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PrototypeContent({ phase }) {
  return (
    <div className="phase-content">
      <div className="content-section">
        <h4 className="content-section-title">🎯 MVP Features</h4>
        <div className="mvp-list">
          {(phase.mvpFeatures || []).map((f, i) => (
            <div key={i} className={`mvp-item ${f.mustHave ? 'mvp-must' : 'mvp-nice'}`}>
              <div className="mvp-header">
                <span className="mvp-icon">{f.mustHave ? '✅' : '⭕'}</span>
                <span className="mvp-feature-name">{f.feature}</span>
                <span className={`mvp-badge ${f.mustHave ? '' : 'mvp-badge-nice'}`}>{f.mustHave ? 'Must Have' : 'Nice to Have'}</span>
              </div>
              <p className="mvp-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">🗓️ Product Roadmap</h4>
        <div className="roadmap">
          {(phase.roadmap || []).map((r, i) => (
            <div key={i} className="roadmap-phase">
              <div className="roadmap-header">
                <span className="roadmap-phase-label">{r.phase}</span>
                <span className="roadmap-title">{r.title}</span>
              </div>
              <div className="roadmap-items">
                {r.items.map((item, j) => (
                  <div key={j} className="roadmap-item">→ {item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">💰 Pricing Strategy Options</h4>
        <div className="pricing-grid">
          {(phase.pricingOptions || []).map((p, i) => (
            <div key={i} className="pricing-option">
              <div className="pricing-model">{p.model}</div>
              <p className="pricing-desc">{p.description}</p>
              <div className="pricing-split">
                <div>
                  {p.pros.map((pro, j) => <div key={j} className="pricing-pro">✓ {pro}</div>)}
                </div>
                <div>
                  {p.cons.map((con, j) => <div key={j} className="pricing-con">✗ {con}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">🛠️ Tech Stack Recommendations</h4>
        <div className="tech-stack">
          {Object.entries(phase.techStack || {}).map(([key, vals]) => (
            <div key={key} className="tech-category">
              <div className="tech-cat-name">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              <div className="tech-tags">
                {vals.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TestContent({ phase }) {
  return (
    <div className="phase-content">
      <div className="content-section">
        <h4 className="content-section-title">🔬 Key Assumptions to Test</h4>
        <div className="assumptions-list">
          {(phase.assumptions || []).map((a, i) => (
            <div key={i} className={`assumption-item priority-level-${a.priority.toLowerCase()}`}>
              <div className="assumption-header">
                <span className={`assumption-priority ${a.priority.toLowerCase()}`}>{a.priority}</span>
                <span className="assumption-text">{a.assumption}</span>
              </div>
              <div className="assumption-method">Method: {a.method}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">🧪 Testing Methods</h4>
        <div className="testing-timeline">
          {(phase.testingMethods || []).map((tm, i) => (
            <div key={i} className="testing-item">
              <div className="testing-method-name">{tm.method}</div>
              <div className="testing-meta">
                <span>📅 {tm.timeline}</span>
                <span>👥 {tm.participants}</span>
              </div>
              <div className="testing-goal">Goal: {tm.goal}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">✅ Success Criteria</h4>
        <div className="success-list">
          {(phase.successCriteria || []).map((sc, i) => (
            <div key={i} className="success-item">
              <span className="success-check">✓</span>
              <span>{sc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">⚠️ Risk Assessment</h4>
        <div className="risks-list">
          {(phase.risks || []).map((r, i) => (
            <div key={i} className={`risk-item risk-level-${r.level.toLowerCase()}`}>
              <div className="risk-header">
                <span className={`risk-badge risk-${r.level.toLowerCase()}`}>{r.level} Risk</span>
                <span className="risk-text">{r.risk}</span>
              </div>
              <div className="risk-mitigation">Mitigation: {r.mitigation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RefineContent({ phase }) {
  return (
    <div className="phase-content">
      <div className="content-section">
        <h4 className="content-section-title">🎯 Iteration Priorities</h4>
        <div className="iterations-list">
          {(phase.iterationPriorities || []).map((ip, i) => (
            <div key={i} className="iteration-item">
              <div className="iteration-num">#{ip.priority}</div>
              <div className="iteration-body">
                <div className="iteration-area">{ip.area}</div>
                <p className="iteration-desc">{ip.description}</p>
                <div className="iteration-meta">
                  <span className={`impact-badge impact-${ip.impact.toLowerCase().replace(' ', '-')}`}>Impact: {ip.impact}</span>
                  <span className="effort-label">Effort: {ip.effort}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h4 className="content-section-title">🔮 Long-Term Vision</h4>
        <div className="vision-timeline">
          {Object.entries(phase.longTermVision || {}).filter(([k]) => k !== 'vision').map(([key, val]) => (
            <div key={key} className="vision-item">
              <div className="vision-period">{key === 'year1' ? 'Year 1' : key === 'year2' ? 'Year 2' : 'Year 3'}</div>
              <div className="vision-desc">{val}</div>
            </div>
          ))}
        </div>
        {phase.longTermVision?.vision && (
          <div className="vision-statement">
            <div className="vs-label">Vision Statement</div>
            <blockquote className="vs-quote">{phase.longTermVision.vision}</blockquote>
          </div>
        )}
      </div>

      <div className="content-section">
        <h4 className="content-section-title">🎨 UX Improvements</h4>
        <div className="ux-list">
          {(phase.uxImprovements || []).map((ux, i) => (
            <div key={i} className="ux-item">
              <span className="ux-bullet">◉</span>
              <span>{ux}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CONTENT_COMPONENTS = {
  empathize: EmphasizeContent,
  define: DefineContent,
  ideate: IdeateContent,
  prototype: PrototypeContent,
  test: TestContent,
  refine: RefineContent,
}

export default function PhaseCard({ phaseKey, phase, index, isHighlighted, onActivate }) {
  const [expanded, setExpanded] = useState(false)
  const ContentComponent = CONTENT_COMPONENTS[phaseKey]

  const toggleExpand = () => {
    setExpanded(prev => !prev)
    if (!expanded) onActivate()
  }

  return (
    <motion.article
      className={`phase-card ${isHighlighted ? 'phase-card--highlighted' : ''}`}
      style={{ '--phase-primary': phase.primary, '--phase-light': phase.light, '--phase-text': phase.text }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: expanded ? 0 : -4, boxShadow: '0 20px 48px rgba(26,26,46,0.15)' }}
      aria-label={`Phase ${index + 1}: ${phase.title}`}
    >
      {/* Phase Header */}
      <div
        className="phase-card-header"
        style={{ background: phase.primary }}
        onClick={toggleExpand}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={e => e.key === 'Enter' && toggleExpand()}
      >
        <div className="pch-left">
          <div className="phase-number">Phase {String(index + 1).padStart(2, '0')}</div>
          <div className="phase-emoji">{phase.emoji}</div>
          <h3 className="phase-title">{phase.title.toUpperCase()}</h3>
        </div>
        <motion.div
          className="expand-icon"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▾
        </motion.div>
      </div>

      {/* Tagline */}
      <div className="phase-card-tagline">
        <p>{phase.tagline}</p>
      </div>

      {/* Key Insights (always visible) */}
      <div className="key-insights">
        <div className="ki-header">KEY INSIGHTS</div>
        <ul className="ki-list">
          {(phase.keyInsights || []).slice(0, expanded ? 5 : 3).map((insight, i) => (
            <li key={i} className="ki-item">
              <span className="ki-dot" style={{ background: phase.primary }}></span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="phase-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="phase-expanded-inner">
              {ContentComponent && <ContentComponent phase={phase} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Items */}
      <div className="action-items">
        <div className="ai-header">ACTION ITEMS</div>
        {(phase.actionItems || []).map((item, i) => (
          <div key={i} className="ai-item">
            <span className="ai-arrow">→</span>
            <div>
              <span className="ai-action">{item.action}</span>
              <span className="ai-timeline"> [{item.timeline}]</span>
            </div>
          </div>
        ))}
      </div>

      {/* Card Footer */}
      <div className="phase-card-footer">
        <button
          className="expand-btn"
          style={{ '--phase-primary': phase.primary }}
          onClick={toggleExpand}
          aria-label={expanded ? 'Collapse detailed analysis' : 'Expand detailed analysis'}
        >
          {expanded ? '⬆ Collapse Analysis' : '⬇ Expand Full Analysis'}
        </button>
        {index < 5 && (
          <span className="next-phase-hint">Next: {['Define', 'Ideate', 'Prototype', 'Test', 'Refine'][index]} →</span>
        )}
      </div>
    </motion.article>
  )
}
