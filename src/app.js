import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [parcelas, setParcelas] = useState([]);
  const [filtroSuelo, setFiltroSuelo] = useState("");
  const [filtroCultivo, setFiltroCultivo] = useState("");

  useEffect(() => {
    fetch("/data/parcelas.json")
      .then(res => res.json())
      .then(data => setParcelas(data));
  }, []);

  const parcelasFiltradas = parcelas.filter(p =>
    (filtroSuelo === "" || p.suelo === filtroSuelo) &&
    (filtroCultivo === "" || p.cultivo === filtroCultivo)
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>AgroScan Spain Alpha v12</h1>
      <h2>Parcelas + Ciclo Ecológico + Base Simulada</h2>

      <div style={{ margin: "1rem 0", display: "flex", gap: "1rem" }}>
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
        {parcelasFiltradas.map((p, i) => (
          <Marker key={i} position={p.ubicacion}>
            <Popup>
              <strong>{p.nombre}</strong><br />
              Suelo: {p.suelo}<br />
              Cultivo: {p.cultivo}<br />
              Plantas compañeras: {p.plantas.join(", ")}<br />
              Plagas comunes: {p.plagas.join(", ")}<br />
              ♻️ Residuos: {p.residuos.join(", ")}<br />
              🐄 Animales compatibles: {p.animales.join(", ")}<br />
              🧪 Abono sugerido: {p.abono}<br />
              Superficie: {p.superficie}<br />
              Precio: {p.precio}<br />
              Contacto: {p.contacto}
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
