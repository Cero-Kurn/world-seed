// regionGenerator.js

import {
  REGION_TYPES,
  CLIMATE_PATTERNS,
  SUB_FEATURES,
  NARRATIVE_HOOKS
} from "./regionTables.js";

// Simple helper — safe and self-contained
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRegion(index, worldTraits) {
  // These come directly from your decoded seed structure
  const biome = worldTraits.we.primary;        // biome is based on wind/rainfall model
  const elevation = worldTraits.tr.primary;    // tectonic/elevation model
  const moisture = worldTraits.hy.primary;     // hydrology model
  const specialFeature = worldTraits.sf.primary;

  // New fields
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
