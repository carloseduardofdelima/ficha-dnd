export interface FeatureOption {
  id: string
  name: string
  description: string
}

export interface ClassFeatureChoice {
  id: string
  label: string
  description: string
  type: 'radio' | 'multi'
  maxSelections?: number    // for multi
  options: FeatureOption[]
}

// Class-level passive features (no choices needed — just info to show)
export interface ClassPassiveFeature {
  name: string
  description: string
}

export interface ClassLevel1Data {
  passiveFeatures: ClassPassiveFeature[]
  choices: ClassFeatureChoice[]
}

const WEAPON_MASTERY_OPTIONS: FeatureOption[] = [
  { id: 'mastery-slow', name: 'Lento (Slow)', description: 'Arco curto, Alabarda. Acerto reduz o movimento do alvo em 3m até o próximo turno.' },
  { id: 'mastery-vex', name: 'Irritar (Vex)', description: 'Arco longo, Rapieira. Acerto concede vantagem no seu próximo ataque contra o alvo até o fim do seu próximo turno.' },
  { id: 'mastery-topple', name: 'Derrubar (Topple)', description: 'Maça, Machado de guerra. Acerto exige TR de Força ou o alvo cai Caído (Prone).' },
  { id: 'mastery-push', name: 'Empurrar (Push)', description: 'Alabarda, Bastão. Acerto empurra o alvo 3m para longe de você.' },
  { id: 'mastery-graze', name: 'Roçar (Graze)', description: 'Machado grande, Alabarda. Erro com ataque ainda causa dano igual ao seu bônus de atributo (mínimo 0).' },
  { id: 'mastery-cleave', name: 'Golpe Amplo (Cleave)', description: 'Machado, Azagaia. Uma vez por turno, ao acertar, pode atacar segunda criatura adjacente (mesmo dano da arma, sem atributo).' },
  { id: 'mastery-sap', name: 'Esgotar (Sap)', description: 'Mangual, Maça. Acerto impõe desvantagem no próximo ataque do alvo antes do seu próximo turno.' },
  { id: 'mastery-nick', name: 'Cortar (Nick)', description: 'Adaga, Foice. Permite o ataque extra da propriedade Leve como parte da própria Ação de Ataque (limite 1/turno).' },
]

