const express = require('express')
const router = express.Router()
const { generateCopy, generateSocial, generateHashtags } = require('../services/generator')

// POST /generate/copy — with SSE streaming support
router.post('/copy', async (req, res) => {
  const { product, tone, platform, word_limit } = req.body

  if (!product || !tone || !platform) {
    return res.status(400).json({
      requestId: req.requestId,
      error: 'product, tone, and platform are required.'
    })
  }

  // Check if client wants SSE streaming
  const wantsStream = req.headers.accept === 'text/event-stream'

  if (wantsStream) {
    // SSE streaming response
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Request-ID', req.requestId)
    res.flushHeaders()

    try {
      // Stream chunks with delays to simulate token streaming
      const chunks = [
        { type: 'start', message: 'Generating copy...' },
        { type: 'chunk', field: 'headline', value: `Discover the amazing ${product}` },
        { type: 'chunk', field: 'body', value: `${product} is redefining what's possible...` },
        { type: 'chunk', field: 'cta', value: platform === 'instagram' ? 'Tap to shop →' : 'Learn More' },
        { type: 'done', data: await generateCopy({ product, tone, platform, word_limit }) },
      ]

      for (const chunk of chunks) {
        res.write(`data: ${JSON.stringify(chunk)}\n\n`)
        await new Promise(r => setTimeout(r, 300))
      }

      res.write('data: [DONE]\n\n')
      res.end()
    } catch (err) {
      res.write(`data: ${JSON.stringify({ type: 'error', message: err.message })}\n\n`)
      res.end()
    }

  } else {
    // Regular JSON response
    try {
      const result = await generateCopy({ product, tone, platform, word_limit })
      res.json({ requestId: req.requestId, data: result })
    } catch (err) {
      res.status(500).json({ requestId: req.requestId, error: 'Generation failed.' })
    }
  }
})

// POST /generate/social
router.post('/social', async (req, res) => {
  const { platform, campaign_goal, brand_voice } = req.body

  if (!platform || !campaign_goal) {
    return res.status(400).json({
      requestId: req.requestId,
      error: 'platform and campaign_goal are required.'
    })
  }

  try {
    const result = await generateSocial({ platform, campaign_goal, brand_voice })
    res.json({ requestId: req.requestId, data: result })
  } catch (err) {
    res.status(500).json({ requestId: req.requestId, error: 'Generation failed.' })
  }
})

// POST /generate/hashtags
router.post('/hashtags', async (req, res) => {
  const { content, industry } = req.body

  if (!content || !industry) {
    return res.status(400).json({
      requestId: req.requestId,
      error: 'content and industry are required.'
    })
  }

  try {
    const result = await generateHashtags({ content, industry })
    res.json({ requestId: req.requestId, data: result })
  } catch (err) {
    res.status(500).json({ requestId: req.requestId, error: 'Generation failed.' })
  }
})

module.exports = router