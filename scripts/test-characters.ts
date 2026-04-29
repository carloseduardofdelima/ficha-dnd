import { PrismaClient } from '@prisma/client'
import { CLASSES } from '../src/lib/classes'
import { CLASSES_2014 } from '../src/lib/classes-2014'
import { RACES_2014 } from '../src/lib/races-2014'
import { BACKGROUNDS_2014 } from '../src/lib/backgrounds-2014'
import { calculateAC } from '../src/lib/dnd-rules'

const prisma = new PrismaClient()

function calcMod(score: number): number {
  return Math.floor((score - 10) / 2)
}

function getHitDie(className: string, ruleset: string): number {
  const source = ruleset === '2014' ? CLASSES_2014 : CLASSES
  const cls = source.find(c => c.name === className)
  if (!cls) return 8 // fallback
  return parseInt(cls.hitDie.replace('d', ''))
}

async function runTests() {
  console.log('--- Iniciando Bateria de Testes nas Fichas ---')
  const characters = await prisma.character.findMany()
  const report: string[] = []

  report.push('# Relatório de Incoerências das Fichas de Personagem')
  report.push(`Data: ${new Date().toLocaleString('pt-BR')}`)
  report.push(`Total de personagens analisados: ${characters.length}`)
  report.push('')

  for (const char of characters) {
    const charReport: string[] = []
    const ruleset = char.ruleset || '2024'
    
    // 1. Validar Raça, Classe e Antecedente
    if (ruleset === '2014') {
        const raceExists = RACES_2014.find(r => r.name === char.race)
        if (!raceExists) {
            charReport.push(`- **Raça**: "${char.race}" não encontrada na lista de 2014.`)
        } else if (raceExists.subRaceMandatory && !char.subrace) {
            charReport.push(`- **Sub-raça**: Obrigatória para ${char.race}, mas não preenchida.`)
        } else if (char.subrace) {
            const subraceExists = raceExists.lineages?.find(l => l.name === char.subrace)
            if (!subraceExists) {
                charReport.push(`- **Sub-raça**: "${char.subrace}" não encontrada para ${char.race}.`)
            }
        }

        const classExists = CLASSES_2014.find(c => c.name === char.class)
        if (!classExists) {
            charReport.push(`- **Classe**: "${char.class}" não encontrada na lista de 2014.`)
        }

        if (!char.background) {
            charReport.push(`- **Antecedente**: Não preenchido.`)
        } else {
            const bgExists = BACKGROUNDS_2014.find(b => b.name === char.background)
            if (!bgExists) {
                charReport.push(`- **Antecedente**: "${char.background}" não encontrado na lista de 2014.`)
            }
        }
    }

    // 2. Bônus de Proficiência
    const expectedPB = Math.ceil(char.level / 4) + 1
    if (char.proficiencyBonus !== expectedPB) {
      charReport.push(`- **Bônus de Proficiência**: Encontrado ${char.proficiencyBonus}, esperado ${expectedPB} para o nível ${char.level}.`)
    }

    // 3. HP Máximo
    const hitDie = getHitDie(char.class, ruleset)
    const conMod = calcMod(char.constitution)
    const minHp = hitDie + conMod + (char.level - 1) * (1 + conMod)
    const maxHp = char.level * (hitDie + conMod)

    if (char.maxHp < minHp || char.maxHp > maxHp) {
      charReport.push(`- **HP Máximo**: ${char.maxHp} está fora da faixa esperada (${minHp} - ${maxHp}). Baseado em ${char.class} nível ${char.level} com Con ${char.constitution}.`)
    }

    // 4. Armor Class (CA)
    let inventory = []
    try {
      inventory = char.inventory ? JSON.parse(char.inventory) : []
    } catch (e) {}

    const calculatedAC = calculateAC(char.class, {
      strength: char.strength,
      dexterity: char.dexterity,
      constitution: char.constitution,
      intelligence: char.intelligence,
      wisdom: char.wisdom,
      charisma: char.charisma,
    }, inventory)

    if (char.armorClass !== calculatedAC) {
      charReport.push(`- **Classe de Armadura (CA)**: Encontrada ${char.armorClass}, calculada ${calculatedAC}. Verifique itens equipados.`)
    }

    // 5. Recursos (Resources)
    let resources: Record<string, number> = {}
    try {
        resources = char.resources ? JSON.parse(char.resources) : {}
    } catch (e) {}

    if (char.class === 'Monge' && char.level >= 2) {
        const ki = resources['Pontos de Foco'] || resources['Ki']
        if (ki !== char.level) {
            charReport.push(`- **Recursos (Ki)**: Encontrado ${ki}, esperado ${char.level} para nível ${char.level}.`)
        }
    }
    if (char.class === 'Paladino') {
        const loh = resources['Imposição de Mãos']
        if (loh !== char.level * 5) {
            charReport.push(`- **Recursos (Imposição de Mãos)**: Encontrado ${loh}, esperado ${char.level * 5}.`)
        }
    }
    if (char.class === 'Feiticeiro' && char.level >= 2) {
        const sp = resources['Pontos de Feitiçaria']
        if (sp !== char.level) {
            charReport.push(`- **Recursos (Pontos de Feitiçaria)**: Encontrado ${sp}, esperado ${char.level}.`)
        }
    }
    if (char.class === 'Bardo') {
        const insp = resources['Inspiração Bárdica']
        const expectedInsp = Math.max(1, calcMod(char.charisma))
        if (insp !== expectedInsp) {
            charReport.push(`- **Recursos (Inspiração Bárdica)**: Encontrado ${insp}, esperado ${expectedInsp} (Mod CAR).`)
        }
    }

    if (charReport.length > 0) {
      report.push(`## Personagem: ${char.name} (ID: ${char.id})`)
      report.push(`- **Classe/Nível**: ${char.class} ${char.level} ${char.subclass ? `(${char.subclass})` : ''}`)
      report.push(`- **Raça/Antecedente**: ${char.race} / ${char.background || 'NENHUM'}`)
      report.push(`- **Ruleset**: ${ruleset}`)
      report.push(...charReport)
      report.push('')
    }
  }

  if (report.length === 4) {
    report.push('✅ Nenhuma incoerência grave encontrada em nenhum personagem!')
  }

  const finalReport = report.join('\n')
  console.log(finalReport)
  return finalReport
}

runTests()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
