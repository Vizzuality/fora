import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useSubGeographics } from 'hooks/geographics';

import { MultiSelect, Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { FunderSchema } from '@/containers/auth/details/form/validations';

export default function GeographicScopeCountriesSelector() {
  const {
    data: countries,
    isFetching: countriesFetching,
    isFetched: countriesFetched,
  } = useSubGeographics(
    {
      filters: { geographic: 'countries' },
    },
    {
      select: ({ data }) => data,
    },
  );

  const countriesOptions: ComponentProps<typeof Select>['options'] =
    countries?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<FunderSchema['countries']> name="countries">
      {({ input }) => (
        <div className="space-y-2">
          <MultiSelect
            id="countries"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={countriesOptions}
            values={input.value}
            loading={countriesFetching && !countriesFetched}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="countries" />
        </div>
      )}
    </FieldRFF>
  );
}
