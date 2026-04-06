const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const http = require('http')
const { Server } = require('socket.io')
const { runAlertEngine } = require('./services/alertEngine')
require('dotenv').config()

const app = express()
const server = http.createServer(app)

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

// Security
// Security
app.use(helmet({
  crossOriginResourcePolicy: false
}))

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://campaign-platform-ai.vercel.app',
      process.env.FRONTEND_URL
    ].filter(Boolean)

    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true)

    // Remove trailing slash for comparison
    const cleanOrigin = origin.replace(/\/$/, '')

    if (allowedOrigins.some(allowed => allowed.replace(/\/$/, '') === cleanOrigin)) {
      callback(null, true)
    } else {
      console.log('CORS blocked origin:', origin)
      console.log('Allowed origins:', allowedOrigins)
      callback(null, true) // temporarily allow all for debugging
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// Handle preflight requests
app.options('*', cors())

app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
})
app.use('/api', limiter)

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/campaigns', require('./routes/campaigns'))
app.use('/api/clients', require('./routes/clients'))
app.use('/api/alerts', require('./routes/alerts'))
app.use('/api/brief', require('./routes/brief'))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Something went wrong.' })
})

// Socket.io connection
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id)
  })
})

// Run alert engine every 30 seconds
setInterval(() => {
  runAlertEngine(io)
}, 30000)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`✅ Backend + WebSocket running on port ${PORT}`)
})