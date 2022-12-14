import { FC } from 'react';

import cx from 'classnames';

import type { LegendItemProps } from './types';

export const LegendItem: FC<LegendItemProps> = ({
  id,
  name,
  description,
  icon,
  children,
}: LegendItemProps) => (
  <div key={id} className="py-2.5 px-5">
    <div className="flex mb-1">
      <div
        className={cx({
          relative: true,
          'pl-5': icon,
        })}
      >
        {icon && <div className="absolute top-0 left-0">{icon}</div>}
        <div className="text-base font-heading">{name}</div>
      </div>
    </div>

    {description && <div className="text-sm text-grey-0">{description}</div>}

    {children && <div className="mt-2.5">{children}</div>}
  </div>
);

export default LegendItem;
