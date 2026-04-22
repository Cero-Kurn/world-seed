// --- IMPORT MODULES ---

// Seed engine
import { generateRandomSeed } from "./modules/seed/seedGenerator.js";
import { decodeSeed } from "./modules/seed/seedDecoder.js";
import { generateWorldSummary } from "./modules/seed/worldSummary.js";

// World-scale summaries
import { generateContinentSummary } from "./modules/world/continentSummary.js";
import { generateClimateBiomeSummary } from "./modules/world/climateBiomeSummary.js";
import { generateHexMap, renderHexMap } from "./modules/maps/hexMap.js";

// Regions
import { generateRegions } from "./modules/regions/regionGenerator.js";

// Heatmap
import { generateBiomeHeatmap, renderBiomeHeatmap } from "./modules/maps/biomeHeatmap.js";


// --- UI ELEMENTS ---
const seedInput = document.getElementById("seedInput");
const btnGenerate = document.getElementById("btnGenerate");
const btnDecode = document.getElementById("btnDecode");


// --- RENDER FUNCTIONS ---

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

      <p><strong>Biome:</strong> ${r.biome}</p>
      <p><strong>Elevation:</strong> ${r.elevation}</p>
      <p><strong>Moisture:</strong> ${r.moisture}</p>
      <p><strong>Feature:</strong> ${r.feature}</p>

      <p>${r.description}</p>
    </div>
  `).join("");
}

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

  // Add click listeners for collapsible behavior
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
    CONVERGENT: "#c0392b",
    DIVERGENT: "#8e44ad",
    TRANSFORM: "#f1c40f",
    CRATON: "#7f8c8d",
    HOTSPOT: "#e67e22"
  };

  container.innerHTML = regions.map(r => `
    <div class="tectonic-cell" style="background:${colors[r.tectonicType] || "#444"}">
      <div class="tectonic-cell-inner">${r.tectonicType[0]}</div>
    </div>
  `).join("");
}

  // World Age
function renderWorldAge(regions) {
  const container = document.getElementById("worldAge");

  const counts = regions.reduce((acc, r) => {
    acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
    return acc;
  }, {});

  const total = regions.length;

  const convergent = counts.CONVERGENT || 0;
  const divergent = counts.DIVERGENT || 0;
  const transform = counts.TRANSFORM || 0;
  const craton = counts.CRATON || 0;
  const hotspot = counts.HOTSPOT || 0;

  // World Age Score (0–100)
  // Younger worlds have more active tectonics.
  // Older worlds have more cratons.
  const activityScore =
    (convergent * 15) +
    (divergent * 12) +
    (transform * 8) +
    (hotspot * 10);

  const stabilityScore = craton * 20;

  // Normalize to 0–100
  let worldAge = 50 + stabilityScore - activityScore;
  worldAge = Math.max(0, Math.min(100, worldAge));

  // Age category
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
    CONVERGENT: "#c0392b",
    DIVERGENT: "#8e44ad",
    TRANSFORM: "#f1c40f",
    CRATON: "#7f8c8d",
    HOTSPOT: "#e67e22"
  };

  // Count how many regions use each tectonic type
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

function renderGeologyNarrative(regions) {
  const container = document.getElementById("geologyNarrative");

  const counts = regions.reduce((acc, r) => {
    acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
    return acc;
  }, {});

  const total = regions.length;

  const convergent = counts.CONVERGENT || 0;
  const divergent = counts.DIVERGENT || 0;
  const transform = counts.TRANSFORM || 0;
  const craton = counts.CRATON || 0;
  const hotspot = counts.HOTSPOT || 0;

  // Determine world character
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

  // Add details
  const details = [];

  if (convergent > 0) {
    details.push(`• ${convergent} convergent zones create major mountain belts and strong rain shadows.`);
  }
  if (divergent > 0) {
    details.push(`• ${divergent} divergent zones form rift valleys, heat traps, and linear lakes.`);
  }
  if (transform > 0) {
    details.push(`• ${transform} transform faults carve deep basins and canyon systems.`);
  }
  if (craton > 0) {
    details.push(`• ${craton} cratonic regions anchor the continents with stable, ancient bedrock.`);
  }
  if (hotspot > 0) {
    details.push(`• ${hotspot} hotspot regions fuel volcanic uplands and isolated island chains.`);
  }

  container.innerHTML = `
    <h3>🪨 Geological Narrative</h3>
    <p>${tone}</p>
    <p>${details.join("<br>")}</p>
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

  // Render decoded seed
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

  // Regions Tectonic
  const regions = generateRegions(decoded);
  renderWorldAge(regions);
  renderGeologyNarrative(regions);
  renderTectonicSummary(regions);
  renderRegions(regions);
  renderTectonicMap(regions);
  renderDebugPanel(regions);

  
  // Heatmap
  const heatmap = generateBiomeHeatmap(decoded);
  renderBiomeHeatmap(heatmap);

  // Hex map
  const hexMap = generateHexMap(decoded);
  renderHexMap(hexMap);

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
