// --- IMPORT MODULES ---
// Seed engine
import { generateRandomSeed } from "./modules/seed/seedGenerator.js";
import { decodeSeed } from "./modules/seed/seedDecoder.js";
import { generateWorldSummary } from "./modules/seed/worldSummary.js";

// World-scale summaries
import { generateContinentSummary } from "./modules/world/continentSummary.js";
import { generateClimateBiomeSummary } from "./modules/world/climateBiomeSummary.js";
import { renderWorldFormation } from "./modules/climate/worldFormation.js";

// Maps
import { generateHexMap, renderHexMap } from "./modules/maps/hexMap.js";
import { generateBiomeHeatmap, renderBiomeHeatmap } from "./modules/maps/biomeHeatmap.js";

// Regions
import { generateRegions } from "./modules/regions/regionGenerator.js";
import { generateTradeAndMigration } from "./modules/climate/tradeMigration.js";
import { renderTradeMigration } from "./modules/climate/renderTradeMigration.js";

// --- UI ELEMENTS ---
import { renderChecklistPanel } from "./modules/ui/checklistPanel.js";
const seedInput = document.getElementById("seedInput");
const btnGenerate = document.getElementById("btnGenerate");
const btnDecode = document.getElementById("btnDecode");

// --- CLIMATE MODULES ---
import { renderClimateNarrative } from "./modules/climate/climateNarrative.js";
import { renderOceanCurrents } from "./modules/climate/oceanCurrents.js";
import { renderClimateAnomalies } from "./modules/climate/climateAnomalies.js";
import { renderMicroClimates } from "./modules/climate/microClimates.js";
import { renderRegionalWeather } from "./modules/climate/regionalWeather.js";
import { renderRegionalClimateExtremes } from "./modules/climate/regionalClimateExtremes.js";
import { renderRegionalDisasters } from "./modules/climate/regionalDisasters.js";
import { renderSeasonalVariability } from "./modules/climate/seasonalVariability.js";
import { renderRegionalHistory } from "./modules/climate/regionalHistory.js";

// --- BIOME MODULES ---
import { smoothBiomes } from "./modules/climate/biomeSmoothing.js";
import { renderBiomeLegend } from "./modules/climate/biomeLegend.js";
import { renderBiomeTendencies } from "./modules/climate/biomeTendencies.js";
import { assignBiomeRoles } from "./modules/climate/biomeRoles.js";


// --- RENDER FUNCTIONS ---
renderChecklistPanel();
// Decoded seed block
function renderDecoded(decoded, seedStr) {
  const container = document.getElementById("decodedOutput");

  const block = (item) => `
    <div class="card" style="background:#111; margin:0;">
      <div class="label">${item.label}</div>
      <div><strong>Code:</strong> ${item.code}</div>
      <div><strong>Primary:</strong> ${item.primary}</div>
      <div><strong>Twist:</strong> ${item.twist}</div>
    </div>
  `;

  container.innerHTML = `
    <p><span class="label">Seed:</span> ${seedStr}</p>
    <div class="grid">
      ${block(decoded.cc)}
      ${block(decoded.lm)}
      ${block(decoded.we)}
      ${block(decoded.tr)}
      ${block(decoded.hy)}
      ${block(decoded.sf)}
    </div>
  `;
}


// Region cards (now includes tectonic info)
function renderRegions(regions) {
  const container = document.getElementById("regionSummary");

  container.innerHTML = regions.map(r => `
    <div class="card" style="background:#111; margin:0;">
      <div class="label">${r.name}</div>

      <p><strong>Latitude Band:</strong> ${r.latitudeBand}</p>
      <p><strong>Climate Pattern:</strong> ${r.climatePattern}</p>
      <p><strong>Elevation Tier:</strong> ${r.elevationTier}</p>
      <p><strong>Role:</strong> ${r.role}</p>

      <hr style="border:0; border-top:1px solid #333; margin:8px 0;">

      <p><strong>Tectonic Type:</strong> ${r.tectonicType}</p>
      <p><strong>Prevailing Wind:</strong> ${r.prevailingWind}</p>
      <p><strong>Hemisphere:</strong> ${r.hemisphere}</p>

      <hr style="border:0; border-top:1px solid #333; margin:8px 0;">

      <p><strong>Biome:</strong> ${r.biome}</p>
      <p><strong>Biome Role:</strong> ${r.biomeRole}</p>
      <p><strong>Elevation:</strong> ${r.elevation}</p>
      <p><strong>Moisture:</strong> ${r.moisture}</p>
      <p><strong>Feature:</strong> ${r.feature}</p>

      <p>${r.description}</p>
    </div>
  `).join("");
}


// Collapsible Debug Panel
function renderDebugPanel(regions) {
  const panel = document.getElementById("debugPanel");

  panel.innerHTML = regions.map((r, i) => `
    <div class="debug-entry">
      <div class="debug-header" data-debug="${i}">
        ▶ ${r.name}
      </div>
      <div class="debug-content" id="debug-${i}">
        • Tectonics: ${r.debug.tectonic}
        \n• Wind: ${r.debug.wind}
        \n• Rain Shadow: ${r.debug.rainShadow}
        \n• Elevation Tier: ${r.debug.elevationTier}
        \n• Biome Logic: ${r.debug.biome}
        \n• Moisture Logic: ${r.debug.moisture}
        \n• Climate Logic: ${r.debug.climate}
      </div>
    </div>
  `).join("");

  // Collapsible behavior
  document.querySelectorAll(".debug-header").forEach(header => {
    header.addEventListener("click", () => {
      const index = header.getAttribute("data-debug");
      const content = document.getElementById(`debug-${index}`);
      const isOpen = content.style.display === "block";

      content.style.display = isOpen ? "none" : "block";
      header.textContent = `${isOpen ? "▶" : "▼"} ${regions[index].name}`;
    });
  });
}


// Tectonic Map
function renderTectonicMap(regions) {
  const container = document.getElementById("tectonicMap");

  const colors = {
    convergent: "#c0392b",
    divergent: "#8e44ad",
    transform: "#f1c40f",
    craton: "#7f8c8d",
    hotspot: "#e67e22"
  };

  container.innerHTML = regions.map(r => `
    <div class="tectonic-cell" style="background:${colors[r.tectonicType] || "#444"}">
      <div class="tectonic-cell-inner">${r.tectonicType[0]}</div>
    </div>
  `).join("");
}


// World Age Score
function renderWorldAge(regions) {
  const container = document.getElementById("worldAge");

  const counts = regions.reduce((acc, r) => {
    acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
    return acc;
  }, {});

  const total = regions.length;

  const convergent = counts.convergent || 0;
  const divergent = counts.divergent || 0;
  const transform = counts.transform || 0;
  const craton = counts.craton || 0;
  const hotspot = counts.hotspot || 0;

  const activityScore =
    (convergent * 15) +
    (divergent * 12) +
    (transform * 8) +
    (hotspot * 10);

  const stabilityScore = craton * 20;

  let worldAge = 50 + stabilityScore - activityScore;
  worldAge = Math.max(0, Math.min(100, worldAge));

  let ageLabel = "";
  let ageDescription = "";

  if (worldAge < 33) {
    ageLabel = "Young World";
    ageDescription = "This world is geologically young, with active plate collisions, rifting, and volcanic hotspots shaping its surface.";
  } else if (worldAge < 66) {
    ageLabel = "Mature World";
    ageDescription = "This world shows a balanced geological history, with both active tectonics and long‑settled continental interiors.";
  } else {
    ageLabel = "Ancient World";
    ageDescription = "This world is geologically old, dominated by ancient cratons and long‑eroded mountain belts.";
  }

  container.innerHTML = `
    <h3>⏳ World Age Score</h3>
    <p><strong>Score:</strong> ${worldAge.toFixed(0)} / 100</p>
    <p><strong>Classification:</strong> ${ageLabel}</p>
    <p>${ageDescription}</p>
  `;
}


// Tectonic Summary
function renderTectonicSummary(regions) {
  const container = document.getElementById("tectonicSummary");

  const colors = {
    convergent: "#c0392b",
    divergent: "#8e44ad",
    transform: "#f1c40f",
    craton: "#7f8c8d",
    hotspot: "#e67e22"
  };

  const counts = regions.reduce((acc, r) => {
    acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
    return acc;
  }, {});

  const badges = Object.entries(counts)
    .map(([type, count]) => `
      <div class="tectonic-badge" style="background:${colors[type]}">
        ${type}: ${count}
      </div>
    `)
    .join("");

  container.innerHTML = `
    <h3>🌍 Tectonic Summary</h3>
    <div class="summary-row">
      ${badges}
    </div>
  `;
}


// Geological Narrative
function renderGeologyNarrative(regions) {
  const container = document.getElementById("geologyNarrative");

  const counts = regions.reduce((acc, r) => {
    acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
    return acc;
  }, {});

  const total = regions.length;

  const convergent = counts.convergent || 0;
  const divergent = counts.divergent || 0;
  const transform = counts.transform || 0;
  const craton = counts.craton || 0;
  const hotspot = counts.hotspot || 0;

  const youngWorld = convergent + divergent + hotspot > total * 0.5;
  const stableWorld = craton > total * 0.5;
  const fracturedWorld = transform > total * 0.3;

  let tone = "";

  if (youngWorld) {
    tone = "This is a geologically young and restless world, shaped by active plate collisions, spreading rifts, and volcanic hotspots.";
  } else if (stableWorld) {
    tone = "This is an old, stable world dominated by ancient cratons and long‑quiet continental interiors.";
  } else if (fracturedWorld) {
    tone = "This world is heavily fractured, marked by long transform faults and shifting continental blocks.";
  } else {
    tone = "This world shows a balanced mix of tectonic forces, neither overly young nor fully settled.";
  }

  const details = [];

  if (convergent > 0) details.push(`• ${convergent} convergent zones create major mountain belts and strong rain shadows.`);
  if (divergent > 0) details.push(`• ${divergent} divergent zones form rift valleys, heat traps, and linear lakes.`);
  if (transform > 0) details.push(`• ${transform} transform faults carve deep basins and canyon systems.`);
  if (craton > 0) details.push(`• ${craton} cratonic regions anchor the continents with stable, ancient bedrock.`);
  if (hotspot > 0) details.push(`• ${hotspot} hotspot regions fuel volcanic uplands and isolated island chains.`);

  container.innerHTML = `
    <h3>🪨 Geological Narrative</h3>
    <p>${tone}</p>
    <p>${details.join("<br>")}</p>
  `;
}

