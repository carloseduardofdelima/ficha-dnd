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
    traits: RaceTrait[]
  }[]
  source: string
  speed: number
  size: 'Pequeno' | 'Médio'
}

export const RACES: Race[] = [
  {
    id: 'aasimar',
    name: 'Aasimar',
    description: 'Os Aasimar são mortais que carregam uma centelha dos Planos Superiores em suas almas.',
    image: '/assets/aasimar.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Médio',
    traits: [
      { name: 'Resistência Celestial', description: 'Você tem resistência a dano Necrótico e Radiante.' },
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Mãos Curativas', description: 'Como uma ação Mágica, você pode tocar uma criatura e curá-la em um número de d4s igual ao seu Bônus de Proficiência. Uma vez por descanso longo.' },
      { name: 'Portador da Luz', description: 'Você conhece o truque Luz. Carisma é sua habilidade de conjuração.' },
      { name: 'Revelação Celestial (Nível 3)', description: 'Uma vez por descanso longo, você pode se transformar por 1 minuto: Asas Celestiais (Voo), Radiância Interior (Dano Radiante em área) ou Mortalha Necrótica (Amedrontar).' }
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
    traits: [
      { name: 'Ancestralidade Dracônica', description: 'Escolha um tipo de dragão. Isso determina seu tipo de dano da Arma de Sopro e Resistência.' },
      { name: 'Arma de Sopro', description: 'Cone de 15 pés ou linha de 30 pés. Dano escala com o nível (1d10, 2d10 no nv 5, etc). Usos iguais ao Bônus de Proficiência.' },
      { name: 'Resistência a Dano', description: 'Resistência ao tipo de dano da sua ancestralidade.' },
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Voo Dracônico (Nível 5)', description: 'Como uma ação bônus, você ganha velocidade de voo por 10 minutos. Uma vez por descanso longo.' }
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
      { name: 'Visão no Escuro Superior', description: '120 pés.' },
      { name: 'Resiliência Anã', description: 'Resistência a dano de Veneno e vantagem em salvaguardas contra envenenamento.' },
      { name: 'Tenacidade Anã', description: 'Seu máximo de Pontos de Vida aumenta em 1, e aumenta em 1 cada vez que você sobe de nível.' },
      { name: 'Perspicácia na Pedra', description: 'Como ação bônus, ganha Sentido Sísmico 60 pés por 10 minutos enquanto estiver tocando pedra. Usos iguais à Proficiência.' }
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
    traits: [
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Ancestralidade Feérica', description: 'Vantagem contra ser Encantado e magia não pode te colocar para dormir.' },
      { name: 'Sentidos Aguçados', description: 'Proficiência em Intuição, Percepção ou Sobrevivência.' },
      { name: 'Transe', description: 'Você não dorme, medita por 4 horas para ter o benefício de um descanso longo.' },
      { name: 'Linhagem Élfica', description: 'Escolha entre Drow, Alto Elfo ou Elfo da Floresta para ganhar magias específicas.' }
    ]
  },
  {
    id: 'gnome',
    name: 'Gnomo',
    description: 'Os gnomos são um povo mágico criado por deuses da invenção, ilusão e vida subterrânea.',
    image: '/assets/gnome.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Pequeno',
    traits: [
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Astúcia Gnômica', description: 'Vantagem em salvaguardas de Inteligência, Sabedoria e Carisma.' },
      { name: 'Linhagem Gnômica', description: 'Escolha Gnomo da Floresta (Ilusão Menor, Falar com Animais) ou Gnomo das Rochas (Consertar, Prestidigitação, Dispositivos de Relojoaria).' }
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
    traits: [
      { name: 'Ancestralidade Gigante', description: 'Escolha uma linhagem (Nuvem, Fogo, Gelo, Colina, Pedra ou Tempestade) para ganhar benefícios especiais.' },
      { name: 'Forma Grande (Nível 5)', description: 'Como ação bônus, você se torna Grande por 10 minutos. Vantagem em testes de Força e +10 pés de velocidade.' },
      { name: 'Constituição Poderosa', description: 'Vantagem para encerrar a condição Agarrado e conta como um tamanho maior para capacidade de carga.' }
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
      { name: 'Bravura', description: 'Vantagem em salvaguardas contra medo.' },
      { name: 'Sorte', description: 'Quando rolar um 1 natural em um teste ou ataque, você pode rolar novamente.' },
      { name: 'Agilidade Halfling', description: 'Você pode passar pelo espaço de qualquer criatura que seja de um tamanho maior que o seu.' },
      { name: 'Ninguém Nota', description: 'Proficiência em Furtividade.' }
    ]
  },
  {
    id: 'human',
    name: 'Humano',
    description: 'Humanos são os mais adaptáveis e ambiciosos de todas as raças.',
    image: '/assets/human.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Médio',
    traits: [
      { name: 'Versatilidade', description: 'Você ganha um Talento habilidoso no nível 1.' },
      { name: 'Ambição Humana', description: 'Você ganha proficiência em uma perícia à sua escolha.' },
      { name: 'Inspirador', description: 'Depois de terminar um descanso longo, você ganha Inspiração Heróica.' }
    ]
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
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Grito de Adrenalina', description: 'Como uma ação bônus, você pode realizar a ação Correr e ganhar pontos de vida temporários iguais ao seu Bônus de Proficiência. Usos iguais à Proficiência.' },
      { name: 'Resistência Implacável', description: 'Quando você é reduzido a 0 pontos de vida mas não morre, você pode ficar com 1 ponto de vida. Uma vez por descanso longo.' },
      { name: 'Constituição Poderosa', description: 'Você conta como um tamanho maior para capacidade de carga.' }
    ]
  },
  {
    id: 'tiefling',
    name: 'Tiefling',
    description: 'Tieflings possuem uma herança infernal que se manifesta em sua aparência física.',
    image: '/assets/tiefling.png',
    source: "Player's Handbook 2024",
    speed: 30,
    size: 'Médio',
    traits: [
      { name: 'Visão no Escuro', description: '60 pés.' },
      { name: 'Resistência Infernal', description: 'Resistência a dano de Fogo.' },
      { name: 'Legado Infernal', description: 'Escolha um legado (Abissal, Ctônico ou Infernal) para ganhar magias específicas que escalam com o nível.' }
    ]
  }
]
