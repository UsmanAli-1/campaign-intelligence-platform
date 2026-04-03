const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@agency.com' },
    update: {},
    create: {
      email: 'admin@agency.com',
      password: hashedPassword,
      name: 'Admin User'
    }
  });
  console.log('✅ User created:', user.email);

  // Create clients
  const lumiere = await prisma.client.create({
    data: { name: 'Lumiere Skincare', industry: 'Beauty', website: 'lumiere.com' }
  });
  const nova = await prisma.client.create({
    data: { name: 'Nova Tech', industry: 'Technology', website: 'novatech.io' }
  });
  const peak = await prisma.client.create({
    data: { name: 'Peak Fitness', industry: 'Health & Fitness', website: 'peakfit.com' }
  });
  console.log('✅ Clients created');

  // Create campaigns
  const campaigns = await Promise.all([
    prisma.campaign.create({
      data: {
        name: 'Lumiere Summer Launch',
        status: 'active',
        objective: 'awareness',
        budget: 50000,
        spend: 32450,
        clientId: lumiere.id
      }
    }),
    prisma.campaign.create({
      data: {
        name: 'Nova Product Reveal',
        status: 'active',
        objective: 'consideration',
        budget: 75000,
        spend: 61200,
        clientId: nova.id
      }
    }),
    prisma.campaign.create({
      data: {
        name: 'Peak Summer Challenge',
        status: 'paused',
        objective: 'conversion',
        budget: 30000,
        spend: 28900,
        clientId: peak.id
      }
    }),
    prisma.campaign.create({
      data: {
        name: 'Lumiere Winter Glow',
        status: 'draft',
        objective: 'awareness',
        budget: 40000,
        spend: 0,
        clientId: lumiere.id
      }
    })
  ]);
  console.log('✅ Campaigns created');

  // Create 30 days of metrics for each campaign
  for (const campaign of campaigns) {
    const metricsData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      metricsData.push({
        campaignId: campaign.id,
        date,
        impressions: Math.floor(Math.random() * 80000) + 20000,
        clicks:      Math.floor(Math.random() * 4000)  + 500,
        conversions: Math.floor(Math.random() * 200)   + 20,
        spend:       Math.floor(Math.random() * 1500)  + 300
      });
    }
    await prisma.campaignMetric.createMany({ data: metricsData });
  }
  console.log('✅ 30-day metrics created for all campaigns');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });