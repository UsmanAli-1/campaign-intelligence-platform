const express = require('express')
const cors = require('cors')
const logger = require('./middleware/logger')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

// Routes
app.use('/generate', require('./routes/generate'))

// GET /health
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AI Content Generation Microservice',
    model: process.env.ANTHROPIC_API_KEY ? 'claude-sonnet-4-20250514' : 'simulated',
    mode: process.env.ANTHROPIC_API_KEY ? 'live' : 'simulated',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /generate/copy',
      'POST /generate/social',
      'POST /generate/hashtags',
      'GET  /health'
    ]
  })
})

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Something went wrong.' })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`✅ AI Microservice running on port ${PORT}`)
  console.log(`   Mode: ${process.env.ANTHROPIC_API_KEY ? 'LIVE' : 'SIMULATED'}`)
})