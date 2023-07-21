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
    (state) => state['/dashboards/general-report'].filters
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
            <h2 className="max-w-2xl text-4xl font-display">
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
            <div className="border rounded-lg shrink-0 border-grey-40">
              <button
                type="button"
                className="p-3 transition-colors shrink-0 hover:bg-grey-40"
                onClick={handleClickInfo}
              >
                <div className="flex items-center justify-center w-6 h-6 border rounded-full border-grey-0">
                  <Icon icon={INFO_SVG} className="block w-5 h-5" />
                </div>
              </button>
            </div>
          </div>

          <h3 className="max-w-2xl text-2xl font-display">
            Discover the state of FORA and understand how FORA members fund looking and how each
            area of focus is funded.
          </h3>
        </div>
      </Wrapper>

      <Modal size="s" title="" open={isOpenModal} onOpenChange={() => closeModal()}>
        <div className="p-20 space-y-5">
          <p className="mt-2 text-lg text-grey-100">
            The information in the report below pertains exclusively to investments conducted within
            the designated year and authorized for public disclosure of financial data.
          </p>
        </div>
      </Modal>
    </header>
  );
};

export default ReportHeader;
