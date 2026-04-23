// --- IMPORT MODULES ---
// Seed engine
import { generateRandomSeed } from "./modules/seed/seedGenerator.js";
import { decodeSeed } from "./modules/seed/seedDecoder.js";
import { generateWorldSummary } from "./modules/seed/worldSummary.js";

// World-scale summaries
import { generateContinentSummary } from "./modules/world/continentSummary.js";
import { generateClimateBiomeSummary } from "./modules/world/climateBiomeSummary.js";

// Maps
import { generateHexMap, renderHexMap } from "./modules/maps/hexMap.js";
import { generateBiomeHeatmap, renderBiomeHeatmap } from "./modules/maps/biomeHeatmap.js";

// Regions
import { generateRegions } from "./modules/regions/regionGenerator.js";


// --- UI ELEMENTS ---
const seedInput = document.getElementById("seedInput");
const btnGenerate = document.getElementById("btnGenerate");
const btnDecode = document.getElementById("btnDecode");


// --- RENDER FUNCTIONS ---

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

// --- CLIMATE NARRATIVE ---
function renderClimateNarrative(regions, decoded) {
  const container = document.getElementById("climateNarrative");

  const lat = decoded.lm.primary.toLowerCase();
  const wind = decoded.we.primary.toLowerCase();
  const hydro = decoded.hy.primary.toLowerCase();

  // --- Determine global climate tone ---
  let tone = "";

  if (lat.includes("hot") || lat.includes("greenhouse")) {
    tone = "This is a warm, energy‑rich world with expanded tropical zones and intense atmospheric circulation.";
  } else if (lat.includes("cold") || lat.includes("ice")) {
    tone = "This is a cold world shaped by broad polar influence, glacial remnants, and compressed temperate zones.";
  } else if (lat.includes("chaotic") || lat.includes("magical")) {
    tone = "This world experiences unstable temperature gradients, producing unpredictable climate behavior.";
  } else {
    tone = "This world follows a broadly Earth‑like temperature gradient with familiar climatic belts.";
  }

  // --- Wind-driven climate behavior ---
  let windEffect = "";

  if (wind.includes("monsoon")) {
    windEffect = "Seasonal monsoon cycles dominate rainfall, creating sharp wet‑dry contrasts across continents.";
  } else if (wind.includes("chaotic") || wind.includes("magical")) {
    windEffect = "Atmospheric circulation is turbulent and irregular, leading to volatile storm patterns.";
  } else if (wind.includes("moist")) {
    windEffect = "Moist oceanic winds deliver consistent rainfall to windward coasts and inland basins.";
  } else if (wind.includes("dry")) {
    windEffect = "Dry continental winds suppress rainfall, expanding deserts and semi‑arid regions.";
  } else {
    windEffect = "Prevailing winds distribute moisture in a balanced, predictable pattern.";
  }

  // --- Hydrology influence ---
  let hydroEffect = "";

  if (hydro.includes("wetland") || hydro.includes("lake") || hydro.includes("river")) {
    hydroEffect = "Abundant surface water supports lush biomes and stabilizes regional climates.";
  } else if (hydro.includes("arid") || hydro.includes("dried")) {
    hydroEffect = "Sparse hydrology intensifies drought cycles and expands desert belts.";
  } else if (hydro.includes("glacial")) {
    hydroEffect = "Glacial meltwater feeds major rivers, moderating climates downstream.";
  } else {
    hydroEffect = "Hydrological patterns vary widely, shaping diverse regional climates.";
  }

  // --- Tectonic influence on climate ---
  const tectonic = decoded.tr.tectonicType;
  let tectonicEffect = "";

  switch (tectonic) {
    case "convergent":
      tectonicEffect = "Large mountain ranges create strong rain shadows and distinct climatic divides.";
      break;
    case "divergent":
      tectonicEffect = "Rift zones generate heat anomalies and localized storm formation.";
      break;
    case "transform":
      tectonicEffect = "Faulted uplands disrupt airflow, producing patchy microclimates.";
      break;
    case "hotspot":
      tectonicEffect = "Volcanic regions generate thermal updrafts and unique geothermal climates.";
      break;
    case "craton":
      tectonicEffect = "Stable cratonic interiors experience long‑term climatic consistency.";
      break;
  }

  container.innerHTML = `
    <h3>🌡 Climate Narrative</h3>
    <p>${tone}</p>
    <p>${windEffect}</p>
    <p>${hydroEffect}</p>
    <p>${tectonicEffect}</p>
  `;
}

