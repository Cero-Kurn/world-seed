// ---MicroClimate ---
export function renderMicroClimates(regions, decoded) {
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
