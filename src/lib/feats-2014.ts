export interface Feat2014 {
  id: string;
  name: string;
  requirement?: string;
  description?: string; // Summary description
  benefits: string[]; // Detailed list of benefits
  attributeBonus?: {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
    choice?: string[]; // When user chooses which attribute to increase
  };
}

export const FEATS_2014: Feat2014[] = [
  {
    id: 'asi-2014',
    name: 'Incremento no Valor de Habilidade',
    benefits: [
      'Aumente um valor de habilidade em 2 ou dois valores de habilidade em 1.',
      'Você não pode aumentar um valor de habilidade acima de 20 dessa forma.'
    ]
  },
  {
    id: 'adepto-elemental',
    name: 'Adepto Elemental',
    requirement: 'Capacidade de conjurar pelo menos uma magia',
    benefits: [
      'Escolha um tipo de dano: ácido, elétrico, fogo, frio ou trovão.',
      'Suas magias ignoram resistência ao tipo de dano escolhido.',
      'Ao rolar o dano para uma magia do tipo escolhido, você pode tratar qualquer 1 no dado como um 2.'
    ]
  },
  {
    id: 'adepto-marcial',
    name: 'Adepto Marcial',
    benefits: [
      'Você aprende duas manobras da lista do arquétipo Mestre de Batalha.',
      'A CD para suas manobras é 8 + bônus de proficiência + modificador de Força ou Destreza.',
      'Você ganha um dado de superioridade (d6), ou um adicional se já possuir. Recupera em descanso curto ou longo.'
    ]
  },
  {
    id: 'alerta',
    name: 'Alerta',
    benefits: [
      'Você recebe +5 de bônus em iniciativa.',
      'Você não pode ser surpreso enquanto estiver consciente.',
      'Outras criaturas não ganham vantagem nas jogadas de ataque contra você por estarem escondidas.'
    ]
  },
  {
    id: 'ambidestro',
    name: 'Ambidestro',
    benefits: [
      'Você ganha +1 de bônus na CA enquanto estiver empunhando uma arma corpo-a-corpo em cada mão.',
      'Você pode usar combater com duas armas mesmo que a arma não seja leve.',
      'Você pode sacar ou guardar duas armas de uma mão simultaneamente.'
    ]
  },
  {
    id: 'atacante-bestial',
    name: 'Atacante Bestial',
    benefits: [
      'Uma vez por turno, ao rolar o dano para um ataque corpo-a-corpo com arma, você pode jogar novamente o dado de dano e usar qualquer dos valores.'
    ]
  },
  {
    id: 'atirador-aguçado',
    name: 'Atirador Aguçado',
    benefits: [
      'Distância longa não impõe desvantagem em ataques com armas à distância.',
      'Seus ataques com armas à distância ignoram meia-cobertura e três-quartos de cobertura.',
      'Antes de atacar com arma à distância (proficiente), você pode sofrer -5 no acerto para ganhar +10 no dano.'
    ]
  },
  {
    id: 'atirador-de-magia',
    name: 'Atirador de Magia',
    requirement: 'Capacidade de conjurar pelo menos uma magia',
    benefits: [
      'O alcance de magias que requerem jogada de ataque é dobrado.',
      'Seus ataques à distância com magia ignoram meia-cobertura e três-quartos de cobertura.',
      'Você aprende um truque que requer jogada de ataque de qualquer lista de classe (Bardo, Bruxo, Clérigo, Druida, Feiticeiro ou Mago).'
    ]
  },
  {
    id: 'atleta',
    name: 'Atleta',
    benefits: [
      'Levantar-se quando caído custa apenas 1,5 metro de movimento.',
      'Escalar não custa movimento adicional.',
      'Pode saltar correndo movendo-se apenas 1,5 metro antes.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity'] }
  },
  {
    id: 'ator',
    name: 'Ator',
    benefits: [
      'Vantagem em testes de Atuação e Enganação para se passar por outra pessoa.',
      'Você pode imitar a voz de uma pessoa ou sons de criaturas ouvidos por pelo menos 1 minuto.'
    ],
    attributeBonus: { charisma: 1 }
  },
  {
    id: 'combatente-montado',
    name: 'Combatente Montado',
    benefits: [
      'Vantagem em ataques corpo-a-corpo contra criaturas menores que sua montaria.',
      'Pode forçar ataques contra sua montaria a serem direcionados a você.',
      'Sua montaria ganha algo similar a Evasão (meio dano em falha, nenhum em sucesso de Destreza).'
    ]
  },
  {
    id: 'conjurador-de-guerra',
    name: 'Conjurador de Guerra',
    requirement: 'Capacidade de conjurar pelo menos uma magia',
    benefits: [
      'Vantagem em testes de Constituição para manter concentração ao sofrer dano.',
      'Pode realizar componentes somáticos mesmo com armas ou escudos nas mãos.',
      'Pode usar reação para conjurar uma magia em vez de realizar ataque de oportunidade.'
    ]
  },
  {
    id: 'conjurador-de-ritual',
    name: 'Conjurador de Ritual',
    requirement: 'Inteligência ou Sabedoria 13 ou maior',
    benefits: [
      'Você ganha um livro de rituais com duas magias de 1º nível com descritor ritual.',
      'Pode adicionar novos rituais encontrados ao livro (2 horas e 50 po por nível da magia).',
      'Nível da magia não pode exceder metade do seu nível (arredondado para cima).'
    ]
  },
  {
    id: 'curandeiro',
    name: 'Curandeiro',
    benefits: [
      'Ao estabilizar alguém com kit de primeiros-socorros, a criatura recupera 1 PV.',
      'Com uma ação, gasta um uso do kit para curar 1d6 + 4 + total de Dados de Vida da criatura (1x por descanso curto/longo).'
    ]
  },
  {
    id: 'duelista-defensivo',
    name: 'Duelista Defensivo',
    requirement: 'Destreza 13 ou maior',
    benefits: [
      'Ao ser atingido corpo-a-corpo usando arma de acuidade proficiente, usa reação para somar bônus de proficiência na CA.'
    ]
  },
  {
    id: 'especialista-em-besta',
    name: 'Especialista em Besta',
    benefits: [
      'Ignora a qualidade de recarga de bestas proficientes.',
      'Estar a 1,5 metro de inimigo não impõe desvantagem em ataques à distância.',
      'Ao atacar com arma de uma mão, pode usar ação bônus para atacar com besta de mão carregada.'
    ]
  },
  {
    id: 'especialista-em-briga',
    name: 'Especialista em Briga',
    benefits: [
      'Seus ataques desarmados causam 1d4 de dano.',
      'Pode usar ação bônus para agarrar após atingir com ataque desarmado ou arma improvisada.'
    ],
    attributeBonus: { choice: ['strength', 'constitution'] }
  },
  {
    id: 'explorador-de-cavernas',
    name: 'Explorador de Cavernas',
    benefits: [
      'Vantagem para detectar portas secretas e em testes de resistência contra armadilhas.',
      'Resistência a dano de armadilhas.',
      'Pode procurar armadilhas em ritmo de viagem normal.'
    ]
  },
  {
    id: 'imobilizador',
    name: 'Imobilizador',
    requirement: 'Força 13 ou maior',
    benefits: [
      'Vantagem em ataques contra criaturas agarradas.',
      'Pode usar ação para realizar um segundo teste de agarrar e deixar ambos impedidos.'
    ]
  },
  {
    id: 'iniciado-em-magia',
    name: 'Iniciado em Magia',
    benefits: [
      'Aprende dois truques e uma magia de 1º nível de uma classe específica.',
      'Pode conjurar a magia de 1º nível uma vez por descanso longo.',
      'A habilidade de conjuração depende da classe escolhida.'
    ]
  },
  {
    id: 'investida-poderosa',
    name: 'Investida Poderosa',
    benefits: [
      'Ao usar Disparada, pode usar ação bônus para atacar ou empurrar.',
      'Se mover 3m em linha reta antes, ganha +5 no dano ou empurra o alvo 3m.'
    ]
  },
  {
    id: 'lider-inspirador',
    name: 'Líder Inspirador',
    requirement: 'Carisma 13 ou maior',
    benefits: [
      'Pode inspirar até 6 criaturas em 10 min.',
      'Cada criatura ganha PV temporários igual ao seu nível + modificador de Carisma (1x por descanso).'
    ]
  },
  {
    id: 'maestria-em-arma-de-haste',
    name: 'Maestria em Arma de Haste',
    benefits: [
      'Ao atacar com glaive, alabarda ou bordão, pode usar ação bônus para ataque de d4 com a outra ponta.',
      'Criaturas provocam ataque de oportunidade ao entrarem no seu alcance (glaive, alabarda, lança longa ou bastão).'
    ]
  },
  {
    id: 'maestria-em-armadura-media',
    name: 'Maestria em Armadura Média',
    requirement: 'Proficiência em armadura média',
    benefits: [
      'Usar armadura média não impõe desvantagem em Furtividade.',
      'Pode adicionar até +3 (em vez de +2) na CA pela Destreza se tiver Des 16+.'
    ]
  },
  {
    id: 'maestria-em-armadura-pesada',
    name: 'Maestria em Armadura Pesada',
    requirement: 'Proficiência em armadura pesada',
    benefits: [
      'Reduz em 3 o dano físico (concussão, cortante, perfurante) não-mágico enquanto veste armadura pesada.'
    ],
    attributeBonus: { strength: 1 }
  },
  {
    id: 'matador-de-conjuradores',
    name: 'Matador de Conjuradores',
    benefits: [
      'Reação para atacar criatura a 1,5m que conjure magia.',
      'Causa desvantagem no teste de concentração do alvo ao dar dano.',
      'Vantagem em resistências contra magias de criaturas a até 1,5m.'
    ]
  },
  {
    id: 'mente-afiada',
    name: 'Mente Afiada',
    benefits: [
      'Sempre sabe o norte e horas para o pôr/nascer do sol.',
      'Relembra com precisão qualquer coisa vista/ouvida no último mês.'
    ],
    attributeBonus: { intelligence: 1 }
  },
  {
    id: 'mestre-de-armas',
    name: 'Mestre de Armas',
    benefits: [
      'Ganha proficiência com quatro armas simples ou marciais à sua escolha.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity'] }
  },
  {
    id: 'mestre-de-armas-grandes',
    name: 'Mestre de Armas Grandes',
    benefits: [
      'Ao dar crítico ou reduzir PV a 0, pode realizar um ataque como ação bônus.',
      'Antes de atacar com arma pesada proficiente, pode sofrer -5 no acerto para ganhar +10 no dano.'
    ]
  },
  {
    id: 'mestre-de-escudo',
    name: 'Mestre de Escudo',
    benefits: [
      'Ação bônus para empurrar com escudo ao realizar ação de Ataque.',
      'Soma bônus do escudo em testes de Destreza contra magias de alvo único.',
      'Reação para não sofrer dano se passar em teste de Destreza (Evasão com escudo).'
    ]
  },
  {
    id: 'mobilidade',
    name: 'Mobilidade',
    benefits: [
      'Seu deslocamento aumenta em 3 metros.',
      'Ao usar Disparada, terreno difícil não custa movimento extra.',
      'Ao atacar corpo-a-corpo, não provoca ataques de oportunidade daquele alvo no turno.'
    ]
  },
  {
    id: 'observador',
    name: 'Observador',
    benefits: [
      'Pode ler lábios de idiomas que compreende.',
      'Bônus de +5 em Percepção Passiva e Investigação Passiva.'
    ],
    attributeBonus: { choice: ['intelligence', 'wisdom'] }
  },
  {
    id: 'perito',
    name: 'Perito',
    benefits: [
      'Ganha proficiência em qualquer combinação de três perícias ou ferramentas.'
    ]
  },
  {
    id: 'poliglota',
    name: 'Poliglota',
    benefits: [
      'Aprende três idiomas adicionais.',
      'Pode criar criptogramas que outros só decifram com teste de Inteligência.'
    ],
    attributeBonus: { intelligence: 1 }
  },
  {
    id: 'protecao-leve',
    name: 'Proteção Leve',
    benefits: [
      'Ganha proficiência com armaduras leves.'
    ],
    attributeBonus: { strength: 1 }
  },
  {
    id: 'protecao-moderada',
    name: 'Proteção Moderada',
    requirement: 'Proficiência em armadura leve',
    benefits: [
      'Ganha proficiência com armaduras médias e escudos.'
    ],
    attributeBonus: { strength: 1 }
  },
  {
    id: 'protecao-pesada',
    name: 'Proteção Pesada',
    requirement: 'Proficiência em armadura média',
    benefits: [
      'Ganha proficiência com armaduras pesadas.'
    ],
    attributeBonus: { strength: 1 }
  },
  {
    id: 'resiliente',
    name: 'Resiliente',
    benefits: [
      'Aumente um valor de habilidade em 1.',
      'Ganha proficiência em testes de resistência da habilidade escolhida.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] }
  },
  {
    id: 'resistente',
    name: 'Resistente',
    benefits: [
      'Ao rolar Dado de Vida para curar, o mínimo recuperado é 2x seu modificador de Constituição (mínimo 2).'
    ],
    attributeBonus: { constitution: 1 }
  },
  {
    id: 'robusto',
    name: 'Robusto',
    benefits: [
      'Seu máximo de PV aumenta em 2x seu nível atual.',
      'Ao subir de nível, ganha +2 PV adicionais além do normal.'
    ]
  },
  {
    id: 'sentinela',
    name: 'Sentinela',
    benefits: [
      'Ao atingir com ataque de oportunidade, o deslocamento do alvo vira 0.',
      'Inimigos provocam ataque de oportunidade mesmo se usarem Desengajar.',
      'Reação para atacar quem agride aliado a até 1,5m.'
    ]
  },
  {
    id: 'sorrateiro',
    name: 'Sorrateiro',
    requirement: 'Destreza 13 ou maior',
    benefits: [
      'Pode se esconder quando estiver levemente obscurecido.',
      'Errar ataque à distância enquanto escondido não revela sua posição.',
      'Penumbra não impõe desvantagem em Percepção visual.'
    ]
  },
  {
    id: 'sortudo',
    name: 'Sortudo',
    benefits: [
      'Você tem 3 pontos de sorte por descanso longo.',
      'Pode gastar ponto para rolar d20 adicional em ataques, testes ou resistências (ou contra ataques sofridos).'
    ]
  }
];
