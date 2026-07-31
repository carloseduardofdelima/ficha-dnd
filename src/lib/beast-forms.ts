export interface BeastForm {
  name: string;
  cr: string;
  crVal: number;
  hp: number;
  ac: number;
  speed: string;
  fly: boolean;
  swim: boolean;
  attacks: string;
  features: string;
  moonOnly?: boolean;
  minLevel?: number;
}

export const BEAST_FORMS: BeastForm[] = [
  // CR 0
  { 
    name: 'Gato', 
    cr: '0', 
    crVal: 0, 
    hp: 2, 
    ac: 12, 
    speed: '12m, escalada 9m', 
    fly: false, 
    swim: false, 
    attacks: 'Garras (+0, 1 cortante)', 
    features: 'Faro Aguçado ("Vantagem em testes de Percepção baseados no olfato"), Furtivo (+4 na perícia Furtividade)' 
  },
  { 
    name: 'Rato', 
    cr: '0', 
    crVal: 0, 
    hp: 1, 
    ac: 10, 
    speed: '6m, escalada 6m', 
    fly: false, 
    swim: false, 
    attacks: 'Mordida (+0, 1 perfurante)', 
    features: 'Faro Aguçado ("Vantagem em testes de Percepção baseados no olfato"), Furtivo ("+4 na perícia Furtividade")' 
  },
  { 
    name: 'Coruja', 
    cr: '0', 
    crVal: 0, 
    hp: 1, 
    ac: 11, 
    speed: '1,5m, voo 18m', 
    fly: true, 
    swim: false, 
    attacks: 'Garras (+3, 1 cortante)', 
    features: 'Audição e Visão Aguçadas ("Vantagem em testes de Percepção baseados na audição/visão"), Voo Rasante ("Não provoca ataques de oportunidade ao voar para fora do alcance de um inimigo")' 
  },

  // CR 1/8
  { 
    name: 'Mastim', 
    cr: '1/8', 
    crVal: 0.125, 
    hp: 5, 
    ac: 12, 
    speed: '12m', 
    fly: false, 
    swim: false, 
    attacks: 'Mordida (+3, 1d6+1 perfurante, alvo deve passar em TR Força CD 11 ou cair no chão)', 
    features: 'Audição e Faro Aguçados ("Vantagem em testes de Percepção baseados na audição/olfato")' 
  },
  { 
    name: 'Pônei', 
    cr: '1/8', 
    crVal: 0.125, 
    hp: 11, 
    ac: 10, 
    speed: '12m', 
    fly: false, 
    swim: false, 
    attacks: 'Cascos (+4, 2d4+2 impacto)', 
    features: 'Carga Leve ("Capacidade de carga aumentada para transporte")' 
  },

  // CR 1/4 (Mínimo nível 2)
  { 
    name: 'Lobo', 
    cr: '1/4', 
    crVal: 0.25, 
    hp: 11, 
    ac: 13, 
    speed: '12m', 
    fly: false, 
    swim: false, 
    attacks: 'Mordida (+4, 2d4+2 perfurante, CD 11 Força ou cai no chão)', 
    features: 'Tática de Matilha ("Vantagem em jogadas de ataque contra criatura se pelo menos um aliado do lobo estiver a até 1,5m dela e não incapacitado"), Faro e Audição Aguçados ("Vantagem em testes de Percepção baseados em olfato/audição")' 
  },
  { 
    name: 'Javali', 
    cr: '1/4', 
    crVal: 0.25, 
    hp: 11, 
    ac: 11, 
    speed: '12m', 
    fly: false, 
    swim: false, 
    attacks: 'Presas (+3, 1d6+1 cortante)', 
    features: 'Carga ("Se mover 6m e acertar chifre/presa, causa +1d6 dano e CD 11 Força ou cai"), Imortalidade Relativa ("Se sofrer 10 de dano ou menos e fosse cair a 0 PV, fica com 1 PV")' 
  },
  { 
    name: 'Teixugo Gigante', 
    cr: '1/4', 
    crVal: 0.25, 
    hp: 13, 
    ac: 10, 
    speed: '9m, escavação 3m', 
    fly: false, 
    swim: false, 
    attacks: 'Ataques Múltiplos (Mordida +4, 1d6+2 perfurante E Garras +4, 2d4+2 cortante)', 
    features: 'Faro Aguçado ("Vantagem em testes de Percepção baseados no olfato")' 
  },
  { 
    name: 'Pantera', 
    cr: '1/4', 
    crVal: 0.25, 
    hp: 13, 
    ac: 12, 
    speed: '15m, escalada 12m', 
    fly: false, 
    swim: false, 
    attacks: 'Garras (+4, 1d4+2 cortante) ou Mordida (+4, 1d6+2 perfurante)', 
    features: 'Bote ("Se mover 6m e acertar garra, alvo faz TR Força CD 12 ou cai, e a pantera faz ataque de mordida de ação bônus")' 
  },
  { 
    name: 'Cobra Constritora', 
    cr: '1/4', 
    crVal: 0.25, 
    hp: 13, 
    ac: 12, 
    speed: '9m, natação 9m', 
    fly: false, 
    swim: true, 
    attacks: 'Mordida (+4, 1d4+2 perfurante) ou Constrição (+4, 1d8+2 impacto, alvo fica agarrado/impedido, CD 12 para escapar)', 
    features: 'Percepção Cega 3m ("Percebe os arredores sem depender da visão a até 3 metros")' 
  },

  // CR 1/2 (Mínimo nível 4 para druida comum, ou nível 2 para Círculo da Lua)
  { 
    name: 'Crocodilo', 
    cr: '1/2', 
    crVal: 0.5, 
    hp: 19, 
    ac: 12, 
    speed: '6m, natação 9m', 
    fly: false, 
    swim: true, 
    attacks: 'Mordida (+4, 1d10+2 perfurante, alvo agarrado/impedido, CD 12 para escapar)', 
    features: 'Prender a respiração ("Pode prender a respiração por até 15 minutos")' 
  },
  { 
    name: 'Tubarão de Arrecife', 
    cr: '1/2', 
    crVal: 0.5, 
    hp: 22, 
    ac: 12, 
    speed: 'natação 12m', 
    fly: false, 
    swim: true, 
    attacks: 'Mordida (+4, 1d8+2 perfurante)', 
    features: 'Frenesi Alimentar ("Vantagem em jogadas de ataque corpo-a-corpo contra criatura que não esteja com os PV máximos"), Respirar na água' 
  },
  { 
    name: 'Vespa Gigante', 
    cr: '1/2', 
    crVal: 0.5, 
    hp: 13, 
    ac: 12, 
    speed: '3m, voo 15m', 
    fly: true, 
    swim: false, 
    attacks: 'Aguilhão (+4, 1d4+2 perfurante + 3d6 veneno, CD 11 Con metade)', 
    features: 'Voo veloz ("Pode voar a grandes velocidades")' 
  },

  // CR 1 (Mínimo nível 8 para druida comum, ou nível 2 para Círculo da Lua)
  { 
    name: 'Urso Pardo', 
    cr: '1', 
    crVal: 1.0, 
    hp: 34, 
    ac: 11, 
    speed: '12m, escalada 9m', 
    fly: false, 
    swim: false, 
    attacks: 'Ataques Múltiplos (Mordida +5, 1d8+4 perfurante E Garras +5, 2d6+4 cortante)', 
    features: 'Faro Aguçado ("Vantagem em testes de Percepção baseados no olfato")' 
  },
  { 
    name: 'Lobo Atroz', 
    cr: '1', 
    crVal: 1.0, 
    hp: 37, 
    ac: 14, 
    speed: '15m', 
    fly: false, 
    swim: false, 
    attacks: 'Mordida (+5, 2d6+3 perfurante, CD 13 Força ou cai)', 
    features: 'Tática de Matilha ("Vantagem em jogadas de ataque se parceiro estiver a 1,5m"), Faro e Audição Aguçados ("Vantagem em Percepção baseada em olfato/audição")' 
  },
  { 
    name: 'Águia Gigante', 
    cr: '1', 
    crVal: 1.0, 
    hp: 26, 
    ac: 13, 
    speed: '3m, voo 24m', 
    fly: true, 
    swim: false, 
    attacks: 'Ataques Múltiplos (Bico +5, 1d6+3 perfurante E Garras +5, 2d6+3 cortante)', 
    features: 'Visão Aguçada ("Vantagem em testes de Percepção baseados na visão")' 
  },
  { 
    name: 'Polvo Gigante', 
    cr: '1', 
    crVal: 1.0, 
    hp: 52, 
    ac: 11, 
    speed: '3m, natação 9m', 
    fly: false, 
    swim: true, 
    attacks: 'Tentáculos (+5, 2d6+3 impacto, agarra/impede CD 16), Nuvem de Tinta (recarga 6, "Expele tinta para se camuflar e escapar")', 
    features: 'Camuflagem ("Vantagem em testes de Furtividade na água"), Respirar na água' 
  },
  { 
    name: 'Sapo Gigante', 
    cr: '1/4', 
    crVal: 0.25, 
    hp: 18, 
    ac: 11, 
    speed: '9m, natação 9m', 
    fly: false, 
    swim: true, 
    attacks: 'Mordida (+3, 1d6+1 perfurante + 1d6 veneno, agarra), Engolir (alvo agarrado, engole alvo que sofre 1d6 ácido por turno)', 
    features: 'Salto Longo ("Com ou sem corrida, salta até 6m de distância")' 
  },

  // CR 2 (Exclusivo Círculo da Lua nível 6+)
  { 
    name: 'Urso Polar', 
    cr: '2', 
    crVal: 2.0, 
    hp: 42, 
    ac: 12, 
    speed: '12m, natação 9m', 
    fly: false, 
    swim: true, 
    attacks: 'Ataques Múltiplos (Mordida +7, 1d8+5 perfurante E Garras +7, 2d6+5 cortante)', 
    features: 'Faro Aguçado ("Vantagem em testes de Percepção baseados no olfato")', 
    moonOnly: true, 
    minLevel: 6 
  },
  { 
    name: 'Tigre Dentes-de-Sabre', 
    cr: '2', 
    crVal: 2.0, 
    hp: 52, 
    ac: 12, 
    speed: '12m', 
    fly: false, 
    swim: false, 
    attacks: 'Garras (+6, 1d10+5 cortante) ou Mordida (+6, 2d6+5 perfurante)', 
    features: 'Bote ("Se mover 6m e acertar garras, derruba CD 14 Força e faz mordida bônus"), Faro e Furtividade Aguçados', 
    moonOnly: true, 
    minLevel: 6 
  },
  { 
    name: 'Rinoceronte', 
    cr: '2', 
    crVal: 2.0, 
    hp: 45, 
    ac: 11, 
    speed: '12m', 
    fly: false, 
    swim: false, 
    attacks: 'Chifre (+7, 2d8+5 perfurante)', 
    features: 'Carga ("Se mover 6m e acertar chifre, +2d8 dano extra e força CD 15 ou derruba")', 
    moonOnly: true, 
    minLevel: 6 
  },

  // CR 3 (Exclusivo Círculo da Lua nível 9+)
  { 
    name: 'Anquilossauro', 
    cr: '3', 
    crVal: 3.0, 
    hp: 68, 
    ac: 15, 
    speed: '9m', 
    fly: false, 
    swim: false, 
    attacks: 'Cauda (+7, 4d6+6 impacto, CD 13 Força ou cai)', 
    features: 'Armadura Natural pesada ("Defesa natural rígida")', 
    moonOnly: true, 
    minLevel: 9 
  },

  // CR 4 (Exclusivo Círculo da Lua nível 12+)
  { 
    name: 'Elefante', 
    cr: '4', 
    crVal: 4.0, 
    hp: 76, 
    ac: 12, 
    speed: '12m', 
    fly: false, 
    swim: false, 
    attacks: 'Presas (+8, 3d8+6 perfurante) ou Pisotear (+8, 3d10+6 impacto contra caídos)', 
    features: 'Carga ("Se mover 6m e acertar presas, CD 12 Força ou derruba e faz pisotear de bônus")', 
    moonOnly: true, 
    minLevel: 12 
  },

  // CR 5 (Exclusivo Círculo da Lua nível 15+)
  { 
    name: 'Tricerátops', 
    cr: '5', 
    crVal: 5.0, 
    hp: 95, 
    ac: 13, 
    speed: '15m', 
    fly: false, 
    swim: false, 
    attacks: 'Chifres (+9, 4d8+6 perfurante) ou Pisotear (+9, 3d10+6 impacto contra caídos)', 
    features: 'Carga ("Se mover 6m e acertar chifres, CD 13 Força ou derruba e faz pisotear de bônus")', 
    moonOnly: true, 
    minLevel: 15 
  },
];
