import React, { useCallback } from 'react';

import { useGeographies } from 'react-simple-maps';

import { useAppSelector } from 'store/hooks';

import rewind from '@turf/rewind';
import CHROMA from 'chroma-js';
import { max, min } from 'lodash';

import { useSubGeographics } from 'hooks/geographics';

import { MAP_RAMP } from 'constants/colors';

import Geography from 'containers/action-map/map/geography';
import { getStyles } from 'containers/action-map/map/utils';
import type { ViewProps } from 'containers/action-map/map/views/types';

import DATA from './data.json';

const CountriesView = ({ data, onClick, onMouseEnter, onMouseLeave, onMouseMove }: ViewProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { geographic, subgeographics } = filters;

  const { data: subgeographicData } = useSubGeographics({
    filters: { geographic, only_active: true },
  });

  const parseGeographies = useCallback(
    (geos) => {
      const COLOR_SCALE = CHROMA.scale(MAP_RAMP);

      const MIN = min(data.map((d) => d.count)) || 0;
      const MAX = max(data.map((d) => d.count)) || 0;

      return geos.map((geo) => {
        const { abbreviation } = geo.properties;
        const count = data.find((d) => d.id === abbreviation)?.count || 0;

        const VALUE = MAX === MIN ? 0.75 : 1 - count / MAX;
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
    geography: DATA,
    parseGeographies,
  });

  return (
    <g>
      {/* Polygons */}
      {geographies.map((geo) => {
        const active = !!subgeographicData.find((d) => d.id === geo.properties.abbreviation);
        return (
          <Geography
            key={geo.rsmKey}
            geo={geo}
            {...(active && { onClick, onMouseEnter, onMouseLeave, onMouseMove })}
          />
        );
      })}
    </g>
  );
};

export default CountriesView;
