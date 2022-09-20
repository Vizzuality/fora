import { FC, useCallback, useMemo, useState } from 'react';

import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import CHROMA from 'chroma-js';
import { scaleOrdinal } from 'd3-scale';
import { motion } from 'framer-motion';

import { VISUALIZATION_RAMP } from 'constants/colors';

import type { PieChartProps } from './types';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export const PieChart: FC<PieChartProps> = ({
  data,
  width,
  height,
  margin = defaultMargin,
  onPathMouseClick,
  onPathMouseEnter,
  onPathMouseLeave,
}: PieChartProps) => {
  const [hover, setHover] = useState<string | null>(null);

  // SIZES
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const thickness = 40;

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

  // Getters
  const getValue = useCallback((d: any) => d.value, []);
  const getColor = useCallback((d: any) => COLOR_SCALE(d.data.id), [COLOR_SCALE]);
  const getInnerRadius = useCallback(
    (d: any) => {
      if (d.data.id === hover) {
        return radius - thickness - 5;
      }
      return radius - thickness;
    },
    [radius, thickness, hover]
  );

  const getOuterRadius = useCallback(
    (d: any) => {
      if (d.data.id === hover) {
        return radius + 5;
      }

      return radius;
    },
    [radius, hover]
  );

  return (
    <svg width={width} height={height}>
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={data}
          pieValue={getValue}
          innerRadius={getInnerRadius}
          outerRadius={getOuterRadius}
          padAngle={0.015}
          cornerRadius={0}
          startAngle={0}
        >
          {(pie) => {
            return pie.arcs.map((arc) => (
              <motion.path
                key={arc.data.id}
                d={pie.path(arc)}
                fill={getColor(arc)}
                animate={{
                  d: pie.path(arc),
                }}
                transition={{
                  duration: 0.1,
                }}
                onClick={() => {
                  if (onPathMouseClick) onPathMouseClick(arc.data);
                }}
                onMouseEnter={() => {
                  setHover(arc.data.id);
                  if (onPathMouseEnter) onPathMouseEnter(arc.data);
                }}
                onMouseLeave={() => {
                  setHover(null);
                  if (onPathMouseLeave) onPathMouseLeave(arc.data);
                }}
              />
            ));
          }}
        </Pie>
      </Group>
    </svg>
  );
};

export default PieChart;
