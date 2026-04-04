import { useTheme } from '../context/ThemeContext'
import NotificationCenter from './NotificationCenter'

export default function Navbar({ dateRange, setDateRange, onMenuClick }) {
  const { darkMode, setDarkMode } = useTheme()

  const ranges = [
    { label: 'Last 7d', value: 7 },
    { label: 'Last 30d', value: 30 },
    { label: 'Last 90d', value: 90 },
  ]

  return (
    <header className={`h-16 flex items-center justify-between px-4 border-b shrink-0
      ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>

      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className={`lg:hidden p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>

        {/* Date range buttons */}
        <div className="flex items-center gap-1.5">
          {ranges.map(r => (
            <button key={r.value} onClick={() => setDateRange(r.value)}
              className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition
                ${dateRange === r.value
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Date — hidden on small screens */}
        <span className={`hidden md:block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}
        </span>

        {/* Notification Bell */}
        <NotificationCenter />

        {/* Dark mode toggle */}
        <button onClick={() => setDarkMode(!darkMode)}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition
            ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}