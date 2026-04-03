import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const statusColors = {
  active:    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  paused:    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  draft:     'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
}

export default function CampaignTable({ campaigns }) {
  const { darkMode } = useTheme()
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = campaigns
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) ||
                 c.client.toLowerCase().includes(search.toLowerCase()))
    .filter(c => statusFilter === 'all' || c.status === statusFilter)
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      return sortDir === 'asc' ? av - bv : bv - av
    })

  const SortBtn = ({ col }) => (
    <button onClick={() => handleSort(col)} className="ml-1 opacity-60 hover:opacity-100">
      {sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </button>
  )

  return (
    <div className={`rounded-xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Filters */}
      <div className="p-4 flex flex-wrap gap-3 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text" placeholder="Search campaigns..."
          value={search} onChange={e => setSearch(e.target.value)}
          className={`px-3 py-2 rounded-lg border text-sm flex-1 min-w-[200px]
            ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'}`}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className={`px-3 py-2 rounded-lg border text-sm
            ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`border-b ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
              {[
                { label: 'Campaign', key: 'name' },
                { label: 'Client', key: 'client' },
                { label: 'Status', key: 'status' },
                { label: 'Budget', key: 'budget' },
                { label: 'Spend', key: 'spend' },
                { label: 'Impressions', key: 'impressions' },
                { label: 'Clicks', key: 'clicks' },
                { label: 'CTR', key: null },
              ].map(col => (
                <th key={col.label} className="text-left px-4 py-3 font-medium">
                  {col.label}
                  {col.key && <SortBtn col={col.key} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const ctr = c.impressions > 0
                ? ((c.clicks / c.impressions) * 100).toFixed(2) + '%'
                : 'N/A'
              return (
                <tr key={c.id}
                  className={`border-b transition ${darkMode
                    ? 'border-gray-700 hover:bg-gray-750 text-gray-200'
                    : 'border-gray-100 hover:bg-gray-50 text-gray-800'}`}>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.client}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">${c.budget.toLocaleString()}</td>
                  <td className="px-4 py-3">${c.spend.toLocaleString()}</td>
                  <td className="px-4 py-3">{(c.impressions / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3">{(c.clicks / 1000).toFixed(1)}K</td>
                  <td className="px-4 py-3">{ctr}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}