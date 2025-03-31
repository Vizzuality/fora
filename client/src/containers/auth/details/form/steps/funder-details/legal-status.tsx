import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { useProjectLegalStatuses } from '@/hooks/project-legal-statuses';

export default function LegalStatusSelector() {
  const {
    data: legalStatuses,
    isFetching: legalStatusFetching,
    isFetched: legalStatusFetched,
  } = useProjectLegalStatuses();

  const {
    values: { funder_legal_status: legalStatusFormValue },
  } = useFormState<FunderSchema>();

  const legalStatusesOptions: ComponentProps<typeof Select>['options'] =
    legalStatuses?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<FunderSchema['funder_legal_status']>
      name="funder_legal_status"
      defaultValue={legalStatusFormValue}
    >
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="funder_legal_status"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={legalStatusesOptions}
            value={input.value}
            loading={legalStatusFetching && !legalStatusFetched}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="funder_legal_status" />
        </div>
      )}
    </FieldRFF>
  );
}
