import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type UiState = {
  requestCounter: number;
};

const initialState: UiState = {
  requestCounter: 0
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    increment: (state: UiState) => {
      state.requestCounter++;
    },
    decrement: (state: UiState) => {
      state.requestCounter--;
    },
  },
});

const selectSelf = (state: RootState): RootState => state;

export const selectUiFeature = createDraftSafeSelector(
  selectSelf,
  (state) => state.uiStore
);

export const selectIsLoading = createDraftSafeSelector(
  selectUiFeature,
  (state) => state.requestCounter !== 0
);

export const { increment, decrement } = uiSlice.actions;

export default uiSlice.reducer;
