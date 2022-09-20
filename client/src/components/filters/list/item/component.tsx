import React, { useCallback } from 'react';

import Checkbox from 'components/forms/checkbox';

import type { FilterListItemProps } from './types';

const FilterListItem: React.FC<FilterListItemProps> = ({ id, label, name, selected, onChange }) => {
  const handleChange = useCallback(() => {
    onChange(id);
  }, [id, onChange]);

  return (
    <div className="flex cursor-pointer break-inside-avoid-column group">
      <Checkbox
        className="mt-[3px] cursor-pointer group-hover:opacity-75 h-3.5 w-3.5"
        id={`form-checkbox-${name}-${id}`}
        theme="dark"
        checked={selected}
        onChange={handleChange}
      />
      <label
        htmlFor={`form-checkbox-${name}-${id}`}
        className="pl-2 font-normal capitalize cursor-pointer text-grey-0 group-hover:underline grow"
      >
        {label}
      </label>
    </div>
  );
};

export default FilterListItem;
