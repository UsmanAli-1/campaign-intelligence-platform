const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { validateCampaign } = require('../middleware/validate')
const {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
} = require('../controllers/campaigns')

// All routes protected by JWT
router.get('/', auth, getCampaigns)
router.get('/:id', auth, getCampaignById)
router.post('/', auth, validateCampaign, createCampaign)
router.put('/:id', auth, updateCampaign)
router.delete('/:id', auth, deleteCampaign)

module.exports = router