
import React, { useEffect } from 'react';
import maplibregl from 'maplibre-gl';

interface MapRouteProps {
  map: maplibregl.Map;
  routePath: [number, number][];
  isVisible: boolean;
}

// Convert coordinates from [lat, lng] to [lng, lat] for MapLibre
const convertCoordinates = (coords: [number, number]): [number, number] => {
  return [coords[1], coords[0]]; // MapLibre uses [lng, lat]
};

const MapRoute: React.FC<MapRouteProps> = ({ map, routePath, isVisible }) => {
  useEffect(() => {
    if (!map || !routePath || !isVisible || routePath.length < 2) return;

    // Ensure the map is loaded before trying to add sources or layers
    if (!map.loaded()) {
      console.log("Map not fully loaded yet, waiting for load event");
      const onLoad = () => {
        addOrUpdateRoute();
        map.off('load', onLoad);
      };
      map.on('load', onLoad);
      return;
    }

    addOrUpdateRoute();

    function addOrUpdateRoute() {
      try {
        // Check if the source exists already in a safe way
        let source;
        try {
          source = map.getSource('route');
        } catch (err) {
          console.log("Source 'route' not found, will create new one", err);
          source = null;
        }

        if (source) {
          console.log("Updating existing route source");
          // Update the existing route data
          const geoJsonSource = source as maplibregl.GeoJSONSource;
          geoJsonSource.setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routePath.map(point => convertCoordinates(point))
            }
          });
        } else {
          console.log("Creating new route source and layer");
          // Add a new source and layer for the route
          map.addSource('route', {
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

          if (!map.getLayer('route-line')) {
            map.addLayer({
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
        }
      } catch (error) {
        console.error("Error adding/updating route:", error);
      }
    }

    return () => {
      // No cleanup needed as we're not removing the source/layer on unmount
      // This allows for route persistence between renders
    };
  }, [map, routePath, isVisible]);

  return null; // This component doesn't render anything directly
};

export default MapRoute;
