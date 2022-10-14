import React, { useCallback } from 'react';

import { useGeographies, Marker, Annotation } from 'react-simple-maps';

import cx from 'classnames';

import { useAppSelector } from 'store/hooks';

import rewind from '@turf/rewind';
import CHROMA from 'chroma-js';
import { geoCentroid } from 'd3-geo';
import { Feature, MultiPolygon, Polygon } from 'geojson';
import { max, min } from 'lodash';

import { MAP_RAMP } from 'constants/colors';

import Geography from 'containers/action-map/map/geography';
import { getStyles } from 'containers/action-map/map/utils';
import type { ViewProps } from 'containers/action-map/map/views/types';

import GEOJSON_DATA from './data.json';

const CUSTOM_CENTROIDS = {
  GP: [-96.62508365809394, 41.06310362209291],
  GL: [-88.37310852718723, 45.009902926106584],
  MW: [-110.05535001248772, 44.76449685505863],
  SW: [-112.2815633433324, 36.66408688484569],
  WC: [-120.56771896954999, 44.34787224788226],
};

const OFFSETS = {
  PR: [0, -25],
};

const RegionsView = ({ data, onClick, onMouseEnter, onMouseLeave, onMouseMove }: ViewProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { subgeographics } = filters;

  const parseGeographies = useCallback(
    (geos) => {
      const COLOR_SCALE = CHROMA.scale(MAP_RAMP);
      const MIN = min(data.map((d) => d.count)) || 0;
      const MAX = max(data.map((d) => d.count)) || 0;

      return geos.map((geo: Feature<Polygon | MultiPolygon>) => {
        const { abbreviation } = geo.properties;
        const count = data.find((d) => d.id === abbreviation)?.count || 0;

        const VALUE = MAX === MIN ? 0.6 : 1 - count / MAX;
        const COLOR = COLOR_SCALE(VALUE);
        const luminance = COLOR.luminance();
        const selected = !subgeographics.length || subgeographics.includes(abbreviation);

        const STYLES = getStyles(COLOR, selected, count);

        return {
          ...rewind(geo, { reverse: true }),
          properties: {
            ...geo.properties,
            count,
            luminance,
            selected,
            style: STYLES,
          },
        };
      });
    },
    [data, subgeographics]
  );

  const { geographies } = useGeographies({
    geography: GEOJSON_DATA,
    // geography:
    //   'https://staging.fora.dev-vizzuality.com/sub-path/backend/api/v1/subgeographics/geojson?filter[geographic]=regions',

    parseGeographies,
  });

  return (
    <g>
      {/* Polygons */}
      {geographies.map((geo) => {
        return (
          <Geography
            key={geo.rsmKey}
            geo={geo}
            {...{ onClick, onMouseEnter, onMouseLeave, onMouseMove }}
          />
        );
      })}

      {geographies.map((geo) => {
        const { code, name, luminance, selected } = geo.properties;
        const centroid = CUSTOM_CENTROIDS[code] || geoCentroid(geo);

        return (
          <g key={geo.rsmKey + '-name'}>
            {!OFFSETS[code] && (
              <Marker coordinates={centroid}>
                <foreignObject
                  x={-60}
                  y={-75}
                  width={120}
                  height={150}
                  className="pointer-events-none"
                >
                  <div className="relative flex items-center justify-center h-full text-sm text-center">
                    <div
                      className={cx({
                        'py-0.5 px-2 shadow-md': true,
                        'text-black bg-white/30': !selected,
                        'text-white bg-black/25': !!selected && luminance < 0.5,
                        'text-black bg-white/25': !!selected && luminance >= 0.5,
                      })}
                    >
                      {name}
                    </div>
                  </div>
                </foreignObject>
              </Marker>
            )}

            {OFFSETS[code] && (
              <Annotation
                subject={centroid}
                dx={OFFSETS[code][0]}
                dy={OFFSETS[code][1]}
                connectorProps={{
                  strokeOpacity: 0,
                }}
                className="pointer-events-none"
              >
                <foreignObject
                  x={-75}
                  y={-75}
                  width={150}
                  height={150}
                  className="pointer-events-none"
                >
                  <div className="relative flex items-center justify-center h-full text-sm text-center">
                    <div
                      className={cx({
                        'py-0.5 px-2 text-black': true,
                      })}
                    >
                      {name}
                    </div>
                  </div>
                </foreignObject>
              </Annotation>
            )}
          </g>
        );
      })}
    </g>
  );
};

export default RegionsView;
