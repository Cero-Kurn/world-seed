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

// MAIN FUNCTION — app.js calls THIS
export function generateRegions(worldTraits) {
  const regions = [];

  // Generate 6 regions (or change number if needed)
  for (let i = 0; i < 6; i++) {
    const region = generateSingleRegion(i, worldTraits);
    region.description = buildRegionDescription(region);
    regions.push(region);
  }

  return regions;
}

// INTERNAL — generates ONE region
function generateSingleRegion(index, worldTraits) {
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
    description: ""
  };
}
