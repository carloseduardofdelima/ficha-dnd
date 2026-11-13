export interface DndCondition {
  name: string
  summary: string
  keywords: RegExp
}

export const DND_CONDITIONS: DndCondition[] = [
  {
    name: 'Agarrado',
    summary: 'O deslocamento da criatura se torna 0 e ela não pode se beneficiar de nenhum bônus em seu deslocamento. A condição termina se o agarrador ficar incapacitado ou se um efeito remover a criatura do alcance do agarrador.',
    keywords: /\b(agarrad[oa]s?|agarrar)\b/i,
  },
  {
    name: 'Amedrontado',
    summary: 'A criatura tem desvantagem em testes de habilidade e jogadas de ataque enquanto a fonte do medo estiver em sua linha de visão, e não pode se mover voluntariamente para mais perto da fonte do medo.',
    keywords: /\b(amedrontad[oa]s?|medo|apavorad[oa]s?)\b/i,
  },
  {
    name: 'Atordoado',
    summary: 'A criatura está incapacitada, não pode se mover e só consegue falar de forma hesitante. Falha automaticamente em testes de resistência de Força e Destreza, e jogadas de ataque contra ela têm vantagem.',
    keywords: /\b(atordoad[oa]s?|atordoamento)\b/i,
  },
  {
    name: 'Caído',
    summary: 'A única opção de movimento da criatura é rastejar, a menos que se levante. Tem desvantagem em jogadas de ataque. Ataques contra ela têm vantagem se o atacante estiver a até 1,5 m, ou desvantagem caso contrário.',
    keywords: /\b(caíd[oa]s?|derrubad[oa]s?|prostrad[oa]s?)\b/i,
  },
  {
    name: 'Cego',
    summary: 'A criatura não consegue enxergar e falha automaticamente em qualquer teste de habilidade que exija visão. Jogadas de ataque contra ela têm vantagem, e suas próprias jogadas de ataque têm desvantagem.',
    keywords: /\b(ceg[oa]s?|cegueira|cegar)\b/i,
  },
  {
    name: 'Enfeitiçado',
    summary: 'A criatura não pode atacar o encantador nem tê-lo como alvo de habilidades ou efeitos mágicos nocivos. O encantador tem vantagem em qualquer teste de habilidade para interagir socialmente com a criatura.',
    keywords: /\b(enfeitiçad[oa]s?|enfeitiçar)\b/i,
  },
  {
    name: 'Envenenado',
    summary: 'A criatura tem desvantagem em jogadas de ataque e testes de habilidade.',
    keywords: /\b(envenenad[oa]s?)\b/i,
  },
  {
    name: 'Exaustão',
    summary: 'Medida em 6 níveis cumulativos: (1) desvantagem em testes de habilidade; (2) deslocamento reduzido à metade; (3) desvantagem em ataques e resistências; (4) PV máximos reduzidos à metade; (5) deslocamento 0; (6) morte.',
    keywords: /\b(exaustão|exausto)\b/i,
  },
  {
    name: 'Impedido',
    summary: 'O deslocamento da criatura se torna 0. Jogadas de ataque contra ela têm vantagem, e suas jogadas de ataque têm desvantagem. Além disso, tem desvantagem em testes de resistência de Destreza.',
    keywords: /\b(impedid[oa]s?|imobilizad[oa]s?|contid[oa]s?)\b/i,
  },
  {
    name: 'Incapacitado',
    summary: 'A criatura não pode realizar ações nem reações.',
    keywords: /\b(incapacitad[oa]s?)\b/i,
  },
  {
    name: 'Inconsciente',
    summary: 'A criatura está incapacitada, não pode se mover nem falar, e não tem ciência de seus arredores. Larga o que estiver segurando e cai no chão. Falha automaticamente em resistências de Força e Destreza; ataques contra ela têm vantagem e são acertos críticos se o atacante estiver a até 1,5 m.',
    keywords: /\b(inconsciente[s]?|desmaiad[oa]s?)\b/i,
  },
  {
    name: 'Invisível',
    summary: 'A criatura é impossível de ser vista sem ajuda de magia ou sentidos especiais. Para se esconder, é considerada em escuridão pesada. Jogadas de ataque contra ela têm desvantagem, e suas jogadas de ataque têm vantagem.',
    keywords: /\b(invisíve(?:l|is)|invisibilidade)\b/i,
  },
  {
    name: 'Paralisado',
    summary: 'A criatura está incapacitada e não pode se mover nem falar. Falha automaticamente em testes de resistência de Força e Destreza. Jogadas de ataque contra ela têm vantagem e qualquer ataque corpo a corpo a até 1,5 m que acertar é um acerto crítico.',
    keywords: /\b(paralisad[oa]s?|paralisia)\b/i,
  },
  {
    name: 'Petrificado',
    summary: 'A criatura é transformada em substância sólida inanimada (geralmente pedra). Está incapacitada, não pode se mover nem falar, e tem resistência a todos os danos. É imune a veneno e doenças.',
    keywords: /\b(petrificad[oa]s?|petrificação)\b/i,
  },
  {
    name: 'Surdo',
    summary: 'A criatura não consegue ouvir e falha automaticamente em qualquer teste de habilidade que exija audição.',
    keywords: /\b(surd[oa]s?|surdez)\b/i,
  },
]

export function getSpellConditions(spell: { description?: string; damageEffect?: string }): DndCondition[] {
  const text = `${spell.description ?? ''} ${spell.damageEffect ?? ''}`
  if (!text.trim()) return []
  return DND_CONDITIONS.filter(c => c.keywords.test(text))
}

