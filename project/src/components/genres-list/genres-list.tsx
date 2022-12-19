import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setGenre } from '../../store/films-slice';
import { AppDispatch } from '../../store/store';
import { Film } from '../../types/types';

type GenresListProps = {
  films: Film[];
}

export function GenresList({ films }: GenresListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const selectGenre = ((genre: string | null) => () => dispatch(setGenre(genre)));
  const genres = films.map((film) => film.genre);
  const uniqueGenres = [...new Set(genres)];

  return (
    <ul className="catalog__genres-list" >
      <li className="catalog__genres-item catalog__genres-item--active">
        <div
          className="catalog__genres-link"
          onClick={selectGenre(null)}
        >
          All genres
        </div>
      </li>
      {uniqueGenres.map((genre) => (
        <li key={genre} className="catalog__genres-item catalog__genres-item--active">
          <Link
            to="#"
            className="catalog__genres-link"
            onClick={selectGenre(genre)}
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}
