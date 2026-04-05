import { useTheme } from '../../context/ThemeContext'

const objectives = [
  { value: 'awareness', label: 'Awareness', icon: '📢', desc: 'Reach new audiences' },
  { value: 'consideration', label: 'Consideration', icon: '🤔', desc: 'Drive engagement' },
  { value: 'conversion', label: 'Conversion', icon: '🎯', desc: 'Generate sales' },
]

export default function Step2Campaign({ form, updateForm, errors }) {
  const { darkMode } = useTheme()

  const inputClass = `w-full px-3 py-2.5 rounded-lg border text-sm transition
    ${darkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}
    outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`

  const labelClass = `block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`

  return (
    <div className="space-y-5">
      <div>
        <h2 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Campaign Information
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Define the campaign goals and target audience
        </p>
      </div>

      {/* Objective */}
      <div>
        <label className={labelClass}>
          Campaign Objective <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {objectives.map(obj => (
            <button key={obj.value} type="button"
              onClick={() => updateForm({ objective: obj.value })}
              className={`p-2.5 rounded-xl border text-center transition
                ${form.objective === obj.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : darkMode
                    ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50'}`}>
              <div className="text-xl mb-1">{obj.icon}</div>
              <div className={`text-xs font-semibold leading-tight mb-0.5
                ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {obj.label}
              </div>
              <div className={`text-xs leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {obj.desc}
              </div>
            </button>
          ))}
        </div>
        {errors.objective && (
          <p className="text-red-500 text-xs mt-1">{errors.objective}</p>
        )}
      </div>

      {/* Audience */}
      <div>
        <label className={labelClass}>
          Target Audience <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="e.g. Women 25-40, interested in skincare and wellness, urban areas"
          value={form.audience}
          onChange={e => updateForm({ audience: e.target.value })}
          rows={3}
          className={inputClass} />
        {errors.audience && (
          <p className="text-red-500 text-xs mt-1">{errors.audience}</p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label className={labelClass}>
          Campaign Budget (USD) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm
            ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>$</span>
          <input type="number" placeholder="50000"
            value={form.budget}
            onChange={e => updateForm({ budget: e.target.value })}
            className={inputClass + ' pl-7'} />
        </div>
        {errors.budget && (
          <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
        )}
      </div>
    </div>
  )
}