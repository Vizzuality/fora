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
  type: 'funder' | 'project';
  count: number;
}

const InfoCard = ({ data, count, type }: InfoCardProps) => {
  return (
    <div className="space-y-8 bg-green-80 p-12">
      <div>
        <p className="font-semibold uppercase">{type === 'funder' ? 'funding' : 'funded by'}</p>
        <p className="font-display text-4xl">{count}</p>
        <p className="font-semibold capitalize">{type === 'funder' ? 'projects' : 'funders'}</p>
      </div>

      <dl className="">
        {data.map(({ id, title, info, value }) => (
          <div key={id} className="border-t border-grey-40/40 py-4">
            <span className="inline-flex items-center text-base font-semibold uppercase">
              <dt className="whitespace-nowrap pr-2 uppercase">{title}</dt>
              <Tooltip
                arrowProps={{
                  enabled: true,
                  size: 6,
                  className: 'bg-grey-60',
                }}
                content={
                  <div className="max-w-xs rounded border border-grey-0/5 bg-grey-60 p-2.5 text-grey-20 shadow-xl">
                    <span>{info}</span>
                  </div>
                }
              >
                <div className="h-3.5 w-3.5 rounded-full bg-grey-0">
                  <Icon
                    icon={INFO_SVG}
                    className={cx({
                      'h-3.5 w-3.5 text-green-80': true,
                    })}
                  />
                </div>
              </Tooltip>
            </span>
            <dd className="capitalize">{value || 'None'}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default InfoCard;
