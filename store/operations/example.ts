import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from './app';

export const exampleOperation = createAsyncThunk('example/exampleOperation', async (_, { dispatch }) => {
  const data = (
    await dispatch(
      request({
        apiName: 'landing',
        apiMethod: 'getLandingInfo',
        data: '',
      }),
    )
  ).payload;

  return {
    data,
  };
});
