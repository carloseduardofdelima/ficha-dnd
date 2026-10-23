'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { pdf } from '@react-pdf/renderer'
import { Character, Companion, Defense, formatModifier, calcModifier } from '@/types/character'
import { calculateAC, calculateEffectiveStats } from '@/lib/dnd-rules'
import { CLASSES } from '@/lib/classes'
import { CLASSES_2014 } from '@/lib/classes-2014'
import { CLASS_PROGRESSION_2024, getProficiencyBonus, SPECIES_PROGRESSION_2024 } from '@/lib/dnd-progression-2024'
import { SUBCLASSES_2014 } from '@/lib/dnd-subclasses-2014'
import { SUBCLASSES_2024 } from '@/lib/dnd-subclasses-2024'
import { SPELLS, ALL_SPELLS, getSpellSlots, SPELLS_2014 } from '@/lib/spells'
import { ITEM_CATALOG } from '@/lib/inventory'
import { ITEM_CATALOG_2014 } from '@/lib/inventory-2014'
import { compressImage, uploadImageToStorage } from '@/lib/image'
import CharacterPDF from '@/components/CharacterPDF'
import { BeastForm } from '@/lib/beast-forms'
import { SUBCLASS_EXCLUDED_FEATURES_2014 } from '../utils/subclass-spells'
import { getCharacterPayloadString } from '../utils/character-payload'

export interface CharacterSheetContextType {
  id: string
  character: Character | null
  setCharacter: React.Dispatch<React.SetStateAction<Character | null>>
  loading: boolean
  isOwner: boolean
  isAdmin: boolean
  saveStatus: 'saved' | 'saving' | 'error'
  setSaveStatus: React.Dispatch<React.SetStateAction<'saved' | 'saving' | 'error'>>
  activeTab: string
  setActiveTab: (tab: string) => void
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void

  // Parsed memos
  parsedTraits: any
  expertises: Record<string, boolean>
  parsedSkills: Record<string, boolean>
  parsedDefenses: Defense[]
  parsedInventory: any[]
  parsedCompanions: Companion[]
  parsedSpells: string[]
  parsedSpellSlots: Record<string, number>
  parsedResources: Record<string, number>

  // Derived stats
  effectiveStats: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  attributes: Array<{
    name: string
    score: number
    mod: string
    save: string | number
  }>
  proficientSaves: string[]
  hp: { current: number; max: number }
  ac: number
  speed: number
  initiative: string | number
  profBonus: string | number
  progressionData: any[]
  currentProgression: any
  totalCantripsSelected: number
  totalLeveledSpellsSelected: number

  // Core Actions
  updateValue: (field: string, deltaOrVal: any, autoSave?: boolean) => void
  saveCharacterToDB: (char: Character) => Promise<void>
  toggleInspiration: () => Promise<void>
  handleLevelUpPersistence: (updatedChar: Character, alerts: string[]) => Promise<void>
  handleSelectSubclassDirectly: (subclassName: string) => Promise<void>
  handleAddFeat: (feat: { name: string; description: string; source?: string }) => Promise<void>
  handleRemoveFeat: (featName: string) => Promise<void>
  handleAddInventoryItem: (item: any) => Promise<void>
  handleRemoveInventoryItem: (itemName: string) => Promise<void>
  toggleEquip: (index: number) => void
  handleAddCompanion: (comp: Partial<Companion>) => void
  handleRemoveCompanion: (compId: string) => void
  handleUpdateCompanionHP: (compId: string, delta: number) => void
  handleSaveAttributes: () => void
  handleOpenPDF: () => Promise<void>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>

  // Local/UI states
  isClient: boolean
  pdfLoading: boolean

  // Modals state
  isLevelUpModalOpen: boolean
  setIsLevelUpModalOpen: (open: boolean) => void
  isProgressionModalOpen: boolean
  setIsProgressionModalOpen: (open: boolean) => void
  levelUpStep: number
  setLevelUpStep: (step: number) => void
  levelUpRoll: number | null
  setLevelUpRoll: (roll: number | null) => void
  isRolling: boolean
  setIsRolling: (rolling: boolean) => void
  useAverageHP: boolean
  setUseAverageHP: (useAvg: boolean) => void
  showCelebration: boolean
  setShowCelebration: (show: boolean) => void

  selectedRuleset: '2014' | '2024' | '5e-custom' | null
  setSelectedRuleset: (ruleset: '2014' | '2024' | '5e-custom' | null) => void
  selectedSubclass: string | null
  setSelectedSubclass: (subclass: string | null) => void
  isSubclassModalOpen: boolean
  setIsSubclassModalOpen: (open: boolean) => void
  tempSubclass: string | null
  setTempSubclass: (subclass: string | null) => void

