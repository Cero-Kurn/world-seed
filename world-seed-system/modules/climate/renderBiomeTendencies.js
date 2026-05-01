// modules/climate/renderBiomeTendencies.js
// ------------------------------------------------------------
// UI Renderer for Biome Tendencies (Canonical Climate Drift)
// ------------------------------------------------------------
//
// This module renders a clean UI panel showing how each biome
// tends to shift under climate pressures:
//
//   • warming
//   • cooling
//   • drying
//   • wetting
//
// It reads from BIOME_TENDENCIES (data-only module).
//

import { BIOME_TENDENCIES } from "./biomeTendencies.js";

/**
 * Render the biome tendencies panel into #biomeTendencies.
 * This panel is static and does not depend on region data.
 */
export function renderBiomeTendencies() {
  const container = document.getElementById("biomeTendencies");
  if (!container) return;

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
