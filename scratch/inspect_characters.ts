import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      class: true,
      level: true,
      constitution: true,
      maxHp: true,
      race: true,
      subrace: true,
      subclass: true,
      ruleset: true,
      traits: true,
    }
  })

  console.log(`Found ${characters.length} characters in the database:\n`)

  const hitDiceMap: Record<string, number> = {
    'Bárbaro': 12, 'Guerreiro': 10, 'Paladino': 10, 'Patrulheiro': 10,
    'Clérigo': 8, 'Druida': 8, 'Monge': 8, 'Bardo': 8, 'Ladino': 8, 'Bruxo': 8, 'Artesão Arcano': 8,
    'Mago': 6, 'Feiticeiro': 6
  }

  for (const char of characters) {
    const hitDie = hitDiceMap[char.class] || 8
    const conMod = Math.floor((char.constitution - 10) / 2)
    
    // Check for HP bonuses (e.g. Hill Dwarf, Draconic Bloodline, Tough Feat)
    let hpBonusPerLevel = 0
    
    // Hill dwarf (Anão da Colina)
    if (char.race === 'Anão' && char.subrace === 'Anão da Colina') {
      hpBonusPerLevel += 1
    }
    // Draconic sorcerer
    if (char.class === 'Feiticeiro' && (char.subclass === 'Linhagem Dracônica' || char.subclass === 'Draconic Bloodline')) {
      hpBonusPerLevel += 1
    }
    // Tough feat (Robusto)
    let hasTough = false
    try {
      if (char.traits) {
        const traitsObj = typeof char.traits === 'string' ? JSON.parse(char.traits) : char.traits
        // The tough feat might be stored in traits or featureChoices. Let's inspect the traits JSON.
        const traitsStr = JSON.stringify(traitsObj).toLowerCase()
        if (traitsStr.includes('robusto') || traitsStr.includes('tough')) {
          hasTough = true
          hpBonusPerLevel += 2
        }
      }
    } catch (e) {
      // Ignore parse error
    }

    // Level 1 HP: hit die max + con mod + hp bonus
    const level1Hp = hitDie + conMod + hpBonusPerLevel

    // Let's calculate expected values for levels > 1
    // If all average HP:
    const avgHpGain = Math.floor(hitDie / 2) + 1 + conMod + hpBonusPerLevel
    const avgHp = level1Hp + (char.level - 1) * Math.max(1, avgHpGain)

    // Min and Max bounds
    const minHpGain = 1 + conMod + hpBonusPerLevel
    const minHp = level1Hp + (char.level - 1) * Math.max(1, minHpGain)

    const maxHpGain = hitDie + conMod + hpBonusPerLevel
    const maxHp = level1Hp + (char.level - 1) * Math.max(1, maxHpGain)

    console.log(`Character: "${char.name}"`)
    console.log(`  Class: ${char.class} (d${hitDie}), Race: ${char.race} (${char.subrace || 'No subrace'}), Subclass: ${char.subclass || 'None'}, Level: ${char.level}`)
    console.log(`  Constitution: ${char.constitution} (Mod: ${conMod >= 0 ? '+' + conMod : conMod})`)
    console.log(`  HP Bonus/lvl: +${hpBonusPerLevel} (Tough: ${hasTough})`)
    console.log(`  Stored Max HP: ${char.maxHp}`)
    console.log(`  Calculated Level 1 HP: ${level1Hp}`)
    if (char.level > 1) {
      console.log(`  Calculated Range (Levels 1-${char.level}):`)
      console.log(`    Min Possible HP (All 1s): ${minHp}`)
      console.log(`    Avg/Standard HP (Fixed): ${avgHp}`)
      console.log(`    Max Possible HP (All max): ${maxHp}`)
      const isOk = char.maxHp >= minHp && char.maxHp <= maxHp
      console.log(`  Status: ${isOk ? 'OK (Within bounds)' : 'ERROR (Out of bounds)'}`)
    } else {
      const isOk = char.maxHp === level1Hp
      console.log(`  Status: ${isOk ? 'OK' : `ERROR (Should be ${level1Hp})`}`)
    }
    console.log(`  Traits JSON: ${typeof char.traits === 'string' ? char.traits : JSON.stringify(char.traits)}`)
    console.log('-'.repeat(50))
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
