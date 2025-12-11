import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create default settings if not exists
  const existingSettings = await prisma.settings.findFirst();
  
  if (!existingSettings) {
    const settings = await prisma.settings.create({
      data: {
        dailyCapacity: 2,
      },
    });
    console.log('✅ Created settings:', settings);
  } else {
    console.log('✅ Settings already exist:', existingSettings);
  }

  console.log('✅ Created settings:', settings);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

