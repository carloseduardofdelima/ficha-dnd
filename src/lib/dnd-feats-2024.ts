export interface Feat {
  id: string;
  name: string;
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
    name: 'Ability Score Improvement',
    description: '+2 em um atributo ou +1 em dois.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'actor',
    name: 'Actor',
    description: '+1 Car, vantagem para imitar outros.',
    requirement: 'Carisma 13+',
    benefit: { attributes: { charisma: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'athlete',
    name: 'Athlete',
    description: '+1 For/Des, escalada rápida e levanta do chão fácil.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'charger',
    name: 'Charger',
    description: '+1 For/Des, +1d8 dano ou empurrão após correr.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'chef',
    name: 'Chef',
    description: '+1 Cons/Sab, cria guloseimas que curam.',
    requirement: 'Constituição ou Sabedoria 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'crossbow-expert',
    name: 'Crossbow Expert',
    description: '+1 Des, ignora recarga e tiro corpo-a-corpo.',
    requirement: 'Destreza 13+',
    benefit: { attributes: { dexterity: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'crusher',
    name: 'Crusher',
    description: '+1 For/Cons, empurra com concussão e melhora crítico.',
    requirement: 'Força ou Constituição 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'defensive-duelist',
    name: 'Defensive Duelist',
    description: '+1 Des, reação para CA com arma de acuidade.',
    requirement: 'Destreza 13+',
    benefit: { attributes: { dexterity: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'dual-wielder',
    name: 'Dual Wielder',
    description: '+1 For/Des, usa duas armas (uma não-leve).',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'durable',
    name: 'Durable',
    description: '+1 Cons, vantagem em salvaguardas de morte e cura rápida.',
    requirement: 'Constituição 13+',
    benefit: { attributes: { constitution: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'elemental-adept',
    name: 'Elemental Adept',
    description: '+1 Int/Sab/Car, ignora resistência elemental.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'fey-touched',
    name: 'Fey Touched',
    description: '+1 Int/Sab/Car, Passo Nebuloso e magia de 1º nível.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'grappler',
    name: 'Grappler',
    description: '+1 For/Des, vantagem contra alvos agarrados.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'great-weapon-master',
    name: 'Great Weapon Master',
    description: '+1 For, ataque bônus e dano extra pesado.',
    requirement: 'Força 13+',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'heavily-armored',
    name: 'Heavily Armored',
    description: '+1 For, proficiência com armaduras pesadas.',
    requirement: 'Prof. Armadura Média',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'heavy-armor-master',
    name: 'Heavy Armor Master',
    description: '+1 For, reduz dano físico sofrido.',
    requirement: 'Prof. Armadura Pesada',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'inspiring-leader',
    name: 'Inspiring Leader',
    description: '+1 Sab/Car, dá PV temporários aos aliados.',
    requirement: 'Sabedoria ou Carisma 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'keen-mind',
    name: 'Keen Mind',
    description: '+1 Int, perícia de Int e ação bônus para Estudo.',
    requirement: 'Inteligência 13+',
    benefit: { attributes: { intelligence: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'lightly-armored',
    name: 'Lightly Armored',
    description: '+1 For/Des, proficiência com leves e escudos.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'mage-slayer',
    name: 'Mage Slayer',
    description: '+1 For/Des, prejudica concentração e resiste a magia.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'martial-weapon-training',
    name: 'Martial Weapon Training',
    description: '+1 For/Des, proficiência com armas marciais.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'medium-armor-master',
    name: 'Medium Armor Master',
    description: '+1 For/Des, melhora CA e furtividade média.',
    requirement: 'Prof. Armadura Média',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'moderately-armored',
    name: 'Moderately Armored',
    description: '+1 For/Des, proficiência com médias e escudos.',
    requirement: 'Prof. Armadura Leve',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'mounted-combatant',
    name: 'Mounted Combatant',
    description: '+1 For/Des, vantagem montado e protege montaria.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'observant',
    name: 'Observant',
    description: '+1 Int/Sab, bônus passivo e ação bônus para Busca.',
    requirement: 'Inteligência ou Sabedoria 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'piercer',
    name: 'Piercer',
    description: '+1 For/Des, rerola perfuração e dado extra no crítico.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'poisoner',
    name: 'Poisoner',
    description: '+1 Des/Int, ignora resistência a veneno e aplica bônus.',
    requirement: 'Destreza ou Inteligência 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'polearm-master',
    name: 'Polearm Master',
    description: '+1 For, ataque bônus e de oportunidade longo.',
    requirement: 'Força ou Destreza 13+',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'resilient',
    name: 'Resilient',
    description: '+1 em um atributo e proficiência na salvaguarda.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'ritual-caster',
    name: 'Ritual Caster',
    description: '+1 Int/Sab/Car, conjura rituais de qualquer lista.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
    description: '+1 For/Des, trava inimigo e ataca quem agride aliados.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'shadow-touched',
    name: 'Shadow Touched',
    description: '+1 Int/Sab/Car, Invisibilidade e magia de 1º nível.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'sharpshooter',
    name: 'Sharpshooter',
    description: '+1 Des, ignora cobertura e distância longa.',
    requirement: 'Destreza 13+',
    benefit: { attributes: { dexterity: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'shield-master',
    name: 'Shield Master',
    description: '+1 For, derruba com escudo e mitiga dano de área.',
    requirement: 'Prof. Escudos',
    benefit: { attributes: { strength: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'skill-expert',
    name: 'Skill Expert',
    description: '+1 em atributo, 1 proficiência e 1 Expertise.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'skulker',
    name: 'Skulker',
    description: '+1 Des, esconde em luz leve e erra tiro sem revelar.',
    requirement: 'Destreza 13+',
    benefit: { attributes: { dexterity: 1 } },
    category: 'General',
    minLevel: 4
  },
  {
    id: 'slasher',
    name: 'Slasher',
    description: '+1 For/Des, reduz deslocamento e desvantagem no crítico.',
    requirement: 'Força ou Destreza 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'speedy',
    name: 'Speedy',
    description: '+1 Des/Cons, +10 pés de movimento e ignora terreno.',
    requirement: 'Destreza ou Constituição 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'spell-sniper',
    name: 'Spell Sniper',
    description: '+1 Int/Sab/Car, ignora cobertura e tiro corpo-a-corpo.',
    requirement: 'Característica Conjuração',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'telekinetic',
    name: 'Telekinetic',
    description: '+1 Int/Sab/Car, Mãos Mágicas e empurrão mental.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'telepathic',
    name: 'Telepathic',
    description: '+1 Int/Sab/Car, fala telepática e lê pensamentos.',
    requirement: 'Atributo Mental 13+',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'war-caster',
    name: 'War Caster',
    description: '+1 Int/Sab/Car, vantagem concentração e magia como reação.',
    requirement: 'Característica Conjuração',
    category: 'General',
    minLevel: 4
  },
  {
    id: 'weapon-master',
    name: 'Weapon Master',
    description: '+1 For/Des, ganha Weapon Mastery em armas.',
    requirement: 'Nível 4+',
    category: 'General',
    minLevel: 4
  },

  // TALENTOS DE ESTILO DE LUTA
  {
    id: 'archery',
    name: 'Archery',
    description: '+2 em ataques à distância.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'blind-fighting',
    name: 'Blind Fighting',
    description: 'Visão às cegas 10 pés.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'defense',
    name: 'Defense',
    description: '+1 na CA com armadura.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'dueling',
    name: 'Dueling',
    description: '+2 no dano com uma arma de uma mão.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'great-weapon-fighting',
    name: 'Great Weapon Fighting',
    description: 'Rerola 1 ou 2 em armas de duas mãos.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'interception',
    name: 'Interception',
    description: 'Reação para reduzir dano em aliado.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'protection',
    name: 'Protection',
    description: 'Desvantagem em ataque contra aliado (usa escudo).',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'thrown-weapon-fighting',
    name: 'Thrown Weapon Fighting',
    description: 'Saca/ataca e +2 no dano arremesso.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'two-weapon-fighting',
    name: 'Two-Weapon Fighting',
    description: 'Modificador no dano do segundo ataque.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },
  {
    id: 'unarmed-fighting',
    name: 'Unarmed Fighting',
    description: 'Dano desarmado 1d6/1d8.',
    requirement: 'Característica Estilo de Luta',
    category: 'Fighting Style',
    minLevel: 1
  },

  // BÊNÇÃOS ÉPICAS (NÍVEL 19+)
  {
    id: 'boon-combat-prowess',
    name: 'Boon of Combat Prowess',
    description: 'Transforma erro em acerto (1/turno).',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-dimensional-travel',
    name: 'Boon of Dimensional Travel',
    description: 'Teleporte 30 pés após ação.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-energy-resistance',
    name: 'Boon of Energy Resistance',
    description: 'Resistência a 2 tipos de dano.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-fate',
    name: 'Boon of Fate',
    description: 'Soma/subtrai 2d4 de teste alheio.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-fortitude',
    name: 'Boon of Fortitude',
    description: '+40 PV e melhora curas.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-irresistible-offense',
    name: 'Boon of Irresistible Offense',
    description: 'Ignora resistências a dano.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-luck',
    name: 'Boon of Luck',
    description: '+1d10 em teste ou salvaguarda.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-night-spirit',
    name: 'Boon of Night Spirit',
    description: 'Invisível na penumbra/escuridão.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-recovery',
    name: 'Boon of Recovery',
    description: 'Recupera 50% PV ao cair a 0.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-skill',
    name: 'Boon of Skill',
    description: 'Proficiência em todas as perícias.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-spell-recall',
    name: 'Boon of Spell Recall',
    description: 'Chance de não gastar espaço de magia 1-4.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  },
  {
    id: 'boon-truesight',
    name: 'Boon of Truesight',
    description: 'Visão Verdadeira 60 pés.',
    requirement: 'Nível 19',
    category: 'Epic Boon',
    minLevel: 19
  }
];
