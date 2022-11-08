import React from 'react';

import { useWidgets } from 'hooks/widgets';

import Widget from 'containers/widget';
import Wrapper from 'containers/wrapper';

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
        <Widget
          title="Totals"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet"
          id="general-report-totals"
          slug="general-report-totals"
          widget_type="total"
          report_pages="general_report"
          report_year={2021}
        />
      </Wrapper>
    </section>
  );
};

export default ReportOverview;
