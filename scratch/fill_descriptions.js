import fs from 'fs';
import path from 'path';

// Let's write a script that populates translated descriptions of basic table items
// directly in our local JSONs or merges them.
// I can write a static catalog mapping of English names to their official Portuguese translation and description,
// and merge them. Since I am an AI, I can directly write a script that fills in the translations
// of these items!

const TABLE_A_TRANSLATIONS = {
  "Cast-Off Armor": {
    pt: "Armadura Descartável",
    desc: "Você pode vestir ou remover esta armadura como uma ação, em vez do tempo normal exigido."
  },
  "Clockwork Amulet": {
    pt: "Amuleto de Engrenagens",
    desc: "Este amuleto de cobre abriga pequenas engrenagens conectadas. Quando você faz uma jogada de ataque, você pode escolher abdicar de rolar o d20 e usar o valor 10 no lugar. Uma vez usado, este amuleto não pode ser usado novamente até o próximo amanhecer."
  },
  "Dread Helm": {
    pt: "Elmo do Pavor",
    desc: "Este elmo de metal assustador faz com que seus olhos brilhem na cor vermelha enquanto você o estiver usando."
  },
  "Ear Horn of Hearing": {
    pt: "Corneta Auditiva",
    desc: "Enquanto segura esta corneta contra o ouvido, você tem vantagem em testes de Sabedoria (Percepção) relacionados à audição."
  },
  "Ersatz Eye": {
    pt: "Olho Substituto",
    desc: "Este olho artificial substitui um olho perdido. Ele funciona exatamente como um olho normal, mas requer sintonia."
  },
  "Hat of Vermin": {
    pt: "Chapéu de Pragas",
    desc: "Este chapéu possui 3 cargas. Você pode usar uma ação e gastar 1 carga para puxar do chapéu um morcego, rã ou rato. A criatura é amigável a você, mas age por instinto. O chapéu recupera todas as cargas diariamente ao amanhecer."
  },
  "Horn of Silent Alarm": {
    pt: "Corneta do Alarme Silencioso",
    desc: "Esta corneta pode ser soprada para emitir um aviso que apenas criaturas escolhidas por você num raio de 180 metros conseguem ouvir mentalmente."
  },
  "Orb of Direction": {
    pt: "Orbe de Direção",
    desc: "Enquanto segura este orbe, você pode usar uma ação para descobrir para qual direção fica o Norte."
  },
  "Orb of Time": {
    pt: "Orbe do Tempo",
    desc: "Enquanto segura este orbe, você pode usar uma ação para descobrir se é manhã, tarde, noite ou madrugada."
  },
  "Pipe of Smoke Monsters": {
    pt: "Cachimbo de Monstros de Fumaça",
    desc: "Enquanto fuma este cachimbo, você pode fazer com que a fumaça exalada tome brevemente a forma de uma criatura monstruosa de sua escolha antes de se dissipar."
  },
  "Pole of Angling": {
    pt: "Vara de Pesca Retrátil",
    desc: "Esta vara de pesca de 3 metros pode ser encolhida até medir apenas 30 centímetros como uma ação."
  },
  "Pole of Collapsing": {
    pt: "Bastão de Colapso",
    desc: "Este bastão de 3 metros pode ser encolhido até medir apenas 30 centímetros como uma ação."
  },
  "Ruby of the War Mage": {
    pt: "Rubi do Mago de Guerra",
    desc: "Este rubi de 2,5 cm de diâmetro requer sintonia por um conjurador. Ele pode ser fixado a uma arma simples ou marcial, permitindo que você use a arma como um foco de conjuração para suas magias."
  },
  "Smoldering Armor": {
    pt: "Armadura Fumegante",
    desc: "Uma fumaça tênue e sem cheiro exala constantemente desta armadura enquanto você a estiver usando."
  },
  "Staff of Adornment": {
    pt: "Cajado de Adorno",
    desc: "Este cajado tem 3 pequenas pedras flutuando ao redor de sua ponta. Você pode usar uma ação para fazer com que pequenos objetos não-mágicos flutuem ao redor dele."
  },
  "Staff of Birdcalls": {
    pt: "Cajado de Cantos de Pássaros",
    desc: "Este cajado tem 10 cargas. Você pode usar uma ação para gastar 1 carga e imitar o canto de um pássaro de sua escolha de forma perfeita."
  },
  "Staff of Flowers": {
    pt: "Cajado das Flores",
    desc: "Este cajado tem 10 cargas. Você pode usar uma ação para gastar 1 carga e fazer com que uma flor fresca desabroche em um pedaço de terra ou vaso num raio de 1,5 metros."
  },
  "Talking Doll": {
    pt: "Boneca Falante",
    desc: "Esta boneca de pano pode ser programada para falar até 6 frases curtas quando certas condições simples forem atendidas."
  },
  "Veteran's Cane": {
    pt: "Bengala do Veterano",
    desc: "Como uma ação, você pode transformar esta bengala de madeira comum em uma espada longa real. A transformação é permanente."
  },
  "Walloping Ammunition": {
    pt: "Munição de Impacto",
    desc: "Esta munição é encantada. Quando atinge uma criatura, a criatura deve passar num teste de resistência de Força CD 10 ou cairá caída no chão (derrubada)."
  },
  "Wand of Conducting": {
    pt: "Varinha de Regência",
    desc: "Esta varinha permite que você conduza uma orquestra invisível que toca uma música suave num raio de 9 metros."
  },
  "Wand of Scowls": {
    pt: "Varinha de Scowls",
    desc: "Esta varinha tem 3 cargas. Você pode usar uma ação para gastar 1 carga e fazer com que a expressão de uma criatura se torne carrancuda ou brava por 1 minuto."
  },
  "Wand of Smiles": {
    pt: "Varinha de Sorrisos",
    desc: "Esta varinha tem 3 cargas. Você pode usar uma ação para gastar 1 carga e fazer com que uma criatura sorria por 1 minuto."
  },
  "Hat of Wizardry": {
    pt: "Chapéu de Arcana",
    desc: "Este chapéu pontudo requer sintonia por um bruxo, mago ou feiticeiro. Ele serve como foco de conjuração e permite tentar conjurar um truque da sua lista de classe que você não conheça fazendo um teste de Inteligência (Arcana) CD 10."
  },
  "Enduring Spellbook": {
    pt: "Grimório Durável",
    desc: "Este grimório e as páginas de pergaminho contidas nele não podem ser danificados por fogo ou água, nem se deterioram pela passagem do tempo."
  },
  "Charlatan's Die": {
    pt: "Dado do Charlatão",
    desc: "Este dado de seis lados comum pode ser controlado mentalmente para cair sempre no número que você escolher."
  },
  "Instrument of Illusions": {
    pt: "Instrumento de Ilusões",
    desc: "Enquanto toca este instrumento musical, você pode criar efeitos visuales ilusórios simples num raio de 1,5 metros ao seu redor."
  },
  "Dark Shard Amulet": {
    pt: "Amuleto do Estilhaço Sombrio",
    desc: "Requer sintonia por um Bruxo (Warlock). Este amuleto permite tentar conjurar um truque de bruxo que você não conheça fazendo um teste de Inteligência (Arcana) CD 10."
  },
  "Armor of Gleaming": {
    pt: "Armadura do Brilho",
    desc: "Esta armadura nunca fica suja ou enferrujada. Ela brilha levemente sob a luz comum."
  },
  "Clothes of Mending": {
    pt: "Roupas de Remendo",
    desc: "Este conjunto de roupas se remenda magicamente de qualquer rasgo ou desgaste após 1 minuto."
  },
  "Potion of Climbing": {
    pt: "Poção de Escalada",
    desc: "Por 1 hora após beber esta poção, você ganha velocidade de escalada igual à sua velocidade de caminhada e tem vantagem em testes de Força (Atletismo) para escalar."
  },
  "Potion of Healing": {
    pt: "Poção de Cura",
    desc: "Você recupera 2d4 + 2 pontos de vida ao beber esta poção."
  },
  "Spell Scroll, Cantrip": {
    pt: "Pergaminho de Truque",
    desc: "Este pergaminho contém um truque mágico escrito. Ler o pergaminho conjura a magia sem custo de componentes materiais."
  },
  "Spell Scroll, 1st Level": {
    pt: "Pergaminho de 1º Nível",
    desc: "Este pergaminho contém uma magia de 1º nível escrita. Ler o pergaminho conjura a magia."
  },
  "Bag of Cooling": {
    pt: "Bolsa Refrigeradora",
    desc: "Qualquer item colocado dentro desta bolsa permanece gelado e fresco, impedindo que alimentos estraguem."
  },
  "Extending Staff": {
    pt: "Cajado Extensível",
    desc: "Como uma ação bônus, você pode fazer com que este cajado de madeira se estenda até 3 metros de comprimento ou encolha de volta para 1,8 metros."
  },
  "Tattoo of Speed": {
    pt: "Tatuagem da Velocidade",
    desc: "Esta tatuagem mágica requer sintonia e aumenta sua velocidade de caminhada em 3 metros."
  },
  "Amulet of Freshness": {
    pt: "Amuleto de Frescor",
    desc: "Este amuleto impede que você sue ou fique com odores ruins, mantendo você e suas roupas limpos."
  },
  "Map of Many Places": {
    pt: "Mapa de Muitos Lugares",
    desc: "Este mapa em branco se auto-desenha revelando a geografia detalhada da região num raio de 8 quilômetros ao seu redor."
  },
  "Potion of Empowerment": {
    pt: "Poção de Empoderamento",
    desc: "Ao beber esta poção, você ganha vantagem no próximo teste de atributo que fizer dentro de 1 hora."
  },
  "Tattoo of Absorption": {
    pt: "Tatuagem de Absorção",
    desc: "Esta tatuagem mágica requer sintonia. Ela permite que você use sua reação para absorver dano de um elemento específico uma vez ao dia."
  },
  "Potion of Renewal": {
    pt: "Poção de Renovação",
    desc: "Ao beber esta poção, você remove um nível de exaustão e recupera 1d10 pontos de vida."
  },
  "Vial of Spiders": {
    pt: "Frasco de Aranhas",
    desc: "Ao quebrar este frasco no chão, um enxame de aranhas não-hostis a você emerge e se dispersa pela área, criando distração."
  },
  "Buckleshot Belt": {
    pt: "Cinto de Fivelas",
    desc: "Este cinto de couro permite arremessar suas fivelas metálicas como se fossem adagas de arremesso que causam 1d4 de dano perfurante."
  },
  "Orb of Spell Storing": {
    pt: "Orbe de Armazenar Magia",
    desc: "Este pequeno orbe pode conter uma magia de até 1º nível conjurada nele, permitindo que qualquer criatura a libere posteriormente."
  },
  "Lux's Teacup Holster": {
    pt: "Coldre de Xícara do Lux",
    desc: "Um pequeno dispositivo acoplado ao cinto que mantém uma xícara de chá perfeitamente equilibrada e quente, impedindo que derrame."
  },
  "Dancer's Boots": {
    pt: "Botas do Dançarino",
    desc: "Enquanto usa estas botas, você tem vantagem em testes de Destreza (Acrobacia) para manter o equilíbrio ou realizar performances de dança."
  },
  "Death Petal Rose": {
    pt: "Rosa de Pétala da Morte",
    desc: "Esta rosa mágica preta requer sintonia. Suas pétalas podem ser esmagadas para criar uma dose de veneno básico."
  },
  "Goblet of Confidence": {
    pt: "Taça da Confiança",
    desc: "Beber qualquer líquido nesta taça concede a você vantagem em testes de Carisma (Persuasão) pelos próximos 10 minutos."
  },
  "Temperate Blanket": {
    pt: "Cobertor Temperado",
    desc: "Este cobertor se ajusta termicamente para manter você confortável tanto em climas extremamente frios quanto quentes."
  },
  "Magical Tattoo Ink": {
    pt: "Tinta de Tatuagem Mágica",
    desc: "Um frasco contendo tinta especial necessária para a aplicação de tatuagens mágicas descritas no Caldeirão de Tasha."
  },
  "Breathing Bubble": {
    pt: "Bolha de Respiração",
    desc: "Esta bolha de vidro parecida com um capacete abriga 1 hora de ar respirável. Ela recupera todo o ar diariamente ao amanhecer."
  },
  "Heward's Handy Spice Pouch": {
    pt: "Algibeira de Temperos de Heward",
    desc: "Esta algibeira mágica tem 10 cargas. Você pode gastar 1 charge para retirar dela uma pitada de qualquer tempero não-mágico (como sal ou pimenta), suficiente para temperar uma refeição. Recupera 1d6 + 4 cargas diariamente ao amanhecer."
  },
  "Bead of Refreshment": {
    pt: "Orbe de Refresco",
    desc: "Esta pequena conta esponjosa se dissolve instantaneamente na água, transformando até 500ml de qualquer líquido não-mágico em água potável limpa e gelada."
  },
  "Rope of Mending": {
    pt: "Corda de Remendo",
    desc: "Esta corda de cânhamo de 15 metros pode ser cortada em vários pedaços. Como uma ação, você pode falar uma palavra de comando para fazer com que os pedaços em contato se costurem magicamente de volta."
  },
  "Instrument of Scribing": {
    pt: "Instrumento da Escrita",
    desc: "Requer sintonia. Este instrumento musical tem 3 cargas. Ao tocá-lo, você pode gastar 1 carga para escrever uma mensagem flutuante de até 6 palavras em uma superfície a até 9 metros. A escrita dura 24 horas."
  },
  "Lock of Trickery": {
    pt: "Fechadura da Trapaça",
    desc: "Esta fechadura mágica impõe desvantagem em qualquer teste de Destreza feito para tentar arrombá-la."
  },
  "Prosthetic Limb": {
    pt: "Prótese Mágica",
    desc: "Esta prótese substitui um membro perdido (mão, pé, braço ou perna). Ela funciona exatamente de forma idêntica ao membro original e não pode ser removida contra sua vontade enquanto você estiver vivo."
  },
  "Hat of Naivety": {
    pt: "Chapéu da Ingenuidade",
    desc: "Enquanto usa este chapéu, você tem desvantagem em testes de Sabedoria (Intuição), mas ganha vantagem em um teste de Carisma por dia."
  },
  "Candle of the Deep": {
    pt: "Vela das Profundezas",
    desc: "A chama desta vela mágica não se apaga mesmo quando submersa na água, fornecendo calor e luz normais."
  },
  "Strongspirit Mug": {
    pt: "Caneca do Espírito Forte",
    desc: "Você pode encher esta caneca com álcool forte uma vez por dia. Qualquer criatura que beber deve passar num teste de resistência de Constituição CD 12 ou ficará envenenada por 1 hora (ganhando vantagem contra medo e 2d6 pontos de vida temporários)."
  },
  "Illuminator's Tattoo": {
    pt: "Tatuagem do Iluminador",
    desc: "Requer sintonia. Permite que você escreva usando a ponta do dedo como se fosse uma pena de tinta. Uma vez por dia, você pode tornar um texto invisível por 24 horas para todos, exceto você e um alvo escolhido."
  },
  "Liar's Stone": {
    pt: "Pedra do Mentiroso",
    desc: "Enquanto estiver portando esta pedra, você pode escolher uma mentira específica. Qualquer magia que tente detectar mentiras ou ler sua mente perceberá essa mentira específica como uma verdade absoluta."
  },
  "Bead of Nourishment": {
    pt: "Orbe de Nutrição",
    desc: "Esta pequena conta gelatinosa se dissolve na língua e provê nutrientes equivalentes a um dia inteiro de rações de viagem."
  },
  "Spellwrought Tattoo, Cantrip": {
    pt: "Tatuagem Mágica de Truque",
    desc: "Uma tatuagem mágica gravada na pele contendo um truque (cantrip). Você pode conjurar o truque uma vez através dela e ela sumirá."
  },
  "Spellwrought Tattoo, 1st Level": {
    pt: "Tatuagem Mágica de 1º Nível",
    desc: "Uma tatuagem mágica gravada na pele contendo uma magia de 1º nível. Você pode conjurar a magia uma vez por meio dela e ela desaparecerá."
  },
  "Tankard of Sobriety": {
    pt: "Caneca da Sobriedade",
    desc: "Esta caneca de metal ornamentada impede que você fique bêbado por qualquer bebida alcoólica ingerida através dela."
  },
  "Moon-Touched Sword": {
    pt: "Espada Trocada pela Lua",
    desc: "Esta espada brilha com luz prateada equivalente à de uma lua cheia num raio de 4,5 metros sempre que empunhada."
  },
  "Boots of False Tracks": {
    pt: "Botas de Pistas Falsas",
    desc: "Enquanto usa estas botas, você pode fazer com que suas pegadas pareçam com as de outra criatura humanoide ou fera de tamanho similar."
  },
  "Coin of Delving": {
    pt: "Moeda de Sondagem",
    desc: "Esta moeda mágica brilha suavemente quando deixada cair em buracos ou fendas, revelando a profundidade do local."
  },
  "Shield of Expression": {
    pt: "Escudo de Expressão",
    desc: "A face deste escudo de metal pode alterar sua expressão facial estampada (como raiva, alegria ou pavor) conforme a vontade do portador."
  },
  "Cloak of Billowing": {
    pt: "Capa do Tremular",
    desc: "Esta capa de tecido fino permite que você use uma ação bônus para fazê-la tremular dramaticamente, mesmo que não haja vento no local."
  },
  "Perfume of Bewitching": {
    pt: "Perfume do Encantamento",
    desc: "Este frasco contém perfume suficiente para 1 dose. Ao aplicá-lo, você ganha vantagem em testes de Carisma contra criaturas num raio de 1,5 metros por 1 hora."
  },
  "Goodberry Hat": {
    pt: "Chapéu de Goodberry",
    desc: "Uma vez por dia, você pode puxar 1d4 frutos mágicos (Goodberries) de dentro deste chapéu."
  },
  "Cloak of Many Fashions": {
    pt: "Capa de Muitas Modas",
    desc: "Esta capa pode alterar sua cor, style e padrão de costura como uma ação bônus, embora mantenha suas propriedades físicas normais."
  },
  "Unbreakable Arrow": {
    pt: "Flecha Inquebrável",
    desc: "Esta flecha de madeira mágica não pode ser quebrada ou danificada por meios não-mágicos."
  },
  "Pot of Awakening": {
    pt: "Vaso do Despertar",
    desc: "Se você plantar um arbusto comum neste vaso de argila mágica e regá-lo por 30 dias, o arbusto ganha vida como um arbusto desperto (Awakened Shrub) leal a você."
  },
  "Wand of Pyrotechnics": {
    pt: "Varinha de Pirotecnia",
    desc: "Esta varinha tem 7 cargas. Com uma ação, você pode gastar 1 carga para criar uma explosão inofensiva de luzes coloridas a até 18 metros de distância, acompanhada por um estampido ouvido a até 90 metros."
  },
  "Masquerade Tattoo": {
    pt: "Tatuagem do Disfarce",
    desc: "Requer sintonia. Uma tatuagem mágica que permite a você alterar sua aparência física (tamanho, cor, formato) como uma ação bônus. Uma vez por dia, você pode usá-la para conjurar a magia Disfarçar-se."
  },
  "Vox Seeker": {
    pt: "Buscador de Voz",
    desc: "Um pequeno autômato de metal parecido com um caranguejo. Quando acionado (dura de 1 a 10 minutos), ele se move e ataca a fonte da voz mais próxima que conseguir detectar."
  },
  "Mystery Key": {
    pt: "Chave do Mistério",
    desc: "Esta chave estranha tem 5% de chance de destrancar qualquer fechadura na qual for inserida. Se ela funcionar e destrancar a fechadura, ela desaparece permanentemente."
  }
};

