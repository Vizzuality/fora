import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { MultiSelect, Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { useFunderForm } from '@/containers/auth/details/form';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { useDemographics } from '@/hooks/demographics';

export default function DemographicsSelector() {
  const {
    data: demographics,
    isFetching: demographicsFetching,
    isFetched: demographicsFetched,
  } = useDemographics();

  const { getState } = useFunderForm();
  const {
    values: { leadership_demographics: demographicsFormValues },
  } = getState();

  const demographicsOptions: ComponentProps<typeof Select>['options'] =
    demographics?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<FunderSchema['demographics']>
      name="demographics"
      defaultValue={demographicsFormValues}
    >
      {({ input }) => (
        <div className="space-y-2">
          <MultiSelect
            id="demographics"
            placeholder="Select all that apply"
            theme="gray"
            size="base"
            options={demographicsOptions}
            values={input.value}
            loading={demographicsFetching && !demographicsFetched}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="demographics" />
        </div>
      )}
    </FieldRFF>
  );
}
