import type { Circle } from '../types';
import { RADIUS } from '../components/Circle';

export function generateCircles(n: number, boardWidth: number, boardHeight: number): Circle[] {
  const minX = RADIUS;
  const maxX = boardWidth - RADIUS;
  const minY = RADIUS;
  const maxY = boardHeight - RADIUS;

  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    x: Math.random() * (maxX - minX) + minX,
    y: Math.random() * (maxY - minY) + minY,
    isClicked: false,
    opacity: 1,
  }));
}
