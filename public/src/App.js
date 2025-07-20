
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const parcelas = [
  {
    nombre: "Finca El Romeral",
    suelo: "arcilloso",
    cultivo: "almendro",
    superficie: "3 ha",
    precio: "28.000€",
    contacto: "romeral@agroscan.es",
    coordenadas: [39.5, -3],
    plantas: "lavanda, romero",
    plagas: "pulgón, cochinilla"
  },
  {
    nombre: "Viñedo San Marcos",
    suelo: "franco",
    cultivo: "vid",
    superficie: "5 ha",
    precio: "40.000€",
    contacto: "sanmarcos@agroscan.es",
    coordenadas: [40.1, -3.5],
    plantas: "caléndula, achicoria",
    plagas: "araña roja, mildiu"
  },
  {
    nombre: "Huerto Sierra Verde",
    suelo: "arenoso",
    cultivo: "tomate ecológico",
    superficie: "2 ha",
    precio: "19.000€",
    contacto: "sierra@agroscan.es",
    coordenadas: [37.9, -4.8],
    plantas: "albahaca, tagetes",
    plagas: "mosca blanca, nematodos"
  }
];

const suelosColor = {
  "arcilloso": "green",
  "franco": "orange",
  "arenoso": "red"
};

export default function App() {
  const [filtroSuelo, setFiltroSuelo] = useState("Todos");
  const [filtroCultivo, setFiltroCultivo] = useState("Todos");

  const parcelasFiltradas = parcelas.filter(p => 
    (filtroSuelo === "Todos" || p.suelo === filtroSuelo) &&
    (filtroCultivo === "Todos" || p.cultivo === filtroCultivo)
  );

  return (
    <div>
      <h1>AgroScan Spain Alpha v12</h1>
      <h2>Visualización: Fertilidad + Ciclo Ecológico + Base de Datos</h2>
      <select onChange={(e) => setFiltroSuelo(e.target.value)}>
        <option value="Todos">Todos los suelos</option>
        <option value="arcilloso">Arcilloso</option>
        <option value="franco">Franco</option>
        <option value="arenoso">Arenoso</option>
      </select>
      <select onChange={(e) => setFiltroCultivo(e.target.value)}>
        <option value="Todos">Todos los cultivos</option>
        <option value="almendro">Almendro</option>
        <option value="vid">Vid</option>
        <option value="tomate ecológico">Tomate ecológico</option>
      </select>
      <MapContainer center={[40, -3.5]} zoom={6} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parcelasFiltradas.map((parcela, i) => (
          <Rectangle
            key={i}
            bounds={[
              [parcela.coordenadas[0] - 0.1, parcela.coordenadas[1] - 0.1],
              [parcela.coordenadas[0] + 0.1, parcela.coordenadas[1] + 0.1]
            ]}
            pathOptions={{ color: suelosColor[parcela.suelo], weight: 2 }}
          >
            <Popup>
              <b>{parcela.nombre}</b><br />
              Suelo: {parcela.suelo}<br />
              Cultivo: {parcela.cultivo}<br />
              Plantas: {parcela.plantas}<br />
              Plagas: {parcela.plagas}<br />
              Superficie: {parcela.superficie}<br />
              Precio: {parcela.precio}<br />
              Contacto: {parcela.contacto}
            </Popup>
          </Rectangle>
        ))}
      </MapContainer>
      <table>
        <thead>
          <tr><th>Nombre</th><th>Suelo</th><th>Cultivo</th><th>Superficie</th><th>Precio</th><th>Contacto</th></tr>
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
