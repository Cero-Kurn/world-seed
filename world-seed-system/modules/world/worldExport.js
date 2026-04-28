// modules/world/worldExport.js
// ------------------------------------------------------------
// World Exporter (canonical JSON output)
// ------------------------------------------------------------
//
// Converts the full world model into a clean, stable JSON
// structure suitable for UI rendering, debugging, or saving.
//
// This does NOT write files — it only produces structured data.
//

export function exportWorld(worldModel, options = {}) {
  const { pretty = false } = options;

  const safeRegions = worldModel.regions.map((r) => ({
    id: r.id,
    name: r.name,
    landmark: r.landmark,
    biome: r.biome,
    elevation: r.elevation,
    moisture: r.moisture,
    climatePattern: r.climatePattern,
    hemisphere: r.hemisphere,
    latitudeBand: r.latitudeBand,
    tectonicType: r.tectonicType,
    landform: r.landform,
    specialFeature: r.specialFeature,
    neighbors: r.neighbors,
    description: r.description
  }));

  const output = {
    seed: worldModel.seed,
    regionCount: safeRegions.length,
    regions: safeRegions
  };

  return pretty
    ? JSON.stringify(output, null, 2)
    : JSON.stringify(output);
}