  selectedFeatId: string | null
  setSelectedFeatId: (id: string | null) => void
  featAttr1: string | null
  setFeatAttr1: (attr: string | null) => void
  featAttr2: string | null
  setFeatAttr2: (attr: string | null) => void

  isDraconicModalOpen: boolean
  setIsDraconicModalOpen: (open: boolean) => void
  selectedAncestry: string | null
  setSelectedAncestry: (ancestry: string | null) => void

  selectedInvocations: string[]
  setSelectedInvocations: React.Dispatch<React.SetStateAction<string[]>>
  selectedFightingStyle: string | null
  setSelectedFightingStyle: (style: string | null) => void
  selectedPactBoon: string | null
  setSelectedPactBoon: (boon: string | null) => void
  selectedMetamagics: string[]
  setSelectedMetamagics: React.Dispatch<React.SetStateAction<string[]>>
  selectedInfusions: string[]
  setSelectedInfusions: React.Dispatch<React.SetStateAction<string[]>>

  showUpload: boolean
  setShowUpload: (show: boolean) => void
  uploading: boolean
  uploadSuccess: boolean

  detailItem: any | null
  setDetailItem: (item: any | null) => void
  detailFeature: any | null
  setDetailFeature: (feature: any | null) => void
  selectedBeast: BeastForm | null
  setSelectedBeast: (beast: BeastForm | null) => void

  isAttrModalOpen: boolean
  setIsAttrModalOpen: (open: boolean) => void
  editingAttrs: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  setEditingAttrs: React.Dispatch<React.SetStateAction<{
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }>>

  isInventoryModalOpen: boolean
  setIsInventoryModalOpen: (open: boolean) => void
  isCustomItemModalOpen: boolean
  setIsCustomItemModalOpen: (open: boolean) => void
  customItem: { name: string; description: string; weight: number; category: any; icon: string }
  setCustomItem: React.Dispatch<React.SetStateAction<{ name: string; description: string; weight: number; category: any; icon: string }>>
  inventorySearchTerm: string
  setInventorySearchTerm: (term: string) => void

  isFeatModalOpen: boolean
  setIsFeatModalOpen: (open: boolean) => void
  featSearchTerm: string
  setFeatSearchTerm: (term: string) => void

  isCompanionModalOpen: boolean
  setIsCompanionModalOpen: (open: boolean) => void
  newCompanion: Partial<Companion>
  setNewCompanion: React.Dispatch<React.SetStateAction<Partial<Companion>>>
  isCompTypeSelectOpen: boolean
  setIsCompTypeSelectOpen: (open: boolean) => void

  isPreparing: boolean
  setIsPreparing: (prep: boolean) => void
  ekSchoolFilter: boolean
  setEkSchoolFilter: (filter: boolean) => void
}

const CharacterSheetContext = createContext<CharacterSheetContextType | null>(null)

