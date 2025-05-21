
declare module 'maplibre-gl' {
  export * from 'maplibre-gl';
  
  // Add any additional type declarations needed
  export interface MapOptions {
    container: string | HTMLElement;
    style: string;
    center?: [number, number];
    zoom?: number;
    pitch?: number;
    bearing?: number;
    antialias?: boolean;
    [key: string]: any;
  }
}