// Volcanic Hazard
function renderVolcanicHazard(regions) {
  const container = document.getElementById("volcanicHazard");

  const counts = regions.reduce((acc, r) => {
    acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
    return acc;
  }, {});

  const total = regions.length;

  const convergent = counts.convergent || 0;
  const divergent = counts.divergent || 0;
  const transform = counts.transform || 0;
  const craton = counts.craton || 0;
  const hotspot = counts.hotspot || 0;

  // Volcanic hazard score
  const hazardScore =
    (hotspot * 25) +      // hotspots = strongest volcanic activity
    (convergent * 18) +   // subduction volcanoes
    (divergent * 12) +    // rift volcanoes
    (transform * 4) -     // minor volcanic activity
    (craton * 10);        // cratons reduce hazard

  // Normalize 0–100
  const score = Math.max(0, Math.min(100, hazardScore));

  // Classification
  let label = "";
  let description = "";

  if (score < 20) {
    label = "Low Hazard";
    description = "Volcanic activity is rare, with only isolated geothermal zones or dormant volcanic fields.";
  } else if (score < 50) {
    label = "Moderate Hazard";
    description = "Volcanism is present but localized, typically along rifts or minor hotspots.";
  } else if (score < 80) {
    label = "High Hazard";
    description = "Active volcanic systems are common, including rift volcanoes and subduction arcs.";
  } else {
    label = "Extreme Hazard";
    description = "The world is volcanically intense, with major hotspots, active arcs, and widespread eruptions.";
  }

  container.innerHTML = `
    <h3>🌋 Volcanic Hazard Rating</h3>
    <p><strong>Score:</strong> ${score.toFixed(0)} / 100</p>
    <p><strong>Classification:</strong> ${label}</p>
    <p>${description}</p>
  `;
}




// --- MAIN ACTIONS ---
function processSeed(seed) {
  let decoded;

  try {
    decoded = decodeSeed(seed);
  } catch (err) {
    alert("Invalid seed format.");
    return;
  }


  // --- DECODE ---
  renderDecoded(decoded, seed);
  
  // World summary
  document.getElementById("worldSummary").innerHTML =
    generateWorldSummary(decoded);

  // Continent summary
  document.getElementById("continentSummary").innerHTML =
    generateContinentSummary(decoded);

  // Climate & biome summary
  document.getElementById("climateBiomeSummary").innerHTML =
    generateClimateBiomeSummary(decoded);
  
  // --- SUMMARIES ---
  //worldSummary...
  //continentSummary...
  //climateBiomeSummary...
  
  // --- REGIONS ---
  const regions = generateRegions(decoded);

  // BIOME TRANSITION SMOOTHING
  smoothBiomes(regions);
  
  // --- BIOME ROLES ---
  assignBiomeRoles(regions);
  
      // 🌍 GLOBAL CLIMATE SYSTEMS
  renderClimateNarrative(regions, decoded);
  renderOceanCurrents(regions, decoded);
  renderClimateAnomalies(regions, decoded);
  
    // 🌱 REGIONAL CLIMATE SYSTEMS
  renderMicroClimates(regions, decoded);
  renderRegionalWeather(regions, decoded);
  renderRegionalClimateExtremes(regions, decoded);
  renderRegionalDisasters(regions, decoded);
  renderSeasonalVariability(regions, decoded);
  renderRegionalHistory(regions, decoded);
  renderWorldFormation(regions, decoded);

  const tm = generateTradeAndMigration(regions);
  renderTradeMigration(tm);
  
  // --- BIOME PANELS ---
  renderBiomeLegend();
  renderBiomeTendencies(regions);
  
    // 🪨 GEOLOGY SYSTEMS
  renderWorldAge(regions);
  renderVolcanicHazard(regions);
  renderGeologyNarrative(regions);
  renderTectonicSummary(regions);
  
    // 🗺 REGION CARDS + MAP
  renderRegions(regions);
  renderTectonicMap(regions);
  renderDebugPanel(regions);
  
  // --- BIOME MAPS ---
  renderBiomeHeatmap(generateBiomeHeatmap(decoded));
  renderHexMap(generateHexMap(decoded));



}


// --- BUTTON HANDLERS ---
btnGenerate.addEventListener("click", () => {
  const seed = generateRandomSeed();
  seedInput.value = seed;
  processSeed(seed);
});

btnDecode.addEventListener("click", () => {
  const seed = seedInput.value.trim();
  if (!seed) return alert("Enter a seed first.");
  processSeed(seed);
});
