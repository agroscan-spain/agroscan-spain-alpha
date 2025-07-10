
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const parcelasEnVenta = [
  {
    nombre: "Finca El Romeral",
    ubicacion: [37.5744, -4.7397],
    suelo: "arcilloso",
    cultivo: "almendro",
    plantas: ["lavanda", "tomillo"],
    plagas: ["mosca del almendro", "pulgón"]
  },
  {
    nombre: "Viñedo San Marcos",
    ubicacion: [41.6528, -4.7286],
    suelo: "franco",
    cultivo: "vid",
    plantas: ["caléndula", "achicoria"],
    plagas: ["araña roja", "mildiu"]
  },
  {
    nombre: "Huerto Sierra Verde",
    ubicacion: [39.4699, -0.3763],
    suelo: "arenoso",
    cultivo: "tomate ecológico",
    plantas: ["albahaca", "perejil"],
    plagas: ["nematodos", "mosca blanca"]
  }
];

export default function App() {
  const [filtroSuelo, setFiltroSuelo] = useState("");
  const [filtroCultivo, setFiltroCultivo] = useState("");

  const parcelasFiltradas = parcelasEnVenta.filter(p =>
    (filtroSuelo === "" || p.suelo === filtroSuelo) &&
    (filtroCultivo === "" || p.cultivo === filtroCultivo)
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>AgroScan Spain Alpha v4</h1>
      <h2>Parcelas en venta con filtros ecológicos</h2>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <select value={filtroSuelo} onChange={e => setFiltroSuelo(e.target.value)}>
          <option value="">Todos los suelos</option>
          <option value="arcilloso">Arcilloso</option>
          <option value="franco">Franco</option>
          <option value="arenoso">Arenoso</option>
        </select>

        <select value={filtroCultivo} onChange={e => setFiltroCultivo(e.target.value)}>
          <option value="">Todos los cultivos</option>
          <option value="almendro">Almendro</option>
          <option value="vid">Vid</option>
          <option value="tomate ecológico">Tomate ecológico</option>
        </select>
      </div>

      <MapContainer center={[39.5, -3.5]} zoom={6} style={{ height: "500px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {parcelasFiltradas.map((parcela, index) => (
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
