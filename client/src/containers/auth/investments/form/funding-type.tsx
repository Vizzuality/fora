import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';
import { useFundingTypes } from '@/hooks/funding-types';

export default function FundingTypeSelector() {
  const {
    data: fundingTypes,
    isFetching: fundingTypesFetching,
    isFetched: fundingTypesFetched,
  } = useFundingTypes();

  const {
    values: { funding_type: fundingTypeFormValue },
  } = useFormState<InvestmentSchema>();

  const fundingTypeOptions: ComponentProps<typeof Select>['options'] =
    fundingTypes?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<InvestmentSchema['funding_type']>
      name="funding_type"
      defaultValue={fundingTypeFormValue}
    >
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="funding_type"
            placeholder="Select all that apply"
            theme="gray"
            size="base"
            options={fundingTypeOptions}
            value={input.value}
            loading={fundingTypesFetching && !fundingTypesFetched}
            onSelect={input.onChange}
          />
          <ErrorField<InvestmentSchema> name="funding_type" />
        </div>
      )}
    </FieldRFF>
  );
}
