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
    recipientLegalStatuses?: string[];
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
    recipientLegalStatuses: [],
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
      recipientLegalStatuses,
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

    if (geographic || areas || demographics || subgeographics || recipientLegalStatuses || search) {
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
          ...(recipientLegalStatuses && {
            recipientLegalStatuses: recipientLegalStatuses as string[],
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
        ...(!!filters.recipientLegalStatuses.length && {
          recipientLegalStatuses: filters.recipientLegalStatuses,
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
