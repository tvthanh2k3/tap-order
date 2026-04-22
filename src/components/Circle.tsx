import { memo, useEffect, useState } from 'react';
import type { Circle as CircleType, Status } from '../types';

type Props = {
  circle: CircleType;
  status: Status;
  onClick: (id: number) => void;
};

const RADIUS = 20;
const FADE_DURATION = 3000;

function Circle({ circle, status, onClick }: Props) {
  const [timeLeft, setTimeLeft] = useState(FADE_DURATION);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!circle.isClicked || circle.clickedAt == null) return;
    if (status === 'lost') return;

    const update = () => {
      const elapsed = Date.now() - circle.clickedAt!;
      const remaining = Math.max(0, FADE_DURATION - elapsed);
      setTimeLeft(remaining);
      setOpacity(remaining / FADE_DURATION);
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
        opacity,
        zIndex: 1000 - circle.id,
      }}
      onClick={() => onClick(circle.id)}
    >
      {circle.id}
      {circle.isClicked && (
        <span className="circle-countdown">{(timeLeft / 1000).toFixed(1)}s</span>
      )}
    </div>
  );
}

export { RADIUS };
export default memo(Circle);
