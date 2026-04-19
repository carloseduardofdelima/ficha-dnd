export interface BaseFeature {
  name: string;
  description: string;
}

export const FEATURE_CATALOG: Record<string, string> = {
  // Bárbaro
  "Rage": "Ação Bônus para entrar em fúria por 10 minutos. Vantagem em testes de Força e TR de Força. Resistência a dano Contundente, Cortante e Perfurante. Bônus de dano de fúria aplicado a ataques de Força.",
  "Unarmored Defense": "Enquanto não estiver usando armadura, sua CA é igual a 10 + mod. Destreza + mod. Constituição. Você pode usar um escudo e ainda ganhar este benefício.",
  "Weapon Mastery": "Você ganha acesso às propriedades de Maestria de armas específicas com as quais você tem proficiência.",
  "Reckless Attack": "No seu primeiro ataque do turno, você pode ganhar vantagem em testes de ataque corpo a corpo usando Força, mas ataques contra você têm vantagem até o seu próximo turno.",
  "Danger Sense": "Você tem vantagem em testes de resistência de Destreza contra efeitos que você pode ver, como armadilhas e magias.",
  "Primal Knowledge": "Você ganha proficiência em uma perícia adicional da lista de perícias do Bárbaro.",
  "Extra Attack": "Você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque no seu turno.",
  "Fast Movement": "Seu deslocamento aumenta em 10 pés enquanto você não estiver usando armadura pesada.",
  "Feral Instinct": "Você tem vantagem em testes de iniciativa. Além disso, se você for surpreendido no início do combate e não estiver incapacitado, você pode agir normalmente no seu primeiro turno se entrar em fúria.",
  "Instinctive Pounce": "Como parte da Ação Bônus que você usa para entrar em fúria, você pode se mover até metade do seu deslocamento.",
  "Brutal Strike": "Ao usar Reckless Attack, você pode abrir mão da vantagem para causar 1d10 de dano extra e aplicar um efeito tático ao alvo.",
  "Relentless Rage": "Se você cair a 0 pontos de vida enquanto estiver em fúria e não morrer instantaneamente, você pode fazer uma salvaguarda de CON (CD 10) para cair a 1 PV em vez disso.",
  "Persistent Rage": "Sua fúria é tão feroz que termina apenas se você ficar inconsciente ou se você decidir encerrá-la.",
  "Indomitable Might": "Se o total de um teste de Força for menor que o seu valor de Força, você pode usar esse valor no lugar do resultado.",
  "Primal Champion": "Seus valores de Força e Constituição aumentam em 4. Seu máximo para esses valores agora é 25.",

  // Bardo
  "Bardic Inspiration": "Você pode inspirar outros através de palavras ou música. Use uma Ação Bônus para dar um Dado de Inspiração a uma criatura a até 60 pés.",
  "Expertise": "O seu bônus de proficiência é dobrado para qualquer teste de habilidade que você fizer que use uma das proficiências escolhidas.",
  "Jack of All Trades": "Você pode adicionar metade do seu bônus de proficiência, arredondado para baixo, a qualquer teste de habilidade que você fizer que ainda não inclua seu bônus de proficiência.",
  "Spellcasting": "Habilidade de conjurar magias usando o seu carisma como atributo principal.",
  "Font of Inspiration": "Você recupera todos os seus usos gastos de Inspiração Bárdica quando termina um descanso curto ou longo.",
  "Countercharm": "Você ganha a habilidade de usar notas musicais ou palavras de poder para interromper efeitos de influência mental.",
  "Magical Secrets": "Você aprende magias de qualquer classe. Essas magias contam como magias de bardo para você e não contam no número de magias conhecidas.",
  "Reliable Talent": "Sempre que você fizer um teste de habilidade que permita adicionar seu bônus de proficiência, você pode tratar um resultado no d20 de 9 ou menos como um 10.",
  "Superior Inspiration": "Quando você rola iniciativa e não tem usos de Inspiração Bárdica restantes, você recupera um uso.",
  "Words of Creation": "Você aprende raras e poderosas palavras que podem alterar a realidade, permitindo conjurar magias poderosas.",

  // Guerreiro
  "Fighting Style": "Você adota um estilo particular de luta como sua especialidade.",
  "Second Wind": "Você tem um reservatório limitado de vigor que pode usar para se curar. Use uma Ação Bônus para recuperar PV iguais a 1d10 + seu nível de guerreiro.",
  "Action Surge": "Você pode forçar o seu limite. No seu turno, você pode realizar uma ação adicional além da sua ação normal e possível ação bônus.",
  "Tactical Mind": "Quando você falha em um teste de perícia, você pode gastar um uso de Second Wind para adicionar 1d10 ao resultado.",
  "Tactical Shift": "Sempre que você usar o seu Second Wind, você pode se mover até metade do seu deslocamento sem provocar ataques de oportunidade.",
  "Indomitable": "Você pode escolher rerrolar uma salvaguarda que tenha falhado. Você deve usar o novo resultado.",
  "Extra Attack II": "O número de ataques que você pode fazer aumenta para três sempre que você usar a ação de Ataque no seu turno.",
  "Extra Attack III": "O número de ataques que você pode fazer aumenta para quatro sempre que você usar a ação de Ataque no seu turno.",

  // Ladino
  "Sneak Attack": "Uma vez por turno, você pode causar dano extra a uma criatura que você atingir com um ataque se tiver vantagem na jogada ou se um aliado estiver a 5 pés do alvo.",
  "Thieves' Cant": "Um dialeto oculto de gírias e códigos que permite esconder mensagens em conversas aparentemente normais.",
  "Cunning Action": "Sua rapidez mental e agilidade permitem que você se mova e aja rapidamente. Você pode usar uma Ação Bônus em cada um dos seus turnos em combate para Disparar, Desengajar ou Esconder.",
  "Cunning Strike": "Você pode abrir mão de dados de Sneak Attack para adicionar efeitos debilitantes aos seus ataques, como derrubar ou cegar o alvo.",
  "Uncanny Dodge": "Quando um atacante que você pode ver atinge você com um ataque, você pode usar sua reação para reduzir o dano do ataque pela metade.",
  "Evasion": "Você pode se esquivar agilmente de certos efeitos de área. Quando você for alvo de um efeito que exige um TR de Destreza para sofrer metade do dano, você não sofre dano se passar e metade se falhar.",
  "Devious Strikes": "Suas manobras de Cunning Strike tornam-se ainda mais perigosas e variadas.",
  "Slippery Mind": "Você ganha proficiência em salvaguardas de Sabedoria e Carisma.",
  "Elusive": "Você é tão esquivo que nenhum atacante ganha vantagem em ataques contra você enquanto você não estiver incapacitado.",
  "Stroke of Luck": "Você tem um talento incrível para ter sucesso quando mais precisa. Se você falhar em um ataque ou teste, você pode transformar em um sucesso automático.",

  // Geral / Outros
  "Melhoria de Atributo ou Talento [ASI]": "Você pode aumentar um valor de atributo à sua escolha em 2, ou dois valores de atributo à sua escolha em 1. Alternativamente, você pode escolher um Talento (Feat).",
  "Subclasse [SC]": "Você escolhe uma especialização para a sua classe, ganhando habilidades únicas baseadas nessa escolha.",
  "Divine Smite": "Quando você atinge uma criatura com um ataque físico, você pode gastar um slot de magia para causar dano radiante extra.",
  "Lay on Hands": "Seu toque abençoado pode curar ferimentos. Você tem uma reserva de pontos de cura igual a 5x seu nível de paladino.",
  "Wild Shape": "Você pode usar sua ação para assumir a forma de uma fera que você já tenha visto.",
  "Arcane Recovery": "Você aprendeu a recuperar parte de sua energia mágica estudando seu grimório. Durante um descanso curto, você pode recuperar slots de magia gastos.",
  "Metamagic": "Você ganha a habilidade de moldar suas magias de acordo com suas necessidades.",
  "Eldritch Invocations": "Em seus estudos de conhecimentos ocultos, você descobriu invocações místicas que o imbuem com habilidades mágicas permanentes."
};

/**
 * Tenta encontrar a descrição de uma habilidade pelo nome.
 * Se não encontrar exatamente, tenta uma busca parcial.
 */
export function getFeatureDescription(name: string): string {
  // Limpeza básica do nome (remove bônus ou níveis entre parênteses)
  const cleanName = name.split('(')[0].split('[')[0].trim();
  
  if (FEATURE_CATALOG[cleanName]) return FEATURE_CATALOG[cleanName];
  
  // Busca parcial
  const entry = Object.entries(FEATURE_CATALOG).find(([key]) => 
    cleanName.toLowerCase().includes(key.toLowerCase()) || 
    key.toLowerCase().includes(cleanName.toLowerCase())
  );
  
  return entry ? entry[1] : "Descrição detalhada não disponível para esta versão das regras.";
}
