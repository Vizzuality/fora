import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { DurationGranInvestment } from '@/containers/auth/investments/form/types';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';

const DurationOptions: ComponentProps<typeof Select>['options'] = [
  {
    label: 'One Year',
    value: DurationGranInvestment.OneYear,
  },
  {
    label: 'Multi-year',
    value: DurationGranInvestment.MultiYear,
  },
  {
    label: 'Other',
    value: DurationGranInvestment.Other,
  },
];

export default function DurationGranInvestmentSelector() {
  const {
    values: { grant_duration: GranDurationFormValue },
  } = useFormState<InvestmentSchema>();

  return (
    <FieldRFF<InvestmentSchema['grant_duration']>
      name="grant_duration"
      defaultValue={GranDurationFormValue}
    >
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="grant_duration"
            placeholder="Select a duration"
            theme="gray"
            size="base"
            options={DurationOptions}
            value={input.value}
            onSelect={input.onChange}
          />
          <ErrorField<InvestmentSchema> name="grant_duration" />
        </div>
      )}
    </FieldRFF>
  );
}
