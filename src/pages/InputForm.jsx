import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import './InputForm.css'

const CATEGORIES = [
  'Electronics & Hardware', 'Software & SaaS', 'Mobile App', 
  'E-commerce & Retail', 'Fashion & Apparel', 'Food & Beverage',
  'Health & Wellness', 'Education & EdTech', 'FinTech & Finance',
  'Travel & Hospitality', 'Entertainment & Media', 'Real Estate',
  'Automotive', 'Social Media & Community', 'B2B Services',
  'AI & Machine Learning', 'Gaming', 'Other'
]

const STAGES = [
  { value: 'concept', label: '💭 Concept', description: 'Just an idea, not yet built' },
  { value: 'prototype', label: '🔧 Prototype', description: 'Early version being built' },
  { value: 'mvp', label: '🚀 MVP', description: 'Minimum viable product ready' },
  { value: 'beta', label: '🧪 Beta', description: 'Testing with select users' },
  { value: 'launched', label: '✅ Launched', description: 'Live and in the market' },
  { value: 'growth', label: '📈 Scaling', description: 'Growing and expanding' },
]

export default function InputForm({ onSubmit, onBack }) {
  const [form, setForm] = useState({
    productName: '',
    description: '',
    category: '',
    targetMarket: '',
    currentStage: '',
    image: null,
    imagePreview: null,
  })
  const [errors, setErrors] = useState({})
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  const validate = () => {
    const e = {}
    if (!form.productName.trim()) e.productName = 'Product name is required'
    if (form.productName.trim().length < 2) e.productName = 'Name must be at least 2 characters'
    if (!form.description.trim()) e.description = 'Description is required'
    if (form.description.trim().length < 20) e.description = 'Please describe in at least 20 characters'
    if (!form.category) e.category = 'Please select a category'
    if (!form.currentStage) e.currentStage = 'Please select a current stage'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSubmit(form)
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

  const charCount = form.description.length

  return (
    <div className="iform-page">
      {/* Background decoration */}
      <div className="iform-bg">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
        <div className="bg-blob bg-blob-3"></div>
      </div>

      <div className="iform-container">
        {/* Header */}
        <motion.div
          className="iform-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="back-btn" onClick={onBack} aria-label="Go back">
            ← Back
          </button>
          <div className="iform-logo">
            <span className="logo-icon">◎</span>
            <span className="logo-text">ThinkLens</span>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="iform-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="iform-card-header">
            <div className="iform-steps">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className={`step-dot ${n === 1 ? 'step-active' : ''}`}></div>
              ))}
            </div>
            <h1 className="iform-title">Tell us about your product</h1>
            <p className="iform-subtitle">The more detail you provide, the richer your Design Thinking analysis will be.</p>
          </div>

          <form onSubmit={handleSubmit} className="iform-form" noValidate>
            {/* Product Name */}
            <div className={`field-group ${errors.productName ? 'field-error' : ''}`}>
              <label className="field-label" htmlFor="productName">
                Product Name <span className="required">*</span>
              </label>
              <input
                id="productName"
                type="text"
                className="field-input"
                placeholder="e.g., AirCheck, Notion, Spotify..."
                value={form.productName}
                onChange={e => handleChange('productName', e.target.value)}
                aria-required="true"
                aria-describedby={errors.productName ? 'productName-error' : undefined}
              />
              <AnimatePresence>
                {errors.productName && (
                  <motion.span
                    id="productName-error"
                    className="field-error-msg"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    ⚠ {errors.productName}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Description */}
            <div className={`field-group ${errors.description ? 'field-error' : ''}`}>
              <label className="field-label" htmlFor="description">
                Product Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                className="field-input field-textarea"
                placeholder="Describe what your product does, who it's for, and what problem it solves. The more detail, the better your analysis..."
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
                rows={5}
                aria-required="true"
                aria-describedby={errors.description ? 'description-error' : undefined}
              />
              <div className="char-count">
                <AnimatePresence>
                  {errors.description && (
                    <motion.span className="field-error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      ⚠ {errors.description}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className={`char-num ${charCount > 500 ? 'char-good' : ''}`}>{charCount} chars</span>
              </div>
            </div>

            {/* Category + Stage Row */}
            <div className="field-row">
              {/* Category */}
              <div className={`field-group ${errors.category ? 'field-error' : ''}`}>
                <label className="field-label" htmlFor="category">
                  Category <span className="required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="category"
                    className="field-input field-select"
                    value={form.category}
                    onChange={e => handleChange('category', e.target.value)}
                    aria-required="true"
                  >
                    <option value="">Select a category...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="select-arrow">▾</span>
                </div>
                <AnimatePresence>
                  {errors.category && (
                    <motion.span className="field-error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      ⚠ {errors.category}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Target Market */}
              <div className="field-group">
                <label className="field-label" htmlFor="targetMarket">
                  Target Market <span className="optional">(optional)</span>
                </label>
                <input
                  id="targetMarket"
                  type="text"
                  className="field-input"
                  placeholder="e.g., Freelance designers aged 25-40..."
                  value={form.targetMarket}
                  onChange={e => handleChange('targetMarket', e.target.value)}
                />
              </div>
            </div>

            {/* Current Stage */}
            <div className={`field-group ${errors.currentStage ? 'field-error' : ''}`}>
              <label className="field-label">
                Current Stage <span className="required">*</span>
              </label>
              <div className="stage-grid" role="group" aria-label="Select current stage">
                {STAGES.map(stage => (
                  <button
                    type="button"
                    key={stage.value}
                    className={`stage-btn ${form.currentStage === stage.value ? 'stage-btn--active' : ''}`}
                    onClick={() => handleChange('currentStage', stage.value)}
                    aria-pressed={form.currentStage === stage.value}
                  >
                    <span className="stage-label">{stage.label}</span>
                    <span className="stage-desc">{stage.description}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {errors.currentStage && (
                  <motion.span className="field-error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    ⚠ {errors.currentStage}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Image Upload */}
            <div className="field-group">
              <label className="field-label">
                Product Image / Screenshot <span className="optional">(optional)</span>
              </label>
              <div
                className={`upload-zone ${dragOver ? 'upload-zone--drag' : ''} ${form.imagePreview ? 'upload-zone--has-image' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleImageDrop}
                onClick={() => !form.imagePreview && fileRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Upload product image"
                onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
              >
                {form.imagePreview ? (
                  <div className="upload-preview">
                    <img src={form.imagePreview} alt="Product preview" className="preview-img" />
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={e => { e.stopPropagation(); setForm(prev => ({ ...prev, image: null, imagePreview: null })) }}
                      aria-label="Remove image"
                    >
                      ✕ Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="upload-icon">📸</div>
                    <div className="upload-text">Drop an image here, or <span className="upload-link">browse</span></div>
                    <div className="upload-subtext">PNG, JPG, WEBP up to 10MB</div>
                  </>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageDrop}
                  aria-label="File input"
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Generate Design Thinking Analysis</span>
              <span className="submit-icon">🚀</span>
            </motion.button>

            <p className="submit-note">Your analysis will cover all 6 phases of Design Thinking in detail</p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
