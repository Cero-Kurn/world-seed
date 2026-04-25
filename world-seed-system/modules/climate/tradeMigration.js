// modules/climate/tradeMigration.js

export function generateTradeAndMigration(regions) {
  const neighbors = {
    0: [1, 2, 3, 4, 5, 6],
    1: [0, 2, 6],
    2: [0, 1, 3],
    3: [0, 2, 4],
    4: [0, 3, 5],
    5: [0, 4, 6],
    6: [0, 5, 1]
  };

  const results = regions.map((r, i) => {
    const nIdx = neighbors[i] || [];
    const trade = [];
    const migration = [];

    // --- TRADE ROUTES ---

    // River / Wetlands → Natural trade corridors
    if (r.moisture === "Wet" || r.biome === "Wetlands") {
      trade.push("River Corridor Trade");
    }

    // Grassland / Savanna → Caravan routes
    if (r.biome === "Grassland" || r.biome === "Savanna") {
      trade.push("Caravan Routes");
    }

    // Mountains → Pass‑based trade
    if (r.elevation.includes("High") || r.elevation.includes("Mountain")) {
      trade.push("Mountain Pass Trade");
    }

    // Rift valleys → Linear trade lines
    if (r.tectonicType === "divergent") {
      trade.push("Rift‑Valley Trade Line");
    }

    // Coasts (inferred by moisture + moderate elevation)
    if (r.moisture === "Moderate" && r.elevation === "Lowlands") {
      trade.push("Coastal Shipping Lanes");
    }

    // Monsoon regions → Maritime trade
    if (r.climatePattern.includes("Monsoon")) {
      trade.push("Monsoon Maritime Trade");
    }

    // --- MIGRATION PATHS ---

    // Seasonal climates → nomadic loops
    if (r.latitudeBand === "Temperate" || r.latitudeBand === "Subtropical") {
      migration.push("Seasonal Migration Loop");
    }

    // Harsh climates → outward migration
    if (r.moisture === "Dry" || r.latitudeBand === "Polar") {
      migration.push("Climate‑Driven Outmigration");
    }

    // Rift valleys → human corridors
    if (r.tectonicType === "divergent") {
      migration.push("Rift‑Valley Migration Corridor");
    }

    // Mountain → highland ↔ lowland shifts
    if (r.elevation.includes("High")) {
      migration.push("Highland–Lowland Migration");
    }

    // Disaster‑prone → dispersal
    if (r.disasterRisk === "High" || r.disasterRisk === "Extreme") {
      migration.push("Post‑Disaster Dispersal");
    }

    // Neighbor influence
    const neighborNames = nIdx.map(j => regions[j].name);

    return {
      region: r.name,
      tradeRoutes: trade,
      migrationPaths: migration,
      neighbors: neighborNames
    };
  });

  return results;
}
