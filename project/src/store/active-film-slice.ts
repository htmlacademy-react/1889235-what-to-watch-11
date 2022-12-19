import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import baseApi from '../api/api';
import { Film, Review } from '../types/types';
import { RootState } from './store';

type ActiveFilmState = {
  film: Film | null;
  similarFilms: Film[];
  reviews: Review[];
};

export type UserComment = Pick<Review, 'comment' | 'rating'>;

export const initialState: ActiveFilmState = {
  film: null,
  similarFilms: [],
  reviews: [],
};

export const fetchFilm = createAsyncThunk(
  'fetchFilm',
  async (filmId: number) => {
    const response = await baseApi.get<Film>(`/films/${filmId}`);
    return response.data;
  }
);

export const fetchSimilarFilms = createAsyncThunk(
  'fetchSimilarFilms',
  async (filmId: number) => {
    const response = await baseApi.get<Film[]>(`/films/${filmId}/similar`);
    return response.data;
  }
);

export const fetchReviews = createAsyncThunk(
  'fetchReviews',
  async (filmId: number) =>
    (await baseApi.get<Review[]>(`/comments/${filmId}`)).data
);

export const postComment = createAsyncThunk(
  'postComment',
  async ({ filmId, comment }: { filmId: number; comment: UserComment }) => {
    const response = await baseApi.post<Review[]>(
      `/comments/${filmId}`,
      comment
    );
    return response.data;
  }
);

export const activeFilmSlice = createSlice({
  name: 'active',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilm.fulfilled, (state, action) => {
      state.film = action.payload;
    });
    builder.addCase(fetchSimilarFilms.fulfilled, (state, action) => {
      state.similarFilms = action.payload;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
  },
});

const selectSelf = (state: RootState): RootState => state;

export const selectFilmsFeature = createDraftSafeSelector(
  selectSelf,
  (state) => state.activeFilmStore
);

export const selectActiveFilm = createDraftSafeSelector(
  selectFilmsFeature,
  (state) => state.film
);

export const selectReviews = createDraftSafeSelector(
  selectFilmsFeature,
  (state) => state.reviews
);

export const selectSimilarFilms = createDraftSafeSelector(
  selectFilmsFeature,
  (state) => state.similarFilms
);

export default activeFilmSlice.reducer;
