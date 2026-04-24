// ---REGIONAL DISASTERS
export function renderRegionalDisasters(regions, decoded) {
  const container = document.getElementById("regionalDisasters");

  const wind = decoded.we.primary.toLowerCase();

  function detectDisasters(r) {
    const events = [];
    const notes = [];

    // ----------------------------------------------------
    // EARTHQUAKES (Transform + Convergent)
    // ----------------------------------------------------
    if (r.tectonicType === "transform" || r.tectonicType === "convergent") {
      events.push("Earthquake Risk");
      notes.push("Active fault systems may produce occasional seismic activity.");
    }

    // ----------------------------------------------------
    // VOLCANIC ERUPTIONS (Hotspot + Convergent arcs)
    // ----------------------------------------------------
    if (r.tectonicType === "hotspot" || r.tectonicType === "convergent") {
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
    if (r.tectonicType === "divergent") {
      events.push("Rift Instability");
      notes.push("Rift zones may experience ground deformation or sudden shifts.");
    }

    // ----------------------------------------------------
    // ASHFALL SEASONS (Hotspot)
    // ----------------------------------------------------
    if (r.tectonicType === "hotspot") {
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
