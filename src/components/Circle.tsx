import { memo, useEffect, useState } from 'react';
import type { Circle as CircleType } from '../types';

type Props = {
  circle: CircleType;
  onClick: (id: number) => void;
};

const RADIUS = 20;
const FADE_DURATION = 3000;

function Circle({ circle, onClick }: Props) {
  const [timeLeft, setTimeLeft] = useState(FADE_DURATION);

  useEffect(() => {
    if (!circle.isClicked || circle.clickedAt == null) return;
    const update = () => {
      setTimeLeft(Math.max(0, FADE_DURATION - (Date.now() - circle.clickedAt!)));
    };
    update();
    const interval = setInterval(update, 100);
    return () => clearInterval(interval);
  }, [circle.isClicked, circle.clickedAt]);

  return (
    <div
      className={`circle${circle.isClicked ? ' clicked' : ''}`}
      style={{
        left: circle.x,
        top: circle.y,
        opacity: circle.opacity,
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
