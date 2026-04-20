// regionDescription.js
// ------------------------------------------------------------
// Builds a natural-language description for each region
// using the new tectonic + climate + biome world model.
// ------------------------------------------------------------

export function buildRegionDescription(region) {
  const {
    name,
    tectonic,
    elevation,
    moisture,
    climateZone,
    biome,
    specialFeature,
    narrativeHook
  } = region;

  // Tectonic flavor text
  const tectonicText = {
    CONVERGENT: "shaped by powerful convergent boundaries, where landmasses collide and thrust towering ranges upward",
    DIVERGENT: "defined by divergent forces that pull the land apart, forming rift valleys and volcanic plains",
    TRANSFORM: "fractured by transform faults, where grinding plates create unstable terrain and rugged escarpments",
    CRATON: "resting on an ancient craton, a stable heart of the continent with long‑settled landscapes",
    HOTSPOT: "formed above a volcanic hotspot, where plumes of molten rock create dramatic uplifts and lava‑rich soils"
  }[tectonic];

  // Elevation flavor
  const elevationText = {
    Lowlands: "broad lowlands with gentle relief",
    Midlands: "rolling midlands shaped by gradual uplift",
    Highlands: "steep highlands carved by tectonic pressure"
  }[elevation];

  // Moisture flavor
  const moistureText = {
    "Arid": "dry air and scarce rainfall",
    "Semi-Arid": "limited moisture and seasonal rains",
    "Moderate": "balanced precipitation throughout the year",
    "Humid": "heavy moisture carried on prevailing winds",
    "Rain-Soaked": "near‑constant rainfall and saturated ground"
  }[moisture];

  // Climate flavor
  const climateText = {
    "Alpine Tundra": "icy alpine tundra where only the hardiest life survives",
    "Subpolar": "cold subpolar conditions with long winters",
    "Desert": "sun‑scorched desert climate",
    "Steppe": "dry steppe grasslands",
    "Rainforest": "lush tropical rainforest",
    "Savanna": "warm savanna plains",
    "Monsoon": "intense monsoon cycles",
    "Dry Subtropical": "warm, dry subtropical air",
    "Alpine": "thin alpine atmosphere",
    "Temperate Rainforest": "cool, mist‑laden temperate rainforest",
    "Temperate Forest": "mild temperate forest climate"
  }[climateZone];

  return `
    ${name} is ${tectonicText}. It features ${elevationText} and experiences ${moistureText}.
    The region falls within a ${climateText}, giving rise to a ${biome} biome.
    A notable characteristic of this area is its ${specialFeature}.
    ${narrativeHook}
  `.trim();
}
