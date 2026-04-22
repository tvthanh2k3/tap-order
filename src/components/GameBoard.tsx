import { forwardRef } from 'react';
import type { Circle as CircleType } from '../types';
import Circle from './Circle';

type Props = {
  circles: CircleType[];
  onCircleClick: (id: number) => void;
};

const GameBoard = forwardRef<HTMLDivElement, Props>(({ circles, onCircleClick }, ref) => {
  return (
    <div className="board" ref={ref}>
      {circles.map((circle) => (
        <Circle key={circle.id} circle={circle} onClick={onCircleClick} />
      ))}
    </div>
  );
});

export default GameBoard;
