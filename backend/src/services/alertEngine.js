const prisma = require('../lib/prisma')

// Checks all alert rules against current campaign data
// Fires socket event if threshold is crossed
async function runAlertEngine(io) {
  try {
    const rules = await prisma.alertRule.findMany({
      include: {
        campaign: {
          include: {
            metrics: {
              orderBy: { date: 'desc' },
              take: 1
            }
          }
        }
      }
    })

    for (const rule of rules) {
      const campaign = rule.campaign
      const latestMetric = campaign.metrics[0]

      if (!latestMetric) continue

      // Calculate current value for the metric
      let currentValue = null

      if (rule.metric === 'ctr') {
        currentValue = latestMetric.clicks > 0 && latestMetric.impressions > 0
          ? (latestMetric.clicks / latestMetric.impressions) * 100
          : 0
      } else if (rule.metric === 'spend') {
        currentValue = campaign.spend
      } else if (rule.metric === 'impressions') {
        currentValue = latestMetric.impressions
      } else if (rule.metric === 'clicks') {
        currentValue = latestMetric.clicks
      } else if (rule.metric === 'conversions') {
        currentValue = latestMetric.conversions
      }

      if (currentValue === null) continue

      // Check if threshold is crossed
      const triggered =
        (rule.operator === 'below' && currentValue < rule.threshold) ||
        (rule.operator === 'above' && currentValue > rule.threshold)

      if (triggered) {
        const message = `⚠️ Campaign "${campaign.name}": ${rule.metric.toUpperCase()} is ${rule.operator} threshold. Current: ${currentValue.toFixed(2)}, Threshold: ${rule.threshold}`

        // Save to DB
        const alert = await prisma.alertHistory.create({
          data: {
            campaignId: campaign.id,
            ruleId: rule.id,
            message,
            isRead: false
          }
        })

        // Emit to all connected clients via socket
        io.emit('new_alert', {
          id: alert.id,
          message: alert.message,
          campaignId: alert.campaignId,
          triggeredAt: alert.triggeredAt,
          isRead: false
        })

        console.log('🔔 Alert fired:', message)
      }
    }
  } catch (err) {
    console.error('Alert engine error:', err)
  }
}

module.exports = { runAlertEngine }