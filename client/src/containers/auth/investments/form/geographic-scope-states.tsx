'use client';

import { ComponentProps, useEffect } from 'react';

import { Field as FieldRFF, useForm, useFormState } from 'react-final-form';

import { useSubGeographics } from 'hooks/geographics';

import { MultiSelect, Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';

export default function GeographicScopeStatesSelector() {
  const {
    values: { countries: countriesFormValues },
  } = useFormState<InvestmentSchema>();

  const { change, getFieldState } = useForm();

  const stateFieldState = getFieldState('state_id');
  const dirty = stateFieldState?.dirty;

  const { data: countries } = useSubGeographics(
    {
      filters: { geographic: 'countries' },
    },
    {
      select: ({ data }) => data,
    },
  );

  const isUSA = countries
    .filter((country) => countriesFormValues.includes(country.id))
    .some((country) => country.code === 'USA');

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
      change('states', undefined);
    }
  }, [dirty, isUSA, change]);

  return (
    <FieldRFF<InvestmentSchema['states']> name="states">
      {({ input }) => (
        <div className="space-y-2">
          <MultiSelect
            id="state_id"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={statesOptions}
            values={input.value}
            loading={statesFetching && !statesFetched}
            onSelect={input.onChange}
            disabled={!isUSA}
          />
          <ErrorField<InvestmentSchema> name="states" />
        </div>
      )}
    </FieldRFF>
  );
}
