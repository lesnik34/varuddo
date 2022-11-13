import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/app';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type TStoreState = ReturnType<typeof store.getState>;
