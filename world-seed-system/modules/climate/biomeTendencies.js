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

Added biome tendencies for climate drift rules, including definitions for warming, cooling, drying, and wetting effects on various biomes.
// --- Biome Tendencies
export function renderBiomeTendencies(regions) {
  const container = document.getElementById("biomeTendencies");

  const counts = regions.reduce((acc, r) => {
    acc[r.biome] = (acc[r.biome] || 0) + 1;
    return acc;
  }, {});

  const total = regions.length;

  const rows = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([biome, count]) => {
      const pct = ((count / total) * 100).toFixed(1);
      return `<div><strong>${biome}</strong>: ${pct}%</div>`;
    })
    .join("");

  container.innerHTML = `
    <h3>🌍 Biome Tendencies</h3>
    <p>This world leans toward the following biome distribution:</p>
    ${rows}
  `;
}
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


