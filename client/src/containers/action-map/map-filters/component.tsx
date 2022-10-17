import React from 'react';

import Wrapper from 'containers/wrapper';

import MapFilterList from './list';
import MapFilterTabs from './tabs';

const MapFilters = () => {
  return (
    <div className="border border-grey-40/30">
      <Wrapper>
        <div className="flex items-center justify-between divide-x divide-solid divide-grey-40/30">
          <MapFilterTabs />
          <MapFilterList />
        </div>
      </Wrapper>
    </div>
  );
};

export default MapFilters;
