import React from 'react';

import Button from 'components/button';
import FilterWarning from 'components/filters/warning';

interface FilterModalFooterProps {
  disabled: boolean;
  onClose?: () => void;
}

const FilterModalFooter: React.FC<FilterModalFooterProps> = ({ disabled, onClose }) => {
  return (
    <footer className="px-10 space-y-5">
      <div className="flex justify-center space-x-5">
        <Button theme="black-alt" size="base" className="w-full lg:w-44" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          theme="black"
          size="base"
          className="w-full lg:w-44"
          disabled={disabled}
        >
          Save
        </Button>
      </div>
      <FilterWarning text="Please, select at least one option before saving." visible={disabled} />
    </footer>
  );
};

export default FilterModalFooter;
