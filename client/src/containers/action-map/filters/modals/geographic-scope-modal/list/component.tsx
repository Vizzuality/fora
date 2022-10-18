import { useCallback, useEffect, useMemo } from 'react';

import { Field as FieldRFF, useForm } from 'react-final-form';

import { useAppSelector } from 'store/hooks';

import { useSubGeographics } from 'hooks/geographics';

import FilterList from 'components/filters/list';
import { composeValidators, arrayValidator } from 'components/forms/validations';

interface GeographicScopeListFooterProps {}

export const GeographicScopeList: React.FC<GeographicScopeListFooterProps> = ({}) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { geographic: initialGeographic, subgeographics: initialSubgeographics } = filters;

  const form = useForm();
  const { values } = form.getState();
  const { geographic } = values;
  const {
    data: subgeographicData,
    isFetching: subgeographicIsFetching,
    isFetched: subgeographicIsFetched,
  } = useSubGeographics({
    filters: { geographic },
  });

  const COLUMNS = useMemo(() => {
    switch (geographic) {
      case 'countries':
        return 3;
      case 'regions':
        return 3;
      case 'states':
        return 4;
      default:
        return 1;
    }
  }, [geographic]);

  const handleToogleSubgeographic = useCallback(
    (id, input) => {
      const selection = [...input.value];

      if (selection.includes(id)) {
        const index = selection.indexOf(id);
        selection.splice(index, 1);
      } else {
        selection.push(id);
      }

      input.onChange(selection);
      form.change('allSubgeographics', selection.length === subgeographicData.length);
    },
    [form, subgeographicData]
  );

  const handleAllSubgeographic = useCallback(
    (id, input) => {
      if (id === 'select-all') {
        input.onChange(
          subgeographicData.map((s) => {
            return s.id;
          })
        );
        form.change('allSubgeographics', true);
      } else {
        input.onChange([]);
      }
    },
    [subgeographicData, form]
  );

  useEffect(() => {
    form.change(
      'subgeographics',
      subgeographicData.map((s) => s.id)
    );

    form.change('allSubgeographics', true);

    if (initialSubgeographics.length && initialGeographic === geographic) {
      form.change('subgeographics', initialSubgeographics);
      form.change('allSubgeographics', false);
    }
  }, [subgeographicData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {geographic !== 'national' && (
        <FieldRFF name="subgeographics" validate={composeValidators([arrayValidator])}>
          {({ input }) => {
            return (
              <FilterList
                data={subgeographicData}
                loading={subgeographicIsFetching && !subgeographicIsFetched}
                name="subgeographics"
                columns={COLUMNS}
                selected={input.value}
                onChange={(id) => handleToogleSubgeographic(id, input)}
                onSelectAll={() => handleAllSubgeographic('select-all', input)}
                onClearAll={() => handleAllSubgeographic('clear-all', input)}
              />
            );
          }}
        </FieldRFF>
      )}

      {geographic === 'national' && (
        <div className="px-10 py-10">
          <p>
            The ‘National’ geographic scope refers to projects and/or funders that focus on the
            national level, in the whole United States of America and not on specific regions or
            states.
          </p>
        </div>
      )}
    </>
  );
};

export default GeographicScopeList;
