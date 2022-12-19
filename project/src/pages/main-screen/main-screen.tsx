import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import { GenresList } from '../../components/genres-list/genres-list';
import Logo from '../../components/logo/logo';
import Spinner from '../../components/spinner/spinner';
import { AppRoute } from '../../const';
import { selectUser } from '../../store/auth-slice';
import { selectIsLoading } from '../../store/ui-slice';
import { Film } from '../../types/types';
import UserPanel from '../user-panel/user-panel';

export type MainScreenProps = {
  featuredFilm: Film;
  films: Film[];
}

export default function MainScreen({ featuredFilm, films }: MainScreenProps): JSX.Element {
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="film-card">
        <Helmet>
          <title>WTW main page</title>
        </Helmet>
        <div className="film-card__bg">
          <img src={featuredFilm.backgroundImage} alt={featuredFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <UserPanel />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={featuredFilm.posterImage} alt={`${featuredFilm.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{featuredFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{featuredFilm.genre}</span>
                <span className="film-card__year">{featuredFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button onClick={() => navigate(`${AppRoute.Player}/${featuredFilm.id}`)} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  !!user &&
                  <div
                    className="btn btn--list film-card__button"
                    onClick={() => { navigate(AppRoute.MyList); }}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                    <span className="film-card__count">{films.length}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content" >
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList films={films} />

          <div className="catalog__films-list">
            <FilmsList films={films} pageSize={8} />
          </div>
        </section>
        <Footer />
      </div >
    </>
  );
}

