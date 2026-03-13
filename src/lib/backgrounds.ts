export interface BackgroundFeature {
  name: string
  description: string
}

export interface Background {
  id: string
  name: string
  description: string
  skills: string[]
  toolProf?: string
  languages?: string
  equipment: string
  feature: BackgroundFeature
  source: string
}

export const BACKGROUNDS: Background[] = [
  {
    id: 'acolito',
    name: 'Acólito',
    description: 'Você passou sua vida a serviço de um templo de um deus ou panteão de deuses. Você atua como intermediário entre o reino dos sagrados e o mundo mortal, realizando rituais sagrados e oferecendo sacrifícios para conduzir os adeptos à presença do divino.',
    skills: ['Intuição', 'Religião'],
    languages: 'Dois idiomas à sua escolha',
    equipment: 'Símbolo sagrado, livro de orações ou diário, 5 varas de incenso, vestes sacerdotais, roupas comuns e uma bolsa com 15 po',
    feature: {
      name: 'Abrigo do Devoto',
      description: 'Como acólito, você recebe respeito de quem compartilha sua fé. Você pode realizar os rituais de sua religião. Você e seus companheiros adventureiros podem esperar receber cura e cuidados gratuitos em um templo ou santuário de sua fé.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'charlatao',
    name: 'Charlatão',
    description: 'Você sempre teve um talento para ajudar as pessoas a enxergar o que elas queriam ver. Você sabe exatamente o que fazer para que alguém confie em você, forçá-los a ver a sua versão da realidade.',
    skills: ['Enganação', 'Prestidigitação'],
    toolProf: 'Kit de disfarce, kit de falsificação',
    equipment: 'Kit de disfarce, ferramentas usadas em golpes anteriores, roupas finas e uma bolsa com 15 po',
    feature: {
      name: 'Identidade Falsa',
      description: 'Você criou uma segunda identidade que inclui documentação, referências estabelecidas e disfarces. Além disso, você pode forjar documentos, incluindo papéis oficiais e cartas pessoais, desde que tenha visto um exemplo do tipo de documento ou da grafia que está tentando copiar.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'criminoso',
    name: 'Criminoso',
    description: 'Você é um criminoso experiente com um histórico de quebrar a lei. Você tem muito tempo de contato com outros criminosos e ainda mantém contatos com o submundo criminal.',
    skills: ['Furtividade', 'Enganação'],
    toolProf: 'Um tipo de jogo, ferramentas de ladrão',
    equipment: 'Pé de cabra, roupas escuras com capuz e uma bolsa com 15 po',
    feature: {
      name: 'Contato Criminal',
      description: 'Você tem um contato confiável que age como seu liaison com uma rede de outros criminosos. Você sabe como enviar e receber mensagens de seu contato mesmo em grandes distâncias; especificamente, você conhece corredores de mensagens locais, corruptos, taberneiros e outros indivíduos que ajudam redes criminosas na transferência de informações.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'artista',
    name: 'Artista',
    description: 'Você prospera na atenção da multidão. Nascido para se apresentar, você sabe como cativar uma plateia. Sua arte é sua vida. Você é tanto um ator quanto um artífice.',
    skills: ['Acrobacia', 'Atuação'],
    toolProf: 'Kit de disfarce, um instrumento musical',
    equipment: 'Instrumento musical (de sua escolha), um favor de um admirador, fantasias e uma bolsa com 15 po',
    feature: {
      name: 'Por Amor à Plateia',
      description: 'Você pode sempre encontrar um lugar para se apresentar, em locais como tavernas, castelos ou circos ambulantes. Nessas ocasiões, você recebe acomodação e alimentação gratuitas. Além disso, você pode fazer propaganda dos seus companheiros de aventura como assistentes da sua atuação.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'heroi-do-povo',
    name: 'Herói do Povo',
    description: 'Você veio de uma origem humilde, mas está destinado a algo mais. Já antes de deixar sua aldeia, o povo de lá falava sobre você como se fosse um grande herói, mas você ainda precisava provar seu valor no mundo.',
    skills: ['Adestrar Animais', 'Sobrevivência'],
    toolProf: 'Um utensílio artesanal, veículos terrestres',
    equipment: 'Utensílio artesanal (de sua escolha), uma pá, um pote de ferro, roupas comuns e uma bolsa com 10 po',
    feature: {
      name: 'Hospitalidade Rústica',
      description: 'Como você vem do povo comum, você se encaixa bem entre eles. Você pode encontrar um lugar para esconder, descansar ou recuperar-se entre pessoas comuns, a não ser que você tenha se mostrado um perigo para elas. Elas vão protegê-lo de lei ou alguém atrás de você, embora não vão arriscar suas vidas por você.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'artesao-da-guilda',
    name: 'Artesão da Guilda',
    description: 'Você é membro de uma guilda artesanal, habilidoso em um ofício particular e próximo de outros artesãos. Guildas de artesãos e comerciantes formam uma parte vital da economia em muitas cidades.',
    skills: ['Intuição', 'Persuasão'],
    toolProf: 'Um utensílio artesanal',
    languages: 'Um idioma adicional',
    equipment: 'Utensílio artesanal (de sua escolha), uma carta de apresentação de sua guilda, roupas de viajante e uma bolsa com 15 po',
    feature: {
      name: 'Associação de Guilda',
      description: 'Como membro estabelecido e respeitado de uma guilda, você pode depender de certos benefícios que a sua associação oferece. Seus companheiros de guilda vão prover acomodação e alimentação, se necessário, e pagar por seu funeral se necessário. Além disso, você pode ter acesso a um nível de influência política.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'eremita',
    name: 'Eremita',
    description: 'Você viveu em reclusão — em uma comunidade de vida religiosa fechada, como um monastério, ou só — por um período formativo de sua vida. Nos seus tempos longe do ruído das pessoas, você achou quietude e também perguntou-se sobre os mistérios do mundo.',
    skills: ['Medicina', 'Religião'],
    toolProf: 'Kit de herbalismo',
    languages: 'Um idioma adicional',
    equipment: 'Kit de herbalismo, livro com suas notas de estudo, roupas comuns e uma bolsa com 5 po',
    feature: {
      name: 'Descoberta',
      description: 'A quietude de sua reclusão te deu acesso a uma revelação única e poderosa. A natureza exata dessa descoberta é determinada por você e o DM, mas pode ser um grande verdade, algo que o DM manteve como segredo, ou algo que outras pessoas acreditam ser uma fantasia, mas você sabe que é verdade.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'nobre',
    name: 'Nobre',
    description: 'Você entende riqueza, poder e privilégio. Você carrega uma carta de nobreza e as pessoas por toda parte reconhecem sua posição. A influência de sua família se estende por todo o lugar, e todos sabem com quem mexem.',
    skills: ['História', 'Persuasão'],
    toolProf: 'Um tipo de jogo',
    languages: 'Um idioma adicional',
    equipment: 'Roupas finas, um anel de sinete, um rolo de pedigree e uma bolsa com 25 po',
    feature: {
      name: 'Posição de Privilégio',
      description: 'Graças à sua posição nobre, as pessoas ficam inclinadas a pensar o melhor sobre você. Você é bem-vindo na sociedade da alta nobreza, e pessoas assumem que você tem direito a estar onde quer que esteja. A guarda comum raramente questionará suas ações, e você pode obter audiências com líderes locais e magistrados.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'forasteiro',
    name: 'Forasteiro',
    description: 'Você cresceu no deserto, longe da civilização e os confortos de cidades e tecnologia. Você presenciou as maravilhas da natureza bruta, e sobreviveu em condições que acabariam com a maioria das pessoas civilizadas.',
    skills: ['Atletismo', 'Sobrevivência'],
    toolProf: 'Um instrumento musical',
    languages: 'Um idioma adicional',
    equipment: 'Bastão, armadilha de caça, um troféu de animal, roupas de viajante e uma bolsa com 10 po',
    feature: {
      name: 'Andarilho',
      description: 'Você tem memória excelente para mapas e geografia, e você sempre consegue se lembrar do terreno geral e das características de sua vizinhança. Além disso, você pode encontrar comida e água fresca para si mesmo e até cinco outras pessoas por dia, desde que a terra ofereça bagas, animais caça, água e similar.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'sabio',
    name: 'Sábio',
    description: 'Você passou anos estudando o multiverso. Você escavou manuscritos, estudou pergaminhos e ouviu as histórias dos mais velhos. Você se esforçou para aprender tudo que pôde sobre o multiverso.',
    skills: ['Arcanismo', 'História'],
    languages: 'Dois idiomas adicionais',
    equipment: 'Uma garrafa de tinta preta, uma caneta, um pequeno faca, carta de um colega falecido com perguntas sem resposta, roupas comuns e uma bolsa com 10 po',
    feature: {
      name: 'Pesquisador',
      description: 'Quando você tentar aprender ou se lembrar de uma informação, se você não souber, você frequentemente sabe onde e de quem você pode poder obtê-la. Geralmente, essa informação vem de uma biblioteca, scriptorium, universidade ou ainda um sábio ou criatura de conhecimento.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'marinheiro',
    name: 'Marinheiro',
    description: 'Você navegou em um navio por anos. Nesse tempo, você enfrentou tempestades sobrenaturais, monstros aquáticos e os piores impulsos de homens desesperados. Seu serviço duro e tentativo te formou bem.',
    skills: ['Atletismo', 'Percepção'],
    toolProf: 'Kit de navegador, veículos aquáticos',
    equipment: 'Um clavicórdio (instrumento de corda), um talismã de sorte ou 50 pés de corda de seda e uma bolsa com 10 po',
    feature: {
      name: 'Passagem Segura',
      description: 'Quando você precisar, você pode assegurar passagem gratuita em um navio para você e seus companheiros de aventura. Você pode navegar em qualquer navio, não apenas naquele em que você serviu, contanto que você tenha tido algum contato com o capitão do navio. O capitão pode pedir-lhe favores em troca.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'soldado',
    name: 'Soldado',
    description: 'A guerra tem sido sua vida desde jovem. Você treinou como miliciano, como soldado mercenário ou como parte de um exército nacional, e você ficou curado das ilusões românticas de guerras de outros recrutas.',
    skills: ['Atletismo', 'Intimidação'],
    toolProf: 'Um tipo de jogo, veículos terrestres',
    equipment: 'Um emblema de sua unidade anterior, um troféu de batalha (uma adaga, espada quebrada ou capacete amassado), um conjunto de dados de osso, roupas comuns e uma bolsa com 10 po',
    feature: {
      name: 'Hierarquia Militar',
      description: 'Você tem um grau militar de seu serviço anterior. Soldados leais à sua antiga organização militar ainda reconhecem sua autoridade e influência, e eles vão se deferir a você se forem de menor posto. Você pode invocar esse prestígio para exercer influência sobre outros soldados e requisitar equipamentos simples ou cavalos para uso temporário.'
    },
    source: "Player's Handbook"
  },
  {
    id: 'plebeu',
    name: 'Plebeu',
    description: 'Você cresceu nas ruas miseráveis de uma grande cidade, órfão, em sua maioria, sobrevivendo de astúcia e roubo. Você não tinha ninguém para velar por você, então você aprendeu rapidamente como cuidar de si mesmo - e isso significava comida, roupas e amigos, ou doentes.',
    skills: ['Furtividade', 'Percepção'],
    toolProf: 'Kit de disfarce, ferramentas de ladrão',
    equipment: 'Pequena faca, mapa da cidade em que você cresceu, um rato de animal de estimação, um recordatório da família, roupas comuns e uma bolsa com 10 po',
    feature: {
      name: 'Segredos da Cidade',
      description: 'Você conhece os segredos e o submundo de qualquer cidade em que tenha vivido. Quando você não está em combate, você (e acompanhantes que você lidera) podem se mover pelo dobro da velocidade normal através das cidades, pois você conhece os caminhos eficientes e os becos escondidos.'
    },
    source: "Player's Handbook"
  },
]
