import type { UseMapProjectionProps } from './types';

export function useMapProjection({ view = 'regions' }: UseMapProjectionProps) {
  switch (view) {
    case 'regions':
      return {
        projection: 'geoAlbersUsa',
      };
    case 'states':
      return {
        projection: 'geoAlbersUsa',
      };
    case 'national':
      return {
        projection: 'geoAlbersUsa',
      };
    case 'countries':
      return {
        projection: 'geoMercator',
        projectionConfig: {
          scale: (800 / 600) * 100,
          center: [0, 30],
        },
      };
    default:
      return {
        projection: 'geoAlbersUsa',
      };
  }
}
