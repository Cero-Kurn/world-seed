// --- Regional Weather
export function renderRegionalWeather(regions, decoded) {
  const container = document.getElementById("regionalWeather");
  const wind = decoded.we.primary.toLowerCase();

  function detectWeather(r) {
    const events = [];
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

    // ----------------------------------------------------
    // SUPER‑STORMS & CYCLONES
    // ----------------------------------------------------
    if (wind.includes("storm") || wind.includes("cyclone") || wind.includes("hurricane")) {
      if (moist === "wet") {
        events.push("Super‑Storms");
        notes.push("Moist air and unstable winds fuel powerful rotating storm systems.");
      }
    }

    // ----------------------------------------------------
    // MONSOON SURGES
    // ----------------------------------------------------
    if (wind.includes("monsoon") && lat === "tropical") {
      events.push("Monsoon Surges");
      notes.push("Seasonal wind reversals bring intense rainfall and flooding.");
    }

    // ----------------------------------------------------
    // BLIZZARDS
    // ----------------------------------------------------
    if (lat === "polar" || (lat === "temperate" && elev === "high")) {
      events.push("Blizzards");
      notes.push("Cold air masses and elevation combine to produce severe snowstorms.");
    }

    // ----------------------------------------------------
    // HEAT WAVES
    // ----------------------------------------------------
    if (moist === "dry" && (lat === "subtropical" || lat === "tropical")) {
      events.push("Heat Waves");
      notes.push("High pressure and dry air create prolonged periods of extreme heat.");
    }

    // ----------------------------------------------------
    // COLD SNAPS
    // ----------------------------------------------------
    if (lat === "temperate" && r.hemisphere === "Northern") {
      events.push("Cold Snaps");
      notes.push("Polar air occasionally plunges southward, causing sudden freezes.");
    }

    // ----------------------------------------------------
    // FOG SEASONS
    // ----------------------------------------------------
    if (moist === "normal" && elev === "low") {
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
