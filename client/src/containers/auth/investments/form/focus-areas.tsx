import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { MultiSelect, Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';
import { useAreas } from '@/hooks/areas';

export default function FocusAreasSelector() {
  const { data: areas, isFetching: areasFetching, isFetched: areasFetched } = useAreas();

  const {
    values: { areas: areasFormValues },
  } = useFormState<InvestmentSchema>();

  const areasOptions: ComponentProps<typeof Select>['options'] =
    areas?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<InvestmentSchema['areas']> name="areas" defaultValue={areasFormValues}>
      {({ input }) => (
        <div className="space-y-2">
          <MultiSelect
            id="areas"
            placeholder="Select all that apply"
            theme="gray"
            size="base"
            options={areasOptions}
            values={input.value}
            loading={areasFetching && !areasFetched}
            onSelect={input.onChange}
          />
          <ErrorField<InvestmentSchema> name="areas" />
        </div>
      )}
    </FieldRFF>
  );
}
