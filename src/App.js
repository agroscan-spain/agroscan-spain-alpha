
import React from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const zonasFertilidad = [
  {
    nombre: "Zona Alta Fertilidad",
    nivel: "Alta",
    tipo: "franco",
    cultivo: "vid, hortalizas",
    color: "green",
    coords: [[
      [40.0, -4.0],
      [40.0, -3.5],
      [40.5, -3.5],
      [40.5, -4.0]
    ]]
  },
  {
    nombre: "Zona Media Fertilidad",
    nivel: "Media",
    tipo: "arcilloso",
    cultivo: "almendro, olivo",
    color: "orange",
    coords: [[
      [39.5, -4.5],
      [39.5, -4.0],
      [40.0, -4.0],
      [40.0, -4.5]
    ]]
  },
  {
    nombre: "Zona Baja Fertilidad",
    nivel: "Baja",
    tipo: "arenoso",
    cultivo: "lavanda, trigo duro",
    color: "red",
    coords: [[
      [39.0, -3.8],
      [39.0, -3.3],
      [39.5, -3.3],
      [39.5, -3.8]
    ]]
  }
];

export default function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>AgroScan Spain Alpha v5</h1>
      <h2>Zonas de Fertilidad del Suelo</h2>

      <MapContainer center={[39.5, -4.0]} zoom={6} style={{ height: "500px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {zonasFertilidad.map((zona, idx) => (
          <Polygon key={idx} positions={zona.coords} pathOptions={{ color: zona.color }}>
            <Popup>
              <strong>{zona.nombre}</strong><br />
              Nivel: {zona.nivel}<br />
              Tipo de suelo: {zona.tipo}<br />
              Cultivos sugeridos: {zona.cultivo}
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
}
