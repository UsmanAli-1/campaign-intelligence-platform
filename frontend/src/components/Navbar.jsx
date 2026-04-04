import { useTheme } from '../context/ThemeContext'
import NotificationCenter from './NotificationCenter'

export default function Navbar({ dateRange, setDateRange, onMenuClick }) {
  const { darkMode, setDarkMode } = useTheme()

  const ranges = [
    { label: '7d', value: 7 },
    { label: '30d', value: 30 },
    { label: '90d', value: 90 },
  ]

  return (
    <header className={`h-16 flex items-center justify-between px-3 sm:px-4 border-b shrink-0 gap-2
      ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>

      {/* LEFT — Hamburger + Date Range */}
      <div className="flex items-center gap-2 min-w-0">

        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className={`lg:hidden p-2 rounded-lg shrink-0
            ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
          <div className="w-4 h-0.5 bg-current mb-1" />
          <div className="w-4 h-0.5 bg-current mb-1" />
          <div className="w-4 h-0.5 bg-current" />
        </button>

        {/* Date range buttons */}
        <div className="flex items-center gap-2">
          {ranges.map(r => (
            <button key={r.value} onClick={() => setDateRange(r.value)}
              className={`px-4 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap
                ${dateRange === r.value
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span className="hidden sm:inline">Last </span>{r.label}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT — Date + Bell + Dark mode */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

        {/* Date — only on md+ */}
        <span className={`hidden md:block text-sm whitespace-nowrap
          ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric'
          })}
        </span>

        {/* Notification Bell */}
        <NotificationCenter />

        {/* Dark mode toggle */}
        <button onClick={() => setDarkMode(!darkMode)}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm sm:text-base transition shrink-0
            ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}