// modules/maps/biomeHeatmap.js
// ------------------------------------------------------------
// Biome Heatmap Renderer (canonical biome colors)
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
  if (BIOME_COLORS[biome]) return BIOME_COLORS[biome];

  console.warn(`Unknown biome "${biome}" in heatmap — using fallback color.`);
  return "#999999"; // neutral fallback
}

// ------------------------------------------------------------
// HEATMAP RENDERER
// ------------------------------------------------------------
export function renderBiomeHeatmap(canvas, regions, hexGrid) {
  const ctx = canvas.getContext("2d");

  for (let i = 0; i < hexGrid.length; i++) {
    const hex = hexGrid[i];
    const region = regions[hex.regionIndex];

    if (!region) continue;

    const color = getBiomeColor(region.biome);

    ctx.fillStyle = color;
    drawHeatHex(ctx, hex.x, hex.y, hex.size);
  }
}

// ------------------------------------------------------------
// BASIC HEX DRAWING (heatmap style)
// ------------------------------------------------------------
function drawHeatHex(ctx, x, y, size) {
  const angle = Math.PI / 3;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const px = x + size * Math.cos(angle * i);
    const py = y + size * Math.sin(angle * i);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}
