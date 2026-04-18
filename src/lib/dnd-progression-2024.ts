export interface ClassProgression {
  hitDie: number;
  features: Record<number, string[]>;
}

export const CLASS_PROGRESSION_2024: Record<string, ClassProgression> = {
  'Bárbaro': {
    hitDie: 12,
    features: {
      1: ['Rage (2x, +2 dano)', 'Unarmored Defense', 'Weapon Mastery (2 armas)'],
      2: ['Reckless Attack', 'Danger Sense'],
      3: ['Subclasse Bárbaro [SC]', 'Primal Knowledge (perícia extra)'],
      4: ['Melhoria de Atributo ou Talento [ASI]'],
      5: ['Extra Attack', 'Fast Movement (+10 pés)'],
      6: ['Feature de Subclasse [SC]', 'Rage (4x, +2 dano)'],
      7: ['Feral Instinct', 'Instinctive Pounce'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      9: ['Brutal Strike (1d10 extra + efeito tático)'],
      10: ['Feature de Subclasse [SC]'],
      11: ['Relentless Rage'],
      12: ['Melhoria de Atributo ou Talento [ASI]', 'Rage (5x, +3 dano)'],
      13: ['Improved Brutal Strike'],
      14: ['Feature de Subclasse [SC]'],
      15: ['Persistent Rage'],
      16: ['Melhoria de Atributo ou Talento [ASI]', 'Rage (6x, +4 dano)'],
      17: ['Improved Brutal Strike II (+2d10 dano)'],
      18: ['Indomitable Might'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Primal Champion (FOR/CON +4, Máx 25)'],
    }
  },
  'Bardo': {
    hitDie: 8,
    features: {
      1: ['Bardic Inspiration (d6)', 'Spellcasting'],
      2: ['Expertise (2 perícias)', 'Jack of All Trades'],
      3: ['Subclasse Bardo [SC]'],
      4: ['Melhoria de Atributo ou Talento [ASI]'],
      5: ['Bardic Inspiration (d8)', 'Font of Inspiration'],
      6: ['Feature de Subclasse [SC]', 'Countercharm'],
      7: ['Expertise (mais 2 perícias)'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      9: ['Magical Secrets (2 magias extras)'],
      10: ['Bardic Inspiration (d10)', 'Feature de Subclasse [SC]'],
      11: ['Reliable Talent'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      13: ['Magical Secrets (mais 2 magias)'],
      14: ['Feature de Subclasse [SC]'],
      15: ['Bardic Inspiration (d12)'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      17: ['Magical Secrets (mais 2 magias)'],
      18: ['Superior Inspiration'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Words of Creation'],
    }
  },
  'Clérigo': {
    hitDie: 8,
    features: {
      1: ['Divine Order', 'Spellcasting', 'Channel Divinity (1x)', 'Holy Order'],
      2: ['Channel Divinity aprimorado'],
      3: ['Subclasse Clérigo [SC]'],
      4: ['Melhoria de Atributo ou Talento [ASI]'],
      5: ['Smite Undead'],
      6: ['Feature de Subclasse [SC]', 'Channel Divinity (2x)'],
      7: ['Blessed Strikes'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      9: ['Destroy Undead (CR 1)'],
      10: ['Divine Intervention'],
      11: ['Destroy Undead (CR 2)'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      13: ['Destroy Undead (CR 3)'],
      14: ['Feature de Subclasse [SC]', 'Improved Blessed Strikes'],
      15: ['Destroy Undead (CR 4)'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      17: ['Destroy Undead (escala)'],
      18: ['Channel Divinity (3x)', 'Feature de Subclasse [SC]'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Greater Divine Intervention (Wish)'],
    }
  },
  'Druida': {
    hitDie: 8,
    features: {
      1: ['Druidic', 'Primal Order', 'Spellcasting', 'Wild Shape (2x)'],
      2: ['Wild Shape aprimorado'],
      3: ['Subclasse Druida [SC]'],
      4: ['Melhoria de Atributo ou Talento [ASI]', 'Wild Shape (CR alto)'],
      5: ['Wild Resurgence'],
      6: ['Feature de Subclasse [SC]', 'Elemental Fury'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      10: ['Feature de Subclasse [SC]'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      14: ['Feature de Subclasse [SC]'],
      15: ['Improved Elemental Fury'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      18: ['Beast Spells', 'Timeless Body'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Archdruid (Wild Shape ilimitado)'],
    }
  },
  'Guerreiro': {
    hitDie: 10,
    features: {
      1: ['Fighting Style', 'Second Wind', 'Weapon Mastery (3 armas)'],
      2: ['Action Surge (1x)'],
      3: ['Subclasse Guerreiro [SC]', 'Tactical Mind'],
      4: ['Melhoria de Atributo ou Talento [ASI]'],
      5: ['Extra Attack'],
      6: ['Melhoria de Atributo ou Talento [ASI]', 'Tactical Shift'],
      7: ['Feature de Subclasse [SC]'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      9: ['Indomitable (1x)'],
      10: ['Feature de Subclasse [SC]', 'Weapon Mastery (4 armas)'],
      11: ['Extra Attack II (3 ataques)'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      13: ['Indomitable (2x)'],
      14: ['Melhoria de Atributo ou Talento [ASI]'],
      15: ['Feature de Subclasse [SC]'],
      16: ['Melhoria de Atributo ou Talento [ASI]', 'Weapon Mastery (5 armas)'],
      17: ['Action Surge (2x)'],
      18: ['Indomitable (3x)'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Extra Attack III (4 ataques)'],
    }
  },
  'Monge': {
    hitDie: 8,
    features: {
      1: ['Martial Arts (d6)', 'Unarmored Defense', 'Weapon Mastery'],
      2: ["Monk's Focus", 'Unarmored Movement (+10p)', 'Uncanny Metabolism'],
      3: ['Subclasse Monge [SC]', 'Deflect Attacks'],
      4: ['Melhoria de Atributo ou Talento [ASI]', 'Slow Fall'],
      5: ['Extra Attack', 'Stunning Strike'],
      6: ['Feature de Subclasse [SC]', 'Empowered Strikes', 'Unarmored Movement (+15p)'],
      7: ['Evasion', 'Stillness of Mind'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      9: ['Acrobatic Movement'],
      10: ['Heightened Focus', 'Self-Restoration', 'Unarmored Movement (+20p)'],
      11: ['Feature de Subclasse [SC]'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      13: ['Deflect Energy'],
      14: ['Disciplined Survivor', 'Unarmored Movement (+25p)'],
      15: ['Perfect Focus', 'Martial Arts (d10)'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      17: ['Feature de Subclasse [SC]', 'Superior Defense'],
      18: ['Body and Mind (FOR/DES +4, Máx 25)'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Epic Monk capstone (d12)'],
    }
  },
  'Paladino': {
    hitDie: 10,
    features: {
      1: ['Lay on Hands', 'Spellcasting', 'Weapon Mastery (2 armas)'],
      2: ['Fighting Style', 'Divine Smite'],
      3: ['Subclasse Paladino [SC]', 'Channel Divinity (2x)', 'Divine Health'],
      4: ['Melhoria de Atributo ou Talento [ASI]'],
      5: ['Extra Attack', 'Faithful Steed (Find Steed)'],
      6: ['Feature de Subclasse [SC]', 'Aura of Protection'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      9: ['Abjure Foes'],
      10: ['Aura of Courage'],
      11: ['Radiant Strikes (+1d8)'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      14: ['Feature de Subclasse [SC]', 'Restoring Touch'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      17: ['Auras (30 pés)'],
      18: ['Feature de Subclasse [SC]'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Sacred Weapon'],
    }
  },
  'Patrulheiro': {
    hitDie: 10,
    features: {
      1: ['Deft Explorer (Expertise)', "Favored Enemy (Hunter's Mark)", 'Spellcasting', 'Weapon Mastery (2 armas)'],
      2: ['Fighting Style'],
      3: ['Subclasse Patrulheiro [SC]', 'Deft Explorer II'],
      4: ['Melhoria de Atributo ou Talento [ASI]'],
      5: ['Extra Attack'],
      6: ['Roving (+10p, nadar/escalar)'],
      7: ['Feature de Subclasse [SC]', 'Expertise (mais 2)'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      9: ['Tireless'],
      10: ['Deft Explorer III'],
      11: ['Relentless Hunter'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      13: ['Precise Hunter'],
      14: ['Feature de Subclasse [SC]'],
      15: ['Feral Senses'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      17: ['Feature de Subclasse [SC]'],
      18: ['Foe Slayer'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Tireless melhora'],
    }
  },
  'Ladino': {
    hitDie: 8,
    features: {
      1: ['Expertise (2)', 'Sneak Attack (1d6)', 'Thieves\' Cant', 'Weapon Mastery'],
      2: ['Cunning Action'],
      3: ['Subclasse Ladino [SC]', 'Cunning Strike', 'Sneak Attack (2d6)'],
      4: ['Melhoria de Atributo ou Talento [ASI]'],
      5: ['Uncanny Dodge', 'Sneak Attack (3d6)'],
      6: ['Expertise (mais 2)'],
      7: ['Feature de Subclasse [SC]', 'Evasion', 'Sneak Attack (4d6)'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      9: ['Cunning Strike II', 'Sneak Attack (5d6)'],
      10: ['Melhoria de Atributo ou Talento [ASI]'],
      11: ['Reliable Talent', 'Sneak Attack (6d6)'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      13: ['Feature de Subclasse [SC]', 'Sneak Attack (7d6)'],
      14: ['Devious Strikes'],
      15: ['Slippery Mind', 'Sneak Attack (8d6)'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      17: ['Feature de Subclasse [SC]', 'Sneak Attack (9d6)'],
      18: ['Elusive'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon', 'Sneak Attack (10d6)'],
      20: ['Stroke of Luck'],
    }
  },
  'Feiticeiro': {
    hitDie: 6,
    features: {
      1: ['Innate Sorcery', 'Spellcasting', 'Sorcerous Restoration'],
      2: ['Font of Magic', 'Metamagic (2)'],
      3: ['Subclasse Feiticeiro [SC]'],
      4: ['Melhoria de Atributo ou Talento [ASI]'],
      5: ['Sorcerous Restoration (Curto)'],
      6: ['Feature de Subclasse [SC]', 'Metamagic (mais 1)'],
      7: ['Sorcery Incarnate'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      10: ['Metamagic (mais 1)'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      14: ['Feature de Subclasse [SC]'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      17: ['Metamagic (mais 1)'],
      18: ['Feature de Subclasse [SC]'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Arcane Apotheosis'],
    }
  },
  'Bruxo': {
    hitDie: 8,
    features: {
      1: ['Eldritch Invocations (1)', 'Pact Magic (1 slot)', 'Spellcasting'],
      2: ['Magical Cunning', 'Eldritch Invocations (2)'],
      3: ['Subclasse Bruxo [SC]', 'Pact Boon'],
      4: ['Melhoria de Atributo ou Talento [ASI]', 'Eldritch Invocations (3)'],
      5: ['Eldritch Invocations (4)'],
      6: ['Feature de Subclasse [SC]', 'Eldritch Invocations (5)'],
      8: ['Melhoria de Atributo ou Talento [ASI]', 'Eldritch Invocations (6)'],
      10: ['Feature de Subclasse [SC]', 'Eldritch Invocations (7)'],
      11: ['Mystic Arcanum (Nível 6)'],
      12: ['Melhoria de Atributo ou Talento [ASI]', 'Eldritch Invocations (8)'],
      13: ['Mystic Arcanum (Nível 7)'],
      14: ['Feature de Subclasse [SC]', 'Eldritch Invocations (9)'],
      15: ['Mystic Arcanum (Nível 8)'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      17: ['Mystic Arcanum (Nível 9)'],
      18: ['Eldritch Invocations (10)'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Eldritch Master'],
    }
  },
  'Mago': {
    hitDie: 6,
    features: {
      1: ['Arcane Recovery', 'Spellcasting (Grimório)'],
      2: ['Scholar (Expertise)'],
      3: ['Subclasse Mago [SC]'],
      4: ['Melhoria de Atributo ou Talento [ASI]', 'Memorize Spell'],
      6: ['Feature de Subclasse [SC]'],
      8: ['Melhoria de Atributo ou Talento [ASI]'],
      10: ['Feature de Subclasse [SC]'],
      12: ['Melhoria de Atributo ou Talento [ASI]'],
      14: ['Feature de Subclasse [SC]'],
      16: ['Melhoria de Atributo ou Talento [ASI]'],
      18: ['Spell Mastery'],
      19: ['Melhoria de Atributo ou Talento [ASI] ou Epic Boon'],
      20: ['Signature Spells'],
    }
  }
};

export const SPECIES_PROGRESSION_2024: Record<string, Record<number, string[]>> = {
  'Aasimar': {
    3: ['Celestial Revelation (Ação Bônus, 1 min, 1x/desc. longo)']
  },
  'Draconato': {
    5: ['Draconic Flight (Asas espectrais, 10 min, 1x/desc. longo)']
  },
  'Goliath': {
    5: ['Large Form (Tornar-se Grande, 10 min, 1x/desc. longo)']
  },
  'Elfo': {
    3: ['Magia de Linhagem (Nível 3)'],
    5: ['Magia de Linhagem (Nível 5)']
  },
  'Tiefling': {
    3: ['Herança Infernal (Nível 3)'],
    5: ['Herança Infernal (Nível 5)']
  }
};

export const getProficiencyBonus = (level: number): number => {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
};
