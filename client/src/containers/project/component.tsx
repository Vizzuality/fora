import React from 'react';

import Wrapper from 'containers/wrapper';

import FundersList from './list';
import OverviewProject from './overview';

const Project = () => {
  return (
    <Wrapper>
      <div className="pb-20 space-y-16">
        <OverviewProject />
        <FundersList />
      </div>
    </Wrapper>
  );
};

export default Project;
