import React, { cloneElement, useCallback } from 'react';

import cx from 'classnames';

import { useModal } from 'hooks/modals';

import Icon from 'components/icon';
import Modal from 'components/modal';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

import type { FilterTriggerProps } from './types';

const FilterTrigger: React.FC<FilterTriggerProps> = ({
  title,
  info,
  Selected,
  Modal: ChildModal,
}) => {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();

  const handleClick = useCallback(() => {
    openModal();
  }, [openModal]);

  const handleOpenChange = useCallback(
    (o) => {
      if (o) openModal();
      if (!o) closeModal();
    },
    [openModal, closeModal]
  );

  return (
    <>
      <div
        role="button"
        className="py-4 text-left cursor-pointer px-7 hover:bg-grey-40/5"
        onClick={handleClick}
      >
        <div className="flex flex-col space-y-1">
          <span className="inline-flex items-center text-base font-semibold uppercase text-grey-20">
            <label className="pr-2 whitespace-nowrap">{title}</label>

            {info && (
              <Tooltip
                arrowProps={{
                  enabled: true,
                  size: 6,
                  className: 'bg-grey-60',
                }}
                content={
                  <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                    <span>{info}</span>
                  </div>
                }
              >
                <div>
                  <Icon
                    icon={INFO_SVG}
                    className={cx({
                      'w-3 h-3 text-grey-20/30': true,
                    })}
                  />
                </div>
              </Tooltip>
            )}
          </span>

          <div className="max-w-[200px] text-base capitalize">{Selected}</div>
        </div>
      </div>

      <Modal
        size="default"
        title="Filter by"
        open={isModalOpen}
        onOpenChange={handleOpenChange}
        dismissable
      >
        {cloneElement(ChildModal, { onClose: closeModal })}
      </Modal>
    </>
  );
};

export default FilterTrigger;
