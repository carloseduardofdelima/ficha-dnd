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
        7: [{ name: "Atleta Extraordinário", description: "Metade da proficiência em testes físicos sem proficiência; aumenta distância de salto." }],
        10: [{ name: "Estilo de Luta Adicional", description: "Escolhe um segundo Fighting Style da lista do guerreiro." }],
        15: [{ name: "Crítico Superior", description: "Suas jogadas de ataque com arma acertam crítico com 18, 19 ou 20." }],
        18: [{ name: "Sobrevivente", description: "Recupera 5 + CON de vida no início do turno se estiver com menos de 50% HP." }]
      }
    }
  },
  'Ladino': {
    "Ladrão": {
      features: {
        3: [
          { name: "Mãos Rápidas", description: "Ação bônus para usar kit de ladino, objeto ou Sleight of Hand." },
          { name: "Trabalho no Segundo Andar", description: "Escalar não custa extra; aumenta distância de salto com Destreza." }
        ],
        9: [{ name: "Furtividade Suprema", description: "Vantagem em Furtividade se mover metade da velocidade ou menos." }],
        13: [{ name: "Usar Dispositivo Mágico", description: "Ignora restrições de raça, classe e nível em itens mágicos." }],
        17: [{ name: "Reflexos de Ladrão", description: "Pode realizar dois turnos no primeiro round de combate." }]
      }
    }
  },
  'Feiticeiro': {
    "Linhagem Dracônica": {
      features: {
        1: [
          { name: "Ancestral Dragão", description: "Escolha um tipo de dragão: Negro/Cobre (Ácido), Azul/Bronze (Elétrico), Verde (Veneno), Vermelho/Latão/Ouro (Fogo) ou Branco/Prata (Frio). Você aprende o idioma Dracônico e tem vantagem em testes de Carisma para interagir com dragões." },
          { name: "Resiliência Dracônica", description: "+1 PV por nível e CA 13 + DES sem armadura." }
        ],
        6: [{ name: "Afinidade Elemental", description: "Adiciona Carisma ao dano do elemento; gasta 1 ponto para resistência." }],
        14: [{ name: "Asas de Dragão", description: "Ganha velocidade de voo igual à de caminhada." }],
        18: [{ name: "Presença Dracônica", description: "Aura de medo ou encanto em 60 pés (5 pontos de feitiçaria)." }]
      }
    },
    "Magia Selvagem": {
      features: {
        1: [
          { name: "Surto de Magia Selvagem", description: "Ao conjurar magia de nível 1+, mestre pode pedir 1d20. Se rolar 1, ocorre efeito na tabela de Magia Selvagem." },
          { name: "Marés do Caos", description: "Ganha vantagem em um ataque, teste ou salvaguarda. Recarrega com descanso longo ou surto forçado pelo mestre." }
        ],
        6: [{ name: "Dobra da Sorte", description: "Usa reação + 2 pontos para adicionar ou subtrair 1d4 da rolagem de outra criatura." }],
        14: [{ name: "Caos Controlado", description: "Ao rolar na tabela de Magia Selvagem, rola duas vezes e escolhe o resultado." }],
        18: [{ name: "Bombardeio de Feitiços", description: "Ao rolar dano máximo em um dado de magia, rola um dado adicional desse tipo e soma." }]
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
  }
};
