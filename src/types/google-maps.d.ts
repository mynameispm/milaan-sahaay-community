
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, options?: MapOptions);
      setMap(map: Map | null): void;
      getCenter(): LatLng;
      setCenter(center: LatLng | LatLngLiteral): void;
      getZoom(): number;
      setZoom(zoom: number): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
      addControl(control: MVCObject, position?: ControlPosition): void;
      scrollZoom: {
        disable(): void;
        enable(): void;
      };
      easeTo(options: {center: LatLng, duration: number, easing: (n: number) => number}): void;
      setFog(options: any): void;
      on(event: string, callback: Function): void;
      getStyle(): any;
    }
    
    class Marker extends MVCObject {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng | LatLngLiteral): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
      getPosition(): LatLng;
      setAnimation(animation: any): void;
    }
    
    class InfoWindow extends MVCObject {
      constructor(opts?: InfoWindowOptions);
      open(options: { anchor: Marker, map: Map, shouldFocus?: boolean }): void;
      setContent(content: string | Node): void;
      close(): void;
    }
    
    class Geocoder {
      geocode(
        request: { location: LatLng | LatLngLiteral } | { address: string },
        callback: (results: GeocoderResult[], status: string) => void
      ): void;
    }
    
    interface GeocoderResult {
      address_components: GeocoderAddressComponent[];
      formatted_address: string;
      geometry: GeocoderGeometry;
      place_id: string;
      types: string[];
    }
    
    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }
    
    interface GeocoderGeometry {
      location: LatLng;
      location_type: string;
      viewport: LatLngBounds;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
      toJSON(): LatLngLiteral;
    }
    
    class LatLngBounds {
      constructor(sw?: LatLng, ne?: LatLng);
      extend(latLng: LatLng): LatLngBounds;
      getCenter(): LatLng;
      getNorthEast(): LatLng;
      getSouthWest(): LatLng;
    }
    
    class MVCObject {
      addListener(eventName: string, handler: Function): MapsEventListener;
    }
    
    class MVCArray<T> {
      clear(): void;
      getArray(): T[];
      getAt(i: number): T;
      getLength(): number;
      insertAt(i: number, elem: T): void;
      removeAt(i: number): T;
      setAt(i: number, elem: T): void;
      push(elem: T): number;
      pop(): T;
    }
    
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      clickableIcons?: boolean;
      zoom?: number;
      disableDefaultUI?: boolean;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
      styles?: Array<MapTypeStyle>;
    }
    
    interface MapTypeStyle {
      featureType?: string;
      elementType?: string;
      stylers?: Array<any>;
    }
    
    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      animation?: any;
      icon?: string | Icon | Symbol;
    }
    
    interface Icon {
      url: string;
      size?: Size;
      origin?: Point;
      anchor?: Point;
      scaledSize?: Size;
    }
    
    interface Symbol {
      path: any;
      fillColor?: string;
      fillOpacity?: number;
      scale?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    }
    
    interface InfoWindowOptions {
      content?: string | Node;
      position?: LatLng | LatLngLiteral;
    }
    
    class Point {
      constructor(x: number, y: number);
      x: number;
      y: number;
      equals(other: Point): boolean;
    }
    
    class Size {
      constructor(width: number, height: number);
      width: number;
      height: number;
      equals(other: Size): boolean;
    }
    
    interface MapsEventListener {
      remove(): void;
    }
    
    class NavigationControl {
      constructor(options?: { visualizePitch?: boolean });
    }

    enum ControlPosition {
      TOP_LEFT,
      TOP_CENTER,
      TOP,
      TOP_RIGHT,
      LEFT_CENTER,
      LEFT_TOP,
      LEFT,
      LEFT_BOTTOM,
      BOTTOM_LEFT,
      BOTTOM_CENTER,
      BOTTOM,
      BOTTOM_RIGHT,
      RIGHT_BOTTOM,
      RIGHT,
      RIGHT_CENTER,
      RIGHT_TOP,
    }
    
    enum SymbolPath {
      BACKWARD_CLOSED_ARROW,
      BACKWARD_OPEN_ARROW,
      CIRCLE,
      FORWARD_CLOSED_ARROW,
      FORWARD_OPEN_ARROW,
    }
    
    enum Animation {
      BOUNCE,
      DROP,
    }
  }
}
