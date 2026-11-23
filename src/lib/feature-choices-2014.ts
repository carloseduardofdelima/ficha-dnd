import { INVOCATIONS_2014 } from './invocations-2014'

export interface FeatureChoiceOption {
  id: string
  name: string
  description: string
  minLevel?: number
  tag?: string
}

export interface FeatureChoiceConfig {
  id: string
  title: string
  subtitle: string
  minLevel: number
  maxSelections: number
  options: FeatureChoiceOption[]
  selectedIds: string[]
  kind: 'trait_single' | 'trait_multi' | 'expertise' | 'fighting_style' | 'domain_skill'
  traitKey?: string
  legacyTraitKey?: string
  legacyIdMap?: Record<string, string>
  alsoGrantExpertise?: boolean
}

export const ALL_SKILLS_2014: Array<{ key: string; name: string; attr: string }> = [
  { key: 'acrobatics', name: 'Acrobacia', attr: 'DES' },
  { key: 'animalHandling', name: 'Adestramento', attr: 'SAB' },
  { key: 'arcana', name: 'Arcanismo', attr: 'INT' },
  { key: 'athletics', name: 'Atletismo', attr: 'FOR' },
  { key: 'performance', name: 'Atuação', attr: 'CAR' },
  { key: 'deception', name: 'Enganação', attr: 'CAR' },
  { key: 'stealth', name: 'Furtividade', attr: 'DES' },
  { key: 'history', name: 'História', attr: 'INT' },
  { key: 'intimidation', name: 'Intimidação', attr: 'CAR' },
  { key: 'insight', name: 'Intuição', attr: 'SAB' },
  { key: 'investigation', name: 'Investigação', attr: 'INT' },
  { key: 'medicine', name: 'Medicina', attr: 'SAB' },
  { key: 'nature', name: 'Natureza', attr: 'INT' },
  { key: 'perception', name: 'Percepção', attr: 'SAB' },
  { key: 'persuasion', name: 'Persuasão', attr: 'CAR' },
  { key: 'sleightOfHand', name: 'Prestidigitação', attr: 'DES' },
  { key: 'religion', name: 'Religião', attr: 'INT' },
  { key: 'survival', name: 'Sobrevivência', attr: 'SAB' },
]

const FIGHTING_STYLES: Record<string, FeatureChoiceOption> = {
  'Arquearia': {
    id: 'Arquearia',
    name: 'Arquearia',
    description: '+2 de bônus nas jogadas de ataque com armas à distância.',
  },
  'Defesa': {
    id: 'Defesa',
    name: 'Defesa',
    description: 'Enquanto estiver usando armadura, você ganha +1 de bônus em sua CA.',
  },
  'Duelismo': {
    id: 'Duelismo',
    name: 'Duelismo',
    description: 'Ao empunhar uma arma corpo a corpo em uma mão e nenhuma outra arma, ganha +2 nas jogadas de dano.',
  },
  'Combate com Armas Grandes': {
    id: 'Combate com Armas Grandes',
    name: 'Combate com Armas Grandes',
    description: 'Ao rolar 1 ou 2 no dado de dano de uma arma corpo a corpo empunhada com duas mãos, pode rolar novamente.',
  },
  'Proteção': {
    id: 'Proteção',
    name: 'Proteção',
    description: 'Use sua reação (com escudo) para impor desvantagem em um ataque contra um aliado a até 1,5m.',
  },
  'Combate com Duas Armas': {
    id: 'Combate com Duas Armas',
    name: 'Combate com Duas Armas',
    description: 'Ao combater com duas armas, você pode adicionar seu modificador de habilidade ao dano do segundo ataque.',
  },
}

const FIGHTER_STYLE_LEGACY_TO_NAME: Record<string, string> = {
  'style-archery': 'Arquearia',
  'style-defense': 'Defesa',
  'style-dueling': 'Duelismo',
  'style-great-weapon': 'Combate com Armas Grandes',
  'style-protection': 'Proteção',
  'style-two-weapon': 'Combate com Duas Armas',
}

const FIGHTER_STYLE_NAME_TO_LEGACY: Record<string, string> = {
  'Arquearia': 'style-archery',
  'Defesa': 'style-defense',
  'Duelismo': 'style-dueling',
  'Combate com Armas Grandes': 'style-great-weapon',
  'Proteção': 'style-protection',
  'Combate com Duas Armas': 'style-two-weapon',
}

