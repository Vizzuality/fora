import React, { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { setFunderSelected } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useFunders } from 'hooks/funders';
import { useModal } from 'hooks/modals';

import NoData from 'containers/action-map/list/no-data';
import FunderPreview from 'containers/action-map/previews/funder-preview';

import Loading from 'components/loading';
import Modal from 'components/modal';

import Item from '../item';

const List = () => {
  const { funderSelected, filters } = useAppSelector((state) => state['/action-map']);
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  // FUNDERS
  // get funders filtered by the current filters
  const {
    data: fundersData,
    isFetching: fundersIsFetching,
    isFetched: fundersIsFetched,
  } = useFunders({
    filters,
    includes: 'subgeographic_ancestors',
  });

  const LOADING = fundersIsFetching && !fundersIsFetched;
  const NO_DATA = !fundersData.length && !LOADING;

  const DATA = useMemo(() => {
    return fundersData
      .map((d) => {
        const { projects } = d;

        return {
          ...d,
          count: projects.length,
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [fundersData]);

  const handleClick = useCallback(
    (id: string) => {
      dispatch(setFunderSelected(id));
      openModal();
    },
    [dispatch, openModal]
  );

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
          <h4 className="font-semibold uppercase text-grey-20">Funders</h4>
          <h4 className="font-semibold uppercase text-grey-20">Funding</h4>
        </div>
        <ul className="relative space-y-2">
          {!LOADING &&
            DATA
              //
              .map((d) => <Item {...d} key={d.id} data={DATA} onClick={() => handleClick(d.id)} />)}

          {NO_DATA && <NoData />}
        </ul>
      </div>
      {funderSelected && (
        <Modal
          size="default"
          title=""
          open={isModalOpen}
          onOpenChange={handleFunderPreviewClose}
          dismissable
        >
          <FunderPreview onClick={() => handleFunderPreviewClick(funderSelected)} />
        </Modal>
      )}
    </>
  );
};

export default List;
