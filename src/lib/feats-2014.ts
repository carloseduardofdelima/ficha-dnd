export interface Feat2014 {
  id: string;
  name: string;
  requirement?: string;
  minLevel?: number;
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
    requirement: 'Nível 4+',
    minLevel: 4,
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
      'Ao obter este talento, escolha um tipo de dano: ácido, elétrico, fogo, frio ou trovão.',
      'Suas magias ignoram resistência ao tipo de dano escolhido.',
      'Ao rolar o dano para uma magia que cause o tipo de dano escolhido, você pode tratar qualquer resultado 1 em um dado de dano como um 2.',
      'Você pode escolher este talento mais de uma vez, mas deve escolher um tipo de dano diferente a cada vez.'
    ]
  },
  {
    id: 'adepto-marcial',
    name: 'Adepto Marcial',
    benefits: [
      'Você aprende duas manobras à sua escolha da lista do arquétipo Mestre de Batalha do Guerreiro. Se uma manobra exigir salvaguarda do alvo, a CD é 8 + seu bônus de proficiência + seu modificador de Força ou Destreza (à sua escolha).',
      'Você ganha um dado de superioridade (um d6) para gastar em suas manobras. Se você já possuir dados de superioridade por outra fonte, ele se junta aos seus dados existentes e você adiciona mais um dado do mesmo tipo dos seus dados atuais.',
      'Você recupera o dado de superioridade gasto ao terminar um descanso curto ou longo.'
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
      'Uma vez por turno, ao rolar o dano para um ataque corpo a corpo com arma, você pode rolar os dados de dano da arma novamente e usar qualquer um dos resultados à sua escolha.'
    ]
  },
  {
    id: 'atirador-aguçado',
    name: 'Atirador Aguçado',
    benefits: [
      'Atacar alvos em distância longa não impõe desvantagem em suas jogadas de ataque com armas à distância.',
      'Seus ataques com armas à distância ignoram meia-cobertura e três-quartos de cobertura.',
      'Antes de realizar um ataque com uma arma à distância na qual seja proficiente, você pode escolher sofrer uma penalidade de -5 na jogada de ataque. Se o ataque acertar, você adiciona +10 ao dano da arma.'
    ]
  },
  {
    id: 'atirador-de-magia',
    name: 'Atirador de Magia',
    requirement: 'Capacidade de conjurar pelo menos uma magia',
    benefits: [
      'Ao conjurar uma magia que exige uma jogada de ataque, o alcance da magia é dobrado.',
      'Seus ataques com magias à distância ignoram meia-cobertura e três-quartos de cobertura.',
      'Você aprende um truque que exige uma jogada de ataque, escolhido da lista de magias de Bardo, Bruxo, Clérigo, Druida, Feiticeiro ou Mago. Sua habilidade de conjuração para este truque depende da lista escolhida: Carisma para Bardo, Bruxo ou Feiticeiro; Sabedoria para Clérigo ou Druida; Inteligência para Mago.'
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
      'Você tem vantagem em jogadas de ataque corpo a corpo contra qualquer criatura desequipada que seja menor do que a sua montaria.',
      'Você pode forçar um ataque direcionado à sua montaria a ter você como alvo em vez disso.',
      'Se a sua montaria for submetida a um efeito que permita realizar um teste de resistência de Destreza para sofrer apenas metade do dano, ela não sofre dano algum se for bem-sucedida, e sofre apenas metade do dano se falhar.'
    ]
  },
  {
    id: 'conjurador-de-guerra',
    name: 'Conjurador de Guerra',
    requirement: 'Capacidade de conjurar pelo menos uma magia',
    benefits: [
      'Você tem vantagem em testes de resistência de Constituição para manter a concentração em uma magia ao sofrer dano.',
      'Você pode executar os componentes somáticos de magias mesmo quando estiver empunhando armas ou um escudo em uma ou ambas as mãos.',
      'Quando o movimento de uma criatura hostil provocar um ataque de oportunidade de você, você pode usar sua reação para conjurar uma magia contra a criatura, em vez de realizar um ataque de oportunidade. A magia deve ter tempo de conjuração de 1 ação e ter como alvo apenas aquela criatura.'
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
      'Ao usar um kit de primeiros-socorros para estabilizar uma criatura morrendo, ela recupera 1 ponto de vida em vez de permanecer inconsciente a 0 PV.',
      'Com uma ação, você pode gastar um uso de um kit de primeiros-socorros para cuidar de uma criatura e restaurar 1d6 + 4 pontos de vida a ela, mais um número adicional de PV igual ao número total de Dados de Vida que a criatura possui. Uma criatura não pode recuperar PV com este benefício novamente até terminar um descanso curto ou longo.'
    ]
  },
  {
    id: 'duelista-defensivo',
    name: 'Duelista Defensivo',
    requirement: 'Destreza 13 ou maior',
    benefits: [
      'Quando você estiver empunhando uma arma de acuidade na qual seja proficiente e outra criatura acertar você com um ataque corpo a corpo, você pode usar sua reação para adicionar seu bônus de proficiência à sua CA contra aquele ataque, potencialmente fazendo-o errar.'
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
      'Você é proficiente com armas improvisadas.',
      'Seus ataques desarmados causam 1d4 de dano de concussão.',
      'Ao atingir uma criatura com um ataque desarmado ou arma improvisada no seu turno, você pode usar uma ação bônus para tentar agarrar o alvo.'
    ],
    attributeBonus: { choice: ['strength', 'constitution'] }
  },
  {
    id: 'explorador-de-cavernas',
    name: 'Explorador de Cavernas',
    benefits: [
      'Você tem vantagem em testes de Sabedoria (Percepção) e Inteligência (Investigação) feitos para detectar a presença de portas secretas.',
      'Você tem vantagem em testes de resistência feitos para evitar ou resistir a armadilhas.',
      'Você tem resistência ao dano causado por armadilhas.',
      'Viajar em ritmo acelerado ou normal não impõe a penalidade de -5 à sua Percepção Passiva para perceber armadilhas.'
    ]
  },
  {
    id: 'imobilizador',
    name: 'Imobilizador',
    requirement: 'Força 13 ou maior',
    benefits: [
      'Você tem vantagem em jogadas de ataque contra qualquer criatura que você esteja agarrando.',
      'Você pode usar sua ação para tentar imobilizar uma criatura agarrada por você. Para fazer isso, faça outro teste de agarrar. Se for bem-sucedido, você e a criatura estarão ambos impedidos (restrained) até o término do agarre.'
    ]
  },
  {
    id: 'iniciado-em-magia',
    name: 'Iniciado em Magia',
    benefits: [
      'Escolha uma classe: Bardo, Bruxo, Clérigo, Druida, Feiticeiro ou Mago. Você aprende dois truques da lista dessa classe.',
      'Você aprende uma magia de 1º nível da lista da mesma classe e pode conjurá-la uma vez com o menor nível possível sem gastar espaço de magia. Você recupera a capacidade de conjurá-la dessa forma ao terminar um descanso longo.',
      'Sua habilidade de conjuração depende da classe escolhida: Carisma para Bardo, Bruxo ou Feiticeiro; Sabedoria para Clérigo ou Druida; Inteligência para Mago. Se possuir espaços de magia da classe correspondente, também pode utilizá-los para conjurar a magia aprendida.'
    ]
  },
  {
    id: 'investida-poderosa',
    name: 'Investida Poderosa',
    benefits: [
      'Quando você usar a ação de Disparada, você pode usar uma ação bônus para realizar um ataque corpo a corpo com arma ou empurrar uma criatura.',
      'Se você se mover ao menos 3 metros em linha reta imediatamente antes de realizar essa ação bônus, você ganha um bônus de +5 na rolagem de dano do ataque (se acertar) ou empurra o alvo até 3 metros de distância de você (se for bem-sucedido no empurrão).'
    ]
  },
  {
    id: 'lider-inspirador',
    name: 'Líder Inspirador',
    requirement: 'Carisma 13 ou maior',
    benefits: [
      'Você pode despender 10 minutos discursando para inspirar seus companheiros. Escolha até 6 criaturas amigáveis (incluindo você) a até 9 metros que possam ver ou ouvir você e compreendam sua linguagem.',
      'Cada criatura ganha pontos de vida temporários iguais ao seu nível + seu modificador de Carisma. Uma criatura não pode se beneficiar novamente deste talento até terminar um descanso curto ou longo.'
    ]
  },
  {
    id: 'maestria-em-arma-de-haste',
    name: 'Maestria em Arma de Haste',
    benefits: [
      'Ao realizar a ação de Ataque e atacar apenas com uma glaive, alabarda, bordão ou lança, você pode usar uma ação bônus para realizar um ataque corpo a corpo com a outra ponta da arma. Este ataque causa 1d4 de dano de concussão e usa o mesmo modificador de habilidade do ataque principal.',
      'Enquanto empunha uma glaive, alabarda, bordão, lança ou pique, criaturas hostis provocam um ataque de oportunidade seu quando entram no seu alcance.'
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
      'Quando uma criatura a até 1,5 metro de você conjurar uma magia, você pode usar sua reação para realizar um ataque corpo a corpo com arma contra ela.',
      'Quando você causa dano a uma criatura que está se concentrando em uma magia, ela tem desvantagem no teste de resistência para manter a concentração.',
      'Você tem vantagem em testes de resistência contra magias conjuradas por criaturas que estejam a até 1,5 metro de você.'
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
      'No seu turno, ao acertar um acerto crítico com uma arma corpo a corpo ou reduzir os pontos de vida de uma criatura a 0 com ela, você pode realizar um ataque corpo a corpo com arma como uma ação bônus.',
      'Antes de realizar um ataque corpo a corpo com uma arma pesada na qual seja proficiente, você pode escolher sofrer uma penalidade de -5 na jogada de ataque. Se o ataque acertar, você adiciona +10 ao dano da arma.'
    ]
  },
  {
    id: 'mestre-de-escudo',
    name: 'Mestre de Escudo',
    benefits: [
      'Se você realizar a ação de Ataque no seu turno, pode usar uma ação bônus para empurrar uma criatura a até 1,5 metro de você com seu escudo.',
      'Se você não estiver incapacitado, pode adicionar o bônus de CA do seu escudo a qualquer teste de resistência de Destreza que fizer contra uma magia ou outro efeito nocivo que tenha apenas você como alvo.',
      'Se for alvo de um efeito que permita realizar um teste de resistência de Destreza para sofrer apenas metade do dano, você pode usar sua reação para não sofrer dano algum caso passe no teste, interpondo seu escudo entre você e o efeito.'
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
      'Quando você acerta uma criatura com um ataque de oportunidade, o deslocamento dela se torna 0 pelo restante do turno.',
      'Criaturas provocam ataques de oportunidade de você mesmo se realizarem a ação Desengajar antes de sair do seu alcance.',
      'Quando uma criatura a até 1,5 metro de você realizar um ataque contra um alvo que não seja você (e o alvo não possua este talento), você pode usar sua reação para realizar um ataque corpo a corpo com arma contra a criatura atacante.'
    ]
  },
  {
    id: 'sorrateiro',
    name: 'Sorrateiro',
    requirement: 'Destreza 13 ou maior',
    benefits: [
      'Você pode tentar se esconder mesmo quando estiver apenas levemente obscurecido da criatura de quem você está se escondendo.',
      'Quando você estiver escondido de uma criatura e errar um ataque com arma à distância contra ela, o ataque não revela sua posição.',
      'Luz baixa (penumbra) não impõe desvantagem em seus testes de Sabedoria (Percepção) que dependam da visão.'
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
  },
  {
    id: 'dadiva-do-dragao-cromatico',
    name: 'Dádiva do Dragão Cromático (Gift of the Chromatic Dragon)',
    benefits: [
      'Infusão Cromática: Com uma ação bônus, toque uma arma simples ou marcial para infundir nela energia cromática. Por 1 minuto, a arma causa 1d4 de dano extra do tipo escolhido: ácido, frio, fogo, elétrico ou veneno (1x por descanso longo).',
      'Resistência Reativa: Ao sofrer dano de ácido, frio, fogo, elétrico ou veneno, use sua reação para ganhar resistência a esse tipo de dano contra esse ataque (número de vezes igual ao bônus de proficiência por descanso longo).'
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    id: 'dadiva-do-dragao-de-gema',
    name: 'Dádiva do Dragão de Gema (Gift of the Gem Dragon)',
    benefits: [
      'Aumente seu valor de Inteligência, Sabedoria ou Carisma em 1, até o máximo de 20.',
      'Retaliação Telecinética: Ao sofrer dano de uma criatura a até 3 metros, use sua reação para liberar energia mental. A criatura faz salvaguarda de Força (CD 8 + prof + modificador do atributo aumentado). Falhando, sofre 2d8 de dano de força e é empurrada 3 metros (número de vezes igual ao bônus de proficiência por descanso longo).'
    ],
    attributeBonus: { choice: ['intelligence', 'wisdom', 'charisma'] },
    source: "Fizban's Treasury of Dragons"
  },
  {
    id: 'dadiva-do-dragao-metalico',
    name: 'Dádiva do Dragão Metálico (Gift of the Metallic Dragon)',
    benefits: [
      'Cura Dracônica: Você aprende a magia Curar Ferimentos e pode conjurá-la 1x sem gastar espaço de magia por descanso longo. Também pode conjurá-la usando quaisquer espaços de magia que possua. O atributo de conjuração é Inteligência, Sabedoria ou Carisma (escolhido ao obter o talento).',
      'Asas Protetoras: Quando você ou uma criatura a até 1,5 metro de você for atingida por uma jogada de ataque, você pode usar sua reação para manifestar asas espectrais que adicionam seu bônus de proficiência à CA do alvo contra aquele ataque, potencialmente fazendo-o errar (usos iguais ao bônus de proficiência por descanso longo).'
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    id: 'ataque-dos-gigantes',
    name: 'Ataque dos Gigantes (Strike of the Giants)',
    requirement: 'Proficiência com Armas Marciais ou Antecedente Enjeitado dos Gigantes',
    benefits: [
      'Escolha um tipo de golpe ao obter este talento: Nuvem, Fogo, Gelo, Colina, Pedra ou Tempestade.',
      'Uma vez por turno, ao acertar uma criatura com um ataque com arma corpo a corpo ou arma arremessada, você aplica o benefício do golpe escolhido. Usos iguais ao bônus de proficiência por descanso longo; CD da salvaguarda é 8 + bônus de proficiência + mod de Força ou Constituição (à sua escolha):',
      '• Golpe da Nuvem: O ataque causa 1d4 de dano de trovão extra e o alvo deve passar em salvaguarda de Sabedoria ou você fica invisível para ele até o início do seu próximo turno.',
      '• Golpe do Fogo: O ataque causa 1d10 de dano de fogo extra.',
      '• Golpe do Gelo: O ataque causa 1d6 de dano de frio extra e o alvo deve passar em salvaguarda de Constituição ou seu deslocamento cai para 0 até o início do seu próximo turno.',
      '• Golpe da Colina: O ataque causa 1d6 de dano extra da arma e o alvo deve passar em salvaguarda de Força ou cairá no chão (caído).',
      '• Golpe da Pedra: O ataque causa 1d6 de dano de força extra e o alvo deve passar em salvaguarda de Força ou será empurrado 3 metros em linha reta.',
      '• Golpe da Tempestade: O ataque causa 1d6 de dano elétrico extra e o alvo deve passar em salvaguarda de Constituição ou terá desvantagem em todas as jogadas de ataque até o início do seu próximo turno.'
    ],
    source: 'Glory of the Giants'
  },
  {
    id: 'escultor-de-runas',
    name: 'Escultor de Runas (Rune Shaper)',
    requirement: 'Conjuração ou Antecedente Entalhador de Runas',
    benefits: [
      'Você escolhe Inteligência, Sabedoria ou Carisma como sua habilidade de conjuração para este talento.',
      'Você aprende a magia Compreender Idiomas e pode conjurá-la 1x sem gastar espaço de magia por descanso longo (ou usando seus próprios espaços).',
      'Gravação de Runas: Ao fim de um descanso longo, você inscreve um número de runas em objetos igual a metade do seu bônus de proficiência (arredondado para baixo, mínimo 1). Cada runa concede uma magia de 1º nível específica da tabela de Runas dos Gigantes, que você pode conjurar 1x sem espaço de magia e sem componentes materiais por descanso longo, ou usando seus espaços de magia normais.'
    ],
    source: 'Glory of the Giants'
  },
  {
    id: 'ardil-do-gigante-da-nuvem',
    name: 'Ardil do Gigante da Nuvem (Guile of the Cloud Giant)',
    requirement: 'Nível 4, talento Ataque dos Gigantes (Nuvem)',
    minLevel: 4,
    benefits: [
      'Aumente seu valor de Força, Constituição ou Carisma em 1, até o máximo de 20.',
      'Ardil da Nuvem: Ao ser atingido por um ataque, você pode usar sua reação para se envolver em névoa: você sofre apenas metade do dano do ataque e pode se teletransportar magicamente até 9 metros para um espaço desocupado visível. Você pode usar esta reação um número de vezes igual ao seu bônus de proficiência por descanso longo.'
    ],
    attributeBonus: { choice: ['strength', 'constitution', 'charisma'] },
    source: 'Glory of the Giants'
  },
  {
    id: 'brasa-do-gigante-do-fogo',
    name: 'Brasa do Gigante do Fogo (Ember of the Fire Giant)',
    requirement: 'Nível 4, talento Ataque dos Gigantes (Fogo)',
    minLevel: 4,
    benefits: [
      'Aumente seu valor de Força, Constituição ou Sabedoria em 1, até o máximo de 20.',
      'Você ganha resistência a dano de fogo.',
      'Ignição Ardente: Em vez de um dos seus ataques na ação de Ataque, você pode liberar uma explosão de chamas de 4,5 metros de raio centrada em você. Cada criatura à sua escolha na área deve fazer uma salvaguarda de Destreza (CD = 8 + prof + mod de For, Con ou Sab). Falhas sofrem 1d8 + bônus de proficiência de dano de fogo e ficam cegas até o início do seu próximo turno (metade do dano e sem cegueira em caso de sucesso). Usos iguais ao bônus de proficiência por descanso longo.'
    ],
    attributeBonus: { choice: ['strength', 'constitution', 'wisdom'] },
    source: 'Glory of the Giants'
  },
  {
    id: 'furia-do-gigante-do-gelo',
    name: 'Fúria do Gigante do Gelo (Fury of the Frost Giant)',
    requirement: 'Nível 4, talento Ataque dos Gigantes (Gelo)',
    minLevel: 4,
    benefits: [
      'Aumente seu valor de Força, Constituição ou Sabedoria em 1, até o máximo de 20.',
      'Você ganha resistência a dano de frio.',
      'Retaliação Gelada: Ao ser atingido por uma criatura a até 9 metros, você pode usar sua reação para liberar gelo primordial contra ela. O atacante deve fazer uma salvaguarda de Constituição (CD = 8 + prof + mod de For, Con ou Sab). Numa falha, sofre 1d8 + bônus de proficiência de dano de frio e seu deslocamento se torna 0 até o início do seu próximo turno. Usos iguais ao bônus de proficiência por descanso longo.'
    ],
    attributeBonus: { choice: ['strength', 'constitution', 'wisdom'] },
    source: 'Glory of the Giants'
  },
  {
    id: 'agudeza-do-gigante-da-pedra',
    name: 'Agudeza do Gigante da Pedra (Keenness of the Stone Giant)',
    requirement: 'Nível 4, talento Ataque dos Gigantes (Pedra)',
    minLevel: 4,
    benefits: [
      'Aumente seu valor de Força, Constituição ou Sabedoria em 1, até o máximo de 20.',
      'Você ganha visão no escuro com alcance de 18 metros (ou adiciona 18 metros ao seu alcance existente).',
      'Arremesso de Pedra: Com uma ação bônus, você conjura e arremessa magicamente uma pedra teleguiada contra uma criatura a até 18 metros. Faça um ataque mágico à distância; se acertar, causa 1d10 + mod de For, Con ou Sab de dano de força e o alvo deve passar em salvaguarda de Força ou cairá no chão (caído). Usos iguais ao bônus de proficiência por descanso longo.'
    ],
    attributeBonus: { choice: ['strength', 'constitution', 'wisdom'] },
    source: 'Glory of the Giants'
  },
  {
    id: 'alma-do-gigante-da-tempestade',
    name: 'Alma do Gigante da Tempestade (Soul of the Storm Giant)',
    requirement: 'Nível 4, talento Ataque dos Gigantes (Tempestade)',
    minLevel: 4,
    benefits: [
      'Aumente seu valor de Força, Sabedoria ou Carisma em 1, até o máximo de 20.',
      'Aura do Turbilhão: Com uma ação bônus, você manifesta uma tempestade mágica de 3 metros de raio ao seu redor até o início do seu próximo turno. Você ganha resistência a dano elétrico e de trovão, jogadas de ataque contra você têm desvantagem, e criaturas inimigas que começarem o turno na aura devem fazer uma salvaguarda de Força ou terão seu deslocamento reduzido pela metade. Usos iguais ao bônus de proficiência por descanso longo.'
    ],
    attributeBonus: { choice: ['strength', 'wisdom', 'charisma'] },
    source: 'Glory of the Giants'
  },
  {
    id: 'vigor-do-gigante-da-colina',
    name: 'Vigor do Gigante da Colina (Vigor of the Hill Giant)',
    requirement: 'Nível 4, talento Ataque dos Gigantes (Colina)',
    minLevel: 4,
    benefits: [
      'Aumente seu valor de Força, Constituição ou Sabedoria em 1, até o máximo de 20.',
      'Baluarte da Colina: Quando você for submetido a um efeito que o moveria pelo menos 1,5 metro ou o derrubaria no chão (caído), você pode usar sua reação para não ser movido e não ficar caído.',
      'Recuperação Glutona: Quando realizar um descanso curto e gastar pelo menos um Dado de Vida para recuperar pontos de vida consumindo comida e bebida, você recupera pontos de vida adicionais iguais ao seu modificador de Constituição + seu bônus de proficiência.'
    ],
    attributeBonus: { choice: ['strength', 'constitution', 'wisdom'] },
    source: 'Glory of the Giants'
  },
  {
    id: 'iniciado-em-artificio',
    name: 'Iniciado em Artifício (Artificer Initiate)',
    benefits: [
      'Você aprende um truque e uma magia de 1º nível da lista de magias do Artífice. Inteligência é o seu atributo de conjuração para essas magias.',
      'Você pode conjurar a magia de 1º nível escolhida uma vez sem gastar espaço de magia por descanso longo, ou usando seus próprios espaços de magia.',
      'Você ganha proficiência com um tipo de ferramenta de artesão à sua escolha e pode usar essa ferramenta como foco de conjuração para qualquer magia que você conjurar utilizando Inteligência.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'chef',
    name: 'Chef',
    benefits: [
      'Aumente seu valor de Constituição ou Sabedoria em 1, até o máximo de 20.',
      'Você ganha proficiência com utensílios de cozinheiro se ainda não a possuir.',
      'Ao fim de um descanso curto, você pode preparar uma refeição especial para até 4 + seu bônus de proficiência criaturas. Qualquer dessas criaturas que gastar um ou mais Dados de Vida para recuperar PV recupera 1d8 pontos de vida adicionais.',
      'Com 1 hora de trabalho ou ao terminar um descanso longo, você pode preparar guloseimas em número igual ao seu bônus de proficiência que duram 8 horas. Uma criatura pode usar uma ação bônus para comer uma guloseima e ganhar pontos de vida temporários iguais ao seu bônus de proficiência.'
    ],
    attributeBonus: { choice: ['constitution', 'wisdom'] },
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'esmagador',
    name: 'Esmagador (Crusher)',
    benefits: [
      'Aumente seu valor de Força ou Constituição em 1, até o máximo de 20.',
      'Uma vez por turno, ao acertar uma criatura com um ataque que cause dano de concussão, você pode movê-la 1,5 metro para um espaço desocupado, desde que o tamanho dela não seja mais de uma categoria maior que o seu.',
      'Quando você acerta um acerto crítico que cause dano de concussão a uma criatura, todas as jogadas de ataque contra essa criatura têm vantagem até o início do seu próximo turno.'
    ],
    attributeBonus: { choice: ['strength', 'constitution'] },
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'adepto-mistico',
    name: 'Adepto Místico (Eldritch Adept)',
    requirement: 'Capacidade de conjurar magias',
    benefits: [
      'Você aprende uma Invocação Mística (Eldritch Invocation) à sua escolha da classe Bruxo. Se a invocação possuir qualquer pré-requisito, você só poderá escolhê-la se pertencer à classe Bruxo e atender aos pré-requisitos exigidos.',
      'Sempre que você subir de nível, você pode substituir essa invocação por outra invocação mística de Bruxo para a qual você se qualifique.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'tocado-pelas-fadas',
    name: 'Tocado pelas Fadas (Fey Touched)',
    benefits: [
      'Aumente seu valor de Inteligência, Sabedoria ou Carisma em 1, até o máximo de 20.',
      'Você aprende a magia Passo Nebuloso (Misty Step) e uma magia de 1º nível de sua escolha das escolas de Adivinhação ou Encantamento.',
      'Você pode conjurar cada uma dessas magias uma vez sem gastar espaço de magia por descanso longo. Você também pode conjurá-las usando quaisquer espaços de magia que possua. O atributo de conjuração é a habilidade aumentada por este talento.'
    ],
    attributeBonus: { choice: ['intelligence', 'wisdom', 'charisma'] },
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'iniciado-em-combate',
    name: 'Iniciado em Combate (Fighting Initiate)',
    requirement: 'Proficiência com pelo menos uma Arma Marcial',
    benefits: [
      'Você aprende uma opção de Estilo de Luta (Fighting Style) à sua escolha da classe Guerreiro.',
      'Sempre que você alcançar um nível que conceda o benefício de Incremento no Valor de Habilidade (níveis 4, 8, 12, etc.), você pode substituir esse estilo por outro estilo de luta do Guerreiro.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'artilheiro',
    name: 'Artilheiro (Gunner)',
    benefits: [
      'Aumente seu valor de Destreza em 1, até o máximo de 20.',
      'Você ganha proficiência com armas de fogo.',
      'Você ignora a propriedade de recarga (loading) de armas de fogo.',
      'Estar a até 1,5 metro de uma criatura hostil não impõe desvantagem em suas jogadas de ataque à distância.'
    ],
    attributeBonus: { dexterity: 1 },
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'adepto-de-metamagia',
    name: 'Adepto de Metamagia (Metamagic Adept)',
    requirement: 'Capacidade de conjurar magias',
    benefits: [
      'Você aprende duas opções de Metamagia à sua escolha da classe Feiticeiro.',
      'Você ganha 2 pontos de feitiçaria para gastar em opções de Metamagia (recuperados ao terminar um descanso longo). Se já possuir pontos de feitiçaria, esses pontos somam-se ao seu total, mas não podem ser transformados em espaços de magia.',
      'Sempre que você alcançar um nível que conceda o benefício de Incremento no Valor de Habilidade, você pode substituir uma opção de Metamagia aprendida por outra opção de Feiticeiro.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'perfurador',
    name: 'Perfurador (Piercer)',
    benefits: [
      'Aumente seu valor de Força ou Destreza em 1, até o máximo de 20.',
      'Uma vez por turno, ao acertar uma criatura com um ataque que cause dano perfurante, você pode rolar novamente um dos dados de dano da arma e usar o novo resultado.',
      'Quando você acerta um acerto crítico que cause dano perfurante a uma criatura, você rola um dado de dano adicional da arma ao determinar o dano extra do acerto crítico.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity'] },
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'envenenador',
    name: 'Envenenador (Poisoner)',
    benefits: [
      'Você ganha proficiência com o kit de envenenador caso ainda não a possua.',
      'Suas jogadas de ataque com armas ignoram resistência a dano de veneno.',
      'Com uma ação bônus, você pode aplicar veneno a uma arma ou munição (dura 1 minuto ou até acertar).',
      'Com 1 hora de trabalho e 50 po em materiais utilizando um kit de envenenador, você cria um número de doses de veneno potente igual ao seu bônus de proficiência. Uma criatura atingida deve passar em salvaguarda de Constituição CD 14 ou sofrerá 2d8 de dano de veneno e ficará envenenada até o final do seu próximo turno.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'tocado-pelas-sombras',
    name: 'Tocado pelas Sombras (Shadow Touched)',
    benefits: [
      'Aumente seu valor de Inteligência, Sabedoria ou Carisma em 1, até o máximo de 20.',
      'Você aprende a magia Invisibilidade e uma magia de 1º nível de sua escolha das escolas de Ilusão ou Necromancia.',
      'Você pode conjurar cada uma dessas magias uma vez sem gastar espaço de magia por descanso longo. Você também pode conjurá-las usando quaisquer espaços de magia que possua. O atributo de conjuração é a habilidade aumentada por este talento.'
    ],
    attributeBonus: { choice: ['intelligence', 'wisdom', 'charisma'] },
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'especialista-em-pericia',
    name: 'Especialista em Perícia (Skill Expert)',
    benefits: [
      'Aumente um valor de habilidade à sua escolha em 1, até o máximo de 20.',
      'Você ganha proficiência em uma perícia à sua escolha.',
      'Você ganha Especialização (Expertise) em uma perícia na qual seja proficiente, dobrando o seu bônus de proficiência para qualquer teste de habilidade que utilize essa perícia.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] },
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'cortador',
    name: 'Cortador (Slasher)',
    benefits: [
      'Aumente seu valor de Força ou Destreza em 1, até o máximo de 20.',
      'Uma vez por turno, ao acertar uma criatura com um ataque que cause dano cortante, você pode reduzir o deslocamento da criatura em 3 metros até o início do seu próximo turno.',
      'Quando você acerta um acerto crítico que cause dano cortante a uma criatura, você a fere gravemente: ela tem desvantagem em todas as jogadas de ataque até o início do seu próximo turno.'
    ],
    attributeBonus: { choice: ['strength', 'dexterity'] },
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'telecinetico',
    name: 'Telecinético (Telekinetic)',
    benefits: [
      'Aumente seu valor de Inteligência, Sabedoria ou Carisma em 1, até o máximo de 20.',
      'Você aprende o truque Mãos Mágicas. Você pode conjurá-lo sem componentes verbais ou somáticos, a mão espectral é invisível e seu alcance é aumentado em 9 metros se você já conhecer o truque.',
      'Com uma ação bônus, você pode tentar empurrar telepaticamente uma criatura a até 9 metros de você. O alvo deve ser bem-sucedido em uma salvaguarda de Força (CD = 8 + seu bônus de proficiência + modificador da habilidade aumentada) ou será movido 1,5 metro em sua direção ou para longe de você. Uma criatura pode escolher falhar voluntariamente nessa salvaguarda.'
    ],
    attributeBonus: { choice: ['intelligence', 'wisdom', 'charisma'] },
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'telepata',
    name: 'Telepata (Telepathic)',
    benefits: [
      'Aumente seu valor de Inteligência, Sabedoria ou Carisma em 1, até o máximo de 20.',
      'Você pode falar telepaticamente com qualquer criatura que possa ver a até 18 metros de você. A criatura não precisa compartilhar um idioma com você, mas precisa ser capaz de compreender ao menos um idioma.',
      'Você aprende a magia Detectar Pensamentos e pode conjurá-la uma vez sem gastar espaço de magia por descanso longo (usando o atributo aumentado). Você também pode conjurá-la usando quaisquer espaços de magia que possua.'
    ],
    attributeBonus: { choice: ['intelligence', 'wisdom', 'charisma'] },
    source: "Tasha's Cauldron of Everything"
  }
];
