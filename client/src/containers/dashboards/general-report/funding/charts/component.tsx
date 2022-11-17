import React, { useMemo } from 'react';

import { formatDollar } from 'lib/formats';

import { useAppSelector } from 'store/hooks';

import { useWidgets } from 'hooks/widgets';

import Widget from 'containers/widget';
import Wrapper from 'containers/wrapper';

const SLUGS = [
  'funded_demographics',
  'funded_funder_types',
  'funded_capital_types',
  'funded_recipient_legal_statuses',
];

const ReportFundingCharts = () => {
  const { filters } = useAppSelector((state) => state['/dashboards/general-report']);

  const { data: widgetsData } = useWidgets({
    filters,
  });

  const WIDGETS = useMemo(() => {
    if (!widgetsData) return [];

    return widgetsData.filter((widget) => SLUGS.includes(widget.slug));
  }, [widgetsData]);

  return (
    <Wrapper>
      <div className="grid grid-cols-12 gap-6">
        {WIDGETS.map((widget) => (
          <div key={widget.id} className="col-span-12 md:col-span-6">
            <Widget
              {...widget}
              config={{
                type: 'horizontal-bar',
                className: 'bg-white',
                format: (v) =>
                  formatDollar(v, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }),
              }}
              params={{ filters }}
            />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ReportFundingCharts;
