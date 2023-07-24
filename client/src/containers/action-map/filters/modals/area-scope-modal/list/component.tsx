import { useCallback } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { usePlausible } from 'next-plausible';

import { useAreas } from 'hooks/areas';

import FilterList from 'components/filters/list';
import { arrayValidator, composeValidators } from 'components/forms/validations';

export const AreaScopeList = () => {
  const { data: areasData } = useAreas();
  const plausible = usePlausible();

  const handleToogleArea = useCallback((id, input) => {
    const selection = [...input.value];

    if (selection.includes(id)) {
      const index = selection.indexOf(id);
      selection.splice(index, 1);
    } else {
      selection.push(id);
    }

    input.onChange(selection);
  }, []);

  const handleAllAreas = useCallback(
    (id, input) => {
      if (id === 'select-all') {
        input.onChange(areasData.map((s) => s.id));
      } else {
        input.onChange([]);

        plausible('Map - Reset filters', {
          props: {
            filterId: `${id}`,
            filterName: `${input.name}`,
          },
        });
      }
    },
    [areasData, plausible]
  );

  return (
    <FieldRFF name="areas" validate={composeValidators([arrayValidator])}>
      {({ input }) => {
        return (
          <FilterList
            data={areasData}
            name="areas"
            columns={3}
            selected={input.value}
            onChange={(id) => handleToogleArea(id, input)}
            onSelectAll={() => handleAllAreas('select-all', input)}
            onClearAll={() => handleAllAreas('clear-all', input)}
          />
        );
      }}
    </FieldRFF>
  );
};

export default AreaScopeList;
