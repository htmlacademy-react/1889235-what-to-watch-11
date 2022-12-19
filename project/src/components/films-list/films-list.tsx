import { BaseSyntheticEvent, useState } from 'react';
import { Film } from '../../types/types';
import { FilmsListLazy } from '../films-list-lazy/films-list';

type Props = {
  films: Film[];
  pageSize?: number;
}
export default function FilmsList({ films, pageSize }: Props): JSX.Element {
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
      <FilmsListLazy activeId={activeId} films={films} pageSize={pageSize} />
    </div>);
}
