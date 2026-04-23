export function renderClimateAnomalies(regions, decoded) { ... }

// ---CLIMATE ANOMALIES ---
function renderClimateAnomalies(regions, decoded) {
  const container = document.getElementById("climateAnomalies");

  const lat = decoded.lm.primary.toLowerCase();
  const wind = decoded.we.primary.toLowerCase();
  const hydro = decoded.hy.primary.toLowerCase();
  const tectonic = decoded.tr.tectonicType;

  const anomalies = [];

  // ----------------------------------------------------
  // MONSOON BELTS
  // ----------------------------------------------------
  if (wind.includes("monsoon") || wind.includes("seasonally reversing")) {
    anomalies.push({
      name: "Monsoon Belt",
      desc: "Seasonal wind reversals create intense wet‑dry cycles across tropical and subtropical regions."
    });
  }

  // ----------------------------------------------------
  // HEAT DOMES
  // ----------------------------------------------------
  if (lat.includes("hot") || lat.includes("greenhouse") || lat.includes("heat")) {
    anomalies.push({
      name: "Heat Dome Zones",
      desc: "Persistent high‑pressure systems trap heat, producing extreme temperatures and stagnant air masses."
    });
  }

  // ----------------------------------------------------
  // COLD OCEAN CURRENTS
  // ----------------------------------------------------
  if (lat.includes("cold") || hydro.includes("glacial")) {
    anomalies.push({
      name: "Cold Ocean Currents",
      desc: "Cold currents cool coastal climates, creating fog belts and stabilizing regional temperatures."
    });
  }

  // ----------------------------------------------------
  // WARM OCEAN CURRENTS
  // ----------------------------------------------------
  if (lat.includes("hot") || hydro.includes("lake") || hydro.includes("wetland")) {
    anomalies.push({
      name: "Warm Ocean Currents",
      desc: "Warm currents intensify humidity and storm formation along eastern continental margins."
    });
  }

  // ----------------------------------------------------
  // POLAR VORTEX ZONES
  // ----------------------------------------------------
  if (lat.includes("cold") || lat.includes("ice")) {
    anomalies.push({
      name: "Polar Vortex Zones",
      desc: "Cold polar air masses periodically collapse southward, creating extreme winter events."
    });
  }

  // ----------------------------------------------------
  // JET STREAM BREAKS
  // ----------------------------------------------------
  if (wind.includes("jet") || wind.includes("instability")) {
    anomalies.push({
      name: "Jet‑Stream Breaks",
      desc: "High‑altitude wind rivers fracture into unstable loops, causing unpredictable weather shifts."
    });
  }

  // ----------------------------------------------------
  // STORM CORRIDORS
  // ----------------------------------------------------
  if (wind.includes("storm") || wind.includes("cyclone") || wind.includes("hurricane")) {
    anomalies.push({
      name: "Storm Corridors",
      desc: "Atmospheric convergence zones generate frequent storms, cyclones, and extreme rainfall."
    });
  }

  // ----------------------------------------------------
  // DESERTIFICATION BELTS
  // ----------------------------------------------------
  if (wind.includes("dry") || hydro.includes("arid") || hydro.includes("dried")) {
    anomalies.push({
      name: "Desertification Belts",
      desc: "Dry winds and sparse hydrology expand arid regions and suppress vegetation growth."
    });
  }

  // ----------------------------------------------------
  // HUMIDITY CONVERGENCE ZONES
  // ----------------------------------------------------
  if (wind.includes("moist") || hydro.includes("wetland") || hydro.includes("river")) {
    anomalies.push({
      name: "Humidity Convergence Zones",
      desc: "Moist air masses collide, producing fog, thunderstorms, and lush vegetation."
    });
  }

  // ----------------------------------------------------
  // TECTONIC CLIMATE ANOMALIES
  // ----------------------------------------------------
  switch (tectonic) {
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

