import React from 'react';

import Icon from 'components/icon';

import CHEVRON_LEFT from 'svgs/ui/chevron-left.svg?sprite';
import CHEVRON_RIGHT from 'svgs/ui/chevron-right.svg?sprite';

import type { PreviewProps } from './types';

const Preview: React.FC<PreviewProps> = ({ children, onNext, onPrevious }) => {
  return (
    <div className="relative flex flex-col min-h-0 grow">
      <div className="absolute top-0 left-0 z-20 flex items-center justify-end w-full h-full pointer-events-none">
        <div className="space-y-6 translate-x-1/2">
          <button
            type="button"
            aria-label="arrow-right"
            className="flex items-center justify-center transition-colors bg-black border-black rounded-full pointer-events-auto w-9 h-9 hover:bg-green-0"
            onClick={onNext}
          >
            <Icon className="w-2.5 translate-x-px fill-white" icon={CHEVRON_RIGHT} />
          </button>

          <button
            type="button"
            aria-label="arrow-left"
            className="flex items-center justify-center transition-colors bg-black border-black rounded-full pointer-events-auto w-9 h-9 hover:bg-green-0"
            onClick={onPrevious}
          >
            <Icon className="w-2.5 -translate-x-px fill-white" icon={CHEVRON_LEFT} />
          </button>
        </div>
      </div>
      <div className="overflow-auto px-9 grow">
        <div className="pt-24 pb-8">{children}</div>
      </div>
    </div>
  );
};

export default Preview;
