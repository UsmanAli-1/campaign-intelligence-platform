// Simulated AI brief generator
// Produces realistic structured output without any API cost

function generateBrief(form) {
  const { clientName, industry, objective, audience, budget, tone, imageryStyle, colorDirection } = form

  const objectiveMap = {
    awareness: { focus: 'brand recognition and reach', cta: 'Learn More' },
    consideration: { focus: 'engagement and interest', cta: 'Explore Now' },
    conversion: { focus: 'driving purchase decisions', cta: 'Shop Now' },
  }

  const obj = objectiveMap[objective] || objectiveMap['awareness']

  const channelMap = {
    awareness: [
      { channel: 'Instagram', allocation: 35 },
      { channel: 'YouTube', allocation: 25 },
      { channel: 'TikTok', allocation: 20 },
      { channel: 'Display Ads', allocation: 20 },
    ],
    consideration: [
      { channel: 'Instagram', allocation: 30 },
      { channel: 'Google Search', allocation: 25 },
      { channel: 'Facebook', allocation: 25 },
      { channel: 'YouTube', allocation: 20 },
    ],
    conversion: [
      { channel: 'Google Search', allocation: 35 },
      { channel: 'Facebook', allocation: 30 },
      { channel: 'Instagram', allocation: 20 },
      { channel: 'Retargeting', allocation: 15 },
    ],
  }

  const channels = channelMap[objective] || channelMap['awareness']

  return {
    campaignTitle: `${clientName} — ${tone || 'Bold'} ${objective.charAt(0).toUpperCase() + objective.slice(1)} Campaign`,

    headlines: [
      `Discover the ${industry} Experience You've Been Waiting For`,
      `${clientName}: Where ${tone || 'Innovation'} Meets ${industry}`,
      `Transform Your World with ${clientName}`,
    ],

    toneGuide: {
      primary: tone || 'Professional',
      description: `The brand voice should feel ${(tone || 'professional').toLowerCase()} and authentic, speaking directly to ${audience}. Every message should reinforce ${obj.focus}.`,
      doList: form.dos ? form.dos.split(',').map(d => d.trim()).filter(Boolean) : ['Be authentic', 'Use clear messaging', 'Highlight key benefits'],
      dontList: form.donts ? form.donts.split(',').map(d => d.trim()).filter(Boolean) : ['Avoid jargon', 'No misleading claims'],
    },

    visualDirection: {
      imageryStyle: imageryStyle || 'Photography',
      colorPalette: colorDirection || `Clean whites with ${industry.toLowerCase()} accent colors`,
      heroImageConcept: `A ${(imageryStyle || 'photography').toLowerCase()} hero shot featuring the essence of ${clientName}'s ${industry} offering — shot in natural light with ${colorDirection || 'a fresh, modern palette'} — evoking emotion and aspirational lifestyle for ${audience}.`,
      moodKeywords: [tone || 'Fresh', 'Authentic', 'Premium', 'Relatable'],
    },

    channels: channels.map(c => ({
      ...c,
      budget: Math.round((Number(budget) * c.allocation) / 100),
    })),

    contentIdeas: [
      `Hero video (30s): "${clientName} — A Day in the Life" featuring real customers from ${audience}`,
      `Carousel post: "5 Reasons ${industry} Enthusiasts Love ${clientName}"`,
      `Story series: Behind-the-scenes of ${clientName}'s process and values`,
      `User-generated content campaign: #My${clientName.replace(/\s/g, '')}Story`,
      `Educational blog content targeting ${audience} pain points`,
    ],

    messagingStrategy: `Lead with ${obj.focus} as the primary message. Speak directly to ${audience} using ${(tone || 'authentic').toLowerCase()} language. Each touchpoint should build trust and consistently drive toward the CTA: "${obj.cta}". Budget of $${Number(budget).toLocaleString()} should be allocated across channels to maximize ${objective} metrics.`,

    generatedAt: new Date().toISOString(),
  }
}

module.exports = { generateBrief }