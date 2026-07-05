import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Buscando Draxis...');
  const characters = await prisma.character.findMany({
    where: {
      name: {
        contains: 'draxis',
        mode: 'insensitive',
      },
    },
  });

  console.log('Resultados encontrados:', characters.length);
  for (const char of characters) {
    console.log(JSON.stringify(char, null, 2));
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
