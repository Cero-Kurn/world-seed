// modules/world/worldSimulation.js
// ------------------------------------------------------------
// World Simulation Orchestrator (canonical biome system)
// ------------------------------------------------------------
//
// This module ties together:
// - region generation
// - climate engine
// - naming (regions + landmarks)
// - region descriptions
//
// It produces a fully realized world model from a decoded seed.
//

import { generateRegions } from "../regions/regionGenerator.js";
import { applyClimateEngine } from "./climateEngine.js";
import { generateRegionName } from "../naming/regionNames.js";
import { generateLandmarkName } from "../naming/landmarkNames.js";
import { buildRegionDescription } from "../regions/regionDescription.js";

export function simulateWorld(decodedSeed) {
  // ------------------------------------------------------------
  // 1. Generate base regions
  // ------------------------------------------------------------
  let regions = generateRegions(decodedSeed);

  // ------------------------------------------------------------
  // 2. Apply climate engine (drift + smoothing + stabilization)
  // ------------------------------------------------------------
  regions = applyClimateEngine(regions);

  // ------------------------------------------------------------
  // 3. Apply naming (region + landmark)
  // ------------------------------------------------------------
  regions = regions.map((region) => ({
    ...region,
    name: generateRegionName(region),
    landmark: generateLandmarkName(region)
  }));

  // ------------------------------------------------------------
  // 4. Apply narrative descriptions
  // ------------------------------------------------------------
  regions = regions.map((region) => ({
    ...region,
    description: buildRegionDescription(region)
  }));

  // ------------------------------------------------------------
  // 5. Return final world model
  // ------------------------------------------------------------
  return {
    seed: decodedSeed,
    regions
  };
}
