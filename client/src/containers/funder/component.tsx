import React from 'react';

import Wrapper from 'containers/wrapper';

import FundersList from './list';
import FunderOverview from './overview';

const Funder = () => {
  return (
    <Wrapper>
      <div className="space-y-16 pt-10 pb-20">
        <FunderOverview />
        <FundersList />
      </div>
    </Wrapper>
  );
};

export default Funder;
