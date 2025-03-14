import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { useProjectLegalStatuses } from 'hooks/project-legal-statuses';

import { ProjectSchema } from 'containers/auth/projects/form/validations';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';

export default function LegalStatusSelector() {
  const {
    data: legalStatuses,
    isFetching: legalStatusFetching,
    isFetched: legalStatusFetched,
  } = useProjectLegalStatuses();

  const {
    values: { recipient_legal_status: legalStatusFormValue },
  } = useFormState<ProjectSchema>();

  const legalStatusesOptions: ComponentProps<typeof Select>['options'] =
    legalStatuses?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<ProjectSchema['recipient_legal_status']>
      name="recipient_legal_status"
      defaultValue={legalStatusFormValue}
    >
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="recipient_legal_status"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={legalStatusesOptions}
            value={input.value}
            loading={legalStatusFetching && !legalStatusFetched}
            onSelect={input.onChange}
          />
          <ErrorField<ProjectSchema> name="recipient_legal_status" />
        </div>
      )}
    </FieldRFF>
  );
}
