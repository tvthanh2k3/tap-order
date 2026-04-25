import type { Circle } from '../types';
import { CIRCLE_RADIUS } from '../constants';

export function generateCircles(n: number, boardWidth: number, boardHeight: number): Circle[] {
  const minX = CIRCLE_RADIUS;
  const maxX = boardWidth - CIRCLE_RADIUS;
  const minY = CIRCLE_RADIUS;
  const maxY = boardHeight - CIRCLE_RADIUS;

  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    x: Math.random() * (maxX - minX) + minX,
    y: Math.random() * (maxY - minY) + minY,
    isClicked: false,
  }));
}
