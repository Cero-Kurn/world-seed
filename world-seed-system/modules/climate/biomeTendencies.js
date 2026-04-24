// --- Biome Tendencies
export function renderBiomeTendencies(regions) {
  const container = document.getElementById("biomeTendencies");

  const counts = regions.reduce((acc, r) => {
    acc[r.biome] = (acc[r.biome] || 0) + 1;
    return acc;
  }, {});

  const total = regions.length;

  const rows = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([biome, count]) => {
      const pct = ((count / total) * 100).toFixed(1);
      return `<div><strong>${biome}</strong>: ${pct}%</div>`;
    })
    .join("");

  container.innerHTML = `
    <h3>🌍 Biome Tendencies</h3>
    <p>This world leans toward the following biome distribution:</p>
    ${rows}
  `;
}

