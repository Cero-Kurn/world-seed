// modules/ui/climateNarrative.js
// ------------------------------------------------------------
// Climate Narrative Panel (Global + Tectonic + Regional)
// ------------------------------------------------------------

export function renderClimateNarrative(regions, decoded) {
  const container = document.getElementById("climateNarrative");

  // ------------------------------------------------------------
  // 1. GLOBAL CLIMATE NARRATIVE (seed-driven)
  // ------------------------------------------------------------
  const lat = decoded.lm.primary.toLowerCase();
  const wind = decoded.we.primary.toLowerCase();
  const hydro = decoded.hy.primary.toLowerCase();

  // --- Temperature tone ---
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

  // --- Wind behavior ---
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

  // --- Hydrology behavior ---
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

  const globalClimateHTML = `
    <p>${tone}</p>
    <p>${windEffect}</p>
    <p>${hydroEffect}</p>
  `;

  // ------------------------------------------------------------
  // 2. GLOBAL TECTONIC SUMMARY (region-driven)
  // ------------------------------------------------------------
  const counts = regions.reduce((acc, r) => {
    acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
    return acc;
  }, {});

  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "unknown";

  let tectonicSummary = "";
  switch (dominant) {
    case "convergent":
      tectonicSummary = "Convergent boundaries dominate the planet, producing dramatic mountain chains and strong rain shadows.";
      break;
    case "divergent":
      tectonicSummary = "Divergent rift systems shape the world, generating heat anomalies and localized storm formation.";
      break;
    case "transform":
      tectonicSummary = "Transform boundaries fracture the crust, creating patchy uplands and irregular airflow patterns.";
      break;
    case "hotspot":
      tectonicSummary = "Hotspot volcanism is widespread, producing geothermal microclimates and thermal updrafts.";
      break;
    case "craton":
      tectonicSummary = "Stable cratonic interiors dominate, giving the world long‑term climatic consistency.";
      break;
    default:
      tectonicSummary = "Tectonic forces shape the world in subtle, varied ways.";
  }

  const globalTectonicHTML = `<p>${tectonicSummary}</p>`;

  // ------------------------------------------------------------
  // 3. PER‑REGION CLIMATE PROFILES
  // ------------------------------------------------------------
  const regionProfiles = regions.map((r, i) => {
    const biome = r.biome;
    const elevRaw = r.elevation || "";
    const moistRaw = r.moisture || "";
    const latBand = r.latitudeBand;
    const tect = r.tectonicType;

    // Derive simple tiers from detailed strings
    const elev = /mountain|highland|plateau|upland/i.test(elevRaw) ? "high"
               : /lowland|basin|plain/i.test(elevRaw) ? "low"
               : "mid";

    const moist = /wet|humid/i.test(moistRaw) ? "wet"
                : /arid|semi-arid/i.test(moistRaw) ? "dry"
                : "normal";

    let line1 = `Region ${i + 1} — ${biome}.`;
    let line2 = "";

    // Elevation
    if (elev === "high") {
      line2 += " High elevation cools the climate and enhances orographic precipitation.";
    } else if (elev === "low") {
      line2 += " Low elevation promotes warmer temperatures and broader biome transitions.";
    }

    // Moisture
    if (moist === "wet") {
      line2 += " Moisture levels support lush vegetation and stable rainfall.";
    } else if (moist === "dry") {
      line2 += " Dry conditions limit rainfall and expand arid landscapes.";
    }

    // Latitude
    if (latBand === "tropical") {
      line2 += " Its tropical latitude ensures warm temperatures year‑round.";
    } else if (latBand === "temperate") {
      line2 += " Its temperate latitude produces seasonal variability.";
    } else if (latBand === "polar") {
      line2 += " Its polar latitude keeps temperatures low and seasons extreme.";
    } else if (latBand === "subtropical") {
      line2 += " Its subtropical latitude balances strong insolation with seasonal shifts.";
    } else if (latBand === "subpolar") {
      line2 += " Its subpolar latitude sits at the edge of persistent cold influence.";
    }

    // Tectonics
    switch (tect) {
      case "convergent":
        line2 += " Nearby convergent boundaries create strong rain shadows and uplift‑driven storms.";
        break;
      case "divergent":
        line2 += " Rift activity introduces heat anomalies and localized convection.";
        break;
      case "transform":
        line2 += " Transform faults disrupt airflow, producing microclimate pockets.";
        break;
      case "hotspot":
        line2 += " Hotspot volcanism generates geothermal influences on local weather.";
        break;
      case "craton":
        line2 += " Cratonic stability yields long‑term climatic consistency.";
        break;
    }

    return `
      <div class="region-profile">
        <strong>${line1}</strong>
        <br>${line2.trim()}
      </div>
    `;
  }).join("");

  const regionalHTML = `
    <div class="regional-profiles">
      ${regionProfiles}
    </div>
  `;

  // ------------------------------------------------------------
  // BUILD COLLAPSIBLE UI
  // ------------------------------------------------------------
  container.innerHTML = `
    <h3>🌡 Climate Narrative</h3>

    <div class="climate-section">
      <div class="climate-header" data-target="globalClimate">▶ Global Climate Narrative</div>
      <div class="climate-content" id="globalClimate">${globalClimateHTML}</div>
    </div>

    <div class="climate-section">
      <div class="climate-header" data-target="globalTectonics">▶ Global Tectonic Summary</div>
      <div class="climate-content" id="globalTectonics">${globalTectonicHTML}</div>
    </div>

    <div class="climate-section">
      <div class="climate-header" data-target="regionalProfiles">▶ Regional Climate Profiles</div>
      <div class="climate-content" id="regionalProfiles">${regionalHTML}</div>
    </div>
  `;

  // Collapsible behavior
  document.querySelectorAll(".climate-header").forEach(header => {
    header.addEventListener("click", () => {
      const target = header.getAttribute("data-target");
      const content = document.getElementById(target);
      const isOpen = content.style.display === "block";

      content.style.display = isOpen ? "none" : "block";
      header.textContent = `${isOpen ? "▶" : "▼"} ${header.textContent.slice(2)}`;
    });
  });
}
