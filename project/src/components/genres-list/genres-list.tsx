import { useDispatch } from 'react-redux';
import { Film } from '../../types/types';
import { Link } from 'react-router-dom';
import { Genre } from '../../const';
import { setGenre } from '../../store/films/films-slice';

type GenresListProps = {
  // selectedGenre: string;
  films: Film[];
}

export function GenresList({ films }: GenresListProps) {
  const dispatch = useDispatch();
  const selectGenre = ((genre: string) => () => dispatch(setGenre(genre)));
  const genres = films.map((film) => film.genre);
  const uniqueGenres = [...new Set(genres)];

  return (
    <ul className="catalog__genres-list" >
      <li className="catalog__genres-item catalog__genres-item--active">
        <Link
          to="#"
          className="catalog__genres-link"
          onClick={selectGenre(Genre.AllGenres)}
        >
          All genres
        </Link>
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
