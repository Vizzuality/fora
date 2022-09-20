import { useCallback } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useCapitalTypes } from 'hooks/capital-types';

import FilterList from 'components/filters/list';
import { arrayValidator, composeValidators } from 'components/forms/validations';

export const CapitalTypes = () => {
  const { data: capitalTypesData } = useCapitalTypes();

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
        input.onChange(capitalTypesData.map((s) => s.id));
      } else {
        input.onChange([]);
      }
    },
    [capitalTypesData]
  );

  return (
    <FieldRFF name="capitalTypes" validate={composeValidators([arrayValidator])}>
      {({ input }) => {
        return (
          <FilterList
            title="Capital types"
            name="capitalTypes"
            columns={1}
            data={capitalTypesData}
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

export default CapitalTypes;
