export interface ClassFeature {
  name: string
  description: string
}

export interface DndClass {
  id: string
  name: string
  description: string
  features: ClassFeature[]
  image: string
  source: string
  hitDie: string
  primaryAttr: string
  savingThrows: string[]
  armorProf: string
  weaponProf: string
  toolProf?: string
  skillCount?: number
  skillOptions?: string[]
}

export const CLASSES: DndClass[] = [
  {
    id: 'barbarian',
    name: 'Bárbaro',
    description: 'Uma fera feroz que emerge em combate, alimentada pela raiva primitiva. Bárbaros são guerreiros que canalizam uma fúria selvagem para se tornarem mais fortes e resistentes em batalha.',
    image: '/assets/barbarian.png',
    source: "Player's Handbook 2024",
    hitDie: 'd12',
    primaryAttr: 'Força',
    savingThrows: ['Força', 'Constituição'],
    armorProf: 'Armaduras leves, médias e escudos',
    weaponProf: 'Armas simples e marciais',
    features: [
      { name: 'Fúria', description: 'Entre em um estado de fúria como ação bônus, ganhando vantagem em rolagens de Força, +2 de dano e resistência a dano cortante, perfurante e de concussão.' },
      { name: 'Defesa sem Armadura', description: 'Sem armadura, sua CA é 10 + modificador de Des + modificador de Con.' },
      { name: 'Ataque Descuidado', description: 'Ao atacar, pode ter vantagem em troca de ter desvantagem em ataques contra você até o início do próximo turno.' },
      { name: 'Sentido de Perigo', description: 'Vantagem em rolagens de Destreza contra efeitos que você pode ver, como armadilhas e magias.' },
    ]
  },
  {
    id: 'bard',
    name: 'Bardo',
    description: 'Um inspirador versátil que usa a magia da música e da palavra. Bardos dominam a arte da magia e do combate por meio de sua criatividade e charme.',
    image: '/assets/bard.png',
    source: "Player's Handbook 2024",
    hitDie: 'd8',
    primaryAttr: 'Carisma',
    savingThrows: ['Destreza', 'Carisma'],
    armorProf: 'Armaduras leves',
    weaponProf: 'Armas simples',
    features: [
      { name: 'Conjuração', description: 'Você pode conjurar magias de bardo, usando Carisma como atributo de conjuração.' },
      { name: 'Inspiração Bárdica', description: 'Como ação bônus, confira um dado de Inspiração Bárdica (d6) a uma criatura que possa ouvir você.' },
      { name: 'Proficiência Polivalente', description: 'Você pode adicionar metade do seu bônus de proficiência a qualquer teste de habilidade que ainda não inclua esse bônus.' },
      { name: 'Colégio Bárdico', description: 'Ao 3º nível, escolha um colégio bárdico: Valor, Conhecimento, Criação, Eloquência, Dança ou Glamour.' },
    ]
  },
  {
    id: 'cleric',
    name: 'Clérigo',
    description: 'Um campeão divino que canaliza o poder de uma divindade. Clérigos são poderosos curadores e combatentes, moldados pelo domínio divino que escolheram.',
    image: '/assets/cleric.png',
    source: "Player's Handbook 2024",
    hitDie: 'd8',
    primaryAttr: 'Sabedoria',
    savingThrows: ['Sabedoria', 'Carisma'],
    armorProf: 'Armaduras leves, médias e escudos',
    weaponProf: 'Armas simples',
    features: [
      { name: 'Conjuração Divina', description: 'Você pode conjurar magias de clérigo usando Sabedoria como atributo de conjuração.' },
      { name: 'Domínio Divino', description: 'Escolha um domínio divino: Vida, Luz, Tempestade, Astúcia, Guerra, Ordem, entre outros — cada um concede magias e habilidades únicas.' },
      { name: 'Canalizar Divindade', description: 'Use o poder de sua divindade para criar um efeito mágico especial, como afastar mortos-vivos ou recuperar PV.' },
      { name: 'Destruição de Mortos-Vivos', description: 'A partir do 5º nível, mortos-vivos afastados são destruídos instantaneamente se o seu CR for suficientemente baixo.' },
    ]
  },
  {
    id: 'druid',
    name: 'Druida',
    description: 'Um guardião da natureza com poderes sobre o mundo selvagem. Druidas controlam as forças naturais e podem assumir a forma de animais.',
    image: '/assets/druid.png',
    source: "Player's Handbook 2024",
    hitDie: 'd8',
    primaryAttr: 'Sabedoria',
    savingThrows: ['Inteligência', 'Sabedoria'],
    armorProf: 'Armaduras leves',
    weaponProf: 'Armas simples',
    features: [
      { name: 'Conjuração', description: 'Conjure magias de druida usando Sabedoria como atributo de conjuração.' },
      { name: 'Forma Selvagem', description: 'Use sua ação para se transformar em uma besta. O CR máximo da besta aumenta com seu nível.' },
      { name: 'Círculo Druídico', description: 'Ao 2º nível, escolha um Círculo Druídico: Terra, Lua, Mar, Estrelas, Esporas, Sonhos ou Pastagens.' },
      { name: 'Fala com Animais', description: 'Ao 2º nível, este feitiço sempre está preparado e não conta no seu limite de magias preparadas.' },
    ]
  },
  {
    id: 'fighter',
    name: 'Guerreiro',
    description: 'Um mestre das armas e técnicas de combate. Guerreiros são combatentes versáteis e resistentes, capazes de superar qualquer oponente no campo de batalha.',
    image: '/assets/warrior.png',
    source: "Player's Handbook 2024",
    hitDie: 'd10',
    primaryAttr: 'Força ou Destreza',
    savingThrows: ['Força', 'Constituição'],
    armorProf: 'Armaduras leves, médias, pesadas e escudos',
    weaponProf: 'Armas simples e marciais',
    features: [
      { name: 'Estilo de Combate', description: 'Escolha um estilo de combate especializado, como Arqueria, Defesa, Duelo, Luta com Duas Armas, entre outros.' },
      { name: 'Retomar Fôlego', description: 'Use uma ação bônus para recuperar PV iguais a 1d10 + seu nível de guerreiro.' },
      { name: 'Surto de Ação', description: 'Uma vez por turno, faça uma ação adicional. Recupável com descanso curto.' },
      { name: 'Arquétipo Marcial', description: 'Ao 3º nível, escolha um arquétipo: Campeão, Mestre de Batalha, Cavaleiro Élfico, Samurai, entre outros.' },
    ]
  },
  {
    id: 'monk',
    name: 'Monge',
    description: 'Um artista marcial que canaliza energia mística interior. Monges unem corpo e mente através do ki, um poder interior que permite proezas sobre-humanas.',
    image: '/assets/monk.png',
    source: "Player's Handbook 2024",
    hitDie: 'd8',
    primaryAttr: 'Destreza e Sabedoria',
    savingThrows: ['Força', 'Destreza'],
    armorProf: 'Nenhuma',
    weaponProf: 'Armas simples e Espadas Curtas',
    features: [
      { name: 'Defesa sem Armadura', description: 'Sem armadura, sua CA é 10 + mod. de Des + mod. de Sab.' },
      { name: 'Artes Marciais', description: 'Pode usar Des em vez de For em ataques desarmados e com armas monásticas, e seu dado de dano desarmado sobe com o nível.' },
      { name: 'Ki', description: 'Pontos de ki alimentam habilidades como Chuva de Golpes, Deflexão de Mísseis e Passo do Vento.' },
      { name: 'Tradição Monástica', description: 'Ao 3º nível, escolha sua tradição: Punho Aberto, Sombra, Quatro Elementos, Sol, Espada do Sol, entre outros.' },
    ]
  },
  {
    id: 'paladin',
    name: 'Paladino',
    description: 'Um guerreiro sagrado ligado a um juramento divino. Paladinos combinam combate robusto com poderes divinos para proteger os inocentes e destruir o mal.',
    image: '/assets/paladin.png',
    source: "Player's Handbook 2024",
    hitDie: 'd10',
    primaryAttr: 'Força e Carisma',
    savingThrows: ['Sabedoria', 'Carisma'],
    armorProf: 'Armaduras leves, médias, pesadas e escudos',
    weaponProf: 'Armas simples e marciais',
    features: [
      { name: 'Sentido Divino', description: 'Detecte a presença de mal ou bem como ação. Usos iguais a 1 + mod. de Car por descanso longo.' },
      { name: 'Imposição de Mãos', description: 'Piscina de PV igual a 5 × nível de paladino, restauradas apenas com descanso longo.' },
      { name: 'Golpe Divino', description: 'Quando acertar um ataque, gaste pontos de magia para adicionar 2d8 de dano radiante (ou outro tipo).' },
      { name: 'Juramento Sagrado', description: 'Ao 3º nível, faça seu juramento: Devoção, Ancestralidade, Redenção, Conquista, ou Juramento Quebrado.' },
    ]
  },
  {
    id: 'ranger',
    name: 'Patrulheiro',
    description: 'Um caçador habilidoso que domina ambientes selvagens. Patrulheiros são especialistas em rastreamento, sobrevivência e combate contra criaturas específicas.',
    image: '/assets/ranger.png',
    source: "Player's Handbook 2024",
    hitDie: 'd10',
    primaryAttr: 'Destreza e Sabedoria',
    savingThrows: ['Força', 'Destreza'],
    armorProf: 'Armaduras leves, médias e escudos',
    weaponProf: 'Armas simples e marciais',
    features: [
      { name: 'Inimigo Favorito', description: 'Escolha um tipo de inimigo favorito: você tem vantagem em testes de Sab (Sobrevivência) para rastreá-los e em testes de Int para lembrá-los.' },
      { name: 'Explorador Natural', description: 'Escolha um terreno favorito; você é proficiente em mapear, encontrar recursos e não se perder nele.' },
      { name: 'Estilo de Combate', description: 'Escolha um estilo: Arqueria, Defesa, Duelo ou Luta com Duas Armas.' },
      { name: 'Conclave de Patrulheiro', description: 'Ao 3º nível, escolha seu conclave: Caçador, Besta, Deslizante, entre outros.' },
    ]
  },
  {
    id: 'rogue',
    name: 'Ladino',
    description: 'Um especialista furtivo e habilidoso que depende de astúcia. Ladinos prosperam nas sombras, usando habilidades e golpes cirúrgicos para derrotar adversários.',
    image: '/assets/rogue.png',
    source: "Player's Handbook 2024",
    hitDie: 'd8',
    primaryAttr: 'Destreza',
    savingThrows: ['Destreza', 'Inteligência'],
    armorProf: 'Armaduras leves',
    weaponProf: 'Armas simples, Bestas de Mão, Espadas Longas, Rapieiras e Espadas Curtas',
    features: [
      { name: 'Perícia', description: 'Dobre o bônus de proficiência em duas habilidades ou ferramentas de ladrão.' },
      { name: 'Ataque Furtivo', description: 'Uma vez por turno, cause dano extra (1d6 crescente) se tiver vantagem ou um aliado adjacente ao alvo.' },
      { name: 'Jargão de Ladrões', description: 'Você aprendeu a língua secreta dos ladrões, transmitindo mensagens ocultas em conversa comum.' },
      { name: 'Arquétipo de Ladino', description: 'Ao 3º nível, escolha seu arquétipo: Ladrão, Assassino, Arcano Trapaceiro, Inquisidor, Alma Fantasma, entre outros.' },
    ]
  },
  {
    id: 'sorcerer',
    name: 'Feiticeiro',
    description: 'Um mago cujo poder vem de uma origem mágica inata. Feiticeiros manipulam a magia de forma instintiva, moldando-a com seus Pontos de Feitiçaria.',
    image: '/assets/sorcerer.png',
    source: "Player's Handbook 2024",
    hitDie: 'd6',
    primaryAttr: 'Carisma',
    savingThrows: ['Constituição', 'Carisma'],
    armorProf: 'Nenhuma',
    weaponProf: 'Armas simples',
    features: [
      { name: 'Conjuração', description: 'Conjure magias de feiticeiro usando Carisma como atributo de conjuração.' },
      { name: 'Origem de Feitiçaria', description: 'Sua magia vem de uma Origem: Linhagem Dracônica, Alma Selvagem, Origem Divina, Sombra, entre outras.' },
      { name: 'Fonte de Magia', description: 'Pontos de Feitiçaria permitem criar espaços de magia extras ou ativar Metamagia.' },
      { name: 'Metamagia', description: 'Ao 3º nível, escolha 2 opções de Metamagia para alterar suas magias: Magia Acelerada, Cuidadosa, Extensa, Intensificada, etc.' },
    ]
  },
  {
    id: 'warlock',
    name: 'Bruxo',
    description: 'Um conjurador ligado a um ser sobrenatural por meio de um pacto. Os bruxos obtêm poder de entidades extraplanares em troca de serviços ou lealdade.',
    image: '/assets/warlock.png',
    source: "Player's Handbook 2024",
    hitDie: 'd8',
    primaryAttr: 'Carisma',
    savingThrows: ['Sabedoria', 'Carisma'],
    armorProf: 'Armaduras leves',
    weaponProf: 'Armas simples',
    features: [
      { name: 'Patrono do Além', description: 'Você fez um pacto com um ser poderoso: O Grande Antigo, O Arcanato, O Fiend, O Celestial, entre outros.' },
      { name: 'Magia de Pacto', description: 'Seus espaços de magia são poucos mas poderosos — todos do nível mais alto disponível — e se recuperam em descanso curto.' },
      { name: 'Invocações Eldritch', description: 'Do 2º nível em diante, escolha invocações que concedem habilidades mágicas e aprimoramentos permanentes.' },
      { name: 'Bênção do Pacto', description: 'Ao 3º nível, escolha o tipo de pacto: Lâmina (arma), Corrente (familiar) ou Tomo (grimório).' },
    ]
  },
  {
    id: 'wizard',
    name: 'Mago',
    description: 'Um estudioso da magia arcana que busca dominar as leis fundamentais do universo. Magos têm acesso ao maior repertório de magias do jogo.',
    image: '/assets/wizard.png',
    source: "Player's Handbook 2024",
    hitDie: 'd6',
    primaryAttr: 'Inteligência',
    savingThrows: ['Inteligência', 'Sabedoria'],
    armorProf: 'Nenhuma',
    weaponProf: 'Armas simples',
    features: [
      { name: 'Conjuração', description: 'Conjure magias de mago usando Inteligência como atributo de conjuração.' },
      { name: 'Recuperação Arcana', description: 'Uma vez por descanso curto, recupere espaços de magia cujo nível total não exceda metade do seu nível de mago.' },
      { name: 'Tradição Arcana', description: 'Ao 2º nível, escolha uma tradição: Evocação, Abjuração, Transmutação, Ilusão, Conjuração, Encantamento, Divinação, Necromancia, Magia de Guerra, entre outras.' },
      { name: 'Mestre de Magia', description: 'Ao 18º nível, escolha 1 magia de 1º grau e 1 de 2º grau; você pode conjurá-las sem gastar espaço de magia.' },
    ]
  },
  {
    id: 'artificer',
    name: 'Artesão Arcano',
    description: 'Um inventor que infunde objetos com magia. Artesãos combinam engenho tecnológico com poder mágico para criar itens e construtos que servem como armas e aliados.',
    image: '/assets/artificer.png',
    source: "Tasha's Cauldron of Everything",
    hitDie: 'd8',
    primaryAttr: 'Inteligência',
    savingThrows: ['Constituição', 'Inteligência'],
    armorProf: 'Armaduras leves, médias e escudos',
    weaponProf: 'Armas simples',
    features: [
      { name: 'Engenharia Mágica (Magical Tinkering)', description: 'Ação Mágica segurando Ferramentas de Funileiro: cria um item mundano em espaço desocupado a até 1,5m de você. Usos = Mod Inteligência.' },
      { name: 'Replicar Item Mágico (Infusões)', description: 'Crie itens mágicos temporários a partir de uma lista de planos conhecidos.' },
      { name: 'A Ferramenta Certa para o Trabalho', description: 'Ao nível 3, pode criar ferramentas de artesão que você precisa usando ferramentas de funileiro.' },
      { name: 'Especialista Artesão', description: 'Ao nível 3, escolha sua especialidade: Artilheiro, Ferreiro de Batalha, Alquimista ou Mestre Marionete.' },
    ]
  },
]
