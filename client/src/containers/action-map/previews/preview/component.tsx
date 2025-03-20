import React from 'react';

import Icon from 'components/icon';

import CHEVRON_LEFT from 'svgs/ui/chevron-left.svg?sprite';
import CHEVRON_RIGHT from 'svgs/ui/chevron-right.svg?sprite';

import type { PreviewProps } from './types';

const Preview: React.FC<PreviewProps> = ({ children, onNext, onPrevious }) => {
  return (
    <div className="relative flex min-h-0 grow flex-col">
      <div className="pointer-events-none absolute top-0 left-0 z-20 flex h-full w-full items-center justify-end">
        <div className="translate-x-1/2 space-y-6">
          <button
            type="button"
            aria-label="arrow-right"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border-black bg-black transition-colors hover:bg-green-0"
            onClick={onNext}
          >
            <Icon className="w-2.5 translate-x-px fill-white" icon={CHEVRON_RIGHT} />
          </button>

          <button
            type="button"
            aria-label="arrow-left"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border-black bg-black transition-colors hover:bg-green-0"
            onClick={onPrevious}
          >
            <Icon className="w-2.5 -translate-x-px fill-white" icon={CHEVRON_LEFT} />
          </button>
        </div>
      </div>
      <div className="grow overflow-auto px-9">
        <div className="pt-24 pb-8">{children}</div>
      </div>
    </div>
  );
};

export default Preview;
