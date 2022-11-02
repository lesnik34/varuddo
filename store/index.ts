import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/app';
import exampleReducer from './slices/example';

export const store = configureStore({
  reducer: {
    app: appReducer,
    example: exampleReducer,
  },
  devTools: true,
});

export type TStoreState = ReturnType<typeof store.getState>;
