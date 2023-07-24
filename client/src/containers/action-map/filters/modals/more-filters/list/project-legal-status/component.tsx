import { useCallback } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { usePlausible } from 'next-plausible';

import { useProjectLegalStatuses } from 'hooks/project-legal-statuses';

import FilterList from 'components/filters/list';
import { arrayValidator, composeValidators } from 'components/forms/validations';

export const ProjectLegalStatus = () => {
  const { data: recipientLegalStatusesData } = useProjectLegalStatuses();
  const plausible = usePlausible();

  const handleToogle = useCallback((id, input) => {
    const selection = [...input.value];

    if (selection.includes(id)) {
      const index = selection.indexOf(id);
      selection.splice(index, 1);
    } else {
      selection.push(id);
    }

    input.onChange(selection);
  }, []);

  const handleAll = useCallback(
    (id, input) => {
      if (id === 'select-all') {
        input.onChange(recipientLegalStatusesData.map((s) => s.id));
      } else {
        input.onChange([]);

        plausible('Map - Reset filters', {
          props: {
            filterId: `${id}`,
            filterName: `${input.name}`,
          },
        });
      }
    },
    [plausible, recipientLegalStatusesData]
  );

  return (
    <FieldRFF name="recipientLegalStatuses" validate={composeValidators([arrayValidator])}>
      {({ input }) => {
        return (
          <FilterList
            title="Project legal status"
            name="recipientLegalStatuses"
            columns={1}
            data={recipientLegalStatusesData}
            selected={input.value}
            overflow={false}
            onChange={(id) => handleToogle(id, input)}
            onSelectAll={() => handleAll('select-all', input)}
            onClearAll={() => handleAll('clear-all', input)}
          />
        );
      }}
    </FieldRFF>
  );
};

export default ProjectLegalStatus;
