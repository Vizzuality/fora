import React, { useCallback } from 'react';

import { useGeographies } from 'react-simple-maps';

import { useAppSelector } from 'store/hooks';

import CHROMA from 'chroma-js';
import { max } from 'lodash';

import { MAP_RAMP } from 'constants/colors';

import Geography from 'containers/action-map/map/geography';
import { getStyles } from 'containers/action-map/map/utils';
import type { ViewProps } from 'containers/action-map/map/views/types';

import DATA from './data.json';

const CountriesView = ({ data, onClick, onMouseEnter, onMouseLeave, onMouseMove }: ViewProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { subgeographics } = filters;

  const parseGeographies = useCallback(
    (geos) => {
      const COLOR_SCALE = CHROMA.scale(MAP_RAMP);
      const MAX = max(data.map((d) => d.count)) || 0;

      return geos.map((geo) => {
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
    geography: DATA,
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
    </g>
  );
};

export default CountriesView;
