import { useTheme } from '../context/ThemeContext'
import data from '../data/campaigns.json'

export default function Sidebar({ activePage, setActivePage, selectedClient, setSelectedClient }) {
  const { darkMode } = useTheme()

  return (
    <aside className={`w-64 h-screen flex flex-col shrink-0
      ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}
      border-r`}>

      {/* Logo */}
      <div className={`flex items-center px-5 h-16 border-b shrink-0
        ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <span className="text-xl font-bold text-blue-600">AdIntel</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-5">

        {/* Main Nav */}
        <div>
          <p className={`text-xs uppercase font-semibold mb-2 px-2
            ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Main
          </p>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'brief', label: 'Brief Builder', icon: '✍️' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map(item => (
            <button key={item.id} onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition
                ${activePage === item.id && selectedClient === null || activePage === item.id && item.id !== 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : activePage === item.id
                    ? 'bg-blue-600 text-white'
                    : darkMode
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'}`}>
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Clients */}
        <div>
          <p className={`text-xs uppercase font-semibold mb-2 px-2
            ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Clients
          </p>

          {/* All Clients option */}
          <button
            onClick={() => setSelectedClient(null)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1 text-sm transition
              ${selectedClient === null && activePage === 'dashboard'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-medium'
                : darkMode
                  ? 'hover:bg-gray-800 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'}`}>
            <span className="w-7 h-7 rounded-full bg-gray-400 text-white text-xs font-bold flex items-center justify-center shrink-0">
              All
            </span>
            <span>All Clients</span>
            {selectedClient === null && activePage === 'dashboard' && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
            )}
          </button>

          {/* Individual clients */}
          {data.clients.map(client => (
            <button key={client.id}
              onClick={() => setSelectedClient(client.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1 text-sm transition
                ${selectedClient === client.id && activePage === 'dashboard'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-medium'
                  : darkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'}`}>
              <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {client.name[0]}
              </span>
              <span className="truncate text-left">{client.name}</span>
              {selectedClient === client.id && activePage === 'dashboard' && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Campaigns */}
        <div>
          <p className={`text-xs uppercase font-semibold mb-2 px-2
            ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Campaigns
          </p>
          {data.campaigns.map(c => (
            <div key={c.id}
              className={`px-3 py-2 rounded-lg mb-1 text-sm transition cursor-default
                ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
              <p className="truncate font-medium">{c.name}</p>
              <p className={`text-xs truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {c.client}
              </p>
            </div>
          ))}
        </div>

      </nav>
    </aside>
  )
}