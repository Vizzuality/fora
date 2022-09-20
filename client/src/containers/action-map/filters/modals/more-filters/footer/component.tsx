import React from 'react';

import { useForm } from 'react-final-form';

import Button from 'components/button';

interface MoreFiltersProps {
  onClose?: () => void;
}

const MoreFilters: React.FC<MoreFiltersProps> = ({ onClose }) => {
  const form = useForm();
  const { values } = form.getState();
  const { funderTypes, funderLegalStatus, capitalTypes, projectLegalStatus } = values;

  const DISABLED =
    !funderTypes.length ||
    !funderLegalStatus.length ||
    !capitalTypes.length ||
    !projectLegalStatus.length;

  return (
    <footer className="flex justify-center px-10 space-x-5">
      <Button theme="black-alt" size="xl" className="w-full lg:w-56" onClick={onClose}>
        Cancel
      </Button>

      <Button type="submit" theme="black" size="xl" className="w-full lg:w-56" disabled={DISABLED}>
        Save
      </Button>
    </footer>
  );
};

export default MoreFilters;
