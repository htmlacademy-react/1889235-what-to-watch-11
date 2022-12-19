import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { Film } from '../../types/types';
import UserPanel from '../user-panel/user-panel';

export type MyListScreenProps = {
  films: Film[];
}
export default function MyListScreen({ films }: MyListScreenProps): JSX.Element {
  return (
    <div className="user-page">
      <Helmet>
        <title>WTW my list</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <UserPanel />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmsList films={films} pageSize={8} />
        </div>
      </section >
      <Footer />
    </div >
  );
}
