const validateCampaign = (req, res, next) => {
  const { name, budget, clientId, status, objective } = req.body

  const errors = []

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('name is required and must be at least 2 characters.')
  }

  if (!budget || isNaN(budget) || Number(budget) <= 0) {
    errors.push('budget is required and must be a positive number.')
  }

  if (!clientId || typeof clientId !== 'string') {
    errors.push('clientId is required.')
  }

  const validStatuses = ['active', 'paused', 'completed', 'draft']
  if (status && !validStatuses.includes(status)) {
    errors.push(`status must be one of: ${validStatuses.join(', ')}`)
  }

  const validObjectives = ['awareness', 'consideration', 'conversion']
  if (objective && !validObjectives.includes(objective)) {
    errors.push(`objective must be one of: ${validObjectives.join(', ')}`)
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

module.exports = { validateCampaign }