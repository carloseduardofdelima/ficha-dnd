import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { calcModifier, type Character, type Defense } from '@/types/character';
import { RACES, type Race } from '@/lib/races';
import { RACES_2014 } from '@/lib/races-2014';
import { CLASSES } from '@/lib/classes';
import { CLASSES_2014 } from '@/lib/classes-2014';
import { BACKGROUNDS } from '@/lib/backgrounds';
import { BACKGROUNDS_2014 } from '@/lib/backgrounds-2014';
import SPELLS, { ALL_SPELLS } from '@/lib/spells';
import { ITEM_CATALOG } from '@/lib/inventory';
import CLASS_LEVEL1_DATA from '@/lib/class-features';
import { CLASS_PROGRESSION_2024, SPECIES_PROGRESSION_2024 } from '@/lib/dnd-progression-2024';
import { SUBCLASSES_2024 } from '@/lib/dnd-subclasses-2024';

const getCharacterFeatures = (character: Character) => {
  const features: { name: string; description: string }[] = [];
  const ruleset = character.ruleset || '2024';
  
  // Resolve Lists
  const raceList = ruleset === '2014' ? RACES_2014 : RACES;
  const classList = ruleset === '2014' ? CLASSES_2014 : CLASSES;
  const bgList = ruleset === '2014' ? BACKGROUNDS_2014 : BACKGROUNDS;

  // Race traits
  const race = raceList.find(r => r.name === character.race);
  if (race) {
    race.traits.forEach(t => features.push({ name: t.name, description: t.description }));
    
    // Subrace traits
    if (character.subrace && race.lineages) {
      const lineage = race.lineages.find(l => l.name === character.subrace);
      if (lineage) {
        lineage.traits.forEach(t => features.push({ name: `${t.name} (${character.subrace})`, description: t.description }));
      }
    }
  }

  // Background Feature
  const background = bgList.find(b => b.name === character.background);
  if (background && background.feature) {
    features.push({ 
      name: `Antecedente: ${background.feature.name}`, 
      description: background.feature.description 
    });
  }
  
  // Class Features
  const dndClass = classList.find(c => c.name === character.class);
  if (dndClass) {
    dndClass.features.forEach((f: any) => {
      // Filter level-specific features
      const featLevel = f.level || 1;
      if (featLevel > character.level) return;

      // Avoid duplicates if this will be added as a choice (is2014 specific)
      const isChoiceFeature = ruleset === '2014' && CLASS_LEVEL1_DATA[character.class]?.choices.some((c: any) => c.label === f.name);
      if (isChoiceFeature) return;
      
      features.push({ name: f.name, description: f.description });
    });
  }
  
  // 2024 Specific Progression
  if (ruleset === '2024') {
    // Class Level 1 Specific (Extra choices etc)
    const lvl1 = CLASS_LEVEL1_DATA[character.class];
    if (lvl1) {
      lvl1.passiveFeatures.forEach(f => {
        if (!features.some(feat => feat.name === f.name)) {
          features.push({ name: f.name, description: f.description });
        }
      });
    }

    // Progression Features (up to current level)
    for (let i = 1; i <= character.level; i++) {
      const classFeats = CLASS_PROGRESSION_2024[character.class]?.features[i] || [];
      classFeats.forEach(f => {
        if (!features.some(feat => feat.name === f)) {
          features.push({ name: f, description: 'Consulte o livro de regras para mais detalhes.' });
        }
      });
      
      const speciesFeats = SPECIES_PROGRESSION_2024[character.race]?.[i] || [];
      speciesFeats.forEach(f => {
        if (!features.some(feat => feat.name === f)) {
          features.push({ name: f, description: 'Característica racial adicional.' });
        }
      });

      if (character.subclass && SUBCLASSES_2024[character.class]?.[character.subclass]) {
        const subFeats = SUBCLASSES_2024[character.class][character.subclass].features[i] || [];
        subFeats.forEach(sf => {
          const name = typeof sf === 'string' ? sf : sf.name;
          const desc = typeof sf === 'string' ? 'Habilidade de subclasse.' : sf.description;
          if (!features.some(feat => feat.name === name)) {
            features.push({ name, description: desc });
          }
        });
      }
    }
  }

  // Feature Choices (from traits JSON)
  if (character.traits) {
    const traits = typeof character.traits === 'string' ? JSON.parse(character.traits) : character.traits;
    const lvl1 = CLASS_LEVEL1_DATA[character.class];
    
    Object.values(traits).forEach((val: any) => {
      if (Array.isArray(val)) {
        val.forEach(v => {
          if (lvl1) {
            lvl1.choices.forEach(c => {
              const opt = c.options.find(o => o.id === v);
              if (opt) {
                const name = ruleset === '2014' ? `${c.label}: ${opt.name}` : opt.name;
                if (!features.some(feat => feat.name === name)) {
                  features.push({ name, description: opt.description });
                }
              }
            });
          }
        });
      } else if (typeof val === 'string' && val) {
         if (lvl1) {
            lvl1.choices.forEach(c => {
              const opt = c.options.find(o => o.id === val);
              if (opt) {
                const name = ruleset === '2014' ? `${c.label}: ${opt.name}` : opt.name;
                if (!features.some(feat => feat.name === name)) {
                  features.push({ name, description: opt.description });
                }
              }
            });
         }
      }
    });
  }
  
  // Remove duplicates and proficiency traits (that are already in the proficiencies box)
  const seen = new Set();
  return features.filter(f => {
    if (seen.has(f.name)) return false;
    
    // Filter out traits that are strictly about weapon/armor/tool training
    const nameLow = f.name.toLowerCase();
    const descLow = f.description.toLowerCase();
    const isProficiencyTrait = nameLow.includes('treinamento') || 
                               nameLow.includes('proficiência') ||
                               descLow.includes('proficiência em');
    
    if (isProficiencyTrait) return false;

    seen.add(f.name);
    return true;
  });
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: '#000',
  },
  // Header Section
  header: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
    gap: 10,
  },
  logoArea: {
    width: '38%',
    gap: 2,
  },
  logo: {
    width: 100,
    height: 35,
    marginBottom: 2,
  },
  charNameBox: {
    borderWidth: 1.5,
    borderColor: '#000',
    padding: '2 6',
    minHeight: 28,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  charName: {
    fontFamily: 'Times-Bold',
    fontSize: 16,
    textTransform: 'uppercase',
    lineHeight: 1,
  },
  headerLabel: {
    fontSize: 5,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    marginTop: 2,
    color: '#000',
  },
  headerRight: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#000',
    padding: 5,
    gap: 5,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 5,
  },
  headerInfoItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 2,
  },
  headerInfoValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    minHeight: 12,
  },
  headerInfoLabel: {
    fontSize: 5,
    textTransform: 'uppercase',
    color: '#666',
    fontFamily: 'Helvetica-Bold',
    marginTop: 1,
  },

  // Main Layout
  mainGrid: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  attributesColumn: {
    width: 55,
    gap: 8,
  },
  skillsColumn: {
    flex: 1,
    gap: 8,
  },

  // Updated styles for better match
  columnLeft: {
    width: '31%',
    gap: 8,
  },
  columnCenter: {
    width: '34%',
    gap: 8,
  },
  columnRight: {
    width: '31%',
    gap: 8,
  },

  // Attribute Shield
  attributeShield: {
    height: 65,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 5,
  },
  attributeName: {
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    position: 'absolute',
    top: 5,
    color: '#312e81',
  },
  attributeMod: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    marginTop: 5,
  },
  attributeScoreCircle: {
    width: 22,
    height: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 8,
    position: 'absolute',
    bottom: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attributeScore: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },

  // Small Top Stats (Inspiration, Prof Bonus)
  smallStatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 15,
    padding: 4,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  smallStatValue: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  smallStatText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },

  // Sub-sections (Saves, Skills)
  blueSection: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 5,
    padding: 6,
  },
  sectionTitleInner: {
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 2,
    color: '#312e81',
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 12,
  },
  skillCircle: {
    width: 6,
    height: 6,
    borderWidth: 0.5,
    borderColor: '#312e81',
    borderRadius: 3,
    marginRight: 4,
  },
  skillCircleFilled: {
    backgroundColor: '#312e81',
  },
  skillMod: {
    width: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#94a3b8',
    textAlign: 'center',
    marginRight: 4,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },
  skillName: {
    fontSize: 7,
    color: '#1e293b',
  },

  // Center Column: Combat
  combatGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  combatBox: {
    width: '31%',
    height: 55,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  combatValue: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
  },
  combatLabel: {
    fontSize: 5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: 4,
    textAlign: 'center',
    width: '100%',
  },

  // HP Section
  hpContainer: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
    overflow: 'hidden',
  },
  hpHeader: {
    backgroundColor: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  hpMain: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hpFooter: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  hpFooterText: {
    textAlign: 'center',
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 6
  },

  // Attacks & Spellcasting
  attacksBox: {
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
    flex: 1,
  },
  attackRow: {
    flexDirection: 'row',
    height: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cbd5e1',
    alignItems: 'center',
  },
  attackCell: {
    fontSize: 7,
    paddingHorizontal: 2,
  },

  // Right Column: Traits
  traitBox: {
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
    minHeight: 50,
    position: 'relative',
  },
  traitLabel: {
    fontSize: 5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: 2,
    right: 5,
    color: '#312e81',
  },
  traitContent: {
    fontSize: 7,
    lineHeight: 1.2,
  },

  featuresBox: {
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1.5,
    borderBottomColor: '#312e81',
    marginBottom: 6,
    textAlign: 'center',
    color: '#312e81',
  },

  // Equipment with Money
  equipmentBox: {
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 5,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
  },
  moneyColumn: {
    width: 30,
    borderRightWidth: 1,
    borderRightColor: '#cbd5e1',
    padding: 4,
    gap: 5,
  },
  moneyBox: {
    borderWidth: 0.5,
    borderColor: '#94a3b8',
    height: 18,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moneyLabel: {
    fontSize: 5,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  equipmentList: {
    flex: 1,
    padding: 8,
  },
  // Passive Perception Banner
  passiveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 5,
    height: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    marginBottom: 5,
  },
  passiveValue: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#312e81',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  }
});

