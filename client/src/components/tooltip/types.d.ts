import { PropsWithChildren } from 'react';

import { Placement } from '@floating-ui/react-dom-interactions';
import type { Props as UseClickProps } from '@floating-ui/react-dom-interactions/src/hooks/useClick';
import type { Props as UseHoverProps } from '@floating-ui/react-dom-interactions/src/hooks/useHover';

export interface TooltipProps extends PropsWithChildren {
  content: JSX.Element;
  enabled?: boolean;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  virtual?: boolean;
  virtualDOMRect?: DOMRect;
  middlewares?: {
    flip?: boolean;
    offset?: boolean;
    size?: boolean;
    shift?: boolean;
  };
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
  useHoverProps?: UseHoverProps;
  useClickProps?: UseClickProps;
}
