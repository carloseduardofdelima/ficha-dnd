import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const char = await prisma.character.findUnique({
    where: {
      id: 'cmok864ua0001vc4o85qtcjgi',
    },
  });

  if (!char) {
    console.log('Personagem não encontrado.');
    return;
  }

  // Remove avatarUrl or truncate it
  const { avatarUrl, ...rest } = char;
  console.log(JSON.stringify({ ...rest, hasAvatar: !!avatarUrl }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
