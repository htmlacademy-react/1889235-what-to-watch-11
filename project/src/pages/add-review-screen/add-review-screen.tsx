import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import { postComment, UserComment } from '../../store/active-film-slice';
import { AppDispatch } from '../../store/store';
import { Film } from '../../types/types';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import UserPanel from '../user-panel/user-panel';

export type AddReviewScreenProp = {
  films: Film[];
}

export default function AddReviewScreen({ films }: AddReviewScreenProp): JSX.Element {
  const params = useParams<{ id: string }>();
  const filmId = +(params?.id ?? '0');
  const currentFilm = films.find(({ id }) => id === filmId);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const submitComment = (comment: UserComment) => {
    dispatch(postComment({ filmId, comment }));
    navigate(`${AppRoute.Film}/${filmId}`);
  };

  if (!currentFilm) { return <NotFoundScreen />; }

  return (
    <section className="film-card film-card--full" style={{ background: currentFilm.backgroundColor }}>
      <Helmet>
        <title>{currentFilm.name}</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm.backgroundColor} alt={currentFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${currentFilm.id}`} className="breadcrumbs__link">{currentFilm.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <div className="breadcrumbs__link">Add review</div>
              </li>
            </ul>
          </nav>

          <UserPanel />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm.posterImage} alt={`${currentFilm.name} poster`} width="218"
            height="327"
          />
        </div>
      </div>

      <AddReviewForm onSubmit={submitComment} />
    </section>
  );
}
