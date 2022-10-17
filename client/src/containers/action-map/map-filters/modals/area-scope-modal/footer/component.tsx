import React from 'react';

import { useForm } from 'react-final-form';

import FilterModalFooter from 'components/filters/modal/footer';

interface AreaScopeFooterProps {
  onClose?: () => void;
}

const AreaScopeFooter: React.FC<AreaScopeFooterProps> = ({ onClose }) => {
  const form = useForm();
  const { values } = form.getState();
  const { areas } = values;

  return <FilterModalFooter disabled={!areas.length} onClose={onClose} />;
};

export default AreaScopeFooter;
