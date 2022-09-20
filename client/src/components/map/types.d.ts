import type { ViewState, MapProps, FitBoundsOptions, MapboxMap } from 'react-map-gl';

export type Bounds = {
  bbox: [number, number, number, number];
  options?: FitBoundsOptions;
  viewportOptions?: Partial<ViewState>;
};

export interface CustomMapProps extends MapProps {
  /** A function that returns the map instance */
  children?: (map: MapboxMap) => React.ReactNode;

  /** Custom css class for styling */
  className?: string;

  /** An object that defines the viewport
   * @see https://visgl.github.io/react-map-gl/docs/api-reference/map#initialviewstate
   */
  viewState?: Partial<ViewState>;

  /** An object that defines the bounds */
  bounds?: Bounds;

  /** A function that exposes when the map is mounted.
   * It receives and object with the `mapRef` and `mapContainerRef` reference. */
  onMapReady?: ({ map, mapContainer }) => void;

  /** A function that exposes when the map is loaded.
   * It receives and object with the `mapRef` and `mapContainerRef` reference. */
  onMapLoad?: ({ map, mapContainer }) => void;

  /** A function that exposes the viewport */
  onMapViewStateChange?: (viewport: Partial<ViewState>) => void;
}
