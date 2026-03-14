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

const CLASS_LEVEL1_DATA: Record<string, ClassLevel1Data> = {
  'Bárbaro': {
    passiveFeatures: [
      { name: 'Fúria', description: 'Na batalha, você luta com ferocidade primitiva. Em seu turno, pode entrar em fúria como ação bônus. Enquanto furioso: vantagem em testes de Força, bônus de dano +2, resistência a dano de concussão, cortante e perfurante.' },
      { name: 'Defesa Sem Armadura', description: 'Enquanto não estiver usando armadura, sua CA é igual a 10 + seu modificador de Destreza + seu modificador de Constituição. Você pode usar um escudo e ainda ganhar esse benefício.' },
    ],
    choices: [],
  },

  'Bardo': {
    passiveFeatures: [
      { name: 'Conjuração Bárdica', description: 'Você aprendeu a desemaranhar e remodelar a estrutura da realidade em harmonia com seus desejos e sua música. Seus feitiços fazem parte de seu amplo repertório — magia que você pode sintonizar para diferentes situações.' },
      { name: 'Inspiração Bárdica', description: 'Você pode inspirar os outros através de palavras ou música encantada. Como ação bônus, você pode escolher uma criatura diferente de você que possa ouvir você a 18 m de você. Ela ganha um dado de Inspiração Bárdica (d6).' },
    ],
    choices: [
      {
        id: 'bardic-expertise',
        label: 'Perícias Bárdicas',
        description: 'Escolha 2 perícias com as quais você tem proficiência. Seu bônus de proficiência é dobrado para os testes feitos com essas perícias.',
        type: 'multi',
        maxSelections: 2,
        options: [
          { id: 'acrobatics', name: 'Acrobacia', description: 'Testes de acrobacia e equilíbrio' },
          { id: 'deception', name: 'Enganação', description: 'Mentir, disfarçar intenções' },
          { id: 'insight', name: 'Intuição', description: 'Perceber motivações e emoções' },
          { id: 'intimidation', name: 'Intimidação', description: 'Ameaçar e intimidar outros' },
          { id: 'investigation', name: 'Investigação', description: 'Deduzir pistas e examinar cenas' },
          { id: 'perception', name: 'Percepção', description: 'Notar detalhes e perigos' },
          { id: 'performance', name: 'Atuação', description: 'Dança, música, atuação teatral' },
          { id: 'persuasion', name: 'Persuasão', description: 'Convencer e negociar' },
        ]
      }
    ],
  },

  'Clérigo': {
    passiveFeatures: [
      { name: 'Conjuração Divina', description: 'Como conduit para poder divino, você pode lançar feitiços de clérigo.' },
    ],
    choices: [
      {
        id: 'divine-domain',
        label: 'Domínio Divino',
        description: 'Escolha um domínio relacionado à sua divindade, que concede proficiências, magias de domínio e outras características.',
        type: 'radio',
        options: [
          { id: 'life', name: 'Domínio da Vida', description: 'Focado em cura e preservação. Conjuração de Vida: curas são aumentadas. Armadura pesada e magias adicionais: Abençoar, Curar Ferimentos.' },
          { id: 'light', name: 'Domínio da Luz', description: 'Radiância e fogo. Truque adicional: Chama Sagrada. Magias: Fogo das Fadas, Raio Ardente. Protege aliados com luz.' },
          { id: 'trickery', name: 'Domínio do Engano', description: 'Bênção do Trapaceiro: concede vantagem em Destreza (Furtividade) a um aliado. Magias: Enfeitiçar Pessoa, Disfarçar-se.' },
          { id: 'war', name: 'Domínio da Guerra', description: 'Guerreiro Divino: ataque de arma como ação bônus várias vezes. Armadura pesada e proficiência em armas marciais. Magias: Favor Divino, Escudo da Fé.' },
          { id: 'nature', name: 'Domínio da Natureza', description: 'Servo da Natureza: ações Druida. Armadura pesada. Magias adicionais: Falar com Animais, Enredar.' },
          { id: 'knowledge', name: 'Domínio do Conhecimento', description: 'Bênção do Conhecimento: proficiência extra em 2 idiomas e 2 perícias de conhecimento. Magias: Comandar, Identificar.' },
          { id: 'tempest', name: 'Domínio da Tempestade', description: 'Ira da Tempestade: reação causando dano elétrico quando atingido. Armadura pesada, armas marciais. Magias: Névoa, Onda de Trovão.' },
          { id: 'death', name: 'Domínio da Morte', description: 'Destruição Reaper: truques de necromancia afetam duas criaturas. Magias: Falsa Vida, Raio de Energia.' },
        ]
      }
    ],
  },

  'Druida': {
    passiveFeatures: [
      { name: 'Druídico', description: 'Você conhece Druídico, a língua secreta dos druidas. Você pode falar a língua e usá-la para deixar mensagens ocultas.' },
      { name: 'Conjuração Druídica', description: 'Poder de conjuração associado à natureza.' },
    ],
    choices: [],
  },

  'Guerreiro': {
    passiveFeatures: [
      { name: 'Surto de Ação', description: 'Começando no 2º nível, você pode se pressionar além de seus limites normais por um momento. Neste turno, você pode tomar uma ação adicional.' },
    ],
    choices: [
      {
        id: 'fighting-style',
        label: 'Estilo de Luta',
        description: 'Você adota um estilo de luta específico como especialização. Escolha uma das seguintes opções.',
        type: 'radio',
        options: [
          { id: 'archery', name: 'Arquearia', description: '+2 em jogadas de ataque com armas de alcance.' },
          { id: 'blind-fighting', name: 'Luta às Cegas', description: 'Você tem visão às cegas em um raio de 3 m.' },
          { id: 'defense', name: 'Defesa', description: '+1 de CA enquanto estiver usando armadura.' },
          { id: 'dueling', name: 'Duelo', description: '+2 de dano quando estiver empunhando uma arma corpo a corpo em uma mão e nenhuma outra arma.' },
          { id: 'great-weapon', name: 'Arma Grande', description: 'Ao rolar 1 ou 2 no dado de dano de uma arma de duas mãos, você pode rolar novamente.' },
          { id: 'interception', name: 'Interceptação', description: 'Reação: reduz o dano de um aliado a 1,5 m em 1d10 + bônus de proficiência.' },
          { id: 'protection', name: 'Proteção', description: 'Reação: imponha desvantagem em ataques contra aliados adjacentes (precisa de escudo).' },
          { id: 'superior-technique', name: 'Técnica Superior', description: 'Aprende 1 manobra de Mestre de Batalha e ganha um dado de superioridade (d6).' },
          { id: 'thrown-weapon', name: 'Arma de Arremesso', description: '+2 de dano com armas de arremesso. Pode sacar armas de arremesso como parte do ataque.' },
          { id: 'two-weapon', name: 'Combate com Duas Armas', description: 'Ao lutar com duas armas, adiciona o modificador de habilidade ao dano do ataque com a arma na mão secundária.' },
          { id: 'unarmed', name: 'Combate Desarmado', description: '+1 de bônus em jogadas de ataque e dano desarmado. Pode usar reação para agarrar.' },
        ]
      }
    ],
  },

  'Monge': {
    passiveFeatures: [
      { name: 'Artes Marciais', description: 'Sua prática das artes marciais dá maestria ao combate usando golpes desarmados e armas de monge. Você pode usar Des em vez de For para ataques e danos com armas de monge e golpes desarmados.' },
      { name: 'Ki', description: 'Começando no 2º nível, você pode canalizar seu ki misterioso — sua força vital que a maioria dos personagens não percebe. Pontos de Ki = Nível de Monge.' },
    ],
    choices: [],
  },

  'Paladino': {
    passiveFeatures: [
      { name: 'Senso Divino', description: 'A presença de bem ou mal forte registra em seus sentidos como um odor ofensivo, e uma luz poderosa fere seus olhos. Pode detectar a presença de celestiais, demônios e mortos-vivos.' },
      { name: 'Impor Mãos', description: 'Sua toque benta pode curar ferimentos. Você tem uma piscina de poder de cura que se reabastece quando você faz um descanso longo. Com ela você pode restaurar um número total de PV = seu nível de paladino × 5.' },
    ],
    choices: [
      {
        id: 'fighting-style-paladin',
        label: 'Estilo de Luta',
        description: 'Você adota um estilo de luta específico como especialização.',
        type: 'radio',
        options: [
          { id: 'blessed-warrior', name: 'Guerreiro Abençoado', description: 'Aprende 2 truques de Clérigo. Car é o atributo de conjuração.' },
          { id: 'blind-fighting', name: 'Luta às Cegas', description: 'Visão às cegas em 3 m.' },
          { id: 'defense', name: 'Defesa', description: '+1 CA usando armadura.' },
          { id: 'dueling', name: 'Duelo', description: '+2 de dano com arma em uma mão.' },
          { id: 'great-weapon', name: 'Arma Grande', description: 'Rola 1 ou 2 novamente em dano de armas grandes.' },
          { id: 'protection', name: 'Proteção', description: 'Impõe desvantagem em ataques contra aliados com escudo.' },
        ]
      }
    ],
  },

  'Patrulheiro': {
    passiveFeatures: [
      { name: 'Inimigo Favorito', description: 'Você tem experiência significativa estudando, rastreando, caçando e até se comunicando com um certo tipo de inimigo. Vantagem em testes de Sobrevivência para rastrear e testes de Inteligência para se lembrar de informações sobre eles.' },
      { name: 'Explorador Natural', description: 'Você é um mestre em viajar e sobreviver em determinados ambientes naturais. Escolha 1 tipo de terreno favorito. Ao navegar nele, você não pode ser perdido sem meios mágicos.' },
    ],
    choices: [
      {
        id: 'fighting-style-ranger',
        label: 'Estilo de Luta',
        description: 'Você adota um estilo de luta específico como especialização.',
        type: 'radio',
        options: [
          { id: 'archery', name: 'Arquearia', description: '+2 em jogadas de ataque com armas de alcance.' },
          { id: 'blind-fighting', name: 'Luta às Cegas', description: 'Visão às cegas em 3 m.' },
          { id: 'druidic-warrior', name: 'Guerreiro Druídico', description: 'Aprende 2 truques de Druida.' },
          { id: 'dueling', name: 'Duelo', description: '+2 de dano com arma em uma mão.' },
          { id: 'thrown-weapon', name: 'Arma de Arremesso', description: '+2 de dano com armas de arremesso.' },
          { id: 'two-weapon', name: 'Duas Armas', description: 'Adiciona modificador de habilidade ao dano da arma secundária.' },
        ]
      }
    ],
  },

  'Ladino': {
    passiveFeatures: [
      { name: 'Especialização', description: 'Você pode dobrar seu bônus de proficiência para dois de suas perícias, ou uma perícia e ferramentas de ladrão.' },
      { name: 'Ataque Furtivo', description: 'Você sabe como golpear sutilmente e explorar a distração do inimigo. Você causa 1d6 extra de dano a uma criatura que você acerta com um ataque de vantagem ou um aliado a 1,5 m dela.' },
      { name: 'Gíria dos Ladrões', description: 'Você aprendeu a linguagem secreta dos ladrões e pode ocultar mensagens em conversas normais.' },
    ],
    choices: [
      {
        id: 'rogue-expertise',
        label: 'Especialização',
        description: 'Escolha 2 de suas perícias ou uma perícia e ferramentas de ladrão para dobrar seu bônus de proficiência.',
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
      }
    ],
  },

  'Feiticeiro': {
    passiveFeatures: [
      { name: 'Conjuração Feiticeira', description: 'Um evento em sua passado deixou você imbuído de um poder arcano latente que floresce com o tempo.' },
    ],
    choices: [
      {
        id: 'sorcerous-origin',
        label: 'Origem Feiticeira',
        description: 'Escolha a origem que descreve a fonte do seu poder mágico inato.',
        type: 'radio',
        options: [
          { id: 'draconic', name: 'Ancestralidade Dracônica', description: 'Magia instilada por sangue de dragão. Escolha um tipo de dragão, ganha resistência a esse dano e Draconian Resilience (+1 PV/nível, CA 13+Des sem armadura).' },
          { id: 'wild-magic', name: 'Magia Selvagem', description: 'Sua magia vem de uma exposição a forças brutas do caos. Surge Mágico ativado às vezes pelo DM, criando efeitos caóticos imprevisíveis.' },
          { id: 'storm', name: 'Alma da Tempestade', description: 'Poder inato de tempestades. Resistência a dano elétrico e de trovão. Pode falar com aves.' },
          { id: 'shadow', name: 'Magia das Sombras', description: 'Poder extraído das Sombras. Pode ver em escuridão mágica. Ganha o truque Olhos das Trevas gratuitamente.' },
          { id: 'divine-soul', name: 'Alma Divina', description: 'Seu sangue carrega um laço a deus. Acesso à lista de magias de Clérigo. Bônus em testes de morte.' },
          { id: 'aberrant-mind', name: 'Mente Aberrante', description: 'Poder psíquico de contato com aberrações. Aprende Telepatia Sussurrada e pode substituir magias lentamente.' },
        ]
      }
    ],
  },

  'Bruxo': {
    passiveFeatures: [
      { name: 'Conjuração Profana', description: 'Seu patrono arcano lhe concede o dom de magia.' },
      { name: 'Invocações Profanas', description: 'No fragmento de estudo profano que você transformou em ritmo de vida, você aprendeu invocações — fragmentos de conhecimento proibido que lhe conferem habilidades mágicas permanentes.' },
    ],
    choices: [
      {
        id: 'otherworldly-patron',
        label: 'Patrono Sobrenatural',
        description: 'Você fez um pacto com um ser de outra esfera. Escolha o tipo de patrono.',
        type: 'radio',
        options: [
          { id: 'archfey', name: 'O Arquifada', description: 'Ser do Feywild de imenso poder. Magia de encantamento e ilusão. Habilidade: Presença da Fada — encanta ou aterroriza criaturas ao redor.' },
          { id: 'fiend', name: 'O Espírito Maligno', description: 'Senhor do Inferno. Magia de fogo e dano. Habilidade: Bênção do Escuro — ganhe PV temporários ao matar criaturas.' },
          { id: 'great-old-one', name: 'O Grande Antigo', description: 'Entidade cósmica incompreensível. Magia psíquica. Habilidade: Mente Desperta — comunicação telepática em 9 m.' },
          { id: 'celestial', name: 'O Celestial', description: 'Ser da luz e bondade. Magia de cura. Habilidade: Fontede Cura — acesso a truques de curar.' },
          { id: 'hexblade', name: 'A Lâmina Hexada', description: 'Misterioso ser ligado à Sombra. Magia com armas. Habilidade: Maldição da Lâmina Hexada — cursa um inimigo para aumentar dano.' },
          { id: 'undead', name: 'O Morto-Vivo', description: 'Um poderoso morto-vivo. Magia sombria. Habilidade: Forma do Sepulcro — torna-se assustador e imune a certos estados.' },
        ]
      }
    ],
  },

  'Mago': {
    passiveFeatures: [
      { name: 'Recuperação Arcana', description: 'Uma vez por dia quando você faz um descanso curto, você pode escolher espaços de magia gastos para recuperar. Os espaços de magia totais podem ser no máximo metade do seu nível de mago (mínimo 1).' },
    ],
    choices: [
      {
        id: 'arcane-tradition',
        label: 'Tradição Arcana',
        description: 'Ao atingir o 2º nível você escolhe uma tradição arcana. Porém, desde o 1º nível você estuda em sua escola de escolha.',
        type: 'radio',
        options: [
          { id: 'abjuration', name: 'Escola de Abjuração', description: 'Proteção e resistência. Especialização em bloqueio de magias e barreiras mágicas.' },
          { id: 'conjuration', name: 'Escola de Conjuração', description: 'Invocar criaturas e criar objetos do nada. Teleportação de curta distância.' },
          { id: 'divination', name: 'Escola de Adivinhação', description: 'Visão e presciência. Pode "trapacear" em dados com Portento.' },
          { id: 'enchantment', name: 'Escola de Encantamento', description: 'Controle mental e social. Pode fazer aliados salvos de seus próprios feitiços.' },
          { id: 'evocation', name: 'Escola de Evocação', description: 'Dano mágico puro. Magias moldadas para não causar dano a aliados.' },
          { id: 'illusion', name: 'Escola de Ilusão', description: 'Criação de imagens e sons falsos. Pode tornar ilusões semi-reais.' },
          { id: 'necromancy', name: 'Escola de Necromancia', description: 'Morte e vida. Magias de necromancia melhoradas, pode criar mortos-vivos.' },
          { id: 'transmutation', name: 'Escola de Transmutação', description: 'Transformação da matéria. Pedra de Transmutação com bônus únicos.' },
          { id: 'bladesinging', name: 'Cantolâmina', description: 'Tradição élfica: combinação de artes marciais e magia. Bônus de CA e velocidade na forma de Cantolâmina.' },
          { id: 'war-magic', name: 'Magia de Guerra', description: 'Proteção e resiliência em combate. Bônus de CA e concentração.' },
        ]
      }
    ],
  },

  'Artesão Arcano': {
    passiveFeatures: [
      { name: 'Infundir Itens', description: 'Você aprendeu fórmulas de artesão mágico para criar objetos mágicos. Você pode infundir até dois itens por vez com propriedades mágicas.' },
      { name: 'Maestria com Ferramentas', description: 'Você ganha proficiência com todos os utensílios artesanais.' },
    ],
    choices: [
      {
        id: 'arcane-specialization',
        label: 'Especialização Arcana',
        description: 'No 3º nível você formalmente escolhe uma especialização. No 1º nível, indique sua área de maior interesse.',
        type: 'radio',
        options: [
          { id: 'alchemist', name: 'Alquimista', description: 'Criação de elixires e poções mágicas que curam, causam explosões ácidas ou concedem voo temporário.' },
          { id: 'armorsmith', name: 'Armeiro', description: 'Criação e melhoria de armaduras arcanas. A armadura torna-se uma extensão do corpo.' },
          { id: 'artillerist', name: 'Artilheiro', description: 'Criação de canhões arcanos que disparam rajadas de energia, chamas ou explosões.' },
          { id: 'battle-smith', name: 'Ferreiro de Batalha', description: 'Criação de um Servo de Aço — um companheiro construto que combate ao seu lado.' },
        ]
      }
    ],
  },
}

export { CLASS_LEVEL1_DATA }
export default CLASS_LEVEL1_DATA
