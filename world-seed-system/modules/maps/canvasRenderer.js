// modules/maps/canvasRenderer.js
// ------------------------------------------------------------
// Canvas Renderer (hex map + pan/zoom + highlight)
// ------------------------------------------------------------

import { BIOME_COLORS } from "../data/biomes.js";

// Basic hex settings
const HEX_SIZE = 12;
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
const HEX_HEIGHT = 2 * HEX_SIZE;
const HEX_VERTICAL_SPACING = HEX_HEIGHT * 0.75;

let canvas, ctx;
let camera = { x: 0, y: 0, zoom: 1 };
let isPanning = false;
let lastMouse = { x: 0, y: 0 };
let highlightedRegionId = null;

// ------------------------------------------------------------
// PUBLIC API
// ------------------------------------------------------------
export function initCanvasRenderer(canvasId) {
  canvas = document.getElementById(canvasId);
  if (!canvas) return;
  ctx = canvas.getContext("2d");

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", onMouseUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });
}

/**
 * Generate a world hex grid using axial coordinates.
 * Each hex is assigned to a region by regionId.
 */
export function generateHexGrid(regions) {
  const cols = 40;
  const rows = 25;

  const hexGrid = [];
  let regionIndex = 0;

  for (let r = 0; r < rows; r++) {
    for (let q = 0; q < cols; q++) {
      hexGrid.push({
        q,
        r,
        regionId: regions[regionIndex % regions.length].id
      });
      regionIndex++;
    }
  }

  return hexGrid;
}

/**
 * Render the hex world map.
 *
 * @param {Array} hexMap - array of { q, r, regionId }
 * @param {Array} regions - region objects
 */
export function renderHexWorld(hexMap, regions) {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2 + camera.x, canvas.height / 2 + camera.y);
  ctx.scale(camera.zoom, camera.zoom);

  hexMap.forEach(cell => {
    const region = regions.find(r => r.id === cell.regionId);
    const biome = region ? region.biome : null;
    const color = BIOME_COLORS[biome] || "#444";

    const { x, y } = axialToPixel(cell.q, cell.r);
    drawHex(x, y, HEX_SIZE, color, region && region.id === highlightedRegionId);
  });

  ctx.restore();
}

export function setHighlightedRegion(regionId) {
  highlightedRegionId = regionId;
}

// ------------------------------------------------------------
// INTERNAL: HEX DRAWING
// ------------------------------------------------------------
function axialToPixel(q, r) {
  const x = HEX_WIDTH * (q + r / 2);
  const y = HEX_VERTICAL_SPACING * r;
  return { x, y };
}

function drawHex(cx, cy, size, fill, highlighted) {
  const corners = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    corners.push({
      x: cx + size * Math.cos(angle),
      y: cy + size * Math.sin(angle)
    });
  }

  ctx.beginPath();
  ctx.moveTo(corners[0].x, corners[0].y);
  for (let i = 1; i < 6; i++) {
    ctx.lineTo(corners[i].x, corners[i].y);
  }
  ctx.closePath();

  ctx.fillStyle = fill;
  ctx.fill();

  ctx.lineWidth = highlighted ? 3 : 1;
  ctx.strokeStyle = highlighted ? "#fff" : "rgba(0,0,0,0.4)";
  ctx.stroke();
}

// ------------------------------------------------------------
// INTERNAL: CANVAS + CAMERA
// ------------------------------------------------------------
function resizeCanvas() {
  if (!canvas) return;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

function onMouseDown(e) {
  isPanning = true;
  lastMouse.x = e.clientX;
  lastMouse.y = e.clientY;
}

function onMouseMove(e) {
  if (!isPanning) return;
  const dx = e.clientX - lastMouse.x;
  const dy = e.clientY - lastMouse.y;
  lastMouse.x = e.clientX;
  lastMouse.y = e.clientY;

  camera.x += dx;
  camera.y += dy;
}

function onMouseUp() {
  isPanning = false;
}

function onWheel(e) {
  e.preventDefault();
  const zoomFactor = 1.1;
  const delta = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
  camera.zoom = Math.max(0.3, Math.min(3, camera.zoom * delta));
}
