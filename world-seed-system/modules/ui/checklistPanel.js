// modules/ui/checklistPanel.js

export function renderChecklistPanel() {
  const container = document.getElementById("checklistPanel");

  const sections = [
    {
      title: "Map / Hex / Canvas Systems",
      items: [
        ["7‑region hex world", "complete"],
        ["Hex map generator", "complete"],
        ["Canvas‑based hex renderer", "complete"],
        ["Biome heatmap preview", "complete"],
        ["Region generator", "complete"],
        ["Region adjacency smoothing", "partial"],
        ["Latitude‑based biome bands", "partial"],
        ["Elevation noise", "partial"],
        ["Map export (PNG/SVG)", "missing"],
        ["Continent shape generator", "missing"]
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
        ["Full plate simulation", "missing"]
      ]
    },
    {
      title: "Climate Systems",
      items: [
        ["Climate anomalies", "complete"],
        ["Micro‑climates", "complete"],
        ["Seasonal variability", "complete"],
        ["Global ocean currents", "complete"],
        ["Climate‑aware biome chains", "partial"],
        ["Planetary heat budget", "missing"]
      ]
    },
    {
      title: "Biomes & Ecology",
      items: [
        ["Biome assignment", "complete"],
        ["Biome legend panel", "complete"],
        ["Biome tendencies", "complete"],
        ["Biome roles", "complete"],
        ["Biome transition smoothing", "partial"],
        ["Bestiary generator", "missing"],
        ["Biome‑driven culture generator", "missing"]
      ]
    },
    {
      title: "Culture, History & Lore",
      items: [
        ["Regional history", "complete"],
        ["Trade routes", "complete"],
        ["Migration paths", "complete"],
        ["World Formation Narrative", "complete"],
        ["Narrative hooks table", "partial"],
        ["Culture generator", "missing"],
        ["World history timeline", "missing"]
      ]
    },
    {
      title: "UI / UX",
      items: [
        ["Collapsible sections", "complete"],
        ["Modular climate system", "complete"],
        ["Save/load seeds", "partial"],
        ["Export summaries", "partial"],
        ["Tabbed interface", "missing"]
      ]
    }
  ];

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
    ${html}
  `;

  // Collapsible behavior
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
