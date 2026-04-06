const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  getAlerts,
  markAsRead,
  markAllAsRead,
  createRule,
  getRules
} = require('../controllers/alerts')

router.get('/', auth, getAlerts)
router.patch('/read-all', auth, markAllAsRead)
router.patch('/read/:id', auth, markAsRead)
router.post('/rules', auth, createRule)
router.get('/rules', auth, getRules)

module.exports = router