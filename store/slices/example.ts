import { createSlice } from '@reduxjs/toolkit';
import { request } from '@store/operations/app';

const initialState: { stat: string } = {
  stat: 'data',
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(request.fulfilled, (state, action) => {
      const data = action.payload;

      state.stat = data;
    });
  },
});

export default exampleSlice.reducer;
