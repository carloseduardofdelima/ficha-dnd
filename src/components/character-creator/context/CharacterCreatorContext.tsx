'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { RACES, Race } from '@/lib/races'
import { RACES_2014 } from '@/lib/races-2014'
import { CLASSES, DndClass } from '@/lib/classes'
import { CLASSES_2014 } from '@/lib/classes-2014'
import { BACKGROUNDS, Background } from '@/lib/backgrounds'
import { BACKGROUNDS_2014 } from '@/lib/backgrounds-2014'
import { Attrs, POINT_COST, BUDGET, ASI } from '@/components/AttributesStep'
import { InventoryEntry, CLASS_STARTING_GOLD, BACKGROUND_STARTING_GOLD } from '@/lib/inventory'
import { getSpellSlots, SPELLCASTING_CLASSES, getSpellsForClass } from '@/lib/spells'
import { calculateAC } from '@/lib/dnd-rules'
import CLASS_LEVEL1_DATA from '@/lib/class-features'
import { CLASS_LEVEL1_DATA_2014 } from '@/lib/class-features-2014'
import { generateRandomCharacter } from '@/lib/randomCharacter'

export const STEPS = ['Edição', 'Raça', 'Classe', 'Antecedente', 'Atributos', 'Inventário', 'Magias', 'Finalização']

export interface CharacterCreatorContextType {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  steps: string[]
  loading: boolean

  // Form State
  form: {
    name: string
    class: string
    race: string
    subRace: string
    background: string
    level: number
    avatarUrl: string
    isPublic: boolean
    playerName: string
    appearance: string
    backstory: string
    personalityTraits: string
    ideals: string
    bonds: string
    flaws: string
    ruleset: '2014' | '2024' | '5e-custom'
  }
  setForm: React.Dispatch<React.SetStateAction<any>>
  attrs: Attrs
  setAttrs: React.Dispatch<React.SetStateAction<Attrs>>
  asi: ASI
  setAsi: React.Dispatch<React.SetStateAction<ASI>>
  skills: Record<string, boolean>
  setSkills: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  expertises: Record<string, boolean>
  setExpertises: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  inventory: InventoryEntry[]
  setInventory: React.Dispatch<React.SetStateAction<InventoryEntry[]>>
  selectedSpells: string[]
  setSelectedSpells: React.Dispatch<React.SetStateAction<string[]>>
  featureChoices: Record<string, string | string[]>
  setFeatureChoices: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>

  // Computed & Points
  spentPoints: number
  remainingPoints: number
  hasSpells: boolean
  availableRaces: (Race | any)[]
  availableClasses: (DndClass | any)[]
  availableBackgrounds: (Background | any)[]

  // Modals state
  detailRace: Race | null
  setDetailRace: (race: Race | null) => void
  detailClass: DndClass | null
  setDetailClass: (dndClass: DndClass | null) => void
  detailBg: Background | null
  setDetailBg: (bg: Background | null) => void
  subRaceModalOpen: boolean
  setSubRaceModalOpen: (open: boolean) => void

  // Rolling Random Character state
  isRolling: boolean
  setIsRolling: (rolling: boolean) => void
  rollingStepIdx: number
  isAnimationRunning: boolean
  rollingStats: Attrs
  rollingPreview: { name: string; race: string; class: string; bg: string; ruleset: string }
  startRolling: () => void
  rollRace: () => void
  rollClass: () => void
  rollBackground: () => void
  rollStatsStep: () => void
  rollSkillsSpellsStep: () => void
  finalizeRoll: () => void

  // Step Navigation & Save
  canGoNext: () => boolean
  nextStep: () => void
  prevStep: () => void
  handleRaceSelect: (raceId: string) => void
  handleClassSelect: (classId: string) => void
  handleBgSelect: (bgId: string) => void
  save: () => Promise<void>
}

const CharacterCreatorContext = createContext<CharacterCreatorContextType | null>(null)

