let map = L.map('map').setView([40.0, -3.5], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = [];
let fertLayer = L.layerGroup().addTo(map);

function cargarParcelas() {
  const tabla = document.getElementById("tabla-parcelas");
  tabla.innerHTML = "";
  parcelas.forEach(p => {
    const row = `<tr>
      <td>${p.nombre}</td><td>${p.suelo}</td><td>${p.cultivo}</td>
      <td>${p.superficie}</td><td>${p.precio}</td><td>${p.contacto}</td>
    </tr>`;
    tabla.innerHTML += row;

    const marker = L.marker([p.lat, p.lng]).addTo(map);
    marker.bindPopup(`<b>${p.nombre}</b><br>Suelo: ${p.suelo}<br>Cultivo: ${p.cultivo}<br>Plantas: ${p.plantas}<br>Plagas: ${p.plagas}`);
    markers.push(marker);

    const color = p.suelo === "arcilloso" ? "green" : p.suelo === "franco" ? "orange" : "red";
    const rect = L.rectangle([
      [p.lat - 0.1, p.lng - 0.1],
      [p.lat + 0.1, p.lng + 0.1]
    ], {color: color, weight: 1});
    fertLayer.addLayer(rect);
  });
}

function filtrarParcelas() {
  const suelo = document.getElementById("sueloFilter").value;
  const cultivo = document.getElementById("cultivoFilter").value;

  markers.forEach(m => map.removeLayer(m));
  fertLayer.clearLayers();

  const filtradas = parcelas.filter(p =>
    (suelo === "todos" || p.suelo === suelo) &&
    (cultivo === "todos" || p.cultivo === cultivo)
  );

  const tabla = document.getElementById("tabla-parcelas");
  tabla.innerHTML = "";
  filtradas.forEach(p => {
    const row = `<tr>
      <td>${p.nombre}</td><td>${p.suelo}</td><td>${p.cultivo}</td>
      <td>${p.superficie}</td><td>${p.precio}</td><td>${p.contacto}</td>
    </tr>`;
    tabla.innerHTML += row;

    const marker = L.marker([p.lat, p.lng]).addTo(map);
    marker.bindPopup(`<b>${p.nombre}</b><br>Suelo: ${p.suelo}<br>Cultivo: ${p.cultivo}<br>Plantas: ${p.plantas}<br>Plagas: ${p.plagas}`);
    markers.push(marker);

    const color = p.suelo === "arcilloso" ? "green" : p.suelo === "franco" ? "orange" : "red";
    const rect = L.rectangle([
      [p.lat - 0.1, p.lng - 0.1],
      [p.lat + 0.1, p.lng + 0.1]
    ], {color: color, weight: 1});
    fertLayer.addLayer(rect);
  });
}

function toggleFertilidad() {
  if (map.hasLayer(fertLayer)) {
    map.removeLayer(fertLayer);
  } else {
    fertLayer.addTo(map);
  }
}

window.onload = () => {
  const suelos = [...new Set(parcelas.map(p => p.suelo))];
  const cultivos = [...new Set(parcelas.map(p => p.cultivo))];

  suelos.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s; opt.textContent = s;
    document.getElementById("sueloFilter").appendChild(opt);
  });
  cultivos.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    document.getElementById("cultivoFilter").appendChild(opt);
  });

  cargarParcelas();
};
