import React, { useCallback } from 'react';

import { useProjectsInfinity } from 'hooks/projects';

import Cards from 'containers/cards';
import Similars from 'containers/similars';

import Button from 'components/button';
import Loading from 'components/loading';

const FundersList = () => {
  const {
    data: projectsData,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextProjectsPage,
    isFetchingNextPage: isFetchingNextProjectsPage,
  } = useProjectsInfinity({
    perPage: 6,
  });

  const handleOnLoadMore = useCallback(() => {
    fetchNextPageProjects();
  }, [fetchNextPageProjects]);

  return (
    <div className="space-y-20">
      <div className="space-y-9">
        <h3 className="text-2xl font-display"> What projects is funding?</h3>

        {projectsData.length && <Cards theme="green" data={projectsData} />}

        {hasNextProjectsPage && (
          <div className="flex justify-center">
            <Button type="button" theme="black-alt" size="xl" onClick={handleOnLoadMore}>
              Load more
              <Loading
                visible={isFetchingNextProjectsPage}
                className="absolute flex items-center justify-center w-full h-full bg-white"
              />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-9">
        <Similars type="funders" />
      </div>
    </div>
  );
};

export default FundersList;
