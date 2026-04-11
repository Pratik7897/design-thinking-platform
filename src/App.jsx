import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import InputForm from './pages/InputForm'
import ProcessingPage from './pages/ProcessingPage'
import Dashboard from './pages/Dashboard'
import { generateAnalysis } from './utils/analysisEngine'
import './App.css'

import InteractiveBackground from './components/InteractiveBackground'

const PAGES = {
  LANDING: 'landing',
  FORM: 'form',
  PROCESSING: 'processing',
  DASHBOARD: 'dashboard',
}

function App() {
  const [page, setPage] = useState(PAGES.LANDING)
  const [productData, setProductData] = useState(null)
  const [analysis, setAnalysis] = useState(null)

  const handleStartAnalysis = () => setPage(PAGES.FORM)

  const handleFormSubmit = async (data) => {
    setProductData(data)
    setPage(PAGES.PROCESSING)
    
    try {
      const result = await generateAnalysis(data)
      setAnalysis(result)
      setPage(PAGES.DASHBOARD)
    } catch (error) {
      console.error('Analysis generation failed:', error)
      alert("Failed to generate analysis. Check console for details.")
      setPage(PAGES.LANDING)
    }
  }

  const handleNewAnalysis = () => {
    setProductData(null)
    setAnalysis(null)
    setPage(PAGES.LANDING)
  }

  return (
    <div className="app">
      <InteractiveBackground />
      {page === PAGES.LANDING && (
        <LandingPage onStart={handleStartAnalysis} />
      )}
      {page === PAGES.FORM && (
        <InputForm onSubmit={handleFormSubmit} onBack={() => setPage(PAGES.LANDING)} />
      )}
      {page === PAGES.PROCESSING && (
        <ProcessingPage productName={productData?.productName} />
      )}
      {page === PAGES.DASHBOARD && analysis && (
        <Dashboard analysis={analysis} productData={productData} onNewAnalysis={handleNewAnalysis} />
      )}
    </div>
  )
}

export default App
