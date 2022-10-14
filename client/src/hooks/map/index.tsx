import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';

import type { UseMapProjectionProps } from './types';

const proj = geoAlbersUsaTerritories().scale(1050).translate([400, 250]);

export function useMapProjection({ view = 'regions' }: UseMapProjectionProps) {
  switch (view) {
    case 'regions':
      return {
        projection: proj,
      };
    case 'states':
      return {
        projection: proj,
      };
    case 'national':
      return {
        projection: proj,
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
        projection: proj,
      };
  }
}
