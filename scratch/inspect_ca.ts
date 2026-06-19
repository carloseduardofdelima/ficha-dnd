import { PrismaClient } from '@prisma/client'
import { calculateAC } from '../src/lib/dnd-rules'
import { InventoryEntry } from '../src/lib/inventory'

const prisma = new PrismaClient()

async function main() {
  console.log('=== CHECKING CHARACTERS (PLAYERS) ===')
  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      class: true,
      level: true,
      strength: true,
      dexterity: true,
      constitution: true,
      intelligence: true,
      wisdom: true,
      charisma: true,
      armorClass: true,
      inventory: true,
      traits: true,
    }
  })

  for (const char of characters) {
    let inventoryList: InventoryEntry[] = []
    if (char.inventory) {
      try {
        inventoryList = typeof char.inventory === 'string' ? JSON.parse(char.inventory) : char.inventory
      } catch (e) {}
    }

    let traitsObj: any = {}
    if (char.traits) {
      try {
        traitsObj = typeof char.traits === 'string' ? JSON.parse(char.traits) : char.traits
      } catch (e) {}
    }

    const calculatedAC = calculateAC(
      char.class,
      {
        strength: char.strength,
        dexterity: char.dexterity,
        constitution: char.constitution,
        intelligence: char.intelligence,
        wisdom: char.wisdom,
        charisma: char.charisma,
      },
      inventoryList,
      traitsObj
    )

    console.log(`Character: "${char.name}" (Level ${char.level} ${char.class})`)
    console.log(`  Stored AC: ${char.armorClass} | Calculated: ${calculatedAC}`)
    const equipped = inventoryList.filter(e => e.isEquipped).map(e => `${e.item.name}`)
    console.log(`  Equipped: [${equipped.join(', ')}]`)
    console.log(`  Status: ${char.armorClass === calculatedAC ? 'OK' : 'DISCREPANCY'}`)
  }

  console.log('\n=== CHECKING THREATS (AMEAÇAS) ===')
  const threats = await prisma.threat.findMany({
    include: {
      attributes: true
    }
  })
  for (const t of threats) {
    console.log(`Threat: "${t.name}" (Type: ${t.threatType}) | CA: ${t.attributes?.ac ?? 'N/A'}`)
  }

  console.log('\n=== CHECKING NPCS ===')
  const npcs = await prisma.npc.findMany({
    include: {
      combat: true
    }
  })
  for (const npc of npcs) {
    console.log(`NPC: "${npc.name}" | CA: ${npc.combat?.ac ?? 'N/A'}`)
  }

  console.log('\n=== CHECKING ACTIVE COMBAT PARTICIPANTS ===')
  const participants = await prisma.combatParticipant.findMany({
    include: {
      stats: true
    }
  })
  for (const p of participants) {
    console.log(`Participant: "${p.name}" (Type: ${p.entityType}) | CA Stored: ${p.stats?.ac ?? 'N/A'}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
