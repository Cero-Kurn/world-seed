// modules/maps/biomeHeatmap.js
// ------------------------------------------------------------
// Biome Heatmap Renderer (canonical biome colors)
// ------------------------------------------------------------
//
// This module renders a biome heatmap onto a <canvas> element,
// using the canonical biome list and color palette.
//
// It expects:
//   • canvas: HTMLCanvasElement
//   • regions: array of region objects (from world engine)
//   • hexGrid: array of hex cells from canvasRenderer.js
//
// Each hex cell must contain:
//   • x, y, size
//   • regionIndex (index into regions[])
//

import { BIOME_COLORS } from "../data/biomeColors.js";   // your canonical palette

/**
 * Get a safe color for a biome.
 * Falls back to neutral gray if unknown.
 */
function getBiomeColor(biome) {
  return BIOME_COLORS[biome] || "#999999";
}

/**
 * Render the biome heatmap onto a canvas.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Array} regions
 * @param {Array} hexGrid
 */
export function renderBiomeHeatmap(canvas, regions, hexGrid) {
  if (!canvas || !regions || !hexGrid) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < hexGrid.length; i++) {
    const hex = hexGrid[i];
    const region = regions[hex.regionIndex];

    if (!region) continue;

    const color = getBiomeColor(region.biome);
    ctx.fillStyle = color;

    drawHex(ctx, hex.x, hex.y, hex.size);
  }
}

/**
 * Draw a filled hexagon at (x, y).
 */
function drawHex(ctx, x, y, size) {
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
