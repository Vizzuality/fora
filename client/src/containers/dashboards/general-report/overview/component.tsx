import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useWidgets } from 'hooks/widgets';

import Widget from 'containers/widget';
import Wrapper from 'containers/wrapper';

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
        <Widget {...WIDGET} params={{ filters }} />
      </Wrapper>
    </section>
  );
};

export default ReportOverview;
