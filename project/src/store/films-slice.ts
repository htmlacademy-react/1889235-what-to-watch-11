import { createAsyncThunk, createDraftSafeSelector, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import baseApi from '../api/api';
import { Film } from '../types/types';
import { RootState } from './store';

export type FilmsState = {
  genre: string | null;
  films: Film[];
};

const initialState: FilmsState = {
  genre: '',
  films: [],
};

export const fetchFilms = createAsyncThunk(
  'fetchFilms',
  async () => {
    const response = await baseApi.get<Film[]>('/films');
    return response.data;
  }
);

export const filmsSlice = createSlice({
  name: 'films',
  initialState: initialState,
  reducers: {
    setGenre: (state: FilmsState, action: PayloadAction<string | null>) => {
      const newGenre = action.payload;
      state.genre = newGenre;
    },
    setFilms: (state: FilmsState, action: PayloadAction<Film[]>) => {
      const films = action.payload;
      state.films = films;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
    });
  },
});

const selectSelf = (state: RootState): RootState => state;

export const selectFilmsFeature = createDraftSafeSelector(
  selectSelf,
  (state) => state.filmsStore
);

export const selectFilms = createDraftSafeSelector(
  selectFilmsFeature,
  (state) => state.films
);

export const selectGenre = createDraftSafeSelector(
  selectFilmsFeature,
  (state) => state.genre
);

export const selectFimsByGenre = createDraftSafeSelector(
  selectFilmsFeature,
  (state) => state.films.filter((film) => state.genre ? film.genre === state.genre : true)
);

export const { setGenre, setFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
