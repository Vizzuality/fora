import { ComponentProps } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { MultiSelect, Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import { useFunderForm } from '@/containers/auth/details/form';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { useAreas } from '@/hooks/areas';

export default function AreasSelector() {
  const { data: areas, isFetching: areasFetching, isFetched: areasFetched } = useAreas();

  const { getState } = useFunderForm();
  const {
    values: { areas: areasFormValues },
  } = getState();

  const areasOptions: ComponentProps<typeof Select>['options'] =
    areas?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <FieldRFF<FunderSchema['areas']> name="areas" defaultValue={areasFormValues}>
      {({ input }) => (
        <div className="space-y-2">
          <MultiSelect
            id="areas"
            placeholder="Select an option"
            theme="gray"
            size="base"
            options={areasOptions}
            values={input.value}
            loading={areasFetching && !areasFetched}
            onSelect={input.onChange}
          />
          <ErrorField<FunderSchema> name="areas" />
        </div>
      )}
    </FieldRFF>
  );
}
