import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { useFunderForm } from '@/containers/auth/details/form';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { useApplicationStatuses } from '@/hooks/application-statuses';

export default function ApplicationStatusSelector() {
  const {
    data: applicationStatuses,
    isFetching: applicationStatusesFetching,
    isFetched: applicationStatusesFetched,
  } = useApplicationStatuses();

  const { getState } = useFunderForm();
  const {
    values: { application_status: applicationStatusFormValue },
  } = getState();

  const applicationStatusesOptions: ComponentProps<typeof Select>['options'] =
    applicationStatuses?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<FunderSchema['application_status']>
      name="application_status"
      defaultValue={applicationStatusFormValue}
    >
      {({ input }) => (
        <div className="space-y-2">
          <Select
            id="application_status"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={applicationStatusesOptions}
            value={input.value}
            loading={applicationStatusesFetching && !applicationStatusesFetched}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="application_status" />
        </div>
      )}
    </FieldRFF>
  );
}
