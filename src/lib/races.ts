export interface RaceTrait {
  name: string
  description: string
}

export interface Race {
  id: string
  name: string
  description: string
  traits: RaceTrait[]
  image: string
  lineages?: {
    name: string
    description?: string
    traits: RaceTrait[]
    attributeBonuses?: Record<string, number>
    speed?: number
  }[]
  subRaceTitle?: string
  subRaceMandatory?: boolean
  source: string
  speed: number
  size: 'Pequeno' | 'Médio' | 'Pequeno ou Médio'
  fixedSkills?: string[]
  bonusSkillCount?: number
  attributeBonuses?: Record<string, number>
  skillProf?: string[]            // Fixed skill names in PT
  skillChoice?: {                 // Choice of skills
    count: number
    options?: string[]            // PT labels, if undefined any skill
  }
}

export const RACES: Race[] = [
  {
    id: 'aasimar',
    name: 'Aasimar',
    description: 'Os Aasimar são mortais que carregam uma centelha dos Planos Superiores em suas almas.',
    image: '/assets/aasimar.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Pequeno ou Médio',
    traits: [
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Cura Celestial (Nível 1)', description: 'Como uma Ação Bônus, você toca uma criatura e ela recupera um número de d4s igual ao seu Bônus de Proficiência. Uma vez por descanso longo.' },
      { name: 'Portador da Luz (Nível 1)', description: 'Você conhece o truque Luz (sempre preparado).' },
      { name: 'Revelação Celestial (Nível 3)', description: 'Como uma Ação Bônus, você se transforma por 1 minuto. Escolha uma das 3 formas cada vez que usar: Alma Radiante (Voo e dano extra), Consumação Radiante (Aura de dano e dano extra) ou Véu Necrótico (Assustar e dano extra). Uma vez por descanso longo.' }
    ]
  },
  {
    id: 'dragonborn',
    name: 'Draconato',
    description: 'Os ancestrais dos draconatos eclodiram de ovos de dragões cromáticos e metálicos.',
    image: '/assets/dragonborn.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Médio',
    subRaceTitle: 'Ancestralidade Dracônica',
    subRaceMandatory: true,
    lineages: [
      { name: 'Negra (Ácido)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Ácido.' }] },
      { name: 'Azul (Elétrico)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Elétrico.' }] },
      { name: 'Latão (Fogo)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Fogo.' }] },
      { name: 'Bronze (Elétrico)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Elétrico.' }] },
      { name: 'Cobre (Ácido)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Ácido.' }] },
      { name: 'Ouro (Fogo)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Fogo.' }] },
      { name: 'Verde (Veneno)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Veneno.' }] },
      { name: 'Vermelha (Fogo)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Fogo.' }] },
      { name: 'Prata (Frio)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Frio.' }] },
      { name: 'Branca (Frio)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Frio.' }] },
    ],
    traits: [
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Resistência Dracônica', description: 'Você tem resistência ao tipo de dano associado à sua ancestralidade.' },
      { name: 'Arma de Sopro (Nível 1)', description: 'Quando você usa a ação de Ataque, pode substituir um dos ataques por um sopro em Cone (15 pés) ou Linha (30 pés). As criaturas na área devem fazer um Teste de Resistência de Destreza ou Constituição (sua escolha) contra Dificuldade 8 + Mod. Con + Bônus de Proficiência. Dano: 1d10 + seu nível (metade se passar). Usos: Bônus de Proficiência vezes por Descanso Longo.' },
      { name: 'Voo Dracônico (Nível 5)', description: 'Como uma Ação Bônus, você ganha asas espectrais e velocidade de voo por 10 minutos. Uma vez por descanso longo.' }
    ]
  },
  {
    id: 'dwarf',
    name: 'Anão',
    description: 'Anões foram erguidos da terra nos dias antigos por uma divindade da forja.',
    image: '/assets/dwarf.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Médio',
    traits: [
      { name: 'Visão no Escuro', description: '120 pés.' },
      { name: 'Resiliência Anã', description: 'Resistência a dano de Veneno e vantagem em salvaguardas contra envenenamento.' },
      { name: 'Robustez Anã', description: 'Conta como 1 tamanho maior para capacidade de carga e empurrar.' },
      { name: 'Treinamento Anão', description: 'Proficiência em Machados, Bestas de Mão, Picaretas e Martelos.' },
      { name: 'Conhecimento da Pedra (Stonecunning)', description: 'Como Ação Bônus, ganha Sentido Sísmico 60 pés por 10 minutos em superfícies de pedra. Usos: Bônus de Proficiência vezes por Descanso Longo.' }
    ]
  },
  {
    id: 'elf',
    name: 'Elfo',
    description: 'A curiosidade dos elfos levou muitos deles a explorar outros planos de existência.',
    image: '/assets/elf.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Médio',
    subRaceTitle: 'Linhagem Élfica',
    subRaceMandatory: true,
    lineages: [
      { 
        name: 'Drow', 
        description: 'Formado pelo Subterrâneo; não tem mais Sensibilidade à Luz.', 
        traits: [
          { name: 'Visão no Escuro', description: '120 pés.' },
          { name: 'Magia Drow', description: '[Nível 1] Luzes Dançantes, [Nível 3] Fogo Fatuo, [Nível 5] Escuridão.' }
        ] 
      },
      { 
        name: 'Alto Elfo', 
        description: 'Infundido com magia das travessias entre a Agrestia Feérica e o Plano Material.', 
        traits: [
          { name: 'Magia de Alto Elfo', description: '[Nível 1] Prestidigitação (pode trocar após um descanso longo), [Nível 3] Detectar Magia, [Nível 5] Passo Nebuloso.' }
        ] 
      },
      { 
        name: 'Elfo da Floresta', 
        description: 'Moldado pela magia das florestas antigas.', 
        speed: 35,
        traits: [
          { name: 'Velocidade', description: '35 pés.' },
          { name: 'Magia de Elfo da Floresta', description: '[Nível 1] Druidismo, [Nível 3] Passos Longos, [Nível 5] Passos sem Pegadas.' }
        ] 
      },
    ],
    traits: [
      { name: 'Ancestralidade Feérica', description: 'Vantagem em salvaguardas para evitar ser Encantado.' },
      { name: 'Sentidos Apurados', description: 'Proficiência em Intuição, Percepção ou Sobrevivência.' },
      { name: 'Transe', description: 'Você completa um Descanso Longo em 4 horas; magia não pode te colocar para dormir.' },
      { name: 'Linhagem Élfica', description: 'Sua linhagem concede acesso a magias específicas.' }
    ],
    skillChoice: {
      count: 1,
      options: ['Intuição', 'Percepção', 'Sobrevivência']
    }
  },
  {
    id: 'gnome',
    name: 'Gnomo',
    description: 'Os gnomos são um povo mágico criado por deuses da invenção, ilusão e vida subterrânea.',
    image: '/assets/gnome.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Pequeno',
    subRaceTitle: 'Linhagem Gnômica',
    subRaceMandatory: true,
    lineages: [
      { 
        name: 'Gnomo da Floresta', 
        description: 'Artistas, ilusionistas e amigos dos animais.',
        traits: [
          { name: 'Ilusão Menor', description: 'Você conhece o truque Ilusão Menor.' },
          { name: 'Falar com Animais', description: 'Você tem a magia Falar com Animais sempre preparada. Você pode lançá-la sem gastar espaços de magia um número de vezes igual ao seu PB por descanso longo.' }
        ]
      },
      { 
        name: 'Gnomo das Rochas', 
        description: 'Inventores, engenheiros e relojoeiros.',
        traits: [
          { name: 'Consertar e Prestidigitação', description: 'Você conhece os truques Consertar e Prestidigitação.' },
          { name: 'Artífice Tinker', description: 'Você pode usar Prestidigitação para criar até 3 dispositivos minúsculos, como relógios, isqueiros ou brinquedos animados.' }
        ]
      }
    ],
    traits: [
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Astúcia Gnômica', description: 'Vantagem em salvaguardas de Inteligência, Sabedoria e Carisma.' },
      { name: 'Linhagem Gnômica', description: 'Sua linhagem define suas habilidades mágicas iniciais.' }
    ]
  },
  {
    id: 'goliath',
    name: 'Goliath',
    description: 'Goliaths são descendentes distantes de gigantes e buscam alturas acima das alcançadas por seus ancestrais.',
    image: '/assets/goliath.png',
    source: "Player's Handbook 2024",
    speed: 35,
    size: 'Médio',
    subRaceTitle: 'Ancestralidade Gigante',
    subRaceMandatory: true,
    lineages: [
      { name: "Salto das Nuvens (Gigante das Nuvens)", traits: [{ name: 'Teleporte', description: 'Ação Bônus: teleporta-se até 30 pés para um espaço visível. Usos: PB vezes por descanso longo.' }] },
      { name: "Queimadura de Fogo (Gigante do Fogo)", traits: [{ name: 'Dano Extra', description: 'Ao acertar um ataque: +1d10 de dano de Fogo. Usos: PB vezes por descanso longo.' }] },
      { name: "Frio do Gelo (Gigante do Gelo)", traits: [{ name: 'Frio e Lentidão', description: 'Ao acertar um ataque: +1d6 de dano de Frio e a velocidade do alvo diminui em 10 pés. Usos: PB vezes por descanso longo.' }] },
      { name: "Trombo da Colina (Gigante da Colina)", traits: [{ name: 'Derrubar', description: 'Ao acertar uma criatura Grande ou menor: ela fica Prostrada. Usos: PB vezes por descanso longo.' }] },
      { name: "Resistência da Pedra (Gigante da Pedra)", traits: [{ name: 'Reduzir Dano', description: 'Reação ao receber dano: reduza o dano em 1d12 + seu modificador de Constituição. Usos: PB vezes por descanso longo.' }] },
      { name: "Trovão da Tempestade (Gigante da Tempestade)", traits: [{ name: 'Contra-ataque Trovejante', description: 'Reação ao receber dano de uma criatura a até 60 pés: ela sofre 1d8 de dano trovejante. Usos: PB vezes por descanso longo.' }] },
    ],
    traits: [
      { name: 'Constituição Poderosa', description: 'Conta como 1 tamanho maior para carga/empurrar e tem Vantagem em salvaguardas para encerrar a condição Agarrado.' },
      { name: 'Forma Grande (Nível 5)', description: 'Como uma Ação Bônus, você se torna Grande por 10 minutos. Vantagem em testes de Força e +10 pés de velocidade. Uma vez por descanso longo.' },
      { name: 'Ancestralidade Gigante', description: 'Você descende de um tipo específico de gigante.' }
    ]
  },
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'Halflings são pessoas pequenas e corajosas, conhecidas por sua sorte e natureza amigável.',
    image: '/assets/halfling.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Pequeno',
    traits: [
      { name: 'Sortudo', description: 'Ao rolar 1 em um d20 para um teste de ataque, teste de habilidade ou salvaguarda, você pode relançar o dado.' },
      { name: 'Bravura', description: 'Vantagem em salvaguardas contra ser Assustado.' },
      { name: 'Agilidade do Pequenino', description: 'Pode mover-se pelo espaço de qualquer criatura de tamanho maior que o seu.' }
    ]
  },
  {
    id: 'human',
    name: 'Humano',
    description: 'Humanos são os mais adaptáveis e ambiciosos de todas as raças.',
    image: '/assets/human.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Pequeno ou Médio',
    traits: [
      { name: 'Engenhoso', description: 'Você ganha Inspiração Heroica ao terminar um Descanso Longo.' },
      { name: 'Habilidoso', description: 'Proficiência em uma perícia à sua escolha.' },
      { name: 'Versátil', description: 'Você ganha um Talento de Origem à sua escolha (além do ganho pelo Antecedente).' }
    ],
    skillChoice: {
      count: 1
    }
  },
  {
    id: 'orc',
    name: 'Orc',
    description: 'Orcs são pessoas resilientes e fortes, descendentes de ancestrais que valorizavam a bravura e a persistência.',
    image: '/assets/orc.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Médio',
    traits: [
      { name: 'Visão no Escuro', description: '120 pés.' },
      { name: 'Arrancada de Adrenalina', description: 'Como uma Ação Bônus, você pode realizar a ação Correr e ganhar pontos de vida temporários iguais ao seu PB. Usos: PB vezes por descanso longo.' },
      { name: 'Resistência Implacável', description: 'Quando você é reduzido a 0 PV mas não morre, você pode ficar com 1 PV. Uma vez por descanso longo.' }
    ]
  },
  {
    id: 'tiefling',
    name: 'Tiefling',
    description: 'Tieflings possuem uma herança infernal que se manifesta em sua aparência física.',
    image: '/assets/tiefling.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Pequeno ou Médio',
    subRaceTitle: 'Legado Infernal',
    subRaceMandatory: true,
    lineages: [
      { 
        name: 'Abissal', 
        description: 'Descendente de demônios; Planos: Abismo, Pandemônio, Carceri.',
        traits: [
          { name: 'Resistência', description: 'Veneno.' },
          { name: 'Magia Abissal', description: '[Nível 1] Rajada de Veneno, [Nível 3] Raio de Doença, [Nível 5] Imobilizar Pessoa.' }
        ]
      },
      { 
        name: 'Ctônico', 
        description: 'Descendente de iugoloth, bruxas ou súcubos; Planos: Carceri, Gehenna, Hades.',
        traits: [
          { name: 'Resistência', description: 'Necrótico.' },
          { name: 'Magia Ctônica', description: '[Nível 1] Toque Gelado, [Nível 3] Vida Falsa, [Nível 5] Raio do Enfraquecimento.' }
        ]
      },
      { 
        name: 'Infernal', 
        description: 'Descendente de diabos; Planos: Nove Infernos, Gehenna, Aqueronte.',
        traits: [
          { name: 'Resistência', description: 'Fogo.' },
          { name: 'Magia Infernal', description: '[Nível 1] Raio de Fogo, [Nível 3] Repreensão Infernal, [Nível 5] Escuridão.' }
        ]
      },
    ],
    traits: [
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Presença Sobrenatural', description: 'Você conhece o truque Taumaturgia.' },
      { name: 'Legado Infernal', description: 'Seu legado concede resistências e magias específicas.' }
    ]
  }
]
