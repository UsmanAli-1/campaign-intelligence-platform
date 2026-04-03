import { useTheme } from '../context/ThemeContext'

export default function Navbar({ dateRange, setDateRange }) {
  const { darkMode, setDarkMode } = useTheme()

  const ranges = [
    { label: 'Last 7d', value: 7 },
    { label: 'Last 30d', value: 30 },
    { label: 'Last 90d', value: 90 },
  ]

  return (
    <header className={`h-16 flex items-center justify-between px-6 border-b
      ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>

      <div className="flex items-center gap-2">
        {ranges.map(r => (
          <button key={r.value} onClick={() => setDateRange(r.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition
              ${dateRange === r.value
                ? 'bg-blue-600 text-white'
                : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {r.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <button onClick={() => setDarkMode(!darkMode)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition
            ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}