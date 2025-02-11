import ProjectCard from 'containers/projects/ui/card';
import React from 'react';
import Icon from 'components/icon';
import eye from 'svgs/icons/eye.svg?sprite';
import upload from 'svgs/icons/upload.svg?sprite';
import CHEVRON_LEFT from 'svgs/icons/arrow-left.svg?sprite';

const FundingHome = () => {
  return (
    <ProjectCard title="">
      <div className="flex flex-col items-center justify-center font-display h-[50vh]">
        <h2 className="md:text-2xl">You have no funding</h2>
        <h2 className="md:text-2xl">Reported for this project</h2>
        <div className="md:w-[406px] text-center font-sans my-5">
          <p>
            Lorem ipsum dolor sit amet consectetur. Convallis fusce neque odio nunc elementum
            habitant sit sagittis.
          </p>
        </div>
        <button className="bg-green-10 text-black rounded-lg p-2"> Report Funding</button>
      </div>

      <div className="flex items-center justify-end">
        <button className="flex items-center p-2 mt-6 text-black transition bg-transparent border rounded-lg hover:bg-blue-700">
          <span className="pr-2">
            <Icon icon={CHEVRON_LEFT} className="w-3 h-3" />
          </span>
          Focus Area{' '}
        </button>
      </div>
    </ProjectCard>
  );
};

export default FundingHome;
