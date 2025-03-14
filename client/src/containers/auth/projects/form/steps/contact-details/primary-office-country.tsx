import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useSubGeographics } from 'hooks/geographics';

import { ProjectSchema } from 'containers/auth/projects/form/validations';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';

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
    }
  );

  const countriesOptions: ComponentProps<typeof Select>['options'] =
    countries?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<ProjectSchema['country_id']> name="country_id">
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="country_id"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={countriesOptions}
            value={input.value}
            loading={countriesFetching && !countriesFetched}
            onSelect={input.onChange}
          />
          <ErrorField<ProjectSchema> name="country_id" />
        </div>
      )}
    </FieldRFF>
  );
}
