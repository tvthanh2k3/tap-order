import type { Status } from '../types';

type Props = {
  points: number;
  onPointsChange: (n: number) => void;
  time: number;
  status: Status;
  isAuto: boolean;
  onPlay: () => void;
  onToggleAuto: () => void;
};

export default function ControlPanel({
  points,
  onPointsChange,
  time,
  status,
  isAuto,
  onPlay,
  onToggleAuto,
}: Props) {
  const playLabel = status === 'idle' ? 'Play' : 'Restart';
  const timeDisplay = (time / 1000).toFixed(1) + 's';

  const heading =
    status === 'won' ? 'ALL CLEARED' :
    status === 'lost' ? 'GAME OVER' :
    "LET'S PLAY";

  return (
    <div className="control">
      <h1 className={`heading heading--${status}`}>{heading}</h1>
      <div className="control-row">
        <label>
          Points:
          <input
            type="number"
            min={1}
            value={points}
            onChange={(e) => onPointsChange(Math.max(1, Number(e.target.value)))}
          />
        </label>
        <span className="time-display">Time: {timeDisplay}</span>
      </div>
      <div className="control-row">
        <button className="btn-play" onClick={onPlay}>
          {playLabel}
        </button>
        {status === 'playing' && (
          <button
            className={`btn-auto${isAuto ? ' on' : ''}`}
            onClick={onToggleAuto}
          >
            Auto Play {isAuto ? 'OFF' : 'ON'}
          </button>
        )}
      </div>
    </div>
  );
}
