
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst()
  if (!user) {
    console.error('Nenhum usuário encontrado. Registre-se primeiro!')
    return
  }

  const testChar = await prisma.character.create({
    data: {
      userId: user.id,
      name: 'Hjõnk',
      slug: `hjonk-${Math.floor(Math.random() * 1000)}`,
      race: 'Gnome',
      class: 'Barbarian',
      level: 3,
      background: 'Time-Lost Traveler',
      avatarUrl: 'https://cdn.pixabay.com/photo/2021/07/26/17/57/goose-6494954_1280.jpg',
      strength: 15,
      dexterity: 13,
      constitution: 14,
      intelligence: 10,
      wisdom: 10,
      charisma: 12,
      maxHp: 10,
      currentHp: 10,
      armorClass: 13,
      speed: 10,
      initiative: 1,
      proficiencyBonus: 2,
    }
  })

  console.log('Personagem de teste criado com sucesso:', testChar.name)
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
