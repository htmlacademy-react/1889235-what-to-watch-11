import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFilmsByGenre } from '../../store/films/films-slice';
import { Film } from '../../types/types';
import { Link } from 'react-router-dom';
import { Genre } from '../../const';

type GenresListProps = {
  // selectedGenre: string;
  films: Film[];
}

export function GenresList({ films }: GenresListProps) {
  const dispatch = useDispatch();
  const selectGenre = ((genre: string) => () => dispatch(getFilmsByGenre(genre)));
  const genres = films.map((film) => film.genre);
  const uniqueGenres = [...new Set(genres)];

  useEffect(() => {
    dispatch(getFilmsByGenre('AllGenres'));
  }, [dispatch]);

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
