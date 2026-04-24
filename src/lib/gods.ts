export interface God {
  id: string;
  name: string;
  title: string;
  domain: string;
  alignment: string;
  description: string;
  icon: string;
  color: string;
}

export const OLYMPIAN_GODS: God[] = [
  {
    id: 'zeus',
    name: 'Zeus',
    title: 'Rei dos Deuses Olímpicos',
    domain: 'Deus dos raios e relâmpagos',
    alignment: 'Neutro',
    description: 'O governante supremo do Olimpo, mestre dos céus e das tempestades.',
    icon: '⚡',
    color: '#fbbf24'
  },
  {
    id: 'poseidon',
    name: 'Poseidon',
    title: 'Deus do Mar',
    domain: 'Deus do mar e terremotos',
    alignment: 'Caótico e Neutro',
    description: 'Mestre dos oceanos, rios e das profundezas da terra. Pode agitar os mares ou causar terremotos.',
    icon: '🔱',
    color: '#0ea5e9'
  },
  {
    id: 'hera',
    name: 'Hera',
    title: 'Rainha dos Deuses Olímpicos',
    domain: 'Deusa do casamento; protetora das mulheres',
    alignment: 'Caótico e Neutro',
    description: 'Protetora da união familiar e das mulheres. Majestosa e solene.',
    icon: '👑',
    color: '#d946ef'
  },
  {
    id: 'atena',
    name: 'Atena',
    title: 'Deusa da Sabedoria',
    domain: 'Deusa da sabedoria, estratégia e justiça',
    alignment: 'Leal e Bom',
    description: 'Padroeira da estratégia militar, das artes e da justiça justa.',
    icon: '🦉',
    color: '#94a3b8'
  },
  {
    id: 'hermes',
    name: 'Hermes',
    title: 'Mensageiro dos Deuses',
    domain: 'Deus das estradas, viagens e diplomatas',
    alignment: 'Caótico e Bom',
    description: 'Protetor dos viajantes, comerciantes e mensageiro ágil do Olimpo.',
    icon: '👟',
    color: '#fde047'
  },
  {
    id: 'ares',
    name: 'Ares',
    title: 'Deus da Guerra',
    domain: 'Deus da guerra',
    alignment: 'Caótico e Mau',
    description: 'A personificação da sede de sangue e do aspecto brutal do combate.',
    icon: '⚔️',
    color: '#ef4444'
  },
  {
    id: 'afrodite',
    name: 'Afrodite',
    title: 'Deusa da Beleza',
    domain: 'Deusa da vida, prazer e alegria',
    alignment: 'Caótico e Bom',
    description: 'Senhora do amor, do desejo e de todas as formas de prazer.',
    icon: '💖',
    color: '#f472b6'
  },
  {
    id: 'apolo',
    name: 'Apolo',
    title: 'Deus do Sol e da Música',
    domain: 'Deus da música e do sol',
    alignment: 'Caótico e Bom',
    description: 'Mestre das artes, da luz solar, da cura e das profecias.',
    icon: '☀️',
    color: '#f59e0b'
  },
  {
    id: 'hefesto',
    name: 'Hefesto',
    title: 'Deus dos Ferreiros',
    domain: 'Deus dos ferreiros e artesãos',
    alignment: 'Neutro e Bom',
    description: 'O mestre da forja, do fogo e da metalurgia.',
    icon: '🔨',
    color: '#f97316'
  },
  {
    id: 'dionisio',
    name: 'Dionísio',
    title: 'Deus do Vinho',
    domain: 'Deus do vinho, das festas e insanidade',
    alignment: 'Caótico e Neutro',
    description: 'Patrono do êxtase, do teatro e do vinho que liberta ou enlouquece.',
    icon: '🍷',
    color: '#8b5cf6'
  },
  {
    id: 'artemis',
    name: 'Ártemis',
    title: 'Deusa da Caça',
    domain: 'Deusa da caça e dos animais selvagens',
    alignment: 'Neutro e Bom',
    description: 'Protetora da vida selvagem, da lua e mestre do arco.',
    icon: '🌙',
    color: '#22c55e'
  },
  {
    id: 'demeter',
    name: 'Deméter',
    title: 'Deusa da Agricultura',
    domain: 'Deusa da colheita e agricultura',
    alignment: 'Neutro e Bom',
    description: 'Aquela que provê o sustento da terra e rege o ciclo das estações.',
    icon: '🌾',
    color: '#fbbf24'
  }
];
