// ---Biome Legend ---
export function renderBiomeLegend() {
  const container = document.getElementById("biomeLegend");

  const biomeColors = {
    "Ocean": "#	003f5c",
    "Taiga": "#	0b380a",
    "Grassland": "#	0dd617",
    "Temperate Forest": "#	1abc9c",
    "Alpine": "#	3b423b",
    "Tropical Rainforest": "#	3cb371",
    "Monsoon Forest": "#	3cb371",
    "Lake": "#	4cc9f0",
    "Inland Sea": "#	4cc9f0",
    Subsurface": "#	999999",
    "Wetlands": "#	a0a832", 
    "Mediterranean": "#	a6940c",
    "Geothermal": "#	c22525",
    "Tundra": "#	d8e3e7",
    "Desert": "#	e67e22",
    "Coast": "#	e9c46a",
    "Savanna": "#	f1c40f"
    //"Atmosphere": "#",
    //"Space": "#",
    //"Other": "#",
    //"Mixed": "#"
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

