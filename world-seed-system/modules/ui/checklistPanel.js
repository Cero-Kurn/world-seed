// modules/ui/checklistPanel.js
import { simulateWorld } from "../world/worldSimulation.js";
import { exportWorld } from "../world/worldExport.js";

export function renderChecklistPanel() {

  const container = document.getElementById("checklistPanel");

  // --- MASTER CHECKLIST DATA (UPDATED STATUSES) ---
  const sections = [
    {
      title: "Map / Canvas / Hex Systems",
      items: [
        ["7‑region hex world", "complete"],
        ["Biome heatmap preview", "complete"],
        ["Break continent into 6–20 regions", "complete"],
        ["Canvas‑based hex renderer", "complete"],
        ["Elevation noise", "complete"],
        ["elevation variations", "complete"],
        ["Hex map generator", "complete"],
        ["Region adjacency smoothing", "complete"],
        ["Region generator", "complete"],
        ["add a canvas renderer", "partial"],
        ["canvas (used for maps, not shapes yet)", "partial"],
        ["Canvas drawing API", "partial"],
        ["canvas has responsive scaling, larger maps, dynamic resizing", "partial"],
        ["Canvas maps", "partial"],
        ["Canvas‑Based (drawing API)", "partial"],
        ["latitude‑based biome bands to the hex map", "partial"],
        ["Mountain Density Score", "partial"],
        ["Zoom / pan", "partial"],
        ["Animated transitions", "missing"]
        ["Click‑to‑select regions", "missing"],
        ["Coastline generator", "missing"],
        ["Continent shape generator", "missing"],
        ["map canvas that draws shapes based on the seed", "missing"],
        ["Map export (PNG/SVG)", "missing"],
        ["map linked version (regions highlight when hovered)", "missing"]
        ["Region hit‑testing", "missing"],
        ["Region hover highlighting", "missing"],
        ["Tooltips", "missing"],
      ]
    },
    {
      title: "Biomes & Ecology",
      items: [
        ["Biome assignment", "complete"],
        ["biome blending", "complete"],
        ["biome derives from climate", "complete"],
        ["Biome legend panel", "complete"],
        ["Biome roles", "complete"],
        ["Biome tendencies", "complete"],
        ["Biome transition smoothing", "complete"],
        ["biome variations (could be expanded)", "partial"],
        ["Bestiary generator", "missing"]
        ["Biome Driven Fauna & Flora Generator", "missing"],
        ["Biome gradient shading", "missing"],
        ["Biome Heatmap with more visual interest", "missing"],
        ["Biome icons", "missing"],
        ["Biome Linked Settlement Patterns", "missing"],
        ["Biome Linked Trade Goods", "missing"],
        ["biome specific features", "missing"],
        ["Biome‑Driven Culture Generator", "missing"],
        ["Biome‑linked settlement patterns", "missing"],
        ["Biome‑linked trade goods", "missing"],
        ["Biome‑specific features", "missing"],
        ["fauna + flora tables", "missing"]

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
        ["Full plate simulation", "missing"],
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
        ["Derived from elevation + moisture + latitude", "partial"],
        ["Derived from elevation + moisture + seed latitude", "partial"],
        ["Distance from coast", "missing"],
        ["Planetary Heat Budget", "missing"]
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
        ["special Feature variations", "partial"],
        ["Sub Features (Terrain Details)", "partial"],
        ["Sub‑features", "partial"],
        ["Landmark atlas panel", "missing"],
        ["Landmarks panel full of named places", "missing"],
["Named Landmark Generator", "missing"]
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
        ["Lore narrative engine", "partial"],
        ["Lore Scale Systems (Worldbook)", "partial"],
        ["Narrative hooks table", "partial"],
        ["Atlas entry generator", "missing"],
        ["Atlas panel", "missing"],
        ["Bestiary & Cultures", "missing"],
        ["Bestiary generator", "missing"],
        ["Cultural Archetype Generator", "missing"],
        ["Culture generator", "missing"],
        ["Full illustrated style writeups", "missing"],
        ["Magical anomaly creatures", "missing"],
        ["Myths", "missing"],
        ["Region based creatures", "missing"],
        ["World history timeline", "missing"],
        ["Worldbook export system", "missing"],
        ["Worldbook layout", "missing"],
      ]
    },
    {
      title: "UI / UX",
      items: [
        ["Collapsible sections", "complete"],
        ["Modular climate system", "complete"],
        ["Tabs or collapsible sections", "complete"],
        ["combined panels (climate + geology + history)", "partial"],
        ["Export summaries", "partial"],
        ["Local storage for world history", "partial"],
        ["Save/load seeds", "partial"],
        ["downloadable world summary", "missing"],
        ["full atlas UI", "missing"],
        ["Full dark‑mode theme", "missing"],
        ["Polished UI with tabs", "missing"]
      ]
    },
    {
      title: "Narrative & Summary Systems",
      items: [
        ["Auto writes a short world description", "complete"],
        ["Ties geology + climate + history into a single story", "complete"],
        ["World Summary Coding narrative engine", "partial"]
      ]
    },
    {
      title: "Seed UI & Interpretation",
      items: [
        ["Collapsible decoded seed UI", "missing"],
        ["Color‑coded seed components", "missing"]
        ["Seed interpretation panel", "missing"],
      ]
    },
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
    }
  ];

  // --- NEXT SUGGESTED FEATURE (UPDATED) ---
  let nextFeature = null;

  sections.forEach(section => {
    if (nextFeature) return;
    section.items.forEach(([label, status]) => {
      if (nextFeature) return;
      if (status === "missing" || status === "partial") {
        nextFeature = { label, status, section: section.title };
      }
    });
  });

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
  const html = sections.map((section, index) => {
    const itemsHTML = section.items.map(([label, status]) => `
      <div class="checklist-item">
        <span class="status-${status}">
          ${status === "complete" ? "✔" : status === "partial" ? "➕" : "✚"}
        </span>
        ${label}
      </div>
    `).join("");

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
  }).join("");

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
