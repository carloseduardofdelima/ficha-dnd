import { InventoryEntry, InventoryItem, ItemCategory } from './inventory'

export const ITEM_CATALOG_2014: InventoryItem[] = [
  // --- Armas Simples Corpo a Corpo ---
  { id: 'clava-2014', name: 'Clava', category: 'weapon', icon: '🪵', description: 'Arma simples corpo a corpo. Dano: 1d4 contundente.', weight: 0.9, cost: '1 pp', properties: 'Leve, 1d4 contundente' },
  { id: 'adaga-2014', name: 'Adaga', category: 'weapon', icon: '🔪', description: 'Arma simples corpo a corpo. Dano: 1d4 perfurante.', weight: 0.45, cost: '2 po', properties: 'Acuidade, Leve, Arremesso (6/18m), 1d4 perfurante' },
  { id: 'clava-grande-2014', name: 'Clava Grande', category: 'weapon', icon: '🪵', description: 'Arma simples corpo a corpo. Dano: 1d8 contundente.', weight: 4.5, cost: '2 pp', properties: 'Duas Mãos, 1d8 contundente' },
  { id: 'machado-mao-2014', name: 'Machado de Mão', category: 'weapon', icon: '🪓', description: 'Arma simples corpo a corpo. Dano: 1d6 cortante.', weight: 0.9, cost: '5 po', properties: 'Leve, Arremesso (6/18m), 1d6 cortante' },
  { id: 'azagaia-2014', name: 'Azagaia', category: 'weapon', icon: '🏹', description: 'Arma simples corpo a corpo. Dano: 1d6 perfurante.', weight: 0.9, cost: '5 pp', properties: 'Arremesso (9/36m), 1d6 perfurante' },
  { id: 'martelo-leve-2014', name: 'Martelo Leve', category: 'weapon', icon: '🔨', description: 'Arma simples corpo a corpo. Dano: 1d4 contundente.', weight: 0.9, cost: '2 po', properties: 'Leve, Arremesso (6/18m), 1d4 contundente' },
  { id: 'maca-2014', name: 'Maça', category: 'weapon', icon: '🔨', description: 'Arma simples corpo a corpo. Dano: 1d6 contundente.', weight: 1.8, cost: '5 po', properties: '1d6 contundente' },
  { id: 'cajado-2014', name: 'Cajado', category: 'weapon', icon: '🦯', description: 'Arma simples corpo a corpo. Dano: 1d6 contundente.', weight: 1.8, cost: '2 pp', properties: 'Versátil (1d8), 1d6 contundente' },
  { id: 'foice-curta-2014', name: 'Foice Curta', category: 'weapon', icon: '🌾', description: 'Arma simples corpo a corpo. Dano: 1d4 cortante.', weight: 0.9, cost: '1 po', properties: 'Leve, 1d4 cortante' },
  { id: 'lanca-2014', name: 'Lança', category: 'weapon', icon: '🔱', description: 'Arma simples corpo a corpo. Dano: 1d6 perfurante.', weight: 1.35, cost: '1 po', properties: 'Arremesso (6/18m), Versátil (1d8), 1d6 perfurante' },

  // --- Armas Simples de Longo Alcance ---
  { id: 'besta-leve-2014', name: 'Besta Leve', category: 'weapon', icon: '🏹', description: 'Arma simples à distância. Dano: 1d8 perfurante.', weight: 2.25, cost: '25 po', properties: 'Munição (24/96m), Recarga, Duas Mãos, 1d8 perfurante' },
  { id: 'dardo-2014', name: 'Dardo', category: 'weapon', icon: '🎯', description: 'Arma simples à distância. Dano: 1d4 perfurante.', weight: 0.11, cost: '5 pc', properties: 'Acuidade, Arremesso (6/18m), 1d4 perfurante' },
  { id: 'arco-curto-2014', name: 'Arco Curto', category: 'weapon', icon: '🏹', description: 'Arma simples à distância. Dano: 1d6 perfurante.', weight: 0.9, cost: '25 po', properties: 'Munição (24/96m), Duas Mãos, 1d6 perfurante' },
  { id: 'funda-2014', name: 'Funda', category: 'weapon', icon: '🪨', description: 'Arma simples à distância. Dano: 1d4 contundente.', weight: 0, cost: '1 pp', properties: 'Munição (9/36m), 1d4 contundente' },

  // --- Armas Marciais Corpo a Corpo ---
  { id: 'machado-batalha-2014', name: 'Machado de Batalha', category: 'weapon', icon: '🪓', description: 'Arma marcial corpo a corpo. Dano: 1d8 cortante.', weight: 1.8, cost: '10 po', properties: 'Versátil (1d10), 1d8 cortante' },
  { id: 'mangual-2014', name: 'Mangual', category: 'weapon', icon: '⛓️', description: 'Arma marcial corpo a corpo. Dano: 1d8 contundente.', weight: 0.9, cost: '10 po', properties: '1d8 contundente' },
  { id: 'glaive-2014', name: 'Glaive', category: 'weapon', icon: '⚔️', description: 'Arma marcial corpo a corpo. Dano: 1d10 cortante.', weight: 2.7, cost: '20 po', properties: 'Pesada, Alcance, Duas Mãos, 1d10 cortante' },
  { id: 'machado-grande-2014', name: 'Machado Grande', category: 'weapon', icon: '🪓', description: 'Arma marcial corpo a corpo. Dano: 1d12 cortante.', weight: 3.15, cost: '30 po', properties: 'Pesada, Duas Mãos, 1d12 cortante' },
  { id: 'espada-grande-2014', name: 'Espada Grande', category: 'weapon', icon: '⚔️', description: 'Arma marcial corpo a corpo. Dano: 2d6 cortante.', weight: 2.7, cost: '50 po', properties: 'Pesada, Duas Mãos, 2d6 cortante' },
  { id: 'alabarda-2014', name: 'Alabarda', category: 'weapon', icon: '⚔️', description: 'Arma marcial corpo a corpo. Dano: 1d10 cortante.', weight: 2.7, cost: '20 po', properties: 'Pesada, Alcance, Duas Mãos, 1d10 cortante' },
  { id: 'lanca-montada-2014', name: 'Lança Montada', category: 'weapon', icon: '🏇', description: 'Arma marcial corpo a corpo. Dano: 1d12 perfurante.', weight: 2.7, cost: '10 po', properties: 'Alcance, Especial, 1d12 perfurante' },
  { id: 'espada-longa-2014', name: 'Espada Longa', category: 'weapon', icon: '⚔️', description: 'Arma marcial corpo a corpo. Dano: 1d8 cortante.', weight: 1.35, cost: '15 po', properties: 'Versátil (1d10), 1d8 cortante' },
  { id: 'malho-2014', name: 'Malho', category: 'weapon', icon: '🔨', description: 'Arma marcial corpo a corpo. Dano: 2d6 contundente.', weight: 4.5, cost: '10 po', properties: 'Pesada, Duas Mãos, 2d6 contundente' },
  { id: 'estrela-manha-2014', name: 'Estrela da Manhã', category: 'weapon', icon: '⛓️', description: 'Arma marcial corpo a corpo. Dano: 1d8 perfurante.', weight: 1.8, cost: '15 po', properties: '1d8 perfurante' },
  { id: 'pique-2014', name: 'Pique', category: 'weapon', icon: '🔱', description: 'Arma marcial corpo a corpo. Dano: 1d10 perfurante.', weight: 8.1, cost: '5 po', properties: 'Pesada, Alcance, Duas Mãos, 1d10 perfurante' },
  { id: 'rapieira-2014', name: 'Rapieira', category: 'weapon', icon: '🗡️', description: 'Arma marcial corpo a corpo. Dano: 1d8 perfurante.', weight: 0.9, cost: '25 po', properties: 'Acuidade, 1d8 perfurante' },
  { id: 'cimitarra-2014', name: 'Cimitarra', category: 'weapon', icon: '⚔️', description: 'Arma marcial corpo a corpo. Dano: 1d6 cortante.', weight: 1.35, cost: '25 po', properties: 'Acuidade, Leve, 1d6 cortante' },
  { id: 'espada-curta-2014', name: 'Espada Curta', category: 'weapon', icon: '🗡️', description: 'Arma marcial corpo a corpo. Dano: 1d6 perfurante.', weight: 0.9, cost: '10 po', properties: 'Acuidade, Leve, 1d6 perfurante' },
  { id: 'tridente-2014', name: 'Tridente', category: 'weapon', icon: '🔱', description: 'Arma marcial corpo a corpo. Dano: 1d6 perfurante.', weight: 1.8, cost: '5 po', properties: 'Arremesso (6/18m), Versátil (1d8), 1d6 perfurante' },
  { id: 'picareta-guerra-2014', name: 'Picareta de Guerra', category: 'weapon', icon: '⛏️', description: 'Arma marcial corpo a corpo. Dano: 1d8 perfurante.', weight: 0.9, cost: '5 po', properties: '1d8 perfurante' },
  { id: 'martelo-guerra-2014', name: 'Martelo de Guerra', category: 'weapon', icon: '🔨', description: 'Arma marcial corpo a corpo. Dano: 1d8 contundente.', weight: 0.9, cost: '15 po', properties: 'Versátil (1d10), 1d8 contundente' },
  { id: 'chicote-2014', name: 'Chicote', category: 'weapon', icon: '➰', description: 'Arma marcial corpo a corpo. Dano: 1d4 cortante.', weight: 1.35, cost: '2 po', properties: 'Acuidade, Alcance, 1d4 cortante' },

  // --- Armas Marciais de Longo Alcance ---
  { id: 'zarabatana-2014', name: 'Zarabatana', category: 'weapon', icon: '🌬️', description: 'Arma marcial à distância. Dano: 1 perfurante.', weight: 0.45, cost: '10 po', properties: 'Munição (7.5/30m), Recarga, 1 perfurante' },
  { id: 'besta-mao-2014', name: 'Besta de Mão', category: 'weapon', icon: '🏹', description: 'Arma marcial à distância. Dano: 1d6 perfurante.', weight: 1.35, cost: '75 po', properties: 'Munição (9/36m), Leve, Recarga, 1d6 perfurante' },
  { id: 'besta-pesada-2014', name: 'Besta Pesada', category: 'weapon', icon: '🏹', description: 'Arma marcial à distância. Dano: 1d10 perfurante.', weight: 8.1, cost: '50 po', properties: 'Munição (30/120m), Pesada, Recarga, Duas Mãos, 1d10 perfurante' },
  { id: 'arco-longo-2014', name: 'Arco Longo', category: 'weapon', icon: '🏹', description: 'Arma marcial à distância. Dano: 1d8 perfurante.', weight: 0.9, cost: '50 po', properties: 'Munição (45/180m), Pesada, Duas Mãos, 1d8 perfurante' },
  { id: 'rede-2014', name: 'Rede', category: 'weapon', icon: '🕸️', description: 'Arma marcial à distância. Especial.', weight: 1.35, cost: '1 po', properties: 'Especial, Arremesso (1.5/4.5m)' },

  // --- Armaduras Leves ---
  { id: 'acolchoada-2014', name: 'Acolchoada', category: 'armor', icon: '🥋', description: 'CA 11 + Des. Armadura leve.', weight: 3.6, cost: '5 po', properties: '11 + Mod. Des, Desvantagem Furtividade', ac: 11, armorType: 'light' },
  { id: 'couro-2014', name: 'Couro', category: 'armor', icon: '🥋', description: 'CA 11 + Des. Armadura leve.', weight: 4.5, cost: '10 po', properties: '11 + Mod. Des', ac: 11, armorType: 'light' },
  { id: 'couro-batido-2014', name: 'Couro Batido', category: 'armor', icon: '🥋', description: 'CA 12 + Des. Armadura leve.', weight: 5.85, cost: '45 po', properties: '12 + Mod. Des', ac: 12, armorType: 'light' },

  // --- Armaduras Médias ---
  { id: 'peles-2014', name: 'Couro (Hide)', category: 'armor', icon: '🧥', description: 'CA 12 + Des (máx 2). Armadura média.', weight: 5.4, cost: '10 po', properties: '12 + Mod. Des (máx 2)', ac: 12, armorType: 'medium', dexMax: 2 },
  { id: 'camisa-malha-2014', name: 'Camisa de Malha', category: 'armor', icon: '⛓️', description: 'CA 13 + Des (máx 2). Armadura média.', weight: 9, cost: '50 po', properties: '13 + Mod. Des (máx 2)', ac: 13, armorType: 'medium', dexMax: 2 },
  { id: 'cota-escamas-2014', name: 'Cota de Escamas', category: 'armor', icon: '🛡️', description: 'CA 14 + Des (máx 2). Armadura média.', weight: 20.25, cost: '50 po', properties: '14 + Mod. Des (máx 2), Desvantagem Furtividade', ac: 14, armorType: 'medium', dexMax: 2 },
  { id: 'peitoral-2014', name: 'Peitoral', category: 'armor', icon: '🛡️', description: 'CA 14 + Des (máx 2). Armadura média.', weight: 9, cost: '400 po', properties: '14 + Mod. Des (máx 2)', ac: 14, armorType: 'medium', dexMax: 2 },
  { id: 'meia-armadura-2014', name: 'Meia Armadura', category: 'armor', icon: '🛡️', description: 'CA 15 + Des (máx 2). Armadura média.', weight: 18, cost: '750 po', properties: '15 + Mod. Des (máx 2), Desvantagem Furtividade', ac: 15, armorType: 'medium', dexMax: 2 },

  // --- Armaduras Pesadas ---
  { id: 'cota-aneis-2014', name: 'Cota de Anéis', category: 'armor', icon: '⛓️', description: 'CA 14. Armadura pesada.', weight: 18, cost: '30 po', properties: '14 CA, Desvantagem Furtividade', ac: 14, armorType: 'heavy' },
  { id: 'cota-malha-2014', name: 'Cota de Malha', category: 'armor', icon: '⛓️', description: 'CA 16. Armadura pesada.', weight: 24.75, cost: '75 po', properties: '16 CA, For 13, Desvantagem Furtividade', ac: 16, armorType: 'heavy' },
  { id: 'armadura-talas-2014', name: 'Armadura de Talas', category: 'armor', icon: '🛡️', description: 'CA 17. Armadura pesada.', weight: 27, cost: '200 po', properties: '17 CA, For 15, Desvantagem Furtividade', ac: 17, armorType: 'heavy' },
  { id: 'armadura-completa-2014', name: 'Armadura Completa', category: 'armor', icon: '🛡️', description: 'CA 18. Armadura pesada.', weight: 29.25, cost: '1.500 po', properties: '18 CA, For 15, Desvantagem Furtividade', ac: 18, armorType: 'heavy' },

  // --- Escudo ---
  { id: 'escudo-2014', name: 'Escudo', category: 'armor', icon: '🛡️', description: '+2 na CA.', weight: 2.7, cost: '10 po', properties: '+2 CA', ac: 2, armorType: 'shield' },

  // --- Pacotes de Equipamento ---
  { id: 'pack-ladrao-2014', name: 'Pacote de Ladrão', category: 'pack', icon: '🔓', description: 'Mochila, saco com 1.000 esferas de metal, 3 metros de barbante, um sino, 5 velas, um pé de cabra, um martelo, 10 aríetes, uma lanterna de capuz, 2 frascos de óleo, 5 dias de rações, uma caixa de fogo e um odre. 15 metros de corda de cânhamo amarrada ao lado.', weight: 9, cost: '16 po' },
  { id: 'pack-diplomata-2014', name: 'Pacote de Diplomata', category: 'pack', icon: '📜', description: 'Baú, 2 estojos para mapas e pergaminhos, um conjunto de roupas finas, um frasco de tinta, uma pena, uma lamparina, 2 frascos de óleo, 5 folhas de papel, um frasco de perfume, cera de lacre e sabão.', weight: 9, cost: '39 po' },
  { id: 'pack-dungeon-2014', name: 'Pacote de Explorador de Masmorras', category: 'pack', icon: '⛏️', description: 'Mochila, um pé de cabra, um martelo, 10 aríetes, 10 tochas, uma caixa de fogo, 10 dias de rações e um odre. 15 metros de corda de cânhamo amarrada ao lado.', weight: 12, cost: '12 po' },
  { id: 'pack-artista-2014', name: 'Pacote de Artista', category: 'pack', icon: '🎭', description: 'Mochila, um saco de dormir, 2 fantasias, 5 velas, 5 dias de rações, um odre e um kit de disfarce.', weight: 10, cost: '40 po' },
  { id: 'pack-explorador-2014', name: 'Pacote de Explorador', category: 'pack', icon: '🎒', description: 'Mochila, um saco de dormir, um kit de refeição, uma caixa de fogo, 10 tochas, 10 dias de rações e um odre. 15 metros de corda de cânhamo amarrada ao lado.', weight: 10, cost: '10 po' },
  { id: 'pack-sacerdote-2014', name: 'Pacote de Sacerdote', category: 'pack', icon: '✝️', description: 'Mochila, um cobertor, 10 velas, uma caixa de fogo, uma caixa de esmolas, 2 blocos de incenso, um incensário, vestes e 2 dias de rações, e um odre.', weight: 8, cost: '19 po' },
  { id: 'pack-estudioso-2014', name: 'Pacote de Estudioso', category: 'pack', icon: '📚', description: 'Mochila, um livro de conhecimento, um frasco de tinta, uma pena, 10 folhas de pergaminho, um pequeno saco de areia e uma pequena faca.', weight: 7, cost: '40 po' },
  
  // --- Itens de Sobrevivência e Diversos ---
  { id: 'racoes-2014', name: 'Rações (1 dia)', category: 'misc', icon: '🍱', description: 'Comida seca adequada para viagens.', weight: 0.45, cost: '5 pp' },
  { id: 'tocha-2014', name: 'Tocha', category: 'misc', icon: '🔦', description: 'Fornece luz brilhante em um raio de 6m.', weight: 0.45, cost: '1 pc' },
  { id: 'corda-canhamo-2014', name: 'Corda de Cânhamo (15m)', category: 'misc', icon: '🪢', description: 'Corda resistente de cânhamo.', weight: 4.5, cost: '1 po' },
  { id: 'odre-2014', name: 'Odre', category: 'misc', icon: '🍶', description: 'Recipiente para água ou vinho.', weight: 2.25, cost: '1 po' },
  { id: 'caixa-fogo-2014', name: 'Caixa de Fogo', category: 'misc', icon: '🔥', description: 'Usada para acender fogueiras.', weight: 0.45, cost: '5 pp' },
  { id: 'saco-dormir-2014', name: 'Saco de Dormir', category: 'misc', icon: '🛌', description: 'Cama portátil.', weight: 3.15, cost: '1 po' },
  { id: 'pederneira-2014', name: 'Pederneira e Isqueiro', category: 'misc', icon: '⚡', description: 'Usada para acender fogo.', weight: 0, cost: '5 pp' },
  { id: 'algemas-2014', name: 'Algemas', category: 'misc', icon: '⛓️', description: 'Usadas para prender criaturas pequenas ou médias.', weight: 0.9, cost: '2 po' },
  { id: 'virotes-2014', name: 'Virotes (20)', category: 'ammo', icon: '🎯', description: 'Munição para bestas.', weight: 0.675, cost: '1 po', quantity: 20 },
  { id: 'flechas-2014', name: 'Flechas (20)', category: 'ammo', icon: '🏹', description: 'Munição para arcos.', weight: 0.45, cost: '1 po', quantity: 20 },
  { id: 'ferramentas-ladrao-2014', name: 'Ferramentas de Ladrão', category: 'tool', icon: '🔑', description: 'Usadas para abrir fechaduras e desarmar armadilhas.', weight: 0.45, cost: '25 po' },
  { id: 'bolsa-componentes-2014', name: 'Bolsa de Componentes', category: 'focus', icon: '💼', description: 'Contém componentes materiais para magias.', weight: 0.9, cost: '25 po' },
  { id: 'simbolo-sagrado-2014', name: 'Símbolo Sagrado', category: 'focus', icon: '✨', description: 'Foco de conjuração para clérigos e paladinos.', weight: 0.45, cost: '5 po' },
  { id: 'foco-arcano-2014', name: 'Foco Arcano', category: 'focus', icon: '🔮', description: 'Foco de conjuração para feiticeiros, bruxos e magos.', weight: 0.45, cost: '5-20 po' },
  { id: 'grimorio-2014', name: 'Grimório', category: 'misc', icon: '📖', description: 'Livro de magias essencial para magos.', weight: 1.35, cost: '50 po' },
  { id: 'kit-disfarce-2014', name: 'Kit de Disfarce', category: 'tool', icon: '🎭', description: 'Usado para criar disfarces.', weight: 1.35, cost: '25 po' },
  { id: 'kit-falsificacao-2014', name: 'Kit de Falsificação', category: 'tool', icon: '✍️', description: 'Usado para falsificar documentos.', weight: 2.25, cost: '15 po' },
  { id: 'roupas-finas-2014', name: 'Roupas Finas', category: 'misc', icon: '👔', description: 'Roupas de alta qualidade para nobres.', weight: 2.7, cost: '15 po' },
  { id: 'roupas-comuns-2014', name: 'Roupas Comuns', category: 'misc', icon: '👕', description: 'Roupas simples para uso diário.', weight: 1.35, cost: '5 pp' },
  { id: 'bolsa-15po-2014', name: 'Bolsa (15 po)', category: 'misc', icon: '💰', description: 'Uma bolsa contendo 15 moedas de ouro.', weight: 0.45, cost: '15 po' },
  { id: 'bolsa-10po-2014', name: 'Bolsa (10 po)', category: 'misc', icon: '💰', description: 'Uma bolsa contendo 10 moedas de ouro.', weight: 0.45, cost: '10 po' },
  { id: 'pé-de-cabra-2014', name: 'Pé de Cabra', category: 'misc', icon: '🔨', description: 'Concede vantagem em testes de Força para abrir algo.', weight: 2.25, cost: '2 po' },
]

