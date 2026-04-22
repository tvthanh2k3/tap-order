import type { Circle as CircleType } from '../types';
import Circle from './Circle';

type Props = {
  circles: CircleType[];
  onCircleClick: (id: number) => void;
};

export default function GameBoard({ circles, onCircleClick }: Props) {
  return (
    <div className="board">
      {circles.map((circle) => (
        <Circle key={circle.id} circle={circle} onClick={onCircleClick} />
      ))}
    </div>
  );
}
