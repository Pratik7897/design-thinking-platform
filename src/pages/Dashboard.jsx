import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import jsPDF from 'jspdf'

import PhaseCard from '../components/PhaseCard'
import CircularNav from '../components/CircularNav'
import './Dashboard.css'

const PHASE_KEYS = ['empathize', 'define', 'ideate', 'prototype', 'test', 'refine']

export default function Dashboard({ analysis, productData, onNewAnalysis }) {
  const [activePhase, setActivePhase] = useState(null)
  const [exporting, setExporting] = useState(false)
  const reportRef = useRef()

  const phases = analysis.phases
  const meta = analysis.metadata

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
      pdf.setFontSize(28)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Design Thinking Analysis', pageW / 2, 60, { align: 'center' })
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'normal')
      pdf.text(meta.productName || 'Product', pageW / 2, 80, { align: 'center' })
      pdf.setFontSize(12)
      pdf.setTextColor(160, 160, 180)
      pdf.text(`Category: ${meta.category || 'N/A'}`, pageW / 2, 100, { align: 'center' })
      pdf.text(`Stage: ${meta.currentStage || 'N/A'}`, pageW / 2, 112, { align: 'center' })
      pdf.text(`Generated: ${new Date(meta.generatedAt).toLocaleDateString()}`, pageW / 2, 124, { align: 'center' })

      // Content pages
      const phaseColors = {
        empathize: [255, 217, 102],
        define: [255, 155, 133],
        ideate: [233, 117, 186],
        prototype: [91, 127, 176],
        test: [77, 191, 181],
        refine: [168, 181, 196],
      }

      PHASE_KEYS.forEach((key, idx) => {
        const phase = phases[key]
        const color = phaseColors[key]
        pdf.addPage()

        // Header
        pdf.setFillColor(...color)
        pdf.rect(0, 0, pageW, 30, 'F')
        pdf.setTextColor(26, 26, 46)
        pdf.setFontSize(18)
        pdf.setFont('helvetica', 'bold')
        pdf.text(`${idx + 1}. ${phase.title.toUpperCase()}`, 15, 20)

        // Tagline
        pdf.setTextColor(80, 80, 100)
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'italic')
        pdf.text(phase.tagline || '', 15, 42)

        // Key Insights
        pdf.setTextColor(26, 26, 46)
        pdf.setFontSize(13)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Key Insights', 15, 58)

        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        const insights = phase.keyInsights || []
        insights.slice(0, 5).forEach((insight, i) => {
          const lines = pdf.splitTextToSize(`• ${insight}`, pageW - 30)
          pdf.text(lines, 15, 68 + i * 16)
        })

        // Action Items
        const actionY = 68 + Math.min(insights.length, 5) * 16 + 16
        pdf.setFontSize(13)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(26, 26, 46)
        pdf.text('Action Items', 15, actionY)

        const actions = phase.actionItems || []
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        actions.forEach((item, i) => {
          const text = `→ ${item.action} [${item.timeline}]`
          const lines = pdf.splitTextToSize(text, pageW - 30)
          pdf.text(lines, 15, actionY + 10 + i * 16)
        })
      })

      pdf.save(`${meta.productName || 'analysis'}-design-thinking.pdf`)
    } catch (err) {
      console.error(err)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <motion.header
        className="dash-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="dash-header-inner">
            <div className="dash-logo">
              <span className="logo-icon">◎</span>
              <span className="logo-text">ThinkLens</span>
            </div>
            <div className="dash-product-info">
              <span className="dash-product-badge">{meta.category}</span>
              <h2 className="dash-product-name">{meta.productName}</h2>
              <span className="dash-product-stage">Stage: {meta.currentStage}</span>
            </div>
            <div className="dash-actions">
              <button
                className="dash-btn dash-btn-outline"
                onClick={handleExport}
                disabled={exporting}
                aria-label="Export as PDF"
              >
                {exporting ? '⏳ Exporting...' : '📄 Export PDF'}
              </button>
              <button
                className="dash-btn dash-btn-primary"
                onClick={onNewAnalysis}
                aria-label="Start new analysis"
              >
                + New Analysis
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="dash-main" ref={reportRef}>
        <div className="container">
          {/* Circular Overview */}
          <motion.section
            className="dash-overview"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CircularNav
              phases={PHASE_KEYS.map(k => phases[k])}
              activePhase={activePhase}
              onPhaseClick={setActivePhase}
            />

            <div className="overview-summary">
              <h1 className="overview-title">Design Thinking Analysis</h1>
              <p className="overview-subtitle">
                A comprehensive {PHASE_KEYS.length}-phase analysis for <strong>{meta.productName}</strong>.
                Explore each phase below or click a phase in the diagram.
              </p>
              {productData?.image && (
                <div className="product-image-wrap">
                  <img src={productData.imagePreview} alt={`${meta.productName} product image`} className="product-thumb" />
                </div>
              )}
              <div className="overview-tags">
                {['User Personas', 'Pain Points', 'Problem Statement', 'Feature Ideas', 'MVP Plan', 'Testing Framework', 'Growth Strategy'].map(tag => (
                  <span key={tag} className="overview-tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Phase Cards Grid */}
          <section className="phases-grid" id="phases">
            {PHASE_KEYS.map((key, i) => (
              <PhaseCard
                key={key}
                phaseKey={key}
                phase={phases[key]}
                index={i}
                isHighlighted={activePhase === i}
                onActivate={() => setActivePhase(activePhase === i ? null : i)}
              />
            ))}
          </section>

          {/* Bottom Actions */}
          <motion.div
            className="dash-bottom-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button className="dash-big-btn" onClick={handleExport} disabled={exporting}>
              <span>{exporting ? '⏳ Generating PDF...' : '📄 Download Full Report'}</span>
            </button>
            <button className="dash-big-btn dash-big-btn-outline" onClick={onNewAnalysis}>
              <span>+ Analyze Another Product</span>
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
