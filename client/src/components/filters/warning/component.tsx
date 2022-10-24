import React from 'react';

import type { FilterWarningProps } from './types';

const FilterWarning: React.FC<FilterWarningProps> = ({ text, visible }) => {
  if (!visible) return null;

  return (
    <div className="px-10">
      <div className="px-5 mx-auto text-center rounded-lg text-red-0">{text}</div>
    </div>
  );
};

export default FilterWarning;
