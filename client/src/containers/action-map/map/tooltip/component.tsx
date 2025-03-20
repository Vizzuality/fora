import { createElement, useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { RegionsTooltip, StatesTooltip, CountriesTooltip } from 'containers/action-map/map/views';

import Tooltip from 'components/tooltip';

const TOOLTIPS = {
  regions: RegionsTooltip,
  states: StatesTooltip,
  countries: CountriesTooltip,
};
export interface MapTooltipProps {
  rect: DOMRect;
  properties: Record<string, any>;
}

const MapTooltip = ({ rect, properties = {} }: MapTooltipProps) => {
  const { view } = useAppSelector((state) => state['/action-map']);

  const CONTENT = useMemo(() => {
    if (!TOOLTIPS[view]) return null;
    return createElement(TOOLTIPS[view], { properties });
  }, [view, properties]);

  if (!CONTENT) return null;

  return (
    <Tooltip
      virtual
      virtualDOMRect={rect}
      arrowProps={{
        enabled: true,
        size: 8,
        className: 'bg-white',
      }}
      content={
        <div className="pointer-events-none w-[200px] rounded border border-grey-0/5 bg-white p-5 text-grey-20 shadow-xl">
          {CONTENT}
        </div>
      }
    />
  );
};

export default MapTooltip;
