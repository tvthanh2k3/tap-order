import { memo } from 'react';
import type { Circle as CircleType } from '../types';

type Props = {
  circle: CircleType;
  onClick: (id: number) => void;
};

const RADIUS = 20;

function Circle({ circle, onClick }: Props) {
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
    </div>
  );
}

export { RADIUS };
export default memo(Circle);