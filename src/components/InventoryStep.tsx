'use client'
import { useState, useEffect } from 'react'
import { Plus, Minus, Trash2, Package, Sword, ShieldCheck, Backpack, Wand2, Wrench, Boxes, Zap, X } from 'lucide-react'
import {
  ITEM_CATALOG, InventoryEntry, InventoryItem, ItemCategory,
  getStartingInventory
} from '@/lib/inventory'

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORIES: { key: ItemCategory | 'all'; label: string; Icon: React.ElementType }[] = [
  { key: 'all', label: 'Todos', Icon: Boxes },
  { key: 'weapon', label: 'Armas', Icon: Sword },
  { key: 'armor', label: 'Armaduras', Icon: ShieldCheck },
  { key: 'pack', label: 'Pacotes', Icon: Backpack },
  { key: 'focus', label: 'Foco/Magia', Icon: Wand2 },
  { key: 'tool', label: 'Ferramentas', Icon: Wrench },
  { key: 'ammo', label: 'Munição', Icon: Zap },
  { key: 'misc', label: 'Misc', Icon: Package },
]

const CATEGORY_COLORS: Record<ItemCategory, string> = {
  weapon: '#f87171',
  armor: '#60a5fa',
  pack: '#34d399',
  focus: '#c084fc',
  tool: '#fbbf24',
  ammo: '#fb923c',
  misc: '#94a3b8',
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface InventoryStepProps {
  className: string
  backgroundName: string
  inventory: InventoryEntry[]
  onInventoryChange: (inv: InventoryEntry[]) => void
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function InventoryStep({
  className, backgroundName, inventory, onInventoryChange
}: InventoryStepProps) {
  const [tab, setTab] = useState<ItemCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const [detailItem, setDetailItem] = useState<InventoryItem | null>(null)
  const [initialized, setInitialized] = useState(false)

  // Auto-populate inventory on first render
  useEffect(() => {
    if (!initialized && inventory.length === 0 && (className || backgroundName)) {
      onInventoryChange(getStartingInventory(className, backgroundName))
      setInitialized(true)
    }
    if (!initialized) setInitialized(true)
  }, [className, backgroundName])

  // ── Catalog helpers ─────────────────────────────────────────────────────────
  const filtered = ITEM_CATALOG.filter(item => {
    const matchCat = tab === 'all' || item.category === tab
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const addItem = (item: InventoryItem) => {
    const existing = inventory.find(e => e.item.id === item.id)
    if (existing) {
      onInventoryChange(inventory.map(e =>
        e.item.id === item.id ? { ...e, qty: e.qty + 1 } : e
      ))
    } else {
      onInventoryChange([...inventory, { item, qty: 1, locked: false }])
    }
  }

  // ── Inventory helpers ────────────────────────────────────────────────────────
  const changeQty = (id: string, delta: number) => {
    onInventoryChange(
      inventory
        .map(e => e.item.id === id ? { ...e, qty: e.qty + delta } : e)
        .filter(e => e.qty > 0)
    )
  }

  const removeItem = (id: string) => {
    onInventoryChange(inventory.filter(e => e.item.id !== id || e.locked))
  }

  const totalWeight = inventory.reduce((sum, e) => sum + e.item.weight * e.qty, 0)

  // Group inventory by category
  const grouped = CATEGORIES.filter(c => c.key !== 'all').reduce((acc, cat) => {
    const items = inventory.filter(e => e.item.category === cat.key)
    if (items.length > 0) acc[cat.key as ItemCategory] = items
    return acc
  }, {} as Record<ItemCategory, InventoryEntry[]>)

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 6 }}>Inventário & Equipamento</h2>
        <p style={{ color: 'var(--fg2)', fontSize: 14 }}>
          Seus itens iniciais foram adicionados automaticamente. Personalize seu inventário clicando nos itens do catálogo.
        </p>
      </div>

      <div className="inv-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

        {/* ── LEFT: Item Catalog ────────────────────────────────────────────── */}
        <div style={{ backgroundColor: 'var(--bg2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
          {/* Catalog header */}
          <div style={{ padding: '16px 16px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700 }}>Catálogo de Itens</span>
              <span style={{ fontSize: 11, color: 'var(--fg3)' }}>{ITEM_CATALOG.length} itens</span>
            </div>
            {/* Search */}
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar item..."
              className="input"
              style={{ width: '100%', marginBottom: 12, fontSize: 13, padding: '8px 12px', height: 36 }}
            />
            {/* Category tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', paddingBottom: 0 }}>
              {CATEGORIES.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '6px 10px', borderRadius: '8px 8px 0 0', border: 'none',
                    fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer',
                    backgroundColor: tab === key ? 'var(--bg)' : 'transparent',
                    color: tab === key ? 'var(--fg)' : 'var(--fg3)',
                    borderBottom: tab === key ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'all 0.15s'
                  }}
                >
                  <Icon size={11} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Item grid */}
          <div style={{ padding: 12, maxHeight: 480, overflowY: 'auto' }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--fg3)', padding: '32px 0', fontSize: 13 }}>
                Nenhum item encontrado
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {filtered.map(item => {
                const inInv = inventory.find(e => e.item.id === item.id)
                const color = CATEGORY_COLORS[item.category]
                return (
                  <div
                    key={item.id}
                    style={{ position: 'relative' }}
                  >
                    <button
                      onClick={() => setDetailItem(item)}
                      style={{
                        width: '100%',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: 4, padding: '10px 6px', borderRadius: 8, border: `1px solid ${inInv ? color + '66' : 'rgba(255,255,255,0.06)'}`,
                        backgroundColor: inInv ? color + '11' : 'rgba(255,255,255,0.02)',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {inInv && (
                        <div style={{
                          position: 'absolute', top: 3, right: 3,
                          width: 16, height: 16, borderRadius: '50%',
                          backgroundColor: color, fontSize: 9, fontWeight: 800,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                          zIndex: 1
                        }}>
                          {inInv.qty}
                        </div>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(item);
                        }}
                        style={{
                          position: 'absolute', top: 3, left: 3,
                          width: 20, height: 20, borderRadius: 6,
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: 'none', cursor: 'pointer', zIndex: 1,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = color}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                      >
                        <Plus size={12} strokeWidth={3} />
                      </button>

                      <span style={{ fontSize: 22 }}>{item.icon}</span>
                      <span style={{ fontSize: 9, textAlign: 'center', color: 'var(--fg2)', lineHeight: 1.2, fontWeight: 500 }}>
                        {item.name}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Details Modal */}
          {detailItem && (
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000, backdropFilter: 'blur(8px)', padding: 20
            }} onClick={() => setDetailItem(null)}>
              <div style={{
                backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 450,
                borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column',
                boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
              }} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 32 }}>{detailItem.icon}</span>
                    <div>
                      <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>{detailItem.name}</h3>
                      <span style={{ fontSize: 11, color: CATEGORY_COLORS[detailItem.category], textTransform: 'uppercase', fontWeight: 800 }}>{detailItem.category}</span>
                    </div>
                  </div>
                  <button className="btn btn-ghost" onClick={() => setDetailItem(null)} style={{ padding: 8, borderRadius: '50%' }}>
                    <X size={20} />
                  </button>
                </div>

                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 24, marginBottom: 20, padding: 12, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
                    <div>
                      <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block' }}>Custo</span>
                      <span style={{ fontWeight: 700, color: 'var(--accentL)' }}>{detailItem.cost}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block' }}>Peso</span>
                      <span style={{ fontWeight: 700 }}>{detailItem.weight} kg</span>
                    </div>
                  </div>

                  {detailItem.properties && (
                    <div style={{ marginBottom: 16 }}>
                      <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Propriedades</span>
                      <div style={{ fontSize: 13, color: '#c084fc', fontWeight: 600 }}>{detailItem.properties}</div>
                    </div>
                  )}

                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Descrição</span>
                    <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{detailItem.description}</p>
                  </div>

                  {inventory.find(e => e.item.id === detailItem.id) ? (
                    <button
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                      onClick={() => setDetailItem(null)}
                    >
                      Fechar
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%', gap: 8 }}
                      onClick={() => {
                        addItem(detailItem);
                        setDetailItem(null);
                      }}
                    >
                      <Plus size={18} /> Adicionar ao Inventário
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Player Inventory ─────────────────────────────────────────── */}
        <div style={{ backgroundColor: 'var(--bg2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
          {/* Inventory header */}
          <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700 }}>Seu Inventário</span>
            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--fg3)' }}>
              <span>{inventory.reduce((s, e) => s + e.qty, 0)} itens</span>
              <span>{totalWeight.toFixed(1)} kg</span>
            </div>
          </div>

          {/* Inventory list */}
          <div style={{ maxHeight: 560, overflowY: 'auto', padding: '8px 12px 12px' }}>
            {inventory.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--fg3)', padding: '48px 0', fontSize: 13 }}>
                Clique nos itens do catálogo para adicioná-los
              </div>
            )}

            {Object.entries(grouped).map(([catKey, entries]) => {
              const catInfo = CATEGORIES.find(c => c.key === catKey)!
              const color = CATEGORY_COLORS[catKey as ItemCategory]
              return (
                <div key={catKey} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 3, height: 14, borderRadius: 99, backgroundColor: color }} />
                    <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color, letterSpacing: '0.08em' }}>
                      {catInfo.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {entries.map(({ item, qty, locked }) => (
                      <div
                        key={item.id}
                        onClick={() => setDetailItem(item)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '8px 10px', borderRadius: 8,
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: `1px solid ${locked ? color + '33' : 'rgba(255,255,255,0.05)'}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        className="inventory-item-row"
                      >
                        <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                            {item.name}
                            {locked && <span style={{ fontSize: 8, color: color, fontWeight: 800, textTransform: 'uppercase', backgroundColor: color + '22', borderRadius: 4, padding: '1px 4px' }}>Inicial</span>}
                          </div>
                          {item.properties && <div style={{ fontSize: 10, color: '#c084fc', marginTop: 1 }}>{item.properties}</div>}
                        </div>
                        {/* Qty controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => changeQty(item.id, -1)}
                            style={{ width: 20, height: 20, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg3)' }}
                          >
                            <Minus size={10} />
                          </button>
                          <span style={{ minWidth: 20, textAlign: 'center', fontSize: 12, fontWeight: 700 }}>{qty}</span>
                          <button
                            onClick={() => changeQty(item.id, 1)}
                            style={{ width: 20, height: 20, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg3)' }}
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        {/* Remove (only non-locked) */}
                        {!locked && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            style={{ width: 20, height: 20, borderRadius: 4, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', flexShrink: 0 }}
                          >
                            <Trash2 size={11} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .inv-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
