const express = require('express')
const router = express.Router()
const { generateBrief } = require('../services/briefGenerator')

// POST /api/brief/generate
router.post('/generate', async (req, res) => {
  try {
    const { clientName, industry, objective, audience, budget } = req.body

    // Basic validation
    if (!clientName || !industry || !objective || !audience || !budget) {
      return res.status(400).json({
        error: 'Missing required fields: clientName, industry, objective, audience, budget'
      })
    }

    // Simulate AI thinking delay (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const brief = generateBrief(req.body)

    res.json({
      data: brief,
      message: 'Creative brief generated successfully.'
    })

  } catch (err) {
    console.error('Brief generation error:', err)
    res.status(500).json({ error: 'Failed to generate brief.' })
  }
})

module.exports = router