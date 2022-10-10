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
          <div className="max-w-xs py-2.5 bg-white border rounded shadow-xl pointer-events-auto text-grey-20 border-grey-0/5 flex flex-col max-h-full">
            <div className="overflow-x-hidden overflow-y-auto pl-2.5 pr-5">
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
            'hover:underline cursor-pointer': list.length > 1,
          })}
        >
          {text}
        </span>
      </Tooltip>
    </>
  );
};

export default SentenceTooltip;
