import { createSlice } from '@reduxjs/toolkit';

interface StateI {
  example: string;
}

const initialState: StateI = {
  example: '',
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExample: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setExample } = exampleSlice.actions;

export default exampleSlice.reducer;
