import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useSubGeographics } from 'hooks/geographics';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { FunderSchema } from '@/containers/auth/details/form/validations';

export default function PrimaryOfficeCountrySelector() {
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
    <FieldRFF<FunderSchema['primary_office_country_id']> name="primary_office_country_id">
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="primary_office_country_id"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={countriesOptions}
            value={input.value}
            loading={countriesFetching && !countriesFetched}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="primary_office_country_id" />
        </div>
      )}
    </FieldRFF>
  );
}
