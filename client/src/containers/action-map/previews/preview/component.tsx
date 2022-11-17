import React from 'react';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import type { PreviewProps } from './types';

const Preview: React.FC<PreviewProps> = ({ onClose, children }) => {
  return (
    <div className="absolute top-0 left-0 z-10 flex flex-col w-full h-full bg-white border border-grey-40">
      <button
        className="absolute right-0 w-10 h-10 top-2 text-grey-40 hover:text-grey-20"
        type="button"
        onClick={onClose}
      >
        <Icon icon={CLOSE_SVG} className="w-6 h-6" />
      </button>
      <div className="overflow-auto px-9 grow">
        <div className="pt-16 pb-8">{children}</div>
      </div>
    </div>
  );
};

export default Preview;
