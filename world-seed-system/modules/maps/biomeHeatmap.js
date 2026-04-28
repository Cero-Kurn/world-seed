// modules/maps/biomeHeatmap.js
// ------------------------------------------------------------
// Biome Heatmap Renderer (simple grid based on region biomes)
// ------------------------------------------------------------

import { BIOME_COLORS } from "../data/biomes.js";

/*
  EXPECTED INPUT:
  renderBiomeHeatmap(regions)

  Each region object must contain:
    - id
    - biome
    - latitudeBand (for vertical ordering)
*/

export function renderBiomeHeatmap(regions) {
  const container = document.getElementById("biomeHeatmap");
  if (!container) return;

  // Clear previous content
  container.innerHTML = "";

  // Sort regions by latitude band (north → south)
  const sorted = [...regions].sort((a, b) => {
    const order = {
      polar: 0,
      subpolar: 1,
      temperate: 2,
      subtropical: 3,
      tropical: 4
    };
    return (order[a.latitudeBand] ?? 99) - (order[b.latitudeBand] ?? 99);
  });

  // Build heatmap grid
  const grid = document.createElement("div");
  grid.className = "biome-heatmap-grid";

  sorted.forEach(region => {
    const cell = document.createElement("div");
    cell.className = "biome-heatmap-cell";

    const color = BIOME_COLORS[region.biome] || "#444";
    cell.style.background = color;

    cell.title = `${region.name} — ${region.biome}`;

    grid.appendChild(cell);
  });

  container.appendChild(grid);
}
