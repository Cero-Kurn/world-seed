// modules/climate/biomeSmoothing.js
// ------------------------------------------------------------
// Biome Smoothing Rules (canonical adjacency)
// ------------------------------------------------------------
//
// These rules define which biomes can reasonably border each
// other. They prevent contradictions (e.g., Tundra next to
// Tropical Forests) and help climate modules produce smooth,
// believable transitions.
//
// This is used by climate smoothing, region blending, and
// narrative consistency modules.
//

export const BIOME_ADJACENCY = {
  "Tundra": [
    "Alpine",
    "Taiga Forests",
    "Wetlands"
  ],

  "Alpine": [
    "Tundra",
    "Taiga Forests",
    "Temperate Forests"
  ],

  "Taiga Forests": [
    "Tundra",
    "Alpine",
    "Temperate Forests",
    "Grassland",
    "Wetlands"
  ],

  "Temperate Forests": [
    "Taiga Forests",
    "Grassland",
    "Shrubland",
    "Wetlands"
  ],

  "Tropical Forests": [
    "Savanna",
    "Wetlands",
    "Shrubland"
  ],

  "Grassland": [
    "Temperate Forests",
    "Taiga Forests",
    "Savanna",
    "Shrubland",
    "Wetlands"
  ],

  "Savanna": [
    "Grassland",
    "Tropical Forests",
    "Shrubland",
    "Desert"
  ],

  "Shrubland": [
    "Grassland",
    "Savanna",
    "Temperate Forests",
    "Desert"
  ],

  "Wetlands": [
    "Grassland",
    "Temperate Forests",
    "Taiga Forests",
    "Tropical Forests",
    "Freshwater",
    "Coastal"
  ],

  "Desert": [
    "Shrubland",
    "Savanna",
    "Grassland"
  ],

  "Coastal": [
    "Temperate Forests",
    "Tropical Forests",
    "Grassland",
    "Wetlands",
    "Freshwater",
    "Marine"
  ],

  "Freshwater": [
    "Wetlands",
    "Grassland",
    "Temperate Forests",
    "Coastal"
  ],

  "Marine": [
    "Coastal"
  ],

  "Geothermal": [
    "Shrubland",
    "Desert",
    "Grassland",
    "Alpine"
  ],

  "Subsurface": [
    // Subsurface can border anything because it is *below* the surface.
    "Tundra",
    "Alpine",
    "Taiga Forests",
    "Temperate Forests",
    "Tropical Forests",
    "Grassland",
    "Savanna",
    "Shrubland",
    "Wetlands",
    "Desert",
    "Coastal",
    "Freshwater",
    "Marine",
    "Geothermal"
  ]
};

// ------------------------------------------------------------
// Helper: check if two biomes can border each other
// ------------------------------------------------------------
export function canBiomesTouch(a, b) {
  if (!BIOME_ADJACENCY[a]) return false;
  return BIOME_ADJACENCY[a].includes(b);
}
