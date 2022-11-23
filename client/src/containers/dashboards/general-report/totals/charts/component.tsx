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
    title: (
      <>
        Total number of <span className="font-semibold">projects</span> per{' '}
        <span className="font-semibold">capital type</span>
      </>
    ),
    description:
      'Sum of all projects filtered by capital type and year of investment (==year of report)',
  },
  total_projects_demographics: {
    title: (
      <>
        Total number of <span className="font-semibold">projects</span> per{' '}
        <span className="font-semibold">demographic focus</span>
      </>
    ),
    description:
      'Sum of all projects filtered by demographic focus and year of investment (==year of report)',
  },
  total_funders_capital_types: {
    title: (
      <>
        Total number of <span className="font-semibold">funders</span> per{' '}
        <span className="font-semibold">capital type</span>
      </>
    ),
    description:
      'Sum of all funders filtered by capital type and year of investment (==year of report)',
  },
  total_funders_demographics: {
    title: (
      <>
        Total number of <span className="font-semibold">funders</span> per{' '}
        <span className="font-semibold">demographic focus</span>
      </>
    ),
    description:
      'Sum of all funders filtered by demographic focus and year of investment (==year of report)',
  },
  total_funders_funder_types: {
    title: (
      <>
        Total number of <span className="font-semibold">funders</span> per{' '}
        <span className="font-semibold">organization type</span>
      </>
    ),
    description:
      'Sum of all funders filtered by organization type and year of investment (==year of report)',
  },
  total_funders_capital_acceptances: {
    title: (
      <>
        Total number of <span className="font-semibold">funders</span> per{' '}
        <span className="font-semibold">capital acceptance</span>
      </>
    ),
    description:
      'Sum of all funders filtered by capital acceptance and year of investment (==year of report)',
  },
  total_projects_recipient_legal_statuses: {
    title: (
      <>
        Total number of <span className="font-semibold">projects</span> per{' '}
        <span className="font-semibold">legal status</span>
      </>
    ),
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
              title={META[widget.slug]?.title || widget.title}
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
