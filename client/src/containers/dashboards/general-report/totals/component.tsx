import React from 'react';

import Wrapper from 'containers/wrapper';

import Charts from './charts';

const ReportTotals = () => {
  return (
    <section className="py-16 bg-white">
      <Wrapper>
        <div className="space-y-5">
          <h2 className="max-w-xl text-3xl font-display">Explore projects and funders totals</h2>
          <h3 className="max-w-2xl text-2xl font-display">
            Total number of projects and funders per Area of Focus
          </h3>
        </div>
      </Wrapper>

      <Charts />
    </section>
  );
};

export default ReportTotals;
