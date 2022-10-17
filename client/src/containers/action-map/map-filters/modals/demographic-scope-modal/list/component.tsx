import { useCallback } from 'react';

import { Field as FieldRFF, useForm } from 'react-final-form';

import { useDemographics } from 'hooks/demographics';

import FilterList from 'components/filters/list';
import FilterWarning from 'components/filters/warning';
import { arrayValidator, composeValidators } from 'components/forms/validations';

export const DemographicScopeList = () => {
  const form = useForm();
  const { values } = form.getState();
  const { demographics } = values;

  const { data: demographicsData } = useDemographics();

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
      }
    },
    [demographicsData]
  );

  return (
    <>
      <FilterWarning
        text="Please, select at least one option before saving."
        visible={!demographics.length}
      />

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
    </>
  );
};

export default DemographicScopeList;
