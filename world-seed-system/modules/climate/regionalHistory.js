// --- Regional History
export function renderRegionalHistory(regions, decoded) {
  const container = document.getElementById("regionalHistory");

  function generateHistory(r) {
    const themes = [];
    const notes = [];

    // --- derive elevation tier ---
    const elevRaw = r.elevation.toLowerCase();
    const elev =
      /mountain|highland|plateau|upland/.test(elevRaw) ? "high" :
      /lowland|basin|plain/.test(elevRaw) ? "low" :
      "mid";

    // --- derive moisture tier ---
    const moistRaw = r.moisture.toLowerCase();
    const moist =
      /wet|humid/.test(moistRaw) ? "wet" :
      /arid|semi/.test(moistRaw) ? "dry" :
      "normal";

    const lat = r.latitudeBand; // already lowercase
    const tect = r.tectonicType; // already lowercase

    // ----------------------------------------------------
    // MOUNTAIN REGIONS (Convergent)
    // ----------------------------------------------------
    if (tect === "convergent") {
      themes.push("Mountain Strongholds");
      notes.push("Steep terrain encouraged fortified settlements and independent highland cultures.");
    }

    // ----------------------------------------------------
    // RIFT REGIONS (Divergent)
    // ----------------------------------------------------
    if (tect === "divergent") {
      themes.push("Rift‑Valley Trade Routes");
      notes.push("Lowland rift corridors became natural pathways for travel and exchange.");
    }

    // ----------------------------------------------------
    // VOLCANIC REGIONS (Hotspot)
    // ----------------------------------------------------
    if (tect === "hotspot") {
      themes.push("Volcanic Island Navigators");
      notes.push("Communities adapted to geothermal landscapes and developed strong navigation traditions.");
    }

    // ----------------------------------------------------
    // FAULT REGIONS (Transform)
    // ----------------------------------------------------
    if (tect === "transform") {
      themes.push("Fault‑Line Adaptation");
      notes.push("Societies built flexible infrastructure and relied on dispersed settlements.");
    }

    // ----------------------------------------------------
    // CRATON REGIONS (Stable)
    // ----------------------------------------------------
    if (tect === "craton") {
      themes.push("Ancient Heartland Civilizations");
      notes.push("Stable terrain supported long‑lasting agricultural and cultural centers.");
    }

    // ----------------------------------------------------
    // CLIMATE‑DRIVEN HISTORY
    // ----------------------------------------------------
    if (moist === "wet") {
      themes.push("River‑Valley Agriculture");
      notes.push("Reliable water sources supported farming and early urban growth.");
    }

    if (moist === "dry") {
      themes.push("Caravan and Nomadic Traditions");
      notes.push("Communities adapted through mobility and long‑distance trade networks.");
    }

    if (r.climatePattern.toLowerCase().includes("cold")) {
      themes.push("Cold‑Climate Resilience");
      notes.push("Seasonal scarcity encouraged resourcefulness and strong communal ties.");
    }

    if (r.climatePattern.toLowerCase().includes("humid")) {
      themes.push("Tropical Abundance");
      notes.push("Warm, fertile environments supported diverse cultural development.");
    }

    // ----------------------------------------------------
    // SEASONALITY EFFECTS
    // ----------------------------------------------------
    if (lat === "temperate") {
      themes.push("Seasonal Agricultural Cycles");
      notes.push("Communities organized life around planting, harvest, and winter preparation.");
    }

    if (lat === "polar") {
      themes.push("Seasonal Migration Patterns");
      notes.push("Groups moved with the seasons to follow resources.");
    }

    // ----------------------------------------------------
    // WEATHER‑DRIVEN HISTORY (derived, since r.weather doesn't exist)
    // ----------------------------------------------------
    // Storm-prone regions
    if (moist === "wet" && (tect === "convergent" || tect === "divergent")) {
      themes.push("Storm‑Hardened Cultures");
      notes.push("Architecture and traditions evolved to withstand powerful storms.");
    }

    // Blizzard-prone regions
    if (lat === "polar" || (lat === "temperate" && elev === "high")) {
      themes.push("Winter‑Fortified Settlements");
      notes.push("Communities built structures suited for long, harsh winters.");
    }

    // Heat-wave regions
    if (moist === "dry" && (lat === "subtropical" || lat === "tropical")) {
      themes.push("Heat‑Adapted Architecture");
      notes.push("Settlements used shade, airflow, and reflective materials.");
    }

    // ----------------------------------------------------
    // MICRO‑CLIMATE EFFECTS (derived)
    // ----------------------------------------------------
    if (moist === "wet" && elev === "high") {
      themes.push("Cloud‑Forest Traditions");
      notes.push("High‑elevation forests supported unique ecological knowledge and traditions.");
    }

    if (moist === "normal" && elev === "low") {
      themes.push("Fog‑Harvesting Cultures");
      notes.push("Communities developed methods to collect moisture from fog.");
    }

    if (tect === "hotspot") {
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
