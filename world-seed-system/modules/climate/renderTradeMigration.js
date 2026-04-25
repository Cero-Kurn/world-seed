export function renderTradeMigration(data) {
  const container = document.getElementById("tradeMigration");

  const entries = data.map(d => `
    <div class="tm-entry">
      <strong>${d.region}</strong><br>
      <em>Trade Routes:</em> ${d.tradeRoutes.join(", ") || "None"}<br>
      <em>Migration Paths:</em> ${d.migrationPaths.join(", ") || "None"}<br>
      <em>Connected To:</em> ${d.neighbors.join(", ")}
    </div>
  `).join("");

  container.innerHTML = `
    <h3>🧭 Trade Routes & Migration Paths</h3>
    ${entries}
  `;
}
