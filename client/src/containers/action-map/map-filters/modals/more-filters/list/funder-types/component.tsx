import { useCallback } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useFunderTypes } from 'hooks/funder-types';

import FilterList from 'components/filters/list';
import { arrayValidator, composeValidators } from 'components/forms/validations';

export const FunderTypes = () => {
  const { data: funderTypesData } = useFunderTypes();

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
        input.onChange(funderTypesData.map((s) => s.id));
      } else {
        input.onChange([]);
      }
    },
    [funderTypesData]
  );

  return (
    <FieldRFF name="funderTypes" validate={composeValidators([arrayValidator])}>
      {({ input }) => {
        return (
          <FilterList
            title="Funder types"
            name="funderTypes"
            columns={2}
            data={funderTypesData}
            selected={input.value}
            overflow={false}
            onChange={(id) => handleToogle(id, input)}
            onSelectAll={() => handleAll('select-all', input)}
            onClearAll={() => handleAll('clear-all', input)}
          />
        );
      }}
    </FieldRFF>
  );
};

export default FunderTypes;
