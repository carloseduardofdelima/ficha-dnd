import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CLASS_RESOURCES: Record<string, (char: any) => Record<string, number>> = {
  'Bárbaro': (char) => {
    const rageUses = char.level >= 20 ? 999 : (char.level >= 17 ? 6 : (char.level >= 12 ? 5 : (char.level >= 6 ? 4 : (char.level >= 3 ? 3 : 2))));
    return { 'Fúria': rageUses }
  },
  'Bardo': (char) => {
    const mod = Math.floor((char.charisma - 10) / 2)
    return { 'Inspiração Bárdica': Math.max(1, mod) }
  },
  'Clérigo': (char): Record<string, number> => {
    if (char.level < 2) return {}
    const uses = char.level >= 18 ? 3 : (char.level >= 6 ? 2 : 1)
    return { 'Canalizar Divindade': uses }
  },
  'Guerreiro': (char) => {
    return { 'Segundo Fôlego': 2 }
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
    const resources: Record<string, number> = {}
    if (char.ruleset !== '2014') {
      resources['Conjuração Inata'] = 2
    }
    if (char.level >= 2) {
      resources['Pontos de Feitiçaria'] = char.level
    }
    return resources
  },
  'Druida': (char): Record<string, number> => {
    if (char.level < 2) return {}
    return { 'Forma Selvagem': 2 }
  },
  'Artífice': (char) => {
    const mod = Math.floor((char.intelligence - 10) / 2)
    const res: Record<string, number> = { 'Engenharia Mágica': Math.max(1, mod) }
    if (char.level >= 7) res['Lampejo de Genialidade'] = Math.max(1, mod)
    return res
  }
}

async function auditResources() {
  console.log('--- Auditoria de Recursos Iniciada ---')
  
  const characters = await prisma.character.findMany({
    include: {
      user: true
    }
  })

  for (const char of characters) {
    const resources = typeof char.resources === 'string' 
      ? JSON.parse(char.resources) 
      : (char.resources || {})
    
    const expectedGenerator = CLASS_RESOURCES[char.class]
    if (!expectedGenerator) {
      // console.log(`[${char.name}] Classe ${char.class} sem regra de recursos definida.`)
      continue
    }

    const expected = expectedGenerator(char)
    const missing: string[] = []
    const wrongValues: string[] = []

    for (const [key, maxVal] of Object.entries(expected)) {
      if (resources[key] === undefined) {
        missing.push(key)
      } else {
        // Here we can't strictly check the current value if it was spent,
        // but we can check if it's vastly inconsistent or if we had a way to track Max.
        // Currently the schema stores { "ResourceName": current_value }
        // The UI usually determines the MAX based on level.
        // However, if the key is missing, it's definitely "vazio".
      }
    }

    if (missing.length > 0) {
      console.log(`❌ [${char.name}] (${char.class} Nível ${char.level})`)
      console.log(`   Recursos ausentes: ${missing.join(', ')}`)
      console.log(`   Deveria ter: ${JSON.stringify(expected)}`)
      console.log(`   Atual: ${JSON.stringify(resources)}`)
      console.log('---')
    }
  }

  console.log('--- Auditoria Concluída ---')
}

auditResources()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
