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

  const ctr = totals.clicks > 0
    ? ((totals.clicks / totals.impressions) * 100).toFixed(2)
    : '0.00'

  const roas = totals.spend > 0
    ? ((totals.conversions * 50) / totals.spend).toFixed(2)
    : '0.00'

  const cards = [
    { label: 'Impressions', value: formatNumber(totals.impressions), icon: '👁️', color: 'blue' },
    { label: 'Clicks', value: formatNumber(totals.clicks), icon: '🖱️', color: 'purple' },
    { label: 'CTR', value: ctr + '%', icon: '📈', color: 'green' },
    { label: 'Conversions', value: formatNumber(totals.conversions), icon: '🎯', color: 'orange' },
    { label: 'Spend', value: formatCurrency(totals.spend), icon: '💰', color: 'red' },
    { label: 'ROAS', value: roas + 'x', icon: '⚡', color: 'teal' },
  ]

  const colorMap = {
    blue:   'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    green:  'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    red:    'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    teal:   'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map(card => (
        <div key={card.label}
          className={`rounded-xl p-4 border ${darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'} shadow-sm`}>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3 ${colorMap[card.color]}`}>
            {card.icon}
          </div>
          <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {card.label}
          </p>
          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  )
}