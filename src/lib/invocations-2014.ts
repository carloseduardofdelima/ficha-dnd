export interface WarlockInvocation {
  id: string;
  name: string;
  description: string;
  prerequisite?: string;
  level?: number;
}

export const INVOCATIONS_2014: WarlockInvocation[] = [
  {
    id: 'armor-of-shadows',
    name: 'Armadura de Sombras',
    description: 'Você pode conjurar armadura arcana em si mesmo, à vontade, sem precisar gastar um espaço de magia ou componentes materiais.'
  },
  {
    id: 'chains-of-carceri',
    name: 'Correntes de Cárceri',
    description: 'Você pode conjurar imobilizar monstro, à vontade – tendo como alvo um celestial, corruptor ou elemental – sem precisar gastar um espaço de magia ou componentes materiais. Você deve terminar um descanso longo antes de poder usar essa invocação na mesma criatura novamente.',
    prerequisite: 'Pacto da Corrente',
    level: 15
  },
  {
    id: 'bewitching-whispers',
    name: 'Sussurros Sedutores',
    description: 'Você pode conjurar compulsão, uma vez, usando um espaço de magia de bruxo. Você não pode fazer isso novamente até terminar um descanso longo.',
    level: 7
  },
  {
    id: 'dreadful-word',
    name: 'Palavra Terrível',
    description: 'Você pode conjurar confusão, uma vez, usando um espaço de magia de bruxo. Você não pode fazer isso novamente até terminar um descanso longo.',
    level: 7
  },
  {
    id: 'sculptor-of-flesh',
    name: 'Escultor de Carne',
    description: 'Você pode conjurar metamorfose, uma vez, usando um espaço de magia de bruxo. Você não pode fazer isso novamente até terminar um descanso longo.',
    level: 7
  },
  {
    id: 'mire-the-mind',
    name: 'Encharcar a Mente',
    description: 'Você pode conjurar lentidão, uma vez, usando um espaço de magia de bruxo. Você não pode fazer isso novamente até terminar um descanso longo.',
    level: 5
  },
  {
    id: 'agonizing-blast',
    name: 'Explosão Agonizante',
    description: 'Quando você conjura rajada mística, adicione seu modificador de Carisma ao dano causado quando atingir.',
    prerequisite: 'truque rajada mística'
  },
  {
    id: 'repelling-blast',
    name: 'Explosão Repulsiva',
    description: 'Quando você atingir uma criatura com uma rajada mística, você pode empurrar a criatura até 3 metros para longe de você em linha reta.',
    prerequisite: 'truque rajada mística'
  },
  {
    id: 'eldritch-spear',
    name: 'Lança Mística',
    description: 'Quando você conjura rajada mística, seu alcance será de 90 metros.',
    prerequisite: 'truque rajada mística'
  },
  {
    id: 'beast-speech',
    name: 'Idioma Bestial',
    description: 'Você pode conjurar falar com animais, à vontade, sem precisar gastar um espaço de magia.'
  },
  {
    id: 'beguiling-influence',
    name: 'Influência Enganadora',
    description: 'Você ganha proficiência nas perícias Enganação e Persuasão.'
  },
  {
    id: 'minions-of-chaos',
    name: 'Lacaios do Caos',
    description: 'Você pode lançar conjurar elemental, uma vez, usando um espaço de magia de bruxo. Você não pode fazer isso novamente até terminar um descanso longo.',
    level: 9
  },
  {
    id: 'thirsting-blade',
    name: 'Lâmina Sedenta',
    description: 'Você pode atacar com sua arma do pacto duas vezes, ao invés de apenas uma, quando você usa a ação de Ataque no seu turno.',
    prerequisite: 'Pacto da Lâmina',
    level: 5
  },
  {
    id: 'thief-of-five-fates',
    name: 'Larápio dos Cinco Destinos',
    description: 'Você pode conjurar perdição, uma vez, usando um espaço de magia de bruxo. Você não pode fazer isso novamente até terminar um descanso longo.'
  },
  {
    id: 'book-of-ancient-secrets',
    name: 'Livro de Segredos Antigos',
    description: 'Você pode agora, registrar rituais mágicos no seu Livro das Sombras. Escolha duas magias de 1° nível que possuam o descritor ritual da lista de magias de qualquer classe. Você pode adicionar outros rituais ao livro durante suas aventuras.',
    prerequisite: 'Pacto do Tomo'
  },
  {
    id: 'mask-of-many-faces',
    name: 'Máscara das Muitas Faces',
    description: 'Você pode conjurar disfarçar-se, à vontade, sem precisar gastar um espaço de magia.'
  },
  {
    id: 'master-of-myriad-forms',
    name: 'Mestre das Infindáveis Formas',
    description: 'Você pode conjurar alterar-se, à vontade, sem precisar gastar um espaço de magia.',
    level: 15
  },
  {
    id: 'gaze-of-two-minds',
    name: 'Olhar de Duas Mentes',
    description: 'Você pode usar sua ação para tocar um humanoide voluntário e perceber através do seus sentidos até o final do seu próximo turno.'
  },
  {
    id: 'eyes-of-the-rune-keeper',
    name: 'Olhos do Guardião das Runas',
    description: 'Você pode ler todas as escritas.'
  },
  {
    id: 'ascendant-step',
    name: 'Passo Ascendente',
    description: 'Você pode conjurar levitação em si mesmo, à vontade, sem precisar gastar um espaço de magia ou componentes materiais.',
    level: 9
  },
  {
    id: 'otherworldly-leap',
    name: 'Salto Transcendental',
    description: 'Você pode conjurar salto em si mesmo, à vontade, sem precisar gastar um espaço de magia ou componentes materiais.',
    level: 9
  },
  {
    id: 'sign-of-ill-omen',
    name: 'Sinal de Mau Agouro',
    description: 'Você pode conjurar rogar maldição, uma vez, usando um espaço de magia de bruxo. Você não pode fazer isso novamente até terminar um descanso longo.',
    level: 5
  },
  {
    id: 'lifedrinker',
    name: 'Sorvedor de Vida',
    description: 'Quando você atingir uma criatura com sua arma do pacto, a criatura sofre uma quantidade de dano necrótico adicional igual ao seu modificador de Carisma.',
    prerequisite: 'Pacto da Lâmina',
    level: 12
  },
  {
    id: 'whispers-of-the-grave',
    name: 'Sussurros da Sepultura',
    description: 'Você pode conjurar falar com os mortos, à vontade, sem precisar gastar um espaço de magia.',
    level: 9
  },
  {
    id: 'one-with-shadows',
    name: 'Uno com as Sombras',
    description: 'Quando você estiver em uma área de penumbra ou escuridão, você pode usar sua ação para ficar invisível até se mover ou realizar uma ação ou reação.',
    level: 5
  },
  {
    id: 'fiendish-vigor',
    name: 'Vigor Abissal',
    description: 'Você pode conjurar vitalidade falsa em si mesmo, à vontade, como uma magia de 1° nível, sem precisar gastar um espaço de magia ou componentes materiais.'
  },
  {
    id: 'witch-sight',
    name: 'Visão da Bruxa',
    description: 'Você pode ver a verdadeira forma de qualquer metamorfo ou criatura oculta através de magias de ilusão ou transmutação a até 9 metros.',
    level: 15
  },
  {
    id: 'devil-sight',
    name: 'Visão Diabólica',
    description: 'Você pode ver normalmente na escuridão, tanto mágica quanto normal, com um alcance de 36 metros.'
  },
  {
    id: 'eldritch-sight',
    name: 'Visão Mística',
    description: 'Você pode conjurar detectar magia, à vontade, sem precisar gastar um espaço de magia.'
  },
  {
    id: 'visions-of-distant-realms',
    name: 'Visões de Reinados Distantes',
    description: 'Você pode conjurar olho arcano, à vontade, sem precisar gastar um espaço de magia.',
    level: 15
  },
  {
    id: 'misty-visions',
    name: 'Visões nas Brumas',
    description: 'Você pode conjurar imagem silenciosa, à vontade, sem precisar gastar um espaço de magia ou componentes materiais.'
  },
  {
    id: 'voice-of-the-chain-master',
    name: 'Voz do Mestre das Correntes',
    description: 'Você pode se comunicar telepaticamente com seu familiar e perceber através dos sentidos dele enquanto estiverem no mesmo plano.',
    prerequisite: 'Pacto da Corrente'
  }
];
