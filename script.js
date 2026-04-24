function getColor(i) {
  const colors = [
    "#ff4d4d",
    "#ff914d",
    "#ffd24d",
    "#7dff4d",
    "#4dffea",
    "#4d7dff",
    "#b84dff",
    "#ff4dd2"
  ];
  return colors[i % colors.length];
}

function setStyle(num) {
  document.body.className = "style-" + num;
  render();
}

let globalData = null;

fetch("links.json?v=" + Date.now())
  .then(res => res.json())
  .then(data => {
    globalData = data;
    render();
  });

function render() {
  if (!globalData) return;

  const container = document.getElementById("links");
  container.innerHTML = "";

  const style = document.body.className;

  // ======================
  // STYLE 1
  // ======================
  if (style === "style-1") {
    globalData.links.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
      container.appendChild(a);
    });
  }

  // ======================
  // STYLE 2 (HELIX)
  // ======================
  if (style === "style-2") {
    const spacingY = 90;

    container.style.position = "relative";

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

    container.style.height = `${globalData.links.length * spacingY}px`;
  }

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

      const color = getColor(i);
      slice.dataset.color = color;

      slice.addEventListener("mouseenter", () => {
        center.textContent = link.name;
        center.style.background = color;
      });

      slice.addEventListener("mouseleave", () => {
        center.textContent = "Hover a link";
        center.style.background = "#111";
      });

      slice.onclick = () => window.open(link.url, "_blank");

      container.appendChild(slice);
    });

    container.style.position = "relative";
  }
}