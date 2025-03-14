import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { useDemographics } from 'hooks/demographics';

import { ProjectSchema } from 'containers/auth/projects/form/validations';

import { MultiSelect, Select } from 'components/forms';

import ErrorField from '@/components/forms/error-field';

export default function DemographicsSelector() {
  const {
    data: demographics,
    isFetching: demographicsFetching,
    isFetched: demographicsFetched,
  } = useDemographics();

  const {
    values: { leadership_demographics: demographicsFormValues },
  } = useFormState<ProjectSchema>();

  const demographicsOptions: ComponentProps<typeof Select>['options'] =
    demographics?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<ProjectSchema['leadership_demographics']>
      name="leadership_demographics"
      defaultValue={demographicsFormValues}
    >
      {({ input }) => (
        <div className="space-y-2">
          <MultiSelect
            id="leadership_demographics"
            placeholder="Select all that apply"
            theme="gray"
            size="base"
            options={demographicsOptions}
            values={input.value}
            loading={demographicsFetching && !demographicsFetched}
            onSelect={input.onChange}
          />
          <ErrorField<ProjectSchema> name="leadership_demographics" />
        </div>
      )}
    </FieldRFF>
  );
}
