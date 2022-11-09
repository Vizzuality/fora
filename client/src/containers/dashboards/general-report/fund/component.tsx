import React from 'react';

import { useAppSelector } from 'store/hooks';

import { useWidgets } from 'hooks/widgets';

import Widget from 'containers/widget';
import Wrapper from 'containers/wrapper';

const ReportFund = () => {
  const { filters } = useAppSelector((state) => state['/dashboards/general-report']);

  const { data: widgetsData } = useWidgets({
    filters,
  });

  console.log(widgetsData);

  return (
    <section className="py-14 bg-grey-60">
      <Wrapper>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <Widget
              title="Horizontal Bar Chart 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet"
              id="general-report-horizontal-bar-chart-1"
              slug="general-report-horizontal-bar-chart-1"
              widget_type="diagram"
              report_pages="general_report"
              report_year={2021}
              config={{
                type: 'horizontal-bar',
                className: 'bg-white',
              }}
              params={{ filters }}
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ReportFund;
