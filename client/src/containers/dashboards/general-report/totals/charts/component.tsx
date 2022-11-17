import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useWidgets } from 'hooks/widgets';

import Widget from 'containers/widget';
import Wrapper from 'containers/wrapper';

const SLUGS = [
  'total_projects_capital_types',
  'total_projects_demographics',
  'total_funders_capital_types',
  'total_funders_demographics',
  'total_funders_funder_types',
  'total_funders_capital_acceptances',
  'total_projects_recipient_legal_statuses',
];

const ReportTotalsCharts = () => {
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
              config={{ type: 'pie', className: 'bg-grey-60' }}
              params={{ filters }}
            />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ReportTotalsCharts;
