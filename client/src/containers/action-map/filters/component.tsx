import React from 'react';

import Wrapper from 'containers/wrapper';

import FilterList from './list';
import FilterTabs from './tabs';

const Filters = () => {
  return (
    <div className="border border-grey-40/30">
      <Wrapper>
        <div className="flex items-center justify-between divide-x divide-solid divide-grey-40/30">
          <FilterTabs />
          <FilterList />
        </div>
      </Wrapper>
    </div>
  );
};

export default Filters;
