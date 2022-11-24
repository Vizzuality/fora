import React, { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { setFunderSelected } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useFunders } from 'hooks/funders';
import { useModal } from 'hooks/modals';

import NoData from 'containers/action-map/list/no-data';
import FunderPreview from 'containers/action-map/previews/funder-preview';
import Preview from 'containers/action-map/previews/preview';

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

  const handlePreviousClick = useCallback(() => {
    const IDS = DATA.map((d) => d.id);
    const currentIndex = IDS.indexOf(funderSelected);
    const previousIndex = currentIndex - 1 < 0 ? IDS.length - 1 : currentIndex - 1;
    dispatch(setFunderSelected(IDS[previousIndex]));
  }, [dispatch, funderSelected, DATA]);

  const handleNextClick = useCallback(() => {
    const IDS = DATA.map((d) => d.id);
    const currentIndex = IDS.indexOf(funderSelected);
    const nextIndex = currentIndex + 1 > IDS.length - 1 ? 0 : currentIndex + 1;
    dispatch(setFunderSelected(IDS[nextIndex]));
  }, [dispatch, funderSelected, DATA]);

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
          <Preview onNext={handleNextClick} onPrevious={handlePreviousClick}>
            <FunderPreview onClick={() => handleFunderPreviewClick(funderSelected)} />
          </Preview>
        </Modal>
      )}
    </>
  );
};

export default List;
