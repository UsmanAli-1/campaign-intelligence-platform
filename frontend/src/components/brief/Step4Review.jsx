import { useTheme } from '../../context/ThemeContext'

export default function Step4Review({ form }) {
  const { darkMode } = useTheme()

  const Section = ({ title, items }) => (
    <div className={`rounded-xl p-4 border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
      <h4 className={`text-xs font-bold uppercase tracking-wider mb-3
        ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h4>
      <div className="space-y-2">
        {items.map(({ label, value }) => value ? (
          <div key={label} className="flex gap-2">
            <span className={`text-xs font-medium w-32 shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {label}
            </span>
            <span className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {value}
            </span>
          </div>
        ) : null)}
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Review & Submit
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Review your brief before generating the creative direction
        </p>
      </div>

      <Section title="Client Details" items={[
        { label: 'Client Name', value: form.clientName },
        { label: 'Industry', value: form.industry },
        { label: 'Website', value: form.website },
        { label: 'Competitors', value: form.competitors },
      ]} />

      <Section title="Campaign Info" items={[
        { label: 'Objective', value: form.objective },
        { label: 'Audience', value: form.audience },
        { label: 'Budget', value: form.budget ? `$${Number(form.budget).toLocaleString()}` : '' },
      ]} />

      <Section title="Creative Preferences" items={[
        { label: 'Tone', value: form.tone },
        { label: 'Imagery Style', value: form.imageryStyle },
        { label: 'Color Direction', value: form.colorDirection },
        { label: "Do's", value: form.dos },
        { label: "Don'ts", value: form.donts },
      ]} />

      <div className={`rounded-xl p-4 border border-green-500/30
        ${darkMode ? 'bg-green-900/10' : 'bg-green-50'}`}>
        <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
          ✨ Ready to generate your AI creative brief. Click <strong>Generate Brief</strong> to proceed.
        </p>
      </div>
    </div>
  )
}