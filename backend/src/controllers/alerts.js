const prisma = require('../lib/prisma')

// GET /api/alerts — get all unread alerts
const getAlerts = async (req, res) => {
  try {
    const alerts = await prisma.alertHistory.findMany({
      orderBy: { triggeredAt: 'desc' },
      take: 50,
      include: {
        rule: true
      }
    })
    res.json({ data: alerts })
  } catch (err) {
    console.error('getAlerts error:', err)
    res.status(500).json({ error: 'Failed to fetch alerts.' })
  }
}

// PATCH /api/alerts/:id/read — mark single alert as read
const markAsRead = async (req, res) => {
  try {
    const alert = await prisma.alertHistory.update({
      where: { id: req.params.id },
      data: { isRead: true }
    })
    res.json({ data: alert, message: 'Alert marked as read.' })
  } catch (err) {
    console.error('markAsRead error:', err)
    res.status(500).json({ error: 'Failed to update alert.' })
  }
}

// PATCH /api/alerts/read-all — mark all as read
const markAllAsRead = async (req, res) => {
  try {
    await prisma.alertHistory.updateMany({
      where: { isRead: false },
      data: { isRead: true }
    })
    res.json({ message: 'All alerts marked as read.' })
  } catch (err) {
    console.error('markAllAsRead error:', err)
    res.status(500).json({ error: 'Failed to update alerts.' })
  }
}

// POST /api/alerts/rules — create alert rule
const createRule = async (req, res) => {
  try {
    const { campaignId, metric, operator, threshold } = req.body

    if (!campaignId || !metric || !operator || threshold === undefined) {
      return res.status(400).json({ error: 'campaignId, metric, operator, threshold are required.' })
    }

    const validMetrics = ['ctr', 'spend', 'impressions', 'clicks', 'conversions']
    const validOperators = ['above', 'below']

    if (!validMetrics.includes(metric)) {
      return res.status(400).json({ error: `metric must be one of: ${validMetrics.join(', ')}` })
    }
    if (!validOperators.includes(operator)) {
      return res.status(400).json({ error: `operator must be one of: ${validOperators.join(', ')}` })
    }

    const campaign = await prisma.campaign.findFirst({
      where: { id: campaignId, deletedAt: null }
    })
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found.' })
    }

    const rule = await prisma.alertRule.create({
      data: { campaignId, metric, operator, threshold: Number(threshold) },
      include: { campaign: true }
    })

    res.status(201).json({ data: rule, message: 'Alert rule created.' })
  } catch (err) {
    console.error('createRule error:', err)
    res.status(500).json({ error: 'Failed to create alert rule.' })
  }
}

// GET /api/alerts/rules — get all rules
const getRules = async (req, res) => {
  try {
    const rules = await prisma.alertRule.findMany({
      include: { campaign: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ data: rules })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rules.' })
  }
}

module.exports = { getAlerts, markAsRead, markAllAsRead, createRule, getRules }