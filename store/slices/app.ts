import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { request } from '@store/operations/app';

import type { AppState, AppLoadingState, AppErrorState } from '../types/app';

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
              ...(state.loading[apiName] || {}),
              [apiMethod]: true,
            },
          },
        };
      })
      .addCase(request.fulfilled, (state, action) => {
        const { apiName, apiMethod } = action.meta.arg;

        if (state.loading[apiName] && state.loading[apiName][apiMethod]) {
          delete state.loading[apiName][apiMethod];
        }
        if (state.loading[apiName] && Object.values(state.loading[apiName]).length === 1) {
          delete state.loading[apiName];
        }
      })
      .addCase(request.rejected, (state, action) => {
        const { apiName, apiMethod, data } = action.meta.arg;
        const { message, code } = action.error;

        if (state.loading[apiName] && state.loading[apiName][apiMethod]) {
          delete state.loading[apiName][apiMethod];
        }
        if (state.loading[apiName] && Object.values(state.loading[apiName]).length === 1) {
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
