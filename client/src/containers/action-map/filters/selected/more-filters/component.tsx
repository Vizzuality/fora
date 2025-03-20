import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useModal } from 'hooks/modals';

import MoreFilters from 'containers/action-map/filters/modals/more-filters';

import Icon from 'components/icon';
import Modal from 'components/modal';

import FILTERS_SVG from 'svgs/ui/filters.svg?sprite';

interface MoreFiltersSelectedProps {}

const MoreFiltersSelected: React.FC<MoreFiltersSelectedProps> = () => {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();

  const { type, filters } = useAppSelector((state) => state['/action-map']);
  const { funderTypes, funderLegalStatuses, capitalTypes, recipientLegalStatuses } = filters;

  const SELECTED = useMemo(() => {
    if (type === 'funders') {
      const s = [!!funderTypes.length, !!funderLegalStatuses.length, !!capitalTypes.length];
      return s.filter((v) => v).length;
    }

    if (type === 'projects') {
      const s = [!!recipientLegalStatuses.length];
      return s.filter((v) => v).length;
    }
  }, [type, funderTypes, funderLegalStatuses, capitalTypes, recipientLegalStatuses]);

  return (
    <>
      <button
        type="button"
        className="relative flex cursor-pointer items-center space-x-3 whitespace-nowrap px-7 uppercase text-grey-0 hover:bg-grey-40/5"
        onClick={openModal}
      >
        <Icon icon={FILTERS_SVG} className="h-4 w-4" />
        <span className="relative">
          More filters
          {!!SELECTED && (
            <span className="absolute top-0 right-0 -mt-1 -mr-5 flex h-4 w-4 items-center justify-center rounded-full bg-grey-0 text-center text-xs text-white">
              {SELECTED}
            </span>
          )}
        </span>
      </button>

      <Modal
        size="default"
        title="Filter by"
        open={isModalOpen}
        onOpenChange={closeModal}
        dismissable
      >
        <MoreFilters onClose={closeModal} />
      </Modal>
    </>
  );
};

export default MoreFiltersSelected;