const TABLE_B_TRANSLATIONS = {
  "Tattoo of Devastation": {
    pt: "Tatuagem da Devastação",
    desc: "Requer sintonia. Antes de fazer uma jogada de ataque, você pode optar por realizá-la com vantagem. Ao fazer isso, se o ataque acertar, ele se torna um acerto crítico garantido e a tatuagem desaparece."
  },
  "Maiming Weapon": {
    pt: "Arma Mutiladora",
    desc: "Quando você obtém um 20 natural em sua jogada de ataque com esta arma mágica, a velocidade do alvo é reduzida pela metade e ele tem desvantagem em testes de resistência e atributos de Força e Destreza até terminar um descanso curto ou receber cura mágica."
  },
  "Beauty's Bane": {
    pt: "Ruína da Beleza",
    desc: "Este espelho de mão mágico permite que você gaste uma ação para mostrá-lo a uma criatura inteligente a até 1,5 metros. O alvo deve passar num teste de resistência de Sabedoria ou ficará atordoado e fascinado pelo próprio reflexo."
  },
  "Charmer's Tambourine": {
    pt: "Pandeiro do Charmoso",
    desc: "Requer sintonia. Concede vantagem em testes de Performance e permite conjurar o truque Ilusão Menor à vontade. Possui 3 cargas para conjurar Enfeitiçar Pessoa (1 carga) ou Cativar (2 cargas)."
  },
  "Tattoo of Freedom": {
    pt: "Tatuagem da Liberdade",
    desc: "Requer sintonia. Negará e dissipará instantaneamente qualquer efeito mágico que paralise, restrinja ou reduza sua velocidade a 0. Também permite escapar de amarras não-mágicas ou agarrões usando uma ação bônus."
  },
  "Tattoo of Greater Absorption": {
    pt: "Tatuagem de Absorção Maior",
    desc: "Requer sintonia. Funciona como a tatuagem de absorção comum, mas pode ser ativada até duas vezes ao dia para absorver metade do dano de um elemento específico recebido."
  },
  "Potion of Poison": {
    pt: "Poção de Veneno",
    desc: "Esta poção parece e tem o gosto de uma Poção de Cura. Identificá-la revela falsamente que ela é uma Poção de Cura. Beber a poção causa 3d6 de dano de veneno e exige um teste de resistência de Constituição CD 12 contra envenenamento."
  },
  "Keoghtom’s Ointment": {
    pt: "Unguento de Keoghtom",
    desc: "Este frasco de vidro contém 1d4 + 1 doses de uma pomada mágica. Usar uma dose restaura 2d8 + 2 pontos de vida, cura any doença e remove as condições envenenado ou cego."
  },
  "Alchemy Jug": {
    pt: "Jarra de Alquimia",
    desc: "Esta jarra pode produzir diversos líquidos diariamente, como água ácida, cerveja, mel, vinho, óleo, vinagre ou até 2 galões de maionese."
  },
  "Lantern of Revealing": {
    pt: "Lanterna da Revelação",
    desc: "Enquanto estiver acesa, esta lanterna revela criaturas e objetos invisíveis num raio de 9 metros de luz brilhante."
  },
  "Rope of Climbing": {
    pt: "Corda de Escalada",
    desc: "Esta corda de 18 metros obedece a seus comandos de voz. Ela pode se mover, se amarrar e sustentar até 1.500 libras."
  },
  "Potion of Healing (Greater)": {
    pt: "Poção de Cura (Maior)",
    desc: "Você recupera 4d4 + 4 pontos de vida ao beber esta poção."
  },
  "Elemental Gem": {
    pt: "Gema Elemental",
    desc: "Esta gema mágica contém a energia de um elemental (Terra, Fogo, Água ou Ar). Quebrar a gema conjura a magia Conjurar Elemental correspondente."
  },
  "Spell Scroll (2nd Level)": {
    pt: "Pergaminho de 2º Nível",
    desc: "Este pergaminho contém uma magia de 2º nível escrita. Ler o pergaminho conjura a magia."
  },
  "Potion of Water Breathing": {
    pt: "Poção de Respirar na Água",
    desc: "Esta poção concede a habilidade de respirar debaixo d'água por 1 hora após ser consumida."
  },
  "Mithral Armor": {
    pt: "Armadura de Mitral",
    desc: "Esta armadura leve e extremamente resistente de mitral não impõe desvantagem em testes de Destreza (Furtividade) e não exige Força mínima."
  },
  "Spellwrought Tattoo  (2nd Level)": {
    pt: "Tatuagem Mágica de 2º Nível",
    desc: "Esta tatuagem mágica contém uma magia de 2º nível gravada na pele. Você pode conjurar a magia através dela uma vez, e depois a tatuagem desaparece."
  },
  "Bag of Shared Holding": {
    pt: "Sacola Compartilhada",
    desc: "Esta sacola está conectada a outra idêntica. Itens colocados em uma podem ser retirados da outra instantaneamente."
  },
  "Emerald Pen": {
    pt: "Pena de Esmeralda",
    desc: "Esta pena mágica permite escrever no ar com tinta verde brilhante e flutuante ou em pergaminhos de forma que a escrita fique invisível para todos, exceto destinatários escolhidos."
  },
  "Potion of Resistance": {
    pt: "Poção de Resistência",
    desc: "Ao beber esta poção, você ganha resistência a um tipo de dano (como Fogo, Frio, Ácido, etc.) por 1 hora. O tipo de dano é determinado aleatoriamente ou escolhido pelo Mestre."
  },
  "Incense of Fortitude": {
    pt: "Incenso de Fortitude",
    desc: "Este incenso mágico queima por 1 hora exalando aromas suaves. Qualquer criatura que inalar a fumaça durante um descanso curto ganha pontos de vida temporários iguais ao seu nível de personagem e tem vantagem em testes de resistência de Constituição por 8 horas."
  },
  "Tattoo of Power": {
    pt: "Tatuagem do Poder",
    desc: "Requer sintonia. Ao conjurar uma magia, você pode ativar esta tatuagem para amplificar a magia (como se estivesse usando um espaço de magia um nível superior) ou impor desvantagem no teste de resistência do alvo. Após o uso, ela desaparece."
  },
  "Tinker's Glasses": {
    pt: "Óculos do Serralheiro",
    desc: "Estes óculos têm 3 cargas. Você pode gastar 1 carga para ganhar vantagem em testes de Percepção ou Investigação que dependam da visão, ou para enxergar auras mágicas a até 9 metros por 10 minutos."
  },
  "Tattoo of Greater Speed": {
    pt: "Tatuagem da Velocidade Maior",
    desc: "Requer sintonia. Aumenta sua velocidade de caminhada em 6 metros."
  },
  "Tattoo of Heroism": {
    pt: "Tatuagem do Heroísmo",
    desc: "Requer sintonia. Quando você fica assustado, ou como uma ação bônus, você se torna imune à condição amedrontado por 1 minuto, ganha pontos de vida temporários iguais ao seu nível e a tatuagem some."
  },
  "Incense of Restoration": {
    pt: "Incenso da Restauração",
    desc: "Este incenso queima por 1 hora. Qualquer criatura que inalar a fumaça durante um descanso curto é curada de cegueira/surdez temporária, doenças, redução de HP máximo e reduz 1 nível de exaustão."
  },
  "Mage's Blood": {
    pt: "Sangue de Mago",
    desc: "Este óleo pode ser aplicado em uma arma ou 10 munições. O próximo acerto exige um teste de resistência de Constituição CD 15 ou o alvo fica envenenado por 1 minuto, tendo desvantagem contra magias."
  },
  "Rope of Restoration": {
    pt: "Corda da Restauração",
    desc: "Segurando esta corda com ambas as mãos, você pode usar uma ação para criar um par de mãos mágicas translúcidas que conseguem interagir com objetos a até 9 metros de distância."
  },
  "Oil of Slipperiness": {
    pt: "Óleo da Escorregabilidade",
    desc: "Este óleo age como o feitiço Movimentação Livre por 8 horas. Demora 10 minutos para cobrir uma criatura."
  },
  "Bag of Holding": {
    pt: "Bolsa de Carga",
    desc: "Esta bolsa tem um espaço interno de 1,2m de profundidade capaz de carregar até 250 kg de peso sem alterar o peso próprio da bolsa de 7 kg."
  },
  "Nemesis Weapon": {
    pt: "Arma Nêmesis",
    desc: "Requer sintonia. Uma vez por turno ao acertar um ataque, amaldiçoa você e o alvo até seu próximo turno: ambos não podem recuperar vida, ou subtraem 1d4 de testes de resistência, ou causam +1d8 de dano necrótico um ao outro."
  },
  "Observer's Spyglass": {
    pt: "Luneta do Observador",
    desc: "Luneta mágica com 3 cargas. Permite gastar 1 carga para ganhar vantagem em Percepção visual, enxergar in escuridão e ver através de névoas/chuvas a até 600 metros de distância por 1 minuto."
  },
  "Spell Scroll (3rd Level)": {
    pt: "Pergaminho de 3º Nível",
    desc: "Este pergaminho contém uma magia de 3º nível escrita. Ler o pergaminho conjura a magia."
  },
  "Incense of Erudition": {
    pt: "Incenso da Erudição",
    desc: "Incenso mágico que queima por 1 hora. Criaturas que inalarem a fumaça durante um descanso curto ganham vantagem em testes de Sabedoria, Inteligência e Carisma por 8 horas."
  },
  "Philter of Love": {
    pt: "Filtro do Amor",
    desc: "Ao beber esta poção, você se torna encantado pela próxima criatura que você ver pelos próximos 10 minutos."
  },
  "Wand of Magic Detection": {
    pt: "Varinha de Detecção de Magia",
    desc: "Esta varinha tem 3 cargas e permite a você conjurar a magia Detectar Magia sem gastar espaços de magia."
  },
  "Mariner’s Armor": {
    pt: "Armadura do Marinheiro",
    desc: "Esta armadura concede a você velocidade de natação igual à sua velocidade de caminhada. Se você cair em água e tiver menos de 0 HP, a armadura te flutua até a superfície a 18 metros por rodada."
  },
  "Helm of Comprehending Languages": {
    pt: "Elmo de Compreender Idiomas",
    desc: "Enquanto usar este elmo, você pode conjurar a magia Compreender Idiomas à vontade."
  },
  "Feywild Shard": {
    pt: "Fragmento da Agrestia Fada",
    desc: "Requer sintonia por um Feiticeiro. Pode ser usado como foco e permite rolar na tabela de Magia Selvagem sempre que você utilizar Metamagia."
  },
  "Jug of Endless Wind": {
    pt: "Jarra do Vento Infinito",
    desc: "Stoppered metal jug. Permite liberar ventos para empurrar objetos e criaturas (CD 13 de Força), criar uma parede de vento protetora contra projéteis, ou saltar voando até 9 metros."
  },
  "Potion of Greater Empowerment": {
    pt: "Poção de Empoderamento Maior",
    desc: "Ao beber esta poção, você ganha vantagem em todos os testes de atributo que fizer pelas próximas 8 horas."
  },
  "Potion of Growth": {
    pt: "Poção de Crescimento",
    desc: "Beber esta poção concede a você os efeitos de tamanho aumentado da magia Aumentar/Reduzir por 1d4 horas."
  },
  "Driftglobe": {
    pt: "Globo de Luz Flutuante",
    desc: "Esta esfera de vidro pode flutuar a até 1,5 metros do chão e seguir você, emitindo luz brilhante ou a magia Luz do Dia."
  },
  "Trekker's Helmet": {
    pt: "Elmo do Trilheiro",
    desc: "Requer sintonia. Dobra seu bônus de proficiência na perícia Sobrevivência. Além disso, permite ganhar vantagem em um teste de Força ou Destreza por dia."
  },
  "Goggles of Object Reading": {
    pt: "Óculos de Leitura de Objetos",
    desc: "Requer sintonia. Concede vantagem em testes de Arcana para revelar segredos de objetos que você vê, além de permitir conjurar a magia Identificar uma vez por dia."
  },
  "Ring of Swimming": {
    pt: "Anel de Natação",
    desc: "Enquanto estiver usando este anel, você ganha velocidade de natação de 12 metros."
  },
  "Goggles of Night": {
    pt: "Óculos da Noite",
    desc: "Estes óculos concedem visão no escuro de 18 metros. Se você já tiver visão no escuro, o alcance dela aumenta em 18 metros."
  },
  "Morphing Weapon": {
    pt: "Arma Metamórfica",
    desc: "Como uma ação bônus, você pode transformar esta arma em qualquer outro tipo de arma simples ou marcial."
  },
  "Spellwrought Tattoo (3rd Level)": {
    pt: "Tatuagem Mágica de 3º Nível",
    desc: "Tatuagem contendo uma magia de 3º nível. Permite conjurar a magia uma vez e depois desaparece."
  },
  "Ring of Obscuring": {
    pt: "Anel de Ocultação",
    desc: "Permite conjurar a magia Névoa uma vez por dia centralizada no anel."
  },
  "Saddle of the Cavalier": {
    pt: "Cela do Cavaleiro",
    desc: "Enquanto estiver nesta sela, você não pode ser desmontado contra sua vontade a menos que fique incapacitado. Ataques contra sua montaria têm desvantagem."
  },
  "Potion of Greater Renewal": {
    pt: "Poção de Renovação Maior",
    desc: "Beber esta poção remove qualquer exaustão, remove as condições petrificado ou amaldiçoado e restaura 4d10 pontos de vida."
  },
  "Potion of Fire Breath": {
    pt: "Poção do Sopro de Fogo",
    desc: "Esta poção permite que você use uma ação bônus para soprar fogo em uma criatura a até 9 metros, causando 4d6 de dano de fogo."
  },
  "Nature's Mantle": {
    pt: "Manto da Natureza",
    desc: "Requer sintonia por um Druida ou Patrulheiro. Permite que você faça a ação de Esconder-se mesmo quando estiver apenas levemente ocultado por folhagens ou fenômenos naturais."
  },
  "Coiling Grasp Tattoo": {
    pt: "Tatuagem do Aperto Espiral",
    desc: "Requer sintonia. Permite usar uma ação para projetar tentáculos de tinta a até 4,5 metros para agarrar e causar 3d6 de dano de força CD 13 a um inimigo."
  },
  "Beacon Shuriken": {
    pt: "Shuriken do Farol",
    desc: "Uma arma de arremesso que pode ser teleportada de volta para sua mão como uma ação bônus após ser lançada."
  },
  "Potion of Hill Giant Strength": {
    pt: "Poção de Força do Gigante da Colina",
    desc: "Seu valor de Força se torna 21 por 1 hora após beber esta poção."
  },
  "Amulet of the Drunkard": {
    pt: "Amuleto do Bêbado",
    desc: "Este amuleto cura você de envenenamento alcoólico e recupera 4d4 + 4 pontos de vida sempre que você bebe uma cerveja ou caneca de bebida alcoólica."
  },
  "Potion of Animal Friendship": {
    pt: "Poção de Amizade Animal",
    desc: "Permite a você conjurar a magia Amizade Animal à vontade contra feras de Inteligência menor que 4 por 1 hora."
  },
  "Commander's Helmet": {
    pt: "Elmo do Comandante",
    desc: "Requer sintonia. Como uma ação bônus, você pode comandar um aliado que você veja a realizar um único ataque usando a reação dele."
  },
  "Brightmind Cap": {
    pt: "Barrete da Mente Brilhante",
    desc: "Requer sintonia. Concede a você vantagem em testes de Inteligência (História ou Investigação)."
  },
  "Wand of Secrets": {
    pt: "Varinha de Segredos",
    desc: "Esta varinha tem 3 cargas e permite que você detecte a armadilha ou passagem secreta mais próxima num raio de 9 metros."
  },
  "Cloak of the Manta Ray": {
    pt: "Capa da Arraia",
    desc: "Enquanto estiver sob a água com esta capa capuzada, você pode respirar debaixo d'água e tem velocidade de nado de 18 metros."
  },
  "Robe of Useful Items": {
    pt: "Manto de Itens Úteis",
    desc: "Este manto possui diversos remendos destacáveis que podem ser transformados em itens reais (como escadas, botes, poções, etc.) ao serem descolados."
  },
  "Ammunition, +1": {
    pt: "Munição +1",
    desc: "Esta munição concede um bônus de +1 nas jogadas de ataque e dano."
  },
  "Alchemical Compendium": {
    pt: "Compêndio Alquímico",
    desc: "Requer sintonia por um mago. Permite a você alterar a matéria física de um objeto não-mágico pequeno em outro material comum temporariamente."
  },
  "Dust of Dryness": {
    pt: "Poeira da Secura",
    desc: "Esta poeira pode absorver até 15 metros cúbicos de água líquida instantaneamente, transformando-se em uma gema esférica que pode ser arremessada para liberar a água de volta."
  },
  "Immovable Rod": {
    pt: "Bastão Imóvel",
    desc: "Este bastão de metal possui um botão na ponta. Ao apertar o botão, o bastão se fixa magneticamente e magicamente no espaço onde está, suportando até 4 toneladas de peso sem se mover."
  },
  "Dust of Disappearance": {
    pt: "Poeira do Desaparecimento",
    desc: "Ao ser jogada ao ar, esta poeira torna você e criaturas próximas invisíveis por 2d4 minutos. A invisibilidade acaba se você atacar ou lançar magias."
  },
  "Animator's Quill": {
    pt: "Pena do Animador",
    desc: "Esta pena mágica permite desenhar objetos simples bi-dimensionais que ganham vida tridimensional após o desenho ser concluído."
  },
  "Grinsplitter Weapon": {
    pt: "Arma Corta-Sorrisos",
    desc: "Esta arma mágica causa 1d6 de dano cortante extra em criaturas que estejam rindo, sorrindo ou sob efeito de magias de charme."
  },
  "Bone Merchant's Coin": {
    pt: "Moeda do Mercador de Ossos",
    desc: "Uma moeda mágica que pode ser gasta para invocar temporariamente um esqueleto servo leal a você por 1 hora."
  },
  "Dust of Deliciousness": {
    pt: "Poeira da Deliciosidade",
    desc: "Ao ser salpicada sobre comida ou bebida, melhora drasticamente o sabor e concede vantagem em testes de Carisma por 1 hora para quem consumir."
  },
  "Safety Shell": {
    pt: "Concha de Segurança",
    desc: "Esta concha mágica pode se expandir criando uma redoma protetora resistente a ataques físicos por 10 minutos."
  },
  "Aegis of Dread": {
    pt: "Égide do Pavor",
    desc: "Este escudo mágico impõe desvantagem a ataques corpo a corpo direcionados a você caso o atacante falhe em um teste de resistência de Sabedoria CD 12."
  },
  "Brooch of Living Essence": {
    pt: "Broche da Essência Viva",
    desc: "Requer sintonia. Enquanto usa este broche, magias que detectem seu tipo de criatura percebem você como humanoide, e testes de alinhamento te consideram Neutro."
  },
  "Cap of Water Breathing": {
    pt: "Capuz de Respirar na Água",
    desc: "Permite a você respirar normalmente debaixo d'água enquanto estiver usando este capuz."
  },
  "Ring of Alarm": {
    pt: "Anel de Alarme",
    desc: "Requer sintonia. Permite programar um alarme mental silencioso que avisa um aliado em qualquer lugar do mesmo plano caso condições específicas (como receber dano ou gritar) sejam cumpridas."
  },
  "Guardian Emblem": {
    pt: "Emblema do Guardião",
    desc: "Requer sintonia por Clérigo ou Paladino. Este emblema acoplado à armadura possui 3 cargas. Permite gastar 1 carga para transformar um acerto crítico sofrido por você ou aliado a até 9 metros em um acerto normal."
  },
  "Dust of Sneezing and Choking": {
    pt: "Poeira de Espirro e Sufocamento",
    desc: "Esta poeira parece com Poeira do Desaparecimento. Lançá-la faz com que criaturas num raio de 9 metros sejam tomadas por crises de espirro e asfixia se falharem num salvamento de Constituição CD 15."
  }
};

const TABLE_C_TRANSLATIONS = {
  "Potion of Gaseous Form": {
    pt: "Poção de Forma Gasosa",
    desc: "O recipiente desta poção parece conter uma névoa densa que se move como água. Ao bebê-la, você ganha os efeitos da magia Forma Gasosa por 1 hora (sem exigir concentração)."
  },
  "Spellwrought Tattoo (4th Level)": {
    pt: "Tatuagem Mágica de 4º Nível",
    desc: "Uma tatuagem mágica contendo uma magia de 4º nível. Você pode conjurar a magia uma vez através da tatuagem e depois ela desaparecerá."
  },
  "Silence Serum": {
    pt: "Soro do Silêncio",
    desc: "Uma criatura que beber este líquido deve passar num salvamento de Constituição CD 13 ou ficará envenenada por 1 hora. Enquanto estiver envenenada dessa forma, a criatura não pode falar nem conjurar magias com componentes verbais."
  },
  "Potion of Fire Giant Strength": {
    pt: "Poção de Força do Gigante de Fogo",
    desc: "Ao beber esta poção, seu valor de Força se torna 25 por 1 hora."
  },
  "Potion of Stone Giant Strength": {
    pt: "Poção de Força do Gigante de Pedra",
    desc: "Ao beber esta poção, seu valor de Força se torna 23 por 1 hora."
  },
  "Scroll of Protection": {
    pt: "Pergaminho de Proteção",
    desc: "Qualquer criatura que saiba ler pode ler este pergaminho como uma ação. Ele cria uma barreira de 1,5m de raio e 3m de altura ao seu redor por 5 minutos, impedindo a entrada de um tipo específico de criatura escolhido pelo Mestre (ex: mortos-vivos, demônios)."
  },
  "Oil of Etherealness": {
    pt: "Óleo de Eterização",
    desc: "Leva 10 minutos para aplicar este óleo cinzento em uma criatura Média ou menor. Uma vez aplicado, a criatura entra no Plano Etereal (efeito da magia Projeção Etérea) por 1 hora."
  },
  "Elixir of Health": {
    pt: "Elixir da Saúde",
    desc: "Esta poção vermelha cura qualquer doença e encerra as condições cego, surdo, paralisado ou envenenado que estejam afetando você."
  },
  "Potion of Luck": {
    pt: "Poção da Sorte",
    desc: "Beber esta poção concede a você uma sorte incrível por 1 hora. Sempre que fizer um ataque, teste ou salvamento, você pode rolar um d20 adicional e escolher qual usar."
  },
  "Folding Boat": {
    pt: "Barco Dobrável",
    desc: "Uma caixa de madeira de 30 cm que flutua. Ao falar a primeira palavra de comando, ela se desdobra em um barco de 3 metros de comprimento. A segunda palavra a transforma em um navio de 7 metros. A terceira palavra a dobra de volta em uma caixa."
  },
  "Heward's Handy Haversack": {
    pt: "Mochila Prática de Heward",
    desc: "Esta mochila mágica possui três compartimentos extradimensionais. Ela pode carregar até 55 kg e os itens desejados sempre aparecem no topo quando você tenta retirá-los."
  },
  "Dreamwalker's Amulet": {
    pt: "Amuleto do Andarilho dos Sonhos",
    desc: "Requer sintonia. Enquanto estiver usando o amuleto, você não precisa dormir e pode projetar sua consciência no Plano Etereal enquanto medita. Além disso, possui 5 cargas para conjurar as magias Sono ou Sonho."
  },
  "Ring of Temporal Salvation": {
    pt: "Anel de Salvação Temporal",
    desc: "Requer sintonia. Se você morrer enquanto estiver usando este anel, você desaparece e ressurge instantaneamente a até 1,5 metros com 3d6 + mod de Constituição de pontos de vida. Em seguida, o anel vira poeira."
  },
  "Tattoo of Superior Speed": {
    pt: "Tatuagem da Velocidade Superior",
    desc: "Requer sintonia. Esta tatuagem aumenta sua velocidade de caminhada em 9 metros."
  },
  "Quaal's Feather Token": {
    pt: "Símbolo de Pena de Quaal",
    desc: "Um pequeno objeto em formato de pena que ativa um efeito mágico de uso único (como invocar uma árvore gigante, um barco em forma de cisne ou uma grande ave de montaria) antes de desaparecer."
  },
  "Ammunition, +2": {
    pt: "Munição +2",
    desc: "Esta munição concede um bônus de +2 nas jogadas de ataque e dano."
  },
  "Arrow of Seeking": {
    pt: "Flecha de Busca",
    desc: "Ao disparar esta flecha, você não faz jogada de ataque. Você escolhe um alvo visto a até 180 metros e a flecha desvia de obstáculos. O alvo deve passar num salvamento de Destreza CD 17 ou sofrerá o dano da flecha."
  },
  "Tattoo of Superior Absorption": {
    pt: "Tatuagem de Absorção Superior",
    desc: "Requer sintonia. Esta tatuagem protege você de um elemento específico. Ela possui 50 pontos de vida próprios e absorve todo o dano daquele elemento direcionado a você até ser destruída."
  },
  "Potion of Expertise": {
    pt: "Poção de Especialidade",
    desc: "Ao beber esta poção, você ganha proficiência em uma perícia à sua escolha por 1 hora. Se já for proficiente, o seu bônus de proficiência é dobrado para testes com aquela perícia."
  },
  "Potion of Healing (Superior)": {
    pt: "Poção de Cura (Superior)",
    desc: "Você recupera 8d4 + 8 pontos de vida ao beber esta poção."
  },
  "Periapt of Health": {
    pt: "Periapto de Saúde",
    desc: "Enquanto portar este pingente de prata, você é imune a doenças. Se já estiver doente, a doença é suspensa enquanto você usar o periapto."
  },
  "Spellwrought Tattoo (5th Level)": {
    pt: "Tatuagem Mágica de 5º Nível",
    desc: "Uma tatuagem mágica contendo uma magia de 5º nível. Você pode conjurar a magia uma vez através da tatuagem e depois ela sumirá."
  },
  "Spell Scroll (5th Level)": {
    pt: "Pergaminho de 5º Nível",
    desc: "Este pergaminho contém uma magia de 5º nível escrita. Ler o pergaminho conjura a magia."
  },
  "Potion of Maximum Power": {
    pt: "Poção de Poder Máximo",
    desc: "Ao beber esta poção, a próxima magia de 1º a 4º nível que você conjurar dentro de 1 minuto e que cause dano terá seu dano maximizado (causa o dano máximo possível)."
  },
  "Necklace of Fireballs": {
    pt: "Colar de Bolas de Fogo",
    desc: "Este colar possui 1d6 + 3 contas penduradas. Você pode usar uma ação para destacar uma conta e arremessá-la a até 18 metros, detonando uma magia Bola de Fogo de 3º nível (CD 15)."
  },
  "Potion of Heroism": {
    pt: "Poção de Heroísmo",
    desc: "Ao beber esta poção, você ganha 10 pontos de vida temporários e os efeitos da magia Heroísmo por 1 hora (imunidade a medo e bônus de 1d4 nas jogadas de ataque e salvamentos)."
  },
  "Envisioner's Compass": {
    pt: "Bússola do Visualizador",
    desc: "Uma bússola que permite a você sintonizar uma localização, criatura ou objeto no mesmo plano de existência por 24 horas, fazendo com que a agulha aponte sempre na direção do alvo."
  },
  "Glowrune Pigment": {
    pt: "Pigmento de Glowrune",
    desc: "Uma tinta mágica brilhante com 1d4+2 cargas. Pintar uma runa em si mesmo ou aliado leva 10 minutos e concede bênçãos mágicas por 8 horas baseadas na runa desenhada."
  },
  "Tattoo of Spell Turning": {
    pt: "Tatuagem de Refletir Magia",
    desc: "Requer sintonia. Concede vantagem em salvamentos contra magias direcionadas apenas a você. Se você passar no salvamento ou o ataque errar, a magia é refletida de volta para o conjurador original."
  },
  "Sending Stones": {
    pt: "Pedras de Envio",
    desc: "Um par de pedras rúnicas conectadas. Uma vez por dia, o portador de uma pedra pode usá-la para conjurar a magia Enviar Mensagem direcionada ao portador da outra pedra."
  },
  "Spell Scroll (4th Level)": {
    pt: "Pergaminho de 4º Nível",
    desc: "Este pergaminho contém uma magia de 4º nível escrita. Ler o pergaminho conjura a magia."
  },
  "Potion of Clairvoyance": {
    pt: "Poção de Clarividência",
    desc: "Ao beber esta poção, você ganha os efeitos da magia Clarividência por 10 minutos."
  },
  "Potion of Invulnerability": {
    pt: "Poção de Invulnerabilidade",
    desc: "Ao beber esta poção, você ganha resistência a todos os tipos de dano por 1 minuto."
  },
  "Potion of Diminution": {
    pt: "Poção de Diminuição",
    desc: "Ao beber esta poção, você encolhe de tamanho (efeito de tamanho reduzido da magia Aumentar/Reduzir) por 1d4 horas."
  },
  "Potion of Superior Empowerment": {
    pt: "Poção de Empoderamento Superior",
    desc: "Beber esta poção concede a você vantagem em todas as jogadas de ataque e testes de atributos pelas próximas 8 horas."
  },
  "Eyes of Minute Seeing": {
    pt: "Lentes de Ver Detalhes",
    desc: "Enquanto usar estas lentes de cristal sobre os olhos, você ganha vantagem em testes de Investigação para examinar objetos de perto (a menos de 30 cm)."
  },
  "Horseshoes of Speed": {
    pt: "Ferraduras da Velocidade",
    desc: "Este conjunto de 4 ferraduras de ferro pode ser colocado em uma montaria, aumentando a velocidade de deslocamento dela em 9 metros."
  },
  "Wayfarer's Boots": {
    pt: "Botas do Viajante",
    desc: "Requer sintonia. Estas botas de couro aumentam sua velocidade de caminhada em 3 metros e dão vantagem em testes de Sobrevivência. Permitem também conjurar Recuo Acelerado uma vez ao dia."
  },
  "Chime of Opening": {
    pt: "Carrilhão da Abertura",
    desc: "Este tubo metálico tem 10 cargas. Bater o carrilhão direcionado a uma porta, baú ou fechadura trancada consome 1 carga e a destranca magicamente, mesmo que esteja trancada por feitiços como Tranca Arcana."
  },
  "War Horn of Valor": {
    pt: "Trombeta de Guerra do Valor",
    desc: "Ao soprar esta trombeta como uma ação bônus, você encerra a condição amedrontado em si mesmo e ganha vantagem em testes contra ser amedrontado até seu próximo turno."
  },
  "Potion of Frost Giant Strength": {
    pt: "Poção de Força do Gigante do Gelo",
    desc: "Ao beber esta poção, seu valor de Força se torna 23 por 1 hora."
  },
  "Bead of Force": {
    pt: "Esfera de Força",
    desc: "Uma pequena conta que pode ser arremessada a até 18 metros. Ela explode causando 5d4 de dano de força CD 15 de Destreza e prende criaturas próximas em uma redoma de força invisível por 1 minuto."
  },
  "Potion of Mind Reading": {
    pt: "Poção de Ler Mentes",
    desc: "Beber esta poção concede a você os efeitos da magia Detectar Pensamentos por 10 minutos."
  },
  "Decanter of Endless Water": {
    pt: "Decantador de Água Infinita",
    desc: "Esta garrafa de metal pode produzir água infinita sob comando de voz: um copo d'água, um galão de água, ou um jato de alta pressão que pode empurrar criaturas inimigas (CD 13 de Força)."
  },
  "Brooch of Shielding": {
    pt: "Broche de Escudo",
    desc: "Requer sintonia. Enquanto estiver usando este broche, você tem resistência a dano de força e é completamente imune aos projéteis da magia Mísseis Mágicos."
  },
  "Tattoo of Death Ward": {
    pt: "Tatuagem da Salvaguarda da Morte",
    desc: "Requer sintonia. A primeira vez que você cair a 0 HP, você cai a 1 HP e a tatuagem some. Também anula um efeito de morte instantânea."
  },
  "Potion of Magic Resistance": {
    pt: "Poção de Resistência à Magia",
    desc: "Ao beber esta poção, você ganha vantagem em testes de resistência contra magias e outros efeitos mágicos por 1 hora."
  },
  "Bag of Beans": {
    pt: "Sacola de Feijões",
    desc: "Esta sacola contém 3d4 feijões mágicos. Plantar um feijão na terra e regá-lo gera um efeito selvagem aleatório da tabela de feijões (como criar uma pirâmide com uma múmia, gerar um pé de feijão gigante ou fazer nascer uma árvore de ovos de ouro)."
  },
  "Potion of Superior Renewal": {
    pt: "Poção de Renovação Superior",
    desc: "Beber esta poção remove toda a exaustão, restaura todos os pontos de vida perdidos e encerra todas as condições negativas e maldições que afetam a criatura."
  }
};

