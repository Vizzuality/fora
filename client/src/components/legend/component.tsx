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
        'bg-white rounded-3xl flex flex-col grow': true,
        [className]: !!className,
      })}
    >
      <button
        type="button"
        className="relative flex items-center w-full px-5 py-3 space-x-2 text-xs uppercase font-heading"
        onClick={onToggleActive}
      >
        <span>Legend</span>

        <Icon
          icon={CHEVRON_DOWN_SVG}
          className={cx({
            'absolute w-3 h-3 transition-transform transform -translate-y-1/2 text-blue-500 top-1/2 right-5':
              true,
            'rotate-180': active,
          })}
        />
      </button>

      {active && (
        <div
          className="relative flex flex-col overflow-hidden grow rounded-3xl"
          style={{
            maxHeight,
          }}
        >
          <div className="absolute top-0 left-0 z-10 w-full h-4 pointer-events-none bg-gradient-to-b from-white via-white" />
          <div className="overflow-x-hidden overflow-y-auto">
            <SortableList onChangeOrder={onChangeOrder}>{children}</SortableList>
          </div>
          <div className="absolute bottom-0 left-0 z-10 w-full h-3 pointer-events-none bg-gradient-to-t from-white via-white" />
        </div>
      )}
    </div>
  );
};

export default Legend;
