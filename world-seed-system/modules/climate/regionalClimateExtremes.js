// ---Climate Extremes ---

export function renderRegionalClimateExtremes(regions, decoded) {
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
    if (r.tectonicType === "divergent") {
      tags.push("Rift‑Valley Heat Basin");
      notes.push("Rift depressions trap heat and moisture, amplifying temperature swings.");
    }

    // ----------------------------------------------------
    // VOLCANIC THERMAL SURGES
    // ----------------------------------------------------
    if (r.tectonicType === "hotspot") {
      tags.push("Volcanic Thermal Surges");
      notes.push("Volcanic activity periodically releases heat, altering local climates.");
    }

    // ----------------------------------------------------
    // FAULT‑DRIVEN WIND SHEAR
    // ----------------------------------------------------
    if (r.tectonicType === "transform") {
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