const TABLE_D_TRANSLATIONS = {
  "Potion of Invisibility": {
    pt: "Poção de Invisibilidade",
    desc: "Ao beber esta poção, você fica invisível por 1 hora. A invisibilidade acaba se você atacar ou conjurar magias."
  },
  "Potion of Possibility": {
    pt: "Poção da Possibilidade",
    desc: "Beber esta poção concede 2 Fragmentos de Possibilidade que duram 8 horas. Você pode gastar um fragmento para rolar um d20 extra em um teste, ataque ou salvamento."
  },
  "Bag of Devouring": {
    pt: "Bolsa de Devorar",
    desc: "Esta bolsa mágica funciona como uma Bolsa de Carga, mas abriga uma criatura extradimensional devoradora. Qualquer objeto ou criatura colocada dentro dela tem chance de ser devorado e digerido permanentemente."
  },
  "Spell Scroll (6th Level)": {
    pt: "Pergaminho de 6º Nível",
    desc: "Este pergaminho contém uma magia de 6º nível escrita. Ler o pergaminho conjura a magia."
  }
};

const TABLE_E_TRANSLATIONS = {
  "Potion of the Phoenix": {
    pt: "Poção da Fênix",
    desc: "Ao beber esta poção, você fica imbuído com energia de fênix por 1 ano e 1 dia. Se você morrer nesse período, você ressurge no seu próximo turno com metade do seu HP máximo e causa 5d8 de dano radiante a inimigos próximos."
  },
  "Potion of Healing (Supreme)": {
    pt: "Poção de Cura (Suprema)",
    desc: "Você recupera 10d4 + 20 pontos de vida ao beber esta poção."
  },
  "Sovereign Glue": {
    pt: "Cola Soberana",
    desc: "Uma substância leitosa extremamente forte que une dois objetos permanentemente após 1 minuto. O vínculo só pode ser quebrado por Solvente Universal, Óleo de Eterização ou Desejo."
  },
  "Arrow of Slaying": {
    pt: "Flecha de Matar",
    desc: "Esta flecha mágica é feita para um tipo específico de criatura. Ao atingir o alvo, ele deve fazer um salvamento de Constituição CD 17 ou sofrerá 6d10 de dano perfurante extra. A flecha perde a magia após o acerto."
  },
  "Tablet of Reawakening": {
    pt: "Placa do Despertar",
    desc: "Esta placa de pedra mágica permite conjurar a magia Ressurreição Verdadeira sem gastar componentes materiais. Ela vira pó após o uso."
  },
  "Potion of Storm Giant Strength": {
    pt: "Poção de Força do Gigante da Tempestade",
    desc: "Ao beber esta poção, seu valor de Força se torna 29 por 1 hora."
  },
  "Scroll of Time Travel": {
    pt: "Pergaminho de Viagem no Tempo",
    desc: "Ler este pergaminho transporta você e até 8 aliados voluntários para um ponto do passado pelo tempo que você determinar. Ao final do tempo, vocês retornam ao momento logo após a leitura."
  },
  "Spell Scroll (9th Level)": {
    pt: "Pergaminho de 9º Nível",
    desc: "Este pergaminho contém uma magia de 9º nível escrita. Ler o pergaminho conjura a magia."
  },
  "Spell Scroll (8th Level)": {
    pt: "Pergaminho de 8º Nível",
    desc: "Este pergaminho contém uma magia de 8º nível escrita. Ler o pergaminho conjura a magia."
  },
  "Universal Solvent": {
    pt: "Solvente Universal",
    desc: "Este líquido mágicos dissolve instantaneamente até 30 centímetros quadrados de qualquer adesivo, incluindo a Cola Soberana."
  },
  "Flask of Cloning": {
    pt: "Frasco de Clonagem",
    desc: "Ao colocar um pedaço de carne de uma criatura viva dentro dele, o frasco cria um clone inerte. Se o original morrer, a alma é transferida e o clone cresce rapidamente até o tamanho original, quebrando o frasco."
  },
  "Potion of Dragon's Majesty": {
    pt: "Poção da Majestade do Dragão",
    desc: "Ao beber esta poção contendo uma escama de dragão, você se transforma em um Dragão Adulto correspondente ao tipo da escama por 1 hora."
  }
};

const TABLE_F_TRANSLATIONS = {
  "Rod of the Pact Keeper, +1": {
    pt: "Bastão do Guardião do Pacto +1",
    desc: "Requer sintonia por Bruxo. Enquanto empunha este bastão, você ganha +1 de bônus nas jogadas de ataque de magia e na CD de salvamento de suas magias de bruxo. Além disso, você pode recuperar um espaço de magia de bruxo com uma ação uma vez por dia."
  },
  "Scaled Ornament (Slumbering)": {
    pt: "Ornamento Escamoso (Dormente)",
    desc: "Requer sintonia. Este ornamento de escamas de dragão concede a você vantagem em salvamentos contra ser enfeitiçado ou amedrontado."
  },
  "Boots of Striding and Springing": {
    pt: "Botas de Passos Largos e Saltos",
    desc: "Requer sintonia. Enquanto usa estas botas, sua velocidade de caminhada se torna 9 metros, caso já não seja maior, e seu deslocamento não é reduzido se você estiver sobrecarregado ou vestindo armadura pesada. Além disso, você pode saltar o triplo da distância normal."
  },
  "Wand of the War Mage, +1": {
    pt: "Varinha do Mago de Guerra +1",
    desc: "Requer sintonia por um conjurador. Enquanto empunha esta varinha, você ganha +1 de bônus nas jogadas de ataque de magia. Além disso, você ignora cobertura meio-obstáculo ao fazer ataques de magia."
  },
  "Adamantine Armor (Chain Shirt)": {
    pt: "Armadura de Adamantina (Camisão de Cota de Malha)",
    desc: "Esta armadura de cota de malha é reforçada com adamantina, um dos materiais mais duros existentes. Enquanto usá-la, qualquer acerto crítico sofrido por você se torna um acerto normal."
  },
  "Baneful Weapon": {
    pt: "Arma Ruinosa",
    desc: "Requer sintonia. Uma vez por turno, ao atingir uma criatura com esta arma, ela deve fazer um salvamento de Carisma CD 13 ou subtrairá 1d4 de suas jogadas de ataque e salvamentos até o fim do seu próximo turno."
  },
  "Gloves of Thievery": {
    pt: "Luvas da Ladinagem",
    desc: "Estas luvas são invisíveis enquanto usadas. Elas concedem um bônus de +5 em testes de Destreza (Prestidigitação) e testes de Destreza para arrombar fechaduras ou desarmar armadilhas."
  },
  "Helm of Telepathy": {
    pt: "Elmo de Telepatia",
    desc: "Requer sintonia. Enquanto usar este elmo, você pode conjurar a magia Detectar Pensamentos CD 13 à vontade. Você também pode enviar uma mensagem telepática ou tentar sugerir algo a uma criatura cuja mente você esteja lendo (magia Sugestão CD 13)."
  },
  "Wand of Web": {
    pt: "Varinha de Teia",
    desc: "Requer sintonia por um conjurador. Esta varinha tem 7 cargas. Com uma ação, você pode gastar 1 carga para conjurar a magia Teia CD 15. Recupera 1d6 + 1 cargas ao amanhecer."
  },
  "Boots of Elvenkind": {
    pt: "Botas Élficas",
    desc: "Enquanto usar estas botas de sola macia, seus passos não emitem som, e você tem vantagem em testes de Destreza (Furtividade) relacionados a se mover silenciosamente."
  },
  "Medallion of Thoughts": {
    pt: "Medalhão dos Pensamentos",
    desc: "Requer sintonia. Este medalhão possui 3 cargas. Enquanto o usar, você pode gastar 1 carga para conjurar a magia Detectar Pensamentos CD 13. Recupera 1d3 cargas ao amanhecer."
  },
  "Staff of the Adder": {
    pt: "Cajado da Víbora",
    desc: "Requer sintonia por Clérigo, Druida ou Bruxo. Com uma ação bônus, você faz a ponta deste cajado se transformar em uma cabeça de víbora viva por 1 minuto. Ao acertar um ataque corpo a corpo com ele, causa 1d6 de dano físico e o alvo deve passar num salvamento de Constituição CD 15 ou sofrerá 2d6 de dano de veneno."
  },
  "Deck of Illusions": {
    pt: "Baralho das Ilusões",
    desc: "Este baralho de pergaminho contém cartas pintadas com figuras detalhadas. Retirar uma carta aleatoriamente e jogá-la no chão cria uma ilusão tridimensional e realista da criatura desenhada nela."
  },
  "Dragon's Wrath Weapon (Slumbering)": {
    pt: "Arma da Ira do Dragão (Dormente)",
    desc: "Requer sintonia. Ao obter um acerto crítico com esta arma mágica, o alvo sofre 1d6 de dano elemental adicional correspondente ao sopro do dragão associado à arma."
  },
  "Scabbard of Sharpening": {
    pt: "Bainha de Afiação",
    desc: "Se uma arma de lâmina não-mágica for mantida nesta bainha por 1 hora ou mais, ela se torna uma arma mágica +1 por 1 hora após ser sacada."
  },
  "Adamantine Armor (Scale Mail)": {
    pt: "Armadura de Adamantina (Cota de Escamas)",
    desc: "Esta cota de escamas é forjada com adamantina. Qualquer acerto crítico desferido contra você enquanto estiver usando esta armadura torna-se um acerto normal."
  },
  "Quiver of Ehlonna": {
    pt: "Aljava de Ehlonna",
    desc: "Esta aljava possui três compartimentos mágicos. O primeiro comporta até 60 flechas ou virotes. O segundo comporta até 18 armas arremessáveis (como dardos ou azagaias). O terceiro comporta até 6 armas longas (como arcos, cajados ou lanças)."
  },
  "Stone of Good Luck (Luckstone)": {
    pt: "Pedra da Boa Sorte",
    desc: "Requer sintonia. Enquanto carregar esta pedra de ágata polida, você ganha um bônus de +1 em testes de atributos e salvamentos."
  },
  "Bag of Tricks (Tan)": {
    pt: "Sacola de Truques (Canela)",
    desc: "Esta sacola de pele parece vazia. Você pode usar uma ação para puxar uma bola de pelo dela e jogá-la a até 6 metros, transformando-a em uma fera leal (como chacal, macaco, cavalo, urso marrom) que obedece seus comandos."
  },
  "Javelin of Lightning": {
    pt: "Azagaia do Relâmpago",
    desc: "Esta azagaia pode ser arremessada para se transformar em um relâmpago de 1,5 metros de largura e 36 metros de comprimento. Cada criatura no caminho deve passar num salvamento de Destreza CD 13 ou sofrerá 4d6 de dano elétrico. A azagaia causa dano normal ao alvo atingido + 4d6 elétrico. Pode ser ativada uma vez por dia."
  },
  "Gloves of Missile Snaring": {
    pt: "Luvas de Apanhar Projéteis",
    desc: "Requer sintonia. Quando você for atingido por um ataque de arma à distância, pode usar sua reação para reduzir o dano sofrido em 1d10 + seu modificador de Destreza. Se reduzir o dano a 0, você pode pegar o projétil se tiver uma mão livre."
  },
  "Sword of Vengeance": {
    pt: "Espada da Vingança",
    desc: "Requer sintonia. Uma espada amaldiçoada +1. Quando você recebe dano em combate, deve passar num salvamento de Sabedoria CD 15 ou ficará furioso, atacando apenas a criatura que te causou dano até que ela caia a 0 HP ou fuja."
  },
  "Hat of Disguise": {
    pt: "Chapéu do Disfarce",
    desc: "Requer sintonia. Enquanto estiver usando este chapéu, você pode conjurar a magia Disfarçar-se à vontade."
  },
  "Rod of Retribution": {
    pt: "Bastão de Retribuição",
    desc: "Requer sintonia. Este bastão de adamantina possui 3 cargas. Quando uma criatura que você possa ver a até 18 metros lhe causa dano, você pode gastar 1 carga como reação para forçá-la a fazer um salvamento CD 13 de Destreza, sofrendo 2d10 de dano elétrico em uma falha."
  },
  "Cloak of Elvenkind": {
    pt: "Manto Élfico",
    desc: "Requer sintonia. Enquanto estiver usando este manto com o capuz erguido, testes de Sabedoria (Percepção) para ver você têm desvantagem, e você tem vantagem em testes de Destreza (Furtividade) para se esconder."
  },
  "Ring of Mind Shielding": {
    pt: "Anel de Proteção Mental",
    desc: "Requer sintonia. Enquanto usar este anel, você é imune a telepatia e magias que leiam seus pensamentos ou determinem se você mente. Se você morrer usando o anel, sua alma pode escolher habitar o anel."
  },
  "Eyes of Charming": {
    pt: "Olhos de Encantamento",
    desc: "Requer sintonia. Estas lentes de cristal possuem 3 cargas. Como uma ação, você pode fitar uma criatura a até 9 metros e gastar 1 carga para conjurar Enfeitiçar Pessoa (CD 13)."
  },
  "Wand of Magic Missiles": {
    pt: "Varinha de Mísseis Mágicos",
    desc: "Esta varinha possui 7 cargas. Com uma ação, você pode gastar 1 ou mais cargas para conjurar a magia Mísseis Mágicos (1 míssil por carga gasta). Recupera 1d6 + 1 cargas ao amanhecer."
  },
  "Periapt of Wound Closure": {
    pt: "Periapto de Fechamento de Feridas",
    desc: "Requer sintonia. Enquanto usar este periapto, você estabiliza instantaneamente no início do seu turno caso esteja morrendo. Além disso, ao rolar dados de vida para recuperar HP durante um descanso curto, você recupera o dobro do valor."
  },
  "Bloodwell Vial, +1": {
    pt: "Frasco do Poço de Sangue +1",
    desc: "Requer sintonia por Feiticeiro. Concede +1 em jogadas de ataque de magia e na CD de salvamento de suas magias de feiticeiro. Além disso, quando você rola dados de vida para recuperar HP, você pode recuperar 5 pontos de feitiçaria."
  },
  "Ring of Water Walking": {
    pt: "Anel de Andar na Água",
    desc: "Enquanto estiver usando este anel, você pode caminhar sobre qualquer superfície líquida (água, lama, lava ou ácido) como se fosse terreno firme."
  },
  "Gem of Brightness": {
    pt: "Gema da Luminosidade",
    desc: "Esta gema possui 50 cargas. Permite emitir flashes de luz para cegar criaturas a até 9 metros (CD 15 de Constituição) gastando cargas ou emitir luz brilhante num cone de 9 metros."
  },
  "All-Purpose Tool, +1": {
    pt: "Ferramenta Multiuso +1",
    desc: "Requer sintonia por um Artífice. Concede +1 em jogadas de ataque de magia e CD de salvamento de artífice. Permite transformar a ferramenta em qualquer ferramenta de artesão e aprender um truque de qualquer classe por 8 horas."
  },
  "Wind Fan": {
    pt: "Leque de Vento",
    desc: "Enquanto segura este leque, você pode usar uma ação para conjurar a magia Rajada de Vento (CD 13). Pode ser usado uma vez por dia gratuitamente e tem chance de quebrar em usos subsequentes no mesmo dia."
  },
  "Gauntlets of Ogre Power": {
    pt: "Manoplas de Força de Ogro",
    desc: "Requer sintonia. Seu valor de Força se torna 19 enquanto você usar estas manoplas de metal ornamentadas."
  },
  "Dragon Vessel (Slumbering)": {
    pt: "Vaso do Dragão (Dormente)",
    desc: "Requer sintonia. Uma vez por dia, você pode abrir este vaso de chifre ou garrafa de dragão para criar uma Poção de Cura comum ou outra bebida benéfica."
  },
  "Barrier Tattoo (AC 12)": {
    pt: "Tatuagem de Barreira (CA 12)",
    desc: "Requer sintonia. Esta tatuagem mágica de agulhas e tinta preta concede a você uma CA de 12 + seu modificador de Destreza caso você não esteja usando armadura."
  },
  "Cloak of Protection": {
    pt: "Manto de Proteção",
    desc: "Requer sintonia. Enquanto estiver usando este manto de tecido resistente, você ganha +1 de bônus na sua Classe de Armadura (CA) e em todas as jogadas de salvamento."
  },
  "Weapon, +1": {
    pt: "Arma +1",
    desc: "Esta arma mágica concede um bônus de +1 nas jogadas de ataque e dano feitas com ela."
  },
  "Weapon of Warning": {
    pt: "Arma de Alerta",
    desc: "Requer sintonia. Esta arma alerta você e seus companheiros num raio de 9 metros sobre perigos iminentes. Você tem vantagem em testes de Iniciativa e você e seus aliados próximos não podem ser surpreendidos (a menos que estejam incapacitados por motivos não-mágicos)."
  },
  "Ring of Jumping": {
    pt: "Anel de Salto",
    desc: "Requer sintonia. Enquanto estiver usando este anel, você pode conjurar a magia Salto em si mesmo como uma ação bônus à vontade."
  },
  "Dragon-Touched Focus (Slumbering)": {
    pt: "Foco Tocado pelo Dragão (Dormente)",
    desc: "Requer sintonia por um conjurador. Este foco rúnico concede +1 de bônus nas jogadas de ataque de magia e rola um dado de dano 1d6 extra quando você conjura magias de dano elemental compatíveis."
  },
  "Adamantine Armor (Chain Mail)": {
    pt: "Armadura de Adamantina (Cota de Malha)",
    desc: "Esta cota de malha pesada é feita com adamantina. Qualquer acerto crítico desferido contra você torna-se um acerto normal."
  },
  "Amulet of Proof against Detection and Location": {
    pt: "Amuleto de Proteção contra Detecção e Localização",
    desc: "Requer sintonia. Enquanto estiver usando este amuleto de cobre, você fica ocultado de qualquer magia de adivinhação ou sensores criados por magias de vidência."
  },
  "Dragonhide Belt": {
    pt: "Cinto de Couro de Dragão",
    desc: "Requer sintonia por Monge. Concede um bônus de +1 na CD de salvamento de suas técnicas de Ki e permite a você recuperar pontos de Ki iguais a uma rolagem do seu Dado de Arte Marcial uma vez ao dia."
  },
  "Pipes of the Sewers": {
    pt: "Flauta dos Esgotos",
    desc: "Requer sintonia. Enquanto toca esta flauta mágica, você pode usar uma ação para invocar 1d3 enxames de ratos sob seu controle mental se houver ratos num raio de 1,5 km."
  },
  "Eldritch Claw Tattoo": {
    pt: "Tatuagem de Garra Mística",
    desc: "Requer sintonia. Esta tatuagem mágica concede +1 de bônus em jogadas de ataque e dano com seus ataques desarmados. Permite usar uma ação bônus para estender seus golpes a até 4,5 metros por 1 minuto, causando 1d6 de dano de força extra."
  },
  "Headband of Intellect": {
    pt: "Faixa da Intelectualidade",
    desc: "Requer sintonia. Seu valor de Inteligência se torna 19 enquanto você usar esta faixa de metal ornamentada na testa."
  },
  "Bracers of Archery": {
    pt: "Braceletes de Arquearia",
    desc: "Requer sintonia. Enquanto usar estes braceletes de couro, você ganha proficiência com arco curto e arco longo, e causa +2 de dano adicional em jogadas de ataque com essas armas."
  },
  "Circlet of Blasting": {
    pt: "Diadema de Explosão",
    desc: "Enquanto estiver usando este diadema, você pode usar uma ação para conjurar a magia Raio Ardente (+5 de bônus de ataque). O diadema não pode ser usado novamente até o próximo amanhecer."
  },
  "Instrument of the Bards (Doss Lute)": {
    pt: "Instrumento dos Bardos (Alaúde Doss)",
    desc: "Requer sintonia por Bardo. Permite conjurar magias específicas de bardo (como Voar, Invisibilidade, Proteção contra Energia, etc.) através dele. Concede vantagem para resistir a magias de encanto tocadas por você."
  },
  "Winged Boots": {
    pt: "Botas Aladas",
    desc: "Requer sintonia. Estas botas concedem a você velocidade de voo igual à sua velocidade de caminhada por até 4 horas diárias. As asas se desdobram ao comando."
  },
  "Rhythm-Maker's Drum, +1": {
    pt: "Tambor do Criador de Ritmo +1",
    desc: "Requer sintonia por Bardo. Concede +1 em jogadas de ataque de magia e na CD de suas magias de bardo. Permite usar uma ação para recuperar um uso de sua Inspiração Bárdica uma vez por dia."
  },
  "Serpent's Maul": {
    pt: "Malho da Serpente",
    desc: "Requer sintonia. Este malho de guerra mágico tem 3 cargas. Ao acertar um ataque, você gasta 1 carga para forçar o alvo a passar num salvamento de Sabedoria CD 15 ou se transformará em uma serpente constritora por 1 rodada."
  },
  "Pipes of Haunting": {
    pt: "Flauta Assustadora",
    desc: "Esta flauta de cana possui 3 cargas. Ao tocá-lo, criaturas num raio de 9 metros devem passar num salvamento de Sabedoria CD 15 ou ficarão amedrontadas por 1 minuto. Recupera 1d3 cargas ao amanhecer."
  },
  "Instrument of the Bards (Fochlucan Bandore)": {
    pt: "Instrumento dos Bardos (Bandurra Fochlucan)",
    desc: "Requer sintonia por Bardo. Permite conjurar magias útil (como Fogo Fátuo, Enredar, Queda Suave, etc.) através do instrumento. Criaturas têm desvantagem contra seus encantos bárdicos."
  },
  "Necklace of Adaptation": {
    pt: "Colar de Adaptação",
    desc: "Requer sintonia. Enquanto estiver usando este colar com uma gema brilhante, você pode respirar normalmente em qualquer ambiente, incluindo vácuo, debaixo d'água ou em nuvens de gases nocivos ou venenosos."
  },
  "Prehistoric Figurines of Wondrous Power (Pyrite Plesiosaurus)": {
    pt: "Estatueta Pré-Histórica de Poder Maravilhoso (Plesiossauro de Pirita)",
    desc: "Como uma ação, você lança esta estatueta de pirita para invocar um Plesiossauro aliado leal por 12 horas. Enquanto montado nele, você pode conjurar Respirar na Água à vontade. A estatueta tem recarga de 4 dias."
  },
  "Staff of the Python": {
    pt: "Cajado da Píton",
    desc: "Requer sintonia por Clérigo, Druida ou Bruxo. Com uma ação, você lança este cajado de madeira no chão para transformá-lo em uma cobra píton gigante sob seu comando. Se a cobra cair a 0 HP, ela morre e o cajado é destruído."
  },
  "Heartlock Armor": {
    pt: "Armadura do Trancacorpo",
    desc: "Requer sintonia. Esta armadura de couro batido impede efeitos mágicos que alterem seu corpo contra sua vontade. Possui 3 cargas e permite gastar 1 carga para conjurar Aumentar/Reduzir (em si mesmo) ou Arrombar."
  },
  "Trident of Fish Command": {
    pt: "Tridente de Comandar Peixes",
    desc: "Requer sintonia. Este tridente mágico possui 3 cargas e permite conjurar a magia Dominar Fera (CD 15) contra feras com velocidade de nado nativa."
  },
  "Shield, +1": {
    pt: "Escudo +1",
    desc: "Enquanto empunha este escudo mágico, você ganha +1 de bônus na CA além do bônus normal do escudo (+3 CA no total)."
  },
  "Thornbow": {
    pt: "Arco de Espinhos",
    desc: "Requer sintonia. Este arco mágico de galhos espinhosos tem 3 cargas. Ao acertar um ataque, gaste 1 carga para causar +2d8 de dano perfurante extra (e você sofre 1d8 de dano). Obter um 20 natural no ataque dispara uma chuva de espinhos de 2d10 de dano CD 15 nos inimigos adjacentes."
  },
  "Arcane Grimoire, +1": {
    pt: "Grimório Arcano +1",
    desc: "Requer sintonia por um Mago. Concede +1 em jogadas de ataque de magia e CD de salvamento de magias de mago. Aumenta a quantidade de espaços de magia que você recupera com a Recuperação Arcana."
  },
  "Boots of the Winterlands": {
    pt: "Botas das Terras Invernais",
    desc: "Requer sintonia. Concede a você resistência a dano de frio, permite caminhar sobre neve e gelo sem sofrer terreno difícil, e protege contra temperaturas de frio extremo."
  },
  "Bag of Tricks (Rust)": {
    pt: "Sacola de Truques (Ferrugem)",
    desc: "Esta sacola de pele permite arremessar pequenas bolas de pelo para invocar feras aliadas leais de cor ferrugem (como rato gigante, coruja, cabra gigante, javali, lobo) que obedecem seus comandos."
  },
  "Eyes of the Eagle": {
    pt: "Olhos da Águia",
    desc: "Requer sintonia. Estas lentes de cristal se ajustam aos seus olhos e concedem vantagem em testes de Sabedoria (Percepção) baseados na visão."
  },
  "Bag of Tricks (Gray)": {
    pt: "Sacola de Truques (Cinza)",
    desc: "Esta sacola de pele permite invocar feras cinzentas aliadas (como doninha, rato gigante, texugo, javali, lobo gigante) ao arremessar suas bolas de pelo."
  },
  "Broom of Flying": {
    pt: "Vassoura voadora",
    desc: "Esta vassoura de madeira comum pode voar sob comando verbal, carregando até 180 kg a uma velocidade de voo de 15 metros, ou 9 metros se carregar até 270 kg."
  },
  "Eversmoking Bottle": {
    pt: "Garrafa de Fumaça Constante",
    desc: "Ao remover a rolha desta garrafa de metal, uma fumaça densa e escura escapa constantemente, criando uma área de escuridão total (obscurecimento pesado) num raio de 18 metros que se expande gradualmente."
  },
  "Ring of Warmth": {
    pt: "Anel do Calor",
    desc: "Requer sintonia. Concede resistência a dano de frio e mantém você aquecido e confortável mesmo em temperaturas extremamente congelantes."
  },
  "Slippers of Spider Climbing": {
    pt: "Sapatilhas de Patas de Aranha",
    desc: "Requer sintonia. Enquanto usar estas sapatilhas leves, você pode andar em superfícies verticais e de cabeça para baixo em tetos, deixando suas mãos livres."
  },
  "Figurine of Wondrous Power (Silver Raven)": {
    pt: "Estatueta de Poder Maravilhoso (Corvo de Prata)",
    desc: "Esta estatueta de prata em formato de corvo se transforma em um corvo vivo aliado por até 12 horas. Ela pode ser usada para enviar mensagens como a magia Mensageiro Animal."
  },
  "Orb of Greater Spell Storing": {
    pt: "Orbe de Armazenar Magia Maior",
    desc: "Este orbe mágico funciona de forma similar ao Orbe de Armazenar Magia comum, mas é capaz de armazenar magias de até 3º nível conjuradas nele."
  },
  "Gloves of Swimming and Climbing": {
    pt: "Luvas de Natação e Escalada",
    desc: "Requer sintonia. Concedem a você velocidade de nado e escalada iguais à sua velocidade de caminhada, além de vantagem em testes de Atletismo para escalar ou nadar."
  },
  "Instrument of the Bards (Mac-Fuirmidh Cittern)": {
    pt: "Instrumento dos Bardos (Cistre Mac-Fuirmidh)",
    desc: "Requer sintonia por Bardo. Permite conjurar magias úteis como Barkskin, Cure Wounds, Fog Cloud. Concede bônus contra encantos e resistência."
  },
  "Moon Sickle, +1": {
    pt: "Foice Lunar +1",
    desc: "Requer sintonia por Druida ou Patrulheiro. Concede +1 em jogadas de ataque e dano com esta foice, +1 em magias de ataque e CD de salvamento. Quando conjurar magias de cura, adiciona +1d4 na cura."
  },
  "Amulet of the Devout, +1": {
    pt: "Amuleto do Devoto +1",
    desc: "Requer sintonia por Clérigo ou Paladino. Concede +1 em jogadas de ataque de magia e CD de salvamento de suas magias. Permite usar sua Canalização de Divindade mais uma vez ao dia sem gastar usos normais."
  },
  "Sentinel Shield": {
    pt: "Escudo Sentinela",
    desc: "Enquanto empunha este escudo ornamentado com um desenho de olho, você tem vantagem em testes de Sabedoria (Percepção) e jogadas de Iniciativa."
  },
  "Pearl of Power": {
    pt: "Pérola do Poder",
    desc: "Requer sintonia por um conjurador. Com uma ação, você pode usar a pérola para recuperar um espaço de magia de até 3º nível já gasto. Pode ser usada uma vez ao dia."
  },
  "Brooch of Shielding": {
    pt: "Broche de Escudo",
    desc: "Requer sintonia. Enquanto estiver usando este broche, você tem resistência a dano de força e é completamente imune aos projéteis da magia Mísseis Mágicos."
  }
};

