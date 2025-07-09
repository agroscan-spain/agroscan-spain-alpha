
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const parcelasEnVenta = [
  {
    nombre: "Finca El Romeral",
    ubicacion: [37.5744, -4.7397],
    suelo: "arcilloso",
    cultivo: "almendro",
    plantas: ["lavanda", "tomillo"],
    plagas: ["mosca del almendro", "pulgón"],
    color: "blue"
  },
  {
    nombre: "Viñedo San Marcos",
    ubicacion: [41.6528, -4.7286],
    suelo: "franco",
    cultivo: "vid",
    plantas: ["caléndula", "achicoria"],
    plagas: ["araña roja", "mildiu"],
    color: "blue"
  },
  {
    nombre: "Huerto Sierra Verde",
    ubicacion: [39.4699, -0.3763],
    suelo: "arenoso",
    cultivo: "tomate ecológico",
    plantas: ["albahaca", "perejil"],
    plagas: ["nematodos", "mosca blanca"],
    color: "blue"
  }
];

export default function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>AgroScan Spain Alpha v3</h1>
      <h2>Parcelas en venta con recomendaciones ecológicas</h2>

      <MapContainer center={[39.5, -3.5]} zoom={6} style={{ height: "500px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {parcelasEnVenta.map((parcela, index) => (
          <Marker key={index} position={parcela.ubicacion}>
            <Popup>
              <strong>{parcela.nombre}</strong><br />
              Suelo: {parcela.suelo}<br />
              Cultivo recomendado: {parcela.cultivo}<br />
              Plantas compañeras: {parcela.plantas.join(", ")}<br />
              Plagas comunes: {parcela.plagas.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
