'use client';

import { ComponentProps, useEffect } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useSubGeographics } from 'hooks/geographics';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { useFunderForm } from '@/containers/auth/details/form';
import { FunderSchema } from '@/containers/auth/details/form/validations';

export default function PrimaryOfficeStateSelector() {
  const { getState } = useFunderForm();
  const {
    values: { primary_office_country_id: countryId },
  } = getState();

  const { change, getFieldState } = useFunderForm();

  const stateFieldState = getFieldState('primary_office_state_id');
  const dirty = stateFieldState?.dirty;

  const { data: countries } = useSubGeographics(
    {
      filters: { geographic: 'countries' },
    },
    {
      select: ({ data }) => data,
    },
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
    },
  );

  const statesOptions: ComponentProps<typeof Select>['options'] =
    states?.map(({ id, name }) => ({ value: id, label: name })) || [];

  useEffect(() => {
    if (dirty && !isUSA) {
      change('primary_office_state_id', undefined);
    }
  }, [dirty, isUSA, change]);

  return (
    <FieldRFF<FunderSchema['primary_office_state_id']> name="primary_office_state_id">
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="primary_office_state_id"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={statesOptions}
            value={input.value}
            loading={statesFetching && !statesFetched}
            onSelect={input.onChange}
            disabled={!isUSA}
          />
          <ErrorField<FunderSchema> name="primary_office_state_id" />
        </div>
      )}
    </FieldRFF>
  );
}
