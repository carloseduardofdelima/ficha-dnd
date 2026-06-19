'use client'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, X, ChevronRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { RACES, Race } from '@/lib/races'
import { RACES_2014 } from '@/lib/races-2014'
import { CLASSES, DndClass } from '@/lib/classes'
import { CLASSES_2014 } from '@/lib/classes-2014'
import { BACKGROUNDS, Background } from '@/lib/backgrounds'
import { BACKGROUNDS_2014 } from '@/lib/backgrounds-2014'
import StepIndicator from '@/components/StepIndicator'
import RaceCard from '@/components/RaceCard'
import ClassCard from '@/components/ClassCard'
import BackgroundCard from '@/components/BackgroundCard'
import AttributesStep, { Attrs, POINT_COST, BUDGET, ASI } from '@/components/AttributesStep'
import InventoryStep from '@/components/InventoryStep'
import SpellsStep from '@/components/SpellsStep'
import { getSpellSlots, SPELLCASTING_CLASSES, getSpellsForClass } from '@/lib/spells'
import FinalStep from '@/components/FinalStep'
import type { InventoryEntry } from '@/lib/inventory'
import { calculateAC } from '@/lib/dnd-rules'
import CLASS_LEVEL1_DATA from '@/lib/class-features'
import { CLASS_LEVEL1_DATA_2014 } from '@/lib/class-features-2014'
import { generateRandomCharacter } from '@/lib/randomCharacter'

const STEPS = ['Edição', 'Raça', 'Classe', 'Antecedente', 'Atributos', 'Inventário', 'Magias', 'Finalização']

