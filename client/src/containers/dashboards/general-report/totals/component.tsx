import React from 'react';

import Wrapper from 'containers/wrapper';

import Charts from './charts';
import Table from './table';

const ReportTotals = () => {
  return (
    <section className="py-16 bg-white">
      <Wrapper>
        <h2 className="max-w-xl text-3xl font-display">Explore projects and funders totals</h2>
      </Wrapper>

      <Table />

      <Charts />
    </section>
  );
};

export default ReportTotals;
