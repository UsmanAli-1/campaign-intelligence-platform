// Simulated AI content generator
// Mimics real LLM responses with realistic advertising copy
// Replace generateWithAI() with real Anthropic/OpenAI call when API key available

function simulateDelay(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// POST /generate/copy
async function generateCopy({ product, tone, platform, word_limit }) {
  await simulateDelay(800)

  const toneMap = {
    professional: { adj: 'industry-leading', verb: 'discover' },
    playful:      { adj: 'amazing', verb: 'explore' },
    luxurious:    { adj: 'exclusive', verb: 'experience' },
    bold:         { adj: 'game-changing', verb: 'unleash' },
    minimal:      { adj: 'essential', verb: 'find' },
  }

  const t = toneMap[tone?.toLowerCase()] || toneMap['professional']

  const platformCTA = {
    instagram: 'Tap to shop →',
    facebook:  'Learn More',
    google:    'Shop Now',
    tiktok:    'Watch & Shop',
    twitter:   'See why →',
  }

  return {
    headline: `${t.verb.charAt(0).toUpperCase() + t.verb.slice(1)} the ${t.adj} ${product}`,
    body: `${product} is redefining what's possible. Built for those who demand more, our ${t.adj} solution delivers results that speak for themselves. ${tone === 'playful' ? 'Ready to have some fun?' : 'Are you ready to elevate your experience?'} Join thousands who already made the switch.`.slice(0, word_limit || 200),
    cta: platformCTA[platform?.toLowerCase()] || 'Learn More',
  }
}

// POST /generate/social
async function generateSocial({ platform, campaign_goal, brand_voice }) {
  await simulateDelay(600)

  const goal = campaign_goal || 'awareness'
  const voice = brand_voice || 'professional'

  const captions = [
    `✨ This is what ${goal} looks like in ${new Date().getFullYear()}. Are you in? #${voice}Brand`,
    `We didn't come this far to only come this far. Elevate your ${goal} game today. 🚀`,
    `The secret to better ${goal}? It starts here. Swipe to see why thousands trust us. →`,
    `Real results. Real people. Real ${goal}. See the difference for yourself. 💫`,
    `Your ${goal} journey starts with one decision. Make it count. Link in bio. 🔗`,
  ]

  return { platform, campaign_goal, brand_voice, captions }
}

// POST /generate/hashtags
async function generateHashtags({ content, industry }) {
  await simulateDelay(400)

  const industryTags = {
    beauty:      ['#BeautyTips', '#SkincareRoutine', '#GlowUp', '#BeautyBlogger', '#SkincareCommunity'],
    technology:  ['#TechNews', '#Innovation', '#FutureTech', '#TechTrends', '#DigitalTransformation'],
    fitness:     ['#FitnessGoals', '#WorkoutMotivation', '#HealthyLifestyle', '#FitLife', '#GymLife'],
    food:        ['#Foodie', '#FoodPhotography', '#Delicious', '#FoodBlogger', '#Yummy'],
    fashion:     ['#OOTD', '#FashionStyle', '#Trending', '#FashionBlogger', '#StyleInspo'],
  }

  const genericTags = ['#Marketing', '#Digital', '#Brand', '#Creative', '#Campaign']

  const specific = industryTags[industry?.toLowerCase()] || genericTags
  const contentWord = content?.split(' ')[0] || 'Campaign'

  const hashtags = [
    ...specific,
    `#${contentWord.replace(/[^a-zA-Z]/g, '')}`,
    '#AdvertisingAgency',
    '#ContentMarketing',
    '#SocialMediaMarketing',
    '#DigitalMarketing',
  ].slice(0, 10)

  return { content, industry, hashtags }
}

module.exports = { generateCopy, generateSocial, generateHashtags }