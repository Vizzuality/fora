import { FC, useMemo } from 'react';

import CHROMA from 'chroma-js';
import { scaleLinear, scaleOrdinal } from 'd3-scale';

import { VISUALIZATION_RAMP } from 'constants/colors';

import type { HorizontalBarChartProps } from './types';

export const HorizontalBarChart: FC<HorizontalBarChartProps> = ({
  data,
  onPathMouseClick,
  onPathMouseEnter,
  onPathMouseLeave,
}: HorizontalBarChartProps) => {
  // SIZES
  const VALUE_DOMAIN = useMemo(() => {
    const values = data.map((d) => d.value);
    return [0, Math.max(...values)];
  }, [data]);
  const VALUE_SCALE = scaleLinear(VALUE_DOMAIN, [0, 1]);

  // COLOR
  const CHROMA_COLOR_SCALE = CHROMA.scale(VISUALIZATION_RAMP);

  const COLOR_DOMAIN = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const COLOR_RANGE = useMemo(() => {
    const ramp = [...VISUALIZATION_RAMP];
    if (data.length < ramp.length) {
      return ramp.slice(0, data.length);
    }
    return CHROMA_COLOR_SCALE.colors(data.length) as string[];
  }, [CHROMA_COLOR_SCALE, data]);

  const COLOR_SCALE = scaleOrdinal(COLOR_DOMAIN, COLOR_RANGE);

  return (
    <ul className="space-y-2.5">
      {data.map((d) => (
        <li className="flex items-center justify-end" key={d.id}>
          <div
            className="h-3 origin-right rounded-xl hover:scale-y-105"
            style={{
              width: `${VALUE_SCALE(d.value) * 100}%`,
              backgroundColor: COLOR_SCALE(d.id),
            }}
            onClick={() => onPathMouseClick(d)}
            onMouseEnter={() => onPathMouseEnter(d)}
            onMouseLeave={() => onPathMouseLeave(d)}
          />
        </li>
      ))}
    </ul>
  );
};

export default HorizontalBarChart;
