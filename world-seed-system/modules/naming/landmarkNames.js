// modules/naming/landmarkNames.js
// ------------------------------------------------------------
// Landmark Name Generator (fixed + normalized)
// ------------------------------------------------------------
import { pick } from "../util/pick.js";

const FEATURE_ROOTS = {
  coast: ["Cliffs", "Shoals", "Tidewall", "Saltspires"],
  marine: ["Reef", "Deeps", "Blue Shoals", "Sea Arches"],
  freshwater: ["Falls", "Delta", "Riverbend", "Lakeward Stones"],
  canyon: ["Rift", "Chasm", "Gorge", "Break"],
  mountain: ["Peak", "Crest", "Highspire", "Crown"],
  desert: ["Dunecrest", "Sunspire", "Sandwall", "Mirage Flats"],
  wetland: ["Reedfen", "Boglight", "Mirestone", "Fenreach"],
  forest: ["Greenwall", "Timberfall", "Leafspire", "Rootspire"],
  geothermal: ["Ember Vents", "Ashen Rise", "Steam Pits", "Fireholes"],
  subsurface: ["Hollow", "Underdeep", "Cavern Gate", "Shadow Vault"],
  generic: ["Stone", "Reach", "Spire", "Rise"]
};

const BIOME_ADJECTIVES = {
  "Tundra": ["Frost", "Pale", "Icebound"],
  "Alpine": ["Sky", "Silver", "High"],
  "Taiga Forests": ["Pine", "Frostpine", "Needle"],
  "Temperate Forests": ["Green", "Leaf", "Verdant"],
  "Tropical Forests": ["Emerald", "Jade", "Deep"],
  "Grassland": ["Golden", "Wind", "Open"],
  "Savanna": ["Amber", "Sun", "Lion"],
  "Shrubland": ["Dry", "Thorn", "Scrub"],
  "Wetlands": ["Reed", "Mire", "Fen"],
  "Desert": ["Sun", "Dune", "Sand"],
  "Coastal": ["Salt", "Tide", "Wave"],
  "Freshwater": ["River", "Lake", "Delta"],
  "Marine": ["Blue", "Deep", "Sea"],
  "Geothermal": ["Ember", "Ash", "Fire"],
  "Subsurface": ["Shadow", "Hollow", "Under"]
};

// ------------------------------------------------------------
// NORMALIZATION
// ------------------------------------------------------------
function normalizeFeatureKey(landform, specialFeature) {
  const f = (specialFeature || "").toLowerCase();
  const l = (landform || "").toLowerCase();

  if (f.includes("coast") || l.includes("coast")) return "coast";
  if (f.includes("reef") || f.includes("sea") || l.includes("marine")) return "marine";
  if (f.includes("lake") || f.includes("river") || f.includes("delta")) return "freshwater";
  if (f.includes("canyon") || f.includes("gorge") || f.includes("rift")) return "canyon";
  if (f.includes("mountain") || l.includes("mountain")) return "mountain";
  if (f.includes("desert") || l.includes("desert")) return "desert";
  if (f.includes("marsh") || f.includes("bog") || l.includes("wetland")) return "wetland";
  if (f.includes("forest") || l.includes("forest")) return "forest";
  if (f.includes("vent") || f.includes("lava") || l.includes("geo")) return "geothermal";
  if (f.includes("cave") || f.includes("subterr") || l.includes("subsurface")) return "subsurface";

  return "generic";
}

// ------------------------------------------------------------
// UTILITY
// ------------------------------------------------------------
function pick(list, rng) {
  return list[Math.floor(rng() * list.length)];
}

// ------------------------------------------------------------
// MAIN LANDMARK NAME GENERATOR
// ------------------------------------------------------------
export function generateLandmarkName(region) {
  const biomeAdj = pick(BIOME_ADJECTIVES[region.biome] || ["Ancient"]);
  const featureKey = normalizeFeatureKey(region.landform, region.specialFeature);
  const featureRoot = pick(FEATURE_ROOTS[featureKey] || FEATURE_ROOTS.generic);

  // Pattern A
  if (rng() < 0.4) {
    return `The ${biomeAdj} ${featureRoot}`;
  }

  // Pattern B
  if (rng() < 0.7) {
    return `The ${featureRoot} of ${biomeAdj}`;
  }

  // Pattern C
  return `The ${featureRoot}`;
}
