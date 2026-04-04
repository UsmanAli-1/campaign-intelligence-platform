const { v4: uuidv4 } = require('uuid')

const logger = (req, res, next) => {
  const requestId = uuidv4()
  req.requestId = requestId

  const start = Date.now()
  const timestamp = new Date().toISOString()

  console.log(`[${timestamp}] REQ ${requestId} — ${req.method} ${req.path}`, 
    Object.keys(req.body).length ? JSON.stringify(req.body) : '')

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`[${new Date().toISOString()}] RES ${requestId} — ${res.statusCode} (${duration}ms)`)
  })

  // Attach requestId to response headers
  res.setHeader('X-Request-ID', requestId)
  next()
}

module.exports = logger