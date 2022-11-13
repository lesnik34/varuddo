import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { request } from '@store/operations/app';

import { AppState, AppLoadingState, AppErrorState } from '../types/app';

const initialState: AppState = {
  loading: {},
  error: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<AppLoadingState>) => ({
      ...state,
      loading: action.payload,
    }),
    setError: (state, action: PayloadAction<AppErrorState>) => ({
      ...state,
      error: action.payload,
    }),
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(request.pending, (state, action) => {
        const { apiName, apiMethod } = action.meta.arg;

        return {
          ...state,
          loading: {
            ...state.loading,
            [apiName]: {
              ...state.loading[apiName],
              [apiMethod]: true,
            },
          },
        };
      })
      .addCase(request.fulfilled, (state, action) => {
        const { apiName, apiMethod } = action.meta.arg;

        delete state.loading[apiName][apiMethod];

        if (Object.values(state.loading[apiName])) {
          delete state.loading[apiName];
        }
      })
      .addCase(request.rejected, (state, action) => {
        const { apiName, apiMethod, data } = action.meta.arg;
        const { message, code } = action.error;
        console.warn(message);

        delete state.loading[apiName][apiMethod];

        if (Object.values(state.loading[apiName])) {
          delete state.loading[apiName];
        }

        state.error = {
          ...state.error,
          [apiName]: {
            ...state.error[apiName],
            [apiMethod]: {
              msg: message || '',
              code: code || '',
              data,
            },
          },
        };
      });
  },
});

export const { setLoading, setError, clear } = appSlice.actions;

export default appSlice.reducer;
