import { Widget } from 'types/widget';

import Tooltip from 'components/tooltip';

export interface HorizonalBarTooltipProps {
  rect: DOMRect;
  properties: Record<string, any>;
  config: Widget['config'];
}

const HorizonalBarTooltip = ({ rect, properties = {}, config }: HorizonalBarTooltipProps) => {
  const { format } = config;

  const isVisible = rect && properties;

  if (!isVisible) return null;

  return (
    <Tooltip
      virtual
      virtualDOMRect={rect}
      arrowProps={{
        enabled: true,
        size: 8,
        className: 'bg-white',
      }}
      middlewares={{
        offset: true,
        flip: true,
        shift: true,
        size: false,
      }}
      content={
        <div className="w-[160px] p-5 bg-white border rounded shadow-xl pointer-events-none text-grey-20 border-grey-0/5 space-y-1">
          <div className="text-sm font-semibold uppercase">{properties.label}</div>
          <div className="text-sm font-bold text-grey-0">{format(properties.value)}</div>
        </div>
      }
    />
  );
};

export default HorizonalBarTooltip;
