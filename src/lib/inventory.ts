// ── Item catalog ─────────────────────────────────────────────────────────────

export type ItemCategory =
  | 'weapon'
  | 'armor'
  | 'pack'
  | 'focus'
  | 'tool'
  | 'ammo'
  | 'misc'

export interface InventoryItem {
  id: string
  name: string
  category: ItemCategory
  icon: string
  description: string
  weight: number   // em kg
  cost: string
  properties?: string
  quantity?: number   // default 1
  ac?: number         // Base CA or bonus
  armorType?: 'light' | 'medium' | 'heavy' | 'shield'
  dexMax?: number     // Max Dex bonus allowed (usually 2 for medium)
  effects?: ItemEffect[]
}

export interface ItemEffect {
  type: 'stat_override' | 'stat_bonus' | 'ac_bonus'
  target: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma' | 'ac'
  value: number
}

export interface InventoryEntry {
  item: InventoryItem
  qty: number
  locked?: boolean   // itens que vieram do personagem não podem ser removidos (mas podem ser ajustados)
  isEquipped?: boolean
}

// ── Catalog ───────────────────────────────────────────────────────────────────

export const ITEM_CATALOG: InventoryItem[] = [
  // Weapons
  { id: 'spada-longa', name: 'Espada Longa', category: 'weapon', icon: '⚔️', description: 'Arma marcial corpo a corpo. Dano: 1d8 cortante.', weight: 1.5, cost: '15 po', properties: '1d8 cortante, versátil (1d10)' },
  { id: 'espada-curta', name: 'Espada Curta', category: 'weapon', icon: '🗡️', description: 'Arma marcial corpo a corpo. Dano: 1d6 perfurante.', weight: 0.9, cost: '10 po', properties: '1d6 perfurante, acuidade, leve' },
  { id: 'rapieira', name: 'Rapieira', category: 'weapon', icon: '🗡️', description: 'Arma marcial corpo a corpo. Dano: 1d8 perfurante.', weight: 0.9, cost: '25 po', properties: '1d8 perfurante, acuidade' },
  { id: 'machado-grande', name: 'Machado Grande', category: 'weapon', icon: '🪓', description: 'Arma marcial corpo a corpo. Dano: 1d12 cortante.', weight: 3.6, cost: '30 po', properties: '1d12 cortante, pesada, duas mãos' },
  { id: 'machado-batalha', name: 'Machado de Guerra', category: 'weapon', icon: '🪓', description: 'Arma marcial corpo a corpo. Dano: 1d8 cortante.', weight: 2, cost: '10 po', properties: '1d8 cortante, versátil (1d10)' },
  { id: 'maca', name: 'Maça', category: 'weapon', icon: '🔨', description: 'Arma simples corpo a corpo. Dano: 1d6 concussão.', weight: 2, cost: '5 po', properties: '1d6 concussão' },
  { id: 'martelo-guerra', name: 'Martelo de Guerra', category: 'weapon', icon: '🔨', description: 'Arma marcial corpo a corpo. Dano: 1d8 concussão.', weight: 2, cost: '15 po', properties: '1d8 concussão, versátil (1d10)' },
  { id: 'adaga', name: 'Adaga', category: 'weapon', icon: '🔪', description: 'Arma simples corpo a corpo. Dano: 1d4 perfurante.', weight: 0.4, cost: '2 po', properties: '1d4 perfurante, acuidade, arremesso, leve' },
  { id: 'cajado', name: 'Cajado', category: 'weapon', icon: '🪄', description: 'Arma simples corpo a corpo. Dano: 1d6 concussão.', weight: 2, cost: '5 po', properties: '1d6 concussão, versátil (1d8)' },
  { id: 'lanca', name: 'Lança', category: 'weapon', icon: '🏹', description: 'Arma simples corpo a corpo. Dano: 1d6 perfurante.', weight: 1.3, cost: '1 po', properties: '1d6 perfurante, arremesso, versátil (1d8)' },
  { id: 'javelina', name: 'Javelina', category: 'weapon', icon: '🏹', description: 'Arma simples corpo a corpo. Dano: 1d6 perfurante.', weight: 0.9, cost: '5 pc', properties: '1d6 perfurante, arremesso' },
  { id: 'arco-curto', name: 'Arco Curto', category: 'weapon', icon: '🏹', description: 'Arma simples à distância. Dano: 1d6 perfurante.', weight: 0.9, cost: '25 po', properties: '1d6 perfurante, duas mãos, alcance 24/96 m' },
  { id: 'arco-longo', name: 'Arco Longo', category: 'weapon', icon: '🏹', description: 'Arma marcial à distância. Dano: 1d8 perfurante.', weight: 0.9, cost: '50 po', properties: '1d8 perfurante, pesada, duas mãos, alcance 45/180 m' },
  { id: 'besta-leve', name: 'Besta Leve', category: 'weapon', icon: '🎯', description: 'Arma simples à distância. Dano: 1d8 perfurante.', weight: 2.5, cost: '25 po', properties: '1d8 perfurante, munição, carregamento, alcance 24/96 m' },
  { id: 'tacos', name: 'Taco', category: 'weapon', icon: '🪵', description: 'Arma simples corpo a corpo. Dano: 1d4 concussão.', weight: 0.9, cost: '1 pc', properties: '1d4 concussão, leve' },

  // Armor
  { id: 'couro', name: 'Armadura de Couro', category: 'armor', icon: '🥋', description: 'CA 11 + Des. Armadura leve.', weight: 5, cost: '10 po', properties: 'CA 11 + Mod. Destreza', ac: 11, armorType: 'light' },
  { id: 'couro-batido', name: 'Armadura de Couro Batido', category: 'armor', icon: '🥋', description: 'CA 12 + Des. Armadura leve.', weight: 6.5, cost: '45 po', properties: 'CA 12 + Mod. Destreza', ac: 12, armorType: 'light' },
  { id: 'gibao-peles', name: 'Gibão de Peles', category: 'armor', icon: '🧥', description: 'CA 12 + Des (máx 2). Armadura Média.', weight: 6, cost: '10 po', properties: 'CA 12 + Mod. Destreza (máx 2)', ac: 12, armorType: 'medium', dexMax: 2 },
  { id: 'cota-escamas', name: 'Cota de Escamas', category: 'armor', icon: '🛡️', description: 'CA 14 + Des (máx 2). Armadura Média.', weight: 22, cost: '50 po', properties: 'CA 14 + Mod. Des (máx 2)', ac: 14, armorType: 'medium', dexMax: 2 },
  { id: 'cota-malha', name: 'Cota de Malha', category: 'armor', icon: '⛓️', description: 'CA 16. Armadura Pesada. Desvantagem em Furtividade.', weight: 27, cost: '75 po', properties: 'CA 16, desvantagem em Furtividade', ac: 16, armorType: 'heavy' },
  { id: 'escudo', name: 'Escudo', category: 'armor', icon: '🛡️', description: '+2 na CA.', weight: 3, cost: '10 po', properties: '+2 CA', ac: 2, armorType: 'shield' },
  { id: 'escudo-madeira', name: 'Escudo de Madeira', category: 'armor', icon: '🛡️', description: '+2 na CA. Versão druídica.', weight: 3, cost: '10 po', properties: '+2 CA', ac: 2, armorType: 'shield' },

  // Packs
  { id: 'pack-explorador', name: 'Pacote do Explorador', category: 'pack', icon: '🎒', description: 'Mochila, saco de dormir, kit de refeição, pederneira, 10 tochas, 10 dias de rações, odre, 15m de corda de cânhamo.', weight: 10, cost: '10 po' },
  { id: 'pack-dungeonologista', name: 'Pacote do Dungeonologista', category: 'pack', icon: '⛏️', description: 'Mochila, pé de cabra, martelo, 10 pítons, 10 tochas, pederneira, 10 dias de rações, odre, corda de cânhamo.', weight: 12, cost: '12 po' },
  { id: 'pack-estudioso', name: 'Pacote do Estudioso', category: 'pack', icon: '📚', description: 'Mochila, livro de lore, garrafa de tinta, caneta, 10 folhas de papel, pequena faca, saco de areia, lanterna com óleo.', weight: 7, cost: '40 po' },
  { id: 'pack-diplomatico', name: 'Pacote do Diplomata', category: 'pack', icon: '📜', description: 'Baú, 2 estojos de mapa ou pergaminho, roupas finas, garrafa de tinta, caneta, rolo de lacre, sabonete, lanterna, 5 velas, pederneira, caixa de madeira com 2 perfumes, par de óculos, bolsa com 5 po.', weight: 9, cost: '39 po' },
  { id: 'pack-sacerdotal', name: 'Pacote do Sacerdote', category: 'pack', icon: '✝️', description: 'Mochila, cobertor, 10 velas, pederneira, caixa de esmola, 2 blocos de incenso, vestes sacerdotais, 2 dias de rações, odre.', weight: 8, cost: '19 po' },
  { id: 'pack-ladino', name: 'Pacote do Ladrão', category: 'pack', icon: '🔓', description: 'Mochila, 1000 esferas de aço, 3m de fio de pesca, caixa de iscas, caixa de vela, lanterna, 2 frascos de óleo, 5 dias de rações, pederneira, odre.', weight: 9, cost: '16 po' },

  // Focus / Magic
  { id: 'simbolo-sagrado', name: 'Símbolo Sagrado', category: 'focus', icon: '✨', description: 'Foco de conjuração para clérigos e paladinos.', weight: 0.5, cost: '5 po' },
  { id: 'foco-arcano', name: 'Foco Arcano', category: 'focus', icon: '🔮', description: 'Cristal, orbe, varinha ou cajado para conjuradores arcanos.', weight: 0.5, cost: '10 po' },
  { id: 'foco-druidico', name: 'Foco Druídico', category: 'focus', icon: '🌿', description: 'Galho de azevinho, tótem ou cajado de madeira para druidas.', weight: 0.5, cost: '5 po' },
  { id: 'grimorio', name: 'Grimório', category: 'focus', icon: '📖', description: 'Livro de feitiços do Mago. Contém todos os feitiços que você aprendeu.', weight: 1.5, cost: '50 po' },
  { id: 'instrumento-musical', name: 'Instrumento Musical', category: 'focus', icon: '🎵', description: 'Alaúde, flauta ou instrumento à escolha. Foco de conjuração do Bardo.', weight: 1, cost: '35 po' },
  { id: 'bolsa-componentes', name: 'Bolsa de Componentes', category: 'focus', icon: '💼', description: 'Contém componentes materiais para feitiços.', weight: 1, cost: '25 po' },

  // Tools
  { id: 'ferramentas-ladrao', name: 'Ferramentas de Ladrão', category: 'tool', icon: '🔑', description: 'Inclui uma pequena lima, um conjunto de gazuas, um pequeno espelho, um par de tesouras de metal estreitas e uma lixa.', weight: 0.5, cost: '25 po' },
  { id: 'kit-disfarce', name: 'Kit de Disfarce', category: 'tool', icon: '🎭', description: 'Cosméticos, cabelos, tintas e roupas pequenas para criar disfarces.', weight: 1.5, cost: '25 po' },
  { id: 'kit-falsificacao', name: 'Kit de Falsificação', category: 'tool', icon: '📝', description: 'Materiais para criar documentos falsos.', weight: 2, cost: '15 po' },
  { id: 'kit-navegacao', name: 'Kit de Navegação', category: 'tool', icon: '🧭', description: 'Instrumentos de navegação marítima.', weight: 1, cost: '25 po' },
  { id: 'kit-herbalismo', name: 'Kit de Herbalismo', category: 'tool', icon: '🌱', description: 'Materiais para preparar poções e remédios herbais.', weight: 1.5, cost: '5 po' },
  { id: 'ferramentas-ferreiro', name: 'Ferramentas de Ferreiro', category: 'tool', icon: '⚒️', description: 'Martelo, fole e outros utensílios de ferraria.', weight: 4, cost: '20 po' },
  { id: 'ferramentas-artesao', name: 'Utensílio Artesanal', category: 'tool', icon: '🪛', description: 'Ferramentas do ofício de um artesão específico.', weight: 2, cost: '5 po' },
  { id: 'dados-jogo', name: 'Conjunto de Dados', category: 'tool', icon: '🎲', description: 'Dados para jogos de azar.', weight: 0.1, cost: '1 po' },

  // Ammo
  { id: 'flechas-20', name: 'Flechas (20)', category: 'ammo', icon: '🏹', description: 'Munição para arcos.', weight: 0.5, cost: '1 po', quantity: 20 },
  { id: 'virotes-20', name: 'Virotes (20)', category: 'ammo', icon: '🎯', description: 'Munição para bestas.', weight: 0.75, cost: '1 po', quantity: 20 },
  { id: 'dardos', name: 'Dardos (10)', category: 'ammo', icon: '📌', description: 'Dardos para monges.', weight: 0.1, cost: '5 pc', quantity: 10 },
  { id: 'javelinas-5', name: 'Javelinas (5)', category: 'ammo', icon: '🏹', description: 'Lanças de arremesso.', weight: 4.5, cost: '25 pc', quantity: 5 },

  // Misc
  { id: 'roupas-comuns', name: 'Roupas Comuns', category: 'misc', icon: '👕', description: 'Roupas simples do cotidiano.', weight: 1.5, cost: '5 pc' },
  { id: 'roupas-finas', name: 'Roupas Finas', category: 'misc', icon: '👔', description: 'Roupas elegantes para ocasiões especiais.', weight: 3, cost: '15 po' },
  { id: 'roupas-viajante', name: 'Roupas de Viajante', category: 'misc', icon: '🧣', description: 'Roupas práticas e resistentes para viagem.', weight: 2, cost: '2 po' },
  { id: 'bolsa-15po', name: 'Bolsa (15 po)', category: 'misc', icon: '💰', description: 'Bolsa com 15 peças de ouro.', weight: 0.2, cost: '15 po' },
  { id: 'bolsa-10po', name: 'Bolsa (10 po)', category: 'misc', icon: '💰', description: 'Bolsa com 10 peças de ouro.', weight: 0.15, cost: '10 po' },
  { id: 'bolsa-5po', name: 'Bolsa (5 po)', category: 'misc', icon: '💰', description: 'Bolsa com 5 peças de ouro.', weight: 0.1, cost: '5 po' },
  { id: 'bugiganga', name: 'Bugiganga', category: 'misc', icon: '🔮', description: 'Um item aleatório sem valor mecânico, mas rico em história.', weight: 0.1, cost: '—' },
  { id: 'tocha', name: 'Tocha', category: 'misc', icon: '🔥', description: 'Ilumina em 6 metros por 1 hora.', weight: 0.5, cost: '1 pc' },
  
  // Magic Items (Test)
  { id: 'cinto-forca-gigante', name: 'Cinto da Força do Gigante', category: 'misc', icon: '💎', description: 'Sua Força se torna 21 enquanto você usar este cinto.', weight: 0.5, cost: '500 po', effects: [{ type: 'stat_override', target: 'strength', value: 21 }] },
  { id: 'tiara-intelecto', name: 'Tiara do Intelecto', category: 'misc', icon: '👑', description: 'Sua Inteligência se torna 19 enquanto você usar esta tiara.', weight: 0.5, cost: '500 po', effects: [{ type: 'stat_override', target: 'intelligence', value: 19 }] },
  { id: 'anel-protecao', name: 'Anel de Proteção', category: 'misc', icon: '💍', description: '+1 na CA e em todos os testes de salvaguarda.', weight: 0.1, cost: '500 po', effects: [{ type: 'ac_bonus', target: 'ac', value: 1 }] },
]

