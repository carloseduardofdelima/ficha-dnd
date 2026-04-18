import { InventoryEntry } from './inventory'

export interface Attrs {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

/**
 * Calculates Armor Class (CA) based on class, attributes, and inventory.
 * Following the rules provided:
 * - Light Armor: Base + Dex
 * - Medium Armor: Base + Dex (max 2)
 * - Heavy Armor: Base (Dex doesn't count)
 * - Shield: +2
 * - Unarmored Defense (Barbarian): 10 + Dex + Con
 * - Unarmored Defense (Monk): 10 + Dex + Wis
 * - Otherwise: 10 + Dex
 */
export function calculateAC(
  className: string,
  attrs: Attrs,
  inventory: InventoryEntry[]
): number {
  const dexMod = Math.floor((attrs.dexterity - 10) / 2)
  const conMod = Math.floor((attrs.constitution - 10) / 2)
  const wisMod = Math.floor((attrs.wisdom - 10) / 2)

  const armors = inventory.filter(e => e.item.category === 'armor' && e.item.armorType !== 'shield' && e.isEquipped)
  const shield = inventory.find(e => e.item.category === 'armor' && e.item.armorType === 'shield' && e.isEquipped)
  const shieldBonus = shield ? (shield.item.ac || 2) : 0

  // 1. Base Unarmored
  let maxAC = 10 + dexMod + shieldBonus

  // 2. Unarmored Defense (Class specific)
  if (className === 'Bárbaro') {
    // Barbarian UD works with shields
    maxAC = Math.max(maxAC, 10 + dexMod + conMod + shieldBonus)
  } else if (className === 'Monge') {
    // Monk UD ONLY works if NOT using armor AND NOT using shield
    if (armors.length === 0 && !shield) {
      maxAC = Math.max(maxAC, 10 + dexMod + wisMod)
    }
  }

  // 3. Armor calculations
  for (const entry of armors) {
    const armor = entry.item
    const acBase = armor.ac || 10
    let currentArmorAC = 0
    if (armor.armorType === 'light') {
      currentArmorAC = acBase + dexMod
    } else if (armor.armorType === 'medium') {
      const dMax = armor.dexMax ?? 2
      currentArmorAC = acBase + Math.min(dexMod, dMax)
    } else if (armor.armorType === 'heavy') {
      currentArmorAC = acBase
    }
    maxAC = Math.max(maxAC, currentArmorAC + shieldBonus)
  }

  return maxAC
}
