const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.error("No user found to associate threats.");
    return;
  }

  const threatsData = [
    {
      name: "Dragão Vermelho Jovem",
      threatType: "dragao",
      challengeRating: "10",
      isTemplate: true,
      userId: user.id,
      attributes: {
        create: {
          hp: 178,
          ac: 18,
          str: 23, dex: 10, con: 21, int: 14, wis: 11, cha: 19,
          speed: "40ft, fly 80ft",
          senses: "Blindsight 30ft, Darkvision 120ft",
          languages: "Common, Draconic"
        }
      },
      actions: {
        create: [
          { name: "Sopro de Fogo", description: "O dragão exala fogo em um cone de 30 pés. Cada criatura deve fazer um teste de Destreza CD 17, sofrendo 56 (16d6) de dano de fogo." },
          { name: "Mordida", description: "Ataque Corpo-a-Corpo com Arma: +10 para atingir, alcance 10 pés. Dano: 17 (2d10 + 6) perfurante + 3 (1d6) de fogo." }
        ]
      }
    },
    {
      name: "Lobo Atroz",
      threatType: "besta",
      challengeRating: "1",
      isTemplate: true,
      userId: user.id,
      attributes: {
        create: {
          hp: 37,
          ac: 13,
          str: 17, dex: 15, con: 15, int: 3, wis: 12, cha: 7,
          speed: "50ft",
          senses: "Passive Perception 13",
          languages: "--"
        }
      }
    },
    {
      name: "Elemental do Fogo",
      threatType: "elemental",
      challengeRating: "5",
      isTemplate: true,
      userId: user.id,
      attributes: {
        create: {
          hp: 102,
          ac: 13,
          str: 10, dex: 17, con: 16, int: 6, wis: 10, cha: 7,
          speed: "50ft",
          senses: "Darkvision 60ft",
          languages: "Ignan"
        }
      }
    }
  ];

  for (const t of threatsData) {
    await prisma.threat.create({ data: t });
  }

  console.log("3 new threat templates created.");
  process.exit(0);
}

seed();
