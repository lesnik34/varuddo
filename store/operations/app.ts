import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '@api/.';

import { AppRequestProps } from '../types/app';

export const request = createAsyncThunk(
  'app/request',
  async ({ apiName, apiMethod, data, beforeCallback = () => null, afterCallback = () => null }: AppRequestProps) => {
    beforeCallback();
    const response = await Api[apiName][apiMethod](data);
    afterCallback();
    return response;
  },
);
