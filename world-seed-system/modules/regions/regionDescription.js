// regionDescription.js

export function buildRegionDescription(region) {
  const {
    name,
    biome,
    elevation,
    moisture,
    feature,
    role
  } = region;

  return `
    ${name} serves as a ${role} within the larger world.
    It is a ${elevation} region with ${moisture} conditions.
    The dominant biome is ${biome}, and the area is known for ${feature}.
  `.trim();
}
