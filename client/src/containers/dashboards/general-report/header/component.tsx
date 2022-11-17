import React from 'react';

import Wrapper from 'containers/wrapper';

const ReportHeader = () => {
  return (
    <header className="pt-20">
      <Wrapper>
        <div className="space-y-5">
          <h2 className="max-w-2xl text-4xl font-display">
            General Report <strong>2021</strong>
          </h2>
          <h3 className="max-w-2xl text-2xl font-display">
            Discover the state of FORA and understand how FORA members fund looking and how each
            area of focus is funded.
          </h3>
        </div>
      </Wrapper>
    </header>
  );
};

export default ReportHeader;
