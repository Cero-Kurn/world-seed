// modules/climate/biomeTendencies.js
// ------------------------------------------------------------
// Biome Tendencies (canonical climate drift rules)
// ------------------------------------------------------------
//
// These rules define how each biome tends to shift under
// climate pressure: warming, cooling, drying, or wetting.
//
// This is used by:
// - climate evolution
// - region history
// - seasonal variation
// - long-term world simulation
//

export const BIOME_TENDENCIES = {
  // ------------------------------------------------------------
  // COLD BIOMES
  // ------------------------------------------------------------
  "Tundra": {
    warmsTo: "Taiga Forests",
    coolsTo: "Tundra",
    driesTo: "Shrubland",
    wetsTo: "Wetlands"
  },

  "Alpine": {
    warmsTo: "Taiga Forests",
    coolsTo: "Alpine",
    driesTo: "Shrubland",
    wetsTo: "Taiga Forests"
  },

  "Taiga Forests": {
    warmsTo: "Temperate Forests",
    coolsTo: "Tundra",
    driesTo: "Grassland",
    wetsTo: "Wetlands"
  },

  // ------------------------------------------------------------
  // TEMPERATE BIOMES
  // ------------------------------------------------------------
  "Temperate Forests": {
    warmsTo: "Savanna",
    coolsTo: "Taiga Forests",
    driesTo: "Grassland",
    wetsTo: "Wetlands"
  },

  "Grassland": {
    warmsTo: "Savanna",
    coolsTo: "Temperate Forests",
    driesTo: "Shrubland",
    wetsTo: "Wetlands"
  },

  "Shrubland": {
    warmsTo: "Desert",
    coolsTo: "Grassland",
    driesTo: "Desert",
    wetsTo: "Grassland"
  },

  // ------------------------------------------------------------
  // TROPICAL BIOMES
  // ------------------------------------------------------------
  "Tropical Forests": {
    warmsTo: "Savanna",
    coolsTo: "Temperate Forests",
    driesTo: "Savanna",
    wetsTo: "Wetlands"
  },

  "Savanna": {
    warmsTo: "Desert",
    coolsTo: "Grassland",
    driesTo: "Desert",
    wetsTo: "Tropical Forests"
  },

  // ------------------------------------------------------------
  // ARID BIOMES
  // ------------------------------------------------------------
  "Desert": {
    warmsTo: "Desert",
    coolsTo: "Shrubland",
    driesTo: "Desert",
    wetsTo: "Shrubland"
  },

  // ------------------------------------------------------------
  // WET BIOMES
  // ------------------------------------------------------------
  "Wetlands": {
    warmsTo: "Tropical Forests",
    coolsTo: "Taiga Forests",
    driesTo: "Grassland",
    wetsTo: "Wetlands"
  },

  "Freshwater": {
    warmsTo: "Wetlands",
    coolsTo: "Wetlands",
    driesTo: "Wetlands",
    wetsTo: "Freshwater"
  },

  "Coastal": {
    warmsTo: "Tropical Forests",
    coolsTo: "Temperate Forests",
    driesTo: "Shrubland",
    wetsTo: "Marine"
  },

  "Marine": {
    warmsTo: "Marine",
    coolsTo: "Marine",
    driesTo: "Coastal",
    wetsTo: "Marine"
  },

  // ------------------------------------------------------------
  // SPECIAL BIOMES
  // ------------------------------------------------------------
  "Geothermal": {
    warmsTo: "Geothermal",
    coolsTo: "Shrubland",
    driesTo: "Desert",
    wetsTo: "Wetlands"
  },

  "Subsurface": {
    warmsTo: "Subsurface",
    coolsTo: "Subsurface",
    driesTo: "Subsurface",
    wetsTo: "Subsurface"
  }
};

// ------------------------------------------------------------
// Helper: get drift result for a biome under a climate pressure
// ------------------------------------------------------------
export function driftBiome(biome, pressure) {
  const entry = BIOME_TENDENCIES[biome];
  if (!entry) return biome;

  switch (pressure) {
    case "warming":
      return entry.warmsTo;
    case "cooling":
      return entry.coolsTo;
    case "drying":
      return entry.driesTo;
    case "wetting":
      return entry.wetsTo;
    default:
      return biome;
  }
}


