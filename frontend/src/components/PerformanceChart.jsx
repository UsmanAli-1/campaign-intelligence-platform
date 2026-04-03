import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTheme } from '../context/ThemeContext'
import data from '../data/campaigns.json'

export default function PerformanceChart({ dateRange }) {
  const { darkMode } = useTheme()

  const filtered = data.dailyMetrics.slice(
    dateRange === 7 ? 23 : dateRange === 90 ? 0 : 0,
    30
  )

  const chartData = filtered.map(d => ({
    date: d.date.slice(5),
    Impressions: Math.round(d.impressions / 1000),
    Clicks: d.clicks,
    Conversions: d.conversions,
  }))

  return (
    <div className={`rounded-xl p-5 border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-base font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        30-Day Performance Trend
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: darkMode ? '#9CA3AF' : '#6B7280' }} />
          <YAxis tick={{ fontSize: 11, fill: darkMode ? '#9CA3AF' : '#6B7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1F2937' : '#fff',
              border: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'),
              borderRadius: '8px',
              color: darkMode ? '#fff' : '#111'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="Impressions" stroke="#3B82F6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Clicks" stroke="#8B5CF6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Conversions" stroke="#10B981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}