export const CLASS_STARTING_ITEMS_2014: Record<string, InventoryEntry[]> = {
  'Bárbaro': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'machado-grande-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'machado-mao-2014')!, qty: 2, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-explorador-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'azagaia-2014')!, qty: 4, locked: true },
  ],
  'Bardo': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'rapieira-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-diplomata-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'acolchoada-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'adaga-2014')!, qty: 1, locked: true },
  ],
  'Clérigo': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'maca-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'cota-escamas-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'besta-leve-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-sacerdote-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'escudo-2014')!, qty: 1, locked: true },
  ],
  'Druida': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'escudo-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'cimitarra-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id.includes('peles'))!, qty: 1, locked: true }, // Using Hide/Peles
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-explorador-2014')!, qty: 1, locked: true },
  ],
  'Guerreiro': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'cota-malha-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'espada-longa-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'escudo-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'besta-leve-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-dungeon-2014')!, qty: 1, locked: true },
  ],
  'Monge': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'espada-curta-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-dungeon-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'dardo-2014')!, qty: 10, locked: true },
  ],
  'Paladino': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'espada-longa-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'escudo-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'azagaia-2014')!, qty: 5, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-explorador-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'cota-malha-2014')!, qty: 1, locked: true },
  ],
  'Patrulheiro': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'cota-escamas-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'espada-curta-2014')!, qty: 2, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-explorador-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'arco-longo-2014')!, qty: 1, locked: true },
  ],
  'Ladino': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'rapieira-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'arco-curto-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-ladrao-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'couro-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'adaga-2014')!, qty: 2, locked: true },
  ],
  'Feiticeiro': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'besta-leve-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-dungeon-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'adaga-2014')!, qty: 2, locked: true },
  ],
  'Bruxo': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'besta-leve-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-estudioso-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'couro-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'adaga-2014')!, qty: 2, locked: true },
  ],
  'Mago': [
    { item: ITEM_CATALOG_2014.find(i => i.id === 'cajado-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'pack-estudioso-2014')!, qty: 1, locked: true },
    { item: ITEM_CATALOG_2014.find(i => i.id === 'adaga-2014')!, qty: 1, locked: true },
  ],
}

export function getStartingInventory2014(className: string, backgroundName: string): InventoryEntry[] {
  const classItems = CLASS_STARTING_ITEMS_2014[className] ?? []
  const bgItems: InventoryEntry[] = []

  // Mapping basic background items for 2014
  if (backgroundName === 'Acólito') {
    const symbol = ITEM_CATALOG_2014.find(i => i.id === 'simbolo-sagrado-2014');
    if (symbol) bgItems.push({ item: symbol, qty: 1 });
  } else if (backgroundName === 'Criminoso') {
    const crowbar = ITEM_CATALOG_2014.find(i => i.id === 'pé-de-cabra-2014') || ITEM_CATALOG_2014.find(i => i.name.toLowerCase().includes('cabra'));
    if (crowbar) bgItems.push({ item: crowbar, qty: 1 });
  } else if (backgroundName === 'Soldado') {
    const trophy = ITEM_CATALOG_2014.find(i => i.id === 'adaga-2014');
    if (trophy) bgItems.push({ item: trophy, qty: 1 });
  } else if (backgroundName === 'Órfão') {
    const knife = ITEM_CATALOG_2014.find(i => i.id === 'adaga-2014');
    if (knife) bgItems.push({ item: knife, qty: 1 });
  }

  return [...classItems.map(e => ({ ...e })), ...bgItems.map(e => ({ ...e }))]
}
