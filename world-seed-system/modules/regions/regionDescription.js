// regionDescription.js

export function buildRegionDescription(region) {
  const {
    name,
    latitudeBand,
    biome,
    elevation,
    elevationTier,
    moisture,
    feature,
    role
  } = region;

  return `
    ${name} lies within the ${latitudeBand} zone, forming part of the ${elevationTier} and serving as a ${role}.
    It is a ${elevation} region with ${moisture} conditions.
    The dominant biome is ${biome}, and the area is known for ${feature}.
  `.trim();
}
