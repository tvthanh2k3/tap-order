import { memo, useEffect, useState } from 'react';
import type { Circle as CircleType, Status } from '../types';
import { formatTime } from '../utils/formatTime';
import { FADE_DURATION } from '../constants';

type Props = {
  circle: CircleType;
  status: Status;
  onClick: (id: number) => void;
};

function Circle({ circle, status, onClick }: Props) {
  const [timeLeft, setTimeLeft] = useState(FADE_DURATION);

  useEffect(() => {
    if (!circle.isClicked || circle.clickedAt == null) return;
    if (status === 'lost') return;

    const update = () => {
      const elapsed = Date.now() - circle.clickedAt!;
      const remaining = Math.max(0, FADE_DURATION - elapsed);
      setTimeLeft(remaining);
    };
    update();
    const interval = setInterval(update, 100);
    return () => clearInterval(interval);
  }, [circle.isClicked, circle.clickedAt, status]);

  return (
    <div
      className={`circle${circle.isClicked ? ' clicked' : ''}`}
      style={{
        left: circle.x,
        top: circle.y,
        opacity: timeLeft / FADE_DURATION,
        zIndex: 1000 - circle.id,
      }}
      onClick={() => { if (status === 'playing') onClick(circle.id); }}
    >
      {circle.id}
      {circle.isClicked && (
        <span className="circle-countdown">{formatTime(timeLeft)}</span>
      )}
    </div>
  );
}

export default memo(Circle);