export default function NovoPersonagem() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [detailRace, setDetailRace] = useState<Race | null>(null)
  const [detailClass, setDetailClass] = useState<DndClass | null>(null)
  const [detailBg, setDetailBg] = useState<Background | null>(null)
  const [subRaceModalOpen, setSubRaceModalOpen] = useState(false)

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
    const racesPool = chosenRuleset === '2014' ? RACES_2014 : RACES
    
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
    const classesPool = chosenRuleset === '2014' ? CLASSES_2014 : CLASSES
    
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
    const bgsPool = chosenRuleset === '2014' ? BACKGROUNDS_2014 : BACKGROUNDS
    
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

  const [attrs, setAttrs] = useState<Attrs>({
    strength: 8, dexterity: 8, constitution: 8,
    intelligence: 8, wisdom: 8, charisma: 8
  })

  // Point buy calculation for validation
  const spentPoints = Object.values(attrs).reduce((sum, v) => sum + (POINT_COST[v] ?? 0), 0)
  const remainingPoints = BUDGET - spentPoints

  const [skills, setSkills] = useState<Record<string, boolean>>({})
  const [expertises, setExpertises] = useState<Record<string, boolean>>({})
  const [inventory, setInventory] = useState<InventoryEntry[]>([])
  const [selectedSpells, setSelectedSpells] = useState<string[]>([])
  const [form, setForm] = useState({
    name: '', class: '', race: '', subRace: '', background: '', level: 1, avatarUrl: '', isPublic: false,
    playerName: '', appearance: '', backstory: '', personalityTraits: '', ideals: '', bonds: '', flaws: '', ruleset: '2024' as '2014' | '2024'
  })

  const availableRaces = useMemo(() => {
    return form.ruleset === '2014' ? RACES_2014 : RACES;
  }, [form.ruleset]);

  const availableClasses = useMemo(() => {
    return form.ruleset === '2014' ? CLASSES_2014 : CLASSES;
  }, [form.ruleset]);

  const availableBackgrounds = useMemo(() => {
    return form.ruleset === '2014' ? BACKGROUNDS_2014 : BACKGROUNDS;
  }, [form.ruleset]);

  const [featureChoices, setFeatureChoices] = useState<Record<string, string | string[]>>({})

  // ASI (Ability Score Increase) - Style 2024
  const [asi, setAsi] = useState<ASI>({
    primary: null,
    secondary: null
  })

  const save = async () => {
    setLoading(true)

    // Proficiency Bonus Calculation
    const pb = Math.ceil(form.level / 4) + 1

    // Final attributes calculation based on ruleset
    let finalAttrs = { ...attrs };
    
    if (form.ruleset === '2024') {
      // 2024 style: +2/+1 from ASI
      (Object.keys(finalAttrs) as Array<keyof Attrs>).forEach(key => {
        if (asi.primary === key) finalAttrs[key] += 2;
        if (asi.secondary === key) finalAttrs[key] += 1;
      });
    } else {
      // 2014 style: Structured bonuses from race/subrace
      const race = RACES_2014.find(r => r.name === form.race);
      if (race) {
        // Base race bonuses
        if (race.attributeBonuses) {
          Object.entries(race.attributeBonuses).forEach(([attr, val]) => {
            finalAttrs[attr as keyof Attrs] += val;
          });
        }
        // Sub-race bonuses
        const lineage = race.lineages?.find(l => l.name === form.subRace);
        if (lineage?.attributeBonuses) {
          Object.entries(lineage.attributeBonuses).forEach(([attr, val]) => {
            finalAttrs[attr as keyof Attrs] += val;
          });
        }
        // Special case: Half-Elf choice of two +1s
        if (form.race === 'Meio-Elfo') {
          if (asi.primary) finalAttrs[asi.primary] += 1;
          if (asi.secondary) finalAttrs[asi.secondary] += 1;
        }
      }
    }

    // Limit all final attributes to a maximum of 20
    (Object.keys(finalAttrs) as Array<keyof Attrs>).forEach(key => {
      finalAttrs[key] = Math.min(20, finalAttrs[key]);
    });

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
    let hpBonus = 0;
    if (form.ruleset === '2014') {
      if (form.race === 'Anão' && form.subRace === 'Anão da Colina') hpBonus += form.level;
      if (form.class === 'Feiticeiro' && featureChoices['sorcerous-origin-2014'] === 'orig-draconic') hpBonus += form.level;
    }
    const totalHp = baseHp + conMod + hpBonus;

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
        const classData = form.ruleset === '2014' ? CLASS_LEVEL1_DATA_2014[form.class] : CLASS_LEVEL1_DATA[form.class];
        if (!classData) return '';
        
        const subclassChoiceIds = [
          'cleric-domain-2014', 'sorcerous-origin-2014', 'warlock-patron-2014',
          'Especialista Artesão', 'Caminho Primitivo', 'Juramento Sagrado', 'Tradição Monástica', 
          'Arquétipo Marcial', 'Origem de Feitiçaria', 'Patrono do Além', 'Tradição Arcana', 
          'Domínio Divino', 'Círculo Druídico', 'Colégio Bárdico', 'Conclave de Patrulheiro', 
          'Arquétipo de Ladino'
        ];
        
        for (const id of subclassChoiceIds) {
          const val = featureChoices[id];
          if (val && typeof val === 'string') {
            const choice = classData.choices.find(c => c.id === id);
            if (choice) {
              const opt = choice.options.find(o => o.id === val);
              if (opt) return opt.name;
            }
            return val;
          }
        }
        return '';
      })(),
      speed: (() => {
        const race = availableRaces.find(r => r.name === form.race);
        if (!race) return 30;
        const lineage = race.lineages?.find(l => l.name === form.subRace);
        return lineage?.speed || race.speed || 30;
      })(),
      spellSlots: (() => {
        const slots = getSpellSlots(form.class, form.level, form.ruleset as any);
        if (!slots) return JSON.stringify({});
        const result: Record<string, number> = {};
        if (slots.slots) {
          slots.slots.forEach((s: number, i: number) => {
            if (s > 0) result[String(i + 1)] = s;
          });
        }
        return JSON.stringify(result);
      })(),
      resources: (() => {
        const res: Record<string, number> = {};
        const is2014 = form.ruleset === '2014';

        if (form.class === 'Bárbaro') res['Fúria'] = 2;
        
        if (form.class === 'Guerreiro') {
          res['Retomada de Fôlego'] = is2014 ? 1 : 2;
        }

        if (form.class === 'Monge' && form.level >= 2) {
          res[is2014 ? 'Pontos de Ki' : 'Pontos de Foco'] = form.level;
        }

        if (form.class === 'Bardo') {
          res['Inspiração Bárdica'] = Math.max(1, Math.floor((finalAttrs.charisma - 10) / 2));
        }

        if (form.class === 'Patrulheiro' && !is2014) {
          res['Marca do Caçador'] = pb;
        }

        if (form.class === 'Clérigo') {
          if (!is2014) res['Canalizar Divindade'] = 2;
          else if (form.level >= 2) res['Canalizar Divindade'] = 1;
        }

        if (form.class === 'Druida' && form.level >= 2) {
          res['Forma Selvagem'] = 2;
        }

        if (form.class === 'Artesão Arcano') {
          const modInt = Math.max(1, Math.floor((finalAttrs.intelligence - 10) / 2));
          res['Engenharia Mágica'] = modInt;
          const selectedSubclass = featureChoices['Especialista Artesão'] as string;
          if (form.level >= 3) {
            if (selectedSubclass === 'Artilheiro') {
              res['Canhão Élfico'] = 1;
            } else if (selectedSubclass === 'Alquimista') {
              res['Elixires Experimentais'] = 1;
            } else if (selectedSubclass === 'Armeiro') {
              res['Campo Defensivo'] = pb;
              res['Estatura Gigante'] = modInt;
            } else if (selectedSubclass === 'Serralheiro de Batalha' && form.level >= 10) {
              res['Choque Arcano'] = modInt;
            }
          }
          if (form.level >= 10 && selectedSubclass === 'Alquimista') {
            res['Restauração Menor Grátis'] = modInt;
          }
          if (form.level >= 14 && selectedSubclass === 'Alquimista') {
            res['Curar (Heal)'] = 1;
            res['Restauração Maior Grátis'] = 1;
          }
          if (form.level >= 7) res['Brilho de Gênio'] = modInt;
        }
        if (form.class === 'Paladino') res['Imposição de Mãos'] = form.level * 5;
        
        if (form.class === 'Feiticeiro') {
          if (form.level >= 2) res['Pontos de Feitiçaria'] = form.level;
          if (!is2014) res['Feitiçaria Inata'] = 2;
        }

        if (form.class === 'Bruxo' && !is2014 && form.level >= 2) {
          res['Astúcia Mística'] = 1;
        }
        
        // Cleric Domain Resources (2014)
        if (form.class === 'Clérigo' && is2014) {
          const domain = featureChoices['cleric-domain-2014'] as string;
          const wisMod = Math.max(1, Math.floor((finalAttrs.wisdom - 10) / 2));
          if (domain === 'dom-guerra') {
            res['Sacerdote da Guerra'] = wisMod;
          } else if (domain === 'dom-tempestade') {
            res['Ira da Tempestade'] = wisMod;
          }
        }
        
        return JSON.stringify(res);
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

  const handleRaceSelect = (raceId: string) => {
    const race = availableRaces.find(r => r.id === raceId) || null
    setForm({ ...form, race: race?.name || '', subRace: '' })
    if (race?.lineages) setSubRaceModalOpen(true)
    else nextStep()
  }

  const handleClassSelect = (classId: string) => {
    const dndClass = availableClasses.find(c => c.id === classId) || null
    setForm({ ...form, class: dndClass?.name || '' })
    nextStep()
  }

  const handleBgSelect = (bgId: string) => {
    const bg = availableBackgrounds.find(b => b.id === bgId) || null
    setForm({ ...form, background: bg?.name || '' })
    nextStep()
  }

  const canGoNext = () => {
    if (currentStep === 0) return !!form.ruleset
    if (currentStep === 1) return !!form.race
    if (currentStep === 2) return !!form.class
    if (currentStep === 3) return !!form.background
    if (currentStep === 4) {
      const pointsValid = spentPoints === BUDGET;
      if (form.ruleset === '2014') return pointsValid;
      return pointsValid && !!asi.primary && !!asi.secondary;
    }
    if (currentStep === 6) {
      const isCaster = SPELLCASTING_CLASSES.includes(form.class)
      const classData = form.ruleset === '2014' ? CLASS_LEVEL1_DATA_2014[form.class] : CLASS_LEVEL1_DATA[form.class]
      
      // Validate mandatory feature choices
      if (classData && classData.choices) {
        for (const choice of classData.choices) {
          const selection = featureChoices[choice.id];
          if (choice.type === 'radio' && !selection) return false;
          if (choice.type === 'multi' && choice.maxSelections) {
            const current = (selection as string[] | undefined) ?? [];
            if (current.length < choice.maxSelections) return false;
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const prevStep = () => {
    setCurrentStep(s => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  return (
    <div className="container" style={{ maxWidth: 1200, paddingBottom: 100 }}>
      <div className="page-header" style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 0
      }}>
        <Link href="/personagens">
          <button className="btn btn-ghost" style={{ padding: 8 }}>
            <ArrowLeft size={20} />
          </button>
        </Link>
        <div className="header-text">
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'var(--title-size, 24px)', margin: 0 }}>Criar Personagem</h1>
          <p style={{ fontSize: 13, color: 'var(--fg3)', margin: 0 }}>Siga os passos para forjar seu herói</p>
        </div>
      </div>

      <StepIndicator currentStep={currentStep} steps={STEPS} />

      {/* Step 0: Edition Selection */}
      {currentStep === 0 && (
        <div className="fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 8, textAlign: 'center' }}>Escolha a Edição</h2>
          <p style={{ color: 'var(--fg3)', textAlign: 'center', marginBottom: 32 }}>Selecione qual conjunto de regras você deseja usar para este personagem.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div 
              className={`card ${form.ruleset === '2014' ? 'active' : ''}`}
              onClick={() => setForm({ ...form, ruleset: '2014', race: '', class: '', background: '' })}
              style={{ padding: 24, cursor: 'pointer', border: form.ruleset === '2014' ? '2px solid var(--accent)' : '1px solid var(--border)' }}
            >
              <h3 style={{ fontFamily: 'Cinzel, serif', marginBottom: 12 }}>D&D 5e (2014)</h3>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.5 }}>
                As regras clássicas da 5ª Edição. Atributos são fixos por raça e o Patrulheiro usa as regras originais de Inimigo Favorito.
              </p>
            </div>
            
            <div 
              className={`card ${form.ruleset === '2024' ? 'active' : ''}`}
              onClick={() => setForm({ ...form, ruleset: '2024', race: '', class: '', background: '' })}
              style={{ padding: 24, cursor: 'pointer', border: form.ruleset === '2024' ? '2px solid var(--accent)' : '1px solid var(--border)' }}
            >
              <h3 style={{ fontFamily: 'Cinzel, serif', marginBottom: 12 }}>D&D 2024 (5.5e)</h3>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.5 }}>
                A nova atualização das regras. Atributos são escolhidos via Antecedente e as raças possuem novas habilidades balanceadas.
              </p>
            </div>
          </div>

          <div 
            className="card random-card"
            onClick={startRolling}
            style={{
              padding: '24px 32px',
              cursor: 'pointer',
              border: '2px dashed var(--accent)',
              background: 'linear-gradient(135deg, rgba(191,155,48,0.1), rgba(0,0,0,0.6))',
              textAlign: 'center',
              marginTop: 30,
              borderRadius: 16,
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 4px 25px rgba(191,155,48,0.1)'
            }}
          >
            <div className="d20-icon-wrapper" style={{ fontSize: 48, animation: 'pulse 2s infinite' }}>🎲</div>
            <h3 style={{ fontFamily: 'Cinzel, serif', margin: 0, color: 'var(--accent)', fontSize: 22 }}>Forjar Ficha Aleatória</h3>
            <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.6, margin: 0, maxWidth: 600 }}>
              Quer deixar tudo nas mãos do destino? Rolaremos dados virtuais d20 para escolher sua raça, classe, antecedentes, magias, perícias e atributos instantaneamente!
            </p>
          </div>
        </div>
      )}

      {/* Step 1: Race */}
      {currentStep === 1 && (
        <div className="fade-in">
          <div className="grid-cards">
            {availableRaces.map(race => (
              <RaceCard 
                key={race.id} 
                race={race} 
                selected={form.race === race.name}
                onSelect={handleRaceSelect} 
                onViewDetails={setDetailRace} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Class */}
      {currentStep === 2 && (
        <div className="fade-in">
          <div className="grid-cards">
            {availableClasses.map(cls => (
              <ClassCard 
                key={cls.id} 
                dndClass={cls} 
                selected={form.class === cls.name}
                onSelect={handleClassSelect} 
                onViewDetails={setDetailClass} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Background */}
      {currentStep === 3 && (
        <div className="fade-in">
          <div className="grid-cards">
            {availableBackgrounds.map(bg => (
              <BackgroundCard 
                key={bg.id} 
                background={bg} 
                selected={form.background === bg.name}
                onSelect={handleBgSelect} 
                onViewDetails={setDetailBg} 
              />
            ))}
          </div>
        </div>
      )}


      {/* Step 4: Attributes + Skills */}
      {currentStep === 4 && (
        <AttributesStep
          className={form.class}
          raceName={form.race}
          subRaceName={form.subRace}
          backgroundName={form.background}
          level={form.level}
          attrs={attrs}
          skills={skills}
          expertises={expertises}
          asi={asi}
          ruleset={form.ruleset}
          onAttrsChange={setAttrs}
          onSkillsChange={setSkills}
          onExpertisesChange={setExpertises}
          onAsiChange={setAsi}
        />
      )}


      {/* Step 5: Inventory */}
      {currentStep === 5 && (
        <InventoryStep
          className={form.class}
          backgroundName={form.background}
          inventory={inventory}
          onInventoryChange={setInventory}
          ruleset={form.ruleset}
        />
      )}


      {/* Step 6: Spells & Class Features */}
      {currentStep === 6 && (
        <SpellsStep
          className={form.class}
          selectedSpells={selectedSpells}
          onSpellsChange={setSelectedSpells}
          featureChoices={featureChoices}
          onFeatureChoicesChange={setFeatureChoices}
          ruleset={form.ruleset as any}
          level={form.level}
        />
      )}


      {/* Step 7: Finalization */}
      {currentStep === 7 && (
        <FinalStep
          form={form}
          onFormChange={setForm}
          attrs={attrs}
          asi={asi}
          skills={skills}
          inventory={inventory}
          selectedSpells={selectedSpells}
          featureChoices={featureChoices}
          onSave={save}
          loading={loading}
        />
      )}



      {/* Navigation Bar Fixed at Bottom */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)'
      }}>
        <div className="character-info-footer" style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personagem</span>
          <span style={{ fontWeight: 'bold', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {form.name || 'Sem nome'} • {form.race || 'Sem raça'}{form.subRace ? ` (${form.subRace})` : ''}{form.class ? ` • ${form.class}` : ''}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {currentStep > 0 && (
            <button className="btn btn-ghost" onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ChevronLeft size={18} /> Anterior
            </button>
          )}

          {currentStep < STEPS.length - 1 && (
            <button
              className="btn btn-primary"
              onClick={nextStep}
              disabled={!canGoNext()}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px' }}
            >
              Próximo: {STEPS[currentStep + 1]} <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Rolling Overlay Animation */}
      {isRolling && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.94)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, backdropFilter: 'blur(12px)', padding: 20
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            maxWidth: 600, width: '100%', textAlign: 'center', gap: 24
          }}>
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 45px rgba(191,155,48,0.5)',
              fontSize: 50,
              animation: isAnimationRunning ? 'spin 1.5s linear infinite' : 'pulse 2s infinite'
            }}>
              🎲
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 32, margin: 0, color: 'var(--accent)' }}>
                Forja do Destino
              </h2>
              <p style={{ color: 'var(--fg3)', fontSize: 13, margin: 0 }}>Role cada passo para forjar o seu personagem</p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: 24,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              textAlign: 'left'
            }}>
             {/* Step indicators */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 12 }}>
                {['Raça', 'Classe', 'Antecedente', 'Atributos', 'Perícias/Magias'].map((step, idx) => (
                  <span key={step} style={{
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: rollingStepIdx === idx ? 'var(--accent)' : rollingStepIdx > idx ? 'var(--ok)' : 'var(--fg3)',
                    textDecoration: rollingStepIdx > idx ? 'line-through' : 'none'
                  }}>
                    {step}
                  </span>
                ))}
              </div>

              {/* Progress Summary Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
                marginTop: 4,
                padding: 14,
                borderRadius: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Regras</span>
                  <span style={{ fontSize: 13, fontWeight: 'bold', color: 'var(--ok)' }}>D&D {rollingPreview.ruleset}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Raça</span>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: rollingPreview.race ? 'var(--accentL)' : 'var(--fg3)',
                    textShadow: rollingPreview.race ? '0 0 10px rgba(191,155,48,0.3)' : 'none'
                  }}>
                    {rollingPreview.race || 'Pendente...'}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Classe</span>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: rollingPreview.class ? 'var(--accentL)' : 'var(--fg3)',
                    textShadow: rollingPreview.class ? '0 0 10px rgba(191,155,48,0.3)' : 'none'
                  }}>
                    {rollingPreview.class || (rollingStepIdx > 1 ? 'Pendente...' : '-')}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Antecedente</span>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: rollingPreview.bg ? 'var(--accentL)' : 'var(--fg3)',
                    textShadow: rollingPreview.bg ? '0 0 10px rgba(191,155,48,0.3)' : 'none'
                  }}>
                    {rollingPreview.bg || (rollingStepIdx > 2 ? 'Pendente...' : '-')}
                  </span>
                </div>
              </div>

              {/* Step 0: Race Content */}
              {rollingStepIdx === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
                  <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                    1. Role a raça do personagem de acordo com a edição selecionada.
                  </p>
                  {rollingPreview.race && (
                    <div className="card fade-in" style={{
                      padding: '24px 16px',
                      backgroundColor: 'rgba(191,155,48,0.06)',
                      border: '2px solid var(--accent)',
                      boxShadow: '0 0 25px rgba(191,155,48,0.35)',
                      textAlign: 'center',
                      borderRadius: 12
                    }}>
                      <span style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--accentL)', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>
                        {rollingPreview.race}
                      </span>
                    </div>
                  )}
                  <button 
                    className="btn btn-primary" 
                    onClick={rollRace}
                    disabled={isAnimationRunning}
                    style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
                  >
                    {isAnimationRunning ? 'Rolando Raça...' : '🎲 Rolar Raça'}
                  </button>
                </div>
              )}

              {/* Step 1: Class Content */}
              {rollingStepIdx === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
                  <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                    2. Role a classe de combate do personagem.
                  </p>
                  {rollingPreview.class && (
                    <div className="card fade-in" style={{
                      padding: '24px 16px',
                      backgroundColor: 'rgba(191,155,48,0.06)',
                      border: '2px solid var(--accent)',
                      boxShadow: '0 0 25px rgba(191,155,48,0.35)',
                      textAlign: 'center',
                      borderRadius: 12
                    }}>
                      <span style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--accentL)', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>
                        {rollingPreview.class}
                      </span>
                    </div>
                  )}
                  <button 
                    className="btn btn-primary" 
                    onClick={rollClass}
                    disabled={isAnimationRunning}
                    style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
                  >
                    {isAnimationRunning ? 'Rolando Classe...' : '🎲 Rolar Classe'}
                  </button>
                </div>
              )}

              {/* Step 2: Background Content */}
              {rollingStepIdx === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
                  <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                    3. Role o antecedente (Background) que define a história inicial.
                  </p>
                  {rollingPreview.bg && (
                    <div className="card fade-in" style={{
                      padding: '24px 16px',
                      backgroundColor: 'rgba(191,155,48,0.06)',
                      border: '2px solid var(--accent)',
                      boxShadow: '0 0 25px rgba(191,155,48,0.35)',
                      textAlign: 'center',
                      borderRadius: 12
                    }}>
                      <span style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--accentL)', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>
                        {rollingPreview.bg}
                      </span>
                    </div>
                  )}
                  <button 
                    className="btn btn-primary" 
                    onClick={rollBackground}
                    disabled={isAnimationRunning}
                    style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
                  >
                    {isAnimationRunning ? 'Rolando Antecedente...' : '🎲 Rolar Antecedente'}
                  </button>
                </div>
              )}

              {/* Step 3: Attributes Content */}
              {rollingStepIdx === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
                  <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                    4. Role d20 individualmente para determinar cada atributo básico.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginTop: 4 }}>
                    {[
                      { key: 'strength', label: 'FOR' },
                      { key: 'dexterity', label: 'DES' },
                      { key: 'constitution', label: 'CON' },
                      { key: 'intelligence', label: 'INT' },
                      { key: 'wisdom', label: 'SAB' },
                      { key: 'charisma', label: 'CAR' }
                    ].map(stat => (
                      <div key={stat.key} style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 8,
                        padding: '12px 8px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: 9, color: 'var(--fg3)', marginBottom: 4 }}>{stat.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 'black', color: rollingStats[stat.key as keyof Attrs] > 0 ? 'var(--accentL)' : 'var(--fg3)' }}>
                          {rollingStats[stat.key as keyof Attrs] || '-'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    className="btn btn-primary" 
                    onClick={rollStatsStep}
                    disabled={isAnimationRunning}
                    style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
                  >
                    {isAnimationRunning ? 'Rolando d20...' : '🎲 Lançar Dados (1d20)'}
                  </button>
                </div>
              )}

              {/* Step 4: Skills Content */}
              {rollingStepIdx === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--fg3)' }}>Atributos Sorteados:</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--accentL)' }}>
                      {Object.values(rollingStats).join(', ')}
                    </span>
                  </div>


                  <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                    5. Escolha e role as perícias apropriadas, magias e inventário correspondente à sua classe.
                  </p>

                  <button 
                    className="btn btn-primary" 
                    onClick={rollSkillsSpellsStep}
                    disabled={isAnimationRunning}
                    style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
                  >
                    {isAnimationRunning ? 'Configurando habilidades...' : '🎲 Infundir Perícias e Magias'}
                  </button>
                </div>
              )}

              {/* Step 5: Done Content */}
              {rollingStepIdx === 5 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 50, color: 'var(--ok)' }}>✓</div>
                  <h3 style={{ margin: 0, color: 'var(--ok)', fontFamily: 'Cinzel, serif' }}>Ficha Pronta!</h3>
                  <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                    Sua ficha aleatória foi estruturada com sucesso. Vá para a etapa final para dar um nome ao seu herói e salvá-lo.
                  </p>
                  <button 
                    className="btn btn-primary" 
                    onClick={finalizeRoll}
                    style={{ width: '100%', padding: '12px 0', fontWeight: 'bold', marginTop: 10 }}
                  >
                    Concluir e Nomear Herói
                  </button>
                </div>
              )}
            </div>

            {/* Cancel Button */}
            <button 
              className="btn btn-ghost" 
              onClick={() => setIsRolling(false)}
              disabled={isAnimationRunning}
              style={{ color: 'var(--fg3)' }}
            >
              Cancelar Rolagem
            </button>
          </div>
        </div>
      )}

      {/* Race Details Modal */}
      {detailRace && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setDetailRace(null)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 700, maxHeight: '90vh',
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 32 }}>{detailRace.name}</h2>
                <span style={{ fontSize: 13, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{detailRace.source}</span>
              </div>
              <button className="btn btn-ghost" onClick={() => setDetailRace(null)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: 32, overflowY: 'auto' }}>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg2)', fontStyle: 'italic' }}>
                  &quot;{detailRace.description}&quot;
                </p>
                <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Deslocamento</span>
                    <div style={{ fontWeight: 'bold' }}>{Math.round((detailRace.speed / 5) * 1.5)}m</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Tamanho</span>
                    <div style={{ fontWeight: 'bold' }}>{detailRace.size}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 16, borderBottom: '1px solid var(--accent)', display: 'inline-block' }}>Traços Raciais</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {detailRace.traits.map(trait => (
                    <div key={trait.name}>
                      <div style={{ fontWeight: 'bold', fontSize: 15, color: 'var(--fg)', marginBottom: 4 }}>{trait.name}</div>
                      <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0, lineHeight: 1.5 }}>{trait.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>
              <button
                className="btn btn-primary"
                onClick={() => { handleRaceSelect(detailRace.id); setDetailRace(null); }}
                style={{ padding: '0 32px' }}
              >
                Selecionar {detailRace.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Class Details Modal */}
      {detailClass && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setDetailClass(null)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 700, maxHeight: '90vh',
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 32 }}>{detailClass.name}</h2>
                <span style={{ fontSize: 13, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{detailClass.source}</span>
              </div>
              <button className="btn btn-ghost" onClick={() => setDetailClass(null)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: 32, overflowY: 'auto' }}>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg2)', fontStyle: 'italic' }}>
                  &quot;{detailClass.description}&quot;
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 16 }}>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Dado de Vida</span>
                    <div style={{ fontWeight: 'bold', color: 'var(--accentL)', fontSize: 18 }}>{detailClass.hitDie}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Atributo Principal</span>
                    <div style={{ fontWeight: 'bold' }}>{detailClass.primaryAttr}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Salvaguardas</span>
                    <div style={{ fontWeight: 'bold' }}>{detailClass.savingThrows.join(', ')}</div>
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Armaduras</span>
                    <div style={{ fontSize: 13, color: 'var(--fg2)', marginTop: 2 }}>{detailClass.armorProf}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Armas</span>
                    <div style={{ fontSize: 13, color: 'var(--fg2)', marginTop: 2 }}>{detailClass.weaponProf}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 16, borderBottom: '1px solid var(--accent)', display: 'inline-block' }}>Habilidades de Classe</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {detailClass.features.map(feature => (
                    <div key={feature.name}>
                      <div style={{ fontWeight: 'bold', fontSize: 15, color: 'var(--fg)', marginBottom: 4 }}>{feature.name}</div>
                      <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0, lineHeight: 1.5 }}>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>
              <button
                className="btn btn-primary"
                onClick={() => { handleClassSelect(detailClass.id); setDetailClass(null); }}
                style={{ padding: '0 32px' }}
              >
                Selecionar {detailClass.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Details Modal */}
      {detailBg && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setDetailBg(null)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 640, maxHeight: '90vh',
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ height: 5, background: 'linear-gradient(90deg, var(--accent2), var(--accent))' }} />
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 28 }}>{detailBg.name}</h2>
                <span style={{ fontSize: 13, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{detailBg.source}</span>
              </div>
              <button className="btn btn-ghost" onClick={() => setDetailBg(null)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: 32, overflowY: 'auto' }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg2)', fontStyle: 'italic', marginBottom: 24 }}>
                &quot;{detailBg.description}&quot;
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16 }}>
                  <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Perícias</span>
                  <div style={{ fontWeight: 600, marginTop: 6 }}>{detailBg.skills.join(', ')}</div>
                </div>
                {detailBg.toolProf && (
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Ferramentas</span>
                    <div style={{ fontWeight: 600, marginTop: 6 }}>{detailBg.toolProf}</div>
                  </div>
                )}
                {detailBg.languages && (
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Idiomas</span>
                    <div style={{ fontWeight: 600, marginTop: 6 }}>{detailBg.languages}</div>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, marginBottom: 12, borderBottom: '1px solid var(--accent)', display: 'inline-block', paddingBottom: 4 }}>Habilidade Especial: {detailBg.feature.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.6, margin: 0 }}>{detailBg.feature.description}</p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'inline-block', paddingBottom: 4 }}>Equipamento Inícial</h3>
                <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.6, margin: 0 }}>{detailBg.equipment}</p>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>
              <button
                className="btn btn-primary"
                onClick={() => { handleBgSelect(detailBg.id); setDetailBg(null); }}
                style={{ padding: '0 32px' }}
              >
                Selecionar {detailBg.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-race Selection Modal */}
      {subRaceModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1100, backdropFilter: 'blur(10px)', padding: 20
        }} onClick={() => setSubRaceModalOpen(false)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 800, maxHeight: '85vh',
            borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 25px 60px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 24 }}>
                  {availableRaces.find(r => r.name === form.race)?.subRaceTitle || 'Escolha sua Linhagem'}
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--fg3)' }}>Você selecionou {form.race}. Agora escolha a característica da sua linhagem.</p>
              </div>
              <button className="btn btn-ghost" onClick={() => setSubRaceModalOpen(false)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: 24, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {availableRaces.find(r => r.name === form.race)?.lineages?.map(lineage => (
                <div
                  key={lineage.name}
                  onClick={() => {
                    setForm({ ...form, subRace: lineage.name })
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: 12,
                    backgroundColor: form.subRace === lineage.name ? 'rgba(var(--accent-rgb, 191,155,48), 0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${form.subRace === lineage.name ? 'var(--accent)' : 'rgba(255,255,255,0.05)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                  }}
                  className="subrace-option"
                >
                  {form.subRace === lineage.name && (
                    <div style={{ position: 'absolute', top: 12, right: 12, color: 'var(--accent)' }}>
                      < ChevronRight size={16} />
                    </div>
                  )}
                  <h4 style={{ margin: '0 0 12px', fontFamily: 'Cinzel, serif', fontSize: 16, color: form.subRace === lineage.name ? 'var(--accent)' : 'var(--fg)' }}>
                    {lineage.name}
                  </h4>
                  {lineage.description && (
                    <p style={{ fontSize: 12, color: 'var(--fg3)', marginBottom: 12, fontStyle: 'italic', lineHeight: 1.4 }}>
                      {lineage.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {lineage.traits.map(trait => (
                      <div key={trait.name}>
                        <div style={{ fontSize: 11, fontWeight: 'bold', color: 'var(--fg2)' }}>{trait.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--fg3)', lineHeight: 1.3 }}>{trait.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '20px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'right', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn btn-ghost" onClick={() => setSubRaceModalOpen(false)}>Cancelar</button>
              <button
                className="btn btn-primary"
                disabled={!form.subRace}
                onClick={() => {
                  setSubRaceModalOpen(false)
                  nextStep()
                }}
                style={{ padding: '0 32px' }}
              >
                Confirmar e Seguir
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        @media (max-width: 1200px) {
          .card-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .card-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .card-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        .bg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          align-items: start;
        }
        @media (max-width: 1200px) {
          .bg-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .bg-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 16px !important;
            margin-bottom: 24px !important;
          }
          .header-text h1 {
            font-size: 20px !important;
          }
          .character-info-footer {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .container {
            padding: 16px !important;
            padding-bottom: 120px !important;
          }
        }
      `}</style>
    </div>
  )
}
