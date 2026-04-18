const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/carlo/Documents/Projetos/ficha-dnd/public/assets/spells-icons';

const mapping = {
  // Row 1
  'row-1-column-1.png': 'ice-grasp.png',
  'row-1-column-2.png': 'protection-field.png',
  'row-1-column-3.png': 'poison-spray.png',
  'row-1-column-4.png': 'water-droplets.png',
  'row-1-column-5.png': 'frost-shards.png',
  'row-1-column-6.png': 'flame-breath.png',
  'row-1-column-7.png': 'haste-feet.png',
  'row-1-column-8.png': 'arcane-bolts.png',
  'row-1-column-9.png': 'magic-potion.png',
  'row-1-column-10.png': 'sun-flare.png',
  'row-1-column-11.png': 'sparkles.png',
  'row-1-column-12.png': 'cosmic-vortex.png',

  // Row 2
  'row-2-column-1.png': 'vine-entangle.png',
  'row-2-column-2.png': 'pink-fog.png',
  'row-2-column-3.png': 'magic-scroll.png',
  'row-2-column-4.png': 'star-compass.png',
  'row-2-column-5.png': 'frost-cone.png',
  'row-2-column-6.png': 'fire-blast.png',
  'row-2-column-7.png': 'teleport-swirl.png',
  'row-2-column-8.png': 'shadow-tentacles.png',
  'row-2-column-9.png': 'light-sphere.png',
  'row-2-column-10.png': 'dark-vision.png',
  'row-2-column-11.png': 'eagle-eyes.png',
  'row-2-column-12.png': 'mind-waves.png',

  // Row 3
  'row-3-column-1.png': 'holy-cross.png',
  'row-3-column-2.png': 'nature-growth.png',
  'row-3-column-3.png': 'all-seeing-eye.png',
  'row-3-column-4.png': 'elemental-spiral.png',
  'row-3-column-5.png': 'ice-shield.png',
  'row-3-column-6.png': 'fire-shield.png',
  'row-3-column-7.png': 'lightning-shield.png',
  'row-3-column-8.png': 'nature-shield.png',
  'row-3-column-9.png': 'galaxy-swirl.png',
  'row-3-column-10.png': 'void-portal.png',
  'row-3-column-11.png': 'undead-claws.png',
  'row-3-column-12.png': 'heart-heal.png',

  // Row 4
  'row-4-column-1.png': 'spell-book.png',
  'row-4-column-2.png': 'divine-heal.png',
  'row-4-column-3.png': 'heavy-helmet.png',
  'row-4-column-4.png': 'steel-shield.png',
  'row-4-column-5.png': 'flaming-sword.png',
  'row-4-column-6.png': 'frozen-sword.png',
  'row-4-column-7.png': 'electric-sword.png',
  'row-4-column-8.png': 'poison-dagger.png',
  'row-4-column-9.png': 'ritual-candle.png',
  'row-4-column-10.png': 'scrying-orb.png',
  'row-4-column-11.png': 'wizard-staff.png',
  'row-4-column-12.png': 'holy-mace.png',

  // Row 5
  'row-5-column-1.png': 'wolf-howl.png',
  'row-5-column-2.png': 'bear-roar.png',
  'row-5-column-3.png': 'eagle-call.png',
  'row-5-column-4.png': 'dragon-roar.png',
  'row-5-column-5.png': 'nature-spirit.png',
  'row-5-column-6.png': 'spider-web.png',
  'row-5-column-7.png': 'moon-crescent.png',
  'row-5-column-8.png': 'sun-rays.png',
  'row-5-column-9.png': 'comet-strike.png',
  'row-5-column-10.png': 'meteor-shower.png',
  'row-5-column-11.png': 'black-hole.png',
  'row-5-column-12.png': 'starlight-nova.png',

  // Row 6
  'row-6-column-1.png': 'binding-chains.png',
  'row-6-column-2.png': 'arcane-lock.png',
  'row-6-column-3.png': 'skeleton-key.png',
  'row-6-column-4.png': 'mirror-image.png',
  'row-6-column-5.png': 'feather-fall.png',
  'row-6-column-6.png': 'heavy-weight.png',
  'row-6-column-7.png': 'invisibility.png',
  'row-6-column-8.png': 'truth-vision.png',
  'row-6-column-9.png': 'brain-psionic.png',
  'row-6-column-10.png': 'time-sand.png',
  'row-6-column-11.png': 'time-stop.png',
  'row-6-column-12.png': 'gravitational-pull.png',

  // Row 7
  'row-7-column-1.png': 'mighty-fist.png',
  'row-7-column-2.png': 'wind-gust.png',
  'row-7-column-3.png': 'earthquake.png',
  'row-7-column-4.png': 'snowflake-large.png',
  'row-7-column-5.png': 'lightning-bolt.png',
  'row-7-column-6.png': 'acid-puddle.png',
  'row-7-column-7.png': 'ember-spark.png',
  'row-7-column-8.png': 'prismatic-orb.png',
  'row-7-column-9.png': 'arcane-disintegration.png',
  'row-7-column-10.png': 'wish-grant.png',
  'row-7-column-11.png': 'fist-power.png',
  'row-7-column-12.png': 'divine-presence.png',

  // Row 8
  'row-8-column-1.png': 'magic-sparks.png',
  'row-8-column-2.png': 'flame-circle.png',
  'row-8-column-3.png': 'spirit-group.png',
  'row-8-column-4.png': 'wall-protection.png',
  'row-8-column-5.png': 'astral-projection.png',
  'row-8-column-6.png': 'alchemist-flask.png',
  'row-8-column-7.png': 'arrow-rain.png',
  'row-8-column-8.png': 'wraith-calling.png',
  'row-8-column-9.png': 'speed-step.png',
  'row-8-column-10.png': 'crescent-moon-sun.png',
  'row-8-column-11.png': 'holy-armor.png',
  'row-8-column-12.png': 'warrior-mask.png',

  // Row 9
  'row-9-column-1.png': 'poison-cloud.png',
  'row-9-column-2.png': 'ghostly-runner.png',
  'row-9-column-3.png': 'triple-fireball.png',
  'row-9-column-4.png': 'undead-skull.png',
  'row-9-column-5.png': 'interplanar-portal.png',
  'row-9-column-6.png': 'wild-fire.png',
  'row-9-column-7.png': 'spider-nest.png'
};

Object.entries(mapping).forEach(([oldName, newName]) => {
  const oldPath = path.join(dir, oldName);
  const newPath = path.join(dir, newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  } else {
    console.warn(`File not found: ${oldName}`);
  }
});
