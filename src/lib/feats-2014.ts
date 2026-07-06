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
  source?: string;
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
      'Aumente seu valor de Força ou Destreza em 1, até o máximo de 20.',
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
      'Aumente seu valor de Carisma em 1, até o máximo de 20.',
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
      'Aumente seu valor de Força ou Constituição em 1, até o máximo de 20.',
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
      'Aumente seu valor de Força em 1, até o máximo de 20.',
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
      'Aumente seu valor de Inteligência em 1, até o máximo de 20.',
      'Sempre sabe o norte e horas para o pôr/nascer do sol.',
      'Relembra com precisão qualquer coisa vista/ouvida no último mês.'
    ],
    attributeBonus: { intelligence: 1 }
  },
  {
    id: 'mestre-de-armas',
    name: 'Mestre de Armas',
    benefits: [
      'Aumente seu valor de Força ou Destreza em 1, até o máximo de 20.',
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
      'Aumente seu valor de Inteligência ou Sabedoria em 1, até o máximo de 20.',
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
      'Aumente seu valor de Inteligência em 1, até o máximo de 20.',
      'Aprende três idiomas adicionais.',
      'Pode criar criptogramas que outros só decifram com teste de Inteligência.'
    ],
    attributeBonus: { intelligence: 1 }
  },
  {
    id: 'protecao-leve',
    name: 'Proteção Leve',
    benefits: [
      'Aumente seu valor de Força ou Destreza em 1, até o máximo de 20.',
      'Ganha proficiência com armaduras leves.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity'] }
  },
  {
    id: 'protecao-moderada',
    name: 'Proteção Moderada',
    requirement: 'Proficiência em armadura leve',
    benefits: [
      'Aumente seu valor de Força ou Destreza em 1, até o máximo de 20.',
      'Ganha proficiência com armaduras médias e escudos.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity'] }
  },
  {
    id: 'protecao-pesada',
    name: 'Proteção Pesada',
    requirement: 'Proficiência em armadura média',
    benefits: [
      'Aumente seu valor de Força em 1, até o máximo de 20.',
      'Ganha proficiência com armaduras pesadas.'
    ],
    attributeBonus: { strength: 1 }
  },
  {
    id: 'resiliente',
    name: 'Resiliente',
    benefits: [
      'Aumente um valor de habilidade à sua escolha em 1, até o máximo de 20.',
      'Ganha proficiência em testes de resistência da habilidade escolhida.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] }
  },
  {
    id: 'resistente',
    name: 'Resistente',
    benefits: [
      'Aumente seu valor de Constituição em 1, até o máximo de 20.',
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
  },
  {
    id: 'agachamento-agil',
    name: 'Agachamento Ágil',
    requirement: 'Anão ou Raças Pequenas',
    benefits: [
      'Aumente seu valor de Força ou Destreza em 1, até o máximo de 20.',
      'Aumente seu deslocamento de caminhada em 1,5 metros.',
      'Você ganha proficiência em Acrobacia ou Atletismo (a sua escolha).',
      'Você tem vantagem em qualquer teste de Força (Atletismo) ou Destreza (Acrobacias) que faça para escapar de ser agarrado.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity'] },
    source: 'Guia do Xanathar'
  },
  {
    id: 'alta-magia-drow',
    name: 'Alta Magia Drow',
    requirement: 'Elfo (Drow)',
    benefits: [
      'Você aprende a magia detectar magia e pode conjurá-la à vontade, sem gastar um espaço de magia.',
      'Você aprende as magias levitação e dissipar magia, podendo conjurar cada uma delas uma vez sem gastar espaços de magias (recupera em descanso longo).',
      'O Carisma é a sua habilidade de conjuração para as três magias.'
    ],
    source: 'Guia do Xanathar'
  },
  {
    id: 'boa-sorte',
    name: 'Boa Sorte',
    requirement: 'Halfling',
    benefits: [
      'Quando um aliado visível a até 9 metros rola um 1 no d20 para ataque, teste ou resistência, pode usar sua reação para permitir que ele refaça o teste (deve usar o novo resultado).',
      'Quando usa essa característica, não pode usar seu traço racial Sorte antes do final do seu próximo turno.'
    ],
    source: 'Guia do Xanathar'
  },
  {
    id: 'chamas-de-phlegethos',
    name: 'Chamas de Phlegethos',
    requirement: 'Tiefling',
    benefits: [
      'Aumente seu valor de Inteligência ou Carisma em 1, até o máximo de 20.',
      'Quando rolar dano de fogo por alguma magia que tenha conjurado, pode rolar novamente qualquer 1 no dado de dano por fogo (deve usar a nova rolagem).',
      'Ao conjurar magia que cause dano de fogo, ganha chamas ao redor até o fim do turno (luz brilhante 9m, fraca +9m; inimigo que te atingir corpo-a-corpo a até 1,5m recebe 1d4 de dano de fogo).'
    ],
    attributeBonus: { choice: ['intelligence', 'charisma'] },
    source: 'Guia do Xanathar'
  },
  {
    id: 'constituicao-infernal',
    name: 'Constituição Infernal',
    requirement: 'Tiefling',
    benefits: [
      'Aumente seu valor de Constituição em 1, até o máximo de 20.',
      'Recebe resistência a dano por frio e por veneno.',
      'Você tem vantagem em testes de resistência contra ser envenenado.'
    ],
    attributeBonus: { constitution: 1 },
    source: 'Guia do Xanathar'
  },
  {
    id: 'couro-de-dragao',
    name: 'Couro de Dragão',
    requirement: 'Draconato',
    benefits: [
      'Aumente seu valor de Força, Constituição, ou Carisma em 1, até o máximo de 20.',
      'Enquanto não estiver vestindo armadura, pode calcular sua CA como 13 + seu modificador de Destreza (pode usar escudo).',
      'Garras retráteis naturais: ataques desarmados causam dano cortante de 1d4 + modificador de Força.'
    ],
    attributeBonus: { choice: ['strength', 'constitution', 'charisma'] },
    source: 'Guia do Xanathar'
  },
  {
    id: 'desvanecer',
    name: 'Desvanecer',
    requirement: 'Gnomo',
    benefits: [
      'Aumente seu valor de Destreza ou Inteligência em 1, até o máximo de 20.',
      'Após receber dano, usa reação para se tornar invisível até o fim do seu próximo turno (ou até atacar, dar dano ou forçar salvaguarda). 1x por descanso curto/longo.'
    ],
    attributeBonus: { choice: ['dexterity', 'intelligence'] },
    source: 'Guia do Xanathar'
  },
  {
    id: 'fortitude-ana',
    name: 'Fortitude Anã',
    requirement: 'Anão',
    benefits: [
      'Aumente seu valor de Constituição em 1, até o máximo de 20.',
      'Sempre que você realiza a ação Esquivar em combate, pode gastar um Dado de Vida para se curar (role o dado + mod de Constituição).'
    ],
    attributeBonus: { constitution: 1 },
    source: 'Guia do Xanathar'
  },
  {
    id: 'furia-orc',
    name: 'Fúria Orc',
    requirement: 'Meio-Orc',
    benefits: [
      'Aumente seu valor de Força ou Constituição em 1, até o máximo de 20.',
      'Ao atingir com arma simples/marcial, pode rolar um dos dados de dano uma vez adicionalmente (1x por descanso curto/longo).',
      'Imediatamente após usar seu traço Resistência Implacável, pode usar sua reação para realizar um ataque com arma.'
    ],
    attributeBonus: { choice: ['strength', 'constitution'] },
    source: 'Guia do Xanathar'
  },
  {
    id: 'magia-do-elfo-da-floresta',
    name: 'Magia do Elfo da Floresta',
    requirement: 'Elfo (floresta)',
    benefits: [
      'Você aprende um truque de druida a sua escolha.',
      'Aprende passos longos e passos sem pegadas (pode conjurar cada uma 1x sem espaço de magia por descanso longo).',
      'A Sabedoria é a sua habilidade de conjuração para as três magias.'
    ],
    source: 'Guia do Xanathar'
  },
  {
    id: 'precisao-elfica',
    name: 'Precisão Élfica',
    requirement: 'Elfo ou Meio-Elfo',
    benefits: [
      'Aumente seu valor de Destreza, Inteligência, Sabedoria ou Carisma em 1, até o máximo de 20.',
      'Sempre que tiver vantagem em ataque com Destreza, Inteligência, Sabedoria ou Carisma, você pode rolar novamente um dos dados do ataque uma vez.'
    ],
    attributeBonus: { choice: ['dexterity', 'intelligence', 'wisdom', 'charisma'] },
    source: 'Guia do Xanathar'
  },
  {
    id: 'prodigio',
    name: 'Prodígio',
    requirement: 'Meio-Elfo, Meio-Orc, Humano',
    benefits: [
      'Ganha proficiência em uma perícia, uma ferramenta e fluência em um idioma à sua escolha.',
      'Escolha uma perícia proficiente para ganhar Especialização (dobra o bônus de proficiência).'
    ],
    source: 'Guia do Xanathar'
  },
  {
    id: 'segunda-chance',
    name: 'Segunda Chance',
    requirement: 'Halfling',
    benefits: [
      'Aumente seu valor de Constituição ou Carisma em 1, até o máximo de 20.',
      'Ao ser atingido por ataque, usa reação para forçar o atacante a rolar novamente (1x por combate ou descanso curto/longo).'
    ],
    attributeBonus: { choice: ['constitution', 'charisma'] },
    source: 'Guia do Xanathar'
  },
  {
    id: 'teleporte-das-fadas',
    name: 'Teleporte das Fadas',
    requirement: 'Elfo (alto)',
    benefits: [
      'Aumente seu valor de Inteligência ou Carisma em 1, até o máximo de 20.',
      'Você aprende a falar, ler e escrever Silvestre (Sylvan).',
      'Aprende passo nebuloso e pode conjurar 1x sem gastar espaço de magia por descanso curto/longo (Inteligência é o atributo de conjuração).'
    ],
    attributeBonus: { choice: ['intelligence', 'charisma'] },
    source: 'Guia do Xanathar'
  },
  {
    id: 'temor-draconico',
    name: 'Temor Dracônico',
    requirement: 'Draconato',
    benefits: [
      'Aumente seu valor de Força, Constituição, ou Carisma em 1, até o máximo de 20.',
      'Pode gastar um uso do Sopro para rugir: inimigos a até 9m fazem teste de Sabedoria (CD 8 + prof + Car) ou ficam amedrontados por 1 min.'
    ],
    attributeBonus: { choice: ['strength', 'constitution', 'charisma'] },
    source: 'Guia do Xanathar'
  }
];
