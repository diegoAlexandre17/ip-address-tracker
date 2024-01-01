import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconLocation from "./iconLocation";

const Map = ({ location }) => {

  return (
    <div className="leaflet-container">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]} icon={iconLocation}>
          <Popup>
            is here!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
