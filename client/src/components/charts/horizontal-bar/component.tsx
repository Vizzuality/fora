import { FC, useMemo } from 'react';

import cx from 'classnames';

import { scaleLinear } from 'd3-scale';

import { useColorRamp } from 'hooks/widgets';

import type { HorizontalBarChartProps } from './types';

export const HorizontalBarChart: FC<HorizontalBarChartProps> = ({
  data,
  onPathMouseClick,
  onPathMouseEnter,
  onPathMouseLeave,
  onPathMouseMove,
}: HorizontalBarChartProps) => {
  // SIZES
  const VALUE_DOMAIN = useMemo(() => {
    const values = data.map((d) => d.value);
    return [0, Math.max(...values)];
  }, [data]);
  const VALUE_SCALE = scaleLinear(VALUE_DOMAIN, [0, 1]);

  const COLOR_SCALE = useColorRamp(data);

  return (
    <ul>
      {data.map((d, i) => (
        <li className="flex items-center justify-end" key={d.id}>
          <div
            className={cx({
              'flex items-center justify-end group': true,
              'pt-2.5': i !== 0,
            })}
            style={{
              width: `${VALUE_SCALE(d.value) * 100}%`,
            }}
            onClick={(e) => {
              if (onPathMouseClick) onPathMouseClick(e, d);
            }}
            onMouseEnter={(e) => {
              if (onPathMouseEnter) onPathMouseEnter(e, d);
            }}
            onMouseLeave={(e) => {
              if (onPathMouseLeave) onPathMouseLeave(e, d);
            }}
            onMouseMove={(e) => {
              if (onPathMouseMove) onPathMouseMove(e, d);
            }}
          >
            <div
              className="w-full h-3 transition-transform origin-right rounded-xl group-hover:scale-y-125"
              style={{
                backgroundColor: COLOR_SCALE(d.id),
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HorizontalBarChart;
