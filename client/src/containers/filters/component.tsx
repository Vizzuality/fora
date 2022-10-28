import React from 'react';

import FilterList from './list';

const Filters = ({ moreFilters, type }) => {
  return <FilterList moreFilters={moreFilters} type={type} />;
};

export default Filters;
