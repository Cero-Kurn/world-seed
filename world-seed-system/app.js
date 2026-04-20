// app.js
// ------------------------------------------------------------
// Handles seed input, worldTraits generation, and region rendering
// ------------------------------------------------------------

import { generateRegions } from "./modules/regions/regionGenerator.js";

// ------------------------------------------------------------
// 1. Convert seed into worldTraits (your existing logic)
// ------------------------------------------------------------
function processSeed(seed) {
  // Normalize seed
  seed = seed.trim();
  if (!seed) seed = "DEFAULT";

  // Your existing world trait logic stays the same
  // ------------------------------------------------
  // Example structure (yours may differ slightly):
  const worldTraits = {
    seed,
    we: { primary: "Jet Stream Instability", twist: "Monsoon Belt" },
    tr: { primary: "Coastal Range", twist: "High Plateau" },
    hy: { primary: "Seasonal Flash Floods", twist: "Dry Basin" },
    sf: { primary: "Crystal Caverns", twist: "Coral Archipelago" },
    nh: { primary: "Travelers whisper of strange lights at dusk." }
  };

  // Generate regions using the new 7‑region generator
  const regions = generateRegions(worldTraits);

  // Render them
  renderRegions(regions);
}

// ------------------------------------------------------------
// 2. Render region cards
// ------------------------------------------------------------
function renderRegions(regions) {
  const container = document.getElementById("regionSummary");

  container.innerHTML = regions.map(r => `
    <div class="card" style="background:#111; margin:0;">
      <div class="label">${r.name}</div>

      <p><strong>Tectonic Type:</strong> ${r.tectonic}</p>
      <p><strong>Elevation:</strong> ${r.elevation}</p>
      <p><strong>Moisture:</strong> ${r.moisture}</p>
      <p><strong>Climate Zone:</strong> ${r.climateZone}</p>
      <p><strong>Biome:</strong> ${r.biome}</p>

      <p><strong>Special Feature:</strong> ${r.specialFeature}</p>
      <p><strong>Narrative Hook:</strong> ${r.narrativeHook}</p>

      <p>${r.description}</p>
    </div>
  `).join("");
}

// ------------------------------------------------------------
// 3. Hook up the Generate button
// ------------------------------------------------------------
document.getElementById("generateBtn").addEventListener("click", () => {
  const seed = document.getElementById("seedInput").value;
  processSeed(seed);
});

// ------------------------------------------------------------
// 4. Optional: auto-generate on page load
// ------------------------------------------------------------
processSeed("DEFAULT");
