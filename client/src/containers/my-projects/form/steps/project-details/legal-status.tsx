'use client';

import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useProjectLegalStatuses } from 'hooks/project-legal-statuses';

import { ProjectSchema } from 'containers/my-projects/form/validations';

import { Select } from 'components/forms';

export default function LegalStatusSelector() {
  const {
    data: legalStatuses,
    isFetching: legalStatusFetching,
    isFetched: legalStatusFetched,
  } = useProjectLegalStatuses();

  const legalStatusesOptions: ComponentProps<typeof Select>['options'] =
    legalStatuses?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<ProjectSchema['name']> name="recipient_legal_status">
      {({ input }) => (
        <Select
          id="recipient_legal_status"
          placeholder="Select an option"
          theme="light"
          size="base"
          options={legalStatusesOptions}
          value={input.value}
          loading={legalStatusFetching && !legalStatusFetched}
          onSelect={input.onChange}
        />
      )}
    </FieldRFF>
  );
}
