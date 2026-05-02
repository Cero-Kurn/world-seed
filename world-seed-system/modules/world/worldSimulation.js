// modules/world/worldSimulation.js
// ------------------------------------------------------------
// World Simulation Orchestrator (canonical biome system)
// ------------------------------------------------------------

import { generateRegions } from "../regions/regionGenerator.js";
import { applyClimateEngine } from "./climateEngine.js";
import { generateRegionName } from "../naming/regionNames.js";
import { generateLandmarkName } from "../naming/landmarkNames.js";
import { buildRegionDescription } from "../regions/regionDescription.js";

export function simulateWorld(decodedSeed, rng) {
  // ------------------------------------------------------------
  // 1. Generate base regions (now deterministic)
  // ------------------------------------------------------------
  let regions = generateRegions(decodedSeed, rng);

  // ------------------------------------------------------------
  // 2. Apply climate engine
  // ------------------------------------------------------------
  regions = applyClimateEngine(regions);

  // ------------------------------------------------------------
  // 3. Apply naming (region + landmark) with rng
  // ------------------------------------------------------------
  regions = regions.map((region) => ({
    ...region,
    name: generateRegionName(region, rng),
    landmark: generateLandmarkName(region, rng)
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
