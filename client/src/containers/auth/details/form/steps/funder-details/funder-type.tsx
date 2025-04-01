import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { useFunderTypes } from '@/hooks/funder-types';

export default function FunderTypeSelector() {
  const {
    data: funderTypes,
    isFetching: funderTypesFetching,
    isFetched: funderTypesFetched,
  } = useFunderTypes();

  const {
    values: { funder_type: funderTypeFormValue },
  } = useFormState<FunderSchema>();

  const funderTypesOptions: ComponentProps<typeof Select>['options'] =
    funderTypes?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<FunderSchema['funder_type']> name="funder_type" defaultValue={funderTypeFormValue}>
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="funder_type"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={funderTypesOptions}
            loading={funderTypesFetching && !funderTypesFetched}
            value={input.value}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="funder_type" />
        </div>
      )}
    </FieldRFF>
  );
}
