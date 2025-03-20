import React from 'react';

import Wrapper from 'containers/wrapper';

import Charts from './charts';
import Table from './table';

const ReportTotals = () => {
  return (
    <section className="bg-white py-16">
      <Wrapper>
        <h2 className="max-w-xl font-display text-3xl">Explore projects and funders totals</h2>
      </Wrapper>

      <Table />

      <Charts />
    </section>
  );
};

export default ReportTotals;