// ---MicroClimate ---
function renderMicroClimates(regions, decoded) {
  const container = document.getElementById("microClimate");

  const wind = decoded.we.primary.toLowerCase();

  function detectMicroClimate(r) {
    const tags = [];
    const notes = [];

    // --- Fog Belts ---
    if (r.moisture === "Wet" && r.elevation.includes("High")) {
      tags.push("Fog Belt");
      notes.push("Moist air condenses along high slopes, forming persistent fog.");
    }

    // --- Cloud Forests ---
    if (r.latitudeBand === "Tropical" && r.elevation.includes("High")) {
      tags.push("Cloud Forest");
      notes.push("Warm, humid air rises into cooler elevations, creating cloud‑soaked forests.");
    }

    // --- Geothermal Zones ---
    if (r.tectonicType === "hotspot") {
      tags.push("Geothermal Zone");
      notes.push("Volcanic heat drives geysers, hot springs, and warm micro‑climates.");
    }

    // --- Rift Valley Heat Traps ---
    if (r.tectonicType === "divergent") {
      tags.push("Rift Heat Trap");
      notes.push("Low‑lying rift basins accumulate heat and moisture.");
    }

    // --- Rain Shadow Deserts ---
    if (r.elevation.includes("Mountain") && r.moisture === "Dry") {
      tags.push("Rain Shadow Desert");
      notes.push("Mountains block moist winds, creating dry leeward climates.");
    }

    // --- Monsoon Corridors ---
    if (wind.includes("monsoon") && r.latitudeBand === "Tropical") {
      tags.push("Monsoon Corridor");
      notes.push("Seasonal wind reversals bring intense wet‑dry cycles.");
    }

    // --- Polar Katabatic Winds ---
    if (r.latitudeBand === "Polar") {
      tags.push("Katabatic Winds");
      notes.push("Cold, dense air flows downslope, creating fierce local winds.");
    }

    // --- Fault‑Driven Microclimates ---
    if (r.tectonicType === "transform") {
      tags.push("Faultline Microclimate");
      notes.push("Broken terrain creates pockets of unusual temperature and moisture.");
    }

    // --- Craton Stability ---
    if (r.tectonicType === "craton") {
      tags.push("Stable Climate Pocket");
      notes.push("Ancient crust produces long‑term climatic stability.");
    }

    return { tags, notes };
  }

  const entries = regions.map(r => {
    const mc = detectMicroClimate(r);

    const tagStr = mc.tags.length > 0
      ? mc.tags.map(t => `<strong>${t}</strong>`).join(", ")
      : "None";

    const noteStr = mc.notes.length > 0
      ? mc.notes.join(" ")
      : "No significant micro‑climatic anomalies.";

    return `
      <div class="mc-entry">
        <div><strong>${r.name}</strong></div>
        <div>Micro‑Climates: ${tagStr}</div>
        <div>${noteStr}</div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <h3>🌿 Micro‑Climate Generator</h3>
    ${entries}
  `;
}

// ---CLIMATE ANOMALIES ---
function renderClimateAnomalies(regions, decoded) {
  const container = document.getElementById("climateAnomalies");

  const lat = decoded.lm.primary.toLowerCase();
  const wind = decoded.we.primary.toLowerCase();
  const hydro = decoded.hy.primary.toLowerCase();
  const tectonic = decoded.tr.tectonicType;

  const anomalies = [];

  // ----------------------------------------------------
  // MONSOON BELTS
  // ----------------------------------------------------
  if (wind.includes("monsoon") || wind.includes("seasonally reversing")) {
    anomalies.push({
      name: "Monsoon Belt",
      desc: "Seasonal wind reversals create intense wet‑dry cycles across tropical and subtropical regions."
    });
  }

  // ----------------------------------------------------
  // HEAT DOMES
  // ----------------------------------------------------
  if (lat.includes("hot") || lat.includes("greenhouse") || lat.includes("heat")) {
    anomalies.push({
      name: "Heat Dome Zones",
      desc: "Persistent high‑pressure systems trap heat, producing extreme temperatures and stagnant air masses."
    });
  }

  // ----------------------------------------------------
  // COLD OCEAN CURRENTS
  // ----------------------------------------------------
  if (lat.includes("cold") || hydro.includes("glacial")) {
    anomalies.push({
      name: "Cold Ocean Currents",
      desc: "Cold currents cool coastal climates, creating fog belts and stabilizing regional temperatures."
    });
  }

  // ----------------------------------------------------
  // WARM OCEAN CURRENTS
  // ----------------------------------------------------
  if (lat.includes("hot") || hydro.includes("lake") || hydro.includes("wetland")) {
    anomalies.push({
      name: "Warm Ocean Currents",
      desc: "Warm currents intensify humidity and storm formation along eastern continental margins."
    });
  }

  // ----------------------------------------------------
  // POLAR VORTEX ZONES
  // ----------------------------------------------------
  if (lat.includes("cold") || lat.includes("ice")) {
    anomalies.push({
      name: "Polar Vortex Zones",
      desc: "Cold polar air masses periodically collapse southward, creating extreme winter events."
    });
  }

  // ----------------------------------------------------
  // JET STREAM BREAKS
  // ----------------------------------------------------
  if (wind.includes("jet") || wind.includes("instability")) {
    anomalies.push({
      name: "Jet‑Stream Breaks",
      desc: "High‑altitude wind rivers fracture into unstable loops, causing unpredictable weather shifts."
    });
  }

  // ----------------------------------------------------
  // STORM CORRIDORS
  // ----------------------------------------------------
  if (wind.includes("storm") || wind.includes("cyclone") || wind.includes("hurricane")) {
    anomalies.push({
      name: "Storm Corridors",
      desc: "Atmospheric convergence zones generate frequent storms, cyclones, and extreme rainfall."
    });
  }

  // ----------------------------------------------------
  // DESERTIFICATION BELTS
  // ----------------------------------------------------
  if (wind.includes("dry") || hydro.includes("arid") || hydro.includes("dried")) {
    anomalies.push({
      name: "Desertification Belts",
      desc: "Dry winds and sparse hydrology expand arid regions and suppress vegetation growth."
    });
  }

  // ----------------------------------------------------
  // HUMIDITY CONVERGENCE ZONES
  // ----------------------------------------------------
  if (wind.includes("moist") || hydro.includes("wetland") || hydro.includes("river")) {
    anomalies.push({
      name: "Humidity Convergence Zones",
      desc: "Moist air masses collide, producing fog, thunderstorms, and lush vegetation."
    });
  }

  // ----------------------------------------------------
  // TECTONIC CLIMATE ANOMALIES
  // ----------------------------------------------------
  switch (tectonic) {
    case "CONVERGENT":
      anomalies.push({
        name: "Orographic Climate Walls",
        desc: "Massive mountain ranges split climates into wet windward zones and dry leeward basins."
      });
      break;

    case "DIVERGENT":
      anomalies.push({
        name: "Rift‑Valley Heat Basins",
        desc: "Low‑lying rift zones trap heat and moisture, creating unique thermal micro‑climates."
      });
      break;

    case "TRANSFORM":
      anomalies.push({
        name: "Fault‑Driven Microclimates",
        desc: "Broken terrain disrupts airflow, producing patchy temperature and moisture anomalies."
      });
      break;

    case "HOTSPOT":
      anomalies.push({
        name: "Volcanic Thermal Anomalies",
        desc: "Hotspot volcanism generates warm updrafts, localized storms, and geothermal climate pockets."
      });
      break;

    case "CRATON":
      anomalies.push({
        name: "Stable Climate Shields",
        desc: "Ancient cratonic interiors resist climatic extremes and maintain long‑term stability."
      });
      break;
  }

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------
  const entries = anomalies.map(a => `
    <div class="anomaly-entry">
      <strong>${a.name}</strong><br>
      ${a.desc}
    </div>
  `).join("");

  container.innerHTML = `
    <h3>🌡 Climate Anomalies</h3>
    ${entries}
  `;
}

// --- Regional Weather
function renderRegionalWeather(regions, decoded) {
  const container = document.getElementById("regionalWeather");

  const wind = decoded.we.primary.toLowerCase();

  function detectWeather(r) {
    const events = [];
    const notes = [];

    // ----------------------------------------------------
    // SUPER‑STORMS & CYCLONES
    // ----------------------------------------------------
    if (wind.includes("storm") || wind.includes("cyclone") || wind.includes("hurricane")) {
      if (r.moisture === "Wet") {
        events.push("Super‑Storms");
        notes.push("Moist air and unstable winds fuel powerful rotating storm systems.");
      }
    }

    // ----------------------------------------------------
    // MONSOON SURGES
    // ----------------------------------------------------
    if (wind.includes("monsoon") && r.latitudeBand === "Tropical") {
      events.push("Monsoon Surges");
      notes.push("Seasonal wind reversals bring intense rainfall and flooding.");
    }

    // ----------------------------------------------------
    // BLIZZARDS
    // ----------------------------------------------------
    if (r.latitudeBand === "Polar" || (r.latitudeBand === "Temperate" && r.elevation.includes("High"))) {
      events.push("Blizzards");
      notes.push("Cold air masses and elevation combine to produce severe snowstorms.");
    }

    // ----------------------------------------------------
    // HEAT WAVES
    // ----------------------------------------------------
    if (r.moisture === "Dry" && (r.latitudeBand === "Subtropical" || r.latitudeBand === "Tropical")) {
      events.push("Heat Waves");
      notes.push("High pressure and dry air create prolonged periods of extreme heat.");
    }

    // ----------------------------------------------------
    // COLD SNAPS
    // ----------------------------------------------------
    if (r.latitudeBand === "Temperate" && r.hemisphere === "Northern") {
      events.push("Cold Snaps");
      notes.push("Polar air occasionally plunges southward, causing sudden freezes.");
    }

    // ----------------------------------------------------
    // FOG SEASONS
    // ----------------------------------------------------
    if (r.moisture === "Moderate" && r.elevation.includes("Low")) {
      events.push("Fog Seasons");
      notes.push("Temperature inversions trap moisture, creating seasonal fog banks.");
    }

    // ----------------------------------------------------
    // WIND SHEAR ZONES
    // ----------------------------------------------------
    if (r.tectonicType === "transform") {
      events.push("Wind Shear Bursts");
      notes.push("Faulted terrain channels winds into violent gusts and turbulence.");
    }

    // ----------------------------------------------------
    // RIFT‑VALLEY THUNDERSTORMS
    // ----------------------------------------------------
    if (r.tectonicType === "divergent") {
      events.push("Rift‑Valley Thunderstorms");
      notes.push("Warm rising air in rift basins triggers intense convective storms.");
    }

    // ----------------------------------------------------
    // VOLCANIC ASH WEATHER
    // ----------------------------------------------------
    if (r.tectonicType === "hotspot") {
      events.push("Volcanic Ash Weather");
      notes.push("Eruptive activity periodically fills the air with ash and particulates.");
    }

    return { events, notes };
  }

  const entries = regions.map(r => {
    const w = detectWeather(r);

    const eventStr = w.events.length > 0
      ? w.events.map(e => `<strong>${e}</strong>`).join(", ")
      : "None";

    const noteStr = w.notes.length > 0
      ? w.notes.join(" ")
      : "No significant weather events.";

    return `
      <div class="weather-entry">
        <div><strong>${r.name}</strong></div>
        <div>Weather Patterns: ${eventStr}</div>
        <div>${noteStr}</div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <h3>⛈ Regional Weather Generator</h3>
    ${entries}
  `;
}


// ---Climate Extremes ---
function renderRegionalClimateExtremes(regions, decoded) {
  const container = document.getElementById("regionalClimateExtremes");

  const wind = decoded.we.primary.toLowerCase();

  function detectExtremes(r) {
    const tags = [];
    const notes = [];

    // ----------------------------------------------------
    // HEAT DOMES
    // ----------------------------------------------------
    if (r.latitudeBand === "Subtropical" && r.moisture === "Dry") {
      tags.push("Heat Dome");
      notes.push("High‑pressure stagnation traps heat, creating extreme temperature spikes.");
    }

    // ----------------------------------------------------
    // POLAR VORTEX DROPS
    // ----------------------------------------------------
    if (r.latitudeBand === "Temperate" && r.hemisphere === "Northern") {
      tags.push("Polar Vortex Drops");
      notes.push("Cold polar air occasionally collapses southward, causing sudden freezes.");
    }

    // ----------------------------------------------------
    // SUPER‑STORM TRACKS
    // ----------------------------------------------------
    if (wind.includes("storm") || wind.includes("cyclone") || wind.includes("hurricane")) {
      if (r.moisture === "Wet") {
        tags.push("Super‑Storm Track");
        notes.push("Moist air and unstable winds fuel powerful storm systems.");
      }
    }

    // ----------------------------------------------------
    // FLASH‑FLOOD BASINS
    // ----------------------------------------------------
    if (r.moisture === "Wet" && r.elevation === "Lowlands") {
      tags.push("Flash‑Flood Basin");
      notes.push("Low‑lying terrain channels sudden rainfall into rapid flooding.");
    }

    // ----------------------------------------------------
    // HYPER‑DROUGHT ZONES
    // ----------------------------------------------------
    if (r.moisture === "Dry" && r.elevation.includes("High")) {
      tags.push("Hyper‑Drought Zone");
      notes.push("High elevation and dry winds create long‑term drought conditions.");
    }

    // ----------------------------------------------------
    // COLD‑CURRENT FOGLANDS
    // ----------------------------------------------------
    if (r.moisture === "Moderate" && r.latitudeBand === "Temperate") {
      tags.push("Cold‑Current Foglands");
      notes.push("Cold offshore currents generate persistent coastal fog.");
    }

    // ----------------------------------------------------
    // RIFT‑VALLEY HEAT BASINS
    // ----------------------------------------------------
    if (r.tectonicType === "DIVERGENT") {
      tags.push("Rift‑Valley Heat Basin");
      notes.push("Rift depressions trap heat and moisture, amplifying temperature swings.");
    }

    // ----------------------------------------------------
    // VOLCANIC THERMAL SURGES
    // ----------------------------------------------------
    if (r.tectonicType === "HOTSPOT") {
      tags.push("Volcanic Thermal Surges");
      notes.push("Volcanic activity periodically releases heat, altering local climates.");
    }

    // ----------------------------------------------------
    // FAULT‑DRIVEN WIND SHEAR
    // ----------------------------------------------------
    if (r.tectonicType === "TRANSFORM") {
      tags.push("Fault‑Driven Wind Shear");
      notes.push("Broken terrain channels winds into violent gusts and turbulence.");
    }

    return { tags, notes };
  }

  const entries = regions.map(r => {
    const ex = detectExtremes(r);

    const tagStr = ex.tags.length > 0
      ? ex.tags.map(t => `<strong>${t}</strong>`).join(", ")
      : "None";

    const noteStr = ex.notes.length > 0
      ? ex.notes.join(" ")
      : "No major climate extremes.";

    return `
      <div class="extreme-entry">
        <div><strong>${r.name}</strong></div>
        <div>Extremes: ${tagStr}</div>
        <div>${noteStr}</div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <h3>🔥 Regional Climate Extremes</h3>
    ${entries}
  `;
}

// ---REGIONAL DISASTERS
function renderRegionalDisasters(regions, decoded) {
  const container = document.getElementById("regionalDisasters");

  const wind = decoded.we.primary.toLowerCase();

  function detectDisasters(r) {
    const events = [];
    const notes = [];

    // ----------------------------------------------------
    // EARTHQUAKES (Transform + Convergent)
    // ----------------------------------------------------
    if (r.tectonicType === "TRANSFORM" || r.tectonicType === "CONVERGENT") {
      events.push("Earthquake Risk");
      notes.push("Active fault systems may produce occasional seismic activity.");
    }

    // ----------------------------------------------------
    // VOLCANIC ERUPTIONS (Hotspot + Convergent arcs)
    // ----------------------------------------------------
    if (r.tectonicType === "HOTSPOT" || r.tectonicType === "CONVERGENT") {
      events.push("Volcanic Activity");
      notes.push("Volcanic systems may experience periodic eruptions or ash emissions.");
    }

    // ----------------------------------------------------
    // MEGASTORMS (Storm belts + wet regions)
    // ----------------------------------------------------
    if (wind.includes("storm") || wind.includes("cyclone") || wind.includes("hurricane")) {
      if (r.moisture === "Wet") {
        events.push("Megastorm Potential");
        notes.push("Warm, moist air and unstable winds can generate powerful storm systems.");
      }
    }

    // ----------------------------------------------------
    // FLASH FLOODS (Wet + Lowlands)
    // ----------------------------------------------------
    if (r.moisture === "Wet" && r.elevation === "Lowlands") {
      events.push("Flash Flood Risk");
      notes.push("Heavy rainfall can overwhelm low‑lying basins.");
    }

    // ----------------------------------------------------
    // DROUGHT COLLAPSES (Dry + Subtropical)
    // ----------------------------------------------------
    if (r.moisture === "Dry" && r.latitudeBand === "Subtropical") {
      events.push("Drought Conditions");
      notes.push("Extended dry periods may stress ecosystems and water supplies.");
    }

    // ----------------------------------------------------
    // BLIZZARD EVENTS (Polar + High elevation)
    // ----------------------------------------------------
    if (r.latitudeBand === "Polar" || r.elevation.includes("High")) {
      events.push("Blizzard Events");
      notes.push("Cold air masses can produce severe snowstorms during winter seasons.");
    }

    // ----------------------------------------------------
    // RIFT COLLAPSES (Divergent)
    // ----------------------------------------------------
    if (r.tectonicType === "DIVERGENT") {
      events.push("Rift Instability");
      notes.push("Rift zones may experience ground deformation or sudden shifts.");
    }

    // ----------------------------------------------------
    // ASHFALL SEASONS (Hotspot)
    // ----------------------------------------------------
    if (r.tectonicType === "HOTSPOT") {
      events.push("Ashfall Season");
      notes.push("Volcanic plumes may occasionally deposit ash across the region.");
    }

    return { events, notes };
  }

  const entries = regions.map(r => {
    const d = detectDisasters(r);

    const eventStr = d.events.length > 0
      ? d.events.map(e => `<strong>${e}</strong>`).join(", ")
      : "None";

    const noteStr = d.notes.length > 0
      ? d.notes.join(" ")
      : "No significant natural hazards.";

    return `
      <div class="disaster-entry">
        <div><strong>${r.name}</strong></div>
        <div>Hazards: ${eventStr}</div>
        <div>${noteStr}</div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <h3>🌋 Regional Disaster Generator</h3>
    ${entries}
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

  
  // Regions + tectonics
  const regions = generateRegions(decoded);
  renderClimateNarrative(regions, decoded);
  renderMicroClimates(regions, decoded);
  renderClimateAnomalies(regions, decoded);
  renderRegionalClimateExtremes(regions, decoded);
  renderRegionalWeather(regions, decoded);
  renderRegionalDisasters(regions, decoded);
  renderWorldAge(regions);
  renderVolcanicHazard(regions);
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
