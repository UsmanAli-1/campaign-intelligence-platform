import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import data from '../data/campaigns.json'

export default function Sidebar({ activePage, setActivePage, selectedClient, setSelectedClient }) {
  const { darkMode } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 h-screen flex flex-col
      ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}
      border-r`}>

      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && <span className="text-xl font-bold text-blue-600">AdIntel</span>}
        <button onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-6">

        {/* Main Nav */}
        <div>
          {!collapsed && <p className="text-xs uppercase text-gray-400 mb-2 px-2">Main</p>}
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'brief', label: 'Brief Builder', icon: '✍️' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map(item => (
            <button key={item.id} onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm font-medium transition
                ${activePage === item.id
                  ? 'bg-blue-600 text-white'
                  : darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}>
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Clients */}
        {!collapsed && (
          <div>
            <p className="text-xs uppercase text-gray-400 mb-2 px-2">Clients</p>
            {data.clients.map(client => (
              <button key={client.id} onClick={() => setSelectedClient(
                selectedClient === client.id ? null : client.id
              )}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-1 text-sm transition
                  ${selectedClient === client.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                  {client.name[0]}
                </span>
                <span className="truncate">{client.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Campaigns */}
        {!collapsed && (
          <div>
            <p className="text-xs uppercase text-gray-400 mb-2 px-2">Campaigns</p>
            {data.campaigns.slice(0, 4).map(c => (
              <div key={c.id}
                className={`px-3 py-2 rounded-lg mb-1 text-sm transition
                  ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
                <p className="truncate font-medium">{c.name}</p>
                <p className="text-xs text-gray-400">{c.client}</p>
              </div>
            ))}
          </div>
        )}
      </nav>
    </aside>
  )
}