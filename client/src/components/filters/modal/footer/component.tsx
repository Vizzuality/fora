import React from 'react';

import Button from 'components/button';
interface FilterModalFooterProps {
  disabled: boolean;
  onClose?: () => void;
}

const FilterModalFooter: React.FC<FilterModalFooterProps> = ({ disabled, onClose }) => {
  return (
    <footer className="flex justify-center px-10 space-x-5">
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
    </footer>
  );
};

export default FilterModalFooter;
