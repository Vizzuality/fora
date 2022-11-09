import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { ReportPages, ReportYears } from 'types/dashboards';

interface DashboardsGeneralReportState {
  filters: {
    reportYear?: ReportYears;
    reportPage?: ReportPages;
  };
}

// Define the initial state using that type
export const initialState: DashboardsGeneralReportState = {
  filters: {
    reportYear: 2021,
    reportPage: 'general_report',
  },
};

export const slice = createSlice({
  name: '/dashboards/general-report',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<DashboardsGeneralReportState['filters']>) => ({
      ...state,
      filters: action.payload,
    }),
    reset: () => initialState,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload['/dashboards/general-report'],
      };
    },
  },
});

export const { setFilters, reset } = slice.actions;

export default slice.reducer;
