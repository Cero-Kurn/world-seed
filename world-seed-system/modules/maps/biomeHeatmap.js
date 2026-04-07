// Biome → color mapping
const BIOME_COLORS = {
  "tropical rainforest": "#1b8a3d",
  "temperate forest": "#2e9c5d",
  "monsoon forest": "#3cb371",
  "wetlands": "#4cc9f0",
  "tundra": "#d8e3e7",
  "desert": "#e9c46a",
  "alpine": "#bfc0c0",
  "mixed": "#999999"
};

// Simple biome picker for the heatmap (smooth, not noisy)
function pickBiome(lm, we, tr, hy) {
  const climate = lm.primary.toLowerCase();
  const winds = we.primary.toLowerCase();
  const water = hy.primary.toLowerCase();
  const tect = tr.primary.toLowerCase();

  if (climate.includes("hot")) return "tropical rainforest";
  if (climate.includes("cold")) return "tundra";
  if (winds.includes("monsoon")) return "monsoon forest";
  if (water.includes("wetland")) return "wetlands";
  if (water.includes("sparse")) return "desert";
  if (tect.includes("mountain")) return "alpine";

  return "temperate forest";
}

// Generate a 20×20 biome grid
export function generateBiomeHeatmap(decoded) {
  const { lm, we, tr, hy } = decoded;

  const size = 20;
  const grid = [];

  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const biome = pickBiome(lm, we, tr, hy);
      row.push(biome);
    }
    grid.push(row);
  }

  return grid;
}

// Render the grid as colored squares
export function renderBiomeHeatmap(grid) {
  const container = document.getElementById("biomeHeatmap");
  container.innerHTML = ""; // clear previous

  const size = grid.length;

  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${size}, 16px)`;
  container.style.gridTemplateRows = `repeat(${size}, 16px)`;
  container.style.gap = "1px";

  for (const row of grid) {
    for (const biome of row) {
      const cell = document.createElement("div");
      cell.style.width = "16px";
      cell.style.height = "16px";
      cell.style.background = BIOME_COLORS[biome] || "#555";
      container.appendChild(cell);
    }
  }
}
