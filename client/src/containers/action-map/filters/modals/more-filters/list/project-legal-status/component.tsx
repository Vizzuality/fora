import { useCallback } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useProjectLegalStatuses } from 'hooks/project-legal-statuses';

import FilterList from 'components/filters/list';
import { arrayValidator, composeValidators } from 'components/forms/validations';

export const ProjectLegalStatus = () => {
  const { data: projectLegalStatusesData } = useProjectLegalStatuses();

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
        input.onChange(projectLegalStatusesData.map((s) => s.id));
      } else {
        input.onChange([]);
      }
    },
    [projectLegalStatusesData]
  );

  return (
    <FieldRFF name="projectLegalStatuses" validate={composeValidators([arrayValidator])}>
      {({ input }) => {
        return (
          <FilterList
            title="Project legal status"
            name="projectLegalStatuses"
            columns={1}
            data={projectLegalStatusesData}
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
