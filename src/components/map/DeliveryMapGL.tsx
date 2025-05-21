
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card } from '@/components/ui/card';

// Types
export interface Location {
  name: string;
  position: [number, number];
  type: 'restaurant' | 'client' | 'driver';
  description?: string;
}

interface DeliveryMapGLProps {
  center?: [number, number];
  zoom?: number;
  locations: Location[];
  routePath?: [number, number][];
  className?: string;
  height?: string;
  showRoute?: boolean;
  currentDriverPosition?: [number, number];
  onDriverPositionChange?: (position: [number, number]) => void;
  followDriver?: boolean;
}

const DeliveryMapGL: React.FC<DeliveryMapGLProps> = ({
  center = [2.3522, 48.8566], // Paris par défaut (longitude, latitude)
  zoom = 13,
  locations,
  routePath,
  className = "w-full h-96",
  height = "24rem",
  showRoute = true,
  currentDriverPosition,
  onDriverPositionChange,
  followDriver = true,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Convertir les coordonnées (lat, lng) en (lng, lat) pour MapLibre
  const convertCoordinates = (coords: [number, number]): [number, number] => {
    return [coords[1], coords[0]]; // MapLibre utilise [lng, lat]
  };

  // Initialisation de la carte
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Création de la carte OpenStreetMap avec MapLibre GL
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: convertCoordinates(center),
      zoom: zoom,
    });

    // Contrôles de navigation
    map.current.addControl(new maplibregl.NavigationControl());

    // Événement de chargement de la carte
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Nettoyage
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Ajouter les marqueurs
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Supprimer les marqueurs existants
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Ajouter de nouveaux marqueurs pour chaque emplacement
    locations.forEach(loc => {
      // Créer un élément pour le marqueur personnalisé
      const el = document.createElement('div');
      el.className = 'custom-marker';
      
      // Appliquer un style en fonction du type
      if (loc.type === 'restaurant') {
        el.innerHTML = `<div class="w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                          </svg>
                        </div>`;
      } else if (loc.type === 'client') {
        el.innerHTML = `<div class="w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                          </svg>
                        </div>`;
      } else {
        el.innerHTML = `<div class="w-6 h-6 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center">
                          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                          </svg>
                        </div>`;
      }

      // Créer le popup avec les informations
      const popup = new maplibregl.Popup({ 
        offset: 25,
        closeButton: false,
        className: 'custom-popup'
      }).setHTML(`<h3 class="font-medium text-sm">${loc.name}</h3>${loc.description ? `<p class="text-xs text-gray-500">${loc.description}</p>` : ''}`);
      
      // Créer le marqueur et l'ajouter à la carte
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(convertCoordinates(loc.position))
        .setPopup(popup)
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });
  }, [locations, mapLoaded]);

  // Ajouter le marqueur du livreur séparément
  useEffect(() => {
    if (!map.current || !mapLoaded || !currentDriverPosition) return;

    // Supprimer l'ancien marqueur du livreur s'il existe
    const driverMarkerIndex = markersRef.current.findIndex(m => m.getElement().classList.contains('driver-marker'));
    if (driverMarkerIndex !== -1) {
      markersRef.current[driverMarkerIndex].remove();
      markersRef.current.splice(driverMarkerIndex, 1);
    }

    // Créer un élément pour le marqueur du livreur
    const el = document.createElement('div');
    el.className = 'custom-marker driver-marker';
    el.innerHTML = `<div class="w-8 h-8 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center animate-pulse">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                      </svg>
                    </div>`;

    // Créer le popup avec les informations
    const popup = new maplibregl.Popup({
      offset: 25,
      closeButton: false,
      className: 'custom-popup'
    }).setHTML(`<h3 class="font-medium text-sm">Votre livreur</h3><p class="text-xs text-gray-500">En cours de livraison</p>`);

    // Créer le marqueur du livreur et l'ajouter à la carte
    const driverMarker = new maplibregl.Marker({ element: el })
      .setLngLat(convertCoordinates(currentDriverPosition))
      .setPopup(popup)
      .addTo(map.current!);

    markersRef.current.push(driverMarker);

    // Centrer la carte sur le livreur si followDriver est activé
    if (followDriver) {
      map.current.easeTo({
        center: convertCoordinates(currentDriverPosition),
        duration: 1000
      });
    }
  }, [currentDriverPosition, followDriver, mapLoaded]);

  // Dessiner l'itinéraire
  useEffect(() => {
    if (!map.current || !mapLoaded || !routePath || !showRoute || routePath.length < 2) return;

    // Vérifier si la source existe déjà
    if (map.current.getSource('route')) {
      // Mettre à jour les données de l'itinéraire
      const source = map.current.getSource('route') as maplibregl.GeoJSONSource;
      source.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routePath.map(point => convertCoordinates(point))
        }
      });
    } else {
      // Ajouter une nouvelle source et une couche pour l'itinéraire
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routePath.map(point => convertCoordinates(point))
          }
        }
      });

      map.current.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#4287f5',
          'line-width': 5,
          'line-dasharray': [2, 2]
        }
      });
    }
  }, [routePath, showRoute, mapLoaded]);

  return (
    <div className={className} style={{ height }}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default DeliveryMapGL;
