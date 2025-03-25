import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';
import { useCapitalTypes } from '@/hooks/capital-types';

export default function CapitalTypeSelector() {
  const {
    data: capitalTypes,
    isFetching: capitalTypesFetching,
    isFetched: capitalTypesFetched,
  } = useCapitalTypes();

  const {
    values: { capital_type: capitalTypeFormValue },
  } = useFormState<InvestmentSchema>();

  const capitalTypeOptions: ComponentProps<typeof Select>['options'] =
    capitalTypes?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<InvestmentSchema['capital_type']>
      name="capital_type"
      defaultValue={capitalTypeFormValue}
    >
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="capital_type"
            placeholder="Select all that apply"
            theme="gray"
            size="base"
            options={capitalTypeOptions}
            value={input.value}
            loading={capitalTypesFetching && !capitalTypesFetched}
            onSelect={input.onChange}
          />
          <ErrorField<InvestmentSchema> name="capital_type" />
        </div>
      )}
    </FieldRFF>
  );
}
