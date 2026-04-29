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
    "Caminho do Berserker": {
      features: {
        3: [{ name: "Frenzy", description: "Durante a Rage, pode entrar em Frenzy como ação bônus. Pode fazer um ataque de arma corpo a corpo como ação bônus em cada um dos seus turnos. Quando a Rage termina, sofre 1 nível de Exaustão." }],
        6: [{ name: "Mindless Rage", description: "Enquanto em Rage, não pode ser encantado nem amedrontado. Se você já estava encantado ou amedrontado quando entra em Rage, o efeito é suspenso." }],
        10: [{ name: "Intimidating Presence", description: "Como ação, pode aterrorizar uma criatura visível a até 30 pés (Save SAB CD 8+Prof+CAR)." }],
        14: [{ name: "Retaliation", description: "Quando sofre dano de uma criatura que está a até 5 pés de você, pode usar sua reação para fazer um ataque corpo a corpo contra ela." }]
      }
    },
    "Caminho do Guerreiro Totêmico": {
      features: {
        3: [
          { name: "Spirit Seeker", description: "Aprende os feitiços Beast Sense e Speak with Animals, ambos podendo ser conjurados como rituais." },
          { name: "Totem Spirit", description: "Escolha um animal totêmico: Urso (Resistência a tudo exceto psíquico), Águia (Dash bônus + desvantagem em AdO), Lobo (Vantagem para aliados)." }
        ],
        6: [{ name: "Aspect of the Beast", description: "Escolha: Urso (Carga dobrada + Vantagem Força), Águia (Visão aguçada), Lobo (Rastrear em ritmo rápido)." }],
        10: [{ name: "Spirit Walker", description: "Pode conjurar o feitiço Commune with Nature como ritual." }],
        14: [{ name: "Totemic Attunement", description: "Escolha: Urso (Desvantagem para inimigos), Águia (Voo), Lobo (Derrubar como ação bônus)." }]
      }
    }
  },
  'Bardo': {
    "Colégio do Conhecimento": {
      features: {
        3: [
          { name: "Proficiências Bônus", description: "Ganha proficiência em 3 perícias de sua escolha." },
          { name: "Palavras de Corte", description: "Use sua reação e gaste Inspiração Bárdica para subtrair do ataque, teste ou dano de uma criatura." }
        ],
        6: [{ name: "Segredos Mágicos Adicionais", description: "Aprende 2 feitiços de qualquer classe (contam como feitiços de bardo)." }],
        14: [{ name: "Habilidade Inigualável", description: "Adiciona Inspiração Bárdica aos seus próprios testes de habilidade." }]
      }
    },
    "Colégio da Valentia": {
      features: {
        3: [
          { name: "Proficiências Bônus", description: "Ganha proficiência em armaduras médias, escudos e armas marciais." },
          { name: "Inspiração de Combate", description: "Aliados podem adicionar o dado à CA ou à jogada de dano." }
        ],
        6: [{ name: "Ataque Extra", description: "Pode atacar duas vezes quando usa a ação Ataque." }],
        14: [{ name: "Magia de Batalha", description: "Quando conjura um feitiço usando sua ação, pode fazer um ataque de arma como ação bônus." }]
      }
    }
  },
  'Clérigo': {
    "Domínio da Vida": {
      spells: ["Bless", "Cure Wounds", "Lesser Restoration", "Spiritual Weapon", "Beacon of Hope", "Revivify", "Death Ward", "Guardian of Faith", "Mass Cure Wounds", "Raise Dead"],
      features: {
        1: [
          { name: "Proficiência Bônus", description: "Proficiência em armaduras pesadas." },
          { name: "Discípulo da Vida", description: "Sempre que usar um feitiço de cura, a criatura recupera PV adicionais iguais a 2 + o nível do feitiço." }
        ],
        2: [{ name: "Canalizar Divindade: Preservar a Vida", description: "Restaura PV (5x nível) para criaturas a 30 pés (limite 50% do HP)." }],
        6: [{ name: "Curandeiro Abençoado", description: "Quando conjura cura para outra criatura, você também recupera PV iguais a 2 + nível do feitiço." }],
        8: [{ name: "Golpe Divino", description: "Uma vez por turno, causa 1d8 extra de dano radiante com arma." }],
        17: [{ name: "Cura Suprema", description: "Ao restaurar PV com feitiço, usa o valor máximo possível de cada dado." }]
      }
    },
    "Domínio da Luz": {
      spells: ["Burning Hands", "Faerie Fire", "Flaming Sphere", "Scorching Ray", "Daylight", "Fireball", "Guardian of Faith", "Wall of Fire", "Flame Strike", "Scrying"],
      features: {
        1: [
          { name: "Truque Bônus", description: "Aprende o cantrip Light." },
          { name: "Fulgor Protetor", description: "Impõe desvantagem em ataque recebido como reação (Sab/dia)." }
        ],
        2: [{ name: "Canalizar Divindade: Radiância da Alvorada", description: "Dano radiante (2d10+nv) e dissipa trevas mágicas em 30 pés." }],
        6: [{ name: "Fulgor Protetor Aprimorado", description: "Warding Flare pode ser usado para proteger aliados." }],
        8: [{ name: "Conjuração Potente", description: "Adiciona modificador de Sabedoria ao dano de cantrips de clérigo." }],
        17: [{ name: "Corona de Luz", description: "Aura de 60 pés que impõe desvantagem em saves contra fogo/radiante." }]
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
    "O Ínfero": {
      spells: ["Burning Hands", "Command", "Blindness/Deafness", "Scorching Ray", "Fireball", "Stinking Cloud", "Fire Shield", "Wall of Fire", "Flame Strike", "Hallow"],
      features: {
        1: [{ name: "Bênção do Obscuro", description: "Ganha PV temporários (CAR + nível) ao reduzir inimigo a 0 PV." }],
        6: [{ name: "Sorte do Próprio Obscuro", description: "Adiciona 1d10 a um teste ou save (1x/descanso curto)." }],
        10: [{ name: "Resiliência Infernal", description: "Escolhe um tipo de resistência a dano após cada descanso." }],
        14: [{ name: "Atirar pelo Inferno", description: "Transporta alvo para o Inferno; causa 10d10 de dano psíquico." }]
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
  }
};
