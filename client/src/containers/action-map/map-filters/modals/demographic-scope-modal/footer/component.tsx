import React from 'react';

import { useForm } from 'react-final-form';

import FilterModalFooter from 'components/filters/modal/footer';
interface DemographicScopeFooterProps {
  onClose?: () => void;
}

const DemographicScopeFooter: React.FC<DemographicScopeFooterProps> = ({ onClose }) => {
  const form = useForm();
  const { values } = form.getState();
  const { demographics } = values;

  return <FilterModalFooter disabled={!demographics.length} onClose={onClose} />;
};

export default DemographicScopeFooter;
