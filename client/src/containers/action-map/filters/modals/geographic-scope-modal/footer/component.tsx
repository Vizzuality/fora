import React from 'react';

import { useForm } from 'react-final-form';

import FilterModalFooter from 'components/filters/modal/footer';

interface GeographicScopeFooterProps {
  onClose?: () => void;
}

const GeographicScopeFooter: React.FC<GeographicScopeFooterProps> = ({ onClose }) => {
  const form = useForm();
  const { values } = form.getState();
  const { geographic, subgeographics } = values;

  return (
    <FilterModalFooter
      disabled={!subgeographics.length && geographic !== 'national'}
      onClose={onClose}
    />
  );
};

export default GeographicScopeFooter;
