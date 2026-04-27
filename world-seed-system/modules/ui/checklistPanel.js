// modules/ui/checklistPanel.js

export function renderChecklistPanel() {
  const container = document.getElementById("checklistPanel");

  // --- MASTER CHECKLIST DATA ---
  const sections = [
    {
      title: "Map / Canvas / Hex Systems",
      items: [
        ["7‑region hex world", "complete"],
        ["Biome heatmap preview", "complete"],
        ["Break the continent into 6–20 regions", "complete"]
        ["Canvas‑based hex renderer", "complete"],
        ["Hex map generator", "complete"],
        ["Region generator", "complete"],
        ["add a canvas renderer", "partial"],
        ["canvas (used for maps, not shapes yet)", "partial"],
        ["canvas has responsive scaling, larger maps, dynamic resizing", "partial"],
        ["Canvas maps (optional)", "partial"],
        ["Canvas‑Based (drawing API)", "partial"],
        ["Elevation noise", "partial"],
        ["elevation variations", "partial"],
        ["latitude‑based biome bands to the hex map", "partial"],
        ["Mountain Density Score", "partial"],
        ["Region adjacency smoothing", "partial"],
        ["Continent shape generator", "missing"]
        ["map canvas that draws shapes based on the seed", "missing"],
        ["Map export (PNG/SVG)", "missing"],
        ["map linked version (regions highlight when hovered)", "missing"],
     ]
    },
    {
      title: "Biomes & Ecology",
      items: [
        ["Biome assignment", "complete"],
        ["biome derives from climate", "complete"],
        ["Biome legend panel", "complete"],
        ["Biome roles", "complete"],
        ["Biome tendencies", "complete"],
        ["biome blending", "partial"],
        ["Biome transition smoothing", "partial"],
        ["biome variations (could be expanded)", "partial"],
        ["Bestiary generator", "missing"],
        ["Biome Driven Fauna & Flora Generator", "missing"],
        ["Biome Heatmap with more visual interest", "missing"]
        ["Biome Linked Settlement Patterns", "missing"],
        ["Biome Linked Trade Goods", "missing"],
        ["biome specific features", "missing"],
        ["Biome‑driven culture generator", "missing"]
        ["Biome‑Driven Culture Generator", "missing"],
        ["fauna + flora tables", "missing"],
      ]
    },
    {
      title: "Tectonics & Geology",
      items: [
        ["Geological narrative", "complete"],
        ["Tectonic assignment", "complete"],
        ["Tectonic belts", "complete"],
        ["Volcanic hazard rating", "complete"],
        ["Plate motion vectors", "partial"],
        ["Canyon systems", "missing"],
        ["elevation specific features", "missing"],
        ["Elevation tier refinement", "missing"],
        ["erosion + sediment deposition", "missing"],
        ["Full plate simulation", "missing"]
        ["Hydrology‑driven modifiers", "missing"],
        ["start on coastline generation", "missing"],
        ["Volcanic Province Generator", "missing"]
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
        ["Derived from elevation + moisture + seed latitude", "partial"],
        ["Distance from coast", "missing"],
        ["Planetary Heat Budget", "missing"]
      ]
    },
    {
      title: "Regions & Features",
      items: [
        ["Feature name variety", "partial"],
        ["Landform & feature generator", "partial"],
        ["Make regions more detailed", "partial"],
        ["Make regions more procedural", "partial"],
        ["Make regions more structured", "partial"],
        ["special Feature variations", "partial"],
        ["Sub Features (Terrain Details)", "partial"],
        ["Landmarks panel full of named places", "missing"]
        ["Named Landmark Generator", "missing"],
      ]
    },
    {
      title: "Culture, Lore & Worldbook",
      items: [
        ["Migration paths", "complete"],
        ["Regional history", "complete"],
        ["Trade routes", "complete"],
        ["World Formation Narrative", "complete"],
        ["Cultural or Narrative Seeds", "partial"],
        ["Lore Narrative Driven", "partial"],
        ["Lore Scale Systems (Worldbook)", "partial"],
        ["Narrative hooks table", "partial"],
        ["Bestiary & Cultures", "missing"],
        ["Bestiary generator", "missing"],
        ["Cultural Archetype Generator", "missing"],
        ["Culture generator", "missing"],
        ["Full illustrated style writeups", "missing"],
        ["Magical anomaly creatures", "missing"],
        ["Myths", "missing"],
        ["Region based creatures", "missing"],
        ["World history timeline", "missing"]
        ["Worldbook export", "missing"]
      ]
    },
    {
      title: "UI / UX",
      items: [
        ["Collapsible sections", "complete"],
        ["Modular climate system", "complete"],
        ["Tabs or collapsible sections", "complete"],
        ["combined panels (climate + geology + history)", "partial"],
        ["downloadable world summary", "missing"],
        ["Export summaries", "partial"],
        ["full atlas UI", "missing"],
        ["Local storage for world history", "partial"]
        ["polished UI with tabs", "missing"],
        ["Save/load seeds", "partial"],
        ["Tabbed interface", "missing"]
      ]
    },
    {
      title: "Narrative & Summary Systems",
      items: [
        ["Auto writes a short world description", "complete"],
        ["Ties geology + climate + history into a single story", "complete"],
        ["World Summary Coding narrative engine", "partial"]
      ]
    }
  ];

  // --- NEXT SUGGESTED FEATURE ---
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
    : `
      <div class="next-feature-box">
        <strong>All features complete!</strong>
      </div>
    `;

  // --- BUILD CHECKLIST HTML ---
  const html = sections.map((section, index) => `
    <div class="checklist-section">
      <div class="checklist-header" data-checklist="${index}">
        ▶ ${section.title}
      </div>
      <div class="checklist-content" id="checklist-${index}">
        ${section.items.map(([label, status]) => `
          <div class="checklist-item">
            <span class="status-${status}">
              ${status === "complete" ? "✔" : status === "partial" ? "➕" : "✚"}
            </span>
            ${label}
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <h3>📋 Project Checklist</h3>
    ${suggestionHTML}
    ${html}
  `;

  // --- COLLAPSIBLE BEHAVIOR ---
  document.querySelectorAll(".checklist-header").forEach(header => {
    header.addEventListener("click", () => {
      const index = header.getAttribute("data-checklist");
      const content = document.getElementById(`checklist-${index}`);
      const isOpen = content.style.display === "block";

      content.style.display = isOpen ? "none" : "block";
      header.textContent = `${isOpen ? "▶" : "▼"} ${sections[index].title}`;
    });
  });
}
