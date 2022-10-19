import React, { useCallback } from 'react';

import { useGeographies, Geography } from 'react-simple-maps';

import rewind from '@turf/rewind';

import DATA from './data.json';

const NationalView = () => {
  const parseGeographies = useCallback((geos) => {
    return geos.map((geo) => {
      return {
        ...rewind(geo, { reverse: true }),
      };
    });
  }, []);

  const { geographies } = useGeographies({
    geography: DATA,
    parseGeographies,
  });

  return (
    <g>
      {/* Polygons */}
      {geographies.map((geo) => (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          style={{
            default: {
              fill: '#e3ebc4',
              stroke: '#FFF',
              strokeWidth: 0.75,
              outline: 'none',
            },
            hover: {
              fill: '#e3ebc4',
              stroke: '#FFF',
              strokeWidth: 0.75,
              outline: 'none',
            },
            pressed: {
              fill: '#e3ebc4',
              stroke: '#FFF',
              strokeWidth: 0.75,
              outline: 'none',
            },
          }}
        />
      ))}
    </g>
  );
};

export default NationalView;
