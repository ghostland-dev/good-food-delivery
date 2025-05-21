
declare module 'react-leaflet' {
  import { Map as LeafletMap, LatLngBounds, LatLngExpression, MapOptions, PointExpression } from 'leaflet';
  import * as React from 'react';

  export interface MapContainerProps extends MapOptions {
    center: LatLngExpression;
    zoom: number;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    id?: string;
    bounds?: LatLngBounds;
    whenCreated?: (map: LeafletMap) => void;
    whenReady?: () => void;
  }

  export class MapContainer extends React.Component<MapContainerProps> {}
  export class TileLayer extends React.Component<any> {}
  export class Marker extends React.Component<any> {}
  export class Popup extends React.Component<any> {}
  export class Polyline extends React.Component<any> {}
  export class Circle extends React.Component<any> {}
  export class Rectangle extends React.Component<any> {}
  export class Tooltip extends React.Component<any> {}
  
  export function useMap(): LeafletMap;
  export function useMapEvents(map: LeafletMap, events: Record<string, (...args: any[]) => void>): LeafletMap;
}