export function CharacterSheetProvider({ children }: { children: React.ReactNode }) {
  const { id: rawId } = useParams()
  const id = Array.isArray(rawId) ? rawId[0] : (rawId || '')
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('combat')
  const lastSavedPayloadRef = useRef<string>("")

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)

  // Companion States
  const [isCompanionModalOpen, setIsCompanionModalOpen] = useState(false)
  const [newCompanion, setNewCompanion] = useState<Partial<Companion>>({})
  const [isCompTypeSelectOpen, setIsCompTypeSelectOpen] = useState(false)

  // Level Up States
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const [isProgressionModalOpen, setIsProgressionModalOpen] = useState(false)
  const [levelUpStep, setLevelUpStep] = useState(1)
  const [levelUpRoll, setLevelUpRoll] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [useAverageHP, setUseAverageHP] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved')
  const [isPreparing, setIsPreparing] = useState(false)
  const [ekSchoolFilter, setEkSchoolFilter] = useState(true)

  const [selectedRuleset, setSelectedRuleset] = useState<'2014' | '2024' | '5e-custom' | null>(null)
  const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null)
  const [isSubclassModalOpen, setIsSubclassModalOpen] = useState(false)
  const [tempSubclass, setTempSubclass] = useState<string | null>(null)
  const [selectedFeatId, setSelectedFeatId] = useState<string | null>(null)
  const [featAttr1, setFeatAttr1] = useState<string | null>(null)
  const [featAttr2, setFeatAttr2] = useState<string | null>(null)
  const [isDraconicModalOpen, setIsDraconicModalOpen] = useState(false)
  const [selectedAncestry, setSelectedAncestry] = useState<string | null>(null)
  const [selectedInvocations, setSelectedInvocations] = useState<string[]>([])
  const [selectedFightingStyle, setSelectedFightingStyle] = useState<string | null>(null)
  const [selectedPactBoon, setSelectedPactBoon] = useState<string | null>(null)
  const [selectedMetamagics, setSelectedMetamagics] = useState<string[]>([])
  const [selectedInfusions, setSelectedInfusions] = useState<string[]>([])

  // Upload Avatar
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // Details
  const [detailItem, setDetailItem] = useState<any | null>(null)
  const [detailFeature, setDetailFeature] = useState<any | null>(null)
  const [selectedBeast, setSelectedBeast] = useState<BeastForm | null>(null)

  // Attributes edit modal
  const [isAttrModalOpen, setIsAttrModalOpen] = useState(false)
  const [editingAttrs, setEditingAttrs] = useState({
    strength: 0, dexterity: 0, constitution: 0,
    intelligence: 0, wisdom: 0, charisma: 0
  })

  // Inventory Modals
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false)
  const [isCustomItemModalOpen, setIsCustomItemModalOpen] = useState(false)
  const [customItem, setCustomItem] = useState({ name: '', description: '', weight: 0, category: 'misc' as any, icon: '📦' })
  const [inventorySearchTerm, setInventorySearchTerm] = useState('')

  // Feats Modal
  const [isFeatModalOpen, setIsFeatModalOpen] = useState(false)
  const [featSearchTerm, setFeatSearchTerm] = useState('')

  const [isClient, setIsClient] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)

  // Parsed traits and items
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

  // Save Character to DB
  const saveCharacterToDB = async (char: Character) => {
    const currentPayloadStr = getCharacterPayloadString(char)
    if (currentPayloadStr === lastSavedPayloadRef.current) {
      console.log("Salvar cancelado: Nenhuma alteração detectada em relação ao último salvamento.")
      setSaveStatus('saved')
      return
    }
    setSaveStatus('saving')
    try {
      const payload = {
        ...char,
        skills: typeof char.skills === 'object' ? JSON.stringify(char.skills) : char.skills,
        inventory: typeof char.inventory === 'object' ? JSON.stringify(char.inventory) : char.inventory,
        spells: typeof char.spells === 'object' ? JSON.stringify(char.spells) : char.spells,
        traits: typeof char.traits === 'object' ? JSON.stringify(char.traits) : char.traits,
        defenses: typeof (char as any).defenses === 'object' ? JSON.stringify((char as any).defenses) : (char as any).defenses,
        companions: typeof char.companions === 'object' ? JSON.stringify(char.companions) : char.companions,
      } as any

      if (!payload.proficiencyBonus) payload.proficiencyBonus = char.proficiencyBonus

      const res = await fetch(`/api/personagens/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setSaveStatus('saved')
        lastSavedPayloadRef.current = currentPayloadStr
      } else {
        setSaveStatus('error')
      }
    } catch (err) {
      console.error(err)
      setSaveStatus('error')
    }
  }

  // Update single field with local cache & optional autosave
  const updateValue = (field: string, deltaOrVal: any, autoSave = true) => {
    if (!character) return
    let newVal: any
    if (typeof deltaOrVal === 'number' && typeof (character as any)[field] === 'number') {
      newVal = Math.max(0, ((character as any)[field] || 0) + deltaOrVal)
    } else {
      newVal = deltaOrVal
    }
    const updatedChar = { ...character, [field]: newVal }
    setCharacter(updatedChar)

    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}')
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        [field]: newVal,
        lastModified: Date.now()
      }))
    } catch (e) {
      console.error('Error updating local cache', e)
    }
  }

  // Derived Stats Sync & Debounced Autosave
  useEffect(() => {
    if (!character || loading) return

    const inventory = Array.isArray(character.inventory)
      ? character.inventory
      : (character.inventory ? JSON.parse(character.inventory as string) : [])

    const calculatedAC = calculateAC(character.class, {
      strength: character.strength,
      dexterity: character.dexterity,
      constitution: character.constitution,
      intelligence: character.intelligence,
      wisdom: character.wisdom,
      charisma: character.charisma
    }, inventory, { ...parsedTraits, selectedInfusions, level: character.level })

    if (calculatedAC !== character.armorClass) {
      setCharacter(prev => prev ? { ...prev, armorClass: calculatedAC } : null)
      return
    }

    const timer = setTimeout(() => {
      saveCharacterToDB(character)
    }, 2000)

    return () => clearTimeout(timer)
  }, [
    character?.strength, character?.dexterity, character?.constitution,
    character?.intelligence, character?.wisdom, character?.charisma,
    character?.inventory, character?.currentHp, character?.maxHp,
    character?.spellSlots, character?.resources, character?.notes,
    character?.level, character?.class, character?.spells,
    character?.traits, character?.backstory, character?.appearance,
    character?.personalityTraits, character?.ideals, character?.bonds, character?.flaws,
    character?.inspiration, selectedInfusions
  ])

  // Spell Progression for Current Level
  const currentProgression = useMemo(() => {
    if (!character) return null
    const modifiers = {
      strength: calcModifier(character.strength),
      dexterity: calcModifier(character.dexterity),
      constitution: calcModifier(character.constitution),
      intelligence: calcModifier(character.intelligence),
      wisdom: calcModifier(character.wisdom),
      charisma: calcModifier(character.charisma)
    }
    return getSpellSlots(character.class, character.level, (character.ruleset as any) || '2024', modifiers, character.subclass || undefined)
  }, [character?.class, character?.level, character?.subclass, character?.ruleset, character?.strength, character?.dexterity, character?.constitution, character?.intelligence, character?.wisdom, character?.charisma])

  // Progression Data for levels 1-20
  const progressionData = useMemo(() => {
    if (!character) return []
    const is2014 = (character.ruleset === '2014' || character.ruleset === '5e-custom')

    const classData = is2014
      ? CLASSES_2014.find(c => c.name === character.class)
      : CLASS_PROGRESSION_2024[character.class]

    const subclassData = is2014
      ? SUBCLASSES_2014[character.class]?.[character.subclass || '']
      : SUBCLASSES_2024[character.class]?.[character.subclass || '']

    const raceProgression = !is2014 ? SPECIES_PROGRESSION_2024[character.race] : null

    const hitDieValue = is2014
      ? parseInt(String((classData as any)?.hitDie || 'd8').replace('d', ''))
      : (classData as any)?.hitDie || 8

    const conMod = Math.floor(((character.constitution || 10) - 10) / 2)

    const levels = []
    for (let i = 1; i <= 20; i++) {
      const levelFeatures: string[] = []

      if (is2014) {
        (classData as any)?.features
          ?.filter((f: any) => f.level === i)
          .forEach((f: any) => {
            if (!SUBCLASS_EXCLUDED_FEATURES_2014.has(f.name)) {
              levelFeatures.push(f.name)
            }
          })
      } else {
        (classData as any)?.features[i]?.forEach((f: string) => levelFeatures.push(f))
      }

      if (subclassData) {
        subclassData.features[i]?.forEach(f => levelFeatures.push(f.name))
      }

      if (raceProgression?.[i]) {
        raceProgression[i].forEach(f => levelFeatures.push(f))
      }

      let hpAtLevel = hitDieValue + conMod
      if (i > 1) {
        hpAtLevel += (i - 1) * (Math.floor(hitDieValue / 2) + 1 + conMod)
      }

      const pb = is2014 ? Math.floor((i - 1) / 4) + 2 : getProficiencyBonus(i)

      levels.push({
        level: i,
        features: levelFeatures,
        hp: Math.max(i, hpAtLevel),
        pb: pb
      })
    }
    return levels
  }, [character?.class, character?.subclass, character?.race, character?.ruleset, character?.constitution, character?.strength, character?.dexterity, character?.intelligence, character?.wisdom, character?.charisma])

  const totalCantripsSelected = useMemo(() => {
    if (!parsedSpells) return 0
    const list = (character?.ruleset === '2014' || character?.ruleset === '5e-custom') ? SPELLS_2014 : SPELLS
    return parsedSpells
      .filter(id => list.some(s => s.id === id))
      .map(id => ALL_SPELLS.find(s => s.id === id))
      .filter(s => s?.level === 0).length
  }, [parsedSpells, character?.ruleset])

  const totalLeveledSpellsSelected = useMemo(() => {
    if (!parsedSpells) return 0
    const list = (character?.ruleset === '2014' || character?.ruleset === '5e-custom') ? SPELLS_2014 : SPELLS
    return parsedSpells
      .filter(id => list.some(s => s.id === id))
      .map(id => ALL_SPELLS.find(s => s.id === id))
      .filter(s => s && s.level > 0).length
  }, [parsedSpells, character?.ruleset])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab, levelUpStep])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`selected_metamagic_${id}`)
      if (saved) {
        try {
          setSelectedMetamagics(JSON.parse(saved))
        } catch (e) {
          console.error('Error loading metamagics:', e)
        }
      }
    }
  }, [id])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`selected_infusions_${id}`)
      if (saved) {
        try {
          setSelectedInfusions(JSON.parse(saved))
        } catch (e) {
          console.error('Error loading infusions:', e)
        }
      }
    }
  }, [id])

  // Load Character from DB / Local Sync
  useEffect(() => {
    setIsClient(true)
    if (!id) return
    fetch(`/api/personagens/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          try {
            const localDataRaw = localStorage.getItem(`char_stats_${id}`)
            if (localDataRaw) {
              const local = JSON.parse(localDataRaw)
              const dbUpdatedAt = new Date(data.updatedAt).getTime()
              const localUpdatedAt = local.lastModified || 0

              if (localUpdatedAt > dbUpdatedAt) {
                console.log("Sincronizando: Usando dados locais mais recentes.")
                data.currentHp = local.currentHp ?? data.currentHp
                data.maxHp = local.maxHp ?? data.maxHp
                data.level = local.level ?? data.level
                data.exp = local.exp ?? data.exp
                data.spellSlots = local.spellSlots ?? data.spellSlots
                data.resources = local.resources ?? data.resources

                if (local.inventory) {
                  data.inventory = (data.inventory as any[]).map((dbItem: any, idx: number) => {
                    const currentCatalog = (data.ruleset === '2014' || data.ruleset === '5e-custom') ? ITEM_CATALOG_2014 : ITEM_CATALOG
                    const catalogItem = currentCatalog.find(i => i.id === dbItem.item.id || i.name === dbItem.item.name)
                    return {
                      ...dbItem,
                      item: { ...catalogItem, ...dbItem.item },
                      isEquipped: !!local.inventory[idx]?.isEquipped
                    }
                  })
                }
              } else {
                console.log("Sincronizando: Dados do servidor estão atualizados.")
              }
            }
          } catch (e) {
            console.error('Erro na sincronização de segurança:', e)
          }
          setCharacter(data)
          lastSavedPayloadRef.current = getCharacterPayloadString(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const characterClass = character
    ? ((character.ruleset === '2014' || character.ruleset === '5e-custom')
        ? CLASSES_2014.find(c => c.name === character.class)
        : CLASSES.find(c => c.name === character.class))
    : null

  const proficientSaves = characterClass?.savingThrows || []

  const effectiveStats = character
    ? calculateEffectiveStats({
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charisma: character.charisma
      }, (character.inventory as any[]) || [])
    : { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 }

  const attributes = [
    {
      name: 'Força',
      score: effectiveStats.strength,
      mod: formatModifier(effectiveStats.strength),
      save: (() => {
        const mod = calcModifier(effectiveStats.strength)
        const isProficient = proficientSaves.includes('Força')
        const bonus = isProficient && character ? character.proficiencyBonus : 0
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
        const bonus = isProficient && character ? character.proficiencyBonus : 0
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
        const bonus = isProficient && character ? character.proficiencyBonus : 0
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
        const bonus = isProficient && character ? character.proficiencyBonus : 0
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
        const bonus = isProficient && character ? character.proficiencyBonus : 0
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
        const bonus = isProficient && character ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
  ]

  const hp = { current: character?.currentHp ?? 10, max: character?.maxHp ?? 10 }
  const ac = character ? calculateAC(character.class, {
    strength: character.strength,
    dexterity: character.dexterity,
    constitution: character.constitution,
    intelligence: character.intelligence,
    wisdom: character.wisdom,
    charisma: character.charisma
  }, parsedInventory, { ...parsedTraits, selectedInfusions, level: character.level }) : 10

  const speed = character?.speed ?? 30
  const initiative = character ? (character.initiative >= 0 ? `+${character.initiative}` : character.initiative) : 0
  const profBonus = character ? (character.proficiencyBonus >= 0 ? `+${character.proficiencyBonus}` : character.proficiencyBonus) : '+2'
  const isOwner = !!(character && (character.isOwner || character.isAdmin))
  const isAdmin = !!character?.isAdmin

  const toggleInspiration = async () => {
    if (!character || !isOwner) return
    const nextVal = !character.inspiration
    updateValue('inspiration', nextVal, true)
  }

  const handleAddInventoryItem = async (item: any) => {
    if (!character) return
    const currentInv = Array.isArray(character.inventory) ? character.inventory : parsedInventory
    const existingIdx = currentInv.findIndex((e: any) => e.item.name === item.name)
    const newInventory = [...currentInv]

    if (existingIdx >= 0) {
      newInventory[existingIdx] = {
        ...newInventory[existingIdx],
        qty: (newInventory[existingIdx].qty || 0) + 1
      }
    } else {
      newInventory.push({
        item: item,
        qty: 1,
        isEquipped: false
      })
    }

    const updatedChar = { ...character, inventory: newInventory }
    setCharacter(updatedChar)

    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}')
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        inventory: newInventory,
        lastModified: Date.now()
      }))
    } catch (e) {
      console.error('Error saving to local storage', e)
    }

    saveCharacterToDB(updatedChar)
  }

  const handleRemoveInventoryItem = async (itemName: string) => {
    if (!character) return
    const currentInv = Array.isArray(character.inventory) ? character.inventory : parsedInventory
    const newInventory = currentInv.filter((e: any) => e.item.name !== itemName)
    const updatedChar = { ...character, inventory: newInventory }
    setCharacter(updatedChar)

    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}')
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        inventory: newInventory,
        lastModified: Date.now()
      }))
    } catch (e) {
      console.error('Error saving to local storage', e)
    }

    saveCharacterToDB(updatedChar)
    setDetailItem(null)
  }

  const toggleEquip = (index: number) => {
    if (!character || !character.inventory) return
    const currentInv = Array.isArray(character.inventory) ? character.inventory : parsedInventory
    const newInventory = [...currentInv]
    const entry = newInventory[index]
    if (!entry) return

    const isCurrentlyEquipped = !!entry.isEquipped

    if (!isCurrentlyEquipped && entry.item.category === 'armor' && entry.item.armorType !== 'shield') {
      newInventory.forEach((e: any) => {
        if (e.item.category === 'armor' && e.item.armorType !== 'shield') {
          e.isEquipped = false
        }
      })
    }

    entry.isEquipped = !isCurrentlyEquipped
    const updated = { ...character, inventory: newInventory }
    setCharacter(updated as any)

    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}')
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        inventory: newInventory,
        lastModified: Date.now()
      }))
    } catch (e) {
      console.error(e)
    }
  }

  const handleSelectSubclassDirectly = async (subclassName: string) => {
    if (!character) return
    const rulesetToUse = character.ruleset || '2024'
    const is2014 = (rulesetToUse === '2014' || rulesetToUse === '5e-custom')
    const newResources: Record<string, number> = character.resources ? JSON.parse(character.resources as string) : {}

    if (character.class === 'Artífice') {
      const modInt = Math.max(1, Math.floor((character.intelligence - 10) / 2))
      const pb = character.proficiencyBonus

      if (character.level >= 2) {
        let maxInfused = 2
        if (character.level >= 18) maxInfused = 6
        else if (character.level >= 14) maxInfused = 5
        else if (character.level >= 10) maxInfused = 4
        else if (character.level >= 6) maxInfused = 3

        if (subclassName === 'Armeiro') {
          if (is2014 && character.level >= 9) {
            maxInfused += 2
          } else if (!is2014 && character.level >= 10) {
            maxInfused += 2
          }
        }
        newResources['Itens Infundidos Ativos'] = maxInfused
      }

      if (subclassName === 'Alquimista') {
        if (character.level >= 3) newResources['Elixires Experimentais'] = 1
        if (character.level >= 10) newResources['Restauração Menor Grátis'] = modInt
        if (character.level >= 14) {
          newResources['Curar (Heal)'] = 1
          newResources['Restauração Maior Grátis'] = 1
        }
      } else if (subclassName === 'Artilheiro') {
        if (character.level >= 3) newResources['Canhão Élfico'] = 1
      } else if (subclassName === 'Armeiro') {
        if (character.level >= 3) {
          newResources['Campo Defensivo'] = pb
          newResources['Estatura Gigante'] = modInt
        }
      } else if (subclassName === 'Serralheiro de Batalha') {
        if (character.level >= 10) newResources['Choque Arcano'] = modInt
      }
    }

    const updated = {
      ...character,
      subclass: subclassName,
      resources: JSON.stringify(newResources)
    }

    setCharacter(updated)
    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}')
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        subclass: subclassName,
        resources: JSON.stringify(newResources),
        lastModified: Date.now()
      }))
    } catch (e) {
      console.error(e)
    }

    await saveCharacterToDB(updated)
    setIsSubclassModalOpen(false)
  }

  const handleAddFeat = async (feat: { name: string; description: string; source?: string }) => {
    if (!character) return
    const currentFeats = parsedTraits?.feats || []
    if (currentFeats.some((f: any) => f.name === feat.name)) {
      setIsFeatModalOpen(false)
      return
    }

    const updatedFeats = [...currentFeats, { name: feat.name, description: feat.description, source: feat.source }]
    const updatedTraits = {
      ...parsedTraits,
      feats: updatedFeats
    }

    const updated = {
      ...character,
      traits: JSON.stringify(updatedTraits)
    }

    setCharacter(updated as any)
    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}')
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        traits: JSON.stringify(updatedTraits),
        lastModified: Date.now()
      }))
    } catch (e) {
      console.error(e)
    }

    await saveCharacterToDB(updated as any)
    setIsFeatModalOpen(false)
  }

  const handleRemoveFeat = async (featName: string) => {
    if (!character) return
    const currentFeats = parsedTraits?.feats || []
    const updatedFeats = currentFeats.filter((f: any) => f.name !== featName)
    const updatedTraits = {
      ...parsedTraits,
      feats: updatedFeats
    }

    const updated = {
      ...character,
      traits: JSON.stringify(updatedTraits)
    }

    setCharacter(updated as any)
    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}')
      localStorage.setItem(`char_stats_${id}`, JSON.stringify({
        ...localData,
        traits: JSON.stringify(updatedTraits),
        lastModified: Date.now()
      }))
    } catch (e) {
      console.error(e)
    }

    await saveCharacterToDB(updated as any)
  }

  const handleAddCompanion = (comp: Partial<Companion>) => {
    if (!character) return
    const currentCompanions = parsedCompanions
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
    }
    const updated = { ...character, companions: [...currentCompanions, newComp] }
    setCharacter(updated)
    saveCharacterToDB(updated)
    setIsCompanionModalOpen(false)
    setNewCompanion({})
  }

  const handleRemoveCompanion = (compId: string) => {
    if (!character) return
    const updated = {
      ...character,
      companions: parsedCompanions.filter(c => c.id !== compId)
    }
    setCharacter(updated)
    saveCharacterToDB(updated)
  }

  const handleUpdateCompanionHP = (compId: string, delta: number) => {
    if (!character) return
    const updatedComps = parsedCompanions.map(c => {
      if (c.id === compId) {
        return { ...c, hp: Math.min(c.maxHp, Math.max(0, c.hp + delta)) }
      }
      return c
    })
    const updated = { ...character, companions: updatedComps }
    setCharacter(updated)
    saveCharacterToDB(updated)
  }

  const handleSaveAttributes = () => {
    if (!character) return
    const updated = { ...character, ...editingAttrs }
    setCharacter(updated)
    saveCharacterToDB(updated)
    setIsAttrModalOpen(false)
  }

  const handleLevelUpPersistence = async (updatedChar: Character, alerts: string[]) => {
    setCharacter(updatedChar)
    setIsLevelUpModalOpen(false)
    setShowCelebration(true)

    try {
      const localData = JSON.parse(localStorage.getItem(`char_stats_${id}`) || '{}')
      const dataToSave = {
        ...localData,
        level: updatedChar.level,
        exp: updatedChar.exp,
        maxHp: updatedChar.maxHp,
        currentHp: updatedChar.currentHp,
        proficiencyBonus: updatedChar.proficiencyBonus,
        strength: updatedChar.strength,
        dexterity: updatedChar.dexterity,
        constitution: updatedChar.constitution,
        intelligence: updatedChar.intelligence,
        wisdom: updatedChar.wisdom,
        charisma: updatedChar.charisma,
        traits: updatedChar.traits,
        spellSlots: updatedChar.spellSlots,
        resources: updatedChar.resources,
        lastModified: Date.now()
      }
      localStorage.setItem(`char_stats_${id}`, JSON.stringify(dataToSave))

      if (alerts.length > 0) {
        setTimeout(() => {
          alert(alerts.join('\n'))
        }, 1500)
      }
    } catch (e) {
      console.error(e)
    }

    setTimeout(() => setShowCelebration(false), 3000)
    saveCharacterToDB(updatedChar)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !character) return

    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!supportedTypes.includes(file.type)) {
      alert('Formato de arquivo não suportado. Use JPG, PNG, WEBP ou GIF.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('O arquivo é muito grande. Escolha uma imagem menor que 10MB.')
      return
    }

    try {
      setUploading(true)
      setUploadSuccess(false)
      const reader = new FileReader()
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string
          const compressed = await compressImage(base64)
          const finalUrl = await uploadImageToStorage(compressed, 'avatars')
          const updated = { ...character, avatarUrl: finalUrl }
          await saveCharacterToDB(updated)
          setCharacter(updated)
          setUploadSuccess(true)
          setTimeout(() => {
            setShowUpload(false)
            setUploadSuccess(false)
          }, 2000)
        } catch (err) {
          console.error(err)
          alert('Erro ao processar imagem. Verifique se o arquivo não está corrompido.')
        } finally {
          setUploading(false)
        }
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error(err)
      alert('Erro ao carregar arquivo.')
      setUploading(false)
    }
  }

  const handleOpenPDF = async () => {
    if (!character) return
    try {
      setPdfLoading(true)
      const blob = await pdf(<CharacterPDF character={character} />).toBlob()
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    } catch (err) {
      console.error('Error generating PDF:', err)
      alert('Erro ao gerar PDF. Tente novamente.')
    } finally {
      setPdfLoading(false)
    }
  }

  // Global window fallback for legacy script access
  if (typeof window !== 'undefined') {
    ;(window as any).updateCharValue = updateValue;
    ;(window as any).handleLevelUpPersistence = handleLevelUpPersistence;
  }

  const value: CharacterSheetContextType = {
    id,
    character,
    setCharacter,
    loading,
    isOwner,
    isAdmin,
    saveStatus,
    setSaveStatus,
    activeTab,
    setActiveTab,
    isMenuOpen,
    setIsMenuOpen,

    parsedTraits,
    expertises,
    parsedSkills,
    parsedDefenses,
    parsedInventory,
    parsedCompanions,
    parsedSpells,
    parsedSpellSlots,
    parsedResources,

    effectiveStats,
    attributes,
    proficientSaves,
    hp,
    ac,
    speed,
    initiative,
    profBonus,
    progressionData,
    currentProgression,
    totalCantripsSelected,
    totalLeveledSpellsSelected,

    updateValue,
    saveCharacterToDB,
    toggleInspiration,
    handleLevelUpPersistence,
    handleSelectSubclassDirectly,
    handleAddFeat,
    handleRemoveFeat,
    handleAddInventoryItem,
    handleRemoveInventoryItem,
    toggleEquip,
    handleAddCompanion,
    handleRemoveCompanion,
    handleUpdateCompanionHP,
    handleSaveAttributes,
    handleOpenPDF,
    handleFileChange,

    isClient,
    pdfLoading,

    isLevelUpModalOpen,
    setIsLevelUpModalOpen,
    isProgressionModalOpen,
    setIsProgressionModalOpen,
    levelUpStep,
    setLevelUpStep,
    levelUpRoll,
    setLevelUpRoll,
    isRolling,
    setIsRolling,
    useAverageHP,
    setUseAverageHP,
    showCelebration,
    setShowCelebration,

    selectedRuleset,
    setSelectedRuleset,
    selectedSubclass,
    setSelectedSubclass,
    isSubclassModalOpen,
    setIsSubclassModalOpen,
    tempSubclass,
    setTempSubclass,

    selectedFeatId,
    setSelectedFeatId,
    featAttr1,
    setFeatAttr1,
    featAttr2,
    setFeatAttr2,

    isDraconicModalOpen,
    setIsDraconicModalOpen,
    selectedAncestry,
    setSelectedAncestry,

    selectedInvocations,
    setSelectedInvocations,
    selectedFightingStyle,
    setSelectedFightingStyle,
    selectedPactBoon,
    setSelectedPactBoon,
    selectedMetamagics,
    setSelectedMetamagics,
    selectedInfusions,
    setSelectedInfusions,

    showUpload,
    setShowUpload,
    uploading,
    uploadSuccess,

    detailItem,
    setDetailItem,
    detailFeature,
    setDetailFeature,
    selectedBeast,
    setSelectedBeast,

    isAttrModalOpen,
    setIsAttrModalOpen,
    editingAttrs,
    setEditingAttrs,

    isInventoryModalOpen,
    setIsInventoryModalOpen,
    isCustomItemModalOpen,
    setIsCustomItemModalOpen,
    customItem,
    setCustomItem,
    inventorySearchTerm,
    setInventorySearchTerm,

    isFeatModalOpen,
    setIsFeatModalOpen,
    featSearchTerm,
    setFeatSearchTerm,

    isCompanionModalOpen,
    setIsCompanionModalOpen,
    newCompanion,
    setNewCompanion,
    isCompTypeSelectOpen,
    setIsCompTypeSelectOpen,

    isPreparing,
    setIsPreparing,
    ekSchoolFilter,
    setEkSchoolFilter,
  }

  return (
    <CharacterSheetContext.Provider value={value}>
      {children}
    </CharacterSheetContext.Provider>
  )
}

export function useCharacterSheet() {
  const context = useContext(CharacterSheetContext)
  if (!context) {
    throw new Error('useCharacterSheet must be used within a CharacterSheetProvider')
  }
  return context
}
