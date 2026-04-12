import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './PhaseCard.css'

// Professional UI Blocks for Dynamic Content
const UIBlock = ({ title, children, icon }) => (
  <div className="ui-block glass nm-flat animate-fade-in">
    {title && (
      <div className="ui-block-header">
        <span className="ui-block-icon">{icon}</span>
        <h4 className="ui-block-title">{title}</h4>
      </div>
    )}
    <div className="ui-block-content">{children}</div>
  </div>
)

const MetricItem = ({ label, value, subtext }) => (
  <div className="metric-item nm-inset">
    <div className="metric-label">{label}</div>
    <div className="metric-value gold-text">{value}</div>
    {subtext && <div className="metric-subtext">{subtext}</div>}
  </div>
)

const DataList = ({ items, type = 'bullet' }) => (
  <ul className={`data-list ${type}-list`}>
    {items.map((item, i) => (
      <motion.li 
        key={i} 
        className="data-list-item nm-thin"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05 }}
      >
        <span className="bullet">{type === 'check' ? '✅' : '•'}</span>
        <span className="item-content">
          {typeof item === 'string' ? item : (item.name || item.text || item.label || JSON.stringify(item))}
        </span>
      </motion.li>
    ))}
  </ul>
)

// Dynamic Content Renderer
function DynamicPhaseContent({ phase }) {
  const renderDataField = (key, value) => {
    if (!value || key === 'title' || key === 'tagline' || key === 'keyInsights' || key === 'actionItems' || key === 'primary' || key === 'dark' || key === 'light' || key === 'text' || key === 'emoji') return null

    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    
    // Custom renderers based on key name or value structure
    if ((key === 'kpis' || key === 'metrics') && Array.isArray(value)) {
      return (
        <UIBlock title={label} icon="📈" key={key}>
          <div className="metrics-grid">
            {value.map((kpi, i) => (
              <div key={i} className="metric-card nm-inset">
                <div className="metric-name">{kpi?.metric || kpi?.name || 'Item'}</div>
                <div className="metric-target gold-text">{kpi?.target || kpi?.value || 'N/A'}</div>
              </div>
            ))}
          </div>
        </UIBlock>
      )
    }

    if ((key === 'segments' || key === 'competitors' || key === 'concepts' || key === 'pains' || key === 'kpis') && Array.isArray(value)) {
      return (
        <UIBlock title={label} icon="🎯" key={key}>
          <div className="blocks-grid">
            {value.map((item, i) => (
              <div key={i} className="insight-mini-card nm-flat">
                <div className="mini-card-title">{item?.name || item?.issue || item?.step || item?.metric || 'Details'}</div>
                <div className="mini-card-body">{item?.description || item?.advantage || item?.impact || item?.insight || item?.target}</div>
                {item?.value && <span className="mini-card-badge">{item.value}</span>}
              </div>
            ))}
          </div>
        </UIBlock>
      )
    }

    if (key === 'matrix' && value && typeof value === 'object') {
      return (
        <UIBlock title="Strategic Matrix" icon="⚖️" key={key}>
          <div className="moscow-grid">
            {Object.entries(value).map(([mKey, mVal]) => (
              <div key={mKey} className={`moscow-sector sector-${mKey} nm-inset`}>
                <div className="sector-label">{mKey.toUpperCase()}</div>
                <div className="sector-items">{Array.isArray(mVal) ? mVal.join(', ') : String(mVal || 'N/A')}</div>
              </div>
            ))}
          </div>
        </UIBlock>
      )
    }

    if (key === 'steps' && Array.isArray(value)) {
      return (
        <UIBlock title="User Journey Flow" icon="🗺️" key={key}>
          <div className="journey-flow">
            {value.map((step, i) => (
              <div key={i} className="journey-step">
                <div className="step-point nm-flat">{i + 1}</div>
                <div className="step-info">
                  <div className="step-name">{step?.step || step?.action || 'Step'}</div>
                  <div className="step-emotion">{step?.emotion === 'Pos' ? '😊' : step?.emotion === 'Neg' ? '😫' : '😐'}</div>
                </div>
              </div>
            ))}
          </div>
        </UIBlock>
      )
    }

    if (Array.isArray(value)) {
      return (
        <UIBlock title={label} icon="📝" key={key}>
          <DataList items={value} />
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
        <div className="single-insight nm-inset">{value}</div>
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
  const [expanded, setExpanded] = useState(isImmersive)

  // MANDATORY: Log render data for verification
  console.log(`RENDER DATA [${phaseKey}]:`, phase);

  const toggleExpand = () => {
    if (isImmersive) return
    setExpanded(prev => !prev)
  }

  return (
    <motion.article
      className={`phase-card glass depth-3d ${isHighlighted ? 'phase-card--highlighted' : ''} ${isImmersive ? 'phase-card--immersive' : ''}`}
      style={{ 
        '--phase-primary': phase.primary, 
        '--phase-light': phase.light, 
        '--phase-text': phase.text,
        '--node-index': index 
      }}
      initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="phase-card-inner-3d">
        {/* Header Section */}
        <header className="p-card-header" onClick={toggleExpand}>
          <div className="p-header-top">
            <div className="p-idx-badge nm-inset">Phase {String(index + 1).padStart(2, '0')}</div>
            <div className="p-emoji-circle nm-flat animate-float">{phase.emoji}</div>
          </div>
          <h1 className="p-title-main">{phase.title}</h1>
          <p className="p-tagline-sub nm-inset">"{phase.tagline}"</p>
        </header>

        <div className="p-card-body custom-scrollbar">
          {/* Executive Summary Section */}
          <section className="p-section p-summary-section">
            <h2 className="p-section-heading">Strategic Insights</h2>
            <div className="insight-cards-grid">
              {(phase.keyInsights || []).map((insight, i) => (
                <div key={i} className="insight-card nm-flat">
                  <div className="insight-bullet" style={{ background: phase.primary }} />
                  <p className="insight-text">{insight}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Dynamic Content Deep Dive */}
          <section className={`p-section p-deep-dive ${expanded ? 'expanded' : ''}`}>
             <h2 className="p-section-heading">Detailed Breakdown</h2>
             <DynamicPhaseContent phase={phase} />
          </section>

          {/* Strategic Roadmap / Action Items */}
          <section className="p-section p-action-section">
            <h2 className="p-section-heading">Action Roadmap</h2>
            <div className="action-roadmap-list">
              {(phase.actionItems || []).map((item, i) => (
                <div key={i} className="action-roadmap-item nm-thin">
                   <div className="action-dot-wrap">
                      <div className="action-line" />
                      <div className="action-dot nm-flat">🚀</div>
                   </div>
                   <div className="action-content">
                      <div className="action-verb">{item.action}</div>
                      <div className="action-meta">Expected Timeline: <span>{item.timeline}</span></div>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {!isImmersive && (
          <footer className="p-card-footer">
            <button className="p-expand-btn nm-flat" onClick={toggleExpand}>
              {expanded ? 'Collapse Matrix' : 'Explore Details'}
            </button>
          </footer>
        )}
      </div>
    </motion.article>
  )
}
