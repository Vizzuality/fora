import React from 'react';

import type { FilterWarningProps } from './types';

const FilterWarning: React.FC<FilterWarningProps> = ({ text, visible }) => {
  if (!visible) return null;

  return (
    <div className="px-10 pt-8">
      <div className="inline-flex px-5 py-2 text-left border rounded-lg border-red-0 bg-red-0/10 text-red-0">
        {text}
      </div>
    </div>
  );
};

export default FilterWarning;
