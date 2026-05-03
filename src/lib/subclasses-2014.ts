import { ClassFeature } from './classes';

export const SUBCLASSES_2014: Record<string, Record<string, { name: string, features: Record<number, (string | ClassFeature)[]> }>> = {
  'ranger_2014': {
    'rastreador_subterraneo': {
      name: 'Rastreador Subterrâneo',
      features: {
        3: [
          { name: 'Batedor do Subterrâneo', description: 'No seu primeiro turno de combate, seu deslocamento aumenta em 3m e você pode realizar um ataque adicional se usar a ação de Ataque.' },
          { name: 'Especialista em Emboscada', description: 'Criaturas com visão no escuro não ganham benefícios para detectar você na escuridão.' },
          { name: 'Magia do Rastreador Subterrâneo', description: 'Você ganha visão no escuro (27m) e magias adicionais: Disfarçar-se (3º), Truque de Corda (5º), Glifo de Vigilância (9º), Invisibilidade Maior (13º) e Similaridade (17º).' }
        ],
        5: ['Ataque Extra'],
        7: [{ name: 'Mente de Aço', description: 'Você ganha proficiência em testes de resistência de Sabedoria.' }],
        11: [{ name: 'Rajada do Rastreador', description: 'Uma vez por turno, se você errar um ataque, pode realizar outro ataque imediatamente.' }],
        15: [{ name: 'Esquiva do Rastreador', description: 'Como reação, você pode impor desvantagem em um ataque contra você (se o atacante não tiver vantagem).' }]
      }
    },
    'cacador': {
      name: 'Caçador',
      features: {
        3: ['Presa do Caçador (Assassino de Colossos, Matador de Gigantes ou Destruidor de Hordas)'],
        5: ['Ataque Extra'],
        7: ['Táticas Defensivas (Escapar da Horda, Defesa Contra Múltiplos Ataques ou Vontade de Aço)'],
        11: ['Ataque Múltiplo (Saraivada ou Ataque Giratório)'],
        15: ['Defesa de Caçador Superior (Evasão, Manter-se Contra a Maré ou Esquiva Sobrenatural)']
      }
    },
    'besta': {
      name: 'Conclave da Besta',
      features: {
        3: ['Companheiro Animal', 'Vínculo com o Companheiro'],
        5: ['Ataque Coordenado'],
        7: ['Defesa da Besta'],
        11: ['Tempestade de Garras e Presas'],
        15: ['Defesa da Besta Superior']
      }
    }
  },
  'fighter_2014': {
    'campeao': {
      name: 'Campeão',
      features: {
        3: [{ name: 'Crítico Aprimorado', description: 'Seus ataques com armas adquirem uma margem de acerto crítico de 19 a 20.' }],
        7: [{ name: 'Atletismo Extraordinário', description: 'Adiciona metade da proficiência em testes de Força, Destreza ou Constituição que não possuam proficiência. Salto aumenta em 0,3x Mod. For.' }],
        10: [{ name: 'Estilo de Luta Adicional', description: 'Você pode escolher um segundo Estilo de Combate.' }],
        15: [{ name: 'Crítico Superior', description: 'Seus ataques com armas adquirem uma margem de acerto crítico de 18 a 20.' }],
        18: [{ name: 'Sobrevivente', description: 'No começo de cada turno, recupera 5 + Mod. Con PV se estiver com menos de metade da vida.' }]
      }
    },
    'mestre_de_batalha': {
      name: 'Mestre de Batalha',
      features: {
        3: [
          { name: 'Superioridade em Combate', description: 'Você aprende 3 manobras e ganha 4 dados de superioridade (d8).' },
          { name: 'Estudioso da Guerra', description: 'Ganhe proficiência com um tipo de ferramenta de artesão.' }
        ],
        7: [
          { name: 'Conheça seu Inimigo', description: 'Ao observar uma criatura por 1 min, descobre se ela é superior/igual/inferior em certos atributos.' },
          { name: 'Superioridade em Combate (Adicional)', description: 'Aprende 2 novas manobras e ganha mais 1 dado de superioridade.' }
        ],
        10: [{ name: 'Superioridade em Combate Aprimorada', description: 'Seus dados de superioridade se tornam d10s. Aprende 2 novas manobras.' }],
        15: [
          { name: 'Implacável', description: 'Se rolar iniciativa sem dados de superioridade, recupera um.' },
          { name: 'Superioridade em Combate (Adicional)', description: 'Aprende 2 novas manobras e ganha mais 1 dado de superioridade.' }
        ],
        18: [{ name: 'Superioridade em Combate Superior', description: 'Seus dados de superioridade se tornam d12s.' }]
      }
    },
    'cavaleiro_arcano': {
      name: 'Cavaleiro Arcano',
      features: {
        3: [
          { name: 'Conjuração', description: 'Você pode conjurar magias de mago (Abjuração/Evocação). Usa Inteligência.' },
          { name: 'Vínculo com Arma', description: 'Cria um elo com até 2 armas, podendo invocá-las com ação bônus.' }
        ],
        7: [{ name: 'Magia de Guerra', description: 'Ao usar ação para conjurar um truque, pode fazer um ataque com arma como ação bônus.' }],
        10: [{ name: 'Golpe Místico', description: 'Ao atingir uma criatura, ela tem desvantagem no próximo teste de resistência contra suas magias.' }],
        15: [{ name: 'Investida Arcana', description: 'Ao usar Surto de Ação, pode se teletransportar até 9 metros.' }],
        18: [{ name: 'Magia de Guerra Aprimorada', description: 'Ao usar ação para conjurar uma magia, pode fazer um ataque com arma como ação bônus.' }]
      }
    }
  },
  'sorcerer_2014': {
    'linhagem_draconica': {
      name: 'Linhagem Dracônica',
      features: {
        1: [
          { name: 'Ancestral Dracônico', description: 'Você escolhe um tipo de dragão. Ganha proficiência em Dracônico e bônus em testes de Carisma com dragões.' },
          { name: 'Resiliência Dracônica', description: 'Seu máximo de PV aumenta em 1 por nível. Sem armadura, sua CA é 13 + Mod. Des.' }
        ],
        6: [{ name: 'Afinidade Elemental', description: 'Adicione Mod. Carisma ao dano do seu tipo elemental. Pode gastar 1 ponto de feitiçaria para ganhar resistência ao tipo.' }],
        14: [{ name: 'Asas de Dragão', description: 'Você pode criar asas de dragão e ganhar deslocamento de voo igual ao seu deslocamento.' }],
        18: [{ name: 'Presença Dracônica', description: 'Gasta 5 pontos de feitiçaria para exalar uma aura de medo ou admiração (18 metros).' }]
      }
    },
    'magia_selvagem': {
      name: 'Magia Selvagem',
      features: {
        1: [
          { name: 'Surto de Magia Selvagem', description: 'Após conjurar magia de 1º nível ou mais, o mestre pode pedir um d20. Se rolar 1, ocorre um efeito aleatório.' },
          { name: 'Marés de Caos', description: 'Ganha vantagem em um ataque, teste ou salvaguarda. Recupera após descanso longo ou Surto de Magia Selvagem.' }
        ],
        6: [{ name: 'Dobrar a Sorte', description: 'Usa reação e 2 pontos de feitiçaria para aplicar 1d4 como bônus ou penalidade em uma jogada de outra criatura.' }],
        14: [{ name: 'Caos Controlado', description: 'Rola duas vezes na tabela de Surto de Magia Selvagem e escolhe qualquer resultado.' }],
        18: [{ name: 'Bombardeio de Magia', description: 'Se rolar o dano máximo em um dado de magia, pode rolar esse dado novamente e somar ao total.' }]
      }
    }
  },
  'barbarian_2014': {
    'furioso': {
      name: 'Caminho do Furioso',
      features: {
        3: [{ name: 'Frenesi', description: 'Pode realizar um ataque corpo-a-corpo adicional como ação bônus em fúria. Ganha 1 nível de exaustão ao terminar.' }],
        6: [{ name: 'Fúria Inconsciente', description: 'Não pode ser enfeitiçado ou amedrontado enquanto estiver em fúria.' }],
        10: [{ name: 'Presença Intimidante', description: 'Usa sua ação para amedrontar uma criatura a até 9 metros.' }],
        14: [{ name: 'Retaliação', description: 'Usa sua reação para atacar quem lhe causar dano a até 1,5m.' }]
      }
    },
    'guerreiro_totemico': {
      name: 'Caminho do Guerreiro Totêmico',
      features: {
        3: [
          { name: 'Conselheiro Espiritual', description: 'Pode conjurar Sentido Bestial e Falar com Animais como rituais.' },
          { name: 'Totem Espiritual', description: 'Escolha um espírito (Urso: resistência a quase tudo; Águia: vantagem contra ataques de oportunidade e Disparada como bônus; Lobo: vantagem para aliados).' }
        ],
        6: [{ name: 'Aspecto da Besta', description: 'Ganhe um benefício místico (Urso: dobro de carga; Águia: visão de 1,6km; Lobo: rastreador nato).' }],
        10: [{ name: 'Andarilho Espiritual', description: 'Pode conjurar Comunhão com a Natureza como ritual.' }],
        14: [{ name: 'Sintonia Totêmica', description: 'Benefício mágico final (Urso: desvantagem para inimigos atacarem outros; Águia: voo temporário; Lobo: derruba inimigos como bônus).' }]
      }
    }
  },
  'bard_2014': {
    'conhecimento': {
      name: 'Colégio do Conhecimento',
      features: {
        3: [
          { name: 'Proficiência Adicional', description: 'Ganha proficiência em três perícias à sua escolha.' },
          { name: 'Palavras de Interrupção', description: 'Usa inspiração como reação para subtrair do ataque, teste ou dano de um inimigo.' }
        ],
        6: [{ name: 'Segredos Mágicos Adicionais', description: 'Aprende duas magias de qualquer classe (não contam no limite).' }],
        14: [{ name: 'Perícia Inigualável', description: 'Adiciona dado de inspiração ao seu próprio teste de perícia.' }]
      }
    },
    'bravura': {
      name: 'Colégio da Bravura',
      features: {
        3: [
          { name: 'Proficiência Adicional', description: 'Proficiência com armaduras médias, escudos e armas marciais.' },
          { name: 'Inspiração em Combate', description: 'Aliados podem usar inspiração para aumentar o dano ou a CA como reação.' }
        ],
        6: ['Ataque Extra'],
        14: [{ name: 'Magia de Batalha', description: 'Ao conjurar uma magia, pode realizar um ataque com arma como ação bônus.' }]
      }
    }
  },
  'warlock_2014': {
    'arquifada': {
      name: 'A Arquifada',
      features: {
        1: [{ name: 'Presença Feérica', description: 'Ação para enfeitiçar ou amedrontar criaturas em um cubo de 3m.' }],
        6: [{ name: 'Névoa de Fuga', description: 'Ao sofrer dano, fica invisível e se teletransporta 18m como reação.' }],
        10: [{ name: 'Defesa Sedutora', description: 'Imune a ser enfeitiçado. Pode refletir tentativas de encanto.' }],
        14: [{ name: 'Delírio Sombrio', description: 'Mergulha uma criatura em um reino ilusório por 1 minuto.' }]
      }
    },
    'corruptor': {
      name: 'O Corruptor',
      features: {
        1: [{ name: 'Bênção do Obscuro', description: 'Ao reduzir inimigo a 0 PV, ganha PV temporários (Mod. Car + Nível Bruxo).' }],
        6: [{ name: 'Sorte do Próprio Obscuro', description: 'Adiciona 1d10 a um teste ou salvaguarda.' }],
        10: [{ name: 'Resistência Demoníaca', description: 'Escolha um tipo de dano para ter resistência após descanso curto/longo.' }],
        14: [{ name: 'Lançar no Inferno', description: 'Ao atingir criatura, transporta-a para planos inferiores (10d10 dano psíquico).' }]
      }
    },
    'grande_antigo': {
      name: 'O Grande Antigo',
      features: {
        1: [{ name: 'Despertar a Mente', description: 'Comunica-se telepaticamente a até 18 metros.' }],
        6: [{ name: 'Proteção Entrópica', description: 'Impõe desvantagem em ataque contra você e ganha vantagem no seu próximo ataque.' }],
        10: [{ name: 'Escudo de Pensamentos', description: 'Resistência a dano psíquico e mente protegida contra leitura.' }],
        14: [{ name: 'Criar Lacaio', description: 'Infecta a mente de um humanoide incapacitado, tornando-o seu lacaio enfeitiçado.' }]
      }
    }
  },
  'cleric_2014': {
    'conhecimento': {
      name: 'Domínio do Conhecimento',
      features: {
        1: [
          { name: 'Bênçãos do Conhecimento', description: 'Aprende dois idiomas e ganha proficiência em duas perícias (Arcanismo, História, Natureza ou Religião) com bônus dobrado.' },
          { name: 'Magias: Comando, Identificação', description: 'Sempre preparadas.' }
        ],
        2: [{ name: 'Canalizar Divindade: Conhecimento das Eras', description: 'Ganha proficiência em uma perícia ou ferramenta por 10 minutos.' }],
        3: [{ name: 'Magias: Augúrio, Sugestão', description: 'Sempre preparadas.' }],
        5: [{ name: 'Magias: Dificultar Detecção, Falar com os Mortos', description: 'Sempre preparadas.' }],
        6: [{ name: 'Canalizar Divindade: Ler Pensamentos', description: 'Pode ler pensamentos superficiais e conjurar Sugestão sem gastar espaço.' }],
        7: [{ name: 'Magias: Olho Arcano, Confusão', description: 'Sempre preparadas.' }],
        8: [{ name: 'Conjuração Poderosa', description: 'Adiciona Mod. Sabedoria ao dano de truques de clérigo.' }],
        9: [{ name: 'Magias: Conhecimento Lendário, Vidência', description: 'Sempre preparadas.' }],
        17: [{ name: 'Visões do Passado', description: 'Pode ver eventos recentes relacionados a um objeto ou local.' }]
      }
    },
    'enganacao': {
      name: 'Domínio da Enganação',
      features: {
        1: [
          { name: 'Bênção do Trapaceiro', description: 'Concede vantagem em testes de Furtividade para outra criatura por 1 hora.' },
          { name: 'Magias: Enfeitiçar Pessoa, Disfarçar-se', description: 'Sempre preparadas.' }
        ],
        2: [{ name: 'Canalizar Divindade: Invocar Duplicidade', description: 'Cria uma ilusão perfeita de si mesmo para conjurar magias e distrair inimigos.' }],
        3: [{ name: 'Magias: Reflexos, Passos sem Pegadas', description: 'Sempre preparadas.' }],
        5: [{ name: 'Magias: Piscar, Dissipar Magia', description: 'Sempre preparadas.' }],
        6: [{ name: 'Canalizar Divindade: Manto de Sombras', description: 'Torna-se invisível até o final do próximo turno.' }],
        7: [{ name: 'Magias: Porta Dimensional, Metamorfose', description: 'Sempre preparadas.' }],
        8: [{ name: 'Golpe Divino (Veneno)', description: 'Ataques com arma causam 1d8 extra de veneno (2d8 no nível 14).' }],
        9: [{ name: 'Magias: Dominar Pessoa, Modificar Memória', description: 'Sempre preparadas.' }],
        17: [{ name: 'Duplicidade Aprimorada', description: 'Pode criar até quatro duplicatas simultâneas.' }]
      }
    },
    'guerra': {
      name: 'Domínio da Guerra',
      features: {
        1: [
          { name: 'Proficiência Adicional', description: 'Proficiência em armas marciais e armaduras pesadas.' },
          { name: 'Sacerdote da Guerra', description: 'Pode realizar um ataque com arma como ação bônus (Mod. Sab/dia).' },
          { name: 'Magias: Auxílio Divino, Escudo da Fé', description: 'Sempre preparadas.' }
        ],
        2: [{ name: 'Canalizar Divindade: Ataque Dirigido', description: 'Bônus de +10 em uma jogada de ataque.' }],
        3: [{ name: 'Magias: Arma Mágica, Arma Espiritual', description: 'Sempre preparadas.' }],
        5: [{ name: 'Magias: Manto do Cruzado, Espíritos Guardiões', description: 'Sempre preparadas.' }],
        6: [{ name: 'Canalizar Divindade: Bênção do Deus da Guerra', description: 'Concede +10 no ataque de um aliado a até 9 metros.' }],
        7: [{ name: 'Magias: Movimentação Livre, Pele de Pedra', description: 'Sempre preparadas.' }],
        8: [{ name: 'Golpe Divino (Mesmo tipo)', description: 'Ataques com arma causam 1d8 extra do mesmo tipo da arma (2d8 no nível 14).' }],
        9: [{ name: 'Magias: Coluna de Chamas, Imobilizar Monstro', description: 'Sempre preparadas.' }],
        17: [{ name: 'Avatar da Batalha', description: 'Resistência a dano físico de ataques não mágicos.' }]
      }
    },
    'luz': {
      name: 'Domínio da Luz',
      features: {
        1: [
          { name: 'Truque Adicional', description: 'Ganha o truque Luz.' },
          { name: 'Labareda Protetora', description: 'Impõe desvantagem em um ataque contra você (Mod. Sab/dia).' },
          { name: 'Magias: Mãos Flamejantes, Fogo das Fadas', description: 'Sempre preparadas.' }
        ],
        2: [{ name: 'Canalizar Divindade: Radiação do Amanhecer', description: 'Dissipa escuridão mágica e causa dano radiante em área.' }],
        3: [{ name: 'Magias: Esfera Flamejante, Raio Ardente', description: 'Sempre preparadas.' }],
        5: [{ name: 'Magias: Luz do Dia, Bola de fogo', description: 'Sempre preparadas.' }],
        6: [{ name: 'Labareda Aprimorada', description: 'Pode usar Labareda Protetora para proteger aliados.' }],
        7: [{ name: 'Magias: Guardião da Fé, Muralha de Fogo', description: 'Sempre preparadas.' }],
        8: [{ name: 'Conjuração Poderosa', description: 'Adiciona Mod. Sabedoria ao dano de truques de clérigo.' }],
        9: [{ name: 'Magias: Coluna de Chamas, Vidência', description: 'Sempre preparadas.' }],
        17: [{ name: 'Coroa de Luz', description: 'Emite aura de luz que impõe desvantagem em salvaguardas contra fogo/radiante.' }]
      }
    },
    'natureza': {
      name: 'Domínio da Natureza',
      features: {
        1: [
          { name: 'Acólito da Natureza', description: 'Aprende um truque de druida e ganha proficiência em Adestrar Animais, Natureza ou Sobrevivência.' },
          { name: 'Proficiência Adicional', description: 'Proficiência com armaduras pesadas.' },
          { name: 'Magias: Amizade Animal, Falar com Animais', description: 'Sempre preparadas.' }
        ],
        2: [{ name: 'Canalizar Divindade: Enfeitiçar Animais e Plantas', description: 'Enfeitiça bestas e plantas em um raio de 9 metros.' }],
        3: [{ name: 'Magias: Pele de Árvore, Crescer Espinhos', description: 'Sempre preparadas.' }],
        5: [{ name: 'Magias: Ampliar Plantas, Muralha de Vento', description: 'Sempre preparadas.' }],
        6: [{ name: 'Amortecer Elementos', description: 'Concede resistência a dano elemental como reação.' }],
        7: [{ name: 'Magias: Dominar Besta, Vinha Esmagadora', description: 'Sempre preparadas.' }],
        8: [{ name: 'Golpe Divino (Elemental)', description: 'Ataques com arma causam 1d8 extra de frio, fogo ou elétrico (2d8 no nível 14).' }],
        9: [{ name: 'Magias: Praga de Insetos, Caminhar em Árvores', description: 'Sempre preparadas.' }],
        17: [{ name: 'Senhor da Natureza', description: 'Pode comandar criaturas enfeitiçadas como ação bônus.' }]
      }
    },
    'tempestade': {
      name: 'Domínio da Tempestade',
      features: {
        1: [
          { name: 'Proficiência Adicional', description: 'Proficiência em armas marciais e armaduras pesadas.' },
          { name: 'Ira da Tormenta', description: 'Reage a ataques causando 2d8 dano elétrico ou trovão (Mod. Sab/dia).' },
          { name: 'Magias: Névoa Obscurecente, Onda Trovejante', description: 'Sempre preparadas.' }
        ],
        2: [{ name: 'Canalizar Divindade: Ira Destruidora', description: 'Causa dano máximo ao rolar dano elétrico ou trovejante.' }],
        3: [{ name: 'Magias: Lufada de Vento, Despedaçar', description: 'Sempre preparadas.' }],
        5: [{ name: 'Magias: Convocar Relâmpagos, Nevasca', description: 'Sempre preparadas.' }],
        6: [{ name: 'Golpe de Relâmpago', description: 'Empurra criaturas até 3m ao causar dano elétrico.' }],
        7: [{ name: 'Magias: Controlar a Água, Tempestade de Gelo', description: 'Sempre preparadas.' }],
        8: [{ name: 'Golpe Divino (Trovão)', description: 'Ataques com arma causam 1d8 extra trovejante (2d8 no nível 14).' }],
        9: [{ name: 'Magias: Onda Destrutiva, Praga de Insetos', description: 'Sempre preparadas.' }],
        17: [{ name: 'Filho da Tormenta', description: 'Ganha deslocamento de voo em locais abertos.' }]
      }
    },
    'vida': {
      name: 'Domínio da Vida',
      features: {
        1: [
          { name: 'Proficiência Adicional', description: 'Proficiência com armaduras pesadas.' },
          { name: 'Discípulo da Vida', description: 'Magias de cura recuperam 2 + nível da magia em PV adicionais.' },
          { name: 'Magias: Bênção, Curar Ferimentos', description: 'Sempre preparadas.' }
        ],
        2: [{ name: 'Canalizar Divindade: Preservar a Vida', description: 'Cura feridos (até metade do máximo) em uma reserva de 5x nível de clérigo.' }],
        3: [{ name: 'Magias: Restauração Menor, Arma Espiritual', description: 'Sempre preparadas.' }],
        5: [{ name: 'Magias: Sinal de Esperança, Revivificar', description: 'Sempre preparadas.' }],
        6: [{ name: 'Curandeiro Abençoado', description: 'Ao curar outros, você também recupera 2 + nível da magia em PV.' }],
        7: [{ name: 'Magias: Proteção contra a Morte, Guardião da Fé', description: 'Sempre preparadas.' }],
        8: [{ name: 'Golpe Divino (Radiante)', description: 'Ataques com arma causam 1d8 extra radiante (2d8 no nível 14).' }],
        9: [{ name: 'Magias: Curar Ferimentos em Massa, Reviver os Mortos', description: 'Sempre preparadas.' }],
        17: [{ name: 'Cura Suprema', description: 'Usa o maior resultado possível nos dados de cura.' }]
      }
    }
  }
};
