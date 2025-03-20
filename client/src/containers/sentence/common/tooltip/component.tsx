import React from 'react';

import cx from 'classnames';

import Tooltip from 'components/tooltip';

import { SentenceTooltipProps } from './types';

const SentenceTooltip: React.FC<SentenceTooltipProps> = ({ text, list = [], prefix }) => {
  return (
    <>
      {prefix}
      <Tooltip
        enabled={!!list.length}
        trigger="click"
        placement="bottom"
        arrowProps={{
          enabled: true,
          size: 8,
          className: 'bg-white',
        }}
        content={
          <div className="pointer-events-auto flex max-h-full max-w-xs flex-col rounded border border-grey-0/5 bg-white py-2.5 text-grey-20 shadow-xl">
            <div className="overflow-y-auto overflow-x-hidden pl-2.5 pr-5">
              <ul className="space-y-2">
                {list.map((i) => (
                  <li key={i.id} className="text-sm">
                    {i.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      >
        <span
          className={cx({
            'text-grey-0': true,
            'cursor-pointer hover:underline': list.length > 1,
          })}
        >
          {text}
        </span>
      </Tooltip>
    </>
  );
};

export default SentenceTooltip;
