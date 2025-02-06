import router from 'next/router';

import { STORE_WRAPPER } from 'store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import qs from 'query-string';

export type Sort = {
  field: string;
  order: 'asc' | 'desc';
};

interface MyProjectState{
  sort?: Sort;
}

export const initialState: MyProjectState = {
  sort: {
    field: 'name',
    order: 'asc',
  }
}

export const slice = createSlice({
  name: '/myProjects',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload['/myProjects'],
      }
    }
  }
})

export const { setSort } = slice.actions;

export function getReduxStateFromQuery(getServerSidePropsFunc?: Function){
  return STORE_WRAPPER.getServerSideProps((store) =>async (ctx) => {

    const {resolvedUrl} = ctx;
    const { query } = qs.parseUrl(decodeURIComponent(resolvedUrl), {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: ',',
      parseNumbers: true,
      parseBooleans: true,
    });

    const {
      sortField,
      sortOrder,
    } = query;

    if (sortField && sortOrder) {
      await store.dispatch(setSort({ field: sortField, order: sortOrder } as Sort));
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
  })
}

export const setQueryFromReduxState = (pathname: string, state: any) => {
  const {sort} = state;
  const url = qs.stringifyUrl(
    {
      url: pathname,
      query: {
        ...(!!sort && {
          sortField: sort.field,
          sortOrder: sort.order,
        }),
      }
    },
    {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: ',',
    }
  )

  router.replace(url, null, {shallow: true});
}
export default slice.reducer;