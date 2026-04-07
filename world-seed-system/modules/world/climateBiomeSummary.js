export function generateClimateBiomeSummary(decoded) {
  const { lm, we, tr, hy } = decoded;

  // Short labels
  const climate = lm.primary.toLowerCase();
  const winds = we.primary.toLowerCase();
  const tectonics = tr.primary.toLowerCase();
  const water = hy.primary.toLowerCase();

  // Climate interpretation
  let climatePattern = "";
  if (lm.primary.includes("Earth")) climatePattern = "a familiar Earth-like temperature gradient";
  else if (lm.primary.includes("Hot")) climatePattern = "expanded tropical zones and reduced polar regions";
  else if (lm.primary.includes("Cold")) climatePattern = "expanded tundra and compressed temperate zones";
  else if (lm.primary.includes("Asymmetric")) climatePattern = "one hemisphere warmer than the other";
  else if (lm.primary.includes("Ice")) climatePattern = "glacial expansion and widespread cold biomes";
  else if (lm.primary.includes("Greenhouse")) climatePattern = "humid, warm conditions across most latitudes";
  else climatePattern = climate;

  // Wind interpretation
  let windPattern = "";
  if (we.primary.includes("West")) windPattern = "moisture carried from west to east";
  else if (we.primary.includes("East")) windPattern = "moisture carried from east to west";
  else if (we.primary.includes("North")) windPattern = "cold air pushed southward";
  else if (we.primary.includes("South")) windPattern = "warm air pushed northward";
  else if (we.primary.includes("Monsoon")) windPattern = "strong seasonal monsoon cycles";
  else windPattern = winds;

  // Biome tendencies
  let biomeTendencies = `
    <ul>
      <li><strong>Climate:</strong> ${climatePattern}</li>
      <li><strong>Wind & Moisture:</strong> ${windPattern}</li>
      <li><strong>Tectonic Influence:</strong> ${tectonics}</li>
      <li><strong>Hydrology:</strong> ${water}</li>
    </ul>
  `;

  // Narrative summary
  const narrative = `
    <p>
      The world’s climate is shaped by ${climatePattern}, with ${windPattern}.
      Tectonic activity (${tectonics}) influences rain shadows and highland biomes,
      while hydrology (${water}) determines the distribution of wetlands, rivers, and dry basins.
    </p>
  `;

  return biomeTendencies + narrative;
}
