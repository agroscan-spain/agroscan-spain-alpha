import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
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

const parcelasEnVenta = [
  {
    nombre: "Finca El Romeral",
    ubicacion: [37.5744, -4.7397],
    suelo: "arcilloso",
    cultivo: "almendro",
    plantas: ["lavanda", "tomillo"],
    plagas: ["mosca del almendro", "pulgón"],
    superficie: "3 ha",
    precio: "28.000€",
    contacto: "romeral@agroscan.es"
  },
  {
    nombre: "Viñedo San Marcos",
    ubicacion: [41.6528, -4.7286],
    suelo: "franco",
    cultivo: "vid",
    plantas: ["caléndula", "achicoria"],
    plagas: ["araña roja", "mildiu"],
    superficie: "5 ha",
    precio: "40.000€",
    contacto: "sanmarcos@agroscan.es"
  },
  {
    nombre: "Huerto Sierra Verde",
    ubicacion: [39.4699, -0.3763],
    suelo: "arenoso",
    cultivo: "tomate ecológico",
    plantas: ["albahaca", "perejil"],
    plagas: ["nematodos", "mosca blanca"],
    superficie: "2 ha",
    precio: "19.000€",
    contacto: "sierra@agroscan.es"
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
      <h1>AgroScan Spain Alpha v6-v7</h1>
      <h2>Parcelas + Fertilidad + Tabla</h2>

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

        {parcelasFiltradas.map((parcela, index) => (
          <Marker key={index} position={parcela.ubicacion}>
            <Popup>
              <strong>{parcela.nombre}</strong><br />
              Suelo: {parcela.suelo}<br />
              Cultivo: {parcela.cultivo}<br />
              Plantas: {parcela.plantas.join(", ")}<br />
              Plagas: {parcela.plagas.join(", ")}<br />
              Superficie: {parcela.superficie}<br />
              Precio: {parcela.precio}<br />
              Contacto: {parcela.contacto}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <h3 style={{ marginTop: "2rem" }}>📋 Todas las parcelas</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Suelo</th>
            <th>Cultivo</th>
            <th>Superficie</th>
            <th>Precio</th>
            <th>Contacto</th>
          </tr>
        </thead>
        <tbody>
          {parcelasFiltradas.map((p, i) => (
            <tr key={i}>
              <td>{p.nombre}</td>
              <td>{p.suelo}</td>
              <td>{p.cultivo}</td>
              <td>{p.superficie}</td>
              <td>{p.precio}</td>
              <td>{p.contacto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
