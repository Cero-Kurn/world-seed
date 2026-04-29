// modules/climate/renderBiomeTendencies.js
// ------------------------------------------------------------
// UI Renderer for Biome Tendencies
// ------------------------------------------------------------
//
// This reads the canonical BIOME_TENDENCIES table and produces
// a clean HTML panel showing how each biome shifts under:
//
//   • warming
//   • cooling
//   • drying
//   • wetting
//
// This file is intentionally separate from biomeTendencies.js,
// which contains ONLY data + logic (no UI).
//

import { BIOME_TENDENCIES } from "./biomeTendencies.js";

export function renderBiomeTendencies() {
  const container = document.getElementById("biomeTendencies");
  if (!container) return;

  container.innerHTML = `
    <div class="biome-tendencies-grid">
      ${Object.entries(BIOME_TENDENCIES).map(([biome, t]) => `
        <div class="biome-tendencies-card">
          <div class="bt-title">${biome}</div>

          <div class="bt-row">
            <span class="bt-label">Warms →</span>
            <span class="bt-value">${t.warmsTo}</span>
          </div>

          <div class="bt-row">
            <span class="bt-label">Cools →</span>
            <span class="bt-value">${t.coolsTo}</span>
          </div>

          <div class="bt-row">
            <span class="bt-label">Dries →</span>
            <span class="bt-value">${t.driesTo}</span>
          </div>

          <div class="bt-row">
            <span class="bt-label">Wets →</span>
            <span class="bt-value">${t.wetsTo}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}
