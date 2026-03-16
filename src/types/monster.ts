export interface MonsterListResponse {
  count: number;
  results: MonsterSummary[];
}

export interface MonsterSummary {
  index: string;
  name: string;
  url: string;
}

export interface Monster {
  index: string;
  name: string;
  size: string;
  type: string;
  subtype: string | null;
  alignment: string;
  armor_class: ArmorClass[];
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  speed: Speed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: Proficiency[];
  damage_vulnerabilities: string[];
  damage_resistances: string[];
  damage_immunities: string[];
  condition_immunities: { index: string; name: string; url: string }[];
  senses: Senses;
  languages: string;
  challenge_rating: number;
  proficiency_bonus: number;
  xp: number;
  special_abilities?: Ability[];
  actions?: Action[];
  legendary_actions?: Action[];
  reactions?: Action[];
  image?: string;
  url: string;
}

export interface ArmorClass {
  type: string;
  value: number;
}

export interface Speed {
  walk?: string;
  swim?: string;
  fly?: string;
  climb?: string;
  burrow?: string;
}

export interface Proficiency {
  value: number;
  proficiency: {
    index: string;
    name: string;
    url: string;
  };
}

export interface Senses {
  darkvision?: string;
  passive_perception: number;
  blindsight?: string;
  truesight?: string;
  tremorsense?: string;
}

export interface Ability {
  name: string;
  desc: string;
  spellcasting?: MonsterSpellcasting;
}

export interface Action {
  name: string;
  desc: string;
  attack_bonus?: number;
  damage?: Damage[];
}

export interface Damage {
  damage_type: {
    index: string;
    name: string;
    url: string;
  };
  damage_dice: string;
}

export interface MonsterSpellcasting {
  level: number;
  ability: {
    index: string;
    name: string;
    url: string;
  };
  dc: number;
  modifier: number;
  components_required: string[];
  school: string;
  slots: { [key: string]: number };
  spells: { name: string; level: number; url: string }[];
}
