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
    format: formatDollar,
  },
  {
    id: 'total_grants',
    label: 'Total grants (USD)',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet',
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
