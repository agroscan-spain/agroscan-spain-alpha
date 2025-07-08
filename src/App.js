
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [formData, setFormData] = useState({ nombre: '', cultivo: '', lat: '', lng: '' });
  const [parcelas, setParcelas] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaParcela = {
      nombre: formData.nombre,
      cultivo: formData.cultivo,
      position: [parseFloat(formData.lat), parseFloat(formData.lng)]
    };
    setParcelas([...parcelas, nuevaParcela]);
    setFormData({ nombre: '', cultivo: '', lat: '', lng: '' });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>AgroScan Spain Alpha</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input type="text" name="nombre" placeholder="Nombre de parcela" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="cultivo" placeholder="Tipo de cultivo" value={formData.cultivo} onChange={handleChange} required />
        <input type="text" name="lat" placeholder="Latitud" value={formData.lat} onChange={handleChange} required />
        <input type="text" name="lng" placeholder="Longitud" value={formData.lng} onChange={handleChange} required />
        <button type="submit">Añadir parcela</button>
      </form>

      <MapContainer center={[40.4168, -3.7038]} zoom={6} style={{ height: "400px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {parcelas.map((parcela, index) => (
          <Marker key={index} position={parcela.position}>
            <Popup>
              <strong>{parcela.nombre}</strong><br />
              Cultivo: {parcela.cultivo}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
