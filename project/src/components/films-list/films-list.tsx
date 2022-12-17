import { Film } from '../../types/types';
import { BaseSyntheticEvent, useState } from 'react';
import FilmCard from '../film-card/film-card';
import ShowMore from '../show-more/show-more';
import { useDispatch } from 'react-redux';
import { setGenre } from '../../store/films/films-slice';

export type FilmsListProps = {
  films: Film[];
}

export default function FilmsList({ films }: FilmsListProps): JSX.Element {
  const dispatch = useDispatch();
  const handleShowMore = () => dispatch(setGenre(null));
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleMouseOver = (evt: BaseSyntheticEvent) => {
    const target = evt.target as Element;
    const parent = target.parentElement as Element;
    if (parent.classList.contains('small-film-card') || target.tagName === 'A') {
      setActiveId(parent.id);
      return;
    }
    setActiveId(null);
  };

  return (
    <div className="catalog__films-list" onMouseOver={handleMouseOver} onMouseOut={() => setActiveId(null)}>
      {films.map((film: Film) => <FilmCard film={film} isActive={film.id.toString() === activeId} key={film.id} />)}
      <ShowMore onClick={handleShowMore} />
    </div>
  );
}
