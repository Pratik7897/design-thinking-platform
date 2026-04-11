import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './InputForm.css'

const CATEGORIES = [
  { id: 'saas', label: 'Software & SaaS', icon: '☁️' },
  { id: 'ai', label: 'AI & Machine Learning', icon: '🤖' },
  { id: 'fintech', label: 'FinTech & Finance', icon: '💰' },
  { id: 'edtech', label: 'Education & EdTech', icon: '🎓' },
  { id: 'health', label: 'Health & Wellness', icon: '🧘' },
  { id: 'ecommerce', label: 'E-commerce & Retail', icon: '🛒' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'social', label: 'Social Media', icon: '📱' },
  { id: 'logistics', label: 'Logistics', icon: '🚛' },
  { id: 'travel', label: 'Travel & Hospitality', icon: '✈️' },
  { id: 'food', label: 'Food & Delivery', icon: '🍕' },
  { id: 'security', label: 'Cybersecurity', icon: '🛡️' },
  { id: 'web3', label: 'Blockchain / Web3', icon: '⛓️' },
  { id: 'productivity', label: 'Productivity Tools', icon: '⏱️' },
  { id: 'electronics', label: 'Electronics & Hardware', icon: '🔌' },
  { id: 'other', label: 'Other (Custom)', icon: '✨' }
]

const AUDIENCES = [
  { id: 'students', label: 'Students', emoji: '📚' },
  { id: 'professionals', label: 'Professionals', emoji: '💼' },
  { id: 'developers', label: 'Developers', emoji: '🧑‍💻' },
  { id: 'smb', label: 'Small Business Owners', emoji: '🏪' },
  { id: 'startups', label: 'Startups', emoji: '🚀' },
  { id: 'enterprises', label: 'Enterprises', emoji: '🏢' },
  { id: 'seniors', label: 'Senior Citizens', emoji: '👵' },
  { id: 'genz', label: 'Gen Z / Youth', emoji: '🎮' },
  { id: 'parents', label: 'Parents / Families', emoji: '👨‍👩‍👧' },
  { id: 'custom', label: 'Custom Audience', emoji: '🌐' }
]

const PRODUCT_GOALS = [
  { id: 'efficiency', label: 'Improve Efficiency', emoji: '⚙️' },
  { id: 'ux', label: 'Better User Experience', emoji: '✨' },
  { id: 'growth', label: 'Drive User Growth', emoji: '📈' },
  { id: 'revenue', label: 'Increase Revenue', emoji: '💸' },
  { id: 'accessibility', label: 'Accessibility', emoji: '♿' },
  { id: 'automation', label: 'Automation', emoji: '🤖' },
  { id: 'scaling', label: 'Scale Operations', emoji: '🔝' }
]

