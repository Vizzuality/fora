import React, { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { setProjectSelected } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useModal } from 'hooks/modals';
import { useProjects } from 'hooks/projects';

import NoData from 'containers/action-map/list/no-data';
import ProjectPreview from 'containers/action-map/previews/project-preview';

import Loading from 'components/loading';
import Modal from 'components/modal';

import Item from '../item';

const List = () => {
  const { projectSelected, filters } = useAppSelector((state) => state['/action-map']);
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  // FUNDERS
  // get projects filtered by the current filters
  const {
    data: projectsData,
    isFetching: projectsIsFetching,
    isFetched: projectsIsFetched,
  } = useProjects({
    filters,
    includes: 'subgeographic_ancestors',
  });

  const DATA = useMemo(() => {
    return projectsData
      .map((d) => {
        const { funders } = d;
        return {
          ...d,
          count: funders.length,
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [projectsData]);

  const LOADING = projectsIsFetching && !projectsIsFetched;
  const NO_DATA = !DATA.length && !LOADING;

  const handleClick = useCallback(
    (id: string) => {
      dispatch(setProjectSelected(id));
      openModal();
    },
    [dispatch, openModal]
  );

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
    closeModal();
  }, [dispatch, closeModal]);

  return (
    <>
      <Loading
        visible={LOADING}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/75"
      />

      <div className="space-y-5">
        <div className="flex justify-between">
          <h4 className="font-semibold uppercase text-grey-20">Projects</h4>
          <h4 className="font-semibold uppercase text-grey-20">Funded</h4>
        </div>
        <ul className="relative space-y-2">
          {!LOADING &&
            DATA
              //
              .map((d) => <Item {...d} key={d.id} data={DATA} onClick={() => handleClick(d.id)} />)}

          {NO_DATA && <NoData />}
        </ul>
      </div>

      <Modal
        size="default"
        title=""
        open={isModalOpen}
        onOpenChange={handleProjectPreviewClose}
        dismissable
      >
        <ProjectPreview onClick={() => handleProjectPreviewClick(projectSelected)} />
      </Modal>
    </>
  );
};

export default List;
