
// This is a declaration file to satisfy TypeScript
// We're not using react-leaflet but some types reference it
declare module 'react-leaflet' {
  // Provide empty definitions for any types that might be referenced
  export const MapContainer: any;
  export const TileLayer: any;
  export const Marker: any;
  export const Popup: any;
  export const useMap: any;
  export const useMapEvents: any;
  export const Polyline: any;
  export const Circle: any;
  export const Rectangle: any;
  export const Tooltip: any;
  
  export interface MapContainerProps {
    center: [number, number];
    zoom: number;
    [key: string]: any;
  }
}
