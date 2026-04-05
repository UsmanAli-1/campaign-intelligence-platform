import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import BriefBuilder from './pages/BriefBuilder'
import { useTheme } from './context/ThemeContext'

export default function App() {
  const { darkMode } = useTheme()
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedClient, setSelectedClient] = useState(null)
  const [dateRange, setDateRange] = useState(30)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // When a client is clicked — always go to dashboard
  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId)
    setActivePage('dashboard')
    setSidebarOpen(false)
  }

  const handlePageChange = (page) => {
    setActivePage(page)
    setSidebarOpen(false)
  }

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <Sidebar
          activePage={activePage}
          setActivePage={handlePageChange}
          selectedClient={selectedClient}
          setSelectedClient={handleClientSelect}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Navbar
          dateRange={dateRange}
          setDateRange={setDateRange}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          activePage={activePage}
        />

        {activePage === 'dashboard' && (
          <Dashboard dateRange={dateRange} selectedClient={selectedClient} />
        )}
        {activePage === 'brief' && <BriefBuilder />}
        {activePage === 'settings' && (
          <div className={`flex-1 flex items-center justify-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <p className="text-xl font-medium">⚙️ Settings — Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  )
}