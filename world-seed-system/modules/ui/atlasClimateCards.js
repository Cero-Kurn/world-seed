// modules/ui/atlasClimateCards.js
// ------------------------------------------------------------
// Atlas Region Climate Cards (Per-Region Climate + Geology)
// ------------------------------------------------------------

export function renderAtlasClimateCards(regions) {
  const container = document.getElementById("atlasClimateCards");

  // ------------------------------------------------------------
  // Build each region card
  // ------------------------------------------------------------
  const cardsHTML = regions.map((r, i) => {
    const biome = r.biome;
    const elev = r.elevation;
    const moist = r.moisture;
    const lat = r.latitudeBand;
    const tect = r.tectonicType;
    const feats = r.specialFeatures || [];

    // --- Climate summary ---
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

    // --- Geology summary ---
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

    // Special features
    let featureSummary = "";
    if (feats.length > 0) {
      featureSummary = `<p><strong>Special Features:</strong> ${feats.join(", ")}</p>`;
    }

    return `
      <div class="atlas-card">
        <div class="atlas-header" data-target="atlas-${i}">
          ▶ Region ${i + 1} — ${biome}
        </div>

        <div class="atlas-content" id="atlas-${i}">
          <p><strong>Biome:</strong> ${biome}</p>
          <p><strong>Elevation:</strong> ${elev}</p>
          <p><strong>Moisture:</strong> ${moist}</p>
          <p><strong>Latitude Band:</strong> ${lat}</p>
          <p><strong>Tectonic Type:</strong> ${tect}</p>

          <p><strong>Climate Summary:</strong> ${climateSummary.trim()}</p>
          <p><strong>Geology Summary:</strong> ${geologySummary.trim()}</p>

          ${featureSummary}
        </div>
      </div>
    `;
  }).join("");

  // ------------------------------------------------------------
  // Insert into container
  // ------------------------------------------------------------
  container.innerHTML = `
    <h3>🗺 Atlas — Regional Climate Cards</h3>
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
