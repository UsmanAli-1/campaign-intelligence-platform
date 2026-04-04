const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const prisma = require('../lib/prisma')

// GET /api/clients
router.get('/', auth, async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { campaigns: true } } }
    })
    res.json({ data: clients })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clients.' })
  }
})

module.exports = router