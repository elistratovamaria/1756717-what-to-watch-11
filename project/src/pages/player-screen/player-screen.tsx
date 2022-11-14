import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { Film, Films } from '../../types/films';
import { getFormatPlayerTime } from '../../util';
import { AppRoute } from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type PlayerScreenProps = {
  films: Films;
}

function PlayerScreen({films}: PlayerScreenProps): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const film = films.find((elem: Film) => elem.id.toString() === params.id);
  if (film === undefined) {
    return <NotFoundScreen />;
  }
  return (
    <div className="player">
      <Helmet>
        <title>WTW. Player</title>
      </Helmet>
      <video src="#" className="player__video" poster={film.backgroundImage}></video>

      <button type="button" className="player__exit" onClick={() => navigate(AppRoute.Main)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler" style={{ left: '0%' }}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormatPlayerTime(film.runTime)}</div>
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

export default PlayerScreen;
