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
  };
}

export const SUBCLASSES_2014: Record<string, ClassSubclasses> = {
  'Bárbaro': {
    "Caminho do Furioso": {
      description: "Focados na brutalidade implacável do combate corpo-a-corpo, bárbaros deste caminho canalizam uma fúria frenética capaz de superar a própria dor, desferindo golpes devastadores ao custo do esgotamento físico.",
      features: {
        3: [{ name: "Frenesi", description: "Pode entrar em frenesi ao enfurecer; permite um ataque de arma corpo-a-corpo como ação bônus in cada turno. Sofre exaustão ao fim da fúria." }],
        6: [{ name: "Fúria Inconsciente", description: "Não pode ser enfeitiçado ou amedrontado enquanto estiver em fúria. Efeitos atuais são suspensos." }],
        10: [{ name: "Presença Intimidante", description: "Usa ação para amedrontar criatura a até 9m (CD 8+Prof+Car). Pode estender com ações em turnos seguintes." }],
        14: [{ name: "Retaliação", description: "Quando sofrer dano de criatura a até 1,5m, pode usar reação para atacar quem te atingiu." }]
      }
    },
    "Caminho do Guerreiro Totêmico": {
      description: "Guiados por espíritos da natureza, estes bárbaros fundem sua força física com a energia mística de animais totêmicos como o Urso, a Águia ou o Lobo para obter resistência e velocidade sobrenaturais.",
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
      description: "Mestres de perícias e segredos arcanos, bardos deste colégio usam suas palavras afiadas para confundir inimigos e extraem magias de outras classes para expandir seu grimório.",
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
      description: "Cantores de guerra que inspiram bravura nos corações dos aliados, estes bardos combinam o uso de armas marciais e armaduras com sua magia para liderar no front de batalha.",
      features: {
        3: [
          { name: "Proficiência Adicional", description: "Ganha proficiência com armaduras médias, escudos e armas marciais." },
          { name: "Inspiração em Combate", description: "Criaturas podem usar o dado de inspiração para aumentar o dano ou a CA contra um ataque." }
        ],
        6: [{ name: "Ataque Extra", description: "Você pode atacar vezes quando usa a ação de Ataque." }],
        14: [{ name: "Magia de Batalha", description: "Quando usa ação para conjurar uma magia, pode realizar um ataque com arma como ação bônus." }]
      }
    }
  },
  'Clérigo': {
    "Domínio do Conhecimento": {
      description: "Devotos de deuses da sabedoria, clérigos deste domínio buscam a verdade em mistérios antigos, usando poderes divinos para ler pensamentos, dominar perícias instantaneamente e acessar segredos ocultos.",
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
      description: "Seguidores de divindades trapaceiras e caóticas, estes clérigos manipulam a realidade através de ilusões perfeitas, duplicatas e furtividade divina para enganar seus oponentes.",
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
      description: "Guerreiros sagrados que canalizam o poder de divindades do combate, eles lideram exércitos infundindo suas armas com força divina, aumentando sua precisão e atacando com velocidade implacável.",
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
      description: "Portadores do fogo purificador e da radiação solar, estes clérigos dispersam as trevas com magias de fogo devastadoras e protegem seus aliados cegando temporariamente seus inimigos.",
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
      description: "Protetores das florestas e da vida selvagem, estes clérigos comandam as forças elementais da natureza, controlando animais e plantas em nome de suas divindades.",
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
      description: "Canais vivos do trovão e do relâmpago, estes clérigos manifestam a fúria da tormenta para repelir agressores e desferir golpes elétricos com poder destrutivo máximo.",
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
      description: "Os curadores mais renomados de D&D, clérigos deste domínio canalizam ondas de energia positiva pura para restaurar a vitalidade dos aliados e trazer os caídos de volta ao combate.",
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
      description: "Focados na perfeição atlética pura e na maestria no combate físico, guerreiros campeões desferem golpes críticos com frequência assustadora e possuem uma resistência física inigualável.",
      features: {
        3: [{ name: "Crítico Aprimorado", description: "Suas jogadas de ataque com arma acertam crítico com 19 ou 20." }],
        7: [{ name: "Atleta Extraordinário", description: "Soma metade da proficiência em testes físicos sem proficiência; aumenta distância de salto." }],
        10: [{ name: "Estilo de Luta Adicional", description: "Escolhe um segundo Estilo de Luta da lista da classe." }],
        15: [{ name: "Crítico Superior", description: "Suas jogadas de ataque com arma acertam crítico com 18, 19 ou 20." }],
        18: [{ name: "Sobrevivente", description: "Recupera 5 + Mod. Con de vida se estiver com menos de 50% HP (e acima de 0)." }]
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
        7: [{ name: "Conheça Seu Inimigo", description: "Observar criatura por 1 min revela se ela é superior/igual/inferior em certos atributos." }],
        10: [{ name: "Superioridade em Combate Aprimorada", description: "Seus dados de superioridade se tornam d10s." }],
        15: [{ name: "Implacável", description: "Se rolar iniciativa sem dados de superioridade, você recupera um." }],
        18: [{ name: "Superioridade em Combate Aprimorada (d12)", description: "Seus dados de superioridade se tornam d12s." }]
      }
    }
  },
  'Ladino': {
    "Assassino": {
      description: "Especialistas em mortes rápidas e furtivas, ladinos assassinos eliminam alvos prioritários antes mesmo do início das hostilidades usando disfarces, venenos e ataques surpresa letais.",
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
      description: "Focados na agilidade extrema, ladinos ladrões utilizam de forma rápida fechaduras e dispositivos mágicos, escalando superfícies sem esforço para se infiltrar em qualquer lugar.",
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
      description: "Ladinos astutos que usam a magia de ilusão e encantamento para confundir guardas, roubar à distância usando Mãos Mágicas invisíveis e realizar furtos impossíveis.",
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
      description: "Carregando o sangue ou as escamas de dragões em suas veias, feiticeiros dracônicos manifestam asas, uma pele blindada e um poder elemental destrutivo herdado de seus ancestrais.",
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
      description: "Canais do caos puro e do acaso, feiticeiros de magia selvagem manipulam as probabilidades da realidade em troca de surtos de magia instáveis e imprevisíveis.",
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
      description: "Ligados a um patrono misterioso das fadas, bruxos deste pacto dominam magias de controle mental, ilusões e teleportes sutis que confundem e desviam ataques.",
      spells: ["Fogo das Fadas", "Sono", "Acalmar Emoções", "Força Fantasmagórica", "Piscar", "Ampliar Plantas", "Dominar Besta", "Invisibilidade Maior", "Dominar Pessoa", "Similaridade"],
      features: {
        1: [{ name: "Presença Feérica", description: "Usa sua ação para amedrontar ou enfeitiçar criaturas em um cubo de 3m (CD de magia)." }],
        6: [{ name: "Névoa de Fuga", description: "Ao sofrer dano, usa reação para ficar invisível e se teletransportar até 18m." }],
        10: [{ name: "Defesa Sedutora", description: "Imune a ser enfeitiçado. Pode usar reação para tentar voltar um encanto contra o conjurador." }],
        14: [{ name: "Delírio Sombrio", description: "Usa ação para mergulhar criatura em reino ilusório (enfeitiçada ou amedrontada por 1 min)." }]
      }
    },
    "O Corruptor": {
      description: "Servindo a demônios ou diabos, estes bruxos ceifam a energia vital dos mortos para ganhar vida temporária e convocam as chamas e o azar dos planos inferiores.",
      spells: ["Mãos Flamejantes", "Comando", "Cegueira/Surdez", "Raio Ardente", "Bola de Fogo", "Névoa Fétida", "Escudo de Fogo", "Muralha de Fogo", "Coluna de Chamas", "Consagrar"],
      features: {
        1: [{ name: "Bênção do Obscuro", description: "Ganha PV temporários (Mod. Car + nível) ao reduzir inimigo hostil a 0 PV." }],
        6: [{ name: "Sorte do Próprio Obscuro", description: "Adiciona 1d10 a um teste de habilidade ou resistência (1x/descanso curto)." }],
        10: [{ name: "Resiliência Demoníaca", description: "Escolhe um tipo de dano para ganhar resistência após cada descanso longo." }],
        14: [{ name: "Lançar no Inferno", description: "Ao atingir com ataque, transporta alvo para planos inferiores; causa 10d10 de dano psíquico." }]
      }
    },
    "O Grande Antigo": {
      description: "Conectados a entidades cósmicas insondáveis além da realidade, estes bruxos dominam a telepatia e afetam a sanidade mental de seus inimigos através do puro terror psíquico.",
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
      description: "Rastreadores que partilham um elo espiritual eterno com uma criatura selvagem, lutando em perfeita sincronia com seu companheiro animal no campo de batalha.",
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
      description: "Sentinelas da civilização contra as ameaças selvagens, patrulheiros caçadores especializam-se em derrubar monstros colossais, escapar de hordas e resistir a táticas de ataque inimigas.",
      features: {
        3: [{ name: "Presa do Caçador", description: "Escolha uma opção: Assassino de Colossos (+1d8 dano em alvos feridos), Matador de Gigantes (contra-ataque como reação) ou Destruidor de Hordas (ataque extra em alvo adjacente)." }],
        5: [{ name: "Ataque Extra", description: "Você pode atacar duas vezes ao realizar a ação de Ataque." }],
        7: [{ name: "Táticas Defensivas", description: "Escolha uma opção: Escapar da Horda (desvantagem em AdO), Defesa Contra Múltiplos Ataques (+4 CA contra ataques subsequentes) ou Vontade de Aço (vantagem contra medo)." }],
        11: [{ name: "Ataque Múltiplo", description: "Escolha uma opção: Saraivada (ataque em área à distância) ou Ataque Giratório (ataque em área corpo-a-corpo)." }],
        15: [{ name: "Defesa de Caçador Superior", description: "Escolha uma opção: Evasão, Manter-se Contra a Maré ou Esquiva Sobrenatural." }]
      }
    },
    "Conclave do Rastreador Subterrâneo": {
      description: "Mestres da escuridão e do combate subterrâneo, estes patrulheiros emboscam inimigos a partir das sombras, sendo invisíveis até mesmo para criaturas com visão no escuro.",
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
      description: "Místicos guardiões de biomas específicos, druidas deste círculo mantêm uma forte ligação com a própria terra, restaurando seus recursos arcanos rapidamente durante descansos.",
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
      description: "Guerreiros metamorfos focados no combate selvagem, estes druidas assumem formas animais de ND elevado como ação bônus e podem canalizar magia para curar suas feridas na forma de fera.",
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
      description: "Especialistas em defesas arcanas e barreiras mágicas, magos abjuradores projetam escudos que absorvem danos físicos e dissipam magias inimigas com precisão milimétrica.",
      features: {
        2: [
          { name: "Abjuração Instruída", description: "O custo em ouro e tempo para copiar magias de abjuração é reduzido à metade." },
          { name: "Proteção Arcana", description: "Cria uma proteção mágica com PV (2x nível + Int) ao conjurar magia de abjuração de nível 1+." }
        ],
        6: [{ name: "Proteção Projetada", description: "Usa sua reação para que sua Proteção Arcana absorva dano de um aliado a até 9m." }],
        10: [{ name: "Abjuração Aprimorada", description: "Adiciona seu bônus de proficiência em testes para magias de abjuração (ex: Contramágica)." }],
        14: [{ name: "Resistência à Magia", description: "Vantagem em saves contra magias e resistência contra o dano de magias." }]
      }
    },
    "Escola de Adivinhação": {
      description: "Videntes do destino que leem as correntes do tempo, magos adivinhos prevêem resultados de dados com antecedência e recuperam energia arcana ao desvendar segredos.",
      features: {
        2: [
          { name: "Adivinhação Instruída", description: "O custo para copiar magias de adivinhação é reduzido à metade." },
          { name: "Prodígio", description: "Role dois d20s ao fim de um descanso longo; use os resultados para substituir jogadas de ataque/save/teste." }
        ],
        6: [{ name: "Especialista em Adivinhação", description: "Ao conjurar magia de adivinhação de 2º+, recupera um espaço de nível inferior." }],
        10: [{ name: "O Terceiro Olho", description: "Ganha benefício: Visão no Escuro, Visão Etérea, Compreensão Maior ou Ver Invisibilidade." }],
        14: [{ name: "Prodígio Maior", description: "Você rola três d20s para a característica Prodígio em vez de dois." }]
      }
    },
    "Escola de Conjuração": {
      description: "Magos capazes de materializar objetos inanimados do nada, teleportar-se trocando de lugar com aliados e invocar criaturas extremamente resistentes que lutam a seu comando.",
      features: {
        2: [
          { name: "Conjuração Instruída", description: "O custo para copiar magias de conjuração é reduzido à metade." },
          { name: "Conjuração Menor", description: "Usa ação para conjurar um objeto inanimado não-mágico de até 5kg." }
        ],
        6: [{ name: "Transposição Benigna", description: "Teletransporta-se 9m ou troca de lugar com uma criatura voluntária." }],
        10: [{ name: "Conjuração Focada", description: "Sua concentração em magias de conjuração não pode ser interrompida por dano." }],
        14: [{ name: "Invocações Resistentes", description: "Qualquer criatura que você invocar terá 30 pontos de vida temporários." }]
      }
    },
    "Escola de Encantamento": {
      description: "Mestres do controle social e mental, estes magos paralisam oponentes com olhares hipnóticos e alteram as memórias de quem enfeitiçam sem deixar vestígios.",
      features: {
        2: [
          { name: "Encantamento Instruído", description: "O custo para copiar magias de encantamento é reduzido à metade." },
          { name: "Olhar Hipnotizante", description: "Usa ação para enfeitiçar criatura a 1,5m; alvo fica incapacitado e com 0 de deslocamento." }
        ],
        6: [{ name: "Encanto Instintivo", description: "Usa reação para desviar um ataque contra você para outra criatura próxima." }],
        10: [{ name: "Dividir Encantamento", description: "Ao conjurar magia de encantamento de alvo único, pode afetar uma segunda criatura." }],
        14: [{ name: "Alterar Memórias", description: "Alvos de seus encantamentos não sabem que foram enfeitiçados; pode fazer o alvo esquecer horas da memória." }]
      }
    },
    "Escola de Evocação": {
      description: "Conjuradores de destruição elemental em larga escala, evocadores manipulam suas magias de área para não atingir aliados e potencializam seus truques básicos com sua inteligência.",
      features: {
        2: [
          { name: "Evocação Instruída", description: "O custo em ouro e tempo para copiar magias de evocação é reduzido à metade." },
          { name: "Esculpir Magias", description: "Cria áreas seguras em suas magias de evocação; aliados escolhidos passam automaticamente no save e não sofrem dano." }
        ],
        6: [{ name: "Truque Potente", description: "Suas magias de truque causam metade do dano mesmo se a criatura passar no save." }],
        10: [{ name: "Evocação Potencializada", description: "Adiciona seu modificador de Inteligência ao dano de suas magias de evocação." }],
        14: [{ name: "Sobrecarga", description: "Suas magias de nível 1-5 causam dano máximo, mas usar repetidamente causa dano necrótico a você." }]
      }
    },
    "Escola de Ilusão": {
      description: "Artistas do engano visual e auditivo, estes magos tornam suas ilusões palpáveis e reais temporariamente, enganando os sentidos de qualquer criatura.",
      features: {
        2: [
          { name: "Ilusão Instruída", description: "O custo para copiar magias de ilusão é reduzido à metade." },
          { name: "Ilusão Menor Aprimorada", description: "Aprende Ilusão Menor; pode criar som e imagem simultaneamente." }
        ],
        6: [{ name: "Ilusões Moldáveis", description: "Usa ação para mudar a natureza de uma ilusão ativa que você possa ver." }],
        10: [{ name: "Eu Ilusório", description: "Usa reação para interpor duplicata ilusória e fazer um ataque errar automaticamente." }],
        14: [{ name: "Realidade Ilusória", description: "Usa ação bônus para tornar um objeto inanimado de uma ilusão real por 1 minuto." }]
      }
    },
    "Escola de Necromancia": {
      description: "Estudiosos da linha tênue entre a vida e a morte, necromantes absorvem a energia vital dos inimigos que derrotam e comandam hordas de mortos-vivos com bônus de poder.",
      features: {
        2: [
          { name: "Necromancia Instruída", description: "O custo para copiar magias de necromancia é reduzido à metade." },
          { name: "Colheita Sinistra", description: "Recupera vida ao matar criaturas com magias de 1º+ (2x ou 3x o nível da magia)." },
          { name: "Escravos Mortos-Vivos", description: "Aprende Animar Mortos; cria um morto-vivo extra; eles ganham PV e dano adicionais." }
        ],
        10: [{ name: "Acostumado à Morte-Vida", description: "Resistência a dano necrótico e seu máximo de PV não pode ser reduzido." }],
        14: [{ name: "Comandar Mortos-Vivos", description: "Usa ação para tentar trazer um morto-vivo sob seu controle (save de Carisma)." }]
      }
    },
    "Escola de Transmutação": {
      description: "Cientistas da alquimia e da alteração da matéria, magos transmutadores criam pedras mágicas com benefícios físicos e alteram as formas dos objetos à sua volta.",
      features: {
        2: [
          { name: "Transmutação Instruída", description: "O custo para copiar magias de transmutação é reduzido à metade." },
          { name: "Alquimia Menor", description: "Altera temporariamente propriedades físicas de objetos não-mágicos (madeira, pedra, ferro, etc)." }
        ],
        6: [{ name: "Pedra de Transmutador", description: "Cria pedra que dá benefício: Visão no Escuro, Velocidade, Proficiência em Con ou Resistência Elemental." }],
        10: [{ name: "Metamorfo", description: "Pode conjurar Metamorfose em si mesmo sem gastar espaço (ND 1 ou menor)." }],
        14: [{ name: "Mestre Transmutador", description: "Consome a pedra para efeito: Transformação Maior, Panaceia, Restaurar Vida ou Restaurar Juventude." }]
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
          { name: "Canalizar Divindade: Arma Sagrada", description: "Soma Mod. Carisma nas jogadas de ataque; arma emite luz e conta como mágica." },
          { name: "Canalizar Divindade: Expulsar o Profano", description: "Usa ação para fazer corruptores e mortos-vivos (9m) fugirem se falharem no save." }
        ],
        7: [{ name: "Aura de Devoção", description: "Você e aliados a até 3 metros não podem ser enfeitiçados." }],
        15: [{ name: "Pureza de Espírito", description: "Você está sempre sob o efeito da magia Proteção contra o Bem e Mal." }],
        20: [{ name: "Halo Sagrado", description: "Emite luz solar, causa 10 de dano radiante a inimigos próximos e ganha vantagem contra magias de corruptores/mortos-vivos." }]
      }
    },
    "Juramento dos Anciãos": {
      description: "Guerreiros verdes que juraram proteger a beleza, a luz e a alegria do mundo contra a corrupção do tempo, ganhando resistências mágicas incríveis sob a bênção da natureza antiga.",
      spells: ["Golpe Enredante", "Falar com Animais", "Passo Nebuloso", "Raio Lunar", "Crescimento de Plantas", "Proteção contra Energia", "Tempestade de Gelo", "Pele de Pedra", "Comungar com a Natureza", "Caminhar em Árvores"],
      features: {
        3: [
          { name: "Canalizar Divindade: Fúria da Natureza", description: "Invoca vinhas para prender uma criatura a até 3 metros (save de For/Des)." },
          { name: "Canalizar Divindade: Expulsar os Infiéis", description: "Faz fadas e corruptores (9m) fugirem se falharem no save de Sabedoria." }
        ],
        7: [{ name: "Aura de Vigilância", description: "Você e aliados a até 3 metros têm resistência a dano de magias." }],
        15: [{ name: "Sentinela Imortal", description: "Quando cair a 0 PV e não morrer, pode escolher voltar a 1 PV (1x/descanso longo). Não sofre fragilidades da velhice." }],
        20: [{ name: "Campeão dos Anciões", description: "Assume forma da natureza: regenera 10 PV/turno, conjura magias de ação como bônus e inimigos têm desvantagem nos saves." }]
      }
    },
    "Juramento de Vingança": {
      description: "Cavaleiros implacáveis focados na retribuição e na caça de alvos específicos, paladinos da vingança não poupam esforços para punir o mal, garantindo vantagem constante em combate.",
      spells: ["Perdição", "Marca do Caçador", "Imobilizar Pessoa", "Passo Nebuloso", "Velocidade", "Proteção contra Energia", "Banimento", "Porta Dimensional", "Imobilizar Monstro", "Vidência"],
      features: {
        3: [
          { name: "Canalizar Divindade: Abjurar Inimigo", description: "Amedronta uma criatura a até 18m; corruptores e mortos-vivos têm desvantagem." },
          { name: "Canalizar Divindade: Voto de Inimizade", description: "Ganha vantagem nas jogadas de ataque contra uma criatura por 1 minuto." }
        ],
        7: [{ name: "Vingador Implacável", description: "Ao atingir AdO, move metade do deslocamento sem provocar AdO." }],
        15: [{ name: "Alma de Vingança", description: "Quando o alvo do Voto de Inimizade ataca, você pode usar reação para atacá-lo." }],
        20: [{ name: "Anjo Vingador", description: "Ganha asas (voo 18m) e emite aura de ameaça que amedronta inimigos." }]
      }
    }
  },
  'Monge': {
    "Caminho da Mão Aberta": {
      description: "Mestres supremos do combate desarmado, monges deste caminho manipulam a energia do corpo para derrubar inimigos, curar a si mesmos e desferir a lendária Palma Vibrante.",
      features: {
        3: [{ name: "Técnica da Mão Aberta", description: "Sua Rajada de Golpes pode derrubar, empurrar ou impedir reações do alvo." }],
        6: [{ name: "Integridade Corporal", description: "Pode recuperar PV igual a 3x seu nível de monge (1x/descanso longo)." }],
        11: [{ name: "Tranquilidade", description: "Ganha o efeito da magia santuário ao terminar um descanso longo, durando até você atacar ou conjurar." }],
        17: [{ name: "Palma Vibrante", description: "Gasta 3 pontos de chi para criar vibrações letais; alvo deve passar in save de Con ou cair a 0 PV (ou sofrer 10d10)." }]
      }
    },
    "Caminho da Sombra": {
      description: "Monges assassinos que transitam silenciosamente pelas sombras, conjurando magias de silêncio e escuridão e teleportando-se entre locais escuros para atacar de surpresa.",
      features: {
        3: [{ name: "Artes Sombrias", description: "Pode gastar 2 pontos de chi para conjurar: Escuridão, Visão no Escuro, Passos sem Pegadas ou Silêncio." }],
        6: [{ name: "Passo das Sombras", description: "Pode se teletransportar de uma sombra para outra (18m) como ação bônus, ganhando vantagem no próximo ataque." }],
        11: [{ name: "Manto de Sombras", description: "Em luz plena ou escuridão, pode usar sua ação para ficar invisível." }],
        17: [{ name: "Oportunista", description: "Quando uma criatura a 1,5m é atingida por um ataque, você pode usar sua reação para atacá-la." }]
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
