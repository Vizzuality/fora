import CapitalTypes from './capital-types';
import FunderLegalStatus from './funder-legal-status';
import FunderTypes from './funder-types';
import ProjectLegalStatus from './project-legal-status';

interface MoreFiltersListProps {
  type: string;
}

export const MoreFiltersList: React.FC<MoreFiltersListProps> = ({ type }) => {
  return (
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
          <div className="px-10 divide-y divide-grey-40/50">
            <ProjectLegalStatus />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full h-10 pointer-events-none bg-gradient-to-t from-white via-white" />
    </div>
  );
};

export default MoreFiltersList;
