import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const BACKEND_URL = 'http://localhost:5000'

export function useNotifications() {
  const [notifications, setNotifications] = useState([
    // Seed with demo notifications so UI is not empty
    {
      id: 'demo1',
      message: '⚠️ Campaign "Nova Product Reveal": SPEND is above threshold. Current: 61200, Threshold: 60000',
      triggeredAt: new Date(Date.now() - 5 * 60000).toISOString(),
      isRead: false
    },
    {
      id: 'demo2',
      message: '⚠️ Campaign "Peak Summer Challenge": CTR is below threshold. Current: 0.90, Threshold: 1.00',
      triggeredAt: new Date(Date.now() - 15 * 60000).toISOString(),
      isRead: false
    },
    {
      id: 'demo3',
      message: '⚠️ Campaign "Lumiere Summer Launch": SPEND is above threshold. Current: 32450, Threshold: 30000',
      triggeredAt: new Date(Date.now() - 60 * 60000).toISOString(),
      isRead: true
    }
  ])

  useEffect(() => {
    const socket = io(BACKEND_URL, { transports: ['websocket'] })

    socket.on('connect', () => {
      console.log('🔌 Connected to notification server')
    })

    socket.on('new_alert', (alert) => {
      setNotifications(prev => [alert, ...prev])
    })

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from notification server')
    })

    return () => socket.disconnect()
  }, [])

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return { notifications, markAsRead, markAllAsRead, unreadCount }
}