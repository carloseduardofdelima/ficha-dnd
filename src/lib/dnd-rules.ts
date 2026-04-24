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
/**
 * Calculates effective attributes based on base stats and equipped items.
 */
export function calculateEffectiveStats(
  baseAttrs: Attrs,
  inventory: InventoryEntry[]
): Attrs {
  const effective = { ...baseAttrs }
  const equippedItems = inventory.filter(e => e.isEquipped)

  // 1. Apply bonuses (additive)
  for (const entry of equippedItems) {
    if (entry.item.effects) {
      for (const effect of entry.item.effects) {
        if (effect.type === 'stat_bonus' && effect.target !== 'ac') {
          effective[effect.target] += effect.value
        }
      }
    }
  }

  // 2. Apply overrides (take max of current or override)
  for (const entry of equippedItems) {
    if (entry.item.effects) {
      for (const effect of entry.item.effects) {
        if (effect.type === 'stat_override' && effect.target !== 'ac') {
          effective[effect.target] = Math.max(effective[effect.target], effect.value)
        }
      }
    }
  }

  return effective
}

/**
 * Calculates Armor Class (CA) based on class, attributes, and inventory.
 */
export function calculateAC(
  className: string,
  baseAttrs: Attrs,
  inventory: InventoryEntry[]
): number {
  const attrs = calculateEffectiveStats(baseAttrs, inventory)
  const dexMod = Math.floor((attrs.dexterity - 10) / 2)
  const conMod = Math.floor((attrs.constitution - 10) / 2)
  const wisMod = Math.floor((attrs.wisdom - 10) / 2)

  const armors = inventory.filter(e => e.item.category === 'armor' && e.item.armorType !== 'shield' && e.isEquipped)
  const shield = inventory.find(e => e.item.category === 'armor' && e.item.armorType === 'shield' && e.isEquipped)
  const shieldBonus = shield ? (shield.item.ac || 2) : 0

  // Item AC bonuses (like Ring of Protection)
  let itemACBonus = 0
  const equippedItems = inventory.filter(e => e.isEquipped)
  for (const entry of equippedItems) {
    if (entry.item.effects) {
      for (const effect of entry.item.effects) {
        if (effect.type === 'ac_bonus') {
          itemACBonus += effect.value
        }
      }
    }
  }

  // 1. Base Unarmored
  let maxAC = 10 + dexMod + shieldBonus + itemACBonus

  // 2. Unarmored Defense (Class specific)
  if (className === 'Bárbaro') {
    maxAC = Math.max(maxAC, 10 + dexMod + conMod + shieldBonus + itemACBonus)
  } else if (className === 'Monge') {
    if (armors.length === 0 && !shield) {
      maxAC = Math.max(maxAC, 10 + dexMod + wisMod + itemACBonus)
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
    maxAC = Math.max(maxAC, currentArmorAC + shieldBonus + itemACBonus)
  }

  return maxAC
}
