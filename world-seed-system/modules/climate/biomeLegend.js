// modules/climate/biomeLegend.js
// ------------------------------------------------------------
// Biome Legend Renderer (canonical biome list + colors)
// ------------------------------------------------------------
//
// This module renders a simple legend showing all canonical
// biomes and their associated colors.
//
// It uses BIOME_COLORS as the single source of truth.
// No region data is required.
//

import { BIOME_COLORS } from "../data/biomes.js";

/**
 * Render the biome legend into #biomeLegend.
 */
export function renderBiomeLegend() {
  const container = document.getElementById("biomeLegend");
  if (!container) return;

  const biomeNames = Object.keys(BIOME_COLORS).sort();

  container.innerHTML = `
    <h3>Biome Legend</h3>
    <div class="biome-legend-grid">
      ${biomeNames.map(biome => legendRow(biome)).join("")}
    </div>
  `;
}

/**
 * Render a single legend row.
 */
function legendRow(biome) {
  const color = BIOME_COLORS[biome] || "#888888";

  return `
    <div class="biome-legend-row">
      <div class="biome-swatch" style="background:${color}"></div>
      <span class="biome-label">${biome}</span>
    </div>
  `;
}
