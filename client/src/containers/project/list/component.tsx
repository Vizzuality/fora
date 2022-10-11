import React, { useCallback } from 'react';

import { useFundersInfinity } from 'hooks/funders';

import Cards from 'containers/cards';
import Similars from 'containers/similars';

import Button from 'components/button';
import Loading from 'components/loading';

const ProjectList = () => {
  const {
    data: fundersData,
    fetchNextPage: fetchNextPageFunders,
    hasNextPage: hasNextFundersPage,
    isFetchingNextPage: isFetchingNextFundersPage,
  } = useFundersInfinity({
    perPage: 6,
  });

  const handleOnLoadMore = useCallback(() => {
    fetchNextPageFunders();
  }, [fetchNextPageFunders]);

  return (
    <div className="space-y-20">
      <div className="space-y-9">
        <h3 className="text-2xl font-display"> Who is funding this project?</h3>

        {fundersData.length && <Cards theme="green" data={fundersData} />}

        {hasNextFundersPage && (
          <div className="flex justify-center">
            <Button type="button" theme="black-alt" size="xl" onClick={handleOnLoadMore}>
              Load more
              <Loading
                visible={isFetchingNextFundersPage}
                className="absolute flex items-center justify-center w-full h-full bg-white"
              />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-9">
        <Similars type="projects" />
      </div>
    </div>
  );
};

export default ProjectList;
