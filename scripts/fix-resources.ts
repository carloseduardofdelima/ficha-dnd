import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Translation / Renaming Map
const RENAME_MAP: Record<string, string> = {
  'Fúrias': 'Fúria',
  'Retomada de Fôlego': 'Segundo Fôlego',
  'Imposição de Mãos': 'Mãos Curativas'
}

const CLASS_RESOURCES: Record<string, (char: any) => Record<string, number>> = {
  'Bárbaro': (char) => {
    let rages = 2;
    if (char.level >= 17) rages = 6;
    else if (char.level >= 12) rages = 5;
    else if (char.level >= 6) rages = 4;
    else if (char.level >= 3) rages = 3;
    if (char.ruleset === '2014' && char.level === 20) rages = 99;
    return { 'Fúria': rages }
  },
  'Bardo': (char) => {
    const mod = Math.floor((char.charisma - 10) / 2)
    return { 'Inspiração Bárdica': Math.max(1, mod) }
  },
  'Clérigo': (char) => {
    const res: Record<string, number> = {}
    if (char.level >= 2) {
      const uses = char.level >= 18 ? 3 : (char.level >= 6 ? 2 : 1)
      res['Canalizar Divindade'] = uses
    }
    if (char.level >= 10 && char.ruleset !== '2014') res['Intervenção Divina'] = 1
    return res
  },
  'Guerreiro': (char) => {
    const uses = char.ruleset === '2014' ? 1 : (char.level >= 10 ? 4 : 2);
    const res: Record<string, number> = { 'Segundo Fôlego': uses }
    if (char.level >= 2) res['Surto de Ação'] = 1
    if (char.level >= 9) {
      let indomitable = 1;
      if (char.level >= 17) indomitable = 3;
      else if (char.level >= 13) indomitable = 2;
      res['Indomável'] = indomitable
    }
    return res
  },
  'Monge': (char): Record<string, number> => {
    if (char.level < 2) return {}
    return { 'Pontos de Foco': char.level }
  },
  'Paladino': (char) => {
    const mod = Math.floor((char.charisma - 10) / 2)
    return { 
      'Mãos Curativas': 5 * char.level,
      'Sentido Divino': Math.max(1, 1 + mod)
    }
  },
  'Feiticeiro': (char): Record<string, number> => {
    const res: Record<string, number> = {}
    if (char.ruleset !== '2014') {
      res['Conjuração Inata'] = 2
    }
    if (char.level >= 2) res['Pontos de Feitiçaria'] = char.level
    return res
  },
  'Bruxo': (char): Record<string, number> => {
    if (char.level >= 2 && char.ruleset !== '2014') return { 'Astúcia Mística (Magical Cunning)': 1 }
    return {}
  },
  'Druida': (char): Record<string, number> => {
    if (char.level < 2) return {}
    return { 'Forma Selvagem': 2 }
  },
  'Mago': (char) => {
    return { 'Recuperação Arcana': 1, 'Memória Arcana': 1 }
  },
  'Patrulheiro': (char) => {
    return { 'Marca do Caçador': char.proficiencyBonus || 2 }
  },
  'Artesão Arcano': (char) => {
    const mod = Math.floor((char.intelligence - 10) / 2)
    const res: Record<string, number> = { 'Engenharia Mágica': Math.max(1, mod) }
    if (char.level >= 7) res['Brilho de Gênio'] = Math.max(1, mod)
    return res
  }

}

async function fixResources() {
  console.log('--- Correção de Recursos Iniciada ---')
  
  const characters = await prisma.character.findMany()

  for (const char of characters) {
    let resources = typeof char.resources === 'string' 
      ? JSON.parse(char.resources) 
      : (char.resources || {})
    
    let changed = false

    // 1. Rename keys
    for (const [oldKey, newKey] of Object.entries(RENAME_MAP)) {
      if (resources[oldKey] !== undefined) {
        console.log(`[${char.name}] Renomeando ${oldKey} -> ${newKey}`)
        resources[newKey] = resources[oldKey]
        delete resources[oldKey]
        changed = true
      }
    }

    // 2. Ensure mandatory resources exist
    const expectedGenerator = CLASS_RESOURCES[char.class]
    if (expectedGenerator) {
      const expected = expectedGenerator(char)
      for (const [key, maxVal] of Object.entries(expected)) {
        if (resources[key] === undefined) {
          console.log(`[${char.name}] Adicionando recurso ausente: ${key} (${maxVal})`)
          resources[key] = maxVal
          changed = true
        }
      }

      // 3. Limpeza específica: Remover Conjuração Inata de Feiticeiros 2014
      if (char.class === 'Feiticeiro' && char.ruleset === '2014' && resources['Conjuração Inata'] !== undefined) {
        console.log(`[${char.name}] Removendo Conjuração Inata (não existe em 2014)`)
        delete resources['Conjuração Inata']
        changed = true
      }
    }

    if (changed) {
      await prisma.character.update({
        where: { id: char.id },
        data: { resources: JSON.stringify(resources) }
      })
      console.log(`✅ [${char.name}] Atualizado.`)
    }
  }

  console.log('--- Correção Concluída ---')
}

fixResources()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
