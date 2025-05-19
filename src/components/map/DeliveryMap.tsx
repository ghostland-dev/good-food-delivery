
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import MapUpdaterComponent from './MapUpdaterComponent';

// Fix Leaflet icon issues in React
// This must be done before using any icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icons
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
  position: LatLngExpression;
  type: 'restaurant' | 'client' | 'driver';
  description?: string;
}

interface DeliveryMapProps {
  center?: LatLngExpression;
  zoom?: number;
  locations: Location[];
  routePath?: LatLngExpression[];
  className?: string;
  height?: string;
  showRoute?: boolean;
  currentDriverPosition?: LatLngExpression;
  onDriverPositionChange?: (position: [number, number]) => void;
}

function DeliveryMap({
  center = [48.8566, 2.3522], // Paris by default
  zoom = 13,
  locations,
  routePath,
  className = "w-full h-96",
  height = "24rem",
  showRoute = true,
  currentDriverPosition,
  onDriverPositionChange
}: DeliveryMapProps) {
  const [driverPosition, setDriverPosition] = useState<LatLngExpression>(
    currentDriverPosition || [48.8566, 2.3522]
  );

  useEffect(() => {
    if (currentDriverPosition) {
      setDriverPosition(currentDriverPosition);
    }
  }, [currentDriverPosition]);

  useEffect(() => {
    // Simulation of movement for the driver (in real situation, this would be updated by GPS)
    if (routePath && routePath.length >= 2 && !currentDriverPosition) {
      const simulateMovement = () => {
        // Simulate movement along the route
        const randomPoint = Math.floor(Math.random() * (routePath.length - 1));
        const point = routePath[randomPoint];
        
        // Handle both tuple and object formats for LatLngExpression
        let position: [number, number];
        if (Array.isArray(point)) {
          position = [point[0], point[1]];
        } else if (typeof point === 'object' && 'lat' in point && 'lng' in point) {
          position = [point.lat, point.lng];
        } else {
          position = [48.8566, 2.3522]; // Default to Paris if invalid
        }
        
        setDriverPosition(position);
        
        if (onDriverPositionChange) {
          onDriverPositionChange(position);
        }
      };

      const interval = setInterval(simulateMovement, 3000);
      return () => clearInterval(interval);
    }
  }, [routePath, onDriverPositionChange, currentDriverPosition]);

  // Choose icon based on location type
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
        
        {/* Driver position marker */}
        <Marker position={driverPosition} icon={driverIcon}>
          <Popup>
            <strong>Your position</strong>
            <br />
            In delivery
          </Popup>
        </Marker>
        
        {/* Polyline to display delivery path */}
        {showRoute && routePath && routePath.length > 1 && (
          <Polyline 
            positions={routePath} 
            color="blue" 
            weight={4} 
            opacity={0.7} 
            dashArray="10, 10"
          />
        )}
        
        {/* Map updater for smooth position changes */}
        <MapUpdaterComponent driverPosition={driverPosition} zoom={zoom} />
      </MapContainer>
    </div>
  );
}

export default DeliveryMap;
