import React from 'react';

import { useForm } from 'react-final-form';

import FilterModalFooter from 'components/filters/modal/footer';

interface MoreFiltersProps {
  onClose?: () => void;
}

const MoreFilters: React.FC<MoreFiltersProps> = ({ onClose }) => {
  const form = useForm();
  const { values } = form.getState();
  const { funderTypes, funderLegalStatuses, capitalTypes, projectLegalStatuses } = values;

  const DISABLED =
    !funderTypes.length ||
    !funderLegalStatuses.length ||
    !capitalTypes.length ||
    !projectLegalStatuses.length;

  return <FilterModalFooter disabled={DISABLED} onClose={onClose} />;
};

export default MoreFilters;
