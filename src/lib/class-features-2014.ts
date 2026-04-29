import { ClassLevel1Data } from './class-features';

export const CLASS_LEVEL1_DATA_2014: Record<string, ClassLevel1Data> = {
  'Bárbaro': {
    passiveFeatures: [
      { name: 'Fúria', description: 'Em seu turno, você pode entrar em fúria como uma ação bônus. Enquanto estiver em fúria, você tem vantagem em testes de Força e salvaguardas de Força, bônus de dano (+2) em ataques com armas de Força e resistência a dano de concussão, cortante e perfurante.' },
      { name: 'Defesa Sem Armadura', description: 'Enquanto você não estiver usando nenhuma armadura, sua Classe de Armadura é igual a 10 + seu modificador de Destreza + seu modificador de Constituição. Você pode usar um escudo e ainda ganhar este benefício.' }
    ],
    choices: []
  },
  'Bardo': {
    passiveFeatures: [
      { name: 'Conjuração', description: 'Você conhece truques e magias da lista de bardo.' },
      { name: 'Inspiração Bárdica (d6)', description: 'Você pode inspirar outros através de palavras ou música. Como uma ação bônus, escolha uma criatura a até 18 metros que possa ouvi-lo. Ela ganha um dado de Inspiração Bárdica (d6) que pode ser adicionado a um teste de habilidade, jogada de ataque ou salvaguarda nos próximos 10 minutos.' }
    ],
    choices: []
  },
  'Clérigo': {
    passiveFeatures: [
      { name: 'Conjuração', description: 'Você conhece truques e prepara magias da lista de clérigo.' }
    ],
    choices: [
      {
        id: 'cleric-domain-2014',
        label: 'Domínio Divino',
        description: 'Escolha um domínio relacionado à sua divindade.',
        type: 'radio',
        options: [
          { id: 'dom-vida', name: 'Domínio da Vida', description: 'Focado em cura e preservação da vida. Ganha proficiência com armaduras pesadas e o recurso Discípulo da Vida.' },
          { id: 'dom-guerra', name: 'Domínio da Guerra', description: 'Focado em combate. Ganha proficiência com armas marciais e armaduras pesadas, e pode fazer um ataque extra como ação bônus.' },
          { id: 'dom-tempestade', name: 'Domínio da Tempestade', description: 'Poder dos raios e trovões. Ganha proficiência com armas marciais e armaduras pesadas, e pode usar sua reação para causar dano elétrico.' }
        ]
      }
    ]
  },
  'Druida': {
    passiveFeatures: [
      { name: 'Druídico', description: 'Você conhece o Druídico, a linguagem secreta dos druidas.' },
      { name: 'Conjuração', description: 'Você conhece truques e prepara magias da lista de druida.' }
    ],
    choices: []
  },
  'Guerreiro': {
    passiveFeatures: [
      { name: 'Retomada de Fôlego', description: 'Você possui uma reserva de vitalidade que pode usar para se curar. Como uma ação bônus, você pode recuperar 1d10 + seu nível de guerreiro pontos de vida. Você deve terminar um descanso curto ou longo para usar este recurso novamente.' }
    ],
    choices: [
      {
        id: 'fighter-style-2014',
        label: 'Estilo de Luta',
        description: 'Adote um estilo particular de combate como sua especialidade.',
        type: 'radio',
        options: [
          { id: 'style-archery', name: 'Arquearia', description: 'Bônus de +2 nas jogadas de ataque com armas de ataque à distância.' },
          { id: 'style-defense', name: 'Defesa', description: 'Enquanto estiver usando armadura, você ganha +1 de bônus em sua CA.' },
          { id: 'style-dueling', name: 'Duelismo', description: 'Ao empunhar uma arma de ataque corpo-a-corpo em uma mão e nenhuma outra arma, você ganha +2 de bônus nas jogadas de dano com essa arma.' },
          { id: 'style-great-weapon', name: 'Combate com Armas Grandes', description: 'Ao rolar um 1 ou 2 no dado de dano de um ataque com arma de duas mãos, você pode rolar o dado novamente.' }
        ]
      }
    ]
  },
  'Monge': {
    passiveFeatures: [
      { name: 'Defesa Sem Armadura', description: 'Enquanto você não estiver usando armadura nem escudo, sua CA é igual a 10 + Mod. Destreza + Mod. Sabedoria.' },
      { name: 'Artes Marciais', description: 'Você pode usar Destreza em vez de Força para ataques e dano de suas armas de monge e ataques desarmados. Seus ataques desarmados causam 1d4 de dano.' }
    ],
    choices: []
  },
  'Paladino': {
    passiveFeatures: [
      { name: 'Sentido Divino', description: 'Como uma ação, você pode detectar a presença de seres celestiais, fiéis ou mortos-vivos a até 18 metros.' },
      { name: 'Mãos Curadoras', description: 'Sua mão abençoada pode curar ferimentos. Você tem uma reserva de cura igual a 5x seu nível de paladino.' }
    ],
    choices: []
  },
  'Patrulheiro': {
    passiveFeatures: [],
    choices: [
      {
        id: 'ranger-favored-enemy-2014',
        label: 'Inimigo Favorito',
        description: 'Escolha um tipo de inimigo: feras, fey, humanoides, mortos-vivos, etc.',
        type: 'radio',
        options: [
          { id: 'fav-beasts', name: 'Feras', description: 'Vantagem em testes de Sobrevivência para rastrear e Inteligência para obter informações.' },
          { id: 'fav-undead', name: 'Mortos-Vivos', description: 'Vantagem em testes de Sobrevivência para rastrear e Inteligência para obter informações.' },
          { id: 'fav-humanoids', name: 'Humanoides (Escolha dois tipos)', description: 'Vantagem em testes de Sobrevivência para rastrear e Inteligência para obter informações.' }
        ]
      },
      {
        id: 'ranger-natural-explorer-2014',
        label: 'Explorador Natural',
        description: 'Escolha um tipo de terreno favorito: floresta, montanha, pântano, etc.',
        type: 'radio',
        options: [
          { id: 'ter-forest', name: 'Floresta', description: 'Dobrou seu bônus de proficiência em testes de Inteligência ou Sabedoria relacionados ao terreno.' },
          { id: 'ter-mountain', name: 'Montanha', description: 'Dobrou seu bônus de proficiência em testes de Inteligência ou Sabedoria relacionados ao terreno.' }
        ]
      }
    ]
  },
  'Ladino': {
    passiveFeatures: [
      { name: 'Ataque Furtivo (1d6)', description: 'Uma vez por turno, você pode causar 1d6 de dano extra a uma criatura que atingir com um ataque se tiver vantagem na jogada ou se um aliado estiver a 1,5m do alvo.' },
      { name: 'Gíria de Ladrão', description: 'Você conhece o código secreto dos ladrões.' }
    ],
    choices: [
      {
        id: 'rogue-expertise-2014',
        label: 'Especialização',
        description: 'Escolha duas de suas proficiências em perícias (ou uma perícia e ferramentas de ladrão).',
        type: 'multi',
        maxSelections: 2,
        options: [
          { id: 'exp-stealth', name: 'Furtividade', description: 'Bônus de proficiência dobrado.' },
          { id: 'exp-thieves-tools', name: 'Ferramentas de Ladrão', description: 'Bônus de proficiência dobrado.' },
          { id: 'exp-perception', name: 'Percepção', description: 'Bônus de proficiência dobrado.' }
        ]
      }
    ]
  },
  'Feiticeiro': {
    passiveFeatures: [
      { name: 'Conjuração', description: 'Você conhece truques e magias da lista de feiticeiro.' }
    ],
    choices: [
      {
        id: 'sorcerous-origin-2014',
        label: 'Origem Feiticeira',
        description: 'Escolha a fonte do seu poder mágico.',
        type: 'radio',
        options: [
          { id: 'orig-draconic', name: 'Linhagem Dracônica', description: 'Sua magia vem de ancestrais dragões. Ganha +1 PV por nível e CA 13 + Des quando sem armadura.' },
          { id: 'orig-wild', name: 'Magia Selvagem', description: 'Sua magia vem das forças do caos. Pode rolar na tabela de Surto de Magia Selvagem.' }
        ]
      }
    ]
  },
  'Bruxo': {
    passiveFeatures: [
      { name: 'Magia de Pacto', description: 'Você conhece truques e magias da lista de bruxo. Seus espaços de magia são recuperados em descansos curtos.' }
    ],
    choices: [
      {
        id: 'warlock-patron-2014',
        label: 'Patrono Sobrenatural',
        description: 'Escolha o ser com quem você fez seu pacto.',
        type: 'radio',
        options: [
          { id: 'pat-archfey', name: 'A Arquifada', description: 'Seu patrono é um lorde ou dama das fadas. Ganha a habilidade Presença Feérica.' },
          { id: 'pat-fiend', name: 'O Ínfero', description: 'Seu patrono é um demônio ou diabo. Ganha a habilidade Bênção do Obscuro (PV temporário ao matar).' },
          { id: 'pat-great-old-one', name: 'O Grande Antigo', description: 'Seu patrono é uma entidade além do tempo. Ganha a habilidade Mente Desperta (telepatia).' }
        ]
      }
    ]
  },
  'Mago': {
    passiveFeatures: [
      { name: 'Conjuração', description: 'Você conhece truques e prepara magias do seu livro de magias.' },
      { name: 'Recuperação Arcana', description: 'Uma vez por dia, após um descanso curto, você pode recuperar espaços de magia cujo nível total seja igual ou inferior a metade do seu nível de mago (mínimo 1).' }
    ],
    choices: []
  },
  'Artífice': {
    passiveFeatures: [
      { name: 'Engenharia Mágica', description: 'Você pode imbuir propriedades mágicas em objetos minúsculos não mágicos (como emitir luz, som ou odor). O número máximo de itens é igual ao seu Mod. de Inteligência.' },
      { name: 'Conjuração', description: 'Você aprendeu a canalizar magia através de ferramentas. Você usa Inteligência como atributo de conjuração e prepara suas magias diariamente.' },
      { name: 'Infundir Item (Nvl 2)', description: 'Você ganha a habilidade de imbuir itens mundanos com infusões mágicas, transformando-os em itens mágicos.' },
      { name: 'A Ferramenta Certa para o Trabalho (Nvl 3)', description: 'Você pode criar magicamente um conjunto de ferramentas de artesão em 1 hora.' },
      { name: 'Lampejo de Genialidade (Nvl 7)', description: 'Como reação, você pode adicionar seu modificador de Inteligência a um teste de habilidade ou salvaguarda (INT/dia).' },
    ],
    choices: [
      {
        id: 'artificer-tool-2014',
        label: 'Ferramentas de Artesão',
        description: 'Escolha um tipo de ferramenta de artesão para ganhar proficiência adicional.',
        type: 'radio',
        options: [
          { id: 'art-alchemist', name: 'Alquimista', description: 'Suprimentos de Alquimista' },
          { id: 'art-smith', name: 'Ferreiro', description: 'Ferramentas de Ferreiro' },
          { id: 'art-tinker', name: 'Funileiro', description: 'Ferramentas de Funileiro' },
          { id: 'art-woodcarver', name: 'Entalhador', description: 'Ferramentas de Entalhador' },
          { id: 'art-cook', name: 'Cozinheiro', description: 'Utensílios de Cozinheiro' }
        ]
      }
    ]
  }
};

