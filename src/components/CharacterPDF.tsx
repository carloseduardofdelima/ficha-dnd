import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { calcModifier, type Character, type Defense } from '@/types/character';
import { RACES } from '@/lib/races';
import CLASS_LEVEL1_DATA from '@/lib/class-features';
import { CLASS_PROGRESSION_2024, SPECIES_PROGRESSION_2024 } from '@/lib/dnd-progression-2024';
import { SUBCLASSES_2024 } from '@/lib/dnd-subclasses-2024';

const getCharacterFeatures = (character: Character) => {
  const features: string[] = [];
  
  // Race traits
  const race = RACES.find(r => r.name === character.race);
  if (race) {
    race.traits.forEach(t => features.push(t.name));
    
    // Subrace traits
    if (character.subrace && race.lineages) {
      const lineage = race.lineages.find(l => l.name === character.subrace);
      if (lineage) {
        lineage.traits.forEach(t => features.push(`${t.name} (${character.subrace})`));
      }
    }
  }
  
  // Class Level 1
  const lvl1 = CLASS_LEVEL1_DATA[character.class];
  if (lvl1) {
    lvl1.passiveFeatures.forEach(f => features.push(f.name));
  }
  
  // Progression Features (up to current level)
  for (let i = 1; i <= character.level; i++) {
    const classFeats = CLASS_PROGRESSION_2024[character.class]?.features[i] || [];
    classFeats.forEach(f => features.push(f));
    
    // Species progression
    const speciesFeats = SPECIES_PROGRESSION_2024[character.race]?.[i] || [];
    speciesFeats.forEach(f => features.push(f));

    // Subclass features
    if (character.subclass && SUBCLASSES_2024[character.class]?.[character.subclass]) {
      const subFeats = SUBCLASSES_2024[character.class][character.subclass].features[i] || [];
      subFeats.forEach(sf => features.push(typeof sf === 'string' ? sf : sf.name));
    }
  }
  
  return Array.from(new Set(features)); 
};

const styles = StyleSheet.create({
  page: {
    padding: 25,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 7.5,
    color: '#000',
  },
  // Header Section
  header: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    gap: 10,
  },
  avatarHeaderArea: {
    width: 65,
    height: 65,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  logoArea: {
    width: '30%',
  },
  charNameBox: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 2,
    marginBottom: 2,
  },
  charName: {
    fontFamily: 'Times-Bold',
    fontSize: 24,
    textTransform: 'uppercase',
  },
  headerLabel: {
    fontSize: 6,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
  },
  headerRight: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerInfoItem: {
    width: '33.33%',
    padding: 2,
    marginBottom: 3,
  },
  headerInfoLabel: {
    fontSize: 5,
    textTransform: 'uppercase',
    color: '#333',
    fontFamily: 'Helvetica-Bold',
    marginTop: 2,
  },
  headerInfoValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
    paddingBottom: 2,
  },

  charImageBox: {
    width: '100%',
    height: 110,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  charImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  // Main Layout
  mainGrid: {
    flexDirection: 'row',
    gap: 12,
    flex: 1, // Make main grid grow
  },
  columnLeft: {
    width: '28%',
    gap: 8,
  },
  columnCenter: {
    width: '35%',
    gap: 8,
  },
  columnRight: {
    width: '37%',
    gap: 8,
  },

  // Left Column Styles
  leftGrayPanel: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  topStatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 20,
    padding: 4,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  topStatValue: {
    width: 28,
    height: 28,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  topStatText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  
  abilitySection: {
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  abilityBox: {
    width: 44,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  abilityLabel: {
    fontSize: 6,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    position: 'absolute',
    top: 4,
  },
  abilityMod: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginTop: 6,
  },
  abilityScoreBox: {
    position: 'absolute',
    bottom: -6,
    width: 22,
    height: 14,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 7,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  abilityScore: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },
  skillsList: {
    flex: 1,
    marginLeft: 10,
    gap: 2,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 12,
  },
  skillCircle: {
    width: 7,
    height: 7,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 3.5,
    marginRight: 5,
  },
  skillCircleFilled: {
    backgroundColor: '#000',
  },
  skillMod: {
    width: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    textAlign: 'center',
    marginRight: 5,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  skillName: {
    fontSize: 8,
  },

  // Center Column Styles
  combatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  combatSquare: {
    width: '31%',
    height: 50,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  hpSection: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 6,
    padding: 6,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  hpLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    marginBottom: 4,
  },
  hpMain: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hpValue: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
  },
  tempHpBox: {
    height: 40,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 6,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  subStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  subStatBox: {
    flex: 1,
    height: 55,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  attacksBox: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 6,
    padding: 8,
    flex: 1, // Make attacks grow
    backgroundColor: '#fff',
  },
  attackTableHead: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderBottomWidth: 1.5,
    borderBottomColor: '#000',
    paddingVertical: 3,
    marginBottom: 4,
  },
  attackRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    height: 18,
    alignItems: 'center',
  },

  // Right Column Styles
  traitsSection: {
    gap: 8,
    marginBottom: 12,
  },
  traitBox: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 6,
    padding: 6,
    minHeight: 45,
    backgroundColor: '#fff',
  },
  traitLabel: {
    fontSize: 5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 'auto',
    fontFamily: 'Helvetica-Bold',
  },
  featuresBox: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    flex: 1, // Make features grow
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1.5,
    borderBottomColor: '#000',
    marginBottom: 6,
    textAlign: 'center',
  },

  // Bottom Section
  bottomArea: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 5,
    height: '15%', 
  },
  bottomBox: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#fff',
  }
});

