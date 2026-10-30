export interface Feat {
  id: string;
  name: string;
  englishName?: string;
  description: string;
  requirement?: string;
  benefit?: {
    attributes?: Record<string, number>;
    custom?: string;
  };
  category: 'General' | 'Fighting Style' | 'Epic Boon';
  minLevel: number;
}

export const FEATS_2024: Feat[] = [
  // TALENTOS GERAIS (NÍVEL 4+)
  {
    id: 'asi',
    name: 'Melhoria no Valor de Habilidade',
    englishName: 'Ability Score Improvement',
    description: '+2 em um atributo ou +1 em dois.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'actor',
    name: 'Ator',
    englishName: 'Actor',
    description: '+1 Car, vantagem para imitar outros.',
    requirement: 'Carisma 13+',
    benefit: { attributes: { charisma: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'athlete',
    name: 'Atleta',
    englishName: 'Athlete',
    description: '+1 For/Des, escalada rápida e levanta do chão fácil.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'charger',
    name: 'Investida Poderosa',
    englishName: 'Charger',
    description: '+1 For/Des, +1d8 dano ou empurrão após correr.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'chef',
    name: 'Cozinheiro',
    englishName: 'Chef',
    description: '+1 Cons/Sab, cria guloseimas que curam.',
    requirement: 'Constituição ou Sabedoria 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'crossbow-expert',
    name: 'Especialista em Besta',
    englishName: 'Crossbow Expert',
    description: '+1 Des, ignora recarga e tiro corpo-a-corpo.',
    requirement: 'Destreza 13+',
    benefit: { attributes: { dexterity: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'crusher',
    name: 'Esmagador',
    englishName: 'Crusher',
    description: '+1 For/Cons, empurra com concussão e melhora crítico.',
    requirement: 'Força ou Constituição 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'defensive-duelist',
    name: 'Duelista Defensivo',
    englishName: 'Defensive Duelist',
    description: '+1 Des, reação para CA com arma de acuidade.',
    requirement: 'Destreza 13+',
    benefit: { attributes: { dexterity: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'dual-wielder',
    name: 'Ambidestro',
    englishName: 'Dual Wielder',
    description: '+1 For/Des, usa duas armas (uma não-leve).',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'durable',
    name: 'Resistente',
    englishName: 'Durable',
    description: '+1 Cons, vantagem em salvaguardas de morte e cura rápida.',
    requirement: 'Constituição 13+',
    benefit: { attributes: { constitution: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'elemental-adept',
    name: 'Adepto Elemental',
    englishName: 'Elemental Adept',
    description: '+1 Int/Sab/Car, ignora resistência elemental.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'fey-touched',
    name: 'Tocado pelas Fadas',
    englishName: 'Fey Touched',
    description: '+1 Int/Sab/Car, Passo Nebuloso e magia de 1º nível.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'grappler',
    name: 'Imobilizador',
    englishName: 'Grappler',
    description: '+1 For/Des, vantagem contra alvos agarrados.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'great-weapon-master',
    name: 'Mestre em Armas Grandes',
    englishName: 'Great Weapon Master',
    description: '+1 For, ataque bônus e dano extra pesado.',
    requirement: 'Força 13+',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'heavily-armored',
    name: 'Armadura Pesada',
    englishName: 'Heavily Armored',
    description: '+1 For, proficiência com armaduras pesadas.',
    requirement: 'Prof. Armadura Média',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'heavy-armor-master',
    name: 'Mestre em Armadura Pesada',
    englishName: 'Heavy Armor Master',
    description: '+1 For, reduz dano físico sofrido.',
    requirement: 'Prof. Armadura Pesada',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'inspiring-leader',
    name: 'Líder Inspirador',
    englishName: 'Inspiring Leader',
    description: '+1 Sab/Car, dá PV temporários aos aliados.',
    requirement: 'Sabedoria ou Carisma 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'keen-mind',
    name: 'Mente Aguçada',
    englishName: 'Keen Mind',
    description: '+1 Int, perícia de Int e ação bônus para Estudo.',
    requirement: 'Inteligência 13+',
    benefit: { attributes: { intelligence: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'lightly-armored',
    name: 'Armadura Leve',
    englishName: 'Lightly Armored',
    description: '+1 For/Des, proficiência com leves e escudos.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'mage-slayer',
    name: 'Carrasco de Magos',
    englishName: 'Mage Slayer',
    description: '+1 For/Des, prejudica concentração e resiste a magia.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'martial-weapon-training',
    name: 'Treinamento com Armas Marciais',
    englishName: 'Martial Weapon Training',
    description: '+1 For/Des, proficiência com armas marciais.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'medium-armor-master',
    name: 'Mestre em Armadura Média',
    englishName: 'Medium Armor Master',
    description: '+1 For/Des, melhora CA e furtividade média.',
    requirement: 'Prof. Armadura Média',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'moderately-armored',
    name: 'Armadura Média',
    englishName: 'Moderately Armored',
    description: '+1 For/Des, proficiência com médias e escudos.',
    requirement: 'Prof. Armadura Leve',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'mounted-combatant',
    name: 'Combatente Montado',
    englishName: 'Mounted Combatant',
    description: '+1 For/Des, vantagem montado e protege montaria.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'observant',
    name: 'Observador',
    englishName: 'Observant',
    description: '+1 Int/Sab, bônus passivo e ação bônus para Busca.',
    requirement: 'Inteligência ou Sabedoria 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'piercer',
    name: 'Perfurador',
    englishName: 'Piercer',
    description: '+1 For/Des, rerola perfuração e dado extra no crítico.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'poisoner',
    name: 'Envenenador',
    englishName: 'Poisoner',
    description: '+1 Des/Int, ignora resistência a veneno e aplica bônus.',
    requirement: 'Destreza ou Inteligência 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'polearm-master',
    name: 'Mestre de Armas de Haste',
    englishName: 'Polearm Master',
    description: '+1 For, ataque bônus e de oportunidade longo.',
    requirement: 'Força ou Destreza 13+',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'resilient',
    name: 'Resiliente',
    englishName: 'Resilient',
    description: '+1 em um atributo e proficiência na salvaguarda.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'ritual-caster',
    name: 'Conjurador de Rituais',
    englishName: 'Ritual Caster',
    description: '+1 Int/Sab/Car, conjura rituais de qualquer lista.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'sentinel',
    name: 'Sentinela',
    englishName: 'Sentinel',
    description: '+1 For/Des, trava inimigo e ataca quem agride aliados.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'shadow-touched',
    name: 'Tocado pelas Sombras',
    englishName: 'Shadow Touched',
    description: '+1 Int/Sab/Car, Invisibilidade e magia de 1º nível.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'sharpshooter',
    name: 'Atirador Aguçado',
    englishName: 'Sharpshooter',
    description: '+1 Des, ignora cobertura e distância longa.',
    requirement: 'Destreza 13+',
    benefit: { attributes: { dexterity: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'shield-master',
    name: 'Mestre de Escudo',
    englishName: 'Shield Master',
    description: '+1 For, derruba com escudo e mitiga dano de área.',
    requirement: 'Prof. Escudos',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'skill-expert',
    name: 'Especialista em Perícia',
    englishName: 'Skill Expert',
    description: '+1 em atributo, 1 proficiência e 1 Expertise.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'skulker',
    name: 'Sorrateiro',
    englishName: 'Skulker',
    description: '+1 Des, esconde em luz leve e erra tiro sem revelar.',
    requirement: 'Destreza 13+',
    benefit: { attributes: { dexterity: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'slasher',
    name: 'Cortador',
    englishName: 'Slasher',
    description: '+1 For/Des, reduz deslocamento e desvantagem no crítico.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'speedy',
    name: 'Veloz',
    englishName: 'Speedy',
    description: '+1 Des/Cons, +10 pés de movimento e ignora terreno.',
    requirement: 'Destreza ou Constituição 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'spell-sniper',
    name: 'Atirador de Magia',
    englishName: 'Spell Sniper',
    description: '+1 Int/Sab/Car, ignora cobertura e tiro corpo-a-corpo.',
    requirement: 'Característica Conjuração',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'telekinetic',
    name: 'Telecinético',
    englishName: 'Telekinetic',
    description: '+1 Int/Sab/Car, Mãos Mágicas e empurrão mental.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'telepathic',
    name: 'Telepata',
    englishName: 'Telepathic',
    description: '+1 Int/Sab/Car, fala telepática e lê pensamentos.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'war-caster',
    name: 'Conjurador de Guerra',
    englishName: 'War Caster',
    description: '+1 Int/Sab/Car, vantagem concentração e magia como reação.',
    requirement: 'Característica Conjuração',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'weapon-master',
    name: 'Mestre em Armas',
    englishName: 'Weapon Master',
    description: '+1 For/Des, ganha Weapon Mastery em armas.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },

  // TALENTOS DE ESTILO DE LUTA
  {
    id: 'archery',
    name: 'Arquearia',
    englishName: 'Archery',
    description: '+2 em ataques à distância.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'blind-fighting',
    name: 'Luta às Cegas',
    englishName: 'Blind Fighting',
    description: 'Visão às cegas 10 pés.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'defense',
    name: 'Defesa',
    englishName: 'Defense',
    description: '+1 na CA com armadura.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'dueling',
    name: 'Duelismo',
    englishName: 'Dueling',
    description: '+2 no dano com uma arma de uma mão.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'great-weapon-fighting',
    name: 'Combate com Armas Grandes',
    englishName: 'Great Weapon Fighting',
    description: 'Rerola 1 ou 2 em armas de duas mãos.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'interception',
    name: 'Interceptação',
    englishName: 'Interception',
    description: 'Reação para reduzir dano em aliado.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'protection',
    name: 'Proteção',
    englishName: 'Protection',
    description: 'Desvantagem em ataque contra aliado (usa escudo).',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'thrown-weapon-fighting',
    name: 'Combate com Armas de Arremesso',
    englishName: 'Thrown Weapon Fighting',
    description: 'Saca/ataca e +2 no dano arremesso.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'two-weapon-fighting',
    name: 'Combate com Duas Armas',
    englishName: 'Two-Weapon Fighting',
    description: 'Modificador no dano do segundo ataque.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'unarmed-fighting',
    name: 'Combate Desarmado',
    englishName: 'Unarmed Fighting',
    description: 'Dano desarmado 1d6/1d8.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },

  // BÊNÇÃOS ÉPICAS (NÍVEL 19+)
  {
    id: 'boon-combat-prowess',
    name: 'Bênção da Proeza em Combate',
    englishName: 'Boon of Combat Prowess',
    description: 'Transforma erro em acerto (1/turno).',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-dimensional-travel',
    name: 'Bênção da Viagem Dimensional',
    englishName: 'Boon of Dimensional Travel',
    description: 'Teleporte 30 pés após ação.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-energy-resistance',
    name: 'Bênção da Resistência a Energia',
    englishName: 'Boon of Energy Resistance',
    description: 'Resistência a 2 tipos de dano.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-fate',
    name: 'Bênção do Destino',
    englishName: 'Boon of Fate',
    description: 'Soma/subtrai 2d4 de teste alheio.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-fortitude',
    name: 'Bênção da Fortitude',
    englishName: 'Boon of Fortitude',
    description: '+40 PV e melhora curas.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-irresistible-offense',
    name: 'Bênção da Ofensiva Irresistível',
    englishName: 'Boon of Irresistible Offense',
    description: 'Ignora resistências a dano.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-luck',
    name: 'Bênção da Sorte',
    englishName: 'Boon of Luck',
    description: '+1d10 em teste ou salvaguarda.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-night-spirit',
    name: 'Bênção do Espírito Noturno',
    englishName: 'Boon of Night Spirit',
    description: 'Invisível na penumbra/escuridão.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-recovery',
    name: 'Bênção da Recuperação',
    englishName: 'Boon of Recovery',
    description: 'Recupera 50% PV ao cair a 0.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-skill',
    name: 'Bênção da Perícia',
    englishName: 'Boon of Skill',
    description: 'Proficiência em todas as perícias.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-spell-recall',
    name: 'Bênção da Reminiscência de Magia',
    englishName: 'Boon of Spell Recall',
    description: 'Chance de não gastar espaço de magia 1-4.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-truesight',
    name: 'Bênção da Visão Verdadeira',
    englishName: 'Boon of Truesight',
    description: 'Visão Verdadeira 60 pés.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },

  // EXPANSÕES (FIZBAN / GLORY OF THE GIANTS)
  {
    id: 'gift-chromatic-dragon',
    name: 'Dádiva do Dragão Cromático',
    englishName: 'Gift of the Chromatic Dragon',
    description: 'Infunde arma com 1d4 elemental (ácido/frio/fogo/elétrico/veneno) por 1 min, e dá reação para resistir a esses danos.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'gift-gem-dragon',
    name: 'Dádiva do Dragão de Gemas',
    englishName: 'Gift of the Gem Dragon',
    description: '+1 Int/Sab/Car, reação causa 2d8 força e empurra 10 pés inimigo a até 10 pés que te deu dano (Salvaguarda de Força CD 8+prof+mod).',
    requirement: 'Nível 4+',
    benefit: { attributes: { choice: 1 } }, // dynamically handles choice in UI if configured
    category: 'General',
    minLevel: 4
  },
  {
    id: 'gift-metallic-dragon',
    name: 'Dádiva do Dragão Metálico',
    englishName: 'Gift of the Metallic Dragon',
    description: 'Aprende Curar Ferimentos (conjura 1x grátis), e reação soma proficiência na CA própria ou de aliado a até 5 pés.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'strike-of-the-giants',
    name: 'Golpe dos Gigantes',
    englishName: 'Strike of the Giants',
    description: '1x/turno adiciona dano extra e efeito especial (save CD 8+prof+Str/Con) em ataque físico com base no tipo de gigante escolhido.',
    requirement: 'Prof. Arma Marcial ou Enjeitado dos Gigantes',
    category: 'General',
    minLevel: 1
  },
  {
    id: 'rune-shaper',
    name: 'Modelador de Runas',
    englishName: 'Rune Shaper',
    description: 'Aprende Compreender Idiomas (conjura 1x grátis), grava runas em itens para acessar magias de 1º nível adicionais.',
    requirement: 'Conjuração ou Gravador de Runas',
    category: 'General',
    minLevel: 1
  },
  {
    id: 'guile-cloud-giant',
    name: 'Astúcia do Gigante das Nuvens',
    englishName: 'Guile of the Cloud Giant',
    description: '+1 For/Cons/Car, reação para reduzir dano sofrido pela metade e teleportar-se até 30 pés.',
    requirement: 'Nível 4, Golpe dos Gigantes (Nuvens)',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'ember-fire-giant',
    name: 'Brasa do Gigante de Fogo',
    englishName: 'Ember of the Fire Giant',
    description: '+1 For/Cons/Sab, resistência a fogo, substitui ataque por explosão de fogo 15 pés que causa 1d8+prof e cega inimigos.',
    requirement: 'Nível 4, Golpe dos Gigantes (Fogo)',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'fury-frost-giant',
    name: 'Fúria do Gigante do Gelo',
    englishName: 'Fury of the Frost Giant',
    description: '+1 For/Cons/Sab, resistência a frio, reação causa 1d8+prof frio e reduz velocidade do atacante a 0 (Con save).',
    requirement: 'Nível 4, Golpe dos Gigantes (Gelo)',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'keenness-stone-giant',
    name: 'Perspicácia do Gigante de Pedra',
    englishName: 'Keenness of the Stone Giant',
    description: '+1 For/Cons/Sab, +60 pés visão no escuro, ação bônus arremessa pedra mágica causando 1d10 força e derrubando (Str save).',
    requirement: 'Nível 4, Golpe dos Gigantes (Pedra)',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'soul-storm-giant',
    name: 'Alma do Gigante da Tempestade',
    englishName: 'Soul of the Storm Giant',
    description: '+1 For/Sab/Car, ação bônus cria aura de 10 pés por 1 turno: resistência a elétrico/trovão, desvantagem em ataques contra você, inimigos têm velocidade reduzida.',
    requirement: 'Nível 4, Golpe dos Gigantes (Tempestade)',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'vigor-hill-giant',
    name: 'Vigor do Gigante da Colina',
    englishName: 'Vigor of the Hill Giant',
    description: '+1 For/Cons/Sab, reação evita ser empurrado/derrubado, adiciona 1d8+Con em curas de Dados de Vida.',
    requirement: 'Nível 4, Golpe dos Gigantes (Colina)',
    category: 'General',
    minLevel: 4
  },

  // TASHA'S CAULDRON OF EVERYTHING
  {
    id: 'artificer-initiate',
    name: 'Iniciado em Artífice',
    englishName: 'Artificer Initiate',
    description: 'Aprende 1 truque e 1 magia de 1º nível de Artífice (conjura 1x grátis), proficiência com ferramenta de artesão.',
    requirement: 'Nível 1+',
    category: 'General',
    minLevel: 1
  },
  {
    id: 'eldritch-adept',
    name: 'Adepto Místico',
    englishName: 'Eldritch Adept',
    description: 'Aprende uma Invocação Mística de Bruxo. Se a invocação exigir pré-requisitos, você só poderá escolhê-la se for um Bruxo e os cumprir.',
    requirement: 'Conjuração ou Magia de Pacto',
    category: 'General',
    minLevel: 1
  },
  {
    id: 'fighting-initiate',
    name: 'Iniciado em Combate',
    englishName: 'Fighting Initiate',
    description: 'Aprende um Estilo de Luta de Guerreiro.',
    requirement: 'Proficiência com pelo menos uma Arma Marcial',
    category: 'General',
    minLevel: 1
  },
  {
    id: 'gunner',
    name: 'Artilheiro de Armas de Fogo',
    englishName: 'Gunner',
    description: '+1 Des, proficiência com armas de fogo, ignora recarga e elimina desvantagem a curta distância.',
    requirement: 'Nível 4+',
    benefit: { attributes: { dexterity: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'metamagic-adept',
    name: 'Adepto em Metamagia',
    englishName: 'Metamagic Adept',
    description: 'Aprende duas Metamagias de Feiticeiro e ganha 2 pontos de feitiçaria.',
    requirement: 'Conjuração ou Magia de Pacto',
    category: 'General',
    minLevel: 1
  },

  // XANATHAR'S GUIDE TO EVERYTHING (RACIAIS)
  {
    id: 'bountiful-luck',
    name: 'Sorte Abundante',
    englishName: 'Bountiful Luck',
    description: 'Permite que aliado a até 30 pés rerole um 1 no d20 usando sua reação.',
    requirement: 'Raça Halfling',
    category: 'General',
    minLevel: 1
  },
  {
    id: 'dragon-fear',
    name: 'Medo Dracônico',
    englishName: 'Dragon Fear',
    description: '+1 For/Con/Car, substitui uso do sopro por rugido que amedronta inimigos a até 30 pés.',
    requirement: 'Raça Draconato',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'dragon-hide',
    name: 'Couro Dracônico',
    englishName: 'Dragon Hide',
    description: '+1 For/Con/Car, CA sem armadura vira 13 + Des, garras causam 1d4 cortante.',
    requirement: 'Raça Draconato',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'drow-high-magic',
    name: 'Alta Magia Drow',
    englishName: 'Drow High Magic',
    description: 'Aprende Detectar Magia à vontade, Levitação e Dissipar Magia 1x grátis.',
    requirement: 'Raça Elfo (Drow)',
    category: 'General',
    minLevel: 1
  },
  {
    id: 'dwarf-fortitude',
    name: 'Fortitude dos Anões',
    englishName: 'Dwarf Fortitude',
    description: '+1 Con, gastar Dado de Vida para se curar ao realizar a ação Esquivar.',
    requirement: 'Raça Anão',
    benefit: { attributes: { constitution: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'fade-away',
    name: 'Desvanecer',
    englishName: 'Fade Away',
    description: '+1 Des/Int, reação ao sofrer dano para ficar invisível até fim do seu próximo turno.',
    requirement: 'Raça Gnomo',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'fey-teleportation',
    name: 'Teletransporte Feérico',
    englishName: 'Fey Teleportation',
    description: '+1 Int/Car, aprende Silvestre, conjura Passo Nebuloso 1x por descanso curto/longo.',
    requirement: 'Raça Elfo (Alto)',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'flames-of-phlegethos',
    name: 'Chamas de Flegetos',
    englishName: 'Flames of Phlegethos',
    description: '+1 Int/Car, rerola 1s em dano de fogo, conjurar magia de fogo cria aura protetora.',
    requirement: 'Raça Tiefling',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'infernal-constitution',
    name: 'Constituição Infernal',
    englishName: 'Infernal Constitution',
    description: '+1 Con, resistência a frio e veneno, vantagem contra ser envenenado.',
    requirement: 'Raça Tiefling',
    benefit: { attributes: { constitution: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'orcish-fury',
    name: 'Fúria Órquica',
    englishName: 'Orcish Fury',
    description: '+1 For/Con, adiciona dado de dano extra em acerto (1x/descanso), reage com ataque ao ativar Resistência Implacável.',
    requirement: 'Raça Meio-Orc',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'prodigy',
    name: 'Prodígio',
    englishName: 'Prodigy',
    description: 'Ganha 1 perícia, 1 ferramenta, 1 idioma e 1 Especialização (Expertise).',
    requirement: 'Humano, Meio-Elfo ou Meio-Orc',
    category: 'General',
    minLevel: 1
  },
  {
    id: 'second-chance',
    name: 'Segunda Chance',
    englishName: 'Second Chance',
    description: '+1 Con/Car/Des, reação força inimigo que te acertou a rerolar o ataque.',
    requirement: 'Raça Halfling',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'squat-nimbleness',
    name: 'Agilidade dos Pequeninos',
    englishName: 'Squat Nimbleness',
    description: '+1 For/Des, +5 pés de movimento, ganha perícia Acrobacia/Atletismo e vantagem para escapar de agarrões.',
    requirement: 'Raça Anão ou Pequena',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'wood-elf-magic',
    name: 'Magia dos Elfos da Floresta',
    englishName: 'Wood Elf Magic',
    description: 'Aprende 1 truque de Druida, Passos Longos e Passos sem Pegadas (1x grátis cada).',
    requirement: 'Raça Elfo (Floresta)',
    category: 'General',
    minLevel: 1
  }
];
