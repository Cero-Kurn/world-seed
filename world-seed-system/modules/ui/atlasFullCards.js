


// ------------------------------------------------------------
// modules/ui/atlasFullCards.js
// ------------------------------------------------------------
// Atlas Region Full Cards
// (Climate + Geology + Biome + Features + Colors + Image Icons)
// Deterministic icon selection per seed
// ------------------------------------------------------------

import { BIOME_COLORS } from "../data/biomes.js";

// ------------------------------------------------------------
// Biome → Icon file paths (multiple variants per biome)
// Add/remove icons freely — deterministic picker handles it
// ------------------------------------------------------------
const BIOME_ICON_PATHS = {
  "Alpine": [
    "modules/Geo_Icons/biomes/alpine/Alpine_01.png",
    "modules/Geo_Icons/biomes/alpine/Alpine_02.png",
    "modules/Geo_Icons/biomes/alpine/Alpine_03.png"
  ],
  "Desert": [
    "modules/Geo_Icons/biomes/desert/Desert_01.png",
    "modules/Geo_Icons/biomes/desert/Desert_02.png"
  ],
  "Temperate Forests": [
    "modules/Geo_Icons/biomes/forest_temperate/TemperateForest_01.png",
    "modules/Geo_Icons/biomes/forest_temperate/TemperateForest_02.png"
  ],
  "Tropical Forests": [
    "modules/Geo_Icons/biomes/forest_tropical/TropicalForest_01.png",
    "modules/Geo_Icons/biomes/forest_tropical/TropicalForest_02.png"
  ],
  "Grassland": [
    "modules/Geo_Icons/biomes/grassland/Grassland_01.png"
  ],
  "Tundra": [
    "modules/Geo_Icons/biomes/tundra/Tundra_01.png"
  ],
  "Wetlands": [
    "modules/Geo_Icons/biomes/wetlands/Wetlands_01.png"
  ]
  // Add more as needed — the system is fully extensible
};


////Biome → Icon mapping
//const BIOME_ICONS = {
//  "Tundra": "❄️",
//  "Alpine": "mount",
//  "Taiga Forests": "🌲",
//  "Temperate Forests": "🌳",
//  "Tropical Forests": "🌴",
//  "Grassland": "🌾",
//  "Savanna": "🦒",
//  "Shrubland": "🌿",
//  "Desert": "🏜️",
//  "Wetlands": "🦆",
//  "Freshwater": "💧",
//  "Marine": "🌊",
//  "Coastal": "🏖️",
//  "Geothermal": "🌋",
//  "Subsurface": "🕳️"

// ------------------------------------------------------------
// Deterministic seeded random (per seed + region index)
// ------------------------------------------------------------
function seededRandom(seed, index) {
  const str = seed + "_" + index;
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) / 0xFFFFFFFF;
}

function pickDeterministicIcon(iconList, seed, regionIndex) {
  if (!iconList || iconList.length === 0) return null;
  const r = seededRandom(seed, regionIndex);
  const idx = Math.floor(r * iconList.length);
  return iconList[idx];
}

