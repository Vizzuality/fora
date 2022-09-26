import router from 'next/router';

import { STORE_WRAPPER } from 'store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import qs from 'query-string';

export type Geographic = 'states' | 'regions' | 'national' | 'countries';
export type Sort = {
  field: string;
  order: 'asc' | 'desc';
};
interface FundersState {
  search?: string;
  sort?: Sort;
  filters: {
    geographic: Geographic;
    subgeographics?: string[];
    areas?: string[];
    demographics?: string[];
    funderTypes?: string[];
    funderLegalStatus?: string[];
    funderRoles?: string[];
    fundingTypes?: string[];
    capitalTypes?: string[];
    capitalAcceptances?: string[];
    grantDurations?: string[];
    projectLegalStatus?: string[];
    applicationStatus?: string[];
  };
}

// Define the initial state using that type
export const initialState: FundersState = {
  sort: {
    field: 'title',
    order: 'asc',
  },
  search: '',
  filters: {
    geographic: 'regions',
    subgeographics: [],
    areas: [],
    demographics: [],
    funderTypes: [],
    fundingTypes: [],
    funderLegalStatus: [],
    funderRoles: [],
    capitalTypes: [],
    capitalAcceptances: [],
    grantDurations: [],
    projectLegalStatus: [],
    applicationStatus: [],
  },
};

export const slice = createSlice({
  name: '/funders',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setFilters: (state, action: PayloadAction<FundersState['filters']>) => ({
      ...state,
      filters: action.payload,
    }),
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload['/funders'],
      };
    },
  },
});

export const { setSearch, setSort, setFilters } = slice.actions;

export function getReduxStateFromQuery(getServerSidePropsFunc?: Function) {
  return STORE_WRAPPER.getServerSideProps((store) => async (ctx) => {
    // we can set the initial state from here
    // we are setting to false but you can run your custom logic here
    const { resolvedUrl } = ctx;
    const { query } = qs.parseUrl(decodeURIComponent(resolvedUrl), {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: ',',
      parseNumbers: true,
      parseBooleans: true,
    });
    const {
      geographic,
      areas,
      demographics,
      subgeographics,
      funderTypes,
      fundingTypes,
      funderLegalStatus,
      funderRoles,
      capitalTypes,
      capitalAcceptances,
      grantDurations,
      projectLegalStatus,
      applicationStatus,
      search,
      sortField,
      sortOrder,
    } = query;
    if (search) {
      await store.dispatch(setSearch(search && (search as string)));
    }
    if (sortField && sortOrder) {
      await store.dispatch(setSort({ field: sortField, order: sortOrder } as Sort));
    }
    if (
      geographic ||
      areas ||
      demographics ||
      subgeographics ||
      funderTypes ||
      fundingTypes ||
      funderLegalStatus ||
      funderRoles ||
      capitalTypes ||
      capitalAcceptances ||
      grantDurations ||
      projectLegalStatus ||
      applicationStatus
    ) {
      await store.dispatch(
        setFilters({
          ...initialState.filters,
          ...(geographic && {
            geographic: geographic as Geographic,
          }),
          ...(subgeographics && {
            subgeographics: subgeographics as string[],
          }),
          ...(areas && {
            areas: areas as string[],
          }),
          ...(demographics && {
            demographics: demographics as string[],
          }),
          ...(funderTypes && {
            funderTypes: funderTypes as string[],
          }),
          ...(fundingTypes && {
            fundingTypes: fundingTypes as string[],
          }),
          ...(funderLegalStatus && {
            funderLegalStatus: funderLegalStatus as string[],
          }),
          ...(funderRoles && {
            funderRoles: funderRoles as string[],
          }),
          ...(capitalTypes && {
            capitalTypes: capitalTypes as string[],
          }),
          ...(capitalAcceptances && {
            capitalAcceptances: capitalAcceptances as string[],
          }),
          ...(grantDurations && {
            grantDurations: grantDurations as string[],
          }),
          ...(projectLegalStatus && {
            projectLegalStatus: projectLegalStatus as string[],
          }),
          ...(applicationStatus && {
            applicationStatus: applicationStatus as string[],
          }),
        })
      );
    }

    if (getServerSidePropsFunc) {
      const SSPF = (await getServerSidePropsFunc(ctx)) || {};

      return {
        props: {
          ...SSPF.props,
        },
      };
    }

    return {
      props: {},
    };
  });
}

export const setQueryFromReduxState = (pathname: string, state: any) => {
  const { filters, search, sort } = state;

  const url = qs.stringifyUrl(
    {
      url: pathname,
      query: {
        ...(!!filters.geographic && { geographic: filters.geographic }),
        ...(!!filters.subgeographics.length && { subgeographics: filters.subgeographics }),
        ...(!!filters.areas.length && { areas: filters.areas }),
        ...(!!filters.demographics.length && { demographics: filters.demographics }),
        ...(!!filters.funderTypes.length && { funderTypes: filters.funderTypes }),
        ...(!!filters.fundingTypes.length && { fundingTypes: filters.fundingTypes }),
        ...(!!filters.funderLegalStatus.length && {
          funderLegalStatus: filters.funderLegalStatus,
        }),
        ...(!!filters.funderRoles.length && { funderRoles: filters.funderRoles }),
        ...(!!filters.capitalTypes.length && { capitalTypes: filters.capitalTypes }),
        ...(!!filters.capitalAcceptances.length && {
          capitalAcceptances: filters.capitalAcceptances,
        }),
        ...(!!filters.grantDurations.length && { grantDurations: filters.grantDurations }),
        ...(!!filters.projectLegalStatus.length && {
          projectLegalStatus: filters.projectLegalStatus,
        }),
        ...(!!filters.applicationStatus.length && {
          applicationStatus: filters.applicationStatus,
        }),
        ...(!!search && { search: search }),
        ...(!!sort && {
          sortField: sort.field,
          sortOrder: sort.order,
        }),
      },
    },
    {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: ',',
    }
  );

  router.replace(url, null, { shallow: true });
};

export default slice.reducer;
