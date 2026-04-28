// modules/data/biomes.js
// ------------------------------------------------------------
// Canonical Biome Definitions (single source of truth)
// ------------------------------------------------------------
//
// This module defines the 15 canonical biomes used across the
// entire world engine. All other modules reference this file
// for biome names, colors, descriptors, and nouns.
//

export const BIOMES = [
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
  "Geothermal",
  "Subsurface"
];

// ------------------------------------------------------------
// BIOME COLORS (canonical)
// ------------------------------------------------------------
export const BIOME_COLORS = {
  "Tundra": "#C9D6D5",
  "Alpine": "#A9B8C9",
  "Taiga Forests": "#4A6B4F",
  "Temperate Forests": "#6FAF6F",
  "Tropical Forests": "#2E8B57",
  "Grassland": "#C7D36F",
  "Savanna": "#D9C77E",
  "Shrubland": "#BFAF7A",
  "Wetlands": "#7FB8A4",
  "Desert": "#E8D18B",
  "Coastal": "#A7D0E3",
  "Freshwater": "#7EC8E3",
  "Marine": "#3A6EA5",
  "Geothermal": "#D97F30",
  "Subsurface": "#6E5F57"
};

// ------------------------------------------------------------
// BIOME DESCRIPTORS (used for naming + flavor text)
// ------------------------------------------------------------
export const BIOME_DESCRIPTORS = {
  "Tundra": ["frozen", "windswept", "bleak"],
  "Alpine": ["high", "craggy", "skybound"],
  "Taiga Forests": ["pine‑laden", "frosted", "needle‑covered"],
  "Temperate Forests": ["leafy", "verdant", "seasonal"],
  "Tropical Forests": ["lush", "humid", "dense"],
  "Grassland": ["open", "wind‑swept", "golden"],
  "Savanna": ["sun‑baked", "amber", "scattered‑tree"],
  "Shrubland": ["dry", "thorny", "scrub‑covered"],
  "Wetlands": ["marshy", "waterlogged", "reed‑filled"],
  "Desert": ["arid", "sun‑scorched", "sandy"],
  "Coastal": ["salt‑sprayed", "tidal", "shoreline"],
  "Freshwater": ["river‑fed", "lake‑dotted", "deltaic"],
  "Marine": ["deep‑blue", "open‑water", "tidal"],
  "Geothermal": ["steam‑vented", "ash‑stained", "volcanic"],
  "Subsurface": ["shadowed", "hollow", "underground"]
};

// ------------------------------------------------------------
// BIOME NOUNS (used for naming + procedural text)
// ------------------------------------------------------------
export const BIOME_NOUNS = {
  "Tundra": ["expanse", "reach", "plain"],
  "Alpine": ["heights", "range", "spires"],
  "Taiga Forests": ["woods", "wilds", "timberlands"],
  "Temperate Forests": ["grove", "forest", "greenwood"],
  "Tropical Forests": ["jungle", "canopy", "deepwild"],
  "Grassland": ["plains", "fields", "steppe"],
  "Savanna": ["savanna", "sunplains", "grassveld"],
  "Shrubland": ["scrublands", "thornwild", "drybrush"],
  "Wetlands": ["marsh", "fen", "boglands"],
  "Desert": ["dunes", "wastes", "barrens"],
  "Coastal": ["coast", "shore", "strand"],
  "Freshwater": ["riverlands", "delta", "lakeshore"],
  "Marine": ["sea", "waters", "deeps"],
  "Geothermal": ["vents", "firelands", "ashfields"],
  "Subsurface": ["hollows", "underlands", "caverns"]
};
