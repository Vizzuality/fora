'use client';

import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useDemographics } from 'hooks/demographics';

import { ProjectSchema } from 'containers/my-projects/form/validations';

import { MultiSelect, Select } from 'components/forms';

export default function DemographicsSelector() {
  const {
    data: demographics,
    isFetching: demographicsFetching,
    isFetched: demographicsFetched,
  } = useDemographics();

  const demographicsOptions: ComponentProps<typeof Select>['options'] =
    demographics?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<ProjectSchema['leadership_demographics']> name="leadership_demographics">
      {({ input }) => (
        <MultiSelect
          id="leadership_demographics"
          placeholder="Select all that apply"
          theme="light"
          size="base"
          options={demographicsOptions}
          values={input.value}
          loading={demographicsFetching && !demographicsFetched}
          onSelect={input.onChange}
        />
      )}
    </FieldRFF>
  );
}
