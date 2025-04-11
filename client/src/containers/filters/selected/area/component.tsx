import React, { useCallback, useEffect, useState } from 'react';

import cx from 'classnames';

import { setFilters as setFundersFilters } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setFilters as setProjectsFilters } from 'store/projects';

import { groupBy } from 'lodash';

import { useAreas } from 'hooks/areas';

import TreeSelect from '@/components/forms/tree-select';
import { TreeSelectOption } from '@/components/forms/tree-select/types';

interface AreaSelectedProps {
  type: string;
}

const AreaSelected: React.FC<AreaSelectedProps> = ({ type }) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const dispatch = useAppDispatch();
  const { data: areasData, isFetching: areasIsFetching, isFetched: areasIsFetched } = useAreas();
  const { areas } = filters;

  const [selectedValues, setSelectedValues] = useState<TreeSelectOption<string>[]>([]);

  const areasOptions = Object.values(groupBy(areasData, 'parent')).map((parent) => ({
    label: parent[0].parent,
    children: parent.map((option) => ({
      label: option.name,
      value: option.id,
    })),
  }));

  const handleSelectArea = useCallback(
    (values) => {
      const action = {
        funders: setFundersFilters,
        projects: setProjectsFilters,
      };

      dispatch(
        action[type]({
          ...filters,
          areas: values.map(({ value }) => value),
        }),
      );
    },
    [dispatch, type, filters],
  );

  useEffect(() => {
    if (!areas) return;

    const selected = areasData
      .filter((area) => areas.some((selectedValue) => selectedValue === area.id))
      .map((area) => ({
        label: area.name,
        value: area.id,
      }));
    setSelectedValues(selected);
  }, [areasData, areas]);

  return (
    <div
      className={cx({
        'w-full font-semibold': true,
      })}
    >
      <TreeSelect
        showSearch
        current={selectedValues}
        loading={areasIsFetching && !areasIsFetched}
        options={areasOptions as TreeSelectOption<string>[]}
        placeholder="Areas of focus"
        multiple
        theme="inline-primary"
        checkedStrategy="CHILD"
        className="h-[46px]"
        onChange={handleSelectArea}
        id="area-focus-select"
      />
    </div>
  );
};

export default AreaSelected;
