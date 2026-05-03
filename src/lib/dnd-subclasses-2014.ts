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

export const SUBCLASSES_2014: Record<string, ClassSubclasses> = {
  'Bárbaro': {
    "Caminho do Furioso": {
      features: {
        3: [{ name: "Frenesi", description: "Pode entrar em frenesi ao enfurecer; permite um ataque de arma corpo-a-corpo como ação bônus em cada turno. Sofre exaustão ao fim da fúria." }],
        6: [{ name: "Fúria Inconsciente", description: "Não pode ser enfeitiçado ou amedrontado enquanto estiver em fúria. Efeitos atuais são suspensos." }],
        10: [{ name: "Presença Intimidante", description: "Usa ação para amedrontar criatura a até 9m (CD 8+Prof+Car). Pode estender com ações em turnos seguintes." }],
        14: [{ name: "Retaliação", description: "Quando sofrer dano de criatura a até 1,5m, pode usar reação para atacar quem te atingiu." }]
      }
    },
    "Caminho do Guerreiro Totêmico": {
      features: {
        3: [
          { name: "Conselheiro Espiritual", description: "Pode conjurar Sentido Bestial e Falar com Animais como rituais." },
          { name: "Totem Espiritual", description: "Escolha um totem: Urso (Resistência a quase tudo), Águia (Disparada como ação bônus e AdO com desvantagem), Lobo (Vantagem para aliados próximos)." }
        ],
        6: [{ name: "Aspecto da Besta", description: "Escolha: Urso (Dobrar capacidade de carga), Águia (Visão de 1,6km), Lobo (Rastrear em passo rápido)." }],
        10: [{ name: "Andarilho Espiritual", description: "Pode conjurar Comunhão com a Natureza como ritual." }],
        14: [{ name: "Sintonia Totêmica", description: "Escolha: Urso (Inimigos tem desvantagem ao atacar aliados), Águia (Voo temporário), Lobo (Derrubar com ação bônus)." }]
      }
    }
  },
  'Bardo': {
    "Colégio do Conhecimento": {
      features: {
        3: [
          { name: "Proficiência Adicional", description: "Ganha proficiência em três perícias à sua escolha." },
          { name: "Palavras de Interrupção", description: "Usa sua reação para gastar Inspiração Bárdica e subtrair o valor do ataque, dano ou teste de uma criatura." }
        ],
        6: [{ name: "Segredos Mágicos Adicionais", description: "Você aprende duas magias de qualquer classe, que contam como magias de bardo." }],
        14: [{ name: "Perícia Inigualável", description: "Pode gastar Inspiração Bárdica para adicionar o dado ao seu próprio teste de habilidade." }]
      }
    },
    "Colégio da Bravura": {
      features: {
        3: [
          { name: "Proficiência Adicional", description: "Ganha proficiência com armaduras médias, escudos e armas marciais." },
          { name: "Inspiração em Combate", description: "Criaturas podem usar o dado de inspiração para aumentar o dano ou a CA contra um ataque." }
        ],
        6: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes quando usa a ação de Ataque." }],
        14: [{ name: "Magia de Batalha", description: "Quando usa ação para conjurar uma magia, pode realizar um ataque com arma como ação bônus." }]
      }
    }
  },
  'Clérigo': {
    "Domínio do Conhecimento": {
      spells: ["Comando", "Identificação", "Augúrio", "Sugestão", "Dificultar Detecção", "Falar com os Mortos", "Olho Arcano", "Confusão", "Conhecimento Lendário", "Vidência"],
      features: {
        1: [
          { name: "Bênçãos do Conhecimento", description: "Aprende dois idiomas e ganha proficiência (com bônus dobrado) em duas perícias de conhecimento." }
        ],
        2: [{ name: "Canalizar Divindade: Conhecimento das Eras", description: "Ganha proficiência com uma perícia ou ferramenta por 10 minutos." }],
        6: [{ name: "Canalizar Divindade: Ler Pensamentos", description: "Lê pensamentos superficiais e pode conjurar Sugestão sem gastar espaço." }],
        8: [{ name: "Conjuração Poderosa", description: "Adiciona modificador de Sabedoria ao dano de seus truques de clérigo." }],
        17: [{ name: "Visões do Passado", description: "Pode ver eventos passados relacionados a um objeto ou local." }]
      }
    },
    "Domínio da Enganação": {
      spells: ["Enfeitiçar Pessoa", "Disfarçar-se", "Reflexos", "Passos sem Pegadas", "Piscar", "Dissipar Magia", "Porta Dimensional", "Metamorfose", "Dominar Pessoa", "Modificar Memória"],
      features: {
        1: [{ name: "Bênção do Trapaceiro", description: "Dá vantagem em testes de Furtividade para um aliado tocado por 1 hora." }],
        2: [{ name: "Canalizar Divindade: Invocar Duplicidade", description: "Cria uma duplicata ilusória perfeita; pode conjurar magias a partir dela." }],
        6: [{ name: "Canalizar Divindade: Manto de Sombras", description: "Fica invisível até o final do seu próximo turno ou até atacar/conjurar." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, causa 1d8 extra de dano de veneno com ataques de arma." }],
        17: [{ name: "Duplicidade Aprimorada", description: "Pode criar até quatro duplicatas de si mesmo com Invocar Duplicidade." }]
      }
    },
    "Domínio da Guerra": {
      spells: ["Auxílio Divino", "Escudo da Fé", "Arma Mágica", "Arma Espiritual", "Manto do Cruzado", "Espíritos Guardiões", "Movimentação Livre", "Pele de Pedra", "Coluna de Chamas", "Imobilizar Monstro"],
      features: {
        1: [
          { name: "Proficiência Adicional", description: "Ganha proficiência com armas marciais e armaduras pesadas." },
          { name: "Sacerdote da Guerra", description: "Pode fazer um ataque de arma como ação bônus (número de vezes igual ao Mod. Sab)." }
        ],
        2: [{ name: "Canalizar Divindade: Ataque Dirigido", description: "Ganha +10 de bônus em uma jogada de ataque própria." }],
        6: [{ name: "Canalizar Divindade: Bênção do Deus da Guerra", description: "Dá +10 de bônus em uma jogada de ataque de um aliado a até 9m." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, causa 1d8 extra de dano do tipo da arma." }],
        17: [{ name: "Avatar da Batalha", description: "Resistência a dano de concussão, cortante e perfurante de ataques não-mágicos." }]
      }
    },
    "Domínio da Luz": {
      spells: ["Mãos Flamejantes", "Fogo das Fadas", "Esfera Flamejante", "Raio Ardente", "Luz do Dia", "Bola de Fogo", "Guardião da Fé", "Muralha de Fogo", "Coluna de Chamas", "Vidência"],
      features: {
        1: [
          { name: "Truque Adicional", description: "Você aprende o truque Luz." },
          { name: "Labareda Protetora", description: "Usa sua reação para imponer desvantagem no ataque de uma criatura a até 9m." }
        ],
        2: [{ name: "Canalizar Divindade: Radiação do Amanhecer", description: "Dissipa escuridão mágica e causa 2d10 + nível de dano radiante em inimigos (9m)." }],
        6: [{ name: "Labareda Aprimorada", description: "Pode usar Labareda Protetora para proteger aliados." }],
        8: [{ name: "Conjuração Poderosa", description: "Adiciona seu modificador de Sabedoria ao dano de truques de clérigo." }],
        17: [{ name: "Coroa de Luz", description: "Usa ação para emitir luz solar; inimigos têm desvantagem em saves contra fogo ou radiante." }]
      }
    },
    "Domínio da Natureza": {
      spells: ["Amizade Animal", "Falar com Animais", "Pele de Árvore", "Crescer Espinhos", "Ampliar Plantas", "Muralha de Vento", "Dominar Besta", "Vinha Esmagadora", "Praga de Insetos", "Caminhar em Árvores"],
      features: {
        1: [
          { name: "Acólito da Natureza", description: "Aprende um truque de druida e ganha proficiência em uma perícia (Natureza, Sobrevivência ou Adestrar Animais)." },
          { name: "Proficiência Adicional", description: "Ganha proficiência com armaduras pesadas." }
        ],
        2: [{ name: "Canalizar Divindade: Enfeitiçar Animais e Plantas", description: "Usa ação para enfeitiçar bestas e plantas a até 9m por 1 minuto." }],
        6: [{ name: "Amortecer Elementos", description: "Usa reação para dar resistência a dano elemental a uma criatura a até 9m." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, causa 1d8 extra de dano de frio, fogo ou elétrico." }],
        17: [{ name: "Senhor da Natureza", description: "Pode comandar criaturas enfeitiçadas por seu Canalizar Divindade com ação bônus." }]
      }
    },
    "Domínio da Tempestade": {
      spells: ["Névoa Obscurecente", "Onda Trovejante", "Lufada de Vento", "Despedaçar", "Convocar Relâmpagos", "Nevasca", "Controlar a Água", "Tempestade de Gelo", "Onda Destrutiva", "Praga de Insetos"],
      features: {
        1: [
          { name: "Proficiência Adicional", description: "Ganha proficiência com armas marciais e armaduras pesadas." },
          { name: "Ira da Tormenta", description: "Ao ser atingido por criatura a 1,5m, usa reação para causar 2d8 de dano elétrico ou trovão." }
        ],
        2: [{ name: "Canalizar Divindade: Ira Destruidora", description: "Ao rolar dano elétrico ou trovejante, pode usar o dano máximo em vez de rolar." }],
        6: [{ name: "Golpe de Relâmpago", description: "Ao causar dano elétrico em criatura Grande ou menor, pode empurrá-la até 3m." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, causa 1d8 extra de dano trovejante com ataques de arma." }],
        17: [{ name: "Filho da Tormenta", description: "Ganha deslocamento de voo igual ao seu deslocamento de caminhada ao ar livre." }]
      }
    },
    "Domínio da Vida": {
      spells: ["Bênção", "Curar Ferimentos", "Restauração Menor", "Arma Espiritual", "Sinal de Esperança", "Revivificar", "Proteção Contra a Morte", "Guardião da Fé", "Curar Ferimentos em Massa", "Reviver os Mortos"],
      features: {
        1: [
          { name: "Proficiência Adicional", description: "Proficiência em armaduras pesadas." },
          { name: "Discípulo da Vida", description: "Sempre que usar magia de cura, o alvo recupera PV adicionais iguais a 2 + nível da magia." }
        ],
        2: [{ name: "Canalizar Divindade: Preservar a Vida", description: "Cura criaturas a até 9m (5x nível de clérigo) até metade do HP máximo." }],
        6: [{ name: "Curandeiro Abençoado", description: "Quando curar outra criatura, você também se cura em 2 + nível da magia." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, causa 1d8 extra de dano radiante com ataques de arma." }],
        17: [{ name: "Cura Suprema", description: "Ao curar com magia, usa o valor máximo de cada dado em vez de rolar." }]
      }
    }
  },
  'Guerreiro': {
    "Campeão": {
      features: {
        3: [{ name: "Crítico Aprimorado", description: "Suas jogadas de ataque com arma acertam crítico com 19 ou 20." }],
        7: [{ name: "Atleta Extraordinário", description: "Soma metade da proficiência em testes físicos sem proficiência; aumenta distância de salto." }],
        10: [{ name: "Estilo de Luta Adicional", description: "Escolhe um segundo Estilo de Luta da lista da classe." }],
        15: [{ name: "Crítico Superior", description: "Suas jogadas de ataque com arma acertam crítico com 18, 19 ou 20." }],
        18: [{ name: "Sobrevivente", description: "Recupera 5 + Mod. Con de vida se estiver com menos de 50% HP (e acima de 0)." }]
      }
    },
    "Cavaleiro Arcano": {
      features: {
        3: [
          { name: "Conjuração", description: "Você aprende truques e magias de mago (abjuração/evocação) usando Inteligência." },
          { name: "Vínculo com Arma", description: "Cria um elo com até 2 armas; pode invocá-las para sua mão com ação bônus." }
        ],
        7: [{ name: "Magia de Guerra", description: "Quando usa ação para conjurar um truque, pode fazer um ataque como ação bônus." }],
        10: [{ name: "Golpe Místico", description: "Ataque com arma impõe desvantagem no próximo save contra sua magia." }],
        15: [{ name: "Investida Arcana", description: "Ao usar Surto de Ação, pode se teletransportar até 9 metros." }],
        18: [{ name: "Magia de Guerra Aprimorada", description: "Quando usa ação para conjurar uma magia, pode fazer um ataque como ação bônus." }]
      }
    },
    "Mestre de Batalha": {
      features: {
        3: [
          { name: "Superioridade em Combate", description: "Ganha 4 dados de superioridade (d8) para usar manobras como Aparar, Derrubar, etc." },
          { name: "Estudioso da Guerra", description: "Ganha proficiência com um tipo de ferramenta de artesão." }
        ],
        7: [{ name: "Conheça Seu Inimigo", description: "Observar criatura por 1 min revela se ela é superior/igual/inferior em certos atributos." }],
        10: [{ name: "Superioridade em Combate Aprimorada", description: "Seus dados de superioridade se tornam d10s." }],
        15: [{ name: "Implacável", description: "Se rolar iniciativa sem dados de superioridade, você recupera um." }],
        18: [{ name: "Superioridade em Combate Aprimorada (d12)", description: "Seus dados de superioridade se tornam d12s." }]
      }
    }
  },
  'Ladino': {
    "Assassino": {
      features: {
        3: [
          { name: "Proficiências Adicionais", description: "Ganha proficiência com kit de disfarce e kit de venenos." },
          { name: "Assassinar", description: "Vantagem contra criaturas que ainda não agiram. Acertos contra criaturas surpresas são críticos." }
        ],
        9: [{ name: "Especialização em Infiltração", description: "Pode criar identidades falsas infalíveis com 7 dias de trabalho e 25 po." }],
        13: [{ name: "Impostor", description: "Pode imitar a fala, escrita e comportamento de outra pessoa após estudá-la por 3 horas." }],
        17: [{ name: "Golpe Letal", description: "Ao atingir uma criatura surpresa, ela deve passar num save de Con ou sofrer dano dobrado." }]
      }
    },
    "Ladrão": {
      features: {
        3: [
          { name: "Mãos Rápidas", description: "Ação bônus para usar ferramentas de ladrão, bater carteiras ou usar um objeto." },
          { name: "Andarilho de Telhados", description: "Escalar não custa movimento extra e aumenta a distância de saltos." }
        ],
        9: [{ name: "Furtividade Suprema", description: "Vantagem em Furtividade se mover metade do deslocamento ou menos." }],
        13: [{ name: "Usar Instrumento Mágico", description: "Ignora requisitos de classe, raça e nível para usar qualquer item mágico." }],
        17: [{ name: "Reflexos de Ladrão", description: "Pode realizar dois turnos durante o primeiro turno de cada combate." }]
      }
    },
    "Trapaceiro Arcano": {
      features: {
        3: [
          { name: "Conjuração", description: "Você aprende truques e magias de mago (encantamento/ilusão) usando Inteligência." },
          { name: "Mãos Mágicas Malabaristas", description: "Suas Mãos Mágicas ficam invisíveis e podem realizar tarefas como abrir fechaduras à distância." }
        ],
        9: [{ name: "Emboscada Mágica", description: "Se estiver escondido, o alvo tem desvantagem no save contra sua magia." }],
        13: [{ name: "Trapaceiro Versátil", description: "Usa ação bônus para dar vantagem a si mesmo com as Mãos Mágicas." }],
        17: [{ name: "Ladrão de Magia", description: "Pode usar sua reação para roubar o conhecimento de uma magia conjurada contra você." }]
      }
    }
  },
  'Feiticeiro': {
    "Linhagem Dracônica": {
      features: {
        1: [
          { name: "Ancestral Dracônico", description: "Você escolhe um tipo de dragão como seu ancestral. Você pode falar, ler e escrever em Dracônico e seu bônus de proficiência é dobrado em testes de Carisma com dragões." },
          { name: "Resiliência Dracônica", description: "Seu máximo de PV aumenta em 1 por nível. Quando sem armadura, sua CA é 13 + Modificador de Destreza." }
        ],
        6: [{ name: "Afinidade Elemental", description: "Adicione seu modificador de Carisma ao dano de magias do tipo do seu ancestral. Pode gastar 1 ponto de feitiçaria para ganhar resistência a esse dano por 1 hora." }],
        14: [{ name: "Asas de Dragão", description: "Você pode criar um par de asas de dragão com uma ação bônus, ganhando deslocamento de voo igual ao seu deslocamento atual." }],
        18: [{ name: "Presença Dracônica", description: "Gasta 5 pontos para exalar uma aura de admiração ou medo (18m) por 1 minuto (concentração)." }]
      }
    },
    "Magia Selvagem": {
      features: {
        1: [
          { name: "Surto de Magia Selvagem", description: "Após conjurar magia de 1º nível+, o Mestre pode pedir um d20. Se rolar 1, ocorre um efeito aleatório da tabela de Surto de Magia Selvagem." },
          { name: "Marés de Caos", description: "Ganha vantagem em uma jogada de ataque, teste de habilidade ou salvaguarda. Recupera após um descanso longo ou se o Mestre forçar um Surto." }
        ],
        6: [{ name: "Sortudo", description: "Usa reação e 2 pontos para adicionar ou subtrair 1d4 da jogada de outra criatura." }],
        14: [{ name: "Caos Controlado", description: "Ao rolar na tabela de Surto de Magia Selvagem, você pode rolar duas vezes e escolher o resultado." }],
        18: [{ name: "Bombardeio de Feitiços", description: "Quando rolar o dano máximo em um dado de magia, role um dado adicional e some ao total." }]
      }
    }
  },
  'Bruxo': {
    "A Arquifada": {
      spells: ["Fogo das Fadas", "Sono", "Acalmar Emoções", "Força Fantasmagórica", "Piscar", "Ampliar Plantas", "Dominar Besta", "Invisibilidade Maior", "Dominar Pessoa", "Similaridade"],
      features: {
        1: [{ name: "Presença Feérica", description: "Usa sua ação para amedrontar ou enfeitiçar criaturas em um cubo de 3m (CD de magia)." }],
        6: [{ name: "Névoa de Fuga", description: "Ao sofrer dano, usa reação para ficar invisível e se teletransportar até 18m." }],
        10: [{ name: "Defesa Sedutora", description: "Imune a ser enfeitiçado. Pode usar reação para tentar voltar um encanto contra o conjurador." }],
        14: [{ name: "Delírio Sombrio", description: "Usa ação para mergulhar criatura em reino ilusório (enfeitiçada ou amedrontada por 1 min)." }]
      }
    },
    "O Corruptor": {
      spells: ["Mãos Flamejantes", "Comando", "Cegueira/Surdez", "Raio Ardente", "Bola de Fogo", "Névoa Fétida", "Escudo de Fogo", "Muralha de Fogo", "Coluna de Chamas", "Consagrar"],
      features: {
        1: [{ name: "Bênção do Obscuro", description: "Ganha PV temporários (Mod. Car + nível) ao reduzir inimigo hostil a 0 PV." }],
        6: [{ name: "Sorte do Próprio Obscuro", description: "Adiciona 1d10 a um teste de habilidade ou resistência (1x/descanso curto)." }],
        10: [{ name: "Resiliência Demoníaca", description: "Escolhe um tipo de dano para ganhar resistência após cada descanso longo." }],
        14: [{ name: "Lançar no Inferno", description: "Ao atingir com ataque, transporta alvo para planos inferiores; causa 10d10 de dano psíquico." }]
      }
    },
    "O Grande Antigo": {
      spells: ["Sussurros Dissonantes", "Riso Histérico de Tasha", "Detectar Pensamentos", "Força Fantasmagórica", "Clarividência", "Enviar Mensagem", "Dominar Besta", "Tentáculos Negros de Evard", "Dominar Pessoa", "Telecinésia"],
      features: {
        1: [{ name: "Despertar a Mente", description: "Pode se comunicar telepaticamente com qualquer criatura a até 18 metros." }],
        6: [{ name: "Proteção Entrópica", description: "Usa reação para impor desvantagem em ataque; se errar, ganha vantagem no próximo ataque contra ele." }],
        10: [{ name: "Escudo de Pensamentos", description: "Pensamentos não podem ser lidos. Resistência a dano psíquico; reflete dano psíquico recebido." }],
        14: [{ name: "Criar Lacaio", description: "Toca humanoide incapacitado para deixá-lo enfeitiçado permanentemente (até remover maldição)." }]
      }
    }
  },
  'Patrulheiro': {
    "Conclave da Besta": {
      features: {
        3: [
          { name: "Companheiro Animal", description: "Invoca um animal leal (lobo, pantera, urso negro, etc.). Ele ganha seu bônus de proficiência na CA e dano, e dados de vida extras conforme você sobe de nível." },
          { name: "Vínculo com o Companheiro", description: "O animal obedece seus comandos, tem iniciativa própria e compartilha seus inimigos favoritos." }
        ],
        5: [{ name: "Ataque Coordenado", description: "Quando você usa a ação de Ataque, seu companheiro pode usar a reação dele para realizar um ataque corpo-a-corpo." }],
        7: [{ name: "Defesa da Besta", description: "Enquanto seu companheiro puder ver você, ele tem vantagem em todos os testes de resistência." }],
        11: [{ name: "Tempestade de Garras e Presas", description: "Seu companheiro pode usar a ação dele para atacar cada criatura a até 1,5m dele." }],
        15: [{ name: "Defesa da Besta Superior", description: "Seu companheiro pode usar a reação para reduzir o dano de um ataque pela metade." }]
      }
    },
    "Conclave do Caçador": {
      features: {
        3: [{ name: "Presa do Caçador", description: "Escolha uma opção: Assassino de Colossos (+1d8 dano em alvos feridos), Matador de Gigantes (contra-ataque como reação) ou Destruidor de Hordas (ataque extra em alvo adjacente)." }],
        5: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes ao realizar a ação de Ataque." }],
        7: [{ name: "Táticas Defensivas", description: "Escolha uma opção: Escapar da Horda (desvantagem em AdO), Defesa Contra Múltiplos Ataques (+4 CA contra ataques subsequentes) ou Vontade de Aço (vantagem contra medo)." }],
        11: [{ name: "Ataque Múltiplo", description: "Escolha uma opção: Saraivada (ataque em área à distância) ou Ataque Giratório (ataque em área corpo-a-corpo)." }],
        15: [{ name: "Defesa de Caçador Superior", description: "Escolha uma opção: Evasão, Manter-se Contra a Maré ou Esquiva Sobrenatural." }]
      }
    },
    "Conclave do Rastreador Subterrâneo": {
      features: {
        3: [
          { name: "Batedor do Subterrâneo", description: "No primeiro turno, ganha +3m de deslocamento e ataque adicional. Você é invisível para criaturas que usam visão no escuro na escuridão." },
          { name: "Magia do Rastreador Subterrâneo", description: "Ganha visão no escuro (27m) e acesso a magias como Disfarçar-se." }
        ],
        5: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes ao realizar a ação de Ataque." }],
        7: [{ name: "Mente de Aço", description: "Ganha proficiência em testes de resistência de Sabedoria." }],
        11: [{ name: "Rajada do Rastreador", description: "Se errar um ataque, você pode realizar outro ataque no mesmo turno." }],
        15: [{ name: "Esquiva do Rastreador", description: "Usa reação para impor desvantagem em um ataque inimigo." }]
      }
    }
  },
  'Druida': {
    "Círculo da Terra": {
      features: {
        2: [
          { name: "Truque Adicional", description: "Você aprende um truque de druida adicional." },
          { name: "Recuperação Natural", description: "Recupera espaços de magia (nível total = metade do nível de druida) em descanso curto." }
        ],
        6: [{ name: "Caminho da Floresta", description: "Ignora terreno difícil não-mágico e tem vantagem contra plantas mágicas." }],
        10: [{ name: "Proteção Natural", description: "Imune a venenos, doenças e a ser enfeitiçado ou amedrontado por fadas/elementais." }],
        14: [{ name: "Santuário Natural", description: "Criaturas do mundo natural devem passar em save de Sabedoria para atacar você." }]
      }
    },
    "Círculo da Lua": {
      features: {
        2: [
          { name: "Forma Selvagem de Combate", description: "Pode usar Forma Selvagem como ação bônus e gastar slots de magia para curar 1d8 PV." },
          { name: "Formas de Círculo", description: "Pode se transformar em bestas com ND 1 (ou Nível/3 a partir do nível 6)." }
        ],
        6: [{ name: "Ataque Primordial", description: "Seus ataques na forma de besta contam como mágicos." }],
        10: [{ name: "Forma Selvagem de Elemental", description: "Gasta dois usos de Forma Selvagem para se tornar um Elemental (Ar, Terra, Fogo ou Água)." }],
        14: [{ name: "Mil Formas", description: "Pode conjurar Alterar-se à vontade." }]
      }
    }
  },
  'Mago': {
    "Escola de Abjuração": {
      features: {
        2: [
          { name: "Abjuração Instruída", description: "O custo em ouro e tempo para copiar magias de abjuração é reduzido à metade." },
          { name: "Proteção Arcana", description: "Cria uma barreira mágica com PV (2x nível + Int) ao conjurar magia de abjuração de nível 1+." }
        ],
        6: [{ name: "Proteção Projetada", description: "Usa sua reação para que sua Proteção Arcana absorva dano de um aliado a até 9m." }],
        10: [{ name: "Abjuração Aprimorada", description: "Adiciona seu bônus de proficiência em testes de habilidade para magias de abjuração (ex: Contramágica)." }],
        14: [{ name: "Resistência à Magia", description: "Vantagem em saves contra magias e resistência contra o dano de magias." }]
      }
    },
    "Escola de Evocação": {
      features: {
        2: [
          { name: "Evocação Instruída", description: "O custo em ouro e tempo para copiar magias de evocação é reduzido à metade." },
          { name: "Esculpir Magias", description: "Cria áreas seguras em suas magias de evocação; aliados escolhidos passam automaticamente no save e não sofrem dano." }
        ],
        6: [{ name: "Truque Potente", description: "Suas magias de truque causam metade do dano mesmo se a criatura passar no save." }],
        10: [{ name: "Evocação Potencializada", description: "Adiciona seu modificador de Inteligência ao dano de suas magias de evocação." }],
        14: [{ name: "Sobrecarga", description: "Suas magias de nível 1-5 causam dano máximo, mas usar repetidamente causa dano necrótico a você." }]
      }
    }
  },
  'Artífice': {
    "Alquimista": {
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
  }
};
