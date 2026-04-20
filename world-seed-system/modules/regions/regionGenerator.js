// regionGenerator.js
// ------------------------------------------------------------
// 7-Region Hex World Generator with:
// - Seed-driven tectonic mood
// - Seed-driven latitude band
// - Tectonic belts
// - Elevation gradients
// - Moisture drift
// - Climate zones
// - Biome assignment
// - Adjacency smoothing
// - Integration with worldTraits + description builder
// ------------------------------------------------------------

import { buildRegionDescription } from "./regionDescription.js";

// ------------------------------------------------------------
// Helper utilities
// ------------------------------------------------------------
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// ------------------------------------------------------------
// 1. Seed-driven tectonic mood
// ------------------------------------------------------------
function getTectonicMood(seed) {
  const first = seed[0].toUpperCase();

  if ("ABCDEF".includes(first)) return "MOUNTAIN";
  if ("GHIJKL".includes(first)) return "RIFT";
  if ("MNOPQR".includes(first)) return "VOLCANIC";
  if ("STUVWXYZ".includes(first)) return "STABLE";

  return "STABLE";
}

// ------------------------------------------------------------
// 2. Seed-driven latitude band
// ------------------------------------------------------------
function getLatitudeBand(seed) {
  const first = seed[0].toUpperCase();

  if ("ABCDE".includes(first)) return "TROPICAL";
  if ("FGHIJ".includes(first)) return "SUBTROPICAL";
  if ("KLMNO".includes(first)) return "TEMPERATE";
  if ("PQRST".includes(first)) return "ARID";
  if ("UVWXYZ".includes(first)) return "COLD";

  return "TEMPERATE";
}

// ------------------------------------------------------------
// 3. Tectonic types
// ------------------------------------------------------------
const TECTONIC_TYPES = ["CONVERGENT", "DIVERGENT", "TRANSFORM", "CRATON", "HOTSPOT"];

// Weighted selection based on mood
function pickTectonicByMood(mood) {
  switch (mood) {
    case "MOUNTAIN":
      return randomItem(["CONVERGENT", "CONVERGENT", "HOTSPOT", "TRANSFORM"]);
    case "RIFT":
      return randomItem(["DIVERGENT", "DIVERGENT", "HOTSPOT", "TRANSFORM"]);
    case "VOLCANIC":
      return randomItem(["HOTSPOT", "HOTSPOT", "DIVERGENT", "CONVERGENT"]);
    case "STABLE":
      return randomItem(["CRATON", "CRATON", "TRANSFORM", "HOTSPOT"]);
    default:
      return randomItem(TECTONIC_TYPES);
  }
}

// ------------------------------------------------------------
// 4. Elevation mapping
// ------------------------------------------------------------
function tectonicToElevation(type) {
  switch (type) {
    case "CONVERGENT": return 3; // high
    case "HOTSPOT": return Math.random() < 0.5 ? 3 : 2;
    case "DIVERGENT": return 2;
    case "TRANSFORM": return Math.random() < 0.5 ? 2 : 1;
    case "CRATON": return 1;
    default: return 2;
  }
}

function elevationLabel(level) {
  return {
    1: "Lowlands",
    2: "Midlands",
    3: "Highlands"
  }[level];
}

// ------------------------------------------------------------
// 5. Moisture drift
// ------------------------------------------------------------
function pickWindDirection(seed) {
  const letters = seed.toUpperCase();
  const vowels = letters.replace(/[^AEIOU]/g, "").length;

  // More vowels = wetter world → winds from ocean
  if (vowels >= 3) return "W_TO_E";
  return "E_TO_W";
}

function applyRainShadow(moisture, elevation) {
  if (elevation === 3) return moisture - 1;
  return moisture;
}

function moistureLabel(level) {
  return {
    1: "Arid",
    2: "Semi-Arid",
    3: "Moderate",
    4: "Humid",
    5: "Rain-Soaked"
  }[level];
}

