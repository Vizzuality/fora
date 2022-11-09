import React from 'react';

import { useRouter } from 'next/router';

import { useProject } from 'hooks/projects';

import Cards from 'containers/cards';
import Similars from 'containers/similars';

const ProjectList = () => {
  const { query } = useRouter();
  const { id: projectId } = query;

  const { data: projectData } = useProject(`${projectId}`);

  const { funders } = projectData;

  return (
    <div className="space-y-20">
      <div className="space-y-9">
        <h3 className="text-2xl font-display"> Who is funding this project?</h3>

        {funders.length && <Cards pathname="/funders" theme="green" data={funders} />}
      </div>

      <div className="space-y-9">
        <Similars type="projects" />
      </div>
    </div>
  );
};

export default ProjectList;
