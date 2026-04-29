// modules/ui/geologyNarrative.js
// ------------------------------------------------------------
// Geology Narrative Panel (Global + Structural + Regional)
// ------------------------------------------------------------

export function renderGeologyNarrative(regions) {
  const container = document.getElementById("geologyNarrative");

  // ------------------------------------------------------------
  // 1. GLOBAL GEOLOGY SUMMARY
  // ------------------------------------------------------------
  const tectonics = regions.map(r => r.tectonicType);
  const elevs = regions.map(r => r.elevationTier);

  // Count tectonic types
  const tectCount = {};
  tectonics.forEach(t => tectCount[t] = (tectCount[t] || 0) + 1);

  const dominantTect = Object.entries(tectCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "unknown";

  let globalTectonicSummary = "";
  switch (dominantTect) {
    case "convergent":
      globalTectonicSummary = "Convergent boundaries dominate the planet, uplifting major mountain chains and creating dramatic rain shadows.";
      break;
    case "divergent":
      globalTectonicSummary = "Divergent rift systems shape the crust, producing volcanic zones, heat anomalies, and young terrain.";
      break;
    case "transform":
      globalTectonicSummary = "Transform boundaries fracture the crust, generating rugged uplands and complex fault‑driven landscapes.";
      break;
    case "hotspot":
      globalTectonicSummary = "Hotspot volcanism is widespread, forming shield volcanoes, basaltic plains, and geothermal regions.";
      break;
    case "craton":
      globalTectonicSummary = "Ancient cratonic interiors dominate, producing stable, erosion‑worn landscapes with deep continental roots.";
      break;
    default:
      globalTectonicSummary = "The planet’s tectonic forces are varied, producing a wide range of geological environments.";
  }

  // Elevation distribution
  const high = elevs.filter(e => e === "high").length;
  const low = elevs.filter(e => e === "low").length;
  const mid = elevs.length - high - low;

  const globalElevationSummary = `
    The world’s elevation profile includes ${high} high‑elevation regions, ${mid} mid‑elevation regions, 
    and ${low} low‑elevation regions, shaping drainage patterns, climate boundaries, and biome transitions.
  `;

  const globalHTML = `
    <p>${globalTectonicSummary}</p>
    <p>${globalElevationSummary}</p>
  `;

  // ------------------------------------------------------------
  // 2. GLOBAL STRUCTURAL GEOLOGY (faults, uplift, rifts)
  // ------------------------------------------------------------
  let structuralSummary = "";

  if (dominantTect === "convergent") {
    structuralSummary = "Mountain‑building processes (orogeny) are widespread, with active subduction zones and strong crustal compression.";
  } else if (dominantTect === "divergent") {
    structuralSummary = "Rifting and crustal thinning produce volcanic ridges, grabens, and geothermal anomalies.";
  } else if (dominantTect === "transform") {
    structuralSummary = "Shear forces dominate, creating offset valleys, fault scarps, and fragmented terrain.";
  } else if (dominantTect === "hotspot") {
    structuralSummary = "Mantle plumes generate volcanic chains, basaltic plateaus, and geothermal fields.";
  } else if (dominantTect === "craton") {
    structuralSummary = "Stable continental shields anchor the crust, resisting deformation and preserving ancient rock layers.";
  } else {
    structuralSummary = "Geological structures vary widely, shaped by mixed tectonic influences.";
  }

  const structuralHTML = `<p>${structuralSummary}</p>`;

  // ------------------------------------------------------------
  // 3. PER‑REGION GEOLOGY PROFILES
  // ------------------------------------------------------------
  const regionProfiles = regions.map((r, i) => {
    const tect = r.tectonicType;
    const elev = r.elevationTier;
    const feats = r.specialFeatures || [];
    const lat = r.latitudeBand;

    let line1 = `Region ${i + 1} — ${tect} boundary, ${elev} elevation.`;
    let line2 = "";

    // Elevation effects
    if (elev === "high") {
      line2 += " High elevation suggests active uplift, mountain ranges, or volcanic plateaus.";
    } else if (elev === "low") {
      line2 += " Low elevation indicates basins, plains, or long‑term erosion surfaces.";
    } else {
      line2 += " Mid‑elevation terrain supports varied geological processes.";
    }

    // Tectonic effects
    switch (tect) {
      case "convergent":
        line2 += " Convergent forces create folding, thrust faults, and steep topography.";
        break;
      case "divergent":
        line2 += " Divergent forces produce rifts, volcanic ridges, and crustal thinning.";
        break;
      case "transform":
        line2 += " Transform motion generates shear zones, offset valleys, and fractured terrain.";
        break;
      case "hotspot":
        line2 += " Hotspot volcanism forms shield volcanoes, lava fields, and geothermal zones.";
        break;
      case "craton":
        line2 += " Cratonic stability preserves ancient bedrock and erosion‑worn landscapes.";
        break;
    }

    // Special features
    if (feats.length > 0) {
      line2 += ` Notable features include: ${feats.join(", ")}.`;
    }

    // Latitude influence (optional)
    if (lat === "tropical") {
      line2 += " Tropical weathering accelerates erosion and soil formation.";
    } else if (lat === "temperate") {
      line2 += " Temperate climates produce balanced erosion and sediment transport.";
    } else if (lat === "polar") {
      line2 += " Polar conditions promote freeze‑thaw fracturing and glacial sculpting.";
    }

    return `
      <div class="region-profile">
        <strong>${line1}</strong><br>
        ${line2.trim()}
      </div>
    `;
  }).join("");

  const regionalHTML = `
    <div class="regional-profiles">
      ${regionProfiles}
    </div>
  `;

  // ------------------------------------------------------------
  // BUILD COLLAPSIBLE UI (Option B)
  // ------------------------------------------------------------
  container.innerHTML = `
    <h3>⛰ Geology Narrative</h3>

    <div class="geo-section">
      <div class="geo-header" data-target="globalGeo">▶ Global Geology Summary</div>
      <div class="geo-content" id="globalGeo">${globalHTML}</div>
    </div>

    <div class="geo-section">
      <div class="geo-header" data-target="structuralGeo">▶ Global Structural Geology</div>
      <div class="geo-content" id="structuralGeo">${structuralHTML}</div>
    </div>

    <div class="geo-section">
      <div class="geo-header" data-target="regionalGeo">▶ Regional Geology Profiles</div>
      <div class="geo-content" id="regionalGeo">${regionalHTML}</div>
    </div>
  `;

  // Collapsible behavior
  document.querySelectorAll(".geo-header").forEach(header => {
    header.addEventListener("click", () => {
      const target = header.getAttribute("data-target");
      const content = document.getElementById(target);
      const isOpen = content.style.display === "block";

      content.style.display = isOpen ? "none" : "block";
      header.textContent = `${isOpen ? "▶" : "▼"} ${header.textContent.slice(2)}`;
    });
  });
}
