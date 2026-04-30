const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.findFirst();
  const campaign = await prisma.campaign.findFirst({ where: { name: "O Farol de Vidro Quebrado" } });

  if (!user || !campaign) {
    console.error("User or Campaign not found.");
    return;
  }

  await prisma.threat.create({
    data: {
      name: "Sereia Corrompida",
      threatType: "monstruosidade",
      challengeRating: 3.0,
      isTemplate: false,
      userId: user.id,
      campaignId: campaign.id,
      attributes: {
        create: {
          hp: 45,
          ac: 13,
          strength: 12, dexterity: 16, constitution: 14, intelligence: 11, wisdom: 13, charisma: 16,
          speed: "10ft, swim 40ft"
        }
      },
      actions: {
        create: [
          { name: "Canto Hipnótico", description: "A sereia canta uma melodia mágica. Alvos a até 60 pés devem passar em um teste de Sabedoria CD 13 ou ficarem enfeitiçados." },
          { name: "Garras", description: "Ataque Corpo-a-Corpo: +5 para atingir. Dano: 7 (2d4 + 2) cortante." }
        ]
      }
    }
  });

  console.log("Corrupted Mermaid added to 'O Farol de Vidro Quebrado'.");
  process.exit(0);
}

seed();
