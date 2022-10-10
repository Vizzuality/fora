import router from 'next/router';

import { STORE_WRAPPER } from 'store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import qs from 'query-string';

export type Type = 'funders' | 'projects';
export type View = 'states' | 'regions' | 'national' | 'countries';
export type Geographic = 'states' | 'regions' | 'national' | 'countries';

interface ActionMapState {
  type: Type;
  view: View;
  filters: {
    geographic: Geographic;
    subgeographics?: string[];
    areas?: string[];
    demographics?: string[];
    funderTypes?: string[];
    funderLegalStatuses?: string[];
    capitalTypes?: string[];
    projectLegalStatuses?: string[];
  };
}

// Define the initial state using that type
export const initialState: ActionMapState = {
  type: 'funders',
  view: 'regions',
  filters: {
    geographic: 'regions',
    subgeographics: [],
    areas: [],
    demographics: [],
    funderTypes: [],
    funderLegalStatuses: [],
    capitalTypes: [],
    projectLegalStatuses: [],
  },
};

export const slice = createSlice({
  name: '/action-map',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<Type>) => ({
      ...state,
      type: action.payload,
    }),
    setView: (state, action: PayloadAction<View>) => ({
      ...state,
      view: action.payload,
    }),
    setFilters: (state, action: PayloadAction<ActionMapState['filters']>) => ({
      ...state,
      filters: action.payload,
    }),
    reset: () => initialState,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload['/action-map'],
      };
    },
  },
});

export const { setType, setView, setFilters, reset } = slice.actions;

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
      type,
      view,
      geographic,
      areas,
      demographics,
      subgeographics,
      funderTypes,
      funderLegalStatuses,
      capitalTypes,
      projectLegalStatuses,
    } = query;

    if (type) {
      await store.dispatch(setType(type as Type));
    }

    if (view) {
      await store.dispatch(setView(view as View));
    }

    if (
      geographic ||
      areas ||
      demographics ||
      subgeographics ||
      funderTypes ||
      funderLegalStatuses ||
      capitalTypes ||
      projectLegalStatuses
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
          ...(funderLegalStatuses && {
            funderLegalStatuses: funderLegalStatuses as string[],
          }),
          ...(capitalTypes && {
            capitalTypes: capitalTypes as string[],
          }),
          ...(projectLegalStatuses && {
            projectLegalStatuses: projectLegalStatuses as string[],
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
  const { type, view, filters } = state;

  const url = qs.stringifyUrl(
    {
      url: pathname,
      query: {
        type,
        view,
        ...(!!filters.geographic && { geographic: filters.geographic }),
        ...(!!filters.subgeographics.length && { subgeographics: filters.subgeographics }),
        ...(!!filters.areas.length && { areas: filters.areas }),
        ...(!!filters.demographics.length && { demographics: filters.demographics }),
        ...(!!filters.funderTypes.length && { funderTypes: filters.funderTypes }),
        ...(!!filters.funderLegalStatuses.length && {
          funderLegalStatuses: filters.funderLegalStatuses,
        }),
        ...(!!filters.capitalTypes.length && { capitalTypes: filters.capitalTypes }),
        ...(!!filters.projectLegalStatuses.length && {
          projectLegalStatuses: filters.projectLegalStatuses,
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
