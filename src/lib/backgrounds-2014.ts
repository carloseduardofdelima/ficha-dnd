import { Background } from './backgrounds';

export const BACKGROUNDS_2014: Background[] = [
  {
    id: 'acolyte_2014',
    name: 'Acólito',
    description: 'Você passou sua vida em serviço a um templo de uma divindade específica, realizando rituais e oferecendo sacrifícios.',
    image: '/assets/spells-icons/cleric.png',
    skills: ['Intuição', 'Religião'],
    languages: 'Dois idiomas à sua escolha',
    equipment: 'Um símbolo sagrado, um livro de orações, 5 varetas de incenso, vestes, roupas comuns e 15 po.',
    feature: {
      name: 'Abrigo dos Fiéis',
      description: 'Como acólito, você recebe respeito de quem compartilha sua fé e pode realizar os rituais de sua religião. Você e seus companheiros podem receber cura e assistência gratuita em templos, santuários ou outras presenças de sua fé, embora você deva fornecer os componentes materiais para magias se necessário.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'charlatan_2014',
    name: 'Charlatão',
    description: 'Você sabe como as pessoas funcionam e como tirar proveito de suas fraquezas, seja por ganância ou necessidade.',
    image: '/assets/spells-icons/rogue.png',
    skills: ['Enganação', 'Prestidigitação'],
    toolProf: 'Kit de disfarce, kit de falsificação',
    equipment: 'Roupas finas, kit de disfarce, ferramentas de falsificação e 15 po.',
    feature: {
      name: 'Identidade Falsa',
      description: 'Você possui uma segunda identidade estabelecida com documentação, contatos e disfarces prontos. Além disso, você pode forjar documentos oficiais e cartas pessoais desde que tenha visto um exemplo do tipo de documento ou da grafia que está tentando copiar.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'criminal_2014',
    name: 'Criminoso',
    description: 'Você tem um histórico de quebrar a lei e sobreviveu em um ambiente de crime e perigo.',
    image: '/assets/spells-icons/rogue.png',
    skills: ['Enganação', 'Furtividade'],
    toolProf: 'Um tipo de kit de jogo, ferramentas de ladrão',
    equipment: 'Um pé de cabra, roupas escuras comuns com capuz e 15 po.',
    feature: {
      name: 'Contato Criminoso',
      description: 'Você tem um contato confiável em uma rede de criminosos com quem pode trocar informações ou solicitar favores. Você sabe como enviar e receber mensagens de seu contato mesmo em grandes distâncias, através de mensageiros locais, taberneiros corruptos ou outros indivíduos do submundo.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'entertainer_2014',
    name: 'Artista',
    description: 'Você prospera na frente de um público e sabe como cativá-lo com sua arte e carisma.',
    image: '/assets/spells-icons/bard.png',
    skills: ['Acrobacia', 'Atuação'],
    toolProf: 'Kit de disfarce, um tipo de instrumento musical',
    equipment: 'Um instrumento musical, o favor de um admirador, um figurino e 15 po.',
    feature: {
      name: 'A Pedido do Público',
      description: 'Você sempre encontra um lugar para se apresentar (tabernas, circos, cortes) e, em troca, recebe alojamento e comida de qualidade modesta gratuitamente. Você é reconhecido nas cidades onde já se apresentou e seus fãs podem ajudá-lo se você não for um perigo para eles.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'folk_hero_2014',
    name: 'Herói do Povo',
    description: 'Você veio de uma origem humilde e se tornou um campeão para as pessoas comuns contra a opressão.',
    image: '/assets/spells-icons/fighter.png',
    skills: ['Adestrar Animais', 'Sobrevivência'],
    toolProf: 'Um tipo de ferramenta de artesão, veículos (terrestre)',
    equipment: 'Ferramentas de artesão, uma pá, um pote de ferro, roupas comuns e 10 po.',
    feature: {
      name: 'Hospitalidade Rústica',
      description: 'O povo comum acolherá você como um deles. Eles o esconderão de autoridades ou de qualquer um que o procure, oferecendo abrigo e descanso em suas casas, desde que você não tenha se mostrado um perigo direto para a comunidade.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'guild_artisan_2014',
    name: 'Artesão de Guilda',
    description: 'Você é um membro estabelecido de uma guilda de artesãos, respeitado por sua habilidade e ofício.',
    image: '/assets/spells-icons/artificer.png',
    skills: ['Intuição', 'Persuasão'],
    toolProf: 'Um tipo de ferramenta de artesão',
    languages: 'Um idioma à sua escolha',
    equipment: 'Ferramentas de artesão, uma carta de apresentação da sua guilda, roupas finas e 15 po.',
    feature: {
      name: 'Membro de Guilda',
      description: 'Você tem acesso aos benefícios de sua guilda, incluindo alojamento, ferramentas e contatos políticos. A guilda pode defendê-lo em questões legais ou fornecer introduções a pessoas poderosas, desde que você mantenha o pagamento mensal de 5 po.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'hermit_2014',
    name: 'Hermitão',
    description: 'Você viveu em isolamento em busca de iluminação espiritual ou de uma verdade oculta.',
    image: '/assets/spells-icons/druid.png',
    skills: ['Medicina', 'Religião'],
    toolProf: 'Kit de herbalismo',
    languages: 'Um idioma à sua escolha',
    equipment: 'Um estojo de pergaminho cheio de notas, um cobertor de inverno, roupas comuns, kit de herbalismo e 5 po.',
    feature: {
      name: 'Descoberta',
      description: 'A quietude de sua reclusão deu acesso a uma revelação única. Pode ser uma verdade cósmica, um segredo de estado, um local esquecido ou qualquer outra informação poderosa que o DM determinar. Esse conhecimento pode ser a chave para sua aventura.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'noble_2014',
    name: 'Nobre',
    description: 'Você pertence a uma linhagem de privilégio e poder, acostumado a comandar e ser respeitado.',
    image: '/assets/spells-icons/paladin.png',
    skills: ['História', 'Persuasão'],
    toolProf: 'Um tipo de kit de jogos',
    languages: 'Um idioma à sua escolha',
    equipment: 'Roupas finas, um anel de sinete, um pergaminho de linhagem e 25 po.',
    feature: {
      name: 'Posição Privilegiada',
      description: 'Você é bem-vindo na alta sociedade e as pessoas assumem que você tem o direito de estar onde quer que esteja. Você consegue audiências com outros nobres facilmente e a guarda comum raramente questionará suas ações de forma agressiva.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'outlander_2014',
    name: 'Forasteiro',
    description: 'Você cresceu nas terras selvagens e conhece os segredos da natureza intocada.',
    image: '/assets/spells-icons/ranger.png',
    skills: ['Atletismo', 'Sobrevivência'],
    toolProf: 'Um tipo de instrumento musical',
    languages: 'Um idioma à sua escolha',
    equipment: 'Um bordão, uma armadilha de caça, um troféu de animal, roupas de viajante e 10 po.',
    feature: {
      name: 'Andarilho',
      description: 'Você tem uma memória excelente para mapas e geografia. Você sempre consegue encontrar comida e água fresca para si e mais cinco pessoas todos os dias, desde que o terreno ofereça bagas, animais de caça ou água, sem precisar de testes de sobrevivência.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'sage_2014',
    name: 'Sábio',
    description: 'Você passou anos estudando a lore do multiverso em bibliotecas e monastérios.',
    image: '/assets/spells-icons/wizard.png',
    skills: ['Arcanismo', 'História'],
    languages: 'Dois idiomas à sua escolha',
    equipment: 'Um vidro de tinta preta, uma pena, uma faca pequena, uma carta de um falecido mentor, roupas comuns e 10 po.',
    feature: {
      name: 'Pesquisador',
      description: 'Quando você não sabe uma informação, você quase sempre sabe onde ou com quem encontrá-la. Geralmente esse conhecimento vem de bibliotecas, scriptoriums, universidades ou de outros sábios e criaturas com vasto conhecimento acadêmico.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'sailor_2014',
    name: 'Marinheiro',
    description: 'Você passou sua vida em navios, enfrentando os perigos dos mares e oceanos.',
    image: '/assets/spells-icons/ranger.png',
    skills: ['Atletismo', 'Percepção'],
    toolProf: 'Ferramentas de navegador, veículos aquáticos',
    equipment: 'Um malhete de marinheiro, 15 metros de corda de seda, um amuleto da sorte, roupas comuns e 10 po.',
    feature: {
      name: 'Passagem de Navio',
      description: 'Você pode conseguir passagem gratuita em um navio para você e seus companheiros. Você pode navegar em qualquer navio, não apenas no qual serviu, contanto que tenha tido contato prévio com o capitão. Ele pode solicitar pequenos favores em troca do transporte.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'soldier_2014',
    name: 'Soldado',
    description: 'Você serviu em um exército e conhece a disciplina, a hierarquia e o custo da guerra.',
    image: '/assets/spells-icons/fighter.png',
    skills: ['Atletismo', 'Intimidação'],
    toolProf: 'Um tipo de kit de jogo, veículos (terrestre)',
    equipment: 'Uma insígnia de patente, um troféu de um inimigo caído, roupas comuns e 10 po.',
    feature: {
      name: 'Patente Militar',
      description: 'Você mantém sua patente e soldados de sua antiga organização ainda o respeitam. Você pode usar sua influência para requisitar equipamentos simples ou cavalos para uso temporário, e ter acesso livre a acampamentos e fortalezas onde sua patente seja reconhecida.'
    },
    source: "Player's Handbook 2014"
  },
  {
    id: 'urchin_2014',
    name: 'Órfão',
    description: 'Você cresceu sozinho nas ruas de uma grande cidade, sobrevivendo através da astúcia.',
    image: '/assets/spells-icons/rogue.png',
    skills: ['Prestidigitação', 'Furtividade'],
    toolProf: 'Kit de disfarce, ferramentas de ladrão',
    equipment: 'Uma faca pequena, um mapa da cidade em que você cresceu, um rato de estimação, um amuleto e 10 po.',
    feature: {
      name: 'Segredos da Cidade',
      description: 'Você conhece os caminhos ocultos e passagens secretas das cidades. Fora de combate, você e seus companheiros podem viajar entre dois locais em uma cidade duas vezes mais rápido do que o normal, utilizando becos, telhados e esgotos que outros ignorariam.'
    },
    source: "Player's Handbook 2014"
  }
];
