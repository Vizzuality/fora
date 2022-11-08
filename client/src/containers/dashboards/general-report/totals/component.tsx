import React from 'react';

import { useWidgets } from 'hooks/widgets';

import Widget from 'containers/widget';
import Wrapper from 'containers/wrapper';

const ReportTotals = () => {
  const { data: widgetsData } = useWidgets({
    filters: {
      report_page: 'general_report',
      report_year: 2021,
    },
  });

  console.log(widgetsData);

  return (
    <section className="bg-white py-14">
      <Wrapper>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <Widget
              title="Pie Chart 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet"
              id="general-report-horizontal-pie-chart-1"
              slug="general-report-horizontal-pie-chart-1"
              widget_type="diagram"
              report_pages="general_report"
              report_year={2021}
              config={{
                type: 'pie',
                className: 'bg-grey-60',
              }}
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ReportTotals;
