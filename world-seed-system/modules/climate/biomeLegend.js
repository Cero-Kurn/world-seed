// ---Biome Legend ---
export function renderBiomeLegend() {
  const container = document.getElementById("biomeLegend");

  const biomeColors = {
    //"Atmosphere": "#",
    //"Mixed": "#",
    //"Other": "#",
    //"Space": "#",
    "Ocean": "#003f5c",
    "Temperate Forest": "#1abc9c",
    "Subsurface": "#1b1b1b",
    "Monsoon Forest": "#3cb371",
    "Taiga": "#447741",
    "Inland Sea": "#4cc9f0",
    "Lake": "#4cc9f0",
    "Alpine": "#99a797",
    "Wetlands": "#a0a832", 
    "Mediterranean": "#a6940c",
    "Geothermal": "#c22525",
    "Grassland": "#C6cc51",
    "Tundra": "#d8e3e7",
    "Coast": "#e9c46a",
    "Desert": "#e9c46a",
    "Savanna": "#f1c40f",
    "Tropical Rainforest": "#f39c12"
  };
    
  const descriptions = {
   // "Atmosphere": "",
    //"Mixed": "",
    //"Other": "",
    //"Space": "",
    "Ocean": "",
    "Temperate Forest": "Mild climate with seasonal forests.",
    "Subsurface": "",
    "Monsoon Forest": "",
    "Taiga": "Cold coniferous forests.",
    "Inland Sea": "",
    "Lake": "",
    "Alpine": "High elevation cold biomes.",
    "Wetlands": "Water saturated ecosystems.",
    "Mediterranean": "Dry summers, mild wet winters.",
    "Geothermal": "",
    "Grassland": "Open plains with seasonal rainfall.",
    "Tundra": "Cold, low vegetation, short summers.",
    "Coast": "",
    "Desert": "Dry, sparse vegetation, extreme temperatures.",
    "Savanna": "Warm grasslands with scattered trees.",
    "Tropical Rainforest": "Hot, wet, and densely vegetated.",
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

