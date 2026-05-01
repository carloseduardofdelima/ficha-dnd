export interface MulticlassSpellSlots {
  level: number;
  slots: number[]; // Index 0 is 1st level, Index 8 is 9th level
}

export const MULTICLASS_SPELL_SLOTS_2014: MulticlassSpellSlots[] = [
  { level: 1, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 2, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 3, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
  { level: 4, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
  { level: 5, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
  { level: 6, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
  { level: 7, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
  { level: 8, slots: [4, 3, 3, 2, 0, 0, 0, 0, 0] },
  { level: 9, slots: [4, 3, 3, 3, 1, 0, 0, 0, 0] },
  { level: 10, slots: [4, 3, 3, 3, 2, 0, 0, 0, 0] },
  { level: 11, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
  { level: 12, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
  { level: 13, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
  { level: 14, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
  { level: 15, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
  { level: 16, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
  { level: 17, slots: [4, 3, 3, 3, 2, 1, 1, 1, 1] },
  { level: 18, slots: [4, 3, 3, 3, 3, 1, 1, 1, 1] },
  { level: 19, slots: [4, 3, 3, 3, 3, 2, 1, 1, 1] },
  { level: 20, slots: [4, 3, 3, 3, 3, 2, 2, 1, 1] },
];

/**
 * Rules for Multiclassing Spellcaster Level (PHB 2014):
 * - Add all levels in Bard, Cleric, Druid, Sorcerer, and Wizard.
 * - Add half your levels (rounded down) in Paladin and Ranger.
 * - Add a third of your levels (rounded down) in Fighter (Eldritch Knight) or Rogue (Arcane Trickster).
 */
export function calculateMulticlassSpellcasterLevel(classes: { name: string, level: number, subclass?: string }[]): number {
  let totalLevel = 0;

  for (const cls of classes) {
    const name = cls.name.toLowerCase();
    const subclass = cls.subclass?.toLowerCase() || '';

    // Full Casters
    if (['bardo', 'clérigo', 'druida', 'feiticeiro', 'mago'].includes(name)) {
      totalLevel += cls.level;
    }
    // Half Casters
    else if (['paladino', 'patrulheiro'].includes(name)) {
      totalLevel += Math.floor(cls.level / 2);
    }
    // Third Casters
    else if (
      (name === 'guerreiro' && subclass === 'cavaleiro arcano') ||
      (name === 'ladino' && subclass === 'trapaceiro arcano')
    ) {
      totalLevel += Math.floor(cls.level / 3);
    }
    // Artificer is unique (half caster rounded UP), but usually treated separately in some contexts.
    // In 2014 PHB it wasn't there, but in Tasha's it's level/2 rounded UP.
    else if (name === 'artífice') {
      totalLevel += Math.ceil(cls.level / 2);
    }
  }

  return Math.max(1, totalLevel);
}
