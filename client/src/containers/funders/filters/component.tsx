import React from 'react';

import FilterList from './list';

const Filters = ({ moreFilters }) => {
  return (
    <div className="flex items-center justify-between">
      <FilterList moreFilters={moreFilters} />
    </div>
  );
};

export default Filters;
