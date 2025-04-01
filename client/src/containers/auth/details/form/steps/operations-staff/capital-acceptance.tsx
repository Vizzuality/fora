import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { MultiSelect, Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { useFunderForm } from '@/containers/auth/details/form';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { useCapitalAcceptances } from '@/hooks/capital-acceptances';

export default function CapitalAcceptanceSelector() {
  const {
    data: capitalAcceptances,
    isFetching: capitalAcceptancesFetching,
    isFetched: capitalAcceptancesFetched,
  } = useCapitalAcceptances();

  const { getState } = useFunderForm();
  const {
    values: { capital_acceptances: capitalAcceptancesFormValues },
  } = getState();

  const capitalAcceptancesOptions: ComponentProps<typeof Select>['options'] =
    capitalAcceptances?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<FunderSchema['capital_acceptances']>
      name="capital_acceptances"
      defaultValue={capitalAcceptancesFormValues}
    >
      {({ input }) => (
        <div className="space-y-2">
          <MultiSelect
            id="capital_acceptances"
            placeholder="Select all that apply"
            theme="gray"
            size="base"
            options={capitalAcceptancesOptions}
            values={input.value}
            loading={capitalAcceptancesFetching && !capitalAcceptancesFetched}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="capital_acceptances" />
        </div>
      )}
    </FieldRFF>
  );
}
