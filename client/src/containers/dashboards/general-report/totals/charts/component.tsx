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

const META = {
  total_projects_capital_types: {
    description:
      'Sum of all projects filtered by capital type and year of investment (==year of report)',
  },
  total_projects_demographics: {
    description:
      'Sum of all projects filtered by demographic focus and year of investment (==year of report)',
  },
  total_funders_capital_types: {
    description:
      'Sum of all funders filtered by capital type and year of investment (==year of report)',
  },
  total_funders_demographics: {
    description:
      'Sum of all funders filtered by demographic focus and year of investment (==year of report)',
  },
  total_funders_funder_types: {
    description:
      'Sum of all funders filtered by organization type and year of investment (==year of report)',
  },
  total_funders_capital_acceptances: {
    description:
      'Sum of all funders filtered by capital acceptance and year of investment (==year of report)',
  },
  total_projects_recipient_legal_statuses: {
    description:
      'Sum of all projects filtered by project legal status and year of investment (==year of report)',
  },
};
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
              description={META[widget.slug]?.description}
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
