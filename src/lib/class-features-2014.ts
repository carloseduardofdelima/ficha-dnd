import { ClassLevel1Data } from './class-features';

export const CLASS_LEVEL1_DATA_2014: Record<string, ClassLevel1Data> = {
  'Bárbaro': {
    passiveFeatures: [
      { name: 'Fúria', description: 'Em seu turno, você pode entrar em fúria como uma ação bônus. Enquanto estiver em fúria, você tem vantagem em testes de Força e testes de resistência de Força, bônus de dano (+2) em ataques com armas de Força e resistência a dano de concussão, cortante e perfurante.' },
      { name: 'Defesa sem Armadura', description: 'Quando não estiver vestindo qualquer armadura, sua Classe de Armadura é igual a 10 + seu modificador de Destreza + seu modificador de Constituição. Você pode usar um escudo.' }
    ],
    choices: []
  },
  'Bardo': {
    passiveFeatures: [
      { name: 'Conjuração', description: 'Você conhece truques e magias da lista de bardo.' },
      { name: 'Inspiração Bárdica (d6)', description: 'Você pode inspirar outros através de palavras ou música. Como uma ação bônus, escolha uma criatura a até 18 metros que possa ouvi-lo. Ela ganha um dado de Inspiração Bárdica (d6) que pode ser adicionado a um teste de habilidade, jogada de ataque ou teste de resistência nos próximos 10 minutos.' }
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
      { name: 'Retomar o Fôlego', description: 'Você pode usar uma ação bônus para recuperar 1d10 + seu nível de guerreiro PV. Requer descanso curto ou longo para usar de novo.' }
    ],
    choices: [
      {
        id: 'fighter-style-2014',
        label: 'Estilo de Luta',
        description: 'Adote um estilo particular de combate como sua especialidade.',
        type: 'radio',
        options: [
          { id: 'style-archery', name: 'Arquearia', description: 'Bônus de +2 nas jogadas de ataque com armas à distância.' },
          { id: 'style-defense', name: 'Defesa', description: 'Enquanto estiver usando armadura, você ganha +1 de bônus em sua CA.' },
          { id: 'style-dueling', name: 'Duelismo', description: 'Ao empunhar uma arma corpo-a-corpo em uma mão e nenhuma outra arma, você ganha +2 no dano.' },
          { id: 'style-great-weapon', name: 'Combate com Armas Grandes', description: 'Ao rolar 1 ou 2 no dano de arma de duas mãos, você pode rolar de novo.' },
          { id: 'style-protection', name: 'Proteção', description: 'Use sua reação para impor desvantagem em um ataque contra um aliado a até 1,5m (requer escudo).' },
          { id: 'style-two-weapon', name: 'Combate com Duas Armas', description: 'Adiciona seu modificador de habilidade no dano do segundo ataque.' }
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
      { name: 'Sentido Divino', description: 'Como uma ação, você pode detectar a localização de celestiais, corruptores ou mortos-vivos a até 18 metros.' },
      { name: 'Cura pelas Mãos', description: 'Sua mão abençoada pode curar ferimentos. Você tem uma reserva de cura igual a 5x seu nível de paladino.' }
    ],
    choices: []
  },
  'Patrulheiro': {
    passiveFeatures: [],
    choices: [
      {
        id: 'ranger-favored-enemy-2014',
        label: 'Inimigo Favorito',
        description: 'Escolha um tipo de inimigo. Você ganha +2 de bônus no dano contra eles e vantagem em testes de rastreio.',
        type: 'radio',
        options: [
          { id: 'fav-beasts', name: 'Feras', description: '+2 no dano. Vantagem em Sobrevivência (rastrear) e Inteligência (info).' },
          { id: 'fav-fey', name: 'Fadas', description: '+2 no dano. Vantagem em Sobrevivência (rastrear) e Inteligência (info).' },
          { id: 'fav-humanoids', name: 'Humanoides', description: '+2 no dano. Vantagem em Sobrevivência (rastrear) e Inteligência (info). Escolha um idioma.' },
          { id: 'fav-monstrosities', name: 'Monstruosidades', description: '+2 no dano. Vantagem em Sobrevivência (rastrear) e Inteligência (info).' },
          { id: 'fav-undead', name: 'Mortos-Vivos', description: '+2 no dano. Vantagem em Sobrevivência (rastrear) e Inteligência (info).' }
        ]
      },
      {
        id: 'ranger-natural-explorer-2014',
        label: 'Explorador Natural',
        description: 'Você é um mestre da navegação e combate no mundo natural.',
        type: 'radio',
        options: [
          { id: 'nat-exp-revised', name: 'Explorador Natural (Revisado)', description: 'Ignora terreno difícil. Vantagem em Iniciativa e em ataques contra quem não agiu no 1º turno.' }
        ]
      }
    ]
  },
  'Ladino': {
    passiveFeatures: [
      { name: 'Ataque Furtivo', description: 'Uma vez por turno, você pode causar 1d6 de dano extra a uma criatura se tiver vantagem ou um aliado a 1,5m. Deve usar arma de acuidade ou à distância.' },
      { name: 'Gíria de Ladrão', description: 'Você conhece o jargão e códigos secretos que permitem passar mensagens ocultas durante uma conversa normal.' }
    ],
    choices: [
      {
        id: 'rogue-expertise-2014',
        label: 'Especialização',
        description: 'Escolha duas de suas perícias proficientes (ou uma perícia e ferramentas de ladrão) para dobrar o bônus de proficiência.',
        type: 'multi',
        maxSelections: 2,
        options: [
          { id: 'exp-stealth', name: 'Furtividade', description: 'Bônus de proficiência dobrado em testes de Furtividade.' },
          { id: 'exp-thieves-tools', name: 'Ferramentas de Ladrão', description: 'Bônus de proficiência dobrado em testes com ferramentas de ladrão.' },
          { id: 'exp-perception', name: 'Percepção', description: 'Bônus de proficiência dobrado em testes de Percepção.' },
          { id: 'exp-investigation', name: 'Investigação', description: 'Bônus de proficiência dobrado em testes de Investigação.' }
        ]
      }
    ]
  },
  'Feiticeiro': {
    passiveFeatures: [
      { name: 'Conjuração', description: 'Você conhece truques e magias da lista de feiticeiro. Sua habilidade de conjuração é Carisma.' }
    ],
    choices: [
      {
        id: 'sorcerous-origin-2014',
        label: 'Origem de Feitiçaria',
        description: 'Escolha a fonte do seu poder mágico inato.',
        type: 'radio',
        options: [
          { id: 'orig-draconic', name: 'Linhagem Dracônica', description: 'Sua magia vem de um ancestral dragão. Ganha Ancestral Dracônico e Resiliência Dracônica (+1 PV/nível e CA 13+Des).' },
          { id: 'orig-wild', name: 'Magia Selvagem', description: 'Sua magia vem das forças do caos. Ganha Surto de Magia Selvagem e Marés de Caos.' }
        ]
      }
    ]
  },
  'Bruxo': {
    passiveFeatures: [
      { name: 'Magia de Pacto', description: 'Você conhece truques e magias de bruxo. Seus espaços de magia são recuperados em descansos curtos e são todos do mesmo nível.' }
    ],
    choices: [
      {
        id: 'warlock-patron-2014',
        label: 'Patrono Transcendental',
        description: 'Escolha o ser com quem você fez seu pacto.',
        type: 'radio',
        options: [
          { id: 'pat-archfey', name: 'A Arquifada', description: 'Seu patrono é um lorde ou dama das fadas. Ganha a característica Presença Feérica.' },
          { id: 'pat-fiend', name: 'O Corruptor', description: 'Seu patrono é um demônio ou diabo. Ganha a característica Bênção do Obscuro (PV temporários ao reduzir inimigo a 0).' },
          { id: 'pat-great-old-one', name: 'O Grande Antigo', description: 'Seu patrono é uma entidade além do tempo. Ganha a característica Despertar a Mente (telepatia).' }
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
      { name: 'Engenharia Mágica', description: 'Você pode imbuir propriedades mágicas em objetos minúsculos não mágicos (como emitir luz, som ou odor). O número máximo de itens é igual ao seu Mod. de Inteligência.', level: 1 },
      { name: 'Conjuração', description: 'Você aprendeu a canalizar magia através de ferramentas. Você usa Inteligência como atributo de conjuração e prepara suas magias diariamente.', level: 1 },
      { name: 'Infundir Item', description: 'Você ganha a habilidade de imbuir itens mundanos com infusões mágicas, transformando-os em itens mágicos.', level: 2 },
      { name: 'A Ferramenta Certa para o Trabalho', description: 'Você pode criar magicamente um conjunto de ferramentas de artesão em 1 hora.', level: 3 },
      { name: 'Lampejo de Genialidade', description: 'Como reação, você pode adicionar seu modificador de Inteligência a um teste de habilidade ou salvaguarda (INT/dia).', level: 7 },
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

