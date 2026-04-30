// --- Ocean Currents
export function renderOceanCurrents(regions, decoded) {
  const container = document.getElementById("oceanCurrents");

  const lat = decoded.lm.primary.toLowerCase();
  const wind = decoded.we.primary.toLowerCase();
  const hydro = decoded.hy.primary.toLowerCase();

  // ⭐ Determine dominant tectonic type globally
  const tectonicCounts = regions.reduce((acc, r) => {
    acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
    return acc;
  }, {});

  const tectonicType = Object.entries(tectonicCounts)
    .sort((a, b) => b[1] - a[1])[0][0]; // most common tectonic type

  const currents = [];

  // ----------------------------------------------------
  // WARM CURRENTS
  // ----------------------------------------------------
  if (lat.includes("hot") || wind.includes("moist")) {
    currents.push({
      name: "Warm Western Boundary Currents",
      desc: "Fast, warm currents flow poleward along eastern continental margins, intensifying humidity and storm formation."
    });
  }

  // ----------------------------------------------------
  // COLD CURRENTS
  // ----------------------------------------------------
  if (lat.includes("cold") || hydro.includes("glacial")) {
    currents.push({
      name: "Cold Eastern Boundary Currents",
      desc: "Slow, cold currents flow equatorward along western continental margins, creating fog belts and stabilizing temperatures."
    });
  }

  // ----------------------------------------------------
  // EQUATORIAL COUNTER‑CURRENTS
  // ----------------------------------------------------
  if (lat.includes("tropical") || lat.includes("equatorial")) {
    currents.push({
      name: "Equatorial Counter‑Currents",
      desc: "Warm surface water flows eastward along the equator, influencing rainfall and monsoon timing."
    });
  }

  // ----------------------------------------------------
  // SUBTROPICAL GYRES
  // ----------------------------------------------------
  if (lat.includes("temperate") || lat.includes("subtropical")) {
    currents.push({
      name: "Subtropical Gyres",
      desc: "Large rotating gyres dominate mid‑latitude oceans, redistributing heat and shaping coastal climates."
    });
  }

  // ----------------------------------------------------
  // POLAR CURRENTS
  // ----------------------------------------------------
  if (lat.includes("polar") || lat.includes("ice")) {
    currents.push({
      name: "Polar Drift Currents",
      desc: "Cold, dense water flows outward from polar regions, driving global thermohaline circulation."
    });
  }

  // ----------------------------------------------------
  // UPWELLING ZONES
  // ----------------------------------------------------
  if (wind.includes("dry") || hydro.includes("arid")) {
    currents.push({
      name: "Coastal Upwelling Zones",
      desc: "Wind‑driven upwelling brings cold, nutrient‑rich water to the surface, cooling nearby coasts."
    });
  }

  // ----------------------------------------------------
  // TECTONIC INFLUENCE (fixed)
  // ----------------------------------------------------
  switch (tectonicType) {
    case "convergent":
      currents.push({
        name: "Trench‑Driven Current Deflection",
        desc: "Deep ocean trenches redirect major currents, creating complex eddies and storm‑fueling warm pools."
      });
      break;

    case "divergent":
      currents.push({
        name: "Mid‑Ocean Ridge Upwelling",
        desc: "Ridge systems push warm water upward, altering current paths and enhancing storm formation."
      });
      break;

    case "hotspot":
      currents.push({
        name: "Volcanic Island Current Disruption",
        desc: "Chains of volcanic islands break up currents, creating swirling eddies and localized warm zones."
      });
      break;

    case "transform":
      currents.push({
        name: "Fault‑Line Current Shear",
        desc: "Undersea fault systems create abrupt changes in seafloor depth, altering current speed and direction."
      });
      break;

    case "craton":
      currents.push({
        name: "Stable Continental Shelf Currents",
        desc: "Wide, stable shelves support predictable coastal currents and long‑term climate stability."
      });
      break;
  }

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------
  const entries = currents.map(c => `
    <div class="current-entry">
      <strong>${c.name}</strong><br>
      ${c.desc}
    </div>
  `).join("");

  container.innerHTML = `
    <h3>🌊 Global Ocean Current Simulation</h3>
    ${entries}
  `;
}
