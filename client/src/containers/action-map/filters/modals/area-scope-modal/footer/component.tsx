import React from 'react';

import { useForm } from 'react-final-form';

import Button from 'components/button';

interface AreaScopeFooterProps {
  onClose?: () => void;
}

const AreaScopeFooter: React.FC<AreaScopeFooterProps> = ({ onClose }) => {
  const form = useForm();
  const { values } = form.getState();
  const { areas } = values;

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
        disabled={!areas.length}
      >
        Save
      </Button>
    </footer>
  );
};

export default AreaScopeFooter;
