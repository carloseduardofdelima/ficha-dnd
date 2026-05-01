import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getTauron() {
  try {
    const character = await prisma.character.findFirst({
      where: {
        name: {
          contains: 'Tauron',
          mode: 'insensitive',
        },
      },
    });

    if (!character) {
      console.log('Personagem Tauron não encontrado.');
      return;
    }

    console.log(JSON.stringify(character, null, 2));
  } catch (error) {
    console.error('Erro ao buscar Tauron:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getTauron();
