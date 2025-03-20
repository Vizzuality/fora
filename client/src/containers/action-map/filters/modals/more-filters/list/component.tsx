import { useAppSelector } from 'store/hooks';

import CapitalTypes from './capital-types';
import FunderLegalStatus from './funder-legal-status';
import FunderTypes from './funder-types';
import ProjectLegalStatus from './project-legal-status';

export const MoreFiltersList = () => {
  const { type } = useAppSelector((state) => state['/action-map']);

  return (
    <div className="relative flex grow flex-col overflow-hidden py-px">
      <div className="pointer-events-none absolute left-0 -top-1 z-10 h-10 w-full bg-gradient-to-b from-white via-white" />

      <div className="grow overflow-y-auto overflow-x-hidden">
        {type === 'funders' && (
          <div className="divide-y divide-grey-40/50 px-10">
            <FunderTypes />
            <FunderLegalStatus />
            <CapitalTypes />
          </div>
        )}

        {type === 'projects' && (
          <div className="divide-y divide-grey-40/50 px-10">
            <ProjectLegalStatus />
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-10 w-full bg-gradient-to-t from-white via-white" />
    </div>
  );
};

export default MoreFiltersList;