// ── Helper ────────────────────────────────────────────────────────────────────
export function getItem(id: string): InventoryItem | undefined {
  return ITEM_CATALOG.find(i => i.id === id)
}

function entry(id: string, qty = 1, locked = false): InventoryEntry {
  const item = ITEM_CATALOG.find(i => i.id === id)!
  return { item, qty, locked }
}

// ── Starting equipment by class ───────────────────────────────────────────────

export const CLASS_STARTING_ITEMS: Record<string, InventoryEntry[]> = {
  'Bárbaro': [
    entry('machado-grande', 1, true),
    entry('javelinas-5', 1, true),
    entry('gibao-peles', 1, true),
    entry('pack-explorador', 1, true),
    entry('bolsa-10po', 1, true),
  ],
  'Bardo': [
    entry('rapieira', 1, true),
    entry('adaga', 1, true),
    entry('couro', 1, true),
    entry('instrumento-musical', 1, true),
    entry('pack-diplomatico', 1, true),
    entry('bolsa-15po', 1, true),
  ],
  'Clérigo': [
    entry('maca', 1, true),
    entry('escudo', 1, true),
    entry('cota-escamas', 1, true),
    entry('simbolo-sagrado', 1, true),
    entry('pack-sacerdotal', 1, true),
    entry('bolsa-15po', 1, true),
  ],
  'Druida': [
    entry('cajado', 1, true),
    entry('escudo-madeira', 1, true),
    entry('gibao-peles', 1, true),
    entry('foco-druidico', 1, true),
    entry('pack-explorador', 1, true),
    entry('bolsa-10po', 1, true),
  ],
  'Guerreiro': [
    entry('spada-longa', 1, true),
    entry('escudo', 1, true),
    entry('cota-malha', 1, true),
    entry('adaga', 2, true),
    entry('pack-dungeonologista', 1, true),
    entry('bolsa-10po', 1, true),
  ],
  'Monge': [
    entry('espada-curta', 1, true),
    entry('dardos', 1, true),
    entry('roupas-comuns', 1, true),
    entry('pack-dungeonologista', 1, true),
    entry('bolsa-5po', 1, true),
  ],
  'Paladino': [
    entry('spada-longa', 1, true),
    entry('escudo', 1, true),
    entry('cota-malha', 1, true),
    entry('simbolo-sagrado', 1, true),
    entry('javelinas-5', 1, true),
    entry('pack-sacerdotal', 1, true),
    entry('bolsa-15po', 1, true),
  ],
  'Patrulheiro': [
    entry('espada-curta', 2, true),
    entry('cota-escamas', 1, true),
    entry('arco-longo', 1, true),
    entry('flechas-20', 1, true),
    entry('pack-dungeonologista', 1, true),
    entry('bolsa-10po', 1, true),
  ],
  'Ladino': [
    entry('rapieira', 1, true),
    entry('arco-curto', 1, true),
    entry('flechas-20', 1, true),
    entry('couro-batido', 1, true),
    entry('adaga', 2, true),
    entry('ferramentas-ladrao', 1, true),
    entry('pack-ladino', 1, true),
    entry('bolsa-15po', 1, true),
  ],
  'Feiticeiro': [
    entry('besta-leve', 1, true),
    entry('virotes-20', 1, true),
    entry('adaga', 2, true),
    entry('bolsa-componentes', 1, true),
    entry('pack-dungeonologista', 1, true),
    entry('bolsa-15po', 1, true),
  ],
  'Bruxo': [
    entry('besta-leve', 1, true),
    entry('virotes-20', 1, true),
    entry('adaga', 2, true),
    entry('couro', 1, true),
    entry('foco-arcano', 1, true),
    entry('pack-estudioso', 1, true),
    entry('bolsa-15po', 1, true),
  ],
  'Mago': [
    entry('cajado', 1, true),
    entry('grimorio', 1, true),
    entry('bolsa-componentes', 1, true),
    entry('pack-estudioso', 1, true),
    entry('bolsa-15po', 1, true),
  ],
  'Artífice': [
    entry('adaga', 2, true),
    entry('besta-leve', 1, true),
    entry('virotes-20', 1, true),
    entry('couro', 1, true),
    entry('ferramentas-ladrao', 1, true),
    entry('pack-explorador', 1, true),
    entry('bolsa-15po', 1, true),
  ],
}

