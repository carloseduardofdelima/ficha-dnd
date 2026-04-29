import { PrismaClient } from '@prisma/client'
import { ITEM_CATALOG_2014 } from '../src/lib/inventory-2014'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Iniciando Migração de Inventário (D&D 2014) ---')

  const characters = await prisma.character.findMany({
    where: { ruleset: '2014' },
    select: {
      id: true,
      name: true,
      inventory: true,
    }
  })

  console.log(`Encontrados ${characters.length} personagens com ruleset 2014.`)

  for (const char of characters) {
    const inventory = char.inventory ? (typeof char.inventory === 'string' ? JSON.parse(char.inventory) : char.inventory) as any[] : []
    let updated = false
    
    const newInventory = inventory.map(entry => {
      const item = entry.item
      const itemId = item.id || ''
      
      // Skip custom items or already migrated items
      if (itemId.startsWith('custom-') || itemId.endsWith('-2014')) return entry

      // Try to find equivalent in 2014 catalog
      // 1. Exact name match
      // 2. ID pattern match (besta-leve -> besta-leve-2014)
      let equivalent = ITEM_CATALOG_2014.find(i => i.name === item.name || i.id === `${itemId}-2014`)

      // Handle special cases
      if (!equivalent && itemId === 'pack-dungeonologista') {
        equivalent = ITEM_CATALOG_2014.find(i => i.id === 'pack-dungeon-2014')
      }
      if (!equivalent && itemId === 'virotes-20') {
        equivalent = ITEM_CATALOG_2014.find(i => i.id === 'virotes-2014')
      }

      if (equivalent) {
        console.log(`  [${char.name}] Migrando: ${item.name} (${itemId}) -> ${equivalent.name} (${equivalent.id})`)
        updated = true
        return {
          ...entry,
          item: equivalent
        }
      }

      return entry
    })

    if (updated) {
      await prisma.character.update({
        where: { id: char.id },
        data: { inventory: JSON.stringify(newInventory) }
      })
      console.log(`✅ Personagem ${char.name} atualizado.`)
    }
  }

  console.log('\n--- Migração Concluída ---')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
