
declare module 'maplibre-gl' {
  // Using export = syntax to avoid namespace issues
  export class Map {
    constructor(options: MapOptions);
    addControl(control: any, position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'): this;
    on(type: string, listener: (ev: any) => void): this;
    off(type: string, listener: (ev: any) => void): this;
    remove(): void;
    getZoom(): number;
    getCenter(): { lng: number; lat: number };
    easeTo(options: { center?: [number, number]; zoom?: number; duration?: number; easing?: (n: number) => number }): this;
    getSource(id: string): any;
    addSource(id: string, source: any): this;
    addLayer(layer: any): this;
    setFog(options: any): this;
  }

  export class NavigationControl {
    constructor(options?: { visualizePitch?: boolean });
  }

  export class Marker {
    constructor(options?: { element?: HTMLElement });
    setLngLat(lngLat: [number, number]): this;
    setPopup(popup: Popup): this;
    addTo(map: Map): this;
    remove(): void;
    getElement(): HTMLElement;
  }

  export class Popup {
    constructor(options?: { offset?: number; closeButton?: boolean; className?: string });
    setHTML(html: string): this;
  }

  export interface GeoJSONSource {
    setData(data: any): void;
  }

  export interface MapOptions {
    container: string | HTMLElement;
    style: any;
    center?: [number, number];
    zoom?: number;
    pitch?: number;
    bearing?: number;
    antialias?: boolean;
    [key: string]: any;
  }
}
