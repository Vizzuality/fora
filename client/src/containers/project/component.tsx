import React from 'react';

import Wrapper from 'containers/wrapper';

import ProjectList from './list';
import ProjectOverview from './overview';

const Project = () => {
  return (
    <Wrapper>
      <div className="space-y-16 pt-10 pb-20">
        <ProjectOverview />
        <ProjectList />
      </div>
    </Wrapper>
  );
};

export default Project;
