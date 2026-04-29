import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Iniciando Auditoria de Inventário vs Ruleset ---')

  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      ruleset: true,
      inventory: true,
      class: true
    }
  })

  const results: any[] = []

  for (const char of characters) {
    const inventory = char.inventory ? (typeof char.inventory === 'string' ? JSON.parse(char.inventory) : char.inventory) as any[] : []
    const incompatibleItems: string[] = []

    for (const entry of inventory) {
      const item = entry.item
      const itemId = item.id || ''
      
      // Skip custom items
      if (itemId.startsWith('custom-')) continue

      if (char.ruleset === '2014') {
        // If ruleset is 2014, item IDs should usually end in -2014
        if (!itemId.endsWith('-2014')) {
          incompatibleItems.push(`${item.name} (${itemId})`)
        }
      } else {
        // If ruleset is 2024 (or null), item IDs should NOT end in -2014
        if (itemId.endsWith('-2014')) {
          incompatibleItems.push(`${item.name} (${itemId})`)
        }
      }
    }

    if (incompatibleItems.length > 0) {
      results.push({
        id: char.id,
        name: char.name,
        class: char.class,
        ruleset: char.ruleset || '2024 (Default)',
        incompatibleItems
      })
    }
  }

  if (results.length === 0) {
    console.log('\n✅ Nenhum personagem com itens incompatíveis encontrado.')
  } else {
    console.log(`\n❌ Encontrados ${results.length} personagens com itens incompatíveis:\n`)
    results.forEach(res => {
      console.log(`Personagem: ${res.name} (${res.class})`)
      console.log(`Ruleset: ${res.ruleset}`)
      console.log(`Itens Problemáticos:`)
      res.incompatibleItems.forEach((item: string) => console.log(`  - ${item}`))
      console.log('---')
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
