import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, FilmScreenTab } from '../../const';
import { selectActiveFilm, selectReviews } from '../../store/active-film-slice';
import { Film, Review } from '../../types/types';
import FilmDetails from '../film-details/film-details';
import FilmOverview from '../film-overview/film-overview';
import FilmReviews from '../film-reviews/film-reviews';

export type FilmTabsPropsData = {
  tab: number;
}

const renderTab = (tab: number, film: Film, reviews: Review[]) => {
  switch (tab) {
    case FilmScreenTab.Overview:
      return <FilmOverview {...film} />;
    case FilmScreenTab.Details:
      return <FilmDetails {...film} />;
    case FilmScreenTab.Reviews:
      return <FilmReviews reviews={reviews ?? []} />;
  }
};

export default function FilmTabs({ tab }: FilmTabsPropsData): JSX.Element | null {
  const film = useSelector(selectActiveFilm);
  const reviews = useSelector(selectReviews);
  if (!film) {
    return null;
  }

  return (
    <div className="film-card__info">
      <div className="film-card__poster film-card__poster--big">
        <img src={film?.posterImage} alt={`${film.name} poster`} width="218"
          height="327"
        />
      </div>

      <div className="film-card__desc">
        <nav className="film-nav film-card__nav">
          <ul className="film-nav__list">
            <li className={`film-nav__item ${tab === FilmScreenTab.Overview ? 'film-nav__item--active' : ''}`}>
              <Link to={`${AppRoute.Film}/${film.id}`} className="film-nav__link">Overview</Link>
            </li>
            <li className={`film-nav__item ${tab === FilmScreenTab.Details ? 'film-nav__item--active' : ''}`}>
              <Link to={`${AppRoute.Film}/${film.id}${AppRoute.Details}`} className="film-nav__link">Details</Link>
            </li>
            <li className={`film-nav__item ${tab === FilmScreenTab.Reviews ? 'film-nav__item--active' : ''}`}>
              <Link to={`${AppRoute.Film}/${film.id}${AppRoute.Reviews}`} className="film-nav__link">Reviews</Link>
            </li>
          </ul>
        </nav>

        {renderTab(tab, film, reviews)}

      </div>
    </div>
  );
}
