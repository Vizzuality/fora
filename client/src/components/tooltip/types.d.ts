import { PropsWithChildren } from 'react';

import { Placement } from '@floating-ui/react-dom-interactions';

export interface TooltipProps extends PropsWithChildren {
  content: JSX.Element;
  enabled?: boolean;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  virtual?: boolean;
  virtualDOMRect?: DOMRect;
  arrowProps?: {
    enabled?: boolean;
    size: number;
    className?: string;
  };
  portalProps?: {
    enabled?: boolean;
    id?: string;
    root?: HTMLElement;
  };
}
