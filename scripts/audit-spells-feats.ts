import { PrismaClient } from '@prisma/client'
import { SPELLS, SPELLS_2014 } from '../src/lib/spells'
import { FEATS_2014 } from '../src/lib/feats-2014'
import { FEATS_2024 } from '../src/lib/dnd-feats-2024'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Iniciando auditoria de magias e talentos no banco de dados...\n')

  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      ruleset: true,
      class: true,
      subclass: true,
      level: true,
      spells: true,
      traits: true,
      user: {
        select: { email: true, name: true }
      }
    }
  })

  console.log(`Total de personagens encontrados no banco: ${characters.length}\n`)
  for (const c of characters) {
    console.log(`- ${c.name} (${c.class}, Nvl ${c.level}) [Ruleset: ${c.ruleset || '2024'}]`)
  }
  console.log('')

  const issues: Array<{
    charName: string
    charId: string
    ruleset: string
    userEmail: string
    classInfo: string
    invalidSpells: Array<{ id: string; name: string; reason: string }>
    invalidFeats: Array<{ name: string; reason: string }>
  }> = []

  const spells2014PhbMap = new Map(
    SPELLS_2014.filter(s => s.ruleset !== '5e-custom').map(s => [s.id, s])
  )
  const spells2014CustomMap = new Map(
    SPELLS_2014.filter(s => s.ruleset === '5e-custom').map(s => [s.id, s])
  )
  const spells2024Map = new Map(SPELLS.map(s => [s.id, s]))

  const feats2014PhbMap = new Map(
    FEATS_2014.filter(f => !f.source || f.source === "Player's Handbook 2014").map(f => [f.name.toLowerCase(), f])
  )
  const feats2014CustomMap = new Map(
    FEATS_2014.filter(f => f.source && f.source !== "Player's Handbook 2014").map(f => [f.name.toLowerCase(), f])
  )
  const feats2024Map = new Map(
    FEATS_2024.map(f => [f.name.toLowerCase(), f])
  )

  for (const char of characters) {
    const ruleset = char.ruleset || '2024'
    const charSpells: string[] = char.spells ? (typeof char.spells === 'string' ? JSON.parse(char.spells) : char.spells) : []
    const parsedTraits = char.traits ? (typeof char.traits === 'string' ? JSON.parse(char.traits) : char.traits) : {}
    const charFeats: Array<{ name: string; source?: string }> = parsedTraits.feats || []

    const invalidSpells: Array<{ id: string; name: string; reason: string }> = []
    const invalidFeats: Array<{ name: string; reason: string }> = []

    // 1. Auditar Magias
    for (const spellId of charSpells) {
      if (ruleset === '2014') {
        // Regra 2014 clássica: não pode 5e-custom nem 2024
        if (spells2014CustomMap.has(spellId)) {
          const s = spells2014CustomMap.get(spellId)!
          invalidSpells.push({
            id: spellId,
            name: s.name,
            reason: `Magia de suplemento (${s.sourceBook || '5e-custom'}) em ficha 5e (2014)`
          })
        } else if (!spells2014PhbMap.has(spellId) && spells2024Map.has(spellId)) {
          const s = spells2024Map.get(spellId)!
          invalidSpells.push({
            id: spellId,
            name: s.name,
            reason: `Magia exclusiva de 2024 em ficha 5e (2014)`
          })
        }
      } else if (ruleset === '5e-custom') {
        // Regra 5e + complementos: pode 2014 PHB + 2014 complementos, mas não 2024 exclusivo
        if (!spells2014PhbMap.has(spellId) && !spells2014CustomMap.has(spellId) && spells2024Map.has(spellId)) {
          const s = spells2024Map.get(spellId)!
          invalidSpells.push({
            id: spellId,
            name: s.name,
            reason: `Magia exclusiva de 2024 em ficha 5e + Complementos`
          })
        }
      } else if (ruleset === '2024') {
        // Regra 2024: não pode magias exclusivas de 2014 que foram renomeadas ou descontinuadas se não estiverem em 2024
        if (!spells2024Map.has(spellId)) {
          const s = spells2014PhbMap.get(spellId) || spells2014CustomMap.get(spellId)
          if (s) {
            invalidSpells.push({
              id: spellId,
              name: s.name,
              reason: `Magia de 2014 (${s.sourceBook || 'PHB 2014'}) em ficha 2024`
            })
          }
        }
      }
    }

    // 2. Auditar Talentos
    for (const feat of charFeats) {
      const featNameLower = feat.name.toLowerCase()
      if (ruleset === '2014') {
        if (feats2014CustomMap.has(featNameLower)) {
          const f = feats2014CustomMap.get(featNameLower)!
          invalidFeats.push({
            name: feat.name,
            reason: `Talento de complemento (${f.source}) em ficha 5e (2014)`
          })
        } else if (!feats2014PhbMap.has(featNameLower) && feats2024Map.has(featNameLower)) {
          invalidFeats.push({
            name: feat.name,
            reason: `Talento exclusivo de 2024 em ficha 5e (2014)`
          })
        }
      } else if (ruleset === '5e-custom') {
        if (!feats2014PhbMap.has(featNameLower) && !feats2014CustomMap.has(featNameLower) && feats2024Map.has(featNameLower)) {
          invalidFeats.push({
            name: feat.name,
            reason: `Talento exclusivo de 2024 em ficha 5e + Complementos`
          })
        }
      } else if (ruleset === '2024') {
        if (!feats2024Map.has(featNameLower) && (feats2014PhbMap.has(featNameLower) || feats2014CustomMap.has(featNameLower))) {
          invalidFeats.push({
            name: feat.name,
            reason: `Talento de 2014 em ficha 2024`
          })
        }
      }
    }

    if (invalidSpells.length > 0 || invalidFeats.length > 0) {
      issues.push({
        charName: char.name,
        charId: char.id,
        ruleset,
        userEmail: char.user?.email || 'Sem email',
        classInfo: `${char.class} ${char.subclass ? `(${char.subclass})` : ''} Nvl ${char.level}`,
        invalidSpells,
        invalidFeats
      })
    }
  }

  // Relatório Final
  if (issues.length === 0) {
    console.log('✅ Nenhum personagem com magias ou talentos incorretos encontrado!')
  } else {
    console.log(`⚠️ Encontrados ${issues.length} personagem(ns) com inconsistências:\n`)
    for (const issue of issues) {
      console.log(`👤 Personagem: ${issue.charName} (ID: ${issue.charId})`)
      console.log(`   Usuário: ${issue.userEmail}`)
      console.log(`   Ruleset: ${issue.ruleset} | Classe: ${issue.classInfo}`)
      
      if (issue.invalidSpells.length > 0) {
        console.log(`   🔮 Magias conflitantes (${issue.invalidSpells.length}):`)
        for (const s of issue.invalidSpells) {
          console.log(`      - ${s.name} (${s.id}): ${s.reason}`)
        }
      }

      if (issue.invalidFeats.length > 0) {
        console.log(`   ⭐ Talentos conflitantes (${issue.invalidFeats.length}):`)
        for (const f of issue.invalidFeats) {
          console.log(`      - ${f.name}: ${f.reason}`)
        }
      }
      console.log('------------------------------------------------------------\n')
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
