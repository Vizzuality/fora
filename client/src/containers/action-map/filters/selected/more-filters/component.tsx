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
        className="relative flex items-center space-x-3 uppercase cursor-pointer px-7 text-grey-0 hover:bg-grey-40/5 whitespace-nowrap"
        onClick={openModal}
      >
        <Icon icon={FILTERS_SVG} className="w-4 h-4" />
        <span className="relative">
          More filters
          {!!SELECTED && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 -mt-1 -mr-5 text-xs text-center text-white rounded-full bg-grey-0">
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
