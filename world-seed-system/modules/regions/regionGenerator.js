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
    const region = {
      name: `Region ${i + 1}`,

      // Existing fields
      biome: worldTraits.we.primary,
      elevation: worldTraits.tr.primary,
      moisture: worldTraits.hy.primary,
      feature: worldTraits.sf.primary,

      // NEW FIELDS
      type: randomItem(REGION_TYPES),
      climatePattern: randomItem(CLIMATE_PATTERNS),
      subFeatures: [
        randomItem(SUB_FEATURES),
        Math.random() < 0.4 ? randomItem(SUB_FEATURES) : null
      ].filter(Boolean),
      narrativeHook: randomItem(NARRATIVE_HOOKS),

      description: ""
    };

    region.description = buildRegionDescription(region);
    regions.push(region);
  }

  return regions;
}
