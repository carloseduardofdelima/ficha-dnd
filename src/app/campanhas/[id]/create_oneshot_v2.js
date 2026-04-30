const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.error("No user found.");
    return;
  }

  // Create Coastal One-shot
  const campaign = await prisma.campaign.create({
    data: {
      name: "O Farol de Vidro Quebrado",
      description: "Um mistério costeiro onde um farol amaldiçoado está atraindo navios para as rochas.",
      type: "oneshot",
      system: "D&D 5e",
      user: { connect: { id: user.id } },
      npcs: {
        create: [
          {
            name: "Capitão Valerius",
            title: "Dono do 'Vento do Leste'",
            type: "aliado",
            description: "Um marinheiro veterano que perdeu sua tripulação para o farol.",
            notes: "Deseja vingança.",
            userId: user.id,
            combat: { create: { hp: 40, ac: 15 } }
          },
          {
            name: "Silas, o Velho Faroleiro",
            title: "Guardião do Farol",
            type: "neutro",
            description: "Um homem que parece ter enlouquecido pelo isolamento.",
            notes: "Sabe como desativar a maldição, mas teme algo nas profundezas.",
            userId: user.id,
            combat: { create: { hp: 20, ac: 11 } }
          },
          {
            name: "Mãe Ondina",
            title: "A Bruxa do Mar",
            type: "inimigo",
            description: "Uma bruxa que tomou o controle do farol para realizar um ritual.",
            notes: "Utiliza ilusões para enganar viajantes.",
            userId: user.id,
            combat: { create: { hp: 52, ac: 17 } }
          }
        ]
      }
    }
  });

  console.log(`New One-shot created: ${campaign.name} (ID: ${campaign.id})`);
  process.exit(0);
}

seed();
