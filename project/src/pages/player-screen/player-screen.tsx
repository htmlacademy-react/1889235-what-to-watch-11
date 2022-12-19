import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import { fetchFilm, selectActiveFilm } from '../../store/active-film-slice';
import { AppDispatch } from '../../store/store';
import { selectIsLoading } from '../../store/ui-slice';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function PlayerScreen(): JSX.Element {

  const params = useParams();
  const filmId = params.id && Number.isInteger(+params.id) ? +params.id : undefined;
  const film = useSelector(selectActiveFilm);
  const isLoading = useSelector(selectIsLoading);
  const videoElRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (filmId && film?.id !== filmId) {
      dispatch(fetchFilm(filmId));
    }
  }, [dispatch, film?.id, filmId]);

  if (isLoading) { return <Spinner />; }
  if (!filmId || !film) {
    return <NotFoundScreen />;
  }
  return (
    <div className="player" >
      <video ref={videoElRef} src={film.videoLink} className="player__video" poster={film.backgroundImage}></video>

      <button onClick={() => navigate('/')} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler" style={{ left: '0%' }}>Toggler</div>
          </div>
          <div className="player__time-value">0:00:00</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => { videoElRef.current?.play(); }}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

