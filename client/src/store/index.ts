import actionMap from 'store/action-map';
import funders from 'store/funders';
import projects from 'store/projects';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { ReducersMapObject } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const staticReducers = {
  '/action-map': actionMap,
  '/funders': funders,
  '/projects': projects,
};

const asyncReducers = {};

const createReducer = (reducers: ReducersMapObject) =>
  combineReducers({
    ...staticReducers,
    ...reducers,
  });

const initStore = () =>
  configureStore({
    reducer: createReducer(asyncReducers),
    devTools: process.env.NODE_ENV !== 'production',
  });

export type Store = ReturnType<typeof initStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<Store['getState']>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = Store['dispatch'];

export default initStore;
export const STORE_WRAPPER = createWrapper<Store>(initStore);
