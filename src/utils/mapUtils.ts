
/**
 * Convert coordinates from [lat, lng] to [lng, lat] for MapLibre
 */
export const convertCoordinates = (coords: [number, number]): [number, number] => {
  return [coords[1], coords[0]]; // MapLibre uses [lng, lat]
};

/**
 * Create a base map style for OpenStreetMap with MapLibre
 */
export const createBaseMapStyle = () => {
  return {
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
  };
};