export function CharacterCreatorProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const [detailRace, setDetailRace] = useState<Race | null>(null)
  const [detailClass, setDetailClass] = useState<DndClass | null>(null)
  const [detailBg, setDetailBg] = useState<Background | null>(null)
  const [subRaceModalOpen, setSubRaceModalOpen] = useState(false)

  // Rolling state
  const [isRolling, setIsRolling] = useState(false)
  const [rollingStepIdx, setRollingStepIdx] = useState(0) // 0: race, 1: class, 2: bg, 3: stats, 4: skills, 5: done
  const [isAnimationRunning, setIsAnimationRunning] = useState(false)
  const [generatedPayload, setGeneratedPayload] = useState<any>(null)

  const [rollingStats, setRollingStats] = useState<Attrs>({
    strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0
  })
  const [rollingPreview, setRollingPreview] = useState({
    name: '', race: '', class: '', bg: '', ruleset: ''
  })

  // Core Character State
  const [attrs, setAttrs] = useState<Attrs>({
    strength: 8, dexterity: 8, constitution: 8,
    intelligence: 8, wisdom: 8, charisma: 8
  })
  const [skills, setSkills] = useState<Record<string, boolean>>({})
  const [expertises, setExpertises] = useState<Record<string, boolean>>({})
  const [inventory, setInventory] = useState<InventoryEntry[]>([])
  const [selectedSpells, setSelectedSpells] = useState<string[]>([])
  const [featureChoices, setFeatureChoices] = useState<Record<string, string | string[]>>({})
  const [asi, setAsi] = useState<ASI>({ primary: null, secondary: null })

  const [form, setForm] = useState({
    name: '', class: '', race: '', subRace: '', background: '', level: 1, avatarUrl: '', isPublic: false,
    playerName: '', appearance: '', backstory: '', personalityTraits: '', ideals: '', bonds: '', flaws: '', ruleset: '2024' as '2014' | '2024' | '5e-custom'
  })

  // Calculations
  const spentPoints = Object.values(attrs).reduce((sum, v) => sum + (POINT_COST[v] ?? 0), 0)
  const remainingPoints = BUDGET - spentPoints

  const hasSpells = useMemo(() => {
    const isCaster = SPELLCASTING_CLASSES.includes(form.class)
    const slots = getSpellSlots(form.class, form.level, form.ruleset as any)
    return !!(isCaster && slots && (
      (slots.cantrips && slots.cantrips > 0) || 
      ((slots as any).lvl1 && (slots as any).lvl1 > 0) || 
      (slots.slots && slots.slots.some((s: number) => s > 0))
    ))
  }, [form.class, form.level, form.ruleset])

  const availableRaces = useMemo(() => {
    if (form.ruleset === '2014') {
      return RACES_2014.filter(r => r.source === "Player's Handbook 2014")
    }
    if (form.ruleset === '5e-custom') {
      return RACES_2014
    }
    return RACES
  }, [form.ruleset])

  const availableClasses = useMemo(() => {
    if (form.ruleset === '2014') {
      return CLASSES_2014.filter(c => c.source === "Player's Handbook 2014")
    }
    if (form.ruleset === '5e-custom') {
      return CLASSES_2014
    }
    return CLASSES
  }, [form.ruleset])

  const availableBackgrounds = useMemo(() => {
    return (form.ruleset === '2014' || form.ruleset === '5e-custom') ? BACKGROUNDS_2014 : BACKGROUNDS
  }, [form.ruleset])

  // Rolling Functions
  const startRolling = () => {
    setIsRolling(true)
    setRollingStepIdx(0)
    setIsAnimationRunning(false)
    setRollingPreview({ name: '', race: '', class: '', bg: '', ruleset: form.ruleset })
    setRollingStats({ strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 })

    const charData = generateRandomCharacter(form.ruleset)
    setGeneratedPayload(charData)
  }

  const rollRace = () => {
    if (!generatedPayload || isAnimationRunning) return
    setIsAnimationRunning(true)
    const chosenRuleset = generatedPayload.form.ruleset
    const racesPool = (chosenRuleset === '2014' || chosenRuleset === '5e-custom') ? RACES_2014 : RACES

    let ticks = 0
    const maxTicks = 18
    let currentDelay = 50

    const tick = () => {
      ticks++
      if (ticks < maxTicks) {
        const randomRace = racesPool[Math.floor(Math.random() * racesPool.length)].name
        setRollingPreview(prev => ({ ...prev, race: randomRace }))
        currentDelay = Math.floor(currentDelay * 1.22)
        setTimeout(tick, currentDelay)
      } else {
        const finalRace = generatedPayload.form.race + (generatedPayload.form.subRace ? ` (${generatedPayload.form.subRace})` : '')
        setRollingPreview(prev => ({ ...prev, race: finalRace }))
        setIsAnimationRunning(false)
        setTimeout(() => {
          setRollingStepIdx(1)
        }, 1200)
      }
    }
    setTimeout(tick, currentDelay)
  }

  const rollClass = () => {
    if (!generatedPayload || isAnimationRunning) return
    setIsAnimationRunning(true)
    const chosenRuleset = generatedPayload.form.ruleset
    const classesPool = (chosenRuleset === '2014' || chosenRuleset === '5e-custom') ? CLASSES_2014 : CLASSES

    let ticks = 0
    const maxTicks = 18
    let currentDelay = 50

    const tick = () => {
      ticks++
      if (ticks < maxTicks) {
        const randomCls = classesPool[Math.floor(Math.random() * classesPool.length)].name
        setRollingPreview(prev => ({ ...prev, class: randomCls }))
        currentDelay = Math.floor(currentDelay * 1.22)
        setTimeout(tick, currentDelay)
      } else {
        setRollingPreview(prev => ({ ...prev, class: generatedPayload.form.class }))
        setIsAnimationRunning(false)
        setTimeout(() => {
          setRollingStepIdx(2)
        }, 1200)
      }
    }
    setTimeout(tick, currentDelay)
  }

  const rollBackground = () => {
    if (!generatedPayload || isAnimationRunning) return
    setIsAnimationRunning(true)
    const chosenRuleset = generatedPayload.form.ruleset
    const bgsPool = (chosenRuleset === '2014' || chosenRuleset === '5e-custom') ? BACKGROUNDS_2014 : BACKGROUNDS

    let ticks = 0
    const maxTicks = 18
    let currentDelay = 50

    const tick = () => {
      ticks++
      if (ticks < maxTicks) {
        const randomBg = bgsPool[Math.floor(Math.random() * bgsPool.length)].name
        setRollingPreview(prev => ({ ...prev, bg: randomBg }))
        currentDelay = Math.floor(currentDelay * 1.22)
        setTimeout(tick, currentDelay)
      } else {
        setRollingPreview(prev => ({ ...prev, bg: generatedPayload.form.background }))
        setIsAnimationRunning(false)
        setTimeout(() => {
          setRollingStepIdx(3)
        }, 1200)
      }
    }
    setTimeout(tick, currentDelay)
  }

  const rollStatsStep = () => {
    if (!generatedPayload || isAnimationRunning) return
    setIsAnimationRunning(true)

    const statKeys: (keyof Attrs)[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
    let statIdx = 0

    const rollSingleStat = () => {
      if (statIdx < statKeys.length) {
        const key = statKeys[statIdx]
        let ticks = 0
        const maxTicks = 14
        let currentDelay = 40

        const tick = () => {
          ticks++
          if (ticks < maxTicks) {
            setRollingStats(prev => ({
              ...prev,
              [key]: Math.max(4, Math.floor(Math.random() * 20) + 1)
            }))
            currentDelay = Math.floor(currentDelay * 1.2)
            setTimeout(tick, currentDelay)
          } else {
            setRollingStats(prev => ({
              ...prev,
              [key]: generatedPayload.attrs[key]
            }))
            statIdx++
            setTimeout(rollSingleStat, 600)
          }
        }
        setTimeout(tick, currentDelay)
      } else {
        setIsAnimationRunning(false)
        setTimeout(() => {
          setRollingStepIdx(4)
        }, 1200)
      }
    }
    rollSingleStat()
  }

  const rollSkillsSpellsStep = () => {
    if (!generatedPayload || isAnimationRunning) return
    setIsAnimationRunning(true)

    setTimeout(() => {
      setIsAnimationRunning(false)
      setTimeout(() => {
        setRollingStepIdx(5)
      }, 1000)
    }, 2500)
  }

  const finalizeRoll = () => {
    if (!generatedPayload) return
    setForm(generatedPayload.form)
    setAttrs(generatedPayload.attrs)
    setAsi(generatedPayload.asi)
    setSkills(generatedPayload.skills)
    setExpertises(generatedPayload.expertises)
    setInventory(generatedPayload.inventory)
    setSelectedSpells(generatedPayload.selectedSpells)
    setFeatureChoices(generatedPayload.featureChoices)

    setIsRolling(false)
    setCurrentStep(7)
  }

  // Selection Handlers
  const handleRaceSelect = (raceId: string) => {
    const race = availableRaces.find(r => r.id === raceId) || null
    setForm((prev: any) => ({ ...prev, race: race?.name || '', subRace: '' }))
    if (race?.lineages) setSubRaceModalOpen(true)
    else nextStep()
  }

  const handleClassSelect = (classId: string) => {
    const dndClass = availableClasses.find(c => c.id === classId) || null
    setForm((prev: any) => ({ ...prev, class: dndClass?.name || '' }))
    nextStep()
  }

  const handleBgSelect = (bgId: string) => {
    const bg = availableBackgrounds.find(b => b.id === bgId) || null
    setForm((prev: any) => ({ ...prev, background: bg?.name || '' }))
    nextStep()
  }

  // Validation
  const canGoNext = () => {
    if (currentStep === 0) return !!form.ruleset
    if (currentStep === 1) return !!form.race
    if (currentStep === 2) return !!form.class
    if (currentStep === 3) return !!form.background
    if (currentStep === 4) {
      const pointsValid = spentPoints === BUDGET
      if (form.ruleset === '2014' || form.ruleset === '5e-custom') return pointsValid
      return pointsValid && !!asi.primary && !!asi.secondary
    }
    if (currentStep === 6) {
      const isCaster = SPELLCASTING_CLASSES.includes(form.class)
      const classData = (form.ruleset === '2014' || form.ruleset === '5e-custom') ? CLASS_LEVEL1_DATA_2014[form.class] : CLASS_LEVEL1_DATA[form.class]

      // Validate mandatory feature choices
      if (classData && classData.choices) {
        for (const choice of classData.choices) {
          const selection = featureChoices[choice.id]
          if (choice.type === 'radio' && !selection) return false
          if (choice.type === 'multi' && choice.maxSelections) {
            const current = (selection as string[] | undefined) ?? []
            if (current.length < choice.maxSelections) return false
          }
        }
      }

      if (!isCaster) return true

      const slots = getSpellSlots(form.class, form.level, form.ruleset as any)
      if (!slots) return true

      const availableSpells = getSpellsForClass(form.class, form.ruleset as any)
      const selectedCantrips = selectedSpells.filter(id => {
        const s = availableSpells.find(sp => sp.id === id)
        return s?.level === 0
      }).length
      const selectedLvl1 = selectedSpells.filter(id => {
        const s = availableSpells.find(sp => sp.id === id)
        return s && s.level > 0
      }).length

      const maxCantrips = slots.cantrips || 0
      const maxLvl1 = (slots as any).lvl1 || (slots.slots ? slots.slots[0] : 0)

      return selectedCantrips === maxCantrips && selectedLvl1 === maxLvl1
    }
    return true
  }

  const nextStep = () => {
    if (canGoNext()) setCurrentStep(s => Math.min(s + 1, STEPS.length - 1))
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const prevStep = () => {
    setCurrentStep(s => Math.max(s - 1, 0))
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  // Save Character
  const save = async () => {
    setLoading(true)

    // Proficiency Bonus Calculation
    const pb = Math.ceil(form.level / 4) + 1

    // Final attributes calculation based on ruleset
    const finalAttrs = { ...attrs }

    if (form.ruleset === '2024') {
      // 2024 style: +2/+1 from ASI
      (Object.keys(finalAttrs) as Array<keyof Attrs>).forEach(key => {
        if (asi.primary === key) finalAttrs[key] += 2
        if (asi.secondary === key) finalAttrs[key] += 1
      })
    } else {
      // 2014 style: Structured bonuses from race/subrace
      const race = RACES_2014.find(r => r.name === form.race)
      if (race) {
        // Base race bonuses
        if (race.attributeBonuses) {
          Object.entries(race.attributeBonuses).forEach(([attr, val]) => {
            finalAttrs[attr as keyof Attrs] += val
          })
        }
        // Sub-race bonuses
        const lineage = race.lineages?.find(l => l.name === form.subRace)
        if (lineage?.attributeBonuses) {
          Object.entries(lineage.attributeBonuses).forEach(([attr, val]) => {
            finalAttrs[attr as keyof Attrs] += val
          })
        }
        // Special case: Half-Elf choice of two +1s
        if (form.race === 'Meio-Elfo') {
          if (asi.primary) finalAttrs[asi.primary] += 1
          if (asi.secondary) finalAttrs[asi.secondary] += 1
        }
      }
    }

    // Limit all final attributes to a maximum of 20
    (Object.keys(finalAttrs) as Array<keyof Attrs>).forEach(key => {
      finalAttrs[key] = Math.min(20, finalAttrs[key])
    })

    // Derived stats calculation (simple level 1 logic)
    const dexMod = Math.floor((finalAttrs.dexterity - 10) / 2)
    const conMod = Math.floor((finalAttrs.constitution - 10) / 2)

    // Base hit dice map
    const hitDiceMap: Record<string, number> = {
      'Bárbaro': 12, 'Guerreiro': 10, 'Paladino': 10, 'Patrulheiro': 10,
      'Clérigo': 8, 'Druida': 8, 'Monge': 8, 'Bardo': 8, 'Ladino': 8, 'Bruxo': 8, 'Artesão Arcano': 8,
      'Mago': 6, 'Feiticeiro': 6
    }
    const baseHp = hitDiceMap[form.class] || 8

    // HP Bonuses
    let hpBonus = 0
    if (form.ruleset === '2014' || form.ruleset === '5e-custom') {
      if (form.race === 'Anão' && form.subRace === 'Anão da Colina') hpBonus += form.level
      if (form.class === 'Feiticeiro' && featureChoices['sorcerous-origin-2014'] === 'orig-draconic') hpBonus += form.level
    }
    const totalHp = baseHp + conMod + hpBonus

    const payload = {
      ...form,
      subrace: form.subRace,
      ...finalAttrs,
      skills,
      traits: { ...featureChoices, expertises },
      inventory,
      spells: selectedSpells,
      maxHp: totalHp,
      currentHp: totalHp,
      armorClass: calculateAC(form.class, finalAttrs, inventory),
      initiative: dexMod,
      proficiencyBonus: pb,
      subclass: (() => {
        const classData = (form.ruleset === '2014' || form.ruleset === '5e-custom') ? CLASS_LEVEL1_DATA_2014[form.class] : CLASS_LEVEL1_DATA[form.class]
        if (!classData) return ''

        const subclassChoiceIds = [
          'cleric-domain-2014', 'sorcerous-origin-2014', 'warlock-patron-2014',
          'Especialista Artesão', 'Caminho Primitivo', 'Juramento Sagrado', 'Tradição Monástica', 
          'Arquétipo Marcial', 'Origem de Feitiçaria', 'Patrono do Além', 'Tradição Arcana', 
          'Domínio Divino', 'Círculo Druídico', 'Colégio Bárdico', 'Conclave de Patrulheiro', 
          'Arquétipo de Ladino'
        ]

        for (const id of subclassChoiceIds) {
          const val = featureChoices[id]
          if (val && typeof val === 'string') {
            const choice = classData.choices.find(c => c.id === id)
            if (choice) {
              const opt = choice.options.find(o => o.id === val)
              if (opt) return opt.name
            }
            return val
          }
        }
        return ''
      })(),
      speed: (() => {
        const race = availableRaces.find(r => r.name === form.race)
        if (!race) return 30
        const lineage = race.lineages?.find((l: any) => l.name === form.subRace)
        return lineage?.speed || race.speed || 30
      })(),
      spellSlots: (() => {
        const slots = getSpellSlots(form.class, form.level, form.ruleset as any)
        if (!slots) return JSON.stringify({})
        const result: Record<string, number> = {}
        if (slots.slots) {
          slots.slots.forEach((s: number, i: number) => {
            if (s > 0) result[String(i + 1)] = s
          })
        }
        return JSON.stringify(result)
      })(),
      resources: (() => {
        const res: Record<string, number> = {}
        const is2014 = form.ruleset === '2014' || form.ruleset === '5e-custom'

        const classGold = CLASS_STARTING_GOLD[form.class] || 0
        const bgGold = BACKGROUND_STARTING_GOLD[form.background || ''] || 0
        res['moeda_ouro'] = classGold + bgGold

        if (form.class === 'Bárbaro') res['Fúria'] = 2

        if (form.class === 'Guerreiro') {
          res['Retomada de Fôlego'] = is2014 ? 1 : 2
        }

        if (form.class === 'Monge' && form.level >= 2) {
          res[is2014 ? 'Pontos de Ki' : 'Pontos de Foco'] = form.level
        }

        if (form.class === 'Bardo') {
          res['Inspiração Bárdica'] = Math.max(1, Math.floor((finalAttrs.charisma - 10) / 2))
        }

        if (form.class === 'Patrulheiro' && !is2014) {
          res['Marca do Caçador'] = pb
        }

        if (form.class === 'Clérigo') {
          if (!is2014) res['Canalizar Divindade'] = 2
          else if (form.level >= 2) res['Canalizar Divindade'] = 1
        }

        if (form.class === 'Druida' && form.level >= 2) {
          res['Forma Selvagem'] = 2
        }

        if (form.class === 'Artesão Arcano') {
          const modInt = Math.max(1, Math.floor((finalAttrs.intelligence - 10) / 2))
          res['Engenharia Mágica'] = modInt
          const selectedSubclass = featureChoices['Especialista Artesão'] as string
          if (form.level >= 3) {
            if (selectedSubclass === 'Artilheiro') {
              res['Canhão Élfico'] = 1
            } else if (selectedSubclass === 'Alquimista') {
              res['Elixires Experimentais'] = 1
            } else if (selectedSubclass === 'Armeiro') {
              res['Campo Defensivo'] = pb
              res['Estatura Gigante'] = modInt
            } else if (selectedSubclass === 'Serralheiro de Batalha' && form.level >= 10) {
              res['Choque Arcano'] = modInt
            }
          }
          if (form.level >= 10 && selectedSubclass === 'Alquimista') {
            res['Restauração Menor Grátis'] = modInt
          }
          if (form.level >= 14 && selectedSubclass === 'Alquimista') {
            res['Curar (Heal)'] = 1
            res['Restauração Maior Grátis'] = 1
          }
          if (form.level >= 7) res['Brilho de Gênio'] = modInt
        }
        if (form.class === 'Paladino') res['Imposição de Mãos'] = form.level * 5

        if (form.class === 'Feiticeiro') {
          if (form.level >= 2) res['Pontos de Feitiçaria'] = form.level
          if (!is2014) res['Feitiçaria Inata'] = 2
        }

        if (form.class === 'Bruxo' && !is2014 && form.level >= 2) {
          res['Astúcia Mística'] = 1
        }

        // Cleric Domain Resources (2014)
        if (form.class === 'Clérigo' && is2014) {
          const domain = featureChoices['cleric-domain-2014'] as string
          const wisMod = Math.max(1, Math.floor((finalAttrs.wisdom - 10) / 2))
          if (domain === 'dom-guerra') {
            res['Sacerdote da Guerra'] = wisMod
          } else if (domain === 'dom-tempestade') {
            res['Ira da Tempestade'] = wisMod
          }
        }

        return JSON.stringify(res)
      })(),
    }

    const res = await fetch('/api/personagens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (res.ok) router.push('/personagens')
    else setLoading(false)
  }

  return (
    <CharacterCreatorContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        steps: STEPS,
        loading,
        form,
        setForm,
        attrs,
        setAttrs,
        asi,
        setAsi,
        skills,
        setSkills,
        expertises,
        setExpertises,
        inventory,
        setInventory,
        selectedSpells,
        setSelectedSpells,
        featureChoices,
        setFeatureChoices,
        spentPoints,
        remainingPoints,
        hasSpells,
        availableRaces,
        availableClasses,
        availableBackgrounds,
        detailRace,
        setDetailRace,
        detailClass,
        setDetailClass,
        detailBg,
        setDetailBg,
        subRaceModalOpen,
        setSubRaceModalOpen,
        isRolling,
        setIsRolling,
        rollingStepIdx,
        isAnimationRunning,
        rollingStats,
        rollingPreview,
        startRolling,
        rollRace,
        rollClass,
        rollBackground,
        rollStatsStep,
        rollSkillsSpellsStep,
        finalizeRoll,
        canGoNext,
        nextStep,
        prevStep,
        handleRaceSelect,
        handleClassSelect,
        handleBgSelect,
        save,
      }}
    >
      {children}
    </CharacterCreatorContext.Provider>
  )
}

export function useCharacterCreator() {
  const context = useContext(CharacterCreatorContext)
  if (!context) {
    throw new Error('useCharacterCreator must be used within a CharacterCreatorProvider')
  }
  return context
}
