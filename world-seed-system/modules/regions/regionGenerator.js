// regionGenerator.js

import {
  REGION_TYPES,
  CLIMATE_PATTERNS,
  SUB_FEATURES,
  NARRATIVE_HOOKS
} from "./regionTables.js";

import { pickBiome } from "./biomeGenerator.js"; // your existing biome logic
import { randomItem } from "./utils.js";         // helper: pick random array item

export function generateRegion(index, worldTraits) {
  const biome = pickBiome(worldTraits);
  const elevation = pickElevation(worldTraits);
  const moisture = pickMoisture(worldTraits);
  const specialFeature = pickSpecialFeature(worldTraits);

  const type = randomItem(REGION_TYPES);
  const climatePattern = randomItem(CLIMATE_PATTERNS);

  // 1–2 sub-features
  const subFeatures = [
    randomItem(SUB_FEATURES),
    Math.random() < 0.4 ? randomItem(SUB_FEATURES) : null
  ].filter(Boolean);

  const narrativeHook = randomItem(NARRATIVE_HOOKS);

  return {
    name: `Region ${index + 1}`,
    type,
    biome,
    elevation,
    moisture,
    climatePattern,
    subFeatures,
    specialFeature,
    narrativeHook,
    description: "" // filled in later
  };
}

// Placeholder functions — these already exist in your system
function pickElevation(worldTraits) {
  return worldTraits.tr.primary;
}

function pickMoisture(worldTraits) {
  return worldTraits.hy.primary;
}

function pickSpecialFeature(worldTraits) {
  return worldTraits.sf.primary;
}
