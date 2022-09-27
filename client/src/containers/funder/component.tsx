import React from 'react';

import Wrapper from 'containers/wrapper';

import FundersList from './list';
import FunderOverview from './overview';

const Funder = () => {
  return (
    <Wrapper>
      <div className="pb-20 space-y-16">
        <FunderOverview />
        <FundersList />
      </div>
    </Wrapper>
  );
};

export default Funder;
