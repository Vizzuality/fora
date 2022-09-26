import { useAppSelector } from 'store/hooks';

import CapitalTypes from './capital-types';
import FunderLegalStatus from './funder-legal-status';
import FunderTypes from './funder-types';
import ProjectLegalStatus from './project-legal-status';

export const MoreFiltersList = () => {
  const { type } = useAppSelector((state) => state['/action-map']);

  return (
    <div className="relative flex flex-col py-px overflow-hidden grow">
      <div className="absolute left-0 z-10 w-full h-10 pointer-events-none -top-1 bg-gradient-to-b from-white via-white" />

      <div className="overflow-x-hidden overflow-y-auto divide-y divide-grey-40/50 grow">
        {type === 'funders' && (
          <>
            <FunderTypes />
            <FunderLegalStatus />
            <CapitalTypes />
          </>
        )}

        {type === 'projects' && (
          <>
            <ProjectLegalStatus />
          </>
        )}
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full h-10 pointer-events-none bg-gradient-to-t from-white via-white" />
    </div>
  );
};

export default MoreFiltersList;
