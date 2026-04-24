// ---Biome Legend ---
export function renderBiomeLegend() {
  const container = document.getElementById("biomeLegend");

  const biomeColors = {
    "Tropical Rainforest": "#1abc9c",
    "Savanna": "#f1c40f",
    "Desert": "#e67e22",
    "Temperate Forest": "#2ecc71",
    "Grassland": "#f39c12",
    "Taiga": "#16a085",
    "Tundra": "#95a5a6",
    "Alpine": "#bdc3c7",
    "Wetlands": "#3498db",
    "Mediterranean": "#d35400"
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