const TABLE_I_TRANSLATIONS = {
  "Longbow of the Healing Hearth": {
    pt: "Arco Longo da Lareira Curativa",
    desc: "Requer sintonia. Este arco +3 mágico não necessita de munição (gera flechas de energia). Permite que você atire em aliados para curá-los ou conjurar magias de suporte e cura gastando Hit Dice."
  },
  "Hammer of Thunderbolts": {
    pt: "Martelo dos Relâmpagos",
    desc: "Este martelo gigante concede +1 em jogadas de ataque e dano (ou +5 se você usar Cinto de Força do Gigante e Manoplas de Força do Ogro). Permite desferir relâmpagos e matar gigantes instantaneamente em críticos."
  },
  "Belt of Storm Giant Strength": {
    pt: "Cinto de Força do Gigante da Tempestade",
    desc: "Requer sintonia. Seu valor de Força se torna 29 enquanto usar este cinto de couro runado."
  },
  "Armor, +2 Plate": {
    pt: "Armadura de Placas +2",
    desc: "Esta armadura de placas completa concede um bônus de +2 na CA, oferecendo uma Classe de Armadura total de 20."
  },
  "Hide of the Feral Guardian": {
    pt: "Couro do Guardião Feral",
    desc: "Requer sintonia. Um Manto ou Armadura de Couro que evolui com seu usuário. Permite assumir formas de feras aprimoradas, concede resistência a dano físico e bônus na CA."
  },
  "Orb of Skoraeus": {
    pt: "Orbe de Skoraeus",
    desc: "Requer sintonia por conjurador. Este orbe de pedra rúnica concede vantagem em salvamentos de Constituição, visão no escuro e permite conjurar magias de terra e pedra poderosas."
  },
  "Staff of the Magi": {
    pt: "Cajado dos Magos",
    desc: "Requer sintonia por Bruxo, Mago ou Feiticeiro. Este cajado +2 concede vantagem contra magias. Tem 50 cargas para conjurar diversas magias lendárias ou pode ser quebrado para causar uma explosão retributiva devastadora."
  },
  "Instrument of the Bards (Ollamh Harp)": {
    pt: "Instrumento dos Bardos (Harpa Ollamh)",
    desc: "Requer sintonia por Bardo. Permite conjurar magias lendárias (como Confusão, Globo de Invulnerabilidade, etc.) e impõe desvantagem em salvamentos contra seus encantos bárdicos."
  },
  "Ruby Weave Gem": {
    pt: "Gema do Tecido de Rubi",
    desc: "Requer sintonia por conjurador. Esta gema flutuante permite a você aprender e conjurar qualquer magia de qualquer classe de até 5º nível temporariamente."
  },
  "Gold Canary Figurine of Wondrous Power": {
    pt: "Estatueta de Poder Maravilhoso (Canário de Ouro)",
    desc: "Esta estatueta se transforma em um Canário Gigante ou em um Dragão de Ouro Jovem aliado por até 1 hora. Recarrega em 7 dias."
  },
  "Animated Painting": {
    pt: "Pintura Animada",
    desc: "Uma tela mágica que abriga uma criatura bidimensional que pode ser invocada para o mundo real para cumprir ordens ou criar ilusões."
  },
  "Ring of Djinni Summoning": {
    pt: "Anel de Invocação de Djinni",
    desc: "Requer sintonia. Permite invocar um Djinni amigável do Plano Elemental do Ar para servir você por até 1 hora por dia."
  },
  "Rod of Lordly Might": {
    pt: "Bastão do Poder Senhorial",
    desc: "Requer sintonia. Este bastão de metal possui botões que o transformam em espada flamejante, lança +3, machado +3, arpéu retrátil, ou arrombador de portas. Possui cargas para paralisar ou assustar inimigos."
  },
  "Armor, +3 Chain Mail": {
    pt: "Armadura de Cota de Malha +3",
    desc: "Esta cota de malha pesada concede um bônus de +3 na CA, oferecendo Classe de Armadura total de 19."
  },
  "Efreeti Chain": {
    pt: "Cota de Malha do Efreeti",
    desc: "Requer sintonia. Esta cota de malha +3 concede imunidade a dano de fogo e permite andar sobre lava sem sofrer dano."
  },
  "Armor, +3 Half Plate": {
    pt: "Meia-Armadura +3",
    desc: "Esta meia-armadura média concede um bônus de +3 na CA, oferecendo Classe de Armadura total de 18 + Destreza (máx +2)."
  },
  "Iron Flask": {
    pt: "Frasco de Ferro",
    desc: "Este frasco pode aprisionar qualquer criatura que não seja nativa do plano onde você está (CD 17 de Carisma). Ao ser solta, ela deve obedecer a seus comandos por 1 hora."
  },
  "Well of Many Worlds": {
    pt: "Poço de Muitos Mundos",
    desc: "Este tecido circular preto de 2,4m de diâmetro abre um portal de duas vias ligando seu local a outro plano de existência aleatório quando desdobrado."
  },
  "Infiltrator's Key": {
    pt: "Chave do Infiltrador",
    desc: "Requer sintonia. Esta chave mágica permite atravessar paredes sólidas (como se fossem ar) e destrancar qualquer fechadura não-mágica à vontade."
  },
  "Cloak of Invisibility": {
    pt: "Manto da Invisibilidade",
    desc: "Requer sintonia. Com uma ação, você pode puxar o capuz deste manto para ficar invisível por até 2 horas diárias (que podem ser divididas)."
  },
  "Luck Blade": {
    pt: "Lâmina da Sorte",
    desc: "Requer sintonia. Esta espada +1 concede +1 de bônus em salvamentos. Permite re-rolar uma jogada por dia e contém 1d3 desejos mágicos (magia Desejo)."
  },
  "Rod of Resurrection": {
    pt: "Bastão de Ressurreição",
    desc: "Requer sintonia por Clérigo, Druida ou Paladino. Este bastão possui 5 cargas e permite conjurar Ressurreição ou Curar Ferimentos de alto nível."
  },
  "Grimoire Infinitus": {
    pt: "Grimório Infinitus",
    desc: "Requer sintonia por Mago. Este grimório lendário amplia seus slots de magia e concede bônus permanentes na CD de salvamento de suas magias de mago."
  },
  "Armor, +2 Half Plate": {
    pt: "Meia-Armadura +2",
    desc: "Esta meia-armadura média concede um bônus de +2 na CA, oferecendo Classe de Armadura total de 17 + Destreza (máx +2)."
  },
  "Armor, +2 Breastplate": {
    pt: "Couraça +2",
    desc: "Esta couraça média concede um bônus de +2 na CA, oferecendo Classe de Armadura total de 16 + Destreza (máx +2)."
  },
  "Red Wizard Blade": {
    pt: "Lâmina do Mago Vermelho",
    desc: "Esta adaga lendária causa +3d12 de dano necrótico em acertos. Inimigos reduzidos a 0 HP morrem instantaneamente e não podem ser ressuscitados, exceto por intervenção divina."
  },
  "Armor, +1 Half Plate": {
    pt: "Meia-Armadura +1",
    desc: "Esta meia-armadura média concede um bônus de +1 na CA, oferecendo Classe de Armadura total de 16 + Destreza (máx +2)."
  },
  "Armor, +1 Scale Mail": {
    pt: "Cota de Escamas +1",
    desc: "Esta cota de escamas média concede um bônus de +1 na CA, oferecendo Classe de Armadura total de 15 + Destreza (máx +2)."
  },
  "Wreath of the Prism": {
    pt: "Grinalda do Prisma",
    desc: "Requer sintonia. Esta grinalda de espinhos de ouro permite a você conjurar Dominar Monstro contra feras, dragões ou monstros (CD e limite de CR aumentam com a evolução do item)."
  },
  "Verminshroud": {
    pt: "Sudário de Pragas",
    desc: "Requer sintonia. Este manto concede imunidade a doenças, vantagem em Percepção olfativa e permite se transformar em ratos ou vespas gigantes, além de convocar nuvens de insetos."
  },
  "Armor, +2 Splint": {
    pt: "Armadura de Placas Recortadas +2",
    desc: "Esta armadura pesada concede um bônus de +2 na CA, oferecendo uma Classe de Armadura total de 19."
  },
  "Ioun Stone (Regeneration)": {
    pt: "Pedra de Ioun (Regeneração)",
    desc: "Requer sintonia. Esta pedra orbita sua cabeça e restaura 15 pontos de vida a cada hora, desde que você tenha pelo menos 1 HP."
  },
  "Armor, +3 Studded Leather": {
    pt: "Couro Batido +3",
    desc: "Esta armadura leve concede um bônus de +3 na CA, oferecendo Classe de Armadura total de 15 + seu modificador de Destreza."
  },
  "Ring of Invisibility": {
    pt: "Anel de Invisibilidade",
    desc: "Requer sintonia. Enquanto estiver usando este anel, você pode usar uma ação para se tornar invisível. A invisibilidade dura até você atacar, conjurar magia ou retirá-lo."
  },
  "Shield of the Blazing Dreadnought": {
    pt: "Escudo do Dreadnought Flamejante",
    desc: "Requer sintonia. Este escudo de metal irradia calor. Permite ganhar imunidade a dano de fogo e remover doenças de aliados ao ativá-lo, além de desferir poderosos ataques de escudo."
  },
  "Deck of Many Things": {
    pt: "Baralho das Muitas Coisas",
    desc: "Este baralho de cartas de pergaminho possui poderes imensos. Declarar o número de cartas que você vai comprar e retirá-las gera efeitos massivos (como ganhar um palácio, perder sua alma, ou ganhar desejos)."
  },
  "Prehistoric Figurine of Wondrous Power (Jasper Tyrannosaurus Rex)": {
    pt: "Estatueta Pré-Histórica de Poder Maravilhoso (T-Rex de Jaspe)",
    desc: "Lançar esta estatueta invoca um Tiranossauro Rex aliado leal por até 1 hora. Pode ser usada uma vez a cada 15 dias."
  },
  "Cubic Gate": {
    pt: "Portal Cúbico",
    desc: "Este cubo mágico possui faces sintonizadas com 6 planos diferentes. Pressionar uma face abre um portal de duas vias ligando seu plano ao plano sintonizado."
  },
  "Dragonlance": {
    pt: "Lança do Dragão",
    desc: "Esta lança lendária +3 causa +3d6 de dano de força extra. Ao atingir um dragão, o dragão sofre dano extra igual à metade do seu HP máximo (com CD de salvamento)."
  },
  "Scarab of Protection": {
    pt: "Escaravelho de Proteção",
    desc: "Requer sintonia. Concede vantagem em salvamentos contra magias. Possui 12 cargas e permite absorver efeitos de morte instantânea ou dano necrótico gastando cargas."
  },
  "Armor of Resistance (Half Plate)": {
    pt: "Meia-Armadura de Resistência",
    desc: "Requer sintonia. Esta meia-armadura +1 concede a você resistência a um tipo específico de dano elemental."
  },
  "Scaled Ornament (Ascendant)": {
    pt: "Ornamento Escamoso (Ascendente)",
    desc: "Requer sintonia. Concede +2 na CA, imunidade a ser enfeitiçado ou amedrontado, imunidade elemental, velocidade de voo e causa dano elemental extra."
  },
  "Helm of Disjunction": {
    pt: "Elmo de Disjunção",
    desc: "Requer sintonia. Este elmo mágico permite conjurar uma onda que dissipa e anula qualquer magia ou efeito mágico activo num raio de 9 metros."
  },
  "Ring of Earth Elemental Command": {
    pt: "Anel de Comando do Elemental da Terra",
    desc: "Requer sintonia. Concede bônus contra elementais da terra. Ao ajudar a matar um elemental da terra, o anel desperta concedendo imunidade a petrificação e magias de terra."
  },
  "Dragon's Wrath Weapon (Ascendant)": {
    pt: "Arma da Ira do Dragão (Ascendente)",
    desc: "Requer sintonia. Esta arma +3 causa +3d6 de dano elemental e libera rajadas de sopro de dragão de 8d6 de dano em área em críticos."
  },
  "Topaz Annihilator": {
    pt: "Aniquilador de Topázio",
    desc: "Requer sintonia. Esta arma de fogo mágica causa +2d6 de dano de força extra e desintegra instantaneamente qualquer criatura reduzida a 0 HP por ela."
  },
  "Apparatus of Kwalish": {
    pt: "Aparelho de Kwalish",
    desc: "Este barril de ferro de 2 metros se assemelha a uma lagosta de metal gigante. Pode ser operado por até duas criaturas para andar em terra, nadar debaixo d'água e atacar com garras."
  },
  "Armor, +1 Plate": {
    pt: "Armadura de Placas +1",
    desc: "Esta armadura de placas completa concede um bônus de +1 na CA, oferecendo Classe de Armadura total de 19."
  },
  "Belt of Cloud Giant Strength": {
    pt: "Cinto de Força do Gigante das Nuvens",
    desc: "Requer sintonia. Seu valor de Força se torna 27 enquanto você estiver usando este cinto de couro runado."
  },
  "Ring of Spell Turning": {
    pt: "Anel de Refletir Magias",
    desc: "Requer sintonia. Concede vantagem em salvamentos contra magias direcionadas apenas a você. Se obtiver um 20 natural no salvamento de uma magia de 8º nível ou menor, a magia é refletida de volta."
  },
  "Harp of Gilded Plenty": {
    pt: "Harpa da Abundância Dourada",
    desc: "Requer sintonia. Esta harpa senciente impede que você role menos de 10 em testes de Carisma e permite conjurar Banquete de Heróis uma vez ao dia."
  },
  "Ring of Fire Elemental Command": {
    pt: "Anel de Comando do Elemental do Fogo",
    desc: "Requer sintonia. Concede resistência a dano de fogo e permite falar Ignan. Ao ajudar a matar um elemental do fogo, concede imunidade a fogo e magias de chamas."
  },
  "Dragon Vessel (Ascendant)": {
    pt: "Vaso do Dragão (Ascendente)",
    desc: "Requer sintonia. Permite criar Poções de Cura Suprema ou outras poções lendárias uma vez ao dia, e concede imunidade a um tipo de dano."
  },
  "Crystal Ball of True Seeing": {
    pt: "Bola de Cristal de Visão Verdadeira",
    desc: "Requer sintonia. Funciona como uma Bola de Cristal comum, mas concede a você Visão Verdadeira a até 36 metros enquanto a estiver utilizando."
  },
  "Talisman of Ultimate Evil": {
    pt: "Talisman do Mal Supremo",
    desc: "Requer sintonia por um personagem Mau. Este amuleto de ferro possui 6 cargas e permite abrir uma fenda sob um personagem Bom a até 36 metros, tragando-o diretamente para o submundo."
  },
  "Holy Avenger": {
    pt: "Vingadora Sagrada",
    desc: "Requer sintonia por Paladino. Esta espada +3 causa +2d10 de dano radiante extra contra demônios e mortos-vivos, e emite uma aura de vantagem em salvamentos contra magias."
  },
  "Plate Armor of Etherealness": {
    pt: "Armadura de Placas de Eterização",
    desc: "Requer sintonia. Esta armadura +1 de placas permite a você usar uma ação para entrar no Plano Etereal por até 10 minutos diários."
  },
  "Crystal Ball of Telepathy": {
    pt: "Bola de Cristal de Telepatia",
    desc: "Requer sintonia. Funciona como uma Bola de Cristal comum, mas permite que você converse telepaticamente e tente ler a mente da criatura observada."
  },
  "Armor, +3 Plate": {
    pt: "Armadura de Placas +3",
    desc: "Esta armadura de placas completa concede um bônus de +3 na CA, oferecendo Classe de Armadura total de 21."
  },
  "Armor, +2 Studded Leather": {
    pt: "Couro Batido +2",
    desc: "Esta armadura leve concede um bônus de +2 na CA, oferecendo Classe de Armadura total de 14 + seu modificador de Destreza."
  },
  "Armor, +3 Breastplate": {
    pt: "Couraça +3",
    desc: "Esta couraça média concede um bônus de +3 na CA, oferecendo Classe de Armadura total de 17 + Destreza (máx +2)."
  },
  "Sword of Answering": {
    pt: "Espada da Resposta",
    desc: "Requer sintonia. Esta espada +3 lendária permite que você use sua reação para desferir um contra-ataque contra qualquer inimigo que te cause dano, com vantagem garantida."
  },
  "Platinum Scarf": {
    pt: "Cachecol de Platina",
    desc: "Requer sintonia. Este cachecol de fios de platina possui 7 remendos que podem ser destacados para criar escudos protetores +1, poções de cura ou invocar dragões de platina."
  },
  "Chronomancer's Staff": {
    pt: "Cajado do Cronomante",
    desc: "Requer sintonia por conjurador. Este cajado concede bônus em testes de iniciativa e permite a você re-rolar salvamentos ou alterar a ordem de turnos no combate."
  },
  "Stonebreaker's Breastplate": {
    pt: "Couraça do Quebra-Pedras",
    desc: "Requer sintonia. Esta couraça de granito e metal concede resistência a dano de concussão, perfuração e corte de armas mágicas e não-mágicas."
  },
  "Flail of Tiamat": {
    pt: "Mangual de Tiamat",
    desc: "Requer sintonia. Este mangual +3 causa +5d4 de dano elemental (um d4 para cada elemento de Tiamat) em cada acerto e pode liberar sopros de dragão em área."
  },
  "Stormgirdle": {
    pt: "Cinturão da Tempestade",
    desc: "Requer sintonia. Aumenta sua Força (até 25). Concede resistência a eletricidade e trovão, e permite assumir a forma de Avatar da Tempestade flutuante com voo e relâmpagos."
  },
  "Talisman of Pure Good": {
    pt: "Talisman do Bem Puro",
    desc: "Requer sintonia por um personagem Bom. Possui 7 cargas e permite abrir uma fenda sob um personagem Mau a até 36 metros, destruindo-o se falhar num salvamento de Destreza CD 20."
  },
  "Ring of Three Wishes": {
    pt: "Anel dos Três Desejos",
    desc: "Este anel de ouro possui 3 gemas brilhantes. Cada gema permite a você conjurar a magia Desejo. O anel perde seus poderes quando todas as gemas forem gastas."
  },
  "Talisman of the Sphere": {
    pt: "Talisman da Esfera",
    desc: "Requer sintonia. Este amuleto dobra o seu bônus de Inteligência (Arcana) feito para controlar uma Esfera de Aniquilação e reduz as chances de perder o controle sobre ela."
  },
  "Luxon Beacon": {
    pt: "Farol de Luxon",
    desc: "Esta grande runa geométrica de metal e cristal brilha intensamente e permite a criaturas próximas acumular fragmentos de destino (d20 adicionais para usar em testes)."
  },
  "Ioun Stone (Mastery)": {
    pt: "Pedra de Ioun (Domínio)",
    desc: "Requer sintonia. Esta gema orbita sua cabeça e aumenta o seu Bônus de Proficiência em +1 permanentemente enquanto estiver ativa."
  },
  "Horn of Beckoning Death": {
    pt: "Corneta da Morte Chamada",
    desc: "Ao soprar esta corneta, você pode invocar espectros ou zumbis sob seu comando a partir de cadáveres próximos."
  },
  "Defender": {
    pt: "Defensora",
    desc: "Requer sintonia. Ao atacar com esta espada +3, você pode decidir transferir parte do bônus mágico de ataque (+1, +2 ou +3) para somar na sua Classe de Armadura até o seu próximo turno."
  },
  "Ioun Stone (Greater Absorption)": {
    pt: "Pedra de Ioun (Absorção Maior)",
    desc: "Requer sintonia. Esta pedra orbita sua cabeça e pode absorver magias direcionadas a você de até 8º nível, anulando-as, até um limite de 50 níveis acumulados."
  },
  "Ring of Water Elemental Command": {
    pt: "Anel de Comando do Elemental da Água",
    desc: "Requer sintonia. Concede velocidade de nado e habilidade de respirar na água. Ao ajudar a matar um elemental da água, concede imunidade a gelo e magias de água."
  },
  "Ring of Air Elemental Command": {
    pt: "Anel de Comando do Elemental do Ar",
    desc: "Requer sintonia. Concede imunidade a dano de queda e velocidade de voo temporária. Ao ajudar a matar um elemental do ar, concede imunidade a eletricidade e rajadas de vento."
  },
  "Tome of the Stilled Tongue": {
    pt: "Livro da Língua Calada",
    desc: "Requer sintonia por um Mago. Este grimório permite que você conjure uma magia escrita nele como uma ação bônus uma vez por dia, ignorando os componentes verbais e somáticos."
  },
  "Armor, +3 Chain Shirt": {
    pt: "Camisão de Cota de Malha +3",
    desc: "Esta cota de malha leve concede um bônus de +3 na CA, oferecendo Classe de Armadura total de 16 + seu modificador de Destreza (máx +2)."
  },
  "Armor of Invulnerability": {
    pt: "Armadura da Invulnerabilidade",
    desc: "Requer sintonia. Concede a você resistência a dano físico não-mágico. Permite também usar uma ação para se tornar completamente imune a todo dano não-mágico por 10 minutos."
  },
  "Reaper's Scream": {
    pt: "Grito do Ceifador",
    desc: "Requer sintonia. Este mangual +2 com a runa da morte causa dano necrótico em vez de físico e desintegra inimigos abatidos por ele."
  },
  "Danoth's Visor": {
    pt: "Visor de Danoth",
    desc: "Requer sintonia. Estes óculos concedem visão no escuro, capacidade de ver através de paredes (raio-X), detectar ilusões e conjurar Campo Antimagia uma vez por dia."
  },
  "Blood Fury Tattoo": {
    pt: "Tatuagem da Fúria de Sangue",
    desc: "Requer sintonia. Esta tatuagem possui 10 cargas. Permite que você cause +4d6 de dano necrótico em ataques e se cure com o dano, ou realize um contra-ataque corpo a corpo como reação."
  },
  "Dragon-Touched Focus (Ascendant)": {
    pt: "Foco Tocado pelo Dragão (Ascendente)",
    desc: "Requer sintonia por conjurador. Concede +3 de bônus nas jogadas de ataque de magia e CD de salvamento, além de causar +1d8 de dano elemental extra."
  },
  "Vorpal Sword": {
    pt: "Espada Vorpal",
    desc: "Requer sintonia. Esta arma +3 ignora resistência a corte. Ao rolar um 20 natural na jogada de ataque, você decepa instantaneamente a cabeça do alvo, matando-o na hora se ele precisar dela."
  },
  "Horn of Valhalla (Iron)": {
    pt: "Corneta de Valhalla (Ferro)",
    desc: "Você pode soprar esta corneta para invocar espíritos guerreiros de Ysgard que lutam por você por 1 hora. Esta corneta de ferro invoca guerreiros implacáveis."
  },
  "Nightfall Pearl": {
    pt: "Pérola do Anoitecer",
    desc: "Esta pérola escura permite conjurar a magia Escuridão ou criar uma névoa que cega inimigos e oculta aliados."
  },
  "Crystal Ball of Mind Reading": {
    pt: "Bola de Cristal de Leitura de Mentes",
    desc: "Requer sintonia. Funciona como uma Bola de Cristal comum, mas permite conjurar Detectar Pensamentos na criatura observada para ler seus pensamentos mais profundos."
  },
  "Spell Bottle": {
    pt: "Garrafa de Feitiços",
    desc: "Requer sintonia. Esta garrafa de vidro pode ser usada para interceptar e aprisionar uma magia de até 5º nível conjurada contra você, permitindo que você a libere posteriormente."
  },
  "Hither-Thither Staff": {
    pt: "Cajado de Hither-Thither",
    desc: "Requer sintonia. Este cajado permite que você use uma ação para abrir portais de teletransporte instantâneos ligando duas localizações visíveis a até 36 metros de você."
  },
  "Armor, +3 Leather": {
    pt: "Armadura de Couro +3",
    desc: "Esta armadura de couro leve concede um bônus de +3 na CA, oferecendo Classe de Armadura total de 14 + seu modificador de Destreza."
  },
  "Robe of the Archmagi": {
    pt: "Manto do Arquimago",
    desc: "Requer sintonia por Bruxo, Mago ou Feiticeiro. Este manto concede CA de 15 + Destreza, vantagem em salvamentos contra magias e aumenta a CD de suas magias e jogadas de ataque de magia em +2."
  },
  "Armor, +3 Splint": {
    pt: "Armadura de Placas Recortadas +3",
    desc: "Esta armadura pesada concede um bônus de +3 na CA, oferecendo Classe de Armadura total de 20."
  },
  "Sphere of Annihilation": {
    pt: "Esfera de Aniquilação",
    desc: "Um buraco negro flutuante de 60 cm de diâmetro. Qualquer matéria que entre em contato com a esfera é destruída e desintegrada instantaneamente. Pode ser controlada mentalmente."
  },
  "Armor of Resistance (Plate)": {
    pt: "Armadura de Placas de Resistência",
    desc: "Requer sintonia. Esta armadura +1 de placas completa concede a você resistência a um tipo específico de dano elemental."
  }
};

