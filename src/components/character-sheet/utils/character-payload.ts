import { Character } from '@/types/character'

export function getCharacterPayloadString(char: Character): string {
  try {
    const payload = {
      name: char.name,
      race: char.race,
      subrace: char.subrace,
      class: char.class,
      subclass: char.subclass,
      level: char.level,
      background: char.background,
      avatarUrl: char.avatarUrl,
      playerName: char.playerName,
      strength: char.strength,
      dexterity: char.dexterity,
      constitution: char.constitution,
      intelligence: char.intelligence,
      wisdom: char.wisdom,
      charisma: char.charisma,
      maxHp: char.maxHp,
      currentHp: char.currentHp,
      armorClass: char.armorClass,
      speed: char.speed,
      initiative: char.initiative,
      proficiencyBonus: char.proficiencyBonus,
      ruleset: char.ruleset,
      isPublic: char.isPublic,
      notes: char.notes,
      spellSlots: typeof char.spellSlots === 'object' ? JSON.stringify(char.spellSlots) : char.spellSlots,
      resources: typeof char.resources === 'object' ? JSON.stringify(char.resources) : char.resources,
      exp: char.exp,
      skills: typeof char.skills === 'object' ? JSON.stringify(char.skills) : char.skills,
      inventory: typeof char.inventory === 'object' ? JSON.stringify(char.inventory) : char.inventory,
      spells: typeof char.spells === 'object' ? JSON.stringify(char.spells) : char.spells,
      traits: typeof char.traits === 'object' ? JSON.stringify(char.traits) : char.traits,
      appearance: char.appearance,
      backstory: char.backstory,
      personalityTraits: char.personalityTraits,
      ideals: char.ideals,
      bonds: char.bonds,
      flaws: char.flaws,
      defenses: typeof (char as any).defenses === 'object' ? JSON.stringify((char as any).defenses) : (char as any).defenses,
      companions: typeof char.companions === 'object' ? JSON.stringify(char.companions) : char.companions,
      inspiration: char.inspiration
    }
    return JSON.stringify(payload)
  } catch (_e) {
    return ""
  }
}
