import React, { useCallback } from 'react';

import { useGeographies, Marker } from 'react-simple-maps';

import cx from 'classnames';

import { useAppSelector } from 'store/hooks';

import CHROMA from 'chroma-js';
import { geoCentroid } from 'd3-geo';
import { Feature, MultiPolygon, Polygon } from 'geojson';
import { max } from 'lodash';

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

const RegionsView = ({ data, onClick, onMouseEnter, onMouseLeave, onMouseMove }: ViewProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { subgeographics } = filters;

  const parseGeographies = useCallback(
    (geos) => {
      const COLOR_SCALE = CHROMA.scale(MAP_RAMP);
      const MAX = max(data.map((d) => d.count)) || 0;

      return geos.map((geo: Feature<Polygon | MultiPolygon>) => {
        const { id } = geo.properties;
        const count = data.find((d) => d.id === id)?.count || 0;
        const COLOR = COLOR_SCALE(1 - count / MAX);
        const luminance = COLOR.luminance();
        const selected = !subgeographics.length || subgeographics.includes(id);

        const STYLES = getStyles(COLOR, selected, count);

        return {
          ...geo,
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
    parseGeographies,
  });

  return (
    <g>
      {/* Polygons */}
      {geographies.map((geo) => {
        const { count } = geo.properties;

        return (
          <Geography
            key={geo.rsmKey}
            geo={geo}
            {...(!!count && { onClick, onMouseEnter, onMouseLeave, onMouseMove })}
          />
        );
      })}

      {geographies.map((geo) => {
        const { code, name, luminance, selected } = geo.properties;
        const centroid = CUSTOM_CENTROIDS[code] || geoCentroid(geo);

        return (
          <g key={geo.rsmKey + '-name'}>
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
          </g>
        );
      })}
    </g>
  );
};

export default RegionsView;
