// regionGenerator.js

import {
  REGION_TYPES,
  CLIMATE_PATTERNS,
  SUB_FEATURES,
  NARRATIVE_HOOKS
} from "./regionTables.js";

import { buildRegionDescription } from "./regionDescription.js";

// Simple helper
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRegions(worldTraits) {
  const regions = [];

  for (let i = 0; i < 6; i++) {
    const biome = worldTraits.we.primary;
    const elevation = worldTraits.tr.primary;
    const moisture = worldTraits.hy.primary;
    const specialFeature = worldTraits.sf.primary;

    const type = randomItem(REGION_TYPES);
    const climatePattern = randomItem(CLIMATE_PATTERNS);

    const subFeatures = [
      randomItem(SUB_FEATURES),
      Math.random() < 0.4 ? randomItem(SUB_FEATURES) : null
    ].filter(Boolean);

    const narrativeHook = randomItem(NARRATIVE_HOOKS);

    const region = {
      name: `Region ${i + 1}`,
      type,
      biome,
      elevation,
      moisture,
      climatePattern,
      subFeatures,
      specialFeature,   // ✔ matches description + UI
      narrativeHook,
      description: ""
    };

    region.description = buildRegionDescription(region);
    regions.push(region);
  }

  return regions;
}
