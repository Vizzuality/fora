import React, { useCallback } from 'react';

import Checkbox from 'components/forms/checkbox';

import type { FilterListItemProps } from './types';

const FilterListItem: React.FC<FilterListItemProps> = ({ id, label, name, selected, onChange }) => {
  const handleChange = useCallback(() => {
    onChange(id);
  }, [id, onChange]);

  return (
    <div className="group flex cursor-pointer break-inside-avoid-column">
      <Checkbox
        className="mt-[3px] h-3.5 w-3.5 cursor-pointer group-hover:opacity-75"
        id={`form-checkbox-${name}-${id}`}
        theme="dark"
        checked={selected}
        onChange={handleChange}
      />
      <label
        htmlFor={`form-checkbox-${name}-${id}`}
        className="grow cursor-pointer pl-2 font-normal capitalize text-grey-0 group-hover:underline"
      >
        {label}
      </label>
    </div>
  );
};

export default FilterListItem;