interface Props {
  character: Character;
}

const CharacterPDF = ({ character }: Props) => {
  const profBonus = character.proficiencyBonus;

  // Safe parsing for JSON fields that might be strings or objects
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
  const inventoryArr = Array.isArray(character.inventory) 
    ? character.inventory 
    : (typeof character.inventory === 'string' ? parseJsonField<any[]>(character.inventory) : []);

  const formatMod = (score: number) => {
    const mod = calcModifier(score);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const getSkillMod = (skill: string, attrScore: number) => {
    const mod = calcModifier(attrScore);
    const isProficient = skillsObj[skill];
    const total = mod + (isProficient ? profBonus : 0);
    return total >= 0 ? `+${total}` : `${total}`;
  };

  const abilities = [
    { name: 'Força', score: character.strength, skills: [{ id: 'athletics', name: 'Atletismo' }] },
    { name: 'Destreza', score: character.dexterity, skills: [{ id: 'acrobatics', name: 'Acrobacia' }, { id: 'stealth', name: 'Furtividade' }, { id: 'sleightOfHand', name: 'Prestidigitação' }] },
    { name: 'Constituição', score: character.constitution, skills: [] },
    { name: 'Inteligência', score: character.intelligence, skills: [{ id: 'arcana', name: 'Arcanismo' }, { id: 'history', name: 'História' }, { id: 'investigation', name: 'Investigação' }, { id: 'nature', name: 'Natureza' }, { id: 'religion', name: 'Religião' }] },
    { name: 'Sabedoria', score: character.wisdom, skills: [{ id: 'animalHandling', name: 'Lidar com Animais' }, { id: 'insight', name: 'Intuição' }, { id: 'medicine', name: 'Medicina' }, { id: 'perception', name: 'Percepção' }, { id: 'survival', name: 'Sobrevivência' }] },
    { name: 'Carisma', score: character.charisma, skills: [{ id: 'deception', name: 'Enganação' }, { id: 'intimidation', name: 'Intimidação' }, { id: 'performance', name: 'Atuação' }, { id: 'persuasion', name: 'Persuasão' }] },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Area */}
        <View style={styles.header}>
          {character.avatarUrl && (
            <View style={styles.avatarHeaderArea}>
              <Image src={character.avatarUrl} style={styles.charImage} />
            </View>
          )}
          
          <View style={styles.logoArea}>
            <View style={styles.charNameBox}>
               <Text style={[styles.charName, { fontSize: character.name.length > 12 ? 18 : 24 }]}>{character.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
               <Text style={styles.headerLabel}>Nome do Personagem</Text>
               <Text style={{ fontFamily: 'Times-Bold', fontSize: 10, marginTop: -2 }}>Nível {character.level}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.headerInfoItem}>
              <Text style={styles.headerInfoValue}>{character.class}</Text>
              <Text style={styles.headerInfoLabel}>Classe</Text>
            </View>
            <View style={styles.headerInfoItem}>
              <Text style={styles.headerInfoValue}>{character.background || '-'}</Text>
              <Text style={styles.headerInfoLabel}>Antecedente</Text>
            </View>
            <View style={styles.headerInfoItem}>
              <Text style={styles.headerInfoValue}>{character.playerName || '-'}</Text>
              <Text style={styles.headerInfoLabel}>Nome do Jogador</Text>
            </View>
            <View style={styles.headerInfoItem}>
              <Text style={styles.headerInfoValue}>{character.race}</Text>
              <Text style={styles.headerInfoLabel}>Raça</Text>
            </View>
            <View style={styles.headerInfoItem}>
              <Text style={styles.headerInfoValue}>-</Text>
              <Text style={styles.headerInfoLabel}>Alinhamento</Text>
            </View>
            <View style={styles.headerInfoItem}>
              <Text style={styles.headerInfoValue}>{character.exp || '0'}</Text>
              <Text style={styles.headerInfoLabel}>Pontos de Experiência</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainGrid}>
          {/* Column 1: Abilities & Skills */}
          <View style={styles.columnLeft}>
            <View style={styles.leftGrayPanel}>
              <View style={styles.topStatBox}>
                <View style={styles.topStatValue}><Text style={styles.topStatText}>+{profBonus}</Text></View>
                <Text style={styles.headerLabel}>Bônus de Proficiência</Text>
              </View>
              <View style={styles.topStatBox}>
                <View style={styles.topStatValue}><Text style={styles.topStatText}>0</Text></View>
                <Text style={styles.headerLabel}>Inspiração</Text>
              </View>

              {abilities.map(abil => (
                <View key={abil.name} style={styles.abilitySection}>
                  <View style={styles.abilityBox}>
                    <Text style={styles.abilityLabel}>{abil.name.slice(0, 3)}</Text>
                    <Text style={styles.abilityMod}>{formatMod(abil.score)}</Text>
                    <View style={styles.abilityScoreBox}>
                      <Text style={styles.abilityScore}>{abil.score}</Text>
                    </View>
                  </View>
                  <View style={styles.skillsList}>
                    <View style={styles.skillRow}>
                      <View style={styles.skillCircle} />
                      <Text style={styles.skillMod}>{formatMod(abil.score)}</Text>
                      <Text style={styles.skillName}>Salvaguarda</Text>
                    </View>
                    {abil.skills.map(s => (
                      <View key={s.id} style={styles.skillRow}>
                        <View style={[styles.skillCircle, skillsObj[s.id] ? styles.skillCircleFilled : {}]} />
                        <Text style={styles.skillMod}>{getSkillMod(s.id, abil.score)}</Text>
                        <Text style={styles.skillName}>{s.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Column 2: Combat, HP, Attacks */}
          <View style={styles.columnCenter}>
            <View style={styles.combatHeader}>
              <View style={styles.combatSquare}>
                <Text style={styles.headerInfoLabel}>CA</Text>
                <Text style={styles.hpValue}>{character.armorClass}</Text>
              </View>
              <View style={styles.combatSquare}>
                <Text style={styles.headerInfoLabel}>Iniciativa</Text>
                <Text style={styles.hpValue}>+{character.initiative}</Text>
              </View>
              <View style={styles.combatSquare}>
                <Text style={styles.headerInfoLabel}>Desloc.</Text>
                <Text style={styles.hpValue}>{character.speed}</Text>
              </View>
            </View>

            <View style={styles.hpSection}>
              <View style={styles.hpLine}>
                <Text style={styles.headerInfoLabel}>PV Máximos</Text>
                <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{character.maxHp}</Text>
              </View>
              <View style={styles.hpMain}>
                <Text style={styles.hpValue}>{character.currentHp}</Text>
                <Text style={styles.headerInfoLabel}>Pontos de Vida Atuais</Text>
              </View>
            </View>

            <View style={styles.tempHpBox}>
              <Text style={styles.headerInfoLabel}>Pontos de Vida Temporários</Text>
            </View>

            <View style={styles.subStatsRow}>
              <View style={styles.subStatBox}>
                <Text style={styles.headerInfoLabel}>Dados de Vida</Text>
                <Text style={{ marginTop: 8, fontSize: 14, fontFamily: 'Helvetica-Bold' }}>1d{character.level}</Text>
              </View>
              <View style={styles.subStatBox}>
                <View style={{ flexDirection: 'row', gap: 2 }}><Text style={styles.headerInfoLabel}>SUCESSOS O O O</Text></View>
                <View style={{ flexDirection: 'row', gap: 2 }}><Text style={styles.headerInfoLabel}>FALHAS O O O</Text></View>
                <Text style={styles.traitLabel}>Testes de Morte</Text>
              </View>
            </View>

            <View style={styles.attacksBox}>
              <View style={styles.attackTableHead}>
                <Text style={{ width: '40%', fontSize: 5, paddingLeft: 4 }}>NOME</Text>
                <Text style={{ width: '20%', fontSize: 5 }}>BÔNUS</Text>
                <Text style={{ width: '40%', fontSize: 5 }}>DANO/TIPO</Text>
              </View>
              {inventoryArr?.filter((i: any) => i.item?.category === 'weapon').slice(0, 5).map((w: any, idx: number) => (
                <View key={idx} style={styles.attackRow}>
                   <Text style={{ width: '40%', fontSize: 8, paddingLeft: 4 }}>{w.item?.name}</Text>
                   <Text style={{ width: '20%', fontSize: 8 }}>{formatMod(character.strength)}</Text>
                   <Text style={{ width: '40%', fontSize: 8 }}>-</Text>
                </View>
              ))}
              {/* Lines for blank rows */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <View key={i} style={styles.attackRow} />
              ))}
              <Text style={[styles.headerInfoLabel, { textAlign: 'center', marginTop: 'auto' }]}>Ataques e Conjuração</Text>
            </View>
          </View>

          {/* Column 3: Traits & Features */}
          <View style={styles.columnRight}>
            <View style={styles.traitsSection}>
              <View style={styles.traitBox}>
                <Text style={{ fontSize: 7 }}>{traitsObj?.personality || ''}</Text>
                <Text style={styles.traitLabel}>Traços de Personalidade</Text>
              </View>
              <View style={styles.traitBox}>
                <Text style={{ fontSize: 7 }}>{traitsObj?.ideals || ''}</Text>
                <Text style={styles.traitLabel}>Ideais</Text>
              </View>
              <View style={styles.traitBox}>
                <Text style={{ fontSize: 7 }}>{traitsObj?.bonds || ''}</Text>
                <Text style={styles.traitLabel}>Vínculos</Text>
              </View>
              <View style={styles.traitBox}>
                <Text style={{ fontSize: 7 }}>{traitsObj?.flaws || ''}</Text>
                <Text style={styles.traitLabel}>Defeitos</Text>
              </View>
            </View>

            <View style={styles.featuresBox}>
               <Text style={styles.sectionTitle}>Características e Talentos</Text>
               <View style={{ marginTop: 6, gap: 2 }}>
                  {getCharacterFeatures(character).map((feat, idx) => (
                    <Text key={idx} style={{ fontSize: 7, lineHeight: 1.3 }}>• {feat}</Text>
                  ))}
                  {getCharacterFeatures(character).length === 0 && (
                    <Text style={{ fontSize: 7, color: '#999' }}>Nenhuma característica especial identificada.</Text>
                  )}
               </View>
            </View>
          </View>
        </View>

        {/* Bottom Section for completeness */}
        <View style={styles.bottomArea}>
           <View style={[styles.bottomBox, { width: '28%' }]}>
              <Text style={styles.sectionTitle}>Idiomas e Outras Proficiências</Text>
              <Text style={{ fontSize: 7 }}>• Comum</Text>
           </View>
           <View style={[styles.bottomBox, { flex: 1 }]}>
              <Text style={styles.sectionTitle}>Equipamento</Text>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                 <View style={{ gap: 2 }}>
                    {inventoryArr?.slice(0, 10).map((item: any, idx: number) => (
                      <Text key={idx} style={{ fontSize: 7 }}>• {item.item?.name} (x{item.qty || item.quantity})</Text>
                    ))}
                 </View>
              </View>
           </View>
        </View>

        <Text style={{ textAlign: 'right', fontSize: 6, color: '#999', marginTop: 10 }}>
          Gerado por Ficha D&D - {new Date().toLocaleDateString('pt-BR')}
        </Text>
      </Page>
    </Document>
  );
};

export default CharacterPDF;
