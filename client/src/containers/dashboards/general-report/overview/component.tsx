import React from 'react';

import cx from 'classnames';

import { useWidgets } from 'hooks/widgets';

import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

const TOTALS = [
  {
    id: 'total-1',
    title: 'Total number of members',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet',
    value: 68,
  },
  {
    id: 'total-2',
    title: 'Total number of projects',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet',
    value: 78,
  },
  {
    id: 'total-3',
    title: 'Total capital (USD)',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet',
    value: '43M',
  },
  {
    id: 'total-4',
    title: 'Total grants (USD)',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet',
    value: '27M',
  },
];

const ReportOverview = () => {
  const { data: widgetsData } = useWidgets({
    filters: {
      report_page: 'general_report',
      report_year: 2021,
    },
  });

  console.log(widgetsData);

  return (
    <section className="py-10">
      <Wrapper>
        <dl className="grid grid-cols-12 gap-6">
          {TOTALS.map((total) => (
            <div key={total.id} className="col-span-12 md:col-span-6">
              <div className="py-3.5 px-10 bg-grey-60 space-y-1">
                <dt className="flex items-center space-x-2 text-base font-semibold uppercase text-grey-20">
                  <span>{total.title}</span>

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
      </Wrapper>
    </section>
  );
};

export default ReportOverview;
