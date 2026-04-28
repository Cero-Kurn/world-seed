// modules/naming/landmarkNames.js
// ------------------------------------------------------------
// Landmark Name Generator (canonical biomes + landforms)
// ------------------------------------------------------------
//
// Generates evocative landmark names based on biome, landform,
// special features, and tectonic context. Designed to be modular,
// lore-friendly, and consistent with the world engine.
//

// ------------------------------------------------------------
// WORD POOLS
// ------------------------------------------------------------

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
// UTILITY
// ------------------------------------------------------------
function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// ------------------------------------------------------------
// MAIN LANDMARK NAME GENERATOR
// ------------------------------------------------------------
export function generateLandmarkName(region) {
  const { biome, landform, specialFeature } = region;

  const biomeAdj = pick(BIOME_ADJECTIVES[biome] || ["Ancient"]);
  const featureKey = classifyFeatureKey(landform, specialFeature);
  const featureRoot = pick(FEATURE_ROOTS[featureKey] || FEATURE_ROOTS.generic);

  // Pattern A: Biome adjective + feature root
  if (Math.random() < 0.4) {
    return `The ${biomeAdj} ${featureRoot}`;
  }

  // Pattern B: Feature root + biome adjective modifier
  if (Math.random() < 0.7) {
    return `The ${featureRoot} of ${biomeAdj}`;
  }

  // Pattern C: Simple feature root
  return `The ${featureRoot}`;
}

// ------------------------------------------------------------
// Helper: classify feature key
// ------------------------------------------------------------
function classifyFeatureKey(landform, specialFeature) {
  const f = (specialFeature || "").toLowerCase();

  if (f.includes("coast") || f.includes("shore") || f.includes("bay")) return "coast";
  if (f.includes("reef") || f.includes("sea") || f.includes("ocean")) return "marine";
  if (f.includes("lake") || f.includes("river") || f.includes("delta")) return "freshwater";
  if (f.includes("canyon") || f.includes("gorge") || f.includes("rift")) return "canyon";
  if (f.includes("mountain") || f.includes("peak") || f.includes("range")) return "mountain";
  if (f.includes("desert") || f.includes("dune")) return "desert";
  if (f.includes("marsh") || f.includes("bog") || f.includes("fen")) return "wetland";
  if (f.includes("forest") || f.includes("woods")) return "forest";
  if (f.includes("vent") || f.includes("geyser") || f.includes("lava")) return "geothermal";
  if (f.includes("cave") || f.includes("underground") || f.includes("subterranean")) return "subsurface";

  // fallback to landform classifier
  return landform || "generic";
}
