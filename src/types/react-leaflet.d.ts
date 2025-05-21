
/**
 * This declaration file is for compatibility purposes only.
 * The application uses MapLibre GL instead of react-leaflet.
 */
declare module 'react-leaflet' {
  import { FC, ReactNode } from 'react';
  
  // Basic component definitions
  export const MapContainer: FC<any>;
  export const TileLayer: FC<any>;
  export const Marker: FC<any>;
  export const Popup: FC<any>;
  export const Polyline: FC<any>;
  export const Circle: FC<any>;
  export const Rectangle: FC<any>;
  export const Tooltip: FC<any>;
  
  // Hooks
  export function useMap(): any;
  export function useMapEvents(events: Record<string, Function>): any;
  
  // Basic interfaces
  export interface MapContainerProps {
    center: [number, number];
    zoom: number;
    children?: ReactNode;
    [key: string]: any;
  }

  export interface PopupProps {
    [key: string]: any;
  }

  export interface MarkerProps {
    position: [number, number];
    [key: string]: any;
  }
}
