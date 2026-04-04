import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useNotifications } from '../hooks/useNotifications'

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function NotificationCenter() {
  const { darkMode } = useTheme()
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications()
  const [open, setOpen] = useState(false)
  const ref = useRef()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>

      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative w-9 h-9 rounded-full flex items-center justify-center text-base transition
          ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold
            rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className={`absolute right-0 top-12 w-80 sm:w-96 rounded-xl shadow-2xl border z-50
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>

          {/* Header */}
          <div className={`flex items-center justify-between px-4 py-3 border-b
            ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                Mark all read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className={`p-6 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                🎉 No notifications yet
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`px-4 py-3 border-b cursor-pointer transition
                    ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-100 hover:bg-gray-50'}
                    ${!n.isRead
                      ? darkMode ? 'bg-blue-900/20' : 'bg-blue-50/60'
                      : ''}`}>
                  <div className="flex items-start gap-2">
                    {/* Unread dot */}
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0
                      ${!n.isRead ? 'bg-blue-500' : 'bg-transparent'}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {n.message}
                      </p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {timeAgo(n.triggeredAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className={`px-4 py-2.5 text-center border-t
            ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Powered by WebSocket — live alerts
            </span>
          </div>
        </div>
      )}
    </div>
  )
}