import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import { useTheme } from './context/ThemeContext'

export default function App() {
  const { darkMode } = useTheme()
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedClient, setSelectedClient] = useState(null)
  const [dateRange, setDateRange] = useState(30)

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar dateRange={dateRange} setDateRange={setDateRange} />
        {activePage === 'dashboard' && (
          <Dashboard dateRange={dateRange} selectedClient={selectedClient} />
        )}
        {activePage === 'brief' && (
          <div className={`flex-1 flex items-center justify-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <p className="text-xl font-medium">✍️ Brief Builder — Coming in Phase 4</p>
          </div>
        )}
        {activePage === 'settings' && (
          <div className={`flex-1 flex items-center justify-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <p className="text-xl font-medium">⚙️ Settings — Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  )
}