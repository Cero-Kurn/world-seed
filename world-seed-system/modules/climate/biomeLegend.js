// ---Biome Legend ---
export function renderBiomeLegend() {
  const container = document.getElementById("biomeLegend");

  const biomeColors = {
    "alpine": "#abb289",
    //"atmosphere":"",
    "coast": "#f9e6be",
    "desert": "#d4b680",
    "geothermal": "#db3a28",
    "grassland": "#97c14b",
    "inland sea": "#4da6b2",
    "lake": "#4da6b2",
    "mediterranean": "#f5df07",
    //"mixed": "",
    "monsoon forest": "#b9ce87",
    "ocean": "#1c2842",
    //"other": "",
    "savanna": "#d1a36e",
    //"space": "",
    "subsurface": "#000000",
    "taiga": "#477747",
    "temperate forest": "#5fa777",
    "tropical rainforest": "#019f7d",
    "tundra": "#d8e3e7",
    "wetlands": "#a0a832"
  };
      
  const descriptions = {
    "Alpine": "High elevation cold biomes.",
    //"Atmosphere": "",
    "Coast": "",
    "Desert": "Dry, sparse vegetation, extreme temperatures.",
    "Geothermal": "",
    "Grassland": "Open plains with seasonal rainfall.",
    "Inland Sea": "",
    "Lake": "",
    "Mediterranean": "Dry summers, mild wet winters.",
    //"Mixed": "",
    "Monsoon Forest": "",
    "Ocean": "",
    //"Other": "",
    "Savanna": "Warm grasslands with scattered trees.",
    //"Space": "",
    "Subsurface": "",
    "Taiga": "Cold coniferous forests.",
    "Temperate Forest": "Mild climate with seasonal forests.",
    "Tropical Rainforest": "Hot, wet, and densely vegetated.",
    "Tundra": "Cold, low vegetation, short summers.",
    "Wetlands": "Water saturated ecosystems."
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