const CLASS_LEVEL1_DATA: Record<string, ClassLevel1Data> = {
  'Bárbaro': {
    passiveFeatures: [
      { name: 'Raiva (Rage)', description: 'Ação Bônus para entrar em fúria por 10 minutos. Vantagem em testes de Força e TR de Força. Resistência a dano Contundente, Cortante e Perfurante. Bônus de dano: +2. Pode estender a Raiva usando uma Ação Bônus. Usos: 2 (descanso longo).' },
      { name: 'Defesa Sem Armadura', description: 'Sem armadura, sua CA = 10 + Destreza + Constituição. Pode usar escudo.' },
    ],
    choices: [
      {
        id: 'barbarian-weapon-mastery',
        label: 'Maestria com Armas',
        description: 'Escolha 2 tipos de armas (simples ou marciais corpo a corpo) para usar a propriedade de Maestria.',
        type: 'multi',
        maxSelections: 2,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Bardo': {
    passiveFeatures: [
      { name: 'Inspiração Bárdica', description: 'Ação Bônus: 1d6 a um aliado (60 pés). Dura 1 hora. Pode ser usado APÓS ver o resultado do d20 para transformar falha em sucesso. Usos: mod Carisma (mín 1).' },
      { name: 'Conjuração', description: 'Habilidade: Carisma. Foco: Instrumento Musical. Prepara 4 magias de nível 1 e conhece 2 truques.' },
    ],
    choices: [],
  },

  'Clérigo': {
    passiveFeatures: [
      { name: 'Conjuração', description: 'Habilidade: Sabedoria. Foco: Símbolo Sagrado. Prepara magias (Nível + SAB) e conhece 3 truques.' },
    ],
    choices: [
      {
        id: 'divine-order',
        label: 'Ordem Divina',
        description: 'Escolha seu foco inicial como servo divino.',
        type: 'radio',
        options: [
          { id: 'protector', name: 'Protetor (Protector)', description: 'Proficiência em Armadura Pesada e Armas Marciais.' },
          { id: 'thaumaturge', name: 'Taumaturgo (Thaumaturge)', description: 'Aprende 1 truque adicional e ganha bônus em testes de Religião/Arcana.' },
        ]
      }
    ],
  },

  'Druida': {
    passiveFeatures: [
      { name: 'Druídico', description: 'Conhece a língua secreta dos druidas e pode deixar mensagens ocultas.' },
      { name: 'Conjuração', description: 'Habilidade: Sabedoria. Foco: Druídico. Prepara magias (Nível + SAB) e conhece 2 truques.' },
    ],
    choices: [],
  },

  'Guerreiro': {
    passiveFeatures: [
      { name: 'Segundo Fôlego (Second Wind)', description: 'Ação Bônus: recupera 1d10 + nível em PV. Usos: 2 (recupera 1 em descanso curto ou todos no longo).' },
      { name: 'Mente Tática', description: 'Ao falhar um teste de perícia, pode gastar um uso de Segundo Fôlego para somar 1d10 ao resultado.' },
    ],
    choices: [
      {
        id: 'fighting-style-fighter',
        label: 'Estilo de Luta',
        description: 'Escolha uma especialização de combate.',
        type: 'radio',
        options: [
          { id: 'archery', name: 'Arquearia', description: '+2 em ataques com armas de longa distância.' },
          { id: 'defense', name: 'Defesa', description: '+1 CA enquanto usar armadura.' },
          { id: 'dueling', name: 'Duelo', description: '+2 de dano com arma em uma mão (mão oposta livre).' },
          { id: 'great-weapon', name: 'Grande Arma', description: 'Relança 1 ou 2 em dados de dano de armas de duas mãos.' },
          { id: 'protection', name: 'Proteção', description: 'Reação: impõe desvantagem em ataque contra aliado (requer escudo).' },
          { id: 'dual-wielder', name: 'Armas Emparelhadas', description: 'Pode usar maestria de ambas as armas leves ao atacar com duas armas.' },
        ]
      },
      {
        id: 'fighter-weapon-mastery',
        label: 'Maestria com Armas',
        description: 'Escolha 3 tipos de armas (simples ou marciais).',
        type: 'multi',
        maxSelections: 3,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Monge': {
    passiveFeatures: [
      { name: 'Artes Marciais', description: 'Ataques desarmados e com armas de monge usam Destreza. Dado inicial: 1d6. Pode fazer um ataque desarmado extra como Ação Bônus.' },
      { name: 'Defesa Sem Armadura', description: 'Sem armadura/escudo, sua CA = 10 + Destreza + Sabedoria.' },
      { name: 'Pontos de Foco', description: 'Total igual ao seu nível. Recupera em descanso curto/longo. Usos: Flurry of Blows (2 ataques bônus), Patient Defense (Desvio bônus), Step of the Wind (Disparada/Desengajar bônus + pulo duplo).' },
      { name: 'Movimento Sem Armadura', description: 'Ganha +3 metros de deslocamento enquanto não usar armadura ou escudo.' },
    ],
    choices: [],
  },

  'Paladino': {
    passiveFeatures: [
      { name: 'Conjuração', description: 'Habilidade: Carisma. Foco: Símbolo Sagrado. Prepara magias (Nível + CAR). Ganha espaços de magia no Nível 1.' },
      { name: 'Sentido Divino', description: 'Detecta celestiais, demônios e mortos-vivos (60 pés).' },
      { name: 'Sentido do Paladino', description: 'Detecta a localização de criaturas específicas.' },
    ],
    choices: [
      {
        id: 'paladin-weapon-mastery',
        label: 'Maestria com Armas',
        description: 'Escolha 2 tipos de armas (simples ou marciais).',
        type: 'multi',
        maxSelections: 2,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Patrulheiro': {
    passiveFeatures: [
      { name: 'Marca do Caçador (Favored Enemy)', description: 'Magia Hunter\'s Mark sempre preparada. Pode conjurá-la 2 vezes sem gastar slot por descanso longo.' },
      { name: 'Conjuração', description: 'Habilidade: Sabedoria. Foco: Druídico. Prepara magias (Nível + SAB). Ganha espaços de magia no Nível 1.' },
    ],
    choices: [
      {
        id: 'ranger-expertise',
        label: 'Especialização (Expertise)',
        description: 'Escolha 2 perícias com proficiência para dobrar o bônus.',
        type: 'multi',
        maxSelections: 2,
        options: [
          { id: 'animal-handling', name: 'Lidar com Animais', description: '' },
          { id: 'athletics', name: 'Atletismo', description: '' },
          { id: 'insight', name: 'Intuição', description: '' },
          { id: 'investigation', name: 'Investigação', description: '' },
          { id: 'nature', name: 'Natureza', description: '' },
          { id: 'perception', name: 'Percepção', description: '' },
          { id: 'stealth', name: 'Furtividade', description: '' },
          { id: 'survival', name: 'Sobrevivência', description: '' },
        ]
      },
      {
        id: 'ranger-weapon-mastery',
        label: 'Maestria com Armas',
        description: 'Escolha 2 tipos de armas (simples ou marciais).',
        type: 'multi',
        maxSelections: 2,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Ladino': {
    passiveFeatures: [
      { name: 'Ataque Furtivo', description: '1/turno: +1d6 de dano com arma de Acuidade ou Distância se tiver vantagem ou aliado adjacente.' },
      { name: 'Gíria dos Ladrões', description: 'Linguagem secreta e mensagens ocultas.' },
    ],
    choices: [
      {
        id: 'rogue-expertise',
        label: 'Especialização (Expertise)',
        description: 'Escolha 2 perícias (ou 1 perícia + Ferramentas de Ladrão) para dobrar o bônus.',
        type: 'multi',
        maxSelections: 2,
        options: [
          { id: 'acrobatics', name: 'Acrobacia', description: '' },
          { id: 'athletics', name: 'Atletismo', description: '' },
          { id: 'deception', name: 'Enganação', description: '' },
          { id: 'insight', name: 'Intuição', description: '' },
          { id: 'intimidation', name: 'Intimidação', description: '' },
          { id: 'investigation', name: 'Investigação', description: '' },
          { id: 'perception', name: 'Percepção', description: '' },
          { id: 'performance', name: 'Atuação', description: '' },
          { id: 'persuasion', name: 'Persuasão', description: '' },
          { id: 'sleight-of-hand', name: 'Prestidigitação', description: '' },
          { id: 'stealth', name: 'Furtividade', description: '' },
          { id: 'thief-tools', name: 'Ferramentas de Ladrão', description: '' },
        ]
      },
      {
        id: 'rogue-weapon-mastery',
        label: 'Maestria com Armas',
        description: 'Escolha 2 tipos de armas (simples ou marciais com Acuidade ou Leve).',
        type: 'multi',
        maxSelections: 2,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Feiticeiro': {
    passiveFeatures: [
      { name: 'Conjuração Inata', description: 'Ação Bônus: desencadeia onda de magia por 1 min. +1 na CD de suas magias e vantagem em ataques mágicos. Usos: 2 (descanso longo).' },
      { name: 'Pontos de Feitiçaria', description: 'Começa com 2 pontos no Nível 1. Pode converter em slots (Fonte de Magia).' },
      { name: 'Conjuração', description: 'Habilidade: Carisma. Conhece 4 truques e 2 magias.' },
    ],
    choices: [],
  },

  'Bruxo': {
    passiveFeatures: [
      { name: 'Magia de Pacto', description: 'Slots recuperam em descanso curto. 1 slot de nível 1. Conhece 2 truques e 1 magia.' },
    ],
    choices: [
      {
        id: 'eldritch-invocations',
        label: 'Invocações Místicas',
        description: 'Escolha 1 invocação secreta concedida pelo seu patrono.',
        type: 'radio',
        options: [
          { id: 'agonizing-blast', name: 'Explosão Agonizante', description: 'Soma modificador de Carisma ao dano de Eldritch Blast.' },
          { id: 'armor-of-shadows', name: 'Armadura de Sombras', description: 'Pode conjurar Armadura Arcana à vontade, sem slots/componentes.' },
          { id: 'devils-sight', name: 'Visão do Diabo', description: 'Enxerga normalmente em escuridão (mágica ou não) até 36m.' },
          { id: 'mask-of-many-faces', name: 'Máscara de Muitas Faces', description: 'Pode conjurar Disfarce Pessoal à vontade.' },
          { id: 'whispers-of-the-grave', name: 'Sussurros da Tumba', description: 'Pode conjurar Falar com os Mortos à vontade.' },
        ]
      }
    ],
  },

  'Mago': {
    passiveFeatures: [
      { name: 'Ritual de Identificação', description: 'Pode conjurar rituais do livro sem prepará-los.' },
      { name: 'Memória Arcana', description: '1x/descanso longo: recupera um slot gasto como Ação Bônus.' },
      { name: 'Conjuração', description: 'Habilidade: Inteligência. Livro com 6 magias. Prepara Nível + INT. 3 truques.' },
    ],
    choices: [],
  },

  'Artesão Arcano': {
    passiveFeatures: [
      { name: 'Tinkering Mágico (Magical Tinkering)', description: 'Ação Mágica: cria um item mundano (luz, som, cheiro ou efeito visual) em objeto minúsculo. Usos: mod Inteligência.' },
      { name: 'Conjuração', description: 'Habilidade: Inteligência. Foco: Ferramentas de Ladrão, Funileiro ou Artesão proficiente. Prepara magias (Nível/2 + INT).' },
    ],
    choices: [
      {
        id: 'artificer-tool-choice',
        label: 'Ferramentas de Artesão',
        description: 'Escolha um tipo adicional de ferramentas de artesão para ter proficiência.',
        type: 'radio',
        options: [
          { id: 'alchemist', name: 'Alquimista', description: '' },
          { id: 'brewer', name: 'Cervejeiro', description: '' },
          { id: 'calligrapher', name: 'Calígrafo', description: '' },
          { id: 'carpenter', name: 'Carpinteiro', description: '' },
          { id: 'cartographer', name: 'Cartógrafo', description: '' },
          { id: 'cobbler', name: 'Sapateiro', description: '' },
          { id: 'cook', name: 'Cozinheiro', description: '' },
          { id: 'glassblower', name: 'Soprador de vidro', description: '' },
          { id: 'jeweler', name: 'Joalheiro', description: '' },
          { id: 'leatherworker', name: 'Coureiro', description: '' },
          { id: 'mason', name: 'Pedreiro', description: '' },
          { id: 'painter', name: 'Pintor', description: '' },
          { id: 'potter', name: 'Oleiro', description: '' },
          { id: 'smith', name: 'Ferreiro', description: '' },
          { id: 'weaver', name: 'Tecelão', description: '' },
          { id: 'woodcarver', name: 'Entalhador de madeira', description: '' },
        ]
      }
    ],
  },
}

export { CLASS_LEVEL1_DATA }
export default CLASS_LEVEL1_DATA
