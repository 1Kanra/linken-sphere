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

  const radius = 60;     // horizontal wave strength
  const spacing = 80;    // vertical flow speed

  globalData.links.forEach((link, i) => {
    const item = document.createElement("div");
    item.className = "hex-item";

    const t = i;

    // HELIX MATH (this is the key)
    const x = Math.sin(t * 0.8) * radius;
    const y = t * spacing;

    item.style.position = "absolute";
    item.style.left = `${140 + x}px`;
    item.style.top = `${y}px`;

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
