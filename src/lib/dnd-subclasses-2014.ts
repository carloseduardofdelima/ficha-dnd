export interface SubclassFeature {
  name: string;
  description: string;
}

export type SubclassData = Record<number, SubclassFeature[]>;

export interface ClassSubclasses {
  [subclassName: string]: {
    description?: string;
    features: SubclassData;
    spells?: string[]; // For domains, circles, etc.
    source?: string;
  };
}

export const SUBCLASSES_2014: Record<string, ClassSubclasses> = {
  'Bárbaro': {
    "Caminho do Furioso": {
      description: "Focados na brutalidade implacável do combate corpo-a-corpo, bárbaros deste caminho canalizam uma fúria frenética capaz de superar a própria dor, desferindo golpes devastadores ao custo do esgotamento físico.",
      features: {
        3: [{ name: "Frenesi", description: "Ao entrar em fúria, você pode optar por entrar em frenesi. Enquanto estiver em frenesi, você pode fazer um ataque corpo a corpo com arma como ação bônus em cada um dos seus turnos. Quando a fúria terminar, você sofre 1 nível de exaustão." }],
        6: [{ name: "Fúria Inconsciente", description: "Você não pode ser enfeitiçado ou amedrontado enquanto estiver em fúria. Se já estiver sob um desses efeitos ao entrar em fúria, o efeito é suspenso enquanto a fúria durar." }],
        10: [{ name: "Presença Intimidante", description: "Com uma ação, você tenta amedrontar uma criatura a até 9 metros que possa vê-lo ou ouvi-lo. O alvo deve passar em um teste de resistência de Sabedoria (CD 8 + Bônus de Proficiência + Modificador de Carisma) ou ficará amedrontado até o fim do seu próximo turno. Você pode usar sua ação nos turnos seguintes para estender a duração." }],
        14: [{ name: "Retaliação", description: "Quando sofrer dano de uma criatura a até 1,5 metro de você, você pode usar sua reação para fazer um ataque corpo a corpo com arma contra ela." }]
      }
    },
    "Caminho do Guerreiro Totêmico": {
      description: "Guiados por espíritos da natureza, estes bárbaros fundem sua força física com a energia mística de animais totêmicos como o Urso, a Águia ou o Lobo para obter resistência e velocidade sobrenaturais.",
      features: {
        3: [
          { name: "Conselheiro Espiritual", description: "Você pode conjurar as magias Sentido Bestial e Falar com Animais apenas como rituais." },
          { name: "Totem Espiritual", description: "Escolha um espírito totêmico enquanto estiver em fúria: Urso (resistência a todos os tipos de dano, exceto dano psíquico), Águia (outras criaturas têm desvantagem em ataques de oportunidade contra você e você pode usar Disparada como ação bônus) ou Lobo (seus aliados têm vantagem em ataques corpo a corpo contra inimigos a até 1,5 metro de você)." }
        ],
        6: [{ name: "Aspecto da Besta", description: "Escolha um aspecto animal: Urso (sua capacidade de carga é dobrada e você tem vantagem em testes de Força para empurrar, puxar, levantar ou quebrar objetos), Águia (você enxerga a até 1,6 km sem dificuldade e não sofre desvantagem em Percepção por penumbra) ou Lobo (você pode rastrear outras criaturas viajando em passo rápido e se mover furtivamente em passo normal)." }],
        10: [{ name: "Andarilho Espiritual", description: "Você pode conjurar a magia Comunhão com a Natureza apenas como ritual." }],
        14: [{ name: "Sintonia Totêmica", description: "Escolha um efeito enquanto estiver em fúria: Urso (inimigos a até 1,5 metro têm desvantagem ao atacar aliados seus), Águia (você ganha deslocamento de voo igual ao seu deslocamento de caminhada durante o turno) ou Lobo (pode usar uma ação bônus para derrubar (condição Caído) uma criatura Grande ou menor que você acertar com ataque corpo a corpo)." }]
      }
    },
    "Trilha da Besta": {
      description: "Bárbaros que caminham por esta trilha extraem sua fúria de uma centelha bestial que queima em suas almas, transformando seu corpo fisicamente para manifestar mandíbulas, garras ou cauda em combate.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [{ name: "Forma da Besta", description: "Ao entrar em fúria, manifesta uma arma natural: Mordida (1d8 perfurante + cura igual à proficiência se estiver abaixo de meio HP), Garras (1d6 cortante + ataque extra com garra) ou Cauda (1d8 perfurante com alcance + reação para somar d8 à CA)." }],
        6: [{ name: "Alma Bestial", description: "Suas armas naturais contam como mágicas. Escolha após descanso curto/longo: respirar embaixo d'água e nado, escalar superfícies difíceis/tetos, ou adicionar 1/3 do teste de Atletismo na distância de salto." }],
        10: [{ name: "Fúria Contagiosa", description: "Ao acertar alvo com arma natural em fúria, force salvaguarda de Sabedoria (CD 8+Prof+Con) ou o alvo ataca outro criatura com reação dele ou sofre 2d12 de dano psíquico (usos igual a Prof/descanso longo)." }],
        14: [{ name: "Chamado de Caça", description: "Ao entrar em fúria, conceda benefícios a aliados voluntários (até seu Mod. Con). Ganha 5 PV temporários por aliado. Aliados podem somar 1d6 ao dano de seus ataques uma vez por turno." }]
      }
    },
    "Trilha da Magia Selvagem": {
      description: "Inundados pela magia de Faéria ou dos Planos Superiores, estes bárbaros liberam explosões imprevisíveis de energia mágica caótica quando entram em fúria, auxiliando seus companheiros ou punindo seus agressores.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [
          { name: "Surto Selvagem", description: "Ao entrar em fúria, role 1d8 para gerar um efeito caótico (CD 8+Prof+Con se aplicável): 1. Dano necrótico e PV temporários; 2. Teleporte como ação bônus; 3. Invocar pixel explosiva; 4. Arma infundida com energia leve/arremesso; 5. Retaliação de dano de energia ao sofrer ataque; 6. Luz protetora (+1 CA para você e aliados próximos); 7. Terreno difícil ao seu redor; 8. Raio de luz cegante." },
          { name: "Percepção Mágica", description: "Com uma ação, detecta magia e itens mágicos a até 18m e suas escolas (usos igual a Prof/descanso longo)." }
        ],
        6: [{ name: "Fortalecimento Mágico", description: "Com uma ação, toca criatura para conceder +1d3 em testes/ataques por 10 min, ou rola 1d3 para recuperar espaço de magia gasto do mesmo círculo (usos igual a Prof/descanso longo)." }],
        10: [{ name: "Retaliação Instável", description: "Ao sofrer dano ou falhar em salvaguarda na fúria, pode usar reação para rolar novamente na tabela de Magia Selvagem, substituindo o efeito atual." }],
        14: [{ name: "Surto Controlado", description: "Sempre que rolar na tabela de Magia Selvagem, você pode jogar duas vezes e escolher qual dos dois efeitos liberar. Se der dados iguais, pode escolher qualquer efeito da tabela." }]
      }
    }
  },
  'Bardo': {
    "Colégio do Conhecimento": {
      description: "Mestres de perícias e segredos arcanos, bardos deste colégio usam suas palavras afiadas para confundir inimigos e extraem magias de outras classes para expandir seu grimório.",
      features: {
        3: [
          { name: "Proficiência Adicional", description: "Você ganha proficiência em três perícias quaisquer à sua escolha." },
          { name: "Palavras de Interrupção", description: "Quando uma criatura a até 18 metros que você possa ver fizer uma jogada de ataque, teste de habilidade ou rolagem de dano, você pode usar sua reação para gastar um uso de Inspiração Bárdica, rolar o dado e subtrair o resultado da rolagem da criatura." }
        ],
        6: [{ name: "Segredos Mágicos Adicionais", description: "Você aprende duas magias à sua escolha de qualquer classe. As magias escolhidas devem ser de um nível que você possa conjurar e passam a contar como magias de bardo para você." }],
        14: [{ name: "Perícia Inigualável", description: "Quando fizer um teste de habilidade, você pode gastar um uso de Inspiração Bárdica, rolar o dado e somar o resultado ao seu teste (pode decidir após rolar o d20, mas antes de saber se teve sucesso)." }]
      }
    },
    "Colégio da Bravura": {
      description: "Cantores de guerra que inspiram bravura nos corações dos aliados, estes bardos combinam o uso de armas marciais e armaduras com sua magia para liderar no front de batalha.",
      features: {
        3: [
          { name: "Proficiência Adicional", description: "Você ganha proficiência com armaduras médias, escudos e armas marciais." },
          { name: "Inspiração em Combate", description: "Uma criatura com seu dado de Inspiração Bárdica pode rolá-lo para somar ao dano de um ataque com arma que acertar, ou usar sua reação para rolar o dado e somar à própria CA contra um ataque que a atingiria." }
        ],
        6: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque no seu turno." }],
        14: [{ name: "Magia de Batalha", description: "Quando usar sua ação para conjurar uma magia de bardo, você pode realizar um ataque com arma como ação bônus." }]
      }
    },
    "Colégio da Criação": {
      description: "Bardos deste colégio canalizam a Canção da Criação primordial, infundindo potencial em seus aliados através de notas mágicas flutuantes, criando objetos do nada e animando itens inanimados para dançar e lutar.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [
          { name: "Partícula de Potencial", description: "Ao dar Inspiração Bárdica, cria uma partícula flutuante. Quando gasta, concede benefício extra: Teste (rola d20 extra e escolhe), Ataque (causa dano trovejante em área igual ao número rolado se falharem no save de Con), ou Salvaguarda (concede PV temporários igual ao número rolado + mod. Car)." },
          { name: "Execução da Criação", description: "Com uma ação, cria um item não-mágico Médio ou menor a até 3m (valor máximo = 20x nível de bardo). Dura horas igual à proficiência. Pode ter apenas 1 por vez. Recupera com descanso longo ou slot de 2º+." }
        ],
        6: [{ name: "Espetáculo Animado", description: "Com uma ação, anima um item não-mágico Grande ou menor a até 9m (Item Dançante). Ele dura 1 hora, age após seu turno com ação bônus, e pode alterar o deslocamento de criaturas próximas em 3m." }],
        14: [{ name: "Crescendo Criativo", description: "Sua Execução da Criação pode criar múltiplos itens por vez (igual ao mod. Carisma, mínimo 2). Apenas um pode ser do tamanho máximo. Remove o limite de valor em ouro dos itens." }]
      }
    },
    "Colégio da Eloquência": {
      description: "Mestres da oratória e persuasão lógica, estes bardos dominam jogos de palavras teatrais para converter céticos, desestabilizar a autoconfiança de oponentes e inspirar seus aliados a nunca desistirem diante de uma falha.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [
          { name: "Língua Prateada", description: "Ao realizar teste de Carisma (Persuasão ou Enganação), trata um resultado de 9 ou menos no d20 como 10." },
          { name: "Palavras Desconcertantes", description: "Como ação bônus, gasta 1 Inspiração Bárdica para fazer criatura a até 18m subtrair o dado rolado na próxima salvaguarda antes do seu próximo turno." }
        ],
        6: [
          { name: "Inspiração Infalível", description: "Se um aliado rolar seu dado de Inspiração Bárdica em teste, ataque ou salvaguarda e falhar, o dado não é perdido e retorna para o aliado." },
          { name: "Língua Universal", description: "Como ação, permite que até Car modificadores de criaturas a até 18m entendam perfeitamente sua fala por 1 hora, independente do idioma (1x/descanso longo ou com espaço de magia)." }
        ],
        14: [{ name: "Inspiração Contagiante", description: "Quando um aliado usa Inspiração Bárdica com sucesso, use sua reação para inspirar outra criatura a até 18m sem gastar seus usos normais (Carisma vezes/descanso longo)." }]
      }
    }
  },
  'Clérigo': {
    "Domínio do Conhecimento": {
      description: "Devotos de deuses da sabedoria, clérigos deste domínio buscam a verdade em mistérios antigos, usando poderes divinos para ler pensamentos, dominar perícias instantaneamente e acessar segredos ocultos.",
      spells: ["Comando", "Identificação", "Augúrio", "Sugestão", "Dificultar Detecção", "Falar com os Mortos", "Olho Arcano", "Confusão", "Conhecimento Lendário", "Vidência"],
      features: {
        1: [
          { name: "Bênçãos do Conhecimento", description: "Você aprende dois idiomas à sua escolha e ganha proficiência em duas perícias entre Arcanismo, História, Natureza ou Religião. Seu bônus de proficiência é dobrado para qualquer teste de habilidade que fizer com elas." }
        ],
        2: [{ name: "Canalizar Divindade: Conhecimento das Eras", description: "Com uma ação, você escolhe uma perícia ou ferramenta e ganha proficiência nela por 10 minutos." }],
        6: [{ name: "Canalizar Divindade: Ler Pensamentos", description: "Com uma ação, lê os pensamentos superficiais de uma criatura a até 18 metros (teste de resistência de Sabedoria). Se ela falhar, você também pode conjurar Sugestão nela sem gastar espaço de magia." }],
        8: [{ name: "Conjuração Poderosa", description: "Você adiciona seu modificador de Sabedoria ao dano causado por qualquer truque de clérigo." }],
        17: [{ name: "Visões do Passado", description: "Após meditar por 1 minuto, você pode ter visões de eventos passados relacionados a um objeto que esteja segurando ou ao ambiente ao seu redor (até 15 metros)." }]
      }
    },
    "Domínio da Enganação": {
      description: "Seguidores de divindades trapaceiras e caóticas, estes clérigos manipulam a realidade através de ilusões perfeitas, duplicatas e furtividade divina para enganar seus oponentes.",
      spells: ["Enfeitiçar Pessoa", "Disfarçar-se", "Reflexos", "Passos sem Pegadas", "Piscar", "Dissipar Magia", "Porta Dimensional", "Metamorfose", "Dominar Pessoa", "Modificar Memória"],
      features: {
        1: [{ name: "Bênção do Trapaceiro", description: "Com uma ação, você toca uma criatura voluntária (exceto você mesmo) para conceder vantagem em testes de Destreza (Furtividade) por 1 hora." }],
        2: [{ name: "Canalizar Divindade: Invocar Duplicidade", description: "Com uma ação, cria uma duplicata ilusória perfeita de si mesmo por 1 minuto (concentração). Você pode conjurar magias como se estivesse no espaço dela e ganha vantagem em ataques se você e a duplicata estiverem a até 1,5 metro do alvo." }],
        6: [{ name: "Canalizar Divindade: Manto de Sombras", description: "Com uma ação, você fica invisível até o final do seu próximo turno. A invisibilidade termina antes se você atacar ou conjurar uma magia." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, quando acertar um ataque com arma, você causa 1d8 de dano de veneno extra (aumenta para 2d8 no 14º nível)." }],
        17: [{ name: "Duplicidade Aprimorada", description: "Você pode criar até quatro duplicatas de si mesmo com Invocar Duplicidade e mover todas elas até 9 metros com uma única ação bônus." }]
      }
    },
    "Domínio da Guerra": {
      description: "Guerreiros sagrados que canalizam o poder de divindades do combate, eles lideram exércitos infundindo suas armas com força divina, aumentando sua precisão e atacando com velocidade implacável.",
      spells: ["Auxílio Divino", "Escudo da Fé", "Arma Mágica", "Arma Espiritual", "Manto do Cruzado", "Espíritos Guardiões", "Movimentação Livre", "Pele de Pedra", "Coluna de Chamas", "Imobilizar Monstro"],
      features: {
        1: [
          { name: "Proficiência Adicional", description: "Você ganha proficiência com armas marciais e armaduras pesadas." },
          { name: "Sacerdote da Guerra", description: "Quando usar a ação de Ataque, você pode fazer um ataque com arma como ação bônus. Pode usar este recurso um número de vezes igual ao seu modificador de Sabedoria (mínimo 1) por descanso longo." }
        ],
        2: [{ name: "Canalizar Divindade: Ataque Dirigido", description: "Quando fizer uma jogada de ataque, você pode usar Canalizar Divindade para ganhar +10 de bônus na jogada (pode decidir após ver o resultado do dado)." }],
        6: [{ name: "Canalizar Divindade: Bênção do Deus da Guerra", description: "Quando um aliado a até 9 metros fizer uma jogada de ataque, você pode usar sua reação para conceder +10 de bônus nessa jogada." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, quando acertar um ataque com arma, você causa 1d8 de dano extra do mesmo tipo da arma (aumenta para 2d8 no 14º nível)." }],
        17: [{ name: "Avatar da Batalha", description: "Você ganha resistência a dano de concussão, cortante e perfurante de ataques não-mágicos." }]
      }
    },
    "Domínio da Luz": {
      description: "Portadores do fogo purificador e da radiação solar, estes clérigos dispersam as trevas com magias de fogo devastadoras e protegem seus aliados cegando temporariamente seus inimigos.",
      spells: ["Mãos Flamejantes", "Fogo das Fadas", "Esfera Flamejante", "Raio Ardente", "Luz do Dia", "Bola de Fogo", "Guardião da Fé", "Muralha de Fogo", "Coluna de Chamas", "Vidência"],
      features: {
        1: [
          { name: "Truque Adicional", description: "Você aprende o truque Luz, se ainda não o conhecer." },
          { name: "Labareda Protetora", description: "Quando uma criatura a até 9 metros que você possa ver atacá-lo, você pode usar sua reação para impor desvantagem na jogada de ataque (usos iguais ao modificador de Sabedoria por descanso longo)." }
        ],
        2: [{ name: "Canalizar Divindade: Radiação do Amanhecer", description: "Com uma ação, dissipa qualquer escuridão mágica a até 9 metros e cada criatura hostil na área deve fazer um teste de resistência de Constituição, sofrendo 2d10 + nível de clérigo de dano radiante (ou metade se passar)." }],
        6: [{ name: "Labareda Aprimorada", description: "Você também pode usar sua Labareda Protetora quando uma criatura a até 9 metros atacar um aliado seu." }],
        8: [{ name: "Conjuração Poderosa", description: "Você adiciona seu modificador de Sabedoria ao dano causado por qualquer truque de clérigo." }],
        17: [{ name: "Coroa de Luz", description: "Com uma ação, você emite luz solar plena por 1 minuto (18 metros). Inimigos na luz têm desvantagem em testes de resistência contra magias que causem dano de fogo ou radiante." }]
      }
    },
    "Domínio da Natureza": {
      description: "Protetores das florestas e da vida selvagem, estes clérigos comandam as forças elementais da natureza, controlando animais e plantas em nome de suas divindades.",
      spells: ["Amizade Animal", "Falar com Animais", "Pele de Árvore", "Crescer Espinhos", "Ampliar Plantas", "Muralha de Vento", "Dominar Besta", "Vinha Esmagadora", "Praga de Insetos", "Caminhar em Árvores"],
      features: {
        1: [
          { name: "Acólito da Natureza", description: "Você aprende um truque de druida à sua escolha e ganha proficiência em uma perícia entre Adestrar Animais, Natureza ou Sobrevivência." },
          { name: "Proficiência Adicional", description: "Você ganha proficiência com armaduras pesadas." }
        ],
        2: [{ name: "Canalizar Divindade: Enfeitiçar Animais e Plantas", description: "Com uma ação, cada besta ou planta a até 9 metros que possa vê-lo deve fazer um teste de resistência de Sabedoria ou ficará enfeitiçada por você por 1 minuto (ou até sofrer dano)." }],
        6: [{ name: "Amortecer Elementos", description: "Quando você ou uma criatura a até 9 metros sofrer dano de ácido, frio, fogo, elétrico ou trovão, você pode usar sua reação para conceder resistência a esse tipo de dano contra o ataque." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, quando acertar um ataque com arma, você causa 1d8 de dano extra de frio, fogo ou elétrico à sua escolha (aumenta para 2d8 no 14º nível)." }],
        17: [{ name: "Senhor da Natureza", description: "Enquanto criaturas estiverem enfeitiçadas por seu Canalizar Divindade, você pode usar uma ação bônus no seu turno para comandar verbalmente o que cada uma fará no próximo turno dela." }]
      }
    },
    "Domínio da Tempestade": {
      description: "Canais vivos do trovão e do relâmpago, estes clérigos manifestam a fúria da tormenta para repelir agressores e desferir golpes elétricos com poder destrutivo máximo.",
      spells: ["Névoa Obscurecente", "Onda Trovejante", "Lufada de Vento", "Despedaçar", "Convocar Relâmpagos", "Nevasca", "Controlar a Água", "Tempestade de Gelo", "Onda Destrutiva", "Praga de Insetos"],
      features: {
        1: [
          { name: "Proficiência Adicional", description: "Você ganha proficiência com armas marciais e armaduras pesadas." },
          { name: "Ira da Tormenta", description: "Quando uma criatura a até 1,5 metro que você possa ver acertar você com um ataque, você pode usar sua reação para fazê-la fazer um teste de resistência de Destreza, sofrendo 2d8 de dano elétrico ou de trovão (metade se passar). Usos iguais ao modificador de Sabedoria por descanso longo." }
        ],
        2: [{ name: "Canalizar Divindade: Ira Destruidora", description: "Quando rolar dano elétrico ou de trovão, você pode usar Canalizar Divindade para causar o dano máximo possível em vez de rolar os dados." }],
        6: [{ name: "Golpe de Relâmpago", description: "Quando causar dano elétrico a uma criatura Grande ou menor, você pode empurrá-la até 3 metros para longe de você." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, quando acertar um ataque com arma, você causa 1d8 de dano de trovão extra (aumenta para 2d8 no 14º nível)." }],
        17: [{ name: "Filho da Tormenta", description: "Você ganha deslocamento de voo igual ao seu deslocamento de caminhada atual sempre que não estiver no subsolo ou em ambientes fechados." }]
      }
    },
    "Domínio da Vida": {
      description: "Os curadores mais renomados de D&D, clérigos deste domínio canalizam ondas de energia positiva pura para restaurar a vitalidade dos aliados e trazer os caídos de volta ao combate. Concede proficiência com armaduras pesadas.",
      spells: ["Bênção", "Curar Ferimentos", "Restauração Menor", "Arma Espiritual", "Sinal de Esperança", "Revivificar", "Proteção Contra a Morte", "Guardião da Fé", "Curar Ferimentos em Massa", "Reviver os Mortos"],
      features: {
        1: [
          { name: "Proficiência Adicional", description: "Você ganha proficiência com armaduras pesadas." },
          { name: "Discípulo da Vida", description: "Sempre que usar uma magia de 1º nível ou superior para restaurar Pontos de Vida de uma criatura, ela recupera Pontos de Vida adicionais iguais a 2 + o nível da magia." }
        ],
        2: [{ name: "Canalizar Divindade: Preservar a Vida", description: "Com uma ação, você restaura até 5 × seu nível de clérigo em Pontos de Vida, divididos como quiser entre criaturas a até 9 metros. Essa cura não pode elevar os PV de uma criatura acima da metade do máximo dela." }],
        6: [{ name: "Curandeiro Abençoado", description: "Quando conjurar uma magia de cura de 1º nível ou superior que restaure PV de outra criatura, você também recupera Pontos de Vida iguais a 2 + o nível da magia." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, quando acertar um ataque com arma, você causa 1d8 de dano radiante extra (aumenta para 2d8 no 14º nível)." }],
        17: [{ name: "Cura Suprema", description: "Quando normalmente rolaria um ou mais dados para restaurar Pontos de Vida com uma magia, você usa o valor máximo possível de cada dado em vez de rolar." }]
      }
    },
    "Domínio da Ordem": {
      description: "Representando a disciplina e a obediência às leis legítimas que protegem a sociedade do caos, estes clérigos ordenam seus aliados no campo de batalha e compelem a obediência de seus oponentes.",
      source: "Tasha's Cauldron of Everything",
      spells: ["Comando", "Heroísmo", "Imobilizar Pessoa", "Zona da Verdade", "Palavra Curativa em Massa", "Lentidão", "Localizar Criatura", "Compulsão", "Comunhão", "Dominar Pessoa"],
      features: {
        1: [
          { name: "Proficiência Bônus", description: "Proficiência com armaduras pesadas e na perícia de Intimidação ou Persuasão." },
          { name: "Voz de Autoridade", description: "Se conjurar magia de 1º círculo+ tendo um aliado como alvo, esse aliado pode usar a reação para realizar um ataque com arma contra criatura em seu campo de visão." }
        ],
        2: [{ name: "Canalizar Divindade: Demanda da Ordem", description: "Como ação, exibe símbolo sagrado. Criaturas a até 9m devem passar em TR de Sabedoria ou ficam enfeitiçadas até o fim do seu próximo turno (ou sofrer dano). Pode faz-las soltarem o que seguram." }],
        6: [{ name: "Personificação da Lei", description: "Se conjurar magia de encantamento de 1º círculo+ com tempo de 1 ação, pode mudar o tempo para ação bônus (Sabedoria vezes/descanso longo)." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, causa 1d8 (2d8 no nível 14) de dano psíquico extra com ataques armados." }],
        17: [{ name: "Ira da Ordem", description: "Ao causar dano de Golpe Divino, amaldiçoa criatura até seu próximo turno. O próximo ataque de aliado nela causará 2d8 de dano psíquico extra e encerra a maldição." }]
      }
    },
    "Domínio da Paz": {
      description: "Buscando mediar disputas e criar pontes de paz, estes clérigos vinculam misticamente a vida e a dor de seus aliados, permitindo que absorvam golpes uns pelos outros e ajam em perfeita harmonia.",
      source: "Tasha's Cauldron of Everything",
      spells: ["Heroísmo", "Santuário", "Auxílio", "Vínculo de Proteção", "Remeter", "Sinal de Esperança", "Aura de Pureza", "Esfera Resiliente de Otiluke", "Restauração Maior", "Ligação Telepática de Rary"],
      features: {
        1: [
          { name: "Implemento da Paz", description: "Ganha proficiência em Atuação, Intuição ou Persuasão." },
          { name: "Vínculo Encorajador", description: "Como ação, vincula número de criaturas voluntárias a até 9m igual ao seu bônus de proficiência por 10 min. A até 9m uma da outra, somam 1d4 a uma jogada de ataque, teste ou TR por turno." }
        ],
        2: [{ name: "Canalizar Divindade: Bálsamo da Paz", description: "Como ação, move seu deslocamento sem provocar AdO. Ao passar a 1,5m de criaturas, cura 2d6 + mod. Sabedoria (1x por criatura)." }],
        6: [{ name: "Vínculo de Proteção", description: "Quando criatura vinculada por Vínculo Encorajador toma dano, outra a até 9m pode usar reação para se teleportar a até 1,5m dela e sofrer todo o dano em seu lugar." }],
        8: [{ name: "Conjuração Poderosa", description: "Adiciona modificador de Sabedoria ao dano de seus truques de clérigo." }],
        17: [{ name: "Vínculo Expandido", description: "O alcance dos seus vínculos aumenta para 18m. A criatura que usa a reação para receber o dano de outra passa a ter resistência a esse dano." }]
      }
    },
    "Domínio do Crepúsculo": {
      description: "Guardiões da transição suave do dia para a noite, estes clérigos defendem os necessitados dos horrores da escuridão profunda, preenchendo-os com vitalidade e cobrindo-os com o Santuário Crepuscular.",
      source: "Tasha's Cauldron of Everything",
      spells: ["Fogo das Fadas", "Sono", "Raio Lunar", "Ver o Invisível", "Aura de Vitalidade", "Pequena Cabana de Leomund", "Aura de Devoção", "Invisibilidade Maior", "Círculo de Poder", "Despistar"],
      features: {
        1: [
          { name: "Proficiência Bônus", description: "Ganha proficiência com armas marciais e armaduras pesadas." },
          { name: "Olhos da Noite", description: "Visão no escuro de 90 metros. Pode compartilhar essa visão com criaturas a até 3m (até mod. Sabedoria, mínimo 1) por 1 hora (1x/descanso longo ou com espaço de magia)." },
          { name: "Bênção da Vigilância", description: "Como ação, toca criatura para dar vantagem no próximo teste de iniciativa." }
        ],
        2: [{ name: "Canalizar Divindade: Santuário Crepuscular", description: "Cria esfera de penumbra de 9m centrada em você por 1 min. Criaturas que terminam o turno nela ganham 1d6 + nível de clérigo de PV temporários ou encerram um efeito de amedrontado/enfeitiçado." }],
        6: [{ name: "Passos da Noite", description: "Em penumbra ou escuridão, ganha voo igual ao deslocamento terrestre por 1 minuto como ação bônus (usos igual a Prof/descanso longo)." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, causa 1d8 (2d8 no nível 14) de dano radiante extra com ataques armados." }],
        17: [{ name: "Mortalha Crepuscular", description: "Sua esfera de Santuário Crepuscular agora concede cobertura média (+2 na CA e TR de Destreza) para seus aliados dentro dela." }]
      }
    }
  },
  'Guerreiro': {
    "Campeão": {
      description: "Focados na perfeição atlética pura e na maestria no combate físico, guerreiros campeões desferem golpes críticos com frequência assustadora e possuem uma resistência física inigualável.",
      features: {
        3: [{ name: "Crítico Aprimorado", description: "Suas jogadas de ataque com arma acertam um golpe crítico com um resultado de 19 ou 20 no d20." }],
        7: [{ name: "Atleta Extraordinário", description: "Você soma metade do seu bônus de proficiência (arredondado para cima) a qualquer teste de Força, Destreza ou Constituição que fizer e que ainda não use sua proficiência. Além disso, sua distância de salto em distância aumenta em um número de metros igual ao seu modificador de Força × 0,3 m (1 pé por ponto)." }],
        10: [{ name: "Estilo de Luta Adicional", description: "Você pode escolher uma segunda opção da característica Estilo de Luta da classe Guerreiro." }],
        15: [{ name: "Crítico Superior", description: "Suas jogadas de ataque com arma acertam um golpe crítico com um resultado de 18, 19 ou 20 no d20." }],
        18: [{ name: "Sobrevivente", description: "No início de cada um dos seus turnos, você recupera Pontos de Vida iguais a 5 + seu modificador de Constituição se não estiver com mais da metade dos seus Pontos de Vida máximos (e tiver pelo menos 1 PV)." }]
      }
    },
    "Cavaleiro Arcano": {
      description: "Guerreiros táticos que complementam suas proezas físicas com a conjuração de magias de abjuração e evocação, fundindo aço e feitiçaria no campo de batalha.",
      features: {
        3: [
          { name: "Conjuração", description: "Você aprende truques e magias da lista de Mago (focando em Abjuração e Evocação). Sua habilidade de conjuração é Inteligência. Seus testes de resistência contra magias usam CD = 8 + Bônus Profa. + Mod. Int." },
          { name: "Vínculo com Arma", description: "Realiza ritual de 1 hora para se vincular a até 2 armas. Você não pode ser desarmado delas (a menos que esteja incapacitado) e pode invocá-las para sua mão com uma Ação Bônus." }
        ],
        7: [{ name: "Magia de Guerra", description: "Quando você usa sua ação para conjurar um Truque (cantrip), você pode realizar um ataque com arma como uma Ação Bônus." }],
        10: [{ name: "Golpe Místico", description: "Quando você atinge uma criatura com um ataque de arma, ela tem desvantagem na próxima salvaguarda (Saving Throw) contra uma magia que você conjurar antes do final do seu próximo turno." }],
        15: [{ name: "Investida Arcana", description: "Ao usar seu Surto de Ação (Action Surge), você pode se teletransportar até 9 metros (30 feet) para um espaço não ocupado visível (antes ou depois da ação adicional)." }],
        18: [{ name: "Magia de Guerra Aprimorada", description: "Quando você usa sua ação para conjurar uma magia de 1º nível ou superior, você pode realizar um ataque com arma como uma Ação Bônus." }]
      }
    },
    "Mestre de Batalha": {
      description: "Estudiosos da arte da guerra, estes guerreiros utilizam manobras táticas e dados de superioridade para controlar o posicionamento dos inimigos e ditar o ritmo do combate.",
      features: {
        3: [
          { name: "Superioridade em Combate", description: "Ganha 4 dados de superioridade (d8) para alimentar suas manobras.\n\nManobras (PHB 2014):\n• Aparar: Usa Reação para reduzir dano sofrido\n• Ameaçador: Causa medo no inimigo\n• Derrubar: Derruba o inimigo no chão\n• Precisão: Soma o d8 ao teste de ataque\n• Contra-Ataque: Usa Reação para atacar se o inimigo errar\n• Empurrão: Empurra o alvo até 4,5 metros\n• Distrativo: Dá vantagem para o ataque de um aliado\n• Provocativo: Força o inimigo a te focar\n• Desarmante: Faz o inimigo derrubar o que segura\n• Varredura: Causa dano a um segundo alvo a 1,5m\n• Evasivo: Soma o d8 à sua CA ao se mover\n• Comandante: Aliado ataca usando a Reação dele\n• Incentivar: Concede PV temporários a um aliado\n• Manobra: Move um aliado sem provocar Oportunidade\n• Prolongado: Aumenta alcance do ataque em 1,5m" },
          { name: "Estudioso da Guerra", description: "Ganha proficiência com um tipo de ferramenta de artesão." }
        ],
        7: [{ name: "Conheça Seu Inimigo", description: "Se passar pelo menos 1 minuto observando ou interagindo com outra criatura fora de combate, você descobre informações sobre as capacidades dela comparadas às suas (Força, Destreza, Constituição, CA, PV atuais, níveis de classe ou níveis de guerreiro)." }],
        10: [{ name: "Superioridade em Combate Aprimorada", description: "Seus dados de superioridade se tornam d10s." }],
        15: [{ name: "Implacável", description: "Quando você rolar iniciativa e não tiver nenhum dado de superioridade restante, você recupera 1 dado de superioridade." }],
        18: [{ name: "Superioridade em Combate Aprimorada (d12)", description: "Seus dados de superioridade se tornam d12s." }]
      }
    },
    "Guerreiro Psiônico": {
      description: "Desperto para o poder mental dentro de si, um Guerreiro Psiônico é um guerreiro que aumenta seu poder físico com golpes de arma infundidos por energia psíquica, chicotadas telecinéticas e barreiras de força mental.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [{ name: "Poder Psíquico", description: "Possui dados de Energia Psíquica (d6, quantidade = 2× bônus de proficiência). Poderes: Campo Protetor (reação: reduz dano = dado + mod. Int), Golpe Psiônico (1×/turno ao acertar: dano de energia extra = dado + mod. Int), Movimento Telecinético (ação: move objeto Grande ou menor ou criatura voluntária 9m; 1×/descanso curto ou gasta dado). O dado sobe para d8 (5º), d10 (11º), d12 (17º). Ação bônus recupera 1 dado (1×/descanso curto)." }],
        7: [
          { name: "Adepto Telecinético — Salto", description: "Ação bônus: voo = 2× deslocamento até fim do turno. 1×/descanso curto ou gasta dado de Energia Psíquica." },
          { name: "Adepto Telecinético — Empurrão", description: "Ao causar dano com Golpe Psiônico, force save de Força (CD 8+Prof+Int): falha = alvo é derrubado ou movido até 3m horizontalmente." }
        ],
        10: [{ name: "Mente Protegida", description: "Resistência a dano psíquico. No início do turno, se estiver amedrontado ou enfeitiçado, pode gastar um dado de Energia Psíquica para encerrar esses efeitos." }],
        15: [{ name: "Baluarte Telecinético", description: "Ação bônus: escolha até mod. Int criaturas (mín. 1) a até 9m. Cada uma ganha meia cobertura por 1 min. 1×/descanso curto ou gasta dado." }],
        18: [{ name: "Mestre Telecinético", description: "Conjura Telecinese sem componentes (Int como atributo). Enquanto concentrado, pode atacar com arma como ação bônus. 1×/descanso longo ou gasta dado de Energia Psíquica." }]
      }
    },
    "Cavaleiro Rúnico": {
      description: "Cavaleiros Rúnicos aprimoram sua proeza marcial utilizando o poder sobrenatural das runas, uma prática ancestral que se originou com os gigantes. Entalhadores de runas podem ser encontrados entre todas as famílias de gigantes.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [
          { name: "Proficiências Bônus", description: "Ganha proficiência com ferramentas de artesão. Aprende a falar, ler e escrever Gigante." },
          { name: "Entalhador de Runas", description: "Aprende 2 runas (3 no 7º, 4 no 10º, 5 no 15º). Grava runas em armas/armaduras/escudos após descanso longo. CD = 8+Prof+Con. Runas disponíveis: Nuvem (vantagem em Prestidigitação/Enganação + redirecionar ataque), Fogo (dobra Prof. em ferramentas + grilhões 2d6 fogo), Gelo (vantagem em Animais/Intimidação + +2 em testes de For/Con), Pedra (vantagem em Intuição + visão no escuro 36m + enfeitiçar), Colina (7º+: resistência a veneno + resistência a dano físico), Tempestade (7º+: vantagem em Arcanismo + não pode ser surpreendido + dar vantagem/desvantagem em rolagens)." },
          { name: "Poderio Gigante", description: "Ação bônus: torna-se Grande por 1 min, vantagem em testes/saves de Força, +1d6 de dano extra 1×/turno. Usos: bônus de proficiência/descanso longo." }
        ],
        7: [{ name: "Escudo Rúnico", description: "Quando criatura a até 18m que você possa ver for atingida por ataque, use reação para forçar o atacante a rolar novamente o d20 (fica com novo resultado). Usos: bônus de proficiência/descanso longo." }],
        10: [{ name: "Grande Estatura", description: "Cresce permanentemente (3d4 × 2,5 cm). O dano extra do Poderio Gigante aumenta para 1d8." }],
        15: [{ name: "Mestre das Runas", description: "Pode invocar cada runa duas vezes em vez de uma. Recupera usos com descanso curto ou longo." }],
        18: [{ name: "Colosso Rúnico", description: "O dano extra do Poderio Gigante aumenta para 1d10. Ao usar Poderio Gigante, pode crescer para Enorme (alcance +1,5m)." }]
      }
    }
  },
  'Ladino': {
    "Assassino": {
      description: "Especialistas em mortes rápidas e furtivas, ladinos assassinos eliminam alvos prioritários antes mesmo do início das hostilidades usando disfarces, venenos e ataques surpresa letais.",
      features: {
        3: [
          { name: "Proficiências Adicionais", description: "Você ganha proficiência com o kit de disfarce e o kit de venenos." },
          { name: "Assassinar", description: "Você tem vantagem nas jogadas de ataque contra qualquer criatura que ainda não tenha agido no combate. Além disso, qualquer acerto contra uma criatura que esteja surpresa é automaticamente um golpe crítico." }
        ],
        9: [{ name: "Especialização em Infiltração", description: "Você pode criar identidades falsas infalíveis (com documentos, história e conhecidos) gastando 7 dias de trabalho e 25 peças de ouro." }],
        13: [{ name: "Impostor", description: "Após estudar a fala, escrita e comportamento de outra pessoa por pelo menos 3 horas, você consegue imitá-la de forma indiscernível para observadores comuns." }],
        17: [{ name: "Golpe Letal", description: "Quando atingir uma criatura que esteja surpresa, ela deve fazer um teste de resistência de Constituição (CD 8 + Modificador de Destreza + Bônus de Proficiência). Se falhar, o dano do seu ataque contra ela é dobrado." }]
      }
    },
    "Ladrão": {
      description: "Focados na agilidade extrema, ladinos ladrões utilizam de forma rápida fechaduras e dispositivos mágicos, escalando superfícies sem esforço para se infiltrar em qualquer lugar.",
      features: {
        3: [
          { name: "Mãos Rápidas", description: "Você pode usar a ação bônus concedida pela Ação Ardilosa para fazer um teste de Destreza (Prestidigitação), usar ferramentas de ladrão para desarmar armadilhas ou abrir fechaduras, ou usar a ação Usar um Objeto." },
          { name: "Andarilho de Telhados", description: "Escalar não custa movimento adicional para você. Além disso, quando faz um salto em distância com corrida, a distância que você cobre aumenta em um número de metros igual ao seu modificador de Destreza × 0,3 m (1 pé por ponto)." }
        ],
        9: [{ name: "Furtividade Suprema", description: "Você tem vantagem em testes de Destreza (Furtividade) se não se mover mais do que metade do seu deslocamento no mesmo turno." }],
        13: [{ name: "Usar Instrumento Mágico", description: "Você ignora todos os requisitos de classe, raça e nível para o uso de qualquer item mágico." }],
        17: [{ name: "Reflexos de Ladrão", description: "Você pode realizar dois turnos durante a primeira rodada de qualquer combate: o primeiro na sua iniciativa normal e o segundo na sua iniciativa menos 10 (não funciona se estiver surpreso)." }]
      }
    },
    "Trapaceiro Arcano": {
      description: "Ladinos astutos que usam a magia de ilusão e encantamento para confundir guardas, roubar à distância usando Mãos Mágicas invisíveis e realizar furtos impossíveis.",
      features: {
        3: [
          { name: "Conjuração", description: "Você aprende truques e magias da lista de Mago (focando em Encantamento e Ilusão) usando Inteligência como atributo de conjuração (CD 8 + Bônus de Proficiência + Modificador de Inteligência)." },
          { name: "Mãos Mágicas Malabaristas", description: "Quando você conjura Mãos Mágicas, a mão espectral fica invisível e pode guardar ou retirar objetos de recipientes carregados por outras criaturas, além de usar ferramentas de ladrão para abrir fechaduras e desarmar armadilhas à distância." }
        ],
        9: [{ name: "Emboscada Mágica", description: "Se você estiver escondido de uma criatura quando conjurar uma magia nela, a criatura tem desvantagem em qualquer teste de resistência contra essa magia neste turno." }],
        13: [{ name: "Trapaceiro Versátil", description: "Com uma ação bônus, você pode distrair uma criatura a até 1,5 metro da sua Mão Mágica, concedendo a si mesmo vantagem nas jogadas de ataque contra ela até o fim do turno." }],
        17: [{ name: "Ladrão de Magia", description: "Quando uma criatura conjurar uma magia que tenha você como alvo ou o inclua na área de efeito, você pode usar sua reação para forçá-la a fazer um teste de resistência (CD da sua magia). Se falhar, você anula o efeito contra si e rouba o conhecimento da magia por 8 horas (1× por descanso longo)." }]
      }
    },
    "Fantasma": {
      description: "Enquanto se aventurando na linha tênue entre a vida e a morte, alguns ladinos descobrem uma conexão mística com a própria morte. Esses ladinos tomam conhecimento da morte e tornam-se imersos em energia negativa, eventualmente transformando-se em algo próximo a fantasmas.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [
          { name: "Sussurros da Morte", description: "Ao fim de um descanso curto ou longo, escolha uma proficiência com ferramenta ou perícia que não possua e adquira-a temporariamente (uma presença fantasma compartilha seu conhecimento). Perde ao escolher outra." },
          { name: "Lamentos da Sepultura", description: "Após causar dano com Ataque Furtivo, pode focar uma segunda criatura a até 9m da primeira. Role metade dos dados de Ataque Furtivo (arredondado para cima): a segunda criatura sofre dano necrótico igual ao total. Usos: bônus de proficiência/descanso longo." }
        ],
        9: [{ name: "Símbolos dos Mortos", description: "Reação quando criatura a até 9m morre: cria um berloque da alma (máximo = bônus de proficiência). Com berloque: vantagem em saves de Constituição e testes de morte. Pode destruir um berloque para: usar Lamentos da Sepultura sem gastar uso, ou fazer uma pergunta ao espírito associado (ação)." }],
        13: [{ name: "Passo Fantasma", description: "Ação bônus: assume forma espectral por 10 min. Ganha voo de 3m, pode planar, ataques contra você têm desvantagem. Pode mover-se através de criaturas/objetos (1d10 de dano de energia se terminar dentro). 1×/descanso longo ou destrua um berloque da alma." }],
        17: [{ name: "Amigo da Morte", description: "Ao usar Lamentos da Sepultura, pode causar dano necrótico tanto na primeira quanto na segunda criatura. Ao fim de um descanso longo, um berloque da alma aparece em sua mão se não tiver nenhum." }]
      }
    },
    "Alma Laminada": {
      description: "Uma Alma Laminada golpeia e se infiltra com a mente, cortando através de barreiras tanto físicas quanto psíquicas. Esses ladinos descobriram o poder psiônico dentro de si mesmos e canalizam isso em seu serviço ladinesco, manifestando lâminas de energia psíquica.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [
          { name: "Poder Psíquico", description: "Possui dados de Energia Psíquica (d6, quantidade = 2× bônus de proficiência). Poderes: Auxílio Psiônico (ao falhar teste com proficiência, adiciona dado ao resultado; gasta só se acertar), Sussurros Psíquicos (ação: telepatia com até Prof. criaturas por horas = dado; 1,5km de alcance; 1×/descanso longo grátis). O dado sobe para d8 (5º), d10 (11º), d12 (17º)." },
          { name: "Lâminas Psíquicas", description: "Ao atacar, manifesta lâmina psíquica na mão livre (arma simples corpo a corpo, acuidade, arremesso 18m). Causa 1d6 + mod. de dano psíquico. Desaparece após o ataque. Pode atacar com segunda lâmina como ação bônus (1d4 de dano)." }
        ],
        9: [
          { name: "Lâminas da Alma — Golpe Teleguiado", description: "Se errar ataque com Lâmina Psíquica, role dado de Energia Psíquica e adicione ao resultado. Gasta dado apenas se acertar." },
          { name: "Lâminas da Alma — Teletransporte Psíquico", description: "Ação bônus: gaste e role dado de Energia Psíquica. Teleporte-se para espaço desocupado visível a até 3× resultado em metros." }
        ],
        13: [{ name: "Véu Psíquico", description: "Ação bônus: torna-se invisível junto com o que veste/carrega por 1 hora ou até causar dano/forçar save. 1×/descanso longo ou gaste dado de Energia Psíquica." }],
        17: [{ name: "Lâmina Dilacerante", description: "Ao acertar com Lâmina Psíquica em Ataque Furtivo, force save de Sabedoria (CD 8+Prof+Des): falha = atordoado por 1 min (repete save no fim de cada turno). 1×/descanso longo ou gaste 3 dados de Energia Psíquica." }]
      }
    }
  },
  'Feiticeiro': {
    "Linhagem Dracônica": {
      description: "Carregando o sangue ou as escamas de dragões em suas veias, feiticeiros dracônicos manifestam asas, uma pele blindada e um poder elemental destrutivo herdado de seus ancestrais.",
      features: {
        1: [
          { name: "Ancestral Dracônico", description: "Você escolhe um tipo de dragão como seu ancestral (define o tipo de dano elemental). Você pode falar, ler e escrever em Dracônico, e seu bônus de proficiência é dobrado em testes de Carisma ao interagir com dragões." },
          { name: "Resiliência Dracônica", description: "Seu máximo de Pontos de Vida aumenta em 1 por nível de feiticeiro. Quando não estiver usando armadura, sua Classe de Armadura (CA) é igual a 13 + seu modificador de Destreza." }
        ],
        6: [{ name: "Afinidade Elemental", description: "Quando conjurar uma magia que cause dano do mesmo tipo do seu ancestral dracônico, você soma seu modificador de Carisma a uma rolagem de dano dessa magia. Além disso, pode gastar 1 ponto de feitiçaria para ganhar resistência a esse tipo de dano por 1 hora." }],
        14: [{ name: "Asas de Dragão", description: "Com uma ação bônus, você manifesta um par de asas de dragão nas costas, ganhando deslocamento de voo igual ao seu deslocamento atual até dissipá-las (como ação bônus) ou ficar inconsciente." }],
        18: [{ name: "Presença Dracônica", description: "Com uma ação, você gasta 5 pontos de feitiçaria para exalar uma aura de admiração ou medo em um raio de 18 metros por 1 minuto (concentração). Criaturas hostis na área devem passar em um teste de resistência de Sabedoria ou ficam enfeitiçadas (admiração) ou amedrontadas (medo)." }]
      }
    },
    "Magia Selvagem": {
      description: "Canais do caos puro e do acaso, feiticeiros de magia selvagem manipulam as probabilidades da realidade em troca de surtos de magia instáveis e imprevisíveis.",
      features: {
        1: [
          { name: "Surto de Magia Selvagem", description: "Imediatamente após você conjurar uma magia de feiticeiro de 1º nível ou superior, o Mestre pode pedir que você role 1d20. Se rolar 1, ocorre um efeito mágico aleatório da tabela de Surto de Magia Selvagem." },
          { name: "Marés de Caos", description: "Você pode manipular as forças do acaso para ganhar vantagem em uma jogada de ataque, teste de habilidade ou teste de resistência. Recupera o uso após um descanso longo ou se o Mestre forçar um Surto de Magia Selvagem." }
        ],
        6: [{ name: "Sortudo", description: "Quando outra criatura a até 9 metros que você possa ver fizer uma jogada de ataque, teste de habilidade ou teste de resistência, você pode usar sua reação e gastar 2 pontos de feitiçaria para rolar 1d4 e somar ou subtrair o resultado da rolagem dela." }],
        14: [{ name: "Caos Controlado", description: "Sempre que rolar na tabela de Surto de Magia Selvagem, você pode rolar duas vezes e escolher qual dos dois resultados aplicar." }],
        18: [{ name: "Bombardeio de Feitiços", description: "Quando rolar o valor máximo em qualquer dado de dano de uma magia que conjurar, você pode rolar esse dado mais uma vez e somar o resultado ao dano (uma vez por turno)." }]
      }
    },
    "Mente Aberrante": {
      description: "Uma influência alienígena envolveu seus tentáculos em sua mente, lhe dando poderes psiônicos. Agora você pode tocar outras mentes com esse poder e alterar o mundo ao seu redor ao utilizar isso para controlar a energia mágica do multiverso.",
      source: "Tasha's Cauldron of Everything",
      features: {
        1: [
          { name: "Magias Psiônicas", description: "Magias adicionais (contam como magias de feiticeiro, sem ocupar suas conhecidas): 1º (Braços de Hadar, Farpa Mental, Sussurros Dissonantes), 3º (Acalmar Emoções, Detectar Pensamentos), 5º (Fome de Hadar, Remeter), 7º (Invocar Aberração, Tentáculos Negros de Evard), 9º (Ligação Telepática de Rary, Telecinese). Pode trocar por adivinhação/encantamento de bruxo, feiticeiro ou mago." },
          { name: "Discurso Telepático", description: "Ação bônus: escolha criatura a até 9m. Vocês falam telepaticamente a até 1,5 km × mod. Carisma (mín. 1,5 km) por minutos iguais ao seu nível de feiticeiro. Devem compartilhar um idioma." }
        ],
        6: [
          { name: "Feitiçaria Psiônica", description: "Magias de 1º+ da lista de Magias Psiônicas podem ser conjuradas gastando pontos de feitiçaria (= círculo da magia) em vez de slots. Nesse caso, não requer componentes verbais, somáticos ou materiais (salvo consumidos)." },
          { name: "Defesas Psíquicas", description: "Resistência a dano psíquico. Vantagem em salvaguardas contra ser amedrontado ou enfeitiçado." }
        ],
        14: [{ name: "Revelação na Carne", description: "Ação bônus: gaste 1+ pontos de feitiçaria para se transformar por 10 min. Para cada ponto gasto, escolha: ver invisíveis a 18m, voo igual ao deslocamento, natação 2× deslocamento + respirar na água, ou corpo viscoso (passar por espaços de 2,5cm e escapar de agarrões não-mágicos)." }],
        18: [{ name: "Implosão Anômala", description: "Ação: teleporte a até 36m. Criaturas a 9m do espaço que você deixou fazem save de Força: falha = 3d10 de dano de energia e são puxadas para seu espaço anterior; sucesso = metade do dano, sem puxão. 1×/descanso longo ou 5 pontos de feitiçaria." }]
      },
      spells: ["Braços de Hadar", "Farpa Mental", "Sussurros Dissonantes", "Acalmar Emoções", "Detectar Pensamentos", "Fome de Hadar", "Remeter", "Invocar Aberração", "Tentáculos Negros de Evard", "Ligação Telepática de Rary", "Telecinese"]
    },
    "Alma Cronométrica": {
      description: "A força cósmica da ordem inundou você com magia. Esse poder vem de Mecânos ou um lugar como esse — um plano de existência moldado completamente com uma eficiência cronométrica. Você, ou alguém de sua linhagem, pode ter sido envolvido nas maquinações dos modrons, os seres da ordem.",
      source: "Tasha's Cauldron of Everything",
      features: {
        1: [
          { name: "Magia Cronométrica", description: "Magias adicionais sempre conhecidas: 1º (Alarme, Proteção Contra o Bem e o Mal), 3º (Auxílio, Restauração Menor), 5º (Dissipar Magia, Proteção Contra Energia), 7º (Invocar Construto, Movimentação Livre), 9º (Muralha de Energia, Restauração Maior). Pode trocar por abjuração/transmutação de bruxo, feiticeiro ou mago." },
          { name: "Restaurar o Equilíbrio", description: "Quando uma criatura a até 18m que você possa ver estiver prestes a rolar d20 com vantagem ou desvantagem, use sua reação para cancelar a vantagem/desvantagem. Usos: bônus de proficiência/descanso longo." }
        ],
        6: [{ name: "Bastião da Ordem", description: "Ação: gaste 1-5 pontos de feitiçaria para criar uma proteção em você ou criatura a até 9m. A proteção concede d8s iguais aos pontos gastos. Quando protegido sofre dano, gasta dados para reduzir o dano. Dura até descanso longo ou reusar." }],
        14: [{ name: "Arrebatamento da Ordem", description: "Ação bônus: entre em transe por 1 minuto. Ataques contra você não podem ter vantagem. Rolagens de ataque, testes e saves com resultado abaixo de 10 no d20 são tratados como 10. 1×/descanso longo ou 5 pontos de feitiçaria." }],
        18: [{ name: "Marcha Cronometrada", description: "Ação: invoque espíritos da ordem em um cubo de 9m. Restauram até 100 PV (divididos à escolha), reparam objetos danificados no cubo, e encerram magias de 6º círculo ou menor em criaturas/objetos à sua escolha. 1×/descanso longo ou 7 pontos de feitiçaria." }]
      },
      spells: ["Alarme", "Proteção Contra o Bem e o Mal", "Auxílio", "Restauração Menor", "Dissipar Magia", "Proteção Contra Energia", "Invocar Construto", "Movimentação Livre", "Muralha de Energia", "Restauração Maior"]
    }
  },
  'Bruxo': {
    "A Arquifada": {
      description: "Ligados a um patrono misterioso das fadas, bruxos deste pacto dominam magias de controle mental, ilusões e teleportes sutis que confundem e desviam ataques.",
      spells: ["Fogo das Fadas", "Sono", "Acalmar Emoções", "Força Fantasmagórica", "Piscar", "Ampliar Plantas", "Dominar Besta", "Invisibilidade Maior", "Dominar Pessoa", "Similaridade"],
      features: {
        1: [{ name: "Presença Feérica", description: "Com uma ação, cada criatura em um cubo de 3 metros originado em você deve fazer um teste de resistência de Sabedoria (CD da sua magia) ou ficará enfeitiçada ou amedrontada (à sua escolha) até o fim do seu próximo turno (1× por descanso curto ou longo)." }],
        6: [{ name: "Névoa de Fuga", description: "Quando sofrer dano, você pode usar sua reação para ficar invisível e se teletransportar até 18 metros para um espaço desocupado que possa ver. Permanece invisível até o início do seu próximo turno ou até atacar/conjurar (1× por descanso curto ou longo)." }],
        10: [{ name: "Defesa Sedutora", description: "Você é imune a ser enfeitiçado. Além disso, quando outra criatura tentar enfeitiçá-lo, você pode usar sua reação para tentar refletir o encanto de volta para ela (teste de resistência de Sabedoria)." }],
        14: [{ name: "Delírio Sombrio", description: "Com uma ação, escolha uma criatura a até 18 metros para fazer um teste de resistência de Sabedoria. Se falhar, ela fica enfeitiçada ou amedrontada por 1 minuto (ou até sofrer dano), imersa em uma ilusão (1× por descanso curto ou longo)." }]
      }
    },
    "O Corruptor": {
      description: "Servindo a demônios ou diabos, estes bruxos ceifam a energia vital dos mortos para ganhar vida temporária e convocam as chamas e o azar dos planos inferiores.",
      spells: ["Mãos Flamejantes", "Comando", "Cegueira/Surdez", "Raio Ardente", "Bola de Fogo", "Névoa Fétida", "Escudo de Fogo", "Muralha de Fogo", "Coluna de Chamas", "Consagrar"],
      features: {
        1: [{ name: "Bênção do Obscuro", description: "Quando reduzir uma criatura hostil a 0 Pontos de Vida, você ganha Pontos de Vida temporários iguais ao seu modificador de Carisma + seu nível de bruxo (mínimo 1)." }],
        6: [{ name: "Sorte do Próprio Obscuro", description: "Quando fizer um teste de habilidade ou teste de resistência, você pode usar este recurso para adicionar 1d10 à rolagem (pode decidir após ver o dado, mas antes de saber o resultado). 1× por descanso curto ou longo." }],
        10: [{ name: "Resiliência Demoníaca", description: "Você escolhe um tipo de dano ao terminar um descanso curto ou longo e ganha resistência a ele até escolher outro (dano de armas mágicas ou prateadas ignora essa resistência)." }],
        14: [{ name: "Lançar no Inferno", description: "Ao atingir uma criatura com um ataque, você pode fazê-la desaparecer pelos planos inferiores até o fim do seu próximo turno. Se não for um corruptor, ela sofre 10d10 de dano psíquico ao retornar (1× por descanso longo)." }]
      }
    },
    "O Grande Antigo": {
      description: "Conectados a entidades cósmicas insondáveis além da realidade, estes bruxos dominam a telepatia e afetam a sanidade mental de seus inimigos através do puro terror psíquico.",
      spells: ["Sussurros Dissonantes", "Riso Histérico de Tasha", "Detectar Pensamentos", "Força Fantasmagórica", "Clarividência", "Enviar Mensagem", "Dominar Besta", "Tentáculos Negros de Evard", "Dominar Pessoa", "Telecinésia"],
      features: {
        1: [{ name: "Despertar a Mente", description: "Você pode se comunicar telepaticamente com qualquer criatura que possa ver a até 9 metros (ela não precisa compartilhar um idioma com você, mas precisa entender pelo menos um idioma)." }],
        6: [{ name: "Proteção Entrópica", description: "Quando uma criatura fizer uma jogada de ataque contra você, você pode usar sua reação para impor desvantagem nessa jogada. Se o ataque errar, você ganha vantagem no seu próximo ataque contra ela até o fim do seu próximo turno (1× por descanso curto ou longo)." }],
        10: [{ name: "Escudo de Pensamentos", description: "Seus pensamentos não podem ser lidos por telepatia ou outros meios, a menos que você permita. Você também ganha resistência a dano psíquico e, sempre que sofrer dano psíquico, o atacante sofre a mesma quantidade de dano." }],
        14: [{ name: "Criar Lacaio", description: "Com uma ação, você toca um humanoide incapacitado. Ele fica enfeitiçado por você até que uma magia Remover Maldição seja conjurada nele ou você use esta habilidade novamente." }]
      }
    },
    "O Hexblade": {
      description: "Servos de uma entidade misteriosa da Umbra (Shadowfell) que se manifesta em armas sencientes, estes bruxos misturam magia sombria com maestria em combate marcial, canalizando maldições terríveis contra seus oponentes.",
      source: "Xanathar's Guide to Everything",
      spells: ["Escudo", "Golpe Irado", "Desfoque", "Golpe Marcador", "Piscar", "Arma Elemental", "Assassino Fantasmagórico", "Golpe Estonteante", "Golpe Banidor", "Cone de Frio"],
      features: {
        1: [
          { name: "Maldição do Hexblade", description: "Coloca uma maldição em criatura a até 9m (Ação Bônus). Causa dano extra igual ao seu Bônus de Proficiência, acerta crítico com 19-20 e recupera vida (Nível + Car) se o alvo morrer." },
          { name: "Guerreiro Hex", description: "Proficiência com armaduras médias, escudos e armas marciais. Permite usar seu modificador de Carisma em jogadas de ataque e dano com uma arma de uma mão." }
        ],
        6: [{ name: "Espectro Amaldiçoado", description: "Ao matar um humanoide, vincula sua alma como um espectro aliado sob seu comando até seu próximo descanso longo (ganha PV temporários e bônus nos ataques)." }],
        10: [{ name: "Armadura de Pragas", description: "Se o alvo amaldiçoado acertar um ataque contra você, use sua reação para rolar 1d6. Com 4 ou mais, o ataque erra automaticamente." }],
        14: [{ name: "Mestre de Pragas", description: "Quando o alvo amaldiçoado morrer, você pode transferir a maldição para outra criatura a até 9 metros como uma reação." }]
      }
    },
    "O Insondável": {
      description: "Ligados às profundezas de oceanos misteriosos ou do Plano Elemental da Água, estes bruxos comandam tentáculos espectrais congelantes e adaptam-se perfeitamente aos ambientes aquáticos profundos.",
      source: "Tasha's Cauldron of Everything",
      spells: ["Criar ou Destruir Água", "Onda Trovejante", "Lufada de Vento", "Silêncio", "Nevasca", "Relâmpago", "Controlar Água", "Invocar Elemental", "Cone de Frio", "Mão de Bigby"],
      features: {
        1: [
          { name: "Tentáculo das Profundezas", description: "Cria um tentáculo espectral de 3m a até 18m (Ação Bônus). Pode atacar com ataque mágico corpo-a-corpo: causa 1d8 (2d8 no nível 10) de dano gélido e reduz deslocamento do alvo em 3m. (Usos = Prof/descanso longo)." },
          { name: "Dom do Mar", description: "Ganha deslocamento de natação de 12m e habilidade de respirar debaixo d'água." }
        ],
        6: [
          { name: "Alma Oceânica", description: "Ganha resistência a dano gélido. Sob a água, consegue conversar telepaticamente com qualquer outra criatura submersa." },
          { name: "Espiral Guardiã", description: "Seu tentáculo protege aliados a até 3m dele. Use sua reação para reduzir o dano sofrido por um aliado em 1d8 (2d8 no nível 10)." }
        ],
        10: [{ name: "Tentáculos Enredantes", description: "Aprende Tentáculos Negros de Evard (não conta no limite e pode conjurar 1x sem espaço/descanso longo). Ao conjurar, ganha PV temporários igual ao seu nível e não pode ter concentração quebrada por dano." }],
        14: [{ name: "Mergulho no Insondável", description: "Como ação, teletransporta a si mesmo e mais 5 aliados a até 1,5km para um corpo de água avistado (1x/descanso curto ou longo)." }]
      }
    },
    "O Gênio": {
      description: "Barganhando com um gênio nobre (Dao, Djinni, Ifriti ou Marid), estes bruxos canalizam poderes elementais destrutivos e carregam um receptáculo mágico capaz de abrigá-los e conceder desejos limitados.",
      source: "Tasha's Cauldron of Everything",
      spells: ["Detectar o Bem e Mal", "Santuário", "Força Espectral", "Crescer Espinhos", "Criar Comida e Água", "Assassino Fantasmagórico", "Moldar Rochas", "Criação", "Muralha de Pedra", "Desejo"],
      features: {
        1: [{ name: "Receptáculo do Gênio", description: "Ganha um objeto mágico Minúsculo. Permite: Descanso Engarrafado (entra no receptáculo extradimensional por até 2xProf horas, 1x/descanso longo) e Ira do Gênio (causa dano extra igual à proficiência 1x/turno: contundente, trovejante, ígneo ou gélido)." }],
        6: [{ name: "Dom Elemental", description: "Ganha resistência a dano baseada no tipo do seu gênio. Com ação bônus, ganha deslocamento de voo de 9m por 10 minutos (usos igual a Prof/descanso longo)." }],
        10: [{ name: "Receptáculo Protetor", description: "Pode levar até 5 aliados voluntários ao receptáculo. Permanecer lá dentro por 10 min concede benefícios de descanso curto e adiciona bônus de proficiência na cura de Dados de Vida." }],
        14: [{ name: "Desejo Restrito", description: "Como ação, roga ao receptáculo para realizar o efeito de qualquer magia de 6º círculo ou menor com tempo de conjuração de 1 ação, ignorando custos (1x/1d4 descansos longos)." }]
      }
    }
  },
  'Patrulheiro': {
    "Conclave da Besta": {
      description: "Rastreadores que partilham um elo espiritual eterno com uma criatura selvagem, lutando em perfeita sincronia com seu companheiro animal no campo de batalha.",
      features: {
        3: [
          { name: "Companheiro Animal", description: "Você ganha um companheiro animal leal (besta de ND 1/4 ou menor, tamanho Médio ou menor). Ele soma seu bônus de proficiência à CA, jogadas de ataque, dano e testes de resistência/perícias com proficiência, e tem PV iguais a 4 × seu nível de patrulheiro (ou o máximo normal dele, o que for maior)." },
          { name: "Vínculo com o Companheiro", description: "O animal obedece aos seus comandos o melhor que pode e age no seu turno. Você pode usar sua ação para comandá-lo a Atacar, Disparar, Desengajar ou Ajudar." }
        ],
        5: [{ name: "Ataque Coordenado", description: "Quando você usar a ação de Ataque no seu turno, pode usar um dos seus ataques para comandar seu companheiro a realizar um ataque corpo a corpo (ou, na versão revisada, ele usa a reação dele para atacar)." }],
        7: [{ name: "Defesa da Besta", description: "Enquanto seu companheiro puder ver você, ele tem vantagem em todos os testes de resistência (ou, no PHB, você pode comandá-lo a Disparar, Desengajar ou Ajudar como ação bônus)." }],
        11: [{ name: "Tempestade de Garras e Presas", description: "Você pode usar sua ação para comandar seu companheiro a realizar um ataque corpo a corpo contra cada criatura a até 1,5 metro dele (ou fazer dois ataques quando você usar a ação de Ataque)." }],
        15: [{ name: "Defesa da Besta Superior", description: "Quando um atacante que seu companheiro possa ver acertá-lo com um ataque, o companheiro pode usar a reação dele para reduzir o dano do ataque pela metade (e no PHB, magias que você conjura em si mesmo também afetam seu companheiro a até 9 metros)." }]
      }
    },
    "Conclave do Caçador": {
      description: "Sentinelas da civilização contra as ameaças selvagens, patrulheiros caçadores especializam-se em derrubar monstros colossais, escapar de hordas e resistir a táticas de ataque inimigas.",
      features: {
        3: [{ name: "Presa do Caçador", description: "Escolha uma opção: Assassino de Colossos (+1d8 de dano extra 1× por turno em alvos abaixo do PV máximo), Matador de Gigantes (usa reação para atacar criatura Grande ou maior a até 1,5m que o ataque) ou Destruidor de Hordas (1× por turno, faz um ataque extra contra outra criatura a até 1,5m do alvo original)." }],
        5: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque no seu turno." }],
        7: [{ name: "Táticas Defensivas", description: "Escolha uma opção: Escapar da Horda (ataques de oportunidade contra você têm desvantagem), Defesa Contra Múltiplos Ataques (+4 na CA contra ataques subsequentes do mesmo inimigo no turno) ou Vontade de Aço (vantagem em testes de resistência contra ser amedrontado)." }],
        11: [{ name: "Ataque Múltiplo", description: "Escolha uma opção: Saraivada (com uma ação, faz um ataque à distância contra qualquer número de criaturas a até 3 metros de um ponto) ou Ataque Giratório (com uma ação, faz um ataque corpo a corpo contra cada criatura a até 1,5 metro de você)." }],
        15: [{ name: "Defesa de Caçador Superior", description: "Escolha uma opção: Evasão (não sofre dano se passar em teste de Destreza e metade se falhar), Manter-se Contra a Maré (reação para fazer um inimigo errar e atacar outra criatura) ou Esquiva Sobrenatural (reação para reduzir à metade o dano de um ataque)." }]
      }
    },
    "Conclave do Rastreador Subterrâneo": {
      description: "Mestres da escuridão e do combate subterrâneo, estes patrulheiros emboscam inimigos a partir das sombras, sendo invisíveis até mesmo para criaturas com visão no escuro.",
      features: {
        3: [
          { name: "Batedor do Subterrâneo", description: "No primeiro turno de cada combate, seu deslocamento aumenta em 3 metros e, se usar a ação de Ataque, você pode fazer um ataque adicional com arma (causando +1d8 de dano extra se acertar). Além disso, você é invisível na escuridão para criaturas que dependem de visão no escuro." },
          { name: "Magia do Rastreador Subterrâneo", description: "Você ganha visão no escuro de 18 metros (ou +9 metros se já possuir) e aprende magias adicionais como Disfarçar-se, Truque de Corda, Medo, Invisibilidade Maior e Similaridade." }
        ],
        5: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque no seu turno." }],
        7: [{ name: "Mente de Aço", description: "Você ganha proficiência em testes de resistência de Sabedoria (ou de Inteligência/Carisma, caso já tenha Sabedoria)." }],
        11: [{ name: "Rajada do Rastreador", description: "Uma vez por turno, quando você errar um ataque com arma, pode realizar outro ataque com arma como parte da mesma ação." }],
        15: [{ name: "Esquiva do Rastreador", description: "Quando uma criatura fizer uma jogada de ataque contra você sem ter vantagem, você pode usar sua reação para impor desvantagem nessa jogada." }]
      }
    },
    "Andarilho Feérico": {
      description: "Um misticismo feérico o cerca, graças às dádivas de uma arquifada, de uma fruta brilhante ou de algum outro evento auspicioso. Você é um guardião que representa tanto o reino mortal quanto o reino das fadas, cuja risada contagiante alegra os oprimidos e cujo poder marcial provoca terror nos oponentes.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [
          { name: "Golpes Aterrorizantes", description: "Quando você acerta uma criatura com uma arma, pode causar 1d4 de dano psíquico extra ao alvo (1× por turno). O dano aumenta para 1d6 no 11º nível." },
          { name: "Magia do Andarilho Feérico", description: "Magias adicionais sempre preparadas (contam como magias de patrulheiro): 3º (Enfeitiçar Pessoa), 5º (Passo Nebuloso), 9º (Dissipar Magia), 13º (Porta Dimensional), 17º (Despistar)." },
          { name: "Glamour Sobrenatural", description: "Adicione seu mod. Sabedoria (mín. +1) a testes de Carisma. Ganha proficiência em Atuação, Enganação ou Persuasão." }
        ],
        7: [{ name: "Distorcer Engodo", description: "Vantagem em saves contra ser amedrontado ou enfeitiçado. Quando você ou criatura a até 36m for bem-sucedida em save contra medo/encantamento, use reação para forçar outra criatura a fazer save de Sabedoria (CD de magia) ou ficar amedrontada/enfeitiçada por 1 min." }],
        11: [{ name: "Reforço Feérico", description: "Conhece Invocar Fada (sem componente material, não conta no limite). Pode conjurá-la 1×/descanso longo sem slot. Pode modificá-la para não exigir concentração (duração = 1 min)." }],
        15: [{ name: "Andarilho da Névoa", description: "Conjure Passo Nebuloso sem slot (usos: mod. Sabedoria/descanso longo, mín. 1). Ao conjurar, pode levar uma criatura a até 1,5m junto de você para um espaço a até 1,5m do destino." }]
      },
      spells: ["Enfeitiçar Pessoa", "Passo Nebuloso", "Dissipar Magia", "Porta Dimensional", "Despistar"]
    },
    "Portador do Enxame": {
      description: "Sentindo uma conexão profunda com o ambiente, você vinculou-se a um enxame de espíritos da natureza intangíveis. Esse enxame torna-se uma força poderosa em batalha e um companheiro útil ao patrulheiro, auxiliando em combate e conferindo mobilidade sobrenatural.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [
          { name: "Enxame Reunido", description: "Um enxame de espíritos intangíveis permanece em seu espaço. 1× por turno ao acertar um ataque, escolha: o alvo sofre 1d6 de dano perfurante extra; OU o alvo faz save de Força ou é movido 4,5m horizontalmente; OU você é movido 1,5m horizontalmente." },
          { name: "Magia do Portador do Enxame", description: "Aprende Mãos Mágicas (forma de enxame). Magias adicionais: 3º (Fogo das Fadas), 5º (Teia), 9º (Forma Gasosa), 13º (Olho Arcano), 17º (Praga de Insetos)." }
        ],
        7: [{ name: "Maré Ondulante", description: "Ação bônus: ganha deslocamento de voo de 3m e pode levitar por 1 minuto. Usos: bônus de proficiência/descanso longo." }],
        11: [{ name: "Enxame Poderoso", description: "O dano do Enxame Reunido aumenta para 1d8. Se a criatura falhar no save de Força, pode ser derrubada. Quando você for movido pelo enxame, ganha meia cobertura até o próximo turno." }],
        15: [{ name: "Dispersão do Enxame", description: "Ao receber dano, use reação para ganhar resistência a esse dano, desaparecer e se teleportar para espaço desocupado a até 9m. Usos: bônus de proficiência/descanso longo." }]
      },
      spells: ["Mãos Mágicas", "Fogo das Fadas", "Teia", "Forma Gasosa", "Olho Arcano", "Praga de Insetos"]
    }
  },
  'Druida': {
    "Círculo da Terra": {
      description: "Místicos guardiões de biomas específicos, druidas deste círculo mantêm uma forte ligação com a própria terra, restaurando seus recursos arcanos rapidamente durante descansos.",
      features: {
        2: [
          { name: "Truque Adicional", description: "Você aprende um truque de druida adicional à sua escolha." },
          { name: "Recuperação Natural", description: "Durante um descanso curto, você pode recuperar espaços de magia gastos cuja soma dos níveis seja igual ou inferior à metade do seu nível de druida (arredondado para cima), sendo nenhum deles de 6º nível ou superior (1× por descanso longo)." }
        ],
        6: [{ name: "Caminho da Floresta", description: "Mover-se por terreno difícil não-mágico não custa movimento extra. Você também pode atravessar plantas não-mágicas sem sofrer dano ou redução de movimento, e tem vantagem em testes de resistência contra plantas criadas ou manipuladas magicamente." }],
        10: [{ name: "Proteção Natural", description: "Você se torna imune a venenos e doenças, e não pode ser enfeitiçado ou amedrontado por elementais ou fadas." }],
        14: [{ name: "Santuário Natural", description: "Quando uma besta ou planta tentar atacar você, ela deve fazer um teste de resistência de Sabedoria (CD da sua magia). Se falhar, deve escolher outro alvo ou o ataque é perdido; se passar, fica imune a este efeito por 24 horas." }]
      }
    },
    "Círculo da Lua": {
      description: "Guerreiros metamorfos focados no combate selvagem, estes druidas assumem formas animais de ND elevado como ação bônus e podem canalizar magia para curar suas feridas na forma de fera.",
      features: {
        2: [
          { name: "Forma Selvagem de Combate", description: "Você pode usar Forma Selvagem como ação bônus (em vez de ação). Além disso, enquanto transformado, pode usar uma ação bônus para gastar um espaço de magia e recuperar 1d8 Pontos de Vida por nível do espaço gasto." },
          { name: "Formas de Círculo", description: "Você pode se transformar em bestas de até ND 1 (ignorando a limitação de não poder nadar, mas ainda sem voo até o 8º nível). A partir do 6º nível, o ND máximo passa a ser seu nível de druida dividido por 3 (arredondado para baixo)." }
        ],
        6: [{ name: "Ataque Primordial", description: "Seus ataques na forma de besta passam a contar como mágicos para o propósito de superar resistência e imunidade a ataques e danos não-mágicos." }],
        10: [{ name: "Forma Selvagem de Elemental", description: "Você pode gastar dois usos de Forma Selvagem de uma vez para se transformar em um Elemental do Ar, da Terra, do Fogo ou da Água." }],
        14: [{ name: "Mil Formas", description: "Você pode conjurar a magia Alterar-se à vontade, sem gastar espaço de magia." }]
      }
    },
    "Círculo dos Esporos": {
      description: "Druidas do Círculo dos Esporos encontram a beleza na decadência. Eles veem dentro dos bolores e outros fungos a habilidade de transformar matéria morta em abundante, ainda que de alguma forma estranha, vida. Estes druidas acreditam que vida e morte são parte de um grande ciclo, com um levando ao outro, sempre retornando.",
      source: "Tasha's Cauldron of Everything",
      features: {
        2: [
          { name: "Magias de Círculo", description: "Você aprende o truque Toque Necrótico. Magias adicionais: 3º (Cegueira/Surdez, Repouso Tranquilo), 5º (Animar Mortos, Forma Gasosa), 7º (Malogro, Confusão), 9º (Névoa Mortal, Praga)." },
          { name: "Aura de Esporos", description: "Quando uma criatura que você possa ver se move para um espaço a 3m ou menos de você ou começa seu turno nessa distância, você pode usar sua reação para causar 1d4 de dano necrótico (CD de magia, save de Constituição). O dano aumenta para 1d6 (6º), 1d8 (10º) e 1d10 (14º)." },
          { name: "Entidade Simbiótica", description: "Como uma ação, gaste um uso de Forma Selvagem para despertar seus esporos. Ganha 4 PV temporários por nível de druida. Enquanto ativo: dano da Aura de Esporos dobra, ataques corpo a corpo causam 1d6 de dano necrótico extra. Dura 10 minutos ou até perder os PV temporários." }
        ],
        6: [{ name: "Infestação Fúngica", description: "Se uma fera ou humanoide Pequeno/Médio a até 3m de você morrer, use sua reação para animá-lo com 1 PV (bloco de zumbi). Dura 1 hora, obedece comandos mentais (apenas ação de Ataque). Usos: mod. Sabedoria/descanso longo." }],
        10: [{ name: "Expansão de Esporos", description: "Ação bônus enquanto Entidade Simbiótica estiver ativa: espalhe esporos a até 9m em um cubo de 3m por 1 minuto. Criaturas que entrarem ou começarem turno no cubo recebem dano da Aura de Esporos (save de Constituição). Máximo 1 vez por turno. Enquanto ativo, não pode usar reação da Aura de Esporos." }],
        14: [{ name: "Corpo Fúngico", description: "Você não pode mais ser cegado, ensurdecido, amedrontado ou envenenado. Qualquer acerto crítico contra você será considerado um acerto normal, exceto se você estiver incapacitado." }]
      },
      spells: ["Toque Necrótico", "Cegueira/Surdez", "Repouso Tranquilo", "Animar Mortos", "Forma Gasosa", "Malogro", "Confusão", "Névoa Mortal", "Praga"]
    },
    "Círculo das Estrelas": {
      description: "O Círculo das Estrelas permite que os druidas retirem seus poderes da luz estelar. Estes druidas têm rastreado padrões celestiais desde tempos imemoriais, descobrindo segredos escondidos entre as constelações. Ao revelar e entender esses segredos, o Círculo das Estrelas procura controlar o poder do Cosmo.",
      source: "Tasha's Cauldron of Everything",
      features: {
        2: [
          { name: "Mapa Estelar", description: "Você criou uma carta estelar (objeto minúsculo, foco de conjuração). Com ele: conhece o truque Orientação; tem Raio Guia sempre preparado (não conta no limite); pode conjurar Raio Guia sem gastar espaço (usos: mod. proficiência/descanso longo)." },
          { name: "Forma Estelar", description: "Ação bônus: gaste um uso de Forma Selvagem para assumir uma forma estelar (luminosa, 3m de luz). Dura 10 min. Escolha uma constelação: Arqueiro (ataque bônus, 1d8+Sab radiante a 18m), Cálice (ao curar com magia, cura extra 1d8+Sab para você ou aliado a 9m), Dragão (trate 9 ou menos como 10 em testes de Int/Sab ou save de Concentração)." }
        ],
        6: [{ name: "Presságio Cósmico", description: "Ao fim de um descanso longo, role um dado. Par = Prosperidade (reação: +1d6 em ataque/save/teste de aliado a 9m). Ímpar = Infortúnio (reação: -1d6 em ataque/save/teste de inimigo a 9m). Usos: bônus de proficiência/descanso longo." }],
        10: [{ name: "Constelações Cintilantes", description: "O 1d8 do Arqueiro e do Cálice se tornam 2d8. Com Dragão ativo, ganha voo de 6m e pode flutuar. No começo de cada turno em Forma Estelar, pode trocar a constelação." }],
        14: [{ name: "Totalmente Estrelado", description: "Enquanto em Forma Estelar, você se torna parcialmente incorpóreo, ganhando resistência a dano contundente, cortante e perfurante." }]
      },
      spells: ["Orientação", "Raio Guia"]
    },
    "Círculo do Fogo Selvagem": {
      description: "Druidas dentro do Círculo do Fogo Selvagem compreendem que a destruição às vezes é precursora da criação, tal como quando um fogo florestal promove o crescimento posterior. Esses druidas se ligam a um espírito primitivo que carrega tanto a destruição quanto o poder criativo.",
      source: "Tasha's Cauldron of Everything",
      features: {
        2: [
          { name: "Magias de Círculo", description: "Magias adicionais sempre preparadas: 2º (Mãos Flamejantes, Curar Ferimentos), 3º (Esfera Flamejante, Raio Ardente), 5º (Crescimento de Plantas, Revivificar), 7º (Aura de Devoção, Escudo Ardente), 9º (Coluna de Chamas, Curar Ferimentos em Massa)." },
          { name: "Invocar Espírito do Fogo Selvagem", description: "Como uma ação, gaste um uso de Forma Selvagem para invocar o espírito a até 9m. Criaturas a 3m dele (exceto você) fazem save de Destreza ou sofrem 2d6 de dano ígneo. Em combate, age após seu turno (Esquiva padrão; ação bônus para comandar outra ação). Dura 1 hora." }
        ],
        6: [{ name: "Vínculo Aprimorado", description: "Ao conjurar magia que causa dano de fogo ou restaura PV com o espírito invocado, role 1d8 e adicione o resultado a uma jogada de dano ou cura. Magias com alcance não-pessoal podem se originar do espírito." }],
        10: [{ name: "Cauterizar Chamas", description: "Quando uma criatura Pequena ou maior morre a até 9m de você ou do espírito, uma chama espectral brota. Quando outra criatura entrar no espaço, use sua reação para curar ou causar dano de fogo: 2d10 + mod. Sabedoria. Usos: bônus de proficiência/descanso longo." }],
        14: [{ name: "Renovação Ardente", description: "Se o espírito estiver a até 36m quando você cair a 0 PV, pode fazer o espírito cair a 0 PV em seu lugar. Você recupera metade dos seus PV máximos e se levanta imediatamente. 1x/descanso longo." }]
      },
      spells: ["Mãos Flamejantes", "Curar Ferimentos", "Esfera Flamejante", "Raio Ardente", "Crescimento de Plantas", "Revivificar", "Aura de Devoção", "Escudo Ardente", "Coluna de Chamas", "Curar Ferimentos em Massa"]
    }
  },
  'Mago': {
    "Escola de Abjuração": {
      description: "Especialistas em defesas arcanas e barreiras mágicas, magos abjuradores projetam escudos que absorvem danos físicos e dissipam magias inimigas com precisão milimétrica.",
      features: {
        2: [
          { name: "Abjuração Instruída", description: "O custo em ouro e o tempo necessários para copiar magias de abjuração para o seu grimório são reduzidos à metade." },
          { name: "Proteção Arcana", description: "Ao conjurar uma magia de abjuração de 1º nível ou superior, você cria uma barreira mágica com Pontos de Vida iguais a (2 × seu nível de mago) + seu modificador de Inteligência. Sempre que você sofrer dano, a proteção absorve o dano primeiro. Ela recupera 2 × o nível da magia de PV sempre que você conjurar outra magia de abjuração (1× por descanso longo para criar)." }
        ],
        6: [{ name: "Proteção Projetada", description: "Quando uma criatura a até 9 metros que você possa ver sofrer dano, você pode usar sua reação para fazer com que sua Proteção Arcana absorva esse dano." }],
        10: [{ name: "Abjuração Aprimorada", description: "Quando conjurar uma magia de abjuração que exija um teste de habilidade como parte da conjuração (como Contramágica ou Dissipar Magia), você soma seu bônus de proficiência a esse teste." }],
        14: [{ name: "Resistência à Magia", description: "Você tem vantagem em testes de resistência contra magias e resistência contra o dano causado por magias." }]
      }
    },
    "Escola de Adivinhação": {
      description: "Videntes do destino que leem as correntes do tempo, magos adivinhos prevêem resultados de dados com antecedência e recuperam energia arcana ao desvendar segredos.",
      features: {
        2: [
          { name: "Adivinhação Instruída", description: "O custo em ouro e o tempo para copiar magias de adivinhação para o seu grimório são reduzidos à metade." },
          { name: "Prodígio", description: "Ao terminar um descanso longo, role dois d20s e anote os resultados. Você pode substituir qualquer jogada de ataque, teste de resistência ou teste de habilidade feito por você ou por uma criatura que possa ver por um desses resultados (antes da rolagem, 1× por turno)." }
        ],
        6: [{ name: "Especialista em Adivinhação", description: "Quando conjurar uma magia de adivinhação de 2º nível ou superior usando um espaço de magia, você recupera um espaço de magia gasto de nível inferior (até 5º nível)." }],
        10: [{ name: "O Terceiro Olho", description: "Com uma ação, você ganha um benefício até o próximo descanso curto ou longo: Visão no Escuro (18m), Visão Etérea (18m), Compreensão Maior (ler qualquer idioma) ou Ver Invisibilidade (3m)." }],
        14: [{ name: "Prodígio Maior", description: "Você passa a rolar três d20s para a característica Prodígio em vez de dois." }]
      }
    },
    "Escola de Conjuração": {
      description: "Magos capazes de materializar objetos inanimados do nada, teleportar-se trocando de lugar com aliados e invocar criaturas extremamente resistentes que lutam a seu comando.",
      features: {
        2: [
          { name: "Conjuração Instruída", description: "O custo em ouro e o tempo para copiar magias de conjuração para o seu grimório são reduzidos à metade." },
          { name: "Conjuração Menor", description: "Com uma ação, você conjura um objeto inanimado não-mágico em um espaço desocupado ou na sua mão (até 90 cm de lado e 4,5 kg). O objeto dura 1 hora ou até sofrer dano." }
        ],
        6: [{ name: "Transposição Benigna", description: "Com uma ação, você se teletransporta até 9 metros para um espaço desocupado que possa ver, ou troca de lugar com uma criatura voluntária de tamanho Pequeno ou Médio a até 9 metros (1× por descanso longo, ou recarrega ao conjurar magia de conjuração de 1º+)." }],
        10: [{ name: "Conjuração Focada", description: "Enquanto estiver concentrado em uma magia de conjuração, sua concentração não pode ser interrompida por sofrer dano." }],
        14: [{ name: "Invocações Resistentes", description: "Qualquer criatura que você invocar ou criar usando uma magia de conjuração ganha 30 Pontos de Vida temporários." }]
      }
    },
    "Escola de Encantamento": {
      description: "Mestres do controle social e mental, estes magos paralisam oponentes com olhares hipnóticos e alteram as memórias de quem enfeitiçam sem deixar vestígios.",
      features: {
        2: [
          { name: "Encantamento Instruído", description: "O custo em ouro e o tempo para copiar magias de encantamento para o seu grimório são reduzidos à metade." },
          { name: "Olhar Hipnotizante", description: "Com uma ação, escolha uma criatura a até 1,5 metro que possa vê-lo ou ouvi-lo. Ela deve passar em um teste de resistência de Sabedoria ou ficará enfeitiçada por você até o fim do seu próximo turno, com deslocamento 0 e incapacitada (pode estender usando sua ação nos turnos seguintes)." }
        ],
        6: [{ name: "Encanto Instintivo", description: "Quando uma criatura que você possa ver a até 9 metros fizer uma jogada de ataque contra você, você pode usar sua reação para forçá-la a fazer um teste de resistência de Sabedoria e redirecionar o ataque para outra criatura a até 1,5 metro." }],
        10: [{ name: "Dividir Encantamento", description: "Quando conjurar uma magia de encantamento de 1º nível ou superior que tenha apenas uma criatura como alvo, você pode escolher uma segunda criatura dentro do alcance como alvo adicional." }],
        14: [{ name: "Alterar Memórias", description: "Quando conjurar uma magia de encantamento para enfeitiçar uma ou mais criaturas, elas não sabem que foram enfeitiçadas por você. Além disso, pode usar uma ação para fazer a criatura esquecer até 1 + seu modificador de Inteligência horas do período em que esteve enfeitiçada." }]
      }
    },
    "Escola de Evocação": {
      description: "Conjuradores de destruição elemental em larga escala, evocadores manipulam suas magias de área para não atingir aliados e potencializam seus truques básicos com sua inteligência.",
      features: {
        2: [
          { name: "Evocação Instruída", description: "O custo em ouro e o tempo para copiar magias de evocação para o seu grimório são reduzidos à metade." },
          { name: "Esculpir Magias", description: "Ao conjurar uma magia de evocação que afete outras criaturas, você pode escolher um número delas igual a 1 + o nível da magia. As criaturas escolhidas passam automaticamente no teste de resistência e não sofrem dano se normalmente sofreriam metade." }
        ],
        6: [{ name: "Truque Potente", description: "Quando uma criatura passa no teste de resistência contra um dos seus truques que cause dano, ela ainda sofre metade do dano do truque (mas sem efeitos adicionais)." }],
        10: [{ name: "Evocação Potencializada", description: "Você soma seu modificador de Inteligência a uma rolagem de dano de qualquer magia de evocação de mago que conjurar." }],
        14: [{ name: "Sobrecarga", description: "Quando conjurar uma magia de mago de 1º a 5º nível que cause dano, você pode causar o dano máximo possível com ela. A primeira vez após descanso longo não tem custo; cada uso adicional antes de descansar causa 2d12 de dano necrótico por nível da magia a você (aumentando em 1d12 por uso)." }]
      }
    },
    "Escola de Ilusão": {
      description: "Artistas do engano visual e auditivo, estes magos tornam suas ilusões palpáveis e reais temporariamente, enganando os sentidos de qualquer criatura.",
      features: {
        2: [
          { name: "Ilusão Instruída", description: "O custo em ouro e o tempo para copiar magias de ilusão para o seu grimório são reduzidos à metade." },
          { name: "Ilusão Menor Aprimorada", description: "Você aprende o truque Ilusão Menor (se já souber, aprende outro truque de mago). Ao conjurá-lo, pode criar tanto um som quanto uma imagem com uma única conjuração." }
        ],
        6: [{ name: "Ilusões Moldáveis", description: "Quando conjurar uma magia de ilusão com duração de 1 minuto ou mais, você pode usar sua ação para alterar a natureza dessa ilusão (desde que possa vê-la)." }],
        10: [{ name: "Eu Ilusório", description: "Quando uma criatura fizer uma jogada de ataque contra você, você pode usar sua reação para interpor uma duplicata ilusória e fazer o ataque errar automaticamente (1× por descanso curto ou longo)." }],
        14: [{ name: "Realidade Ilusória", description: "Quando conjurar uma magia de ilusão de 1º nível ou superior, pode usar uma ação bônus para escolher um objeto inanimado não-mágico que faça parte da ilusão e torná-lo real por 1 minuto." }]
      }
    },
    "Escola de Necromancia": {
      description: "Estudiosos da linha tênue entre a vida e a morte, necromantes absorvem a energia vital dos inimigos que derrotam e comandam hordas de mortos-vivos com bônus de poder.",
      features: {
        2: [
          { name: "Necromancia Instruída", description: "O custo em ouro e o tempo para copiar magias de necromancia para o seu grimório são reduzidos à metade." },
          { name: "Colheita Sinistra", description: "Uma vez por turno, quando matar uma ou mais criaturas com uma magia de 1º nível ou superior, você recupera Pontos de Vida iguais a 2 × o nível da magia (ou 3 × o nível se a magia for de necromancia). Não funciona contra construtos ou mortos-vivos." }
        ],
        6: [{ name: "Escravos Mortos-Vivos", description: "Você adiciona Animar Mortos ao seu grimório. Ao conjurá-la, cria um morto-vivo adicional; todos os mortos-vivos que você criar ganham PV adicionais iguais ao seu nível de mago e somam seu bônus de proficiência nas jogadas de dano com armas." }],
        10: [{ name: "Acostumado à Morte-Vida", description: "Você ganha resistência a dano necrótico e seu máximo de Pontos de Vida não pode ser reduzido." }],
        14: [{ name: "Comandar Mortos-Vivos", description: "Com uma ação, escolha um morto-vivo a até 18 metros que possa ver. Ele deve fazer um teste de resistência de Carisma (CD da sua magia) ou ficará amigável e sob seu controle (mortos-vivos com Inteligência 8+ têm vantagem; com Int 12+ repetem o teste a cada hora)." }]
      }
    },
    "Escola de Transmutação": {
      description: "Cientistas da alquimia e da alteração da matéria, magos transmutadores criam pedras mágicas com benefícios físicos e alteram as formas dos objetos à sua volta.",
      features: {
        2: [
          { name: "Transmutação Instruída", description: "O custo em ouro e o tempo para copiar magias de transmutação para o seu grimório são reduzidos à metade." },
          { name: "Alquimia Menor", description: "Você pode alterar temporariamente as propriedades físicas de um objeto não-mágico (madeira, pedra, ferro, cobre ou prata) em outro desses materiais por até 1 hora (concentração, 10 minutos por 30 cm cúbicos)." }
        ],
        6: [{ name: "Pedra de Transmutador", description: "Você passa 8 horas criando uma pedra mágica que concede ao portador um benefício à escolha: Visão no Escuro (18m), +3m de deslocamento, proficiência em testes de resistência de Constituição ou resistência a dano de ácido, frio, fogo, elétrico ou trovão." }],
        10: [{ name: "Metamorfo", description: "Você adiciona Metamorfose ao seu grimório e pode conjurá-la em si mesmo sem gastar espaço de magia (1× por descanso curto ou longo), mas apenas para se transformar em uma besta de ND 1 ou menor." }],
        14: [{ name: "Mestre Transmutador", description: "Com uma ação, pode consumir a energia da sua Pedra de Transmutador para realizar um efeito maior: Transformação Maior, Panaceia (cura todos os PV, doenças, venenos e maldições), Restaurar Vida (como Reviver os Mortos) ou Restaurar Juventude." }]
      }
    }
  },
  'Artífice': {
    "Alquimista": {
      description: "Magos da ciência química e infusões, alquimistas criam elixires experimentais com efeitos variados e aumentam a potência de suas magias curativas e ácidas.",
      spells: ["Palavra Curativa", "Raio Nauseante", "Esfera Flamejante", "Flecha Ácida de Melf", "Forma Gasosa", "Palavra Curativa em Massa", "Malogro", "Proteção Contra a Morte", "Névoa Mortal", "Reviver os Mortos"],
      features: {
        3: [
          { name: "Proficiência com Ferramentas", description: "Proficiência em suprimentos de alquimista." },
          { name: "Elixir Experimental", description: "Ao fim de um descanso longo, cria um elixir aleatório. Pode gastar espaços de magia para criar mais escolhendo o efeito." }
        ],
        5: [{ name: "Sábio Alquímico", description: "Adiciona modificador de Inteligência ao dano de ácido, fogo, necrótico ou veneno, e em curas (mínimo +1)." }],
        9: [{ name: "Reagentes Restauradores", description: "Criaturas ganham PV temporários (2d6 + INT) ao beber seus elixires. Pode conjurar Restauração Menor sem slot (INT/dia)." }],
        15: [{ name: "Maestria Química", description: "Resistência a ácido e veneno; imune à condição envenenado. Pode conjurar Restauração Maior e Curar sem gastar espaços (1x/descanso longo cada)." }]
      }
    },
    "Armeiro": {
      description: "Cientistas que utilizam armaduras arcanas personalizadas como condutores mágicos de ataque e defesa, alternando entre modos de infiltração furtiva ou tanques de combate.",
      spells: ["Mísseis Mágicos", "Onda Trovejante", "Reflexos", "Despedaçar", "Padrão Hipnótico", "Relâmpago", "Escudo Ardente", "Invisibilidade Maior", "Criar Passagem", "Muralha de Energia"],
      features: {
        3: [
          { name: "Ferramentas Ideais", description: "Proficiência em ferramentas de ferreiro e armaduras pesadas." },
          { name: "Armadura Arcana", description: "Transforma sua armadura em um condutor mágico que ignora requisitos de Força e serve como foco." },
          { name: "Modelo de Armadura", description: "Escolha entre Guardião (Manoplas Trovejantes e Campo Defensivo) ou Infiltrador (Lança-Relâmpagos e Passos Energizados)." }
        ],
        5: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque." }],
        9: [{ name: "Modificações da Armadura", description: "Sua armadura conta como itens separados (peito, botas, elmo e arma) para os propósitos de infusões. Limite de infusões aumenta em 2 (apenas na armadura)." }],
        15: [{ name: "Armadura Perfeita", description: "Ganha bônus potentes baseados no seu modelo de armadura (Guardião: puxar inimigo com reação; Infiltrador: vantagem em ataque e dano extra)." }]
      }
    },
    "Atirador": {
      description: "Engenheiros que criam canhões mágicos móveis no campo de batalha para disparar chamas, projéteis de energia ou fornecer escudos temporários para os aliados.",
      spells: ["Escudo", "Onda Trovejante", "Raio Ardente", "Despedaçar", "Bola de Fogo", "Muralha de Vento", "Tempestade Glacial", "Muro de Fogo", "Cone de Frio", "Muralha de Energia"],
      features: {
        3: [
          { name: "Proficiência com Ferramentas", description: "Proficiência em ferramentas de carpinteiro." },
          { name: "Canhão Místico", description: "Cria um canhão mágico pequeno ou minúsculo. Opções: Lança-chamas, Força de Balista ou Protetor." }
        ],
        5: [{ name: "Arma de Fogo Arcana", description: "Foca magia em um objeto para causar +1d8 de dano em feitiços de artífice." }],
        9: [{ name: "Canhão Explosivo", description: "Dano do canhão aumenta em 1d8. Pode usar uma ação para detonar o canhão (3d8 de dano em área)." }],
        15: [{ name: "Posição Fortificada", description: "Pode ter dois canhões ativos. Seus canhões fornecem meia-cobertura a você e aliados a até 3 metros." }]
      }
    },
    "Ferreiro de Batalha": {
      description: "Engenheiros táticos de combate que lutam ao lado de um defensor mecânico, usando inteligência para golpear com armas mágicas e canalizando pulso de energia curativa.",
      spells: ["Escudo", "Heroísmo", "Marca da Punição", "Vínculo de Proteção", "Aura de Vitalidade", "Invocar Barragem", "Aura de Pureza", "Escudo de Fogo", "Banimento Destruidor", "Curar Ferimentos em Massa"],
      features: {
        3: [
          { name: "Proficiência com Ferramentas", description: "Proficiência em ferramentas de ferreiro e armas marciais." },
          { name: "Pronto para a Batalha", description: "Usa Inteligência para ataques e dano com armas mágicas." },
          { name: "Defensor de Aço", description: "Cria um companheiro mecânico que compartilha sua iniciativa e protege aliados." }
        ],
        5: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque." }],
        9: [{ name: "Pulso Arcano", description: "Quando atinge com arma mágica ou o defensor atinge, pode causar 2d6 extra ou curar 2d6 a aliado próximo (INT/dia)." }],
        15: [{ name: "Defensor Aprimorado", description: "Dano e cura do Pulso Arcano aumentam para 4d6. O defensor ganha +2 na CA e causa dano quando usa Defletir Ataque." }]
      }
    }
  },
  'Paladino': {
    "Juramento de Devoção": {
      description: "A personificação do cavaleiro de armadura brilhante, paladinos da devoção comprometem-se com a justiça, a honra e o dever, canalizando luz divina para purificar suas armas e proteger aliados de encantos.",
      spells: ["Proteção contra o Bem e Mal", "Santuário", "Restauração Menor", "Zona da Verdade", "Farol de Esperança", "Dissipar Magia", "Movimentação Livre", "Guardião da Fé", "Comunhão", "Coluna de Chamas"],
      features: {
        3: [
          { name: "Canalizar Divindade: Arma Sagrada", description: "Com uma ação, você imbui uma arma que esteja segurando com energia positiva por 1 minuto. Você soma seu modificador de Carisma às jogadas de ataque com essa arma (mínimo +1), ela emite luz plena em 6m (penumbra +6m) e passa a contar como mágica." },
          { name: "Canalizar Divindade: Expulsar o Profano", description: "Com uma ação, cada corruptor ou morto-vivo a até 9 metros que possa vê-lo ou ouvi-lo deve fazer um teste de resistência de Sabedoria ou ficará expulso por 1 minuto (ou até sofrer dano), tendo que fugir de você." }
        ],
        7: [{ name: "Aura de Devoção", description: "Você e criaturas amigáveis a até 3 metros de você não podem ser enfeitiçados enquanto você estiver consciente (aumenta para 9 metros no 18º nível)." }],
        15: [{ name: "Pureza de Espírito", description: "Você está permanentemente sob o efeito da magia Proteção contra o Bem e o Mal." }],
        20: [{ name: "Halo Sagrado", description: "Com uma ação, você emana luz solar plena por 1 minuto (9m, penumbra +9m). Inimigos que iniciarem o turno na luz plena sofrem 10 de dano radiante, e você tem vantagem em testes de resistência contra magias de corruptores e mortos-vivos (1× por descanso longo)." }]
      }
    },
    "Juramento dos Anciãos": {
      description: "Guerreiros verdes que juraram proteger a beleza, a luz e a alegria do mundo contra a corrupção do tempo, ganhando resistências mágicas incríveis sob a bênção da natureza antiga.",
      spells: ["Golpe Enredante", "Falar com Animais", "Passo Nebuloso", "Raio Lunar", "Crescimento de Plantas", "Proteção contra Energia", "Tempestade de Gelo", "Pele de Pedra", "Comungar com a Natureza", "Caminhar em Árvores"],
      features: {
        3: [
          { name: "Canalizar Divindade: Fúria da Natureza", description: "Com uma ação, invoca vinhas espectrais para prender uma criatura a até 3 metros. Ela deve fazer um teste de resistência de Força ou Destreza (à escolha dela) ou ficará impedida (repete o teste no fim de cada turno)." },
          { name: "Canalizar Divindade: Expulsar os Infiéis", description: "Com uma ação, cada fada ou corruptor a até 9 metros que possa vê-lo ou ouvi-lo deve fazer um teste de resistência de Sabedoria ou ficará expulso por 1 minuto (ou até sofrer dano)." }
        ],
        7: [{ name: "Aura de Vigilância", description: "Você e criaturas amigáveis a até 3 metros de você têm resistência ao dano causado por magias (aumenta para 9 metros no 18º nível)." }],
        15: [{ name: "Sentinela Imortal", description: "Quando você cair a 0 Pontos de Vida e não morrer instantaneamente, pode escolher cair a 1 PV em vez disso (1× por descanso longo). Além disso, você não sofre as desvantagens da velhice." }],
        20: [{ name: "Campeão dos Anciões", description: "Com uma ação, assume uma forma primordial por 1 minuto: recupera 10 PV no início de cada turno, pode conjurar magias de paladino com tempo de 1 ação como ação bônus e inimigos a até 3 metros têm desvantagem em testes de resistência contra suas magias (1× por descanso longo)." }]
      }
    },
    "Juramento de Vingança": {
      description: "Cavaleiros implacáveis focados na retribuição e na caça de alvos específicos, paladinos da vingança não poupam esforços para punir o mal, garantindo vantagem constante em combate.",
      spells: ["Perdição", "Marca do Caçador", "Imobilizar Pessoa", "Passo Nebuloso", "Velocidade", "Proteção contra Energia", "Banimento", "Porta Dimensional", "Imobilizar Monstro", "Vidência"],
      features: {
        3: [
          { name: "Canalizar Divindade: Abjurar Inimigo", description: "Com uma ação, escolha uma criatura a até 18 metros que possa vê-lo. Ela faz um teste de resistência de Sabedoria (corruptores e mortos-vivos têm desvantagem): se falhar, fica amedrontada e com deslocamento 0 por 1 minuto (ou até sofrer dano); se passar, tem deslocamento reduzido à metade." },
          { name: "Canalizar Divindade: Voto de Inimizade", description: "Com uma ação bônus, escolha uma criatura a até 3 metros que possa ver. Você ganha vantagem nas jogadas de ataque contra ela por 1 minuto (ou até ela cair a 0 PV ou ficar inconsciente)." }
        ],
        7: [{ name: "Vingador Implacável", description: "Quando atingir uma criatura com um ataque de oportunidade, você pode se mover até metade do seu deslocamento imediatamente como parte da mesma reação, sem provocar ataques de oportunidade." }],
        15: [{ name: "Alma de Vingança", description: "Quando a criatura marcada pelo seu Voto de Inimizade fizer um ataque, você pode usar sua reação para fazer um ataque corpo a corpo com arma contra ela (se estiver ao alcance)." }],
        20: [{ name: "Anjo Vingador", description: "Com uma ação, você ganha asas angelicais por 1 hora (voo 18m) e emana uma aura de ameaça de 9 metros: inimigos que entrarem ou iniciarem o turno na aura devem passar em um teste de resistência de Sabedoria ou ficam amedrontados por 1 minuto (1× por descanso longo)." }]
      }
    }
  },
  'Monge': {
    "Caminho da Mão Aberta": {
      description: "Mestres supremos do combate desarmado, monges deste caminho manipulam a energia do corpo para derrubar inimigos, curar a si mesmos e desferir a lendária Palma Vibrante.",
      features: {
        3: [{ name: "Técnica da Mão Aberta", description: "Sempre que acertar uma criatura com um dos ataques da sua Rajada de Golpes, você pode impor um efeito: derrubá-la (teste de Destreza, condição Caído), empurrá-la até 4,5 metros (teste de Força) ou impedi-la de usar reações até o fim do seu próximo turno." }],
        6: [{ name: "Integridade Corporal", description: "Com uma ação, você recupera Pontos de Vida iguais a 3 × seu nível de monge (1× por descanso longo)." }],
        11: [{ name: "Tranquilidade", description: "Ao terminar um descanso longo, você ganha o efeito da magia Santuário, que dura até o início do seu próximo descanso longo (termina antes se você atacar ou conjurar magia ofensiva)." }],
        17: [{ name: "Palma Vibrante", description: "Ao acertar um ataque desarmado, pode gastar 3 pontos de ki para criar vibrações letais no alvo (dura dias iguais ao seu nível). Com uma ação, você encerra as vibrações: o alvo faz um teste de resistência de Constituição e, se falhar, cai a 0 PV (se passar, sofre 10d10 de dano necrótico)." }]
      }
    },
    "Caminho da Sombra": {
      description: "Monges assassinos que transitam silenciosamente pelas sombras, conjurando magias de silêncio e escuridão e teleportando-se entre locais escuros para atacar de surpresa.",
      features: {
        3: [{ name: "Artes Sombrias", description: "Você pode gastar 2 pontos de ki como uma ação para conjurar Escuridão, Visão no Escuro, Passos sem Pegadas ou Silêncio (sem componentes materiais). Você também ganha o truque Ilusão Menor." }],
        6: [{ name: "Passo das Sombras", description: "Quando estiver em penumbra ou escuridão, você pode usar uma ação bônus para se teletransportar até 18 metros para outro espaço em penumbra ou escuridão que possa ver, ganhando vantagem no primeiro ataque corpo a corpo que fizer antes do fim do turno." }],
        11: [{ name: "Manto de Sombras", description: "Quando estiver em uma área de penumbra ou escuridão, você pode usar sua ação para ficar invisível (dura até você atacar, conjurar uma magia ou entrar em luz plena)." }],
        17: [{ name: "Oportunista", description: "Quando uma criatura a até 1,5 metro de você for atingida por um ataque feito por outra criatura, você pode usar sua reação para fazer um ataque corpo a corpo contra ela." }]
      }
    },
    "Caminho dos Quatro Elementos": {
      description: "Artistas marciais que sintonizam seu ki com as forças elementais da terra, ar, fogo e água, conjurando magias e ataques elementais devastadores através de seu corpo físico.",
      features: {
        3: [{ name: "Discípulo dos Elementos", description: "Aprende disciplinas mágicas que manipulam os elementos gastando pontos de chi." }],
        6: [{ name: "Disciplina Adicional", description: "Você aprende uma nova disciplina elemental." }],
        11: [{ name: "Disciplina Adicional", description: "Você aprende uma nova disciplina elemental." }],
        17: [{ name: "Disciplina Adicional", description: "Você aprende uma nova disciplina elemental." }]
      }
    },
    "Caminho da Misericórdia": {
      description: "Monges do Caminho da Misericórdia aprendem a manipular a força vital dos outros para auxiliar aqueles em necessidade. Eles são médicos ambulantes para os pobres e feridos. Contudo, para aqueles além de sua ajuda, eles trazem um fim rápido, como um ato de misericórdia.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [
          { name: "Implementos da Misericórdia", description: "Adquire proficiência nas perícias de Intuição e Medicina, proficiência com o kit de herbalismo e recebe uma máscara especial." },
          { name: "Mãos Curativas", description: "Use uma ação e gaste 1 ponto de ki para tocar uma criatura e restaurar PV igual a uma rolagem do dado de Artes Marciais + mod. Sabedoria. Ao usar Torrente de Golpes, pode substituir um ataque desarmado por essa cura sem gastar ki extra." },
          { name: "Mãos da Injúria", description: "Quando acerta um ataque desarmado, pode gastar 1 ponto de ki para causar dano necrótico extra igual a uma rolagem do seu dado de Artes Marciais + mod. Sabedoria (1×/turno)." }
        ],
        6: [{ name: "Toque do Curandeiro", description: "Ao usar Mãos Curativas, também remove a condição envenenado, paralisado, atordoado, cego ou ensurdecido (ou uma doença). Ao usar Mãos da Injúria, pode deixar o alvo envenenado até o fim do seu próximo turno." }],
        11: [{ name: "Torrente de Cura e Dor", description: "Ao usar Torrente de Golpes, pode substituir ambos os ataques desarmados por Mãos Curativas sem gastar ki. Também pode aplicar Mãos da Injúria sem gastar ki adicional (ainda limitado a 1×/turno)." }],
        17: [{ name: "Mão da Misericórdia Final", description: "Use uma ação para tocar o corpo de uma criatura que morreu nas últimas 24 horas e gastar 5 pontos de ki. A criatura retorna à vida com 4d10 + mod. Sabedoria PV e remove cegueira, surdez, paralisia, envenenamento ou atordoamento. 1×/descanso longo." }]
      }
    },
    "Caminho da Forma Astral": {
      description: "Um monge que segue o Caminho da Forma Astral acredita que seu corpo é uma ilusão. Eles enxergam seu ki como a representação de sua forma verdadeira, sua forma astral.",
      source: "Tasha's Cauldron of Everything",
      features: {
        3: [{ name: "Braços da Forma Astral", description: "Ação bônus: gaste 1 ponto de ki para invocar os braços astrais por 10 min. Ao invocar, inimigos a até 3m fazem save de Destreza ou sofrem 2 dados de Artes Marciais de dano de energia. Enquanto ativos, pode usar Sabedoria em testes/saves de Força, tem +1,5m de alcance desarmado, e faz ataques desarmados com Sabedoria causando dano de energia." }],
        6: [{ name: "Semblante da Forma Astral", description: "Ação bônus (ou parte da ativação dos braços): gaste 1 ponto de ki para invocar o semblante por 10 min. Benefícios: enxerga na escuridão mágica e não-mágica a até 36m, vantagem em testes de Intuição e Intimidação, e pode falar telepaticamente com uma criatura a até 18m ou ampliar a voz para até 180m." }],
        11: [{ name: "Corpo Astral", description: "Quando braços e semblante estão ativos, o corpo astral aparece (sem ação). Benefícios: Reação para reduzir dano de ácido, frio, fogo, relâmpago, trovão ou energia por 1d10 + mod. Sabedoria (mín. 1); e causa dano extra igual a 1 dado de Artes Marciais 1×/turno ao acertar com os braços." }],
        17: [{ name: "Forma Astral Desperta", description: "Ação bônus: gaste 5 pontos de ki para invocar braços, semblante e corpo ativando o despertar por 10 min. Ganha +2 de CA e pode realizar um terceiro ataque com a ação de ataque extra se todos forem realizados com os braços astrais." }]
      }
    }
  },
  'Caçador de Sangue': {
    "Ordem do Caçador de Espectros": {
      description: "A mais antiga das ordens, refinada para o combate contra o flagelo dos mortos-vivos e sintonizada com os mistérios da transição da morte.",
      features: {
        3: [{ name: "Ritual da Alvorada", description: "Seu dano de ritual se torna radiante e causa dano radiante adicional igual ao seu mod. de Sabedoria contra mortos-vivos (a qualquer criatura a partir do 11º nível)." }],
        7: [{ name: "Veias Sagradas", description: "Suas maldições de sangue afetam qualquer criatura mesmo sem sangue. Mortos-vivos devem passar em salvaguarda de Sabedoria ou não poderão atacar você." }],
        11: [{ name: "Elevação Impulsiva", description: "Permite fazer um ataque com arma como ação bônus e entrar temporariamente no plano espiritual (movimento através de objetos)." }],
        15: [{ name: "Visão da Sepultura", description: "Permite ver na escuridão mágica a até 9 metros, além de enxergar criaturas e objetos invisíveis." }],
        18: [{ name: "Espírito Vingativo", description: "Ao cair a 0 PV, sua alma pode emergir e continuar lutando sob seu controle enquanto seu corpo faz testes contra a morte." }]
      }
    },
    "Ordem do Licantropo": {
      description: "Caçadores que aceitaram a maldição da licantropia, controlando a fera interna através de magia de sangue para liberar uma forma híbrida devastadora.",
      features: {
        3: [
          { name: "Sentidos Aguçados", description: "Vantagem em testes de Percepção baseados em audição e olfato." },
          { name: "Transformação Híbrida", description: "Transforma-se em forma Híbrida por 10 minutos (2x/descanso). Concede bônus de dano corpo-a-corpo, resistência a danos físicos não-mágicos/prata, bônus na CA e ataques desarmados aprimorados." }
        ],
        7: [{ name: "Proeza do Perseguidor", description: "Deslocamento +3m, distância de saltos aumentada e ataques desarmados contam como mágicos." }],
        11: [{ name: "Transformação Avançada", description: "Transformação como ação bônus por até 30 minutos. Ganha Regeneração Licantrópica e Precisão Bestial (bônus no ataque)." }],
        15: [{ name: "Vontade de Ferro", description: "Vantagem nas salvaguardas para manter controle da forma híbrida e ganha Táticas de Matilha (vantagem no ataque com aliado próximo)." }],
        18: [{ name: "Maestria da Transformação Híbrida", description: "Transformação híbrida 3x/descanso. Ganha a Maldição de Sangue do Rugido (assustar e atordoar com medo)." }]
      }
    },
    "Ordem do Mutante": {
      description: "Mestres de fórmulas alquímicas proibidas, estes caçadores criam e consomem elixires tóxicos para alterar temporariamente sua fisiologia corporal.",
      features: {
        3: [
          { name: "Fórmulas", description: "Aprende três fórmulas mutagênicas para preparar elixires." },
          { name: "Criação de Mutagênicos", description: "Cria mutagênicos em descansos curtos. Consumir um mutagênico fornece bônus potentes mas também efeitos colaterais negativos." }
        ],
        7: [{ name: "Criação de Mutagênico Avançada", description: "Pode criar e consumir dois mutagênicos simultaneamente durante um descanso curto." }],
        11: [{ name: "Metabolismo Estranho", description: "Ignora os efeitos colaterais de um mutagênico ativo em você por 1 minuto (1x/descanso)." }],
        15: [{ name: "Fisiologia Robusta", description: "Imunidade a dano de veneno e à condição envenenado. Pode criar até três mutagênicos simultaneamente." }],
        18: [{ name: "Mutação Exaltada", description: "Escolha uma fórmula conhecida. Seus benefícios e efeitos colaterais tornam-se permanentes no seu corpo." }]
      }
    },
    "Ordem da Alma Profana": {
      description: "Caçadores que firmaram pactos com entidades do Outro Mundo para canalizar feitiços arcanos contra os males maiores.",
      features: {
        3: [
          { name: "Patrono do Outro Mundo", description: "Barganha com um Arquifada, Corruptor, Grande Antigo, Imortal, Celestial ou Hexblade." },
          { name: "Conjuração de Pacto", description: "Conjura magias de bruxo usando sua Sabedoria como atributo de conjuração." },
          { name: "Foco Ritual", description: "Sua arma ativa serve como foco e seu patrono aprimora os efeitos do seu Ritual Vermelho." }
        ],
        7: [
          { name: "Frenesi Místico", description: "Ao usar sua ação para conjurar um truque, pode realizar um ataque com arma como ação bônus." },
          { name: "Arcana Mística", description: "Conjura uma magia especial uma vez por descanso longo com base no seu patrono escolhido." }
        ],
        11: [{ name: "Canalização Diabólica", description: "Imbui temporariamente sua arma com uma magia de bruxo ativa para descarregar o efeito no acerto do ataque." }],
        15: [{ name: "Arcana Revelada", description: "Ganha uma magia de círculo superior específica com base no seu patrono (1x/descanso longo)." }],
        18: [{ name: "Sifão de Armas", description: "Ao reduzir uma criatura de ND 15+ a 0 PV com ataque, recupera um espaço de magia gasto." }]
      }
    }
  }
}
