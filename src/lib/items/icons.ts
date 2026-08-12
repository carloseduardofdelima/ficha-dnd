import iconsMapData from './icons-map.json';
import weapons from './weapons.json';
import armor from './armor.json';
import tools from './tools.json';
import wondrousItems from './wondrous-items.json';
import poisons from './poisons.json';
import adventuringGear from './adventuring-gear.json';
import potionsOils from './potions-oils.json';
import other from './other.json';
import magicPropertiesTable from './magic-properties-table.json';

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
  ...other,
  ...magicPropertiesTable
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
    if (iconPath && !iconPath.endsWith('.svg')) {
      iconPath = null;
    }
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
    return encodeURI(`https://cdn.jsdelivr.net/gh/Gwillewyn/dnd-item-icons-by-gwill@${iconsMap.branch}/${iconPath}`);
  }

  return null;
}

/**
 * Removes unnecessary single newlines (line wraps), preserves double newlines (paragraphs),
 * and polishes D&D 5e terminology and translation artifacts for maximum clarity.
 */
export function cleanDescription(text: string | undefined): string {
  if (!text) return '';
  
  let cleaned = text
    .replace(/\r\n/g, '\n') // Normalize CRLF to LF
    .replace(/\n\n+/g, '__PARAGRAPH__') // Preserve paragraph breaks
    .replace(/\n/g, ' ') // Replace single line breaks with spaces
    .replace(/ +/g, ' ') // Merge multiple spaces
    .replace(/__PARAGRAPH__/g, '\n\n')

  // Clean redundant lead-in headers if present inside description text
  cleaned = cleaned.replace(/^(requer sintonia[^\n.]*\.\s*)+/gi, '');

  // Fix literal translation artifacts for checks and skills
  cleaned = cleaned
    .replace(/\bInteligência CD (\d+) verifique\b/gi, 'um teste de Inteligência (Arcanismo) CD $1')
    .replace(/\bInteligência \(Arcano\) teste contestado\b/gi, 'um teste de Inteligência (Arcanismo) oposto')
    .replace(/\bInteligência \(Arcano\) verifique\b/gi, 'um teste de Inteligência (Arcanismo)')
    .replace(/\bInteligência \(Arcano\)\b/gi, 'Inteligência (Arcanismo)')
    .replace(/\bteste de Inteligência \(Arcano\)\b/gi, 'teste de Inteligência (Arcanismo)')
    .replace(/\b([a-zA-Záéíóúâêôãõç]+) verifique\b/gi, 'teste de $1')
    .replace(/\b no verifique\b/gi, ' no teste')
    .replace(/\b do verifique\b/gi, ' do teste')
    .replace(/\b o verifique\b/gi, ' o teste')
    .replace(/\bverifique\b/gi, 'teste')

  // Fix literal damage type translations (e.g. "4d10 força dano" -> "4d10 de dano de força")
  cleaned = cleaned
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+força\s+dano/gi, '$1 de dano de força')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+fogo\s+dano/gi, '$1 de dano de fogo')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+frio\s+dano/gi, '$1 de dano de frio')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+gelo\s+dano/gi, '$1 de dano de gelo')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+elétrico\s+dano/gi, '$1 de dano elétrico')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+veneno\s+dano/gi, '$1 de dano de veneno')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+radiante\s+dano/gi, '$1 de dano radiante')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+necrótico\s+dano/gi, '$1 de dano necrótico')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+trovão\s+dano/gi, '$1 de dano de trovão')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+ácido\s+dano/gi, '$1 de dano de ácido')
    .replace(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+psíquico\s+dano/gi, '$1 de dano psíquico')

  // Fix common spell and item name translations
  cleaned = cleaned
    .replace(/\bdeslocamento planar magia\b/gi, 'magia Deslocamento Planar')
    .replace(/\bmagia portão\b/gi, 'magia Portão')
    .replace(/\bburaco portátil\b/gi, 'Buraco Portátil')
    .replace(/\besfera de aniquilação\b/gi, 'Esfera de Aniquilação')
    .replace(/\bportão mágica\b/gi, 'magia Portão')

  // Clean trailing artifacts or bad punctuation
  cleaned = cleaned
    .replace(/\( \)/g, '')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/ +/g, ' ')
    .trim();

  return cleaned;
}

