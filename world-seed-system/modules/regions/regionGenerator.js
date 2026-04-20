// regionGenerator.js

import {
  REGION_TYPES,
  CLIMATE_PATTERNS,
  SUB_FEATURES,
  NARRATIVE_HOOKS
} from "./regionTables.js";

import { pickBiome } from "../biomes/biomeGenerator.js"; 
// ^ adjust this path if needed

// Fallback randomItem if utils.js doesn't export it
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRegion(index, worldTraits) {
  // SAFELY extract traits
  const biome = pickBiome(worldTraits);

  const elevation =
    worldTraits.tr?.primary ||
    worldTraits.tr ||
    "Unknown elevation";

  const moisture =
    worldTraits.hy?.primary ||
    worldTraits.hy ||
    "Unknown moisture";

  const specialFeature =
    worldTraits.sf?.primary ||
    worldTraits.sf ||
    "Unknown feature";

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
    description: "" // filled in later by regionDescription.js
  };
}
