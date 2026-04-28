// modules/climate/biomeRoles.js
// ------------------------------------------------------------
// Canonical Biome Roles
// ------------------------------------------------------------
//
// These roles describe the ecological, cultural, and narrative
// functions of each biome. Other modules (narrative, climate
// summaries, region descriptions, culture generation) can use
// these roles to produce consistent worldbuilding output.
//

export const BIOME_ROLES = {
  "Tundra": {
    type: "cold",
    productivity: "low",
    settlement: "sparse",
    notes: "Short growing seasons, hardy wildlife, permafrost soils."
  },

  "Alpine": {
    type: "cold-highland",
    productivity: "low",
    settlement: "rare",
    notes: "High-elevation cold zones with thin air and rugged terrain."
  },

  "Taiga Forests": {
    type: "cold-forest",
    productivity: "moderate",
    settlement: "low",
    notes: "Conifer-dominated forests with long winters and short summers."
  },

  "Temperate Forests": {
    type: "temperate-forest",
    productivity: "high",
    settlement: "moderate",
    notes: "Seasonal forests with rich soils and diverse wildlife."
  },

  "Tropical Forests": {
    type: "tropical-forest",
    productivity: "very-high",
    settlement: "low",
    notes: "Dense, humid forests with extreme biodiversity and rapid growth cycles."
  },

  "Grassland": {
    type: "open-plains",
    productivity: "high",
    settlement: "moderate",
    notes: "Wide open plains ideal for grazing animals and agriculture."
  },

  "Savanna": {
    type: "tropical-plains",
    productivity: "moderate",
    settlement: "moderate",
    notes: "Seasonal grasslands with scattered trees and large herbivores."
  },

  "Shrubland": {
    type: "semi-arid",
    productivity: "low",
    settlement: "low",
    notes: "Dry scrub regions with hardy shrubs and drought-adapted species."
  },

  "Wetlands": {
    type: "waterlogged",
    productivity: "high",
    settlement: "rare",
    notes: "Marshes, bogs, and fens with rich biodiversity and saturated soils."
  },

  "Desert": {
    type: "arid",
    productivity: "very-low",
    settlement: "rare",
    notes: "Extremely dry regions with sparse vegetation and dramatic temperature swings."
  },

  "Coastal": {
    type: "shoreline",
    productivity: "high",
    settlement: "high",
    notes: "Transitional zones between land and sea; rich fisheries and trade hubs."
  },

  "Freshwater": {
    type: "inland-water",
    productivity: "high",
    settlement: "high",
    notes: "Lakes, rivers, and deltas; crucial for agriculture and early civilizations."
  },

  "Marine": {
    type: "oceanic",
    productivity: "variable",
    settlement: "none",
    notes: "Open ocean and deep sea regions; supports marine ecosystems and currents."
  },

  "Geothermal": {
    type: "volcanic",
    productivity: "low",
    settlement: "rare",
    notes: "Hot springs, geysers, volcanic vents; extreme heat and mineral-rich soils."
  },

  "Subsurface": {
    type: "underground",
    productivity: "very-low",
    settlement: "rare",
    notes: "Caves, caverns, and subterranean networks; low light and unique ecosystems."
  }
};

// ------------------------------------------------------------
// Helper: get role for a biome
// ------------------------------------------------------------
export function getBiomeRole(biome) {
  return BIOME_ROLES[biome] || {
    type: "unknown",
    productivity: "unknown",
    settlement: "unknown",
    notes: "No role defined for this biome."
  };
}
