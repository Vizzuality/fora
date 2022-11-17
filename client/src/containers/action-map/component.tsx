import React, { useCallback } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { setFunderSelected, setProjectSelected } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import Wrapper from 'containers/wrapper';

import Filters from './filters';
import Legend from './legend';
import List from './list';
import FunderPreview from './previews/funder-preview';
import Preview from './previews/preview';
import ProjectPreview from './previews/project-preview';
import Sentence from './sentence';

const Map = dynamic(() => import('./map'), { ssr: false });

const ActionMap = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { funderSelected, projectSelected } = useAppSelector((state) => state['/action-map']);

  const handleFunderPreviewClick = useCallback(
    (id: string) => {
      push({
        pathname: `/funders/[id]`,
        query: { id },
      });
    },
    [push]
  );

  const handleFunderPreviewClose = useCallback(() => {
    dispatch(setFunderSelected(null));
  }, [dispatch]);

  const handleProjectPreviewClick = useCallback(
    (id: string) => {
      push({
        pathname: `/projects/[id]`,
        query: { id },
      });
    },
    [push]
  );

  const handleProjectPreviewClose = useCallback(() => {
    dispatch(setProjectSelected(null));
  }, [dispatch]);

  return (
    <>
      <Filters />

      <Wrapper>
        <div className="py-5">
          <div className="grid grid-cols-12">
            <div className="col-span-8 pb-5">
              <Sentence />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-10">
            <div className="col-span-8">
              <div className="relative flex flex-col w-full space-y-5">
                {funderSelected && (
                  <Preview onClose={handleFunderPreviewClose}>
                    <FunderPreview
                      id={funderSelected}
                      onClick={() => handleFunderPreviewClick(funderSelected)}
                    />
                  </Preview>
                )}
                {projectSelected && (
                  <Preview onClose={handleProjectPreviewClose}>
                    <ProjectPreview
                      id={projectSelected}
                      onClick={() => handleProjectPreviewClick(projectSelected)}
                    />
                  </Preview>
                )}
                <Map />

                <div className="flex items-center justify-between">{/* <View /> */}</div>
              </div>
            </div>
            <div className="col-span-3 col-start-10 max-h-[500px]">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="relative flex flex-col h-full min-h-0 grow">
                  <List />
                </div>
                <div className="shrink-0 grow">
                  <Legend />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ActionMap;
