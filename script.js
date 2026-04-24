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

  const size = 100;

  // REAL hex math
  const colStep = size * 0.75;
  const rowStep = size * 0.866; // sqrt(3)/2

  const cols = 3;

  globalData.links.forEach((link, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const item = document.createElement("div");
    item.className = "hex-item";

    // IMPORTANT: true hex offset (this creates interlock)
    const offsetX = row % 2 === 0 ? 0 : colStep / 2;

    item.style.position = "absolute";
    item.style.top = `${row * rowStep}px`;
    item.style.left = `${col * colStep + offsetX + 120}px`;

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
