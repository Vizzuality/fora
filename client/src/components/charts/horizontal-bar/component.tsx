import { FC, useMemo } from 'react';

import { scaleLinear } from 'd3-scale';

import { useColorRamp } from 'hooks/widgets';

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

  const COLOR_SCALE = useColorRamp(data);

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
            onClick={() => {
              if (onPathMouseClick) onPathMouseClick(d);
            }}
            onMouseEnter={() => {
              if (onPathMouseEnter) onPathMouseEnter(d);
            }}
            onMouseLeave={() => {
              if (onPathMouseLeave) onPathMouseLeave(d);
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default HorizontalBarChart;
