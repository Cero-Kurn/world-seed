// ---Biome Legend ---
export function renderBiomeLegend() {
  const container = document.getElementById("biomeLegend");

  const biomeColors = {

    // "Atmosphere":"",
    //"Mixed": "",
    //"Other": "",
    //"Space": "",
    "Subsurface": "#000000",
    "Tropical Rainforest": "#019f7d",
    "Ocean": "#1c2842",
    "Taiga": "#477747",
    "Lake": "#4da6b2",
    "Inland Sea": "#4da6b2",
    "Temperate Forest": "#5fa777",
    "Grassland": "#97C14B",
    "Wetlands": "#a0a832",
    "Alpine": "#abb289",
    "Monsoon Forest": "#b9ce87",
    "Savanna": "#d1a36e",
    "Desert": "#d4b680",
    "Tundra": "#d8e3e7",
    "Geothermal": "#db3a28",
    "Mediterranean": "#F5DF07",
    "Coast": "#f9e6be"
  };
    
  const descriptions = {
   // "Atmosphere": "",
    //"Mixed": "",
    //"Other": "",
    //"Space": "",
    "Subsurface": "",
    "Tropical Rainforest": "Hot, wet, and densely vegetated.",
    "Ocean": "",
    "Taiga": "Cold coniferous forests.",
    "Lake": "",
    "Inland Sea": "",
    "Temperate Forest": "Mild climate with seasonal forests.",
    "Grassland": "Open plains with seasonal rainfall.",
    "Wetlands": "Water saturated ecosystems.",
    "Alpine": "High elevation cold biomes.",
    "Monsoon Forest": "",
    "Savanna": "Warm grasslands with scattered trees.",
    "Desert": "Dry, sparse vegetation, extreme temperatures.",
    "Tundra": "Cold, low vegetation, short summers.",
    "Geothermal": "",
    "Mediterranean": "Dry summers, mild wet winters.",
    "Coast": ""
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

