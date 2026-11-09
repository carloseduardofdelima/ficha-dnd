import { InventoryEntry } from './inventory'
import { FEATS_2014 } from './feats-2014'

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
 * Calculates effective attributes based on base stats, equipped items, and feats.
 */
export function calculateEffectiveStats(
  baseAttrs: Attrs,
  inventory: InventoryEntry[],
  feats?: any[]
): Attrs {
  const effective = { ...baseAttrs }

  // 1. Apply feat attribute bonuses
  if (feats && Array.isArray(feats)) {
    for (const feat of feats) {
      if (!feat) continue

      // Single chosen attribute (+1)
      if (feat.chosenAttribute && effective[feat.chosenAttribute as keyof Attrs] !== undefined) {
        const k = feat.chosenAttribute as keyof Attrs
        const current = effective[k]
        effective[k] = current >= 20 ? current : Math.min(20, current + 1)
      }

      // Multiple chosen attributes (e.g. ASI: ['strength', 'strength'] for +2, or ['strength', 'dexterity'] for +1/+1)
      if (feat.chosenAttributes && Array.isArray(feat.chosenAttributes)) {
        for (const attr of feat.chosenAttributes) {
          if (effective[attr as keyof Attrs] !== undefined) {
            const k = attr as keyof Attrs
            const current = effective[k]
            effective[k] = current >= 20 ? current : Math.min(20, current + 1)
          }
        }
      }

      // Fixed attribute bonus (e.g. Ator +1 Carisma, Resistente +1 Constituição) if not already customized
      if (!feat.chosenAttribute && !feat.chosenAttributes) {
        const featDef = FEATS_2014.find(f => f.name.toLowerCase() === feat.name?.toLowerCase())
        if (featDef?.attributeBonus && !featDef.attributeBonus.choice) {
          for (const [key, val] of Object.entries(featDef.attributeBonus)) {
            if (typeof val === 'number' && effective[key as keyof Attrs] !== undefined) {
              const k = key as keyof Attrs
              const current = effective[k]
              effective[k] = current >= 20 ? current : Math.min(20, current + val)
            }
          }
        }
      }
    }
  }

  const equippedItems = inventory.filter(e => e.isEquipped)

  // 2. Apply bonuses (additive)
  for (const entry of equippedItems) {
    if (entry.item.effects) {
      for (const effect of entry.item.effects) {
        if (effect.type === 'stat_bonus' && effect.target !== 'ac') {
          effective[effect.target] += effect.value
        }
      }
    }
  }

  // 3. Apply overrides (take max of current or override)
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
  inventory: InventoryEntry[],
  traits: any = {}
): number {
  const attrs = calculateEffectiveStats(baseAttrs, inventory, traits?.feats)
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

  // Artificer Infusions bonuses
  let infusionACBonus = 0
  if (traits?.selectedInfusions) {
    if (traits.selectedInfusions.includes('defesa_aprimorada')) {
      const level = traits.level || 2
      infusionACBonus += level >= 10 ? 2 : 1
    }
    if (traits.selectedInfusions.includes('escudo_repulsao')) {
      infusionACBonus += 1
    }
  }

  // Fighting Style: Defense (+1 AC while wearing armor)
  let defenseFightingStyleBonus = 0
  const hasDefenseStyle = 
    traits?.fightingStyle === 'Defesa' || 
    traits?.selectedFightingStyle === 'Defesa' ||
    traits?.feats?.some((f: any) => f?.name?.toLowerCase().includes('estilo de luta: defesa') || f?.name?.toLowerCase() === 'defesa')

  // 1. Base Unarmored
  let unarmoredBase = 10;
  
  // Draconic Resilience (Sorcerer)
  const isDraconic = traits?.['sorcerous-origin-2014'] === 'orig-draconic' || traits?.['sorcerous-origin'] === 'draconic';
  if (isDraconic) {
    unarmoredBase = 13;
  }

  let maxAC = unarmoredBase + dexMod + shieldBonus + itemACBonus + infusionACBonus

  // 2. Unarmored Defense (Class specific - only applies when wearing NO armor)
  if (className === 'Bárbaro') {
    if (armors.length === 0) {
      maxAC = Math.max(maxAC, 10 + dexMod + conMod + shieldBonus + itemACBonus + infusionACBonus)
    }
  } else if (className === 'Monge') {
    if (armors.length === 0 && !shield) {
      maxAC = Math.max(maxAC, 10 + dexMod + wisMod + itemACBonus + infusionACBonus)
    }
  }

  // 3. Armor calculations
  if (armors.length > 0 && hasDefenseStyle) {
    defenseFightingStyleBonus = 1
  }

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
    maxAC = Math.max(maxAC, currentArmorAC + shieldBonus + itemACBonus + infusionACBonus + defenseFightingStyleBonus)
  }

  return maxAC
}