const BATTLE_MASTER_MANEUVERS: FeatureChoiceOption[] = [
  { id: 'aparar', name: 'Aparar', description: 'Reação: reduz dano sofrido em 1 dado de superioridade + mod. de Destreza.' },
  { id: 'ameacador', name: 'Ataque Ameaçador', description: 'Soma o dado ao dano e o alvo faz salvaguarda de Sabedoria ou fica Amedrontado.' },
  { id: 'finta', name: 'Ataque de Finta', description: 'Ação bônus: ganha vantagem no próximo ataque contra um alvo a 1,5m e soma o dado ao dano.' },
  { id: 'manobra', name: 'Ataque de Manobra', description: 'Soma o dado ao dano e um aliado pode usar a reação para mover metade do deslocamento sem ataque de oportunidade.' },
  { id: 'precisao', name: 'Ataque de Precisão', description: 'Adiciona o dado de superioridade à sua jogada de ataque.' },
  { id: 'varredura', name: 'Ataque de Varredura', description: 'Ao acertar, causa o dado de superioridade como dano a outra criatura a 1,5m.' },
  { id: 'desarmante', name: 'Ataque Desarmante', description: 'Soma o dado ao dano e força salvaguarda de Força para o alvo derrubar um item.' },
  { id: 'distrativo', name: 'Ataque Distrativo', description: 'Soma o dado ao dano; o próximo ataque de um aliado contra o alvo tem vantagem.' },
  { id: 'empurrao', name: 'Ataque Empurrão', description: 'Soma o dado ao dano e empurra criatura Grande ou menor até 4,5m (salvaguarda de Força).' },
  { id: 'evasivo', name: 'Movimento Evasivo', description: 'Ao se mover, soma o dado de superioridade à sua CA até parar de se mover.' },
  { id: 'prolongado', name: 'Ataque Prolongado', description: 'Aumenta o alcance do ataque corpo a corpo em 1,5m e soma o dado ao dano.' },
  { id: 'provocativo', name: 'Ataque Provocativo', description: 'Soma o dado ao dano; o alvo (salvaguarda de Sabedoria) tem desvantagem para atacar outros que não você.' },
  { id: 'contra-ataque', name: 'Contra-Ataque', description: 'Reação: quando uma criatura erra um ataque corpo a corpo contra você, faça um ataque somando o dado ao dano.' },
  { id: 'derrubar', name: 'Ataque para Derrubar', description: 'Soma o dado ao dano e derruba criatura Grande ou menor no chão (salvaguarda de Força).' },
  { id: 'comandante', name: 'Golpe Comandante', description: 'Abre mão de um ataque + ação bônus para um aliado atacar usando a reação dele somando o dado ao dano.' },
  { id: 'incentivar', name: 'Incentivar', description: 'Ação bônus: concede PV temporários a um aliado iguais ao dado + mod. de Carisma.' },
]

const TOTEM_SPIRIT_3: FeatureChoiceOption[] = [
  { id: 'Urso', name: 'Urso', description: 'Em fúria, você tem resistência a todos os tipos de dano, exceto dano psíquico.' },
  { id: 'Águia', name: 'Águia', description: 'Em fúria (sem armadura pesada), ataques de oportunidade contra você têm desvantagem e você pode usar Disparada como ação bônus.' },
  { id: 'Lobo', name: 'Lobo', description: 'Em fúria, seus aliados têm vantagem em ataques corpo a corpo contra inimigos a até 1,5m de você.' },
]

const TOTEM_SPIRIT_6: FeatureChoiceOption[] = [
  { id: 'Urso', name: 'Urso', description: 'Sua capacidade de carga dobra e você tem vantagem em testes de Força para empurrar, puxar, levantar ou quebrar objetos.' },
  { id: 'Águia', name: 'Águia', description: 'Você enxerga até 1,6 km sem dificuldade e luz fraca não impõe desvantagem em Percepção.' },
  { id: 'Lobo', name: 'Lobo', description: 'Você pode rastrear criaturas viajando em ritmo rápido e se mover furtivamente em ritmo normal.' },
]

const TOTEM_SPIRIT_14: FeatureChoiceOption[] = [
  { id: 'Urso', name: 'Urso', description: 'Em fúria, criaturas hostis a 1,5m de você têm desvantagem em ataques contra alvos diferentes de você.' },
  { id: 'Águia', name: 'Águia', description: 'Em fúria, ganha deslocamento de voo igual ao seu deslocamento de caminhada durante o turno.' },
  { id: 'Lobo', name: 'Lobo', description: 'Em fúria, pode usar ação bônus para derrubar uma criatura Grande ou menor ao acertar um ataque corpo a corpo.' },
]

