import React from 'react';

import FilterList from './list';

interface FiltersProps {
  type: string;
}

const Filters = ({ type }: FiltersProps) => {
  return <FilterList type={type} />;
};

export default Filters;