export { TABLE_I_TRANSLATIONS };

const TABLE_H_TRANSLATIONS = {
  "Cauldron of Rebirth": {
    pt: "Caldeirão do Renascimento",
    desc: "Requer sintonia. Este caldeirão de metal pesado permite a você criar uma Poção de Cura Maior uma vez por dia, ou reviver uma criatura morta colocada dentro dele sob os efeitos da magia Reencarnação."
  },
  "Thunderbuss": {
    pt: "Bacamarte do Trovão",
    desc: "Arma (Pistola), muito rara. Esta arma mágica não exige munição, causa dano de trovão e concede +1 de bônus em jogadas de ataque e dano. Permite disparar uma esfera explosiva de 3d6 de dano de trovão uma vez por dia."
  },
  "Crystalline Chronicle": {
    pt: "Crônica Cristalina",
    desc: "Requer sintonia por um Mago. Este livro de cristal serve como grimório e foco arcano. Ele permite a você conjurar magias e rolar dados de Inteligência com bônus extras."
  },
  "Rod of the Pact Keeper, +3": {
    pt: "Bastão do Guardião do Pacto +3",
    desc: "Requer sintonia por Bruxo. Concede um bônus de +3 nas jogadas de ataque de magia e na CD de salvamento de suas magias de bruxo. Além disso, você pode recuperar um espaço de magia de bruxo com uma ação uma vez por dia."
  },
  "Oathbow": {
    pt: "Arco do Juramento",
    desc: "Requer sintonia. Ao puxar a corda deste arco e sussurrar um juramento jurando vingança contra um inimigo, o alvo se torna seu Inimigo Jurado. Seus ataques contra ele ignoram cobertura e causam +3d6 de dano perfurante extra."
  },
  "Absorbing Tattoo": {
    pt: "Tatuagem de Absorção",
    desc: "Requer sintonia. Esta tatuagem mágica de linhas fluidas concede a você resistência a um tipo de dano elemental específico. Permite também usar sua reação para ganhar imunidade temporária àquele tipo de dano."
  },
  "Djinni's Bracers": {
    pt: "Braceletes do Djinni",
    desc: "Requer sintonia (Amaldiçoado). Concede +1 na CA e permite conjurar magias como Incompatibilidade ou Forma Gasosa. Enquanto os usar, você não pode removê-los e qualquer comando que comece com 'Eu desejo...' age como uma magia Sugestão contra você."
  },
  "Hunter's Coat": {
    pt: "Casaco do Caçador",
    desc: "Requer sintonia. Este casaco de couro concede +1 na CA. Possui 3 cargas e permite que você cause +1d10 de dano necrótico extra a uma criatura machucada ao atingi-la com um ataque."
  },
  "Elven Thrower": {
    pt: "Arremessador Élfico",
    desc: "Requer sintonia por um Elfo ou Meio-Elfo. Esta arma mágica de arremesso concede +3 de bônus em ataques e dano, e retorna automaticamente para sua mão após ser arremessada."
  },
  "Last Stand Armor": {
    pt: "Armadura da Última Resistência",
    desc: "Esta armadura de metal impede que você morra instantaneamente por dano massivo. Se você cair a 0 HP, ela se quebra, mas estabiliza você na hora e cura 2d10 pontos de vida."
  },
  "Prehistoric Figurine of Wondrous Power (Carnelian Triceratops)": {
    pt: "Estatueta Pré-Histórica de Poder Maravilhoso (Tricerátops de Cornalina)",
    desc: "Ao ser arremessada, esta estatueta se transforma em um Tricerátops aliado leal por até 24 horas. Pode ser usada uma vez a cada 7 dias."
  },
  "Animated Shield": {
    pt: "Escudo Animado",
    desc: "Requer sintonia. Enquanto empunha este escudo, você pode usar uma ação bônus para fazê-lo flutuar ao seu redor por 1 minuto, protegendo você enquanto deixa suas duas mãos livres."
  },
  "Dwarven Plate": {
    pt: "Placas Anãs",
    desc: "Esta armadura de placas completa forjada por anões concede um bônus de +2 na CA e impede que você seja empurrado ou derrubado contra sua vontade."
  },
  "Staff of Thunder and Lightning": {
    pt: "Cajado do Trovão e do Relâmpago",
    desc: "Requer sintonia. Este cajado mágico serve como arma e permite a você conjurar relâmpagos (CD 15, 8d6 de dano) ou causar explosões de som ensurdecedoras."
  },
  "Mage's Diadem": {
    pt: "Diadema do Mago",
    desc: "Requer sintonia. Sempre que você conjurar uma magia, você ganha pontos de vida temporários iguais ao nível da magia. Permite também armazenar uma magia de contingência de até 5º nível."
  },
  "Horn of Valhalla (Bronze)": {
    pt: "Corneta de Valhalla (Bronze)",
    desc: "Você pode soprar esta corneta para invocar espíritos guerreiros de Ysgard que lutam por você por 1 hora. Esta corneta invoca guerreiros armados com armas de bronze."
  },
  "Manual of Gainful Exercise": {
    pt: "Manual de Exercícios Benéficos",
    desc: "Ao ler este manual por 48 horas ao longo de 6 dias, seu valor de Força aumenta em 2 e seu valor máximo para esse atributo também aumenta em 2 permanentemente."
  },
  "Nimbus Coronet": {
    pt: "Coroa de Nimbus",
    desc: "Requer sintonia. Esta coroa de bronze concede imunidade a dano de queda. Permite também invocar a runa da nuvem para assumir uma forma de névoa flutuante com velocidade de voo de 18 metros."
  },
  "Ioun Stone*": {
    pt: "Pedra de Ioun*",
    desc: "Esta pedra mágica orbita sua cabeça e concede benefícios como bônus de atributos, proficiência ou regeneração conforme o tipo."
  },
  "Wand of Polymorph": {
    pt: "Varinha de Polimorfia",
    desc: "Requer sintonia por um conjurador. Esta varinha tem 7 cargas e permite conjurar a magia Polimorfia (CD 15) gastando cargas."
  },
  "Cloak of Arachnida": {
    pt: "Manto de Aracnídeo",
    desc: "Requer sintonia. Concede a você resistência a dano de veneno, velocidade de escalada igual à sua velocidade de caminhada, imunidade a ser preso por teias e permite conjurar a magia Teia (CD 15)."
  },
  "All-Purpose Tool, +3": {
    pt: "Ferramenta Multiuso +3",
    desc: "Requer sintonia por Artífice. Concede +3 em jogadas de ataque e CD de magias de artífice. Pode se transformar em qualquer ferramenta e conceder um truque temporário."
  },
  "Ghost Step Tattoo": {
    pt: "Tatuagem do Passo Fantasma",
    desc: "Requer sintonia. Esta tatuagem mágica possui 3 cargas e permite que você use uma ação bônus para se tornar intangível, passando por objetos e ganhando resistência a dano físico por 1 rodada."
  },
  "Rod of Security": {
    pt: "Bastão de Segurança",
    desc: "Ao ativar este bastão de ouro, você e até 199 outras criaturas são transportadas para um paraíso extradimensional seguro onde ninguém envelhece e alimentos e curas são abundantes por tempo limitado."
  },
  "Dancing Sword": {
    pt: "Espada Dançarina",
    desc: "Requer sintonia. Você pode usar uma ação bônus para fazer esta espada mágica flutuar e atacar de forma autônoma a até 9 metros de você por 4 rodadas."
  },
  "Arctic Ring": {
    pt: "Anel Ártico",
    desc: "Requer sintonia. Concede imunidade a dano de frio e permite ignorar terreno difícil de gelo. Possui 3 cargas para conjurar Tempestade de Gelo ou Cone de Frio (CD 17)."
  },
  "Ring of Telekinesis": {
    pt: "Anel de Telecinese",
    desc: "Requer sintonia. Enquanto estiver usando este anel, você pode conjurar a magia Telecinese (CD 15) à vontade contra objetos não portados."
  },
  "Amulet of the Planes": {
    pt: "Amuleto dos Planos",
    desc: "Requer sintonia. Este amuleto permite a você tentar conjurar a magia Viagem Planar (CD 15 Inteligência). Em caso de falha, você e seus aliados são teleportados para uma localização aleatória."
  },
  "Mistral Mantle": {
    pt: "Manto de Mistral",
    desc: "Requer sintonia. Concede resistência a dano de frio. Permite usar sua reação para causar 1d6 de dano de frio a criaturas que se aproximem a menos de 1,5 metros."
  },
  "Spider's Kiss": {
    pt: "Beijo da Aranha",
    desc: "Requer sintonia. Este arco longo concede +1d8 de dano de veneno em acertos e dá imunidade a veneno ao portador. Possui 3 cargas para prender inimigos em teias (CD 15 de Destreza)."
  },
  "Mirror of Life Trapping": {
    pt: "Espelho de Aprisionar Vidas",
    desc: "Este espelho mágico possui 12 compartimentos extradimensionais. Qualquer criatura que olhe para o espelho a até 9 metros deve passar num salvamento de Carisma CD 15 ou ficará presa dentro dele."
  },
  "Scaled Ornament (Wakened)": {
    pt: "Ornamento Escamoso (Desperto)",
    desc: "Requer sintonia. Concede +1 na CA, imunidade a ser enfeitiçado ou amedrontado, resistência elemental e permite causar dano extra."
  },
  "Candle of Invocation": {
    pt: "Vela de Invocação",
    desc: "Esta vela dedicada a um alinhamento específico queima por 4 horas. Enquanto estiver acesa, criaturas do mesmo alinhamento num raio de 9 metros ganham vantagem em jogadas e salvamentos, e clérigos podem conjurar magias sem gastar espaços de magia."
  },
  "Armor of Resistance*": {
    pt: "Armadura de Resistência*",
    desc: "Requer sintonia. Concede resistência a um tipo específico de dano elemental determinado na criação da armadura."
  },
  "Scimitar of Speed": {
    pt: "Cimitarra da Velocidade",
    desc: "Requer sintonia. Esta cimitarra +2 permite que você realize um ataque com ela como uma ação bônus em cada um de seus turnos."
  },
  "Sanctum Amulet": {
    pt: "Amuleto do Santuário",
    desc: "Requer sintonia. Concede resistência a dano necrótico e permite conjurar o truque Poupar os Mortos. Se um aliado próximo cair a 0 HP, você pode usar sua reação para deixá-lo com 1 HP."
  },
  "Sapphire Buckler": {
    pt: "Broquel de Safira",
    desc: "Requer sintonia. Este escudo de escamas de dragão de safira concede +2 na CA e resistência a dano psíquico e trovejante. Permite usar sua reação para contra-atacar com 2d6 de dano de frio."
  },
  "Duskcrusher": {
    pt: "Esmaga-Crepúsculo",
    desc: "Requer sintonia. Este martelo de guerra mágico causa +2 nas jogadas, causa dano radiante no lugar de físico e emite luz solar. Causa +1d8 necrótico contra mortos-vivos e permite conjurar Raio de Sol uma vez ao dia."
  },
  "Robe of Scintillating Colors": {
    pt: "Manto de Cores Cintilantes",
    desc: "Requer sintonia. Este manto possui 3 cargas. Com uma ação, você faz o manto brilhar com padrões ondulantes de luzes, fazendo com que ataques contra você tenham desvantagem e cegando criaturas próximas."
  },
  "Robe of Stars": {
    pt: "Manto de Estrelas",
    desc: "Requer sintonia. Este manto permite que você se teleporte para o Plano Astral como uma ação. Ele também permite disparar mísseis mágicos de 5º nível gastando estrelas bordadas."
  },
  "Belt of Stone Giant Strength": {
    pt: "Cinto de Força do Gigante de Pedra",
    desc: "Requer sintonia. Seu valor de Força se torna 23 enquanto você estiver usando este cinto de couro runado."
  },
  "Belt of Frost Giant Strength": {
    pt: "Cinto de Força do Gigante do Gelo",
    desc: "Requer sintonia. Seu valor de Força se torna 23 enquanto você estiver usando este cinto de couro runado."
  },
  "Armor of Safeguarding": {
    pt: "Armadura de Salvaguarda",
    desc: "Requer sintonia. Esta armadura pesada aumenta seu HP máximo em 10 + seu nível. Permite também conjurar Farol de Esperança uma vez ao dia sem exigir concentração."
  },
  "Arcane Cannon": {
    pt: "Canhão Arcano",
    desc: "Este pequeno canhão de ferro mágico pode ser apontado e disparado como uma ação, liberando uma rajada de energia elemental que causa 8d6 de dano em cone."
  },
  "Sojourner's Flute": {
    pt: "Flauta do Viajante",
    desc: "Requer sintonia. Esta flauta possui 3 cargas. Tocar uma melodia permite teleportar você e aliados próximos de volta para o último local onde você tocou a melodia."
  },
  "Barrier Tattoo (AC 18)": {
    pt: "Tatuagem de Barreira (CA 18)",
    desc: "Requer sintonia. Esta tatuagem complexa e densa concede a você uma CA de 18 (e limite de +2 de Destreza) caso você não esteja usando armadura."
  },
  "Sword of Sharpness": {
    pt: "Espada da Afiação",
    desc: "Requer sintonia. Ao rolar um 20 na jogada de ataque com esta espada mágica, ela causa 14 de dano extra. Ao rolar outro d20, você pode cortar um membro do alvo."
  },
  "Rod of Absorption": {
    pt: "Bastão de Absorção",
    desc: "Requer sintonia. Este bastão permite que você use sua reação para absorver uma magia direcionada a você, anulando o efeito da magia e acumulando cargas que podem ser usadas para conjurar suas próprias magias."
  },
  "Weapon, +3": {
    pt: "Arma +3",
    desc: "Esta arma mágica concede um bônus de +3 nas jogadas de ataque e dano feitas com ela."
  },
  "Dragon's Scepter": {
    pt: "Cetro do Dragão",
    desc: "Requer sintonia. Este cetro permite aprisionar um dragão de forma similar à magia Aprisionamento. Concede cargas para conjurar Medo ou Voo e usar o sopro do dragão aprisionado."
  },
  "Ring of Shadows": {
    pt: "Anel de Sombras",
    desc: "Requer sintonia. Enquanto estiver na penumbra ou escuridão, concede resistência a dano físico não-mágico, permite se teleportar a até 9 metros como ação bônus e ficar invisível."
  },
  "Survivor's Armor": {
    pt: "Armadura do Sobrevivente",
    desc: "Requer sintonia. Esta armadura concede vantagem em salvamentos contra morte e cura você em 1d6 HP no início de cada um dos seus turnos se você estiver com menos da metade da vida."
  },
  "Armor, +1*": {
    pt: "Armadura +1*",
    desc: "Você ganha um bônus de +1 na Classe de Armadura (CA) enquanto estiver usando esta armadura mágica."
  },
  "Bloodshed Blade": {
    pt: "Lâmina do Derramamento de Sangue",
    desc: "Requer sintonia. Esta arma mágica permite gastar dados de vida ao atingir um alvo para causar dano necrótico massivo extra."
  },
  "Spellguard Shield": {
    pt: "Escudo Protetor contra Magia",
    desc: "Requer sintonia. Enquanto empunha este escudo, você ganha vantagem em salvamentos contra magias e ataques de magia contra você sofrem desvantagem."
  },
  "Angel's Heart": {
    pt: "Coração de Anjo",
    desc: "Requer sintonia. Este amuleto possui 7 cargas e permite conjurar magias sagradas como Escudo da Fé, Visão Verdadeira ou Divinação."
  },
  "Rod of Alertness": {
    pt: "Bastão de Alerta",
    desc: "Requer sintonia. Concede a você vantagem em testes de Percepção e Iniciativa. Permite fincar o bastão no chão para criar uma aura protetora de +1 na CA e salvamentos para aliados."
  },
  "Animated Painting": {
    pt: "Pintura Animada",
    desc: "Uma pintura em tela que obedece seus comandos de voz para animar e se mover, agindo como batedor ou criando distrações realistas."
  },
  "Carpet of Flying": {
    pt: "Tapete Voador",
    desc: "Este tapete mágico pode flutuar e voar sob comando de voz, carregando peso e se movendo a uma velocidade de voo determinada pelo tamanho do tapete."
  },
  "Dragon-Touched Focus (Wakened)": {
    pt: "Foco Tocado pelo Dragão (Desperto)",
    desc: "Requer sintonia por conjurador. Concede +2 de bônus em ataques de magia e CD de salvamento, além de causar +1d6 de dano elemental extra."
  },
  "Bladesinger's Spear": {
    pt: "Lança do Cantor das Lâminas",
    desc: "Requer sintonia por um Cantor das Lâminas. Esta lança mágica serve como foco arcano e concede bônus em sua CA e testes de concentração enquanto sua Cantiga das Lâminas estiver ativa."
  },
  "Figurine of Wondrous Power (Obsidian Steed)": {
    pt: "Estatueta de Poder Maravilhoso (Corcel de Obsidiana)",
    desc: "Esta estatueta de obsidiana se transforma em um Pesadelo (Nightmare) aliado leal por até 24 horas. Há chance de o corcel se rebelar contra você."
  },
  "Shield, +3": {
    pt: "Escudo +3",
    desc: "Enquanto empunha este escudo mágico, você ganha +3 de bônus na CA além do bônus normal do escudo (+5 CA no total)."
  },
  "Staff of Fire": {
    pt: "Cajado do Fogo",
    desc: "Requer sintonia por um conjurador. Este cajado possui 10 cargas e permite conjurar magias de fogo como Mãos Flamejantes, Bola de Fogo ou Parede de Fogo gastando cargas."
  },
  "Nine Lives Stealer": {
    pt: "Roubadora de Nove Vidas",
    desc: "Requer sintonia. Esta espada +2 possui 1d9 cargas. Ao obter um 20 natural em uma criatura com menos de 100 HP, a criatura morre instantaneamente se falhar num salvamento de Constituição CD 15."
  },
  "Crystal Ball": {
    pt: "Bola de Cristal",
    desc: "Requer sintonia. Esta esfera permite que você conjure a magia Vidência (Scrying) à vontade para observar locais e criaturas distantes."
  },
  "Lifewell Tattoo": {
    pt: "Tatuagem do Poço de Vida",
    desc: "Requer sintonia. Concede resistência a dano necrótico. Uma vez por dia, se você cair a 0 HP, você cai a 1 HP no lugar."
  },
  "Demon Armor": {
    pt: "Armadura de Demônio",
    desc: "Requer sintonia. Esta armadura +1 amaldiçoada faz seus ataques desarmados causarem 1d8 de dano mágico garra, mas impõe desvantagem em ataques contra demônios."
  },
  "Katana of the Deathtouched": {
    pt: "Katana dos Tocados pela Morte",
    desc: "Requer sintonia. Esta espada longa mágica causa +1d10 de dano necrótico extra em cada acerto e drena a energia dos alvos."
  },
  "Tome of Leadership and Influence": {
    pt: "Livro de Liderança e Influência",
    desc: "Ler este livro por 48 horas aumenta seu valor de Carisma em 2 e seu limite máximo para esse atributo em 2 permanentemente."
  },
  "Efreeti Bottle": {
    pt: "Garrafa do Efreeti",
    desc: "Esta garrafa de latão contém um Efreeti aprisionado. Abrir a garrafa liberta o gênio, que pode lutar por você, conceder desejos ou tentar matar você dependendo da rolagem."
  },
  "Dwarven Thrower": {
    pt: "Arremessador Anão",
    desc: "Requer sintonia por um Anão. Este martelo +3 causa +1d8 de dano extra (ou +2d8 contra gigantes) e retorna automaticamente para sua mão quando arremessado."
  },
  "Staff of Dunamancy": {
    pt: "Cajado de Dunamancia",
    desc: "Requer sintonia por um conjurador. Este cajado permite manipular a gravidade e o tempo, concedendo bônus em magias de dunamancia."
  },
  "Manual of Bodily Health": {
    pt: "Manual de Saúde Corporal",
    desc: "Ler este manual por 48 horas aumenta seu valor de Constituição em 2 e seu valor máximo para esse atributo em 2 permanentemente."
  },
  "Staff of Striking": {
    pt: "Cajado do Golpe",
    desc: "Requer sintonia. Este cajado +3 possui 10 cargas. Ao acertar um ataque físico com ele, você pode gastar cargas para causar +1d6 de dano de força extra por carga gasta."
  },
  "Amulet of the Devout, +3": {
    pt: "Amuleto do Devoto +3",
    desc: "Requer sintonia por Clérigo ou Paladino. Concede +3 de bônus em jogadas de ataque de magia e CD de salvamento de suas magias. Permite usar Canalização de Divindade uma vez extra."
  },
  "Bloodaxe": {
    pt: "Machado de Sangue",
    desc: "Requer sintonia. Este machado +2 causa +1d6 de dano necrótico extra. Ao reduzir uma criatura a 0 HP, você ganha 10 pontos de vida temporários."
  },
  "Helm of Brilliance": {
    pt: "Elmo de Brilhantismo",
    desc: "Requer sintonia. Este elmo é cravejado de gemas mágicas que podem ser removidas para conjurar magias de fogo e luz, ou usadas para causar dano radiante extra com armas."
  },
  "Iceshard Whip": {
    pt: "Chicote do Estilhaço de Gelo",
    desc: "Requer sintonia. Este chicote +2 causa +1d6 de dano de frio extra e pode congelar e imobilizar inimigos temporariamente."
  },
  "Staff of Power": {
    pt: "Cajado do Poder",
    desc: "Requer sintonia por um conjurador. Este cajado +2 concede +2 na CA e salvamentos. Possui 20 cargas para conjurar diversas magias poderosas, ou pode ser quebrado para desencadear uma explosão retributiva massiva."
  },
  "Adamantine Armor*": {
    pt: "Armadura de Adamantina*",
    desc: "Esta armadura de metal é reforçada com adamantina. Qualquer acerto crítico desferido contra você torna-se um acerto normal."
  },
  "Wand of the War Mage, +3": {
    pt: "Varinha do Mago de Guerra +3",
    desc: "Requer sintonia por um conjurador. Enquanto empunha esta varinha, você ganha +3 de bônus nas jogadas de ataque de magia e ignora cobertura meio-obstáculo e três-quartos."
  },
  "Arcane Grimoire, +3": {
    pt: "Grimório Arcano +3",
    desc: "Requer sintonia por um Mago. Concede +3 de bônus em jogadas de ataque de magia e CD de salvamento de mago, além de melhorar sua Recuperação Arcana."
  },
  "Dragonhide Belt": {
    pt: "Cinto de Couro de Dragão +3",
    desc: "Requer sintonia por Monge. Concede +3 de bônus na CD de salvamento de suas técnicas de Ki e permite a você recuperar pontos de Ki com dados de vida."
  },
  "Frost Brand": {
    pt: "Marca do Gelo",
    desc: "Requer sintonia. Esta espada mágica causa +1d6 de dano de frio extra em acertos e concede a você resistência a dano de fogo."
  },
  "Manual of Quickness of Action": {
    pt: "Manual de Rapidez de Ações",
    desc: "Ler este manual por 48 horas aumenta seu valor de Destreza em 2 e seu limite máximo para esse atributo em 2 permanentemente."
  },
  "Manual of Golems": {
    pt: "Manual dos Golens",
    desc: "Este livro contém informações necessárias para criar um tipo específico de Golem de metal, barro, pedra ou carne ao longo de vários dias e custo de ouro."
  },
  "Tome of Clear Thought": {
    pt: "Grimório de Pensamentos Claros",
    desc: "Ler este livro por 48 horas aumenta seu valor de Inteligência em 2 e seu limite máximo para esse atributo em 2 permanentemente."
  },
  "Dragon's Wrath Weapon (Wakened)": {
    pt: "Arma da Ira do Dragão (Desperta)",
    desc: "Requer sintonia. Esta arma +2 causa +2d6 de dano elemental de dragão em cada acerto e pode liberar sopros de energia em críticos."
  },
  "Dragon Vessel (Wakened)": {
    pt: "Vaso do Dragão (Desperto)",
    desc: "Requer sintonia. Permite criar Poções de Cura Superior uma vez por dia e concede resistência a um tipo de dano elemental."
  },
  "Ring of Legendary Resistance": {
    pt: "Anel de Resistência Lendária",
    desc: "Requer sintonia. Este anel permite que você passe automaticamente em um salvamento falhado uma vez por dia."
  },
  "Amethyst Lodestone": {
    pt: "Magnetita de Ametista",
    desc: "Requer sintonia. Esta pedra de gravidade permite manipular o peso e atrair ou repelir objetos e criaturas metálicas."
  },
  "Belt of Fire Giant Strength": {
    pt: "Cinto de Força do Gigante de Fogo",
    desc: "Requer sintonia. Seu valor de Força se torna 25 enquanto você estiver usando este cinto de couro runado."
  },
  "Key to Anywhere": {
    pt: "Chave para Qualquer Lugar",
    desc: "Esta chave se adapta a qualquer fechadura. Ao girá-la, cria um portal planar ligando a porta a qualquer outro portal ou porta planar por 10 minutos."
  },
  "Armor, +2*": {
    pt: "Armadura +2*",
    desc: "Você ganha um bônus de +2 na Classe de Armadura (CA) enquanto estiver usando esta armadura mágica."
  },
  "Bag of Monsters": {
    pt: "Bolsa de Monstros",
    desc: "Requer sintonia. Esta bolsa contém gobbets de carne que podem ser arremessados para invocar monstros e feras bizarras sob seu comando."
  },
  "Moon Sickle, +3": {
    pt: "Foice Lunar +3",
    desc: "Requer sintonia por Druida ou Patrulheiro. Concede +3 em jogadas de ataque, dano, magias de ataque e CD de magias. Adiciona +1d4 nas curas."
  },
  "Tome of Understanding": {
    pt: "Grimório de Compreensão",
    desc: "Ler este grimório por 48 horas aumenta seu valor de Sabedoria em 2 e seu limite máximo para esse atributo em 2 permanentemente."
  },
  "Orb of the Veil": {
    pt: "Orbe do Véu",
    desc: "Requer sintonia (Amaldiçoado). Concede +2 de Wisdom, visão no escuro de 18 metros e vantagem para achar portas secretas. Apaga chamas mundanas e corta dano de fogo pela metade."
  },
  "Instrument of the Bards (Anstruth Harp)": {
    pt: "Instrumento dos Bardos (Harpa Anstruth)",
    desc: "Requer sintonia por Bardo. Permite conjurar magias poderosas (como Controlar Clima, Confusão, Levitação, etc.) e impõe desvantagem em salvamentos contra seus encantos."
  },
  "Ring of Regeneration": {
    pt: "Anel de Regeneração",
    desc: "Requer sintonia. Enquanto estiver usando este anel, você recupera 1d6 pontos de vida a cada 10 minutos."
  },
  "Mithrandine Armor": {
    pt: "Armadura de Mitrandina",
    desc: "Esta armadura de mitral reforçada com adamantina não impõe desvantagem em Furtividade, não tem requisito de Força e torna acertos críticos em normais."
  },
  "Bloodwell Vial, +3": {
    pt: "Frasco do Poço de Sangue +3",
    desc: "Requer sintonia por Feiticeiro. Concede +3 de bônus em jogadas de ataque de magia e CD de feiticeiro, além de recuperar pontos de feitiçaria."
  },
  "Staff of Frost": {
    pt: "Cajado do Gelo",
    desc: "Requer sintonia por um conjurador. Este cajado possui 10 cargas e permite conjurar magias de gelo como Névoa Sombria, Tempestade de Gelo ou Cone de Frio gastando charges."
  },
  "Spellbreaker's Axe": {
    pt: "Machado do Quebra-Feitiços",
    desc: "Requer sintonia. Este machado mágico concede vantagem em salvamentos contra magias e pode dissipar efeitos mágicos de alvos atingidos."
  },
  "Tonguelasher": {
    pt: "Açoita-Língua",
    desc: "Esta arma mágica causa +1d8 de dano psíquico e impõe desvantagem no próximo salvamento do alvo atingido até o fim do seu próximo turno."
  },
  "Ring of Shooting Stars": {
    pt: "Anel de Estrelas Cadentes",
    desc: "Requer sintonia. Este anel permite conjurar globos de luz brilhante ou liberar estrelas cadentes explosivas (faíscas elétricas de 4d12) na escuridão."
  },
  "Lucent Destroyer": {
    pt: "Destruidor Luzente",
    desc: "Requer sintonia. Este mosquete de três canos não precisa de munição, causa dano radiante, ignora carregamento e permite conjurar Raio de Sol uma vez ao dia."
  },
  "Wyrmreaver Gauntlets": {
    pt: "Manoplas do Caçador de Wyrms",
    desc: "Requer sintonia. Seus ataques desarmados causam +1d6 de dano de força e ganham alcance de 9 metros temporariamente. Concede também uma resistência elemental à sua escolha por dia."
  },
  "Rhythm-Maker's Drum, +3": {
    pt: "Tambor do Criador de Ritmo +3",
    desc: "Requer sintonia por Bardo. Concede +3 de bônus em jogadas de ataque de magia e CD de bardo, além de permitir recuperar um uso de Inspiração Bárdica."
  },
  "Glove of the Woodland": {
    pt: "Luva das Terras Florestais",
    desc: "Requer sintonia. Feras e plantas têm dificuldade para atacar você. Possui 7 cargas para conjurar magias de floresta como Enredar ou Passo de Árvore."
  },
  "Ring of Amity": {
    pt: "Anel da Amizade",
    desc: "Requer sintonia. Cria um vínculo com um aliado voluntário. Enquanto o vínculo durar, qualquer cura mágica que você receber também cura o aliado bonded."
  },
  "Temporal Amulet": {
    pt: "Amuleto Temporal",
    desc: "Requer sintonia. Possui 3 cargas. Permite usar sua reação para voltar no tempo até sua posição inicial do turno de um inimigo, recuperando HP e removendo debuffs sofridos."
  },
  "Dragon Scale Mail": {
    pt: "Cota de Escamas de Dragão",
    desc: "Requer sintonia. Esta armadura de escamas de dragão concede +1 na CA, vantagem em salvamentos contra sopro de dragão e resistência ao elemento correspondente."
  },
  "Assassin's Blade": {
    pt: "Lâmina do Assassino",
    desc: "Esta adaga concede vantagem em jogadas de ataque contra qualquer criatura que ainda não tenha agido no combate e causa +2d6 de dano extra."
  }
};

