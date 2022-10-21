import React from 'react';

import cx from 'classnames';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';
export interface InfoCardProps {
  data: {
    id: string;
    title: string;
    value: string;
    info: string;
    href?: string;
    areas?: {
      id: string;
      name: string;
    }[];
  }[];
  count: number;
}

const InfoCard = ({ data, count }: InfoCardProps) => {
  return (
    <div className="p-12 space-y-8 bg-green-80">
      <div>
        <p className="font-semibold uppercase">funding</p>
        <p className="text-4xl font-display">{count}</p>
        <p className="font-semibold capitalize">projects</p>
      </div>

      <dl className="">
        {data.map(({ id, title, info, value }) => (
          <div key={id} className="py-4 border-t border-grey-40/40">
            <span className="inline-flex items-center text-base font-semibold uppercase">
              <dt className="pr-2 uppercase whitespace-nowrap">{title}</dt>
              <Tooltip
                arrowProps={{
                  enabled: true,
                  size: 6,
                  className: 'bg-grey-60',
                }}
                content={
                  <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                    <span>{info}</span>
                  </div>
                }
              >
                <div className="w-3.5 h-3.5 rounded-full bg-grey-0">
                  <Icon
                    icon={INFO_SVG}
                    className={cx({
                      'w-3.5 h-3.5 text-green-80': true,
                    })}
                  />
                </div>
              </Tooltip>
            </span>
            <dd>{value || 'None'}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default InfoCard;
