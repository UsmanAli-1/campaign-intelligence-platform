import { useTheme } from '../../context/ThemeContext'

export default function Step1Client({ form, updateForm, errors }) {
  const { darkMode } = useTheme()

  const inputClass = `w-full px-3 py-2.5 rounded-lg border text-sm transition
    ${darkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500'}
    outline-none focus:ring-2 focus:ring-blue-500/20`

  const labelClass = `block text-sm font-medium mb-1.5
    ${darkMode ? 'text-gray-300' : 'text-gray-700'}`

  return (
    <div className="space-y-5">
      <div>
        <h2 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Client Details
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Tell us about the client you're creating this brief for
        </p>
      </div>

      <div>
        <label className={labelClass}>Client Name <span className="text-red-500">*</span></label>
        <input type="text" placeholder="e.g. Lumiere Skincare"
          value={form.clientName}
          onChange={e => updateForm({ clientName: e.target.value })}
          className={inputClass} />
        {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
      </div>

      <div>
        <label className={labelClass}>Industry <span className="text-red-500">*</span></label>
        <input type="text" placeholder="e.g. Beauty, Technology, Finance"
          value={form.industry}
          onChange={e => updateForm({ industry: e.target.value })}
          className={inputClass} />
        {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
      </div>

      <div>
        <label className={labelClass}>Website</label>
        <input type="text" placeholder="e.g. lumiere.com"
          value={form.website}
          onChange={e => updateForm({ website: e.target.value })}
          className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Key Competitors</label>
        <textarea placeholder="e.g. The Ordinary, CeraVe, Neutrogena"
          value={form.competitors}
          onChange={e => updateForm({ competitors: e.target.value })}
          rows={3}
          className={inputClass} />
      </div>
    </div>
  )
}