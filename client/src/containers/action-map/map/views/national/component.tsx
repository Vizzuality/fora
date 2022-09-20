import React, { useCallback } from 'react';

import { useGeographies, Geography } from 'react-simple-maps';

import DATA from './data.json';

const NationalView = () => {
  const parseGeographies = useCallback((geos) => {
    return geos;
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
              fill: '#DDD',
              stroke: '#FFF',
              strokeWidth: 0.75,
              outline: 'none',
            },
            hover: {
              fill: '#CCC',
              stroke: '#FFF',
              strokeWidth: 0.75,
              outline: 'none',
            },
            pressed: {
              fill: '#BBB',
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