export { TABLE_H_TRANSLATIONS };

const TABLE_G_TRANSLATIONS = {
  "Staff of Withering": {
    pt: "Cajado do Murchamento",
    desc: "Requer sintonia por Clérigo, Druida ou Bruxo. Este cajado concede um bônus de +1 nas jogadas de ataque e dano com ele. Possui 10 cargas. Ao acertar, você pode gastar até 3 cargas para causar 1d10 de dano necrótico extra por carga. Alvos humanos sofrem desvantagem em testes de Força e Constituição por 1 hora."
  },
  "Vicious Weapon": {
    pt: "Arma Viciosa",
    desc: "Quando você obtém um 20 natural na jogada de ataque com esta arma mágica, ela causa 7 de dano adicional do tipo da arma no alvo."
  },
  "Dragon Vessel (Stirring)": {
    pt: "Vaso do Dragão (Desperto)",
    desc: "Requer sintonia. Como uma ação, você pode fazer com que este vaso produza uma Poção de Cura Maior. Além disso, você ganha resistência a um tipo de dano elemental associado ao dragão."
  },
  "Phasing Slippers": {
    pt: "Sapatilhas de Fase",
    desc: "Requer sintonia. Enquanto usar estas sapatilhas, quando você realizar a ação de Ataque, pode se teleportar até 3 metros antes de cada ataque para um espaço desocupado que consiga ver."
  },
  "Ring of Protection": {
    pt: "Anel de Proteção",
    desc: "Requer sintonia. Enquanto estiver usando este anel mágico, você ganha +1 de bônus na sua Classe de Armadura (CA) e em todas as jogadas de salvamento."
  },
  "Shadowfell Shard": {
    pt: "Fragmento do Pendor das Sombras",
    desc: "Requer sintonia por um Feiticeiro. Pode ser usado como foco de conjuração. Quando você usa uma opção de Metamagia em uma magia, pode amaldiçoar uma criatura afetada, impondo desvantagem em testes de um atributo de sua escolha até o início do seu próximo turno."
  },
  "Cloak of the Bat": {
    pt: "Manto do Morcego",
    desc: "Requer sintonia. Enquanto estiver na penumbra ou escuridão, você tem vantagem em testes de Destreza (Furtividade) e ganha velocidade de voo de 12 metros, contanto que segure as pontas do manto com ambas as mãos. Permite também se transformar em um morcego comum uma vez por dia."
  },
  "Horn of Valhalla*": {
    pt: "Corneta de Valhalla",
    desc: "Você pode soprar esta corneta para invocar espíritos guerreiros de Ysgard que lutam por você por 1 hora. O tipo de guerreiro e número convocado variam conforme o material da corneta."
  },
  "Staff of Charming": {
    pt: "Cajado do Encantamento",
    desc: "Requer sintonia por um conjurador. Este cajado possui 10 cargas e permite conjurar Enfeitiçar Pessoa, Comando ou Cativar. Se você falhar em um salvamento contra uma magia de encantamento direcionada apenas a você, pode usar sua reação para fazer com que ela afete o conjurador original no seu lugar."
  },
  "Rod of Rimefrost": {
    pt: "Bastão de Rimefrost",
    desc: "Requer sintonia. Este bastão de gelo rúnico possui 7 cargas. Permite gastar cargas para criar um bloco de gelo de 1,5 metros, cobrir o chão com gelo escorregadio ou congelar e restringir uma criatura Large ou menor."
  },
  "Wand of the War Mage, +2": {
    pt: "Varinha do Mago de Guerra +2",
    desc: "Requer sintonia por um conjurador. Enquanto empunha esta varinha, você ganha +2 de bônus nas jogadas de ataque de magia. Além disso, você ignora cobertura meio-obstáculo e três-quartos ao fazer ataques de magia."
  },
  "Basilisk's Blade": {
    pt: "Lâmina do Basilisco",
    desc: "Requer sintonia. Esta adaga mágica possui 5 cargas. Ao acertar um ataque, gaste 1 carga para causar +2d6 de dano de veneno ou 3 cargas para forçar o alvo a passar num salvamento de Constituição CD 15 ou sofrerá os efeitos da magia Carne em Pedra."
  },
  "Hag's Delight": {
    pt: "Delícia da Bruxa",
    desc: "Um cachimbo de fumo mágico. Ao fumar este cachimbo continuamente por 1 minuto, você pode conjurar a magia Modificar Memória CD 21 em todas as criaturas num raio de 6 metros, alterando eventos que ocorreram nos últimos 10 minutos."
  },
  "Glamoured Studded Leather": {
    pt: "Couro Batido Ilusionista",
    desc: "Esta armadura de couro batido concede um bônus de +1 na CA. Como uma ação bônus, você pode fazer com que a armadura mude de aparência para parecer com qualquer outro tipo de vestimenta comum de sua escolha."
  },
  "Barrier Tattoo (AC 15)": {
    pt: "Tatuagem de Barreira (CA 15)",
    desc: "Requer sintonia. Esta tatuagem de linhas grossas e espiraladas concede a você uma Classe de Armadura igual a 15 + seu modificador de Destreza (limite de +2) caso você não esteja usando armadura."
  },
  "Lyre of Building": {
    pt: "Lira da Construção",
    desc: "Requer sintonia por um bardo. Enquanto toca esta lira, você pode realizar façanhas incríveis de construção ou reparação rapidamente. Uma vez por dia, você pode tocá-la para conjurar Muralha de Pedra ou Fabricar."
  },
  "Clockwork Sword": {
    pt: "Espada de Engrenagens",
    desc: "Requer sintonia. Esta empunhadura metálica dobra uma lâmina mágica como ação bônus. Uma vez por turno, ao acertar um inimigo, você causa +1d8 de dano elétrico, radiante ou de força e impõe cegueira, empurrão ou perda de reações. Há chance de falha crítica (1 no d8)."
  },
  "Smothering Cape": {
    pt: "Capa do Sufocamento",
    desc: "Requer sintonia. Esta capa mágica tem 33 HP. Ao sofrer dano de um ataque visto, você pode usar sua reação para transferir metade do dano para a capa. Permite também animar a capa para lutar e agarrar inimigos como um Tapete de Sufocamento."
  },
  "Outer Essence Shard*": {
    pt: "Fragmento de Essência Exterior",
    desc: "Requer sintonia por Feiticeiro. Pode ser usado como foco. Quando você usa Metamagia em uma magia, você desencadeia um efeito associado ao alinhamento do fragmento (como curar um aliado ou causar dano necrótico extra)."
  },
  "Flame Tongue": {
    pt: "Língua flamejante",
    desc: "Requer sintonia. Com uma ação bônus, você faz labaredas brotarem da lâmina desta arma mágica. Enquanto estiver flamejante, ela causa 2d6 de dano de fogo adicional em cada acerto e emite luz brilhante."
  },
  "Helm of Teleportation": {
    pt: "Elmo de Teletransporte",
    desc: "Requer sintonia. Este elmo possui 3 cargas. Enquanto o estiver usando, você pode usar uma ação e gastar 1 carga para conjurar a magia Teletransporte. O elmo recupera 1d3 cargas diariamente ao amanhecer."
  },
  "Ring of Free Action": {
    pt: "Anel de Movimentação Livre",
    desc: "Requer sintonia. Enquanto usar este anel, terreno difícil não custa movimento extra para você. Além disso, magia e outros efeitos mágicos não podem reduzir seu deslocamento nem fazer com que você fique paralisado ou impedido."
  },
  "Watcher's Visage": {
    pt: "Visor do Observador",
    desc: "Requer sintonia. Este elmo metálico possui 3 cargas. Gaste 1 carga como uma ação para ganhar Visão no Escuro de 18 metros, ver criaturas invisíveis e no Plano Etereal, ou enxergar auras mágicas e suas escolas por 1 hora."
  },
  "Caged Star": {
    pt: "Estrela Enjaulada",
    desc: "Requer sintonia. Esta estrela da manhã mágica possui 3 cargas. Como uma reação ao sofrer dano de um ataque, gaste 1 carga para cortar o dano pela metade e fazer com que a arma brilhe com luz intensa, causando dano radiante extra nos próximos ataques."
  },
  "Wand of Enemy Detection": {
    pt: "Varinha de Detecção de Inimigos",
    desc: "Requer sintonia. Esta varinha possui 7 cargas. Enquanto a empunha, você pode usar uma ação e gastar 1 carga para descobrir a direção da criatura hostil mais próxima num raio de 18 metros. Recupera 1d6 + 1 cargas ao amanhecer."
  },
  "Censer of Controlling Air Elementals": {
    pt: "Incensário de Controlar Elementais do Ar",
    desc: "Enquanto este incensário de latão exala incenso aceso, você pode usar uma ação para conjurar a magia Conjurar Elemental (apenas Elemental do Ar)."
  },
  "Shapeshifter's Sickle": {
    pt: "Foice do Metamorfo",
    desc: "Requer sintonia. Esta foice +1 aplica seus bônus mágicos a ataques desarmados feitos enquanto você estiver transformado (Polimorfia ou Forma Selvagem). Além disso, ela considera seu nível de classe 2 níveis maior para determinar transformações."
  },
  "Gauntlets of Restoration": {
    pt: "Manoplas de Restauração",
    desc: "Requer sintonia. Estas manoplas possuem 7 cargas. Ao acertar um ataque desarmado em um aliado ou criatura orgânica, gaste cargas para fazê-lo recuperar HP (até 2d6+For) no lugar de sofrer dano. Permite conjurar Mending em construtos sem custo."
  },
  "Weapon of Certain Death": {
    pt: "Arma de Morte Certa",
    desc: "Quando você obtém um 20 natural na jogada de ataque com esta arma, o dano necrótico dela impede que o alvo recupere pontos de vida até o início do seu próximo turno."
  },
  "Rod of the Pact Keeper, +2": {
    pt: "Bastão do Guardião do Pacto +2",
    desc: "Requer sintonia por Bruxo. Concede +2 de bônus nas jogadas de ataque de magia e na CD de salvamento de suas magias de bruxo. Permite recuperar um espaço de magia de bruxo uma vez por dia."
  },
  "Duplicitous Manuscript": {
    pt: "Manuscrito Duplicado",
    desc: "Requer sintonia por Mago. Este grimório parece um romance bobo para estranhos. Serve como foco de mago e contém magias de ilusão. Permite gastar cargas para impor desvantagem em testes de Investigação para discernir suas ilusões."
  },
  "Bowl of Commanding Water Elementals": {
    pt: "Tigela de Comandar Elementais da Água",
    desc: "Esta tigela de argila mágica cheia de água limpa permite a você conjurar a magia Conjurar Elemental (apenas Elemental da Água)."
  },
  "Stone of Controlling Earth Elementals": {
    pt: "Pedra de Controlar Elementais da Terra",
    desc: "Esta pedra bruta permite a você conjurar a magia Conjurar Elemental (apenas Elemental da Terra) ao ser colocada no chão."
  },
  "Wand of Fear": {
    pt: "Varinha do Medo",
    desc: "Requer sintonia. Esta varinha possui 7 cargas. Permite conjurar a magia Medo CD 15 em cone ou disparar uma luz que deixa um alvo assustado."
  },
  "Rod of Rulership": {
    pt: "Bastão do Comando",
    desc: "Requer sintonia. Com uma ação, você pode usar este bastão para impor CD 15 de Carisma em criaturas a até 36 metros. Em caso de falha, elas ficam encantadas por você e obedecem a seus comandos por 8 horas."
  },
  "Mace of Terror": {
    pt: "Maça do Terror",
    desc: "Requer sintonia. Esta maça tem 3 cargas. Com uma ação, você pode gastar 1 carga para liberar uma onda de medo em um raio de 9 metros. Criaturas hostis devem passar num salvamento de Sabedoria CD 15 ou ficarão amedrontadas por 1 minuto."
  },
  "Atlas of Endless Horizons": {
    pt: "Atlas de Horizontes Infinitos",
    desc: "Requer sintonia por Mago. Este grimório permite trocar magias preparadas por magias de conjuração escritas nele. Permite usar sua reação para se teleportar a até 3 metros ao ser atingido por um ataque."
  },
  "Thunderbolt Trident": {
    pt: "Tridente do Raio",
    desc: "Requer sintonia. Este tridente mágico possui 3 cargas. Ao acertar um ataque, você pode gastar 1 carga para causar 2d6 de dano elétrico extra e forçar salvamento de Constituição CD 13 contra atordoamento."
  },
  "Tentacle Rod": {
    pt: "Bastão de Tentáculos",
    desc: "Requer sintonia. Este bastão de metal se divide em três tentáculos que podem realizar ataques individuais a até 4,5 metros. Se os três tentáculos atingirem o mesmo alvo, a velocidade dele é cortada pela metade por 1 rodada."
  },
  "Scaled Ornament (Stirring)": {
    pt: "Ornamento Escamoso (Desperto)",
    desc: "Requer sintonia. Concede +1 na CA, vantagem contra ser enfeitiçado ou amedrontado e resistência a um elemento de sopro de dragão."
  },
  "All-Purpose Tool, +2": {
    pt: "Ferramenta Multiuso +2",
    desc: "Requer sintonia por Artífice. Concede +2 em jogadas de ataque e CD de magias de artífice. Pode assumir a forma de qualquer ferramenta e conceder um truque temporário."
  },
  "Wings of Flying": {
    pt: "Asas de Voo",
    desc: "Requer sintonia. Este manto de penas se transforma em um par de asas de morcego ou ave ao comando verbal, concedendo velocidade de voo de 18 metros por até 1 hora diária."
  },
  "Figurine of Wondrous Power*": {
    pt: "Estatueta de Poder Maravilhoso",
    desc: "Uma estatueta de pedra ou metal que se transforma em um animal vivo sob seu comando ao ser arremessada no chão."
  },
  "Ring of X-Ray Vision": {
    pt: "Anel de Visão de Raio-X",
    desc: "Requer sintonia. Enquanto usa este anel, você pode ver através de matéria sólida (como paredes e portas) a até 9 metros. Usá-lo por muito tempo exige testes de Constituição CD 15 contra exaustão."
  },
  "Mace of Smiting": {
    pt: "Maça do Golpe",
    desc: "Esta maça +1 causa +3 de bônus mágico contra Construtos. Ao obter um 20 natural, causa +7 de dano extra (ou +14 em construtos)."
  },
  "Wand of the Director": {
    pt: "Varinha do Diretor",
    desc: "Requer sintonia. Esta varinha possui 3 cargas e permite controlar o posicionamento e ações básicas de um aliado de forma coordenada usando reações."
  },
  "Dagger of Venom": {
    pt: "Adaga de Veneno",
    desc: "Você ganha +1 de bônus em jogadas de ataque e dano com esta adaga. Com uma ação, você pode revestir a lâmina com um veneno espesso. O próximo acerto causa 2d10 de dano de veneno extra CD 15 de Constituição."
  },
  "Amulet of the Devout, +2": {
    pt: "Amuleto do Devoto +2",
    desc: "Requer sintonia por Clérigo ou Paladino. Concede +2 de bônus em jogadas de ataque de magia e CD de salvamento de suas magias. Permite usar Canalização de Divindade uma vez extra."
  },
  "Elven Chain": {
    pt: "Cota de Malha Élfica",
    desc: "Esta cota de malha leve concede um bônus de +1 na CA e você é considerado proficiente com ela mesmo se não tiver proficiência com armaduras médias."
  },
  "Zephyr Armor": {
    pt: "Armadura do Zéfiro",
    desc: "Requer sintonia. Esta armadura leve concede vantagem em testes de Acrobacia e salvamentos de Destreza graças a brisas que guiam seus movimentos."
  },
  "Wand of Quickness": {
    pt: "Varinha de Rapidez",
    desc: "Requer sintonia. Esta varinha mágica permite conjurar a magia Velocidade em si mesmo uma vez por dia sem exigir concentração."
  },
  "Lash of Immolation": {
    pt: "Chicote da Imolação",
    desc: "Este chicote +1 causa +1d6 de dano de fogo extra. Acertos críticos deixam o alvo impedido (restrained) por faixas de fogo até o início do seu próximo turno."
  },
  "Battering Shield": {
    pt: "Escudo de Impacto",
    desc: "Requer sintonia. Este escudo +1 possui 3 cargas. Ao empurrar um inimigo, gaste 1 carga para empurrá-lo 3 metros extras, derrubá-lo, ou ambos."
  },
  "Ioun Stone*": {
    pt: "Pedra de Ioun",
    desc: "Esta pedra mágica orbita sua cabeça a até 90 cm e concede um benefício específico baseado no tipo da pedra (como aumentar atributos ou CA)."
  },
  "Ring of Tranquility": {
    pt: "Anel da Tranquilidade",
    desc: "Requer sintonia. Concede a você imunidade a efeitos de raiva e fúria, além de vantagem contra ser amedrontado ou enfeitiçado."
  },
  "Arrow-Catching Shield": {
    pt: "Escudo Atrai-Flechas",
    desc: "Requer sintonia. Concede +2 de bônus de CA contra ataques à distância. Ao ver um ataque à distância direcionado a um alvo a até 1,5 metros, você pode usar sua reação para se tornar o novo alvo."
  },
  "Astromancy Archive": {
    pt: "Arquivo de Astromancia",
    desc: "Requer sintonia por Mago. Este grimório permite alterar magias preparadas por magias de adivinhação. Permite gastar cargas para somar ou subtrair 1d4 de testes de jogadas de ataque ou salvamento próximos."
  },
  "Ring of Animal Influence": {
    pt: "Anel de Influência Animal",
    desc: "Este anel possui 3 cargas e permite a você conjurar magias como Amizade Animal, Medo ou Falar com Animais contra feras CD 13."
  },
  "Cat's Eye Amulet": {
    pt: "Amuleto de Olho de Gato",
    desc: "Requer sintonia. Concede visão no escuro de 18 metros e vantagem em testes de Percepção baseados na visão e testes de Furtividade."
  },
  "Rod of Mimicry": {
    pt: "Bastão de Mimetismo",
    desc: "Requer sintonia. Este bastão permite copiar e replicar sons ouvidos recentemente de forma perfeita ou alterar temporariamente a forma de um objeto pequeno."
  },
  "Armor, +1*": {
    pt: "Armadura +1",
    desc: "Você ganha um bônus de +1 na Classe de Armadura (CA) enquanto estiver usando esta armadura mágica."
  },
  "Far Realm Shard": {
    pt: "Fragmento do Reino Distante",
    desc: "Requer sintonia por Feiticeiro. Pode ser usado como foco. Quando você usa Metamagia em uma magia, você pode conjurar um tentáculo que causa 3d6 de dano psíquico a um inimigo próximo."
  },
  "Berserker Axe": {
    pt: "Machado do Berserker",
    desc: "Requer sintonia. Um machado amaldiçoado +1 que concede +1 HP extra por nível. Sofrer dano em combate exige passar num salvamento de Sabedoria CD 15 ou você entrará em fúria cega, atacando a criatura mais próxima."
  },
  "Elemental Essence Shard*": {
    pt: "Fragmento de Essência Elemental",
    desc: "Requer sintonia por Feiticeiro. Pode ser usado como foco. Quando você usa Metamagia, você desencadeia um efeito correspondente ao elemento (como voar sem provocar ataques de oportunidade ou causar dano de fogo)."
  },
  "Animated Painting": {
    pt: "Pintura Animada",
    desc: "Uma pintura em tela que obedece seus comandos de voz para animar e se mover, agindo como batedor ou criando distrações realistas."
  },
  "Wand of Wonder": {
    pt: "Varinha das Maravilhas",
    desc: "Requer sintonia. Esta varinha possui 7 cargas. Ao ativá-la, rola-se na tabela de efeitos selvagens para criar efeitos aleatórios estranhos (como fazer chover folhas, criar relâmpagos, ou encolher o portador)."
  },
  "Staff of the Rooted Hills": {
    pt: "Cajado das Colinas Enraizadas",
    desc: "Requer sintonia. Concede bônus de +1 em ataques e dano. Permite conjurar magias que manipulam terra ou prendem criaturas no chão CD 15."
  },
  "Sands of Reminiscence": {
    pt: "Areias da Reminiscência",
    desc: "Ao preencher esta ampulheta com poeira ou terra de um local, ela projeta visões espectrais dos acontecimentos mais marcantes ou trágicos que transcorreram naquela área no passado."
  },
  "Adamantine Armor*": {
    pt: "Armadura de Adamantina",
    desc: "Esta armadura pesada ou média de metal é reforçada com adamantina. Qualquer acerto crítico desferido contra você torna-se um acerto normal."
  },
  "Sun Blade": {
    pt: "Lâmina do Sol",
    desc: "Requer sintonia. Uma lâmina de pura energia brilhante brota do cabo. Esta espada +2 com propriedade Finesse causa dano radiante no lugar de cortante e +1d8 de dano extra contra Mortos-Vivos. Emite luz solar brilhante."
  },
  "Daern's Instant Fortress": {
    pt: "Fortaleza Instantânea de Daern",
    desc: "Este cubo de metal de 2,5 cm se transforma em uma torre de fortaleza de ferro de 6m de base por 9m de altura ao comando de voz. Criaturas na área devem passar num salvamento CD 15 de Destreza ou sofrem 10d10 de dano."
  },
  "Planecaller's Codex": {
    pt: "Códice do Convocador Planar",
    desc: "Requer sintonia por Mago. Este grimório permite alterar magias preparadas por magias de conjuração (invocações) e concede bônus a criaturas convocadas por você."
  },
  "Necklace of Prayer Beads": {
    pt: "Colar de Contas de Oração",
    desc: "Requer sintonia por Clérigo, Druida ou Paladino. Este colar tem 1d4 + 2 contas mágicas. Cada conta permite conjurar uma magia divina (como Bênção, Cura de Ferimentos, Restauração Menor) com uma ação bônus."
  },
  "Gem of Seeing": {
    pt: "Gema de Visão",
    desc: "Requer sintonia. Esta gema possui 3 cargas. Olhar através dela permite a você enxergar com Visão Verdadeira a até 36 metros por 10 minutos."
  },
  "Truestrike Crossbow": {
    pt: "Bestas do Tiro Certeiro",
    desc: "Requer sintonia. Esta besta mágica concede vantagem na próxima jogada de ataque caso você não se mova no seu turno."
  },
  "Corpse Slayer": {
    pt: "Matadora de Cadáveres",
    desc: "Requer sintonia. Uma arma +1 (+2 contra Mortos-Vivos). Ao atingir um morto-vivo, ele não pode usar sua resistência a dano físico por 1 rodada."
  },
  "Orb of Superior Spell Storing": {
    pt: "Orbe de Armazenar Magia Superior",
    desc: "Este orbe mágico funciona de forma similar ao Orbe de Armazenar Magia comum, mas é capaz de armazenar magias de até 5º nível conjuradas nele."
  },
  "Sword of Wounding": {
    pt: "Espada do Ferimento",
    desc: "Requer sintonia. Uma criatura atingida por esta espada mágica sofre feridas que causam 1d4 de dano necrótico extra no início de cada um dos turnos dela. A ferida pode ser estancada com teste CD 15 de Medicina."
  },
  "Mace of Disruption": {
    pt: "Maça da Ruína",
    desc: "Requer sintonia. Quando você atinge um morto-vivo ou feérico com esta maça, causa 2d6 de dano radiante extra. Se o alvo tiver 25 HP ou menos, deve passar num salvamento CD 15 de Sabedoria ou será destruído."
  },
  "Horn of Blasting": {
    pt: "Corneta do Estilhaço",
    desc: "Você pode usar uma ação para soprar esta corneta, liberando um cone de som de 9 metros. Criaturas na área devem fazer salvamento de Constituição CD 15, sofrendo 5d6 de dano trovejante e ficando surdas. Há 20% de chance de explodir ao usar."
  },
  "Wand of Lightning Bolts": {
    pt: "Varinha de Relâmpagos",
    desc: "Requer sintonia por um conjurador. Esta varinha possui 7 cargas e permite conjurar a magia Relâmpago CD 15 gastando charges."
  },
  "Living Spellbook": {
    pt: "Grimório Vivo",
    desc: "Requer sintonia por Mago. Este grimório mágico se comporta de forma autônoma e permite a você alterar o elemento de dano de magias que você conjura."
  },
  "Transmuter's Stone": {
    pt: "Pedra do Transmutador",
    desc: "Esta pedra rúnica concede um benefício constante de sua escolha a quem a carregar (como visão no escuro, velocidade aumentada ou resistência elemental)."
  },
  "Ring of Feather Falling": {
    pt: "Anel de Queda Suave",
    desc: "Requer sintonia. Quando você cai enquanto estiver usando este anel, você desce suavemente a 18 metros por rodada e não sofre dano de queda."
  },
  "Butcher's Bib": {
    pt: "Babador do Açougueiro",
    desc: "Requer sintonia. Enquanto usar este babador de couro preto manchado de sangue, você obtém acertos críticos com armas cortantes com 19 ou 20 no d20, e rola novamente qualquer 1 ou 2 em dados de dano cortante."
  },
  "Armor of Resistance*": {
    pt: "Armadura de Resistência",
    desc: "Requer sintonia. Enquanto estiver usando esta armadura mágica, você tem resistência a um tipo de dano específico determinado pelo criador da armadura."
  },
  "Bloodwell Vial, +2": {
    pt: "Frasco do Poço de Sangue +2",
    desc: "Requer sintonia por Feiticeiro. Concede +2 de bônus em jogadas de ataque de magia e CD de salvamento de feiticeiro. Permite recuperar 5 pontos de feitiçaria ao usar dados de vida."
  },
  "Amulet of Health": {
    pt: "Amuleto de Saúde",
    desc: "Requer sintonia. Seu valor de Constituição se torna 19 enquanto você usar este amuleto de ouro com uma gema vermelha."
  },
  "Astral Shard": {
    pt: "Fragmento Astral",
    desc: "Requer sintonia por Feiticeiro. Pode ser usado como foco. Quando você usa Metamagia em uma magia, você pode se teleportar a até 9 metros para um espaço desocupado."
  },
  "Cape of the Mountebank": {
    pt: "Capa do Saltimbanco",
    desc: "Esta capa de veludo permite a você conjurar a magia Porta Dimensional com uma ação, desaparecendo em uma fumaça vermelha cheia de fumaça."
  },
  "Dragonhide Belt": {
    pt: "Cinto de Couro de Dragão +2",
    desc: "Requer sintonia por Monge. Concede +2 de bônus na CD de salvamento de suas técnicas de Ki e permite a você recuperar pontos de Ki com dados de vida."
  },
  "Bracers of Defense": {
    pt: "Braceletes de Defesa",
    desc: "Requer sintonia. Enquanto usar estes braceletes de metal polido, você ganha +2 de bônus na Classe de Armadura (CA) se não estiver vestindo armadura nem empunhando um escudo."
  },
  "Wand of Paralysis": {
    pt: "Varinha de Paralisia",
    desc: "Requer sintonia por um conjurador. Esta varinha possui 7 cargas. Permite disparar uma raio paralisante em uma criatura a até 18 metros CD 15 de Constituição contra a paralisia."
  },
  "Rhythm-Maker's Drum, +2": {
    pt: "Tambor do Criador de Ritmo +2",
    desc: "Requer sintonia por Bardo. Concede +2 em jogadas de ataque de magia e CD de bardo. Permite recuperar um uso de Inspiração Bárdica."
  },
  "Armor of Vulnerability": {
    pt: "Armadura da Vulnerabilidade",
    desc: "Requer sintonia. Uma armadura amaldiçoada que concede resistência a um tipo de dano físico (como cortante), mas impõe vulnerabilidade aos outros dois tipos."
  },
  "Fulminating Treatise": {
    pt: "Tratado Fulminante",
    desc: "Requer sintonia por Mago. Este grimório permite alterar magias prepared por magias de evocação. Permite gastar cargas para empurrar e causar dano de força extra a inimigos atingidos por suas magias."
  },
  "Dragon's Wrath Weapon (Stirring)": {
    pt: "Arma da Ira do Dragão (Desperta)",
    desc: "Requer sintonia. Esta arma +1 causa +1d6 de dano elemental correspondente ao dragão em cada acerto e desencadeia rajadas em críticos."
  },
  "Moon Sickle, +2": {
    pt: "Foice Lunar +2",
    desc: "Requer sintonia por Druida ou Patrulheiro. Concede +2 em jogadas de ataque, dano, magias de ataque e CD de magias. Adiciona +1d4 nas curas."
  },
  "Champion's Shield": {
    pt: "Escudo do Campeão",
    desc: "Requer sintonia. Este escudo mágico concede +2 na CA e permite usar uma reação para dar vantagem a salvamentos de aliados próximos."
  },
  "Arcane Grimoire, +2": {
    pt: "Grimório Arcano +2",
    desc: "Requer sintonia por Mago. Concede +2 de bônus em jogadas de ataque de magia e CD de salvamento de mago, além de melhorar sua Recuperação Arcana."
  },
  "Wand of Fireballs": {
    pt: "Varinha de Bolas de Fogo",
    desc: "Requer sintonia por um conjurador. Esta varinha possui 7 cargas e permite conjurar a magia Bola de Fogo CD 15 gastando charges."
  },
  "Mantle of Spell Resistance": {
    pt: "Manto de Resistência à Magia",
    desc: "Requer sintonia. Enquanto estiver usando este manto de brocado fino, você tem vantagem em todas as jogadas de salvamento contra magias."
  },
  "Ring of the Blood Pact": {
    pt: "Anel do Pacto de Sangue",
    desc: "Requer sintonia. Este anel permite a você gastar seus próprios dados de vida em combate para somar bônus nas jogadas de ataque de magia ou dano mágico."
  },
  "Periapt of Proof against Poison": {
    pt: "Periapto contra Veneno",
    desc: "Enquanto usar este pingente de gema preta, você é completamente imune a dano de veneno e à condição envenenado."
  },
  "Instrument of the Bards*": {
    pt: "Instrumento dos Bardos",
    desc: "Instrumento de alaúde ou bandurra que permite conjurar diversas magias poderosas de bardo e impõe desvantagem em testes de encanto."
  },
  "Staff of the Woodlands": {
    pt: "Cajado das Florestas",
    desc: "Requer sintonia por um Druida. Este cajado +2 permite conjurar magias da natureza à vontade (como Passos Sem Pegadas) ou transformar o cajado em uma árvore frutífera gigante de 18 metros."
  },
  "Crystal Blade": {
    pt: "Lâmina de Cristal",
    desc: "Requer sintonia. Esta espada de cristal rúnico causa +1d8 de dano radiante extra e possui 3 cargas para sugar HP dos alvos curando você."
  },
  "Dimensional Shackles": {
    pt: "Algemas Dimensionais",
    desc: "Estas algemas de metal runadas impedem que a criatura algemada se teletransporte ou viaje entre planos de existência."
  },
  "Acheron Blade": {
    pt: "Lâmina de Acheron",
    desc: "Requer sintonia. Esta espada de ferro escuro +1 concede imunidade a efeitos de pavor e permite ganhar HP temporário ao amanhecer."
  },
  "Transmuter's Robe": {
    pt: "Manto do Transmutador",
    desc: "Requer sintonia. Este manto permite alterar a matéria ou peso próprio e de objetos leves que você toque como ação bônus."
  },
  "Shield of Missile Attraction": {
    pt: "Escudo de Atrair Projéteis",
    desc: "Requer sintonia. Um escudo amaldiçoado que concede resistência a dano de armas à distância, mas atrai magicamente qualquer projétil disparado num raio de 3 metros para atingir você."
  },
  "Argh'Yak Bow": {
    pt: "Arco Argh'Yak",
    desc: "Requer sintonia. Este arco longo orc de ossos de feras causa +1d8 de dano de veneno extra em acertos contra criaturas humanoides."
  },
  "Ring of Evasion": {
    pt: "Anel de Evasão",
    desc: "Requer sintonia. Este anel possui 3 cargas. Se você falhar em um salvamento de Destreza, pode usar sua reação e gastar 1 carga para obter sucesso no lugar."
  },
  "Belt of Dwarvenkind": {
    pt: "Cinto dos Anões",
    desc: "Requer sintonia. Concede a você +2 de bônus no valor de Constituição (até o limite de 20), visão no escuro de 18 metros e proficiência no idioma anão. Além disso, há 50% de chance diária de nascer uma barba espessa em você."
  },
  "Iron Bands of Bilarro": {
    pt: "Bandas de Ferro de Bilarro",
    desc: "Esta esfera de ferro de 7 cm pode ser arremessada contra uma criatura. Ela se expande em bandas de ferro que prendem o alvo CD 20 de Destreza (escape CD 20 de Força)."
  },
  "Boots of Speed": {
    pt: "Botas de Velocidade",
    desc: "Requer sintonia. Com uma ação bônus, você ativa estas botas para dobrar sua velocidade de caminhada e impor desvantagem em ataques de oportunidade feitos contra você por até 10 minutos diários."
  },
  "Protective Verses": {
    pt: "Versos Protetores",
    desc: "Requer sintonia. Este pergaminho de cânticos divinos concede bônus de +1 em todos os salvamentos de aliados que você consiga ver a até 6 metros."
  },
  "Staff of Swarming Insects": {
    pt: "Cajado de Enxames de Insetos",
    desc: "Requer sintonia por um conjurador. Este cajado possui 10 cargas e permite conjurar Nuvem de Insetos ou invocar um enxame de gafanhotos para cegar inimigos ao seu redor."
  },
  "Wand of Binding": {
    pt: "Varinha de Aprisionamento",
    desc: "Requer sintonia por um conjurador. Esta varinha possui 7 cargas e permite conjurar magias como Imobilizar Pessoa CD 15 ou criar laços mágicos de força."
  },
  "Shield, +2": {
    pt: "Escudo +2",
    desc: "Enquanto empunha este escudo mágico, você ganha +2 de bônus na CA além do bônus normal do escudo (+4 CA no total)."
  },
  "Ring of the Ram": {
    pt: "Anel do Carneiro",
    desc: "Requer sintonia. Este anel possui 3 cargas. Como uma ação, você pode apontar para uma criatura a até 18 metros e liberar uma cabeça de carneiro espectral que causa 2d10 de dano de força por carga gasta e empurra o alvo."
  },
  "Crown of the Wrath Bringer": {
    pt: "Coroa do Portador da Ira",
    desc: "Requer sintonia. Esta coroa mágica concede vantagem em testes de Intimidação e adiciona +1d6 de dano psíquico aos seus ataques contra criaturas assustadas."
  },
  "Belt of Hill Giant Strength": {
    pt: "Cinto de Força do Gigante da Colina",
    desc: "Requer sintonia. Seu valor de Força se torna 21 enquanto usar este cinto de couro grosso."
  },
  "Sultan's Khanjar": {
    pt: "Khanjar do Sultão",
    desc: "Requer sintonia. Esta adaga +2 causa +1d6 de dano de fogo extra e brilha emitindo calor suave."
  },
  "Cloak of Displacement": {
    pt: "Manto do Deslocamento",
    desc: "Requer sintonia. Este manto faz sua imagem parecer deslocada a alguns centímetros de sua posição real. Ataques contra você têm desvantagem. O efeito é temporariamente desativado se você sofrer dano."
  },
  "Bell Branch": {
    pt: "Ramo de Sinos",
    desc: "Requer sintonia por Bruxo, Druida ou Bardo. Este ramo de sinos de prata permite a você detectar a presença de feéricos, mortos-vivos ou demônios a até 18 metros."
  },
  "Rope of Entanglement": {
    pt: "Corda do Emaranhamento",
    desc: "Esta corda de 9 metros obedece a seus comandos de voz. Ao comando, ela se lança contra uma criatura a até 6 metros para agarrá-la e restringi-la CD 15 de Destreza."
  },
  "Robe of Eyes": {
    pt: "Manto de Olhos",
    desc: "Requer sintonia. Este manto é coberto por desenhos de olhos vivos. Concede visão no escuro de 36 metros, capacidade de ver criaturas invisíveis e no Plano Etereal, além de impedir que você seja surpreendido. Olhar para luz intensa pode cegar você."
  },
  "Brazier of Commanding Fire Elementals": {
    pt: "Braseiro de Comandar Elementais do Fogo",
    desc: "Este braseiro de latão permite a você conjurar a magia Conjurar Elemental (apenas Elemental do Fogo) ao acender fogo nele."
  },
  "Ghost Shroud": {
    pt: "Mortalha Fantasma",
    desc: "Requer sintonia. Esta mortalha translúcida permite que você se mova através de criaturas e objetos sólidos como se fossem terreno difícil, sofrendo dano de força se terminar o turno dentro deles."
  },
  "Dragon Wing Bow": {
    pt: "Arco de Asa de Dragão",
    desc: "Requer sintonia. Este arco +1 não precisa de munição física comum (cria flechas de energia elemental leais) e causa +1d6 de dano de elemento de dragão."
  },
  "Deathgrasp Glove": {
    pt: "Luva do Aperto da Morte",
    desc: "Requer sintonia. Esta luva de garras necróticas causa +1d8 de dano necrótico em ataques desarmados e drena HP do alvo para curar você."
  },
  "Staff of the Ivory Claw": {
    pt: "Cajado da Garra de Marfim",
    desc: "Requer sintonia. Este cajado de marfim concede +1 em jogadas de ataque de magia e permite disparar garras de energia a até 18 metros."
  },
  "Boots of Levitation": {
    pt: "Botas de Levitação",
    desc: "Requer sintonia. Enquanto usar estas botas, você pode conjurar a magia Levitação em si mesmo à vontade com uma ação."
  },
  "Shadowfell Brand Tattoo": {
    pt: "Tatuagem da Marca do Pendor das Sombras",
    desc: "Requer sintonia. Esta tatuagem de tinta cinza escura concede a você resistência a dano físico e vantagem em testes de Furtividade na penumbra ou escuridão."
  },
  "Libram of Souls and Flesh": {
    pt: "Livro de Almas e Carne",
    desc: "Requer sintonia por Mago. Grimório que serve como foco e contém magias de necromancia. Permite gastar cargas para assumir traços de morto-vivo ou controlar zumbis."
  },
  "Dragon-Touched Focus (Stirring)": {
    pt: "Foco Tocado pelo Dragão (Desperto)",
    desc: "Requer sintonia por conjurador. Concede +1 em ataques de magia e CD de salvamento. Adiciona +1d6 de dano elemental e permite conjurar uma magia específica baseada no dragão."
  },
  "Ring of Spell Storing": {
    pt: "Anel de Armazenar Magia",
    desc: "Requer sintonia. Este anel pode armazenar até 5 níveis de magias conjuradas nele por qualquer criatura. Qualquer um pode liberar as magias do anel usando os modificadores do conjurador original."
  },
  "Cube of Force": {
    pt: "Cubo de Força",
    desc: "Requer sintonia. Este cubo possui 36 cargas. Pressionar suas faces cria barreiras de força com propriedades diferentes (impedindo passagem de matéria viva, não-viva, magias ou efeitos de clima) gastando cargas."
  },
  "Ring of Resistance": {
    pt: "Anel de Resistência",
    desc: "Requer sintonia. Concede a você resistência a um tipo de dano elemental específico (como Fogo, Frio ou Elétrico) enquanto estiver usando o anel."
  },
  "Raven's Feathers": {
    pt: "Penas do Corvo",
    desc: "Requer sintonia. Esta capa de penas de corvo permite planar ao cair e conjurar a magia Névoa uma vez por dia."
  },
  "Devotee's Censer": {
    pt: "Incensário do Devoto",
    desc: "Requer sintonia por Clérigo ou Paladino. Este mangual +1 causa +1d8 de dano radiante extra. Permite liberar uma névoa que cura 1d4 HP por rodada para aliados próximos por 1 minuto."
  },
  "Furnace Flail": {
    pt: "Mangual da Fornalha",
    desc: "Requer sintonia. Este mangual +1 causa +1d6 de dano de fogo extra em cada acerto e pode liberar chamas em cone uma vez ao dia."
  },
  "Dragon Slayer": {
    pt: "Matadora de Dragões",
    desc: "Você ganha +1 de bônus em jogadas de ataque e dano com esta arma mágica. Quando atinge um dragão, causa 3d6 de dano extra da arma."
  },
  "Heart Weaver's Primer": {
    pt: "Cartilha do Tecedor de Corações",
    desc: "Requer sintonia por Mago. Grimório que serve como foco e contém magias de encantamento. Permite gastar cargas para impor desvantagem em salvamentos contra suas magias de encanto."
  },
  "Weapon, +2": {
    pt: "Arma +2",
    desc: "Esta arma mágica concede um bônus de +2 nas jogadas de ataque e dano feitas com ela."
  },
  "Wondrous Bestiary": {
    pt: "Bestiário Maravilhoso",
    desc: "Requer sintonia. Este livro mágico permite a você estudar feras e monstros e invocar ilusões realistas ou ganhar vantagem em testes de Natureza sobre as criaturas descritas."
  },
  "Prehistoric Figurine of Wondrous Power (Kyanite Pteranodon)": {
    pt: "Estatueta Pré-Histórica de Poder Maravilhoso (Pteranodonte de Cianita)",
    desc: "Como uma ação, lança esta estatueta para invocar um Pteranodonte aliado por 1 hora como montaria voadora. Recarrega em 2 dias."
  },
  "Sword of Life Stealing": {
    pt: "Espada de Roubo de Vida",
    desc: "Requer sintonia. Quando você obtém um 20 natural na jogada de ataque com esta espada, causa 10 de dano necrótico extra no alvo se ele não for construto ou morto-vivo, e você ganha 10 pontos de vida temporários."
  },
  "Needle of Mending": {
    pt: "Agulha de Remendo",
    desc: "Requer sintonia. Esta adaga +1 permite conjurar o truque Mending à vontade. Ao acertar um ataque, permite curar um aliado próximo em 1d4 HP."
  },
  "Reveler's Concertina": {
    pt: "Concertina do Folião",
    desc: "Requer sintonia por um bardo. Concede +1 na CD de salvamento de suas magias de bardo e permite conjurar a magia Dança Irresistível de Otto uma vez ao dia."
  },
  "Giant Slayer": {
    pt: "Matadora de Gigantes",
    desc: "Você ganha +1 de bônus nas jogadas de ataque e dano com esta arma. Ao atingir um gigante, causa 2d6 de dano extra e o alvo deve passar num salvamento de Força CD 15 ou cairá derrubado."
  },
  "Staff of Healing": {
    pt: "Cajado de Cura",
    desc: "Requer sintonia por Clérigo, Druida ou Paladino. Este cajado possui 10 cargas. Permite conjurar magias de cura como Curar Ferimentos, Palavra Curativa de Massa ou Restauração Menor gastando cargas."
  }
};

