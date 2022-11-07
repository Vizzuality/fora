import React, { useMemo } from 'react';

import { useForm } from 'react-final-form';

import FilterModalFooter from 'components/filters/modal/footer';

interface MoreFiltersFooterProps {
  type: string;
  onClose?: () => void;
}

const MoreFiltersFooter: React.FC<MoreFiltersFooterProps> = ({ type, onClose }) => {
  const form = useForm();
  const { values } = form.getState();
  const { funderTypes, funderLegalStatuses, capitalTypes, recipientLegalStatuses } = values;

  const DISABLED = useMemo(() => {
    if (type === 'funders') {
      return !funderTypes.length || !funderLegalStatuses.length || !capitalTypes.length;
    }

    if (type === 'projects') {
      return !recipientLegalStatuses.length;
    }
  }, [type, funderTypes, funderLegalStatuses, capitalTypes, recipientLegalStatuses]);

  return <FilterModalFooter disabled={DISABLED} onClose={onClose} />;
};

export default MoreFiltersFooter;
