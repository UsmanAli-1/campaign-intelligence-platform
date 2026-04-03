import KPICards from '../components/KPICards'
import PerformanceChart from '../components/PerformanceChart'
import CampaignTable from '../components/CampaignTable'
import { useTheme } from '../context/ThemeContext'
import data from '../data/campaigns.json'

export default function Dashboard({ dateRange, selectedClient }) {
  const { darkMode } = useTheme()

  const campaigns = selectedClient
    ? data.campaigns.filter(c => c.clientId === selectedClient)
    : data.campaigns

  return (
    <main className={`flex-1 overflow-y-auto p-6 space-y-6 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Campaign Dashboard
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {selectedClient
            ? `Showing: ${data.clients.find(c => c.id === selectedClient)?.name}`
            : 'All Clients — Overview'}
        </p>
      </div>

      <KPICards campaigns={campaigns} />
      <PerformanceChart dateRange={dateRange} />
      <CampaignTable campaigns={campaigns} />
    </main>
  )
}