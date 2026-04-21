export interface SubclassFeature {
  name: string;
  description: string;
}

export type SubclassData = Record<number, SubclassFeature[]>;

export interface ClassSubclasses {
  [subclassName: string]: {
    features: SubclassData;
    spells?: string[]; // For domains, circles, etc.
  };
}

export const SUBCLASSES_2024: Record<string, ClassSubclasses> = {
  'Bárbaro': {
    "Caminho do Berserker": {
      features: {
        3: [{ name: "Fúria Frenética", description: "Quando usa Ataque Descuidado durante Fúria, o primeiro alvo atingido no turno sofre dano extra = Xd6, onde X é seu bônus de dano de Fúria. Sem Exaustão." }],
        6: [{ name: "Fúria Destemida", description: "Imunidade às condições Enfeitiçado e Assustado enquanto sua Fúria estiver ativa." }],
        10: [{ name: "Retaliação", description: "Quando sofre dano de uma criatura a até 1,5 metros, pode usar sua Reação para realizar um ataque corpo a corpo contra ela." }],
        14: [{ name: "Presença Intimidante", description: "Ação Bônus: criaturas à sua escolha em 9 metros fazem salvaguarda de SAB ou ficam Assustadas por 1 minuto. 1x/descanso longo (ou gaste um uso de Fúria para recuperar)." }]
      }
    },
    "Caminho do Coração Selvagem": {
      features: {
        3: [
          { name: "Falante de Animais", description: "Pode lançar Sentido Bestial e Falar com Animais como Ritual (SAB é o atributo de conjuração)." },
          { name: "Fúria das Selvas", description: "Ao ativar Fúria, escolhe UMA das opções: Urso (Resistência geral), Águia (Desengajar+Disparar), Lobo (Vantagem para aliados)." }
        ],
        6: [{ name: "Aspecto das Selvas", description: "Ganha uma habilidade passiva (troca a cada descanso longo): Coruja (Visão no Escuro), Pantera (Escalar), Salmão (Nadar)." }],
        10: [{ name: "Falante da Natureza", description: "Pode lançar Comungar com a Natureza como Ritual." }],
        14: [{ name: "Poder das Selvas", description: "Ao ativar Fúria, escolhe uma opção adicional: Falcão (Voo), Leão (Desvantagem para inimigos), Carneiro (+dano em empurrão)." }]
      }
    },
    "Caminho da Árvore do Mundo": {
      features: {
        3: [{ name: "Vitalidade da Árvore", description: "O bônus de dano de Fúria aumenta. Ao entrar em Fúria, ganha PV Temporário. Pode conceder 2d6 PV Temporário a um aliado." }],
        6: [{ name: "Ramos da Árvore", description: "Como uma Reação à sua escolha, você pode teleportar criaturas que falharem em uma salvaguarda para espaços próximos." }],
        10: [{ name: "Raízes Abaladoras", description: "Armas pesadas/versáteis ganham alcance extra e opções de Maestria de Arma (Empurrar e Derrubar)." }],
        14: [{ name: "Viagem pela Árvore", description: "Teleporta-se por grandes distâncias através da Árvore do Mundo, levando aliados consigo." }]
      }
    },
    "Caminho do Zelote": {
      features: {
        3: [
          { name: "Fúria Divina", description: "Enquanto em Fúria, o primeiro alvo que você atingir em cada um de seus turnos sofre dano extra (Radiante ou Necrótico)." },
          { name: "Guerreiro dos Deuses", description: "Você pode ser ressuscitado sem custo de componentes materiais. Recebe cura extra via dados d12." }
        ],
        6: [{ name: "Foco Fanático", description: "Se falhar em uma salvaguarda enquanto em Fúria, você pode rolar o dado novamente." }],
        10: [{ name: "Presença Zelosa", description: "Ação Bônus: você solta um grito de guerra, concedendo vantagem em ataques e salvaguardas para aliados até o início do seu próximo turno." }],
        14: [{ name: "Fúria dos Deuses", description: "Mesmo em 0 PV, você não morre até a Fúria terminar, ganhando voo e resistência." }]
      }
    }
  },
  'Bardo': {
    "Colégio da Dança": {
      features: {
        3: [
          { name: "Passo Deslumbrante", description: "Artes Marciais (d6 DEX). Pode realizar um ataque desarmado como Ação Bônus ao usar Inspiração Bárdica." },
          { name: "Movimento Inspirador", description: "Move-se e move aliados sem provocar ataques de oportunidade como Reação." }
        ],
        6: [{ name: "Passo em Dupla", description: "Concede bônus de Iniciativa para você e aliados próximos igual ao seu bônus de Carisma." }],
        10: [{ name: "Evasão Conduzida", description: "Ganha Evasão e pode compartilhá-la com aliados em um raio de 1,5 metros." }],
        14: [{ name: "Final Deslumbrante", description: "Melhorias expressivas em todas as manobras e dano desarmado." }]
      }
    },
    "Colégio do Glamour": {
      features: {
        3: [
          { name: "Magia Fascinante", description: "Ao lançar magias de Encantamento ou Ilusão, pode usar Inspiração Bárdica para encantar ou assustar criaturas." },
          { name: "Manto de Inspiração", description: "Concede PV Temporário e movimento livre para aliados como uma Ação Bônus." }
        ],
        6: [{ name: "Manto de Majestade", description: "Pode lançar Comando como Ação Bônus repetidamente por 1 minuto sem gastar slots." }],
        10: [{ name: "Majestade Inquebrável", description: "Torna-se magicamente belo, dificultando ataques contra você (exige salvaguarda de CAR)." }],
        14: [{ name: "Glamour Aprimorado", description: "Melhorias nas magias de controle e efeitos sociais." }]
      }
    },
    "Colégio do Conhecimento": {
      features: {
        3: [
          { name: "Proficiências Bônus", description: "Ganha proficiência em 3 perícias à sua escolha." },
          { name: "Palavras de Corte", description: "Use sua Reação e Inspiração Bárdica para subtrair o valor de ataques, danos ou testes de iniciativa inimigos." }
        ],
        6: [{ name: "Descobertas Mágicas", description: "Ganha 2 magias de qualquer lista de classe que contam como magias de Bardo." }],
        10: [{ name: "Habilidade Inigualável", description: "Adiciona Inspiração Bárdica às suas próprias rolagens de perícia se falhar. Se ainda assim falhar, não gasta o dado." }],
        14: [{ name: "Conhecimento Infinito", description: "Pode usar Palavras de Corte sem gastar Inspiração em certas condições." }]
      }
    },
    "Colégio do Valor": {
      features: {
        3: [
          { name: "Inspiração de Combate", description: "Sua Inspiração Bárdica pode ser usada para aumentar o dano de um ataque ou aumentar a CA contra um ataque." },
          { name: "Treinamento Marcial", description: "Proficiência em armaduras médias, escudos e armas marciais." }
        ],
        6: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque. Pode trocar um ataque por um truque." }],
        10: [{ name: "Magia de Batalha", description: "Quando usa sua ação para lançar uma magia, pode realizar um ataque com arma como Ação Bônus." }],
        14: [{ name: "Mestre do Valor", description: "Melhorias no combate corpo a corpo e integração mágica." }]
      }
    }
  },
  'Clérigo': {
    "Domínio da Vida": {
      spells: ["Bênção", "Curar Ferimentos", "Restauração Menor", "Revivificar", "Banimento", "Guardião da Fé", "Curar Ferimentos em Massa", "Ressurreição"],
      features: {
        3: [
          { name: "Discípulo da Vida", description: "Cura adicional = 2 + nível do slot da magia." },
          { name: "Preservar a Vida", description: "Canalizar Divindade: cura criaturas feridas em um raio de 9 metros (pool = 5x nível clérigo)." }
        ],
        6: [{ name: "Curandeiro Abençoado", description: "Quando você cura outra criatura, você recupera PV igual a 2 + nível da magia." }],
        10: [{ name: "Golpe Divino / Potencializar Feitiço", description: "Adiciona dano radiante extra a ataques ou Truques." }],
        14: [{ name: "Cura Suprema", description: "Sempre que usar dados para curar, use o valor máximo possível em cada dado." }]
      }
    },
    "Domínio da Luz": {
      spells: ["Mãos Flamejantes", "Fogo Feérico", "Raio Escaldante", "Ver Invisibilidade", "Luz do Dia", "Bola de Fogo", "Guardião da Fé", "Muro de Fogo"],
      features: {
        3: [
          { name: "Radiância da Alvorada", description: "Canalizar Divindade: pulso Radiante de 9 metros que causa dano e dissipa escuridão mágica." },
          { name: "Fulgor Protetor", description: "Impõe Desvantagem em um ataque inimigo contra você como uma Reação." }
        ],
        6: [{ name: "Fulgor Protetor Aprimorado", description: "Você pode usar seu Fulgor Protetor para proteger aliados também." }],
        10: [{ name: "Potencializar Feitiço", description: "Adiciona seu modificador de Sabedoria ao dano dos seus Truques de Clérigo." }],
        14: [{ name: "Corona de Luz", description: "Aura que emite luz solar e impõe desvantagem em salvaguardas contra dano de Fogo ou Radiante." }]
      }
    },
    "Domínio da Enganação": {
      spells: ["Enfeitiçar Pessoa", "Disfarçar-se", "Imagens Espelhadas", "Passos sem Pegadas", "Padrão Hipnótico", "Indetectável", "Confusão", "Porta Dimensional"],
      features: {
        3: [
          { name: "Bênção do Trapaceiro", description: "Concede Vantagem em testes de Furtividade a outra criatura por toque." },
          { name: "Invocar Duplicidade", description: "Canalizar Divindade: cria uma duplicata ilusória que você pode usar para atacar e teleportar-se." }
        ],
        6: [{ name: "Transposição do Trapaceiro", description: "Teleporta-se trocando de lugar com sua duplicata como uma Ação Bônus." }],
        10: [{ name: "Duplicidade Aprimorada", description: "Pode criar e manter múltiplas duplicatas simultaneamente." }],
        14: [{ name: "Capa de Sombras", description: "Pode tornar-se invisível como uma ação." }]
      }
    },
    "Domínio da Guerra": {
      spells: ["Favor Divino", "Escudo da Fé", "Arma Mágica", "Arma Espiritual", "Manto do Cruzado", "Guardiões Espirituais", "Movimentação Livre", "Pele de Pedra"],
      features: {
        3: [
          { name: "Ataque Guiado", description: "Canalizar Divindade: ganha um bônus de +10 em uma jogada de ataque." },
          { name: "Sacerdote de Guerra", description: "Pode realizar um ataque com arma como Ação Bônus (usos = Modificador de Sabedoria)." }
        ],
        6: [{ name: "Bênção do Deus da Guerra", description: "Você pode conceder o bônus de +10 no ataque para um aliado próximo como uma Reação." }],
        10: [{ name: "Golpe Divino", description: "1x/turno adiciona dano extra ao atingir com ataque com arma." }],
        14: [{ name: "Avatar da Batalha", description: "Resistência a dano físico (Concussão, Perfurante, Cortante)." }]
      }
    }
  },
  'Druida': {
    "Círculo da Terra": {
      features: {
        3: [
          { name: "Magias do Círculo", description: "Ganha magias extras baseadas no terreno (Montanha, Litoral, Ártico, etc.)." },
          { name: "Auxílio da Terra", description: "Canalizar Divindade: cura um aliado e causa dano a um inimigo simultaneamente através da natureza." }
        ],
        6: [{ name: "Recuperação Natural", description: "Recupera alguns slots de magia durante um descanso curto." }],
        10: [{ name: "Guarda da Natureza", description: "Imunidade a Veneno, Doença e resistência a dano elemental." }],
        14: [{ name: "Santuário da Natureza", description: "Torna-se difícil para criaturas da natureza atacarem você e seus aliados." }]
      }
    },
    "Círculo da Lua": {
      features: {
        3: [
          { name: "Formas do Círculo", description: "Transforma-se em feras de CR muito mais alto. Pode usar bônus de proficiência/CA e atacar com radiante." },
          { name: "Passo do Luar", description: "Teleporte de 9 metros como Ação Bônus, ganhando vantagem no próximo ataque." }
        ],
        6: [{ name: "Formas do Círculo Aprimoradas", description: "Seus ataques em forma selvagem contam como mágicos e causam dano radiante extra." }],
        10: [{ name: "Passo do Luar II", description: "Pode usar Passo do Luar mesmo sem estar em Forma Selvagem." }],
        14: [{ name: "Mil Formas", description: "Pode lançar Alterar-se à vontade sem gastar slots." }]
      }
    },
    "Círculo do Mar": {
      features: {
        3: [
          { name: "Fúria do Mar", description: "Cria uma aura de tempestade que causa dano de Trovão e empurra inimigos." },
          { name: "Magias do Mar", description: "Magias focadas em água, relâmpago e tempestades sempre preparadas." }
        ],
        6: [{ name: "Afinidade Aquática", description: "Ganha velocidade de natação, respira sob a água e resistência a dano de Frio." }],
        10: [{ name: "Nascido da Tempestade", description: "Ganha velocidade de voo e resistência a dano Elétrico e Trovejante." }],
        14: [{ name: "Presente Oceânico", description: "Pode estender os benefícios da sua Fúria do Mar para aliados próximos." }]
      }
    },
    "Círculo das Estrelas": {
      features: {
        3: [
          { name: "Mapa Estelar", description: "Ganha magias como Orientação e Guiding Bolt (usos gratuitos)." },
          { name: "Forma Estelar", description: "Ação Bônus: assume forma de constelação (Arqueiro, Cálice ou Dragão) com bônus poderosos." }
        ],
        6: [{ name: "Augúrio Cósmico", description: "Usa dados para prever sorte (Bônus) ou azar (Penalidade) para outros criaturas." }],
        10: [{ name: "Constelações Cintilantes", description: "Pode trocar sua Forma Estelar a cada turno; melhorias nos bônus." }],
        14: [{ name: "Cheio de Estrelas", description: "Enquanto em Forma Estelar, ganha resistência a dano físico." }]
      }
    }
  },
  'Guerreiro': {
    "Mestre de Batalha": {
      features: {
        3: [{ name: "Superioridade em Combate", description: "Ganha dados de superioridade d8 e aprende Manobras táticas." }],
        7: [{ name: "Conhecer o Inimigo", description: "Descobre características do inimigo e seus Dados de Superioridade tornam-se d10." }],
        10: [{ name: "Superioridade Aprimorada", description: "Ganha mais dados e manobras adicionais." }],
        15: [{ name: "Implacável", description: "Ganha um dado de superioridade grátis se entrar em combate sem nenhum. Dados tornam-se d12." }],
        18: [{ name: "Mestria Suprema", description: "Ganha ainda mais dados (total de 6)." }]
      }
    },
    "Campeão": {
      features: {
        3: [
          { name: "Crítico Aprimorado", description: "Seus ataques com arma fazem crítico em 19 ou 20." },
          { name: "Atleta Extraordinário", description: "Adiciona bônus em testes físicos e ganha Vantagem em Iniciativa." }
        ],
        7: [{ name: "Estilo de Luta Adicional", description: "Ganha um segundo Estilo de Luta à sua escolha." }],
        10: [{ name: "Guerreiro Heroico", description: "Ganha Inspiração Heroica no início de cada um dos seus turnos." }],
        15: [{ name: "Crítico Superior", description: "Seus ataques com arma fazem crítico em 18, 19 ou 20." }],
        18: [{ name: "Sobrevivente", description: "No início de cada turno, recupera vida se estiver com menos de metade do HP." }]
      }
    },
    "Cavaleiro Arcano": {
      features: {
        3: [
          { name: "Conjuração", description: "Aprende magias de Mago (Escolas de Abjuração e Evocação)." },
          { name: "Vínculo com Arma", description: "Vincula-se a duas armas; pode evocá-las para sua mão como Ação Bônus." }
        ],
        7: [{ name: "Magia de Guerra", description: "Quando usa sua ação para um truque, pode realizar um ataque com arma como Ação Bônus." }],
        10: [{ name: "Golpe Místico", description: "Quando atinge uma criatura, ela tem desvantagem na próxima salvaguarda contra sua magia." }],
        15: [{ name: "Investida Arcana", description: "Teleporte de 9 metros ao usar seu Surto de Ação." }],
        18: [{ name: "Magia de Guerra Aprimorada", description: "Quando usa sua ação para lançar uma magia, pode realizar um ataque com arma como Ação Bônus." }]
      }
    },
    "Guerreiro Psíquico": {
      features: {
        3: [{ name: "Poder Psiônico", description: "Dá bônus em dano, defesa ou movimento usando Dados de Energia Psiônica." }],
        7: [{ name: "Adepto Telecinético", description: "Pode voar temporariamente e empurrar inimigos com a mente." }],
        10: [{ name: "Mente Guardada", description: "Resistência a dano Psíquico e imunidade a Medo/Encantamento." }],
        15: [{ name: "Baluarte de Força", description: "Cria um escudo psiônico para você e aliados que concede cobertura total." }],
        18: [{ name: "Mestre Telecinético", description: "Pode lançar Telecinésia livremente e atacar como Ação Bônus." }]
      }
    }
  },
  'Monge': {
    "Caminho da Misericórdia": {
      features: {
        3: [
          { name: "Mãos da Cura / Dano", description: "Gasta Pontos de Foco para curar aliados ou causar dano necrótico extra." },
          { name: "Implementos da Misericórdia", description: "Proficiência em Medicina e kits de ervas." }
        ],
        6: [{ name: "Toque do Médico", description: "Sua Mão da Cura remove condições negativas; Mão do Dano pode envenenar." }],
        11: [{ name: "Rajada de Cura / Dano", description: "Pode integrar seus efeitos de misericórdia à Rajada de Golpes." }],
        17: [{ name: "Mão da Misericórdia Suprema", description: "Pode trazer criaturas mortas recentemente de volta à vida." }]
      }
    },
    "Caminho das Sombras": {
      features: {
        3: [{ name: "Artes Sombrias", description: "Pode criar Escuridão com Pontos de Foco; ganha Visão no Escuro (mágica)." }],
        6: [{ name: "Passo das Sombras", description: "Teleporte entre sombras como Ação Bônus, ganhando Vantagem no ataque." }],
        11: [{ name: "Manto de Sombras", description: "Torna-se invisível em locais de escuridão ou penumbra." }],
        17: [{ name: "Ataque Oportunista", description: "Ataca inimigos que sofram dano nas proximidades." }]
      }
    },
    "Caminho dos Elementos": {
      features: {
        3: [{ name: "Sintonização Elemental", description: "Ganha alcance extra e adiciona danos elementais (Fogo, Frio, etc.) aos ataques." }],
        6: [{ name: "Explosão Elemental", description: "Libera ondas de energia elemental em área (fogo, relâmpago, etc.)." }],
        11: [{ name: "Passo dos Elementos", description: "Ganha velocidade de voo e natação enquanto usa seu Poder Elemental." }],
        17: [{ name: "Epítome Elemental", description: "Transforma seu corpo em energia pura, ganhando resistências e dano passivo." }]
      }
    },
    "Caminho da Mão Aberta": {
      features: {
        3: [{ name: "Técnica da Mão Aberta", description: "Derruba, empurra ou impede reações ao usar Rajada de Golpes." }],
        6: [{ name: "Plenitude do Corpo", description: "Recupera vida como Ação Bônus algumas vezes por dia." }],
        11: [{ name: "Passo Ligeiro", description: "Pode usar Passo do Vento para teleportar-se curtas distâncias." }],
        17: [{ name: "Palma Vibrante", description: "Cria vibrações letais no corpo do inimigo que podem causar morte instantânea." }]
      }
    }
  },
  'Paladino': {
    "Juramento da Devoção": {
      spells: ["Escudo da Fé", "Auxílio", "Zona da Verdade", "Farol de Esperança", "Dissipar Magia", "Proteção contra a Morte"],
      features: {
        3: [{ name: "Arma Sagrada", description: "Canalizar Divindade: imbuy sua arma com luz positiva (+ataque e luz)." }],
        7: [{ name: "Aura de Devoção", description: "Você e aliados em um raio de 3 metros não podem ser Enfeitiçados." }],
        15: [{ name: "Pureza de Espírito", description: "Sempre sob os efeitos de Proteção contra o Bem e o Mal." }],
        20: [{ name: "Nimbos Sagrados", description: "Aura de luz solar intensa que causa dano radiante aos inimigos." }]
      }
    },
    "Juramento da Glória": {
      spells: ["Raio Condutor", "Aprimorar Habilidade", "Arma Mágica", "Velocidade", "Compulsão", "Movimentação Livre"],
      features: {
        3: [
          { name: "Punição Inspiradora", description: "Concede PV Temporário a aliados após usar Punição Divina." },
          { name: "Atleta Inigualável", description: "Ganha bônus massivos em Atletismo e saltos." }
        ],
        7: [{ name: "Aura de Alacridade", description: "Aumenta a velocidade de movimento sua e de aliados próximos." }],
        15: [{ name: "Defesa Gloriosa", description: "Usa Reação para aumentar CA de aliado e contra-atacar o agressor." }],
        20: [{ name: "Lenda Viva", description: "Transforma-se em um herói lendário: acertos automáticos e bônus de salvaguarda." }]
      }
    },
    "Juramento dos Anciãos": {
      spells: ["Golpe Enredante", "Passo Nebuloso", "Raio Lunar", "Crescimento de Plantas", "Tempestade de Gelo", "Pele de Pedra"],
      features: {
        3: [
          { name: "Ira da Natureza", description: "Canalizar Divindade: plantas invocam para prender um inimigo." },
          { name: "Expulsar o Infiel", description: "Provoca medo em fadas e infernais." }
        ],
        7: [{ name: "Aura de Proteção (Magia)", description: "Você e aliados próximos ganham resistência a dano de magias." }],
        15: [{ name: "Sentinela Imortal", description: "Evita cair a 0 PV uma vez e você para de envelhecer magicamente." }],
        20: [{ name: "Campeão Ancião", description: "Regeneração, magias rápidas e aura de medo da natureza." }]
      }
    },
    "Juramento da Vingança": {
      spells: ["Perdição", "Marca do Caçador", "Imobilizar Pessoa", "Passo Nebuloso", "Velocidade", "Banimento"],
      features: {
        3: [{ name: "Voto de Inimizade", description: "Foca em um inimigo, garantindo Vantagem em todos os ataques contra ele." }],
        7: [{ name: "Vingador Implacável", description: "Move-se após acertar um ataque de oportunidade, sem sofrer ataques de volta." }],
        15: [{ name: "Alma da Vingança", description: "Ataca como Reação o alvo do seu Voto quando ele te ataca." }],
        20: [{ name: "Anjo Vingador", description: "Ganha asas, voo e uma aura de puro terror." }]
      }
    }
  },
  'Patrulheiro': {
    "Mestre das Feras": {
      features: {
        3: [{ name: "Companheiro Primal", description: "Invoca uma fera mágica (Terra, Ar ou Mar) que luta ao seu lado." }],
        7: [{ name: "Treinamento Excepcional", description: "A fera pode usar ações bônus e seus ataques contam como mágicos." }],
        11: [{ name: "Fúria Bestial", description: "A fera agora realiza dois ataques por ação." }],
        15: [{ name: "Compartilhar Magias", description: "Magias que você lança em si mesmo também afetam sua fera." }]
      }
    },
    "Andarilho Feérico": {
      features: {
        3: [
          { name: "Golpes Pavorosos", description: "Adiciona dano Psíquico extra aos seus ataques diários." },
          { name: "Glamour de Outro Mundo", description: "Adiciona SAB em testes de Persuasão e Enganação." }
        ],
        7: [{ name: "Reviravolta Fascinante", description: "Redireciona efeitos de medo ou encanto de um alvo para outro." }],
        11: [{ name: "Reforços Feéricos", description: "Invocação de fadas sem gasto de concentração por tempo limitado." }],
        15: [{ name: "Andarilho Nebuloso", description: "Usa Passo Nebuloso frequentemente e pode levar aliados junto." }]
      }
    },
    "Perseguidor de Sombras": {
      features: {
        3: [
          { name: "Emboscador Temível", description: "Dano extra e ataque adicional no primeiro turno de combate." },
          { name: "Visão Umbral", description: "Ganha Visão no Escuro aprimorada; invisível para quem usa Visão no Escuro." }
        ],
        7: [{ name: "Mente de Ferro", description: "Ganha proficiência em salvaguardas de Sabedoria." }],
        11: [{ name: "Rajada do Perseguidor", description: "Faz um ataque extra se você errar um de seus ataques." }],
        15: [{ name: "Esquiva Sombria", description: "Usa sua Reação para impor desvantagem em um ataque inimigo." }]
      }
    },
    "Caçador": {
      features: {
        3: [{ name: "Presa do Caçador", description: "Escolhe especializações contra gigantes, grupos ou alvos feridos." }],
        7: [{ name: "Táticas Defensivas", description: "Ganha defesas contra ataques de oportunidade ou ataques múltiplos." }],
        11: [{ name: "Multiataque", description: "Realiza ataques em área contra múltiplos inimigos próximos." }],
        15: [{ name: "Defesa Superior", description: "Ganha habilidades como Evasão ou Esquiva Sobrenatural." }]
      }
    }
  },
  'Ladino': {
    "Trapaceiro Arcano": {
      features: {
        3: [
          { name: "Conjuração", description: "Aprende magias de Mago (Ilusão e Encantamento)." },
          { name: "Mãos Mágicas de Prestidigitador", description: "Sua Mão Mágica é invisível e pode realizar truques de ladino." }
        ],
        9: [{ name: "Emboscada Mágica", description: "Estar escondido impõe desvantagem contra suas magias." }],
        13: [{ name: "Trapaceiro Versátil", description: "Usa sua Mão Mágica para distrair e garantir Ataque Furtivo." }],
        17: [{ name: "Ladrão de Magia", description: "Pode roubar e anular o efeito de uma magia lançada contra você como Reação." }]
      }
    },
    "Assassino": {
      features: {
        3: [{ name: "Assassinar", description: "Vantagem em iniciativa e acertos críticos automáticos contra alvos surpresos." }],
        9: [{ name: "Especialista em Infiltração", description: "Cria identidades falsas e disfarces perfeitos." }],
        13: [{ name: "Armas Envenenadas", description: "Ganha maestria com venenos; ataques causam dano extra e envenenam." }],
        17: [{ name: "Golpe Mortal", description: "Ataques contra alvos surpresos podem causar dano dobrado (salv. CON)." }]
      }
    },
    "Lâmina Psíquica": {
      features: {
        3: [
          { name: "Lâminas Psíquicas", description: "Cria facas de energia mental para atacar corpo a corpo ou à distância." },
          { name: "Poder Psiônico", description: "Usa dados psi para melhorar perícias e estabelecer telepatia." }
        ],
        9: [{ name: "Lâminas da Alma", description: "Adiciona dados psi para converter erros em acertos ou para teleportar-se." }],
        13: [{ name: "Véu Psíquico", description: "Torna-se invisível magicamente por até 1 hora." }],
        17: [{ name: "Mente Dilacerante", description: "Ataques psíquicos podem atordoar o inimigo temporariamente." }]
      }
    },
    "Ladrão": {
      features: {
        3: [
          { name: "Mãos Rápidas", description: "Pode usar itens, desarmar armadilhas ou roubar como Ação Bônus." },
          { name: "Trabalho no Segundo Andar", description: "Escala rapidamente e pula distâncias maiores." }
        ],
        9: [{ name: "Furtividade Suprema", description: "Ganha Vantagem em testes de Furtividade se mover-se devagar." }],
        13: [{ name: "Usar Dispositivo Mágico", description: "Ignora requisitos de classe ou raça para usar itens mágicos." }],
        17: [{ name: "Reflexos de Ladrão", description: "Pode agir duas vezes no primeiro round de um combate." }]
      }
    }
  },
  'Feiticeiro': {
    "Feitiçaria Aberrante": {
      features: {
        3: [{ name: "Fala Telepática", description: "Cria um elo mental com uma criatura para comunicação secreta." }],
        6: [{ name: "Feitiçaria Psiônica", description: "Lança magias gastando Pontos de Feitiçaria sem componentes verbais/somáticos." }],
        14: [{ name: "Revelação na Carne", description: "Transforma seu corpo: ganha voo, natação, visão real ou maleabilidade." }],
        18: [{ name: "Implosão Distorcida", description: "Teleporte poderoso que suga e causa dano a inimigos próximos." }]
      }
    },
    "Feitiçaria do Mecanismo": {
      features: {
        3: [{ name: "Restaurar Equilíbrio", description: "Usa Reação para anular vantagens ou desvantagens de outros criaturas." }],
        6: [{ name: "Baluarte da Lei", description: "Cria um escudo de energia que absorve dano para você ou aliados." }],
        14: [{ name: "Transe da Ordem", description: "Entra em transe onde rolagens baixas de d20 tornam-se 10." }],
        18: [{ name: "Cavalgada Mecânica", description: "Invoca espíritos de ordem que curam e reparam tudo em área." }]
      }
    },
    "Feitiçaria Dracônica": {
      features: {
        3: [{ name: "Resiliência Dracônica", description: "Aumento de HP e pele tão dura quanto escamas (CA 13 + DEX)." }],
        6: [{ name: "Afinidade Elemental", description: "Adiciona dano extra ao elemento da sua linhagem dracônica." }],
        14: [{ name: "Asas de Dragão", description: "Manifesta asas dracônicas que permitem voar em alta velocidade." }],
        18: [{ name: "Presença Dracônica", description: "Emite uma aura de terror ou encantamento digna de um ancião." }]
      }
    },
    "Magia Selvagem": {
      features: {
        3: [
          { name: "Surto de Magia Selvagem", description: "Suas magias podem causar efeitos aleatórios imprevisíveis e caóticos." },
          { name: "Marés do Caos", description: "Garante Vantagem em uma rolagem; o DM pode forçar um Surto depois." }
        ],
        6: [{ name: "Dobrar Sorte", description: "Gasta Pontos de Feitiçaria para adicionar/subtrair 1d4 de qualquer rolagem." }],
        14: [{ name: "Caos Controlado", description: "Sempre rola duas vezes na tabela de surtos e escolhe o melhor efeito." }],
        18: [{ name: "Bombardeio de Feitiços", description: "Magias que rolam dano máximo ganham dados extras de dano." }]
      }
    }
  },
  'Bruxo': {
    "Patrono Feérico": {
      features: {
        3: [{ name: "Passos das Fadas", description: "Teleporte bônus após lançar magias, com efeitos de encanto/medo." }],
        6: [{ name: "Fuga Nebulosa", description: "Teleporta-se e fica invisível como Reação ao sofrer dano." }],
        10: [{ name: "Defesas Fascinantes", description: "Imunidade a Encantamento e reflete magias mentais contra o conjurador." }],
        14: [{ name: "Magia Enfeitiçante", description: "Lança magias de encanto gratuitamente ao usar seus teleportes." }]
      }
    },
    "Patrono Celestial": {
      features: {
        3: [{ name: "Luz Curativa", description: "Usa uma reserva de dados d6 para curar aliados como Ação Bônus." }],
        6: [{ name: "Alma Radiante", description: "Resistência Radiante e bônus de dano de Carisma em magias de Fogo/Luz." }],
        10: [{ name: "Resiliência Celestial", description: "Concede PV Temporário a você e aliados após cada descanso." }],
        14: [{ name: "Vingança Flamejante", description: "Explode com energia radiante ao cair, voltando à vida imediatamente." }]
      }
    },
    "Patrono Infernal": {
      features: {
        3: [{ name: "Bênção do Obscuro", description: "Ganha PV Temporário sempre que reduz um inimigo a 0 HP." }],
        6: [{ name: "Sorte do Próprio Obscuro", description: "Adiciona 1d10 a uma salvaguarda ou teste de habilidade falho." }],
        10: [{ name: "Resiliência Infernal", description: "Escolhe um tipo de dano para ter resistência a cada descanso longo." }],
        14: [{ name: "Atirar pelo Inferno", description: "Transporta um alvo para o inferno por um turno, causando dano massivo." }]
      }
    },
    "O Grande Antigo": {
      features: {
        3: [{ name: "Mente Desperta", description: "Telepatia bidirecional com qualquer criatura que entenda um idioma." }],
        6: [{ name: "Combatente Clarividente", description: "Lê a mente do inimigo para prever ataques, impondo desvantagem." }],
        10: [{ name: "Escudo de Pensamentos", description: "Mente protegida contra leitura e resistência a dano Psíquico." }],
        14: [{ name: "Criar Serval", description: "Domina permanentemente a mente de uma criatura incapacitada." }]
      }
    }
  },
  'Mago': {
    "Abjurador": {
      features: {
        3: [
          { name: "Sábio da Abjuração", description: "Custo menor para aprender e preparar magias de proteção." },
          { name: "Proteção Arcana", description: "Cria um escudo de energia que absorve dano e recarrega com magias." }
        ],
        6: [{ name: "Proteção Projetada", description: "Usa sua Proteção Arcana para absorver dano sofrido por aliados próximos." }],
        10: [{ name: "Quebrador de Magia", description: "Seu Contramagia e Dissipar Magia são muito mais eficazes." }],
        14: [{ name: "Resistência a Magia", description: "Vantagem em todas as salvaguardas contra magias e resistência ao dano." }]
      }
    },
    "Adivinho": {
      features: {
        3: [
          { name: "Sábio da Adivinhação", description: "Custo menor para aprender magias de visão e previsão." },
          { name: "Presságio", description: "Rola dois d20 no início do dia e substitui qualquer rolagem futura por eles." }
        ],
        6: [{ name: "Adivinhação Especialista", description: "Recupera slots de nível baixo ao lançar magias de adivinhação." }],
        10: [{ name: "O Terceiro Olho", description: "Ganha Visão no Escuro, visão do invisível ou capacidade de ler tudo." }],
        14: [{ name: "Presságio Maior", description: "Rola três dados de Presságio em vez de dois." }]
      }
    },
    "Evocador": {
      features: {
        3: [
          { name: "Sábio da Evocação", description: "Custo menor para aprender magias de dano elemental e força." },
          { name: "Truque Potencializado", description: "Truques causam metade do dano mesmo quando o alvo passa na salvaguarda." }
        ],
        6: [{ name: "Esculpir Feitiços", description: "Cria bolsões de segurança para aliados dentro das suas magias de área." }],
        10: [{ name: "Evocação Potencializada", description: "Adiciona seu modificador de Inteligência ao dano de magias de evocação." }],
        14: [{ name: "Sobrecarga", description: "Maximiza o dano de magias de nível baixo à custa da sua própria vitalidade." }]
      }
    },
    "Ilusionista": {
      features: {
        3: [
          { name: "Sábio da Ilusão", description: "Custo menor para aprender magias que enganam os sentidos." },
          { name: "Ilusões Aprimoradas", description: "Suas ilusões ganham som, cheiro e maior durabilidade." }
        ],
        6: [{ name: "Criaturas Fantasmagóricas", description: "Cria cópias ilusórias de monstros que podem atacar inimigos." }],
        10: [{ name: "Eu Ilusório", description: "Cria uma duplicata instantânea para fazer um ataque inimigo errar você." }],
        14: [{ name: "Realidade Ilusória", description: "Torna uma parte de uma ilusão sua em um objeto real e físico por 1 minuto." }]
      }
    }
  },
  'Artesão Arcano': {
    "Artilheiro": {
      spells: ["Escudo", "Onda de Trovão", "Raio Escaldante", "Fragmentar", "Bola de Fogo", "Muro de Vento", "Tempestade de Gelo", "Muro de Fogo", "Cone de Frio", "Muro de Força"],
      features: {
        3: [
          { name: "Ferramentas do Ofício", description: "Proficiência: Ferramentas de carpinteiro e armas marciais à distância." },
          { name: "Canhão Élfico", description: "Cria um canhão pequeno ou minúsculo. Opções: Lança-Chamas, Atirador de Força ou Protetor." }
        ],
        6: [{ name: "Arma de Fogo Arcana", description: "Infunde cajado/varinha. Magias que causam dano ganham +1d8." }],
        10: [{ name: "Canhão Explosivo", description: "O dano do canhão aumenta em 1d8. Pode autodestruir o canhão para uma explosão." }],
        14: [{ name: "Posição Fortificada", description: "Dois canhões simultâneos. Meia cobertura para aliados em um raio de 3 metros." }]
      }
    },
    "Alquimista": {
      spells: ["Palavra de Cura", "Raio de Doença", "Esfera Flamejante", "Flecha Ácida de Melf", "Forma Gasosa", "Palavra Curativa em Massa", "Definhar", "Proteção contra a Morte", "Nuvem Mortal", "Reviver os Mortos"],
      features: {
        3: [
          { name: "Ferramentas do Ofício", description: "Proficiência: Suprimentos de alquimista." },
          { name: "Elixir Experimental", description: "Crie elixires com efeitos aleatórios (ou escolha gastando slots) ao final de um descanso longo." }
        ],
        6: [{ name: "Sábio Alquimista", description: "Adicione modificador de INT ao dano (ácido/fogo/veneno) ou cura de suas magias." }],
        10: [{ name: "Reagentes Restauradores", description: "Elixires concedem PV Temporário. Pode lançar Restauração Menor sem slot." }],
        14: [{ name: "Mestre Alquimista", description: "Imunidade a Veneno. Pode lançar Restauração Maior e Curar sem custo." }]
      }
    },
    "Armeiro": {
      spells: ["Míssil Mágico", "Onda de Trovão", "Imagens Espelhadas", "Fragmentar", "Padrão Hipnótico", "Relâmpago", "Escudo de Fogo", "Invisibilidade Maior", "Atravessar Paredes", "Muro de Força"],
      features: {
        3: [
          { name: "Ferramentas do Ofício", description: "Proficiência: Armaduras pesadas e ferramentas de ferreiro. Crafting acelerado." },
          { name: "Armadura Arcana", description: "Sua armadura torna-se mágica: ignora requisito de Força e serve como foco." },
          { name: "Modelo de Armadura", description: "Escolha: Guardião (Tanque) ou Infiltrador (Furtividade)." }
        ],
        6: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque." }],
        10: [{ name: "Armeiro Aprimorado", description: "A armadura arcana permite 2 infusões extras simultâneas." }],
        14: [{ name: "Armadura Aperfeiçoada", description: "Ganha bônus poderosos dependendo do seu Modelo de Armadura." }]
      }
    },
    "Serralheiro de Batalha": {
      spells: ["Heroísmo", "Escudo", "Golpe Marcante", "Vínculo de Proteção", "Aura de Vitalidade", "Conjurar Salva", "Aura de Pureza", "Escudo de Fogo", "Golpe Banidor", "Curar Ferimentos em Massa"],
      features: {
        3: [
          { name: "Ferramentas do Ofício", description: "Proficiência: Ferramentas de ferreiro." },
          { name: "Prontidão para Batalha", description: "Proficiência com armas marciais. Pode usar Inteligência para ataques mágicos." },
          { name: "Defensor de Aço", description: "Você cria um defensor de aço que o acompanha e protege seus aliados." }
        ],
        6: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque." }],
        10: [{ name: "Choque Arcano", description: "Causa dano extra ou cura aliados ao atingir com armas mágicas (usos = INT)." }],
        14: [{ name: "Choque Aperfeiçoado", description: "O dano/cura do Choque Arcano aumenta e o Defensor torna-se mais resistente." }]
      }
    }
  }
};
