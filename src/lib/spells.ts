import { SPELLS_2014, SPELL_SLOTS_2014 } from './spells-2014'

export type SpellSchool =
  | 'Abjuração' | 'Adivinhação' | 'Conjuração' | 'Encantamento'
  | 'Evocação' | 'Ilusão' | 'Necromancia' | 'Transmutação'

export interface Spell {
  id: string
  name: string
  level: number   // 0 = cantrip
  school: SpellSchool
  castingTime: string
  duration: string
  range: string
  components: string
  description: string
  damageEffect?: string
  attackSave?: string
  classes: string[]
  ritual?: boolean
  concentration?: boolean
  icon?: string
  ruleset?: '2014' | '2024'
}

const SPELLS: Spell[] = [
  // ── Cantrips ────────────────────────────────────────────────────────────────
  { id: 'acid-splash', name: 'Esguicho de Ácido', level: 0, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Você conjura uma bolha de ácido. Escolha uma criatura dentro do alcance para fazer um teste de resistência de Destreza. Se falhar, sofre 1d6 de dano ácido.', damageEffect: '1d6 Ácido', attackSave: 'Res. Des', classes: ['Mago', 'Feiticeiro', 'Artífice'], icon: 'acid-puddle.png' },
  { id: 'blade-ward', name: 'Guarda da Lâmina', level: 0, school: 'Abjuração', castingTime: '1 reação', duration: 'Instantânea', range: 'Pessoal', components: 'V, S', description: 'Reação quando uma criatura faz um ataque contra você. Você impõe desvantagem no ataque.', damageEffect: 'Desvantagem no Atk', classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'protection-field.png' },
  { id: 'booming-blade', name: 'Lâmina Estrondosa', level: 0, school: 'Evocação', castingTime: '1 ação', duration: '1 rodada', range: '1,5 m', components: 'S, M', description: 'Você brande uma arma e faz um ataque corpo-a-corpo. Se acertar, o alvo sofre efeitos normais do ataque e fica envolto em energia trovejante até o início do seu próximo turno. Se ele se mover voluntariamente antes disso, sofre 1d8 de dano de trovão.', damageEffect: '1d8 Trovão (mov)', classes: ['Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'electric-sword.png' },
  { id: 'chill-touch', name: 'Toque Glacial', level: 0, school: 'Necromancia', castingTime: '1 ação', duration: '1 rodada', range: '36 m', components: 'V, S', description: 'Você cria uma mão espectral de uma criatura não morta e a manda atacar uma criatura dentro do alcance. Faça um ataque mágico a distância. Se acertar, sofre 1d8 necrótico e não pode recuperar PV até o início de seu próximo turno.', damageEffect: '1d8 Necrótico', attackSave: 'Ataque', classes: ['Feiticeiro', 'Bruxo', 'Mago'], icon: 'ice-grasp.png' },
  { id: 'control-flames', name: 'Controlar Chamas', level: 0, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea ou 1 hora', range: '18 m', components: 'S', description: 'Você escolhe uma chama não mágica que você possa ver dentro do alcance e que caiba em um cubo de 1,5 metro. Você pode expandir, apagar ou mudar a cor/formato da chama.', damageEffect: 'Utilidade', classes: ['Druida', 'Feiticeiro', 'Mago'], icon: 'flame-circle.png' },
  { id: 'create-bonfire', name: 'Criar Fogueira', level: 0, school: 'Conjuração', castingTime: '1 ação', duration: '1 min', range: '18 m', components: 'V, S', description: 'Você cria uma fogueira mágica no chão. Qualquer criatura na área deve ser bem-sucedida num teste de Destreza ou sofrer 1d8 de dano de fogo.', damageEffect: '1d8 Fogo', attackSave: 'Res. Des', concentration: true, classes: ['Druida', 'Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'wild-fire.png' },
  { id: 'dancing-lights', name: 'Luzes Dançantes', level: 0, school: 'Evocação', castingTime: '1 ação', duration: '1 min', range: '36 m', components: 'V, S, M', description: 'Você cria até quatro luzes de tamanho tocha dentro do alcance. Elas podem ser movidas 18 m como ação bônus.', damageEffect: 'Utilidade', concentration: true, classes: ['Bardo', 'Feiticeiro', 'Mago', 'Artífice'], icon: 'light-sphere.png' },
  { id: 'druidcraft', name: 'Artesanato Druídico', level: 0, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea', range: '5 m', components: 'V, S', description: 'Sussurra com a natureza: prevê o tempo, faz flores desabrocharem, acende ou apaga velas, cria um efeito sensorial inofensivo.', damageEffect: 'Utilidade', classes: ['Druida'], icon: 'nature-spirit.png' },
  { id: 'eldritch-blast', name: 'Descarga Sobrenatural', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '36 m', components: 'V, S', description: 'Um feixe de energia reluzente açoita uma criatura dentro do alcance. Faça um ataque mágico à distância. Em um acerto, o alvo sofre 1d10 de dano de força.', damageEffect: '1d10 Força', attackSave: 'Ataque', classes: ['Bruxo'], icon: 'arcane-bolts.png' },
  { id: 'elementalism', name: 'Elementalismo', level: 0, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea', range: '9 m', components: 'V, S', description: 'Você controla os elementos de forma menor: cria uma brisa, muda a cor de uma chama, cria uma pequena onda ou move terra.', damageEffect: 'Utilidade', classes: ['Druida', 'Feiticeiro', 'Mago', 'Artífice'], icon: 'elemental-spiral.png' },
  { id: 'fire-bolt', name: 'Raio de Fogo', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '36 m', components: 'V, S', description: 'Você arremessa um feixe incandescente em uma criatura ou objeto dentro do alcance. Faça um ataque mágico à distância. Em um acerto, o alvo sofre 1d10 de dano de fogo.', damageEffect: '1d10 Fogo', attackSave: 'Ataque', classes: ['Feiticeiro', 'Mago', 'Artífice'], icon: 'flame-breath.png' },
  { id: 'friends', name: 'Amigos', level: 0, school: 'Encantamento', castingTime: '1 ação', duration: '1 min', range: 'Pessoal', components: 'S, M', description: 'Durante a duração, você tem vantagem em todos os testes de Carisma feitos contra uma criatura não hostil que você possa ver.', damageEffect: 'Social', concentration: true, classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago'], icon: 'sparkles.png' },
  { id: 'frostbite', name: 'Geladura', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Você causa um frio entorpecente. O alvo deve ter sucesso em um teste de resistência de Constituição ou sofrer 1d6 de dano de frio e ter desvantagem no próximo ataque com arma.', damageEffect: '1d6 Frio', attackSave: 'Res. Con', classes: ['Druida', 'Feiticeiro', 'Mago', 'Artífice'], icon: 'frost-cone.png' },
  { id: 'green-flame-blade', name: 'Lâmina de Chama Esverdeada', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '1,5 m', components: 'S, M', description: 'Você brande uma arma e faz um ataque corpo-a-corpo. Se acertar, chamas verdes saltam do alvo para outra criatura a 1,5m dele, causando dano de fogo igual ao seu modificador de conjuração.', damageEffect: 'Mod Fogo (sec)', classes: ['Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'flaming-sword.png' },
  { id: 'guidance', name: 'Orientação', level: 0, school: 'Adivinhação', castingTime: '1 reação', duration: 'Instantânea', range: '9 m', components: 'V, S', description: 'Reação quando uma criatura falha num teste de habilidade. O alvo rola 1d4 e adiciona ao resultado.', damageEffect: '+1d4 em teste', classes: ['Clérigo', 'Druida', 'Artífice'], icon: 'magic-sparks.png' },
  { id: 'gust', name: 'Rajada', level: 0, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea', range: '9 m', components: 'V, S', description: 'Você cria um surto de ar. Pode empurrar uma criatura Média ou menor 1,5m, empurrar um objeto ou criar efeitos sensoriais de vento.', damageEffect: 'Empurrão 1,5m', attackSave: 'Res. For', classes: ['Druida', 'Mago', 'Artífice'], icon: 'wind-gust.png' },
  { id: 'infestation', name: 'Infestação', level: 0, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: '9 m', components: 'V, S, M', description: 'Você faz com que ácaros e pulgas apareçam momentaneamente em uma criatura. O alvo deve ter sucesso em um teste de Constituição ou sofre 1d6 necrótico e se move 1,5m numa direção aleatória.', damageEffect: '1d6 Necrótico', attackSave: 'Res. Con', classes: ['Druida', 'Feiticeiro', 'Bruxo', 'Mago'], icon: 'poison-cloud.png' },
  { id: 'light', name: 'Luz', level: 0, school: 'Evocação', castingTime: '1 ação', duration: '1 hora', range: 'Toque', components: 'V, M', description: 'Você toca um objeto de até 3 metros. Ele emite luz brilhante em um raio de 6 metros e penumbra por mais 6 metros.', damageEffect: 'Utilidade', classes: ['Bardo', 'Clérigo', 'Mago', 'Artífice'], icon: 'sun-flare.png' },
  { id: 'lightning-lure', name: 'Chicotada Elétrica', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '4,5 m', components: 'V', description: 'Você cria um chicote de energia elétrica. O alvo falhando num teste de Força é puxado 3m em sua direção e se estiver a 1,5m de você sofre 1d8 elétrico.', damageEffect: '1d8 Elétrico', attackSave: 'Res. For', classes: ['Feiticeiro', 'Mago', 'Artífice'], icon: 'dark-tendrils.png' },
  { id: 'mage-hand', name: 'Mão Mágica', level: 0, school: 'Conjuração', castingTime: '1 ação', duration: '1 min', range: '9 m', components: 'V, S', description: 'Uma mão espectral flutuante aparece no ponto escolhido. Pode manipular objetos simples, abrir portas e recipientes, guardar ou pegar itens de recipientes.', damageEffect: 'Utilidade', classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'mind-waves.png' },
  { id: 'mending', name: 'Conserto', level: 0, school: 'Transmutação', castingTime: '1 min', duration: 'Instantânea', range: 'Toque', components: 'V, S, M', description: 'Este truque repara uma única interrupção ou fratura em um objeto que você toca, como uma corrente partida, duas metades de uma chave partida ou um goblet rachado.', damageEffect: 'Utilidade', classes: ['Bardo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago', 'Artífice'], icon: 'skeleton-key.png' },
  { id: 'message', name: 'Mensagem', level: 0, school: 'Transmutação', castingTime: '1 ação', duration: '1 rodada', range: '36 m', components: 'V, S, M', description: 'Você aponta para uma criatura dentro do alcance e sussurra uma mensagem. O alvo (e só o alvo) ouve a mensagem e pode responder com um sussurro.', damageEffect: 'Comunicação', classes: ['Bardo', 'Feiticeiro', 'Mago', 'Artífice'], icon: 'brain-psionic.png' },
  { id: 'mind-sliver', name: 'Farpa Mental', level: 0, school: 'Encantamento', castingTime: '1 ação', duration: '1 rodada', range: '18 m', components: 'V', description: 'Você crava uma farpa de energia psíquica na mente de uma criatura. O alvo deve fazer um teste de Sabedoria ou sofrer 1d6 psíquico e subtrair 1d4 do próximo teste de resistência.', damageEffect: '1d6 Psíquico', attackSave: 'Res. Int', classes: ['Feiticeiro', 'Mago'], icon: 'mind-waves.png' },
  { id: 'minor-illusion', name: 'Ilusão Menor', level: 0, school: 'Ilusão', castingTime: '1 ação', duration: '1 min', range: '9 m', components: 'S, M', description: 'Você cria um som ou uma imagem de um objeto dentro do alcance que dura pelo período. A ilusão termina se você a descartar (ação bônus) ou conjurar essa magia de novo.', damageEffect: 'Ilusão', classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago'], icon: 'mirror-image.png' },
  { id: 'poison-spray', name: 'Névoa Venenosa', level: 0, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: '3 m', components: 'V, S', description: 'Você estende a mão e projeta uma bolha de veneno podre de sua palma. A criatura deve ser bem-sucedida em um teste de resistência de Constituição ou recebe 1d12 de dano de veneno.', damageEffect: '1d12 Veneno', attackSave: 'Res. Con', classes: ['Druida', 'Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'poison-spray.png' },
  { id: 'prestidigitation', name: 'Prestidigitação', level: 0, school: 'Transmutação', castingTime: '1 ação', duration: '1 hora', range: '3 m', components: 'V, S', description: 'Um truque menor. Pode criar efeitos mágicos inofensivos: acender vela, limpar objeto, criar bugigangas mágicas, etc.', damageEffect: 'Utilidade', classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'magic-scroll.png' },
  { id: 'produce-flame', name: 'Produzir Chama', level: 0, school: 'Conjuração', castingTime: '1 ação', duration: '10 min', range: 'Pessoal', components: 'V, S', description: 'Uma chama crepitante aparece em sua mão. Não causa dano mas ilumina. Alternativamente, você pode arremessá-la para causar 1d8 de dano de fogo.', damageEffect: '1d8 Fogo', attackSave: 'Ataque', classes: ['Druida'], icon: 'ember-spark.png' },
  { id: 'ray-of-frost', name: 'Raio de Gelo', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Um feixe gelado azulado estria em direção a uma criatura dentro do alcance. Faça um ataque mágico à distância. Em um acerto, 1d8 de dano frio e a velocidade da criatura é reduzida em 3 m até o início do seu próximo turno.', damageEffect: '1d8 Frio', attackSave: 'Ataque', classes: ['Feiticeiro', 'Mago', 'Artífice'], icon: 'frost-shards.png' },
  { id: 'resistance', name: 'Resistência', level: 0, school: 'Abjuração', castingTime: '1 reação', duration: 'Instantânea', range: '9 m', components: 'V, S, M', description: 'Reação quando uma criatura falha num teste de resistência. O alvo rola 1d4 e adiciona ao resultado.', damageEffect: '+1d4 Res.', classes: ['Clérigo', 'Druida', 'Artífice'], icon: 'protection-field.png' },
  { id: 'sacred-flame', name: 'Chama Sagrada', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Radiância em chamas desce sobre uma criatura que você possa ver dentro do alcance. O alvo deve ter sucesso em um teste de resistência de Destreza ou sofrer 1d8 de dano radiante.', damageEffect: '1d8 Radiante', attackSave: 'Res. Des', classes: ['Clérigo'], icon: 'sun-flare.png' },
  { id: 'shape-water', name: 'Moldar Água', level: 0, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea ou 1 hora', range: '9 m', components: 'S', description: 'Você escolhe uma área de água que caiba em um cubo de 1,5 metro e pode mudar seu fluxo, formar imagens, mudar a cor ou congelá-la.', damageEffect: 'Utilidade', classes: ['Druida', 'Feiticeiro', 'Mago'], icon: 'water-droplets.png' },
  { id: 'shillelagh', name: 'Cacete Mágico', level: 0, school: 'Transmutação', castingTime: '1 ação bônus', duration: '1 min', range: 'Toque', components: 'V, S, M', description: 'A madeira de um cacete ou cajado que você está segurando é imbacilizada com poder da natureza. Use Sabedoria para ataques e dano, e o dano se torna 1d8.', damageEffect: '1d8 Concussão', concentration: false, classes: ['Druida'], icon: 'nature-shield.png' },
  { id: 'shocking-grasp', name: 'Toque Chocante', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: 'Toque', components: 'V, S', description: 'Relâmpago surge de sua mão. Faça um ataque mágico corpo a corpo contra o alvo. Você tem vantagem se o alvo usar armadura metálica. Em um acerto, 1d8 de dano elétrico e o alvo não pode usar reações até seu próximo turno.', damageEffect: '1d8 Elétrico', attackSave: 'Ataque', classes: ['Feiticeiro', 'Mago', 'Artífice'], icon: 'lightning-bolt.png' },
  { id: 'sorcerous-burst', name: 'Explosão Feiticeira', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '36 m', components: 'V, S', description: 'Você libera energia mágica bruta. Selecione um tipo de dano: Ácido, Frio, Fogo, Relâmpago, Veneno ou Trovão. Faça um ataque mágico. Em um acerto, 1d8 de dano do tipo escolhido.', damageEffect: '1d8 Variado', attackSave: 'Ataque', classes: ['Feiticeiro'], icon: 'arcane-bolts.png' },
  { id: 'spare-dying', name: 'Estabilizar Moribundo', level: 0, school: 'Necromancia', castingTime: '1 ação', duration: 'Instantânea', range: 'Toque', components: 'V, S', description: 'Você toca uma criatura viva com 0 pontos de vida. A criatura se torna estável.', damageEffect: 'Cura', classes: ['Clérigo', 'Artífice'], icon: 'holy-cross.png' },
  { id: 'starry-wisp', name: 'Fogo Fátuo Estelar', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Você lança um feixe de luz estelar. Faça um ataque mágico. Em um acerto, 1d8 de dano radiante e o alvo emite luz por 1 rodada.', damageEffect: '1d8 Radiante', attackSave: 'Ataque', classes: ['Clérigo', 'Druida'], icon: 'starlight-nova.png' },
  { id: 'sword-burst', name: 'Explosão de Lâminas', level: 0, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: 'Pessoal (1,5m)', components: 'V', description: 'Você cria momentaneamente um círculo de lâminas espectrais que varre ao seu redor. Cada criatura a 1,5m deve fazer um teste de Destreza ou sofrer 1d6 de dano de força.', damageEffect: '1d6 Força', attackSave: 'Res. Des', classes: ['Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'flaming-sword.png' },
  { id: 'thaumaturgy', name: 'Taumaturgia', level: 0, school: 'Transmutação', castingTime: '1 ação', duration: '1 min', range: '9 m', components: 'V', description: 'Manifesta um sinal menor do poder sobrenatural: voz retumba, chamas crepitam, tremores leves no chão, olhos brilham, portas se abrem.', damageEffect: 'Utilidade', classes: ['Clérigo'], icon: 'divine-presence.png' },
  { id: 'thorn-whip', name: 'Chicote de Espinhos', level: 0, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea', range: '9 m', components: 'V, S, M', description: 'Você cria um longo chicote de vinhas com espinhos. Faça um ataque mágico corpo a corpo. Em um acerto, 1d6 de dano perfurante e você puxa o alvo 3m em sua direção.', damageEffect: '1d6 Perfurante', attackSave: 'Ataque', classes: ['Druida', 'Artífice'], icon: 'vine-entangle.png' },
  { id: 'thunderclap', name: 'Trovoada', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: 'Pessoal (1,5m)', components: 'S', description: 'Você cria um estouro de som trovejante. Cada criatura a 1,5m deve fazer um teste de Constituição ou sofrer 1d6 de dano de trovão.', damageEffect: '1d6 Trovão', attackSave: 'Res. Con', classes: ['Bardo', 'Druida', 'Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'mind-waves.png' },
  { id: 'toll-dead', name: 'Dobrar os Sinos', level: 0, school: 'Necromancia', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Um sino soturno ecoa em torno de uma criatura. Se falhar no teste de Constituição, sofre 1d8 de dano necrótico (1d12 se já estiver com algum dano).', damageEffect: '1d8 Necrótico', attackSave: 'Res. Con', classes: ['Clérigo', 'Bruxo', 'Mago'], icon: 'undead-skull.png' },
  { id: 'true-strike', name: 'Golpe Certeiro', level: 0, school: 'Adivinhação', castingTime: '1 ação', duration: '1 rodada', range: 'Pessoal', components: 'S, M', description: 'Você guia seu próximo ataque. Use seu modificador de conjuração para o ataque e cause 1d6 extra de dano radiante.', damageEffect: '+1d6 Radiante', classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago'], icon: 'all-seeing-eye.png' },
  { id: 'vicious-mockery', name: 'Escárnio Vicioso', level: 0, school: 'Encantamento', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V', description: 'Você lança uma chuva de insultos contra pragas tentando abalar a concentração do alvo. O alvo que falhar num teste de Sabedoria sofre 1d4 de dano psíquico e tem desvantagem no próximo ataque.', damageEffect: '1d4 Psíquico', attackSave: 'Res. Sab', classes: ['Bardo'], icon: 'brain-psionic.png' },
  { id: 'word-of-radiance', name: 'Palavra de Radiância', level: 0, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '1,5 m', components: 'V, M', description: 'Uma palavra sagrada ecoa, e energia radiante irradia de você. Criaturas a sua escolha que você possa ver a 1,5 m fazem teste de Constituição ou sofrem 1d6 de dano radiante.', damageEffect: '1d6 Radiante', attackSave: 'Res. Con', classes: ['Clérigo'], icon: 'sun-flare.png' },
  { id: 'magic-stone', name: 'Pedra Mágica', level: 0, school: 'Transmutação', castingTime: '1 ação bônus', duration: '1 min', range: 'Toque', components: 'V, S', description: 'Você toca de uma a três pedras. Você ou outra pessoa pode arremessá-las (alcance 18m). Use seu modificador de conjuração para o ataque. Causa 1d6 + mod de dano de concussão.', damageEffect: '1d6+mod Concussão', attackSave: 'Ataque', classes: ['Druida', 'Bruxo', 'Artífice'], icon: 'heavy-weight.png' },

  // ── Nível 1 ─────────────────────────────────────────────────────────────────
  { id: 'alarm', name: 'Alarme', level: 1, school: 'Abjuração', castingTime: '1 min (ritual)', duration: '8 horas', range: '9 m', components: 'V, S, M', description: 'Você define um alarme em uma área de até 6 metros cúbicos. O alarme alerta você quando uma criatura Miúda ou maior entra na área.', damageEffect: 'Alarme', ritual: true, classes: ['Mago', 'Patrulheiro', 'Artífice'], icon: 'arcane-lock.png' },
  { id: 'absorb-elements', name: 'Absorver Elementos', level: 1, school: 'Abjuração', castingTime: '1 reação', duration: '1 rodada', range: 'Pessoal', components: 'S', description: 'A magia absorve parte do dano recebido (Ácido, Frio, Fogo, Relâmpago ou Trovão), garantindo resistência. Seu próximo ataque corpo a corpo causa 1d6 extra do tipo absorvido.', damageEffect: 'Resistência + 1d6', classes: ['Druida', 'Patrulheiro', 'Mago', 'Feiticeiro', 'Artífice'], icon: 'protection-field.png' },
  { id: 'animal-friendship', name: 'Amizade com Animais', level: 1, school: 'Encantamento', castingTime: '1 ação', duration: '24 horas', range: '9 m', components: 'V, S, M', description: 'Você assegura a um animal que você não é uma ameaça. Escolha um animal que você possa ver dentro do alcance. O animal deve fazer um teste de resistência de Sabedoria.', damageEffect: 'Encantamento', classes: ['Bardo', 'Druida', 'Patrulheiro'], icon: 'eagle-eyes.png' },
  { id: 'bane', name: 'Maldição', level: 1, school: 'Encantamento', castingTime: '1 ação', duration: '1 min', range: '9 m', components: 'V, S, M', description: 'Até 3 criaturas a sua escolha dentro do alcance devem fazer testes de resistência de Carisma. Um alvo que falhar deve subtrair 1d4 dos testes de ataque e de resistência até a magia terminar.', damageEffect: '-1d4 Ataques', attackSave: 'Res. Car', concentration: true, classes: ['Bardo', 'Clérigo'], icon: 'dark-vision.png' },
  { id: 'bless', name: 'Bênção', level: 1, school: 'Encantamento', castingTime: '1 ação', duration: '1 min', range: '9 m', components: 'V, S, M', description: 'Você abençoa até 3 criaturas a sua escolha dentro do alcance. Sempre que um alvo fazer um teste de ataque ou de resistência antes da magia terminar, o alvo pode rolar um d4 e adicionar o número ao resultado do teste.', damageEffect: '+1d4 Ataques', concentration: true, classes: ['Clérigo', 'Paladino'], icon: 'sun-flare.png' },
  { id: 'burning-hands', name: 'Mãos Flamejantes', level: 1, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: 'Pessoal (cone de 4,5m)', components: 'V, S', description: 'Enquanto você mantém seus polegares juntos e espalha seus dedos, um fino folheado de chamas jorra de suas mãos estendidas. Cada criatura em um cone de 4,5 metros deve fazer um teste de Destreza ou receber 3d6 de dano de fogo.', damageEffect: '3d6 Fogo', attackSave: 'Res. Des', classes: ['Mago', 'Feiticeiro'], icon: 'flame-breath.png' },
  { id: 'charm-person', name: 'Enfeitiçar Pessoa', level: 1, school: 'Encantamento', castingTime: '1 ação', duration: '1 hora', range: '9 m', components: 'V, S', description: 'Você tenta enfeitiçar um humanoide que você possa ver dentro do alcance. Ele deve fazer um teste de resistência de Sabedoria ou ficar enfeitiçado por você.', damageEffect: 'Controle', attackSave: 'Res. Sab', classes: ['Bardo', 'Druida', 'Mago', 'Feiticeiro', 'Bruxo'], icon: 'heart-heal.png' },
  { id: 'color-spray', name: 'Spray de Cores', level: 1, school: 'Ilusão', castingTime: '1 ação', duration: '1 rodada', range: 'Pessoal (cone de 4,5m)', components: 'V, S, M', description: 'Uma rajada de luz colorida deslumbrante emana de sua mão. Role 6d10 para saber total de PV afetados.', damageEffect: 'Cegado', classes: ['Bardo', 'Mago', 'Feiticeiro'], icon: 'prismatic-orb.png' },
  { id: 'command', name: 'Comandar', level: 1, school: 'Encantamento', castingTime: '1 ação', duration: '1 rodada', range: '18 m', components: 'V', description: 'Você fala uma palavra de comando de uma sílaba a uma criatura dentro do alcance. O alvo deve ser bem-sucedido em um teste de resistência de Sabedoria ou seguir o comando no próximo turno.', damageEffect: 'Controle', attackSave: 'Res. Sab', classes: ['Bardo', 'Clérigo', 'Paladino'], icon: 'divine-presence.png' },
  { id: 'comprehend-languages', name: 'Compreender Idiomas', level: 1, school: 'Adivinhação', castingTime: '1 ação (ritual)', duration: '1 hora', range: 'Pessoal', components: 'V, S, M', description: 'Por 1 hora você entende o significado literal de qualquer língua falada que você ouvir.', damageEffect: 'Utilidade', ritual: true, classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago'], icon: 'magic-scroll.png' },
  { id: 'cure-wounds', name: 'Curar Ferimentos', level: 1, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: 'Toque', components: 'V, S', description: 'Uma criatura que você toque recupera um número de pontos de vida igual a 2d8 + seu modificador de habilidade de conjuração.', damageEffect: '2d8+mod Cura', classes: ['Bardo', 'Clérigo', 'Druida', 'Paladino', 'Patrulheiro', 'Artífice'], icon: 'divine-heal.png' },
  { id: 'detect-magic', name: 'Detectar Magia', level: 1, school: 'Adivinhação', castingTime: '1 ação (ritual)', duration: '10 min', range: 'Pessoal', components: 'V, S', description: 'Por 10 min você pode sentir a presença de magia em 9 m. Ação para ver uma aura ao redor de qualquer criatura ou objeto visível que carregue magia.', damageEffect: 'Utilidade', ritual: true, concentration: true, classes: ['Bardo', 'Clérigo', 'Druida', 'Paladino', 'Patrulheiro', 'Mago', 'Feiticeiro', 'Artífice'], icon: 'all-seeing-eye.png' },
  { id: 'disguise-self', name: 'Disfarçar-se', level: 1, school: 'Ilusão', castingTime: '1 ação', duration: '1 hora', range: 'Pessoal', components: 'V, S', description: 'Você faz com que pareça diferente até a magia terminar ou você a dispensar. Pode mudar sua aparência, incluindo roupas, armadura e equipamento.', damageEffect: 'Ilusão', classes: ['Bardo', 'Mago', 'Feiticeiro', 'Artífice'], icon: 'mirror-image.png' },
  { id: 'divine-favor', name: 'Favor Divino', level: 1, school: 'Evocação', castingTime: '1 ação bônus', duration: '1 min', range: 'Pessoal', components: 'V, S', description: 'Sua oração infunde suas armas com poder divino. Até que a magia termine, seus ataques de arma causam 1d4 extra de dano radiante quando acertam.', damageEffect: '+1d4 Radiante', concentration: true, classes: ['Paladino'], icon: 'divine-presence.png' },
  { id: 'entangle', name: 'Enredar', level: 1, school: 'Conjuração', castingTime: '1 ação', duration: '1 min', range: '27 m', components: 'V, S', description: 'Ervas e cipós brotam de um ponto de chão que você escolhe. Cada criatura na área de 6 m quadrados enraizada no chão deve ter sucesso num teste de Força ou fica restrita.', damageEffect: 'Restrito', attackSave: 'Res. For', concentration: true, classes: ['Druida', 'Patrulheiro'], icon: 'vine-entangle.png' },
  { id: 'faerie-fire', name: 'Fogo Feérico', level: 1, school: 'Evocação', castingTime: '1 ação', duration: '1 min', range: '18 m', components: 'V', description: 'Cada objeto em um cubo de 6 metros fica delineado em azul, verde ou violeta (sua escolha). Qualquer ataque contra uma criatura afetada tem vantagem se o atacante puder vê-la.', damageEffect: 'Vantagem em ataques', attackSave: 'Res. Des', concentration: true, classes: ['Bardo', 'Druida', 'Artífice'], icon: 'sparkles.png' },
  { id: 'false-life', name: 'Falsa Vida', level: 1, school: 'Necromancia', castingTime: '1 ação', duration: '1 hora', range: 'Pessoal', components: 'V, S, M', description: 'Fortalecendo-se com uma energia semelhante à da morte não morta, você obtém 1d4 + 4 pontos de vida temporários por 1 hora.', damageEffect: '1d4+4 PV temp', classes: ['Mago', 'Feiticeiro', 'Artífice'], icon: 'undead-claws.png' },
  { id: 'fog-cloud', name: 'Nuvem de Névoa', level: 1, school: 'Conjuração', castingTime: '1 ação', duration: '1 hora', range: '36 m', components: 'V, S', description: 'Você cria uma névoa de 6 metros de raio centrada em um ponto dentro do alcance. A névoa obscurece a visão completamente.', damageEffect: 'Bloqueio visual', concentration: true, classes: ['Bardo', 'Druida', 'Patrulheiro', 'Mago', 'Feiticeiro'], icon: 'pink-fog.png' },
  { id: 'goodberry', name: 'Frutinhas Mágicas', level: 1, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea', range: 'Toque', components: 'V, S, M', description: 'Até 10 frutinhas são imbacilizadas com magia por 24 horas. Cada frutinha repõe 1 PV quando comida e alimenta para o dia.', damageEffect: '1 PV por fruta', classes: ['Druida', 'Patrulheiro'], icon: 'nature-growth.png' },
  { id: 'grease', name: 'Graxa', level: 1, school: 'Conjuração', castingTime: '1 ação', duration: '1 min', range: '18 m', components: 'V, S, M', description: 'Graxa escorregadia cobre o chão em um quadrado de 3 m centrado no ponto. A criatura que entrar na área ou começar o turno nela deve ter sucesso num teste de Destreza ou cair prostrada.', damageEffect: 'Prostrado', attackSave: 'Res. Des', classes: ['Mago', 'Artífice'], icon: 'acid-puddle.png' },
  { id: 'guiding-bolt', name: 'Raio Condutor', level: 1, school: 'Evocação', castingTime: '1 ação', duration: '1 rodada', range: '36 m', components: 'V, S', description: 'Um flash de luz jorra de seus dedos. Faça um ataque mágico à distância contra o alvo. Em um acerto, 4d6 de dano radiante e o próximo ataque contra o alvo tem vantagem.', damageEffect: '4d6 Radiante', attackSave: 'Ataque', classes: ['Clérigo'], icon: 'sun-flare.png' },
  { id: 'healing-word', name: 'Palavra de Cura', level: 1, school: 'Evocação', castingTime: '1 ação bônus', duration: 'Instantânea', range: '18 m', components: 'V', description: 'Uma criatura a sua escolha que você possa ver dentro do alcance recupera PV iguais a 2d4 + seu modificador de conjuração.', damageEffect: '2d4+mod Cura', classes: ['Bardo', 'Clérigo', 'Druida'], icon: 'divine-heal.png' },
  { id: 'hellish-rebuke', name: 'Represália Infernal', level: 1, school: 'Evocação', castingTime: '1 reação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Reação quando danificado. O atacante é envolvido em chamas infernais e deve ter sucesso num teste de Destreza ou receber 2d10 de dano de fogo.', damageEffect: '2d10 Fogo', attackSave: 'Res. Des', classes: ['Bruxo'], icon: 'flame-blast.png' },
  { id: 'heroism', name: 'Heroísmo', level: 1, school: 'Encantamento', castingTime: '1 ação', duration: '1 min', range: 'Toque', components: 'V, S', description: 'Uma criatura voluntária que você toca é imbacilizada com bravura. Até que a magia termine a criatura é imune a condição assustado e ganha PV temporários iguais ao seu modificador de conjuração no início de cada turno.', damageEffect: 'PV temporários', concentration: true, classes: ['Bardo', 'Paladino'], icon: 'mighty-fist.png' },
  { id: 'hex', name: 'Hexar', level: 1, school: 'Encantamento', castingTime: '1 ação bônus', duration: '1 hora', range: '27 m', components: 'V, S, M', description: 'Você coloca uma maldição em uma criatura que você possa ver dentro do alcance. Até a magia terminar, você causa 1d6 extra de dano necrótico ao alvo quando o acertar com um ataque.', damageEffect: '+1d6 Necrótico', concentration: true, classes: ['Bruxo'], icon: 'undead-skull.png' },
  { id: 'hunters-mark', name: 'Marca do Caçador', level: 1, school: 'Adivinhação', castingTime: '1 ação bônus', duration: '1 hora', range: '27 m', components: 'V', description: 'Você escolhe uma criatura que você possa ver dentro do alcance e a marca misticalmente como sua presa. Você causa 1d6 extra de dano quando acertar com um ataque de arma, e tem vantagem em testes de Percepção e Sobrevivência para localizá-la.', damageEffect: '+1d6 dano', concentration: true, classes: ['Patrulheiro'], icon: 'all-seeing-eye.png' },
  { id: 'identify', name: 'Identificar', level: 1, school: 'Adivinhação', castingTime: '1 min (ritual)', duration: 'Instantânea', range: 'Toque', components: 'V, S, M', description: 'Você escolhe um objeto que deve ser mantido em contato durante toda a conjuração. Se for um item mágico, você aprende suas propriedades mágicas.', damageEffect: 'Utilidade', ritual: true, classes: ['Bardo', 'Mago', 'Artífice'], icon: 'scrying-orb.png' },
  { id: 'illusory-script', name: 'Roteiro Ilusório', level: 1, school: 'Ilusão', castingTime: '1 min (ritual)', duration: '10 dias', range: 'Toque', components: 'S, M', description: 'Você escreve em papel ou superfície com tinta especial. Para todos exceto você e criaturas específicas, parece um texto confuso.', damageEffect: 'Ilusão', ritual: true, classes: ['Bardo', 'Bruxo', 'Mago'], icon: 'magic-scroll.png' },
  { id: 'inflict-wounds', name: 'Infligir Ferimentos', level: 1, school: 'Necromancia', castingTime: '1 ação', duration: 'Instantânea', range: 'Toque', components: 'V, S', description: 'Faça um ataque mágico corpo a corpo contra uma criatura ao alcance. Em um acerto, 3d10 de dano necrótico.', damageEffect: '3d10 Necrótico', attackSave: 'Ataque', classes: ['Clérigo'], icon: 'undead-claws.png' },
  { id: 'jump', name: 'Pular', level: 1, school: 'Transmutação', castingTime: '1 ação', duration: '1 min', range: 'Toque', components: 'V, S, M', description: 'Você toca uma criatura. A distância de salto da criatura é triplicada até que a magia termine.', damageEffect: 'Mobilidade', classes: ['Druida', 'Patrulheiro', 'Mago', 'Feiticeiro', 'Artífice'], icon: 'speed-step.png' },
  { id: 'longstrider', name: 'Passos Longos', level: 1, school: 'Transmutação', castingTime: '1 ação', duration: '1 hora', range: 'Toque', components: 'V, S, M', description: 'Você toca uma criatura. A velocidade do alvo aumenta em 3 metros até que a magia termine.', damageEffect: '+3m velocidade', classes: ['Bardo', 'Druida', 'Patrulheiro', 'Mago', 'Artífice'], icon: 'haste-feet.png' },
  { id: 'mage-armor', name: 'Armadura de Mago', level: 1, school: 'Abjuração', castingTime: '1 ação', duration: '8 horas', range: 'Toque', components: 'V, S, M', description: 'Você toca uma criatura voluntária que não usa armadura, e uma força mágica protetora a circunda até que a magia termine. A CA base do alvo se torna 13 + seu modificador de Destreza.', damageEffect: 'CA 13+Des', classes: ['Mago', 'Feiticeiro'], icon: 'holy-armor.png' },
  { id: 'magic-missile', name: 'Míssil Mágico', level: 1, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '45 m', components: 'V, S', description: 'Você cria três dardos brilhantes de força mágica. Cada dardo acerta uma criatura de sua escolha dentro do alcance. Um dardo causa 1d4 + 1 de dano de força.', damageEffect: '3×(1d4+1) Força', classes: ['Mago', 'Feiticeiro', 'Artífice'], icon: 'arcane-bolts.png' },
  { id: 'protection-evil', name: 'Proteção do Bem e do Mal', level: 1, school: 'Abjuração', castingTime: '1 ação', duration: '10 min', range: 'Toque', components: 'V, S, M', description: 'Até que a magia termine, uma criatura voluntária que você toca é protegida contra aberrações, celestiais, elementais, fadas, demônios e mortos-vivos.', damageEffect: 'Proteção', concentration: true, classes: ['Bardo', 'Clérigo', 'Druida', 'Paladino', 'Patrulheiro', 'Bruxo', 'Mago', 'Feiticeiro'], icon: 'protection-field.png' },
  { id: 'sanctuary', name: 'Santuário', level: 1, school: 'Abjuração', castingTime: '1 ação bônus', duration: '1 min', range: '9 m', components: 'V, S, M', description: 'Você protege uma criatura contra ataques. Qualquer criatura que tente atacar o alvo deve primeiro fazer um teste de resistência de Sabedoria.', damageEffect: 'Proteção', classes: ['Clérigo', 'Artífice'], icon: 'protection-field.png' },
  { id: 'shield', name: 'Escudo', level: 1, school: 'Abjuração', castingTime: '1 reação', duration: '1 rodada', range: 'Pessoal', components: 'V, S', description: 'Reação quando atacado. Uma barreira de força invisível aparece e deflecte o ataque. Até o início do próximo turno, você tem +5 de bônus na CA e não pode ser afetado por míssil mágico.', damageEffect: '+5 CA', classes: ['Mago', 'Feiticeiro', 'Artífice'], icon: 'steel-shield.png' },
  { id: 'shield-of-faith', name: 'Escudo da Fé', level: 1, school: 'Abjuração', castingTime: '1 ação bônus', duration: '10 min', range: '18 m', components: 'V, S, M', description: 'Um campo cintilante aparece ao redor de uma criatura de sua escolha. O alvo ganha +2 de bônus na CA até que a magia termine.', damageEffect: '+2 CA', concentration: true, classes: ['Clérigo', 'Paladino'], icon: 'wall-protection.png' },
  { id: 'silent-image', name: 'Imagem Silenciosa', level: 1, school: 'Ilusão', castingTime: '1 ação', duration: '10 min', range: '18 m', components: 'V, S, M', description: 'Você cria a imagem de um objeto, uma criatura ou algum outro fenômeno visível em 4,5 m³ dentro do alcance.', damageEffect: 'Ilusão', concentration: true, classes: ['Bardo', 'Mago', 'Feiticeiro'], icon: 'mirror-image.png' },
  { id: 'sleep', name: 'Sono', level: 1, school: 'Encantamento', castingTime: '1 ação', duration: '1 min', range: '27 m', components: 'V, S, M', description: 'Esta magia manda criaturas em sono mágico. Role 5d8 para o total de PV que pode ser afetado.', damageEffect: 'Adormecido', classes: ['Bardo', 'Mago', 'Feiticeiro'], icon: 'pink-fog.png' },
  { id: 'speak-with-animals', name: 'Falar com Animais', level: 1, school: 'Adivinhação', castingTime: '1 ação (ritual)', duration: '10 min', range: 'Pessoal', components: 'V, S', description: 'Você obtém a habilidade de compreender e verbalmente se comunicar com bestas por 10 minutos.', damageEffect: 'Comunicação', ritual: true, classes: ['Bardo', 'Druida', 'Patrulheiro'], icon: 'eagle-eyes.png' },
  { id: 'thunderwave', name: 'Onda de Trovão', level: 1, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: 'Pessoal (cubo de 4,5m)', components: 'V, S', description: 'Uma onda de força trovejante varre a partir de você. Cada criatura num cubo de 4,5 m deve ter sucesso num teste de Constituição ou sofrer 2d8 de dano de trovão e ser empurrada 3 m.', damageEffect: '2d8 Trovão', attackSave: 'Res. Con', classes: ['Bardo', 'Druida', 'Mago', 'Feiticeiro', 'Artífice'], icon: 'mind-waves.png' },
  { id: 'unseen-servant', name: 'Servo Invisível', level: 1, school: 'Conjuração', castingTime: '1 ação (ritual)', duration: '1 hora', range: '18 m', components: 'V, S, M', description: 'Você cria uma força invisível e sensível que age conforme suas ordens para 1 hora.', damageEffect: 'Utilidade', ritual: true, classes: ['Bardo', 'Bruxo', 'Mago'], icon: 'spirit-group.png' },
  { id: 'witch-bolt', name: 'Raio da Bruxa', level: 1, school: 'Evocação', castingTime: '1 ação', duration: '1 min', range: '9 m', components: 'V, S, M', description: 'Um feixe de energia azul relampeja em direção a uma criatura dentro do alcance. Faça um ataque mágico. Em um acerto, 1d12 de dano elétrico, e nos turnos seguintes pode usar ação para causar 1d12 elétrico automaticamente.', damageEffect: '1d12 Elétrico', attackSave: 'Ataque', concentration: true, classes: ['Mago', 'Feiticeiro', 'Bruxo', 'Artífice'], icon: 'lightning-bolt.png' },
  { id: 'wrathful-smite', name: 'Golpe da Ira', level: 1, school: 'Evocação', castingTime: '1 ação bônus', duration: '1 min', range: 'Pessoal', components: 'V', description: 'A próxima arremessada sua com arma causa 1d6 extra de dano psíquico. Se acertar, a criatura deve fazer um teste de Sabedoria ou ficar assustada.', damageEffect: '+1d6 Psíquico', concentration: true, classes: ['Paladino'], icon: 'fist-power.png' },
  { id: 'dissonant-whispers', name: 'Sussurros Dissonantes', level: 1, school: 'Encantamento', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V', description: 'Você murmura uma melodia Weaver que apenas uma criatura pode ouvir. O alvo deve fazer um teste de Sabedoria ou sofrer 3d6 de dano psíquico e fugir.', damageEffect: '3d6 Psíquico', attackSave: 'Res. Sab', classes: ['Bardo'], icon: 'mind-waves.png' },
  { id: 'distort-value', name: 'Distorcer Valor', level: 1, school: 'Ilusão', castingTime: '1 ação', duration: '8 horas', range: 'Toque', components: 'V', description: 'Você lança uma ilusão sobre um objeto que você toca para fazê-lo parecer valer o dobro ou metade do seu valor real.', damageEffect: 'Social', classes: ['Bardo', 'Bruxo', 'Mago', 'Feiticeiro'], icon: 'magic-scroll.png' },
  { id: 'feather-fall', name: 'Queda Suave', level: 1, school: 'Transmutação', castingTime: '1 reação', duration: '1 min', range: '18 m', components: 'V, M', description: 'Até 5 criaturas caindo no alcance têm sua velocidade de queda reduzida para 18m por rodada e não sofrem dano de queda.', damageEffect: 'Utilidade', classes: ['Bardo', 'Mago', 'Feiticeiro'], icon: 'feather-fall.png' },
  { id: 'tashas-hideous-laughter', name: 'Riso Histérico de Tasha', level: 1, school: 'Encantamento', castingTime: '1 ação', duration: '1 min', range: '9 m', components: 'V, S, M', description: 'Uma criatura desaba em gargalhadas se falhar num teste de Sabedoria, ficando caída e incapacitada.', damageEffect: 'Controle', attackSave: 'Res. Sab', concentration: true, classes: ['Bardo', 'Bruxo', 'Mago', 'Feiticeiro'], icon: 'pink-fog.png' },
  { id: 'detect-evil-good', name: 'Detectar o Bem e Mal', level: 1, school: 'Adivinhação', castingTime: '1 ação', duration: '10 min', range: 'Pessoal', components: 'V, S', description: 'Sente a presença de seres de outros planos.', damageEffect: 'Utilidade', concentration: true, classes: ['Clérigo', 'Paladino'], icon: 'dark-vision.png' },
  { id: 'detect-poison-disease', name: 'Detectar Veneno e Doença', level: 1, school: 'Adivinhação', castingTime: '1 ação (ritual)', duration: '10 min', range: 'Pessoal', components: 'V, S, M', description: 'Sente a presença de venenos e doenças.', damageEffect: 'Utilidade', ritual: true, concentration: true, classes: ['Clérigo', 'Druida', 'Paladino', 'Patrulheiro'], icon: 'all-seeing-eye.png' },
  { id: 'purify-food-drink', name: 'Purificar Alimentos', level: 1, school: 'Transmutação', castingTime: '1 ação (ritual)', duration: 'Instantânea', range: '3 m', components: 'V, S', description: 'Purifica comida e água.', damageEffect: 'Utilidade', ritual: true, classes: ['Clérigo', 'Druida', 'Paladino'], icon: 'magic-potion.png' },
  { id: 'ceremony', name: 'Cerimônia', level: 1, school: 'Abjuração', castingTime: '1 hora (ritual)', duration: 'Instantânea', range: 'Toque', components: 'V, S, M', description: 'Realiza uma cerimônia religiosa que concede benefícios.', damageEffect: 'Utilidade', ritual: true, classes: ['Clérigo', 'Paladino'], icon: 'holy-cross.png' },
  { id: 'create-destroy-water', name: 'Criar ou Destruir Água', level: 1, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea', range: '9 m', components: 'V, S, M', description: 'Cria ou destrói água.', damageEffect: 'Utilidade', classes: ['Clérigo', 'Druida'], icon: 'water-droplets.png' },
  { id: 'ice-knife', name: 'Faca de Gelo', level: 1, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'S, M', description: 'Cria uma faca de gelo que explode.', damageEffect: '1d10 Perf + 2d6 Frio', attackSave: 'Ataque/Res. Des', classes: ['Druida', 'Mago', 'Feiticeiro', 'Patrulheiro'], icon: 'frost-shards.png' },
  { id: 'ensnaring-strike', name: 'Golpe Enredante', level: 1, school: 'Conjuração', castingTime: '1 ação bônus', duration: '1 min', range: 'Pessoal', components: 'V', description: 'Seu próximo ataque enreda o alvo.', damageEffect: '1d6 Perfurante', attackSave: 'Res. For', concentration: true, classes: ['Patrulheiro'], icon: 'vine-entangle.png' },
  { id: 'hail-of-thorns', name: 'Chuva de Espinhos', level: 1, school: 'Conjuração', castingTime: '1 ação bônus', duration: '1 min', range: 'Pessoal', components: 'V', description: 'Seu próximo ataque com arma à distância cria uma chuva de espinhos.', damageEffect: '1d10 Perfurante', attackSave: 'Res. Des', classes: ['Patrulheiro'], icon: 'nature-shield.png' },
  { id: 'arms-of-hadar', name: 'Braços de Hadar', level: 1, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: 'Pessoal (3m)', components: 'V, S', description: 'Braços sombrios atacam ao seu redor.', damageEffect: '2d6 Necrótico', attackSave: 'Res. For', classes: ['Bruxo'], icon: 'shadow-tentacles.png' },
  { id: 'searing-smite', name: 'Golpe Ardente', level: 1, school: 'Evocação', castingTime: '1 ação bônus', duration: '1 min', range: 'Pessoal', components: 'V', description: 'Sua arma flameja.', damageEffect: '1d6 Fogo', attackSave: 'Res. Con', concentration: true, classes: ['Paladino'], icon: 'flame-blast.png' },
  { id: 'thunderous-smite', name: 'Golpe Trovejante', level: 1, school: 'Evocação', castingTime: '1 ação bônus', duration: '1 min', range: 'Pessoal', components: 'V', description: 'Sua arma ressoa com trovão.', damageEffect: '2d6 Trovão', attackSave: 'Res. For', concentration: true, classes: ['Paladino'], icon: 'lightning-bolt.png' },
  { id: 'chromatic-orb', name: 'Orbe Cromática', level: 1, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '27 m', components: 'V, S, M', description: 'Lança uma esfera de energia.', damageEffect: '3d8 Variado', attackSave: 'Ataque', classes: ['Mago', 'Feiticeiro'], icon: 'prismatic-orb.png' },
  { id: 'ray-of-sickness', name: 'Raio de Doença', level: 1, school: 'Necromancia', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Um raio de energia doentia.', damageEffect: '2d8 Veneno', attackSave: 'Ataque/Res. Con', classes: ['Mago', 'Feiticeiro'], icon: 'poison-spray.png' },
  { id: 'find-familiar', name: 'Encontrar Familiar', level: 1, school: 'Conjuração', castingTime: '1 hora (ritual)', duration: 'Instantânea', range: '3 m', components: 'V, S, M', description: 'Invoca um espírito familiar.', damageEffect: 'Utilidade', ritual: true, classes: ['Mago'], icon: 'bird-spirit.png' },
  { id: 'tenser-floating-disk', name: 'Disco Flutuante de Tenser', level: 1, school: 'Conjuração', castingTime: '1 ação (ritual)', duration: '1 hora', range: '9 m', components: 'V, S, M', description: 'Cria um disco de força para carregar peso.', damageEffect: 'Utilidade', ritual: true, classes: ['Mago'], icon: 'cosmic-vortex.png' },
  { id: 'expeditious-retreat', name: 'Recuo Acelerado', level: 1, school: 'Transmutação', castingTime: '1 ação bônus', duration: '10 min', range: 'Pessoal', components: 'V, S', description: 'Pode usar Disparar como ação bônus.', damageEffect: 'Mobilidade', concentration: true, classes: ['Bruxo', 'Mago', 'Feiticeiro'], icon: 'speed-step.png' },
  { id: 'cause-fear', name: 'Causar Medo', level: 1, school: 'Necromancia', castingTime: '1 ação', duration: '1 min', range: '18 m', components: 'V', description: 'Desperta medo em uma criatura.', damageEffect: 'Assustado', attackSave: 'Res. Sab', concentration: true, classes: ['Bruxo', 'Mago'], icon: 'shadow-mask.png' },
  { id: 'catapult', name: 'Catapulta', level: 1, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'S', description: 'Arremessa um objeto.', damageEffect: '3d8 Concussão', attackSave: 'Res. Des', classes: ['Mago', 'Feiticeiro', 'Artífice'], icon: 'heavy-weight.png' },
  { id: 'snare', name: 'Armadilha', level: 1, school: 'Abjuração', castingTime: '1 min', duration: '8 horas', range: 'Toque', components: 'V, S, M', description: 'Você cria um laço mágico no chão. Uma criatura que entrar na área deve fazer teste de Destreza ou ficar pendurada de cabeça para baixo e contida.', damageEffect: 'Contido', attackSave: 'Res. Des', classes: ['Druida', 'Patrulheiro', 'Mago', 'Artífice'], icon: 'arcane-lock.png' },
  { id: 'caustic-brew', name: 'Fervura Cáustica de Tasha', level: 1, school: 'Evocação', castingTime: '1 ação', duration: '1 min', range: 'Pessoal (linha de 9m)', components: 'V, S, M', description: 'Um jato de ácido jorra de você. Criaturas na linha sofrem 2d4 de dano ácido no início de cada turno até que alguém use uma ação para limpar o ácido.', damageEffect: '2d4 Ácido por turno', attackSave: 'Res. Des', concentration: true, classes: ['Artífice', 'Mago', 'Feiticeiro'], icon: 'acid-puddle.png' },

  // ── Nível 2 ─────────────────────────────────────────────────────────────────
  { id: 'scorching-ray', name: 'Raio Escaldante', level: 2, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '36 m', components: 'V, S', description: 'Você cria três raios de fogo. Cada raio causa 2d6 de dano de fogo.', damageEffect: '2d6 Fogo (x3)', attackSave: 'Ataque', classes: ['Mago', 'Feiticeiro', 'Artífice'], icon: 'flame-blast.png' },
  { id: 'shatter', name: 'Fragmentar', level: 2, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S, M', description: 'Um barulho ensurdecedor. Cada criatura a 3m deve fazer teste de Constituição ou sofrer 3d8 de trovão.', damageEffect: '3d8 Trovão', attackSave: 'Res. Con', classes: ['Mago', 'Feiticeiro', 'Bardo', 'Artífice'], icon: 'mind-waves.png' },
  { id: 'flaming-sphere', name: 'Esfera Flamejante', level: 2, school: 'Conjuração', castingTime: '1 ação', duration: '1 min', range: '18 m', components: 'V, S, M', description: 'Uma esfera de fogo de 1,5m de diâmetro. 2d6 de dano de fogo a criaturas próximas.', damageEffect: '2d6 Fogo', attackSave: 'Res. Des', concentration: true, classes: ['Druida', 'Mago', 'Artífice'], icon: 'flame-circle.png' },
  { id: 'melfs-acid-arrow', name: 'Flecha Ácida de Melf', level: 2, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '27 m', components: 'V, S, M', description: 'Uma flecha mágica de ácido. 4d4 dano ácido imediato e 2d4 no fim do próximo turno.', damageEffect: '4d4+2d4 Ácido', attackSave: 'Ataque', classes: ['Mago', 'Artífice'], icon: 'acid-puddle.png' },
  { id: 'mirror-image', name: 'Imagens Espelhadas', level: 2, school: 'Ilusão', castingTime: '1 ação', duration: '1 min', range: 'Pessoal', components: 'V, S', description: 'Três duplicatas ilusórias de você aparecem em seu espaço. Elas se movem com você e imitam suas ações.', damageEffect: 'Defesa Ilusória', classes: ['Mago', 'Feiticeiro', 'Bruxo', 'Bardo', 'Artífice'], icon: 'mirror-image.png' },
  { id: 'branding-smite', name: 'Golpe Marcante', level: 2, school: 'Evocação', castingTime: '1 ação bônus', duration: '1 min', range: 'Pessoal', components: 'V', description: 'O próximo ataque com arma causa 2d6 de dano radiante extra e o alvo brilha, impedindo invisibilidade.', damageEffect: '2d6 Radiante', attackSave: 'Res. Con', concentration: true, classes: ['Paladino', 'Artífice'], icon: 'sun-flare.png' },
  { id: 'warding-bond', name: 'Vínculo de Proteção', level: 2, school: 'Abjuração', castingTime: '1 ação', duration: '1 hora', range: '18 m', components: 'V, S, M', description: 'Você toca uma criatura e cria um elo místico. Enquanto o alvo estiver a 18m, ele tem +1 na CA/Salvaguardas e resistência a todo dano, mas você sofre o mesmo dano.', damageEffect: 'Proteção Compartilhada', classes: ['Clérigo', 'Paladino', 'Artífice'], icon: 'protection-field.png' },

  // ── Nível 3 ─────────────────────────────────────────────────────────────────
  { id: 'fireball', name: 'Bola de Fogo', level: 3, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '45 m', components: 'V, S, M', description: 'Uma explosão de fogo em raio de 6m. 8d6 de dano de fogo.', damageEffect: '8d6 Fogo', attackSave: 'Res. Des', classes: ['Mago', 'Feiticeiro', 'Artífice'], icon: 'wild-fire.png' },
  { id: 'wind-wall', name: 'Muro de Vento', level: 3, school: 'Evocação', castingTime: '1 ação', duration: '1 min', range: '36 m', components: 'V, S, M', description: 'Um muro de vento forte que repele projéteis e criaturas pequenas.', damageEffect: '3d8 Concussão', concentration: true, classes: ['Druida', 'Patrulheiro', 'Artífice'], icon: 'wind-gust.png' },
  { id: 'gaseous-form', name: 'Forma Gasosa', level: 3, school: 'Transmutação', castingTime: '1 ação', duration: '1 hora', range: 'Toque', components: 'V, S, M', description: 'Uma criatura voluntária se transforma em uma nuvem de fumaça.', damageEffect: 'Utilidade', concentration: true, classes: ['Feiticeiro', 'Bruxo', 'Mago', 'Artífice'], icon: 'pink-fog.png' },
  { id: 'mass-healing-word', name: 'Palavra Curativa em Massa', level: 3, school: 'Evocação', castingTime: '1 ação bônus', duration: 'Instantânea', range: '18 m', components: 'V', description: 'Como a palavra curativa, mas afeta até 6 criaturas.', damageEffect: '1d4+mod Cura', classes: ['Clérigo', 'Artífice'], icon: 'divine-heal.png' },
  { id: 'hypnotic-pattern', name: 'Padrão Hipnótico', level: 3, school: 'Ilusão', castingTime: '1 ação', duration: '1 min', range: '36 m', components: 'S, M', description: 'Um padrão de cores rodopiantes e hipnóticas aparece em um cubo de 9m. Alvos falhando em salvaguarda de Sabedoria ficam incapacitados e com velocidade 0.', damageEffect: 'Incapacitado', attackSave: 'Res. Sab', concentration: true, classes: ['Bardo', 'Bruxo', 'Mago', 'Feiticeiro', 'Artífice'], icon: 'pink-fog.png' },
  { id: 'lightning-bolt', name: 'Relâmpago', level: 3, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: 'Pessoal (linha de 30m)', components: 'V, S, M', description: 'Um relâmpago de 30 metros de comprimento e 1,5 metros de largura dispara em uma direção. 8d6 de dano elétrico.', damageEffect: '8d6 Elétrico', attackSave: 'Res. Des', classes: ['Mago', 'Feiticeiro', 'Artífice'], icon: 'lightning-bolt.png' },
  { id: 'aura-of-vitality', name: 'Aura de Vitalidade', level: 3, school: 'Evocação', castingTime: '1 ação', duration: '1 min', range: 'Pessoal (9m)', components: 'V', description: 'Energia curativa irradia de você. Até a magia terminar, você pode usar uma ação bônus para curar 2d6 PV a uma criatura na aura.', damageEffect: '2d6 Cura (Bônus)', concentration: true, classes: ['Clérigo', 'Paladino', 'Druida', 'Artífice'], icon: 'divine-heal.png' },
  { id: 'conjure-barrage', name: 'Conjurar Salva', level: 3, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: 'Pessoal (cone de 18m)', components: 'V, S, M', description: 'Você joga uma arma não mágica ou munição e cria um cone de projéteis idênticos. Cada criatura na área sofre 3d8 de dano.', damageEffect: '3d8 Variado', attackSave: 'Res. Des', classes: ['Patrulheiro', 'Artífice'], icon: 'arcane-lock.png' },

  // ── Nível 4 ─────────────────────────────────────────────────────────────────
  { id: 'ice-storm', name: 'Tempestade de Gelo', level: 4, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '90 m', components: 'V, S, M', description: 'Uma tempestade de granizo. 2d8 esmagamento + 4d6 frio.', damageEffect: '2d8+4d6', attackSave: 'Res. Des', classes: ['Druida', 'Mago', 'Feiticeiro', 'Artífice'], icon: 'frost-shards.png' },
  { id: 'wall-of-fire', name: 'Muro de Fogo', level: 4, school: 'Evocação', castingTime: '1 ação', duration: '1 min', range: '36 m', components: 'V, S, M', description: 'Um muro de chamas. 5d8 de dano de fogo.', damageEffect: '5d8 Fogo', concentration: true, classes: ['Mago', 'Druida', 'Feiticeiro', 'Artífice'], icon: 'flame-blast.png' },
  { id: 'blight', name: 'Definhar', level: 4, school: 'Necromancia', castingTime: '1 ação', duration: 'Instantânea', range: '9 m', components: 'V, S', description: 'Energia necrótica drena a vida. 8d8 de dano necrótico.', damageEffect: '8d8 Necrótico', attackSave: 'Res. Con', classes: ['Feiticeiro', 'Bruxo', 'Mago', 'Druida', 'Artífice'], icon: 'undead-claws.png' },
  { id: 'death-ward', name: 'Proteção contra a Morte', level: 4, school: 'Abjuração', castingTime: '1 ação', duration: '8 horas', range: 'Toque', components: 'V, S', description: 'A primeira vez que o alvo cair a 0 PV, ele cai a 1 PV em vez disso.', damageEffect: 'Proteção', classes: ['Clérigo', 'Paladino', 'Artífice'], icon: 'protection-field.png' },
  { id: 'fire-shield', name: 'Escudo de Fogo', level: 4, school: 'Evocação', castingTime: '1 ação', duration: '10 min', range: 'Pessoal', components: 'V, S, M', description: 'Chamas finas envolvem seu corpo. Escolha escudo quente ou frio para resistência e dano de retaliação (2d8).', damageEffect: '2d8 Fogo/Frio', classes: ['Mago', 'Artífice'], icon: 'flame-circle.png' },
  { id: 'greater-invisibility', name: 'Invisibilidade Maior', level: 4, school: 'Ilusão', castingTime: '1 ação', duration: '1 min', range: 'Toque', components: 'V, S', description: 'Uma criatura tocada fica invisível. A invisibilidade não termina se o alvo atacar ou conjurar magia.', damageEffect: 'Invisibilidade', concentration: true, classes: ['Bardo', 'Mago', 'Feiticeiro', 'Artífice'], icon: 'mirror-image.png' },
  { id: 'aura-of-purity', name: 'Aura de Pureza', level: 4, school: 'Abjuração', castingTime: '1 ação', duration: '10 min', range: 'Pessoal (9m)', components: 'V', description: 'Uma aura purificadora irradia de você. Criaturas na aura têm resistência a dano de veneno e vantagem em salvaguardas contra várias condições negativas.', damageEffect: 'Res. Veneno/Vantagem', concentration: true, classes: ['Paladino', 'Clérigo', 'Artífice'], icon: 'protection-field.png' },

  // ── Nível 5 ─────────────────────────────────────────────────────────────────
  { id: 'cone-of-cold', name: 'Cone de Frio', level: 5, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: 'Pessoal (18m)', components: 'V, S, M', description: 'Um cone de gelo. 8d8 de dano de frio.', damageEffect: '8d8 Frio', attackSave: 'Res. Con', classes: ['Mago', 'Feiticeiro', 'Artífice'], icon: 'frost-cone.png' },
  { id: 'wall-of-force', name: 'Muro de Força', level: 5, school: 'Evocação', castingTime: '1 ação', duration: '10 min', range: '36 m', components: 'V, S, M', description: 'Um muro invisível e indestrutível.', damageEffect: 'Utilidade', concentration: true, classes: ['Mago', 'Artífice'], icon: 'protection-field.png' },
  { id: 'cloudkill', name: 'Nuvem Mortal', level: 5, school: 'Conjuração', castingTime: '1 ação', duration: '10 min', range: '36 m', components: 'V, S', description: 'Uma esfera de gás venenoso. 5d8 de dano venenoso por turno.', damageEffect: '5d8 Veneno', attackSave: 'Res. Con', concentration: true, classes: ['Feiticeiro', 'Mago', 'Artífice'], icon: 'poison-cloud.png' },
  { id: 'raise-dead', name: 'Reviver os Mortos', level: 5, school: 'Necromancia', castingTime: '1 hora', duration: 'Instantânea', range: 'Toque', components: 'V, S, M', description: 'Retorna a vida de uma criatura morta há no máximo 10 dias.', damageEffect: 'Ressurreição', classes: ['Clérigo', 'Bardo', 'Paladino', 'Artífice'], icon: 'holy-cross.png' },
  { id: 'greater-restoration', name: 'Restauração Maior', level: 5, school: 'Abjuração', castingTime: '1 ação', duration: 'Instantânea', range: 'Toque', components: 'V, S, M', description: 'Remove uma condição de exaustão, encantamento, petrificação ou maldição.', damageEffect: 'Cura especial', classes: ['Clérigo', 'Bardo', 'Druida', 'Artífice'], icon: 'protection-field.png' },
  { id: 'passwall', name: 'Atravessar Paredes', level: 5, school: 'Transmutação', castingTime: '1 ação', duration: '1 hora', range: '9 m', components: 'V, S, M', description: 'Cria uma passagem de 1,5m de largura por 2,4m de altura e 6m de profundidade em uma superfície de madeira, gesso ou pedra.', damageEffect: 'Utilidade', classes: ['Mago', 'Artífice'], icon: 'cosmic-vortex.png' },
  { id: 'banishing-smite', name: 'Golpe Banidor', level: 5, school: 'Abjuração', castingTime: '1 ação bônus', duration: '1 min', range: 'Pessoal', components: 'V', description: 'Seu próximo ataque causa 5d10 extra de dano de força. Se o alvo tiver 50 PV ou menos, ele é banido.', damageEffect: '5d10 Força', concentration: true, classes: ['Paladino', 'Artífice'], icon: 'arcane-lock.png' },
  { id: 'mass-cure-wounds', name: 'Curar Ferimentos em Massa', level: 5, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Uma onda de energia curativa atinge até 6 criaturas. Cada alvo recupera 3d8 + mod. conjuração.', damageEffect: '3d8+mod Cura', classes: ['Clérigo', 'Druida', 'Bardo', 'Artífice'], icon: 'divine-heal.png' },

  // ── Nível 6 ─────────────────────────────────────────────────────────────────
  { id: 'heal', name: 'Curar', level: 6, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Cura 70 PV e remove cegueira, surdez e qualquer doença.', damageEffect: '70 Cura', classes: ['Clérigo', 'Druida'], icon: 'divine-heal.png' },
  { id: 'planar-ally', name: 'Aliado Planar', level: 6, school: 'Conjuração', castingTime: '10 min', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Você suplica a uma entidade extraplanar por auxílio. Uma criatura enviada por sua divindade aparece e pode realizar tarefas em troca de pagamento ou serviços.', damageEffect: 'Utilidade', classes: ['Clérigo'], icon: 'spirit-group.png' },
  { id: 'eyebite', name: 'Ataque Visual', level: 6, school: 'Necromancia', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: 'Pessoal', components: 'V, S', description: 'Seus olhos tornam-se poços de escuridão. Pode usar uma ação para afetar uma criatura que você possa ver a até 18m, causando Pânico, Doença ou Sono.', damageEffect: 'Controle', attackSave: 'Res. Sab', concentration: true, classes: ['Bardo', 'Bruxo', 'Mago', 'Feiticeiro'], icon: 'shadow-mask.png' },
  { id: 'heroes-feast', name: 'Banquete de Heróis', level: 6, school: 'Conjuração', castingTime: '10 min', duration: 'Instantânea', range: '9 m', components: 'V, S, M', description: 'Você traz um banquete magnífico. Até 12 criaturas que participarem ganham imunidade a veneno e medo, vantagem em testes de Sabedoria e aumento no PV máximo por 24 horas.', damageEffect: 'Buff em Massa', classes: ['Clérigo', 'Druida'], icon: 'magic-potion.png' },
  { id: 'blade-barrier', name: 'Barreira de Lâminas', level: 6, school: 'Evocação', castingTime: '1 ação', duration: 'Concentração, até 10 min', range: '27 m', components: 'V, S', description: 'Você cria uma muralha vertical de lâminas giratórias e afiadas. Criaturas que entrarem ou começarem o turno na área sofrem 6d10 de dano cortante.', damageEffect: '6d10 Cortante', attackSave: 'Res. Des', concentration: true, classes: ['Clérigo'], icon: 'electric-sword.png' },
  { id: 'wind-walk', name: 'Caminhar no Vento', level: 6, school: 'Transmutação', castingTime: '1 min', duration: '8 horas', range: '9 m', components: 'V, S, M', description: 'Você e até 10 criaturas se tornam nuvens de fumaça. Ganham velocidade de voo de 90m e resistência a dano não mágico.', damageEffect: 'Mobilidade', classes: ['Druida', 'Clérigo'], icon: 'pink-fog.png' },
  { id: 'flesh-to-stone', name: 'Carne para Pedra', level: 6, school: 'Transmutação', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: '18 m', components: 'V, S, M', description: 'Você tenta transformar uma criatura em pedra. Se falhar em sucessivas salvaguardas de Constituição, ela fica petrificada.', damageEffect: 'Petrificação', attackSave: 'Res. Con', concentration: true, classes: ['Bruxo', 'Mago', 'Feiticeiro'], icon: 'heavy-weight.png' },
  { id: 'circle-of-death', name: 'Círculo da Morte', level: 6, school: 'Necromancia', castingTime: '1 ação', duration: 'Instantânea', range: '45 m', components: 'V, S, M', description: 'Uma esfera de energia negativa se expande. Criaturas na área devem fazer teste de Constituição ou sofrer 8d6 de dano necrótico.', damageEffect: '8d6 Necrótico', attackSave: 'Res. Con', classes: ['Bruxo', 'Mago', 'Feiticeiro'], icon: 'undead-skull.png' },
  { id: 'contingency', name: 'Contingência', level: 6, school: 'Evocação', castingTime: '10 min', duration: '10 dias', range: 'Pessoal', components: 'V, S, M', description: 'Você conjura uma magia de 5º nível ou inferior em si mesmo, que será ativada sob uma circunstância específica definida por você.', damageEffect: 'Utilidade', classes: ['Mago'], icon: 'arcane-lock.png' },
  { id: 'disintegrate', name: 'Desintegrar', level: 6, school: 'Transmutação', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S, M', description: 'Um raio verde atinge uma criatura. Se falhar na salvaguarda de Destreza, sofre 10d6 + 40 de dano de força. Se cair a 0 PV, é desintegrada em pó.', damageEffect: '10d6+40 Força', attackSave: 'Res. Des', classes: ['Mago', 'Feiticeiro'], icon: 'arcane-bolts.png' },
  { id: 'harm', name: 'Doença Plena', level: 6, school: 'Necromancia', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Você libera uma doença virulenta. O alvo deve fazer teste de Constituição ou sofrer 14d6 de dano necrótico e ter seu PV máximo reduzido.', damageEffect: '14d6 Necrótico', attackSave: 'Res. Con', classes: ['Clérigo'], icon: 'poison-spray.png' },
  { id: 'find-the-path', name: 'Encontrar o Caminho', level: 6, school: 'Adivinhação', castingTime: '1 min', duration: 'Concentração, até 1 dia', range: 'Pessoal', components: 'V, S, M', description: 'Você descobre a rota mais direta para um local fixo específico que você conheça no mesmo plano.', damageEffect: 'Utilidade', concentration: true, classes: ['Clérigo', 'Druida', 'Bardo'], icon: 'eagle-eyes.png' },
  { id: 'otilukes-freezing-sphere', name: 'Esfera Congelante de Otiluke', level: 6, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '90 m', components: 'V, S, M', description: 'Uma esfera de gelo explode. 10d6 de dano de frio em raio de 12m. Pode congelar superfícies de água.', damageEffect: '10d6 Frio', attackSave: 'Res. Des', classes: ['Mago', 'Feiticeiro'], icon: 'frost-shards.png' },
  { id: 'globe-of-invulnerability', name: 'Globo de Invulnerabilidade', level: 6, school: 'Abjuração', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: 'Pessoal (3m)', components: 'V, S, M', description: 'Um escudo imóvel de 3m de raio envolve você. Magias de 5º nível ou inferior não podem passar ou afetar quem está dentro.', damageEffect: 'Imunidade Mágica', concentration: true, classes: ['Mago', 'Feiticeiro'], icon: 'protection-field.png' },
  { id: 'programmed-illusion', name: 'Ilusão Programada', level: 6, school: 'Ilusão', castingTime: '1 ação', duration: 'Até ser dissipada', range: '36 m', components: 'V, S, M', description: 'Você cria uma ilusão de um objeto ou criatura que será ativada por um gatilho específico, repetindo uma performance de até 5 minutos.', damageEffect: 'Ilusão', classes: ['Mago', 'Bardo'], icon: 'mirror-image.png' },
  { id: 'move-earth', name: 'Mover Terra', level: 6, school: 'Transmutação', castingTime: '1 ação', duration: 'Concentração, até 2 horas', range: '36 m', components: 'V, S, M', description: 'Você molda terra, areia ou argila na área, criando valas, montes ou nivelando o terreno.', damageEffect: 'Utilidade', concentration: true, classes: ['Druida', 'Mago', 'Feiticeiro'], icon: 'heavy-weight.png' },
  { id: 'wall-of-thorns', name: 'Muralha de Espinhos', level: 6, school: 'Conjuração', castingTime: '1 ação', duration: 'Concentração, até 10 min', range: '18 m', components: 'V, S, M', description: 'Uma muralha de espinhos e vinhas. Criaturas que entrarem sofrem 7d8 de dano perfurante e ficam com movimento reduzido.', damageEffect: '7d8 Perfurante', attackSave: 'Res. Des', concentration: true, classes: ['Druida'], icon: 'vine-entangle.png' },
  { id: 'wall-of-ice', name: 'Muralha de Gelo', level: 6, school: 'Evocação', castingTime: '1 ação', duration: 'Concentração, até 10 min', range: '27 m', components: 'V, S, M', description: 'Uma muralha de gelo sólido. Se quebrada, cria uma área de frio que causa 5d6 de dano de frio.', damageEffect: '5d6 Frio', attackSave: 'Res. Des', concentration: true, classes: ['Mago'], icon: 'frost-shards.png' },
  { id: 'arcane-gate', name: 'Portal Arcano', level: 6, school: 'Conjuração', castingTime: '1 ação', duration: 'Concentração, até 10 min', range: '150 m', components: 'V, S', description: 'Você cria dois portais interligados que permitem teletransporte instantâneo entre eles.', damageEffect: 'Utilidade', concentration: true, classes: ['Mago', 'Bruxo', 'Feiticeiro'], icon: 'cosmic-vortex.png' },
  { id: 'forbiddance', name: 'Proibição', level: 6, school: 'Abjuração', castingTime: '10 min', duration: '1 dia', range: 'Toque', components: 'V, S, M', description: 'Você protege uma área contra teletransporte e criaturas planares. Criaturas afetadas sofrem 5d10 de dano radiante ou necrótico ao entrar.', damageEffect: '5d10 Radiante/Necró', classes: ['Clérigo'], icon: 'protection-field.png' },
  { id: 'sunbeam', name: 'Raio Solar', level: 6, school: 'Evocação', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: 'Pessoal (linha de 18m)', components: 'V, S, M', description: 'Um raio de luz solar cega e causa 6d8 de dano radiante em uma linha. Pode usar a ação para disparar o raio novamente nos turnos seguintes.', damageEffect: '6d8 Radiante', attackSave: 'Res. Con', concentration: true, classes: ['Druida', 'Mago', 'Feiticeiro', 'Clérigo'], icon: 'sun-flare.png' },
  { id: 'magic-jar', name: 'Recipiente Arcano', level: 6, school: 'Necromancia', castingTime: '1 min', duration: 'Até ser dissipada', range: 'Pessoal', components: 'V, S, M', description: 'Sua alma entra em um receptáculo e você pode possuir corpos de humanoides próximos.', damageEffect: 'Possessão', attackSave: 'Res. Car', classes: ['Mago'], icon: 'undead-claws.png' },
  { id: 'mass-suggestion', name: 'Sugestão em Massa', level: 6, school: 'Encantamento', castingTime: '1 ação', duration: '24 horas', range: '18 m', components: 'V, M', description: 'Você sugere um curso de ação para até 12 criaturas. Se falharem na salvaguarda de Sabedoria, elas seguem a sugestão pela duração.', damageEffect: 'Controle em Massa', attackSave: 'Res. Sab', classes: ['Bardo', 'Bruxo', 'Mago', 'Feiticeiro'], icon: 'pink-fog.png' },
  { id: 'transport-via-plants', name: 'Teletransporte por Árvores', level: 6, school: 'Conjuração', castingTime: '1 ação', duration: '1 rodada', range: '3 m', components: 'V, S', description: 'Você abre um portal entre duas plantas no mesmo plano, permitindo que criaturas viajem instantaneamente entre elas.', damageEffect: 'Mobilidade', classes: ['Druida'], icon: 'nature-spirit.png' },
  { id: 'true-seeing', name: 'Visão da Verdade', level: 6, school: 'Adivinhação', castingTime: '1 ação', duration: '1 hora', range: 'Toque', components: 'V, S, M', description: 'O alvo ganha visão verdadeira até 36m, percebendo coisas invisíveis, ilusões e portas secretas.', damageEffect: 'Utilidade', classes: ['Bardo', 'Clérigo', 'Druida', 'Mago', 'Feiticeiro', 'Bruxo'], icon: 'all-seeing-eye.png' },
  { id: 'chain-lightning', name: 'Corrente de Relâmpagos', level: 6, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '45 m', components: 'V, S, M', description: 'Você cria um relâmpago que atinge um alvo e salta para até 3 outros alvos a 9m do primeiro. Cada alvo sofre 10d8 de dano elétrico.', damageEffect: '10d8 Elétrico', attackSave: 'Res. Des', classes: ['Mago', 'Feiticeiro'], icon: 'lightning-bolt.png' },
  { id: 'create-undead', name: 'Criar Mortos-Vivos', level: 6, school: 'Necromancia', castingTime: '1 min', duration: 'Instantânea', range: '3 m', components: 'V, S, M', description: 'Você transforma até 3 cadáveres em carniçais sob seu controle por 24 horas.', damageEffect: 'Invocação', classes: ['Clérigo', 'Bruxo', 'Mago'], icon: 'undead-skull.png' },
  { id: 'ottos-irresistible-dance', name: 'Dança Irresistível de Otto', level: 6, school: 'Encantamento', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: '9 m', components: 'V', description: 'O alvo começa a dançar incontrolavelmente, ficando incapacitado e sofrendo desvantagem na CA e salvaguardas de Destreza.', damageEffect: 'Controle', concentration: true, classes: ['Bardo', 'Mago'], icon: 'pink-fog.png' },
  { id: 'drawmijs-instant-summons', name: 'Invocação Instantânea de Drawmij', level: 6, school: 'Conjuração', castingTime: '1 min', duration: 'Até ser dissipada', range: 'Toque', components: 'V, S, M', description: 'Você marca um objeto de até 5kg. Pode esmagar a safira usada no ritual para teleportar o item para sua mão.', damageEffect: 'Utilidade', ritual: true, classes: ['Mago'], icon: 'cosmic-vortex.png' },
  { id: 'word-of-recall', name: 'Palavra de Recordação', level: 6, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: '1,5 m', components: 'V', description: 'Você e até 5 criaturas se teleportam instantaneamente para um santuário previamente designado.', damageEffect: 'Teletransporte', classes: ['Clérigo'], icon: 'divine-presence.png' },
  { id: 'guards-and-wards', name: 'Proteger Fortaleza', level: 6, school: 'Abjuração', castingTime: '10 min', duration: '24 horas', range: 'Toque', components: 'V, S, M', description: 'Cria uma série de defesas em uma área: névoa, portas trancadas, teias e efeitos adicionais.', damageEffect: 'Defesa de Área', classes: ['Mago', 'Bardo', 'Clérigo'], icon: 'arcane-lock.png' },
  { id: 'conjure-fey', name: 'Conjurar Fada', level: 6, school: 'Conjuração', castingTime: '1 min', duration: 'Concentração, até 1 hora', range: '27 m', components: 'V, S', description: 'Você invoca uma criatura feérica de ND 6 ou menor que aparece em um espaço desocupado.', damageEffect: 'Invocação', concentration: true, classes: ['Druida', 'Bruxo'], icon: 'nature-spirit.png' },

  // ── Nível 7 ─────────────────────────────────────────────────────────────────
  { id: 'delayed-blast-fireball', name: 'Bola de Fogo Controlável', level: 7, school: 'Evocação', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: '45 m', components: 'V, S, M', description: 'Uma conta de fogo que explode causando 12d6 de dano. O dano aumenta se você mantiver a concentração.', damageEffect: '12d6 Fogo + 1d6/turno', attackSave: 'Res. Des', concentration: true, classes: ['Feiticeiro', 'Mago'], icon: 'wild-fire.png' },
  { id: 'conjure-celestial', name: 'Conjurar Celestial', level: 7, school: 'Conjuração', castingTime: '1 min', duration: 'Concentração, até 1 hora', range: '27 m', components: 'V, S', description: 'Invoca um celestial de ND 4 ou menor.', damageEffect: 'Invocação', concentration: true, classes: ['Clérigo'], icon: 'divine-presence.png' },
  { id: 'finger-of-death', name: 'Dedo da Morte', level: 7, school: 'Necromancia', castingTime: '1 ação', duration: 'Instantânea', range: '18 m', components: 'V, S', description: 'Causa 7d8 + 30 de dano necrótico. Se matar o alvo, ele se torna um zumbi.', damageEffect: '7d8+30 Necrótico', attackSave: 'Res. Con', classes: ['Feiticeiro', 'Bruxo', 'Mago'], icon: 'undead-claws.png' },
  { id: 'etherealness', name: 'Forma Etérea', level: 7, school: 'Transmutação', castingTime: '1 ação', duration: 'Até 8 horas', range: 'Pessoal', components: 'V, S', description: 'Você entra no Plano Etéreo.', damageEffect: 'Utilidade', classes: ['Bardo', 'Clérigo', 'Feiticeiro', 'Bruxo', 'Mago'], icon: 'pink-fog.png' },
  { id: 'resurrection', name: 'Ressurreição', level: 7, school: 'Necromancia', castingTime: '1 hora', duration: 'Instantânea', range: 'Toque', components: 'V, S, M', description: 'Traz uma criatura morta de volta à vida.', damageEffect: 'Ressurreição', classes: ['Clérigo', 'Bardo'], icon: 'holy-cross.png' },
  { id: 'teleport', name: 'Teletransporte', level: 7, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: '3 m', components: 'V', description: 'Teletransporta você e até 8 criaturas para outro local.', damageEffect: 'Mobilidade', classes: ['Bardo', 'Feiticeiro', 'Mago'], icon: 'cosmic-vortex.png' },
  { id: 'fire-storm', name: 'Tempestade de Fogo', level: 7, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: '45 m', components: 'V, S', description: 'Uma tempestade de fogo causa 7d10 de dano.', damageEffect: '7d10 Fogo', attackSave: 'Res. Des', classes: ['Clérigo', 'Druida', 'Feiticeiro'], icon: 'wild-fire.png' },
  { id: 'plane-shift', name: 'Viagem Planar', level: 7, school: 'Conjuração', castingTime: '1 ação', duration: 'Instantânea', range: 'Toque', components: 'V, S, M', description: 'Transporta você para outro plano.', damageEffect: 'Mobilidade', classes: ['Clérigo', 'Druida', 'Feiticeiro', 'Bruxo', 'Mago'], icon: 'cosmic-vortex.png' },
  { id: 'forcecage', name: 'Prisão de Energia', level: 7, school: 'Evocação', castingTime: '1 ação', duration: '1 hora', range: '30 m', components: 'V, S, M', description: 'Uma prisão invisível de energia.', damageEffect: 'Utilidade', classes: ['Bardo', 'Mago'], icon: 'arcane-lock.png' },
  { id: 'reverse-gravity', name: 'Inverter a Gravidade', level: 7, school: 'Transmutação', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: '30 m', components: 'V, S, M', description: 'Inverte a gravidade em uma área.', damageEffect: 'Utilidade', attackSave: 'Res. Des', concentration: true, classes: ['Druida', 'Feiticeiro', 'Mago'], icon: 'heavy-weight.png' },
  { id: 'regenerate', name: 'Regeneração', level: 7, school: 'Transmutação', castingTime: '1 min', duration: '1 hora', range: 'Toque', components: 'V, S, M', description: 'Cura 4d8 + 15 e regenera 1 PV por turno.', damageEffect: '4d8+15 + Reg.', classes: ['Bardo', 'Clérigo', 'Druida'], icon: 'divine-heal.png' },
  { id: 'simulacrum', name: 'Simulacro', level: 7, school: 'Ilusão', castingTime: '12 horas', duration: 'Até ser dissipada', range: 'Toque', components: 'V, S, M', description: 'Cria uma duplicata de uma criatura.', damageEffect: 'Utilidade', classes: ['Mago'], icon: 'mirror-image.png' },
  { id: 'symbol', name: 'Símbolo', level: 7, school: 'Abjuração', castingTime: '1 min', duration: 'Até ser ativada', range: 'Toque', components: 'V, S, M', description: 'Um glifo mágico com efeitos variados.', damageEffect: 'Efeitos Variados', attackSave: 'Res. Sab', classes: ['Bardo', 'Clérigo', 'Mago'], icon: 'arcane-lock.png' },
  { id: 'mordenkainens-magnificent-mansion', name: 'Mansão Magnífica de Mordenkainen', level: 7, school: 'Conjuração', castingTime: '1 min', duration: '24 horas', range: '90 m', components: 'V, S, M', description: 'Cria uma mansão luxuosa extradimensional.', damageEffect: 'Utilidade', classes: ['Bardo', 'Mago'], icon: 'protection-field.png' },
  { id: 'mirage-arcane', name: 'Miragem', level: 7, school: 'Ilusão', castingTime: '10 min', duration: '10 dias', range: 'Visão', components: 'V, S', description: 'Altera o terreno de uma grande área.', damageEffect: 'Ilusão', classes: ['Bardo', 'Druida', 'Mago'], icon: 'mirror-image.png' },
  { id: 'prismatic-spray', name: 'Rajada Prismática', level: 7, school: 'Evocação', castingTime: '1 ação', duration: 'Instantânea', range: 'Pessoal (cone de 18m)', components: 'V, S', description: 'Raios multicoloridos causam danos e efeitos aleatórios.', damageEffect: '10d6 Variado', attackSave: 'Res. Des', classes: ['Feiticeiro', 'Mago'], icon: 'sun-flare.png' },
  { id: 'project-image', name: 'Projetar Imagem', level: 7, school: 'Ilusão', castingTime: '1 ação', duration: 'Concentração, até 1 dia', range: '750 km', components: 'V, S, M', description: 'Projeta uma imagem sua em um local conhecido.', damageEffect: 'Utilidade', concentration: true, classes: ['Bardo', 'Mago'], icon: 'mirror-image.png' },
  { id: 'sequester', name: 'Isolamento', level: 7, school: 'Transmutação', castingTime: '1 ação', duration: 'Até ser dissipada', range: 'Toque', components: 'V, S, M', description: 'Esconde uma criatura ou objeto contra detecção.', damageEffect: 'Utilidade', classes: ['Mago'], icon: 'arcane-lock.png' },
  { id: 'divine-word', name: 'Palavra Divina', level: 7, school: 'Evocação', castingTime: '1 ação bônus', duration: 'Instantânea', range: '9 m', components: 'V', description: 'Afeta criaturas com base nos PV.', damageEffect: 'Controle/Morte', attackSave: 'Res. Car', classes: ['Clérigo'], icon: 'divine-presence.png' },
  { id: 'mordenkainens-sword', name: 'Espada de Mordenkainen', level: 7, school: 'Evocação', castingTime: '1 ação', duration: 'Concentração, até 1 min', range: '18 m', components: 'V, S, M', description: 'Cria uma espada flutuante que ataca.', damageEffect: '3d10 Força', attackSave: 'Ataque Magia', concentration: true, classes: ['Bardo', 'Mago'], icon: 'electric-sword.png' },
]

export const ALL_SPELLS = [...SPELLS, ...SPELLS_2014]
export { SPELLS, SPELLS_2014 }
export default SPELLS

export function getSpellsForClass(className: string, ruleset: '2014' | '2024' = '2024'): Spell[] {
  // 1. Prioritize 2014 list if ruleset is 2014
  if (ruleset === '2014') {
    const legacy = SPELLS_2014.filter(s => s.classes.includes(className))
    
    // Lista de IDs da versão 2024 que são substituídos pelas versões 2014 acima
    const replacedIds = [
      // Truques
      'acid-splash', 'blade-ward', 'chill-touch', 'dancing-lights', 
      'druidcraft', 'eldritch-blast', 'fire-bolt', 'friends', 
      'guidance', 'light', 'mage-hand', 'mending', 'message', 
      'minor-illusion', 'poison-spray', 'prestidigitation', 
      'ray-of-frost', 'resistance', 'sacred-flame', 'shillelagh', 
      'shocking-grasp', 'spare-dying', 'thaumaturgy', 'true-strike',
      // Nível 1
      'alarm', 'animal-friendship', 'bane', 'bless', 'burning-hands',
      'charm-person', 'chromatic-orb', 'color-spray', 'command',
      'comprehend-languages', 'create-destroy-water', 'cure-wounds',
      'detect-evil-good', 'detect-magic', 'disguise-self', 'dissonant-whispers',
      'divine-favor', 'entangle', 'expeditious-retreat', 'false-life',
      'feather-fall', 'find-familiar', 'fog-cloud', 'grease', 'guiding-bolt',
      'hail-of-thorns', 'healing-word', 'heroism', 'tashas-hideous-laughter',
      'hunters-mark', 'identify', 'illusory-script', 'inflict-wounds',
      'jump', 'longstrider', 'mage-armor', 'magic-missile', 'protection-evil',
      'purify-food-drink', 'ray-of-sickness', 'sanctuary', 'shield',
      'shield-of-faith', 'silent-image', 'sleep', 'speak-with-animals',
      'thunderwave', 'unseen-servant', 'witch-bolt'
    ]
    
    const others = SPELLS.filter(s => 
      s.classes.includes(className) && 
      !replacedIds.includes(s.id)
    )
    
    return [...legacy, ...others]
  }
  
  // 2024 ruleset: filter out 2014-only versions
  return SPELLS.filter(s => s.classes.includes(className))
}

export const SPELLCASTING_CLASSES = [
  'Bardo', 'Clérigo', 'Druida', 'Feiticeiro', 'Bruxo', 'Mago',
  'Paladino', 'Patrulheiro', 'Artífice'
]

export function getSpellSlots(className: string, level: number, ruleset: '2014' | '2024', modifiers?: any) {
  const table = ruleset === '2014' ? SPELL_SLOTS_2014 : SPELL_PROGRESSION
  const classData = table[className]
  if (!classData) return null
  
  // If level is beyond table, return last level
  const levels = Object.keys(classData).map(Number).sort((a, b) => a - b)
  const maxLevel = levels[levels.length - 1]
  const minLevel = levels[0]
  
  const rawData = level > maxLevel ? classData[maxLevel] : (level < minLevel ? classData[minLevel] : (classData[level] || classData[1]));
  
  if (ruleset === '2014' && typeof rawData.prepared === 'string' && modifiers) {
    const formula = rawData.prepared;
    const lvl = level;
    let mod = 0;
    
    if (formula.includes('Wis')) mod = modifiers.wisdom || 0;
    if (formula.includes('Int')) mod = modifiers.intelligence || 0;
    if (formula.includes('Cha')) mod = modifiers.charisma || 0;
    
    let base = 0;
    if (formula.includes('Lvl/2')) {
      base = Math.floor(lvl / 2);
    } else if (formula.includes('Lvl')) {
      base = lvl;
    }
    
    return {
      ...rawData,
      prepared: Math.max(1, base + mod)
    };
  }
  
  return rawData;
}

export interface SpellSlots {
  cantrips: number;
  prepared?: number; // Number of spells that can be prepared
  known?: number;    // Number of spells known (for Bard, Sorcerer, etc.)
  slots: number[];
  slot_level?: number; // Only for Warlocks
}

export type ClassProgression = Record<number, SpellSlots>;

export const SPELL_PROGRESSION: Record<string, ClassProgression> = {
  'Bardo': {
    1: { cantrips: 2, prepared: 4, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
    2: { cantrips: 2, prepared: 5, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
    3: { cantrips: 2, prepared: 6, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
    4: { cantrips: 3, prepared: 7, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
    5: { cantrips: 3, prepared: 9, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
    6: { cantrips: 3, prepared: 10, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
    7: { cantrips: 3, prepared: 11, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
    8: { cantrips: 3, prepared: 12, slots: [4, 3, 3, 2, 0, 0, 0, 0, 0] },
    9: { cantrips: 3, prepared: 14, slots: [4, 3, 3, 3, 1, 0, 0, 0, 0] },
    10: { cantrips: 4, prepared: 15, slots: [4, 3, 3, 3, 2, 0, 0, 0, 0] },
    11: { cantrips: 4, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    12: { cantrips: 4, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    13: { cantrips: 4, prepared: 17, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    14: { cantrips: 4, prepared: 17, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    15: { cantrips: 4, prepared: 18, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    16: { cantrips: 4, prepared: 18, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    17: { cantrips: 4, prepared: 19, slots: [4, 3, 3, 3, 2, 1, 1, 1, 1] },
    18: { cantrips: 4, prepared: 20, slots: [4, 3, 3, 3, 3, 1, 1, 1, 1] },
    19: { cantrips: 4, prepared: 21, slots: [4, 3, 3, 3, 3, 2, 1, 1, 1] },
    20: { cantrips: 4, prepared: 22, slots: [4, 3, 3, 3, 3, 2, 2, 1, 1] },
  },
  'Clérigo': {
    1: { cantrips: 3, prepared: 4, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
    2: { cantrips: 3, prepared: 5, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
    3: { cantrips: 3, prepared: 6, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
    4: { cantrips: 4, prepared: 7, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
    5: { cantrips: 4, prepared: 9, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
    6: { cantrips: 4, prepared: 10, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
    7: { cantrips: 4, prepared: 11, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
    8: { cantrips: 4, prepared: 12, slots: [4, 3, 3, 2, 0, 0, 0, 0, 0] },
    9: { cantrips: 4, prepared: 14, slots: [4, 3, 3, 3, 1, 0, 0, 0, 0] },
    10: { cantrips: 5, prepared: 15, slots: [4, 3, 3, 3, 2, 0, 0, 0, 0] },
    11: { cantrips: 5, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    12: { cantrips: 5, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    13: { cantrips: 5, prepared: 17, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    14: { cantrips: 5, prepared: 17, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    15: { cantrips: 5, prepared: 18, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    16: { cantrips: 5, prepared: 18, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    17: { cantrips: 5, prepared: 19, slots: [4, 3, 3, 3, 2, 1, 1, 1, 1] },
    18: { cantrips: 5, prepared: 20, slots: [4, 3, 3, 3, 3, 1, 1, 1, 1] },
    19: { cantrips: 5, prepared: 21, slots: [4, 3, 3, 3, 3, 2, 1, 1, 1] },
    20: { cantrips: 5, prepared: 22, slots: [4, 3, 3, 3, 3, 2, 2, 1, 1] },
  },
  'Druida': {
    1: { cantrips: 2, prepared: 4, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
    2: { cantrips: 2, prepared: 5, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
    3: { cantrips: 2, prepared: 6, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
    4: { cantrips: 3, prepared: 7, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
    5: { cantrips: 3, prepared: 9, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
    6: { cantrips: 3, prepared: 10, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
    7: { cantrips: 3, prepared: 11, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
    8: { cantrips: 3, prepared: 12, slots: [4, 3, 3, 2, 0, 0, 0, 0, 0] },
    9: { cantrips: 3, prepared: 14, slots: [4, 3, 3, 3, 1, 0, 0, 0, 0] },
    10: { cantrips: 4, prepared: 15, slots: [4, 3, 3, 3, 2, 0, 0, 0, 0] },
    11: { cantrips: 4, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    12: { cantrips: 4, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    13: { cantrips: 4, prepared: 17, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    14: { cantrips: 4, prepared: 17, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    15: { cantrips: 4, prepared: 18, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    16: { cantrips: 4, prepared: 18, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    17: { cantrips: 4, prepared: 19, slots: [4, 3, 3, 3, 2, 1, 1, 1, 1] },
    18: { cantrips: 4, prepared: 20, slots: [4, 3, 3, 3, 3, 1, 1, 1, 1] },
    19: { cantrips: 4, prepared: 21, slots: [4, 3, 3, 3, 3, 2, 1, 1, 1] },
    20: { cantrips: 4, prepared: 22, slots: [4, 3, 3, 3, 3, 2, 2, 1, 1] },
  },
  'Feiticeiro': {
    1: { cantrips: 4, prepared: 2, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
    2: { cantrips: 4, prepared: 4, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
    3: { cantrips: 4, prepared: 6, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
    4: { cantrips: 5, prepared: 7, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
    5: { cantrips: 5, prepared: 9, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
    6: { cantrips: 5, prepared: 10, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
    7: { cantrips: 5, prepared: 11, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
    8: { cantrips: 5, prepared: 12, slots: [4, 3, 3, 2, 0, 0, 0, 0, 0] },
    9: { cantrips: 5, prepared: 14, slots: [4, 3, 3, 3, 1, 0, 0, 0, 0] },
    10: { cantrips: 6, prepared: 15, slots: [4, 3, 3, 3, 2, 0, 0, 0, 0] },
    11: { cantrips: 6, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    12: { cantrips: 6, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    13: { cantrips: 6, prepared: 17, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    14: { cantrips: 6, prepared: 17, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    15: { cantrips: 6, prepared: 18, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    16: { cantrips: 6, prepared: 18, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    17: { cantrips: 6, prepared: 19, slots: [4, 3, 3, 3, 2, 1, 1, 1, 1] },
    18: { cantrips: 6, prepared: 20, slots: [4, 3, 3, 3, 3, 1, 1, 1, 1] },
    19: { cantrips: 6, prepared: 21, slots: [4, 3, 3, 3, 3, 2, 1, 1, 1] },
    20: { cantrips: 6, prepared: 22, slots: [4, 3, 3, 3, 3, 2, 2, 1, 1] },
  },
  'Bruxo': {
    1: { cantrips: 2, prepared: 2, slots: [1], slot_level: 1 },
    2: { cantrips: 2, prepared: 3, slots: [2], slot_level: 1 },
    3: { cantrips: 2, prepared: 4, slots: [2], slot_level: 2 },
    4: { cantrips: 3, prepared: 5, slots: [2], slot_level: 2 },
    5: { cantrips: 3, prepared: 6, slots: [2], slot_level: 3 },
    6: { cantrips: 3, prepared: 7, slots: [2], slot_level: 3 },
    7: { cantrips: 3, prepared: 8, slots: [2], slot_level: 4 },
    8: { cantrips: 3, prepared: 9, slots: [2], slot_level: 4 },
    9: { cantrips: 3, prepared: 10, slots: [2], slot_level: 5 },
    10: { cantrips: 4, prepared: 10, slots: [2], slot_level: 5 },
    11: { cantrips: 4, prepared: 11, slots: [3], slot_level: 5 },
    12: { cantrips: 4, prepared: 11, slots: [3], slot_level: 5 },
    13: { cantrips: 4, prepared: 12, slots: [3], slot_level: 5 },
    14: { cantrips: 4, prepared: 12, slots: [3], slot_level: 5 },
    15: { cantrips: 4, prepared: 13, slots: [3], slot_level: 5 },
    16: { cantrips: 4, prepared: 13, slots: [3], slot_level: 5 },
    17: { cantrips: 4, prepared: 14, slots: [4], slot_level: 5 },
    18: { cantrips: 4, prepared: 14, slots: [4], slot_level: 5 },
    19: { cantrips: 4, prepared: 15, slots: [4], slot_level: 5 },
    20: { cantrips: 4, prepared: 15, slots: [4], slot_level: 5 },
  },
  'Mago': {
    1: { cantrips: 3, prepared: 4, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
    2: { cantrips: 3, prepared: 5, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
    3: { cantrips: 3, prepared: 6, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
    4: { cantrips: 4, prepared: 7, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
    5: { cantrips: 4, prepared: 9, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
    6: { cantrips: 4, prepared: 10, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
    7: { cantrips: 4, prepared: 11, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
    8: { cantrips: 4, prepared: 12, slots: [4, 3, 3, 2, 0, 0, 0, 0, 0] },
    9: { cantrips: 4, prepared: 14, slots: [4, 3, 3, 3, 1, 0, 0, 0, 0] },
    10: { cantrips: 5, prepared: 15, slots: [4, 3, 3, 3, 2, 0, 0, 0, 0] },
    11: { cantrips: 5, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    12: { cantrips: 5, prepared: 16, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
    13: { cantrips: 5, prepared: 17, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    14: { cantrips: 5, prepared: 18, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
    15: { cantrips: 5, prepared: 19, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    16: { cantrips: 5, prepared: 21, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
    17: { cantrips: 5, prepared: 22, slots: [4, 3, 3, 3, 2, 1, 1, 1, 1] },
    18: { cantrips: 5, prepared: 23, slots: [4, 3, 3, 3, 3, 1, 1, 1, 1] },
    19: { cantrips: 5, prepared: 24, slots: [4, 3, 3, 3, 3, 2, 1, 1, 1] },
    20: { cantrips: 5, prepared: 25, slots: [4, 3, 3, 3, 3, 2, 2, 1, 1] },
  },
  'Paladino': {
    1: { cantrips: 0, prepared: 2, slots: [2, 0, 0, 0, 0] },
    2: { cantrips: 0, prepared: 3, slots: [2, 0, 0, 0, 0] },
    3: { cantrips: 0, prepared: 4, slots: [3, 0, 0, 0, 0] },
    4: { cantrips: 0, prepared: 5, slots: [3, 0, 0, 0, 0] },
    5: { cantrips: 0, prepared: 6, slots: [4, 2, 0, 0, 0] },
    6: { cantrips: 0, prepared: 6, slots: [4, 2, 0, 0, 0] },
    7: { cantrips: 0, prepared: 7, slots: [4, 3, 0, 0, 0] },
    8: { cantrips: 0, prepared: 7, slots: [4, 3, 0, 0, 0] },
    9: { cantrips: 0, prepared: 8, slots: [4, 3, 2, 0, 0] },
    10: { cantrips: 0, prepared: 8, slots: [4, 3, 2, 0, 0] },
    11: { cantrips: 0, prepared: 10, slots: [4, 3, 3, 0, 0] },
    12: { cantrips: 0, prepared: 10, slots: [4, 3, 3, 0, 0] },
    13: { cantrips: 0, prepared: 11, slots: [4, 3, 3, 1, 0] },
    14: { cantrips: 0, prepared: 11, slots: [4, 3, 3, 1, 0] },
    15: { cantrips: 0, prepared: 12, slots: [4, 3, 3, 2, 0] },
    16: { cantrips: 0, prepared: 12, slots: [4, 3, 3, 2, 0] },
    17: { cantrips: 0, prepared: 14, slots: [4, 3, 3, 3, 1] },
    18: { cantrips: 0, prepared: 14, slots: [4, 3, 3, 3, 1] },
    19: { cantrips: 0, prepared: 15, slots: [4, 3, 3, 3, 2] },
    20: { cantrips: 0, prepared: 15, slots: [4, 3, 3, 3, 2] },
  },
  'Patrulheiro': {
    1: { cantrips: 0, prepared: 2, slots: [2, 0, 0, 0, 0] },
    2: { cantrips: 0, prepared: 3, slots: [2, 0, 0, 0, 0] },
    3: { cantrips: 0, prepared: 4, slots: [3, 0, 0, 0, 0] },
    4: { cantrips: 0, prepared: 5, slots: [3, 0, 0, 0, 0] },
    5: { cantrips: 0, prepared: 6, slots: [4, 2, 0, 0, 0] },
    6: { cantrips: 0, prepared: 6, slots: [4, 2, 0, 0, 0] },
    7: { cantrips: 0, prepared: 7, slots: [4, 3, 0, 0, 0] },
    8: { cantrips: 0, prepared: 7, slots: [4, 3, 0, 0, 0] },
    9: { cantrips: 0, prepared: 8, slots: [4, 3, 2, 0, 0] },
    10: { cantrips: 0, prepared: 8, slots: [4, 3, 2, 0, 0] },
    11: { cantrips: 0, prepared: 10, slots: [4, 3, 3, 0, 0] },
    12: { cantrips: 0, prepared: 10, slots: [4, 3, 3, 0, 0] },
    13: { cantrips: 0, prepared: 11, slots: [4, 3, 3, 1, 0] },
    14: { cantrips: 0, prepared: 11, slots: [4, 3, 3, 1, 0] },
    15: { cantrips: 0, prepared: 12, slots: [4, 3, 3, 2, 0] },
    16: { cantrips: 0, prepared: 12, slots: [4, 3, 3, 2, 0] },
    17: { cantrips: 0, prepared: 14, slots: [4, 3, 3, 3, 1] },
    18: { cantrips: 0, prepared: 14, slots: [4, 3, 3, 3, 1] },
    19: { cantrips: 0, prepared: 15, slots: [4, 3, 3, 3, 2] },
    20: { cantrips: 0, prepared: 15, slots: [4, 3, 3, 3, 2] },
  },
  'Artífice': {
    1: { cantrips: 2, prepared: 2, slots: [2, 0, 0, 0, 0] },
    2: { cantrips: 2, prepared: 3, slots: [2, 0, 0, 0, 0] },
    3: { cantrips: 2, prepared: 4, slots: [3, 0, 0, 0, 0] },
    4: { cantrips: 2, prepared: 5, slots: [3, 0, 0, 0, 0] },
    5: { cantrips: 2, prepared: 6, slots: [4, 2, 0, 0, 0] },
    6: { cantrips: 2, prepared: 7, slots: [4, 3, 0, 0, 0] },
    7: { cantrips: 2, prepared: 7, slots: [4, 3, 0, 0, 0] },
    8: { cantrips: 2, prepared: 9, slots: [4, 3, 2, 0, 0] },
    9: { cantrips: 2, prepared: 9, slots: [4, 3, 2, 0, 0] },
    10: { cantrips: 3, prepared: 10, slots: [4, 3, 3, 0, 0] },
    11: { cantrips: 3, prepared: 10, slots: [4, 3, 3, 0, 0] },
    12: { cantrips: 3, prepared: 11, slots: [4, 3, 3, 1, 0] },
    13: { cantrips: 3, prepared: 11, slots: [4, 3, 3, 1, 0] },
    14: { cantrips: 4, prepared: 12, slots: [4, 3, 3, 2, 0] },
    15: { cantrips: 4, prepared: 12, slots: [4, 3, 3, 2, 0] },
    16: { cantrips: 4, prepared: 14, slots: [4, 3, 3, 3, 1] },
    17: { cantrips: 4, prepared: 14, slots: [4, 3, 3, 3, 1] },
    18: { cantrips: 4, prepared: 15, slots: [4, 3, 3, 3, 2] },
    19: { cantrips: 4, prepared: 15, slots: [4, 3, 3, 3, 2] },
    20: { cantrips: 4, prepared: 15, slots: [4, 3, 3, 3, 2] },
  },
};
