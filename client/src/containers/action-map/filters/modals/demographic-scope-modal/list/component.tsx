import { useCallback } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { usePlausible } from 'next-plausible';

import { useDemographics } from 'hooks/demographics';

import FilterList from 'components/filters/list';
import { arrayValidator, composeValidators } from 'components/forms/validations';

export const DemographicScopeList = () => {
  const { data: demographicsData } = useDemographics();
  const plausible = usePlausible();

  const handleToogleDemographic = useCallback((id, input) => {
    const selection = [...input.value];

    if (selection.includes(id)) {
      const index = selection.indexOf(id);
      selection.splice(index, 1);
    } else {
      selection.push(id);
    }

    input.onChange(selection);
  }, []);

  const handleAllDemographics = useCallback(
    (id, input) => {
      if (id === 'select-all') {
        input.onChange(demographicsData.map((s) => s.id));
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
    [demographicsData, plausible]
  );

  return (
    <FieldRFF name="demographics" validate={composeValidators([arrayValidator])}>
      {({ input }) => {
        return (
          <FilterList
            data={demographicsData}
            name="demographics"
            columns={2}
            selected={input.value}
            onChange={(id) => handleToogleDemographic(id, input)}
            onSelectAll={() => handleAllDemographics('select-all', input)}
            onClearAll={() => handleAllDemographics('clear-all', input)}
          />
        );
      }}
    </FieldRFF>
  );
};

export default DemographicScopeList;
