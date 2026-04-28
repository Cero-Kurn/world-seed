// modules/world/climateEngine.js
// ------------------------------------------------------------
// Climate Engine (canonical biome system)
// ------------------------------------------------------------
//
// This module orchestrates climate smoothing, biome drift,
// adjacency enforcement, and long-term climate evolution.
//
// It sits ABOVE regionGenerator.js and BELOW narrative layers.
//
// Used by:
// - world simulation
// - climate overlays
// - seasonal variation
// - region evolution
//

import { BIOME_ADJACENCY, canBiomesTouch } from "../climate/biomeSmoothing.js";
import { driftBiome } from "../climate/biomeTendencies.js";
import { BIOMES } from "../data/biomes.js";

// ------------------------------------------------------------
// MAIN ENTRY: apply climate logic to all regions
// ------------------------------------------------------------
export function applyClimateEngine(regions) {
  // 1. Apply biome drift (warming/cooling/drying/wetting)
  const drifted = regions.map(applyBiomeDrift);

  // 2. Apply adjacency smoothing
  const smoothed = smoothBiomeAdjacency(drifted);

  // 3. Stabilize invalid or rare edge cases
  const stabilized = stabilizeBiomes(smoothed);

  return stabilized;
}

// ------------------------------------------------------------
// STEP 1: Biome Drift
// ------------------------------------------------------------
function applyBiomeDrift(region) {
  const { biome, climatePattern, moisture } = region;

  // Determine climate pressure
  const pressure = classifyClimatePressure(climatePattern, moisture);

  // Drift biome
  const newBiome = driftBiome(biome, pressure);

  return {
    ...region,
    biome: newBiome
  };
}

function classifyClimatePressure(climatePattern, moisture) {
  const c = climatePattern.toLowerCase();
  const m = moisture.toLowerCase();

  if (c.includes("tropical") && m === "dry") return "drying";
  if (c.includes("tropical") && m === "wet") return "wetting";
  if (c.includes("temperate") && m === "dry") return "drying";
  if (c.includes("polar")) return "cooling";
  if (c.includes("warm") || c.includes("hot")) return "warming";

  return "moderate";
}

// ------------------------------------------------------------
// STEP 2: Adjacency Smoothing
// ------------------------------------------------------------
function smoothBiomeAdjacency(regions) {
  const result = [...regions];

  for (let i = 0; i < regions.length; i++) {
    const region = regions[i];
    const neighbors = region.neighbors || [];

    const neighborBiomes = neighbors
      .map((idx) => regions[idx]?.biome)
      .filter(Boolean);

    // If all neighbors agree, adopt the majority biome
    const majority = findMajorityBiome(neighborBiomes);
    if (majority && majority !== region.biome) {
      if (canBiomesTouch(region.biome, majority)) {
        result[i] = { ...region, biome: majority };
        continue;
      }
    }

    // If region biome is incompatible with all neighbors, soften it
    const compatible = neighborBiomes.find((b) =>
      canBiomesTouch(region.biome, b)
    );

    if (!compatible) {
      // fallback to closest biome in adjacency list
      const fallback = BIOME_ADJACENCY[region.biome]?.[0];
      if (fallback) {
        result[i] = { ...region, biome: fallback };
      }
    }
  }

  return result;
}

function findMajorityBiome(list) {
  if (list.length === 0) return null;

  const counts = {};
  list.forEach((b) => (counts[b] = (counts[b] || 0) + 1));

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// ------------------------------------------------------------
// STEP 3: Stabilization
// ------------------------------------------------------------
function stabilizeBiomes(regions) {
  return regions.map((region) => {
    if (!BIOMES.includes(region.biome)) {
      return {
        ...region,
        biome: "Grassland" // safe fallback
      };
    }
    return region;
  });
}
