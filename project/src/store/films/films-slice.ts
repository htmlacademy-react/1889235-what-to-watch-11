import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Genre } from '../../const';
import { filmsMock } from '../../mocks/films';
import { Film } from '../../types/types';

export type FilmsState = {
  genre: string;
  films: Film[];
};

const initialState: FilmsState = {
  genre: '',
  films: [],
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState: initialState,
  reducers: {
    changeGenre: (state: FilmsState, action: PayloadAction<string>) => {
      const newGenre = action.payload;
      state.genre = newGenre;
    },
    getFilmsByGenre: (state: FilmsState, action: PayloadAction<string>) => {
      const newGenre = action.payload;
      state.genre = newGenre;
      state.films =
        newGenre === Genre.AllGenres
          ? filmsMock
          : filmsMock.filter((film) => film.genre === newGenre);
    },
    setFilms: (state: FilmsState, action: PayloadAction<Film[]>) => {
      const films = action.payload;
      state.films = films;
    },
  },
});

export const { changeGenre, getFilmsByGenre, setFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
