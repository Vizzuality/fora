import { useEffect, useState } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { groupBy } from 'lodash';

import ErrorField from '@/components/forms/error-field';
import TreeSelect from '@/components/forms/tree-select';
import { TreeSelectOption } from '@/components/forms/tree-select/types';
import { useFunderForm } from '@/containers/auth/details/form';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { useAreas } from '@/hooks/areas';

export default function AreasSelector() {
  const { data: areas, isFetching: areasFetching, isFetched: areasFetched } = useAreas();

  const { getState } = useFunderForm();
  const {
    values: { areas: areasFormValues },
  } = getState();

  const [selectedValues, setSelectedValues] = useState<TreeSelectOption<string>[]>([]);

  const areasOptions = Object.values(groupBy(areas, 'parent')).map((parent) => ({
    label: parent[0].parent,
    children: parent.map((option) => ({
      label: option.name,
      value: option.id,
    })),
  }));

  useEffect(() => {
    if (!areas) return;

    const selected = areas
      .filter((area) => areasFormValues?.some((selectedValue) => selectedValue === area.id))
      .map((area) => ({
        label: area.name,
        value: area.id,
      }));
    setSelectedValues(selected);
  }, [areas, areasFormValues]);

  return (
    <FieldRFF<FunderSchema['areas']> name="areas" defaultValue={areasFormValues}>
      {({ input }) => (
        <div className="space-y-2">
          <TreeSelect
            maxBadges={1}
            showSearch
            current={selectedValues}
            loading={areasFetching && !areasFetched}
            options={areasOptions as TreeSelectOption<string>[]}
            placeholder="Areas of focus"
            multiple
            checkedStrategy="CHILD"
            className="h-[46px]"
            onChange={(values) => {
              const ids = values.map(({ value }) => value);
              input.onChange(ids);
              setSelectedValues(values);
            }}
            id={input.name}
          />
          <ErrorField<FunderSchema> name="areas" />
        </div>
      )}
    </FieldRFF>
  );
}
