// modules/climate/biomeLegend.js
// ------------------------------------------------------------
// Biome Legend (canonical biome list + unified colors)
// ------------------------------------------------------------

import { BIOMES } from "../data/biomes.js";

// ------------------------------------------------------------
// BIOME → COLOR MAP (canonical only)
// ------------------------------------------------------------
const BIOME_COLORS = {
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
  "Geothermal": "#D97F30",
  "Coastal": "#A7D0E3",
  "Freshwater": "#7EC8E3",
  "Marine": "#3A6EA5",
  "Subsurface": "#6E5F57"
};

// ------------------------------------------------------------
// SAFE COLOR PICKER
// ------------------------------------------------------------
function getBiomeColor(biome) {
  return BIOME_COLORS[biome] || "#888888";
}

// ------------------------------------------------------------
// LEGEND BUILDER
// ------------------------------------------------------------
export function renderBiomeLegend(container) {
  if (!container) {
    console.warn("BiomeLegend: No container element provided.");
    return;
  }

  container.innerHTML = ""; // clear existing legend

  const title = document.createElement("h3");
  title.textContent = "Biome Legend";
  container.appendChild(title);

  const list = document.createElement("div");
  list.style.display = "flex";
  list.style.flexDirection = "column";
  list.style.gap = "6px";

  // Sort biomes alphabetically for clean UI
  const biomeNames = Object.keys(BIOME_COLORS).sort();

  biomeNames.forEach((biome) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "8px";

    const swatch = document.createElement("div");
    swatch.style.width = "18px";
    swatch.style.height = "18px";
    swatch.style.borderRadius = "3px";
    swatch.style.backgroundColor = getBiomeColor(biome);
    swatch.style.border = "1px solid #333";

    const label = document.createElement("span");
    label.textContent = biome;

    row.appendChild(swatch);
    row.appendChild(label);
    list.appendChild(row);
  });

  container.appendChild(list);
}
