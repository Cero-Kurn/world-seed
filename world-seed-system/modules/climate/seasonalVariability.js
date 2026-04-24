export function renderSeasonalVariability(regions, decoded) { ... }
// --- Seasonal Variability
function renderSeasonalVariability(regions, decoded) {
  const container = document.getElementById("seasonalVariability");

  const wind = decoded.we.primary.toLowerCase();
  const latModel = decoded.lm.primary.toLowerCase();

  function detectSeasonality(r) {
    const tags = [];
    const notes = [];

    // ----------------------------------------------------
    // TEMPERATURE SWINGS
    // ----------------------------------------------------
    if (r.latitudeBand === "Temperate") {
      tags.push("Strong Temperature Seasons");
      notes.push("Warm summers and cold winters create pronounced seasonal cycles.");
    } else if (r.latitudeBand === "Subtropical") {
      tags.push("Moderate Temperature Seasons");
      notes.push("Seasonal shifts are noticeable but less extreme.");
    } else if (r.latitudeBand === "Tropical") {
      tags.push("Weak Temperature Seasons");
      notes.push("Temperatures remain relatively stable year‑round.");
    } else if (r.latitudeBand === "Polar") {
      tags.push("Extreme Temperature Seasons");
      notes.push("Long winters and short summers dominate the climate.");
    }

    // ----------------------------------------------------
    // RAINFALL SEASONALITY
    // ----------------------------------------------------
    if (wind.includes("monsoon")) {
      tags.push("Monsoon Rainfall Cycle");
      notes.push("Rainfall peaks during monsoon season and drops sharply afterward.");
    } else if (r.moisture === "Wet") {
      tags.push("Seasonal Rainfall Peaks");
      notes.push("Rainfall increases during warm seasons due to atmospheric convection.");
    } else if (r.moisture === "Dry") {
      tags.push("Dry Season Dominance");
      notes.push("Rainfall is scarce except during rare seasonal storms.");
    }

    // ----------------------------------------------------
    // STORM SEASONALITY
    // ----------------------------------------------------
    if (wind.includes("storm") || wind.includes("cyclone") || wind.includes("hurricane")) {
      tags.push("Storm Season");
      notes.push("Storm frequency increases during warm ocean periods.");
    }

    // ----------------------------------------------------
    // WINTER SEVERITY
    // ----------------------------------------------------
    if (r.latitudeBand === "Temperate" || r.latitudeBand === "Polar") {
      if (r.elevation.includes("High")) {
        tags.push("Harsh Winters");
        notes.push("Elevation amplifies cold‑season severity.");
      } else {
        tags.push("Cold Winters");
        notes.push("Winter temperatures drop significantly.");
      }
    }

    // ----------------------------------------------------
    // SUMMER INTENSITY
    // ----------------------------------------------------
    if (r.latitudeBand === "Subtropical" || r.latitudeBand === "Tropical") {
      if (r.moisture === "Dry") {
        tags.push("Hot, Dry Summers");
        notes.push("High pressure and low moisture create intense summer heat.");
      } else {
        tags.push("Humid Summers");
        notes.push("Warm temperatures combine with high humidity.");
      }
    }

    // ----------------------------------------------------
    // TECTONIC SEASONAL EFFECTS
    // ----------------------------------------------------
    if (r.tectonicType === "HOTSPOT") {
      tags.push("Geothermal Winter Moderation");
      notes.push("Volcanic heat can soften winter cold in nearby areas.");
    }

    if (r.tectonicType === "CONVERGENT") {
      tags.push("Orographic Seasonal Contrast");
      notes.push("Mountains create strong differences between windward and leeward seasons.");
    }

    return { tags, notes };
  }

  const entries = regions.map(r => {
    const s = detectSeasonality(r);

    const tagStr = s.tags.length > 0
      ? s.tags.map(t => `<strong>${t}</strong>`).join(", ")
      : "None";

    const noteStr = s.notes.length > 0
      ? s.notes.join(" ")
      : "No major seasonal variation.";

    return `
      <div class="sv-entry">
        <div><strong>${r.name}</strong></div>
        <div>Seasonal Patterns: ${tagStr}</div>
        <div>${noteStr}</div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <h3>🌤 Seasonal Climate Variability Index</h3>
    ${entries}
  `;
}

