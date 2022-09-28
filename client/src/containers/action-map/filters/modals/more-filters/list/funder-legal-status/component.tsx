import { useCallback } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useFunderLegalStatuses } from 'hooks/funder-legal-statuses';

import FilterList from 'components/filters/list';
import { arrayValidator, composeValidators } from 'components/forms/validations';

export const FunderLegalStatus = () => {
  const { data: funderLegalStatusData } = useFunderLegalStatuses();

  const handleToogle = useCallback((id, input) => {
    const selection = [...input.value];

    if (selection.includes(id)) {
      const index = selection.indexOf(id);
      selection.splice(index, 1);
    } else {
      selection.push(id);
    }

    input.onChange(selection);
  }, []);

  const handleAll = useCallback(
    (id, input) => {
      if (id === 'select-all') {
        input.onChange(funderLegalStatusData.map((s) => s.id));
      } else {
        input.onChange([]);
      }
    },
    [funderLegalStatusData]
  );

  return (
    <FieldRFF name="funderLegalStatus" validate={composeValidators([arrayValidator])}>
      {({ input }) => {
        return (
          <FilterList
            title="Funder legal status"
            name="funderLegalStatus"
            columns={1}
            data={funderLegalStatusData}
            selected={input.value}
            onChange={(id) => handleToogle(id, input)}
            onSelectAll={() => handleAll('select-all', input)}
            onClearAll={() => handleAll('clear-all', input)}
          />
        );
      }}
    </FieldRFF>
  );
};

export default FunderLegalStatus;
