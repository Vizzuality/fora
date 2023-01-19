import React, { useMemo } from 'react';

import cx from 'classnames';

import { Widget } from 'types/widget';

import Icon from 'components/icon';
import Loading from 'components/loading';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

const WidgetTotal = ({ slug, config, query }: Widget) => {
  const { data, isFetching, isFetched } = query;
  const { meta } = config;

  const TOTALS_DATA = useMemo(() => {
    if (!data) return meta;

    const { data: d } = data;

    // Get values
    const d1 = d.headers.map((header, index) => {
      const [values] = d.values;
      const total = meta.find((t) => t.id === header.value);

      return {
        id: header.value,
        ...total,
        ...header,
        ...values[index],
      };
    });

    // Parse values
    return d1.map((v) => {
      const { format } = meta.find((t) => t.id === v.id);

      return {
        ...v,
        ...(format && { value: format(v.value, { maximumSignificantDigits: 3 }) }),
      };
    });
  }, [data, meta]);

  return (
    <div className="relative">
      <Loading
        visible={isFetching && !isFetched}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/90"
        iconClassName="w-10 h-10"
      />

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
    </div>
  );
};

export default WidgetTotal;