const fileA = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-a.json');
const fileB = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-b.json');
const fileC = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-c.json');
const fileD = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-d.json');
const fileE = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-e.json');
const fileF = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-f.json');
const fileG = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-g.json');
const fileH = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-h.json');
const fileI = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-i.json');

if (fs.existsSync(fileA)) {
  const items = JSON.parse(fs.readFileSync(fileA, 'utf-8'));
  const updated = items.map(item => {
    const translation = TABLE_A_TRANSLATIONS[item.name];
    if (translation) {
      return {
        ...item,
        englishName: item.name,
        name: translation.pt,
        description: translation.desc
      };
    }
    return item;
  });
  fs.writeFileSync(fileA, JSON.stringify(updated, null, 2), 'utf-8');
}

if (fs.existsSync(fileB)) {
  const items = JSON.parse(fs.readFileSync(fileB, 'utf-8'));
  const updated = items.map(item => {
    const translation = TABLE_B_TRANSLATIONS[item.name];
    if (translation) {
      return {
        ...item,
        englishName: item.name,
        name: translation.pt,
        description: translation.desc
      };
    }
    return item;
  });
  fs.writeFileSync(fileB, JSON.stringify(updated, null, 2), 'utf-8');
}

if (fs.existsSync(fileC)) {
  const items = JSON.parse(fs.readFileSync(fileC, 'utf-8'));
  const updated = items.map(item => {
    const translation = TABLE_C_TRANSLATIONS[item.name];
    if (translation) {
      return {
        ...item,
        englishName: item.name,
        name: translation.pt,
        description: translation.desc
      };
    }
    return item;
  });
  fs.writeFileSync(fileC, JSON.stringify(updated, null, 2), 'utf-8');
}

