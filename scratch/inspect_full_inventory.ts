import { PrismaClient } from '@prisma/client'
import { InventoryEntry } from '../src/lib/inventory'

const prisma = new PrismaClient()

async function main() {
  const characters = await prisma.character.findMany({
    select: {
      name: true,
      class: true,
      level: true,
      armorClass: true,
      inventory: true,
      traits: true,
    }
  })

  for (const char of characters) {
    console.log(`=== ${char.name} (${char.class} ${char.level}) ===`)
    console.log(`Stored AC: ${char.armorClass}`)
    console.log(`Traits: ${char.traits}`)
    
    let inv: InventoryEntry[] = []
    if (char.inventory) {
      try {
        inv = typeof char.inventory === 'string' ? JSON.parse(char.inventory) : char.inventory
      } catch (e) {
        console.error("Parse error", e)
      }
    }
    
    console.log("Inventory:")
    for (const entry of inv) {
      console.log(`  - [${entry.isEquipped ? 'EQUIPPED' : ' '}] ${entry.item.name} (Qty: ${entry.qty}, Category: ${entry.item.category}, ac: ${entry.item.ac}, armorType: ${entry.item.armorType})`)
    }
    console.log('-'.repeat(40))
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
