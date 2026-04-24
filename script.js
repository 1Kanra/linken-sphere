fetch('links.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('links');

    data.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
      container.appendChild(a);
    });
  });

function setStyle(num) {
  document.body.className = "style-" + num;
}

data.links.forEach((link, i) => {
  const item = document.createElement('div');
  item.className = "hex-item";

  item.innerHTML = `
    <div class="hex">${link.name[0]}</div>
    <div class="label">${link.name}</div>
  `;

  item.onclick = () => window.open(link.url, "_blank");

  container.appendChild(item);
});

const center = document.createElement('div');
center.id = "centerDisplay";
document.body.appendChild(center);

document.addEventListener("mouseover", (e) => {
  if (e.target.closest(".hex-item")) {
    const text = e.target.closest(".hex-item").innerText;
    center.textContent = text;
  }
});