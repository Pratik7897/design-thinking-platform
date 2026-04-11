import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import jsPDF from 'jspdf'

import PhaseCard from '../components/PhaseCard'
import CircularNav from '../components/CircularNav'
import './Dashboard.css'

const PHASE_KEYS = [
  'problem_definition',
  'user_segmentation',
  'empathy_mapping',
  'pain_point_analysis',
  'competitive_analysis',
  'ideation',
  'feature_prioritization',
  'user_journey_mapping',
  'prototyping_strategy',
  'validation_feedback'
]

export default function Dashboard({ analysis, productData, onNewAnalysis }) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const [exporting, setExporting] = useState(false)
  const reportRef = useRef()

  const phases = analysis.phases
  const meta = analysis.metadata

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && activePhaseIndex < PHASE_KEYS.length - 1) setActivePhaseIndex(prev => prev + 1)
      if (e.key === 'ArrowLeft' && activePhaseIndex > 0) setActivePhaseIndex(prev => prev - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhaseIndex])

  const handleExport = async () => {
    setExporting(true)
    try {
      const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
      const pageW = pdf.internal.pageSize.getWidth()
      const pageH = pdf.internal.pageSize.getHeight()

      // Title Page
      pdf.setFillColor(26, 26, 46)
      pdf.rect(0, 0, pageW, pageH, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(32)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Design Thinking Multi-Phase Report', pageW / 2, 60, { align: 'center' })
      pdf.setFontSize(22)
      pdf.setFont('helvetica', 'normal')
      pdf.text(meta.productName || 'Product', pageW / 2, 80, { align: 'center' })
      
      pdf.setFontSize(12)
      pdf.setTextColor(160, 160, 180)
      pdf.text(`Industry Context: ${meta.category || 'N/A'}`, pageW / 2, 100, { align: 'center' })
      pdf.text(`10-Phase Deep Analysis`, pageW / 2, 112, { align: 'center' })
      pdf.text(`Generated on: ${new Date(meta.generatedAt).toLocaleDateString()}`, pageW / 2, 124, { align: 'center' })

      // Content pages
      PHASE_KEYS.forEach((key, idx) => {
        const phase = phases[key]
        if (!phase) return
        
        pdf.addPage()

        // Phase Header
        pdf.setFillColor(phase.primary || '#000000')
        pdf.rect(0, 0, pageW, 40, 'F')
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(20)
        pdf.setFont('helvetica', 'bold')
        pdf.text(`${idx + 1}. ${(phase.title || key).toUpperCase()}`, 15, 25)

        // Tagline
        pdf.setTextColor(100, 100, 120)
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'italic')
        pdf.text(phase.tagline || '', 15, 52)

        // Sections
        pdf.setTextColor(26, 26, 46)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(14)
        pdf.text('Key Insights', 15, 68)

        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(10)
        const insights = phase.keyInsights || []
        insights.forEach((insight, i) => {
          const lines = pdf.splitTextToSize(`• ${insight}`, pageW - 30)
          pdf.text(lines, 15, 78 + i * 14)
        })

        // Action Items
        const actionY = 78 + (insights.length * 14) + 10
        pdf.setFont('helvetica', 'bold')
        pdf.text('Strategic Action Items', 15, actionY)
        
        pdf.setFont('helvetica', 'normal')
        const items = phase.actionItems || []
        items.forEach((item, i) => {
          pdf.text(`→ ${item.action} (${item.timeline})`, 15, actionY + 8 + i * 8)
        })
      })

      pdf.save(`${meta.productName || 'analysis'}-strategy.pdf`)
    } catch (err) {
      console.error(err)
    } finally {
      setExporting(false)
    }
  }

  const activePhaseKey = PHASE_KEYS[activePhaseIndex]

  return (
    <div className="dashboard nm-bg">
      <motion.header
        className="dash-header glass"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <div className="container">
          <div className="dash-header-inner">
            <div className="dash-logo">
              <span className="logo-icon">◎</span>
              <span className="logo-text">ThinkLens</span>
            </div>
            <div className="dash-product-info">
              <span className="dash-product-badge nm-flat">{meta.category}</span>
              <h2 className="dash-product-name">{meta.productName}</h2>
            </div>
            <div className="dash-actions">
              <button className="dash-btn glass" onClick={handleExport} disabled={exporting}>
                {exporting ? 'Exporting...' : '📄 PDF'}
              </button>
              <button className="dash-btn nm-flat" onClick={onNewAnalysis}>
                + New
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="dash-main">
        <div className="container overflow-visible">
          {/* Immersive Phase Display */}
          <section className="phases-immersive-container">
            <div className="carousel-nav-wrapper">
              <CircularNav
                phases={PHASE_KEYS.map(k => phases[k])}
                activePhase={activePhaseIndex}
                onPhaseClick={setActivePhaseIndex}
              />
            </div>

            <div className="carousel-main">
              <div className="carousel-controls">
                <button 
                  className={`carousel-arrow nm-flat ${activePhaseIndex === 0 ? 'disabled' : ''}`}
                  onClick={() => activePhaseIndex > 0 && setActivePhaseIndex(prev => prev - 1)}
                >
                  ←
                </button>
                <div className="carousel-indicators">
                   {PHASE_KEYS.map((_, i) => (
                     <div 
                       key={i} 
                       className={`indicator ${i === activePhaseIndex ? 'indicator-active' : ''}`}
                       onClick={() => setActivePhaseIndex(i)}
                     />
                   ))}
                </div>
                <button 
                  className={`carousel-arrow nm-flat ${activePhaseIndex === PHASE_KEYS.length - 1 ? 'disabled' : ''}`}
                  onClick={() => activePhaseIndex < PHASE_KEYS.length - 1 && setActivePhaseIndex(prev => prev + 1)}
                >
                  →
                </button>
              </div>

              <div className="carousel-card-viewport depth-3d">
                <AnimatePresence mode="wait" custom={activePhaseIndex}>
                  <motion.div
                    key={activePhaseKey}
                    className="carousel-card-wrap"
                    initial={{ opacity: 0, rotateY: 90, scale: 0.8, x: 100 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
                    exit={{ opacity: 0, rotateY: -90, scale: 0.8, x: -100 }}
                    transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                  >
                    <PhaseCard
                      phaseKey={activePhaseKey}
                      phase={phases[activePhaseKey]}
                      index={activePhaseIndex}
                      isHighlighted={true}
                      isImmersive={true}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Bottom Summary */}
          <motion.div
            className="dash-summary-footer glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="summary-left">
              <p>Completed 3D analysis for <strong>{meta.productName}</strong> 🎉</p>
            </div>
            <div className="summary-right">
              <button className="dash-big-btn nm-flat" onClick={handleExport}>Download Full 3D Report</button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
