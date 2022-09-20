import React from 'react';

import { useForm } from 'react-final-form';

import Button from 'components/button';
interface GeographicScopeFooterProps {
  onClose?: () => void;
}

const GeographicScopeFooter: React.FC<GeographicScopeFooterProps> = ({ onClose }) => {
  const form = useForm();
  const { values } = form.getState();
  const { geographic, subgeographics } = values;

  return (
    <footer className="flex justify-center px-10 pt-10 space-x-5 border-t border-grey-40">
      <Button theme="black-alt" size="xl" className="w-full lg:w-56" onClick={onClose}>
        Cancel
      </Button>
      <Button
        type="submit"
        theme="black"
        size="xl"
        className="w-full lg:w-56"
        disabled={!subgeographics.length && geographic !== 'national'}
      >
        Save
      </Button>
    </footer>
  );
};

export default GeographicScopeFooter;
