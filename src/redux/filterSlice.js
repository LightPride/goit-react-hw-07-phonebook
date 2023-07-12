import { createSlice } from '@reduxjs/toolkit';

const initialFilterState = '';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    changeFilter(state, action) {
      return (state = action.payload);
    },
  },
});

export const { changeFilter } = filterSlice.actions;