interface Props {
  character: Character;
}

const CharacterPDF = ({ character }: Props) => {
  const profBonus = character.proficiencyBonus;

  function parseJsonField<T>(field: T | string | null | undefined): T {
    if (!field) return {} as T;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field) as T;
      } catch {
        return {} as T;
      }
    }
    return field as T;
  }

  const skillsObj = parseJsonField<Record<string, boolean>>(character.skills);
  const traitsObj = parseJsonField<Record<string, any>>(character.traits);
  const expertisesObj = traitsObj?.expertises || {};
  const inventoryArr = Array.isArray(character.inventory) 
    ? character.inventory 
    : (typeof character.inventory === 'string' ? parseJsonField<any[]>(character.inventory) : []);
  const spellsArr = Array.isArray(character.spells)
    ? character.spells
    : (typeof character.spells === 'string' ? parseJsonField<string[]>(character.spells) : []);

  const formatMod = (score: number) => {
    const mod = calcModifier(score);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const getSkillMod = (skillId: string, attrScore: number) => {
    const mod = calcModifier(attrScore);
    const isProficient = skillsObj[skillId];
    const isExpert = expertisesObj[skillId];
    const total = mod + (isProficient ? profBonus : 0) + (isExpert ? profBonus : 0);
    return total >= 0 ? `+${total}` : `${total}`;
  };

  const abilities = [
    { id: 'strength', name: 'Força', score: character.strength, skills: [{id: 'athletics', name: 'Atletismo'}] },
    { id: 'dexterity', name: 'Destreza', score: character.dexterity, skills: [{id:'acrobatics', name:'Acrobacia'},{id:'sleightOfHand', name:'Prestidigitação'},{id:'stealth', name:'Furtividade'}] },
    { id: 'constitution', name: 'Constituição', score: character.constitution, skills: [] },
    { id: 'intelligence', name: 'Inteligência', score: character.intelligence, skills: [{id:'arcana', name:'Arcanismo'},{id:'history', name:'História'},{id:'investigation', name:'Investigação'},{id:'nature', name:'Natureza'},{id:'religion', name:'Religião'}] },
    { id: 'wisdom', name: 'Sabedoria', score: character.wisdom, skills: [{id:'animalHandling', name:'Adestrar Animais'},{id:'insight', name:'Intuição'},{id:'medicine', name:'Medicina'},{id:'perception', name:'Percepção'},{id:'survival', name:'Sobrevivência'}] },
    { id: 'charisma', name: 'Carisma', score: character.charisma, skills: [{id:'deception', name:'Enganação'},{id:'intimidation', name:'Intimidação'},{id:'performance', name:'Atuação'},{id:'persuasion', name:'Persuasão'}] },
  ];

  const allSkills = abilities.flatMap(a => a.skills);
  const weapons = inventoryArr.filter((item: any) => item.item.category === 'weapon');
  
  // Resolve Spells, Race, Class and Background based on ruleset
  const resolvedSpells = spellsArr.map(id => SPELLS.find(s => s.id === id)).filter(Boolean);
  
  const ruleset = character.ruleset || '2024';
  const raceList = ruleset === '2014' ? RACES_2014 : RACES;
  const classList = ruleset === '2014' ? CLASSES_2014 : CLASSES;
  const bgList = ruleset === '2014' ? BACKGROUNDS_2014 : BACKGROUNDS;

  const race = raceList.find(r => r.name === character.race);
  const dndClass = classList.find(c => c.name === character.class);
  const background = bgList.find(b => b.name === character.background);

  const allFeatures = getCharacterFeatures(character);
  const firstTenFeatures = allFeatures.slice(0, 10);
  const remainingFeatures = allFeatures.slice(10);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
              <View style={styles.header}>
          <View style={styles.logoArea}>
             <Image 
               src="https://upload.wikimedia.org/wikipedia/pt/0/08/Dungeons_%26_Dragons_Logo.png" 
               style={styles.logo} 
             />
             <View style={styles.charNameBox}>
                <Text style={styles.charName}>{character.name}</Text>
             </View>
             <Text style={styles.headerLabel}>Nome do Personagem</Text>
          </View>
 
          <View style={styles.headerRight}>
             <View style={styles.headerRow}>
                <View style={styles.headerInfoItem}>
                   <Text style={styles.headerInfoValue}>{character.class} {character.level}</Text>
                   <Text style={styles.headerInfoLabel}>Classe e Nível</Text>
                </View>
                <View style={styles.headerInfoItem}>
                   <Text style={styles.headerInfoValue}>{character.background || '-'}</Text>
                   <Text style={styles.headerInfoLabel}>Antecedente</Text>
                </View>
                <View style={styles.headerInfoItem}>
                   <Text style={styles.headerInfoValue}>{character.playerName || '-'}</Text>
                   <Text style={styles.headerInfoLabel}>Nome do Jogador</Text>
                </View>
             </View>
             <View style={styles.headerRow}>
                <View style={styles.headerInfoItem}>
                   <Text style={styles.headerInfoValue}>{character.race} {character.subrace ? `(${character.subrace})` : ''}</Text>
                   <Text style={styles.headerInfoLabel}>Raça</Text>
                </View>
                <View style={styles.headerInfoItem}>
                   <Text style={styles.headerInfoValue}>—</Text>
                   <Text style={styles.headerInfoLabel}>Tendência</Text>
                </View>
                <View style={styles.headerInfoItem}>
                   <Text style={styles.headerInfoValue}>{character.exp || '0'}</Text>
                   <Text style={styles.headerInfoLabel}>Pontos de Experiência</Text>
                </View>
             </View>
          </View>
        </View>


        {/* Main Content Grid */}
        <View style={styles.mainGrid}>
          
          {/* Column 1: Attributes & Skills */}
          <View style={styles.columnLeft}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
               <View style={{ width: 55, gap: 5 }}>
                  {abilities.map(abil => (
                    <View key={abil.id} style={styles.attributeShield}>
                       <Text style={styles.attributeName}>{abil.name.toUpperCase()}</Text>
                       <Text style={styles.attributeMod}>{formatMod(abil.score)}</Text>
                       <View style={styles.attributeScoreCircle}><Text style={styles.attributeScore}>{abil.score}</Text></View>
                    </View>
                  ))}
               </View>
               <View style={{ flex: 1, gap: 5 }}>
                  <View style={styles.smallStatBox}><View style={styles.smallStatValue}><Text style={styles.smallStatText}>0</Text></View><Text style={styles.headerLabel}>Inspiração</Text></View>
                  <View style={styles.smallStatBox}><View style={styles.smallStatValue}><Text style={styles.smallStatText}>+{profBonus}</Text></View><Text style={styles.headerLabel}>Bônus de Proficiência</Text></View>
                  <View style={styles.blueSection}>
                     {abilities.map(abil => (
                       <View key={abil.id} style={styles.skillRow}><View style={styles.skillCircle} /><Text style={styles.skillMod}>{formatMod(abil.score)}</Text><Text style={styles.skillName}>{abil.name}</Text></View>
                     ))}
                     <Text style={styles.sectionTitleInner}>Testes de Resistência</Text>
                  </View>
                  <View style={[styles.blueSection, { flex: 1 }]}>
                     {allSkills.sort((a,b) => a.name.localeCompare(b.name)).map(skill => {
                       const attr = abilities.find(a => a.skills.some(s => s.id === skill.id));
                       const isExpert = expertisesObj[skill.id];
                       return (
                         <View key={skill.id} style={styles.skillRow}>
                            <View style={[styles.skillCircle, skillsObj[skill.id] ? styles.skillCircleFilled : {}]} />
                            <Text style={styles.skillMod}>{getSkillMod(skill.id, attr?.score || 10)}</Text>
                            <Text style={styles.skillName}>{skill.name}{isExpert ? '*' : ''}</Text>
                         </View>
                       );
                     })}
                     <Text style={styles.sectionTitleInner}>Perícias</Text>
                  </View>
               </View>
            </View>
            <View style={styles.passiveBanner}>
               <View style={styles.passiveValue}><Text style={{fontSize: 10, fontFamily: 'Helvetica-Bold'}}>{10 + calcModifier(character.wisdom) + (skillsObj['perception'] ? profBonus : 0)}</Text></View>
               <Text style={styles.headerLabel}>Sabedoria (Percepção) Passiva</Text>
            </View>
            <View style={[styles.blueSection, { flex: 1, minHeight: 120 }]}>
                {/* Languages Logic */}
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold' }}>Linguagens:</Text>
                <View style={{ marginLeft: 4, marginBottom: 4 }}>
                  <Text style={{ fontSize: 7 }}>• Comum</Text>
                  {(() => {
                    const languages = [];
                    if (race?.name === 'Elfo' || race?.name === 'Meio-Elfo') languages.push('Élfico');
                    if (race?.name === 'Anão') languages.push('Anão');
                    if (race?.name === 'Tiefling') languages.push('Infernal');
                    if (race?.name === 'Draconato') languages.push('Dracônico');
                    if (race?.name === 'Orc' || race?.name === 'Meio-Orc') languages.push('Orc');
                    if (race?.name === 'Gnomo') languages.push('Gnômico');
                    if (race?.name === 'Halfling') languages.push('Halfling');
                    
                    return languages.map(lang => (
                      <Text key={lang} style={{ fontSize: 7 }}>• {lang}</Text>
                    ));
                  })()}
                </View>

                {/* Combined Proficiencies Logic */}
                {(() => {
                  const ruleset = character.ruleset || '2024';
                  const classList = ruleset === '2014' ? CLASSES_2014 : CLASSES;
                  const charClass = classList.find(c => c.name === character.class);
                  
                  // Scan Racial Traits for proficiencies
                  const raceData = (ruleset === '2014' ? RACES_2014 : RACES).find(r => r.name === character.race);
                  const racialTraits = raceData ? [...(raceData.traits || [])] : [];
                  if (character.subrace && raceData?.lineages) {
                    const lineage = raceData.lineages.find(l => l.name === character.subrace);
                    if (lineage) racialTraits.push(...(lineage.traits || []));
                  }

                  const racialProfs = racialTraits.filter(t => 
                    t.name.toLowerCase().includes('treinamento') || 
                    t.name.toLowerCase().includes('proficiência') ||
                    t.description.toLowerCase().includes('proficiência em')
                  );

                  const weaponRacial = racialProfs.filter(t => 
                    t.name.toLowerCase().includes('arma') || 
                    t.name.toLowerCase().includes('combate') ||
                    t.description.toLowerCase().includes('arma') ||
                    t.description.toLowerCase().includes('machado') ||
                    t.description.toLowerCase().includes('martelo') ||
                    t.description.toLowerCase().includes('espada') ||
                    t.description.toLowerCase().includes('arco') ||
                    t.description.toLowerCase().includes('beste')
                  );
                  const armorRacial = racialProfs.filter(t => t.name.toLowerCase().includes('armadura') || t.description.toLowerCase().includes('armadura'));
                  const toolRacial = racialProfs.filter(t => 
                    t.name.toLowerCase().includes('ferramenta') || 
                    t.description.toLowerCase().includes('ferramenta') ||
                    t.name.toLowerCase().includes('instrumento') ||
                    t.name.toLowerCase().includes('jogo')
                  );

                  return (
                    <View style={{ gap: 4 }}>
                      <View>
                        <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold' }}>Armaduras:</Text>
                        <Text style={{ fontSize: 7, marginLeft: 4 }}>{charClass?.armorProf || 'Nenhuma'}</Text>
                        {/* Armor Category Detail - Only show if class has armor profs and it's not "Nenhuma" */}
                        {charClass?.armorProf && charClass.armorProf.toLowerCase() !== 'nenhuma' && (
                          <Text style={{ fontSize: 5.5, color: '#444', marginLeft: 4, marginTop: 1, fontStyle: 'italic' }}>
                            {charClass.armorProf.toLowerCase().includes('pesadas') 
                              ? 'Leves/Médias (Couro, Peitoral, Cota de Malha) e Pesadas (Talas, Placas).'
                              : charClass.armorProf.toLowerCase().includes('médias')
                              ? 'Leves (Couro, Acolchoada) e Médias (Gibão, Cota de Malha, Peitoral).'
                              : 'Apenas Leves (Couro, Acolchoada, Couro Batido).'}
                          </Text>
                        )}
                        {armorRacial.map(t => (
                          <View key={t.name} style={{ marginLeft: 4, marginTop: 1 }}>
                            <Text style={{ fontSize: 6, fontFamily: 'Helvetica-Bold', color: '#000' }}>• {t.name} (Racial)</Text>
                            <Text style={{ fontSize: 5.5, color: '#000', marginLeft: 4 }}>{t.description}</Text>
                          </View>
                        ))}
                      </View>

                      <View>
                        <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold' }}>Armas:</Text>
                        <Text style={{ fontSize: 7, marginLeft: 4 }}>{charClass?.weaponProf || 'Nenhuma'}</Text>
                        {/* Weapon Category Detail */}
                        <View style={{ marginLeft: 4, marginTop: 1 }}>
                          <Text style={{ fontSize: 5.5, color: '#444', fontStyle: 'italic' }}>
                            {charClass?.weaponProf?.toLowerCase().includes('marciais') 
                              ? 'Simples: Adaga, Lança, Maça, Besta Leve, Arco Curto.'
                              : 'Simples: Adaga, Clava, Lança, Maça, Bordão, Besta Leve.'}
                          </Text>
                          {charClass?.weaponProf?.toLowerCase().includes('marciais') && (
                            <Text style={{ fontSize: 5.5, color: '#444', fontStyle: 'italic' }}>
                              Marciais: Espadas, Rapieira, Machado, Arco Longo, Martelo de Guerra.
                            </Text>
                          )}
                        </View>
                        {weaponRacial.map(t => (
                          <View key={t.name} style={{ marginLeft: 4, marginTop: 1 }}>
                            <Text style={{ fontSize: 6, fontFamily: 'Helvetica-Bold', color: '#000' }}>• {t.name} (Racial)</Text>
                            <Text style={{ fontSize: 5.5, color: '#000', marginLeft: 4 }}>{t.description}</Text>
                          </View>
                        ))}
                      </View>

                      {(toolRacial.length > 0 || charClass?.toolProf) && (
                        <View>
                          <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold' }}>Ferramentas e Outros:</Text>
                          {charClass?.toolProf && <Text style={{ fontSize: 7, marginLeft: 4 }}>• {charClass.toolProf}</Text>}
                          {toolRacial.map(t => (
                            <View key={t.name} style={{ marginLeft: 4, marginTop: 1 }}>
                              <Text style={{ fontSize: 6, fontFamily: 'Helvetica-Bold', color: '#000' }}>• {t.name} (Racial)</Text>
                              <Text style={{ fontSize: 5.5, color: '#000', marginLeft: 4 }}>{t.description}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  );
                })()}
               <Text style={[styles.sectionTitleInner, { marginTop: 'auto' }]}>Idiomas e Outras Proficiências</Text>
            </View>
          </View>

          {/* Column 2: Combat, HP, Attacks, Equipment */}
          <View style={styles.columnCenter}>
            <View style={styles.combatGrid}>
               <View style={styles.combatBox}><Text style={styles.combatValue}>{character.armorClass}</Text><Text style={styles.combatLabel}>Classe de Armadura</Text></View>
               <View style={styles.combatBox}><Text style={styles.combatValue}>+{character.initiative}</Text><Text style={styles.combatLabel}>Iniciativa</Text></View>
               <View style={styles.combatBox}><Text style={styles.combatValue}>{Math.round((character.speed / 5) * 1.5)}m</Text><Text style={styles.combatLabel}>Deslocamento</Text></View>
            </View>

            <View style={styles.hpContainer}>
               <View style={styles.hpHeader}><Text style={styles.headerLabel}>PV Totais</Text><Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold' }}>{character.maxHp}</Text></View>
               <View style={styles.hpMain}><Text style={{ fontSize: 24, fontFamily: 'Times-Bold' }}>{character.currentHp}</Text></View>
               <View style={styles.hpFooter}><Text style={styles.hpFooterText}>Pontos de Vida Atuais</Text></View>
            </View>

            <View style={[styles.hpContainer, { height: 35 }]}>
               <View style={styles.hpMain}><Text style={{ fontSize: 16, color: '#ccc' }}>-</Text></View>
               <View style={styles.hpFooter}><Text style={styles.hpFooterText}>Pontos de Vida Temporários</Text></View>
            </View>

            <View style={{ flexDirection: 'row', gap: 5 }}>
               <View style={[styles.hpContainer, { flex: 1 }]}>
                  <View style={styles.hpHeader}><Text style={styles.headerLabel}>Total</Text><Text style={{ fontSize: 8 }}>{character.level}d{dndClass?.hitDie?.replace('d', '') || '10'}</Text></View>
                  <View style={[styles.hpMain, { height: 25 }]}><Text style={{ fontSize: 12 }}>{dndClass?.hitDie || 'd10'}</Text></View>
                  <View style={styles.hpFooter}><Text style={styles.hpFooterText}>Dados de Vida</Text></View>
               </View>
               <View style={[styles.hpContainer, { flex: 1.2 }]}>
                  <View style={{ padding: 4, gap: 2 }}>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.headerLabel}>Sucessos</Text>
                        <View style={{ flexDirection: 'row', gap: 2 }}><View style={styles.skillCircle}/><View style={styles.skillCircle}/><View style={styles.skillCircle}/></View>
                     </View>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.headerLabel}>Falhas</Text>
                        <View style={{ flexDirection: 'row', gap: 2 }}><View style={styles.skillCircle}/><View style={styles.skillCircle}/><View style={styles.skillCircle}/></View>
                     </View>
                  </View>
                  <View style={styles.hpFooter}><Text style={styles.hpFooterText}>Testes Contra a Morte</Text></View>
               </View>
            </View>

            <View style={styles.attacksBox}>
               <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#312e81', paddingBottom: 2, marginBottom: 4 }}>
                  <Text style={[styles.headerLabel, { width: '40%' }]}>NOME</Text>
                  <Text style={[styles.headerLabel, { width: '20%', textAlign: 'center' }]}>BÔNUS</Text>
                  <Text style={[styles.headerLabel, { width: '40%' }]}>DANO / TIPO</Text>
               </View>
               
               <View style={{ gap: 2 }}>
                  {weapons.map((w: any, idx: number) => {
                    const catalogItem = ITEM_CATALOG.find(i => i.id === w.item.id || i.name === w.item.name);
                    const isFinesse = catalogItem?.properties?.includes('Acuidade');
                    const isRanged = catalogItem?.category === 'weapon' && (catalogItem as any).range;
                    const mod = (isFinesse || isRanged) ? calcModifier(character.dexterity) : calcModifier(character.strength);
                    const atkBonus = mod + profBonus;
                    
                    // Extract damage from properties string (e.g. "1d8 cortante, versátil")
                    const damageParts = (catalogItem?.properties || '1d4 —').split(',');
                    const firstPart = damageParts[0].trim();
                    const damageDie = firstPart.split(' ')[0]; // gets "1d8"
                    const damageType = firstPart.split(' ').slice(1).join(' '); // gets "cortante"
                    
                    const damageText = `${damageDie} ${mod >= 0 ? '+' : ''}${mod} ${damageType}`;
                    
                    return (
                      <View key={`wpn-${idx}`} style={styles.attackRow}>
                         <Text style={[styles.attackCell, { width: '40%', fontFamily: 'Helvetica-Bold' }]}>{w.item.name}</Text>
                         <Text style={[styles.attackCell, { width: '20%', textAlign: 'center' }]}>+{atkBonus}</Text>
                         <Text style={[styles.attackCell, { width: '40%' }]}>{damageText}</Text>
                      </View>
                    );
                  })}

                  {/* Spells Second */}
                  {resolvedSpells.map((s: any, idx: number) => (
                     <View key={`spl-${idx}`} style={styles.attackRow}>
                        <Text style={[styles.attackCell, { width: '40%', fontFamily: 'Helvetica-Bold' }]}>{s.name}</Text>
                        <Text style={[styles.attackCell, { width: '20%', textAlign: 'center' }]}>
                           {s.attackSave === 'Ataque' ? `+${profBonus + calcModifier(character.intelligence)}` : (s.attackSave || '—')}
                        </Text>
                        <Text style={[styles.attackCell, { width: '40%' }]}>{s.damageEffect}</Text>
                     </View>
                  ))}

                  {/* Fill empty rows if needed */}
                  {Array.from({ length: Math.max(0, 6 - weapons.length - resolvedSpells.length) }).map((_, i) => (
                     <View key={`empty-${i}`} style={styles.attackRow} />
                  ))}
               </View>
               <Text style={styles.sectionTitleInner}>ATAQUES E MAGIAS</Text>
            </View>

            <View style={styles.equipmentBox}>
               <View style={styles.moneyColumn}>
                  {(() => {
                    const coins = { PC: 0, PP: 0, PE: 0, PO: 0, PL: 0 };
                    inventoryArr.forEach((item: any) => {
                      const name = item.item?.name || '';
                      const qty = item.qty || 1;
                      const match = name.match(/\((\d+)\s*(pc|pp|pe|po|pl)\)/i);
                      if (match) {
                        const val = parseInt(match[1]);
                        const type = match[2].toUpperCase() as keyof typeof coins;
                        coins[type] += val * qty;
                      }
                    });
                    return Object.entries(coins).map(([type, value]) => (
                      <View key={type} style={{ gap: 2 }}>
                        <View style={styles.moneyBox}>
                          <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{value}</Text>
                        </View>
                        <Text style={styles.moneyLabel}>{type}</Text>
                      </View>
                    ));
                  })()}
               </View>
               <View style={styles.equipmentList}>
                  {inventoryArr?.slice(0, 8).map((item: any, idx: number) => (
                    <Text key={idx} style={{ fontSize: 7 }}>• {item.item?.name} (x{item.qty || item.quantity})</Text>
                  ))}
                  <Text style={[styles.sectionTitleInner, { marginTop: 'auto' }]}>EQUIPAMENTO</Text>
               </View>
            </View>
                      </View>
          <View style={styles.columnRight}>
            <View style={{ gap: 5 }}>
               <View style={styles.traitBox}><Text style={styles.traitContent}>{character.personalityTraits || traitsObj?.personality || ''}</Text><Text style={styles.traitLabel}>Traços de Personalidade</Text></View>
               <View style={styles.traitBox}><Text style={styles.traitContent}>{character.ideals || traitsObj?.ideals || ''}</Text><Text style={styles.traitLabel}>Ideais</Text></View>
               <View style={styles.traitBox}><Text style={styles.traitContent}>{character.bonds || traitsObj?.bonds || ''}</Text><Text style={styles.traitLabel}>Ligações</Text></View>
               <View style={styles.traitBox}><Text style={styles.traitContent}>{character.flaws || traitsObj?.flaws || ''}</Text><Text style={styles.traitLabel}>Defeitos</Text></View>
            </View>
 
            <View style={[styles.featuresBox, { flex: 1 }]}>
               <View style={{ gap: 4 }}>
                  {firstTenFeatures.map((feat, idx) => (
                    <View key={idx} style={{ marginBottom: 3 }}>
                       <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold' }}>• {feat.name}</Text>
                       <Text style={{ fontSize: 6, color: '#333', marginLeft: 6 }}>{feat.description}</Text>
                    </View>
                  ))}
               </View>
               <Text style={[styles.sectionTitle, { marginTop: 'auto', borderBottomWidth: 0, borderTopWidth: 1.5, paddingTop: 4 }]}>Características e Habilidades</Text>
            </View>
          </View>
        </View>

        <Text style={{ textAlign: 'right', fontSize: 6, color: '#999', marginTop: 5 }}>
          Gerado por Ficha D&D - {new Date().toLocaleDateString('pt-BR')}
        </Text>
      </Page>

      {remainingFeatures.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={[styles.header, { marginBottom: 10 }]}>
            <View style={styles.logoArea}>
              <View style={styles.charNameBox}>
                <Text style={styles.charName}>{character.name}</Text>
              </View>
              <Text style={styles.headerLabel}>Características e Habilidades (Continuação)</Text>
            </View>
          </View>

          <View style={[styles.featuresBox, { flex: 1, padding: 15 }]}>
            <View style={{ gap: 6 }}>
              {remainingFeatures.map((feat, idx) => (
                <View key={idx} style={{ marginBottom: 5, borderBottomWidth: 0.5, borderBottomColor: '#eee', paddingBottom: 4 }}>
                  <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold' }}>• {feat.name}</Text>
                  <Text style={{ fontSize: 7, color: '#333', marginLeft: 8, marginTop: 1 }}>{feat.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={{ textAlign: 'right', fontSize: 6, color: '#999', marginTop: 10 }}>
            Gerado por Ficha D&D - {new Date().toLocaleDateString('pt-BR')} - Página 2
          </Text>
        </Page>
      )}
      {/* Page 3: Spells (For Spellcasters) */}
      {(() => {
        const is2014 = character.ruleset === '2014';
        const spellcastingClasses = ['Bardo', 'Clérigo', 'Druida', 'Paladino', 'Patrulheiro', 'Feiticeiro', 'Bruxo', 'Mago'];
        const isSpellcaster = spellcastingClasses.includes(character.class);
        
        if (!isSpellcaster) return null;

        const allSpells = is2014 ? ALL_SPELLS : SPELLS; // Use legacy spells if 2014
        const charSpells = Array.isArray(character.spells) 
          ? character.spells.map(id => allSpells.find(s => s.id === id)).filter(Boolean)
          : [];

        // Group spells by level
        const spellsByLevel: Record<number, any[]> = {};
        for (let i = 0; i <= 9; i++) {
          spellsByLevel[i] = charSpells.filter(s => s && s.level === i);
        }

        // Spellcasting Stats
        const castingAbility = is2014 ? (CLASSES_2014.find(c => c.name === character.class)?.primaryAttr || 'Sabedoria') : 'Sabedoria';
        const abilityMod = calcModifier((character as any)[castingAbility.toLowerCase() === 'carisma' ? 'charisma' : castingAbility.toLowerCase() === 'sabedoria' ? 'wisdom' : 'intelligence']);
        const saveDC = 8 + profBonus + abilityMod;
        const attackBonus = profBonus + abilityMod;

        return (
          <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={{ flexDirection: 'row', borderBottom: 2, borderBottomColor: '#000', paddingBottom: 10, marginBottom: 15, gap: 10 }}>
              <View style={{ flex: 2, border: 1, borderColor: '#000', padding: 5 }}>
                <Text style={{ fontSize: 6, textTransform: 'uppercase', fontFamily: 'Helvetica-Bold' }}>Classe de Conjurador</Text>
                <Text style={{ fontSize: 10, marginTop: 2 }}>{character.class}</Text>
              </View>
              <View style={{ flex: 1, border: 1, borderColor: '#000', padding: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 6, textTransform: 'uppercase', fontFamily: 'Helvetica-Bold' }}>Habilidade Chave</Text>
                <Text style={{ fontSize: 10, marginTop: 2 }}>{castingAbility}</Text>
              </View>
              <View style={{ flex: 1, border: 1, borderColor: '#000', padding: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 6, textTransform: 'uppercase', fontFamily: 'Helvetica-Bold' }}>CD de Resistência</Text>
                <Text style={{ fontSize: 10, marginTop: 2 }}>{saveDC}</Text>
              </View>
              <View style={{ flex: 1, border: 1, borderColor: '#000', padding: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 6, textTransform: 'uppercase', fontFamily: 'Helvetica-Bold' }}>Bônus de Ataque</Text>
                <Text style={{ fontSize: 10, marginTop: 2 }}>+{attackBonus}</Text>
              </View>
            </View>

            {/* Spell Levels Grid */}
            <View style={{ flexDirection: 'row', gap: 10, flex: 1, paddingBottom: 20 }}>
              {/* Column 1: Cantrips, Lvl 1, Lvl 2 */}
              <View style={{ flex: 1, gap: 10 }}>
                {[0, 1, 2].map(lvl => (
                  <View key={lvl} style={{ border: 1, borderColor: '#000', padding: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 3, marginBottom: 5 }}>
                      <View style={{ width: 15, height: 15, border: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginRight: 5 }}>
                        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{lvl}</Text>
                      </View>
                      <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>
                        {lvl === 0 ? 'Truques' : `Nível ${lvl}`}
                      </Text>
                      {lvl > 0 && (
                        <View style={{ marginLeft: 'auto', flexDirection: 'row', gap: 5 }}>
                          <View style={{ border: 1, borderColor: '#000', width: 25, height: 12, backgroundColor: '#fff' }} />
                          <View style={{ border: 1, borderColor: '#000', width: 25, height: 12, backgroundColor: '#fff' }} />
                        </View>
                      )}
                    </View>
                    {/* Spell Lines */}
                    <View style={{ marginTop: 2 }}>
                      {Array.from({ length: lvl === 0 ? 15 : 13 }).map((_, lineIdx) => {
                        const spell = spellsByLevel[lvl]?.[lineIdx];
                        return (
                          <View key={lineIdx} style={{ flexDirection: 'row', alignItems: 'center', height: 12, borderBottomWidth: 0.5, borderBottomColor: '#ccc', marginBottom: 1 }}>
                            <View style={{ width: 8, height: 8, border: 0.5, borderColor: '#666', marginRight: 4, borderRadius: 1 }} />
                            <Text style={{ fontSize: 7 }}>{spell ? spell.name : ''}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>

              {/* Column 2: Lvl 3, 4, 5 */}
              <View style={{ flex: 1, gap: 10 }}>
                {[3, 4, 5].map(lvl => (
                  <View key={lvl} style={{ border: 1, borderColor: '#000', padding: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 3, marginBottom: 5 }}>
                      <View style={{ width: 15, height: 15, border: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginRight: 5 }}>
                        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{lvl}</Text>
                      </View>
                      <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>Nível {lvl}</Text>
                      <View style={{ marginLeft: 'auto', flexDirection: 'row', gap: 5 }}>
                        <View style={{ border: 1, borderColor: '#000', width: 25, height: 12, backgroundColor: '#fff' }} />
                        <View style={{ border: 1, borderColor: '#000', width: 25, height: 12, backgroundColor: '#fff' }} />
                      </View>
                    </View>
                    {/* Spell Lines */}
                    <View style={{ marginTop: 2 }}>
                      {Array.from({ length: 13 }).map((_, lineIdx) => {
                        const spell = spellsByLevel[lvl]?.[lineIdx];
                        return (
                          <View key={lineIdx} style={{ flexDirection: 'row', alignItems: 'center', height: 12, borderBottomWidth: 0.5, borderBottomColor: '#ccc', marginBottom: 1 }}>
                            <View style={{ width: 8, height: 8, border: 0.5, borderColor: '#666', marginRight: 4, borderRadius: 1 }} />
                            <Text style={{ fontSize: 7 }}>{spell ? spell.name : ''}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>

              {/* Column 3: Lvl 6, 7, 8, 9 */}
              <View style={{ flex: 1, gap: 10 }}>
                {[6, 7, 8, 9].map(lvl => (
                  <View key={lvl} style={{ border: 1, borderColor: '#000', padding: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 3, marginBottom: 5 }}>
                      <View style={{ width: 15, height: 15, border: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginRight: 5 }}>
                        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{lvl}</Text>
                      </View>
                      <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>Nível {lvl}</Text>
                      <View style={{ marginLeft: 'auto', flexDirection: 'row', gap: 5 }}>
                        <View style={{ border: 1, borderColor: '#000', width: 25, height: 12, backgroundColor: '#fff' }} />
                        <View style={{ border: 1, borderColor: '#000', width: 25, height: 12, backgroundColor: '#fff' }} />
                      </View>
                    </View>
                    {/* Spell Lines */}
                    <View style={{ marginTop: 2 }}>
                      {Array.from({ length: 9 }).map((_, lineIdx) => {
                        const spell = spellsByLevel[lvl]?.[lineIdx];
                        return (
                          <View key={lineIdx} style={{ flexDirection: 'row', alignItems: 'center', height: 12, borderBottomWidth: 0.5, borderBottomColor: '#ccc', marginBottom: 1 }}>
                            <View style={{ width: 8, height: 8, border: 0.5, borderColor: '#666', marginRight: 4, borderRadius: 1 }} />
                            <Text style={{ fontSize: 7 }}>{spell ? spell.name : ''}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <Text style={{ textAlign: 'right', fontSize: 6, color: '#999', marginTop: 10 }}>
              Folha de Conjurador - {character.name} - {new Date().toLocaleDateString('pt-BR')}
            </Text>
          </Page>
        );
      })()}
    </Document>
  );
};

export default CharacterPDF;
