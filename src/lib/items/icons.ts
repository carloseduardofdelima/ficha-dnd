import iconsMapData from './icons-map.json';
import weapons from './weapons.json';
import armor from './armor.json';
import tools from './tools.json';
import wondrousItems from './wondrous-items.json';
import poisons from './poisons.json';
import adventuringGear from './adventuring-gear.json';
import potionsOils from './potions-oils.json';
import other from './other.json';

const iconsMap = iconsMapData as { branch: string; icons: Record<string, string> };

// Merge all items to create a quick lookup map of item name -> icon path
const allItems = [
  ...weapons,
  ...armor,
  ...tools,
  ...wondrousItems,
  ...poisons,
  ...adventuringGear,
  ...potionsOils,
  ...other
];

const itemToIconMap: Record<string, string> = {};
allItems.forEach((item: any) => {
  if (item.name && item.icon) {
    itemToIconMap[item.name.toLowerCase()] = item.icon;
  }
});

/**
 * Returns the CDN URL of the item icon.
 * Supports passing either the item object directly or the item name (string).
 */
export function getItemIconUrl(itemOrName: any, category?: string): string | null {
  let iconPath: string | null = null;

  if (itemOrName && typeof itemOrName === 'object') {
    iconPath = itemOrName.icon || null;
    if (!iconPath && itemOrName.name) {
      iconPath = itemToIconMap[itemOrName.name.toLowerCase()] || null;
    }
  } else if (typeof itemOrName === 'string') {
    iconPath = itemToIconMap[itemOrName.toLowerCase()] || null;
  }

  // Fallback category logic if no specific icon path was found
  if (!iconPath) {
    const cat = category || (itemOrName && typeof itemOrName === 'object' ? itemOrName.category || itemOrName.type : "");
    const normCategory = cat?.toLowerCase() || "";
    let fallbackTerm = "";
    
    if (normCategory.includes("wondrous") || normCategory.includes("maravilhoso")) {
      fallbackTerm = "generic treasure";
    } else if (normCategory.includes("potion") || normCategory.includes("oil") || normCategory.includes("pocao") || normCategory.includes("oleo")) {
      fallbackTerm = "vial";
    } else if (normCategory.includes("poison") || normCategory.includes("veneno")) {
      fallbackTerm = "poison";
    } else if (normCategory.includes("armor") || normCategory.includes("armadura")) {
      fallbackTerm = "shield (kite)";
    } else if (normCategory.includes("weapon") || normCategory.includes("arma")) {
      fallbackTerm = "longsword";
    } else if (normCategory.includes("tool") || normCategory.includes("ferramenta")) {
      fallbackTerm = "smith tools";
    }

    if (fallbackTerm) {
      const keys = Object.keys(iconsMap.icons);
      const matchedKey = keys.find(k => k.includes(fallbackTerm) || fallbackTerm.includes(k));
      if (matchedKey) {
        iconPath = iconsMap.icons[matchedKey];
      }
    }
  }

  if (iconPath) {
    return `https://cdn.jsdelivr.net/gh/Gwillewyn/dnd-item-icons-by-gwill@${iconsMap.branch}/${iconPath}`;
  }

  return null;
}

/**
 * Removes unnecessary single newlines (line wraps) but preserves double newlines (paragraphs).
 */
export function cleanDescription(text: string | undefined): string {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n') // Normalize CRLF to LF
    .replace(/\n\n+/g, '__PARAGRAPH__') // Preserve actual paragraph breaks
    .replace(/\n/g, ' ') // Replace single line breaks with spaces
    .replace(/ +/g, ' ') // Merge multiple spaces
    .replace(/__PARAGRAPH__/g, '\n\n') // Restore paragraph breaks
    .trim();
}

