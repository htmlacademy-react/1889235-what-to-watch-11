import { filmsMock } from './mocks/films';
import { reviewsMock } from './mocks/reviews';
import { Film, Review } from './types/types';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store/store';

export type Mocks = {
  film: Film;
  reviews: Review[];
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const mocks: Mocks = {
  film: filmsMock[2],
  reviews: reviewsMock,
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        filmCard={mocks.film}
        reviews={mocks.reviews}
      />
    </Provider>
  </React.StrictMode>,
);
