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
          { name: 'Treinamento com Armaduras Anãs', description: 'Você tem proficiência com armaduras leves e médias.' }
        ]
      }
    ],
    traits: [
      { name: 'Constituição +2', description: 'Seu valor de Constituição aumenta em 2.' },
      { name: 'Visão no Escuro', description: '18 metros (60 pés).' },
      { name: 'Resiliência Anã', description: 'Vantagem em salvaguardas contra veneno e resistência a dano de veneno.' },
      { name: 'Treinamento Anão em Combate', description: 'Proficiência com machado de batalha, machadinha, martelo leve e martelo de guerra.' },
      { name: 'Proficiência com Ferramentas', description: 'Proficiência com uma ferramenta de artesão (ferreiro, cervejeiro ou pedreiro).' },
      { name: 'Especialização em Rochas', description: 'Bônus de proficiência dobrado em testes de Inteligência (História) relacionados a trabalhos em pedra.' }
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
          { name: 'Truque', description: 'Você conhece um truque da lista de magias do mago.' }
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
          { name: 'Pés Ligeiros', description: 'Seu deslocamento aumenta para 10,5 metros (35 pés).' }
        ]
      },
      {
        name: 'Elfo Negro (Drow)',
        description: 'Descendentes de uma linhagem antiga de elfos que foram banidos para o Subterrâneo.',
        attributeBonuses: { charisma: 1 },
        traits: [
          { name: 'Carisma +1', description: 'Seu valor de Carisma aumenta em 1.' },
          { name: 'Visão no Escuro Superior', description: 'Sua visão no escuro tem alcance de 36 metros (120 pés).' },
          { name: 'Treinamento com Armas Drow', description: 'Você tem proficiência com rapieiras, espadas curtas e bestas de mão.' },
          { name: 'Magia Drow', description: 'Você conhece o truque Globos de Luz.' }
        ]
      }
    ],
    traits: [
      { name: 'Destreza +2', description: 'Seu valor de Destreza aumenta em 2.' },
      { name: 'Visão no Escuro', description: '18 metros (60 pés).' },
      { name: 'Sentidos Aguçados', description: 'Proficiência na perícia Percepção.' },
      { name: 'Ancestralidade Feérica', description: 'Vantagem contra ser enfeitiçado e imunidade a sono mágico.' },
      { name: 'Transe', description: 'Meditação de 4 horas equivale a 8 horas de sono.' }
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
    traits: [
      { name: 'Atributos +1', description: 'Todos os seus valores de atributo aumentam em 1.' },
      { name: 'Idioma Adicional', description: 'Um idioma à sua escolha.' }
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
      { name: 'Dragão Negro (Ácido)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Ácido.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (Salva. DES).' }] },
      { name: 'Dragão Azul (Elétrico)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Relâmpago.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (Salva. DES).' }] },
      { name: 'Dragão de Latão (Fogo)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Fogo.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (Salva. DES).' }] },
      { name: 'Dragão de Bronze (Elétrico)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Relâmpago.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (Salva. DES).' }] },
      { name: 'Dragão de Cobre (Ácido)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Ácido.' }, { name: 'Arma de Sopro', description: 'Linha de 1,5m por 9m (Salva. DES).' }] },
      { name: 'Dragão de Ouro (Fogo)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Fogo.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (Salva. DES).' }] },
      { name: 'Dragão Verde (Veneno)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Veneno.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (Salva. CON).' }] },
      { name: 'Dragão Vermelho (Fogo)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Fogo.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (Salva. DES).' }] },
      { name: 'Dragão de Prata (Frio)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Frio.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (Salva. CON).' }] },
      { name: 'Dragão Branco (Frio)', traits: [{ name: 'Resistência Dracônica', description: 'Você tem resistência a Frio.' }, { name: 'Arma de Sopro', description: 'Cone de 4,5m (Salva. CON).' }] },
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
          { name: 'Ilusionista Nato', description: 'Você conhece o truque Ilusão Menor.' }
        ]
      },
      {
        name: 'Gnomo das Rochas',
        description: 'Você possui uma inventividade natural e bônus em constituição.',
        attributeBonuses: { constitution: 1 },
        traits: [
          { name: 'Constituição +1', description: 'Seu valor de Constituição aumenta em 1.' },
          { name: 'Engenhoca', description: 'Você tem proficiência com ferramentas de artesão (ferramentas de funileiro).' }
        ]
      }
    ],
    traits: [
      { name: 'Inteligência +2', description: 'Seu valor de Inteligência aumenta em 2.' },
      { name: 'Esperteza Gnômica', description: 'Vantagem em salvaguardas de INT, SAB e CAR contra magia.' }
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
  }
];
