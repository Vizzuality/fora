import { useCallback } from 'react';

import { Field as FieldRFF } from 'react-final-form';

import { useProjectLegalStatus } from 'hooks/project-legal-status';

import FilterList from 'components/filters/list';
import { arrayValidator, composeValidators } from 'components/forms/validations';

export const ProjectLegalStatus = () => {
  const { data: projectLegalStatusData } = useProjectLegalStatus();

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
        input.onChange(projectLegalStatusData.map((s) => s.id));
      } else {
        input.onChange([]);
      }
    },
    [projectLegalStatusData]
  );

  return (
    <FieldRFF name="projectLegalStatus" validate={composeValidators([arrayValidator])}>
      {({ input }) => {
        return (
          <FilterList
            title="Project legal status"
            name="projectLegalStatus"
            columns={1}
            data={projectLegalStatusData}
            selected={input.value}
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
