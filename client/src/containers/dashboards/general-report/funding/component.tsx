import React from 'react';

import Wrapper from 'containers/wrapper';

import Charts from './charts';
import Table from './table';

const ReportFunding = () => {
  return (
    <section className="py-16 bg-grey-60">
      <Wrapper>
        <h2 className="max-w-xl text-3xl font-display">Find out how FORA members fund</h2>
      </Wrapper>

      <Table />

      <Charts />
    </section>
  );
};

export default ReportFunding;
