import React, { useMemo } from 'react';

import { setFilters } from 'store/dashboards/general-report';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useReportYears } from 'hooks/widgets';

import Wrapper from 'containers/wrapper';

import { Select } from 'components/forms';

const ReportHeader = () => {
  const { data: yearsData } = useReportYears();
  const { reportYear, ...filters } = useAppSelector(
    (state) => state['/dashboards/general-report'].filters
  );
  const dispatch = useAppDispatch();

  const YEAR_OPTIONS = useMemo(() => {
    return yearsData.map((year) => ({
      label: year.name,
      value: `${year.name}`,
    }));
  }, [yearsData]);

  return (
    <header className="pt-20">
      <Wrapper>
        <div className="space-y-5">
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
          <h3 className="max-w-2xl text-2xl font-display">
            Discover the state of FORA and understand how FORA members fund looking and how each
            area of focus is funded.
          </h3>
        </div>
      </Wrapper>
    </header>
  );
};

export default ReportHeader;
