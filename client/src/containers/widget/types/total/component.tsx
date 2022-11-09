import React, { useMemo } from 'react';

import cx from 'classnames';

import { Widget } from 'types/widget';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

const TOTALS = [
  {
    id: 'total_funders',
    label: 'Total number of FORA members',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet',
    value: '-',
  },
  {
    id: 'total_projects',
    label: 'Total number of projects',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet',
    value: '-',
  },
  {
    id: 'total_capital',
    label: 'Total capital (USD)',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet',
    value: '-',
  },
  {
    id: 'total_grants',
    label: 'Total grants (USD)',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet',
    value: '-',
  },
];
const WidgetTotal = ({ slug, query }: Widget) => {
  const { data } = query;

  const TOTALS_DATA = useMemo(() => {
    if (!data) return TOTALS;

    const { data: d } = data;

    return d.headers.map((header, index) => {
      const total = TOTALS.find((t) => t.id === header.value);

      return {
        id: header.value,
        ...total,
        ...header,
        ...d.values[index],
      };
    });
  }, [data]);

  return (
    <dl id={slug} className="grid grid-cols-12 gap-6">
      {TOTALS_DATA.map((total) => (
        <div key={total.id} className="col-span-12 md:col-span-6">
          <div className="py-3.5 px-10 bg-grey-60 space-y-1">
            <dt className="flex items-center space-x-2 text-base font-semibold uppercase text-grey-20">
              <span>{total.label}</span>

              <Tooltip
                arrowProps={{
                  enabled: true,
                  size: 6,
                  className: 'bg-white',
                }}
                content={
                  <div className="max-w-xs p-2.5 bg-white border rounded shadow-xl pointer-events-none text-grey-20 border-grey-0/5">
                    <span>{total.info}</span>
                  </div>
                }
              >
                <div className="w-3.5 h-3.5 rounded-full bg-grey-20/30">
                  <Icon
                    icon={INFO_SVG}
                    className={cx({
                      'w-3.5 h-3.5 text-grey-20': true,
                    })}
                  />
                </div>
              </Tooltip>
            </dt>
            <dd className="text-4xl text-grey-0 font-display">{total.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
};

export default WidgetTotal;
