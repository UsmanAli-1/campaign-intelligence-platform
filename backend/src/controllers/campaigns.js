const prisma = require('../lib/prisma')

// GET /api/campaigns
const getCampaigns = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      clientId,
      sortBy = 'createdAt',
      sortDir = 'desc',
      search
    } = req.query

    const where = {
      deletedAt: null
    }

    if (status) where.status = status
    if (clientId) where.clientId = clientId
    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }

    const allowedSortFields = ['name', 'budget', 'spend', 'createdAt', 'status']
    const orderBy = allowedSortFields.includes(sortBy)
      ? { [sortBy]: sortDir === 'asc' ? 'asc' : 'desc' }
      : { createdAt: 'desc' }

    const skip = (Number(page) - 1) * Number(limit)

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        include: { client: true },
        orderBy,
        skip,
        take: Number(limit)
      }),
      prisma.campaign.count({ where })
    ])

    res.json({
      data: campaigns,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    })
  } catch (err) {
    console.error('getCampaigns error:', err)
    res.status(500).json({ error: 'Failed to fetch campaigns.' })
  }
}

// GET /api/campaigns/:id
const getCampaignById = async (req, res) => {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: { id: req.params.id, deletedAt: null },
      include: {
        client: true,
        metrics: {
          orderBy: { date: 'asc' },
          take: 30
        }
      }
    })

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found.' })
    }

    res.json({ data: campaign })
  } catch (err) {
    console.error('getCampaignById error:', err)
    res.status(500).json({ error: 'Failed to fetch campaign.' })
  }
}

// POST /api/campaigns
const createCampaign = async (req, res) => {
  try {
    const { name, clientId, status, objective, budget, spend } = req.body

    // Verify client exists
    const client = await prisma.client.findUnique({ where: { id: clientId } })
    if (!client) {
      return res.status(400).json({ error: 'Client not found.' })
    }

    const campaign = await prisma.campaign.create({
      data: {
        name: name.trim(),
        clientId,
        status: status || 'draft',
        objective: objective || null,
        budget: Number(budget),
        spend: Number(spend) || 0
      },
      include: { client: true }
    })

    res.status(201).json({ data: campaign, message: 'Campaign created successfully.' })
  } catch (err) {
    console.error('createCampaign error:', err)
    res.status(500).json({ error: 'Failed to create campaign.' })
  }
}

// PUT /api/campaigns/:id
const updateCampaign = async (req, res) => {
  try {
    const existing = await prisma.campaign.findFirst({
      where: { id: req.params.id, deletedAt: null }
    })

    if (!existing) {
      return res.status(404).json({ error: 'Campaign not found.' })
    }

    const { name, status, objective, budget, spend } = req.body

    const campaign = await prisma.campaign.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name: name.trim() }),
        ...(status && { status }),
        ...(objective && { objective }),
        ...(budget !== undefined && { budget: Number(budget) }),
        ...(spend !== undefined && { spend: Number(spend) })
      },
      include: { client: true }
    })

    res.json({ data: campaign, message: 'Campaign updated successfully.' })
  } catch (err) {
    console.error('updateCampaign error:', err)
    res.status(500).json({ error: 'Failed to update campaign.' })
  }
}

// DELETE /api/campaigns/:id (soft delete)
const deleteCampaign = async (req, res) => {
  try {
    const existing = await prisma.campaign.findFirst({
      where: { id: req.params.id, deletedAt: null }
    })

    if (!existing) {
      return res.status(404).json({ error: 'Campaign not found.' })
    }

    await prisma.campaign.update({
      where: { id: req.params.id },
      data: { deletedAt: new Date() }
    })

    res.json({ message: 'Campaign deleted successfully.' })
  } catch (err) {
    console.error('deleteCampaign error:', err)
    res.status(500).json({ error: 'Failed to delete campaign.' })
  }
}

module.exports = {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
}