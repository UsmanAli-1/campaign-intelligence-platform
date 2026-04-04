import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { useTheme } from '../context/ThemeContext'
import data from '../data/campaigns.json'

export default function PerformanceChart({ dateRange }) {
  const { darkMode } = useTheme()

  // Correctly slice data based on selected range
  const allMetrics = data.dailyMetrics
  const days = dateRange === 7 ? 7 : dateRange === 90 ? 30 : 30
  const filtered = allMetrics.slice(allMetrics.length - days)

  const chartData = filtered.map(d => ({
    date: d.date.slice(5),
    Impressions: Math.round(d.impressions / 1000),
    Clicks: d.clicks,
    Conversions: d.conversions,
  }))

  return (
    <div className={`rounded-xl p-4 sm:p-5 border shadow-sm
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>

      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm sm:text-base font-semibold
          ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {dateRange}-Day Performance Trend
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full
          ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
          Impressions in thousands (K)
        </span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: darkMode ? '#9CA3AF' : '#6B7280' }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: darkMode ? '#9CA3AF' : '#6B7280' }}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1F2937' : '#fff',
              border: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'),
              borderRadius: '8px',
              color: darkMode ? '#fff' : '#111',
              fontSize: '12px'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="Impressions" stroke="#3B82F6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Clicks" stroke="#8B5CF6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Conversions" stroke="#10B981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}