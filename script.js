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