import React from 'react';

import { useForm } from 'react-final-form';

import Button from 'components/button';

interface DemographicScopeFooterProps {
  onClose?: () => void;
}

const DemographicScopeFooter: React.FC<DemographicScopeFooterProps> = ({ onClose }) => {
  const form = useForm();
  const { values } = form.getState();
  const { demographics } = values;

  return (
    <footer className="flex justify-center px-10 space-x-5">
      <Button theme="black-alt" size="xl" className="w-full lg:w-56" onClick={onClose}>
        Cancel
      </Button>
      <Button
        type="submit"
        theme="black"
        size="xl"
        className="w-full lg:w-56"
        disabled={!demographics.length}
      >
        Save
      </Button>
    </footer>
  );
};

export default DemographicScopeFooter;
