import { useTheme } from '../context/ThemeContext'

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

function formatCurrency(num) {
  return '$' + num.toLocaleString()
}

export default function KPICards({ campaigns }) {
  const { darkMode } = useTheme()

  const totals = campaigns.reduce((acc, c) => ({
    impressions: acc.impressions + c.impressions,
    clicks: acc.clicks + c.clicks,
    conversions: acc.conversions + c.conversions,
    spend: acc.spend + c.spend,
    budget: acc.budget + c.budget,
  }), { impressions: 0, clicks: 0, conversions: 0, spend: 0, budget: 0 })

  const ctr = totals.impressions > 0
    ? ((totals.clicks / totals.impressions) * 100).toFixed(2)
    : '0.00'

  const roas = totals.spend > 0
    ? ((totals.conversions * 50) / totals.spend).toFixed(2)
    : '0.00'

  const cards = [
    { label: 'Impressions', value: formatNumber(totals.impressions), icon: '👁️', bg: 'bg-blue-500' },
    { label: 'Clicks', value: formatNumber(totals.clicks), icon: '🖱️', bg: 'bg-purple-500' },
    { label: 'CTR', value: ctr + '%', icon: '📈', bg: 'bg-green-500' },
    { label: 'Conversions', value: formatNumber(totals.conversions), icon: '🎯', bg: 'bg-orange-500' },
    { label: 'Spend', value: formatCurrency(totals.spend), icon: '💰', bg: 'bg-red-500' },
    { label: 'ROAS', value: roas + 'x', icon: '⚡', bg: 'bg-teal-500' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map(card => (
        <div key={card.label}
          className={`rounded-xl p-4 border shadow-sm
            ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3 ${card.bg} bg-opacity-15`}>
            {card.icon}
          </div>
          <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {card.label}
          </p>
          <p className={`text-lg font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  )
}