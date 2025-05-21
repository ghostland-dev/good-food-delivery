
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngExpression } from 'leaflet';
import MapUpdaterComponent from './MapUpdaterComponent';

// Correction des icônes Leaflet qui ne se chargent pas correctement dans React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Icônes personnalisées
const restaurantIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const clientIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const driverIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export interface Location {
  name: string;
  position: [number, number];
  type: 'restaurant' | 'client' | 'driver';
  description?: string;
}

interface DeliveryMapProps {
  center?: [number, number];
  zoom?: number;
  locations: Location[];
  routePath?: LatLngExpression[];
  className?: string;
  height?: string;
  showRoute?: boolean;
  currentDriverPosition?: [number, number];
  onDriverPositionChange?: (position: [number, number]) => void;
}

function DeliveryMap({
  center = [48.8566, 2.3522], // Paris par défaut
  zoom = 13,
  locations,
  routePath,
  className = "w-full h-96",
  height = "24rem",
  showRoute = true,
  currentDriverPosition,
  onDriverPositionChange
}: DeliveryMapProps) {
  const [driverPosition, setDriverPosition] = useState<[number, number]>(
    currentDriverPosition || [48.8566, 2.3522]
  );

  useEffect(() => {
    if (currentDriverPosition) {
      setDriverPosition(currentDriverPosition);
    }
  }, [currentDriverPosition]);

  useEffect(() => {
    // Simulation de mouvement pour le livreur (en situation réelle, ceci serait mis à jour par GPS)
    if (routePath && routePath.length >= 2 && !currentDriverPosition) {
      const simulateMovement = () => {
        // On simule un déplacement le long de la route
        const randomPoint = Math.floor(Math.random() * (routePath.length - 1));
        const point = routePath[randomPoint] as [number, number];
        
        setDriverPosition(point);
        
        if (onDriverPositionChange) {
          onDriverPositionChange(point);
        }
      };

      const interval = setInterval(simulateMovement, 3000);
      return () => clearInterval(interval);
    }
  }, [routePath, onDriverPositionChange, currentDriverPosition]);

  // Choix de l'icône en fonction du type de location
  const getIcon = (type: Location['type']) => {
    switch (type) {
      case 'restaurant':
        return restaurantIcon;
      case 'client':
        return clientIcon;
      case 'driver':
        return driverIcon;
      default:
        return new L.Icon.Default();
    }
  };

  return (
    <div className={className} style={{ height }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((loc, idx) => (
          <Marker 
            key={`location-${idx}`}
            position={loc.position}
            icon={getIcon(loc.type)}
          >
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              {loc.description}
            </Popup>
          </Marker>
        ))}
        
        {/* Marqueur pour la position du livreur */}
        <Marker position={driverPosition} icon={driverIcon}>
          <Popup>
            <strong>Votre position</strong>
            <br />
            En cours de livraison
          </Popup>
        </Marker>
        
        {/* Polyline pour afficher le chemin de livraison */}
        {showRoute && routePath && routePath.length > 1 && (
          <Polyline 
            positions={routePath} 
            color="blue" 
            weight={4} 
            opacity={0.7} 
            dashArray="10, 10"
          />
        )}
        
        <MapUpdaterComponent driverPosition={driverPosition} />
      </MapContainer>
    </div>
  );
}

export default DeliveryMap;
