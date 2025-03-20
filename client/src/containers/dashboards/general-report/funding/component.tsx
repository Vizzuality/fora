import React from 'react';

import Wrapper from 'containers/wrapper';

import Charts from './charts';
import Table from './table';

const ReportFunding = () => {
  return (
    <section className="bg-grey-60 py-16">
      <Wrapper>
        <h2 className="max-w-xl font-display text-3xl">Find out how FORA members fund</h2>
      </Wrapper>

      <Table />

      <Charts />
    </section>
  );
};

export default ReportFunding;
