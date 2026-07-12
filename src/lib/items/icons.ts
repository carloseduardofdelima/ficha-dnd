import iconsMapData from './icons-map.json';

const iconsMap = iconsMapData as { branch: string; icons: Record<string, string> };

// Portuguese to English translation helper for common RPG item roots
const PT_TO_EN: Record<string, string> = {
  // Armas (Weapons)
  "machado de batalha": "battleaxe",
  "machado de arremesso": "handaxe",
  "machadinha": "handaxe",
  "adaga": "dagger",
  "espada curta": "shortsword",
  "espada longa": "longsword",
  "espada grande": "greatsword",
  "rapieira": "rapier",
  "cimitarra": "scimitar",
  "arco curto": "shortbow",
  "arco longo": "longbow",
  "besta leve": "light crossbow",
  "besta pesada": "heavy crossbow",
  "besta de mao": "hand crossbow",
  "tridente": "trident",
  "alabarda": "halberd",
  "glaive": "glaive",
  "martelo de guerra": "warhammer",
  "maca": "mace",
  "clava": "club",
  "foice": "sickle",
  "lanca": "spear",
  "chicote": "whip",
  "zarabatana": "blowgun",
  "dardo": "dart",
  "funda": "sling",
  "estilingue": "sling",
  "malho": "maul",
  "pique": "pike",
  "cajado": "staff",
  "rede": "net",
  "flecha": "arrow",
  "flechas": "arrow",
  "virote": "bolt",
  "virotes": "bolt",
  
  // Armaduras (Armor)
  "couro batido": "studded leather",
  "armadura de couro": "leather armor",
  "gibao de peles": "hide armor",
  "cota de malha": "chain mail",
  "loriga de segmentos": "scale mail",
  "peitoral": "breastplate",
  "meia armadura": "half plate",
  "armadura de placas": "plate armor",
  "acolchoada": "padded",
  "cota de aneis": "ring mail",
  "brigue": "splint",
  "escudo": "shield",

  // Equipamentos (Gear)
  "mochila": "backpack",
  "corda": "rope",
  "tocha": "torch",
  "lanterna": "lantern",
  "racao": "rations",
  "saco de dormir": "bedroll",
  "cobertor": "blanket",
  "cantil": "waterskin",
  "algemas": "manacles",
  "pederneira": "tinderbox",
  "pe de cabra": "crowbar",
  "pa": "shovel",
  "martelo": "hammer",
  "espelho": "mirror",
  "oleo": "oil",
  "giz": "chalk",
  "fechadura": "lock",
  "chave": "key",
  "sino": "bell",
  "balde": "bucket",
  "bau": "chest",
  "caneca": "mug",
  "sabao": "soap",
  "saco": "sack",
  "tenda": "tent",
  "pergaminho": "scroll",

  // Maravilhosos & Poções (Wondrous & Potions)
  "amuleto": "amulet",
  "anel": "ring",
  "botas": "boots",
  "broche": "brooch",
  "capa": "cloak",
  "cinto": "belt",
  "colar": "necklace",
  "coroa": "crown",
  "elmo": "helm",
  "luvas": "gloves",
  "manto": "cloak",
  "olho": "eye",
  "oculos": "goggles",
  "pedra": "stone",
  "robe": "robe",
  "varinha": "wand",
  "cetro": "rod",
  "bolsa": "bag",
  "livro": "book",
  "tapete": "carpet",
  "vassoura": "broom",
  "taca": "chalice",
  "trombeta": "horn",
  "harpa": "harp",
  "flauta": "flute",
  "pocao de cura": "potion of healing",
  "pocao": "potion",
  "veneno": "poison",

  // Ferramentas & Instrumentos (Tools & Instruments)
  "suprimentos de alquimista": "alchemists supplies",
  "gaita de fole": "bagpipes",
  "suprimentos de cervejeiro": "brewer supplies",
  "suprimentos de caligrafo": "calligrapher supplies",
  "ferramentas de carpinteiro": "carpenter tools",
  "ferramentas de cartografo": "cartographer tools",
  "ferramentas de sapateiro": "cobbler tools",
  "utensilios de cozinheiro": "cook utensils",
  "conjunto de dados": "dice set",
  "kit de disfarce": "disguise kit",
  "tambor": "drum",
  "dulcimer": "dulcimer",
  "kit de falsificacao": "forgery kit",
  "ferramentas de vitralista": "glassblower tools",
  "kit de herbalismo": "herbalism kit",
  "chifre": "horn",
  "ferramentas de joalheiro": "jeweler tools",
  "ferramentas de coureiro": "leatherworker tools",
  "alaude": "lute",
  "lira": "lyre",
  "ferramentas de pedreiro": "mason tools",
  "ferramentas de navegador": "navigators tools",
  "suprimentos de pintor": "painter supplies",
  "flauta de pa": "pan flute",
  "baralho de cartas": "playing card",
  "kit de envenenador": "poisoners kit",
  "ferramentas de oleiro": "potter tools",
  "xalouco": "shawm",
  "ferramentas de ferreiro": "smith tools",
  "ferramentas de ladrao": "thieves tools",
  "ferramentas de funileiro": "tinker tools",
  "viola": "viol",
  "ferramentas de tecelao": "weaver tools",
  "ferramentas de entalhador": "woodcarver tools"
};

// Normalizes a string (lowercase, removes accents, trims)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[()]/g, "") // Remove parenthesis
    .trim();
}

/**
 * Returns the CDN URL of the item icon if found, otherwise returns null.
 */
export function getItemIconUrl(itemName: string, category: string): string | null {
  const normName = normalizeText(itemName);
  
  // 1. Try direct exact match of the normalized Portuguese name in the translation dictionary
  let englishTerm = PT_TO_EN[normName];
  
  // 2. If not found, check if the name starts with or contains any key in PT_TO_EN
  if (!englishTerm) {
    for (const key of Object.keys(PT_TO_EN)) {
      if (normName.startsWith(key) || normName.includes(key)) {
        englishTerm = PT_TO_EN[key];
        break;
      }
    }
  }

  // 3. Fallback: if it's Wondrous Item, default to some magical icons if nothing matched
  if (!englishTerm) {
    if (category === "Wondrous Item") englishTerm = "gemstone";
    else if (category === "Potions and Oils") englishTerm = "potion";
    else if (category === "Poisons") englishTerm = "poison";
    else if (category === "Armor") englishTerm = "shield";
    else if (category === "Weapon") englishTerm = "sword";
    else if (category === "Tools") englishTerm = "wrench";
  }

  if (!englishTerm) return null;

  // Search in the icons map keys
  // First try direct lookup
  let iconPath = iconsMap.icons[englishTerm];

  // If not found, look for keys containing the term
  if (!iconPath) {
    const keys = Object.keys(iconsMap.icons);
    const matchedKey = keys.find(k => k.includes(englishTerm!) || englishTerm!.includes(k));
    if (matchedKey) {
      iconPath = iconsMap.icons[matchedKey];
    }
  }

  if (iconPath) {
    // Return jsDelivr CDN link
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

