import { useState } from 'react'
import { motion } from 'framer-motion'
import './PhaseCard.css'

// Professional UI Blocks for Dynamic Content
const UIBlock = ({ title, children, icon }) => (
  <div className="ui-block glass animate-fade-in">
    {title && (
      <div className="ui-block-header">
        <span className="ui-block-icon">{icon}</span>
        <h4 className="ui-block-title">{title}</h4>
      </div>
    )}
    <div className="ui-block-content">{children}</div>
  </div>
)

const MetricItem = ({ label, value }) => (
  <div className="metric-item">
    <div className="metric-label">{label}</div>
    <div className="metric-value gold-text">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</div>
  </div>
)

const DataList = ({ items, type = 'bullet' }) => (
  <ul className={`data-list ${type}-list`}>
    {(items || []).map((item, i) => (
      <motion.li 
        key={i} 
        className="data-list-item"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05 }}
      >
        <span className="bullet">{type === 'check' ? '✅' : '•'}</span>
        <span className="item-content">
          {typeof item === 'string' ? item : JSON.stringify(item)}
        </span>
      </motion.li>
    ))}
  </ul>
)

function DynamicPhaseContent({ phase }) {
  const renderDataField = (key, value) => {
    // Skip fields handled by the main card layout
    const internalFields = ['title', 'tagline', 'keyInsights', 'actionItems', 'primary', 'dark', 'light', 'text', 'emoji', 'metadata'];
    if (!value || internalFields.includes(key)) return null;

    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    
    // Custom renderers for known arrays
    if (Array.isArray(value)) {
      return (
        <UIBlock title={label} icon="🎯" key={key}>
          <div className="blocks-grid">
            {value.map((item, i) => (
              <div key={i} className="insight-mini-card">
                {typeof item === 'object' ? (
                  <>
                    <div className="mini-card-title">{item.name || item.issue || item.step || item.metric || 'Strategic Item'}</div>
                    <div className="mini-card-body">{item.description || item.advantage || item.impact || item.insight || item.target || JSON.stringify(item)}</div>
                  </>
                ) : (
                  <div className="mini-card-body">{String(item)}</div>
                )}
              </div>
            ))}
          </div>
        </UIBlock>
      )
    }

    if (typeof value === 'object') {
       return (
         <UIBlock title={label} icon="📊" key={key}>
            <div className="metrics-grid">
              {Object.entries(value).map(([k, v]) => (
                <MetricItem key={k} label={k} value={v} />
              ))}
            </div>
         </UIBlock>
       )
    }

    return (
      <UIBlock title={label} icon="💡" key={key}>
        <div className="single-insight">{String(value)}</div>
      </UIBlock>
    )
  }

  return (
    <div className="phase-dynamic-grid">
      {Object.entries(phase).map(([key, value]) => renderDataField(key, value))}
    </div>
  )
}

export default function PhaseCard({ phaseKey, phase, index, isHighlighted, isImmersive }) {
  const [expanded, setExpanded] = useState(isImmersive);

  const toggleExpand = () => {
    if (isImmersive) return;
    setExpanded(prev => !prev);
  }

  return (
    <motion.article
      className={`phase-card glass ${isHighlighted ? 'phase-card--highlighted' : ''} ${isImmersive ? 'phase-card--immersive' : ''}`}
      style={{ 
        '--phase-primary': phase.primary, 
        '--phase-light': phase.light, 
        '--phase-text': phase.text,
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="phase-card-inner">
        <header className="p-card-header" onClick={toggleExpand}>
          <div className="p-header-top">
            <div className="p-idx-badge">PHASE {String(index + 1).padStart(2, '0')}</div>
            <div className="p-emoji-circle">{phase.emoji}</div>
          </div>
          <h1 className="p-title-main">{phase.title}</h1>
          <p className="p-tagline-sub">"{phase.tagline}"</p>
        </header>

        <div className="p-card-body custom-scrollbar">
          <section className="p-section">
            <h2 className="p-section-heading">Strategic Insights</h2>
            <div className="insight-cards-grid">
              {(phase.keyInsights || []).map((insight, i) => (
                <div key={i} className="insight-card">
                  <div className="insight-bullet" style={{ background: phase.primary }} />
                  <p className="insight-text">{insight}</p>
                </div>
              ))}
            </div>
          </section>

          {expanded && (
            <section className="p-section animate-slide-up">
               <h2 className="p-section-heading">Detailed Breakdown</h2>
               <DynamicPhaseContent phase={phase} />
            </section>
          )}

          <section className="p-section">
            <h2 className="p-section-heading">Action Roadmap</h2>
            <div className="action-roadmap-list">
              {(phase.actionItems || []).map((item, i) => (
                <div key={i} className="action-roadmap-item">
                   <div className="action-dot-wrap">
                      <div className="action-dot">🚀</div>
                      <div className="action-line" />
                   </div>
                   <div className="action-content">
                      <div className="action-verb">{item.action || String(item)}</div>
                      <div className="action-meta">Timeline: <span>{item.timeline || "Immediate"}</span></div>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {!isImmersive && (
          <footer className="p-card-footer">
            <button className="p-expand-btn nm-flat" style={{ background: phase.primary }} onClick={toggleExpand}>
              {expanded ? 'COLLECT VIEW' : 'EXPAND DETAILS'}
            </button>
          </footer>
        )}
      </div>
    </motion.article>
  )
}
