import { Spell } from './spells';

export const SPELLS_2014: Spell[] = [
  // ── Cantrips 2014 versions ──────────────────────────────────────────────────
  { id: 'blade-ward-2014', name: 'Guarda da Lâmina', level: 0, school: 'Abjuração', castingTime: '1 ação', duration: '1 rodada', range: 'Pessoal', components: 'V, S', description: 'Você estende sua mão e traça um símbolo de proteção no ar. Até o final do seu próximo turno, você tem resistência contra danos de concussão, cortante e perfurante desferidos por ataques com armas.', damageEffect: 'Resistência Física', classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago', 'Artesão Arcano'] },
  { id: 'guidance-2014', name: 'Orientação', level: 0, school: 'Adivinhação', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: 'Toque', components: 'V, S', description: 'Você toca uma criatura disposta. Uma vez, antes da magia terminar, o alvo pode rolar um d4 e adicionar o número rolado a um teste de habilidade de sua escolha.', damageEffect: '+1d4 em teste', classes: ['Clérigo', 'Druida', 'Artesão Arcano'], concentration: true },
  { id: 'resistance-2014', name: 'Resistência', level: 0, school: 'Abjuração', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: 'Toque', components: 'V, S, M', description: 'Você toca uma criatura disposta. Uma vez, antes da magia terminar, o alvo pode rolar um d4 e adicionar o número rolado a um teste de resistência de sua escolha.', damageEffect: '+1d4 em salvaguarda', classes: ['Clérigo', 'Druida'], concentration: true },
  { id: 'true-strike-2014', name: 'Golpe Certeiro', level: 0, school: 'Adivinhação', castingTime: '1 ação', duration: 'Concentração, até 1 rodada', range: '9 m', components: 'S', description: 'Você estende sua mão e aponta o dedo para um alvo no alcance. Você ganha vantagem na sua primeira jogada de ataque contra o alvo no seu próximo turno, desde que a magia não tenha terminado.', damageEffect: 'Vantagem no Atk', classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago', 'Artesão Arcano'], concentration: true },
  { id: 'friends-2014', name: 'Amigos', level: 0, school: 'Encantamento', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: 'Pessoal', components: 'S, M', description: 'Você tem vantagem em todos os testes de Carisma direcionados a uma criatura de sua escolha que não seja hostil a você. Quando a magia termina, a criatura percebe que você usou magia para influenciar o humor dela e se torna hostil a você.', damageEffect: 'Vantagem em Carisma', classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago'], concentration: true },
];

export const SPELL_SLOTS_2014: Record<string, any> = {
  'Bardo': {
    1: { cantrips: 2, known: 4, slots: [2, 0, 0, 0, 0] },
    2: { cantrips: 2, known: 5, slots: [3, 0, 0, 0, 0] },
  },
  'Clérigo': {
    1: { cantrips: 3, prepared: 'Wis + Lvl', slots: [2, 0, 0, 0, 0] },
    2: { cantrips: 3, prepared: 'Wis + Lvl', slots: [3, 0, 0, 0, 0] },
  },
  'Druida': {
    1: { cantrips: 2, prepared: 'Wis + Lvl', slots: [2, 0, 0, 0, 0] },
    2: { cantrips: 2, prepared: 'Wis + Lvl', slots: [3, 0, 0, 0, 0] },
  },
  'Feiticeiro': {
    1: { cantrips: 4, known: 2, slots: [2, 0, 0, 0, 0] },
    2: { cantrips: 4, known: 3, slots: [3, 0, 0, 0, 0] },
  },
  'Bruxo': {
    1: { cantrips: 2, known: 2, slots: [1, 0, 0, 0, 0] }, // Pact Magic slots
    2: { cantrips: 2, known: 3, slots: [2, 0, 0, 0, 0] },
  },
  'Mago': {
    1: { cantrips: 3, prepared: 'Int + Lvl', slots: [2, 0, 0, 0, 0] },
    2: { cantrips: 3, prepared: 'Int + Lvl', slots: [3, 0, 0, 0, 0] },
  },
  'Paladino': {
    1: { cantrips: 0, slots: [0, 0, 0, 0, 0] },
    2: { cantrips: 0, prepared: 'Cha + Lvl/2', slots: [2, 0, 0, 0, 0] },
  },
  'Patrulheiro': {
    1: { cantrips: 0, slots: [0, 0, 0, 0, 0] },
    2: { cantrips: 0, known: 2, slots: [2, 0, 0, 0, 0] },
  },
  'Artesão Arcano': {
    1: { cantrips: 2, prepared: 'Int + Lvl/2', slots: [2, 0, 0, 0, 0] },
  }
};