// ── Starting equipment by background ─────────────────────────────────────────

export const BACKGROUND_STARTING_ITEMS: Record<string, InventoryEntry[]> = {
  'Acólito':           [entry('roupas-comuns'), entry('simbolo-sagrado'), entry('bolsa-15po')],
  'Charlatão':         [entry('kit-disfarce'), entry('kit-falsificacao'), entry('roupas-finas'), entry('bolsa-15po')],
  'Criminoso':         [entry('roupas-comuns'), entry('dados-jogo'), entry('ferramentas-ladrao'), entry('bolsa-15po')],
  'Artista':           [entry('instrumento-musical'), entry('kit-disfarce'), entry('roupas-finas'), entry('bolsa-15po')],
  'Herói do Povo':     [entry('ferramentas-artesao'), entry('roupas-comuns'), entry('bolsa-10po')],
  'Artesão da Guilda': [entry('ferramentas-artesao'), entry('roupas-viajante'), entry('bolsa-15po')],
  'Eremita':           [entry('kit-herbalismo'), entry('roupas-comuns'), entry('bolsa-5po')],
  'Nobre':             [entry('roupas-finas'), entry('dados-jogo'), entry('bolsa-15po'), entry('bugiganga')],
  'Forasteiro':        [entry('roupas-viajante'), entry('tocha', 3), entry('bolsa-10po')],
  'Sábio':             [entry('pack-estudioso'), entry('roupas-comuns'), entry('bolsa-10po')],
  'Marinheiro':        [entry('kit-navegacao'), entry('roupas-viajante'), entry('bolsa-10po')],
  'Soldado':           [entry('dados-jogo'), entry('roupas-comuns'), entry('bolsa-10po'), entry('bugiganga')],
  'Plebeu':            [entry('adaga'), entry('kit-disfarce'), entry('roupas-comuns'), entry('bugiganga'), entry('bolsa-10po')],
}

export function getStartingInventory(className: string, backgroundName: string): InventoryEntry[] {
  const classItems = CLASS_STARTING_ITEMS[className] ?? []
  const bgItems = BACKGROUND_STARTING_ITEMS[backgroundName] ?? []

  // Merge: if same item already in class items, add qty; otherwise append
  const merged: InventoryEntry[] = [...classItems.map(e => ({ ...e }))]
  for (const bgEntry of bgItems) {
    const existing = merged.find(e => e.item.id === bgEntry.item.id)
    if (existing) {
      existing.qty += bgEntry.qty
    } else {
      merged.push({ ...bgEntry })
    }
  }
  return merged
}
