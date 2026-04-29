// modules/ui/worldSummary.js
// ------------------------------------------------------------
// World Summary Panel (Global + Interactions + Regional Highlights)
// ------------------------------------------------------------

export function renderWorldSummary(regions, decoded) {
  const container = document.getElementById("worldSummary");

  // ------------------------------------------------------------
  // 1. GLOBAL WORLD SUMMARY (climate + geology + culture seeds)
  // ------------------------------------------------------------

  // Climate tone
  const lat = decoded.lm.primary.toLowerCase();
  let climateTone = "";
  if (lat.includes("hot") || lat.includes("greenhouse")) {
    climateTone = "The world is broadly warm, with expanded tropical zones and strong atmospheric circulation.";
  } else if (lat.includes("cold") || lat.includes("ice")) {
    climateTone = "The world is predominantly cold, shaped by polar influence and compressed temperate belts.";
  } else if (lat.includes("chaotic") || lat.includes("magical")) {
    climateTone = "The world’s climate is unstable, with unpredictable temperature gradients and volatile weather.";
  } else {
    climateTone = "The world follows an Earth‑like temperature gradient with familiar climatic belts.";
  }

  // Geology tone (dominant tectonic type)
  const tectonics = regions.map(r => r.tectonicType);
  const tectCount = {};
  tectonics.forEach(t => tectCount[t] = (tectCount[t] || 0) + 1);
  const dominantTect = Object.entries(tectCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "unknown";

  let geologyTone = "";
  switch (dominantTect) {
    case "convergent":
      geologyTone = "Convergent boundaries dominate the crust, producing major mountain chains and dramatic uplift.";
      break;
    case "divergent":
      geologyTone = "Divergent rifts shape the crust, generating volcanic ridges and geothermal anomalies.";
      break;
    case "transform":
      geologyTone = "Transform faults fracture the crust, creating rugged uplands and offset valleys.";
      break;
    case "hotspot":
      geologyTone = "Hotspot volcanism is widespread, forming volcanic chains and geothermal fields.";
      break;
    case "craton":
      geologyTone = "Ancient cratons anchor the continents, producing stable, erosion‑worn interiors.";
      break;
    default:
      geologyTone = "Geological forces vary widely across the world.";
  }

  // Cultural / historical seeds
  const cultureSeed = decoded.cu?.primary || "diverse cultural origins";
  const historySeed = decoded.hs?.primary || "ancient migrations and shifting borders";

  const globalHTML = `
    <p><strong>Climate:</strong> ${climateTone}</p>
    <p><strong>Geology:</strong> ${geologyTone}</p>
    <p><strong>History:</strong> The world’s history is shaped by ${historySeed.toLowerCase()}.</p>
    <p><strong>Culture:</strong> Cultural development reflects ${cultureSeed.toLowerCase()}.</p>
  `;

  // ------------------------------------------------------------
  // 2. CLIMATE + GEOLOGY INTERACTIONS (planet-scale synthesis)
  // ------------------------------------------------------------

  // Biome distribution
  const biomeCount = {};
  regions.forEach(r => biomeCount[r.biome] = (biomeCount[r.biome] || 0) + 1);

  const biomeList = Object.entries(biomeCount)
    .map(([b, n]) => `${b} (${n})`)
    .join(", ");

  // Moisture + elevation interactions
  const moist = regions.map(r => r.moistureLevel);
  const wet = moist.filter(m => m === "wet").length;
  const dry = moist.filter(m => m === "dry").length;

  const elev = regions.map(r => r.elevationTier);
  const high = elev.filter(e => e === "high").length;
  const low = elev.filter(e => e === "low").length;

  const interactionHTML = `
    <p>The world contains the following biome distribution: ${biomeList}.</p>
    <p>Moisture patterns include ${wet} wet regions and ${dry} dry regions, shaping river systems and desert belts.</p>
    <p>Elevation varies across ${high} high‑elevation regions and ${low} low‑elevation basins, influencing climate boundaries and erosion.</p>
    <p>Tectonic forces and climate interact to produce unique regional environments, from rain‑shadow deserts to volcanic highlands.</p>
  `;

  // ------------------------------------------------------------
  // 3. REGIONAL HIGHLIGHTS (1–2 sentence summaries)
  // ------------------------------------------------------------
  const regionSummaries = regions.map((r, i) => {
    const biome = r.biome;
    const elev = r.elevationTier;
    const moist = r.moistureLevel;
    const tect = r.tectonicType;

    let summary = `Region ${i + 1} — ${biome}. `;

    // Elevation
    if (elev === "high") summary += "High elevation cools the climate and enhances orographic effects. ";
    else if (elev === "low") summary += "Low elevation promotes warmer temperatures and sediment accumulation. ";

    // Moisture
    if (moist === "wet") summary += "Moist conditions support lush vegetation and stable rainfall. ";
    else if (moist === "dry") summary += "Dry conditions expand arid landscapes and limit vegetation. ";

    // Tectonics
    switch (tect) {
      case "convergent":
        summary += "Convergent uplift shapes dramatic terrain and strong rain shadows.";
        break;
      case "divergent":
        summary += "Divergent rifting introduces volcanic activity and geothermal anomalies.";
        break;
      case "transform":
        summary += "Transform shear zones fracture the terrain and disrupt airflow.";
        break;
      case "hotspot":
        summary += "Hotspot volcanism produces geothermal microclimates.";
        break;
      case "craton":
        summary += "Cratonic stability yields ancient, erosion‑worn landscapes.";
        break;
    }

    return `<div class="region-summary">${summary}</div>`;
  }).join("");

  const regionalHTML = `
    <div class="regional-highlights">
      ${regionSummaries}
    </div>
  `;

  // ------------------------------------------------------------
  // BUILD COLLAPSIBLE UI (Option B)
  // ------------------------------------------------------------
  container.innerHTML = `
    <h3>🌍 World Summary</h3>

    <div class="ws-section">
      <div class="ws-header" data-target="wsGlobal">▶ Global World Summary</div>
      <div class="ws-content" id="wsGlobal">${globalHTML}</div>
    </div>

    <div class="ws-section">
      <div class="ws-header" data-target="wsInteractions">▶ Climate + Geology Interactions</div>
      <div class="ws-content" id="wsInteractions">${interactionHTML}</div>
    </div>

    <div class="ws-section">
      <div class="ws-header" data-target="wsRegional">▶ Regional Highlights</div>
      <div class="ws-content" id="wsRegional">${regionalHTML}</div>
    </div>
  `;

  // Collapsible behavior
  document.querySelectorAll(".ws-header").forEach(header => {
    header.addEventListener("click", () => {
      const target = header.getAttribute("data-target");
      const content = document.getElementById(target);
      const isOpen = content.style.display === "block";

      content.style.display = isOpen ? "none" : "block";
      header.textContent = `${isOpen ? "▶" : "▼"} ${header.textContent.slice(2)}`;
    });
  });
}
