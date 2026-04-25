'use client'
import { useParams, useRouter } from 'next/navigation'
import { Sword, Shield, Heart, Zap, Star, Info, Settings, Plus, TrendingUp, ArrowRight, RotateCcw, Target, Footprints, Eye, Brain, Waves, User, Menu, X, Trash2, Upload, Loader2, Cloud, CloudOff, CloudDownload, FileDown, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { formatModifier, calcModifier, type Character, type Defense, type Companion } from '@/types/character'
import { RACES } from '@/lib/races'
import CLASS_LEVEL1_DATA from '@/lib/class-features'
import { SPELLS } from '@/lib/spells'
import { compressImage } from '@/lib/image'
import { CLASSES } from '@/lib/classes'
import ResourceTracker from '@/components/ResourceTracker'
import { calculateAC, calculateEffectiveStats } from '@/lib/dnd-rules'
import { ITEM_CATALOG } from '@/lib/inventory'
import { CLASS_PROGRESSION_2024, getProficiencyBonus, SPECIES_PROGRESSION_2024 } from '@/lib/dnd-progression-2024'
import { SUBCLASSES_2024 } from '@/lib/dnd-subclasses-2024'
import { getFeatureDescription } from '@/lib/features'
import { BACKGROUNDS } from '@/lib/backgrounds'
import { pdf } from '@react-pdf/renderer'
import CharacterPDF from '@/components/CharacterPDF'
import { SPELL_PROGRESSION } from '@/lib/spells'
import { FEATS_2024, type Feat } from '@/lib/dnd-feats-2024'

export default function CharacterDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('combat')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCompanionModalOpen, setIsCompanionModalOpen] = useState(false)
  const [newCompanion, setNewCompanion] = useState<Partial<Companion>>({})
  const [isCompTypeSelectOpen, setIsCompTypeSelectOpen] = useState(false)

  // Level Up States
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const [levelUpStep, setLevelUpStep] = useState(1)
  const [levelUpRoll, setLevelUpRoll] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [useAverageHP, setUseAverageHP] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved')
  const [isPreparing, setIsPreparing] = useState(false)
  const [selectedRuleset, setSelectedRuleset] = useState<'2014' | '2024' | null>(null)
  const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null)
  const [selectedFeatId, setSelectedFeatId] = useState<string | null>(null)
  const [featAttr1, setFeatAttr1] = useState<string | null>(null)
  const [featAttr2, setFeatAttr2] = useState<string | null>(null)

  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [detailItem, setDetailItem] = useState<any | null>(null)
  const [detailFeature, setDetailFeature] = useState<any | null>(null)
  const [isAttrModalOpen, setIsAttrModalOpen] = useState(false)
  const [editingAttrs, setEditingAttrs] = useState({
    strength: 0, dexterity: 0, constitution: 0,
    intelligence: 0, wisdom: 0, charisma: 0
  })

  // Inventory States
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false)
  const [inventorySearchTerm, setInventorySearchTerm] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)

  // Moved Hooks to follow Rules of Hooks (must be before conditional returns)
  const parsedTraits = useMemo(() => {
    if (!character?.traits) return {}
    if (typeof character.traits === 'object') return character.traits
    try {
      return JSON.parse(character.traits as string)
    } catch (e) {
      return {}
    }
  }, [character?.traits])

  const expertises = useMemo(() => parsedTraits.expertises || {}, [parsedTraits])

  const parsedSkills = useMemo<Record<string, boolean>>(() => {
    if (!character?.skills) return {}
    if (typeof character.skills === 'object') return character.skills as Record<string, boolean>
    try {
      return JSON.parse(character.skills as string)
    } catch (e) {
      return {}
    }
  }, [character?.skills])

  const parsedDefenses = useMemo<Defense[]>(() => {
    if (!(character as any)?.defenses) return []
    if (Array.isArray((character as any).defenses)) return (character as any).defenses
    try {
      return JSON.parse((character as any).defenses as string)
    } catch (e) {
      return []
    }
  }, [(character as any)?.defenses])

  const parsedInventory = useMemo<any[]>(() => {
    if (!character?.inventory) return []
    if (Array.isArray(character.inventory)) return character.inventory
    try {
      return JSON.parse(character.inventory as string)
    } catch (e) {
      return []
    }
  }, [character?.inventory])

  const parsedCompanions = useMemo<Companion[]>(() => {
    if (!character?.companions) return []
    if (Array.isArray(character.companions)) return character.companions
    try {
      return JSON.parse(character.companions as string)
    } catch (e) {
      return []
    }
  }, [character?.companions])

  const parsedSpells = useMemo<string[]>(() => {
    if (!character?.spells) return []
    if (Array.isArray(character.spells)) return character.spells as string[]
    try {
      return JSON.parse(character.spells as string)
    } catch (e) {
      return []
    }
  }, [character?.spells])

  const parsedSpellSlots = useMemo<Record<string, number>>(() => {
    if (!character?.spellSlots) return {}
    if (typeof character.spellSlots === 'object') return character.spellSlots as any
    try {
      return JSON.parse(character.spellSlots as string)
    } catch (e) {
      return {}
    }
  }, [character?.spellSlots])

  const parsedResources = useMemo<Record<string, number>>(() => {
    if (!character?.resources) return {}
    if (typeof character.resources === 'object') return character.resources as any
    try {
      return JSON.parse(character.resources as string)
    } catch (e) {
      return {}
    }
  }, [character?.resources])

  // Derived Stats Sync & Debounced Autosave
  useEffect(() => {
    if (!character || loading) return;

    // Recalculate AC based on rules
    const inventory = Array.isArray(character.inventory)
      ? character.inventory
      : (character.inventory ? JSON.parse(character.inventory as string) : []);

    const calculatedAC = calculateAC(character.class, {
      strength: character.strength,
      dexterity: character.dexterity,
      constitution: character.constitution,
      intelligence: character.intelligence,
      wisdom: character.wisdom,
      charisma: character.charisma
    }, inventory);

    if (calculatedAC !== character.armorClass) {
      setCharacter(prev => prev ? { ...prev, armorClass: calculatedAC } : null);
      return; // Next render will handle save
    }

    const timer = setTimeout(() => {
      saveCharacterToDB(character);
    }, 2000);

    return () => clearTimeout(timer);
  }, [
    character?.strength, character?.dexterity, character?.constitution,
    character?.intelligence, character?.wisdom, character?.charisma,
    character?.inventory, character?.currentHp, character?.maxHp,
    character?.spellSlots, character?.resources, character?.notes,
    character?.level, character?.class, character?.spells,
    character?.traits, character?.backstory, character?.appearance
  ]);

  // Get spell progression for current level
  const currentProgression = useMemo(() => {
    if (!character) return null
    return SPELL_PROGRESSION[character.class]?.[character.level] || null
  }, [character?.class, character?.level])

  const totalCantripsSelected = useMemo(() => {
    if (!character?.spells) return 0
    return (character.spells as string[]).map(id => SPELLS.find(s => s.id === id)).filter(s => s?.level === 0).length
  }, [character?.spells])

  const totalLeveledSpellsSelected = useMemo(() => {
    if (!character?.spells) return 0
    return (character.spells as string[]).map(id => SPELLS.find(s => s.id === id)).filter(s => s && s.level > 0).length
  }, [character?.spells])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab, levelUpStep])

  useEffect(() => {
    setIsClient(true)
    fetch(`/api/personagens/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          // Sync with LocalStorage
          try {
            const localData = localStorage.getItem(`char_stats_${id}`);
            if (localData) {
              const parsed = JSON.parse(localData);
              data.currentHp = parsed.currentHp ?? data.currentHp;
              data.maxHp = parsed.maxHp ?? data.maxHp;
              data.spellSlots = parsed.spellSlots ?? data.spellSlots;
              data.resources = parsed.resources ?? data.resources;
              if (parsed.inventory) {
                data.inventory = (data.inventory as any[]).map((dbItem: any, idx: number) => {
                  const catalogItem = ITEM_CATALOG.find(i => i.id === dbItem.item.id || i.name === dbItem.item.name);
                  return {
                    ...dbItem,
                    item: { ...catalogItem, ...dbItem.item },
                    isEquipped: !!parsed.inventory[idx]?.isEquipped
                  };
                });
              } else {
                // Even without local stats, enrich with catalog
                data.inventory = (data.inventory as any[]).map((dbItem: any) => {
                  const catalogItem = ITEM_CATALOG.find(i => i.id === dbItem.item.id || i.name === dbItem.item.name);
                  return {
                    ...dbItem,
                    item: { ...catalogItem, ...dbItem.item }
                  };
                });
              }
            }
          } catch (e) {
            console.error('Error loading local stats', e);
          }
          setCharacter(data);
        }
        setLoading(false)
      })
  }, [id])

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      try {
        const compressed = await compressImage(base64)
        const res = await fetch(`/api/personagens/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatarUrl: compressed })
        })
        if (res.ok && character) {
          setCharacter({ ...character, avatarUrl: compressed })
          setShowUpload(false)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  async function handleAddInventoryItem(item: any) {
    if (!character) return;

    // Check if item already exists
    const existingIdx = (character.inventory as any[]).findIndex(e => e.item.name === item.name);
    let newInventory = [...(character.inventory as any[])];

    if (existingIdx >= 0) {
      newInventory[existingIdx] = {
        ...newInventory[existingIdx],
        qty: (newInventory[existingIdx].qty || 0) + 1
      };
    } else {
      newInventory.push({
        item: item,
        qty: 1,
        isEquipped: false
      });
    }

    const updatedChar = { ...character, inventory: newInventory };
    setCharacter(updatedChar);

    // Save to LocalStorage
    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}');
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        inventory: newInventory
      }));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }

    // Save to DB
    saveCharacterToDB(updatedChar);
  }

  async function handleRemoveInventoryItem(itemName: string) {
    if (!character) return;

    const newInventory = (character.inventory as any[]).filter(e => e.item.name !== itemName);
    const updatedChar = { ...character, inventory: newInventory };
    setCharacter(updatedChar);

    // Save to LocalStorage
    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}');
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        inventory: newInventory
      }));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }

    // Save to DB
    saveCharacterToDB(updatedChar);
    setDetailItem(null); // Close modal after removal
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Loader2 className="animate-spin" size={48} />
    </div>
  )

  if (!character) return (
    <div style={{ padding: 48, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh', color: 'var(--fg)' }}>
      <h1>Personagem não encontrado</h1>
      <button className="btn btn-outline" onClick={() => router.push('/personagens')} style={{ marginTop: 24 }}>Voltar</button>
    </div>
  )

  const characterClass = CLASSES.find(c => c.name === character.class)
  const proficientSaves = characterClass?.savingThrows || []

  const effectiveStats = calculateEffectiveStats({
    strength: character.strength,
    dexterity: character.dexterity,
    constitution: character.constitution,
    intelligence: character.intelligence,
    wisdom: character.wisdom,
    charisma: character.charisma
  }, (character.inventory as any[]) || [])

  const attributes = [
    {
      name: 'Força',
      score: effectiveStats.strength,
      mod: formatModifier(effectiveStats.strength),
      save: (() => {
        const mod = calcModifier(effectiveStats.strength)
        const isProficient = proficientSaves.includes('Força')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    {
      name: 'Destreza',
      score: effectiveStats.dexterity,
      mod: formatModifier(effectiveStats.dexterity),
      save: (() => {
        const mod = calcModifier(effectiveStats.dexterity)
        const isProficient = proficientSaves.includes('Destreza')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    {
      name: 'Constituição',
      score: effectiveStats.constitution,
      mod: formatModifier(effectiveStats.constitution),
      save: (() => {
        const mod = calcModifier(effectiveStats.constitution)
        const isProficient = proficientSaves.includes('Constituição')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    {
      name: 'Inteligência',
      score: effectiveStats.intelligence,
      mod: formatModifier(effectiveStats.intelligence),
      save: (() => {
        const mod = calcModifier(effectiveStats.intelligence)
        const isProficient = proficientSaves.includes('Inteligência')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    {
      name: 'Sabedoria',
      score: effectiveStats.wisdom,
      mod: formatModifier(effectiveStats.wisdom),
      save: (() => {
        const mod = calcModifier(effectiveStats.wisdom)
        const isProficient = proficientSaves.includes('Sabedoria')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    {
      name: 'Carisma',
      score: effectiveStats.charisma,
      mod: formatModifier(effectiveStats.charisma),
      save: (() => {
        const mod = calcModifier(effectiveStats.charisma)
        const isProficient = proficientSaves.includes('Carisma')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
  ]

  const hp = { current: character.currentHp, max: character.maxHp }
  const ac = character ? calculateAC(character.class, {
    strength: character.strength,
    dexterity: character.dexterity,
    constitution: character.constitution,
    intelligence: character.intelligence,
    wisdom: character.wisdom,
    charisma: character.charisma
  }, parsedInventory) : 10
  const speed = character.speed
  const initiative = character.initiative >= 0 ? `+${character.initiative}` : character.initiative
  const profBonus = character.proficiencyBonus >= 0 ? `+${character.proficiencyBonus}` : character.proficiencyBonus
  const isOwner = character.userId === character.sessionUserId

  const toggleEquip = (index: number) => {
    if (!character || !character.inventory) return;
    const newInventory = [...(character.inventory as any[])];
    const entry = newInventory[index];

    const isCurrentlyEquipped = !!entry.isEquipped;

    // If equipping an armor (not shield), unequip other items of the same category
    if (!isCurrentlyEquipped && entry.item.category === 'armor' && entry.item.armorType !== 'shield') {
      newInventory.forEach(e => {
        if (e.item.category === 'armor' && e.item.armorType !== 'shield') {
          e.isEquipped = false;
        }
      });
    }

    entry.isEquipped = !isCurrentlyEquipped;
    const updated = { ...character, inventory: newInventory };
    setCharacter(updated as any);

    // Sync with LocalStorage
    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}');
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        inventory: newInventory
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const saveCharacterToDB = async (char: Character) => {
    setSaveStatus('saving');
    try {
      const payload = {
        ...char,
        // Ensure complex types are stringified for DB only if they are objects
        skills: typeof char.skills === 'object' ? JSON.stringify(char.skills) : char.skills,
        inventory: typeof char.inventory === 'object' ? JSON.stringify(char.inventory) : char.inventory,
        spells: typeof char.spells === 'object' ? JSON.stringify(char.spells) : char.spells,
        traits: typeof char.traits === 'object' ? JSON.stringify(char.traits) : char.traits,
        defenses: typeof (char as any).defenses === 'object' ? JSON.stringify((char as any).defenses) : (char as any).defenses,
        companions: typeof char.companions === 'object' ? JSON.stringify(char.companions) : char.companions,
      } as any;

      // Proficiency bonus fix if it's not in the Character type correctly but we have it in state
      if (!payload.proficiencyBonus) payload.proficiencyBonus = char.proficiencyBonus;

      const res = await fetch(`/api/personagens/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSaveStatus('saved');
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    }
  };
  const updateValue = (field: string, deltaOrVal: any, autoSave = true) => {
    if (!character) return;
    let newVal;
    if (typeof deltaOrVal === 'number' && typeof (character as any)[field] === 'number') {
      newVal = Math.max(0, ((character as any)[field] || 0) + deltaOrVal);
    } else {
      newVal = deltaOrVal;
    }
    const updatedChar = { ...character, [field]: newVal };
    setCharacter(updatedChar);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !character) return

    try {
      setUploading(true)
      const reader = new FileReader()
      reader.onload = async (event) => {
        const base64 = event.target?.result as string
        const compressed = await compressImage(base64)

        const updated = { ...character, avatarUrl: compressed }
        setCharacter(updated)
        setShowUpload(false)

        // Persistence
        await saveCharacterToDB(updated)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error(err)
      alert('Erro ao processar imagem.')
    } finally {
      setUploading(false)
    }
  }

  const handleAddCompanion = (comp: Partial<Companion>) => {
    if (!character) return;
    const currentCompanions = parsedCompanions;
    const newComp: Companion = {
      id: Math.random().toString(36).substr(2, 9),
      name: comp.name || 'Novo Companheiro',
      type: comp.type || 'Familiar',
      ac: comp.ac || 10,
      hp: comp.hp || 10,
      maxHp: comp.maxHp || 10,
      speed: comp.speed || '9m',
      perception: comp.perception || 10,
      attacks: comp.attacks || [],
      notes: comp.notes || ''
    };
    const updated = { ...character, companions: [...currentCompanions, newComp] };
    setCharacter(updated);
    saveCharacterToDB(updated);
    setIsCompanionModalOpen(false);
    setNewCompanion({});
  };

  const handleRemoveCompanion = (compId: string) => {
    if (!character) return;
    const updated = {
      ...character,
      companions: parsedCompanions.filter(c => c.id !== compId)
    };
    setCharacter(updated);
    saveCharacterToDB(updated);
  };

  const handleUpdateCompanionHP = (compId: string, delta: number) => {
    if (!character) return;
    const updatedComps = parsedCompanions.map(c => {
      if (c.id === compId) {
        return { ...c, hp: Math.min(c.maxHp, Math.max(0, c.hp + delta)) };
      }
      return c;
    });
    const updated = { ...character, companions: updatedComps };
    setCharacter(updated);
    // Debounce or just save
    saveCharacterToDB(updated);
  };

  const handleSaveAttributes = () => {
    if (!character) return;
    const updated = { ...character, ...editingAttrs };
    setCharacter(updated);
    saveCharacterToDB(updated);
    setIsAttrModalOpen(false);
  };

  const handleLevelUpPersistence = async (updatedChar: Character, alerts: string[]) => {
    setCharacter(updatedChar);
    setIsLevelUpModalOpen(false);
    setShowCelebration(true);

    // Persistence logic
    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}');
      const dataToSave = {
        ...localData,
        level: updatedChar.level,
        maxHp: updatedChar.maxHp,
        currentHp: updatedChar.currentHp,
        proficiencyBonus: updatedChar.proficiencyBonus,
        strength: updatedChar.strength,
        dexterity: updatedChar.dexterity,
        constitution: updatedChar.constitution,
        intelligence: updatedChar.intelligence,
        wisdom: updatedChar.wisdom,
        charisma: updatedChar.charisma,
        traits: updatedChar.traits
      };
      localStorage.setItem(`char_stats_${id}`, JSON.stringify(dataToSave));

      if (alerts.length > 0) {
        setTimeout(() => {
          alert(alerts.join('\n'));
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => setShowCelebration(false), 3000);

    // Persist to DB
    saveCharacterToDB(updatedChar);
  };

  // Attach to window for global access if needed (backward compatibility)
  if (typeof window !== 'undefined') {
    (window as any).updateCharValue = updateValue;
    (window as any).handleLevelUpPersistence = handleLevelUpPersistence;
  }

  const handleOpenPDF = async () => {
    if (!character) return;
    try {
      setPdfLoading(true);
      const blob = await pdf(<CharacterPDF character={character} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--fg)', padding: '24px 0', position: 'relative' }}>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay fade-up">
          <div className="menu-grid">
            {[
              { label: 'Biografia', id: 'about' },
              { label: 'Notas', id: 'notes' },
              { label: 'Atributos', id: 'attributes' },
              { label: 'Perícias', id: 'skills' },
              { label: 'Combate', id: 'combat' },
              { label: 'Inventário', id: 'inventory' },
              { label: 'Habilidades', id: 'features' },
              { label: 'Magias', id: 'spells' },
              { label: 'Proficiências', id: 'proficiencies' },
              { label: 'Companheiros', id: 'companions' },
            ].map(item => (
              <div
                key={item.label}
                className="menu-item"
                onClick={() => {
                  if (item.id) setActiveTab(item.id)
                  const scrollItem = item as { scroll?: string }
                  if (scrollItem.scroll) {
                    const el = document.getElementById(scrollItem.scroll)
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }
                  setIsMenuOpen(false)
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
          <button className="menu-close" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
      )}

      <div className="container" style={{ maxWidth: '100%' }}>

        {/* Header Section */}
        <div className={`mobile-stack ${activeTab !== 'combat' ? 'hide-mobile' : ''}`} style={{ gap: 24, marginBottom: 24, alignItems: 'center' }}>
          {/* Avatar Card */}
          <div className="card" onClick={() => isOwner && setShowUpload(true)} style={{ padding: 2, width: '100%', maxWidth: 100, position: 'relative', overflow: 'visible', flexShrink: 0, cursor: isOwner ? 'pointer' : 'default', transition: 'transform 0.2s' }}>
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: 8, overflow: 'hidden', background: 'var(--bg2)', border: '2px solid var(--border)' }}>
              {character.avatarUrl ? (
                <Image src={character.avatarUrl} alt={character.name} width={300} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg3)' }}>
                  <User size={64} />
                </div>
              )}
            </div>
            <div style={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#fff', padding: '2px 8px', borderRadius: '4px 4px 12px 12px', fontSize: 14, fontWeight: 700, boxShadow: '0 4px 10px rgba(225,29,72,.4)' }}>
              {character.level}
            </div>
          </div>

          {/* Character Main Info */}
          <div style={{ flex: 1, minWidth: 200 }} className="mobile-center-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }} className="mobile-justify-center">
              <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'var(--title-size, 32px)', fontWeight: 700, textAlign: 'center' }}>{character.name}</h1>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }} className="hide-mobile">
                {isOwner && <button className="btn btn-ghost"><Settings size={16} /></button>}
              </div>
            </div>
            <div style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 16 }} className="mobile-center-text">
              <div style={{ fontWeight: 700, color: 'var(--fg)', fontSize: 15, marginBottom: 2 }}>
                {character.class}{character.subclass ? ` - ${character.subclass}` : ''}
              </div>
              <div style={{ fontSize: 14, color: 'var(--fgM)' }}>
                {character.race} — {character.background}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }} className="mobile-justify-center">
              <div style={{ padding: '4px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}>
                <span style={{ color: 'var(--fgM)' }}>Exp: </span>{character.exp ?? '0/2700'}
              </div>
              <div style={{ padding: '4px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}>
                <span style={{ color: 'var(--fgM)' }}>Bônus de Proficiência: </span><span style={{ color: 'var(--ok)' }}>{profBonus}</span>
              </div>

              {isOwner && (
                <button
                  className="btn btn-primary"
                  style={{ padding: '4px 12px', height: 'auto', fontSize: 11, gap: 6 }}
                  onClick={() => {
                    setLevelUpStep(character.ruleset ? 1 : 0);
                    setLevelUpRoll(null);
                    setUseAverageHP(false);
                    setIsLevelUpModalOpen(true);
                  }}
                >
                  <TrendingUp size={14} />
                  Subir de Nível
                </button>
              )}

              {/* Privacy Toggle (Only for owners) */}
              {character.userId === character.sessionUserId && (
                <button
                  className="btn btn-outline"
                  style={{
                    fontSize: 11,
                    padding: '4px 12px',
                    borderColor: character.isPublic ? 'var(--ok)' : 'var(--fg3)',
                    color: character.isPublic ? 'var(--ok)' : 'var(--fg2)'
                  }}
                  onClick={async () => {
                    const nextPublic = !character.isPublic;
                    try {
                      const res = await fetch(`/api/personagens/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ isPublic: nextPublic })
                      });
                      if (res.ok) {
                        setCharacter({ ...character, isPublic: nextPublic });
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {character.isPublic ? '🌐 Público' : '🔒 Privado'}
                </button>
              )}

              {isClient && character && (
                <button
                  className="btn btn-outline"
                  style={{
                    fontSize: 11,
                    padding: '4px 12px',
                  }}
                  onClick={handleOpenPDF}
                  disabled={pdfLoading}
                >
                  {pdfLoading ? <Loader2 className="animate-spin" size={14} /> : <FileDown size={14} />}
                  Visualizar PDF
                </button>
              )}

              {/* Save Status (Autosave Indicator) */}
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, padding: '4px 10px',
                  background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8,
                  color: saveStatus === 'error' ? 'var(--accent)' : saveStatus === 'saving' ? 'var(--fgM)' : 'var(--ok)',
                  transition: 'all 0.3s'
                }}
                title={saveStatus === 'error' ? 'Erro ao salvar!' : saveStatus === 'saving' ? 'Salvando...' : 'Salvo no Banco'}
              >
                {saveStatus === 'saving' ? <CloudDownload size={14} className="animate-pulse" /> :
                  saveStatus === 'error' ? <CloudOff size={14} /> : <Cloud size={14} />}
                <span className="hide-mobile">
                  {saveStatus === 'saving' ? 'Salvando...' : saveStatus === 'error' ? 'Erro ao Salvar' : 'Salvo no Banco'}
                </span>
              </div>

              {!isOwner && (
                <div style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 8, fontSize: 11, color: '#10b981' }}>
                  🌐 Ficha Pública
                </div>
              )}

              {/* Save/Follow Button (Only for non-owners on public sheets) */}
              {character.sessionUserId && character.userId !== character.sessionUserId && character.isPublic && (
                <button
                  className={`btn ${character.isSaved ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    fontSize: 11,
                    padding: '4px 12px',
                    borderColor: character.isSaved ? 'var(--accent)' : 'var(--fg3)',
                    color: character.isSaved ? '#fff' : 'var(--fg2)'
                  }}
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/personagens/save`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ characterId: id })
                      });
                      if (res.ok) {
                        const data = await res.json();
                        setCharacter({ ...character, isSaved: data.saved });
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {character.isSaved ? '⭐ Salva na Conta' : '★ Salvar na Conta'}
                </button>
              )}

            </div>
          </div>
        </div>


        {/* Floating Mobile Menu Trigger */}

        {/* Floating Mobile Menu Trigger */}
        <button
          className="mobile-only floating-menu-btn"
          style={{ display: 'none' }}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>





        {/* Main Content Layout */}
        <div className="sheet-layout">

          {/* Main Panel */}
          <div className="sheet-main" style={{ flex: 1, minWidth: 0 }}>
            <div className="card" style={{ padding: 0, overflow: 'visible' }}>
              <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', padding: '0 16px', overflowX: 'auto', overflowY: 'hidden' }} className="hide-mobile">
                {[
                  { id: 'combat', label: 'Combate', color: 'var(--accent)' },
                  { id: 'attributes', label: 'Atributos' },
                  { id: 'skills', label: 'Perícias' },
                  { id: 'spells', label: 'Magias' },
                  { id: 'inventory', label: 'Inventário' },
                  { id: 'features', label: 'Características' },
                  { id: 'companions', label: 'Companheiros' },
                  { id: 'notes', label: 'Notas' },
                  { id: 'proficiencies', label: 'Idiomas + Prof' },
                  { id: 'about', label: 'Biografia' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '16px 20px',
                      fontSize: 14,
                      fontWeight: 600,
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `3px solid ${activeTab === tab.id ? tab.color || 'var(--fg)' : 'transparent'}`,
                      color: activeTab === tab.id ? 'var(--fg)' : 'var(--fgM)',
                      cursor: 'pointer'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ padding: 12 }}>
                {activeTab === 'about' && (
                  <div className="fade-up">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                      {/* Left: Image & Identity */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div onClick={() => isOwner && setShowUpload(true)} style={{ cursor: isOwner ? 'pointer' : 'default', display: 'flex', justifyContent: 'center' }}>
                          <div style={{ width: '100%', maxWidth: 240, aspectRatio: '1/1.3', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
                            {character.avatarUrl ? (
                              <Image src={character.avatarUrl} alt={character.name} fill style={{ objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg3)', background: 'var(--bg2)', borderRadius: 20 }}>
                                <User size={80} />
                              </div>
                            )}
                            {isOwner && (
                              <div className="avatar-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}>
                                <Upload size={32} color="#fff" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <p style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 4 }}>
                            {character.race}{character.subrace ? ` (${character.subrace})` : ''} • {character.background}
                          </p>
                          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--fg)', textTransform: 'uppercase' }}>
                            {character.name}
                          </h1>
                          <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 16 }}>{character.class}</p>
                        </div>
                      </div>

                      {/* Right: Description & Backstory */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div>
                          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 12, borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: 4 }}>Descrição Física</h3>
                          <div style={{ background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
                            <textarea
                              value={character.appearance || ''}
                              placeholder="Descreva a aparência física do seu personagem..."
                              readOnly={!isOwner}
                              onChange={(e) => isOwner && updateValue('appearance', e.target.value, false)}
                              style={{
                                width: '100%',
                                minHeight: 120,
                                background: 'transparent',
                                color: 'var(--fg)',
                                padding: 16,
                                border: 'none',
                                fontSize: 14,
                                lineHeight: 1.6,
                                resize: 'vertical',
                                outline: 'none',
                                fontFamily: 'inherit'
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 12, borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: 4 }}>História</h3>
                          <div style={{ background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
                            <textarea
                              value={character.backstory || ''}
                              placeholder="Escreva a história do seu personagem..."
                              readOnly={!isOwner}
                              onChange={(e) => isOwner && updateValue('backstory', e.target.value, false)}
                              style={{
                                width: '100%',
                                minHeight: 300,
                                background: 'transparent',
                                color: 'var(--fg)',
                                padding: 20,
                                borderRadius: 12,
                                border: 'none',
                                fontSize: 14,
                                lineHeight: 1.6,
                                resize: 'vertical',
                                outline: 'none',
                                fontFamily: 'inherit',
                                whiteSpace: 'pre-wrap'
                              }}
                            />
                          </div>
                        </div>
                        {isOwner && (
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                            <button
                              className="btn btn-primary"
                              onClick={() => saveCharacterToDB(character)}
                              disabled={saveStatus === 'saving'}
                            >
                              {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="fade-up">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, margin: 0 }}>Notas do Personagem</h2>
                      <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <textarea
                          placeholder="Escreva aqui suas anotações de campanha, segredos, objetivos..."
                          value={character.notes || ''}
                          readOnly={!isOwner}
                          onChange={(e) => isOwner && updateValue('notes', e.target.value, false)}
                          style={{
                            width: '100%',
                            minHeight: '60vh',
                            background: 'var(--bg2)',
                            color: 'var(--fg)',
                            padding: 24,
                            border: 'none',
                            fontSize: 15,
                            lineHeight: 1.6,
                            resize: 'vertical',
                            outline: 'none',
                            fontFamily: 'inherit'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 11, color: 'var(--fg3)', fontStyle: 'italic' }}>
                          {isOwner ? '💾 Clique em salvar para persistir as alterações.' : '👁️ Modo de apenas leitura.'}
                        </div>
                        {isOwner && (
                          <button
                            className="btn btn-primary"
                            onClick={() => saveCharacterToDB(character)}
                            disabled={saveStatus === 'saving'}
                          >
                            {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Notas'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'combat' && (
                  <div className="fade-up attributes-tab-container">

                    <div className="resources-section">
                      <h3 className="section-subtitle">Vida & Recursos</h3>
                      <div className="resource-grid">
                        {/* HP Section */}
                        <div className="card compact-card hp-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Heart size={16} color="var(--accent)" />
                              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Pontos de Vida</span>
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 800 }}>{character.currentHp} <span style={{ color: 'var(--fg3)', fontSize: 14 }}>/ {character.maxHp}</span></div>
                          </div>
                          <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
                            <div style={{ width: `${(character.currentHp / character.maxHp) * 100}%`, height: '100%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-outline" style={{ flex: 1, padding: '4px 0', fontSize: 11 }} onClick={() => isOwner && (window as any).updateCharValue('currentHp', -1)} disabled={!isOwner}>-1</button>
                            <button className="btn btn-outline" style={{ flex: 1, padding: '4px 0', fontSize: 11 }} onClick={() => isOwner && (window as any).updateCharValue('currentHp', 1)} disabled={!isOwner}>+1</button>
                          </div>
                        </div>

                        {/* Resource Section */}
                        {(() => {
                          const slots: Record<string, number> = character.spellSlots ? JSON.parse(character.spellSlots as string) : {};
                          const res: Record<string, number> = character.resources ? JSON.parse(character.resources as string) : {};

                          const updateSlots = (level: number, newCount: number) => {
                            const newSlots = { ...slots, [level]: newCount };
                            (window as any).updateCharValue('spellSlots', JSON.stringify(newSlots));
                          };

                          const updateRes = (name: string, newCount: number) => {
                            const newRes = { ...res, [name]: newCount };
                            (window as any).updateCharValue('resources', JSON.stringify(newRes));
                          };

                          const getInitialResources = () => {
                            const initial: any = {};
                            if (character.class === 'Bárbaro') initial['Fúrias'] = { max: 2, current: 2, color: '#f97316' };
                            if (character.class === 'Guerreiro') initial['Retomada de Fôlego'] = { max: 2, current: 2, color: '#94a3b8' };
                            if (character.class === 'Monge' && character.level >= 2) initial['Pontos de Foco'] = { max: character.level, current: character.level, color: '#facc15' };
                            if (character.class === 'Bardo') initial['Inspiração Bárdica'] = { max: Math.max(1, calcModifier(character.charisma)), current: Math.max(1, calcModifier(character.charisma)), color: '#ec4899' };
                            if (character.class === 'Artesão Arcano') {
                              initial['Tinkering Mágico'] = { max: Math.max(1, calcModifier(character.intelligence)), current: Math.max(1, calcModifier(character.intelligence)), color: '#06b6d4' };
                              if (character.level >= 3) {
                                if (character.subclass === 'Artilheiro') {
                                  initial['Canhão Élfico'] = { max: 1, current: 1, color: '#06b6d4' };
                                } else if (character.subclass === 'Alquimista') {
                                  initial['Elixires Experimentais'] = { max: 1, current: 1, color: '#06b6d4' };
                                } else if (character.subclass === 'Armeiro') {
                                  initial['Campo Defensivo'] = { max: character.proficiencyBonus || 2, current: character.proficiencyBonus || 2, color: '#06b6d4' };
                                  initial['Estatura Gigante'] = { max: Math.max(1, calcModifier(character.intelligence)), current: Math.max(1, calcModifier(character.intelligence)), color: '#06b6d4' };
                                } else if (character.subclass === 'Serralheiro de Batalha' && character.level >= 10) {
                                  initial['Choque Arcano'] = { max: Math.max(1, calcModifier(character.intelligence)), current: Math.max(1, calcModifier(character.intelligence)), color: '#06b6d4' };
                                }
                              }
                              if (character.level >= 10 && character.subclass === 'Alquimista') {
                                initial['Restauração Menor Grátis'] = { max: Math.max(1, calcModifier(character.intelligence)), current: Math.max(1, calcModifier(character.intelligence)), color: '#06b6d4' };
                              }
                              if (character.level >= 14 && character.subclass === 'Alquimista') {
                                initial['Curar (Heal)'] = { max: 1, current: 1, color: '#06b6d4' };
                                initial['Restauração Maior Grátis'] = { max: 1, current: 1, color: '#06b6d4' };
                              }
                              if (character.level >= 7) {
                                initial['Brilho de Gênio'] = { max: Math.max(1, calcModifier(character.intelligence)), current: Math.max(1, calcModifier(character.intelligence)), color: '#06b6d4' };
                              }
                            }
                            if (character.class === 'Paladino') initial['Imposição de Mãos'] = { max: character.level * 5, current: character.level * 5, color: '#facc15' };
                            if (character.class === 'Feiticeiro' && character.level >= 2) initial['Pontos de Feitiçaria'] = { max: character.level, current: character.level, color: '#c084fc' };
                            return initial;
                          };

                          const classResources = getInitialResources();
                          const isSpellcaster = ['Bardo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago', 'Paladino', 'Patrulheiro', 'Bruxo', 'Artesão Arcano'].includes(character.class);

                          return (
                            <div className="card compact-card resources-card">
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <Zap size={16} color="var(--accent)" />
                                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Recursos & Magia</span>
                                </div>
                                <button className="btn btn-outline" style={{ padding: '6px', fontSize: 11 }} disabled={!isOwner} onClick={async () => {
                                  if (!isOwner) return;
                                  const resetSlots: Record<string, number> = {};
                                  if (isSpellcaster && currentProgression) {
                                    currentProgression.slots.forEach((s, i) => {
                                      if (s > 0) resetSlots[(i + 1).toString()] = s;
                                    });
                                  }
                                  const resetRes: Record<string, number> = {};
                                  Object.keys(classResources).forEach(k => { resetRes[k] = classResources[k].max; });

                                  const update = {
                                    ...character,
                                    currentHp: character.maxHp,
                                    spellSlots: JSON.stringify(resetSlots),
                                    resources: JSON.stringify(resetRes)
                                  };
                                  setCharacter(update as any);
                                  localStorage.setItem(`char_stats_${id}`, JSON.stringify({
                                    currentHp: update.currentHp, maxHp: update.maxHp,
                                    spellSlots: update.spellSlots, resources: update.resources
                                  }));
                                }}><RotateCcw size={14} /></button>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {isSpellcaster && currentProgression && (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {currentProgression.slots.map((max, idx) => {
                                      if (max === 0) return null;
                                      const lvl = idx + 1;
                                      return (
                                        <ResourceTracker
                                          key={lvl}
                                          label={character.class === 'Bruxo' ? `Espaços de Pacto (${currentProgression.slot_level}º Nível)` : `Espaços de Magia (Nível ${lvl})`}
                                          max={max}
                                          current={slots[lvl.toString()] ?? max}
                                          onChange={(val) => updateSlots(lvl, val)}
                                        />
                                      );
                                    })}
                                  </div>
                                )}
                                {Object.keys(classResources).map(name => (
                                  <ResourceTracker
                                    key={name} label={name} max={classResources[name].max}
                                    current={res[name] ?? classResources[name].max}
                                    onChange={(val) => updateRes(name, val)}
                                    color={classResources[name].color}
                                  />
                                ))}
                                {!isSpellcaster && Object.keys(classResources).length === 0 && (
                                  <div style={{ fontSize: 11, color: 'var(--fg3)', fontStyle: 'italic', textAlign: 'center', padding: '12px 0' }}>
                                    Nenhum recurso especial.
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="combat-stats-row">
                      <div className="stat-card">
                        <div className="stat-label" tabIndex={0} style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', outline: 'none' }} data-tooltip="Define o quão difícil é para um inimigo te acertar em combate. Baseia-se na sua armadura e agilidade (Destreza).">
                          CLASSE DE ARMADURA <Info size={12} style={{ opacity: 0.6, flexShrink: 0 }} />
                        </div>
                        {(() => {
                          const acRef = ac;

                          const inv = parsedInventory;
                          const dexMod = Math.floor((character.dexterity - 10) / 2);
                          const conMod = Math.floor((character.constitution - 10) / 2);
                          const wisMod = Math.floor((character.wisdom - 10) / 2);
                          const armors = inv.filter(e => e.item.category === 'armor' && e.item.armorType !== 'shield' && e.isEquipped);
                          const baseArmor = armors.length > 0 ? armors[0].item : null;
                          const shield = inv.find(e => e.item.category === 'armor' && e.item.armorType === 'shield' && e.isEquipped);

                          let parts = [];
                          if (baseArmor) {
                            parts.push(`${baseArmor.name}: ${baseArmor.ac}`);
                            if (baseArmor.armorType === 'light') parts.push(`Des: ${dexMod >= 0 ? '+' : ''}${dexMod}`);
                            else if (baseArmor.armorType === 'medium') parts.push(`Des (máx 2): ${Math.min(dexMod, 2) >= 0 ? '+' : ''}${Math.min(dexMod, 2)}`);
                          } else {
                            parts.push(`Base: 10`);
                            parts.push(`Des: ${dexMod >= 0 ? '+' : ''}${dexMod}`);
                            if (character.class === 'Bárbaro') parts.push(`Con: ${conMod >= 0 ? '+' : ''}${conMod}`);
                            else if (character.class === 'Monge') parts.push(`Sab: ${wisMod >= 0 ? '+' : ''}${wisMod}`);
                          }
                          if (shield) parts.push(`${shield.item.name}: +${shield.item.ac}`);
                          const acInfo = parts.join(' + ');

                          return (
                            <>
                              <div className="stat-value-box">
                                <div className="stat-value">{acRef}</div>
                                <Shield size={20} color="var(--fg2)" />
                              </div>
                              <div className="stat-subtext">{acInfo}</div>
                            </>
                          );
                        })()}
                      </div>

                      <div className="stat-card">
                        <div className="stat-label" tabIndex={0} style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', outline: 'none' }} data-tooltip="A distância total em metros que você pode percorrer em um único turno de combate.">
                          DESLOCAMENTO (m) <Info size={12} style={{ opacity: 0.6, flexShrink: 0 }} />
                        </div>
                        <div className="stat-value-box">
                          <div className="stat-value">{character.speed}</div>
                          <RotateCcw size={20} color="var(--fg2)" />
                        </div>
                        <div className="stat-subtext" style={{ opacity: 0 }}>Metros</div>
                      </div>
                    </div>

                    <div className="card" style={{ background: 'var(--bg2)', padding: 16, marginBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <Shield size={16} color="var(--accent)" />
                        <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Defesas & Resistências</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {(() => {
                          const defs = [...parsedDefenses];
                          // Racial fallbacks
                          if (character.race.includes('Tiefling')) {
                            if (character.subrace?.includes('Abissal') && !defs.some(d => (d as any).value === 'Veneno')) {
                              defs.push({ value: 'Veneno', type: 'resistance', detail: 'Raça' });
                            } else if (character.subrace?.includes('Ctônico') && !defs.some(d => (d as any).value === 'Necrótico')) {
                              defs.push({ value: 'Necrótico', type: 'resistance', detail: 'Raça' });
                            } else if ((!character.subrace || character.subrace.includes('Infernal')) && !defs.some(d => (d as any).value === 'Fogo')) {
                              defs.push({ value: 'Fogo', type: 'resistance', detail: 'Raça' });
                            }
                          }
                          if (character.race.includes('Anão') && !defs.some(d => (d as any).value === 'Veneno')) {
                            defs.push({ value: 'Veneno', type: 'resistance', detail: 'Raça' });
                          }
                          if (character.race.includes('Draconato')) {
                            const match = character.subrace?.match(/\(([^)]+)\)/);
                            let type = match ? match[1] : null;

                            if (!type && character.subrace) {
                              if (/Vermelh|Ouro|Latão/i.test(character.subrace)) type = 'Fogo';
                              else if (/Azul|Bronze/i.test(character.subrace)) type = 'Elétrico';
                              else if (/Negra|Cobre/i.test(character.subrace)) type = 'Ácido';
                              else if (/Prata|Branca/i.test(character.subrace)) type = 'Frio';
                              else if (/Verde/i.test(character.subrace)) type = 'Veneno';
                            }

                            if (type && !defs.some(d => (d as any).value === type)) {
                              defs.push({ value: type, type: 'resistance', detail: 'Raça' });
                            }
                          }

                          if (defs.length === 0) return <div style={{ fontSize: 11, color: 'var(--fg3)', fontStyle: 'italic' }}>Nenhuma resistência especial registrada.</div>;

                          return defs.map((d, i) => (
                            <div key={i} style={{
                              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6,
                              background: d.type === 'immunity' || d.type === 'Imunidade' ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)',
                              border: `1px solid ${d.type === 'immunity' || d.type === 'Imunidade' ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.2)'}`,
                              fontSize: 11
                            }}>
                              <span style={{ fontWeight: 700, color: d.type === 'immunity' || d.type === 'Imunidade' ? '#4ade80' : '#60a5fa' }}>
                                {d.type === 'immunity' || d.type === 'Imunidade' ? 'Imunidade' : 'Resistência'}:
                              </span>
                              <span>{d.value}</span>
                              {d.detail && <span style={{ fontSize: 9, opacity: 0.6 }}>({d.detail})</span>}
                            </div>
                          ));
                        })()}
                      </div>
                    </div>

                  </div>
                )}

                {activeTab === 'attributes' && (
                  <div className="fade-up attributes-tab-container">
                    <h2 className="attr-title">Atributos</h2>
                    <div className="attr-grid-container">
                      <div className="attr-grid" style={{ width: '100%' }}>
                        {attributes.map(attr => (
                          <div
                            key={attr.name}
                            className="card"
                            onClick={() => {
                              if (isOwner) {
                                setEditingAttrs({
                                  strength: character.strength,
                                  dexterity: character.dexterity,
                                  constitution: character.constitution,
                                  intelligence: character.intelligence,
                                  wisdom: character.wisdom,
                                  charisma: character.charisma
                                });
                                setIsAttrModalOpen(true);
                              }
                            }}
                            style={{
                              padding: '12px 0', textAlign: 'center', background: 'var(--bg2)', width: '100%',
                              cursor: isOwner ? 'pointer' : 'default',
                              transition: 'transform 0.2s',
                              border: '1px solid var(--border)'
                            }}
                            onMouseEnter={e => isOwner && (e.currentTarget.style.borderColor = 'var(--accent)')}
                            onMouseLeave={e => isOwner && (e.currentTarget.style.borderColor = 'var(--border)')}
                          >
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--fgM)', textTransform: 'uppercase', marginBottom: 12 }}>{attr.name}</div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 8, position: 'relative' }}>
                              <div style={{ width: 48, height: 48, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800 }}>
                                {attr.mod}
                              </div>
                              <div style={{ width: 32, height: 32, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: 'var(--accentL)' }}>
                                {attr.save}
                              </div>
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--fgM)' }}>
                              <span style={{ fontSize: 12, color: 'var(--fg2)', fontWeight: 600 }}>{attr.score}</span> Atributo
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--fgM)' }}>Resistência</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="fade-up">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700 }}>Perícias</h2>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-outline" style={{ padding: 6 }}><Plus size={16} /></button>
                        <button className="btn btn-outline" style={{ padding: 6 }}><Settings size={16} /></button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: 15 }}>
                      <div style={{ display: 'flex', color: 'var(--fgM)', fontWeight: 700, paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 8, fontSize: 10 }}>
                        <div style={{ flex: 1 }}>PERÍCIA</div>
                        <div style={{ width: 45, textAlign: 'center' }}>DADOS</div>
                        <div style={{ width: 45, textAlign: 'center' }}>BÔNUS</div>
                        <div style={{ width: 45, textAlign: 'center' }}>TREINO</div>
                      </div>

                      {[
                        { key: 'acrobatics', name: 'Acrobacia', attr: 'dexterity', label: 'DES' },
                        { key: 'animalHandling', name: 'Adestramento', attr: 'wisdom', label: 'SAB' },
                        { key: 'arcana', name: 'Arcanismo', attr: 'intelligence', label: 'INT' },
                        { key: 'athletics', name: 'Atletismo', attr: 'strength', label: 'FOR' },
                        { key: 'performance', name: 'Atuação', attr: 'charisma', label: 'CAR' },
                        { key: 'deception', name: 'Enganação', attr: 'charisma', label: 'CAR' },
                        { key: 'stealth', name: 'Furtividade', attr: 'dexterity', label: 'DES' },
                        { key: 'history', name: 'História', attr: 'intelligence', label: 'INT' },
                        { key: 'intimidation', name: 'Intimidação', attr: 'charisma', label: 'CAR' },
                        { key: 'insight', name: 'Intuição', attr: 'wisdom', label: 'SAB' },
                        { key: 'investigation', name: 'Investigação', attr: 'intelligence', label: 'INT' },
                        { key: 'medicine', name: 'Medicina', attr: 'wisdom', label: 'SAB' },
                        { key: 'nature', name: 'Natureza', attr: 'intelligence', label: 'INT' },
                        { key: 'perception', name: 'Percepção', attr: 'wisdom', label: 'SAB' },
                        { key: 'persuasion', name: 'Persuasão', attr: 'charisma', label: 'CAR' },
                        { key: 'sleightOfHand', name: 'Prestidigitação', attr: 'dexterity', label: 'DES' },
                        { key: 'religion', name: 'Religião', attr: 'intelligence', label: 'INT' },
                        { key: 'survival', name: 'Sobrevivência', attr: 'wisdom', label: 'SAB' },
                      ].map(skill => {
                        const attrVal = (character as any)[skill.attr] || 10
                        const mod = Math.floor((attrVal - 10) / 2)
                        const isTrained = parsedSkills[skill.key] || false
                        const isExpert = !!expertises[skill.key]
                        const trainingBonus = isTrained ? character.proficiencyBonus : 0
                        const extraBonus = isExpert ? character.proficiencyBonus : 0
                        const total = mod + trainingBonus + extraBonus

                        return (
                          <div
                            key={skill.name}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '8px 4px',
                              borderBottom: '1px solid rgba(255,255,255,0.02)',
                              color: isTrained ? 'var(--accentL)' : 'var(--fg)',
                              opacity: isTrained ? 1 : 0.7,
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <div style={{ flex: 1, fontWeight: isTrained ? 600 : 400, display: 'flex', alignItems: 'center', gap: 8 }}>
                              {skill.name}
                            </div>
                            <div style={{ width: 45, textAlign: 'center', color: 'var(--fg3)', fontSize: 10 }}>({skill.label})</div>
                            <div style={{
                              width: 45,
                              textAlign: 'center',
                              fontWeight: isTrained ? 800 : 400,
                              fontSize: 14,
                              color: isTrained ? 'var(--accentL)' : 'inherit'
                            }}>
                              {total >= 0 ? `+${total}` : total}
                            </div>
                            <div style={{
                              width: 45,
                              textAlign: 'center',
                              color: 'var(--fg3)',
                              fontSize: 11,
                              fontWeight: isTrained ? 700 : 400
                            }}>
                              {isTrained ? `+${trainingBonus + extraBonus}` : '0'}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'spells' && (
                  <div className="fade-up">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                      <div>
                        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, margin: 0 }}>Magias</h2>
                        <p style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4 }}>
                          {isPreparing ? '🛡️ Selecione as magias para o dia' : '📖 Suas magias ativas'}
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                        {isOwner && (
                          <button 
                            className={`btn ${isPreparing ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setIsPreparing(!isPreparing)}
                            style={{ padding: '6px 12px', fontSize: 12, height: 'auto', gap: 6 }}
                          >
                            <Zap size={14} fill={isPreparing ? 'currentColor' : 'none'} />
                            {isPreparing ? 'Finalizar Preparação' : 'Preparar Magias'}
                          </button>
                        )}
                        
                        {currentProgression && (
                          <div style={{ display: 'flex', gap: 12 }}>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Truques</div>
                              <div style={{ fontSize: 14, fontWeight: 800, color: totalCantripsSelected > currentProgression.cantrips ? 'var(--error)' : 'var(--accentL)' }}>
                                {totalCantripsSelected}<span style={{ fontSize: 10, color: 'var(--fg3)', fontWeight: 400 }}>/{currentProgression.cantrips}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spell Slots Display */}
                    {currentProgression && currentProgression.slots.some(s => s > 0) && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                        gap: 8,
                        marginBottom: 24,
                        background: 'rgba(255,255,255,0.02)',
                        padding: 12,
                        borderRadius: 12,
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}>
                        {currentProgression.slots.map((max, idx) => {
                          if (max === 0) return null
                          const lvl = idx + 1
                          const current = (parsedSpellSlots as any)[lvl] ?? max
                          return (
                            <div key={lvl} style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: 10, color: 'var(--fg3)', marginBottom: 2 }}>{lvl}º Nvl</div>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                                background: 'var(--bg)',
                                padding: '4px 0',
                                borderRadius: 6,
                                border: '1px solid rgba(255,255,255,0.1)'
                              }}>
                                <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--accent)' }}>{current}</span>
                                <span style={{ opacity: 0.3, fontSize: 10 }}>/</span>
                                <span style={{ fontSize: 12, fontWeight: 600 }}>{max}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Warlock Special Slot */}
                    {currentProgression && character?.class === 'Bruxo' && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 24,
                        background: 'rgba(var(--accent-rgb), 0.05)',
                        padding: 16,
                        borderRadius: 12,
                        border: '1px solid rgba(var(--accent-rgb), 0.2)'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Espaços de Pacto ({currentProgression.slot_level}º Nvl)</div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                            <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent)' }}>{((character as any).currentSpellSlots)?.[1] ?? currentProgression.slots[0]}</div>
                            <div style={{ fontSize: 20, opacity: 0.3 }}>/</div>
                            <div style={{ fontSize: 24, fontWeight: 700 }}>{currentProgression.slots[0]}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {(() => {
                      const currentSpells = parsedSpells;
                      // Nível máximo que o personagem pode conjurar (Seguro para TypeScript)
                      const lastSlotIdx = currentProgression?.slots ? [...currentProgression.slots].reduce((acc, curr, idx) => curr > 0 ? idx : acc, 0) : 0;
                      const finalMaxLevel = currentProgression?.slot_level || lastSlotIdx + 1;
                      
                      // Se estiver preparando, mostramos a lista da classe. Se não, mostramos as salvas.
                      const baseList = isPreparing 
                        ? SPELLS.filter(s => s.classes.includes(character.class) && s.level <= finalMaxLevel)
                        : currentSpells.map(id => SPELLS.find(s => s.id === id)).filter(Boolean);

                      const toggleSpell = (id: string) => {
                        if (!isOwner) return;
                        const spell = SPELLS.find(s => s.id === id);
                        if (!spell) return;

                        const newSpells = [...currentSpells];
                        const index = newSpells.indexOf(id);
                        
                        if (index > -1) {
                          // Se já está selecionada, sempre permite remover
                          newSpells.splice(index, 1);
                        } else {
                          // Se for adicionar, verifica o limite do nível
                          const lvl = spell.level;
                          const selectedInLvl = currentSpells.filter(sid => {
                            const s = SPELLS.find(sp => sp.id === sid);
                            return s && s.level === lvl;
                          }).length;

                          const maxInLvl = lvl === 0 ? (currentProgression?.cantrips || 0) : (slots[lvl.toString()] || 0);

                          if (selectedInLvl >= maxInLvl) {
                            alert(`Você já atingiu o limite de magias para o ${lvl === 0 ? 'Truques' : lvl + 'º Nível'}!`);
                            return;
                          }
                          newSpells.push(id);
                        }
                        updateValue('spells', newSpells, true);
                      };

                      if (baseList.length === 0 && !isPreparing) {
                        return <p style={{ color: 'var(--fg3)', textAlign: 'center', padding: 24 }}>Nenhuma magia preparada para hoje.</p>;
                      }

                      const slots = character.spellSlots ? JSON.parse(character.spellSlots as string) : {};

                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => {
                            const lvlSpells = (baseList as any[]).filter(s => s.level === lvl);

                            if (lvlSpells.length === 0) return null;

                            const selectedInLvl = currentSpells.filter(id => {
                              const s = SPELLS.find(sp => sp.id === id);
                              return s && s.level === lvl;
                            }).length;

                            const maxInLvl = lvl === 0 ? (currentProgression?.cantrips || 0) : (slots[lvl.toString()] || 0);

                            return (
                              <div key={lvl}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 8 }}>
                                  <h3 style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 4, height: 12, background: 'var(--accent)', borderRadius: 2 }} />
                                    {lvl === 0 ? 'Truques' : `${lvl}º Nível`}
                                  </h3>
                                  <div style={{ fontSize: 11, fontWeight: 700, color: selectedInLvl > maxInLvl ? 'var(--error)' : 'var(--fg3)' }}>
                                    {selectedInLvl} / {maxInLvl} <span style={{ fontSize: 9, opacity: 0.7 }}>{isPreparing ? 'SELECIONADAS' : 'PREPARADAS'}</span>
                                  </div>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                  {lvlSpells.map((spell: any) => {
                                    const isSelected = currentSpells.includes(spell.id);
                                    return (
                                      <div 
                                        key={spell.id} 
                                        className="card" 
                                        onClick={() => isPreparing && toggleSpell(spell.id)}
                                        style={{ 
                                          padding: 16, 
                                          background: isSelected ? 'var(--bg2)' : 'rgba(255,255,255,0.02)',
                                          borderLeft: isSelected ? '3px solid var(--accent)' : '1px solid var(--border)',
                                          cursor: isPreparing ? 'pointer' : 'default',
                                          transition: 'all 0.2s',
                                          position: 'relative',
                                          overflow: 'hidden'
                                        }}
                                      >
                                        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                                          {isPreparing && (
                                            <div style={{ 
                                              width: 20, height: 20, borderRadius: 6, border: '2px solid var(--accent)',
                                              background: isSelected ? 'var(--accent)' : 'transparent',
                                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                                              flexShrink: 0
                                            }}>
                                              {isSelected && <Zap size={12} color="#fff" fill="#fff" />}
                                            </div>
                                          )}
                                          
                                          {spell.icon && (
                                            <div style={{
                                              flexShrink: 0, width: 40, height: 40, borderRadius: 8, overflow: 'hidden',
                                              border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)'
                                            }}>
                                              <Image
                                                src={`/assets/spells-icons/${spell.icon}`}
                                                alt={spell.name}
                                                width={40} height={40}
                                                style={{ objectFit: 'cover', opacity: isSelected ? 1 : 0.4 }}
                                              />
                                            </div>
                                          )}
                                          
                                          <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                              <div>
                                                <div style={{ fontWeight: 700, fontSize: 15, color: isSelected ? 'var(--fg)' : 'var(--fg3)' }}>{spell.name}</div>
                                                <div style={{ fontSize: 10, color: 'var(--accentL)', fontWeight: 600, textTransform: 'uppercase' }}>{spell.school}</div>
                                              </div>
                                              {!isPreparing && (
                                                <div style={{ fontSize: 9, color: 'var(--fg3)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>
                                                  {spell.range}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        {!isPreparing && (
                                          <>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10 }}>
                                              <div style={{ fontSize: 11 }}><span style={{ color: 'var(--fg3)' }}>Tempo:</span> {spell.castingTime}</div>
                                              <div style={{ fontSize: 11 }}><span style={{ color: 'var(--fg3)' }}>Duração:</span> {spell.duration}</div>
                                              {spell.concentration && <div style={{ fontSize: 9, background: '#fbbf24', color: '#000', padding: '1px 4px', borderRadius: 3, fontWeight: 800 }}>CONC.</div>}
                                            </div>
                                            <p style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{spell.description}</p>
                                          </>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {activeTab === 'inventory' && (
                  <div className="fade-up">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700 }}>Inventário</h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ padding: '4px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}>
                          <span style={{ color: 'var(--fgM)' }}>Peso Total: </span>
                          <span style={{ color: 'var(--accentL)', fontWeight: 700 }}>
                            {(() => {
                              const weight = (character.inventory as any[]).reduce((sum, entry) => {
                                const w = parseFloat(entry.item.weight) || 0;
                                return sum + (w * (entry.qty || 1));
                              }, 0);
                              return weight.toFixed(1);
                            })()} kg
                          </span>
                        </div>
                        {isOwner && (
                          <button
                            className="btn btn-primary"
                            style={{ padding: 8, height: 'auto' }}
                            onClick={() => setIsInventoryModalOpen(true)}
                          >
                            <Plus size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {character.inventory && Array.isArray(character.inventory) && character.inventory.length > 0 ? (
                        (character.inventory as any[]).map((entry: any, i: number) => (
                          <div
                            key={i}
                            className="card inventory-item-card"
                            onClick={() => setDetailItem(entry.item)}
                            style={{
                              padding: 12,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 12,
                              background: 'var(--bg2)',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              border: '1px solid var(--border)'
                            }}
                          >
                            <span style={{ fontSize: 24 }}>{entry.item.icon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.item.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{entry.item.category} • {entry.item.weight} kg</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              {entry.item.category === 'armor' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleEquip(i);
                                  }}
                                  style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: 6,
                                    border: '1px solid',
                                    borderColor: entry.isEquipped ? 'var(--accent)' : 'var(--border)',
                                    background: entry.isEquipped ? 'var(--accentGlow)' : 'transparent',
                                    color: entry.isEquipped ? 'var(--accentL)' : 'var(--fg3)',
                                    fontSize: 12,
                                    fontWeight: 900,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                  }}
                                  title={entry.isEquipped ? 'Equipado' : 'Equipar'}
                                >
                                  E
                                </button>
                              )}
                              <div style={{ fontWeight: 800, color: 'var(--accentL)', flexShrink: 0 }}>x{entry.qty}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'var(--fg3)', textAlign: 'center', padding: 24 }}>Seu inventário está vazio.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="fade-up">
                    <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Habilidades & Características</h2>

                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
                        {(() => {
                          const race = RACES.find(r => r.name === character.race);
                          const subTitle = race?.subRaceTitle || 'Sub-raça';
                          return (
                            <>
                              Raça: {character.race}
                              {character.subrace && (
                                <div style={{ fontSize: 13, color: 'var(--fg2)', textTransform: 'none', fontWeight: 500, marginTop: 4 }}>
                                  {subTitle}: {character.subrace}
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {RACES.find(r => r.name === character.race)?.traits.map((trait, i) => (
                          <div
                            key={i}
                            className="card clickable"
                            style={{ padding: 16, background: 'var(--bg2)', cursor: 'pointer', transition: 'transform 0.2s' }}
                            onClick={() => setDetailFeature({ ...trait, source: 'Raça', level: 1 })}
                          >
                            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{trait.name}</div>
                            <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                              {trait.description}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                    
                    {/* Background Feature */}
                    {(() => {
                      const backgroundName = character.background;
                      if (!backgroundName) return null;
                      
                      const bg = BACKGROUNDS.find(b => 
                        b.name.toLowerCase().trim() === backgroundName.toLowerCase().trim() ||
                        b.id.toLowerCase() === backgroundName.toLowerCase().trim()
                      );
                      
                      if (!bg) return null;
                      return (
                        <div style={{ marginBottom: 24 }}>
                          <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
                            Antecedente: {backgroundName}
                          </h3>
                          <div
                            className="card clickable"
                            style={{ padding: 16, background: 'var(--bg2)', borderLeft: '2px solid var(--border)', cursor: 'pointer', transition: 'transform 0.2s' }}
                            onClick={() => setDetailFeature({ ...bg.feature, source: 'Antecedente', level: 1 })}
                          >
                            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{bg.feature.name}</div>
                            <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                              {bg.feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })()}

                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
                        Classe: {character.class} {character.subclass ? ` - ${character.subclass}` : ''}
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Habilidades Nível 1 (De lib/classes) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {CLASS_LEVEL1_DATA[character.class]?.passiveFeatures.map((feat, i) => (
                            <div
                              key={i}
                              className="card clickable"
                              style={{ padding: 16, background: 'var(--bg2)', borderLeft: '2px solid var(--border)', cursor: 'pointer', transition: 'transform 0.2s' }}
                              onClick={() => setDetailFeature({ ...feat, source: 'Classe', level: 1 })}
                            >
                              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{feat.name}</div>
                              <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {feat.description}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Habilidades de Progressão (D&D 2024) */}
                        {Array.from({ length: character.level }).map((_, i) => {
                          const lvl = i + 1;
                          const classFeats = CLASS_PROGRESSION_2024[character.class]?.features[lvl] || [];

                          // Subclass features
                          let subFeats: any[] = [];
                          if (character.subclass && SUBCLASSES_2024[character.class]?.[character.subclass]) {
                            subFeats = SUBCLASSES_2024[character.class][character.subclass].features[lvl] || [];
                          }

                          if (classFeats.length === 0 && subFeats.length === 0) return null;

                          return (
                            <div key={lvl} style={{ marginTop: 8 }}>
                              <div style={{ fontSize: 10, fontWeight: 900, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 8 }}>
                                Nível {lvl}
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {classFeats.map((f, idx) => (
                                  <div
                                    key={idx}
                                    className="card clickable"
                                    style={{ padding: 16, background: 'var(--bg2)', borderLeft: '2px solid var(--accent)', cursor: 'pointer', transition: 'transform 0.2s' }}
                                    onClick={() => setDetailFeature({
                                      name: f,
                                      description: getFeatureDescription(f),
                                      source: 'Classe',
                                      level: lvl
                                    })}
                                  >
                                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{f}</div>
                                    <div style={{ fontSize: 11, color: 'var(--fg3)' }}>Classe Base</div>
                                  </div>
                                ))}
                                {subFeats.map((sf, idx) => (
                                  <div
                                    key={idx}
                                    className="card clickable"
                                    style={{ padding: 16, background: 'var(--accentGlow)', borderLeft: '3px solid var(--accent)', cursor: 'pointer', transition: 'transform 0.2s' }}
                                    onClick={() => setDetailFeature({ ...sf, source: character.subclass, level: lvl })}
                                  >
                                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--accentL)' }}>{sf.name}</div>
                                    <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                      {sf.description}
                                    </p>
                                    <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 4, fontWeight: 700 }}>{character.subclass}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Talentos (Feats) */}
                    {(() => {
                      const feats = parsedTraits?.feats || [];
                      if (feats.length === 0) return null;

                      return (
                        <div style={{ marginBottom: 24, marginTop: 24 }}>
                          <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
                            Talentos Selecionados
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {feats.map((feat: any, i: number) => (
                              <div
                                key={i}
                                className="card clickable"
                                style={{ padding: 16, background: 'var(--bg2)', borderLeft: '2px solid var(--ok)', cursor: 'pointer', transition: 'transform 0.2s' }}
                                onClick={() => setDetailFeature({ ...feat, source: 'Talento', level: '-' })}
                              >
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{feat.name}</div>
                                <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>
                                  {feat.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {activeTab === 'proficiencies' && (
                  <div className="fade-up">
                    <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Idiomas e Proficiências</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      
                      {/* Languages Card */}
                      <div className="card" style={{ padding: 20, background: 'var(--bg2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                          <Brain size={18} color="var(--accent)" />
                          <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>Idiomas</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {(() => {
                            const traitLangs = Array.isArray(parsedTraits?.languages) ? parsedTraits.languages : [];
                            const allLangs = [...new Set(['Comum', ...traitLangs])];
                            
                            // Adicionar Dracônico se for Draconato (automático)
                            if (character.race === 'Draconato' && !allLangs.includes('Dracônico')) {
                              allLangs.push('Dracônico');
                            }
                            
                            return allLangs.map((lang: string) => (
                              <div key={lang} style={{ 
                                background: 'rgba(var(--accent-rgb), 0.1)', 
                                border: '1px solid rgba(var(--accent-rgb), 0.2)',
                                padding: '4px 12px',
                                borderRadius: 20,
                                fontSize: 13,
                                color: 'var(--accentL)',
                                fontWeight: 600
                              }}>
                                {lang}
                              </div>
                            ));
                          })()}
                        </div>
                        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--fg3)' }}>
                          Personagens 2024 começam com Comum + 2 idiomas padrão à escolha.
                        </div>
                      </div>

                      {/* Equipment Proficiencies */}
                      <div className="card" style={{ padding: 20, background: 'var(--bg2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                          <Shield size={18} color="var(--accent)" />
                          <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>Equipamento</span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <div>
                            <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700 }}>Armaduras</div>
                            <div style={{ color: 'var(--fg2)', fontSize: 14, fontWeight: 700 }}>{characterClass?.armorProf || 'Nenhuma'}</div>
                            <div style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4, lineHeight: 1.4 }}>
                              {characterClass?.armorProf?.includes('pesadas') 
                                ? (
                                  <>
                                    <div style={{ marginBottom: 4 }}><strong>Leves/Médias:</strong> Couro, Acolchoada, Peitoral, Cota de Malha, Meia-Placa.</div>
                                    <div><strong>Pesadas:</strong> Cota de Anéis, Cotas de Talas, Placas (Full Plate).</div>
                                  </>
                                )
                                : characterClass?.armorProf?.includes('médias')
                                ? 'Leves (Couro, Acolchoada) e Médias (Gibão, Cota de Malha, Peitoral, Meia-Placa).'
                                : 'Apenas Armaduras Leves (Couro, Acolchoada, Couro Batido).'}
                            </div>
                          </div>
                          <div style={{ height: 1, background: 'var(--border)', opacity: 0.5 }} />
                          <div>
                            <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700 }}>Armas</div>
                            <div style={{ color: 'var(--fg2)', fontSize: 14, fontWeight: 700 }}>{characterClass?.weaponProf || 'Simples'}</div>
                             <div style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4, lineHeight: 1.4 }}>
                               {characterClass?.weaponProf?.includes('marciais') 
                                 ? (
                                   <>
                                     <div style={{ marginBottom: 4 }}><strong>Simples:</strong> Adaga, Clava, Lança, Maça, Bordão, Machadinha, Besta Leve, Arco Curto.</div>
                                     <div><strong>Marciais:</strong> Espada (Curta, Longa, Grande), Rapieira, Machado, Arco Longo, Besta (Pesada, Mão), Alabarda, Martelo de Guerra, Tridente, Chicote.</div>
                                   </>
                                 )
                                 : 'Adaga, Clava, Lança, Maça, Bordão, Machadinha, Besta Leve, Arco Curto.'}
                             </div>
                          </div>
                        </div>
                      </div>

                      {/* Tool Proficiencies */}
                      <div className="card" style={{ padding: 20, background: 'var(--bg2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                          <Settings size={18} color="var(--accent)" />
                          <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>Ferramentas</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                          {(() => {
                            // Extract tools from class or traits
                            const classTools = character.class === 'Artesão Arcano' ? ["Ferramentas de Ladrão", "Ferramentas de Funileiro", "1 Ferramenta de Artesão"] : [];
                            const traitTools = Array.isArray(parsedTraits?.tools) ? parsedTraits.tools : [];
                            const allTools = [...new Set([...classTools, ...traitTools])];
                            
                            if (allTools.length === 0) return <div style={{ fontSize: 13, color: 'var(--fg3)', fontStyle: 'italic' }}>Nenhuma ferramenta registrada.</div>;

                            return allTools.map((tool: string) => (
                              <div key={tool} style={{ 
                                background: 'var(--bg)', 
                                border: '1px solid var(--border)',
                                padding: '6px 12px',
                                borderRadius: 8,
                                fontSize: 13,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6
                              }}>
                                <Settings size={12} style={{ opacity: 0.5 }} />
                                {tool}
                              </div>
                            ));
                          })()}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {activeTab === 'companions' && (
                  <div className="fade-up">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 700, margin: 0 }}>Companheiros & Invocações</h2>
                      {isOwner && (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setNewCompanion({ ac: 10, maxHp: 10, hp: 10 });
                            setIsCompanionModalOpen(true);
                          }}
                          style={{ gap: 8 }}
                        >
                          <Plus size={18} /> Adicionar
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                      {parsedCompanions.map((comp) => (
                        <div key={comp.id} className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                          <div style={{ background: 'var(--bg2)', padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{comp.name}</h3>
                              <span style={{ fontSize: 11, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800 }}>{comp.type}</span>
                            </div>
                            {isOwner && (
                              <button
                                onClick={() => handleRemoveCompanion(comp.id)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--fg3)', cursor: 'pointer' }}
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>

                          <div style={{ padding: 20 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
                              <div style={{ textAlign: 'center', padding: 8, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>CA</div>
                                <div style={{ fontSize: 18, fontWeight: 800 }}>{comp.ac}</div>
                              </div>
                              <div style={{ textAlign: 'center', padding: 8, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>Desloc.</div>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>{comp.speed}</div>
                              </div>
                              <div style={{ textAlign: 'center', padding: 8, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>Percepção</div>
                                <div style={{ fontSize: 18, fontWeight: 800 }}>{comp.perception}</div>
                              </div>
                            </div>

                            <div style={{ marginBottom: 20 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg2)' }}>Pontos de Vida</span>
                                <span style={{ fontSize: 14, fontWeight: 800 }}>{comp.hp} / {comp.maxHp}</span>
                              </div>
                              <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
                                <div style={{
                                  width: `${(comp.hp / comp.maxHp) * 100}%`,
                                  height: '100%',
                                  background: comp.hp < comp.maxHp * 0.3 ? 'var(--accent)' : 'var(--ok)',
                                  transition: 'width 0.3s ease'
                                }} />
                              </div>
                              {isOwner && (
                                <div style={{ display: 'flex', gap: 8 }}>
                                  <button
                                    className="btn btn-outline"
                                    style={{ flex: 1, height: 32, fontSize: 12 }}
                                    onClick={() => handleUpdateCompanionHP(comp.id, -1)}
                                  >-1</button>
                                  <button
                                    className="btn btn-outline"
                                    style={{ flex: 1, height: 32, fontSize: 12 }}
                                    onClick={() => handleUpdateCompanionHP(comp.id, 1)}
                                  >+1</button>
                                </div>
                              )}
                            </div>

                            {comp.attacks && comp.attacks.length > 0 && (
                              <div style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Ataques</span>
                                {comp.attacks.map((atk, idx) => (
                                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8, border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                      <div style={{ fontWeight: 700, fontSize: 14 }}>{atk.name}</div>
                                      <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{atk.type}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                      <div style={{ color: 'var(--accentL)', fontWeight: 800 }}>{atk.bonus}</div>
                                      <div style={{ fontSize: 12, fontWeight: 700 }}>{atk.damage}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {comp.notes && (
                              <div style={{ marginTop: 16 }}>
                                <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Notas</span>
                                <p style={{ fontSize: 12, color: 'var(--fg2)', margin: '4px 0 0', lineHeight: 1.5 }}>{comp.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {parsedCompanions.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.01)', borderRadius: 16, border: '2px dashed var(--border)' }}>
                          <User size={48} color="var(--fg3)" style={{ marginBottom: 16, opacity: 0.5 }} />
                          <h3 style={{ margin: 0, color: 'var(--fg2)' }}>Nenhum companheiro</h3>
                          <p style={{ fontSize: 14, color: 'var(--fg3)', marginTop: 8 }}>Adicione pets, montarias ou espíritos invocados aqui.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'attributes' && (
                  <div className="attacks-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700 }}>Ataques</h2>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-outline" style={{ padding: 6 }}><Plus size={16} /></button>
                        <button className="btn btn-outline" style={{ padding: 6 }}><Settings size={16} /></button>
                      </div>
                    </div>
                    {/* Desktop Header */}
                    <div className="attacks-header hide-mobile">
                      <div className="col-atk">Ataque</div>
                      <div className="col-range">Alcance</div>
                      <div className="col-hit">Acerto / CD</div>
                      <div className="col-dmg">Dano</div>
                      <div className="col-info"></div>
                    </div>

                    <div className="attacks-list">
                      {/* Unarmed Strike */}
                      <div className="attack-row card">
                        <div className="col-atk">
                          <div className="atk-name">Ataque Desarmado</div>
                          <div className="atk-type">Corpo a corpo</div>
                        </div>
                        <div className="col-range">
                          <span className="mobile-label">Alcance: </span>
                          1.5 m
                        </div>
                        <div className="col-hit">
                          <div className="hit-badge">
                            {formatModifier(character.strength + character.proficiencyBonus - 10)} Ataque
                          </div>
                        </div>
                        <div className="col-dmg">
                          <div className="dmg-box">
                            <span className="dmg-value">{1 + calcModifier(character.strength)}</span>
                            <Sword size={12} color="var(--accentL)" />
                            <span className="dmg-type">Concussão</span>
                          </div>
                        </div>
                        <div className="col-info">
                          <button className="btn btn-ghost"><Info size={18} /></button>
                        </div>
                      </div>

                      {/* Weapons from Inventory */}
                      {parsedInventory
                        .filter(e => e.item.category === 'weapon')
                        .map((entry, idx) => {
                          const weapon = entry.item;
                          const isFinesse = weapon.properties?.toLowerCase().includes('acuidade');
                          const isRange = weapon.properties?.toLowerCase().includes('alcance') || (weapon.category === 'weapon' && (weapon.name.toLowerCase().includes('arco') || weapon.name.toLowerCase().includes('besta')));

                          let attackStat = character.strength;
                          if (isRange || (isFinesse && character.dexterity > character.strength)) {
                            attackStat = character.dexterity;
                          }

                          const toHit = calcModifier(attackStat) + character.proficiencyBonus;
                          const dmgMod = calcModifier(attackStat);
                          const dmgParts = weapon.properties?.split(',')[0].trim().split(' ');
                          const dice = dmgParts?.[0] || '1d4';
                          const type = dmgParts?.[1] || 'dano';
                          const rangeMatch = weapon.properties?.match(/alcance\s+([\d\/]+)\s*m/i);
                          const range = rangeMatch ? rangeMatch[1] + ' m' : (isRange ? 'Distância' : '1.5 m');

                          return (
                            <div key={idx} className="attack-row card">
                              <div className="col-atk">
                                <div className="atk-name">{weapon.name}</div>
                                <div className="atk-type">{isRange ? 'À Distância' : 'Corpo a corpo'}</div>
                              </div>
                              <div className="col-range">
                                <span className="mobile-label">Alcance: </span>
                                {range}
                              </div>
                              <div className="col-hit">
                                <div className="hit-badge">
                                  {toHit >= 0 ? `+${toHit}` : toHit} Ataque
                                </div>
                              </div>
                              <div className="col-dmg">
                                <div className="dmg-box">
                                  <span className="dmg-value">{dice}{dmgMod !== 0 ? (dmgMod > 0 ? `+${dmgMod}` : dmgMod) : ''}</span>
                                  <Sword size={12} color="var(--accentL)" />
                                  <span className="dmg-type">{type}</span>
                                </div>
                              </div>
                              <div className="col-info">
                                <button
                                  className="btn btn-ghost"
                                  onClick={() => setDetailItem(weapon)}
                                >
                                  <Info size={18} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Level Up Modal */}
      {isLevelUpModalOpen && character && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} />

          <div className="card fade-up" style={{ position: 'relative', width: '100%', maxWidth: 460, padding: 0, overflow: 'hidden', border: '1px solid var(--accent)' }}>
            {/* Header */}
            <div style={{ background: 'var(--accent)', padding: '24px 32px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: '50%' }}>
                  <TrendingUp size={32} color="#fff" className={isRolling ? 'animate-bounce' : ''} />
                </div>
              </div>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, color: '#fff' }}>Subir de Nível</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500 }}>{character.name} está ficando mais forte!</p>
            </div>

            <div style={{ padding: 32 }}>
              {/* Passo 0: Escolha do Ruleset (Se não houver) */}
              {levelUpStep === 0 && (
                <div className="fade-up">
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: 'var(--accentL)' }}>Versão das Regras</h3>
                  <p style={{ fontSize: 13, color: 'var(--fg3)', textAlign: 'center', marginBottom: 24 }}>Escolha qual versão do Player's Handbook seguir para este personagem.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                    <button
                      onClick={() => setSelectedRuleset('2024')}
                      style={{
                        padding: 16, borderRadius: 12, border: '2px solid',
                        borderColor: selectedRuleset === '2024' ? 'var(--accent)' : 'var(--border)',
                        background: selectedRuleset === '2024' ? 'var(--accentGlow)' : 'transparent',
                        textAlign: 'left', transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontWeight: 800, color: selectedRuleset === '2024' ? 'var(--accentL)' : 'var(--fg1)' }}>D&D 2024 (Revised)</div>
                      <p style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4 }}>Subclasses no nível 3, novas habilidades e equilíbrio atualizado.</p>
                    </button>

                    <button
                      onClick={() => setSelectedRuleset('2014')}
                      style={{
                        padding: 16, borderRadius: 12, border: '2px solid',
                        borderColor: selectedRuleset === '2014' ? 'var(--accent)' : 'var(--border)',
                        background: selectedRuleset === '2014' ? 'var(--accentGlow)' : 'transparent',
                        textAlign: 'left', transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontWeight: 800, color: selectedRuleset === '2014' ? 'var(--fg1)' : 'var(--fg1)' }}>D&D 2014 (Classic)</div>
                      <p style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4 }}>Progressão clássica das subclasses (Nível 1, 2 ou 3).</p>
                    </button>
                  </div>

                  <button
                    className="btn bg-accent"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={!selectedRuleset}
                    onClick={() => setLevelUpStep(1)}
                  >
                    Confirmar e Continuar
                  </button>
                </div>
              )}

              {levelUpStep === 1 && (
                <div className="fade-up">
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--accentL)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                      {character.level}
                      <ArrowRight size={32} color="var(--fg3)" style={{ margin: '0 4px' }} />
                      {character.level + 1}
                    </div>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--fg3)', fontWeight: 700, marginTop: 4 }}>Novo Nível</div>
                  </div>

                  <div className="card" style={{ background: 'var(--bg2)', padding: 16, marginBottom: 24 }}>
                    <h3 style={{ fontSize: 11, fontWeight: 800, color: 'var(--accentL)', textTransform: 'uppercase', marginBottom: 12 }}>Novas Características</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(() => {
                        const nextLevel = character.level + 1;
                        const classFeatures = CLASS_PROGRESSION_2024[character.class]?.features[nextLevel] || [];
                        const speciesFeatures = SPECIES_PROGRESSION_2024[character.race]?.[nextLevel] || [];

                        // Agregar features da subclasse se já possuir
                        let subclassFeatures: string[] = [];
                        if (character.subclass && SUBCLASSES_2024[character.class]?.[character.subclass]) {
                          subclassFeatures = SUBCLASSES_2024[character.class][character.subclass].features[nextLevel]?.map(f => f.name) || [];
                        }

                        const allFeatures = [...classFeatures, ...speciesFeatures, ...subclassFeatures];

                        // Proficiency check
                        const oldProf = getProficiencyBonus(character.level);
                        const newProf = getProficiencyBonus(nextLevel);
                        if (newProf > oldProf) allFeatures.unshift(`Bônus de Proficiência aumenta para +${newProf}!`);

                        if (allFeatures.length === 0) return <div style={{ fontSize: 13, color: 'var(--fg3)', fontStyle: 'italic' }}>Nenhuma característica automática este nível.</div>;

                        return allFeatures.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                            <Star size={14} color="var(--accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                            <span>{f}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  <button
                    className="btn bg-accent hover:bg-accent hover:scale-[1.02]"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => setLevelUpStep(2)}
                  >
                    Continuar
                  </button>
                </div>
              )}

              {levelUpStep === 2 && (
                <div className="fade-up">
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>Aumento de Pontos de Vida</h3>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
                    <button
                      onClick={() => setUseAverageHP(true)}
                      style={{
                        flex: 1, padding: 16, borderRadius: 12, border: '2px solid',
                        borderColor: useAverageHP ? 'var(--accent)' : 'var(--border)',
                        background: useAverageHP ? 'var(--accentGlow)' : 'transparent',
                        textAlign: 'center', transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: 20, fontWeight: 900, color: useAverageHP ? 'var(--accentL)' : 'var(--fg2)' }}>
                        {Math.floor(CLASS_PROGRESSION_2024[character.class]?.hitDie / 2) + 1}
                      </div>
                      <div style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: 'var(--fg3)' }}>Média</div>
                    </button>

                    <button
                      onClick={() => {
                        setUseAverageHP(false);
                        if (levelUpRoll === null && !isRolling) {
                          setIsRolling(true);
                          let count = 0;
                          const die = CLASS_PROGRESSION_2024[character.class]?.hitDie || 10;
                          const interval = setInterval(() => {
                            setLevelUpRoll(Math.floor(Math.random() * die) + 1);
                            count++;
                            if (count > 15) {
                              clearInterval(interval);
                              setIsRolling(false);
                            }
                          }, 60);
                        }
                      }}
                      style={{
                        flex: 1, padding: 16, borderRadius: 12, border: '2px solid',
                        borderColor: !useAverageHP && levelUpRoll !== null ? 'var(--accent)' : 'var(--border)',
                        background: !useAverageHP && levelUpRoll !== null ? 'var(--accentGlow)' : 'transparent',
                        textAlign: 'center', transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: 20, fontWeight: 900, color: !useAverageHP && levelUpRoll !== null ? 'var(--accentL)' : 'var(--fg2)' }}>
                        {isRolling ? '?' : (levelUpRoll || `d${CLASS_PROGRESSION_2024[character.class]?.hitDie}`)}
                      </div>
                      <div style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: 'var(--fg3)' }}>Rolar</div>
                    </button>
                  </div>

                  {(useAverageHP || levelUpRoll !== null) && !isRolling && (
                    <div className="card" style={{ background: 'var(--bg2)', padding: 12, textAlign: 'center', marginBottom: 24, animation: 'scale-up 0.3s ease-out' }}>
                      <div style={{ fontSize: 13, color: 'var(--fg2)' }}>
                        Ganho Total: <span style={{ fontWeight: 800, color: 'var(--accentL)' }}>
                          {(useAverageHP ? (Math.floor(CLASS_PROGRESSION_2024[character.class]?.hitDie / 2) + 1) : levelUpRoll!) + Math.floor((character.constitution - 10) / 2)} PV
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 2 }}>
                        ({useAverageHP ? 'Média' : 'Dado'} + Mod. CON)
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setLevelUpStep(1)}>Voltar</button>
                    <button
                      className="btn bg-accent"
                      style={{ flex: 2, justifyContent: 'center' }}
                      disabled={isRolling || (!useAverageHP && levelUpRoll === null)}
                      onClick={() => {
                        const hitDie = CLASS_PROGRESSION_2024[character.class]?.hitDie || 10;
                        const hpIncrease = (useAverageHP ? (Math.floor(hitDie / 2) + 1) : levelUpRoll!) + Math.floor((character.constitution - 10) / 2);
                        const finalIncrease = Math.max(1, hpIncrease);

                        const newLevel = character.level + 1;
                        const newMaxHp = character.maxHp + finalIncrease;
                        const newProf = getProficiencyBonus(newLevel);

                        const updated = {
                          ...character,
                          level: newLevel,
                          maxHp: newMaxHp,
                          currentHp: character.currentHp + finalIncrease,
                          proficiencyBonus: newProf,
                          ruleset: character.ruleset || selectedRuleset
                        };

                        // Determinar se precisa de Subclasse
                        const rulesetToUse = character.ruleset || selectedRuleset;
                        const needsSubclass = (rulesetToUse === '2024' && newLevel >= 3 && !character.subclass) ||
                          (rulesetToUse === '2014' && !character.subclass && (
                            (['Clérigo', 'Feiticeiro', 'Bruxo'].includes(character.class) && newLevel >= 1) ||
                            (['Druida', 'Mago'].includes(character.class) && newLevel >= 2) ||
                            (newLevel >= 3)
                          ));

                        const needsFeat = [4, 8, 12, 16, 19].includes(newLevel);

                        if (needsSubclass) {
                          setLevelUpStep(3); // Go to subclass selector
                          setCharacter(updated); // Save progress locally in state
                        } else if (needsFeat) {
                          setLevelUpStep(4); // Go to feat selector
                          setCharacter(updated);
                        } else {
                          // Final Save
                          handleLevelUpPersistence(updated, []);
                        }
                      }}
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* Passo 3: Escolha da Subclasse */}
              {levelUpStep === 3 && (
                <div className="fade-up">
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: 'var(--accentL)' }}>Escolha sua Subclasse</h3>
                  <p style={{ fontSize: 12, color: 'var(--fg3)', textAlign: 'center', marginBottom: 20 }}>Como {character.class}, você desbloqueou uma especialização!</p>

                  <div style={{ maxHeight: 300, overflowY: 'auto', paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {(() => {
                      const rulesetToUse = character.ruleset || selectedRuleset;
                      const options = rulesetToUse === '2024' ? Object.keys(SUBCLASSES_2024[character.class] || {}) : [];

                      if (options.length === 0) return <div style={{ textAlign: 'center', padding: 20, color: 'var(--fg3)' }}>Nenhuma subclasse cadastrada para {character.class} {rulesetToUse}.</div>;

                      return options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setSelectedSubclass(opt)}
                          style={{
                            padding: 12, borderRadius: 10, border: '1px solid',
                            borderColor: selectedSubclass === opt ? 'var(--accent)' : 'var(--border)',
                            background: selectedSubclass === opt ? 'var(--accentGlow)' : 'var(--bg2)',
                            textAlign: 'left', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 12
                          }}
                        >
                          <div style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: selectedSubclass === opt ? 'var(--accent)' : 'transparent',
                            border: '1px solid var(--accent)'
                          }} />
                          <span style={{ fontWeight: 600, color: selectedSubclass === opt ? 'var(--fg1)' : 'var(--fg2)' }}>{opt}</span>
                        </button>
                      ));
                    })()}
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setLevelUpStep(2)}>Voltar</button>
                    <button
                      className="btn bg-accent"
                      style={{ flex: 2, justifyContent: 'center' }}
                      disabled={!selectedSubclass}
                      onClick={() => {
                        const updated = {
                          ...character,
                          subclass: selectedSubclass,
                          ruleset: character.ruleset || selectedRuleset
                        };
                        const alerts = [`✨ Nova Subclasse: ${selectedSubclass}!`];
                        if ([4, 8, 12, 16, 19].includes(updated.level)) {
                          setLevelUpStep(4);
                          setCharacter(updated);
                        } else {
                          handleLevelUpPersistence(updated, alerts);
                        }
                      }}
                    >
                      Finalizar Level Up
                    </button>
                  </div>
                </div>
              )}

              {/* Passo 4: Escolha de Talento / ASI */}
              {levelUpStep === 4 && (
                <div className="fade-up">
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: 'var(--accentL)' }}>
                    {character.level === 19 ? 'Bênção Épica' : 'Melhoria de Atributo ou Talento'}
                  </h3>
                  <p style={{ fontSize: 12, color: 'var(--fg3)', textAlign: 'center', marginBottom: 20 }}>
                    Você atingiu o nível {character.level}! Escolha como seu personagem evoluiu.
                  </p>

                  <div style={{ maxHeight: 350, overflowY: 'auto', paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                    {(() => {
                      const available = FEATS_2024.filter(f => character.level >= f.minLevel);
                      const sorted = [...available].sort((a, b) => {
                        if (character.level === 19) {
                          if (a.category === 'Epic Boon' && b.category !== 'Epic Boon') return -1;
                          if (a.category !== 'Epic Boon' && b.category === 'Epic Boon') return 1;
                        }
                        return a.name.localeCompare(b.name);
                      });

                      return sorted.map(feat => (
                        <button
                          key={feat.id}
                          onClick={() => {
                            setSelectedFeatId(feat.id);
                            setFeatAttr1(null);
                            setFeatAttr2(null);
                          }}
                          style={{
                            padding: 12, borderRadius: 10, border: '1px solid',
                            borderColor: selectedFeatId === feat.id ? 'var(--accent)' : 'var(--border)',
                            background: selectedFeatId === feat.id ? 'var(--accentGlow)' : 'var(--bg2)',
                            textAlign: 'left', transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                            <span style={{ fontWeight: 800, color: selectedFeatId === feat.id ? 'var(--accentL)' : 'var(--fg1)' }}>{feat.name}</span>
                            <span style={{ fontSize: 9, opacity: 0.6, textTransform: 'uppercase' }}>{feat.category}</span>
                          </div>
                          <p style={{ fontSize: 11, color: 'var(--fg3)', margin: 0 }}>{feat.description}</p>
                          {feat.requirement && <p style={{ fontSize: 10, color: 'var(--accent)', marginTop: 4, fontStyle: 'italic' }}>Req: {feat.requirement}</p>}
                        </button>
                      ));
                    })()}
                  </div>

                  {selectedFeatId && (
                    <div className="card" style={{ background: 'var(--bg2)', padding: 16, marginBottom: 24, border: '1px solid var(--accent)' }}>
                      {selectedFeatId === 'asi' ? (
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>Escolha os Atributos (+2 ou +1/+1)</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <select 
                              className="input" 
                              style={{ width: '100%', padding: 8, fontSize: 12 }}
                              value={featAttr1 || ''}
                              onChange={e => setFeatAttr1(e.target.value)}
                            >
                              <option value="">Selecione o 1º Atributo (+1)</option>
                              {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
                            </select>
                            <select 
                              className="input" 
                              style={{ width: '100%', padding: 8, fontSize: 12 }}
                              value={featAttr2 || ''}
                              onChange={e => setFeatAttr2(e.target.value)}
                            >
                              <option value="">Selecione o 2º Atributo (+1)</option>
                              {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
                            </select>
                            <p style={{ fontSize: 10, color: 'var(--fg3)', textAlign: 'center', marginTop: 4 }}>Dica: Se escolher o mesmo duas vezes, ganha +2 nele.</p>
                          </div>
                        </div>
                      ) : (
                        FEATS_2024.find(f => f.id === selectedFeatId)?.description.includes('+1') && (
                          <div>
                            <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>Escolha o Atributo para aumentar (+1)</p>
                            <select 
                              className="input" 
                              style={{ width: '100%', padding: 8, fontSize: 12 }}
                              value={featAttr1 || ''}
                              onChange={e => setFeatAttr1(e.target.value)}
                            >
                              <option value="">Selecione o Atributo</option>
                              {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(a => (
                                <option key={a} value={a}>{a.toUpperCase()}</option>
                              ))}
                            </select>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setLevelUpStep(character.subclass ? 3 : 2)}>Voltar</button>
                    <button
                      className="btn bg-accent"
                      style={{ flex: 2, justifyContent: 'center' }}
                      disabled={!selectedFeatId || (selectedFeatId === 'asi' && (!featAttr1 || !featAttr2)) || (FEATS_2024.find(f => f.id === selectedFeatId)?.description.includes('+1') && !featAttr1)}
                      onClick={() => {
                        const feat = FEATS_2024.find(f => f.id === selectedFeatId)!;
                        const updatedAttrs = {
                          strength: (character.strength || 10) + (featAttr1 === 'strength' ? 1 : 0) + (featAttr2 === 'strength' ? 1 : 0),
                          dexterity: (character.dexterity || 10) + (featAttr1 === 'dexterity' ? 1 : 0) + (featAttr2 === 'dexterity' ? 1 : 0),
                          constitution: (character.constitution || 10) + (featAttr1 === 'constitution' ? 1 : 0) + (featAttr2 === 'constitution' ? 1 : 0),
                          intelligence: (character.intelligence || 10) + (featAttr1 === 'intelligence' ? 1 : 0) + (featAttr2 === 'intelligence' ? 1 : 0),
                          wisdom: (character.wisdom || 10) + (featAttr1 === 'wisdom' ? 1 : 0) + (featAttr2 === 'wisdom' ? 1 : 0),
                          charisma: (character.charisma || 10) + (featAttr1 === 'charisma' ? 1 : 0) + (featAttr2 === 'charisma' ? 1 : 0),
                        };

                        // Update traits
                        const currentTraits = typeof character.traits === 'string' ? JSON.parse(character.traits) : (character.traits || {});
                        const newTraits = {
                          ...currentTraits,
                          feats: [...(currentTraits.feats || []), { name: feat.name, description: feat.description }]
                        };

                        const updated = {
                          ...character,
                          ...updatedAttrs,
                          traits: newTraits
                        };

                        handleLevelUpPersistence(updated as Character, [`🎉 Novo Talento: ${feat.name}!`]);
                      }}
                    >
                      Finalizar Level Up
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Celebration Overlay */}
      {showCelebration && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 48, fontWeight: 900, color: 'var(--accent)', textShadow: '0 0 20px rgba(225,29,72,0.5)' }}>LEVEL UP!</h1>
            <p style={{ fontSize: 18, color: '#fff', fontWeight: 600 }}>Você alcançou o Nível {character.level}!</p>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {detailItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, backdropFilter: 'blur(8px)', padding: 20
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
                  <span style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800 }}>{detailItem.category}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {isOwner && (
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleRemoveInventoryItem(detailItem.name)}
                    style={{ padding: 8, borderRadius: '50%', color: 'var(--accent)' }}
                    title="Remover do Inventário"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                <button className="btn btn-ghost" onClick={() => setDetailItem(null)} style={{ padding: 8, borderRadius: '50%' }}>
                  <X size={20} />
                </button>
              </div>
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

              <button
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={() => setDetailItem(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Details Modal */}
      {detailFeature && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setDetailFeature(null)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 450,
            borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: 'var(--accent)', padding: 8, borderRadius: 10 }}>
                  <Star size={24} color="#fff" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>{detailFeature.name}</h3>
                  <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>
                    {detailFeature.source} {detailFeature.level ? `• Nível ${detailFeature.level}` : ''}
                  </span>
                </div>
              </div>
              <button className="btn btn-ghost" onClick={() => setDetailFeature(null)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Descrição da Habilidade</span>
                <p style={{
                  fontSize: 15,
                  color: 'var(--fg)',
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  background: 'rgba(255,255,255,0.02)',
                  padding: 16,
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {detailFeature.description || "Nenhuma descrição disponível."}
                </p>
              </div>

              <button
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={() => setDetailFeature(null)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Inventory Item Modal */}
      {isInventoryModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setIsInventoryModalOpen(false)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 450,
            maxHeight: '85vh', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: 'var(--accent)', padding: 8, borderRadius: 10 }}>
                  <Plus size={24} color="#fff" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>Adicionar Item</h3>
                  <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Catálogo de Itens</span>
                </div>
              </div>
              <button className="btn btn-ghost" onClick={() => setIsInventoryModalOpen(false)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '16px 24px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Buscar item por nome ou categoria..."
                  value={inventorySearchTerm}
                  onChange={(e) => setInventorySearchTerm(e.target.value)}
                  style={{
                    width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
                    padding: '12px 16px', borderRadius: 12, color: 'var(--fg)', fontSize: 14,
                    outline: 'none', transition: 'border-color 0.2s'
                  }}
                  autoFocus
                />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(() => {
                  const filtered = ITEM_CATALOG.filter(i =>
                    i.name.toLowerCase().includes(inventorySearchTerm.toLowerCase()) ||
                    i.category.toLowerCase().includes(inventorySearchTerm.toLowerCase())
                  );

                  if (filtered.length === 0) return <p style={{ textAlign: 'center', padding: 40, color: 'var(--fg3)', fontSize: 13 }}>Nenhum item encontrado.</p>;

                  return filtered.map((item, idx) => (
                    <div
                      key={idx}
                      className="card"
                      style={{
                        padding: 12, display: 'flex', alignItems: 'center', gap: 12,
                        background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ fontSize: 24 }}>{item.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{item.category} • {item.weight} kg</div>
                      </div>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: 11, height: 'auto' }}
                        onClick={() => {
                          handleAddInventoryItem(item);
                          setIsInventoryModalOpen(false);
                          setInventorySearchTerm('');
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showUpload && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setShowUpload(false)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 400,
            borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,1)',
            border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 18 }}>Alterar Avatar</h3>
              <button className="btn btn-ghost" onClick={() => setShowUpload(false)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: 32, textAlign: 'center' }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%', background: 'var(--bg)',
                margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px dashed var(--border)', position: 'relative', overflow: 'hidden'
              }}>
                {uploading ? <Loader2 className="animate-spin" size={40} color="var(--accent)" /> : <Upload size={40} color="var(--fg3)" />}
              </div>
              <p style={{ fontSize: 14, color: 'var(--fg2)', marginBottom: 24 }}>Escolha uma nova imagem para o seu personagem. Recomendamos imagens quadradas.</p>

              <label className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                {uploading ? 'Processando...' : 'Selecionar Arquivo'}
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Add Companion Modal */}
      {isCompanionModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setIsCompanionModalOpen(false)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 450,
            borderRadius: 16, overflow: 'visible', boxShadow: '0 20px 50px rgba(0,0,0,1)',
            border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>Novo Companheiro</h3>
              <button className="btn btn-ghost" onClick={() => setIsCompanionModalOpen(false)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>Nome</label>
                <input
                  type="text"
                  className="card"
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
                  placeholder="Ex: Faísca, o Lobo"
                  value={newCompanion.name || ''}
                  onChange={e => setNewCompanion({ ...newCompanion, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ position: 'relative' }}>
                  <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>Tipo / Classe</label>
                  <div style={{ position: 'relative' }}>
                    <div
                      className="card"
                      onClick={() => setIsCompTypeSelectOpen(!isCompTypeSelectOpen)}
                      style={{
                        width: '100%', padding: '10px 12px', background: 'var(--bg)',
                        border: '1px solid var(--border)', color: newCompanion.type ? 'var(--fg)' : 'var(--fg3)',
                        fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}
                    >
                      {newCompanion.type || 'Selecione...'}
                      <ChevronDown size={16} style={{ transform: isCompTypeSelectOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </div>

                    {isCompTypeSelectOpen && (
                      <div style={{
                        position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                        background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12,
                        zIndex: 100, overflowY: 'auto', maxHeight: '200px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        animation: 'fadeUp 0.2s ease-out'
                      }}>
                        {[
                          "Familiar", "Companheiro Primal", "Montaria Espiritual",
                          "Invocação", "Montaria", "Pet / Animal", "Outro"
                        ].map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              setNewCompanion({ ...newCompanion, type: opt });
                              setIsCompTypeSelectOpen(false);
                            }}
                            style={{
                              padding: '12px 16px', fontSize: 13, color: 'var(--fg2)',
                              cursor: 'pointer', transition: 'all 0.2s',
                              borderBottom: '1px solid rgba(255,255,255,0.03)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--accentGlow)';
                              e.currentTarget.style.color = 'var(--fg)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--fg2)';
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>CA</label>
                  <input
                    type="number"
                    className="card"
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
                    value={newCompanion.ac || 10}
                    onChange={e => setNewCompanion({ ...newCompanion, ac: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>HP Máximo</label>
                  <input
                    type="number"
                    className="card"
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
                    value={newCompanion.maxHp || 10}
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      setNewCompanion({ ...newCompanion, maxHp: val, hp: val });
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>Deslocamento</label>
                  <input
                    type="text"
                    className="card"
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
                    placeholder="Ex: 9m"
                    value={newCompanion.speed || ''}
                    onChange={e => setNewCompanion({ ...newCompanion, speed: e.target.value })}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{
                  width: '100%', marginTop: 8, justifyContent: 'center',
                  opacity: (newCompanion.name && newCompanion.type && newCompanion.ac !== undefined && newCompanion.maxHp !== undefined && newCompanion.speed) ? 1 : 0.5,
                  cursor: (newCompanion.name && newCompanion.type && newCompanion.ac !== undefined && newCompanion.maxHp !== undefined && newCompanion.speed) ? 'pointer' : 'not-allowed'
                }}
                disabled={!(newCompanion.name && newCompanion.type && newCompanion.ac !== undefined && newCompanion.maxHp !== undefined && newCompanion.speed)}
                onClick={() => handleAddCompanion(newCompanion)}
              >
                Criar Companheiro
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Attribute Edit Modal */}
      {isAttrModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setIsAttrModalOpen(false)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 450,
            borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,1)',
            border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: 'var(--accent)', padding: 8, borderRadius: 10 }}>
                  <TrendingUp size={20} color="#fff" />
                </div>
                <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>Editar Atributos</h3>
              </div>
              <button className="btn btn-ghost" onClick={() => setIsAttrModalOpen(false)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Força', key: 'strength' },
                  { label: 'Destreza', key: 'dexterity' },
                  { label: 'Constituição', key: 'constitution' },
                  { label: 'Inteligência', key: 'intelligence' },
                  { label: 'Sabedoria', key: 'wisdom' },
                  { label: 'Carisma', key: 'charisma' }
                ].map(attr => (
                  <div key={attr.key}>
                    <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>{attr.label}</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        className="card"
                        style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 16, fontWeight: 700 }}
                        value={(editingAttrs as any)[attr.key]}
                        onChange={e => {
                          let val = parseInt(e.target.value) || 0;
                          if (val > 20) val = 20;
                          if (val < 1 && e.target.value !== '') val = 1;
                          setEditingAttrs({ ...editingAttrs, [attr.key]: val });
                        }}
                      />
                      <div style={{ fontSize: 14, color: 'var(--accentL)', fontWeight: 700, width: 40 }}>
                        {formatModifier((editingAttrs as any)[attr.key])}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 8, padding: 12, background: 'rgba(225,29,72,0.05)', borderRadius: 8, border: '1px solid rgba(225,29,72,0.1)', fontSize: 12, color: 'var(--fg2)' }}>
                ℹ️ Alterar os atributos base atualizará automaticamente seus modificadores, perícias e salvaguardas.
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 8, justifyContent: 'center', height: 48, fontSize: 16 }}
                onClick={handleSaveAttributes}
              >
                Salvar Atributos
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .inventory-item-card:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: var(--accent) !important;
          transform: translateY(-2px);
        }

        /* Attacks Section Visual Improvements */
        .attacks-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeUp 0.3s ease-out;
        }

        .attacks-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 1.5fr 40px;
          padding: 8px 16px;
          border-bottom: 1px solid var(--border);
          color: var(--fgM);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .attack-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 1.5fr 40px;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg2);
          border: 1px solid var(--border);
          gap: 12px;
          transition: all 0.2s ease;
          position: relative;
        }

        .attack-row:hover {
          background: var(--card2);
          border-color: var(--accent);
          transform: scale(1.01);
          z-index: 10;
        }

        .atk-name {
          font-weight: 700;
          font-size: 15px;
          color: var(--fg);
        }

        .atk-type {
          font-size: 11px;
          color: var(--fgM);
        }

        .col-range {
          font-size: 13px;
          color: var(--fg2);
        }

        .hit-badge {
          background: var(--accentGlow);
          color: var(--accentL);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid rgba(225, 29, 72, 0.3);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 90px;
        }

        .dmg-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.03);
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--border);
        }

        .dmg-value {
          font-weight: 800;
          font-size: 14px;
          color: var(--fg);
        }

        .dmg-type {
          font-size: 11px;
          color: var(--fg3);
          text-transform: capitalize;
        }

        .mobile-label {
          display: none;
        }

        @media (max-width: 768px) {
          .attack-row {
            grid-template-columns: 1fr 1fr;
            padding: 20px;
            gap: 16px;
          }

          .col-atk {
            grid-column: 1 / -1;
            border-bottom: 1px solid var(--border);
            padding-bottom: 12px;
            margin-bottom: 4px;
          }

          .atk-name {
            font-size: 18px;
          }

          .col-range {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 14px;
            color: var(--fg2);
          }

          .mobile-label {
            display: inline-block;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--fg3);
            margin-right: 4px;
          }

          .col-hit {
            grid-column: 1 / 2;
          }

          .col-dmg {
            grid-column: 2 / 3;
          }

          .col-info {
            position: absolute;
            top: 15px;
            right: 15px;
          }

          .hit-badge {
            width: 100%;
            height: 48px;
            font-size: 14px;
          }

          .dmg-box {
            width: 100%;
            height: 48px;
            justify-content: center;
          }
          
          .dmg-value {
            font-size: 16px;
          }
        }

        /* Attributes Section Improvements */
        .attributes-tab-container {
          display: flex;
          flex-direction: column;
        }

        .attributes-tab-container .resources-section { order: 1; margin-bottom: 24px; }
        .attributes-tab-container .attr-title { order: 2; margin-bottom: 20px; font-family: 'Cinzel', serif; font-size: 24px; font-weight: 700; }
        .attributes-tab-container .attr-grid-container { order: 3; margin-bottom: 24px; }
        .attributes-tab-container .combat-stats-row { order: 4; margin-top: 12px; }

        .combat-stats-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 24px;
          padding: 20px;
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          flex: 1;
          max-width: 180px;
        }

        .stat-label {
          font-size: 10px;
          color: var(--fgM);
          font-weight: 700;
          text-transform: uppercase;
          text-align: center;
          letter-spacing: 0.05em;
          height: 14px; /* Ensure labels have same height */
        }

        .stat-value-box {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
        }

        .stat-value-box:hover {
          border-color: var(--accent);
          box-shadow: 0 0 15px var(--accentGlow);
        }

        .stat-value {
          font-size: 36px;
          font-weight: 900;
          color: var(--fg);
          line-height: 1;
        }

        .stat-subtext {
          font-size: 10px;
          color: var(--fgM);
          text-align: center;
          width: 100%;
          line-height: 1.4;
          min-height: 14px; /* Space for subtext even if empty */
        }

        .section-subtitle {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          margin-bottom: 12px;
          color: var(--accentL);
        }

        @media (max-width: 768px) {
          .attributes-tab-container .combat-stats-row { 
            order: 1; 
            margin-top: 0;
            margin-bottom: 24px;
            background: linear-gradient(to bottom right, rgba(225,29,72,0.08), transparent);
          }
          .attributes-tab-container .resources-section { order: 2; }
          .attributes-tab-container .attr-title { order: 3; }
          .attributes-tab-container .attr-grid-container { order: 4; }

          .combat-stats-row {
            padding: 20px 16px;
            gap: 16px;
          }

          .stat-value {
            font-size: 32px;
          }
          
          .stat-value-box {
            padding: 8px 0;
          }
        }
      `}</style>
    </div>
  )
}
