import React, { useCallback, useMemo } from 'react';

import { setFilters } from 'store/dashboards/general-report';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useModal } from 'hooks/modals';
import { useReportYears } from 'hooks/widgets';

import Wrapper from 'containers/wrapper';

import { Select } from 'components/forms';
import Icon from 'components/icon/component';
import Modal from 'components/modal/component';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

const ReportHeader = () => {
  const { data: yearsData } = useReportYears();
  const { reportYear, ...filters } = useAppSelector(
    (state) => state['/dashboards/general-report'].filters,
  );
  const dispatch = useAppDispatch();

  const { isOpen: isOpenModal, open: openModal, close: closeModal } = useModal();

  const YEAR_OPTIONS = useMemo(() => {
    return yearsData.map((year) => ({
      label: year.name,
      value: `${year.name}`,
    }));
  }, [yearsData]);

  const handleClickInfo = useCallback(() => {
    openModal();
  }, [openModal]);

  return (
    <header className="pt-20">
      <Wrapper>
        <div className="space-y-5">
          <div className="flex justify-between">
            <h2 className="max-w-2xl font-display text-4xl">
              General Report{' '}
              <strong>
                <Select
                  id="report-year"
                  size="none"
                  theme="none"
                  options={YEAR_OPTIONS}
                  value={`${reportYear}`}
                  onSelect={(value) => {
                    dispatch(setFilters({ ...filters, reportYear: +value }));
                  }}
                />
              </strong>
            </h2>

            <button
              type="button"
              className="shrink-0 rounded-lg border border-grey-40 p-3 transition-colors hover:bg-grey-40"
              onClick={handleClickInfo}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-grey-0">
                <Icon icon={INFO_SVG} className="block h-5 w-5" />
              </div>
            </button>
          </div>

          <h3 className="max-w-2xl font-display text-2xl">
            Discover the state of FORA and understand how FORA members fund looking and how each
            area of focus is funded.
          </h3>
        </div>
      </Wrapper>

      <Modal size="s" title="" open={isOpenModal} onOpenChange={() => closeModal()}>
        <div className="space-y-5 p-20">
          <p className="text-grey-100 mt-2 text-lg">
            The information in the report below pertains exclusively to investments conducted within
            the designated year and authorized for public disclosure of financial data.
          </p>
        </div>
      </Modal>
    </header>
  );
};

export default ReportHeader;
