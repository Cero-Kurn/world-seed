// modules/data/biomes.js
// ------------------------------------------------------------
// Canonical biome definitions, colors, descriptors, nouns
// Used by: regionNames, landmarkNames, hexMap, cultures, fauna/flora
// ------------------------------------------------------------

export const BIOMES = {
  TUNDRA: "Tundra",
  ALPINE: "Alpine",
  TAIGA: "Taiga Forests",
  TEMPERATE_FOREST: "Temperate Forests",
  TROPICAL_FOREST: "Tropical Forests",
  GRASSLAND: "Grassland",
  SAVANNA: "Savanna",
  SHRUBLAND: "Shrubland",
  DESERT: "Desert",
  WETLANDS: "Wetlands",
  FRESHWATER: "Freshwater",
  COASTAL: "Coastal",
  MARINE: "Marine",
  GEOTHERMAL: "Geothermal",
  SUBSURFACE: "Subsurface"
};

// ------------------------------------------------------------
// Biome Colors (Hexmap)
// ------------------------------------------------------------
export const BIOME_COLORS = {
  Tundra: "#d8e6f0",
  Alpine: "#bfcbd6",
  "Taiga Forests": "#4b6b47",
  "Temperate Forests": "#6fa96f",
  "Tropical Forests": "#2e8b57",
  Grassland: "#c7d46d",
  Savanna: "#d9c36a",
  Shrubland: "#bfa76a",
  Desert: "#e8d28b",
  Wetlands: "#4a7f6a",
  Freshwater: "#6bb7ff",
  Coastal: "#8fd3ff",
  Marine: "#1f6fb2",
  Geothermal: "#d65f3d",
  Subsurface: "#4a3f4f"
};

// ------------------------------------------------------------
// Biome Descriptors (Naming)
// ------------------------------------------------------------
export const BIOME_DESCRIPTORS = {
  Tundra: ["Frostglass", "Pale", "Silent", "Ice‑bitten", "Glacial"],
  Alpine: ["High", "Storm‑forged", "Rifted", "Stone‑crowned"],
  "Taiga Forests": ["Shadowed", "Whispering", "Pine‑bound", "Frostwood"],
  "Temperate Forests": ["Verdant", "Emerald", "Rootbound", "Greenreach"],
  "Tropical Forests": ["Jade", "Canopy", "Sun‑dappled", "Deepwood"],
  Grassland: ["Golden", "Widewind", "Open", "Horizon"],
  Savanna: ["Amberwind", "Lion’s", "Redgrass", "Drought‑forged"],
  Shrubland: ["Scrubwind", "Drybrush", "Sage‑crowned"],
  Desert: ["Sun‑scorched", "Amber", "Dust‑forged", "Shattered"],
  Wetlands: ["Mireborn", "Reed‑crowned", "Sodden", "Bog‑shrouded"],
  Freshwater: ["Riverborn", "Lake‑crowned", "Crystal", "Stillwater"],
  Coastal: ["Saltwind", "Shorebound", "Tide‑kissed"],
  Marine: ["Coral", "Deepwater", "Tide‑shattered"],
  Geothermal: ["Ember", "Ashen", "Fumarole", "Fireglass"],
  Subsurface: ["Hollow", "Underdeep", "Stone‑veined", "Night‑crowned"]
};

// ------------------------------------------------------------
// Biome Nouns (Naming)
// ------------------------------------------------------------
export const BIOME_NOUNS = {
  Tundra: ["Expanse", "Fields", "Crown", "Frost", "Reach"],
  Alpine: ["Peaks", "Spires", "Crown", "Ridge"],
  "Taiga Forests": ["Woods", "Grove", "Thicket", "Hollows"],
  "Temperate Forests": ["Forest", "Glen", "Vale", "Spire"],
  "Tropical Forests": ["Jungle", "Canopy", "Wilds", "Basin"],
  Grassland: ["Steppe", "Plains", "Horizon", "Reach"],
  Savanna: ["Savanna", "Redlands", "Grasslands", "Plateau"],
  Shrubland: ["Scrublands", "Brush", "Heath"],
  Desert: ["Dunes", "Teeth", "Crown", "Wastes"],
  Wetlands: ["Marsh", "Fen", "Bog", "Pools"],
  Freshwater: ["Shoals", "Reaches", "Waters", "Falls"],
  Coastal: ["Shores", "Coast", "Strand", "Cliffs"],
  Marine: ["Reef", "Depths", "Shoals", "Sea"],
  Geothermal: ["Fields", "Vents", "Lava Flats", "Caldera"],
  Subsurface: ["Caverns", "Depths", "Hollows", "Underways"]
};

