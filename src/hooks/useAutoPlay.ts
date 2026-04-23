import { useEffect } from 'react';
import type { Status } from '../types';

type Params = {
  isAuto: boolean;
  status: Status;
  nextNumber: number;
  points: number;
  onClickCircle: (id: number) => void;
};

export function useAutoPlay({ isAuto, status, nextNumber, points, onClickCircle }: Params) {
  useEffect(() => {
    if (!isAuto || status !== 'playing' || nextNumber > points) return;
    const t = setTimeout(() => onClickCircle(nextNumber), 600);
    return () => clearTimeout(t);
  }, [isAuto, status, nextNumber, points, onClickCircle]);
}