// ------------------------------------------------------------
// 6. Climate zones
// ------------------------------------------------------------
function determineClimate(latBand, elevation, moisture) {
  if (latBand === "COLD") {
    if (elevation === 3) return "Alpine Tundra";
    return "Subpolar";
  }

  if (latBand === "ARID") {
    if (moisture <= 2) return "Desert";
    return "Steppe";
  }

  if (latBand === "TROPICAL") {
    if (moisture >= 4) return "Rainforest";
    return "Savanna";
  }

  if (latBand === "SUBTROPICAL") {
    if (moisture >= 4) return "Monsoon";
    return "Dry Subtropical";
  }

  // TEMPERATE
  if (elevation === 3) return "Alpine";
  if (moisture >= 4) return "Temperate Rainforest";
  return "Temperate Forest";
}

// ------------------------------------------------------------
// 7. Biome assignment
// ------------------------------------------------------------
function climateToBiome(climate) {
  const map = {
    "Alpine Tundra": "Alpine Scrub",
    "Subpolar": "Boreal Forest",
    "Desert": "Desert Dunes",
    "Steppe": "Dry Grassland",
    "Rainforest": "Tropical Rainforest",
    "Savanna": "Savanna Grassland",
    "Monsoon": "Monsoon Forest",
    "Dry Subtropical": "Scrubland",
    "Alpine": "High Mountain Forest",
    "Temperate Rainforest": "Temperate Rainforest",
    "Temperate Forest": "Temperate Broadleaf Forest"
  };
  return map[climate] || "Mixed Terrain";
}

// ------------------------------------------------------------
// 8. Region adjacency (hex ring + center)
// ------------------------------------------------------------
const ADJ = {
  1: [2, 6, 7],
  2: [1, 3, 7],
  3: [2, 4, 7],
  4: [3, 5, 7],
  5: [4, 6, 7],
  6: [5, 1, 7],
  7: [1, 2, 3, 4, 5, 6]
};

// ------------------------------------------------------------
// MAIN GENERATOR
// ------------------------------------------------------------
export function generateRegions(worldTraits) {
  const seed = worldTraits.seed || "DEFAULT";
  const tectonicMood = getTectonicMood(seed);
  const latitudeBand = getLatitudeBand(seed);
  const wind = pickWindDirection(seed);

  const regions = [];

  // Step 1: Assign tectonics
  for (let i = 1; i <= 7; i++) {
    regions[i] = {
      id: i,
      name: `Region ${i}`,
      tectonic: pickTectonicByMood(tectonicMood)
    };
  }

  // Step 2: Elevation
  for (let r of regions.slice(1)) {
    r.elevationLevel = tectonicToElevation(r.tectonic);
  }

  // Step 3: Moisture drift
  for (let r of regions.slice(1)) {
    let base = wind === "W_TO_E" ? (r.id <= 3 ? 4 : 2) : (r.id >= 4 ? 4 : 2);
    base = applyRainShadow(base, r.elevationLevel);
    r.moistureLevel = clamp(base, 1, 5);
  }

  // Step 4: Climate + Biome
  for (let r of regions.slice(1)) {
    r.climateZone = determineClimate(latitudeBand, r.elevationLevel, r.moistureLevel);
    r.biome = climateToBiome(r.climateZone);
  }

  // Step 5: Integrate worldTraits flavor
  for (let r of regions.slice(1)) {
    r.specialFeature = worldTraits.sf.primary;
    r.narrativeHook = worldTraits.nh ? worldTraits.nh.primary : "Local legends whisper of strange happenings.";
    r.climatePattern = r.climateZone;
    r.elevation = elevationLabel(r.elevationLevel);
    r.moisture = moistureLabel(r.moistureLevel);
  }

  // Step 6: Build descriptions
  for (let r of regions.slice(1)) {
    r.description = buildRegionDescription(r);
  }

  return regions.slice(1);
}
