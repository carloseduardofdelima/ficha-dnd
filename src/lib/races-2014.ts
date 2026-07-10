import { Race } from './races';

export const RACES_2014: Race[] = [
  {
    id: 'dwarf_2014',
    name: 'Anão',
    description: 'Anões são conhecidos por sua habilidade em combate, resistência a castigos físicos e conhecimento sobre as entranhas da terra.',
    image: '/assets/dwarf.png',
    source: "Player's Handbook 2014",
    speed: 25,
    size: 'Médio',
    attributeBonuses: { constitution: 2 },
    subRaceTitle: 'Sub-raça do Anão',
    subRaceMandatory: true,
    lineages: [
      {
        name: 'Anão da Colina',
        description: 'Seus sentidos são aguçados, sua intuição é profunda e sua resiliência é notável.',
        attributeBonuses: { wisdom: 1 },
        traits: [
          { name: 'Sabedoria +1', description: 'Seu valor de Sabedoria aumenta em 1.' },
          { name: 'Tenacidade Anã', description: 'Seu máximo de pontos de vida aumenta em 1, e aumenta em 1 a cada nível.' }
        ]
      },
      {
        name: 'Anão da Montanha',
        description: 'Você é forte e resistente, acostumado a uma vida difícil em terrenos acidentados.',
        attributeBonuses: { strength: 2 },
        traits: [
          { name: 'Força +2', description: 'Seu valor de Força aumenta em 2.' },
          { name: 'Treinamento Anão com Armaduras', description: 'Você tem proficiência com armaduras leves e médias.' }
        ]
      }
    ],
    traits: [
      { name: 'Constituição +2', description: 'Seu valor de Constituição aumenta em 2.' },
      { name: 'Visão no Escuro', description: 'Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra.' },
      { name: 'Resiliência Anã', description: 'Você possui vantagem em testes de resistência contra venenos e resistência contra dano de veneno.' },
      { name: 'Treinamento Anão em Combate', description: 'Você tem proficiência com machados de batalha, machadinhas, martelos leves e martelos de guerra.' },
      { name: 'Proficiência com Ferramentas', description: 'Você tem proficiência em uma ferramenta de artesão à sua escolha: ferramentas de ferreiro, suprimentos de cervejeiro ou ferramentas de pedreiro.' },
      { name: 'Especialização em Rochas', description: 'Sempre que você realizar um teste de Inteligência (História) relacionado à origem de um trabalho em pedra, você adiciona o dobro do seu bônus de proficiência.' }
    ]
  },
  {
    id: 'elf_2014',
    name: 'Elfo',
    description: 'Elfos são um povo mágico de graça sobrenatural, vivendo no mundo sem pertencer inteiramente a ele.',
    image: '/assets/elf.png',
    source: "Player's Handbook 2014",
    speed: 30,
    size: 'Médio',
    attributeBonuses: { dexterity: 2 },
    fixedSkills: ['Percepção'],
    subRaceTitle: 'Sub-raça do Elfo',
    subRaceMandatory: true,
    lineages: [
      {
        name: 'Alto Elfo',
        description: 'Como um alto elfo, você possui uma mente aguçada e domínio sobre o básico da magia.',
        attributeBonuses: { intelligence: 1 },
        traits: [
          { name: 'Inteligência +1', description: 'Seu valor de Inteligência aumenta em 1.' },
          { name: 'Treinamento com Armas Élficas', description: 'Proficiência com espada longa, espada curta, arco curto e arco longo.' },
          { name: 'Truque', description: 'Você conhece um truque da lista de magias do mago.' },
          { name: 'Idioma Adicional', description: 'Você pode falar, ler e escrever um idioma adicional à sua escolha.' }
        ]
      },
      {
        name: 'Elfo da Floresta',
        description: 'Seus sentidos e pés são ágeis, e você pode se esconder rapidamente na natureza.',
        attributeBonuses: { wisdom: 1 },
        speed: 35,
        traits: [
          { name: 'Sabedoria +1', description: 'Seu valor de Sabedoria aumenta em 1.' },
          { name: 'Treinamento com Armas Élficas', description: 'Proficiência com espada longa, espada curta, arco curto e arco longo.' },
          { name: 'Pés Ligeiros', description: 'Seu deslocamento aumenta para 10,5 metros (35 pés).' },
          { name: 'Máscara da Natureza', description: 'Você pode tentar se esconder mesmo quando está apenas levemente obscurecido por folhagem, chuva forte, neve, névoa ou outro fenômeno natural.' }
        ]
      },
      {
        name: 'Elfo Negro (Drow)',
        description: 'Descendentes de uma linhagem antiga de elfos que foram banidos para o Subterrâneo.',
        attributeBonuses: { charisma: 1 },
        traits: [
          { name: 'Carisma +1', description: 'Seu valor de Carisma aumenta em 1.' },
          { name: 'Visão no Escuro Superior', description: 'Sua visão no escuro tem alcance de 36 metros (120 pés).' },
          { name: 'Sensibilidade à Luz Solar', description: 'Desvantagem em ataques e Percepção visual sob luz solar direta.' },
          { name: 'Magia Drow', description: 'Você conhece Globos de Luz. No nível 3 conhece Fogo das Fadas e no nível 5, Escuridão.' },
          { name: 'Treinamento com Armas Drow', description: 'Você tem proficiência com rapieiras, espadas curtas e bestas de mão.' }
        ]
      }
    ],
    traits: [
      { name: 'Destreza +2', description: 'Seu valor de Destreza aumenta em 2.' },
      { name: 'Visão no Escuro', description: 'Você possui uma visão superior em condições de escuridão e na penumbra a até 18 metros.' },
      { name: 'Sentidos Aguçados', description: 'Você tem proficiência na perícia Percepção.' },
      { name: 'Ancestral Feérico', description: 'Você tem vantagem nos testes de resistência para resistir a ser enfeitiçado e magias não podem colocá-lo para dormir.' },
      { name: 'Transe', description: 'Elfos não precisam dormir. Ao invés disso, eles meditam profundamente por 4 horas por dia.' }
    ]
  },
  {
    id: 'halfling_2014',
    name: 'Halfling',
    description: 'Os halflings sobrevivem em um mundo cheio de criaturas maiores evitando serem notados ou evitando o conflito.',
    image: '/assets/halfling.png',
    source: "Player's Handbook 2014",
    speed: 25,
    size: 'Pequeno',
    attributeBonuses: { dexterity: 2 },
    subRaceTitle: 'Sub-raça do Halfling',
    subRaceMandatory: true,
    lineages: [
      {
        name: 'Pés-Leves',
        description: 'Você pode se esconder facilmente, mesmo usando apenas outra pessoa como cobertura.',
        attributeBonuses: { charisma: 1 },
        traits: [
          { name: 'Carisma +1', description: 'Seu valor de Carisma aumenta em 1.' },
          { name: 'Furtividade Natural', description: 'Pode tentar se esconder mesmo quando ocultado apenas por uma criatura que seja no mínimo um tamanho maior que você.' }
        ]
      },
      {
        name: 'Robusto',
        description: 'Você é mais resistente que a média, possuindo uma resiliência que lembra a dos anões.',
        attributeBonuses: { constitution: 1 },
        traits: [
          { name: 'Constituição +1', description: 'Seu valor de Constituição aumenta em 1.' },
          { name: 'Resiliência dos Robustos', description: 'Vantagem em salvaguardas contra veneno e resistência a dano de veneno.' }
        ]
      }
    ],
    traits: [
      { name: 'Destreza +2', description: 'Seu valor de Destreza aumenta em 2.' },
      { name: 'Sortudo', description: 'Ao tirar 1 natural, pode rolar novamente o dado.' },
      { name: 'Bravura', description: 'Vantagem contra ficar amedrontado.' },
      { name: 'Agilidade Halfling', description: 'Pode se mover através do espaço de criaturas maiores.' }
    ]
  },
  {
    id: 'human_2014',
    name: 'Humano',
    description: 'Humanos são os mais adaptáveis e ambiciosos entre as raças comuns.',
    image: '/assets/human.png',
    source: "Player's Handbook 2014",
    speed: 30,
    size: 'Médio',
    attributeBonuses: {
      strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1
    },
    subRaceTitle: 'Variante Étnica',
    subRaceMandatory: false,
    lineages: [
      {
        name: 'Humano Padrão',
        description: 'Aumento em todos os valores de habilidade.',
        attributeBonuses: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
        traits: [
          { name: 'Atributos +1', description: 'Todos os seus valores de atributo aumentam em 1.' }
        ]
      },
      {
        name: 'Humano Variante',
        description: 'Regra opcional que permite um talento e uma perícia adicional.',
        bonusSkillCount: 1,
        bonusFeatCount: 1,
        selectableAttributesCount: 2,
        traits: [
          { name: 'Atributos +1 (x2)', description: 'Dois valores de habilidade, à sua escolha, aumentam em 1.' },
          { name: 'Perícia Extra', description: 'Você ganha proficiência em uma perícia à sua escolha.' },
          { name: 'Talento Extra', description: 'Você adquire um talento de sua escolha.' }
        ]
      }
    ],
    traits: [
      { name: 'Adaptabilidade', description: 'Humanos são versáteis e ambiciosos.' },
      { name: 'Idioma Adicional', description: 'Você pode falar, ler e escrever um idioma adicional à sua escolha.' }
    ]
  },
  {
    id: 'dragonborn_2014',
    name: 'Draconato',
    description: 'Draconatos parecem dragões que caminham em forma humanoide, sem asas ou cauda.',
    image: '/assets/dragonborn.png',
    source: "Player's Handbook 2014",
    speed: 30,
    size: 'Médio',
    attributeBonuses: { strength: 2, charisma: 1 },
    subRaceTitle: 'Ancestralidade Dracônica',
    subRaceMandatory: true,
    lineages: [
      { name: 'Dragão Negro (Ácido)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Ácido.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (teste de Des).' }] },
      { name: 'Dragão Azul (Elétrico)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Relâmpago.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (teste de Des).' }] },
      { name: 'Dragão de Latão (Fogo)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Fogo.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (teste de Des).' }] },
      { name: 'Dragão de Bronze (Elétrico)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Relâmpago.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (teste de Des).' }] },
      { name: 'Dragão de Cobre (Ácido)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Ácido.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (teste de Des).' }] },
      { name: 'Dragão de Ouro (Fogo)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Fogo.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (teste de Des).' }] },
      { name: 'Dragão Verde (Veneno)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Veneno.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (teste de Con).' }] },
      { name: 'Dragão Vermelho (Fogo)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Fogo.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (teste de Des).' }] },
      { name: 'Dragão de Prata (Frio)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Frio.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (teste de Con).' }] },
      { name: 'Dragão Branco (Frio)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Frio.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (teste de Con).' }] },
    ],
    traits: [
      { name: 'Força +2, Carisma +1', description: 'Seus atributos aumentam.' },
      { name: 'Ancestralidade Dracônica', description: 'Você escolhe um tipo de dragão que define sua resistência e sopro.' },
      { name: 'Arma de Sopro', description: '2d6 de dano (escala no nível 6, 11 e 16). 1x por descanso curto/longo.' }
    ]
  },
  {
    id: 'gnome_2014',
    name: 'Gnomo',
    description: 'Gnomos celebram a vida e o mundo, encontrando prazer em cada invenção ou descoberta.',
    image: '/assets/gnome.png',
    source: "Player's Handbook 2014",
    speed: 25,
    size: 'Pequeno',
    attributeBonuses: { intelligence: 2 },
    subRaceTitle: 'Sub-raça do Gnomo',
    subRaceMandatory: true,
    lineages: [
      {
        name: 'Gnomo da Floresta',
        description: 'Você possui uma afinidade natural com ilusões e animais pequenos.',
        attributeBonuses: { dexterity: 1 },
        traits: [
          { name: 'Destreza +1', description: 'Seu valor de Destreza aumenta em 1.' },
          { name: 'Ilusionista Nato', description: 'Você conhece o truque Ilusão Menor.' },
          { name: 'Falar com Bestas Pequenas', description: 'Através de sons e gestos, você pode comunicar ideias simples para Bestas pequenas ou menores.' }
        ]
      },
      {
        name: 'Gnomo das Rochas',
        description: 'Você possui uma inventividade natural e bônus em constituição.',
        attributeBonuses: { constitution: 1 },
        traits: [
          { name: 'Constituição +1', description: 'Seu valor de Constituição aumenta em 1.' },
          { name: 'Conhecimento de Artífice', description: 'Bônus dobrado em testes de História relacionados a itens mágicos, alquímicos ou mecânicos.' },
          { name: 'Engenhoqueiro', description: 'Você pode construir mecanismos miúdos (brinquedo, isqueiro ou caixa de música) gastando 1h e 10 po.' }
        ]
      }
    ],
    traits: [
      { name: 'Inteligência +2', description: 'Seu valor de Inteligência aumenta em 2.' },
      { name: 'Esperteza Gnômica', description: 'Você possui vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia.' }
    ]
  },
  {
    id: 'half_elf_2014',
    name: 'Meio-Elfo',
    description: 'Meio-elfos combinam as melhores qualidades de seus pais humanos e élficos.',
    image: '/assets/elf.png',
    source: "Player's Handbook 2014",
    speed: 30,
    size: 'Médio',
    attributeBonuses: { charisma: 2 },
    bonusSkillCount: 2,
    selectableAttributesCount: 2,
    traits: [
      { name: 'Carisma +2', description: '+2 Carisma e +1 em outros dois atributos.' },
      { name: 'Ancestralidade Feérica', description: 'Vantagem contra encanto e imunidade a sono mágico.' },
      { name: 'Versatilidade em Perícias', description: 'Proficiência em duas perícias à sua escolha.' }
    ]
  },
  {
    id: 'half_orc_2014',
    name: 'Meio-Orc',
    description: 'Meio-orcs possuem uma vitalidade e força física que poucos conseguem igualar.',
    image: '/assets/orc.png',
    source: "Player's Handbook 2014",
    speed: 30,
    size: 'Médio',
    attributeBonuses: { strength: 2, constitution: 1 },
    fixedSkills: ['Intimidação'],
    traits: [
      { name: 'Força +2, Constituição +1', description: 'Seus atributos aumentam.' },
      { name: 'Ameaçador', description: 'Proficiência na perícia Intimidação.' },
      { name: 'Resistência Implacável', description: 'Ao cair a 0 PV, pode ficar com 1 PV (1x por descanso longo).' },
      { name: 'Ataques Selvagens', description: 'Críticos corpo-a-corpo causam um dado de dano extra.' }
    ]
  },
  {
    id: 'tiefling_2014',
    name: 'Tiefling',
    description: 'Tieflings são derivados de linhagens humanas que foram tocadas por influências infernais.',
    image: '/assets/tiefling.png',
    source: "Player's Handbook 2014",
    speed: 30,
    size: 'Médio',
    attributeBonuses: { intelligence: 1, charisma: 2 },
    traits: [
      { name: 'Inteligência +1, Carisma +2', description: 'Seus atributos aumentam.' },
      { name: 'Resistência Infernal', description: 'Resistência a dano de Fogo.' },
      { name: 'Legado Infernal', description: 'Taumaturgia (nível 1), Repreensão Infernal (nível 3), Escuridão (nível 5).' }
    ]
  },
  {
    id: 'aasimar_2014',
    name: 'Aasimar',
    description: 'Os Aasimar são mortais com uma centelha divina em suas almas, descendentes de celestiais.',
    image: '/assets/aasimar.png',
    source: "Volo's Guide to Monsters",
    speed: 30,
    size: 'Médio',
    attributeBonuses: { charisma: 2 },
    subRaceTitle: 'Sub-raça do Aasimar',
    subRaceMandatory: true,
    lineages: [
      {
        name: 'Aasimar Protetor',
        description: 'Aasimares protetores são encarregados por guias celestiais para vigiar e proteger os outros.',
        attributeBonuses: { wisdom: 1 },
        traits: [
          { name: 'Sabedoria +1', description: 'Seu valor de Sabedoria aumenta em 1.' },
          { name: 'Alma Radiante (Nível 3)', description: 'Como ação bônus, você ganha asas de luz e voo de 9m por 1 minuto. Uma vez por descanso longo.' }
        ]
      },
      {
        name: 'Aasimar Flagelo',
        description: 'Aasimares flagelos são preenchidos por uma energia divina intensa que queima para ser liberada.',
        attributeBonuses: { constitution: 1 },
        traits: [
          { name: 'Constituição +1', description: 'Seu valor de Constituição aumenta em 1.' },
          { name: 'Consumação Radiante (Nível 3)', description: 'Como ação bônus, você derrama luz divina por 1 minuto, causando dano radiante a si mesmo e a quem estiver perto. Uma vez por descanso longo.' }
        ]
      },
      {
        name: 'Aasimar Caído',
        description: 'Aasimares caídos são aqueles que foram tocados por forças sombrias ou cuja luz interior foi corrompida.',
        attributeBonuses: { strength: 1 },
        traits: [
          { name: 'Força +1', description: 'Seu valor de Força aumenta em 1.' },
          { name: 'Mortalha Necrótica (Nível 3)', description: 'Como ação bônus, você libera uma energia aterrorizante por 1 minuto, assustando inimigos próximos. Uma vez por descanso longo.' }
        ]
      }
    ],
    traits: [
      { name: 'Carisma +2', description: 'Seu valor de Carisma aumenta em 2.' },
      { name: 'Visão no Escuro', description: 'Você enxerga na penumbra a até 18 metros como se fosse luz plena.' },
      { name: 'Resistência Celestial', description: 'Você tem resistência a dano necrótico e radiante.' },
      { name: 'Mãos Curadoras', description: 'Como ação, você pode tocar uma criatura e curar PV igual ao seu nível. 1x por descanso longo.' }
    ]
  },
  {
    id: 'goliath_2014',
    name: 'Goliá',
    description: 'Goliás são descendentes de gigantes que habitam os picos mais altos do mundo.',
    image: '/assets/goliath.png',
    source: "Elemental Evil Player's Companion",
    speed: 30,
    size: 'Médio',
    attributeBonuses: { strength: 2, constitution: 1 },
    fixedSkills: ['Atletismo'],
    traits: [
      { name: 'Força +2, Constituição +1', description: 'Seus atributos aumentam.' },
      { name: 'Natural da Montanha', description: 'Você é aclimatado a altitudes elevadas e clima frio.' },
      { name: 'Constituição de Pedra', description: 'Quando você sofre dano, pode usar sua reação para reduzir o dano sofrido em 1d12 + Mod. Constituição. 1x por descanso curto/longo.' },
      { name: 'Compleição Poderosa', description: 'Você conta como um tamanho maior para determinar sua capacidade de carga e peso que pode empurrar/arrastar.' }
    ]
  },
  {
    id: 'dhampir_2014',
    name: 'Dhampir',
    description: 'Equilibrados entre os mundos dos vivos e dos mortos, os dhampirs mantêm seu apego à vida, mas são constantemente testados por fomes terríveis.',
    image: '/assets/dhampir.jpg',
    source: "Van Richten's Guide to Ravenloft",
    speed: 35,
    size: 'Médio',
    attributeBonuses: { constitution: 2, dexterity: 1 },
    bonusSkillCount: 2,
    traits: [
      { name: 'Constituição +2, Destreza +1', description: 'Seus valores de atributo aumentam.' },
      { name: 'Visão no Escuro', description: 'Você enxerga na penumbra a até 18 metros como se fosse luz plena.' },
      { name: 'Natureza Imortal', description: 'Você não precisa respirar.' },
      { name: 'Escalada Aracnídea', description: 'Você possui deslocamento de escalada igual ao seu deslocamento de caminhada. A partir do 3º nível, pode se mover por superfícies verticais e tetos com as mãos livres.' },
      { name: 'Mordida Vampírica', description: 'Sua mordida é uma arma natural (arma simples corpo-a-corpo) que causa 1d4 de dano perfurante e usa seu modificador de Constituição. Pode se curar ou ganhar bônus em testes/ataques igual ao dano causado (usos igual ao Bônus de Proficiência).' }
    ]
  },
  {
    id: 'reborn_2014',
    name: 'Renascido',
    description: 'A morte nem sempre é o fim. Os renascidos exemplificam isso, sendo indivíduos que morreram mas, de alguma forma, ainda vivem.',
    image: '/assets/reborn.jpg',
    source: "Van Richten's Guide to Ravenloft",
    speed: 30,
    size: 'Médio',
    attributeBonuses: { constitution: 2, intelligence: 1 },
    bonusSkillCount: 2,
    traits: [
      { name: 'Constituição +2, Inteligência +1', description: 'Seus valores de atributo aumentam.' },
      { name: 'Visão no Escuro', description: 'Você enxerga na penumbra a até 18 metros como se fosse luz plena.' },
      { name: 'Natureza Imortal', description: 'Você possui vantagem em salvaguardas contra doenças e veneno, resistência a dano de veneno e vantagem em salvaguardas contra a morte. Você não precisa comer, beber, dormir ou respirar.' },
      { name: 'Conhecimento de uma Vida Passada', description: 'Você temporariamente lembra vislumbres do passado. Ao fazer um teste de perícia, você pode rolar um d6 adicional e somá-lo ao resultado (usos iguais ao Bônus de Proficiência).' }
    ]
  },
  {
    id: 'hexblood_2014',
    name: 'Sangue de Bruxa',
    description: 'Criados por rituais ou pactos com bruxas, os Sangue de Bruxa manifestam características feéricas e estranhas conexões mágicas.',
    image: '/assets/hexblood.jpg',
    source: "Van Richten's Guide to Ravenloft",
    speed: 30,
    size: 'Pequeno ou Médio',
    attributeBonuses: { charisma: 2, constitution: 1 },
    bonusSkillCount: 2,
    traits: [
      { name: 'Carisma +2, Constituição +1', description: 'Seus valores de atributo aumentam.' },
      { name: 'Tipo de Criatura', description: 'Você é do tipo Feérico.' },
      { name: 'Visão no Escuro', description: 'Você enxerga na penumbra a até 18 metros (60 pés) como se fosse luz plena e na escuridão como se fosse penumbra.' },
      { name: 'Legado Ancestral', description: 'Se você substituir uma raça com esta linhagem, você pode manter as proficiências em perícias e quaisquer deslocamentos de escalada, voo ou natação daquela raça. Caso contrário, você ganha proficiência em duas perícias de sua escolha.' },
      { name: 'Token Sinistro (Eerie Token)', description: 'Com uma ação bônus, você pode remover uma mecha de cabelo, unha ou dente. O token é imbuído com magia até seu próximo descanso longo. Enquanto estiver ativo, você pode enviar Mensagens Telepáticas (até 25 palavras) ou usar Visão Remota (entrar em transe por 1 minuto para ver e ouvir através do token) a até 10 milhas (16 km). Uma vez criado, não pode fazê-lo novamente até um descanso longo.' },
      { name: 'Magia de Pacto (Hex Magic)', description: 'Você pode conjurar as magias Bruxaria (Hex) e Disfarçar-se usando este traço. Uma vez que conjurar qualquer uma delas, não poderá fazê-lo novamente até um descanso longo. Você também pode conjurá-las usando quaisquer espaços de magia que possuir. Inteligência, Sabedoria ou Carisma é a sua habilidade de conjuração para essas magias (escolhida ao obter a linhagem).' }
    ]
  },
  {
    id: 'genasi_2014',
    name: 'Genasi',
    description: 'Os genasi são humanoides que carregam o poder dos planos elementais em seu sangue, herdando traços de seus pais elementais e gênios.',
    image: '/assets/genasi.jpeg',
    source: "Elemental Evil Player's Companion",
    speed: 30,
    size: 'Médio',
    attributeBonuses: { constitution: 2 },
    subRaceTitle: 'Elemento do Genasi',
    subRaceMandatory: true,
    lineages: [
      {
        name: 'Genasi da Água',
        description: 'Genasi da água são calmos e adaptáveis, mas escondem a fúria das tempestades e das profundezas.',
        attributeBonuses: { wisdom: 1 },
        traits: [
          { name: 'Sabedoria +1', description: 'Seu valor de Sabedoria aumenta em 1.' },
          { name: 'Resistência a Ácido', description: 'Você possui resistência a dano ácido.' },
          { name: 'Anfíbio', description: 'Você pode respirar ar e água.' },
          { name: 'Natação', description: 'Você possui deslocamento de natação de 9 metros (30 pés).' },
          { name: 'Chamado das Marés', description: 'Você conhece o truque Espirro Ácido. A partir do 3º nível, pode conjurar Criar ou Destruir Água. A partir do 5º nível, pode conjurar Andar na Água. 1x por descanso longo ou com espaços de magia.' }
        ]
      },
      {
        name: 'Genasi do Ar',
        description: 'Genasi do ar são ágeis e mutáveis como o vento, carregando a essência da brisa e do relâmpago.',
        attributeBonuses: { dexterity: 1 },
        traits: [
          { name: 'Destreza +1', description: 'Seu valor de Destreza aumenta em 1.' },
          { name: 'Resistência Elétrica', description: 'Você possui resistência a dano elétrico.' },
          { name: 'Fôlego Interminável', description: 'Você pode prender a respiração indefinidamente enquanto não estiver incapacitado.' },
          { name: 'Misturar-se aos Ventos', description: 'Você conhece o truque Toque Chocante. A partir do 3º nível, pode conjurar Queda Suave. A partir do 5º nível, pode conjurar Levitação. 1x por descanso longo ou com espaços de magia.' }
        ]
      },
      {
        name: 'Genasi do Fogo',
        description: 'Genasi do fogo são passionais e intensos, brilhando com o calor e as chamas do Plano Elemental do Fogo.',
        attributeBonuses: { intelligence: 1 },
        traits: [
          { name: 'Inteligência +1', description: 'Seu valor de Inteligência aumenta em 1.' },
          { name: 'Resistência a Fogo', description: 'Você possui resistência a dano de fogo.' },
          { name: 'Alcançar as Chamas', description: 'Você conhece o truque Criar Chamas. A partir do 3º nível, pode conjurar Mãos Flamejantes. A partir do 5º nível, pode conjurar Lâmina Flamejante. 1x por descanso longo ou com espaços de magia.' }
        ]
      },
      {
        name: 'Genasi da Terra',
        description: 'Genasi da terra são firmes e pacientes como as rochas, imunes às intempéries do solo.',
        attributeBonuses: { strength: 1 },
        traits: [
          { name: 'Força +1', description: 'Seu valor de Força aumenta em 1.' },
          { name: 'Caminhada Terrestre', description: 'Você ignora terreno difícil baseado em terra ou rocha.' },
          { name: 'Um com a Terra', description: 'Você conhece o truque Proteção contra Lâminas. Pode conjurá-lo como ação bônus um número de vezes igual ao seu bônus de proficiência por descanso longo. A partir do 5º nível, pode conjurar Passos Sem Pegadas. 1x por descanso longo ou com espaços de magia.' }
        ]
      }
    ],
    traits: [
      { name: 'Constituição +2', description: 'Seu valor de Constituição aumenta em 2.' },
      { name: 'Visão no Escuro', description: 'Você enxerga na penumbra a até 18 metros como se fosse luz plena, em tons de seu elemento.' },
      { name: 'Idiomas', description: 'Você sabe falar, ler e escrever Comum e Primordial.' }
    ]
  }
];
