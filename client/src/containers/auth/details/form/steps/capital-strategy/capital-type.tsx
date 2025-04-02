import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { MultiSelect } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { useCapitalTypes } from '@/hooks/capital-types';

export default function CapitalTypeSelector() {
  const {
    data: capitalTypes,
    isFetching: capitalTypesFetching,
    isFetched: capitalTypesFetched,
  } = useCapitalTypes();

  const {
    values: { capital_types: capitalTypesFormValue },
  } = useFormState<FunderSchema>();

  const capitalTypeOptions: ComponentProps<typeof MultiSelect>['options'] =
    capitalTypes?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<FunderSchema['capital_types']>
      name="capital_types"
      defaultValue={capitalTypesFormValue}
    >
      {({ input }) => (
        <div className="space-y-2">
          <MultiSelect
            id="capital_types"
            placeholder="Select all that apply"
            theme="gray"
            size="base"
            options={capitalTypeOptions}
            values={input.value}
            loading={capitalTypesFetching && !capitalTypesFetched}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="capital_types" />
        </div>
      )}
    </FieldRFF>
  );
}
