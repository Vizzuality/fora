'use client';

import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useSubGeographics } from 'hooks/geographics';

import { ProjectSchema } from 'containers/auth/projects/form/validations';

import { Select } from 'components/forms';

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
    <FieldRFF<ProjectSchema['name']> name="country_id">
      {({ input }) => (
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
      )}
    </FieldRFF>
  );
}
