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

  // ======================
  // STYLE 1 (LINKTREE)
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
  // STYLE 2 (HEX GRID / HELIX)
  // ======================
  if (style === "style-2") {
  const container = document.getElementById("links");
  container.innerHTML = "";

  const cols = 4;
  const rows = 6;

  // ======================
  // 1. BUILD GRID (OK)
  // ======================
  const grid = [];
  let id = 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid.push({ id: id++, row: r, col: c });
    }
  }

  // ======================
  // 2. TRUE HELIX PATTERN
  // (zigzag wave across rows)
  // ======================
  const activeSet = new Set();

  for (let r = 0; r < rows; r++) {
    const c = (r % 2 === 0) ? 1 : 2; // real zigzag shift
    const id = r * cols + c + 1;
    activeSet.add(id);
  }

  // ======================
  // 3. HEX GEOMETRY
  // ======================
  const hexSize = 100;
  const colStep = hexSize * 0.75;
  const rowStep = hexSize * 0.866;

  // ======================
  // 4. STABLE LINK MAPPING
  // ======================
  let linkIndex = 0;

  grid.forEach((node) => {
    if (!activeSet.has(node.id)) return;

    const link = globalData.links[linkIndex % globalData.links.length];
    linkIndex++;

    const item = document.createElement("div");
    item.className = "hex-item";

    const xOffset = node.row % 2 ? colStep / 2 : 0;

    item.style.position = "absolute";
    item.style.left = `${node.col * colStep + xOffset + 120}px`;
    item.style.top = `${node.row * rowStep}px`;

    item.innerHTML = `
      <div class="hex">
        <img class="icon" src="${link.icon}" />
      </div>
      <div class="label">${link.name}</div>
    `;

    item.onclick = () => window.open(link.url, "_blank");

    container.appendChild(item);
  });

  container.style.position = "relative";
}
}
