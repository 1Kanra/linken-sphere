function getColor(i) {
  const colors = [
    "#ff4d4d",
    "#ff914d",
    "#ffd24d",
    "#7dff4d",
    "#4dffea",
    "#4d7dff",
    "#b84dff",
    "#ff4dd2",
  ];
  return colors[i % colors.length];
}

function setStyle(num) {
  document.body.className = "style-" + num;
  render();
}

let globalData = null;

fetch("links.json?v=" + Date.now())
  .then((res) => res.json())
  .then((data) => {
    globalData = data;
    render();
  });

function render() {
  if (!globalData) return;

  const container = document.getElementById("links");
  container.innerHTML = "";

  const style = document.body.className;

  const center = document.getElementById("centerDisplay");

  if (style === "style-3") {
    center.style.display = "flex";
  } else {
    center.style.display = "none";
  }

  // ======================
  // STYLE 1
  // ======================
  if (style === "style-1") {
    globalData.links.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";

      a.innerHTML = `
      <img class="icon" src="${link.icon}" />
      <span>${link.name}</span>
    `;

      container.appendChild(a);
    });
  }

  // ======================
  // STYLE 2 (HELIX)
  // ======================
  const hexHeight = 100; // match your .hex-item size
  const hexWidth = 100;

  const verticalStep = hexHeight * 0.75; // overlap to connect vertically
  const horizontalOffset = hexWidth * 0.5; // interlock left/right

  globalData.links.forEach((link, i) => {
    const item = document.createElement("div");
    item.className = "hex-item";

    item.innerHTML = `
    <div class="hex">
      <img class="icon" src="${link.icon}" />
    </div>
    <div class="label">${link.name}</div>
  `;

    item.onclick = () => window.open(link.url, "_blank");

    const isRight = i % 2 === 1;

    item.style.position = "absolute";

    // KEY: overlap instead of spacing
    item.style.top = `${i * verticalStep}px`;
    item.style.left = isRight
      ? `${120 + horizontalOffset}px`
      : `${120 - horizontalOffset}px`;

    container.appendChild(item);
  });

  // ======================
  // STYLE 3 (PIE MENU)
  // ======================
  if (style === "style-3") {
    const center = document.getElementById("centerDisplay");
    const count = globalData.links.length;
    const angleStep = 360 / count;

    globalData.links.forEach((link, i) => {
      const slice = document.createElement("div");
      slice.className = "pie-slice";

      slice.style.setProperty("--angle", i * angleStep + "deg");

      slice.innerHTML = `
      <img class="icon" src="${link.icon}" />
    `;

      slice.addEventListener("mouseenter", () => {
        center.textContent = link.name;
        center.style.background = getColor(i);
      });

      slice.onclick = () => window.open(link.url, "_blank");

      container.appendChild(slice);
    });

    container.style.position = "relative";
  }
}
