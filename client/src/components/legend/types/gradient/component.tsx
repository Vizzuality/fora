import { FC } from 'react';

import cx from 'classnames';

import type { LegendTypeGradientProps } from './types';

export const LegendTypeGradient: FC<LegendTypeGradientProps> = ({
  className = '',
  items,
}: LegendTypeGradientProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    <div
      className="flex w-full h-3 rounded-lg"
      style={{
        backgroundImage: `linear-gradient(to right, ${items.map((i) => i.color).join(',')})`,
      }}
    />

    <ul className="flex justify-between w-full mt-1">
      {items
        .filter(({ value }) => !!value)
        .map(({ value }) => (
          <li key={`${value}`} className="text-sm font-bold shrink-0">
            {value}
          </li>
        ))}
    </ul>
  </div>
);

export default LegendTypeGradient;
