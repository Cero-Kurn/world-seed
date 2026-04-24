export function renderRegionalHistory(regions, decoded) { ... }
// --- Regional History
function renderRegionalHistory(regions, decoded) {
  const container = document.getElementById("regionalHistory");

  function generateHistory(r) {
    const themes = [];
    const notes = [];

    // ----------------------------------------------------
    // MOUNTAIN REGIONS (Convergent)
    // ----------------------------------------------------
    if (r.tectonicType === "convergent") {
      themes.push("Mountain Strongholds");
      notes.push("Steep terrain encouraged fortified settlements and independent highland cultures.");
    }

    // ----------------------------------------------------
    // RIFT REGIONS (Divergent)
    // ----------------------------------------------------
    if (r.tectonicType === "divergent") {
      themes.push("Rift‑Valley Trade Routes");
      notes.push("Lowland rift corridors became natural pathways for travel and exchange.");
    }

    // ----------------------------------------------------
    // VOLCANIC REGIONS (Hotspot)
    // ----------------------------------------------------
    if (r.tectonicType === "hotspot") {
      themes.push("Volcanic Island Navigators");
      notes.push("Communities adapted to geothermal landscapes and developed strong navigation traditions.");
    }

    // ----------------------------------------------------
    // FAULT REGIONS (Transform)
    // ----------------------------------------------------
    if (r.tectonicType === "transform") {
      themes.push("Fault‑Line Adaptation");
      notes.push("Societies built flexible infrastructure and relied on dispersed settlements.");
    }

    // ----------------------------------------------------
    // craton REGIONS (Stable)
    // ----------------------------------------------------
    if (r.tectonicType === "craton") {
      themes.push("Ancient Heartland Civilizations");
      notes.push("Stable terrain supported long‑lasting agricultural and cultural centers.");
    }

    // ----------------------------------------------------
    // CLIMATE‑DRIVEN HISTORY
    // ----------------------------------------------------
    if (r.moisture === "Wet") {
      themes.push("River‑Valley Agriculture");
      notes.push("Reliable water sources supported farming and early urban growth.");
    }

    if (r.moisture === "Dry") {
      themes.push("Caravan and Nomadic Traditions");
      notes.push("Communities adapted through mobility and long‑distance trade networks.");
    }

    if (r.climatePattern.includes("Cold")) {
      themes.push("Cold‑Climate Resilience");
      notes.push("Seasonal scarcity encouraged resourcefulness and strong communal ties.");
    }

    if (r.climatePattern.includes("Humid")) {
      themes.push("Tropical Abundance");
      notes.push("Warm, fertile environments supported diverse cultural development.");
    }

    // ----------------------------------------------------
    // SEASONALITY EFFECTS
    // ----------------------------------------------------
    if (r.latitudeBand === "Temperate") {
      themes.push("Seasonal Agricultural Cycles");
      notes.push("Communities organized life around planting, harvest, and winter preparation.");
    }

    if (r.latitudeBand === "Polar") {
      themes.push("Seasonal Migration Patterns");
      notes.push("Groups moved with the seasons to follow resources.");
    }

    // ----------------------------------------------------
    // WEATHER‑DRIVEN HISTORY
    // ----------------------------------------------------
    if (r.weather?.includes("Super‑Storms")) {
      themes.push("Storm‑Hardened Cultures");
      notes.push("Architecture and traditions evolved to withstand powerful storms.");
    }

    if (r.weather?.includes("Blizzards")) {
      themes.push("Winter‑Fortified Settlements");
      notes.push("Communities built structures suited for long, harsh winters.");
    }

    if (r.weather?.includes("Heat Waves")) {
      themes.push("Heat‑Adapted Architecture");
      notes.push("Settlements used shade, airflow, and reflective materials.");
    }

    // ----------------------------------------------------
    // MICRO‑CLIMATE EFFECTS
    // ----------------------------------------------------
    if (r.microClimate?.includes("Fog Belt")) {
      themes.push("Fog‑Harvesting Cultures");
      notes.push("Communities developed methods to collect moisture from fog.");
    }

    if (r.microClimate?.includes("Cloud Forest")) {
      themes.push("High‑Forest Settlements");
      notes.push("Dense forests supported unique ecological knowledge and traditions.");
    }

    if (r.microClimate?.includes("Geothermal Zone")) {
      themes.push("Geothermal Settlements");
      notes.push("Communities used natural heat for cooking, bathing, and heating.");
    }

    return { themes, notes };
  }

  const entries = regions.map(r => {
    const h = generateHistory(r);

    const themeStr = h.themes.length > 0
      ? h.themes.map(t => `<strong>${t}</strong>`).join(", ")
      : "No dominant historical patterns.";

    const noteStr = h.notes.length > 0
      ? h.notes.join(" ")
      : "Environmental factors did not strongly shape historical development.";

    return `
      <div class="history-entry">
        <div><strong>${r.name}</strong></div>
        <div>Historical Themes: ${themeStr}</div>
        <div>${noteStr}</div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <h3>📜 Regional History Generator</h3>
    ${entries}
  `;
}

