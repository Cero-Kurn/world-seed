// Biome → color mapping
const BIOME_COLORS = {
    // "Atmosphere":"",
    //"Mixed": "",
    //"Other": "",
    //"Space": "",
    "Tropical Rainforest": "#019f7d",
    "Ocean": "#1c2842",
    "Grassland": "#97C14B",
    "Taiga": "#477747",
    "Lake": "#4da6b2",
    "Wetlands": "#a0a832",
    "Temperate Forest": "#5fa777",
    "Inland Sea": "#4da6b2",
    "Alpine": "#abb289",
    "Subsurface": "#000000",
    "Monsoon Forest": "#b9ce87",
    "Savanna": "#d1a36e",
    "Desert": "#d4b680",
    "Tundra": "#d8e3e7",
    "Geothermal": "#db3a28",
    "Mediterranean": "#F5DF07",
    "Coast": "#f9e6be"
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
