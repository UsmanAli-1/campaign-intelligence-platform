import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import Step1Client from '../components/brief/Step1Client'
import Step2Campaign from '../components/brief/Step2Campaign'
import Step3Creative from '../components/brief/Step3Creative'
import Step4Review from '../components/brief/Step4Review'
import BriefOutput from '../components/brief/BriefOutput'

const STEPS = ['Client Details', 'Campaign Info', 'Creative Preferences', 'Review & Submit']

const initialForm = {
  // Step 1
  clientName: '',
  industry: '',
  website: '',
  competitors: '',
  // Step 2
  objective: '',
  audience: '',
  budget: '',
  // Step 3
  tone: '',
  imageryStyle: '',
  colorDirection: '',
  dos: '',
  donts: '',
}

export default function BriefBuilder() {
  const { darkMode } = useTheme()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState(null)

  const updateForm = (fields) => {
    setForm(prev => ({ ...prev, ...fields }))
    // Clear errors for updated fields
    const clearedErrors = { ...errors }
    Object.keys(fields).forEach(k => delete clearedErrors[k])
    setErrors(clearedErrors)
  }

  const validateStep = () => {
    const newErrors = {}

    if (step === 0) {
      if (!form.clientName.trim()) newErrors.clientName = 'Client name is required.'
      if (!form.industry.trim()) newErrors.industry = 'Industry is required.'
    }

    if (step === 1) {
      if (!form.objective) newErrors.objective = 'Please select an objective.'
      if (!form.audience.trim()) newErrors.audience = 'Target audience is required.'
      if (!form.budget || isNaN(form.budget) || Number(form.budget) <= 0)
        newErrors.budget = 'Please enter a valid budget.'
    }

    if (step === 2) {
      if (!form.tone) newErrors.tone = 'Please select a tone.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1)
  }

  const handleBack = () => {
    setStep(s => s - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/brief/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setAiOutput(data.data)
    } catch (err) {
      console.error('Brief generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Show output after submission
  if (aiOutput) {
    return <BriefOutput output={aiOutput} form={form} onReset={() => {
      setAiOutput(null)
      setForm(initialForm)
      setStep(0)
    }} />
  }

  return (
    <div className={`flex-1 overflow-y-auto p-4 sm:p-6 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            AI Creative Brief Builder
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Fill in the details and get a complete creative direction document
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center mb-8">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition
                  ${i < step ? 'bg-green-500 text-white'
                    : i === step ? 'bg-blue-600 text-white'
                    : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs mt-1 hidden sm:block text-center w-20
                  ${i === step
                    ? darkMode ? 'text-white font-medium' : 'text-gray-800 font-medium'
                    : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4
                  ${i < step ? 'bg-green-500' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className={`rounded-2xl border shadow-sm p-6
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>

          {step === 0 && <Step1Client form={form} updateForm={updateForm} errors={errors} />}
          {step === 1 && <Step2Campaign form={form} updateForm={updateForm} errors={errors} />}
          {step === 2 && <Step3Creative form={form} updateForm={updateForm} errors={errors} />}
          {step === 3 && <Step4Review form={form} />}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button onClick={handleBack} disabled={step === 0}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition
                ${step === 0
                  ? 'opacity-0 pointer-events-none'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              ← Back
            </button>

            {step < 3 ? (
              <button onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Next →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-70">
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Generating Brief...
                  </>
                ) : '✨ Generate Brief'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}