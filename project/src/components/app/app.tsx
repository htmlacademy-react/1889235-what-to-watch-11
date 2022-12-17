import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFilms, selectFimsByGenre } from '../../store/films/films-slice';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

export default function App(): JSX.Element {
  const filmsByGenre = useSelector(selectFimsByGenre);
  const filmCard = filmsByGenre[0];

  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch<any>(fetchFilms());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              filmsByGenre && filmsByGenre.length
                ?
                <MainScreen
                  filmCard={filmCard}
                  films={filmsByGenre}
                />
                : null
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <MyListScreen films={filmsByGenre} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Film}/:id`}
            element={<FilmScreen films={filmsByGenre} />}
          />
          <Route
            path={`${AppRoute.Film}/:id${AppRoute.AddReview}`}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <AddReviewScreen films={filmsByGenre} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Player}/:id`}
            element={<PlayerScreen films={filmsByGenre} />}
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
