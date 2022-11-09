import React from 'react';

import Wrapper from 'containers/wrapper';

import Charts from './charts';

const ReportFunding = () => {
  return (
    <section className="py-16 bg-grey-60">
      <Wrapper>
        <div className="space-y-5">
          <h2 className="max-w-xl text-3xl font-display">Find out how FORA members fund</h2>
          <h3 className="max-w-2xl text-2xl font-display">Amount funded towards Area of Focus</h3>
        </div>
      </Wrapper>

      <Charts />
    </section>
  );
};

export default ReportFunding;