export default function InputForm({ onSubmit, onBack }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    productName: '',
    description: '',
    goal: '',
    category: '',
    customIndustry: '',
    targetMarket: [],
    customAudience: '',
    problemStatement: '',
    competitors: '',
    keyFeatures: '',
    monetization: '',
    platform: '',
    image: null,
    imagePreview: null,
  })
  const [errors, setErrors] = useState({})
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    const saved = localStorage.getItem('dt_form_draft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setForm(prev => ({ ...prev, ...parsed, image: null, imagePreview: null }))
      } catch (e) { console.error('Failed to load draft', e) }
    }
  }, [])

  useEffect(() => {
    const { image, imagePreview, ...rest } = form
    localStorage.setItem('dt_form_draft', JSON.stringify(rest))
  }, [form])

  const validateStep = (s) => {
    const e = {}
    if (s === 1 && !form.productName.trim()) e.productName = 'Please enter a name'
    if (s === 2 && !form.goal && !form.description.trim()) e.goal = 'Please select a goal or describe it'
    if (s === 3 && !form.category) e.category = 'Please select a category'
    if (s === 3 && form.category === 'Other (Custom)' && !form.customIndustry.trim()) e.customIndustry = 'Please specify'
    if (s === 4 && form.targetMarket.length === 0) e.targetMarket = 'Select at least one'
    if (s === 5 && !form.problemStatement.trim()) e.problemStatement = 'Briefly state the core problem'
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 11) setStep(step + 1)
      else handleSubmit()
    }
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
    else onBack()
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    onSubmit(form)
    localStorage.removeItem('dt_form_draft')
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  const handleToggleMarket = (val) => {
    setForm(prev => {
      const exists = prev.targetMarket.includes(val)
      return {
        ...prev,
        targetMarket: exists ? prev.targetMarket.filter(m => m !== val) : [...prev.targetMarket, val]
      }
    })
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
             <span className="step-count">STEP 0{step} / 06</span>
          </div>
        </header>

        <motion.div className="iform-card glass depth-3d" layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="step-content"
              initial={{ rotateY: 20, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -20, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {step === 1 && (
                <div className="field-group">
                  <h2 className="step-title">What is your product's name?</h2>
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
                <div className="field-group">
                  <h2 className="step-title">What is the primary goal?</h2>
                  <div className="mcq-grid">
                    {PRODUCT_GOALS.map(g => (
                      <button
                        key={g.id}
                        className={`mcq-card ${form.goal === g.label ? 'active' : ''}`}
                        onClick={() => handleChange('goal', g.label)}
                      >
                        <span className="mcq-icon">{g.emoji}</span>
                        <span className="mcq-label">{g.label}</span>
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="field-input glass-input nm-inset mt-4"
                    style={{ height: '120px' }}
                    placeholder="Or describe it in your own words..."
                    value={form.description}
                    onChange={e => handleChange('description', e.target.value)}
                  />
                  {errors.goal && <p className="error-msg">{errors.goal}</p>}
                </div>
              )}

              {step === 3 && (
                <div className="field-group">
                  <h2 className="step-title">Which industry fits best?</h2>
                  <div className="mcq-grid">
                    {CATEGORIES.map(c => (
                      <button
                        key={c.id}
                        className={`mcq-card ${form.category === c.label ? 'active' : ''}`}
                        onClick={() => handleChange('category', c.label)}
                      >
                        <span className="mcq-icon">{c.icon}</span>
                        <span className="mcq-label">{c.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.category && <p className="error-msg">{errors.category}</p>}
                </div>
              )}

              {step === 4 && (
                <div className="field-group">
                  <h2 className="step-title">What's the current lifecycle?</h2>
                  <div className="mcq-column">
                    {STAGES.map(s => (
                      <button
                        key={s.value}
                        className={`mcq-row ${form.currentStage === s.value ? 'active' : ''}`}
                        onClick={() => handleChange('currentStage', s.value)}
                      >
                        <span className="mcq-row-label">{s.label}</span>
                        <span className="mcq-row-desc">{s.description}</span>
                      </button>
                    ))}
                  </div>
                  {errors.currentStage && <p className="error-msg">{errors.currentStage}</p>}
                </div>
              )}

              {step === 5 && (
                <div className="field-group">
                  <h2 className="step-title">Who are you building for?</h2>
                  <div className="mcq-grid">
                    {AUDIENCES.map(a => (
                      <button
                        key={a.id}
                        className={`mcq-card ${form.targetMarket.includes(a.label) ? 'active' : ''}`}
                        onClick={() => handleToggleMarket(a.label)}
                      >
                        <span className="mcq-icon">{a.emoji}</span>
                        <span className="mcq-label">{a.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="field-group">
                  <h2 className="step-title">Add a visual touch <small>(Optional)</small></h2>
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
                        <button className="remove-btn" onClick={(e) => { e.stopPropagation(); handleChange('imagePreview', null) }}>Remove Image</button>
                      </div>
                    ) : (
                      <>
                        <span className="upload-icon">📷</span>
                        <p>Drag your product screenshot here</p>
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
              {step === 6 ? 'LAUNCH 3D ANALYSIS' : 'CONTINUE →'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
