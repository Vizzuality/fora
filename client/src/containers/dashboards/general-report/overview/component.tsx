import React, { useMemo } from 'react';

import { formatDollar } from 'lib/formats';

import { useAppSelector } from 'store/hooks';

import { useWidgets } from 'hooks/widgets';

import Widget from 'containers/widget';
import Wrapper from 'containers/wrapper';

const META = [
  {
    id: 'total_funders',
    label: 'Total number of FORA members',
    info: 'The total number of FORA members that have funded/invested in projects -authorized for public disclosure of financial data- in a given year.',
    value: '-',
  },
  {
    id: 'total_projects',
    label: 'Total number of projects',
    info: 'The total number of projects funded by FORA members in a given year. Only projects authorized for public disclosure of financial data are included.',
    value: '-',
  },
  {
    id: 'total_capital',
    label: 'Total capital (USD)',
    info: 'Cumulated amount of capital deployed by all FORA members during a given year. This quantity includes grants and re-grants',
    value: '-',
    format: formatDollar,
  },
  {
    id: 'total_grants',
    label: 'Total grants (USD)',
    info: 'Cumulated amount of capital deployed by all FORA members in grants and re-grants during a given year',
    value: '-',
    format: formatDollar,
  },
];
const ReportOverview = () => {
  const { filters } = useAppSelector((state) => state['/dashboards/general-report']);

  const { data: widgetsData } = useWidgets({
    filters,
  });

  const WIDGET = useMemo(() => {
    if (!widgetsData) {
      return null;
    }

    return widgetsData.find((widget) => widget.slug === 'summary');
  }, [widgetsData]);

  return (
    <section className="py-10">
      <Wrapper>
        <Widget
          {...WIDGET}
          config={{
            meta: META,
          }}
          params={{ filters }}
        />
      </Wrapper>
    </section>
  );
};

export default ReportOverview;
