// modules/ui/checklistPanel.js
// ------------------------------------------------------------
// Project Checklist Panel (Canonical, Normalized, Deduped)
// ------------------------------------------------------------

export function renderChecklistPanel() {
  const container = document.getElementById("checklistPanel");

  // ------------------------------------------------------------
  // MASTER CHECKLIST (CANONICAL STRUCTURE)
  // ------------------------------------------------------------
  const sections = [
    {
      title: "World Engine Core",
      items: [
        ["Fully aligned world engine bundle", "partial"],
        ["Unified world‑engine bundle", "partial"],
        ["Deterministic RNG for stable but richer patterns", "missing"],
        ["Procedural rifts, arcs, hotspots, cratons", "missing"],
        ["Realistic tectonic type generator", "missing"],
        ["Tectonics tied to latitude, climate, randomness", "missing"]
      ]
    },

    {
      title: "Seed UI & Interpretation",
      items: [
        ["Seed interpretation panel", "missing"],
        ["Collapsible decoded seed UI", "missing"],
        ["Color‑coded seed components", "missing"]
      ]
    },

    {
      title: "Map / Canvas / Hex Systems",
      items: [
        ["7‑region hex world", "complete"],
        ["Break continent into 6–20 regions", "complete"],
        ["Canvas‑based hex renderer", "complete"],
        ["Hex map generator", "complete"],
        ["Biome heatmap preview", "complete"],
        ["Region generator", "complete"],
        ["Elevation noise", "complete"],
        ["Elevation variations", "complete"],
        ["Region adjacency smoothing", "complete"],
        ["Canvas responsive scaling", "partial"],
        ["Canvas maps", "partial"],
        ["Canvas drawing API", "partial"],
        ["Latitude‑based biome bands", "partial"],
        ["Mountain Density Score", "partial"],
        ["Zoom / pan", "partial"],
        ["Animated transitions", "missing"],
        ["Click‑to‑select regions", "missing"],
        ["Region hit‑testing", "missing"],
        ["Region hover highlighting", "missing"],
        ["Tooltips", "missing"],
        ["Coastline generator", "missing"],
        ["Continent shape generator", "missing"],
        ["Map export (PNG/SVG)", "missing"]
      ]
    },

    {
      title: "Biomes & Ecology",
      items: [
        ["Biome assignment", "complete"],
        ["Biome derives from climate", "complete"],
        ["Biome legend panel", "complete"],
        ["Biome roles", "complete"],
        ["Biome tendencies", "complete"],
        ["Biome blending", "complete"],
        ["Biome transition smoothing", "complete"],
        ["Biome variations", "partial"],
        ["Biome gradient shading", "missing"],
        ["Biome icons", "missing"],
        ["Biome‑linked settlement patterns", "missing"],
        ["Biome‑linked trade goods", "missing"],
        ["Biome‑specific features", "missing"],
        ["Fauna + flora tables", "missing"],
        ["Bestiary generator", "missing"]
      ]
    },

    {
      title: "Tectonics & Geology",
      items: [
        ["Tectonic assignment", "complete"],
        ["Tectonic belts", "complete"],
        ["Volcanic hazard rating", "complete"],
        ["Geological narrative", "complete"],
        ["Plate motion vectors", "partial"],
        ["Elevation tier refinement", "missing"],
        ["Canyon systems", "missing"],
        ["Erosion + sediment deposition", "missing"],
        ["Full plate simulation", "missing"],
        ["Hydrology‑driven modifiers", "missing"],
        ["Volcanic province generator", "missing"]
      ]
    },

    {
      title: "Climate Systems",
      items: [
        ["Climate & biome summary generator", "complete"],
        ["Climate anomalies", "complete"],
        ["Global ocean currents", "complete"],
        ["Micro‑climates", "complete"],
        ["Seasonal variability", "complete"],
        ["Climate‑aware biome chains", "partial"],
        ["Derived from elevation + moisture + latitude", "partial"],
        ["Distance from coast", "missing"],
        ["Planetary heat budget", "missing"]
      ]
    },

    {
      title: "Regions & Features",
      items: [
        ["Feature name variety", "complete"],
        ["Landform & feature generator", "complete"],
        ["Make regions more detailed", "partial"],
        ["Make regions more procedural", "partial"],
        ["Make regions more structured", "partial"],
        ["Special feature variations", "partial"],
        ["Sub‑features (terrain details)", "partial"],
        ["Landmark atlas panel", "missing"],
        ["Named landmark generator", "missing"]
      ]
    },

    {
      title: "Culture, Lore & Worldbook",
      items: [
        ["Migration paths", "complete"],
        ["Regional history", "complete"],
        ["Trade routes", "complete"],
        ["World formation narrative", "complete"],
        ["Cultural or narrative seeds", "partial"],
        ["Lore narrative engine", "partial"],
        ["Lore scale systems (worldbook)", "partial"],
        ["Narrative hooks table", "partial"],
        ["Atlas panel", "missing"],
        ["Atlas entry generator", "missing"],
        ["Worldbook layout", "missing"],
        ["Worldbook export system", "missing"],
        ["Culture generator", "missing"],
        ["Cultural archetype generator", "missing"],
        ["Magical anomaly creatures", "missing"],
        ["Myths", "missing"],
        ["Region‑based creatures", "missing"]
      ]
    },

    {
      title: "UI / UX",
      items: [
        ["Collapsible sections", "complete"],
        ["Modular climate system", "complete"],
        ["Tabs or collapsible sections", "complete"],
        ["Combined panels (climate + geology + history)", "partial"],
        ["Export summaries", "partial"],
        ["Local storage for world history", "partial"],
        ["Save/load seeds", "partial"],
        ["Full dark‑mode theme", "missing"],
        ["Tabbed interface (full UI)", "missing"],
        ["Polished UI with tabs", "missing"]
      ]
    }
  ];

  // ------------------------------------------------------------
  // NEXT SUGGESTED FEATURE
  // ------------------------------------------------------------
  let nextFeature = null;

  for (const section of sections) {
    for (const [label, status] of section.items) {
      if (status === "missing" || status === "partial") {
        nextFeature = { label, status, section: section.title };
        break;
      }
    }
    if (nextFeature) break;
  }

  const suggestionHTML = nextFeature
    ? `
      <div class="next-feature-box">
        <strong>Next Suggested Feature:</strong><br>
        <span class="status-${nextFeature.status}">
          ${nextFeature.status === "partial" ? "➕" : "✚"}
        </span>
        ${nextFeature.label}
        <div class="next-feature-section">(${nextFeature.section})</div>
      </div>
    `
    : `<div class="next-feature-box"><strong>All features complete!</strong></div>`;

  // ------------------------------------------------------------
  // BUILD CHECKLIST HTML
  // ------------------------------------------------------------
  const html = sections
    .map((section, index) => {
      const itemsHTML = section.items
        .map(
          ([label, status]) => `
        <div class="checklist-item">
          <span class="status-${status}">
            ${status === "complete" ? "✔" : status === "partial" ? "➕" : "✚"}
          </span>
          ${label}
        </div>
      `
        )
        .join("");

      return `
      <div class="checklist-section">
        <div class="checklist-header" data-checklist="${index}">
          ▶ ${section.title}
        </div>
        <div class="checklist-content" id="checklist-${index}">
          ${itemsHTML}
        </div>
      </div>
    `;
    })
    .join("");

  container.innerHTML = `
    <h3>📋 Project Checklist</h3>
    ${suggestionHTML}
    ${html}
  `;

  // ------------------------------------------------------------
  // COLLAPSIBLE BEHAVIOR
  // ------------------------------------------------------------
  document.querySelectorAll(".checklist-header").forEach((header) => {
    header.addEventListener("click", () => {
      const index = header.getAttribute("data-checklist");
      const content = document.getElementById(`checklist-${index}`);
      const isOpen = content.style.display === "block";

      content.style.display = isOpen ? "none" : "block";
      header.textContent = `${isOpen ? "▶" : "▼"} ${sections[index].title}`;
    });
  });
}
