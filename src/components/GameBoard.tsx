import { forwardRef } from 'react';
import type { Circle as CircleType, Status } from '../types';
import Circle from './Circle';

type Props = {
  circles: CircleType[];
  status: Status;
  onCircleClick: (id: number) => void;
};

const GameBoard = forwardRef<HTMLDivElement, Props>(({ circles, status, onCircleClick }, ref) => {
  return (
    <div className="board" ref={ref}>
      {circles.map((circle) => (
        <Circle key={circle.id} circle={circle} status={status} onClick={onCircleClick} />
      ))}
    </div>
  );
});

export default GameBoard;
