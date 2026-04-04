const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const campaigns = await prisma.campaign.findMany({ take: 3 });

  for (const c of campaigns) {
    await prisma.alertRule.createMany({
      data: [
        { campaignId: c.id, metric: 'ctr', operator: 'below', threshold: 1.0 },
        { campaignId: c.id, metric: 'spend', operator: 'above', threshold: 60000 },
      ]
    });
  }

  console.log('Alert rules seeded!');
  await prisma.$disconnect();
}

seed();