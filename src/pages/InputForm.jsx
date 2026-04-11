import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './InputForm.css'

const CATEGORIES = [
  { id: 'electronics', label: 'Electronics & Hardware', icon: '💻' },
  { id: 'software', label: 'Software & SaaS', icon: '☁️' },
  { id: 'mobile', label: 'Mobile App', icon: '📱' },
  { id: 'ecommerce', label: 'E-commerce & Retail', icon: '🛒' },
  { id: 'health', label: 'Health & Wellness', icon: '🧘' },
  { id: 'edu', label: 'Education & EdTech', icon: '🎓' },
  { id: 'fintech', label: 'FinTech & Finance', icon: '💰' },
  { id: 'ai', label: 'AI & Machine Learning', icon: '🤖' },
  { id: 'other', label: 'Other', icon: '✨' }
]

const STAGES = [
  { value: 'concept', label: '💭 Concept', description: 'Just an idea in the works' },
  { value: 'prototype', label: '🔧 Prototype', description: 'Early version being built' },
  { value: 'mvp', label: '🚀 MVP', description: 'Minimum viable product ready' },
  { value: 'growth', label: '📈 Scaling', description: 'Growing and expanding' },
]

export default function InputForm({ onSubmit, onBack }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    productName: '',
    description: '',
    category: '',
    otherCategory: '',
    targetMarket: '',
    currentStage: '',
    image: null,
    imagePreview: null,
  })
  const [errors, setErrors] = useState({})
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  // Persistence: Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dt_form_draft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setForm(prev => ({ ...prev, ...parsed, image: null, imagePreview: null }))
      } catch (e) { console.error('Failed to load draft', e) }
    }
  }, [])

  // Save to localStorage when form changes
  useEffect(() => {
    const { image, imagePreview, ...rest } = form
    localStorage.setItem('dt_form_draft', JSON.stringify(rest))
  }, [form])

  const validateStep = (s) => {
    const e = {}
    if (s === 1 && !form.productName.trim()) e.productName = 'Please enter a name'
    if (s === 2 && form.description.trim().length < 10) e.description = 'Please provide more detail (min 10 chars)'
    if (s === 3 && !form.category) e.category = 'Please select a category'
    if (s === 3 && form.category === 'Other' && !form.otherCategory.trim()) e.otherCategory = 'Please specify category'
    if (s === 4 && !form.currentStage) e.currentStage = 'Please select a stage'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 6) setStep(step + 1)
      else handleSubmit()
    }
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
    else onBack()
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    const finalCategory = form.category === 'Other' ? form.otherCategory : form.category
    onSubmit({ ...form, category: finalCategory })
    localStorage.removeItem('dt_form_draft')
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  const handleImageDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setForm(prev => ({ ...prev, image: file, imagePreview: ev.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const stepVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0 })
  }

  return (
    <div className="iform-page">
      <div className="iform-bg">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
      </div>

      <div className="iform-container">
        <header className="iform-header">
          <button className="back-btn glass" onClick={handlePrev}>
            {step === 1 ? '← Home' : '← Back'}
          </button>
          <div className="iform-progress">
             <div className="progress-bar-bg nm-inset">
               <motion.div 
                 className="progress-bar-fill" 
                 initial={{ width: 0 }}
                 animate={{ width: `${(step / 6) * 100}%` }}
               />
             </div>
             <span className="step-count">Step {step} of 6</span>
          </div>
        </header>

        <motion.div className="iform-card glass depth-3d" layout>
          <AnimatePresence mode="wait" custom={step}>
            <motion.div
              key={step}
              className="step-content"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {step === 1 && (
                <div className="field-group depth-layer">
                  <h2 className="step-title">What's the name of your product?</h2>
                  <input
                    type="text"
                    className="field-input glass-input nm-inset"
                    placeholder="e.g., AeroClean, FlowBoard..."
                    value={form.productName}
                    onChange={e => handleChange('productName', e.target.value)}
                    autoFocus
                  />
                  {errors.productName && <p className="error-msg">{errors.productName}</p>}
                </div>
              )}

              {step === 2 && (
                <div className="field-group depth-layer">
                  <h2 className="step-title">Describe its core purpose</h2>
                  <textarea
                    className="field-input glass-input nm-inset field-textarea"
                    placeholder="Who is it for? Key features? Primary goal?..."
                    value={form.description}
                    onChange={e => handleChange('description', e.target.value)}
                    autoFocus
                  />
                  {errors.description && <p className="error-msg">{errors.description}</p>}
                </div>
              )}

              {step === 3 && (
                <div className="field-group depth-layer">
                  <h2 className="step-title">Choose a Category</h2>
                  <div className="mcq-grid">
                    {CATEGORIES.map(c => (
                      <button
                        key={c.id}
                        className={`mcq-card ${form.category === c.label ? 'active' : ''} nm-flat`}
                        onClick={() => handleChange('category', c.label)}
                      >
                        <span className="mcq-icon">{c.icon}</span>
                        <span className="mcq-label">{c.label}</span>
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {form.category === 'Other' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <input
                          type="text"
                          className="field-input glass-input nm-inset mt-4"
                          placeholder="Type category here..."
                          value={form.otherCategory}
                          onChange={e => handleChange('otherCategory', e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.category && <p className="error-msg">{errors.category}</p>}
                </div>
              )}

              {step === 4 && (
                <div className="field-group depth-layer">
                  <h2 className="step-title">Where are you now?</h2>
                  <div className="mcq-column">
                    {STAGES.map(s => (
                      <button
                        key={s.value}
                        className={`mcq-row ${form.currentStage === s.value ? 'active' : ''} nm-flat`}
                        onClick={() => handleChange('currentStage', s.value)}
                      >
                        <span className="mcq-row-label">{s.label}</span>
                        <span className="mcq-row-desc">{s.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="field-group depth-layer">
                  <h2 className="step-title">Target Market <small>(Optional)</small></h2>
                  <input
                    type="text"
                    className="field-input glass-input nm-inset"
                    placeholder="e.g., Tech-savvy gen Z, SaaS businesses..."
                    value={form.targetMarket}
                    onChange={e => handleChange('targetMarket', e.target.value)}
                    autoFocus
                  />
                </div>
              )}

              {step === 6 && (
                <div className="field-group depth-layer">
                  <h2 className="step-title">Product Image <small>(Optional)</small></h2>
                  <div
                    className={`upload-zone nm-inset ${dragOver ? 'drag' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleImageDrop}
                    onClick={() => !form.imagePreview && fileRef.current?.click()}
                  >
                    {form.imagePreview ? (
                      <div className="upload-preview">
                        <img src={form.imagePreview} alt="Preview" />
                        <button className="remove-btn" onClick={(e) => { e.stopPropagation(); handleChange('imagePreview', null) }}>Remove</button>
                      </div>
                    ) : (
                      <>
                        <span className="upload-icon">📷</span>
                        <p>Drop image or click to browse</p>
                      </>
                    )}
                    <input ref={fileRef} type="file" hidden onChange={handleImageDrop} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="iform-footer">
            <button className="next-btn nm-flat" onClick={handleNext}>
              {step === 6 ? 'Finalize Analysis 🚀' : 'Continue →'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
