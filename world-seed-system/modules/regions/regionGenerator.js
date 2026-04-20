// regionGenerator.js

import {
  REGION_TYPES,
  CLIMATE_PATTERNS,
  SUB_FEATURES,
  NARRATIVE_HOOKS
} from "./regionTables.js";

import { buildRegionDescription } from "./regionDescription.js";

// Simple helpers
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function variedTrait(primary, twist) {
  return Math.random() < 0.6 ? primary : twist;
}

export function generateRegions(worldTraits) {
  const regions = [];

  for (let i = 0; i < 6; i++) {
    // Blend primary + twist values for variation
    const biome = variedTrait(worldTraits.we.primary, worldTraits.we.twist);
    const elevation = variedTrait(worldTraits.tr.primary, worldTraits.tr.twist);
    const moisture = variedTrait(worldTraits.hy.primary, worldTraits.hy.twist);
    const specialFeature = variedTrait(worldTraits.sf.primary, worldTraits.sf.twist);

    const type = variedTrait(REGION_TYPES.primary, REGION_TYPES.twist);
    const climatePattern = variedTrait(CLIMATE_PATTERNS.primary, CLIMATE_PATTERNS.twist);

    const subFeatures = [
      randomItem(SUB_FEATURES),
      Math.random() < 0.4 ? randomItem(SUB_FEATURES) : null
    ].filter(Boolean);

    const narrativeHook = variedTrait(NARRATIVE_HOOKS.primary, NARRATIVE_HOOKS.twist);

    const region = {
      name: `Region ${i + 1}`,
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

    region.description = buildRegionDescription(region);
    regions.push(region);
  }

  return regions;
}
