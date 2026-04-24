// ---Biome Legend ---
export function renderBiomeLegend() {
  const container = document.getElementById("biomeLegend");

  const biomeColors = {
    "Tropical Rainforest": "#1b8a3d",
    "Savanna": "#f1c40f",
    "Desert": "#e9c46a",
    "Temperate Forest": "#2e9c5d",
    "Grassland": "#f39c12",
    "Taiga": "#16a085",
    "Tundra": "#d8e3e7",
    "Alpine": "#bfc0c0",
    "Wetlands": "#a0a832",
    "Mediterranean": "#d35400",
    "Monsoon Forest": "#3cb371",
    "Ocean": "#003f5c",
    "Coast": "#2f4b7c",
    "Lake": "#4cc9f0",
    "Inland Sea": "#2f7fc1",
    //"Mixed": "#999999"
  };
    
  const descriptions = {
    "Tropical Rainforest": "Hot, wet, and densely vegetated.",
    "Savanna": "Warm grasslands with scattered trees.",
    "Desert": "Dry, sparse vegetation, extreme temperatures.",
    "Temperate Forest": "Mild climate with seasonal forests.",
    "Grassland": "Open plains with seasonal rainfall.",
    "Taiga": "Cold coniferous forests.",
    "Tundra": "Cold, low vegetation, short summers.",
    "Alpine": "High‑elevation cold biomes.",
    "Wetlands": "Water‑saturated ecosystems.",
    "Mediterranean": "Dry summers, mild wet winters.",
    "Monsoon Forest": "",
    "Ocean": "",
    "Coast": "",
    "Lake": "",
    "Inland Sea": "",
    //"Mixed": ""
  };

  const rows = Object.entries(biomeColors).map(([biome, color]) => `
    <div class="legend-row">
      <div class="legend-color" style="background:${color}"></div>
      <div><strong>${biome}</strong> — ${descriptions[biome]}</div>
    </div>
  `).join("");

  container.innerHTML = `
    <h3>🌿 Biome Legend</h3>
    ${rows}
  `;
}

