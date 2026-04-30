// ---CLIMATE ANOMALIES ---
export function renderClimateAnomalies(regions, decoded) {
  const container = document.getElementById("climateAnomalies");

  const lat = decoded.lm.primary.toLowerCase();
  const wind = decoded.we.primary.toLowerCase();
  const hydro = decoded.hy.primary.toLowerCase();

  // ⭐ Determine dominant tectonic type globally
  const tectonicCounts = regions.reduce((acc, r) => {
    acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
    return acc;
  }, {});

  const tectonicType = Object.entries(tectonicCounts)
    .sort((a, b) => b[1] - a[1])[0][0];

  const anomalies = [];

  // ----------------------------------------------------
  // SEED‑DRIVEN ANOMALIES (your originals)
  // ----------------------------------------------------
  if (wind.includes("monsoon") || wind.includes("seasonally reversing")) {
    anomalies.push({
      name: "Monsoon Belt",
      desc: "Seasonal wind reversals create intense wet‑dry cycles across tropical and subtropical regions."
    });
  }

  if (lat.includes("hot") || lat.includes("greenhouse") || lat.includes("heat")) {
    anomalies.push({
      name: "Heat Dome Zones",
      desc: "Persistent high‑pressure systems trap heat, producing extreme temperatures and stagnant air masses."
    });
  }

  if (lat.includes("cold") || hydro.includes("glacial")) {
    anomalies.push({
      name: "Cold Ocean Currents",
      desc: "Cold currents cool coastal climates, creating fog belts and stabilizing regional temperatures."
    });
  }

  if (lat.includes("hot") || hydro.includes("lake") || hydro.includes("wetland")) {
    anomalies.push({
      name: "Warm Ocean Currents",
      desc: "Warm currents intensify humidity and storm formation along eastern continental margins."
    });
  }

  if (lat.includes("cold") || lat.includes("ice")) {
    anomalies.push({
      name: "Polar Vortex Zones",
      desc: "Cold polar air masses periodically collapse southward, creating extreme winter events."
    });
  }

  if (wind.includes("jet") || wind.includes("instability")) {
    anomalies.push({
      name: "Jet‑Stream Breaks",
      desc: "High‑altitude wind rivers fracture into unstable loops, causing unpredictable weather shifts."
    });
  }

  if (wind.includes("storm") || wind.includes("cyclone") || wind.includes("hurricane")) {
    anomalies.push({
      name: "Storm Corridors",
      desc: "Atmospheric convergence zones generate frequent storms, cyclones, and extreme rainfall."
    });
  }

  if (wind.includes("dry") || hydro.includes("arid") || hydro.includes("dried")) {
    anomalies.push({
      name: "Desertification Belts",
      desc: "Dry winds and sparse hydrology expand arid regions and suppress vegetation growth."
    });
  }

  if (wind.includes("moist") || hydro.includes("wetland") || hydro.includes("river")) {
    anomalies.push({
      name: "Humidity Convergence Zones",
      desc: "Moist air masses collide, producing fog, thunderstorms, and lush vegetation."
    });
  }

  // ----------------------------------------------------
  // TECTONIC CLIMATE ANOMALIES (your originals)
  // ----------------------------------------------------
  switch (tectonicType) {
    case "convergent":
      anomalies.push({
        name: "Orographic Climate Walls",
        desc: "Massive mountain ranges split climates into wet windward zones and dry leeward basins."
      });
      break;

    case "divergent":
      anomalies.push({
        name: "Rift‑Valley Heat Basins",
        desc: "Low‑lying rift zones trap heat and moisture, creating unique thermal micro‑climates."
      });
      break;

    case "transform":
      anomalies.push({
        name: "Fault‑Driven Microclimates",
        desc: "Broken terrain disrupts airflow, producing patchy temperature and moisture anomalies."
      });
      break;

    case "hotspot":
      anomalies.push({
        name: "Volcanic Thermal Anomalies",
        desc: "Hotspot volcanism generates warm updrafts, localized storms, and geothermal climate pockets."
      });
      break;

    case "craton":
      anomalies.push({
        name: "Stable Climate Shields",
        desc: "Ancient cratonic interiors resist climatic extremes and maintain long‑term stability."
      });
      break;
  }

  // ----------------------------------------------------
  // ⭐ REGION‑DRIVEN ANOMALIES (NEW + IMPORTANT)
  // ----------------------------------------------------
  regions.forEach((r, i) => {
    const biome = r.biome;
    const elev = r.elevation.toLowerCase();
    const moist = r.moisture.toLowerCase();
    const latBand = r.latitudeBand;

    // Tropical deserts
    if (latBand === "tropical" && (moist.includes("arid") || moist.includes("semi"))) {
      anomalies.push({
        name: `Tropical Dry Zone (Region ${i + 1})`,
        desc: `${r.biome} in a tropical latitude indicates suppressed convection or strong cold‑current influence.`
      });
    }

    // Polar wetlands
    if (latBand === "polar" && (moist.includes("humid") || moist.includes("wet"))) {
      anomalies.push({
        name: `Polar Wet Zone (Region ${i + 1})`,
        desc: `Unusually high moisture at polar latitudes suggests geothermal or ocean‑current anomalies.`
      });
    }

    // High‑elevation humidity
    if (elev.includes("mountain") && (moist.includes("wet") || moist.includes("humid"))) {
      anomalies.push({
        name: `Orographic Moisture Trap (Region ${i + 1})`,
        desc: `Moist air forced upslope creates persistent cloud forests and heavy rainfall.`
      });
    }

    // Low‑elevation cold zones
    if (elev.includes("low") && latBand === "polar") {
      anomalies.push({
        name: `Polar Lowland Cold Sink (Region ${i + 1})`,
        desc: `Cold air pooling in lowlands intensifies frost, fog, and extreme winter conditions.`
      });
    }

    // Biome/latitude mismatch
    if (latBand === "temperate" && biome === "Tropical Forests") {
      anomalies.push({
        name: `Latitude‑Biome Inversion (Region ${i + 1})`,
        desc: `A tropical biome in a temperate latitude suggests strong warm‑current or geothermal influence.`
      });
    }
  });

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------
  const entries = anomalies.map(a => `
    <div class="anomaly-entry">
      <strong>${a.name}</strong><br>
      ${a.desc}
    </div>
  `).join("");

  container.innerHTML = `
    <h3>🌡 Climate Anomalies</h3>
    ${entries}
  `;
}
