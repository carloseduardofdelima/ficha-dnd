export interface SubclassFeature {
  name: string;
  description: string;
}

export type SubclassData = Record<number, SubclassFeature[]>;

export interface ClassSubclasses {
  [subclassName: string]: {
    features: SubclassData;
    spells?: string[]; // For domains, circles, etc.
  };
}

export const SUBCLASSES_2024: Record<string, ClassSubclasses> = {
  'Bárbaro': {
    "Path of the Berserker": {
      features: {
        3: [{ name: "Frenzy", description: "Quando usa Reckless Attack durante Rage, o primeiro alvo atingido no turno sofre dano extra = Xd6, onde X é seu Rage Damage bonus. Sem Exaustão." }],
        6: [{ name: "Mindless Rage", description: "Imunidade às condições Enfeitiçado e Assustado enquanto Rage estiver ativa." }],
        10: [{ name: "Retaliation", description: "Quando sofre dano de uma criatura a até 5 pés, pode usar Reação para realizar um ataque corpo a corpo contra ela." }],
        14: [{ name: "Intimidating Presence", description: "Ação Bônus: criaturas à sua escolha em 30 pés fazem salvaguarda de SAB (CD = 8 + FOR + prof) ou ficam Assustadas por 1 minuto. 1x/descanso longo (ou gaste um uso de Rage para recuperar)." }]
      }
    },
    "Path of the Wild Heart": {
      features: {
        3: [
          { name: "Animal Speaker", description: "Pode lançar Beast Sense e Speak with Animals como Ritual (SAB é o atributo de conjuração)." },
          { name: "Rage of the Wilds", description: "Ao ativar Rage, escolhe UMA das opções: Urso (Resistência geral), Águia (Disengage+Dash), Lobo (Vantagem para aliados)." }
        ],
        6: [{ name: "Aspect of the Wilds", description: "Ganha uma habilidade passiva (troca a cada descanso longo): Coruja (Darkvision), Pantera (Escalar), Salmão (Nadar)." }],
        10: [{ name: "Nature Speaker", description: "Pode lançar Commune with Nature como Ritual." }],
        14: [{ name: "Power of the Wilds", description: "Ao ativar Rage, escolhe uma opção adicional: Falcão (Voo), Leão (Desvantagem para inimigos), Ram (+dano em empurrão)." }]
      }
    },
    "Path of the World Tree": {
      features: {
        3: [{ name: "Vitality of the Tree", description: "Ganhe Temp HP = 10 + nível. Pode dar 2d6 Temp HP a um aliado como parte do acerto." }],
        6: [{ name: "Branches of the Tree", description: "Teleporta criaturas que falharem em salvar CON para espaços em 30 pés." }],
        10: [{ name: "Battering Roots", description: "Armas pesadas/versáteis ganham alcance +10 pés e opções de Weapon Mastery (Push e Topple)." }],
        14: [{ name: "Travel Along the Tree", description: "Teleporta até 60 pés consigo e até 6 aliados." }]
      }
    },
    "Path of the Zealot": {
      features: {
        3: [
          { name: "Divine Fury", description: "Causa +1d6 dano extra (Necrótico ou Radiante). Escala nos níveis 10 e 14." },
          { name: "Warrior of the Gods", description: "Cura via dados (d12s) como Ação Bônus. Ressurreição grátis." }
        ],
        6: [{ name: "Fanatical Focus", description: "1x por Rage: rerrole salvaguarda falha." }],
        10: [{ name: "Zealous Presence", description: "Ação Bônus para conceder Vantagem em ataques/salvaguardas a aliados." }],
        14: [{ name: "Rage of the Gods", description: "Voo 60 pés, resistências e impede queda a 0 PV (você ou aliado)." }]
      }
    }
  },
  'Bardo': {
    "College of Dance": {
      features: {
        3: [
          { name: "Dazzling Footwork", description: "Artes Marciais (d6 DEX). Bardic Inspiration em si = ataque desarmado bônus." },
          { name: "Inspiring Movement", description: "Move até metade do movimento sem ataques de oportunidade com aliado." }
        ],
        6: [{ name: "Tandem Footwork", description: "Bônus de Inciativa para aliados próximo." }],
        10: [{ name: "Leading Evasion", description: "Evasion concedida a aliados em 5 pés." }],
        14: [{ name: "Tandem/Leading Aprimorados", description: "Melhorias nas features de dança." }]
      }
    },
    "College of Glamour": {
      features: {
        3: [
          { name: "Beguiling Magic", description: "Lançar Encantamento/Ilusão = Bardic Inspiration grátis ou efeito de controle." },
          { name: "Mantle of Inspiration", description: "Temp HP e movimento livre para aliados." }
        ],
        6: [{ name: "Mantle of Majesty", description: "Lança Command como Ação Bônus por 1 min grátis." }],
        10: [{ name: "Unbreakable Majesty", description: "Dificulta ser atacado (salv. CAR)." }],
        14: [{ name: "Beguiling Magic II", description: "Encantamentos aprimorados." }]
      }
    },
    "College of Lore": {
      features: {
        3: [
          { name: "Bonus Proficiencies", description: "3 perícias à escolha." },
          { name: "Cutting Words", description: "Reduz ataques/dano/testes de inimigos." }
        ],
        6: [{ name: "Magical Discoveries", description: "2 magias extras de qualquer lista." }],
        10: [{ name: "Peerless Skill", description: "Adiciona Bardic Insp. a falhas. Se falhar, não gasta." }],
        14: [{ name: "Peerless/Cutting Aprimorados", description: "Melhorias nas features centrais." }]
      }
    },
    "College of Valor": {
      features: {
        3: [
          { name: "Combat Inspiration", description: "Inspiração usada em dano ou CA." },
          { name: "Martial Training", description: "Proficiência em armaduras médias/pesadas e armas marciais." }
        ],
        6: [{ name: "Extra Attack", description: "2 ataques por ação." }],
        10: [{ name: "Battle Magic", description: "Lança magia e ataca como Bônus." }],
        14: [{ name: "Combat/Battle Aprimorados", description: "Melhorias em combate e magia." }]
      }
    }
  },
  'Clérigo': {
    "Life Domain": {
      spells: ["Bless", "Cure Wounds", "Lesser Restoration", "Revivify", "Banishment", "Death Ward", "Mass Cure Wounds", "Raise Dead"],
      features: {
        3: [
          { name: "Disciple of Life", description: "Cura +2 por nível do slot." },
          { name: "Preserve Life", description: "Channel Divinity: curar Bloodied a 30 pés." }
        ],
        6: [{ name: "Blessed Healer", description: "Cura a si mesmo ao curar outros." }],
        10: [{ name: "Divine Strike", description: "1x/turno +1d8 Radiante em ataques." }],
        14: [{ name: "Supreme Healing", description: "Cura sempre o valor máximo dos dados." }]
      }
    },
    "Light Domain": {
      spells: ["Burning Hands", "Faerie Fire", "Scorching Ray", "See Invisibility", "Daylight", "Fireball", "Guardian of Faith", "Wall of Fire"],
      features: {
        3: [
          { name: "Radiance of the Dawn", description: "Channel Divinity: pulso Radiante de 30 pés." },
          { name: "Warding Flare", description: "Impõe Desvantagem em ataque (Reação)." }
        ],
        6: [{ name: "Improved Warding Flare", description: "Protege aliados com Warding Flare." }],
        10: [{ name: "Corona of Light", description: "Aura que reduz salvaguardas de Fogo/Radiante dos inimigos." }],
        14: [{ name: "Improved Flare II", description: "Melhoria na defesa radiante." }]
      }
    },
    "Trickery Domain": {
      spells: ["Charm Person", "Disguise Self", "Mirror Image", "Pass Without Trace", "Hypnotic Pattern", "Nondetection", "Confusion", "Dimension Door"],
      features: {
        3: [
          { name: "Blessing of the Trickster", description: "Vantagem em Furtividade ao toque." },
          { name: "Invoke Duplicity", description: "Channel Divinity: cria duplicata ilusória." }
        ],
        6: [{ name: "Trickster's Transposition", description: "Teleporta para o lugar da duplicata." }],
        10: [{ name: "Improved Duplicity", description: "Cria até 4 duplicatas." }],
        14: [{ name: "Improved Duplicity II", description: "Melhorias na ilusão." }]
      }
    },
    "War Domain": {
      spells: ["Divine Favor", "Shield of Faith", "Magic Weapon", "Spiritual Weapon", "Crusader's Mantle", "Spirit Guardians", "Freedom of Movement", "Stoneskin"],
      features: {
        3: [
          { name: "Guided Strike", description: "Channel Divinity: +10 no ataque." },
          { name: "War Priest", description: "Ataque extra como Bônus (SAB usos)." }
        ],
        6: [{ name: "War God's Blessing", description: "Dá +10 no ataque para aliados." }],
        10: [{ name: "Divine Strike", description: "1x/turno +1d8 dano físico extra." }],
        14: [{ name: "Avatar of Battle", description: "Resistência a dano físico não-mágico." }]
      }
    }
  },
  'Druida': {
    "Circle of the Land": {
      features: {
        3: [
          { name: "Circle Spells", description: "Ganha magias baseadas em terreno escolhido." },
          { name: "Land's Aid", description: "Channel Divinity: cura e causa dano simultâneos." }
        ],
        6: [{ name: "Natural Recovery", description: "Recupera slots no descanso curto." }],
        10: [{ name: "Nature's Ward", description: "Imunidade a Veneno/Doença e Resistência Elemental." }],
        14: [{ name: "Nature's Sanctuary", description: "Proteção contra feras e plantas." }]
      }
    },
    "Circle of the Moon": {
      features: {
        3: [
          { name: "Circle Forms", description: "Transforma em feras de CR alto (Mín CR 1, Nível/3)." },
          { name: "Moonlight Step", description: "Teleporte 30 pés como Ação Bônus." }
        ],
        6: [{ name: "Improved Circle Forms", description: "Bônus de proficiência no dano da fera." }],
        10: [{ name: "Moonlight Step II", description: "Usa teleporte após Wild Shape." }],
        14: [{ name: "Thousand Forms", description: "Lança Alter Self à vontade." }]
      }
    },
    "Circle of the Sea": {
      features: {
        3: [
          { name: "Wrath of the Sea", description: "Aura de dano Frio/Trovejo e empurrão." },
          { name: "Circle Spells", description: "Magias marítimas sempre preparadas." }
        ],
        6: [{ name: "Aquatic Affinity", description: "Nadar e respirar sob a água." }],
        10: [{ name: "Stormborn", description: "Voo em ambientes abertos." }],
        14: [{ name: "Oceanic Gift", description: "Concede benefícios de mar a aliados." }]
      }
    },
    "Circle of the Stars": {
      features: {
        3: [
          { name: "Star Map", description: "Ganha Guiding Bolt grátis e Guidance." },
          { name: "Starry Form", description: "Ação Bônus: escolhe forma Archer, Chalice ou Dragon." }
        ],
        6: [{ name: "Cosmic Omen", description: "Sorte (Weal) ou azar (Woe) via 1d6." }],
        10: [{ name: "Twinkling Constellations", description: "Troca forma todo turno; melhorias nos bônus." }],
        14: [{ name: "Full of Stars", description: "Resistências físicas em forma cósmica." }]
      }
    }
  },
  'Guerreiro': {
    "Battle Master": {
      features: {
        3: [{ name: "Combat Superiority", description: "4 dados d8; 3 manobras. Student of War (proficiência)." }],
        7: [{ name: "Know Your Enemy", description: "Revela fraquezas do alvo. Dados sobem para d10." }],
        10: [{ name: "Improved Superiority", description: "5 dados d10; mais 2 manobras." }],
        15: [{ name: "Relentless", description: "Ganha d8 grátis se estiver sem dados. Dados sobem para d12." }],
        18: [{ name: "Ultimate Superiority", description: "6 dados d12." }]
      }
    },
    "Champion": {
      features: {
        3: [
          { name: "Improved Critical", description: "Crítico em 19-20." },
          { name: "Remarkable Athlete", description: "Vantagem em Iniciativa e Atletismo." }
        ],
        7: [{ name: "Additional Fighting Style", description: "Ganha novo estilo de combate." }],
        10: [{ name: "Heroic Warrior", description: "Ganha Inspiração Heroica todo turno." }],
        15: [{ name: "Superior Critical", description: "Crítico em 18-20." }],
        18: [{ name: "Survivor", description: "Recupera vida quando ferido (Bloodied)." }]
      }
    },
    "Eldritch Knight": {
      features: {
        3: [
          { name: "Spellcasting", description: "Magias de Mago (1/3 caster)." },
          { name: "Weapon Bond", description: "Liga-se a 2 armas; evoca como Bônus." }
        ],
        7: [{ name: "War Magic", description: "Ataca e usa Cantrip no lugar de um ataque." }],
        10: [{ name: "Eldritch Strike", description: "Ataque impõe desvantagem em salvaguarda contra sua magia." }],
        15: [{ name: "Arcane Charge", description: "Teleporta 30 pés ao usar Action Surge." }],
        18: [{ name: "Improved War Magic", description: "Troca 2 ataques por magia nível 1-2." }]
      }
    },
    "Psi Warrior": {
      features: {
        3: [{ name: "Psionic Power", description: "Dados psi para defesa, ataque ou movimento." }],
        7: [{ name: "Telekinetic Adept", description: "Voo temporário e empurrão psi." }],
        10: [{ name: "Guarded Mind", description: "Resistência psíquica; remove medo/encanto." }],
        15: [{ name: "Bulwark of Force", description: "Escudo de meia cobertura para o grupo." }],
        18: [{ name: "Telekinetic Master", description: "Telekinesis livre + ataque bônus." }]
      }
    }
  },
  'Monge': {
    "Warrior of Mercy": {
      features: {
        3: [
          { name: "Hand of Harm/Healing", description: "Causa dano necrótico ou cura via Focus Points." },
          { name: "Implements of Mercy", description: "Proficiências médicas." }
        ],
        6: [{ name: "Physician's Touch", description: "Harm paralisa; Healing cura doenças." }],
        11: [{ name: "Flurry of Healing/Harm", description: "Efeitos integrados ao Flurry of Blows." }],
        17: [{ name: "Hand of Ultimate Mercy", description: "Ressuscita mortos (5 Focus)." }]
      }
    },
    "Warrior of Shadow": {
      features: {
        3: [{ name: "Shadow Arts", description: "Lança magias de sombra (Darkness, etc) com Focus." }],
        6: [{ name: "Shadow Step", description: "Teleporte entre sombras e vantagem no ataque." }],
        11: [{ name: "Cloak of Shadows", description: "Invisibilidade na escuridão." }],
        17: [{ name: "Shadow Flicker", description: "Teleporte integrado ao Flurry of Blows." }]
      }
    },
    "Warrior of the Elements": {
      features: {
        3: [{ name: "Elemental Attunement", description: "Alcance +10p e dano elemental." }],
        6: [{ name: "Elemental Burst", description: "Explosão elemental em cone ou linha." }],
        11: [{ name: "Stride of the Elements", description: "Voo e natação elementais." }],
        17: [{ name: "Elemental Epitome", description: "Resistência e dano em área elemental." }]
      }
    },
    "Warrior of the Open Hand": {
      features: {
        3: [{ name: "Open Hand Technique", description: "Empurra, derruba ou ganha vantagem no Flurry." }],
        6: [{ name: "Wholeness of Body", description: "Cura a si mesmo (3x)." }],
        11: [{ name: "Fleet Step", description: "Teleporte no Step of the Wind." }],
        17: [{ name: "Quivering Palm", description: "Vibração letal que causa 10d12 ou 0 PV." }]
      }
    }
  },
  'Paladino': {
    "Oath of Devotion": {
      spells: ["Shield of Faith", "Aid", "Zone of Truth", "Beacon of Hope", "Dispel Magic", "Death Ward"],
      features: {
        3: [{ name: "Sacred Weapon", description: "Arma brilha e ganha bônus de ataque." }],
        7: [{ name: "Aura of Devotion", description: "Imunidade a Encantamento para o grupo." }],
        15: [{ name: "Purity of Spirit", description: "Dificulta ataques de criaturas planares." }],
        20: [{ name: "Holy Nimbus", description: "Aura de luz solar e dano radiante." }]
      }
    },
    "Oath of Glory": {
      spells: ["Guiding Bolt", "Enhance Ability", "Magic Weapon", "Haste", "Compulsion", "Freedom of Movement"],
      features: {
        3: [
          { name: "Inspiring Smite", description: "Distribui Temp HP após Divine Smite." },
          { name: "Peerless Athlete", description: "Bônus em Atletismo e saltos." }
        ],
        7: [{ name: "Aura of Alacrity", description: "Bônus de velocidade para o grupo." }],
        15: [{ name: "Glorious Defense", description: "Aumenta CA de aliado e contra-ataca." }],
        20: [{ name: "Living Legend", description: "Transforma em lenda: acertos automáticos." }]
      }
    },
    "Oath of the Ancients": {
      spells: ["Ensnaring Strike", "Misty Step", "Moonbeam", "Plant Growth", "Ice Storm", "Stoneskin"],
      features: {
        3: [
          { name: "Nature's Wrath", description: "Plantas prendem o inimigo (Channel)." },
          { name: "Turn the Faithless", description: "Expulsa fadas e infernais." }
        ],
        7: [{ name: "Aura of Warding", description: "Resistência a dano de magias para o grupo." }],
        15: [{ name: "Undying Sentinel", description: "Evita cair a 0 PV; não envelhece." }],
        20: [{ name: "Elder Champion", description: "Regeneração de vida e magias de druida." }]
      }
    },
    "Oath of Vengeance": {
      spells: ["Bane", "Hunter's Mark", "Hold Person", "Misty Step", "Haste", "Banishment", "Dimension Door"],
      features: {
        3: [{ name: "Vow of Enmity", description: "Vantagem contra um alvo específico." }],
        7: [{ name: "Relentless Avenger", description: "Move-se após acertar ataque de oportunidade." }],
        15: [{ name: "Soul of Vengeance", description: "Ataca o alvo do Vow como reação." }],
        20: [{ name: "Avenging Angel", description: "Ganha asas, voo e aura de medo." }]
      }
    }
  },
  'Patrulheiro': {
    "Beast Master": {
      features: {
        3: [{ name: "Primal Companion", description: "Invoca fera (Terra, Ar ou Mar) que age no seu turno." }],
        7: [{ name: "Exceptional Training", description: "Comanda fera para ajudar/esquivar; ataques mágicos." }],
        11: [{ name: "Bestial Fury", description: "A fera faz 2 ataques." }],
        15: [{ name: "Share Spells", description: "Magias em você também afetam a fera." }]
      }
    },
    "Fey Wanderer": {
      features: {
        3: [
          { name: "Dreadful Strikes", description: "+1d4 dano psíquico extra." },
          { name: "Otherworldly Glamour", description: "Soma SAB em Deception/Persuasion." }
        ],
        7: [{ name: "Beguiling Twist", description: "Passa medo/encanto resistido para outro alvo." }],
        11: [{ name: "Fey Reinforcements", description: "Summon Fey grátis sem concentração por 1 min." }],
        15: [{ name: "Misty Wanderer", description: "Misty Step compartilhado com aliados." }]
      }
    },
    "Gloom Stalker": {
      features: {
        3: [
          { name: "Dread Ambusher", description: "+dano e ataque extra no 1º turno." },
          { name: "Umbral Sight", description: "Darkvision; invisível para quem usa darkvision." }
        ],
        7: [{ name: "Iron Mind", description: "Proficiência em salvaguarda de SAB." }],
        11: [{ name: "Stalker's Flurry", description: "Ataque extra se errar um ataque." }],
        15: [{ name: "Shadowy Dodge", description: "Impõe desvantagem no ataque inimigo (Reação)." }]
      }
    },
    "Hunter": {
      features: {
        3: [{ name: "Hunter's Prey", description: "Escolhe: Colossus Slayer, Horde Breaker ou Giant Killer." }],
        7: [{ name: "Defensive Tactics", description: "Opções de defesa contra grupos ou gigantes." }],
        11: [{ name: "Multiattack", description: "Ataque em área (Volley ou Whirlwind)." }],
        15: [{ name: "Superior Defense", description: "Evasion, Stand Against the Tide ou Uncanny Dodge." }]
      }
    }
  },
  'Ladino': {
    "Arcane Trickster": {
      features: {
        3: [
          { name: "Spellcasting", description: "Magias de Mago." },
          { name: "Mage Hand Legerdemain", description: "Mage Hand invisível e útil." }
        ],
        9: [{ name: "Magical Ambush", description: "Invisibilidade impõe desvantagem contra suas magias." }],
        13: [{ name: "Versatile Trickster", description: "Mage Hand ajuda a dar Sneak Attack." }],
        17: [{ name: "Spell Thief", description: "Rouba e suprime magias de inimigos (Reação)." }]
      }
    },
    "Assassin": {
      features: {
        3: [{ name: "Assassinate", description: "Vantagem em iniciativa e dano extra no 1º turno." }],
        9: [{ name: "Infiltration Expertise", description: "Identidades falsas e mira aprimorada." }],
        13: [{ name: "Envenom Weapons", description: "+2d6 veneno e condição poisoned." }],
        17: [{ name: "Death Strike", description: "Dano duplo em ataques surpresa (salv. CON)." }]
      }
    },
    "Soulknife": {
      features: {
        3: [
          { name: "Psychic Blades", description: "Cria facas psíquicas para atacar." },
          { name: "Psionic Power", description: "Dados psi para perícias e telepatia." }
        ],
        9: [{ name: "Soul Blades", description: "Adiciona dados psi para acertar ataques ou teleporte." }],
        13: [{ name: "Psychic Veil", description: "Invisibilidade psíquica por 1 hora." }],
        17: [{ name: "Rend Mind", description: "Sneak Attack pode atordoar (Stun)." }]
      }
    },
    "Thief": {
      features: {
        3: [
          { name: "Fast Hands", description: "Usa itens/ferramentas como Bônus." },
          { name: "Second-Story Work", description: "Escalar livre e saltos melhores." }
        ],
        9: [{ name: "Supreme Sneak", description: "Vantagem em Furtividade." }],
        13: [{ name: "Use Magic Device", description: "Usa qualquer item mágico ou pergaminho." }],
        17: [{ name: "Thief's Reflexes", description: "Dois turnos no 1º round." }]
      }
    }
  },
  'Feiticeiro': {
    "Aberrant Sorcery": {
      features: {
        3: [{ name: "Telepathic Speech", description: "Link telepático com criatura." }],
        6: [{ name: "Psionic Sorcery", description: "Gasta Sorcery Points em vez de Slots; sem componentes." }],
        14: [{ name: "Revelation in Flesh", description: "Voo, natação, visão verdadeira ou atravessar objetos." }],
        18: [{ name: "Warping Implosion", description: "Teleporte com explosão gravitacional." }]
      }
    },
    "Clockwork Sorcery": {
      features: {
        3: [{ name: "Restore Balance", description: "Cancela vantagem/desvantagem (Reação)." }],
        6: [{ name: "Bulwark of Law", description: "Escudo de absorção de dano." }],
        14: [{ name: "Trance of Order", description: "Mínimo 10 em rolagens de d20 por 1 min." }],
        18: [{ name: "Clockwork Cavalcade", description: "Cura, reparo e desfaz magias em área." }]
      }
    },
    "Draconic Sorcery": {
      features: {
        3: [{ name: "Draconic Resilience", description: "Mais vida e CA 13+DEX sem armadura." }],
        6: [{ name: "Elemental Affinity", description: "+CAR no dano elemental da linhagem." }],
        14: [{ name: "Dragon Wings", description: "Manifesta asas; voo = velocidade." }],
        18: [{ name: "Draconic Presence", description: "Presença aterrorizante ou encantadora em aura." }]
      }
    },
    "Wild Magic Sorcery": {
      features: {
        3: [
          { name: "Wild Magic Surge", description: "Efeitos aleatórios da tabela d100." },
          { name: "Tides of Chaos", description: "Vantagem livre (DM pode forçar Surge)." }
        ],
        6: [{ name: "Bend Luck", description: "+/- 1d4 em qualquer rolagem visível." }],
        14: [{ name: "Controlled Chaos", description: "Rola 2x na tabela de surto e escolhe." }],
        18: [{ name: "Spell Bombardment", description: "Rerrola dados máximos de dano de magia." }]
      }
    }
  },
  'Bruxo': {
    "Archfey Patron": {
      features: {
        3: [{ name: "Steps of the Fey", description: "Teleporte bônus após magia com efeitos extras." }],
        6: [{ name: "Misty Escape", description: "Reação ao sofrer dano: teleporte e invisibilidade." }],
        10: [{ name: "Beguiling Defenses", description: "Imunidade a Encantamento e contra-ataque mental." }],
        14: [{ name: "Bewitching Magic", description: "Lança encantos grátis ao teleportar." }]
      }
    },
    "Celestial Patron": {
      features: {
        3: [{ name: "Healing Light", description: "Pool de cura via dados d6 (Bônus)." }],
        6: [{ name: "Radiant Soul", description: "Resistência radiante e +CAR no dano de fogo/luz." }],
        10: [{ name: "Celestial Resilience", description: "Temp HP para você e grupo no descanso." }],
        14: [{ name: "Searing Vengeance", description: "Ressurge com vida e dano radiante ao cair." }]
      }
    },
    "Fiend Patron": {
      features: {
        3: [{ name: "Dark One's Blessing", description: "Ganha Temp HP ao matar inimigos." }],
        6: [{ name: "Dark One's Own Luck", description: "+1d10 em teste/salvaguarda falha (1x)." }],
        10: [{ name: "Fiendish Resilience", description: "Escolhe uma resistência por descanso." }],
        14: [{ name: "Hurl Through Hell", description: "Transporta alvo para o inferno (8d10 dano)." }]
      }
    },
    "Great Old One Patron": {
      features: {
        3: [{ name: "Awakened Mind", description: "Telepatia bidirecional com criaturas." }],
        6: [{ name: "Clairvoyant Combatant", description: "Impõe desasvantagem no alvo da telepatia." }],
        10: [{ name: "Thought Shield", description: "Resistência psíquica e mente protegida." }],
        14: [{ name: "Create Thrall", description: "Domina permanentemente uma criatura (Thrall)." }]
      }
    }
  },
  'Mago': {
    "Abjurer": {
      features: {
        3: [
          { name: "Abjuration Savant", description: "Magias facilitadas de abjuração." },
          { name: "Arcane Ward", description: "Escudo que absorve dano e recarrega com magias." }
        ],
        6: [{ name: "Projected Ward", description: "Usa o escudo para proteger aliados (Reação)." }],
        10: [{ name: "Spell Breaker", description: "Counterspell/Dispel sempre preparados e melhores." }],
        14: [{ name: "Spell Resistance", description: "Vantagem e resistência contra qualquer magia." }]
      }
    },
    "Diviner": {
      features: {
        3: [
          { name: "Divination Savant", description: "Magias facilitadas de adivinhação." },
          { name: "Portent", description: "Guarda 2 rolagens de d20 para substituir depois." }
        ],
        6: [{ name: "Expert Divination", description: "Recupera slots ao lançar adivinhação." }],
        10: [{ name: "The Third Eye", description: "Visão no escuro, ler idiomas ou ver invisível." }],
        14: [{ name: "Greater Portent", description: "Guarda 3 dados em vez de 2." }]
      }
    },
    "Evoker": {
      features: {
        3: [
          { name: "Evocation Savant", description: "Magias facilitadas de evocação." },
          { name: "Potent Cantrip", description: "Cantrips causam metade do dano mesmo em erro." }
        ],
        6: [{ name: "Sculpt Spells", description: "Protege aliados de suas magias em área." }],
        10: [{ name: "Empowered Evocation", description: "+INT no dano de magias de evocação." }],
        14: [{ name: "Overchannel", description: "Maximiza dano de magias (limite nível 5)." }]
      }
    },
    "Illusionist": {
      features: {
        3: [
          { name: "Illusion Savant", description: "Magias facilitadas de ilusão." },
          { name: "Improved Illusions", description: "Ilusão sem som/gesto e Minor Illusion aprimorado." }
        ],
        6: [{ name: "Phantasmal Creatures", description: "Invoca versões ilusórias e persistentes de feras/fadas." }],
        10: [{ name: "Illusory Self", description: "Garante erro de um ataque contra você (Reação)." }],
        14: [{ name: "Illusory Reality", description: "Torna um objeto da ilusão real por 1 minuto." }]
      }
    }
  }
};
