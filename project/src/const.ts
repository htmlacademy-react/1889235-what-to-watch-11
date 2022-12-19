export enum AppRoute {
  Film = '/film',
  AddReview = '/review',
  Player = '/player',
  MyList = '/mylist',
  Login = '/login',
  Root = '/',
  NotFound = '/not-found',
  Reviews = '/reviews',
  Details = '/details',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export enum Genre {
  AllGenres = 'AllGenres',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Dramas = 'Dramas',
  Horror = 'Horror',
  KidsAndFamily = 'Kids & Family',
  Romance = 'Romance',
  SciFi = 'Sci-Fi',
  Thrillers = 'Thrillers',
  film = 'film'
}

export enum FilmScreenTab {
  Overview,
  Details,
  Reviews
}

export const MAX_FILMS_SHOWN_HOME = 8;

