import { useMemo } from 'react';

import { useForm } from 'react-final-form';

import { useAppSelector } from 'store/hooks';

import FilterWarning from 'components/filters/warning';

import CapitalTypes from './capital-types';
import FunderLegalStatus from './funder-legal-status';
import FunderTypes from './funder-types';
import ProjectLegalStatus from './project-legal-status';

export const MoreFiltersList = () => {
  const form = useForm();
  const { values } = form.getState();
  const { funderTypes, funderLegalStatuses, capitalTypes, projectLegalStatuses } = values;

  const { type } = useAppSelector((state) => state['/action-map']);

  const VISIBLE = useMemo(() => {
    if (type === 'funders') {
      return !funderTypes.length || !funderLegalStatuses.length || !capitalTypes.length;
    }

    if (type === 'projects') {
      return !projectLegalStatuses.length;
    }

    return false;
  }, [type, funderTypes, funderLegalStatuses, capitalTypes, projectLegalStatuses]);

  return (
    <>
      <FilterWarning
        text="Please, select at least one option from all filters before saving."
        visible={VISIBLE}
      />

      <div className="relative flex flex-col py-px overflow-hidden grow">
        <div className="absolute left-0 z-10 w-full h-10 pointer-events-none -top-1 bg-gradient-to-b from-white via-white" />

        <div className="overflow-x-hidden overflow-y-auto grow">
          {type === 'funders' && (
            <div className="px-10 divide-y divide-grey-40/50">
              <FunderTypes />
              <FunderLegalStatus />
              <CapitalTypes />
            </div>
          )}

          {type === 'projects' && (
            <>
              <ProjectLegalStatus />
            </>
          )}
        </div>

        <div className="absolute bottom-0 left-0 z-10 w-full h-10 pointer-events-none bg-gradient-to-t from-white via-white" />
      </div>
    </>
  );
};

export default MoreFiltersList;
