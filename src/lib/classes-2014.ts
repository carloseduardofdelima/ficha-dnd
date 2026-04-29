import { DndClass } from './classes';

export const CLASSES_2014: DndClass[] = [
  {
    id: 'barbarian_2014',
    name: 'Bárbaro',
    description: 'Um guerreiro feroz de origem primitiva que pode entrar em fúria em batalha.',
    image: '/assets/barbarian.png',
    source: "Player's Handbook 2014",
    hitDie: 'd12',
    primaryAttr: 'Força',
    savingThrows: ['Força', 'Constituição'],
    armorProf: 'Armaduras Leves, Médias e Escudos',
    weaponProf: 'Armas Simples e Marciais',
    skillCount: 2,
    skillOptions: ['Adestrar Animais', 'Atletismo', 'Intimidação', 'Natureza', 'Percepção', 'Sobrevivência'],
    features: [
      { name: 'Fúria', description: 'Em batalha, você luta com ferocidade primitiva. Você pode entrar em fúria como uma ação bônus.' },
      { name: 'Defesa Sem Armadura', description: 'Enquanto não estiver usando armadura, sua CA é 10 + Mod. Des + Mod. Con.' },
      { name: 'Ataque Descuidado', description: 'Você pode escolher atacar com vantagem, mas ataques contra você também têm vantagem.' },
      { name: 'Sentido de Perigo', description: 'Vantagem em salvaguardas de Destreza contra efeitos que você possa ver.' }
    ]
  },
  {
    id: 'bard_2014',
    name: 'Bardo',
    description: 'Um mestre da música, do entretenimento e da magia, capaz de inspirar seus aliados.',
    image: '/assets/bard.png',
    source: "Player's Handbook 2014",
    hitDie: 'd8',
    primaryAttr: 'Carisma',
    savingThrows: ['Destreza', 'Carisma'],
    armorProf: 'Armaduras Leves',
    weaponProf: 'Armas Simples, Bestas de mão, Espadas longas, Rapieiras, Espadas curtas',
    skillCount: 3,
    skillOptions: ['Acrobacia', 'Adestrar Animais', 'Arcanismo', 'Atletismo', 'Atuação', 'Enganação', 'Furtividade', 'História', 'Intimidação', 'Intuição', 'Investigação', 'Medicina', 'Natureza', 'Percepção', 'Persuasão', 'Prestidigitação', 'Religião', 'Sobrevivência'],
    features: [
      { name: 'Conjuração', description: 'Você pode conjurar magias de bardo usando seu Carisma.' },
      { name: 'Inspiração Bárdica (d6)', description: 'Você pode inspirar outros através de palavras ou música como uma ação bônus.' },
      { name: 'Pau para Toda Obra', description: 'Você pode adicionar metade do seu bônus de proficiência em qualquer teste de atributo que não possua proficiência.' },
      { name: 'Canção de Descanso', description: 'Você pode ajudar a curar seus aliados durante um descanso curto.' }
    ]
  },
  {
    id: 'cleric_2014',
    name: 'Clérigo',
    description: 'Um campeão sacerdotal que utiliza magia divina a serviço de um poder superior.',
    image: '/assets/cleric.png',
    source: "Player's Handbook 2014",
    hitDie: 'd8',
    primaryAttr: 'Sabedoria',
    savingThrows: ['Sabedoria', 'Carisma'],
    armorProf: 'Armaduras Leves, Médias e Escudos',
    weaponProf: 'Armas Simples',
    skillCount: 2,
    skillOptions: ['História', 'Intuição', 'Medicina', 'Persuasão', 'Religião'],
    features: [
      { name: 'Conjuração', description: 'Você pode conjurar magias de clérigo usando sua Sabedoria.' },
      { name: 'Domínio Divino', description: 'Escolha um domínio relacionado à sua divindade.' },
      { name: 'Canalizar Divindade', description: 'Você pode canalizar energia divina diretamente de sua divindade.' }
    ]
  },
  {
    id: 'druid_2014',
    name: 'Druida',
    description: 'Um místico que abraça as forças da natureza, capaz de assumir formas animais.',
    image: '/assets/druid.png',
    source: "Player's Handbook 2014",
    hitDie: 'd8',
    primaryAttr: 'Sabedoria',
    savingThrows: ['Inteligência', 'Sabedoria'],
    armorProf: 'Armaduras Leves, Médias e Escudos (não metálicos)',
    weaponProf: 'Bordão, Adaga, Dardo, Azagaia, Maça, Foice, Cimitarra, Funda, Lança',
    skillCount: 2,
    skillOptions: ['Arcanismo', 'Adestrar Animais', 'Intuição', 'Medicina', 'Natureza', 'Percepção', 'Religião', 'Sobrevivência'],
    features: [
      { name: 'Druídico', description: 'Você conhece o idioma secreto dos druidas.' },
      { name: 'Conjuração', description: 'Você pode conjurar magias de druida usando sua Sabedoria.' },
      { name: 'Forma Selvagem', description: 'Você pode usar sua ação para assumir a forma de uma fera que você já tenha visto.' }
    ]
  },
  {
    id: 'fighter_2014',
    name: 'Guerreiro',
    description: 'Um mestre do combate, proficiente com uma ampla variedade de armas e armaduras.',
    image: '/assets/warrior.png',
    source: "Player's Handbook 2014",
    hitDie: 'd10',
    primaryAttr: 'Força ou Destreza',
    savingThrows: ['Força', 'Constituição'],
    armorProf: 'Todas as Armaduras e Escudos',
    weaponProf: 'Armas Simples e Marciais',
    skillCount: 2,
    skillOptions: ['Acrobacia', 'Adestrar Animais', 'Atletismo', 'História', 'Intuição', 'Intimidação', 'Percepção', 'Sobrevivência'],
    features: [
      { name: 'Estilo de Luta', description: 'Você adota um estilo de combate particular como sua especialidade.' },
      { name: 'Retomar o Fôlego', description: 'Você pode usar uma ação bônus para recuperar pontos de vida igual a 1d10 + seu nível de guerreiro.' },
      { name: 'Surto de Ação', description: 'Você pode realizar uma ação adicional juntamente com sua ação e possível ação bônus.' }
    ]
  },
  {
    id: 'monk_2014',
    name: 'Monge',
    description: 'Um mestre das artes marciais, capaz de utilizar a energia do Ki para feitos sobre-humanos.',
    image: '/assets/monk.png',
    source: "Player's Handbook 2014",
    hitDie: 'd8',
    primaryAttr: 'Destreza e Sabedoria',
    savingThrows: ['Força', 'Destreza'],
    armorProf: 'Nenhuma',
    weaponProf: 'Armas Simples e Espadas Curtas',
    skillCount: 2,
    skillOptions: ['Acrobacia', 'Atletismo', 'História', 'Intuição', 'Religião', 'Furtividade'],
    features: [
      { name: 'Defesa Sem Armadura', description: 'Sua CA é 10 + Mod. Des + Mod. Sab.' },
      { name: 'Artes Marciais', description: 'Você pode usar Destreza em vez de Força para ataques desarmados.' },
      { name: 'Ki', description: 'Você pode canalizar a energia mágica do Ki.' }
    ]
  },
  {
    id: 'paladin_2014',
    name: 'Paladino',
    description: 'Um guerreiro sagrado vinculado por um juramento inabalável.',
    image: '/assets/paladin.png',
    source: "Player's Handbook 2014",
    hitDie: 'd10',
    primaryAttr: 'Força e Carisma',
    savingThrows: ['Sabedoria', 'Carisma'],
    armorProf: 'Todas as Armaduras e Escudos',
    weaponProf: 'Armas Simples e Marciais',
    skillCount: 2,
    skillOptions: ['Atletismo', 'Intuição', 'Intimidação', 'Medicina', 'Persuasão', 'Religião'],
    features: [
      { name: 'Sentido Divino', description: 'Você pode detectar forças celestiais, abissais ou mortos-vivos.' },
      { name: 'Mãos Curadoras', description: 'Seu toque abençoado pode curar ferimentos (Piscina de 5x nível).' },
      { name: 'Destruição Divina', description: 'Você pode converter espaços de magia em dano radiante extra ao atingir um alvo.' }
    ]
  },
  {
    id: 'ranger_2014',
    name: 'Patrulheiro',
    description: 'Um mestre da sobrevivência e do combate em áreas selvagens.',
    image: '/assets/ranger.png',
    source: "Player's Handbook 2014",
    hitDie: 'd10',
    primaryAttr: 'Destreza e Sabedoria',
    savingThrows: ['Força', 'Destreza'],
    armorProf: 'Armaduras Leves, Médias e Escudos',
    weaponProf: 'Armas Simples e Marciais',
    skillCount: 3,
    skillOptions: ['Adestrar Animais', 'Atletismo', 'Intuição', 'Investigação', 'Natureza', 'Percepção', 'Furtividade', 'Sobrevivência'],
    features: [
      { name: 'Inimigo Favorito', description: 'Você ganha +2 de bônus nas jogadas de dano contra o tipo escolhido e vantagem em testes para rastrear e obter informações.' },
      { name: 'Explorador Natural', description: 'Você ignora terreno difícil, tem vantagem em iniciativa e vantagem em ataques contra criaturas que ainda não agiram no 1º turno.' },
      { name: 'Consciência Primitiva', description: 'Você pode se comunicar com bestas e sentir a presença de seus inimigos favoritos a até 8 km.' }
    ]
  },
  {
    id: 'rogue_2014',
    name: 'Ladino',
    description: 'Um mestre da furtividade e da precisão, capaz de encontrar pontos fracos em qualquer defesa.',
    image: '/assets/rogue.png',
    source: "Player's Handbook 2014",
    hitDie: 'd8',
    primaryAttr: 'Destreza',
    savingThrows: ['Destreza', 'Inteligência'],
    armorProf: 'Armaduras Leves',
    weaponProf: 'Armas Simples, Bestas de mão, Espadas longas, Rapieiras, Espadas curtas',
    skillCount: 4,
    skillOptions: ['Acrobacia', 'Atletismo', 'Enganação', 'Intuição', 'Intimidação', 'Investigação', 'Percepção', 'Atuação', 'Persuasão', 'Prestidigitação', 'Furtividade'],
    features: [
      { name: 'Especialização', description: 'Você escolhe duas de suas proficiências em perícias para dobrar seu bônus de proficiência.' },
      { name: 'Ataque Furtivo', description: 'Você sabe como atacar sutilmente e explorar a distração de seus inimigos para causar dano extra.' },
      { name: 'Gíria de Ladrão', description: 'Você conhece o jargão e códigos secretos que permitem passar mensagens ocultas.' },
      { name: 'Ação Ardilosa', description: 'Você pode usar uma ação bônus em cada turno para Disparada, Desengajar ou Esconder.' }
    ]
  },
  {
    id: 'sorcerer_2014',
    name: 'Feiticeiro',
    description: 'Um conjurador nato, cujo poder deriva de uma linhagem mágica ou influência exótica.',
    image: '/assets/sorcerer.png',
    source: "Player's Handbook 2014",
    hitDie: 'd6',
    primaryAttr: 'Carisma',
    savingThrows: ['Constituição', 'Carisma'],
    armorProf: 'Nenhuma',
    weaponProf: 'Adagas, Dardos, Fundas, Bordões, Bestas leves',
    skillCount: 2,
    skillOptions: ['Arcanismo', 'Enganação', 'Intuição', 'Intimidação', 'Persuasão', 'Religião'],
    features: [
      { name: 'Conjuração', description: 'Você pode conjurar magias de feiticeiro usando seu Carisma como habilidade de conjuração.' },
      { name: 'Origem de Feitiçaria', description: 'Escolha a fonte do seu poder mágico inato: Linhagem Dracônica ou Magia Selvagem.' },
      { name: 'Fonte de Magia', description: 'Você possui pontos de feitiçaria que permitem criar espaços de magia ou alterar suas magias.' }
    ]
  },
  {
    id: 'warlock_2014',
    name: 'Bruxo',
    description: 'Um buscador de conhecimento proibido que fez um pacto com uma entidade poderosa.',
    image: '/assets/warlock.png',
    source: "Player's Handbook 2014",
    hitDie: 'd8',
    primaryAttr: 'Carisma',
    savingThrows: ['Sabedoria', 'Carisma'],
    armorProf: 'Armaduras Leves',
    weaponProf: 'Armas Simples',
    skillCount: 2,
    skillOptions: ['Arcanismo', 'Enganação', 'História', 'Intimidação', 'Investigação', 'Natureza', 'Religião'],
    features: [
      { name: 'Patrono Transplanar', description: 'Você fez um pacto com um ser de outro plano de existência.' },
      { name: 'Magia de Pacto', description: 'Sua magia é concedida por seu patrono e recuperada rapidamente.' },
      { name: 'Invocações Místicas', description: 'Você descobriu segredos ocultos que te concedem habilidades especiais.' }
    ]
  },
  {
    id: 'wizard_2014',
    name: 'Mago',
    description: 'Um estudioso acadêmico da magia, capaz de manipular a realidade através de fórmulas e rituais.',
    image: '/assets/wizard.png',
    source: "Player's Handbook 2014",
    hitDie: 'd6',
    primaryAttr: 'Inteligência',
    savingThrows: ['Inteligência', 'Sabedoria'],
    armorProf: 'Nenhuma',
    weaponProf: 'Adagas, Dardos, Fundas, Bordões, Bestas leves',
    skillCount: 2,
    skillOptions: ['Arcanismo', 'História', 'Intuição', 'Investigação', 'Medicina', 'Religião'],
    features: [
      { name: 'Conjuração', description: 'Você pode conjurar magias de mago usando sua Inteligência.' },
      { name: 'Recuperação Arcana', description: 'Você pode recuperar parte do seu poder mágico durante um descanso curto.' },
      { name: 'Livro de Magias', description: 'Você possui um livro contendo as fórmulas de suas magias.' }
    ]
  }
];
