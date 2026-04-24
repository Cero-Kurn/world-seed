// --- Biome Roles---
export function assignBiomeRoles(regions) {
  const roles = {
    "Desert": "Caravan Corridor",
    "Savanna": "Migration Plains",
    "Grassland": "Agricultural Belt",
    "Temperate Forest": "Resource Heartland",
    "Tropical Rainforest": "Biodiversity Core",
    "Taiga": "Frontier Forests",
    "Tundra": "Nomadic Range",
    "Alpine": "Highland Bastion",
    "Wetlands": "River Kingdoms",
    "Mediterranean": "Trade Coast"
  };

  regions.forEach(r => {
    r.biomeRole = roles[r.biome] || "Regional Hub";
  });
}
