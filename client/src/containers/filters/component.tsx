import React from 'react';

import FilterList from './list';

interface FiltersProps {
  moreFilters?: boolean;
  type: string;
}

const Filters = ({ moreFilters, type }: FiltersProps) => {
  return <FilterList moreFilters={moreFilters} type={type} />;
};

export default Filters;