const FAVORED_ENEMIES: FeatureChoiceOption[] = [
  { id: 'Aberrações', name: 'Aberrações', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Feras', name: 'Feras', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Celestiais', name: 'Celestiais', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Constructos', name: 'Constructos', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Dragões', name: 'Dragões', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Elementais', name: 'Elementais', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Fadas', name: 'Fadas', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Corruptores', name: 'Corruptores', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Gigantes', name: 'Gigantes', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Humanoides', name: 'Humanoides', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações (escolha 2 raças de humanoides).' },
  { id: 'Monstruosidades', name: 'Monstruosidades', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Limos', name: 'Limos', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Plantas', name: 'Plantas', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
  { id: 'Mortos-Vivos', name: 'Mortos-Vivos', description: 'Vantagem em Sobrevivência para rastrear e em Inteligência para recordar informações.' },
]

const FAVORED_ENEMY_LEGACY_MAP: Record<string, string> = {
  'fav-beasts': 'Feras',
  'fav-fey': 'Fadas',
  'fav-humanoids': 'Humanoides',
  'fav-monstrosities': 'Monstruosidades',
  'fav-undead': 'Mortos-Vivos',
}

const FAVORED_TERRAINS: FeatureChoiceOption[] = [
  { id: 'Ártico', name: 'Ártico', description: 'Proficiência dobrada em testes de Int/Sab relacionados ao terreno, não se perde e encontra o dobro de comida.' },
  { id: 'Costa', name: 'Costa', description: 'Proficiência dobrada em testes de Int/Sab relacionados ao terreno, não se perde e encontra o dobro de comida.' },
  { id: 'Deserto', name: 'Deserto', description: 'Proficiência dobrada em testes de Int/Sab relacionados ao terreno, não se perde e encontra o dobro de comida.' },
  { id: 'Floresta', name: 'Floresta', description: 'Proficiência dobrada em testes de Int/Sab relacionados ao terreno, não se perde e encontra o dobro de comida.' },
  { id: 'Montanha', name: 'Montanha', description: 'Proficiência dobrada em testes de Int/Sab relacionados ao terreno, não se perde e encontra o dobro de comida.' },
  { id: 'Pântano', name: 'Pântano', description: 'Proficiência dobrada em testes de Int/Sab relacionados ao terreno, não se perde e encontra o dobro de comida.' },
  { id: 'Planície', name: 'Planície', description: 'Proficiência dobrada em testes de Int/Sab relacionados ao terreno, não se perde e encontra o dobro de comida.' },
  { id: 'Subterrâneo', name: 'Subterrâneo', description: 'Proficiência dobrada em testes de Int/Sab relacionados ao terreno, não se perde e encontra o dobro de comida.' },
  { id: 'Explorador Natural (Revisado)', name: 'Explorador Natural (Revisado)', description: 'Ignora terreno difícil; vantagem em Iniciativa e em ataques contra quem ainda não agiu.' },
]

const LAND_CIRCLE_TERRAINS: FeatureChoiceOption[] = [
  { id: 'Ártico', name: 'Ártico', description: 'Magias de Círculo: Imobilizar Pessoa, Crescer Espinhos, Nevasca, Lentidão, Movimentação Livre, Tempestade de Gelo, Comunhão com a Natureza, Cone de Frio.' },
  { id: 'Costa', name: 'Costa', description: 'Magias de Círculo: Reflexos, Passo Nebuloso, Respirar na Água, Andar na Água, Controlar Água, Movimentação Livre, Conjurar Elemental, Vidência.' },
  { id: 'Deserto', name: 'Deserto', description: 'Magias de Círculo: Nublar, Silêncio, Criar Alimentos, Proteção contra Energia, Praga, Terreno Alucinógeno, Praga de Insetos, Muralha de Pedra.' },
  { id: 'Floresta', name: 'Floresta', description: 'Magias de Círculo: Pele de Árvore, Patas de Aranha, Convocar Relâmpagos, Ampliar Plantas, Adivinhação, Movimentação Livre, Comunhão com a Natureza, Caminhar em Árvores.' },
  { id: 'Montanha', name: 'Montanha', description: 'Magias de Círculo: Patas de Aranha, Crescer Espinhos, Relâmpago, Mesclar-se às Rochas, Moldar Rochas, Pele de Pedra, Criar Passagem, Muralha de Pedra.' },
  { id: 'Pântano', name: 'Pântano', description: 'Magias de Círculo: Escuridão, Flecha Ácida de Melf, Andar na Água, Névoa Fétida, Movimentação Livre, Localizar Criatura, Praga de Insetos, Vidência.' },
  { id: 'Planície', name: 'Planície', description: 'Magias de Círculo: Invisibilidade, Passos Sem Pegadas, Luz do Dia, Velocidade, Adivinhação, Movimentação Livre, Sonho, Praga de Insetos.' },
  { id: 'Subterrâneo', name: 'Subterrâneo', description: 'Magias de Círculo: Patas de Aranha, Teia, Forma Gasosa, Névoa Fétida, Invisibilidade Maior, Moldar Rochas, Névoa Mortal, Praga de Insetos.' },
]

const ELEMENTAL_DISCIPLINES: FeatureChoiceOption[] = [
  { id: 'sintonia-elemental', name: 'Sintonia Elemental', description: 'Cria efeitos sensoriais elementais inofensivos (grátis no nível 3).', minLevel: 3, tag: 'Nível 3' },
  { id: 'presas-serpente-fogo', name: 'Presas da Serpente de Fogo', description: '1 Ki: aumenta alcance dos ataques desarmados em +3m e converte dano para ígneo (+1d10 ígneo com +1 Ki).', minLevel: 3, tag: 'Nível 3' },
  { id: 'punho-ar-ininterrupto', name: 'Punho do Ar Ininterrupto', description: '2 Ki (Ação): empurra criatura até 6m e causa 3d10 de dano contundente (salvaguarda de Força).', minLevel: 3, tag: 'Nível 3' },
  { id: 'chicote-agua', name: 'Chicote de Água', description: '2 Ki (Ação bônus): 3d10 contundente e puxa/derruba criatura a até 9m (salvaguarda de Destreza).', minLevel: 3, tag: 'Nível 3' },
  { id: 'impeto-vendaval', name: 'Ímpeto dos Ventos', description: '2 Ki: conjura Lufada de Vento.', minLevel: 3, tag: 'Nível 3' },
  { id: 'moldar-rio-corrente', name: 'Moldar o Rio Corrente', description: '1 Ki: congela ou remodela água/gelo em uma área de 9m.', minLevel: 3, tag: 'Nível 3' },
  { id: 'varredura-chamas', name: 'Varredura das Chamas', description: '2 Ki: conjura Mãos Flamejantes.', minLevel: 3, tag: 'Nível 3' },
  { id: 'gongo-cume', name: 'Gongo do Cume', description: '3 Ki: conjura Despedaçar.', minLevel: 6, tag: 'Nível 6' },
  { id: 'punho-quatro-trovoes', name: 'Punho dos Quatro Trovões', description: '2 Ki: conjura Onda Trovejante.', minLevel: 3, tag: 'Nível 3' },
  { id: 'aperto-vento-norte', name: 'Aperto do Vento Norte', description: '3 Ki: conjura Imobilizar Pessoa.', minLevel: 6, tag: 'Nível 6' },
  { id: 'chamas-fenix', name: 'Chamas da Fênix', description: '4 Ki: conjura Bola de Fogo.', minLevel: 11, tag: 'Nível 11' },
  { id: 'cavalgada-vento', name: 'Cavalgada do Vento', description: '4 Ki: conjura Voo em si mesmo.', minLevel: 11, tag: 'Nível 11' },
  { id: 'nevoa-postura', name: 'Postura da Névoa', description: '4 Ki: conjura Forma Gasosa em si mesmo.', minLevel: 11, tag: 'Nível 11' },
  { id: 'sopro-inverno', name: 'Sopro do Inverno', description: '6 Ki: conjura Cone de Frio.', minLevel: 17, tag: 'Nível 17' },
  { id: 'defesa-montanha', name: 'Defesa da Montanha Eterna', description: '5 Ki: conjura Pele de Pedra em si mesmo.', minLevel: 17, tag: 'Nível 17' },
  { id: 'rio-chamas-famintas', name: 'Rio de Chamas Famintas', description: '5 Ki: conjura Muralha de Fogo.', minLevel: 17, tag: 'Nível 17' },
  { id: 'onda-terra-rolante', name: 'Onda da Terra Rolante', description: '6 Ki: conjura Muralha de Pedra.', minLevel: 17, tag: 'Nível 17' },
]

const GENIE_KINDS: FeatureChoiceOption[] = [
  { id: 'Dao (Terra — Contundente)', name: 'Dao (Terra)', description: 'Ira do Gênio causa dano contundente; Dom Elemental (nv 6) dá resistência a contundente.' },
  { id: 'Djinni (Ar — Trovejante)', name: 'Djinni (Ar)', description: 'Ira do Gênio causa dano trovejante; Dom Elemental (nv 6) dá resistência a trovejante.' },
  { id: 'Ifriti (Fogo — Ígneo)', name: 'Ifriti (Fogo)', description: 'Ira do Gênio causa dano ígneo; Dom Elemental (nv 6) dá resistência a ígneo.' },
  { id: 'Marid (Água — Gélido)', name: 'Marid (Água)', description: 'Ira do Gênio causa dano gélido; Dom Elemental (nv 6) dá resistência a gélido.' },
]

const PACT_BOONS: FeatureChoiceOption[] = [
  { id: 'Pacto da Corrente', name: 'Pacto da Corrente', description: 'Aprende Convocar Familiar (ritual) com formas especiais: diabrete, pseudodragão, quasit ou sprite.' },
  { id: 'Pacto da Lâmina', name: 'Pacto da Lâmina', description: 'Cria uma arma mágica corpo a corpo em sua mão vazia com a qual você é proficiente.' },
  { id: 'Pacto do Tomo', name: 'Pacto do Tomo', description: 'Recebe o Livro das Sombras com 3 truques adicionais de qualquer lista de classe.' },
]

const PACT_BOON_LEGACY_TO_NAME: Record<string, string> = {
  'pact-chain': 'Pacto da Corrente',
  'pact-blade': 'Pacto da Lâmina',
  'pact-tome': 'Pacto do Tomo',
}

const PACT_BOON_NAME_TO_LEGACY: Record<string, string> = {
  'Pacto da Corrente': 'pact-chain',
  'Pacto da Lâmina': 'pact-blade',
  'Pacto do Tomo': 'pact-tome',
}

const ARTIFICER_TOOLS: FeatureChoiceOption[] = [
  { id: 'art-alchemist', name: 'Suprimentos de Alquimista', description: 'Proficiência com Suprimentos de Alquimista.' },
  { id: 'art-smith', name: 'Ferramentas de Ferreiro', description: 'Proficiência com Ferramentas de Ferreiro.' },
  { id: 'art-tinker', name: 'Ferramentas de Funileiro', description: 'Proficiência com Ferramentas de Funileiro.' },
  { id: 'art-woodcarver', name: 'Ferramentas de Entalhador', description: 'Proficiência com Ferramentas de Entalhador.' },
  { id: 'art-cook', name: 'Utensílios de Cozinheiro', description: 'Proficiência com Utensílios de Cozinheiro.' },
  { id: 'art-jeweler', name: 'Ferramentas de Joalheiro', description: 'Proficiência com Ferramentas de Joalheiro.' },
  { id: 'art-leatherworker', name: 'Ferramentas de Curtidor', description: 'Proficiência com Ferramentas de Curtidor.' },
  { id: 'art-carpenter', name: 'Ferramentas de Carpinteiro', description: 'Proficiência com Ferramentas de Carpinteiro.' },
  { id: 'art-cartographer', name: 'Ferramentas de Cartógrafo', description: 'Proficiência com Ferramentas de Cartógrafo.' },
  { id: 'art-calligrapher', name: 'Suprimentos de Calígrafo', description: 'Proficiência com Suprimentos de Calígrafo.' },
]

function normalizeStr(s?: string | null): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function getAvailableChoices2014(
  character: { class: string; subclass?: string | null; level: number; ruleset?: string | null },
  parsedTraits: any,
  parsedSkills: Record<string, boolean>,
  expertises: Record<string, boolean>
): FeatureChoiceConfig[] {
  const is2014 = character.ruleset === '2014' || character.ruleset === '5e-custom'
  if (!is2014) return []

  const cls = character.class
  const sub = normalizeStr(character.subclass)
  const lvl = character.level || 1
  const traits = parsedTraits || {}
  const configs: FeatureChoiceConfig[] = []

  // 1. Especialização — Ladino (nv 1: 2, nv 6: 4) e Bardo (nv 3: 2, nv 10: 4)
  if ((cls === 'Ladino' && lvl >= 1) || (cls === 'Bardo' && lvl >= 3)) {
    const maxExp = cls === 'Ladino' ? (lvl >= 6 ? 4 : 2) : (lvl >= 10 ? 4 : 2)
    const proficientSkillOpts: FeatureChoiceOption[] = ALL_SKILLS_2014
      .filter(s => parsedSkills[s.key])
      .map(s => ({
        id: s.key,
        name: s.name,
        description: `Dobra o bônus de proficiência em ${s.name} (${s.attr}).`,
        tag: s.attr,
      }))

    if (cls === 'Ladino') {
      proficientSkillOpts.push({
        id: 'thievesTools',
        name: 'Ferramentas de Ladrão',
        description: 'Dobra o bônus de proficiência em testes com Ferramentas de Ladrão.',
        tag: 'Ferramenta',
      })
    }

    const currentExpIds = Object.keys(expertises || {}).filter(k => expertises[k])
    configs.push({
      id: 'class-expertise',
      title: 'Especialização',
      subtitle: `Escolha até ${maxExp} perícias proficientes para dobrar o bônus de proficiência.`,
      minLevel: cls === 'Ladino' ? 1 : 3,
      maxSelections: maxExp,
      options: proficientSkillOpts,
      selectedIds: currentExpIds,
      kind: 'expertise',
    })
  }

  // 2. Estilo de Luta — Guerreiro (nv 1), Paladino (nv 2), Patrulheiro (nv 2)
  if (
    (cls === 'Guerreiro' && lvl >= 1) ||
    (cls === 'Paladino' && lvl >= 2) ||
    (cls === 'Patrulheiro' && lvl >= 2)
  ) {
    let styleNames: string[] = []
    if (cls === 'Guerreiro') {
      styleNames = ['Arquearia', 'Defesa', 'Duelismo', 'Combate com Armas Grandes', 'Proteção', 'Combate com Duas Armas']
    } else if (cls === 'Paladino') {
      styleNames = ['Defesa', 'Duelismo', 'Combate com Armas Grandes', 'Proteção']
    } else {
      styleNames = ['Arquearia', 'Defesa', 'Duelismo', 'Combate com Duas Armas']
    }

    const legacyVal = traits['fighter-style-2014'] ? FIGHTER_STYLE_LEGACY_TO_NAME[traits['fighter-style-2014']] : undefined
    const currentStyle = traits.fightingStyle || legacyVal
    configs.push({
      id: 'fighting-style',
      title: 'Estilo de Luta',
      subtitle: 'Escolha seu estilo de combate principal.',
      minLevel: cls === 'Guerreiro' ? 1 : 2,
      maxSelections: 1,
      options: styleNames.map(n => FIGHTING_STYLES[n]),
      selectedIds: currentStyle ? [currentStyle] : [],
      kind: 'fighting_style',
      traitKey: 'fightingStyle',
      legacyTraitKey: cls === 'Guerreiro' ? 'fighter-style-2014' : undefined,
      legacyIdMap: FIGHTER_STYLE_NAME_TO_LEGACY,
    })
  }

  // 3. Guerreiro (Campeão) — Estilo de Luta Adicional (nv 10)
  if (cls === 'Guerreiro' && sub.includes('campeao') && lvl >= 10) {
    const currentAdd = traits.additionalFightingStyle
    configs.push({
      id: 'champion-additional-style',
      title: 'Estilo de Luta Adicional (Campeão)',
      subtitle: 'Escolha um segundo estilo de luta no 10º nível.',
      minLevel: 10,
      maxSelections: 1,
      options: Object.values(FIGHTING_STYLES),
      selectedIds: currentAdd ? [currentAdd] : [],
      kind: 'trait_single',
      traitKey: 'additionalFightingStyle',
    })
  }

  // 4. Guerreiro (Mestre de Batalha) — Manobras (nv 3: 3, nv 7: 5, nv 10: 7, nv 15: 9)
  if (cls === 'Guerreiro' && sub.includes('mestre de batalha') && lvl >= 3) {
    const maxMan = lvl >= 15 ? 9 : lvl >= 10 ? 7 : lvl >= 7 ? 5 : 3
    const currentMan: string[] = Array.isArray(traits.battleMasterManeuvers) ? traits.battleMasterManeuvers : []
    configs.push({
      id: 'battlemaster-maneuvers',
      title: 'Manobras (Mestre de Batalha)',
      subtitle: `Escolha até ${maxMan} manobras táticas conhecidas.`,
      minLevel: 3,
      maxSelections: maxMan,
      options: BATTLE_MASTER_MANEUVERS,
      selectedIds: currentMan,
      kind: 'trait_multi',
      traitKey: 'battleMasterManeuvers',
    })
  }

  // 5. Bárbaro (Guerreiro Totêmico) — Totem Espiritual (nv 3, 6, 14)
  if (cls === 'Bárbaro' && (sub.includes('totem') || sub.includes('totemico'))) {
    if (lvl >= 3) {
      configs.push({
        id: 'totem-3',
        title: 'Totem Espiritual (Nível 3)',
        subtitle: 'Escolha seu espírito totêmico de fúria.',
        minLevel: 3,
        maxSelections: 1,
        options: TOTEM_SPIRIT_3,
        selectedIds: traits.totemSpirit3 ? [traits.totemSpirit3] : [],
        kind: 'trait_single',
        traitKey: 'totemSpirit3',
      })
    }
    if (lvl >= 6) {
      configs.push({
        id: 'totem-6',
        title: 'Aspecto da Besta (Nível 6)',
        subtitle: 'Escolha o aspecto totêmico do 6º nível.',
        minLevel: 6,
        maxSelections: 1,
        options: TOTEM_SPIRIT_6,
        selectedIds: traits.totemSpirit6 ? [traits.totemSpirit6] : [],
        kind: 'trait_single',
        traitKey: 'totemSpirit6',
      })
    }
    if (lvl >= 14) {
      configs.push({
        id: 'totem-14',
        title: 'Sintonia Totêmica (Nível 14)',
        subtitle: 'Escolha o benefício totêmico do 14º nível.',
        minLevel: 14,
        maxSelections: 1,
        options: TOTEM_SPIRIT_14,
        selectedIds: traits.totemSpirit14 ? [traits.totemSpirit14] : [],
        kind: 'trait_single',
        traitKey: 'totemSpirit14',
      })
    }
  }

  // 6. Patrulheiro — Inimigo Favorito (nv 1: 1, nv 6: 2, nv 14: 3) & Terreno Favorito (nv 1: 1, nv 6: 2, nv 10: 3)
  if (cls === 'Patrulheiro') {
    const maxEnemies = lvl >= 14 ? 3 : lvl >= 6 ? 2 : 1
    const legacyEnemy = traits['ranger-favored-enemy-2014']
      ? FAVORED_ENEMY_LEGACY_MAP[traits['ranger-favored-enemy-2014']] || traits['ranger-favored-enemy-2014']
      : null
    const currentEnemies: string[] = Array.isArray(traits.favoredEnemies)
      ? traits.favoredEnemies
      : (legacyEnemy ? [legacyEnemy] : [])

    configs.push({
      id: 'ranger-favored-enemies',
      title: 'Inimigo Favorito',
      subtitle: `Escolha até ${maxEnemies} tipo(s) de inimigo favorito.`,
      minLevel: 1,
      maxSelections: maxEnemies,
      options: FAVORED_ENEMIES,
      selectedIds: currentEnemies,
      kind: 'trait_multi',
      traitKey: 'favoredEnemies',
    })

    const maxTerrains = lvl >= 10 ? 3 : lvl >= 6 ? 2 : 1
    const legacyTerrain = traits['ranger-natural-explorer-2014'] === 'nat-exp-revised'
      ? 'Explorador Natural (Revisado)'
      : traits['ranger-natural-explorer-2014'] || null
    const currentTerrains: string[] = Array.isArray(traits.favoredTerrains)
      ? traits.favoredTerrains
      : (legacyTerrain ? [legacyTerrain] : [])

    configs.push({
      id: 'ranger-favored-terrains',
      title: 'Explorador Natural (Terreno Favorito)',
      subtitle: `Escolha até ${maxTerrains} terreno(s) favorito(s).`,
      minLevel: 1,
      maxSelections: maxTerrains,
      options: FAVORED_TERRAINS,
      selectedIds: currentTerrains,
      kind: 'trait_multi',
      traitKey: 'favoredTerrains',
    })

    // Conclave do Caçador
    if (sub.includes('cacador')) {
      if (lvl >= 3) {
        configs.push({
          id: 'hunter-prey',
          title: 'Presa do Caçador (Nível 3)',
          subtitle: 'Escolha sua especialidade de caça.',
          minLevel: 3,
          maxSelections: 1,
          options: [
            { id: 'Assassino de Colossos', name: 'Assassino de Colossos', description: '1×/turno, causa +1d8 de dano extra em alvo abaixo do PV máximo.' },
            { id: 'Matador de Gigantes', name: 'Matador de Gigantes', description: 'Reação: ataca uma criatura Grande ou maior a 1,5m que o ataque.' },
            { id: 'Destruidor de Hordas', name: 'Destruidor de Hordas', description: '1×/turno, faz um ataque extra contra outra criatura a 1,5m do alvo original.' },
          ],
          selectedIds: traits.hunterPrey ? [traits.hunterPrey] : [],
          kind: 'trait_single',
          traitKey: 'hunterPrey',
        })
      }
      if (lvl >= 7) {
        configs.push({
          id: 'hunter-defensive',
          title: 'Táticas Defensivas (Nível 7)',
          subtitle: 'Escolha sua tática defensiva.',
          minLevel: 7,
          maxSelections: 1,
          options: [
            { id: 'Escapar da Horda', name: 'Escapar da Horda', description: 'Ataques de oportunidade contra você têm desvantagem.' },
            { id: 'Defesa Contra Ataques Múltiplos', name: 'Defesa Contra Ataques Múltiplos', description: 'Quando atingido, ganha +4 na CA contra ataques subsequentes da mesma criatura neste turno.' },
            { id: 'Vontade de Ferro', name: 'Vontade de Ferro', description: 'Vantagem em salvaguardas contra ficar Amedrontado.' },
          ],
          selectedIds: traits.hunterDefensiveTactics ? [traits.hunterDefensiveTactics] : [],
          kind: 'trait_single',
          traitKey: 'hunterDefensiveTactics',
        })
      }
      if (lvl >= 11) {
        configs.push({
          id: 'hunter-multiattack',
          title: 'Ataque Múltiplo (Nível 11)',
          subtitle: 'Escolha sua técnica de ataque múltiplo.',
          minLevel: 11,
          maxSelections: 1,
          options: [
            { id: 'Saraivada', name: 'Saraivada', description: 'Ação: faz um ataque à distância contra cada criatura a 3m de um ponto escolhido.' },
            { id: 'Ataque Turbilhão', name: 'Ataque Turbilhão', description: 'Ação: faz um ataque corpo a corpo contra cada criatura a 1,5m de você.' },
          ],
          selectedIds: traits.hunterMultiattack ? [traits.hunterMultiattack] : [],
          kind: 'trait_single',
          traitKey: 'hunterMultiattack',
        })
      }
      if (lvl >= 15) {
        configs.push({
          id: 'hunter-superior-defense',
          title: 'Defesa de Caçador Superior (Nível 15)',
          subtitle: 'Escolha sua defesa superior.',
          minLevel: 15,
          maxSelections: 1,
          options: [
            { id: 'Evasão', name: 'Evasão', description: 'Em salvaguardas de Destreza, não sofre dano ao passar e metade ao falhar.' },
            { id: 'Manter-se Contra a Maré', name: 'Manter-se Contra a Maré', description: 'Reação: quando um inimigo erra ataque corpo a corpo em você, redireciona o ataque para outra criatura.' },
            { id: 'Esquiva Sobrenatural', name: 'Esquiva Sobrenatural', description: 'Reação: reduz à metade o dano de um ataque que você possa ver.' },
          ],
          selectedIds: traits.hunterSuperiorDefense ? [traits.hunterSuperiorDefense] : [],
          kind: 'trait_single',
          traitKey: 'hunterSuperiorDefense',
        })
      }
    }
  }

  // 7. Druida (Círculo da Terra) — Terreno do Círculo (nv 2)
  if (cls === 'Druida' && sub.includes('terra') && lvl >= 2) {
    configs.push({
      id: 'druid-land-terrain',
      title: 'Terreno do Círculo da Terra',
      subtitle: 'Escolha o terreno místico ligado ao seu círculo druídico.',
      minLevel: 2,
      maxSelections: 1,
      options: LAND_CIRCLE_TERRAINS,
      selectedIds: traits.landCircleTerrain ? [traits.landCircleTerrain] : [],
      kind: 'trait_single',
      traitKey: 'landCircleTerrain',
    })
  }

  // 8. Monge (Quatro Elementos) — Disciplinas Elementais (nv 3: 2, nv 6: 3, nv 11: 4, nv 17: 5)
  if (cls === 'Monge' && sub.includes('quatro elementos') && lvl >= 3) {
    const maxDisc = lvl >= 17 ? 5 : lvl >= 11 ? 4 : lvl >= 6 ? 3 : 2
    const availableDiscs = ELEMENTAL_DISCIPLINES.filter(d => !d.minLevel || lvl >= d.minLevel)
    configs.push({
      id: 'monk-elemental-disciplines',
      title: 'Disciplinas Elementais',
      subtitle: `Escolha até ${maxDisc} disciplinas elementais conhecidas.`,
      minLevel: 3,
      maxSelections: maxDisc,
      options: availableDiscs,
      selectedIds: Array.isArray(traits.elementalDisciplines) ? traits.elementalDisciplines : [],
      kind: 'trait_multi',
      traitKey: 'elementalDisciplines',
    })
  }

  // 9. Bruxo — Invocações Místicas (nv 2+), Dádiva do Pacto (nv 3+) e Tipo de Gênio (nv 1+)
  if (cls === 'Bruxo') {
    if (sub.includes('genio')) {
      configs.push({
        id: 'warlock-genie-kind',
        title: 'Tipo de Gênio',
        subtitle: 'Escolha a linhagem elemental do seu patrono Gênio.',
        minLevel: 1,
        maxSelections: 1,
        options: GENIE_KINDS,
        selectedIds: traits.genieKind ? [traits.genieKind] : [],
        kind: 'trait_single',
        traitKey: 'genieKind',
      })
    }

    if (lvl >= 2) {
      const maxInv =
        lvl >= 18 ? 8 :
        lvl >= 15 ? 7 :
        lvl >= 12 ? 6 :
        lvl >= 9 ? 5 :
        lvl >= 7 ? 4 :
        lvl >= 5 ? 3 : 2

      const currentInvIds: string[] = Array.isArray(traits.eldritchInvocations)
        ? traits.eldritchInvocations
        : []

      configs.push({
        id: 'warlock-invocations',
        title: 'Invocações Místicas',
        subtitle: `Escolha até ${maxInv} invocações místicas conhecidas.`,
        minLevel: 2,
        maxSelections: maxInv,
        options: INVOCATIONS_2014.map(inv => ({
          id: inv.id,
          name: inv.name,
          description: inv.description,
          tag: (inv as any).prerequisite || undefined,
        })),
        selectedIds: currentInvIds,
        kind: 'trait_multi',
        traitKey: 'eldritchInvocations',
      })
    }

    if (lvl >= 3) {
      const legacyPact = traits['warlock-pact-boon-2014']
        ? PACT_BOON_LEGACY_TO_NAME[traits['warlock-pact-boon-2014']]
        : undefined
      const currentPact = traits.pactBoon || legacyPact
      configs.push({
        id: 'warlock-pact-boon',
        title: 'Dádiva do Pacto',
        subtitle: 'Escolha o dom concedido pelo seu patrono no 3º nível.',
        minLevel: 3,
        maxSelections: 1,
        options: PACT_BOONS,
        selectedIds: currentPact ? [currentPact] : [],
        kind: 'trait_single',
        traitKey: 'pactBoon',
        legacyTraitKey: 'warlock-pact-boon-2014',
        legacyIdMap: PACT_BOON_NAME_TO_LEGACY,
      })
    }
  }

  // 10. Clérigo — Domínios com perícias extras (Conhecimento, Natureza, Ordem)
  if (cls === 'Clérigo') {
    if (sub.includes('conhecimento')) {
      const opts = ['arcana', 'history', 'nature', 'religion'].map(k => {
        const s = ALL_SKILLS_2014.find(x => x.key === k)!
        return { id: k, name: s.name, description: `Ganha proficiência e bônus dobrado em ${s.name} (${s.attr}).`, tag: 'Proficiência Dobrada' }
      })
      configs.push({
        id: 'cleric-knowledge-skills',
        title: 'Bênção do Conhecimento (Perícias)',
        subtitle: 'Escolha 2 perícias de conhecimento para ganhar proficiência dobrada.',
        minLevel: 1,
        maxSelections: 2,
        options: opts,
        selectedIds: Array.isArray(traits.domainBonusSkills) ? traits.domainBonusSkills : [],
        kind: 'domain_skill',
        traitKey: 'domainBonusSkills',
        alsoGrantExpertise: true,
      })
    } else if (sub.includes('natureza')) {
      const opts = ['animalHandling', 'nature', 'survival'].map(k => {
        const s = ALL_SKILLS_2014.find(x => x.key === k)!
        return { id: k, name: s.name, description: `Ganha proficiência em ${s.name} (${s.attr}).`, tag: s.attr }
      })
      configs.push({
        id: 'cleric-nature-skill',
        title: 'Acólito da Natureza (Perícia)',
        subtitle: 'Escolha 1 perícia bônus do Domínio da Natureza.',
        minLevel: 1,
        maxSelections: 1,
        options: opts,
        selectedIds: Array.isArray(traits.domainBonusSkills) ? traits.domainBonusSkills : [],
        kind: 'domain_skill',
        traitKey: 'domainBonusSkills',
      })
    } else if (sub.includes('ordem')) {
      const opts = ['intimidation', 'persuasion'].map(k => {
        const s = ALL_SKILLS_2014.find(x => x.key === k)!
        return { id: k, name: s.name, description: `Ganha proficiência em ${s.name} (${s.attr}).`, tag: s.attr }
      })
      configs.push({
        id: 'cleric-order-skill',
        title: 'Proficiência Bônus (Domínio da Ordem)',
        subtitle: 'Escolha entre Intimidação ou Persuasão.',
        minLevel: 1,
        maxSelections: 1,
        options: opts,
        selectedIds: Array.isArray(traits.domainBonusSkills) ? traits.domainBonusSkills : [],
        kind: 'domain_skill',
        traitKey: 'domainBonusSkills',
      })
    }
  }

  // 11. Artífice — Ferramenta de Artesão (nv 1)
  if (cls === 'Artífice') {
    const currentTool = traits['artificer-tool-2014']
    configs.push({
      id: 'artificer-tool',
      title: 'Ferramentas de Artesão',
      subtitle: 'Escolha a proficiência adicional em ferramenta de artesão.',
      minLevel: 1,
      maxSelections: 1,
      options: ARTIFICER_TOOLS,
      selectedIds: currentTool ? [currentTool] : [],
      kind: 'trait_single',
      traitKey: 'artificer-tool-2014',
    })
  }

  return configs
}
