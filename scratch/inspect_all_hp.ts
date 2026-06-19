import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('=== CHECKING CHARACTERS ===')
  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      class: true,
      level: true,
      constitution: true,
      maxHp: true,
      currentHp: true,
      race: true,
      subrace: true,
      subclass: true,
      ruleset: true,
      traits: true,
    }
  })

  const hitDiceMap: Record<string, number> = {
    'Bárbaro': 12, 'Guerreiro': 10, 'Paladino': 10, 'Patrulheiro': 10,
    'Clérigo': 8, 'Druida': 8, 'Monge': 8, 'Bardo': 8, 'Ladino': 8, 'Bruxo': 8, 'Artesão Arcano': 8,
    'Mago': 6, 'Feiticeiro': 6
  }

  for (const char of characters) {
    const hitDie = hitDiceMap[char.class] || 8
    const conMod = Math.floor((char.constitution - 10) / 2)
    let hpBonusPerLevel = 0
    
    if (char.race === 'Anão' && char.subrace === 'Anão da Colina') {
      hpBonusPerLevel += 1
    }
    if (char.class === 'Feiticeiro' && (char.subclass === 'Linhagem Dracônica' || char.subclass === 'Draconic Bloodline')) {
      hpBonusPerLevel += 1
    }
    let hasTough = false
    try {
      if (char.traits) {
        const traitsObj = typeof char.traits === 'string' ? JSON.parse(char.traits) : char.traits
        const traitsStr = JSON.stringify(traitsObj).toLowerCase()
        if (traitsStr.includes('robusto') || traitsStr.includes('tough')) {
          hasTough = true
          hpBonusPerLevel += 2
        }
      }
    } catch (e) {}

    const level1Hp = hitDie + conMod + hpBonusPerLevel
    const avgHpGain = Math.floor(hitDie / 2) + 1 + conMod + hpBonusPerLevel
    const avgHp = level1Hp + (char.level - 1) * Math.max(1, avgHpGain)
    const minHpGain = 1 + conMod + hpBonusPerLevel
    const minHp = level1Hp + (char.level - 1) * Math.max(1, minHpGain)
    const maxHpGain = hitDie + conMod + hpBonusPerLevel
    const maxHp = level1Hp + (char.level - 1) * Math.max(1, maxHpGain)

    const isOk = char.level > 1 
      ? (char.maxHp >= minHp && char.maxHp <= maxHp)
      : (char.maxHp === level1Hp)

    console.log(`Character: "${char.name}" (Level ${char.level} ${char.class})`)
    console.log(`  HP Stored: ${char.maxHp} (Current: ${char.currentHp})`)
    console.log(`  Expected Lvl 1: ${level1Hp}, Expected Avg: ${avgHp}, Bounds: [${minHp}, ${maxHp}]`)
    console.log(`  Status: ${isOk ? 'OK' : 'ERROR'}`)
  }

  console.log('\n=== CHECKING THREATS (AMEAÇAS) ===')
  const threats = await prisma.threat.findMany({
    include: {
      attributes: true,
      combat: true
    }
  })
  for (const t of threats) {
    console.log(`Threat: "${t.name}" (Type: ${t.threatType})`)
    console.log(`  HP (Attributes): ${t.attributes?.hp ?? 'N/A'}`)
    console.log(`  HP (Combat): ${t.combat?.damage ?? 'N/A'} / ${t.combat?.abilities ?? 'N/A'}`)
  }

  console.log('\n=== CHECKING NPCS ===')
  const npcs = await prisma.npc.findMany({
    include: {
      combat: true
    }
  })
  for (const npc of npcs) {
    console.log(`NPC: "${npc.name}" (Status: ${npc.status})`)
    console.log(`  HP (Combat): ${npc.combat?.hp ?? 'N/A'}`)
  }

  console.log('\n=== CHECKING ACTIVE COMBAT PARTICIPANTS ===')
  const participants = await prisma.combatParticipant.findMany({
    include: {
      stats: true
    }
  })
  for (const p of participants) {
    console.log(`Participant: "${p.name}" (Type: ${p.entityType})`)
    console.log(`  HP Stored: max=${p.stats?.maxHp ?? 'N/A'}, current=${p.stats?.currentHp ?? 'N/A'}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
