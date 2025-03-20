import { FC, useCallback, useState } from 'react';

import cx from 'classnames';

import Icon from 'components/icon';

import CHEVRON_DOWN_SVG from 'svgs/ui/chevron-down.svg?sprite';

import SortableList from './sortable/list';
import type { LegendProps } from './types';

export const Legend: FC<LegendProps> = ({
  children,
  className = '',
  maxHeight,
  onChangeOrder,
}: LegendProps) => {
  const [active, setActive] = useState(true);

  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <div
      className={cx({
        'flex grow flex-col rounded-3xl bg-white': true,
        [className]: !!className,
      })}
    >
      <button
        type="button"
        className="font-heading relative flex w-full items-center space-x-2 px-5 py-3 text-xs uppercase"
        onClick={onToggleActive}
      >
        <span>Legend</span>

        <Icon
          icon={CHEVRON_DOWN_SVG}
          className={cx({
            'absolute top-1/2 right-5 h-3 w-3 -translate-y-1/2 transform text-blue-500 transition-transform':
              true,
            'rotate-180': active,
          })}
        />
      </button>

      {active && (
        <div
          className="relative flex grow flex-col overflow-hidden rounded-3xl"
          style={{
            maxHeight,
          }}
        >
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-4 w-full bg-gradient-to-b from-white via-white" />
          <div className="overflow-y-auto overflow-x-hidden">
            <SortableList onChangeOrder={onChangeOrder}>{children}</SortableList>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-3 w-full bg-gradient-to-t from-white via-white" />
        </div>
      )}
    </div>
  );
};

export default Legend;
