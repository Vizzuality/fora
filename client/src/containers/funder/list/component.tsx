import React from 'react';

import { useRouter } from 'next/router';

import { useFunder } from 'hooks/funders';

import Cards from 'containers/cards';
import Similars from 'containers/similars';

const FundersList = () => {
  const { query } = useRouter();
  const { id: funderId } = query;

  const { data: funderData } = useFunder(`${funderId}`);

  const { projects } = funderData;

  return (
    <div className="space-y-20">
      {!!projects.length && (
        <div className="space-y-9">
          <h3 className="text-2xl font-display"> What projects is funding?</h3>

          <Cards pathname="/projects" theme="green" data={projects} />
        </div>
      )}

      <div className="space-y-9">
        <Similars type="funders" />
      </div>
    </div>
  );
};

export default FundersList;
