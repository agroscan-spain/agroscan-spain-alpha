
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const zonas = {
  fertilidad: [
    {
      nombre: "Zona Alta Fertilidad",
      tipo: "franco",
      info: "vid, hortalizas",
      color: "green",
      coords: [[
        [40.0, -4.0], [40.0, -3.5], [40.5, -3.5], [40.5, -4.0]
      ]]
    },
    {
      nombre: "Zona Media Fertilidad",
      tipo: "arcilloso",
      info: "almendro, olivo",
      color: "orange",
      coords: [[
        [39.5, -4.5], [39.5, -4.0], [40.0, -4.0], [40.0, -4.5]
      ]]
    },
    {
      nombre: "Zona Baja Fertilidad",
      tipo: "arenoso",
      info: "lavanda, trigo duro",
      color: "red",
      coords: [[
        [39.0, -3.8], [39.0, -3.3], [39.5, -3.3], [39.5, -3.8]
      ]]
    }
  ],
  cultivos: [
    {
      nombre: "Zona Viñedo",
      tipo: "franco",
      info: "vid",
      color: "#6a0dad",
      coords: [[
        [40.0, -4.8], [40.0, -4.3], [40.5, -4.3], [40.5, -4.8]
      ]]
    },
    {
      nombre: "Zona Cereal",
      tipo: "arenoso",
      info: "trigo, avena",
      color: "#b8860b",
      coords: [[
        [39.0, -4.5], [39.0, -4.0], [39.5, -4.0], [39.5, -4.5]
      ]]
    }
  ]
};

const parcelas = [
  {
    nombre: "Finca El Romeral",
    ubicacion: [37.5744, -4.7397],
    suelo: "arcilloso",
    cultivo: "almendro",
    superficie: "3 ha",
    precio: "28.000€",
    contacto: "romeral@agroscan.es"
  },
  {
    nombre: "Viñedo San Marcos",
    ubicacion: [41.6528, -4.7286],
    suelo: "franco",
    cultivo: "vid",
    superficie: "5 ha",
    precio: "40.000€",
    contacto: "sanmarcos@agroscan.es"
  },
  {
    nombre: "Huerto Sierra Verde",
    ubicacion: [39.4699, -0.3763],
    suelo: "arenoso",
    cultivo: "tomate ecológico",
    superficie: "2 ha",
    precio: "19.000€",
    contacto: "sierra@agroscan.es"
  }
];

export default function App() {
  const [modo, setModo] = useState("fertilidad");

  return (
    <div style={{ padding: "1rem" }}>
      <h1>AgroScan Spain Alpha v8-v9</h1>
      <h2>Visualización: {modo === "fertilidad" ? "Fertilidad del Suelo" : "Tipo de Cultivo"}</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setModo("fertilidad")}>Mostrar Fertilidad</button>
        <button onClick={() => setModo("cultivos")} style={{ marginLeft: "1rem" }}>
          Mostrar Cultivos
        </button>
      </div>

      <MapContainer center={[39.5, -4.0]} zoom={6} style={{ height: "500px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {zonas[modo].map((zona, i) => (
          <Polygon key={i} positions={zona.coords} pathOptions={{ color: zona.color, fillOpacity: 0.4 }}>
            <Popup>
              <strong>{zona.nombre}</strong><br />
              Suelo: {zona.tipo}<br />
              Recomendado: {zona.info}
            </Popup>
          </Polygon>
        ))}
        {parcelas.map((p, i) => (
          <Marker key={i} position={p.ubicacion}>
            <Popup>
              <strong>{p.nombre}</strong><br />
              Suelo: {p.suelo}<br />
              Cultivo: {p.cultivo}<br />
              Superficie: {p.superficie}<br />
              Precio: {p.precio}<br />
              Contacto: {p.contacto}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
