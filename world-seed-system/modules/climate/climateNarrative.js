// --- CLIMATE NARRATIVE ---
export function renderClimateNarrative(regions, decoded) {
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
  const tectonic = regions[0]?.tectonicType || "unknown";
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
    default:
      tectonicEffect = "Tectonic forces shape regional climates in subtle, varied ways.";
  }

  container.innerHTML = `
    <h3>🌡 Climate Narrative</h3>
    <p>${tone}</p>
    <p>${windEffect}</p>
    <p>${hydroEffect}</p>
    <p>${tectonicEffect}</p>
  `;
}
