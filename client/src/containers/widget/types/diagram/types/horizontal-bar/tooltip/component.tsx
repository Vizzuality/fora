import { Widget } from '@/types/api/widget';
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
        <div className="pointer-events-none w-[160px] space-y-1 rounded border border-grey-0/5 bg-white p-5 text-grey-20 shadow-xl">
          <div className="text-sm font-semibold uppercase">{properties.label}</div>
          <div className="text-sm font-bold text-grey-0">{format(properties.value)}</div>
        </div>
      }
    />
  );
};

export default HorizonalBarTooltip;
