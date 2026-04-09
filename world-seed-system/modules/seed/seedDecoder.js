import { CC_TABLE, LM_TABLE, WE_TABLE, TR_TABLE, HY_TABLE, SF_TABLE } from "./lookupTables.js";

import { CC_SECONDARY, LM_SECONDARY, WE_SECONDARY, TR_SECONDARY, HY_SECONDARY, SF_SECONDARY } from "./secondaryTables.js";

export function decodeSeed(seedStr) {
  const parts = seedStr.trim().toUpperCase().split("-");
  if (clean.length < 12) {
    throw new Error("Seed must be 12 characters (6 primary + 6 secondary)");
  }

  const [CC1, LM1, WE1, TR1, HY1, SF1, CC2, LM2, WE2, TR2, HY2, SF2] = parts;

  const decodePair = (pair, table, label) => {
    const a = pair[0];
    const b = pair[1];
    const descA = table[a] || `Unknown (${a})`;
    const descB = table[b] || `Unknown (${b})`;
    return { label, code: pair, primary: descA, twist: descB };
  };

  return {
    cc: decodePair(cc, CC_TABLE, "Continental Configuration"),
    lm: decodePair(lm, LM_TABLE, "Latitude & Temperature Model"),
    we: decodePair(we, WE_TABLE, "Wind & Rainfall Model"),
    tr: decodePair(tr, TR_TABLE, "Tectonic & Elevation Model"),
    hy: decodePair(hy, HY_TABLE, "Hydrology Model"),
    sf: decodePair(sf, SF_TABLE, "Special Features Model"),
  };
}
