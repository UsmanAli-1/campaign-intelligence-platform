import { useTheme } from '../../context/ThemeContext'

const tones = ['Professional', 'Playful', 'Inspirational', 'Luxurious', 'Bold', 'Minimal']
const imageryStyles = ['Photography', 'Illustration', 'Abstract', 'Documentary', 'Product-focused', 'Lifestyle']

export default function Step3Creative({ form, updateForm, errors }) {
  const { darkMode } = useTheme()

  const inputClass = `w-full px-3 py-2.5 rounded-lg border text-sm transition
    ${darkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}
    outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`

  const labelClass = `block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`

  const chipClass = (selected) => `px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition
    ${selected
      ? 'bg-blue-600 text-white border-blue-600'
      : darkMode
        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'}`

  return (
    <div className="space-y-5">
      <div>
        <h2 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Creative Preferences
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Set the creative direction for this campaign
        </p>
      </div>

      {/* Tone */}
      <div>
        <label className={labelClass}>Tone of Voice <span className="text-red-500">*</span></label>
        <div className="flex flex-wrap gap-2">
          {tones.map(t => (
            <button key={t} type="button"
              onClick={() => updateForm({ tone: t })}
              className={chipClass(form.tone === t)}>
              {t}
            </button>
          ))}
        </div>
        {errors.tone && <p className="text-red-500 text-xs mt-1">{errors.tone}</p>}
      </div>

      {/* Imagery Style */}
      <div>
        <label className={labelClass}>Imagery Style</label>
        <div className="flex flex-wrap gap-2">
          {imageryStyles.map(s => (
            <button key={s} type="button"
              onClick={() => updateForm({ imageryStyle: s })}
              className={chipClass(form.imageryStyle === s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color Direction */}
      <div>
        <label className={labelClass}>Color Direction</label>
        <input type="text"
          placeholder="e.g. Soft pastels, rose gold accents, clean whites"
          value={form.colorDirection}
          onChange={e => updateForm({ colorDirection: e.target.value })}
          className={inputClass} />
      </div>

      {/* Dos */}
      <div>
        <label className={labelClass}>Do's ✅</label>
        <textarea
          placeholder="e.g. Show real skin, use natural lighting, diverse representation"
          value={form.dos}
          onChange={e => updateForm({ dos: e.target.value })}
          rows={2}
          className={inputClass} />
      </div>

      {/* Donts */}
      <div>
        <label className={labelClass}>Don'ts ❌</label>
        <textarea
          placeholder="e.g. No heavy filters, avoid competitor color palettes"
          value={form.donts}
          onChange={e => updateForm({ donts: e.target.value })}
          rows={2}
          className={inputClass} />
      </div>
    </div>
  )
}