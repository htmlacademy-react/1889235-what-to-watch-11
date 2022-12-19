import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import Spinner from '../../components/spinner/spinner';
import { AppRoute } from '../../const';
import { fetchFilm, fetchReviews, fetchSimilarFilms, selectActiveFilm, selectSimilarFilms } from '../../store/active-film-slice';
import { selectUser } from '../../store/auth-slice';
import { AppDispatch } from '../../store/store';
import { selectIsLoading } from '../../store/ui-slice';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import UserPanel from '../user-panel/user-panel';

export default function FilmScreen(): JSX.Element {
  const params = useParams();
  const filmId = params.id && Number.isInteger(+params.id) ? +params.id : undefined;

  const activeFilm = useSelector(selectActiveFilm);
  const similar = useSelector(selectSimilarFilms);
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = !!useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (filmId && activeFilm?.id !== filmId) {
      dispatch(fetchFilm(filmId));
      dispatch(fetchSimilarFilms(filmId));
      dispatch(fetchReviews(filmId));
    }
  }, [activeFilm?.id, dispatch, filmId]);

  if (isLoading) { return <Spinner />; }
  if (!filmId || !activeFilm) { return <NotFoundScreen />; }

  return (
    <div>
      {
        activeFilm && (
          <>
            <section className="film-card film-card--full" style={{ background: activeFilm.backgroundColor }}>
              <Helmet>
                <title>{activeFilm.name}</title>
              </Helmet>
              <div className="film-card__hero">
                <div className="film-card__bg">
                  <img src={activeFilm.backgroundImage} alt={activeFilm.name} />
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <header className="page-header film-card__head">
                  <Logo />
                  <UserPanel />
                </header>

                <div className="film-card__wrap">
                  <div className="film-card__desc">
                    <h2 className="film-card__title">{activeFilm.name}</h2>
                    <p className="film-card__meta">
                      <span className="film-card__genre">{activeFilm.genre}</span>
                      <span className="film-card__year">{activeFilm.released}</span>
                    </p>

                    <div className="film-card__buttons">
                      <button onClick={() => navigate(`${AppRoute.Player}/${activeFilm?.id}`)} className="btn btn--play film-card__button" type="button">
                        <svg viewBox="0 0 19 19" width="19" height="19">
                          <use xlinkHref="#play-s"></use>
                        </svg>
                        <span>Play</span>
                      </button>
                      {isLoggedIn
                        ?
                        <Link to={`${AppRoute.Film}/${activeFilm.id}${AppRoute.AddReview}`} className="btn film-card__button">
                          Add review
                        </Link>
                        : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="film-card__wrap film-card__translate-top">
                <Outlet />
              </div>
            </section>

            <div className="page-content">
              <section className="catalog catalog--like-this">
                <h2 className="catalog__title">More like this</h2>

                <FilmsList films={similar} pageSize={8} />
              </section>
              <Footer />
            </div>
          </>
        )
      }
    </div >
  );
}
