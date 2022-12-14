import { Film } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export type PlayerScreenProps = {
  films: Film[];
}

export default function PlayerScreen({ films }: PlayerScreenProps): JSX.Element {

  const navigate = useNavigate();
  const params = useParams();
  const film = films.find((item: Film) => item.id.toString() === params.id);
  if (!film) {
    return <NotFoundScreen />;
  }
  return (
    <div className="player" >
      <video src="#" className="player__video" poster={film.backgroundImage}></video>

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
          <button type="button" className="player__play">
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