if (fs.existsSync(fileD)) {
  const items = JSON.parse(fs.readFileSync(fileD, 'utf-8'));
  const updated = items.map(item => {
    const translation = TABLE_D_TRANSLATIONS[item.name];
    if (translation) {
      return {
        ...item,
        englishName: item.name,
        name: translation.pt,
        description: translation.desc
      };
    }
    return item;
  });
  fs.writeFileSync(fileD, JSON.stringify(updated, null, 2), 'utf-8');
}

if (fs.existsSync(fileE)) {
  const items = JSON.parse(fs.readFileSync(fileE, 'utf-8'));
  const updated = items.map(item => {
    const translation = TABLE_E_TRANSLATIONS[item.name];
    if (translation) {
      return {
        ...item,
        englishName: item.name,
        name: translation.pt,
        description: translation.desc
      };
    }
    return item;
  });
  fs.writeFileSync(fileE, JSON.stringify(updated, null, 2), 'utf-8');
}

if (fs.existsSync(fileF)) {
  const items = JSON.parse(fs.readFileSync(fileF, 'utf-8'));
  const updated = items.map(item => {
    const translation = TABLE_F_TRANSLATIONS[item.name];
    if (translation) {
      return {
        ...item,
        englishName: item.name,
        name: translation.pt,
        description: translation.desc
      };
    }
    return item;
  });
  fs.writeFileSync(fileF, JSON.stringify(updated, null, 2), 'utf-8');
}

if (fs.existsSync(fileG)) {
  const items = JSON.parse(fs.readFileSync(fileG, 'utf-8'));
  const updated = items.map(item => {
    const translation = TABLE_G_TRANSLATIONS[item.name];
    if (translation) {
      return {
        ...item,
        englishName: item.name,
        name: translation.pt,
        description: translation.desc
      };
    }
    return item;
  });
  fs.writeFileSync(fileG, JSON.stringify(updated, null, 2), 'utf-8');
}

if (fs.existsSync(fileH)) {
  const items = JSON.parse(fs.readFileSync(fileH, 'utf-8'));
  const updated = items.map(item => {
    const translation = TABLE_H_TRANSLATIONS[item.name];
    if (translation) {
      return {
        ...item,
        englishName: item.name,
        name: translation.pt,
        description: translation.desc
      };
    }
    return item;
  });
  fs.writeFileSync(fileH, JSON.stringify(updated, null, 2), 'utf-8');
}

if (fs.existsSync(fileI)) {
  const items = JSON.parse(fs.readFileSync(fileI, 'utf-8'));
  const updated = items.map(item => {
    const translation = TABLE_I_TRANSLATIONS[item.name];
    if (translation) {
      return {
        ...item,
        englishName: item.name,
        name: translation.pt,
        description: translation.desc
      };
    }
    return item;
  });
  fs.writeFileSync(fileI, JSON.stringify(updated, null, 2), 'utf-8');
}

console.log("Finished updating local tables with descriptions and Portuguese translations.");
