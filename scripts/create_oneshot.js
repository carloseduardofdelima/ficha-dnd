const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.error("No user found.");
    return;
  }

  // Create One-shot Campaign
  const campaign = await prisma.campaign.create({
    data: {
      name: "O Despertar da Forja Ancestral",
      description: "Uma one-shot de exploração e combate em uma antiga forja anã perdida sob as montanhas.",
      type: "oneshot",
      system: "D&D 5e",
      user: { connect: { id: user.id } },
      npcs: {
        create: [
            {
              name: "Thrain Pé-de-Ferro",
              title: "Guia da Expedição",
              type: "aliado",
              description: "Um veterano mineiro anão que busca recuperar o martelo de seu ancestral.",
              notes: "Conhece os túneis externos.",
              userId: user.id,
              combat: { create: { hp: 45, ac: 16 } }
            },
            {
              name: "Elara, a Tecelã de Sombras",
              title: "Misteriosa Ermitã",
              type: "neutro",
              description: "Uma elfa que vive nos arredores da montanha. Ela sabe o segredo para abrir a porta da forja.",
              notes: "Não confia em estranhos, mas odeia os orcs da região.",
              userId: user.id,
              combat: { create: { hp: 30, ac: 13 } }
            },
            {
              name: "Grok, o Traidor",
              title: "Líder dos Saqueadores",
              type: "inimigo",
              description: "Um orc que capturou parte da expedição anterior.",
              notes: "Possui a chave da forja.",
              userId: user.id,
              combat: { create: { hp: 60, ac: 14 } }
            }
        ]
      }
    }
  });

  // Link some threats to the campaign
  const dragon = await prisma.threat.findFirst({ where: { name: "Dragão Vermelho Jovem" } });
  const wolf = await prisma.threat.findFirst({ where: { name: "Lobo Atroz" } });

  if (dragon) {
    await prisma.threat.create({
      data: {
        ...dragon,
        id: undefined, // Let it generate a new ID
        isTemplate: false,
        campaignId: campaign.id,
        attributes: { create: { hp: dragon.hp, ac: dragon.ac } } // Simplified for this script
      }
    }).catch(e => console.log("Note: Simplified threat copy failed, skipping. Need more logic for deep copy."));
  }

  console.log(`One-shot campaign created: ${campaign.name} (ID: ${campaign.id})`);
  process.exit(0);
}

seed();
