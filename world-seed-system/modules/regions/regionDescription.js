// regionDescription.js

export function buildRegionDescription(region) {
  const {
    name,
    biome,
    elevation,
    elevationTier,
    moisture,
    feature,
    role
  } = region;

  return `
    ${name} lies within the ${elevationTier}, functioning as a ${role} in the wider world.
    It is a ${elevation} region with ${moisture} conditions.
    The dominant biome is ${biome}, and the area is known for ${feature}.
  `.trim();
}