// ------------------------------------------------------------
// Main Renderer
// ------------------------------------------------------------
export function renderAtlasFullCards(regions, decoded) {
  const container = document.getElementById("atlasFullCards");
  const seed = decoded.seed || "DEFAULT_SEED";

  // Elevation color palette
  const ELEV_COLORS = {
    high: "#8EA6C9",
    mid: "#C9C9C9",
    low: "#D9B38C"
  };

  // Moisture color palette
  const MOIST_COLORS = {
    wet: "#7EC8E3",
    dry: "#E8D18B",
    normal: "#CFCFCF"
  };

  // ------------------------------------------------------------
  // Build each region card
  // ------------------------------------------------------------
  const cardsHTML = regions.map((r, i) => {
    const name = r.name || `Region ${i + 1}`;
    const biome = r.biome;
    const elev = r.elevationTier;
    const moist = r.moistureLevel;
    const lat = r.latitudeBand;
    const tect = r.tectonicType;
    const feats = r.specialFeatures || [];

    const biomeColor = BIOME_COLORS[biome] || "#999999";
    const elevColor = ELEV_COLORS[elev] || "#CCCCCC";
    const moistColor = MOIST_COLORS[moist] || MOIST_COLORS.normal;

    // Deterministic biome icon
    const iconList = BIOME_ICON_PATHS[biome] || [];
    const icon = pickDeterministicIcon(iconList, seed, i);

    const iconHTML = icon
      ? `<img src="${icon}" class="biome-icon">`
      : `<span class="biome-icon">🌐</span>`;

    const iconSmallHTML = icon
      ? `<img src="${icon}" class="biome-icon-small">`
      : `<span class="biome-icon-small">🌐</span>`;

    // ------------------------------------------------------------
    // Climate Summary
    // ------------------------------------------------------------
    let climateSummary = "";

    if (lat === "tropical") climateSummary += "Warm tropical climate with strong solar heating. ";
    else if (lat === "temperate") climateSummary += "Moderate temperate climate with seasonal variation. ";
    else if (lat === "polar") climateSummary += "Cold polar climate with extreme seasonal light cycles. ";

    if (moist === "wet") climateSummary += "High moisture supports lush vegetation and stable rainfall. ";
    else if (moist === "dry") climateSummary += "Low moisture expands arid landscapes and limits vegetation. ";

    if (elev === "high") climateSummary += "High elevation cools temperatures and enhances orographic precipitation. ";
    else if (elev === "low") climateSummary += "Low elevation promotes warmer temperatures and sediment accumulation. ";

    // ------------------------------------------------------------
    // Geology Summary
    // ------------------------------------------------------------
    let geologySummary = "";
    switch (tect) {
      case "convergent":
        geologySummary += "Convergent uplift forms mountains and strong rain shadows. ";
        break;
      case "divergent":
        geologySummary += "Divergent rifting produces volcanic ridges and geothermal anomalies. ";
        break;
      case "transform":
        geologySummary += "Transform shear zones fracture the terrain and create offset valleys. ";
        break;
      case "hotspot":
        geologySummary += "Hotspot volcanism forms shield volcanoes and geothermal fields. ";
        break;
      case "craton":
        geologySummary += "Stable cratonic interiors preserve ancient, erosion‑worn landscapes. ";
        break;
    }

    // ------------------------------------------------------------
    // Biome Summary
    // ------------------------------------------------------------
    let biomeSummary = "";
    if (biome.includes("Forest")) biomeSummary = "Forested landscapes support diverse flora and fauna.";
    else if (biome.includes("Desert")) biomeSummary = "Arid desert terrain with sparse vegetation.";
    else if (biome.includes("Tundra")) biomeSummary = "Cold tundra shaped by permafrost and short growing seasons.";
    else if (biome.includes("Grassland")) biomeSummary = "Open grasslands shaped by seasonal rainfall.";
    else biomeSummary = "This biome supports a unique ecological balance.";

    // ------------------------------------------------------------
    // Special Features
    // ------------------------------------------------------------
    let featureSummary = feats.length > 0
      ? `<p><strong>Special Features:</strong> ${feats.join(", ")}</p>`
      : "";

    // ------------------------------------------------------------
    // Flavor Text
    // ------------------------------------------------------------
    let flavor = `${name} is shaped by its ${biome.toLowerCase()} biome and ${tect} tectonic setting. `;
    flavor += `The region’s ${moist} moisture levels and ${elev} elevation create `;
    flavor += lat === "tropical"
      ? "a warm, vibrant environment with strong ecological productivity."
      : lat === "temperate"
      ? "a balanced seasonal rhythm that supports diverse habitats."
      : lat === "polar"
      ? "a harsh, cold environment where life adapts to extreme conditions."
      : "a distinctive climate shaped by its latitude.";

    // ------------------------------------------------------------
    // Card HTML
    // ------------------------------------------------------------
    return `
      <div class="atlas-card">

        <!-- Biome Color Strip -->
        <div class="atlas-color-strip" style="background:${biomeColor};"></div>

        <div class="atlas-header" data-target="full-${i}">
          ▶ ${iconHTML} ${name} — ${biome}
        </div>

        <div class="atlas-content" id="full-${i}">
          
          <p><strong>Biome:</strong> 
            <span class="badge" style="background:${biomeColor};">
              ${iconSmallHTML} ${biome}
            </span>
          </p>

          <p><strong>Elevation:</strong> 
            <span class="badge" style="background:${elevColor};">${elev}</span>
          </p>

          <p><strong>Moisture:</strong> 
            <span class="badge" style="background:${moistColor};">${moist}</span>
          </p>

          <p><strong>Latitude Band:</strong> ${lat}</p>
          <p><strong>Tectonic Type:</strong> ${tect}</p>

          <p><strong>Climate Summary:</strong> ${climateSummary.trim()}</p>
          <p><strong>Geology Summary:</strong> ${geologySummary.trim()}</p>
          <p><strong>Biome Summary:</strong> ${biomeSummary}</p>

          ${featureSummary}

          <p><strong>Flavor Text:</strong> ${flavor}</p>
        </div>
      </div>
    `;
  }).join("");

  // ------------------------------------------------------------
  // Insert into container
  // ------------------------------------------------------------
  container.innerHTML = `
    <h3>🗺 Atlas — Full Region Cards</h3>
    ${cardsHTML}
  `;

  // ------------------------------------------------------------
  // Collapsible behavior
  // ------------------------------------------------------------
  document.querySelectorAll(".atlas-header").forEach(header => {
    header.addEventListener("click", () => {
      const target = header.getAttribute("data-target");
      const content = document.getElementById(target);
      const isOpen = content.style.display === "block";

      content.style.display = isOpen ? "none" : "block";
      header.textContent = `${isOpen ? "▶" : "▼"} ${header.textContent.slice(2)}`;
    });
  });
}
