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

  container.innerHTML = `
    <div class="biome-tendencies-grid">
      ${Object.entries(BIOME_TENDENCIES)
        .map(([biome, t]) => tendencyCard(biome, t))
        .join("")}
    </div>
  `;
}

/**
 * Render a single biome tendency card.
 */
function tendencyCard(biome, t) {
  return `
    <div class="biome-tendencies-card">
      <div class="bt-title">${biome}</div>

      <div class="bt-row">
        <span class="bt-label">Warms →</span>
        <span class="bt-value">${t.warmsTo}</span>
      </div>

      <div class="bt-row">
        <span class="bt-label">Cools →</span>
        <span class="bt-value">${t.coolsTo}</span>
      </div>

      <div class="bt-row">
        <span class="bt-label">Dries →</span>
        <span class="bt-value">${t.driesTo}</span>
      </div>

      <div class="bt-row">
        <span class="bt-label">Wets →</span>
        <span class="bt-value">${t.wetsTo}</span>
      </div>
    </div>
  `;
}
