// modules/ui/atlasFullCards.js
// ------------------------------------------------------------
// Atlas Region Full Cards (Climate + Geology + Biome + Features)
// ------------------------------------------------------------

export function renderAtlasFullCards(regions) {
  const container = document.getElementById("atlasFullCards");

  // ------------------------------------------------------------
  // Build each region card
  // ------------------------------------------------------------
  const cardsHTML = regions.map((r, i) => {
    const name = r.name || `Region ${i + 1}`;
    const biome = r.biome;
    const elev = r.elevationTier;
    const moist = r.moistureLevel;
    const lat = r.latitudeBand;
    const tect = r.tectonicType;
    const feats = r.specialFeatures || [];

    // ------------------------------------------------------------
    // Climate Summary
    // ------------------------------------------------------------
    let climateSummary = "";

    // Latitude
    if (lat === "tropical") {
      climateSummary += "Warm tropical climate with strong solar heating. ";
    } else if (lat === "temperate") {
      climateSummary += "Moderate temperate climate with seasonal variation. ";
    } else if (lat === "polar") {
      climateSummary += "Cold polar climate with extreme seasonal light cycles. ";
    }

    // Moisture
    if (moist === "wet") {
      climateSummary += "High moisture supports lush vegetation and stable rainfall. ";
    } else if (moist === "dry") {
      climateSummary += "Low moisture expands arid landscapes and limits vegetation. ";
    }

    // Elevation
    if (elev === "high") {
      climateSummary += "High elevation cools temperatures and enhances orographic precipitation. ";
    } else if (elev === "low") {
      climateSummary += "Low elevation promotes warmer temperatures and sediment accumulation. ";
    }

    // ------------------------------------------------------------
    // Geology Summary
    // ------------------------------------------------------------
    let geologySummary = "";

    switch (tect) {
      case "convergent":
        geologySummary += "Convergent uplift forms mountains, steep terrain, and strong rain shadows. ";
        break;
      case "divergent":
        geologySummary += "Divergent rifting produces volcanic ridges and geothermal anomalies. ";
        break;
      case "transform":
        geologySummary += "Transform shear zones fracture the terrain and create offset valleys. ";
        break;
      case "hotspot":
        geologySummary += "Hotspot volcanism forms shield volcanoes and geothermal fields. ";
        break;
      case "craton":
        geologySummary += "Stable cratonic interiors preserve ancient, erosion‑worn landscapes. ";
        break;
    }

    // ------------------------------------------------------------
    // Biome Summary
    // ------------------------------------------------------------
    let biomeSummary = "";

    if (biome.includes("forest")) {
      biomeSummary = "Forested landscapes support diverse flora and fauna, shaped by steady moisture and moderate temperatures.";
    } else if (biome.includes("desert")) {
      biomeSummary = "Arid desert terrain with sparse vegetation and extreme temperature swings.";
    } else if (biome.includes("tundra")) {
      biomeSummary = "Cold tundra with limited vegetation, shaped by permafrost and short growing seasons.";
    } else if (biome.includes("grassland")) {
      biomeSummary = "Open grasslands shaped by seasonal rainfall and wide temperature ranges.";
    } else if (biome.includes("jungle") || biome.includes("rainforest")) {
      biomeSummary = "Dense tropical rainforest with high biodiversity and year‑round rainfall.";
    } else {
      biomeSummary = "This biome supports a unique ecological balance shaped by local climate and terrain.";
    }

    // ------------------------------------------------------------
    // Special Features
    // ------------------------------------------------------------
    let featureSummary = "";
    if (feats.length > 0) {
      featureSummary = `
        <p><strong>Special Features:</strong> ${feats.join(", ")}</p>
      `;
    }

    // ------------------------------------------------------------
    // Procedural Flavor Text (micro‑narrative)
    // ------------------------------------------------------------
    let flavor = `${name} is shaped by its ${biome.toLowerCase()} biome and ${tect} tectonic setting. `;
    flavor += `The region’s ${moist} moisture levels and ${elev} elevation create `;
    flavor += lat === "tropical"
      ? "a warm, vibrant environment with strong ecological productivity."
      : lat === "temperate"
      ? "a balanced seasonal rhythm that supports diverse habitats."
      : lat === "polar"
      ? "a harsh, cold environment where life adapts to extreme conditions."
      : "a distinctive climate shaped by its latitude.";

    return `
      <div class="atlas-card">
        <div class="atlas-header" data-target="full-${i}">
          ▶ ${name} — ${biome}
        </div>

        <div class="atlas-content" id="full-${i}">
          <p><strong>Biome:</strong> ${biome}</p>
          <p><strong>Elevation:</strong> ${elev}</p>
          <p><strong>Moisture:</strong> ${moist}</p>
          <p><strong>Latitude Band:</strong> ${lat}</p>
          <p><strong>Tectonic Type:</strong> ${tect}</p>

          <p><strong>Climate Summary:</strong> ${climateSummary.trim()}</p>
          <p><strong>Geology Summary:</strong> ${geologySummary.trim()}</p>
          <p><strong>Biome Summary:</strong> ${biomeSummary}</p>

          ${featureSummary}

          <p><strong>Flavor Text:</strong> ${flavor}</p>
        </div>
      </div>
    `;
  }).join("");

  // ------------------------------------------------------------
  // Insert into container
  // ------------------------------------------------------------
  container.innerHTML = `
    <h3>🗺 Atlas — Full Region Cards</h3>
    ${cardsHTML}
  `;

  // ------------------------------------------------------------
  // Collapsible behavior
  // ------------------------------------------------------------
  document.querySelectorAll(".atlas-header").forEach(header => {
    header.addEventListener("click", () => {
      const target = header.getAttribute("data-target");
      const content = document.getElementById(target);
      const isOpen = content.style.display === "block";

      content.style.display = isOpen ? "none" : "block";
      header.textContent = `${isOpen ? "▶" : "▼"} ${header.textContent.slice(2)}`;
    });
  });
}
