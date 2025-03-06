'use client';

import { ComponentProps, useEffect } from 'react';

import { Field as FieldRFF, useForm, useFormState } from 'react-final-form';

import { useSubGeographics } from 'hooks/geographics';

import { ProjectSchema } from 'containers/my-projects/form/validations';

import { Select } from 'components/forms';

export default function PrimaryOfficeStateSelector() {
  const {
    values: { country_id: countryId },
  } = useFormState<ProjectSchema>();

  const { change, getFieldState } = useForm();

  const stateFieldState = getFieldState('state_id');
  const dirty = stateFieldState?.dirty;

  const { data: countries } = useSubGeographics(
    {
      filters: { geographic: 'countries' },
    },
    {
      select: ({ data }) => data,
    }
  );

  const isUSA = countries.find(({ id }) => id === countryId)?.code === 'USA';

  const {
    data: states,
    isFetching: statesFetching,
    isFetched: statesFetched,
  } = useSubGeographics(
    {
      filters: { geographic: 'states' },
    },
    {
      select: ({ data }) => data,
    }
  );

  const statesOptions: ComponentProps<typeof Select>['options'] =
    states?.map(({ id, name }) => ({ value: id, label: name })) || [];

  useEffect(() => {
    if (dirty && !isUSA) {
      change('state_id', undefined);
    }
  }, [dirty, isUSA, change]);

  return (
    <FieldRFF<ProjectSchema['name']> name="state_id">
      {({ input }) => (
        <Select
          id="state_id"
          placeholder="Select an option"
          theme="gray"
          size="base"
          options={statesOptions}
          value={input.value}
          loading={statesFetching && !statesFetched}
          onSelect={input.onChange}
          disabled={!isUSA}
        />
      )}
    </FieldRFF>
  );
}
