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
      { name: 'Fúria (Rage)', description: 'Ação Bônus: você entra em um estado de fúria por 10 min. Ganha Vantagem em testes e salvaguardas de Força, Resistência a dano físico (Contundente, Cortante e Perfurante) e bônus de +2 no dano de ataques de Força. Pode ser estendida com Ação Bônus ou ao causar dano. Usos: 2 por Descanso Longo.' },
      { name: 'Defesa Sem Armadura', description: 'Enquanto não usar armadura, sua Classe de Armadura (CA) é 10 + Mod. de Destreza + Mod. de Constituição. Você pode usar um escudo e manter esse benefício.' },
    ],
    choices: [
      {
        id: 'barbarian-weapon-mastery',
        label: 'Maestria com Armas',
        description: 'Escolha 2 tipos de armas para desbloquear propriedades especiais de combate.',
        type: 'multi',
        maxSelections: 2,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Bardo': {
    passiveFeatures: [
      { name: 'Inspiração Bárdica', description: 'Ação Bônus: você concede um dado de inspiração (1d6) a um aliado a até 18m. Por 1 hora, o aliado pode rolar o dado e somar o resultado a um teste de atributo, ataque ou salvaguarda que tenha falhado. Usos: Mod. de Carisma por Descanso Longo.' },
      { name: 'Conjuração', description: 'Habilidade: Carisma. Você prepara suas magias e pode usar instrumentos musicais como foco. Começa com 2 Truques e 4 magias de Nível 1.' },
    ],
    choices: [],
  },

  'Clérigo': {
    passiveFeatures: [
      { name: 'Conjuração', description: 'Habilidade: Sabedoria. Você prepara suas magias através de orações. Começa com 3 Truques e prepara um número de magias igual a 1 + seu Nível + Mod. de Sabedoria.' },
    ],
    choices: [
      {
        id: 'divine-order',
        label: 'Ordem Divina',
        description: 'Escolha como você serve à sua divindade.',
        type: 'radio',
        options: [
          { id: 'protector', name: 'Protetor (Protector)', description: 'Você ganha proficiência em Armaduras Pesadas e Armas Marciais.' },
          { id: 'thaumaturge', name: 'Taumaturgo (Thaumaturge)', description: 'Você aprende um Truque adicional de Clérigo e ganha proficiência em Arcanismo ou Religião.' },
        ]
      }
    ],
  },

  'Druida': {
    passiveFeatures: [
      { name: 'Druídico', description: 'Você conhece a língua secreta dos Druidas. Pode deixar mensagens ocultas e entender outras criaturas que falem este idioma naturalmente.' },
      { name: 'Conjuração', description: 'Habilidade: Sabedoria. Você utiliza o poder da natureza. Começa com 2 Truques e prepara magias diariamente.' },
    ],
    choices: [],
  },

  'Guerreiro': {
    passiveFeatures: [
      { name: 'Segundo Fôlego (Second Wind)', description: 'Ação Bônus: você recupera 1d10 + seu nível em PV. Usos: 2 por Descanso Longo (recupera 1 uso em Descanso Curto).' },
      { name: 'Mente Tática', description: 'Ao falhar em um teste de perícia, você pode gastar 1 uso de Segundo Fôlego para adicionar 1d10 ao resultado, potencialmente transformando a falha em sucesso.' },
    ],
    choices: [
      {
        id: 'fighting-style-fighter',
        label: 'Estilo de Luta',
        description: 'Escolha sua especialização de combate.',
        type: 'radio',
        options: [
          { id: 'archery', name: 'Arquearia', description: 'Bônus de +2 em ataques com armas à distância.' },
          { id: 'defense', name: 'Defesa', description: 'Bônus de +1 na CA enquanto estiver usando armadura.' },
          { id: 'dueling', name: 'Duelo', description: 'Bônus de +2 no dano ao usar uma arma em uma mão e nenhuma outra arma.' },
          { id: 'great-weapon', name: 'Armas Grandes', description: 'Ao rolar 1 ou 2 no dado de dano de armas de duas mãos, você pode relançar o dado (deve usar o novo resultado).' },
          { id: 'protection', name: 'Proteção', description: 'Reação: impõe Desvantagem em um ataque contra um aliado adjacente (requer uso de escudo).' },
          { id: 'dual-wielder', name: 'Combatente com Duas Armas', description: 'Você pode somar seu modificador de atributo ao dano do segundo ataque realizado com a ação bônus.' },
        ]
      },
      {
        id: 'fighter-weapon-mastery',
        label: 'Maestria com Armas',
        description: 'Escolha 3 tipos de armas para dominar suas técnicas especiais.',
        type: 'multi',
        maxSelections: 3,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Monge': {
    passiveFeatures: [
      { name: 'Artes Marciais', description: 'Ataques desarmados e armas de monge usam Destreza para ataque e dano. Dado de dano: 1d6. Pode realizar um ataque desarmado extra como Ação Bônus.' },
      { name: 'Defesa Sem Armadura', description: 'Enquanto não usar armadura ou escudo, sua CA é 10 + Mod. de Destreza + Mod. de Sabedoria.' },
      { name: 'Pontos de Foco (Ki)', description: 'Você possui pontos de Foco iguais ao seu nível. Recupera em descansos curtos ou longos. Usos: Rajada de Golpes (2 ataques desarmados bônus).' },
      { name: 'Agilidade Disciplinada', description: 'Ação Bônus: você pode usar Desengajar (Defesa Paciente) ou Disparada (Passo do Vento) gratuitamente. Se gastar 1 ponto de Foco, ganha Esquiva (Defesa Paciente) ou dobra a distância de pulo e Desengaja (Passo do Vento).' },
    ],
    choices: [],
  },

  'Paladino': {
    passiveFeatures: [
      { name: 'Mãos Curativas (Lay on Hands)', description: 'Ação: você possui uma reserva de cura igual a 5 x seu nível. Pode tocar uma criatura e gastar pontos dessa reserva para curar PV ou 5 pontos para remover uma doença ou veneno.' },
      { name: 'Sentido Divino', description: 'Ação Bônus: por 10 min, você sente a localização de Celestiais, Demônios ou Mortos-vivos a até 18m. Usos: Mod. de Carisma por Descanso Longo.' },
      { name: 'Conjuração', description: 'Habilidade: Carisma. Você prepara magias de Paladino desde o Nível 1. Prepara Nível/2 (arredondado para cima) + Mod. de Carisma.' },
    ],
    choices: [
      {
        id: 'paladin-weapon-mastery',
        label: 'Maestria com Armas',
        description: 'Escolha 2 tipos de armas para dominar.',
        type: 'multi',
        maxSelections: 2,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Patrulheiro': {
    passiveFeatures: [
      { 
        name: 'Explorador Ágil (Especialização)', 
        description: 'Você ganha Especialização (Expertise) em uma perícia à sua escolha. Além disso, você aprende dois idiomas adicionais de sua preferência.' 
      },
      { 
        name: 'Inimigo Favorito (Marca do Caçador)', 
        description: 'Você sempre tem a magia Marca do Caçador (Hunter\'s Mark) preparada. Você pode conjurá-la sem gastar espaços de magia um número de vezes igual ao seu Bônus de Proficiência por Descanso Longo.' 
      },
      { name: 'Conjuração', description: 'Habilidade: Sabedoria. Você canaliza o poder da natureza para conjurar magias desde o nível 1.' },
    ],
    choices: [
      {
        id: 'ranger-expertise',
        label: 'Escolha de Especialização',
        description: 'Escolha a perícia para o benefício de Explorador Ágil.',
        type: 'multi',
        maxSelections: 1,
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
        description: 'Escolha 2 tipos de armas para dominar.',
        type: 'multi',
        maxSelections: 2,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Ladino': {
    passiveFeatures: [
      { name: 'Ataque Furtivo (Sneak Attack)', description: '1x por turno: você causa +1d6 de dano a uma criatura que acertar com arma de Acuidade ou Distância, desde que tenha Vantagem ou um aliado adjacente ao alvo.' },
      { name: 'Gíria de Ladrão', description: 'Você conhece o código secreto usado no submundo para transmitir mensagens ocultas em conversas comuns.' },
    ],
    choices: [
      {
        id: 'rogue-expertise',
        label: 'Especialização (Expertise)',
        description: 'Escolha 2 perícias (ou Ferramentas de Ladrão) para dobrar seu bônus de proficiência.',
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
        description: 'Escolha 2 tipos de armas para dominar.',
        type: 'multi',
        maxSelections: 2,
        options: WEAPON_MASTERY_OPTIONS
      }
    ],
  },

  'Feiticeiro': {
    passiveFeatures: [
      { name: 'Conjuração Inata (Innate Sorcery)', description: 'Ação: você libera o poder no seu sangue por 1 min. Suas magias ganham +1 na CD de salvaguarda e você tem Vantagem em ataques mágicos. Usos: 2 por Descanso Longo.' },
      { name: 'Pontos de Feitiçaria', description: 'Você possui 2 pontos de feitiçaria no nível 1. Pode usá-los para recuperar espaços de magia (Fonte de Magia).' },
      { name: 'Conjuração', description: 'Habilidade: Carisma. Suas magias são parte de você. Começa com 4 Truques e 2 magias de Nível 1.' },
    ],
    choices: [],
  },

  'Bruxo': {
    passiveFeatures: [
      { name: 'Magia de Pacto', description: 'Habilidade: Carisma. Seus espaços de magia são sempre do nível máximo possível e você os recupera em Descansos Curtos.' },
    ],
    choices: [
      {
        id: 'eldritch-invocations',
        label: 'Invocações Místicas',
        description: 'Escolha 1 dom sobrenatural concedido por seu Patrono.',
        type: 'radio',
        options: [
          { id: 'agonizing-blast', name: 'Explosão Agonizante', description: 'Soma seu Mod. de Carisma ao dano do Truque Descarga Sobrenatural.' },
          { id: 'armor-of-shadows', name: 'Armadura de Sombras', description: 'Você pode conjurar Armadura Arcana em si mesmo à vontade, sem gastar slots.' },
          { id: 'devils-sight', name: 'Visão do Diabo', description: 'Você enxerga normalmente na escuridão, inclusive mágica, até 36 metros.' },
          { id: 'mask-of-many-faces', name: 'Máscara de Muitas Faces', description: 'Você pode conjurar Disfarce Pessoal à vontade, sem gastar slots.' },
          { id: 'whispers-of-the-grave', name: 'Sussurros da Tumba', description: 'Você pode conjurar Falar com os Mortos à vontade, sem gastar slots.' },
        ]
      }
    ],
  },

  'Mago': {
    passiveFeatures: [
      { name: 'Recuperação Arcana', description: '1x por dia: após um Descanso Curto, você pode recuperar espaços de magia gastos cujo nível total seja igual ou menor que metade do seu nível (mín. 1).' },
      { name: 'Memória Arcana', description: 'Ação: você pode trocar uma das suas magias preparadas por outra do seu grimório. Usos: 1 por Descanso Longo.' },
      { name: 'Conjuração', description: 'Habilidade: Inteligência. Você usa um grimório para estudar suas magias. Começa com 3 Truques e 6 magias no livro.' },
    ],
    choices: [],
  },

  'Artesão Arcano': {
    passiveFeatures: [
      { name: 'Engenharia Mágica (Magical Tinkering)', description: 'Ação Mágica: imbuí um objeto minúsculo não mágico com uma propriedade: emite luz (1,5m), reproduz uma mensagem gravada de 6s ao ser tocado, emite um odor ou som contínuo, ou exibe um efeito visual estático. Dura até você terminar o efeito ou criar outro além do seu limite (Mod. INT).' },
      { name: 'Conjuração', description: 'Habilidade: Inteligência. Você usa ferramentas para canalizar seus feitiços. Começa com 2 Truques e prepara magias igual a INT + metade do nível.' },
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
