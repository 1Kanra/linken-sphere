function setStyle(num) {
  document.body.className = "style-" + num;
  render(); // re-render when style changes
}

let globalData = null;

fetch("links.json?v=" + Date.now())
  .then((res) => res.json())
  .then((data) => {
    globalData = data;
    render();
  })
  .catch((err) => console.error("Failed to load JSON:", err));

function render() {
  if (!globalData) return;

  const container = document.getElementById("links");
  container.innerHTML = ""; // clear old UI

  const style = document.body.className;

  // STYLE 1 — Linktree
  if (style === "style-1") {
    globalData.links.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
      container.appendChild(a);
    });
  }

  // STYLE 2 — Hex grid
  if (style === "style-2") {
  const container = document.getElementById("links");
  container.innerHTML = "";

  const spacingY = 90; // vertical spacing

  globalData.links.forEach((link, i) => {
    const item = document.createElement("div");
    item.className = "hex-item";

    item.innerHTML = `
      <div class="hex">${link.name[0]}</div>
      <div class="label">${link.name}</div>
    `;

    item.onclick = () => window.open(link.url, "_blank");

    const isRight = i % 2 === 1;

    item.style.position = "absolute";
    item.style.top = `${i * spacingY}px`;
    item.style.left = isRight ? "180px" : "40px";

    container.appendChild(item);
  });

  container.style.position = "relative";
  container.style.height = `${globalData.links.length * spacingY}px`;
}

  // STYLE 3 — Radial hover system
  if (style === "style-3") {
    const center = document.getElementById("centerDisplay");

    globalData.links.forEach((link, i) => {
      const item = document.createElement("div");
      item.className = "hex-item radial-item";

      item.innerHTML = `
        <div class="hex">${link.name[0]}</div>
      `;

      item.onclick = () => window.open(link.url, "_blank");

      item.addEventListener("mouseenter", () => {
        center.textContent = link.name;
      });

      container.appendChild(item);
    });
  }
}
